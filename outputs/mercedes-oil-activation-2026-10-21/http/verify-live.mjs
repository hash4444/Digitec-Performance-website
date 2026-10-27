import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const out=path.dirname(fileURLToPath(import.meta.url));
const mode=process.argv[2]||'preflight';
if(!['preflight','post'].includes(mode)) throw new Error('Use preflight or post');
await mkdir(out,{recursive:true});
await mkdir(path.join(out,`${mode}-raw`),{recursive:true});
const startedAt=new Date().toISOString();
const clean=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const semanticMain=body=>clean(body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'');
const prior=mode==='post'?JSON.parse(await readFile(path.join(out,'preflight-results.json'),'utf8')):null;
const protectedBaseline=new Map();
if(prior){
 if(!prior.passed)throw new Error('No passing HTTP preflight baseline');
 for(const r of prior.records.filter(r=>r.kind==='protected'&&r.method==='GET')){
  const h=r.hops.at(-1); const body=await readFile(path.join(out,h.rawFile),'utf8');
  protectedBaseline.set(r.input,{title:h.title,h1:h.h1,canonical:h.canonical,robots:h.robots,mainTextSha256:createHash('sha256').update(semanticMain(body)).digest('hex')});
 }
}
const pick=r=>Object.fromEntries(['location','content-type','server','cf-ray','cf-cache-status','cache-control','x-robots-tag','x-deployment-id','content-length'].map(k=>[k,r.headers.get(k)]).filter(([,v])=>v!==null));
const owner='https://digitecme.com/services/mercedes-oil-change-dubai';
const aliases=['/brands/mercedes-benz-service-dubai/oil-change','/brands/mercedes-benz-service-dubai/oil-change/'];
const protectedPaths=[
 ['/services/mercedes-oil-change-dubai',owner],
 ['/services/mercedes-oil-change-dubai/',owner],
 ['/brands/mercedes-benz-service-dubai','https://digitecme.com/brands/mercedes-benz-service-dubai'],
 ['/services/oil-change-dubai','https://digitecme.com/services/oil-change-dubai'],
 ['/blog/best-oil-change-dubai-mercedes','https://digitecme.com/blog/best-oil-change-dubai-mercedes'],
 ['/services/mercedes-diagnostics-dubai','https://digitecme.com/services/mercedes-diagnostics-dubai'],
 ['/services/paint-protection-film','https://digitecme.com/services/paint-protection-film'],
 ['/tuning','https://digitecme.com/tuning'],
];
const existingAliases=['/services/mercedes-repair-dubai','/services/mercedes-repair-dubai/','/services/mercedes-service-dubai','/best-mercedes-workshop-dubai'];
const queries=mode==='post'?['','?utm_source=activation-qa&tag=a&tag=b&gclid=synthetic-test','?text=a%20b&plus=a+b&encoded=%2F%3F%26%3D&empty=&flag&esc=%25']:['?utm_source=activation-preflight&tag=a&tag=b&gclid=synthetic-test'];
const cases=[];
for(const p of aliases)for(const host of mode==='post'?['digitecme.com','www.digitecme.com']:['digitecme.com'])for(const scheme of mode==='post'?['http','https']:['https'])for(const method of ['GET','HEAD'])for(const q of queries)cases.push({kind:'legacy',input:`${scheme}://${host}${p}${q}`,method});
for(const [p,canonical]of protectedPaths)for(const method of ['GET','HEAD'])cases.push({kind:'protected',input:`https://digitecme.com${p}`,method,expectedCanonical:canonical});
for(const p of existingAliases)for(const method of ['GET','HEAD'])cases.push({kind:'existing-alias',input:`https://digitecme.com${p}?tag=a&tag=b&gclid=synthetic-test`,method});
async function capture(c,index){
 let url=c.input; const hops=[];const seen=new Set();
 for(let n=0;n<5;n++){
  if(seen.has(url))return{...c,index,hops,error:'Redirect loop'};seen.add(url);
  const r=await fetch(url,{method:c.method,redirect:'manual',signal:AbortSignal.timeout(45000),headers:{'user-agent':'DIGI-TEC approved routing verification/1.0'}});
  const body=c.method==='GET'?await r.text():'';
  const canonical=body.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]||body.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]||null;
  const rawFile=body?`${mode}-raw/${index}-${n}.html`:null;
  if(rawFile)await writeFile(path.join(out,rawFile),body);
  hops.push({url,status:r.status,headers:pick(r),title:clean(body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''),h1:[...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1])),canonical,robots:body.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)/i)?.[1]||null,mainTextSha256:body?createHash('sha256').update(semanticMain(body)).digest('hex'):null,bodyBytes:Buffer.byteLength(body),sha256:body?createHash('sha256').update(body).digest('hex'):null,rawFile});
  const loc=r.headers.get('location');
  if(r.status>=300&&r.status<400&&loc){url=new URL(loc,url).href;continue;}
  return{...c,index,hops,finalUrl:url,queryPreserved:new URL(url).search===new URL(c.input).search};
 }
 return{...c,index,hops,error:'Exceeded five-hop bound'};
}
function validate(r){
 const issues=[];if(r.error)return[r.error];const first=r.hops[0],last=r.hops.at(-1);
 if(!r.queryPreserved)issues.push('Query string changed');
 if(r.kind==='legacy'&&mode==='post'){
  const expected=owner+new URL(r.input).search;
  if(first.status!==308)issues.push(`First status ${first.status}, expected308`);
  if(first.headers.location!==expected)issues.push(`Location differs: ${first.headers.location}`);
  if(r.hops.length!==2)issues.push(`Expected one redirect +200; statuses ${r.hops.map(h=>h.status)}`);
  if(r.finalUrl!==expected||last.status!==200)issues.push('Final owner/status mismatch');
  if(r.method==='GET'&&(last.canonical!==owner||last.h1.join('|')!=='Mercedes Oil Change in Dubai'))issues.push('Final service content/canonical mismatch');
 }else if(r.kind==='legacy'){
  if(first.status!==200||r.hops.length!==1)issues.push('Unexpected baseline legacy response');
  if(r.method==='GET'&&first.canonical!=='https://digitecme.com/')issues.push('Unexpected baseline legacy canonical');
 }else if(r.kind==='protected'){
  if(first.status!==200||r.hops.length!==1)issues.push('Protected route did not remain200 direct');
  if(r.method==='GET'&&last.canonical!==r.expectedCanonical)issues.push(`Protected canonical differs: ${last.canonical}`);
  if(r.method==='GET'&&(!last.h1.length||!last.title||!last.robots?.includes('index')||last.robots?.includes('noindex')))issues.push('Protected metadata/indexability mismatch');
  if(r.input.startsWith(owner)&&r.method==='GET'&&(last.h1.join('|')!=='Mercedes Oil Change in Dubai'||last.title!=='Mercedes Oil Change Dubai | MB-Approved Oil | Digi-Tec'))issues.push('Service title/H1 mismatch');
  if(mode==='post'&&r.method==='GET'){
   const baseline=protectedBaseline.get(r.input);
   if(!baseline)issues.push('Missing protected GET baseline');
   else for(const key of ['title','h1','canonical','robots','mainTextSha256'])if(JSON.stringify(last[key])!==JSON.stringify(baseline[key]))issues.push(`Protected ${key} changed versus preflight`);
  }
 }else{
  if(first.status!==301||first.headers.location!=='https://digitecme.com/brands/mercedes-benz-service-dubai'+new URL(r.input).search||last.status!==200||r.hops.length!==2)issues.push('Existing Mercedes alias behavior differs');
 }
 return issues;
}
// Limited concurrency for read-only GET/HEAD. Stop scheduling new captures after a failure.
const records=[];let next=0,stopped=false;
async function worker(){while(!stopped&&next<cases.length){const i=next++;let r;try{r=await capture(cases[i],i);}catch(e){r={...cases[i],index:i,error:String(e)};}r.issues=validate(r);records.push(r);if(r.issues.length){stopped=true;console.error(JSON.stringify({failed:i,input:r.input,method:r.method,issues:r.issues}));}}}
await Promise.all(Array.from({length:4},worker));records.sort((a,b)=>a.index-b.index);
const failures=records.filter(r=>r.issues.length);
const report={mode,startedAt,finishedAt:new Date().toISOString(),scope:'Read-only public GET/HEAD with synthetic parameters. No live settings modified.',plannedCases:cases.length,completedCases:records.length,passed:failures.length===0&&records.length===cases.length,stoppedOnFailure:stopped,failures,records};
await writeFile(path.join(out,`${mode}-results.json`),JSON.stringify(report,null,2));
console.log(JSON.stringify({mode,startedAt:report.startedAt,finishedAt:report.finishedAt,planned:cases.length,completed:records.length,passed:report.passed,failures:failures.map(r=>({index:r.index,input:r.input,method:r.method,issues:r.issues}))},null,2));
if(!report.passed)process.exitCode=1;
