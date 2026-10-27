import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const dir = path.join(root, 'outputs/automotive-release-2026-10-19/scope');
fs.mkdirSync(dir, { recursive: true });
const json = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: null, maxBuffer: 20e6 });
const gitText = (...args) => git(...args).toString('utf8').trim();
const hub = json('outputs/five-brand-service-2026-10-19/modified-files.json').sourceAndTestFiles;
const repair = json('outputs/repair-service-2026-10-19/modified-files.json');
const repairAfter = new Map(json('outputs/repair-service-2026-10-19/after/source-manifest.json').map(r => [r.file, r.sha256]));
const repairRows = [...repair.changed.map(r=>({file:r.file, beforeSha256:r.before, afterSha256:r.after, change:'modified'})), ...repair.added.map(file=>({file, beforeSha256:null, afterSha256:repairAfter.get(file), change:'added'}))];
const normalize = bytes => bytes.toString('utf8').replace(/\r\n/g, '\n');
const manifests = [...hub.map(r=>({...r, sprint:'five-brand-service-2026-10-19'})), ...repairRows.map(r=>({...r, sprint:'repair-service-2026-10-19'}))].map(row=>{
  const current = fs.readFileSync(row.file);
  let base = null;
  if (row.change !== 'added') base = git('show', `HEAD:${row.file}`);
  const baselineManifest = new Map(json(`outputs/${row.sprint}/baseline/source-manifest.json`).map(r=>[r.file,r.sha256]));
  const baselineHash = baselineManifest.get(row.file) ?? null;
  const headCheckoutCrlfSha256 = base ? sha(normalize(base).replace(/\n/g, '\r\n')) : null;
  let reconstructedBaseline = null;
  if (row.file==='src/data/priorityBrandSeo.ts') reconstructedBaseline = current.toString('utf8').replace('Volkswagen service and repair in Al Quoz, Dubai. Discuss routine maintenance, diagnostics, mechanical and electrical faults with DIGI-TEC. Request an assessment.','Volkswagen service and repair in Dubai, with DSG assessment, ODIS-supported diagnostics, engine, AC and brake inspections at DIGI-TEC in Al Quoz.');
  const reconstructedBaselineVerified = reconstructedBaseline !== null && sha(reconstructedBaseline)===row.beforeSha256 && normalize(reconstructedBaseline)===normalize(base);
  return {...row, currentSha256:sha(current), approvedHashMatches:sha(current)===row.afterSha256, headSha256:base?sha(base):null, baselineManifestSha256:baselineHash, approvedBaselineMatchesManifest:baselineHash===row.beforeSha256, headMatchesBaselineBytes:base?sha(base)===row.beforeSha256:row.beforeSha256===null, headCheckoutCrlfSha256, reconstructedBaselineSha256:reconstructedBaseline?sha(reconstructedBaseline):null,reconstructedBaselineVerified, headBaselineContentMatches:base?(sha(base)===row.beforeSha256 || headCheckoutCrlfSha256===row.beforeSha256 || reconstructedBaselineVerified):row.beforeSha256===null, headBlobSha1:base?gitText('rev-parse',`HEAD:${row.file}`):null, currentNormalizedSha256:sha(normalize(current)), headNormalizedSha256:base?sha(normalize(base)):null, bytes:current.length};
});
const allowed = new Set(manifests.map(r=>r.file));
const trackedChanges = gitText('diff','--name-only','HEAD').split(/\r?\n/).filter(Boolean);
const untracked = gitText('ls-files','--others','--exclude-standard').split(/\r?\n/).filter(Boolean);
const statusTracked = git('status','--porcelain=v1').toString('utf8').split(/\r?\n/).filter(r=>r && !r.startsWith('??')).map(r=>r.slice(3));
const excluded = [...new Set([...trackedChanges,...statusTracked])].filter(p=>!allowed.has(p)).map(file=>{
  const bytes=fs.readFileSync(file); let base=git('show',`HEAD:${file}`);
  return {file,currentSha256:sha(bytes),headSha256:sha(base),normalizedIdentical:normalize(base)===normalize(bytes),reason:file.startsWith('supabase/')?'Pre-existing unrelated backend edit; exclude from release.':'Existing generated evidence; exclude from release.'};
});
const base = gitText('rev-parse','HEAD');
const summary = {checkedAt:new Date().toISOString(),branch:gitText('branch','--show-current'),head:base,cachedOriginMain:gitText('rev-parse','origin/main'),sourceFileCount:manifests.length,applicationFileCount:manifests.filter(r=>r.file.startsWith('src/')).length,testFileCount:manifests.filter(r=>r.file.startsWith('scripts/')).length,allApprovedHashesMatch:manifests.every(r=>r.approvedHashMatches),allBaselinesMatch:manifests.every(r=>r.approvedBaselineMatchesManifest),allBaselineContentMatchesHead:manifests.every(r=>r.headBaselineContentMatches),lineEndingPolicy:'core.autocrlf=true; source baseline hashes can use CRLF while Git object hashes use LF. headBaselineContentMatches accounts for this deterministic newline conversion.',excludedTrackedChanges:excluded,untrackedFileCount:untracked.length,releaseUntracked:untracked.filter(p=>allowed.has(p)),excludedUntracked:untracked.filter(p=>!allowed.has(p)),constraints:['Do not commit, push, publish, deploy, reset, checkout, clean, stash or modify production during preparation.','Overlay only the 11 manifest files onto the verified remote baseline.','Keep Cloudflare, PPF, tuning, backend and all unrelated working files outside the release overlay.']};
fs.writeFileSync(path.join(dir,'release-source-manifest.json'),JSON.stringify({summary,files:manifests},null,2)+'\n');
const headers=['file','sprint','change','beforeSha256','afterSha256','currentSha256','approvedHashMatches','headSha256','headBaselineContentMatches'];
fs.writeFileSync(path.join(dir,'release-source-manifest.csv'),headers.join(',')+'\n'+manifests.map(r=>headers.map(k=>r[k]??'').join(',')).join('\n')+'\n');
fs.writeFileSync(path.join(dir,'excluded-working-tree.json'),JSON.stringify({tracked:excluded,untracked:summary.excludedUntracked},null,2)+'\n');
let patch=git('diff','--binary','HEAD','--',...manifests.filter(r=>r.change==='modified').map(r=>r.file)).toString('utf8');
for (const row of manifests.filter(r=>r.change==='added')) {
 const lines=normalize(fs.readFileSync(row.file)).replace(/\n$/,'').split('\n');
 patch+=`diff --git a/${row.file} b/${row.file}\nnew file mode 100644\n--- /dev/null\n+++ b/${row.file}\n@@ -0,0 +1,${lines.length} @@\n${lines.map(line=>'+'+line).join('\n')}\n`;
}
fs.writeFileSync(path.join(dir,'automotive-source-only.patch'),patch);
fs.writeFileSync(path.join(dir,'git-status-before.txt'),git('status','--porcelain=v1'));
console.log(JSON.stringify({head:base,count:manifests.length,hashesMatch:summary.allApprovedHashesMatch,baselinesMatch:summary.allBaselinesMatch,baselineContentMatchesHead:summary.allBaselineContentMatchesHead,files:manifests.map(r=>({file:r.file,currentApproved:r.approvedHashMatches,baselineApproved:r.approvedBaselineMatchesManifest,headMatchesRawBaseline:r.headMatchesBaselineBytes,headBaselineContentMatches:r.headBaselineContentMatches,normalizedUnchanged:r.currentNormalizedSha256===r.headNormalizedSha256})),excluded},null,2));
