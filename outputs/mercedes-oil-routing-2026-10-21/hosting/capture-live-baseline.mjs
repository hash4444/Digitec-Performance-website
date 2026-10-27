import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const raw=path.join(out,'live-raw');
await mkdir(raw,{recursive:true});
const query='?utm_source=routing-audit&tag=a&tag=b&gclid=test-routing-evidence';
const cases=[
 ['root','https://digitecme.com/'],
 ['legacy','https://digitecme.com/brands/mercedes-benz-service-dubai/oil-change'+query],
 ['legacy-slash','https://digitecme.com/brands/mercedes-benz-service-dubai/oil-change/'+query],
 ['service-slashless','https://digitecme.com/services/mercedes-oil-change-dubai'+query],
 ['service-slash','https://digitecme.com/services/mercedes-oil-change-dubai/'+query],
 ['www-legacy','https://www.digitecme.com/brands/mercedes-benz-service-dubai/oil-change'+query],
 ['http-legacy','http://digitecme.com/brands/mercedes-benz-service-dubai/oil-change'+query],
 ['existing-mercedes-redirect','https://digitecme.com/services/mercedes-repair-dubai'+query],
 ['hub','https://digitecme.com/brands/mercedes-benz-service-dubai'],
 ['general-oil','https://digitecme.com/services/oil-change-dubai'],
 ['oil-guide','https://digitecme.com/blog/best-oil-change-dubai-mercedes'],
 ['diagnostics','https://digitecme.com/services/mercedes-diagnostics-dubai'],
 ['ppf','https://digitecme.com/services/paint-protection-film'],
 ['tuning','https://digitecme.com/tuning'],
 ['redirects-asset','https://digitecme.com/_redirects'],
 ['worker-asset','https://digitecme.com/_worker.js'],
];
const clean=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const headers=r=>Object.fromEntries(['location','content-type','server','cf-ray','cf-cache-status','cache-control','x-robots-tag','x-deployment-id','content-length'].map(k=>[k,r.headers.get(k)]).filter(([,v])=>v!==null));
async function capture([id,input],method){
 let url=input;const hops=[];
 for(let n=0;n<6;n++){
  const response=await fetch(url,{method,redirect:'manual',signal:AbortSignal.timeout(45000),headers:{'user-agent':'DIGI-TEC routing evidence/1.0'}});
  const body=method==='GET'?await response.text():'';
  const canonical=body.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]||body.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]||null;
  const record={url,status:response.status,headers:headers(response),bodyBytes:Buffer.byteLength(body),title:clean(body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''),h1:[...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1])),canonical,robots:body.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)/i)?.[1]||null,sha256:method==='GET'?createHash('sha256').update(body).digest('hex'):null};
  if(method==='GET'){record.rawFile=`live-raw/${id}-${n}.txt`;await writeFile(path.join(out,record.rawFile),body);}
  hops.push(record);
  const location=response.headers.get('location');
  if(response.status>=300&&response.status<400&&location){url=new URL(location,url).href;continue;}
  return{id,method,input,hops,finalUrl:url,queryPreserved:new URL(url).search===new URL(input).search};
 }
 return{id,method,input,hops,error:'Exceeded bounded six-hop capture'};
}
const records=[];
for(const item of cases){for(const method of ['GET','HEAD']){try{records.push(await capture(item,method));}catch(e){records.push({id:item[0],method,input:item[1],error:String(e)});}}}
const report={observedAt:new Date().toISOString(),purpose:'Read-only HTTP baseline; GET and HEAD only; synthetic query parameters; no production mutation',records};
await writeFile(path.join(out,'live-baseline.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({observedAt:report.observedAt,requests:records.length,errors:records.filter(r=>r.error),summary:records.map(r=>({id:r.id,method:r.method,chain:r.hops?.map(h=>h.status),final:r.finalUrl,title:r.hops?.at(-1)?.title,h1:r.hops?.at(-1)?.h1,canonical:r.hops?.at(-1)?.canonical,queryPreserved:r.queryPreserved}))},null,2));
