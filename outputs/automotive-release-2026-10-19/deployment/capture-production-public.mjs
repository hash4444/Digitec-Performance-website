import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const output=path.dirname(fileURLToPath(import.meta.url));
const base='https://digitecme.com';
const hubs=['rolls-royce','lamborghini','volkswagen','mercedes-benz','bmw'].map(b=>`/brands/${b}-service-dubai`);
const repairs=['/services/mercedes-mechanical-repair-dubai','/services/mercedes-suspension-repair-dubai','/services/mercedes-transmission-repair-dubai','/services/mercedes-diagnostics-dubai','/brands/bmw-service-dubai/transmission-repair','/brands/bmw-service-dubai/mechanical-repair','/brands/rolls-royce-service-dubai/mechanical-repair','/brands/rolls-royce-service-dubai/suspension-repair','/brands/lamborghini-service-dubai/mechanical-repair','/brands/lamborghini-service-dubai/transmission-repair'];
const preserve=['/','/services/paint-protection-film','/ar/services/paint-protection-film','/services/paint-protection-dubai','/ar/services/paint-protection-dubai','/tuning','/ar/tuning','/robots.txt','/sitemap.xml','/_worker.js','/_redirects'];
const targets=[...hubs,...repairs,...[...hubs,...repairs].map(p=>'/ar'+p),...preserve].map(p=>({url:base+p,method:'GET'}));
targets.push(...['/services/mercedes-repair-dubai','/brands/bmw-service-dubai/transmission-repair/','/ppf','/__automotive_release_preflight_20261019__'].flatMap(p=>['GET','HEAD'].map(method=>({url:base+p+'?utm_source=release-preflight&utm_medium=verification',method}))),{url:'https://www.digitecme.com/brands/bmw-service-dubai',method:'GET'});
await mkdir(path.join(output,'public-snapshot'),{recursive:true});
const records=[];let next=0;
const capture=(s,re)=>s.match(re)?.[1]||'';
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
async function worker(){while(next<targets.length){const item=targets[next++];try{
 const response=await fetch(item.url,{method:item.method,redirect:'manual',headers:{'user-agent':'DIGI-TEC authorized release preflight read-only','cache-control':'no-cache'},signal:AbortSignal.timeout(30000)});
 const body=Buffer.from(await response.arrayBuffer());const html=body.toString();
 const name=item.method+'-'+new URL(item.url).hostname+'-'+(new URL(item.url).pathname.replace(/\//g,'__')||'home')+'.body';
 await writeFile(path.join(output,'public-snapshot',name),body);
 const headers=Object.fromEntries([...response.headers].filter(([name])=>!['set-cookie','report-to','nel'].includes(name)));
 records.push({...item,status:response.status,headers,bytes:body.length,sha256:createHash('sha256').update(body).digest('hex'),file:'public-snapshot/'+name,title:capture(html,/<title>([\s\S]*?)<\/title>/i),description:capture(html,/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/i),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>plain(m[1])),canonical:capture(html,/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i),robots:capture(html,/<meta\b[^>]*name="robots"[^>]*content="([^"]*)"/i),scripts:[...html.matchAll(/<script\b[^>]*src="([^"]+)"/gi)].map(m=>m[1]),css:[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi)].map(m=>m[1])});
 }catch(error){records.push({...item,error:String(error)});}}}
await Promise.all(Array.from({length:4},worker));
const report={checkedAt:new Date().toISOString(),operation:'Public GET and HEAD only; no contact submissions, production writes or analytics events',records:records.sort((a,b)=>(a.url+a.method).localeCompare(b.url+b.method))};
await writeFile(path.join(output,'public-production-state.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({requests:records.length,errors:records.filter(r=>r.error),signals:records.filter(r=>['/','/services/paint-protection-film','/tuning','/_worker.js','/_redirects'].includes(new URL(r.url).pathname)).map(r=>({url:r.url,status:r.status,headers:r.headers,scripts:r.scripts,title:r.title}))},null,2));
