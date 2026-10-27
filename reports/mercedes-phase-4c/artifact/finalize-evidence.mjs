// Freeze only this agent's Phase4C report folders; never modifies prior evidence.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),phase=path.dirname(here),manifestFile=path.join(here,'evidence-manifest.json'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const rows=[],jsonChecks=[];async function walk(dir){for(const e of(await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const full=path.join(dir,e.name);if(full===manifestFile)continue;if(e.isDirectory())await walk(full);else if(e.isFile()){const bytes=await fs.readFile(full);rows.push({file:path.relative(phase,full).replaceAll('\\','/'),bytes:bytes.length,sha256:sha(bytes)});if(e.name.endsWith('.json')){try{JSON.parse(bytes.toString().replace(/^\uFEFF/,''));jsonChecks.push({file:path.relative(phase,full).replaceAll('\\','/'),passed:true});}catch(error){jsonChecks.push({file:full,passed:false,error:error.message});}}}else throw Error('Unsupported report entry '+full);}}
await walk(here);await walk(path.join(phase,'production'));
const report={at:new Date().toISOString(),scope:['artifact/','production/'],readOnlyInputs:true,productionMutations:0,fileCount:rows.length,jsonCount:jsonChecks.length,jsonValid:jsonChecks.every(r=>r.passed),jsonChecks,files:rows};await fs.writeFile(manifestFile,JSON.stringify(report,null,2));console.log(JSON.stringify({fileCount:report.fileCount,jsonCount:report.jsonCount,jsonValid:report.jsonValid}));if(!report.jsonValid)process.exitCode=1;
