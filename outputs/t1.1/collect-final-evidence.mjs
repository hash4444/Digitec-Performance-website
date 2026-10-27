import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const root=process.cwd(), out=path.resolve('outputs/t1.1'), verification=path.join(out,'verification');
const readJson=async file=>JSON.parse(await fs.readFile(file,'utf8'));
for(const suffix of ['records','summary','repeated-paragraphs','noindex-inlinks']) {
  const source=`outputs/sitewide-seo-2026-09-17/audit/t11-final-local-${suffix}.json`, destination=path.join(verification,`sitewide-${suffix}.json`);
  try { await fs.copyFile(source,destination); await fs.unlink(source); }
  catch(error) { if(error.code!=='ENOENT') throw error; await fs.access(destination); }
}
await fs.copyFile('outputs/seo-2026-09-16/master-validation.json',path.join(verification,'master-validation.json'));
await fs.copyFile('release-qa.local/build-results.json',path.join(verification,'build-results.json'));
const initialGitStatus=await fs.readFile(path.join(out,'before/git-status.txt'),'utf8');
for(const name of ['after-aliases.json.gz','after-localized.json.gz','after-negative.json.gz','after-valid.json.gz','routing-tests.json']) {
  const file='outputs/b0-a/'+name;
  assert.ok(!initialGitStatus.includes(file),`${file}: do not restore pre-existing changes`);
  const destination=path.join(verification,'routing-response-'+name);
  try { await fs.access(destination); } catch { await fs.copyFile(file,destination); }
  const original=execFileSync('git',['show','HEAD:'+file],{maxBuffer:64*1024*1024});
  for(let attempt=0;attempt<3;attempt++) {
    try { await fs.writeFile(file,original); break; }
    catch(error) { if(attempt===2) throw error; await delay(400); }
  }
}
for(const file of ['protection-release-validation.json','query-release-validation.json','suspension-validation.json','transmission-validation.json','paint-care-cluster-audit.json']) {
  await fs.copyFile(path.join('docs/seo',file),path.join(verification,file));
}
const audit=await readJson(path.join(verification,'sitewide-summary.json'));
const fields={errors:'errors',metadataIssues:'metadata issues',duplicateTitles:'duplicate titles',duplicateDescriptions:'duplicate descriptions',duplicateContent:'duplicate pages',brokenLinks:'broken links',brokenFragments:'broken fragments'};
const counts={};
for(const [key,label] of Object.entries(fields)) { assert.ok(Array.isArray(audit[key]),`${key}: actual issue array required`);counts[label]=audit[key].length; }
await fs.writeFile(path.join(verification,'sitewide-counts.json'),JSON.stringify({source:'sitewide-summary.json',completedAt:audit.completedAt,method:'Measured issue-array lengths from fresh local built-HTML audit',counts},null,2));
const baseline=await readJson('outputs/t1/baseline/sitewide-records.json');
const t1=await readJson('outputs/t1/verification/sitewide-records.json');
const final=await readJson(path.join(verification,'sitewide-records.json'));
const paths=rows=>new Set(rows.map(r=>r.path));
const baselinePaths=paths(baseline), t1Paths=paths(t1), finalPaths=paths(final);
const approved=['/tuning/aston-martin-db11','/tuning/lamborghini-urus','/tuning/mercedes-amg-c63','/tuning/mercedes-amg-e63','/tuning/mercedes-amg-g63','/tuning/mercedes-amg-glc63','/tuning/mercedes-amg-gt','/tuning/mercedes-amg-gt63','/tuning/mercedes-amg-s65'].sort();
const added=[...finalPaths].filter(p=>!baselinePaths.has(p)).sort();
const removed=[...baselinePaths].filter(p=>!finalPaths.has(p));
assert.deepEqual(added,approved); assert.equal(removed.length,0);
assert.equal(baselinePaths.size,1247); assert.equal(finalPaths.size,1256); assert.deepEqual([...t1Paths].sort(),[...finalPaths].sort());
const indexabilityChanges=final.filter(r=>baselinePaths.has(r.path)&&baseline.find(b=>b.path===r.path).indexable!==r.indexable).map(r=>r.path);
assert.equal(indexabilityChanges.length,0);
const urls=s=>new Set([...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]));
const oldUrls=urls(await fs.readFile('outputs/t1/baseline/sitemap.xml','utf8'));
const newUrls=urls(await fs.readFile('public/sitemap.xml','utf8'));
const addedSitemap=[...newUrls].filter(p=>!oldUrls.has(p)).sort();
assert.equal(oldUrls.size,996);assert.equal(newUrls.size,1005);assert.deepEqual(addedSitemap,approved.map(p=>'https://digitecme.com'+p));
assert.equal([...oldUrls].filter(p=>!newUrls.has(p)).length,0);
const stageUrls=added.filter(p=>/stage|vip/i.test(p)),filterUrls=added.filter(p=>/[?=&]/.test(p));
assert.equal(stageUrls.length,0);assert.equal(filterUrls.length,0);
await fs.writeFile(path.join(verification,'architecture-preservation.json'),JSON.stringify({passed:true,baselineRoutes:baselinePaths.size,finalRoutes:finalPaths.size,netNewRoutes:added.length,T11NetNewRoutes:0,baselineCanonical:oldUrls.size,finalCanonical:newUrls.size,netNewSitemapURLs:addedSitemap.length,newStageURLs:stageUrls.length,newFilterURLs:filterUrls.length,addedRoutes:added,addedSitemap,indexabilityChanges,removedRoutes:removed,changedExistingContentSinceT1:final.filter(r=>t1Paths.has(r.path)&&t1.find(b=>b.path===r.path).contentSha256!==r.contentSha256).map(r=>r.path)},null,2));

