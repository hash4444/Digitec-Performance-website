// Offline source/proposal/evidence verification only. Never applies patches or builds.
import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./',import.meta.url));
const hash=b=>createHash('sha256').update(b).digest('hex');
const startedAt=new Date().toISOString();
const baselinePath='reports/mercedes-phase-3/indexing/source-integrity-final.json';
const baseline=JSON.parse(await readFile(resolve(baselinePath),'utf8'));
if(!baseline.allPassed)throw new Error('Final Phase3 integrity baseline was not passing');
const immutable=[];
for(const f of baseline.files){try{const now=hash(await readFile(resolve(f.path)));immutable.push({path:f.path,group:f.group,expectedSha256:f.expectedSha256,currentSha256:now,passed:now===f.expectedSha256});}catch(e){immutable.push({...f,passed:false,error:e.message});}}
const manifestPath='reports/mercedes-phase-3/evidence-manifest.json';
const manifestBytes=await readFile(resolve(manifestPath)),manifest=JSON.parse(manifestBytes);
const reviewedPackage=[];
for(const f of manifest.entries){try{const bytes=await readFile(resolve('reports/mercedes-phase-3',f.path));reviewedPackage.push({path:f.path,expectedSha256:f.sha256,currentSha256:hash(bytes),expectedBytes:f.bytes,currentBytes:bytes.length,passed:f.sha256===hash(bytes)&&f.bytes===bytes.length});}catch(e){reviewedPackage.push({path:f.path,passed:false,error:e.message});}}
const approved=[{ids:['H3-01','H3-02'],path:'reports/mercedes-phase-3/proposals/hub/mercedes-hub-minimal.patch',expectedPaths:['src/pages/BrandPage.tsx']},{ids:['S1'],path:'reports/mercedes-phase-3/proposals/services/mercedes-body-enquiry-minimal.patch',expectedPaths:['src/data/mercedesServiceContent.ts','src/pages/BrandServicePage.tsx']}];
const patchChecks=[];
for(const p of approved){const bytes=await readFile(resolve(p.path)),text=bytes.toString('utf8');const paths=[...text.matchAll(/^\+\+\+ b\/(.+)$/gm)].map(m=>m[1].trim());const applicability=spawnSync('git',['apply','--check','--',p.path],{encoding:'utf8',windowsHide:true});patchChecks.push({...p,sha256:hash(bytes),observedPaths:paths,scopeMatches:isDeepStrictEqual(paths,p.expectedPaths),applyCheckExitCode:applicability.status,stdout:applicability.stdout,stderr:applicability.stderr,passed:isDeepStrictEqual(paths,p.expectedPaths)&&applicability.status===0});}
const git=spawnSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8',windowsHide:true});
const normalize=s=>s.replaceAll('\r','').trim();
const gitStatusUnchanged=git.status===0&&normalize(git.stdout)===normalize(baseline.trackedStatus.current);
const groups=[...new Set(immutable.map(r=>r.group))].map(group=>({group,checked:immutable.filter(r=>r.group===group).length,passed:immutable.filter(r=>r.group===group&&r.passed).length,failed:immutable.filter(r=>r.group===group&&!r.passed).length}));
const report={startedAt,finishedAt:new Date().toISOString(),offlineOnly:true,noSourceApplication:true,noBuild:true,noNetworkRequests:true,noConfigurationMutations:true,authorizedIds:['H3-01','H3-02','S1'],explicitlyExcluded:['S2','production deployment or publication','new redirects or Cloudflare changes','metadata/canonical/schema/indexing changes'],sourceAndFrozenEvidenceBaseline:baselinePath,sourceAndFrozenEvidenceGroups:groups,sourceAndFrozenEvidenceChecks:immutable,phase3Manifest:{path:manifestPath,sha256:hash(manifestBytes),generatedAt:manifest.generatedAtUtc,filesChecked:reviewedPackage.length,unchanged:reviewedPackage.filter(f=>f.passed).length,changed:reviewedPackage.filter(f=>!f.passed),checks:reviewedPackage},approvedPatchChecks:patchChecks,trackedGitStatus:{sameAsPhase3Final:gitStatusUnchanged,current:git.stdout,baseline:baseline.trackedStatus.current},gatePassed:immutable.every(r=>r.passed)&&immutable.filter(r=>r.group==='protected-source').length===283&&reviewedPackage.every(f=>f.passed)&&patchChecks.every(p=>p.passed)&&gitStatusUnchanged,limits:['Checks original workspace and reviewed artifacts. Root owns isolated-copy application/build/preview and must compare only the approved changed paths there.','Original workspace and frozen Phase2/2B evidence remain protected; this does not constitute publication approval or a fresh Cloudflare inventory.']};
await writeFile(resolve(root,'source-proposal-preflight.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({gatePassed:report.gatePassed,sourceAndFrozenEvidenceGroups:groups,reviewedPhase3Files:reviewedPackage.length,reviewedPhase3FilesUnchanged:reviewedPackage.filter(f=>f.passed).length,approvedPatchChecks:patchChecks.map(p=>({ids:p.ids,scopeMatches:p.scopeMatches,applyCheckExitCode:p.applyCheckExitCode})),trackedGitStatusUnchanged:gitStatusUnchanged,failures:[...immutable.filter(r=>!r.passed),...reviewedPackage.filter(r=>!r.passed)]},null,2));
if(!report.gatePassed)process.exitCode=1;
