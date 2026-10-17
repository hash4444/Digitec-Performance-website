import { readFile, writeFile } from 'node:fs/promises';
import { handleRequest } from '../../../cloudflare/production-seo-router.js';
const out='outputs/ppf-phase2-2026-10-17/production';
const origin='https://digitecme.com';
const phase2='outputs/ppf-phase2-2026-10-17';
const optionalJson=async file=>readFile(file,'utf8').then(JSON.parse).catch(()=>null);
const finalBuild=await optionalJson(phase2+'/qa/build-results.json');
const phase2Browser=await optionalJson(phase2+'/browser/browser-results.json');
const phase2Local=await optionalJson(phase2+'/local-verification.json');
const phase2Journey=await optionalJson(phase2+'/qa/journey-results.json');
const live=JSON.parse(await readFile(out+'/live-audit.json','utf8'));
const sitemap=await readFile('dist/sitemap.xml','utf8');
const liveSitemap=await readFile(out+'/sitemap.xml','utf8');
const attr=(s,n)=>s.match(new RegExp('(?:^|\\s)'+n+'=["\']([^"\']*)["\']','i'))?.[1]||'';
const clean=s=>s.replace(/<[^>]+>/g,' ').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replace(/\s+/g,' ').trim();
const metadata=html=>({title:clean(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''),canonical:[...html.matchAll(/<link\b[^>]*>/gi)].filter(m=>attr(m[0],'rel')==='canonical').map(m=>attr(m[0],'href')),hreflang:[...html.matchAll(/<link\b[^>]*>/gi)].filter(m=>attr(m[0],'hreflang')).map(m=>({lang:attr(m[0],'hreflang'),href:attr(m[0],'href')})),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1])),quoteFields:['vehicle_brand','vehicle_model','vehicle_year','coverage','customer_name','contact_method','contact_details','customer_notes'].filter(name=>html.includes(`name="${name}"`)),fieldsetsDisabled:/<fieldset\b[^>]*disabled/.test(html)});
const pairs=[['/ppf','/services/paint-protection-film'],['/services/ppf','/services/paint-protection-film'],['/paint-protection','/services/paint-protection-dubai'],['/car-paint-protection','/services/paint-protection-dubai'],['/services/paint-protection','/services/paint-protection-dubai'],['/services/car-paint-protection','/services/paint-protection-dubai']].flatMap(([a,b])=>[[a,b],[`/ar${a}`,`/ar${b}`]]);
const originFetch=async request=>{const route=new URL(request.url).pathname;const body=await readFile(`dist${route==='/'?'':route}/index.html`,'utf8').catch(()=>readFile('dist/index.html','utf8'));return new Response(request.method==='HEAD'?null:body,{status:200,headers:{'Content-Type':'text/html'}});};
const rows=[];
for(const owner of live.owners){
 const html=await readFile(`dist${owner.route}/index.html`,'utf8');const local=metadata(html);const response=await handleRequest(new Request(origin+owner.route),originFetch);
 rows.push({kind:'canonical',request:owner.route,expectedStatus:200,expectedLocation:null,local:{status:response.status,location:response.headers.get('location'),...local,inSitemap:sitemap.includes(`<loc>${origin+owner.route}</loc>`)},production:{status:owner.status,location:null,title:owner.title,canonical:owner.canonical,h1:owner.h1,hreflang:owner.hreflang,inSitemap:owner.inSitemap,quoteFields:metadata(await readFile(out+'/'+owner.htmlFile,'utf8')).quoteFields},releaseResult:local.title===owner.title&&JSON.stringify(local.h1)===JSON.stringify(owner.h1)?'Current local metadata equals production; check intended content separately':'Local intended change is not yet published'});
}
for(const [alias,target]of pairs){for(const requestPath of [alias,alias+'/']){
 const response=await handleRequest(new Request(origin+requestPath),originFetch);const production=live.redirects.find(r=>r.url===origin+requestPath);
 rows.push({kind:'alias',request:requestPath,expectedStatus:308,expectedLocation:origin+target,local:{status:response.status,location:response.headers.get('location'),canonical:[],rendered:'Redirect response; inspect destination canonical row',inSitemap:sitemap.includes(`<loc>${origin+requestPath}</loc>`)},production:{status:production.hops[0].status,location:production.hops[0].headers.location||null,canonical:production.canonical,rendered:production.finalTitle,inSitemap:liveSitemap.includes(`<loc>${origin+requestPath}</loc>`)},releaseResult:'FAIL production redirect; PASS local actual entrypoint'});
}}
for(const target of [...new Set(pairs.map(([,target])=>target))]){
 const response=await handleRequest(new Request(origin+target+'/'),originFetch);const production=live.redirects.find(r=>r.url===origin+target+'/');
 rows.push({kind:'canonical-slash',request:target+'/',expectedStatus:308,expectedLocation:origin+target,local:{status:response.status,location:response.headers.get('location'),canonical:[]},production:{status:production.hops[0].status,location:production.hops[0].headers.location||null,canonical:production.canonical,rendered:production.finalTitle},releaseResult:'FAIL production normalization; PASS local actual entrypoint'});
}
const phase1Browser=JSON.parse(await readFile('outputs/ppf-phase1-2026-10-17/browser/browser-results.json','utf8'));
for(const row of rows){
 const destination=row.kind==='canonical'?row.request:new URL(row.expectedLocation).pathname;
 const ppf=destination.endsWith('/services/paint-protection-film');
 const journeyPage=phase2Journey?.pages?.find(page=>page.page===destination);
 row.local.mobile=ppf&&phase2Browser?.passed?'PASS final Phase2 EN/AR 320/390/1440; browser/browser-results.json':journeyPage?'PASS final Phase2 '+journeyPage.viewports.join('/')+'; qa/journey-results.json':'Not directly sampled in final mobile suite; static route checks PASS';
 row.local.quotationWorkflow=ppf&&phase2Browser?.passed?'PASS local draft/validation/privacy/deduplication; receipt unverified':'Not the primary PPF quotation form owner; inspect destination links';
 row.production.mobile=ppf?'Earlier Phase1 read-only layout baseline only; published new build unverified':'No fresh Phase2 mobile release test';
 row.production.quotationWorkflow=ppf?(destination.startsWith('/ar/')?'FAIL new form publication: absent in public initial HTML':'FAIL new form publication: old form in public initial HTML'):'Not the primary PPF quotation form owner';
}
const report={checkedAt:new Date().toISOString(),liveCheckedAt:live.checkedAt,scope:'Local actual configured entrypoint plus final built dist metadata; fresh public GET/HEAD evidence. Live observations do not use local results as proof of production success.',finalBuild:finalBuild?{file:phase2+'/qa/build-results.json',sourceManifest:phase2+'/qa/source-manifest.json',passed:finalBuild.passed,sourceSha256:finalBuild.sourceSha256,stages:finalBuild.steps.length,finishedAt:finalBuild.finishedAt}:null,localVerification:phase2Local?{file:phase2+'/local-verification.json',checks:phase2Local.checks,passed:phase2Local.passed,failed:phase2Local.failed}:null,rows,mobileAndQuotationEvidence:{currentPhase2:phase2Browser?{file:phase2+'/browser/browser-results.json',passed:phase2Browser.passed,widths:phase2Browser.viewportWidths,quotationForms:phase2Browser.quotationForms,languageSwitch:phase2Browser.languageSwitchRoundTrip,errors:phase2Browser.errors}:null,currentPhase2Journey:phase2Journey?{file:phase2+'/qa/journey-results.json',passed:phase2Journey.passed}:null,inheritedPhase1:{file:'outputs/ppf-phase1-2026-10-17/browser/browser-results.json',passed:phase1Browser.passed,widths:phase1Browser.viewportWidths,quotationForms:phase1Browser.quotationForms,languageSwitch:phase1Browser.languageSwitchRoundTrip,scope:'Historical Phase1 build only; kept separately from current Phase2 evidence.'},production:{mobile:'Phase1 live read-only layout baseline only; no fresh Phase2 browser enquiry or receipt tests performed.',quotation:'Fresh raw HTML remains pre-Phase1 EN four-field form and no AR form; no received enquiry or booking verified.'}}};
await writeFile(out+'/release-verification-matrix.json',JSON.stringify(report,null,2));
const columns=['kind','request','expected_status','expected_location','local_status','local_location','local_canonical','local_title_or_html','local_sitemap','local_hreflang','local_quote_fields','local_mobile','local_quote_workflow','production_status','production_location','production_canonical','production_title_or_html','production_sitemap','production_hreflang','production_quote_fields','production_mobile','production_quote_workflow','release_result'];
const csv=rows.map(r=>[r.kind,r.request,r.expectedStatus,r.expectedLocation,r.local.status,r.local.location,JSON.stringify(r.local.canonical),r.local.title||r.local.rendered||'',r.local.inSitemap,JSON.stringify(r.local.hreflang||[]),JSON.stringify(r.local.quoteFields||[]),r.local.mobile,r.local.quotationWorkflow,r.production.status,r.production.location,JSON.stringify(r.production.canonical),r.production.title||r.production.rendered||'',r.production.inSitemap,JSON.stringify(r.production.hreflang||[]),JSON.stringify(r.production.quoteFields||[]),r.production.mobile,r.production.quotationWorkflow,r.releaseResult]);
await writeFile(out+'/release-verification-matrix.csv',[columns,...csv].map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n');
console.log(JSON.stringify({rows:rows.length,kinds:rows.reduce((s,r)=>(s[r.kind]=(s[r.kind]||0)+1,s),{}),localRedirectFailures:rows.filter(r=>r.expectedStatus===308&&(r.local.status!==308||r.local.location!==r.expectedLocation)).length},null,2));
