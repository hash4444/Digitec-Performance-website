import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const root=process.cwd(),out=path.resolve(process.argv[2]);
assert.ok(root.includes('ecu-electronics-2026-10-19')&&root.endsWith('candidate.local'),'Only isolated candidate');
await fs.mkdir(out,{recursive:true});
const old=JSON.parse(await fs.readFile("C:\\Users\\ADMIN\\Documents\\ChatGPT\\DIGITEC\\outputs\\diagnostics-ac-2026-10-19\\audit\\selected-owner-baseline.json",'utf8'));
const priorDist="C:\\Users\\ADMIN\\Documents\\ChatGPT\\DIGITEC\\outputs\\automotive-release-2026-10-19\\candidate.local\\dist";
const {getPublicRoutes}=await import(pathToFileURL(path.join(root,'dist-server/entry-server.js')).href);
const routes=getPublicRoutes(),manifest=new Map(routes.map(r=>[r.path,r]));
const oldAll=JSON.parse(await fs.readFile("C:\\Users\\ADMIN\\Documents\\ChatGPT\\DIGITEC\\outputs\\diagnostics-ac-2026-10-19\\audit\\baseline-owner-audit.json",'utf8'));
const origin='https://digitecme.com',sitemap=await fs.readFile('dist/sitemap.xml','utf8');
const decode=x=>String(x??'').replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&apos;',"'").replaceAll('&#39;',"'").replaceAll('&nbsp;',' ').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
const clean=x=>decode(String(x).replace(/<[^>]*>/g,' ')).replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g,'').replace(/\s+/g,' ').trim();
const attr=(tag,name)=>decode(tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,'i'))?.slice(1).find(x=>x!==undefined)??'');
const tags=(html,name)=>[...html.matchAll(new RegExp(`<${name}\\b[^>]*>`,'gi'))].map(m=>m[0]);
const meta=(html,name)=>tags(html,'meta').filter(t=>attr(t,'name')===name).map(t=>attr(t,'content'));
const scripts=html=>[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m=>attr(m[1],'type')==='application/ld+json').map(m=>({route:attr(m[1],'data-route-jsonld')==='true',raw:m[2].trim(),value:JSON.parse(m[2])}));
const links=html=>[...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m=>({href:attr(m[1],'href'),text:clean(m[2]),placement:attr(m[1],'data-cta-placement')}));
const htmlFor=route=>fs.readFile(path.join(root,'dist',route.slice(1),'index.html'),'utf8');
const global=scripts(await fs.readFile('index.html','utf8')).filter(s=>!s.route).map(s=>s.raw);
const report={checkedAt:new Date().toISOString(),passed:false,pages:[],checks:0,links:[],protectedRoutes:[],noindexPolicies:[],failures:[],scope:'Local built candidate only. No Rich Results service, Google index coverage, received enquiry or production publication claim.'};
const check=(actual,expected,label)=>{report.checks++;assert.deepEqual(actual,expected,label);};
for(const before of old.records){
 try{
  const route=before.route,arabic=route.startsWith('/ar/'),mode=route.includes('ac-repair')?'ac':'diagnostics';
  const html=await htmlFor(route),visible=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,''),text=clean(visible);
  const title=[...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(m=>clean(m[1]));
  const description=meta(html,'description'),h1=[...visible.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1]));
  const canonical=tags(html,'link').filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href'));
  check(title.length,1,'One title');check(title[0].length>15,true,'Meaningful title');check(description.length,1,'One description');check(description[0].length>60,true,'Meaningful description');check(h1.length,1,'One H1');check(canonical,[origin+route],'Self canonical');
  check(meta(html,'robots').length,1,'One robots');check(/noindex|nofollow/i.test(meta(html,'robots').join(',')),false,'Indexable');check(manifest.get(route)?.indexable,true,'Existing indexable route');check(sitemap.includes(`<loc>${origin+route}</loc>`),true,'In sitemap');
  const en=route.replace(/^\/ar/,'');
  for(const [lang,href]of[['en-AE',origin+en],['ar-AE',origin+'/ar'+en],['x-default',origin+en]])check(tags(html,'link').filter(t=>attr(t,'rel')==='alternate'&&attr(t,'hreflang')===lang).map(t=>attr(t,'href')),[href],lang+' counterpart');
  check(attr(tags(html,'html')[0],'lang'),arabic?'ar':'en','Document language');if(arabic){check(attr(tags(html,'html')[0],'dir'),'rtl','Arabic RTL');check(/[\u0600-\u06ff]/.test(title[0]),true,'Arabic metadata');check(/[\u0600-\u06ff]/.test(h1[0]),true,'Arabic H1');}
  const headingLevels=[...visible.matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);check(headingLevels[0],1,'H1 precedes content headings');check(headingLevels.includes(2),true,'H2 structure');
  const js=scripts(html);check(js.filter(s=>!s.route).map(s=>s.raw),global,'Shared entity graph unchanged');check(js.filter(s=>s.route).length,1,'One route graph');
  const graph=js.filter(s=>s.route).flatMap(s=>s.value['@graph']??[s.value]);
  const ids=graph.map(n=>n['@id']).filter(Boolean);check(new Set(ids).size,ids.length,'Unique route entity IDs');
  const service=graph.filter(n=>[].concat(n['@type']).includes('Service'));check(service.length,1,'One route Service');check(service[0]['@id'],origin+route+'#service','Stable Service ID');check(service[0].provider['@id'],origin+'/#business','Existing business entity');check(service[0].description,description[0],'Service and metadata agree');
  const faq=graph.filter(n=>n['@type']==='FAQPage');check(faq.length,1,'One displayed FAQ graph');check(faq[0].mainEntity.length>=5,true,'Useful FAQ coverage');
  for(const q of faq[0].mainEntity){check(text.includes(clean(q.name)),true,'FAQ question in initial HTML');check(text.includes(clean(q.acceptedAnswer.text)),true,'FAQ answer in initial HTML');}
  check(tags(html,'section').filter(t=>attr(t,'data-diagnostic-ac-enquiry')===mode).length,1,'One assessment panel');
  const panel=visible.match(/<section\b[^>]*data-diagnostic-ac-enquiry=["'][^"']+["'][^>]*>[\s\S]*?<\/section>/i)?.[0];assert.ok(panel,'Assessment panel initial HTML');
  const pageLinks=links(visible),hero=pageLinks.filter(a=>a.placement==='hero'&&a.href.startsWith('https://wa.me/'));
  const quote=pageLinks.filter(a=>a.placement==='diagnostic_ac_quote'&&a.href.startsWith('https://wa.me/'));check(hero.length,1,'Hero service CTA');check(quote.length,1,'Assessment CTA');check(quote[0].href,hero[0].href,'Same service-specific context');
  const draft=new URL(quote[0].href),message=draft.searchParams.get('text');check(draft.hostname,'wa.me','WhatsApp host');check(draft.pathname,'/97143402223','Established destination');check(message.length>80,true,'Structured vehicle intake');
  check(arabic?/[\u0600-\u06ff]/.test(message):/assessment/i.test(message),true,'Localized assessment request');check(arabic?/المسافة|المقطوعة/.test(message):/mileage/i.test(message),true,'Mileage intake');
  check(pageLinks.some(a=>a.href==='tel:+97143402223'),true,'Telephone next step');check(clean(panel).includes(arabic?'إرسال':'Send in WhatsApp'),true,'Draft must be sent');check(clean(panel).includes(arabic?'لا يؤكد':'does not confirm'),true,'No confirmed enquiry claim');
  if(arabic)check(/<bdi\b[^>]*dir="ltr"[^>]*>\+971 4 340 2223<\/bdi>/.test(panel),true,'Phone remains LTR');
  const newLinks=links(panel).filter(a=>a.href.startsWith('/'));
  check(newLinks.length>=2,true,'Relevant service links');
  for(const l of newLinks){const target=new URL(l.href,origin+route).pathname,targetHtml=await htmlFor(target);check(manifest.get(target)?.indexable,true,'Destination indexable');check(tags(targetHtml,'link').filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href')),[origin+target],'Direct canonical destination');if(arabic)check(target.startsWith('/ar/'),true,'Arabic destination');report.links.push({from:route,to:target,label:l.text});}
  if(mode==='ac'&&!arabic){check(/classic evaporator microbial growth|Refrigerant Low, Have Serviced|water dripping[^.]*blocked evaporator|Clutch cycling on and off rapidly/i.test(text),false,'Unsafe inherited diagnoses removed');check(/does not|not .*every|not assumed/i.test(text),true,'Repair limitations explicit');}
  if(route.includes('/brands/')||route.includes('mercedes-ac')){
   const hub=route.includes('mercedes-ac')?'/brands/mercedes-benz-service-dubai':en.split('/').slice(0,3).join('/');
   const hubRoute=(arabic?'/ar':'')+hub;check(links(await htmlFor(hubRoute)).some(l=>l.href.split(/[?#]/)[0]===route),true,'Existing brand hub link');
  }
  report.pages.push({route,language:arabic?'ar':'en',mode,passed:true,before:{title:before.title,description:before.description[0],h1:before.h1[0],faqs:before.faqCount},after:{title:title[0],description:description[0],h1:h1[0],faqs:faq[0].mainEntity.length},sameCanonical:true,sameEntityIds:true,initialTextChars:text.length});
 }catch(error){report.failures.push({route:before.route,error:error.message,stack:error.stack});}
}
const repair=await import(pathToFileURL(path.join(root,'outputs/repair-service-2026-10-19/qa/repair-routes.mjs')).href);
const hubs=['rolls-royce','lamborghini','volkswagen','mercedes-benz','bmw'].flatMap(b=>[`/brands/${b}-service-dubai`,`/ar/brands/${b}-service-dubai`]);
const protection=['/services/paint-protection-film','/services/paint-protection-dubai','/services/ceramic-coating'].flatMap(r=>[r,'/ar'+r]);
const tuning=routes.filter(r=>/tuning/.test(r.path)&&r.indexable).map(r=>r.path);
const protectedRoutes=[...new Set([...hubs,...repair.routes.map(r=>r.route),...protection,...tuning])];
// React useId changes generated Radix IDs when an adjacent conditional JSX branch
// is introduced. Normalize only those generated identifiers, not text, links,
// image paths, form fields, classes or semantic attributes. Browser regression
// checks exercise the resulting controls and their relationships.
const removeEcuPanel=html=>html.replace(/<div class="(?:mt-7|mx-auto max-w-5xl px-4 pt-12 sm:px-6)"><section\b[^>]*data-ecu-electronics-enquiry=["'][^"']+["'][^>]*>[\s\S]*?<\/section><\/div>/gi,'').replace(/<section\b[^>]*data-ecu-electronics-enquiry=["'][^"']+["'][^>]*>[\s\S]*?<\/section>/gi,'');
const visibleHtml=html=>(html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]??html.match(/<div id="root">[\s\S]*<\/div>/i)?.[0]??html).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/radix-:[A-Za-z0-9]+:/g,'radix:<generated>').replace(/\s+/g,' ').trim();
const visibleHash=html=>createHash('sha256').update(visibleHtml(removeEcuPanel(html))).digest('hex');
for(const route of protectedRoutes){try{const [before,after]=await Promise.all([fs.readFile(path.join(priorDist,route.slice(1),'index.html'),'utf8'),htmlFor(route)]);check(visibleHash(after),visibleHash(before),'Preserved visible HTML '+route);report.protectedRoutes.push({route,passed:true,visibleHtmlSha256:visibleHash(after),normalization:'Whitespace and generated Radix useId only; text, links, controls and other attributes retained.'});}catch(error){report.failures.push({route,error:error.message});}}
for(const before of oldAll.records.filter(r=>r.robots.some(x=>x.includes('noindex')))){try{const after=await htmlFor(before.route);check(/noindex/i.test(meta(after,'robots').join(',')),true,'Retained noindex policy');check(sitemap.includes(`<loc>${origin+before.route}</loc>`),false,'Noindex excluded from sitemap');report.noindexPolicies.push({route:before.route,unchanged:true});}catch(error){report.failures.push({route:before.route,error:error.message});}}
check(routes.length,1256,'No new public content routes');
report.passed=report.pages.length===16&&report.failures.length===0;
await fs.writeFile(path.join(out,'diagnostics-ac-static-results.json'),JSON.stringify(report,null,2));
await fs.writeFile(path.join(out,'metadata-before-after.json'),JSON.stringify(report.pages.map(r=>({route:r.route,before:r.before,after:r.after})),null,2));
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
await fs.writeFile(path.join(out,'metadata-before-after.csv'),[['URL','Old title','New title','Old description','New description','Old H1','New H1','Old FAQ count','New FAQ count'],...report.pages.map(r=>[origin+r.route,r.before.title,r.after.title,r.before.description,r.after.description,r.before.h1,r.after.h1,r.before.faqs,r.after.faqs])].map(row=>row.map(csv).join(',')).join('\n'));
console.log(JSON.stringify({passed:report.passed,routes:report.pages.length,checks:report.checks,directNewLinkOccurrences:report.links.length,protectedRoutes:report.protectedRoutes.length,noindexPolicies:report.noindexPolicies.length,failures:report.failures.map(({stack,...r})=>r)},null,2));
if(!report.passed)process.exitCode=1;
