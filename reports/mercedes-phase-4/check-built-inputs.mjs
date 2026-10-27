import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const report=path.dirname(fileURLToPath(import.meta.url));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const original=JSON.parse(await fs.readFile(path.join(report,'original-input-manifest.json'),'utf8'));
const comparison={checkedAtUtc:new Date().toISOString(),originalInputCount:original.files.length,copies:{}};
for(const name of ['baseline','candidate']){
 const changed=[];
 for(const r of original.files){const actual=sha(await fs.readFile(path.join(report,name+'.local',r.file)));if(actual!==r.sha256)changed.push({file:r.file,before:r.sha256,after:actual});}
 comparison.copies[name]={compared:original.files.length,changed};
}
const expected=['src/data/mercedesServiceContent.ts','src/pages/BrandPage.tsx','src/pages/BrandServicePage.tsx'];
comparison.passed=comparison.copies.baseline.changed.length===0&&JSON.stringify(comparison.copies.candidate.changed.map(x=>x.file).sort())===JSON.stringify(expected);
await fs.writeFile(path.join(report,'built-input-comparison.json'),JSON.stringify(comparison,null,2));
const entries=[];
const dist=path.join(report,'candidate.local/dist');
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())await walk(f);else if(e.isFile()){const b=await fs.readFile(f);entries.push({file:path.relative(dist,f).split(path.sep).join('/'),bytes:b.length,sha256:sha(b)});}}}
await walk(dist);entries.sort((a,b)=>a.file.localeCompare(b.file));
await fs.writeFile(path.join(report,'candidate-dist-manifest.json'),JSON.stringify({capturedAtUtc:new Date().toISOString(),path:dist,published:false,qaInstrumentationIncluded:false,files:entries},null,2));
console.log(JSON.stringify({comparison,distFiles:entries.length},null,2));
if(!comparison.passed)process.exitCode=1;
