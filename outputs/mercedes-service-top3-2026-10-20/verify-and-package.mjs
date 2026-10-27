import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const root=process.cwd(),out=path.resolve('outputs/mercedes-service-top3-2026-10-20');
const sha=b=>createHash('sha256').update(b).digest('hex');
const git=args=>{const r=spawnSync('git',args,{windowsHide:true,maxBuffer:32*1024*1024});if(r.status!==0)throw Error(r.stderr.toString());return r.stdout.toString().trim();};
const baseline=JSON.parse(await fs.readFile(path.join(out,'baseline/workspace-manifest.json'),'utf8'));
const modified=['src/pages/BrandPage.tsx','src/pages/Services.tsx','src/components/MercedesMaintenanceScope.tsx','src/lib/route-manifest.ts'];
const added=['src/components/MercedesServiceBookingForm.tsx','src/data/mercedesServiceCampaign.ts'];
const allowed=new Set([...modified,...added]);const records=[];const unexpected=[];let unchanged=0;
for(const record of baseline.files){
  let data;try{data=await fs.readFile(record.file);}catch{unexpected.push({file:record.file,error:'Missing preserved file'});continue;}
  const current=sha(data);
  if(current===record.sha256)unchanged++;
  else if(modified.includes(record.file))records.push({file:record.file,status:'modified',beforeSha256:record.sha256,afterSha256:current,bytes:data.length});
  else unexpected.push({file:record.file,error:'Unrelated bytes changed',before:record.sha256,after:current});
}
for(const file of added){const data=await fs.readFile(file);records.push({file,status:'new',beforeSha256:null,afterSha256:sha(data),bytes:data.length});}
const beforeSet=new Set(baseline.files.map(x=>x.file));
for(const file of git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean))if(!file.startsWith('outputs/mercedes-service-top3-2026-10-20/')&&!beforeSet.has(file)&&!added.includes(file))unexpected.push({file,error:'Unexpected file outside output directory'});
if(git(['rev-parse','HEAD'])!==baseline.base)unexpected.push({error:'HEAD changed'});
if(git(['branch','--show-current'])!==baseline.branch)unexpected.push({error:'Branch changed'});
if(git(['diff','--cached','--name-only']))unexpected.push({error:'Git index changed'});
const frozen=JSON.parse(await fs.readFile(path.join(out,'qa/frozen-overlay.json'),'utf8'));
for(const record of records){const freeze=frozen.files.find(x=>x.file===record.file);if(!freeze||freeze.sha256!==record.afterSha256)unexpected.push({file:record.file,error:'Does not match frozen QA overlay'});}
const manifest={checkedAt:new Date().toISOString(),campaignDateDubai:'2026-10-20',base:baseline.base,branch:baseline.branch,files:records,sourceFiles:records.length,newRoutes:0,committed:false,pushed:false,deployed:false,published:false};
await fs.writeFile(path.join(out,'modified-files.json'),JSON.stringify(manifest,null,2));
const integrity={checkedAt:new Date().toISOString(),passed:unexpected.length===0,baselineFileCount:baseline.files.length,byteIdenticalUnrelatedFiles:unchanged,expectedModified:modified,expectedAdded:added,unexpected,head:git(['rev-parse','HEAD']),indexEmpty:!git(['diff','--cached','--name-only'])};
await fs.writeFile(path.join(out,'preservation-and-integrity.json'),JSON.stringify(integrity,null,2));
if(unexpected.length)throw Error('Preservation check failed: '+JSON.stringify(unexpected));
console.log(JSON.stringify({passed:true,modifiedFiles:records.length,preservedFiles:unchanged,base:baseline.base}));
