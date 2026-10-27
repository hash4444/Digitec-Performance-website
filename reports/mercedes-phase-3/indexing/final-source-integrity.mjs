// Offline-only final guard. Run after report/proposal work is complete.
// Writes one local integrity report; never edits source, historical evidence or configuration.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
if(!process.argv.includes('--run-final')){console.log('Prepared only. Run --run-final after Phase3 report/proposal work is complete. No checks or writes performed.');process.exit(0);}
const outRoot=fileURLToPath(new URL('./',import.meta.url));
const hash=b=>createHash('sha256').update(b).digest('hex');
const startedAt=new Date().toISOString();
const rows=[];
async function checkFile(path,expectedSha256,group){try{const bytes=await readFile(resolve(path));rows.push({path,group,expectedSha256,currentSha256:hash(bytes),passed:hash(bytes)===expectedSha256});}catch(e){rows.push({path,group,expectedSha256,passed:false,error:e.message});}}
const protectedBaselinePath='reports/mercedes-phase-2/deployment-2026-10-26/preflight/protected-source-fresh.json';
const sources=JSON.parse(await readFile(resolve(protectedBaselinePath),'utf8'));
await Promise.all(sources.map(s=>checkFile(s.path,s.freshSha256,'protected-source')));
const artifactBaselinePath='reports/mercedes-phase-2/deployment-2026-10-26/preflight/approved-and-evidence-hashes.json';
for(const a of JSON.parse(await readFile(resolve(artifactBaselinePath),'utf8')))await checkFile(a.path,a.sha256,'reviewed-approved-and-evidence');
const phase2aCheckpointManifest='reports/mercedes-phase-2/deployment-2026-10-26/verification/real-capture-sha256.json';
const checkpointManifest=JSON.parse(await readFile(resolve(phase2aCheckpointManifest),'utf8'));
for(const c of checkpointManifest.rawCaptureHashes)await checkFile(c.capturePath,c.captureSha256,'phase2a-http-capture');
await checkFile('cloudflare/single-redirects/mercedes-oil-alias-2026-10-21.json','6b1385fff9d44c206a36cd0e9c38912e9c1b74030f3a534db6bb5efdfa5157c5','protected-october21-rule-definition');
await checkFile('reports/mercedes-phase-2b/http/post-2026-10-26T07-35-12-026Z/capture.json','9fc2b79a2b1d953f0ce1ac1ca7c413a6088a50712810a6f91bbb119908f70d8a','phase2b-full-http-capture');
const r4=checkpointManifest.rawCaptureHashes.find(c=>c.stage==='R4');
const r4Capture=JSON.parse(await readFile(r4.capturePath,'utf8'));
const originalFailure=r4Capture.cases.find(c=>c.key==='source-ar-mechanical-repair-6').chain[0];
await checkFile(resolve(dirname(r4.capturePath),originalFailure.htmlFile),originalFailure.htmlSha256,'original-r4-homepage-body');
const proposalValidation=JSON.parse(await readFile(resolve('reports/mercedes-phase-3/proposals/services/proposal-validation.json'),'utf8'));
const contextValidation=JSON.parse(await readFile(resolve('reports/mercedes-phase-3/proposals/services/context-link-validation.json'),'utf8'));
for(const file of proposalValidation.files)await checkFile(file.path,file.sourceSha256,'phase3-proposed-source-still-unapplied');
await checkFile(contextValidation.sourcePath,contextValidation.sourceSha256,'phase3-proposed-source-still-unapplied');
const gitBefore=await readFile(resolve('reports/mercedes-phase-2/deployment-2026-10-26/preflight/tracked-status-before.txt'),'utf8');
const git=spawnSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8',windowsHide:true});
const normalize=s=>s.replaceAll('\r','').trim();
const gitStatusUnchanged=git.status===0&&normalize(gitBefore)===normalize(git.stdout);
const groups=[...new Set(rows.map(r=>r.group))].map(group=>({group,checked:rows.filter(r=>r.group===group).length,passed:rows.filter(r=>r.group===group&&r.passed).length,failed:rows.filter(r=>r.group===group&&!r.passed).length}));
const report={startedAt,finishedAt:new Date().toISOString(),offlineOnly:true,noNetworkRequests:true,readOnlySourceAndEvidenceChecks:true,protectedBaselinePath,artifactBaselinePath,protectedSourceCountExpected:283,groups,trackedStatus:{baseline:gitBefore,current:git.stdout,exitCode:git.status,unchanged:gitStatusUnchanged,note:'Pre-existing tracked changes are preserved; this check does not claim the workspace was initially clean.'},allPassed:sources.length===283&&rows.every(r=>r.passed)&&gitStatusUnchanged,files:rows,limits:['Local integrity against preserved hashes, not a fresh origin-source export or live Cloudflare configuration check.','Evolving Phase3 collector/report files are deliberately outside immutable historical evidence comparison.','No source application, build, configuration, cache, backend or indexing changes performed.']};
await writeFile(resolve(outRoot,'source-integrity-final.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({allPassed:report.allPassed,groups,trackedStatusUnchanged:gitStatusUnchanged,noNetworkRequests:true},null,2));
if(!report.allPassed)process.exitCode=1;
