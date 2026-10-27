// Apply only the exact reviewed Option B files, with byte guards.
import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import{fileURLToPath}from'node:url';
const report=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(report,'../..');const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const rows=JSON.parse(await fs.readFile(path.join(root,'reports/mercedes-phase-4b/options/B/source-changes.json'),'utf8'));
const verified=[];for(const row of rows){const before=await fs.readFile(path.join(root,row.file)),after=await fs.readFile(path.join(root,'reports/mercedes-phase-4b/production-matched.local/release-b.local',row.file));if(hash(before)!==row.beforeSha256||hash(after)!==row.afterSha256)throw Error('Reviewed context/hash mismatch: '+row.file);verified.push({...row,before,after});}
if(verified.length!==4)throw Error('Wrong source scope');
for(const row of verified)await fs.writeFile(path.join(root,row.file),row.after);
const record={appliedAt:new Date().toISOString(),authorization:'User requested push to main and clarified reviewed Mercedes changes plus public-safe summaries; production publication remains unauthorized',files:verified.map(({before,after,...r})=>r),unrelatedFilesModified:0,productionChanges:0};await fs.writeFile(path.join(report,'source-application.json'),JSON.stringify(record,null,2));console.log(JSON.stringify({applied:verified.length,files:verified.map(x=>x.file),allHashesMatch:true}));
