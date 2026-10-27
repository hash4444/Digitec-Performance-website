import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const out='outputs/diagnostics-ac-2026-10-19/audit';
const selected=['/services/car-diagnostics-dubai','/services/car-ac-repair-dubai','/brands/bmw-service-dubai/engine-diagnostics','/brands/porsche-service-dubai/engine-diagnostics','/services/mercedes-ac-repair-dubai','/brands/bmw-service-dubai/ac-repair','/brands/volkswagen-service-dubai/ac-repair','/brands/range-rover-service-dubai/ac-repair'];
const audit=JSON.parse(await fs.readFile(`${out}/baseline-owner-audit.json`,'utf8'));
await fs.mkdir(`${out}/selected-baseline-html`,{recursive:true});
const records=[];
for(const base of selected)for(const route of [base,`/ar${base}`]){
 const from=path.join(audit.dist,route.slice(1),'index.html');
 const dest=`${out}/selected-baseline-html/${route.slice(1).replaceAll('/','__')}.html`;
 const bytes=await fs.readFile(from);await fs.writeFile(dest,bytes);
 const record=audit.records.find(r=>r.route===route);
 records.push({...record,snapshotPath:path.resolve(dest),snapshotSha256:createHash('sha256').update(bytes).digest('hex')});
}
await fs.writeFile(`${out}/selected-owner-baseline.json`,JSON.stringify({capturedAt:new Date().toISOString(),basis:audit.basis,owners:selected,records},null,2));
console.log(JSON.stringify({owners:selected.length,locales:records.length,allIndexable:records.every(r=>!r.robots.some(x=>x.includes('noindex'))),allSitemap:records.every(r=>r.inSitemap),allSelfCanonical:records.every(r=>r.canonical.length===1&&r.canonical[0]===`https://digitecme.com${r.route}`),allFaqCrawlable:records.every(r=>r.faqAnswersCrawlable)},null,2));
