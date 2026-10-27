import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const report=path.resolve(root,'..');
const journeysBytes=await fs.readFile(path.join(report,'browser/passive-journeys.json'));
const journeys=JSON.parse(journeysBytes);
const source=JSON.parse(await fs.readFile(path.join(root,'source-and-build-evidence.json')));
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const map={baseline:'baseline',candidate:'A','release-b':'B'};
const result={generatedAt:new Date().toISOString(),journeysFile:'../browser/passive-journeys.json',journeysSha256:hash(journeysBytes),design:journeys.design,scope:'Only client-timestamped events within the first/last recorded common repeat sequence for each option. Later contact/screenshots excluded.',options:[]};
for(const file of (await fs.readdir(path.join(root,'runs'))).filter(x=>x.endsWith('.ndjson')).sort()){
 const bytes=await fs.readFile(path.join(root,'runs',file));
 const rows=bytes.toString().trim().split('\n').filter(Boolean).map(x=>JSON.parse(x));
 const option=rows[0]?.serverOption;if(!option)continue;
 const label=map[option];
 const sequences=journeys.sequences.filter(x=>x.label===label);
 const steps=journeys.steps.filter(x=>x.label===label);
 if(!sequences.length)continue;
 const start=sequences[0].startedAt,end=sequences.at(-1).finishedAt;
 const inPage=rows.filter(x=>x.type==='browser-event'&&x.event.clientAt>=start&&x.event.clientAt<=end);
 const rawSnapshot=path.join(root,'runs',`${option}-common-journeys.snapshot.json`);
 await fs.writeFile(rawSnapshot,JSON.stringify({capturedAt:result.generatedAt,sourceLog:file,sourceLogSha256AtCapture:hash(bytes),window:{start,end},events:inPage},null,2)+'\n');
 const kinds={};for(const x of inPage)kinds[x.event.kind]=(kinds[x.event.kind]||0)+1;
 const problems=inPage.filter(x=>['window-error','unhandled-rejection','console-error','observe-invalid-target','observe-native-exception'].includes(x.event.kind));
 const csp=inPage.filter(x=>x.event.kind==='csp-block');
 const cspGroups={};for(const x of csp){const k=x.event.detail.directive+' '+x.event.detail.blockedURI;cspGroups[k]=(cspGroups[k]||0)+1;}
 const resources=inPage.filter(x=>x.event.kind==='resource-error');
 const resourceGroups={};for(const x of resources){const k=x.event.detail.target?.src||'(no resource src)';resourceGroups[k]=(resourceGroups[k]||0)+1;}
 const build=source.builds.find(x=>x.label===option);
 const nativeLogs=journeys.fullNativeLogs[label]||[];
 const rounds=sequences.map(seq=>({round:seq.round,start:seq.startedAt,end:seq.finishedAt,stepCount:seq.steps.length,reportedErrors:seq.steps.reduce((n,x)=>n+x.errors,0),nativeErrors:steps.filter(x=>x.round===seq.round).flatMap(x=>x.logs||[]),inPageExceptions:problems.filter(x=>x.event.clientAt>=seq.startedAt&&x.event.clientAt<=seq.finishedAt)}));
 result.options.push({label,option,sourceLog:file,snapshot:path.relative(root,rawSnapshot).replaceAll('\\','/'),window:{start,end},sequences:sequences.length,steps:steps.length,kindCounts:kinds,inPageExceptionCount:problems.length,inPageExceptions:problems,nativeLogCount:nativeLogs.length,nativeLogs,cspCount:csp.length,cspGroups,resourceErrorCount:resources.length,resourceGroups,unexpectedResourceErrors:resources.filter(x=>!/^https:\/\/www\.googletagmanager\.com\/(gtm\.js|gtag\/js)/.test(x.event.detail.target?.src||'')),build:{manifestSha256:build.manifestSha256,entry:build.entry.file,css:build.entry.css,hub:build.brand.file,body:build.body.file},rounds});
}
const zod=path.resolve(root,'../../mercedes-phase-4b/production-matched.local/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/util.js');
const zodBytes=await fs.readFile(zod);
result.evalCspExplanation={package:'zod',version:'4.5.4',file:'v4/core/util.js',sha256:hash(zodBytes),excerpt:zodBytes.toString().split('\n').slice(147,165).map((text,index)=>({line:index+148,text})),classification:'Caught feature detection under the deliberately strict local QA CSP; baseline/A/B each report ten eval CSP events and no uncaught exception.'};
result.totalSequences=result.options.reduce((n,x)=>n+x.sequences,0);result.totalSteps=result.options.reduce((n,x)=>n+x.steps,0);
await fs.writeFile(path.join(root,'passive-journey-analysis.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.options.map(x=>({option:x.option,sequences:x.sequences,steps:x.steps,exceptions:x.inPageExceptionCount,nativeLogs:x.nativeLogCount,csp:x.cspCount,resourceErrors:x.resourceErrorCount,unexpectedResourceErrors:x.unexpectedResourceErrors.length})),null,2));
