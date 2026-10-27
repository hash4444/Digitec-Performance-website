import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const out = new URL('./', import.meta.url);
const origin = 'https://digitecme.com';
await mkdir(new URL('html/', out), {recursive:true});
const decode = s => String(s).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&#39;',"'").replaceAll('&nbsp;',' ');
const clean = s=>decode(s.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const attr = (s,n)=>decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`,'i'))?.[1]||'');
const tags=(s,n)=>[...s.matchAll(new RegExp(`<${n}\\b[^>]*>`,'gi'))].map(m=>m[0]);
function parse(html) {
  const jsonErrors=[];
  const json=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m=>attr(m[1],'type')==='application/ld+json').map(m=>{try{return JSON.parse(m[2])}catch(e){jsonErrors.push(e.message);return {}}});
  const nodes=json.flatMap(v=>v['@graph']||(Array.isArray(v)?v:[v]));
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||html;
  return {
    title:clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''),
    description:tags(html,'meta').filter(t=>attr(t,'name')==='description').map(t=>attr(t,'content')),
    canonical:tags(html,'link').filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href')),
    robots:tags(html,'meta').filter(t=>/^(robots|googlebot)$/i.test(attr(t,'name'))).map(t=>attr(t,'content')),
    alternates:tags(html,'link').filter(t=>attr(t,'hreflang')).map(t=>({language:attr(t,'hreflang'),href:attr(t,'href')})),
    headings:[...main.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(m=>({level:+m[1],text:clean(m[2])})),
    links:tags(html,'a').map(t=>attr(t,'href')).filter(Boolean),
    images:tags(main,'img').map(t=>({src:attr(t,'src'),alt:attr(t,'alt'),loading:attr(t,'loading'),width:attr(t,'width'),height:attr(t,'height')})),
    scripts:tags(html,'script').map(t=>attr(t,'src')).filter(Boolean),
    schemaTypes:nodes.map(n=>n['@type']),nodes,jsonErrors,
    mainText:clean(main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'')),
    analytics:{gtm:html.includes('GTM-T3GVSPND'),ga4:html.includes('G-4TRCEJSY4S')},
  };
}
async function request(url,method='GET') {
 const started=Date.now();
 try {const r=await fetch(url,{method,redirect:'manual',signal:AbortSignal.timeout(25000)});return {url,method,status:r.status,headers:Object.fromEntries([...r.headers].filter(([k])=>k!=='set-cookie')),body:method==='HEAD'?'':await r.text(),durationMs:Date.now()-started};}
 catch(e){return {url,method,status:0,headers:{},body:'',error:e.message,durationMs:Date.now()-started};}
}
async function pool(items,fn,n=5){const a=new Array(items.length);let c=0;await Promise.all(Array.from({length:n},async()=>{while(c<items.length){const i=c++;a[i]=await fn(items[i],i)}}));return a;}
const report={checkedAt:new Date().toISOString(),origin,method:'Direct public GET/HEAD; redirect manual; no JavaScript, forms, analytics events, authenticated services, or configuration mutations.',infrastructure:{},pages:[],aliases:[],variants:[],linkTargets:[]};
for(const p of ['/robots.txt','/sitemap.xml']){const r=await request(origin+p);await writeFile(new URL(p.slice(1),out),r.body);report.infrastructure[p]={...r,body:undefined};}
const sitemap=await readFile(new URL('sitemap.xml',out),'utf8');
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>decode(m[1]));
report.sitemapCount=sitemapUrls.length;report.sitemapDuplicateUrls=sitemapUrls.filter((x,i)=>sitemapUrls.indexOf(x)!==i);
const extras=['/','/brands','/services','/sitemap','/ar/blog/mercedes-c-class-service-dubai-guide','/ar/blog/mercedes-e-class-service-dubai-guide','/ar/blog/mercedes-s-class-service-dubai-guide','/ar/blog/mercedes-g63-service-dubai-guide','/services/head-unit-repair-dubai'];
const urls=[...new Set([...sitemapUrls.filter(u=>/mercedes/i.test(u)),...extras.map(p=>origin+p)])];
report.pages=await pool(urls,async(url,i)=>{const r=await request(url);const parsed=parse(r.body);const htmlFile=`html/${String(i).padStart(3,'0')}-${new URL(url).pathname.replaceAll('/','_')||'home'}.html`;await writeFile(new URL(htmlFile,out),r.body);const textHash=createHash('sha256').update(parsed.mainText).digest('hex');return {...r,body:undefined,...parsed,htmlFile,textHash,sitemapOccurrences:sitemapUrls.filter(u=>u===url).length};});
await writeFile(new URL('http-audit.json',out),JSON.stringify(report,null,2));
console.log('Pages',report.pages.length,'sitemap',sitemapUrls.length,'page statuses',Object.fromEntries([...new Set(report.pages.map(p=>p.status))].map(s=>[s,report.pages.filter(p=>p.status===s).length])));
const routingSource=await readFile('cloudflare/mercedes-seo-router.js','utf8');
const aliases=JSON.parse(routingSource.match(/export const aliases = new Map\((\[.*?\])\);/)?.[1]||'[]');
report.aliases=await pool(aliases,async([source,target])=>{const r=await request(origin+source);const p=parse(r.body);return {...r,body:undefined,expectedTarget:origin+target,title:p.title,canonical:p.canonical,h1:p.headings.filter(h=>h.level===1),htmlTextHash:createHash('sha256').update(p.mainText).digest('hex')};});
const cases=[];
for(const path of ['/brands/mercedes-benz-service-dubai','/services/mercedes-oil-change-dubai','/brands/mercedes-benz-service-dubai/oil-change','/services/mercedes-repair-dubai'])for(const host of [origin,'http://digitecme.com','https://www.digitecme.com','http://www.digitecme.com'])for(const slash of ['','/'])cases.push(host+path+slash);
cases.push(origin+'/brands/mercedes-benz-service-dubai/oil-change?utm_source=seo_audit&gclid=example&tag=a&tag=b',origin+'/services/mercedes-oil-change-dubai?utm_source=seo_audit',origin+'/seo-audit-nonexistent-mercedes-20261026');
report.variants=await pool(cases,async(url)=>{const chain=[];let next=url;for(let i=0;i<5;i++){const r=await request(next);const p=parse(r.body);chain.push({...r,body:undefined,title:p.title,canonical:p.canonical,h1:p.headings.filter(h=>h.level===1)});if(![301,302,303,307,308].includes(r.status)||!r.headers.location)break;next=new URL(r.headers.location,next).href;}return {url,chain};});
report.headSamples=await pool([origin+'/brands/mercedes-benz-service-dubai',origin+'/services/mercedes-oil-change-dubai',origin+'/brands/mercedes-benz-service-dubai/oil-change',origin+'/brands/mercedes-benz-service-dubai/oil-change/'],async(url)=>{const r=await request(url,'HEAD');return {...r,body:undefined};});
await writeFile(new URL('http-audit.json',out),JSON.stringify(report,null,2));
const known=new Set(report.pages.map(p=>p.url));const linked=new Map();
for(const page of report.pages.filter(p=>/mercedes/.test(p.url)))for(const href of page.links){try{const u=new URL(href,page.url);if(u.origin===origin){u.search='';u.hash='';const a=linked.get(u.href)||[];if(!a.includes(page.url))a.push(page.url);linked.set(u.href,a)}}catch{}}
report.linkTargets=await pool([...linked],async([url,from])=>{const saved=report.pages.find(p=>p.url===url);if(saved)return {url,from,status:saved.status,canonical:saved.canonical,title:saved.title};const r=await request(url);const p=/text\/html/i.test(r.headers['content-type']||'')?parse(r.body):null;return {url,from,status:r.status,location:r.headers.location,canonical:p?.canonical,title:p?.title,error:r.error};});
report.completedAt=new Date().toISOString();
report.summary={pages:report.pages.length,mercedesPages:report.pages.filter(p=>/mercedes/i.test(p.url)).length,aliases:report.aliases.length,aliasesPermanent:report.aliases.filter(p=>[301,308].includes(p.status)&&p.headers.location===p.expectedTarget).length,aliases200:report.aliases.filter(p=>p.status===200).length,variants:report.variants.length,internalDestinations:report.linkTargets.length,linkNon200:report.linkTargets.filter(p=>p.status!==200).length};
await writeFile(new URL('http-audit.json',out),JSON.stringify(report,null,2));
console.log(JSON.stringify(report.summary));
