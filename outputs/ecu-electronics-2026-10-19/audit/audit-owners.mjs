import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const workspace=process.cwd();
const output=path.join(workspace,'outputs/ecu-electronics-2026-10-19/audit');
const dist=path.join(workspace,'outputs/diagnostics-ac-2026-10-19/candidate.local/dist');
const origin='https://digitecme.com';
const decode=value=>value.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
const clean=value=>decode(value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const attr=(tag,key)=>decode(tag.match(new RegExp(`\\b${key}=["']([^"']*)["']`,'i'))?.[1]??'');
const tags=(html,name)=>[...html.matchAll(new RegExp(`<${name}\\b[^>]*>`,'gi'))].map(m=>m[0]);
const flat=node=>{if(Array.isArray(node))return node.flatMap(flat);if(!node||typeof node!=='object')return[];return[node,...Object.values(node).filter(v=>v&&typeof v==='object').flatMap(flat)];};
function inspect(html,route){
 const meta=name=>tags(html,'meta').filter(t=>attr(t,'name')===name).map(t=>attr(t,'content'));
 const links=tags(html,'link');
 const anchors=[...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m=>({href:attr(m[0],'href'),text:clean(m[2]),placement:attr(m[0],'data-cta-placement')}));
 const headings=[...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(m=>({level:Number(m[1]),text:clean(m[2])}));
 const schemas=[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{try{return JSON.parse(m[1])}catch(e){return {parseError:String(e)}}});
 const nodes=schemas.flatMap(flat),types=[...new Set(nodes.flatMap(n=>n['@type']??[]))];
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]??html.match(/<div id="root">([\s\S]*)/i)?.[1]??'';
 const bodyText=clean(main);
 const faqNodes=nodes.filter(n=>n['@type']==='Question');
 const faqAnswersCrawlable=faqNodes.every(n=>n.acceptedAnswer?.text&&bodyText.includes(clean(n.acceptedAnswer.text)));
 return {route,title:clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]??''),description:meta('description'),robots:meta('robots'),canonical:links.filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href')),hreflang:links.filter(t=>attr(t,'rel')==='alternate').map(t=>({lang:attr(t,'hreflang'),href:attr(t,'href')})),h1:headings.filter(h=>h.level===1).map(h=>h.text),headings,schemaTypes:types,schemaParseErrors:schemas.filter(n=>n.parseError),schemaEntityIds:[...new Set(nodes.map(n=>n['@id']).filter(Boolean))],serviceNodes:nodes.filter(n=>n['@type']==='Service').map(n=>({id:n['@id'],name:n.name,serviceType:n.serviceType,provider:n.provider,areaServed:n.areaServed})),faqCount:faqNodes.length,faqAnswersCrawlable,initialHtmlContentChars:bodyText.length,initialHtmlApproximateWords:bodyText.split(/\s+/).length,telephoneLinks:anchors.filter(a=>a.href.startsWith('tel:')),whatsappLinks:anchors.filter(a=>a.href.includes('wa.me/')),contactForms:tags(html,'form').length,internalLinks:anchors.filter(a=>a.href.startsWith('/')&&!a.href.startsWith('//')),bodyText,htmlSha256:createHash('sha256').update(html).digest('hex')};
}
const all=[];
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isDirectory())await walk(path.join(dir,e.name));else if(e.name==='index.html'){const p=path.relative(dist,dir).replaceAll('\\','/');all.push({route:p?`/${p}`:'/',file:path.join(dir,e.name)});}}}
await walk(dist);
const targetRoutes=all.filter(r=>/^\/(ar\/)?services\/(car-diagnostics-dubai|auto-electrical-repair-dubai|mercedes-(diagnostics|electrical-repair|transmission-repair)-dubai|head-unit-repair-dubai|cadillac-cue-screen-repair-dubai|mercedes-audio-upgrade-dubai)$/.test(r.route)||/^\/(ar\/)?brands\/[^/]+\/(engine-diagnostics|electrical-repair)$/.test(r.route)||/^\/(ar\/)?tuning$/.test(r.route));
const records=[];
const sitemap=await fs.readFile(path.join(dist,'sitemap.xml'),'utf8');
for(const item of targetRoutes){const html=await fs.readFile(item.file,'utf8');records.push({...inspect(html,item.route),inSitemap:sitemap.includes(`<loc>${origin}${item.route}</loc>`)});}
const targetSet=new Set(records.map(r=>r.route));
const inbound=new Map([...targetSet].map(r=>[r,[]]));
for(const item of all){const html=await fs.readFile(item.file,'utf8');const anchors=[...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];for(const m of anchors){let href=attr(m[0],'href');if(href.startsWith(origin))href=href.slice(origin.length);const dest=href.split(/[?#]/)[0];if(targetSet.has(dest)&&dest!==item.route){const rows=inbound.get(dest);if(!rows.some(r=>r.from===item.route))rows.push({from:item.route,text:clean(m[2])});}}}
for(const r of records){r.inboundRoutes=inbound.get(r.route);r.inboundRouteCount=r.inboundRoutes.length;const counterpart=r.route.startsWith('/ar/')?r.route.slice(3):`/ar${r.route}`;r.counterpartRoute=counterpart;r.counterpartExists=targetSet.has(counterpart);}
const focal=/^\/(ar\/)?services\//;
const focusBrands=new Set(['bmw','porsche','volkswagen','range-rover','lamborghini','rolls-royce','audi']);
for(const r of records)r.focalOwner=focal.test(r.route)||focusBrands.has(r.route.match(/^\/(?:ar\/)?brands\/([a-z-]+)-service-dubai\//)?.[1]);
await fs.writeFile(path.join(output,'baseline-owner-audit.json'),JSON.stringify({capturedAt:new Date().toISOString(),basis:'Read-only completed diagnostics/AC candidate dist; base acef342 plus all six completed local diagnostics/AC files. This is the ECU sprint immutable content baseline, not a claim of current live publication.',dist,siteHtmlFiles:all.length,records},null,2));
const csvField=v=>`"${String(v??'').replaceAll('"','""')}"`;
const csv=[['URL','Focal owner','Title','Description','H1','Robots','Canonical','Hreflang','Sitemap','Schema types','FAQ count','FAQ answers initial HTML','Initial content chars','Inbound routes','Internal link count','WhatsApp links','Telephone links','Forms','Counterpart exists'],...records.map(r=>[origin+r.route,r.focalOwner,r.title,r.description.join(' | '),r.h1.join(' | '),r.robots.join(' | '),r.canonical.join(' | '),r.hreflang.map(x=>`${x.lang}:${x.href}`).join(' | '),r.inSitemap,r.schemaTypes.join(' | '),r.faqCount,r.faqAnswersCrawlable,r.initialHtmlContentChars,r.inboundRouteCount,r.internalLinks.length,r.whatsappLinks.length,r.telephoneLinks.length,r.contactForms,r.counterpartExists])].map(row=>row.map(csvField).join(',')).join('\n');
await fs.writeFile(path.join(output,'existing-page-ownership-map.csv'),csv);
await fs.writeFile(path.join(output,'focal-owner-summary.json'),JSON.stringify(records.filter(r=>r.focalOwner).map(({bodyText,inboundRoutes,internalLinks,...r})=>r),null,2));
try {
 const http=JSON.parse(await fs.readFile(path.join(output,'public-owner-http-audit.json'),'utf8'));
 const liveSitemap=await fs.readFile(path.join(output,'live-html/sitemap.xml'),'utf8');
 const live=[];
 for(const request of http.records.filter(r=>r.saved?.endsWith('.html'))){
  const html=await fs.readFile(path.resolve(workspace,request.saved),'utf8');
  const record=inspect(html,request.route);
  const before=records.find(r=>r.route===request.route);
  live.push({...record,httpStatus:request.status,url:request.url,xRobotsTag:request.headers['x-robots-tag']??null,inSitemap:liveSitemap.includes(`<loc>${origin}${request.route}</loc>`),localBaselineMetadataMatches:before?before.title===record.title&&JSON.stringify(before.description)===JSON.stringify(record.description)&&JSON.stringify(before.h1)===JSON.stringify(record.h1):null});
 }
 await fs.writeFile(path.join(output,'public-owner-rendered-audit.json'),JSON.stringify({capturedAt:http.capturedAt,records:live},null,2));
}catch(error){if(error.code!=='ENOENT')throw error;}
console.log(JSON.stringify({siteHtmlFiles:all.length,routes:records.length,focal:records.filter(r=>r.focalOwner).length,indexable:records.filter(r=>!r.robots.some(x=>x.includes('noindex'))).length,noindex:records.filter(r=>r.robots.some(x=>x.includes('noindex'))).length,missingSitemap:records.filter(r=>!r.inSitemap&&!r.robots.some(x=>x.includes('noindex'))).map(r=>r.route),faqAnswersMissing:records.filter(r=>!r.faqAnswersCrawlable).map(r=>r.route)},null,2));
