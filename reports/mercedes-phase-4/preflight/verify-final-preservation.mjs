// Final offline preservation check. Reads the shared original checkout only.
// No source edits, patch application, build, network or previous-report writes.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {resolve,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=fileURLToPath(new URL('./',import.meta.url));
const sha=b=>createHash('sha256').update(b).digest('hex');
const startedAt=new Date().toISOString();
const originalManifestPath=resolve('reports/mercedes-phase-4/original-input-manifest.json');
const originalManifestBytes=await readFile(originalManifestPath);
const original=JSON.parse(originalManifestBytes);
const originalRoot=resolve(original.root);
const sourceGatePath=resolve('reports/mercedes-phase-4/preflight/source-proposal-preflight.json');
const gateBytes=await readFile(sourceGatePath),gate=JSON.parse(gateBytes);
if(!gate.gatePassed)throw new Error('Initial source/proposal gate did not pass');
async function hashRow(path,expectedSha256,extra={}){try{const bytes=await readFile(resolve(path));return {path,...extra,expectedSha256,currentSha256:sha(bytes),bytes:bytes.length,passed:sha(bytes)===expectedSha256};}catch(e){return {path,...extra,expectedSha256,passed:false,error:e.message};}}
const originalChecks=[];
for(const f of original.files){const path=resolve(originalRoot,f.file),rel=relative(originalRoot,path);if(rel.startsWith('..'+sep)||rel==='..'||resolve(path)===originalRoot)throw new Error('Original input manifest path escapes its stated checkout');originalChecks.push(await hashRow(path,f.sha256,{file:f.file}));}
const historicalChecks=[];
for(const f of gate.sourceAndFrozenEvidenceChecks)historicalChecks.push(await hashRow(f.path,f.expectedSha256,{group:f.group}));
const phase3Checks=[];
for(const f of gate.phase3Manifest.checks){const row=await hashRow(resolve('reports/mercedes-phase-3',f.path),f.expectedSha256,{file:f.path,expectedBytes:f.expectedBytes});row.passed=row.passed&&row.bytes===f.expectedBytes;phase3Checks.push(row);}
const phase3ManifestCheck=await hashRow(gate.phase3Manifest.path,gate.phase3Manifest.sha256);
const git=spawnSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8',windowsHide:true});
const normalize=s=>s.replaceAll('\r','').trim();
const gitStatusUnchanged=git.status===0&&normalize(git.stdout)===normalize(gate.trackedGitStatus.current);
const summarize=rows=>({checked:rows.length,unchanged:rows.filter(r=>r.passed).length,changedOrMissing:rows.filter(r=>!r.passed).length});
const groups=[...new Set(historicalChecks.map(r=>r.group))].map(group=>({group,...summarize(historicalChecks.filter(r=>r.group===group))}));
const allPassed=originalChecks.length===665&&originalChecks.every(r=>r.passed)&&phase3Checks.length===793&&phase3Checks.every(r=>r.passed)&&historicalChecks.length===303&&historicalChecks.every(r=>r.passed)&&phase3ManifestCheck.passed&&gitStatusUnchanged;
const report={startedAt,finishedAt:new Date().toISOString(),offlineOnly:true,noNetworkRequests:true,noSourceEdits:true,noBuild:true,noPatchApplication:true,originalCheckoutRoot:originalRoot,originalInputManifest:{path:originalManifestPath,capturedAt:original.capturedAt,sha256:sha(originalManifestBytes),...summarize(originalChecks)},initialPreflight:{path:sourceGatePath,sha256:sha(gateBytes),gatePassed:gate.gatePassed},reviewedPhase3Artifacts:{...summarize(phase3Checks),manifestFileUnchanged:phase3ManifestCheck.passed,manifestCheck:phase3ManifestCheck},protectedAndHistoricalEvidence:{...summarize(historicalChecks),groups},trackedStatus:{unchanged:gitStatusUnchanged,baseline:gate.trackedGitStatus.current,current:git.stdout,exitCode:git.status},allPassed,originalCheckoutFiles:originalChecks,reviewedPhase3Files:phase3Checks,protectedAndHistoricalFiles:historicalChecks,limits:['Verifies preservation of the shared original checkout and frozen evidence; root separately validates exact scope and behavior of the controlled implementation copy.','This check does not rerun build/type/SSR/browser tests and does not publish or inspect production configuration.','The two pre-existing tracked changes are preserved; the original checkout is not represented as initially clean.']};
await writeFile(resolve(here,'final-preservation.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({allPassed,originalCheckout:report.originalInputManifest,reviewedPhase3Artifacts:summarize(phase3Checks),phase3ManifestFileUnchanged:phase3ManifestCheck.passed,protectedAndHistoricalEvidence:report.protectedAndHistoricalEvidence,trackedStatusUnchanged:gitStatusUnchanged,failures:[...originalChecks,...phase3Checks,...historicalChecks,phase3ManifestCheck].filter(r=>!r.passed)},null,2));
if(!allPassed)process.exitCode=1;
