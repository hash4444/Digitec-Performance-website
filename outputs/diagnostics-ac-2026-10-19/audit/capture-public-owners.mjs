import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const output='outputs/diagnostics-ac-2026-10-19/audit';
const selected=JSON.parse(await fs.readFile(`${output}/selected-owner-baseline.json`,'utf8'));
const extra=['/services/mercedes-diagnostics-dubai','/services/auto-electrical-repair-dubai','/brands/volkswagen-service-dubai/engine-diagnostics','/brands/range-rover-service-dubai/engine-diagnostics',...['lamborghini','rolls-royce'].flatMap(b=>[`/brands/${b}-service-dubai/ac-repair`,`/brands/${b}-service-dubai/engine-diagnostics`])];
const routes=[...new Set([...selected.records.map(r=>r.route),...extra.flatMap(r=>[r,`/ar${r}`]),'/sitemap.xml','/robots.txt'])];
await fs.mkdir(`${output}/live-html`,{recursive:true});
const records=[];
for(let i=0;i<routes.length;i+=4){
 const batch=await Promise.all(routes.slice(i,i+4).map(async route=>{
  try{
   const response=await fetch(`https://digitecme.com${route}`,{method:'GET',signal:AbortSignal.timeout(35000),redirect:'follow'});
   const html=await response.text();
   const file=`${output}/live-html/${route.slice(1).replaceAll('/','__')}${route.endsWith('.txt')||route.endsWith('.xml')?'':'.html'}`;
   await fs.writeFile(file,html);
   const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&#39;',"'");
   const get=(tag,attribute)=>decode(tag.match(new RegExp(`\\b${attribute}=["']([^"']*)["']`,'i'))?.[1]??'');
   const links=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
   const meta=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]);
   const h1=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>decode(m[1].replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim());
   return{route,status:response.status,url:response.url,headers:Object.fromEntries([...response.headers].filter(([k])=>k!=='set-cookie')),htmlSha256:createHash('sha256').update(html).digest('hex'),saved:file,title:decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]??''),description:meta.filter(m=>get(m,'name')==='description').map(m=>get(m,'content')),robots:meta.filter(m=>['robots','googlebot'].includes(get(m,'name'))).map(m=>get(m,'content')),canonical:links.filter(m=>get(m,'rel')==='canonical').map(m=>get(m,'href')),hreflang:links.filter(m=>get(m,'rel')==='alternate').map(m=>({lang:get(m,'hreflang'),href:get(m,'href')})),h1,htmlChars:html.length};
  }catch(error){return{route,error:String(error),cause:String(error.cause??'')}}
 }));records.push(...batch);
}
const report={capturedAt:new Date().toISOString(),method:'Public GET only; no JavaScript, contact actions, authenticated access or production writes.',records};
await fs.writeFile(`${output}/public-owner-http-audit.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({records:records.length,statuses:records.reduce((a,r)=>(a[r.status??'error']=(a[r.status??'error']??0)+1,a),{}),errors:records.filter(r=>r.error)}));
