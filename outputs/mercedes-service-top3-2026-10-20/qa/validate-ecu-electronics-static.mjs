import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const root=process.cwd(),out=path.resolve(process.argv[2]);
assert.ok(root.includes('mercedes-service-top3-2026-10-20')&&root.endsWith('candidate.local'),'Isolated ECU candidate required');
await fs.mkdir(out,{recursive:true});
const baseline=JSON.parse(await fs.readFile("C:\\Users\\ADMIN\\Documents\\ChatGPT\\DIGITEC\\outputs\\ecu-electronics-2026-10-19\\audit\\selected-owner-baseline.json",'utf8'));
const allBefore=JSON.parse(await fs.readFile("C:\\Users\\ADMIN\\Documents\\ChatGPT\\DIGITEC\\outputs\\ecu-electronics-2026-10-19\\audit\\baseline-owner-audit.json",'utf8'));
const {getPublicRoutes}=await import(pathToFileURL(path.join(root,'dist-server/entry-server.js')).href);
const routes=getPublicRoutes(),manifest=new Map(routes.map(r=>[r.path,r]));
const origin='https://digitecme.com',sitemap=await fs.readFile('dist/sitemap.xml','utf8');
const decode=x=>String(x??'').replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&apos;',"'").replaceAll('&#39;',"'").replaceAll('&nbsp;',' ').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
const clean=x=>decode(String(x).replace(/<[^>]*>/g,' ')).replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g,'').replace(/\s+/g,' ').trim();
const attr=(tag,name)=>decode(tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,'i'))?.slice(1).find(x=>x!==undefined)??'');
const tags=(html,name)=>[...html.matchAll(new RegExp(`<${name}\\b[^>]*>`,'gi'))].map(m=>m[0]);
const meta=(html,name)=>tags(html,'meta').filter(t=>attr(t,'name')===name).map(t=>attr(t,'content'));
const scripts=html=>[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m=>attr(m[1],'type')==='application/ld+json').map(m=>JSON.parse(m[2]));
const links=html=>[...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m=>({href:attr(m[1],'href'),text:clean(m[2]),placement:attr(m[1],'data-cta-placement')}));
const file=route=>path.join(root,'dist',route.slice(1),'index.html');
const canon=html=>tags(html,'link').filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href'));
const alternates=html=>tags(html,'link').filter(t=>attr(t,'rel')==='alternate').map(t=>({lang:attr(t,'hreflang'),href:attr(t,'href')}));
const title=html=>[...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(m=>clean(m[1]));
const h1=html=>[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1]));
// Remove the marked new panel and only its two known integration wrappers.
// The existing page markup, copy, classes, contact URLs and forms are retained.
const stripPanel=html=>html.replace(/<div class="(?:mt-7|mx-auto max-w-5xl px-4 pt-12 sm:px-6)"><section\b[^>]*data-ecu-electronics-enquiry=["'][^"']+["'][^>]*>[\s\S]*?<\/section><\/div>/gi,'').replace(/<section\b[^>]*data-ecu-electronics-enquiry=["'][^"']+["'][^>]*>[\s\S]*?<\/section>/gi,'');
const visible=html=>(html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]??html.match(/<div id="root">[\s\S]*<\/div>/i)?.[0]??html).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/radix-:[A-Za-z0-9]+:/g,'radix:<generated>').replace(/\s+/g,' ').trim();
const sha=x=>createHash('sha256').update(x).digest('hex');
const report={checkedAt:new Date().toISOString(),passed:false,pages:[],checks:0,links:[],noindexPolicies:[],failures:[],scope:'Local HTML/schema/routing only; no Google index status, Rich Results API, delivered lead or production publication assertion.'};
const check=(a,b,msg)=>{report.checks++;assert.deepEqual(a,b,msg);};
for(const before of baseline.records){try{
 const route=before.route,arabic=route.startsWith('/ar/'),english=route.replace(/^\/ar/,''),infotainment=/head-unit|cadillac-cue/.test(route),mode=infotainment?'infotainment':/diagnostics/.test(route)?'software':'electrical';
 const [html,oldHtml]=await Promise.all([fs.readFile(file(route),'utf8'),fs.readFile(before.snapshotPath,'utf8')]);
 check(sha(oldHtml),before.snapshotSha256,'Immutable before snapshot');
 check(title(html),title(oldHtml),'Existing metadata title retained');check(meta(html,'description'),meta(oldHtml,'description'),'Existing description retained');check(h1(html),h1(oldHtml),'Existing H1 retained');check(h1(html).length,1,'One H1');
 check(canon(html),[origin+route],'Self canonical');check(alternates(html),alternates(oldHtml),'Existing hreflang retained');check(meta(html,'robots'),meta(oldHtml,'robots'),'Existing robots retained');check(/noindex|nofollow/i.test(meta(html,'robots').join(',')),false,'Indexable');check(manifest.get(route)?.indexable,true,'Manifest indexable');check(sitemap.includes(`<loc>${origin+route}</loc>`),true,'In sitemap');
 check(scripts(html),scripts(oldHtml),'Shared and page entity graphs unchanged');
 const graph=scripts(html).flatMap(s=>s['@graph']??[s]);check(graph.some(n=>n['@id']===origin+route+'#service'&&n.provider?.['@id']===origin+'/#business'),true,'Existing page Service references business');
 check(sha(visible(stripPanel(html))),sha(visible(oldHtml)),'All prior visible markup/content/contact URLs retained after removing only new marked section; normalize generated Radix IDs and whitespace');
 const panel=html.match(/<section\b[^>]*data-ecu-electronics-enquiry=["'][^"']+["'][^>]*>[\s\S]*?<\/section>/i)?.[0];assert.ok(panel,'New panel in initial rendered HTML');report.checks++;
 check(tags(html,'section').filter(t=>attr(t,'data-ecu-electronics-enquiry')===mode).length,1,'One scoped panel');
 check((panel.match(/data-ecu-function-question(?:[\s=>])/g)??[]).length,3,'Three crawlable questions');check((panel.match(/<h3\b/g)??[]).length,4,'Three question headings and one quotation heading');check((panel.match(/<h2\b/g)??[]).length,1,'One H2 section heading');
 check(/guaranteed|all (?:ECUs|modules|vehicles)|every (?:ECU|module) is supported|we clone|we repair ECU hardware/i.test(clean(panel)),false,'No universal compatibility or unverified hardware claim');
 const quote=links(panel).filter(a=>a.placement==='ecu_electronics_quote'&&a.href.startsWith('https://wa.me/'));check(quote.length,1,'One specialist draft CTA');
 const draft=new URL(quote[0].href),message=draft.searchParams.get('text');check(draft.origin+draft.pathname,'https://wa.me/97143402223','Established WhatsApp destination');check(message.length>300,true,'Useful specialist intake');
 for(const pattern of arabic?[/الصانع.*الطراز.*السنة/,/الأعراض/,/التحذير/,/تقرير/,/استُبدلت.*وحدة/,/الإجراء المطلوب/,/الموعد المفضل/]:[/Make\/model\/year/,/Symptoms/,/Warning message/,/diagnostic report/,/control module recently replaced/,/Requested function/,/Preferred appointment time/])check(pattern.test(message),true,'Required vehicle/module intake field');
 check(/password|credential|immobilizer|كلمات مرور|بيانات دخول|منع التشغيل/i.test(message),false,'No security credential field or function intake');check(arabic?/لا ترسل كلمات مرور/.test(clean(panel)):/Do not send passwords/.test(clean(panel)),true,'Privacy notice beside draft');check(arabic?/لا يؤكد/.test(clean(panel)):/does not confirm receipt or an appointment/.test(clean(panel)),true,'No confirmed received lead claim');
 check(links(panel).some(a=>a.href==='tel:+97143402223'),true,'Telephone next step');if(arabic)check(/<bdi\b[^>]*dir="ltr"[^>]*>\+971 4 340 2223<\/bdi>/.test(panel),true,'Arabic phone direction isolated');
 const newLinks=links(panel).filter(a=>a.href.startsWith('/'));check(newLinks.length>=1,true,'Relevant internal next step');
 for(const link of newLinks){const target=new URL(link.href,origin+route).pathname;check(manifest.get(target)?.indexable,true,'Link target existing/indexable');check(canon(await fs.readFile(file(target),'utf8')),[origin+target],'Link points directly to canonical');if(arabic)check(target.startsWith('/ar/'),true,'Arabic links have genuine counterparts');report.links.push({from:route,to:target,text:link.text});}
 if(infotainment){check(alternates(html).some(l=>l.lang==='ar-AE'),false,'English-only policy retained');check(manifest.has('/ar'+english),false,'No invented Arabic route');}
 const after={title:title(html)[0],description:meta(html,'description')[0],h1:h1(html)[0],canonical:canon(html)[0]};
 report.pages.push({route,mode,language:arabic?'ar':'en',before:{title:title(oldHtml)[0],description:meta(oldHtml,'description')[0],h1:h1(oldHtml)[0],canonical:canon(oldHtml)[0]},after,metadataChanged:false,pageGraphChanged:false,oldContentAndCtasPreserved:true,questionsAdded:3,passed:true});
}catch(error){report.failures.push({route:before.route,error:error.message,stack:error.stack});}}
for(const r of allBefore.records.filter(r=>r.robots.some(x=>x.includes('noindex')))){try{check(/noindex/.test(meta(await fs.readFile(file(r.route),'utf8'),'robots').join(',')),true,'Preserve secondary-service noindex');check(sitemap.includes(`<loc>${origin+r.route}</loc>`),false,'Noindex stays out of sitemap');report.noindexPolicies.push(r.route);}catch(error){report.failures.push({route:r.route,error:error.message});}}
check(routes.length,1256,'No new routes');check((sitemap.match(/<loc>/g)??[]).length,1005,'Canonical sitemap size retained');
report.passed=report.pages.length===14&&report.failures.length===0;
await fs.writeFile(path.join(out,'ecu-electronics-static-results.json'),JSON.stringify(report,null,2));
await fs.writeFile(path.join(out,'ecu-metadata-before-after.json'),JSON.stringify(report.pages.map(r=>({route:r.route,before:r.before,after:r.after})),null,2));
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
await fs.writeFile(path.join(out,'ecu-metadata-before-after.csv'),[['URL','Before title','After title','Before description','After description','Before H1','After H1','Metadata changed'],...report.pages.map(r=>[origin+r.route,r.before.title,r.after.title,r.before.description,r.after.description,r.before.h1,r.after.h1,r.metadataChanged])].map(row=>row.map(csv).join(',')).join('\n'));
console.log(JSON.stringify({passed:report.passed,pages:report.pages.length,checks:report.checks,newInternalLinkOccurrences:report.links.length,oldMetadataSchemaContentAndCtasPreserved:report.pages.every(r=>r.oldContentAndCtasPreserved),noindexPolicies:report.noindexPolicies.length,failures:report.failures.map(({stack,...r})=>r)},null,2));
if(!report.passed)process.exitCode=1;
