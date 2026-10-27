import fs from 'node:fs/promises';
import path from 'node:path';
import {handleRequest as staticRouter} from '../../diagnostics-ac-2026-10-19/candidate.local/cloudflare/digitec-seo-router.js';
import {handleRequest as productionRouter} from '../../diagnostics-ac-2026-10-19/candidate.local/cloudflare/production-seo-router.js';
const out=path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/,'$1');
const selected=JSON.parse(await fs.readFile(path.join(out,'selected-owner-baseline.json'),'utf8'));
const audit=JSON.parse(await fs.readFile(path.join(out,'baseline-owner-audit.json'),'utf8'));
const owner=(path,intent,decision,notes)=>({path,intent,selected:selected.owners.includes(path),decision,notes,...Object.fromEntries(['title','h1','robots','canonical','hreflang','inSitemap','inboundRouteCount','contactForms','faqCount'].map(k=>[k,audit.records.find(r=>r.route===path)?.[k]]))});
const decisions=[
 owner('/services/car-diagnostics-dubai','Generic ECU programming, module coding and diagnostics','Improve existing owner; no new synonym page','Retain completed diagnostic assessment content. Add qualified programming/coding definitions and replacement compatibility enquiry; avoid hardware repair or performance remap claims.'),
 owner('/services/mercedes-diagnostics-dubai','Mercedes ECU programming, module coding, control-unit configuration and TCM programming enquiry','Improve existing owner; no new Mercedes coding route','XENTRY name is an existing business claim, not proof of every function. Vehicle/module/software/access and job acceptance must be confirmed. No immobilizer/security expansion.'),
 owner('/brands/bmw-service-dubai/engine-diagnostics','BMW coding and ECU programming enquiries','Existing assessment owner; cautious integration only if supported','Completed diagnostics owner, not proof of universal coding coverage. Preserve recent diagnostic sprint content; exact requested function must be reviewed.'),
 owner('/services/auto-electrical-repair-dubai','Automotive electrical diagnostics and ECU/module communication faults','Improve existing electrical owner','Supply, ground, wiring and communication diagnosis differs from ECU hardware repair, cloning or programming. Preserve electronics links and business-approved component services.'),
 owner('/services/mercedes-electrical-repair-dubai','Mercedes electrical and SAM-associated communication or circuit symptoms','Existing electrical assessment owner; no SAM hardware repair claim','A SAM name or fault code does not establish internal module failure or supported board repair. Describe symptoms and recent replacements first.'),
 owner('/brands/bmw-service-dubai/electrical-repair','BMW iDrive/electrical and module-communication faults','Improve existing owner with electrical assessment scope','Distinct electrical repair intent; link to diagnostic owner for any coding enquiry. No new hardware ECU repair claim.'),
 owner('/services/mercedes-transmission-repair-dubai','Mercedes gearbox repair and shift-related diagnostic assessment','Preserve supporting repair owner','General TCM programming request should lead to Mercedes diagnostics. No new TCM page or unsupported control-unit hardware repair claim.'),
 owner('/services/head-unit-repair-dubai','Head-unit and supported Mercedes COMAND/MBUX fault assessment','Improve distinct existing electronics owner','English-only. Preserve system identification and parts compatibility qualifications. Do not redirect ECU hardware repair terms here.'),
 owner('/services/cadillac-cue-screen-repair-dubai','Cadillac CUE screen and digitizer repair/replacement','Improve distinct existing electronics owner','English-only. Screen service does not substantiate ECU hardware repair.'),
 owner('/services/mercedes-audio-upgrade-dubai','Mercedes stereo and audio upgrades','Preserve distinct confirmed electronics owner','English-only. Upgrade intent differs from fault diagnosis and module programming.'),
 owner('/tuning','Performance ECU remapping','Preserve separate performance owner','Do not use as the owner for OEM module programming, coding, electronics repair or software updates.')
];
const csv=v=>`"${String(typeof v==='object'?JSON.stringify(v):v??'').replaceAll('"','""')}"`;
const keys=Object.keys(decisions[0]);
await fs.writeFile(path.join(out,'existing-owner-decisions.csv'),[keys,...decisions.map(r=>keys.map(k=>r[k]))].map(row=>row.map(csv).join(',')).join('\n'));
await fs.writeFile(path.join(out,'existing-owner-decisions.json'),JSON.stringify(decisions,null,2));
const aliases=[
 ['/car-programming-diagnostic','/services/car-diagnostics-dubai'],['/services/car-programming-diagnostic','/services/car-diagnostics-dubai'],
 ['/car-diagnostics','/services/car-diagnostics-dubai'],['/services/car-diagnostics','/services/car-diagnostics-dubai'],
 ['/engine-diagnostics','/services/car-diagnostics-dubai'],['/services/engine-diagnostics','/services/car-diagnostics-dubai'],
 ['/engine-diagnostics-dubai','/services/car-diagnostics-dubai'],['/services/engine-diagnostics-dubai','/services/car-diagnostics-dubai'],
 ['/electrical-system-repairs','/services/auto-electrical-repair-dubai'],['/services/electrical-system-repairs','/services/auto-electrical-repair-dubai'],
 ['/auto-electrical-repair','/services/auto-electrical-repair-dubai'],['/services/auto-electrical-repair','/services/auto-electrical-repair-dubai'],
 ['/brands/mercedes-benz-service-dubai/engine-diagnostics','/services/mercedes-diagnostics-dubai'],
 ['/brands/mercedes-benz-service-dubai/electrical-repair','/services/mercedes-electrical-repair-dubai']
].flatMap(([from,to])=>[[from,to],[`/ar${from}`,`/ar${to}`]]);
const responses=[];
for(const [from,to] of aliases){
 const req=new Request('https://digitecme.com'+from+'?source=ecu-audit');
 const staticResponse=await staticRouter(req,{ASSETS:{fetch:async()=>new Response('origin', {status:200})}});
 const liveConfigResponse=await productionRouter(req,async()=>new Response('origin',{status:200,headers:{'content-type':'text/plain'}}));
 responses.push({from,to,staticStatus:staticResponse.status,staticLocation:staticResponse.headers.get('location'),productionConfigStatus:liveConfigResponse.status,productionConfigLocation:liveConfigResponse.headers.get('location'),staticPass:staticResponse.status>=300&&staticResponse.status<400&&staticResponse.headers.get('location')==='https://digitecme.com'+to+'?source=ecu-audit'});
}
await fs.writeFile(path.join(out,'synonym-redirect-map.json'),JSON.stringify({basis:'Local router invocation with stubbed origin only; no deployment or remote route mutation.',rows:responses},null,2));
console.log(JSON.stringify({decisions:decisions.length,aliases:responses.length,staticAliasesPass:responses.every(r=>r.staticPass),productionConfigRedirects:responses.filter(r=>r.productionConfigStatus>=300&&r.productionConfigStatus<400).length}));
