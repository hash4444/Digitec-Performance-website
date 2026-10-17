import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base='outputs/ppf-phase3-4-2026-10-17';
const live=JSON.parse(await readFile(base+'/crawlability/live-audit.json','utf8'));
const origin='https://digitecme.com';
const localSitemap=await readFile('dist/sitemap.xml','utf8');
const liveSitemap=await readFile(base+'/crawlability/sitemap.xml','utf8');
const build=JSON.parse(await readFile('release-qa.local/build-results.json','utf8'));
const buildManifest=JSON.parse(await readFile('release-qa.local/source-manifest.json','utf8'));
if(createHash('sha256').update(JSON.stringify(buildManifest)).digest('hex')!==build.sourceSha256)throw new Error('Build and source-manifest fingerprints do not match.');
await writeFile(base+'/crawlability/build-snapshot.json',JSON.stringify(build,null,2));
await writeFile(base+'/crawlability/build-source-manifest.json',JSON.stringify(buildManifest,null,2));
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const attr=(s,n)=>decode(s.match(new RegExp('(?:^|\\s)'+n+'=["\']([^"\']*)["\']','i'))?.[1]||'');
const clean=s=>decode(s.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const walk=o=>o&&typeof o==='object'?[o,...Object.values(o).flatMap(walk)]:[];
const type=(node,t)=>[].concat(node['@type']||[]).includes(t);
const ids={organization:origin+'/#organization',business:origin+'/#business',website:origin+'/#website'};
function parse(html){
 const schemas=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]));
 const nodes=schemas.flatMap(s=>s['@graph']||[].concat(s));
 const all=walk(schemas);const definitions=all.filter(n=>n['@type']&&n['@id']);
 const dup=[...new Set(definitions.map(n=>n['@id']))].filter(id=>definitions.filter(n=>n['@id']===id).length>1);
 const links=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
 const bodyText=clean(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,''));
 const textInputs=[...html.matchAll(/<(?:input|select|textarea)\b[^>]*>/gi)].map(m=>attr(m[0],'name')).filter(Boolean);
 return {title:clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1])),canonical:links.filter(l=>attr(l,'rel')==='canonical').map(l=>attr(l,'href')),hreflang:links.filter(l=>attr(l,'hreflang')).map(l=>({lang:attr(l,'hreflang'),href:attr(l,'href')})),schema:nodes,organization:nodes.find(n=>n['@id']===ids.organization),business:nodes.find(n=>n['@id']===ids.business),website:nodes.find(n=>n['@id']===ids.website),typedDefinitionCount:definitions.length,duplicateTypedIds:dup,topLevelBusinessDefinitions:nodes.filter(n=>type(n,'LocalBusiness')||type(n,'AutomotiveBusiness')||type(n,'AutoRepair')).map(n=>({id:n['@id'],types:n['@type']})),ppfOffers:all.filter(n=>type(n,'Offer')&&/ppf|paint.protection/i.test(JSON.stringify(n))),inheritedOfferCount:all.filter(n=>type(n,'Offer')).length,prohibitedPpfTypes:all.filter(n=>['AggregateRating','Review','Product'].some(t=>type(n,t))).map(n=>({id:n['@id'],type:n['@type']})),faqCount:all.filter(n=>type(n,'Question')).length,faqAnswersVisible:all.filter(n=>type(n,'Answer')).every(n=>bodyText.includes(clean(n.text||''))),bodyTextLength:bodyText.length,quoteFields:textInputs.filter(n=>/vehicle_|coverage|customer_|contact_/.test(n)),sha256:createHash('sha256').update(html).digest('hex')};
}
const records=[];
for(const owner of live.owners){
 const local=parse(await readFile(`dist${owner.route}/index.html`,'utf8'));
 const publicPage=parse(await readFile(base+'/crawlability/'+owner.htmlFile,'utf8'));
 const expected=origin+owner.route;
 const shared={};for(const [key,id]of Object.entries(ids)){shared[key]={expected:id,liveId:publicPage[key]?.['@id'],localId:local[key]?.['@id'],stable:publicPage[key]?.['@id']===id&&local[key]?.['@id']===id};}
 const links=publicPage.schema.find(n=>n['@id']===expected+'#webpage');
 const service=publicPage.schema.find(n=>type(n,'Service'));
 const article=publicPage.schema.find(n=>type(n,'BlogPosting')||type(n,'Article'));
 records.push({route:owner.route,publicStatus:owner.status,headStatus:live.headChecks.find(h=>h.route===owner.route)?.status,publicRobots:owner.robots,publicXRobotsTag:owner.headers['x-robots-tag']||null,inPublicSitemap:[...liveSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].filter(m=>m[1]===expected).length,inLocalSitemap:[...localSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].filter(m=>m[1]===expected).length,sharedIds:shared,relationships:{webpage:links?.['@id'],website:links?.isPartOf,publisher:links?.publisher,businessAbout:links?.about,mainEntity:links?.mainEntity,breadcrumb:links?.breadcrumb,serviceProvider:service?.provider,articlePublisher:article?.publisher},public:publicPage,local});
}
const report={checkedAt:new Date().toISOString(),publicAuditStartedAt:live.checkedAt,scope:'Fresh public GET/HEAD and initial HTML compared with final locally built HTML; no browser UI execution, external schema-validator, account access, deployment or mutation.',localBuild:{file:base+'/crawlability/build-snapshot.json',sourceManifest:base+'/crawlability/build-source-manifest.json',sourceSha256:build.sourceSha256,passed:build.passed,finishedAt:build.finishedAt,note:'Final local build snapshot; preserved independently of ignored release-qa.local files.'},records,summary:{owners:records.length,http200:records.filter(r=>r.publicStatus===200).length,selfCanonicals:records.filter(r=>JSON.stringify(r.public.canonical)===JSON.stringify([origin+r.route])).length,stableSharedIds:records.every(r=>Object.values(r.sharedIds).every(v=>v.stable)),duplicateBusinessIds:records.flatMap(r=>r.public.duplicateTypedIds),publicEntityLegalName:records[0].public.organization?.legalName||null,localEntityLegalName:records[0].local.organization?.legalName||null,liveAliasHomepageResponses:live.redirects.filter(r=>/\/(?:ppf|paint-protection|car-paint-protection)\/?$/.test(r.url)&&r.hops[0].status===200&&r.canonical.includes(origin+'/')).length},limits:['Technical crawl/index eligibility is not actual Google indexing or AI inclusion.','Site business records are not independent confirmation of current opening hours, contact receipt, exact PPF-facility pin or product claims.','Inherited shared general-service OfferCatalog is reported separately from any PPF Offer; no new PPF offer/price is present.','Final Phases3–4 mobile/browser QA is owned by the root task; prior Phase2 tests are not relabelled as current results.']};
await writeFile(base+'/crawlability/entity-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({publicAuditAt:live.checkedAt,localBuild:report.localBuild,summary:report.summary,owners:records.map(r=>({route:r.route,liveH1:r.public.h1,liveQuoteFields:r.public.quoteFields.length,localQuoteFields:r.local.quoteFields.length,duplicateTypedIds:r.public.duplicateTypedIds,faqAnswersVisible:r.public.faqAnswersVisible,ppfOffers:r.public.ppfOffers.length,inheritedOffers:r.public.inheritedOfferCount}))},null,2));
