import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const out = new URL('./', import.meta.url);
await mkdir(out, {recursive:true});
const paths = ['/services/mercedes-oil-change-dubai','/services/mercedes-oil-change-dubai/','/services/oil-change-dubai','/services/oil-change-dubai/','/blog/best-oil-change-dubai-mercedes','/blog/best-oil-change-dubai-mercedes/','/brands/mercedes-benz-service-dubai','/brands/mercedes-benz-service-dubai/','/robots.txt','/sitemap.xml','/brands/mercedes-benz-service-dubai/oil-change','/brands/mercedes-benz-service-dubai/oil-change/'];
const clean = v => (v||'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/\s+/g,' ').trim();
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)=["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),m[2]]));
function summarize(html) {
 const links=[...html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m=>({href:m[1],text:clean(m[2])}));
 const metas=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>attrs(m[0]));
 return {bytes:Buffer.byteLength(html),sha256:createHash('sha256').update(html).digest('hex'),title:clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]),canonical:[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>attrs(m[0])).filter(a=>a.rel==='canonical').map(a=>a.href),robots:metas.filter(a=>/robots|googlebot/i.test(a.name||'')).map(a=>({name:a.name,content:a.content})),description:metas.find(a=>a.name==='description')?.content,h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1])),h2:[...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1])),links:links.filter(a=>paths.some(p=>a.href.replace(/\/$/,'')===p.replace(/\/$/,''))),allLinks:links.length,text:clean(html)};
}
const reports = await Promise.all(paths.map(async (p,i)=>{
 const initial='https://digitecme.com'+p; let url=initial; const chain=[]; let html='';
 try {for(let n=0;n<8;n++) {const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(45000)});const headers=Object.fromEntries(r.headers); chain.push({url,status:r.status,headers}); html=await r.text(); if(r.status>=300&&r.status<400&&r.headers.get('location')) url=new URL(r.headers.get('location'),url).href;else break;}
 await writeFile(new URL(`live-${i}.html`,out),html);return {path:p,requested:initial,final:url,chain,...summarize(html)};}catch(e){return {path:p,requested:initial,chain,error:String(e)}}
}));
await writeFile(new URL('live-evidence.json',out),JSON.stringify({capturedAt:new Date().toISOString(),note:'Unauthenticated HTTP GET, manual redirect following; initial server HTML before JavaScript. No claim about Google-selected canonical.',reports},null,2));
const local=[];
for(const p of [...new Set(paths.filter(p=>!p.endsWith('.txt')&&!p.endsWith('.xml')).map(p=>p.replace(/\/$/,'')))]) {
 try {const html=await readFile(path.join('dist',p,'index.html'),'utf8'); local.push({path:p,...summarize(html)});}catch(e){local.push({path:p,error:String(e)});}
}
await writeFile(new URL('local-html-evidence.json',out),JSON.stringify(local,null,2));
const inlinks=[];
async function walk(dir){for(const d of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,d.name);if(d.isDirectory())await walk(file);else if(d.name==='index.html'){const html=await readFile(file,'utf8');const source='/'+path.relative('dist',path.dirname(file)).replaceAll('\\','/');for(const m of html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi))if(paths.slice(0,8).includes(m[1]))inlinks.push({source,target:m[1],text:clean(m[2])});}}}
await walk('dist');
await writeFile(new URL('local-inlinks.json',out),JSON.stringify(inlinks,null,2));
const counts={};for(const l of inlinks){counts[l.target]??={links:0,sources:new Set()};counts[l.target].links++;counts[l.target].sources.add(l.source);}
console.log(JSON.stringify({live:reports.map(({path,chain,title,canonical,robots,h1,bytes,error})=>({path,statuses:chain.map(x=>({status:x.status,url:x.url,location:x.headers.location})),title,canonical,robots,h1,bytes,error})),local:local.map(({path,title,canonical,robots,h1,bytes,error})=>({path,title,canonical,robots,h1,bytes,error})),inlinks:Object.entries(counts).map(([target,v])=>({target,links:v.links,sources:v.sources.size}))},null,2));
