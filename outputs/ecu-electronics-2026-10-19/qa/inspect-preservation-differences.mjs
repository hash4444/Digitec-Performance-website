import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('outputs/ecu-electronics-2026-10-19/qa');
const baseline=JSON.parse(await fs.readFile(path.join(out,'../audit/selected-owner-baseline.json'),'utf8'));
const strip=html=>html.replace(/<section\b[^>]*data-ecu-electronics-enquiry=["'][^"']+["'][^>]*>[\s\S]*?<\/section>/gi,'');
const clean=html=>(html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]??html.match(/<div id="root">[\s\S]*<\/div>/i)?.[0]??html).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/radix-:[A-Za-z0-9]+:/g,'radix:<generated>').replace(/\s+/g,' ').trim();
const records=[];
for(const r of baseline.records){const before=clean(await fs.readFile(r.snapshotPath,'utf8'));const after=clean(strip(await fs.readFile(path.join(out,'../candidate.local/dist',r.route.slice(1),'index.html'),'utf8')));let at=0;while(at<Math.min(before.length,after.length)&&before[at]===after[at])at++;records.push({route:r.route,beforeLength:before.length,afterLength:after.length,at,before:before.slice(Math.max(0,at-100),at+300),after:after.slice(Math.max(0,at-100),at+300)});}
await fs.writeFile(path.join(out,'first-visible-differences.json'),JSON.stringify(records,null,2));console.log(JSON.stringify(records.slice(0,5),null,2));
