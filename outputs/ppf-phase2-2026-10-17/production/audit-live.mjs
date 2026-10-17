import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const origin = 'https://digitecme.com';
const out = process.argv[2] || 'outputs/ppf-phase2-2026-10-17/production';
await mkdir(`${out}/html`, { recursive: true });
const decode = s => String(s).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ');
const clean = s => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (s, n) => decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`, 'i'))?.[1] || '');
const tags = (s, n) => [...s.matchAll(new RegExp(`<${n}\\b[^>]*>`, 'gi'))].map(m => m[0]);
function parse(html) {
  const schemaErrors = [];
  const json = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m => attr(m[1], 'type') === 'application/ld+json').map(m => { try { return JSON.parse(m[2]); } catch(e) { schemaErrors.push(e.message); return {}; } });
  const nodes = json.flatMap(v => v['@graph'] || (Array.isArray(v) ? v : [v]));
  const text = clean(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ''));
  return {
    title: clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''),
    canonical: tags(html, 'link').filter(t => attr(t, 'rel') === 'canonical').map(t => attr(t, 'href')),
    description: tags(html, 'meta').filter(t => attr(t, 'name') === 'description').map(t => attr(t, 'content')),
    robots: tags(html, 'meta').filter(t => /^(robots|googlebot)$/i.test(attr(t, 'name'))).map(t => ({name:attr(t,'name'),content:attr(t,'content')})),
    verification: tags(html, 'meta').filter(t => /google-site-verification/i.test(attr(t, 'name'))).map(t => ({name:attr(t,'name'),content:attr(t,'content')})),
    lang: attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang'),
    hreflang: tags(html, 'link').filter(t => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang')).map(t => ({lang:attr(t,'hreflang'),href:attr(t,'href')})),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => clean(m[1])),
    headings: [...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => ({level:m[1],text:clean(m[2])})),
    links: [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m => ({href:attr(m[1],'href'),text:clean(m[2])})).filter(t=>t.href),
    images: tags(html,'img').map(t=>({src:attr(t,'src'),alt:attr(t,'alt'),width:attr(t,'width'),height:attr(t,'height'),loading:attr(t,'loading'),fetchpriority:attr(t,'fetchpriority')})),
    scripts: tags(html, 'script').map(t => attr(t, 'src')).filter(Boolean),
    textLength: text.length, text, schemaTypes:nodes.map(n=>n['@type']), schema:nodes, schemaErrors,
  };
}
async function request(url) {
  const hops=[]; let target=url;
  for(let i=0;i<7;i++) {
    try {
      const start=Date.now();
      const r=await fetch(target,{redirect:'manual',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'DIGI-TEC-read-only-SEO-audit/1.0'}});
      const headers=Object.fromEntries([...r.headers].filter(([k])=>k!=='set-cookie'));
      const body=await r.text();
      hops.push({url:target,status:r.status,headers,elapsedMs:Date.now()-start});
      if([301,302,303,307,308].includes(r.status)&&headers.location){target=new URL(headers.location,target).href;continue;}
      return {url,finalUrl:target,status:r.status,hops,headers,body};
    } catch(e) { return {url,finalUrl:target,status:0,hops,error:e.message,cause:e.cause?.message,headers:{},body:''}; }
  }
  return {url,finalUrl:target,status:0,hops,error:'Redirect limit',headers:{},body:''};
}
async function pool(items,fn,n=4){let cursor=0;const result=Array(items.length);await Promise.all(Array.from({length:n},async()=>{while(cursor<items.length){const i=cursor++;result[i]=await fn(items[i],i);}}));return result;}
const owners=['/services/paint-protection-film','/ar/services/paint-protection-film','/services/paint-protection-dubai','/ar/services/paint-protection-dubai','/blog/ceramic-coating-vs-ppf-dubai','/ar/blog/ceramic-coating-vs-ppf-dubai','/services/ceramic-coating','/ar/services/ceramic-coating'];
const linking=['/','/ar','/services','/ar/services','/services/car-detailing','/ar/services/car-detailing','/services/car-polishing-dubai','/ar/services/car-polishing-dubai'];
const report={checkedAt:new Date().toISOString(),method:'Read-only GET requests; manual redirect tracking; initial response HTML parsed without running JavaScript; no forms or analytics submitted.',origin,owners:[],linkSources:[],redirects:[],infrastructure:{}};
const [robots,sitemap]=await Promise.all([request(`${origin}/robots.txt`),request(`${origin}/sitemap.xml`)]);
await writeFile(`${out}/robots.txt`,robots.body);await writeFile(`${out}/sitemap.xml`,sitemap.body);
const sitemapUrls=[...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>decode(m[1]));
report.infrastructure={robots:{...robots,body:undefined,text:robots.body},sitemap:{...sitemap,body:undefined,urlCount:sitemapUrls.length},indexingEvidence:'No Search Console account/index inspection available. Sitemap membership and verification marker do not establish indexing.'};
report.owners=await pool(owners,async route=>{
 const live=await request(origin+route);const parsed=parse(live.body);const file=`html/${route.slice(1).replaceAll('/','__')}.html`;await writeFile(`${out}/${file}`,live.body);
 return {route,...live,body:undefined,htmlFile:file,sha256:createHash('sha256').update(live.body).digest('hex'),inSitemap:sitemapUrls.includes(origin+route),...parsed};
});
report.linkSources=await pool(linking,async route=>{const live=await request(origin+route);const parsed=parse(live.body);const file=`html/${route==='/'?'home':route.slice(1).replaceAll('/','__')}.html`;await writeFile(`${out}/${file}`,live.body);return {route,...live,body:undefined,htmlFile:file,title:parsed.title,h1:parsed.h1,ppfLinks:parsed.links.filter(l=>/paint-protection|ceramic-coating-vs-ppf/.test(l.href))};});
const aliases=['/ppf','/services/ppf','/paint-protection','/car-paint-protection','/services/paint-protection','/services/car-paint-protection','/ar/ppf','/ar/services/ppf','/ar/paint-protection','/ar/car-paint-protection','/ar/services/paint-protection','/ar/services/car-paint-protection'];
const urls=[...owners.map(p=>origin+p+'/'),...aliases.flatMap(p=>[origin+p,origin+p+'/']),...['http://digitecme.com','https://www.digitecme.com'].flatMap(host=>owners.slice(0,2).map(p=>host+p))];
report.redirects=await pool(urls,async url=>{const r=await request(url);return {...r,body:undefined,finalTitle:parse(r.body).title,canonical:parse(r.body).canonical};});
report.routingProbes=await pool(['/mercedes-repair','/services/tire-repair','/about-us','/ppf-phase2-nonexistent-20261017','/ar/ppf-phase2-nonexistent-20261017','/_worker.js','/_redirects'],async route=>{const r=await request(origin+route);const file=route.startsWith('/_')?route.slice(1):'html/probe-'+route.slice(1).replaceAll('/','__')+'.html';await writeFile(out+'/'+file,r.body);const parsed=parse(r.body);return {...r,body:undefined,file,sha256:createHash('sha256').update(r.body).digest('hex'),title:parsed.title,canonical:parsed.canonical,h1:parsed.h1};});
report.headChecks=await pool([...owners,...aliases.flatMap(p=>[p,p+'/']),...owners.map(p=>p+'/')],async route=>{try{const r=await fetch(origin+route,{method:'HEAD',redirect:'manual',signal:AbortSignal.timeout(20000)});return {route,status:r.status,headers:Object.fromEntries([...r.headers].filter(([k])=>k!=='set-cookie'))};}catch(e){return {route,status:0,error:e.message};}});
report.completedAt=new Date().toISOString();await writeFile(`${out}/live-audit.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({owners:report.owners.map(o=>({route:o.route,status:o.status,title:o.title,h1:o.h1,canonical:o.canonical,inSitemap:o.inSitemap,textLength:o.textLength})),redirectFailures:report.redirects.filter(r=>r.status!==200).length,robotsStatus:robots.status,sitemapStatus:sitemap.status},null,2));