// Copy fresh incidental validator reports above, then preserve the approved T1 checkout copies.
const before=await readJson(path.join(out,'before/file-manifest.json'));
for(const record of before.filter(r=>r.file.startsWith('docs/'))) {
  const backup=path.join(out,'before/files',record.file);
  const current=await fs.readFile(record.file);
  if(createHash('sha256').update(current).digest('hex')!==record.sha256) await fs.copyFile(backup,record.file);
}
await fs.copyFile(path.join(out,'before/files/supabase/functions/mcp/index.ts'),'supabase/functions/mcp/index.ts');
await fs.copyFile(path.join(out,'before/files/outputs/seo-2026-09-16/master-validation.json'),'outputs/seo-2026-09-16/master-validation.json');
const reportFile='outputs/t1/README.md';
let oldReport=await fs.readFile(reportFile,'utf8');
const originalAudit=await readJson('outputs/t1/verification/sitewide-summary.json');
oldReport=oldReport.replace(/- Sitewide audit:.*? Existing six/,`- Sitewide audit: ${originalAudit.errors.length} errors, ${originalAudit.metadataIssues.length} metadata issues, ${originalAudit.duplicateTitles.length} duplicate titles, ${originalAudit.duplicateDescriptions.length} duplicate descriptions, ${originalAudit.duplicateContent.length} duplicate pages, ${originalAudit.brokenLinks.length} broken links and ${originalAudit.brokenFragments.length} broken fragments. Existing six`);
if(!oldReport.includes('T1.1 final factual verification')) oldReport=oldReport.replace('# T1 implementation and verification','# T1 implementation and verification\n\nReadiness and public factual corrections are superseded by [T1.1 final factual verification](../t1.1/README.md). This document records the original T1 implementation.');
await fs.writeFile(reportFile,oldReport);
let generator=await fs.readFile('outputs/t1/finalize-t1-evidence.mjs','utf8');
for(const key of Object.keys(fields)) generator=generator.replaceAll('${audit.'+key+'}','${audit.'+key+'.length}');
await fs.writeFile('outputs/t1/finalize-t1-evidence.mjs',generator);

const scopes=['src','scripts','public','cloudflare','docs','package.json','package-lock.json','vite.config.ts','outputs/t1'];
const files=[...new Set(execFileSync('git',['ls-files','-co','--exclude-standard','-z','--',...scopes],{encoding:'utf8',maxBuffer:32*1024*1024}).split('\0').filter(Boolean))].sort();
const previous=new Map(before.map(r=>[r.file,r.sha256]));
const changed=[];
for(const file of files) { const sha256=createHash('sha256').update(await fs.readFile(file)).digest('hex');if(previous.get(file)!==sha256) changed.push({file,status:previous.has(file)?'modified by T1.1':'created by T1.1',sha256}); }
await fs.writeFile(path.join(out,'changed-workspace-files.json'),JSON.stringify(changed,null,2));
const status=execFileSync('git',['status','--short'],{encoding:'utf8',maxBuffer:1024*1024});
await fs.writeFile(path.join(out,'final-git-status.txt'),status);
const head=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();assert.equal(head,'546e02fb214212e187c159c303fda2354d480ff3');
const staged=execFileSync('git',['diff','--cached','--name-only'],{encoding:'utf8'}).trim();assert.equal(staged,'');
await fs.writeFile(path.join(out,'git-state.json'),JSON.stringify({branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),HEAD:head,stagedFiles:[],committed:false,pushed:false,deployed:false},null,2));
console.log(JSON.stringify({counts,architecture:'passed',changedWorkspaceFiles:changed.map(r=>r.file),head,stagedFiles:0},null,2));
