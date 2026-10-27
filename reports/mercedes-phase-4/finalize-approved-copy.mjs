import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const report=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(report,'../..');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(await fs.readFile(path.join(report,'original-input-manifest.json'),'utf8'));
const approved=[
 ['src/pages/BrandPage.tsx','proposals/hub/proposed/BrandPage.tsx','fed34d81d52c879960d90eb38db91e31d9290ceb7b9895a222a2d075feb13bc2'],
 ['src/data/mercedesServiceContent.ts','proposals/services/proposed/src/data/mercedesServiceContent.ts','bd941c4c6e03c43501e32f304fea8df5de07941b93be3598b1d07431eb91b339'],
 ['src/pages/BrandServicePage.tsx','proposals/services/proposed/src/pages/BrandServicePage.tsx','38bca41fbfd9d7fba3a5ce9701791facc77d1fc0a7a67806903f71e7a096512c']
];
const lineEndings=[];
for(const[file,proposal,expected]of approved){
 const candidate=path.join(report,'candidate.local',file);
 const actual=await fs.readFile(candidate);
 const reviewed=await fs.readFile(path.join(root,'reports/mercedes-phase-3',proposal));
 if(sha(reviewed)!==expected)throw new Error('Reviewed proposed bytes changed: '+file);
 if(actual.toString('utf8').replace(/\r\n/g,'\n')!==reviewed.toString('utf8').replace(/\r\n/g,'\n'))throw new Error('Unapproved text difference: '+file);
 lineEndings.push({file,afterGitApplySha256:sha(actual),reviewedSha256:expected,onlyLineEndingDifference:sha(actual)!==expected});
 // Git auto-CRLF can choose different bytes. Retain the exact reviewed proposed file.
 if(sha(actual)!==expected)await fs.writeFile(candidate,reviewed);
}
const changes=[];
for(const record of manifest.files){
 const original=sha(await fs.readFile(path.join(root,record.file)));
 if(original!==record.sha256)throw new Error('Shared checkout changed: '+record.file);
 if(sha(await fs.readFile(path.join(report,'baseline.local',record.file)))!==record.sha256)throw new Error('Baseline changed: '+record.file);
 const after=sha(await fs.readFile(path.join(report,'candidate.local',record.file)));
 if(after!==record.sha256)changes.push({file:record.file,before:record.sha256,after});
}
if(changes.length!==3||changes.some(x=>!approved.some(([file,,expected])=>file===x.file&&expected===x.after)))throw new Error('Unapproved changed files');
const result={preparedAt:new Date().toISOString(),isolatedCopies:['baseline.local','candidate.local'],filesPerSnapshot:manifest.files.length,approvedChanges:changes,lineEndingAlignment:lineEndings,sourceFilesChangedInOriginal:0,environmentFilesCopied:false,dependencies:'Installed ancestor dependencies, no install/update/junction',passed:true};
await fs.writeFile(path.join(report,'controlled-copy.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
