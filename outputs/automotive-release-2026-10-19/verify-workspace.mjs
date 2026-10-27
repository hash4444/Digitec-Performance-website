import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const out='outputs/automotive-release-2026-10-19';
const baseline=JSON.parse(await readFile(`${out}/baseline/workspace-manifest.json`,'utf8'));
const mismatches=[];
const sha=b=>createHash('sha256').update(b).digest('hex');
for(const record of baseline.files){try{const actual=sha(await readFile(record.file));if(actual!==record.sha256)mismatches.push({file:record.file,expected:record.sha256,actual});}catch(error){mismatches.push({file:record.file,error:error.code});}}
const git=(args)=>{const r=spawnSync('git',args,{windowsHide:true,maxBuffer:64*1024*1024});if(r.status!==0)throw Error('Git read failed');return r.stdout.toString();};
const current=git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean).filter(file=>!file.startsWith(out+'/'));
const before=new Set(baseline.files.map(r=>r.file));
const added=current.filter(file=>!before.has(file));
const branch=git(['branch','--show-current']).trim(),head=git(['rev-parse','HEAD']).trim();
const report={checkedAt:new Date().toISOString(),baselineFiles:baseline.files.length,mismatches,unexpectedAdded:added,branch,head,branchPreserved:branch===baseline.branch,headPreserved:head===baseline.base,passed:mismatches.length===0&&added.length===0&&branch===baseline.branch&&head===baseline.base};
await writeFile(`${out}/workspace-preservation.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
