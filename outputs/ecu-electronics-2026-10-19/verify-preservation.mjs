import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const out='outputs/ecu-electronics-2026-10-19';
const json=async name=>JSON.parse(await readFile(`${out}/${name}`,'utf8'));
const baseline=await json('baseline/workspace-manifest.json'),scope=await json('modified-files.json'),plan=await json('candidate-plan.json');
const selected=new Map(scope.files.map(file=>[file.file,file]));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const errors=[];let unchanged=0, intentional=0;
for(const file of baseline.files){try{const actual=sha(await readFile(file.file)),expected=selected.get(file.file)?.afterSha256??file.sha256;if(actual!==expected)errors.push({file:file.file,expected,actual});else if(selected.has(file.file))intentional++;else unchanged++;}catch(error){errors.push({file:file.file,error:error.code});}}
for(const file of scope.files){for(const target of [file.file,`${plan.candidate}/${file.file}`]){const actual=sha(await readFile(target));if(actual!==file.afterSha256)errors.push({file:target,expected:file.afterSha256,actual});}}
const prior=await json('baseline/prior-work-manifest.json');
const unchangedPrior=[];for(const file of prior.files){if(selected.has(file.file))continue;const actual=sha(await readFile(file.file));if(actual!==file.afterSha256)errors.push({file:file.file,group:'prior-work',expected:file.afterSha256,actual});else unchangedPrior.push(file.file);}
const build=JSON.parse(await readFile(`${plan.candidate}/release-qa.local/build-results.json`,'utf8')),inputs=JSON.parse(await readFile(`${plan.candidate}/release-qa.local/source-manifest.json`,'utf8'));
for(const file of inputs){const actual=sha(await readFile(`${plan.candidate}/${file.file}`));if(actual!==file.sha256)errors.push({file:file.file,group:'build-input',expected:file.sha256,actual});}
const fingerprint=sha(Buffer.from(JSON.stringify(inputs)));if(!build.passed||fingerprint!==build.sourceSha256)errors.push({group:'build-proof'});
const pkg=await json('source-package-manifest.json');for(const bundle of [pkg.newSprint,pkg.cumulativePendingWork])if(sha(await readFile(`${out}/${bundle.archive}`))!==bundle.archiveSha256)errors.push({group:'package',archive:bundle.archive});
const review=await json('content/integration-review.json');if(!review.passed||!review.pageChecks.every(item=>item.allRemainingSourceEqualsPriorSprint))errors.push({group:'prior-template-review'});
for(const file of review.sourceFiles){if(sha(await readFile(file.file))!==file.sha256)errors.push({group:'reviewed-source',file:file.file});}
const git=args=>{const r=spawnSync('git',args,{windowsHide:true,maxBuffer:64*1024*1024});if(r.status!==0)throw Error('Git read failed');return r.stdout.toString().trim();};
const branch=git(['branch','--show-current']),head=git(['rev-parse','HEAD']),staged=git(['diff','--cached','--name-only']);
const original=new Set(baseline.files.map(file=>file.file));const added=git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean).filter(file=>!file.startsWith(out+'/')&&!original.has(file));
const unexpectedAdded=added.filter(file=>!selected.has(file));if(branch!==baseline.branch||head!==baseline.base||staged||unexpectedAdded.length)errors.push({group:'git',branch,head,staged,unexpectedAdded});
const report={checkedAt:new Date().toISOString(),passed:errors.length===0,base:baseline.base,branch,head,originalFiles:baseline.files.length,byteIdenticalUnrelatedFiles:unchanged,intentionallyModifiedExistingFiles:intentional,approvedNewFiles:scope.files.filter(file=>file.change==='added').map(file=>file.file),unchangedPriorWorkFiles:unchangedPrior,priorTemplatesExtendedOnly:review.passed&&review.pageChecks.every(item=>item.allRemainingSourceEqualsPriorSprint),stagedFiles:staged?staged.split('\n'):[],unexpectedAdded,candidateBuildInputs:inputs.length,sourceSha256:fingerprint,cumulativePendingSourceFiles:pkg.cumulativePendingWork.files.length,errors};
await writeFile(`${out}/preservation-and-integrity.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
