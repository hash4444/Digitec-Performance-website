// Offline Phase 4C guard. Reads older evidence/source/dependencies; writes only this directory.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(out,'../../..');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),portable=p=>path.relative(root,p).replaceAll('\\','/');
const cache=new Map();
async function info(file){if(!cache.has(file)){try{const bytes=await fs.readFile(file);cache.set(file,{sha256:sha(bytes),bytes:bytes.length});}catch(error){cache.set(file,{error:error.code||error.message});}}return cache.get(file);}
async function input(file){const absolute=path.resolve(root,file),bytes=await fs.readFile(absolute);return {file,sha256:sha(bytes),data:JSON.parse(bytes)};}
function safe(base,file){const absolute=path.resolve(base,file),relative=path.relative(base,absolute);if(!relative||relative==='..'||relative.startsWith('..'+path.sep)||path.isAbsolute(relative))throw new Error('Unsafe manifest path '+file);return absolute;}
async function check(file,expectedSha256,expectedBytes){const current=await info(file);return {file:portable(file),expectedSha256,currentSha256:current.sha256,expectedBytes,currentBytes:current.bytes,error:current.error,passed:!current.error&&current.sha256===expectedSha256&&(expectedBytes===undefined||current.bytes===expectedBytes)};}
const startedAt=new Date().toISOString();
const fresh=await input('reports/mercedes-phase-4b/fresh-input-manifest.json');
const p4b=await input('reports/mercedes-phase-4b/evidence-manifest.json');
const p4=await input('reports/mercedes-phase-4/evidence-manifest.json');
const p3=await input('reports/mercedes-phase-3/evidence-manifest.json');
const gate=await input('reports/mercedes-phase-4/preflight/source-proposal-preflight.json');
const deps=await input('reports/mercedes-phase-4b/production-matched-provenance.json');
const previous=await input('reports/mercedes-phase-4b/review/final-preservation.json');
const groups={rootInputs:[],phase4bEvidence:[],phase4Evidence:[],phase3Evidence:[],historicalSourceAndProtection:[],pnpmLocks:[],preExistingDirtyFiles:[]};
for(const row of fresh.data.inputs)groups.rootInputs.push(await check(safe(root,row.file),row.sha256));
for(const row of p4b.data.files)groups.phase4bEvidence.push(await check(safe(path.resolve(root,'reports/mercedes-phase-4b'),row.file),row.sha256,row.bytes));
for(const row of p4.data.entries)groups.phase4Evidence.push(await check(safe(path.resolve(root,'reports/mercedes-phase-4'),row.path),row.sha256,row.bytes));
for(const row of p3.data.entries)groups.phase3Evidence.push(await check(safe(path.resolve(root,'reports/mercedes-phase-3'),row.path),row.sha256,row.bytes));
for(const row of gate.data.sourceAndFrozenEvidenceChecks)groups.historicalSourceAndProtection.push(await check(safe(root,row.path),row.expectedSha256));
const expectedLock='5764ae30d5b03c0bfbf425768df32c23646b88720d2062988c6b04b868dd085f';
for(const file of ['node_modules/.pnpm/lock.yaml','reports/mercedes-phase-4b/production-matched.local/pnpm-lock.yaml'])groups.pnpmLocks.push(await check(path.resolve(root,file),expectedLock));
for(const row of previous.data.preExistingDirtyFiles)groups.preExistingDirtyFiles.push(await check(path.resolve(root,row.file),row.currentSha256,row.currentBytes));
const versions=[];
for(const row of deps.data.directDependencies){
 let sharedVersion,frozenVersion,error;
 try{sharedVersion=JSON.parse(await fs.readFile(path.resolve(root,'node_modules',row.name,'package.json'))).version;frozenVersion=JSON.parse(await fs.readFile(path.resolve(root,'reports/mercedes-phase-4b/production-matched.local/node_modules',row.name,'package.json'))).version;}catch(e){error=e.code||e.message;}
 versions.push({name:row.name,expectedSharedVersion:row.sharedVersion,sharedVersion,expectedFrozenVersion:row.frozenVersion,frozenVersion,error,passed:!error&&sharedVersion===row.sharedVersion&&frozenVersion===row.frozenVersion});
}
const declared=JSON.parse(await fs.readFile(path.resolve(root,'package.json'))),declaredNames=Object.keys({...declared.dependencies,...declared.devDependencies}).sort(),savedNames=deps.data.directDependencies.map(x=>x.name).sort();
const dependencySetUnchanged=JSON.stringify(declaredNames)===JSON.stringify(savedNames);
const git=spawnSync('git',['status','--porcelain','--untracked-files=no'],{cwd:root,encoding:'utf8',windowsHide:true,env:{...process.env,GIT_OPTIONAL_LOCKS:'0'}}),normalize=s=>s.replaceAll('\r','').trim();
const gitStatusUnchanged=git.status===0&&normalize(git.stdout)===normalize(gate.data.trackedGitStatus.current);
const head=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8',windowsHide:true,env:{...process.env,GIT_OPTIONAL_LOCKS:'0'}});
const summary=Object.fromEntries(Object.entries(groups).map(([key,rows])=>[key,{checked:rows.length,unchanged:rows.filter(x=>x.passed).length,changedOrMissing:rows.filter(x=>!x.passed).length}]));
const expectedCounts={rootInputs:665,phase4bEvidence:1309,phase4Evidence:1869,phase3Evidence:793,historicalSourceAndProtection:303,pnpmLocks:2,preExistingDirtyFiles:2};
const allPassed=Object.entries(expectedCounts).every(([key,count])=>groups[key].length===count)&&Object.values(groups).flat().every(x=>x.passed)&&versions.length===69&&versions.every(x=>x.passed)&&dependencySetUnchanged&&gitStatusUnchanged&&head.status===0&&head.stdout.trim()==='13d1c19e99e9696ab63e5721ada18ffcfce11519';
const result={startedAt,finishedAt:new Date().toISOString(),offlineOnly:true,networkRequests:0,buildsRun:0,sourceEdits:0,priorEvidenceWrites:0,allPassed,summary,directDependencies:{checked:versions.length,unchanged:versions.filter(x=>x.passed).length,declaredSetUnchanged:dependencySetUnchanged},trackedGitStatus:{expected:gate.data.trackedGitStatus.current,current:git.stdout,unchanged:gitStatusUnchanged},head:{current:head.stdout.trim(),expected:'13d1c19e99e9696ab63e5721ada18ffcfce11519'},inputs:[fresh,p4b,p4,p3,gate,deps,previous].map(({data,...x})=>x),groups,versions,limitations:['Verifies all named historical manifest entries; does not recursively fingerprint every dependency/transitive byte or cache file.','Dependency manifests, both pnpm locks and all 69 direct installed versions are unchanged; deployed host dependencies are a separate investigation.','The two pre-existing dirty files are compared with their recorded Phase4B guard hashes, not claimed equal to a clean Git checkout.','This guard writes only browser-support/preservation.json and authorizes no release or live configuration change.']};
await fs.writeFile(path.join(out,'preservation.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({allPassed,summary,directDependencies:result.directDependencies,gitStatusUnchanged,head:result.head,failures:Object.values(groups).flat().filter(x=>!x.passed)},null,2));if(!allPassed)process.exitCode=1;
