import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const dist=path.resolve(process.argv[2] || 'dist');
const out=path.join(root,'outputs/paint-seo-predeployment-2026-10-12');
fs.mkdirSync(out,{recursive:true});
const routes=['/services/paint-protection-dubai','/services/paint-protection-film','/services/ceramic-coating','/services/car-polishing-dubai','/ar/services/paint-protection-dubai','/ar/services/paint-protection-film','/ar/services/ceramic-coating','/blog/ceramic-coating-vs-ppf-dubai','/blog/why-ceramic-coating-matters-uae','/ar/blog/ceramic-coating-vs-ppf-dubai','/ar/blog/why-ceramic-coating-matters-uae','/services','/ar/services','/sitemap','/ar/sitemap'];
const origin='https://digitecme.com';
const dec=s=>s.replace(/&quot;/g,'"').replace(/&#x27;|&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
const plain=s=>dec(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const attrs=s=>Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],dec(m[2])]));
const parse=(html,route)=>{
 const head=html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
 const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '';
 const meta=[...head.matchAll(/<meta\b[^>]*>/gi)].map(m=>attrs(m[0]));
 const links=[...head.matchAll(/<link\b[^>]*>/gi)].map(m=>attrs(m[0]));
 const docs=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]));
 return {route,sha256:crypto.createHash('sha256').update(html).digest('hex'),titles:[...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map(m=>plain(m[1])),descriptions:meta.filter(m=>m.name==='description').map(m=>m.content),canonicals:links.filter(l=>l.rel==='canonical').map(l=>l.href),alternates:links.filter(l=>l.rel==='alternate'&&l.hreflang).map(l=>({language:l.hreflang,href:l.href})),robots:meta.filter(m=>m.name==='robots'||m.name==='googlebot').map(m=>m.content),social:meta.filter(m=>m.property?.startsWith('og:')||m.name?.startsWith('twitter:')||m.property?.startsWith('article:')),h1s:[...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>plain(m[1])),nodes:docs.flatMap(d=>d['@graph']||[d]),mainText:plain(main),blocks:[...main.matchAll(/<(?:p|li|td|dd|figcaption|summary)\b[^>]*>([\s\S]*?)<\/(?:p|li|td|dd|figcaption|summary)>/gi)].map(m=>plain(m[1])),visibleLinks:[...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m=>({href:attrs(m[1]).href,text:plain(m[2])}))};
};
const current=routes.map(route=>parse(fs.readFileSync(path.join(dist,route.slice(1),'index.html'),'utf8'),route));
const baseline=routes.flatMap(route=>{const p=path.join(root,'outputs/paint-seo-2026-10-12/before/html',route.slice(1),'index.html');return fs.existsSync(p)?[parse(fs.readFileSync(p,'utf8'),route)]:[]});
const baselineShared=baseline[0].nodes.filter(n=>['/#organization','/#business','/#website','/#logo','/#service-catalog'].some(s=>n['@id']===origin+s));
const errors=[]; const check=(x,r,m)=>{if(!x)errors.push({route:r,message:m})};
const titleSet=new Set(); const descSet=new Set();
const flatten=x=>Array.isArray(x)?x.flatMap(flatten):x&&typeof x==='object'?[x,...Object.values(x).flatMap(flatten)]:[];
for(const rec of current){
check(rec.titles.length===1&&rec.titles[0],rec.route,'exactly one nonempty title');check(rec.descriptions.length===1&&rec.descriptions[0],rec.route,'exactly one nonempty description');check(rec.canonicals.length===1&&rec.canonicals[0]===origin+rec.route,rec.route,'single self canonical');check(rec.h1s.length===1,rec.route,'one H1');check(!rec.robots.some(r=>/noindex/i.test(r)),rec.route,'indexable metadata');
check(!titleSet.has(rec.titles[0]),rec.route,'distinct title');titleSet.add(rec.titles[0]);check(!descSet.has(rec.descriptions[0]),rec.route,'distinct description');descSet.add(rec.descriptions[0]);
const en=rec.route.replace(/^\/ar(?=\/)/,'');const expected=[{language:'en-AE',href:origin+en},...(en==='/services/car-polishing-dubai'?[]:[{language:'ar-AE',href:origin+'/ar'+en}]),{language:'x-default',href:origin+en}];check(JSON.stringify(rec.alternates)===JSON.stringify(expected),rec.route,'expected English/Arabic/self/x-default hreflang set');
for(const social of rec.social){const key=social.property||social.name;if(!rec.route.startsWith('/ar/blog/')){if(['og:title','twitter:title'].includes(key))check(social.content===rec.titles[0],rec.route,key+' matches title');if(['og:description','twitter:description'].includes(key))check(social.content===rec.descriptions[0],rec.route,key+' matches description');}if(key==='og:url')check(social.content===origin+rec.route,rec.route,'OG URL self canonical');}
for(const node of baselineShared){check(JSON.stringify(rec.nodes.find(n=>n['@id']===node['@id']))===JSON.stringify(node),rec.route,'preserves shared '+node['@id']);}
const all=flatten(rec.nodes);for(const obj of all){for(const k of ['price','lowPrice','highPrice','priceCurrency','aggregateRating','review','ratingValue','reviewCount']){if(Object.hasOwn(obj,k)&&!baselineShared.some(n=>JSON.stringify(n).includes(JSON.stringify(obj))))errors.push({route:rec.route,message:'unverified route-level '+k,object:obj});}}
const seen=new Map();for(const node of rec.nodes.filter(n=>n['@id'])){if(seen.has(node['@id']))errors.push({route:rec.route,message:'duplicate top-level schema ID '+node['@id']});seen.set(node['@id'],node);}
const breadcrumb=rec.nodes.find(n=>n['@type']==='BreadcrumbList');check(breadcrumb?.itemListElement?.at(-1)?.item===origin+rec.route,rec.route,'breadcrumb ends with canonical');
const lang=rec.route.startsWith('/ar/')?'ar-AE':'en-AE';
const local=rec.nodes.filter(n=>n['@id']?.startsWith(origin+rec.route+'#'));
for(const node of local){if(node.inLanguage)check(node.inLanguage===lang,rec.route,'localized schema language');if(node.url)check(node.url===origin+rec.route,rec.route,'route schema URL self canonical');if(node.provider)check(node.provider['@id']===origin+'/#business',rec.route,'service provider shared business');if(node['@type']==='FAQPage'){for(const f of node.mainEntity){check(rec.mainText.includes(f.name)&&rec.mainText.includes(f.acceptedAnswer.text),rec.route,'FAQ question and answer verbatim in initial text: '+f.name);}}if(node.dateModified)check(node.dateModified==='2026-10-12',rec.route,'changed page schema modification date');}
}
const sitemap=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');const beforeSitemap=fs.readFileSync(path.join(root,'outputs/paint-seo-2026-10-12/before/public/sitemap.xml'),'utf8');
const urls=s=>[...s.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>({loc:m[1].match(/<loc>(.*?)<\/loc>/)?.[1],lastmod:m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1]}));
const afterUrls=urls(sitemap),beforeUrls=urls(beforeSitemap),beforeMap=new Map(beforeUrls.map(u=>[u.loc,u.lastmod]));
check(afterUrls.length===1005,'sitemap','1005 URLs');check(new Set(afterUrls.map(u=>u.loc)).size===afterUrls.length,'sitemap','no duplicate URLs');check(JSON.stringify(afterUrls.map(u=>u.loc))===JSON.stringify(beforeUrls.map(u=>u.loc)),'sitemap','same URL inventory/order');
const sitemapChanged=afterUrls.filter(u=>u.lastmod!==beforeMap.get(u.loc));check(sitemapChanged.length===15,'sitemap','15 scoped lastmod changes');for(const r of routes)check(afterUrls.some(u=>u.loc===origin+r&&u.lastmod==='2026-10-12'),r,'sitemap current lastmod');
check(!fs.existsSync(path.join(dist,'ar/services/car-polishing-dubai/index.html')),'routes','no invented Arabic polishing output');
const claimWords=/\b(?:3M|XPEL|STEK|LLumar|SunTek|Gtechniq|Gyeon|CarPro|Ceramic Pro|TPU|polyurethane|SiO2|9H|10H|nano|UV|warrant\w*|guarantee\w*|year\w*|durab\w*|lifespan|self.heal\w*|hydrophob\w*|gloss|scratch\w*|finish\w*|bead\w*|price|cost|AED)\b|ضمان|سنوات|يدوم|الخدوش|التكلفة|السعر|اللمعان|الأشعة/iu;
fs.writeFileSync(path.join(out,'independent-seo-records.json'),JSON.stringify({dist,errors,sitemapChanged,baselineShared,current,baseline},null,2)+'\n');
fs.writeFileSync(path.join(out,'rendered-claim-contexts.txt'),current.map(r=>r.route+'\n'+r.blocks.filter(t=>claimWords.test(t)).map(t=>'  '+t).join('\n')).join('\n\n')+'\n');
console.log(JSON.stringify({dist,errors,sitemapChanged,metadata:current.map(({route,titles,descriptions,canonicals,h1s,alternates,nodes})=>({route,titles,descriptions,canonicals,h1s,alternates,schemaTypes:nodes.map(n=>n['@type'])})),sharedSchemaTypes:baselineShared.map(n=>n['@type'])},null,2));
