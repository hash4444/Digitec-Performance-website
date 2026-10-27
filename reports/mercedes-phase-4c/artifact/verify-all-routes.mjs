// Offline only: compare every prerendered route and the narrowly proposed date correction.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const tests=path.dirname(fileURLToPath(import.meta.url));
const phase="C:\\Users\\ADMIN\\Documents\\ChatGPT\\DIGITEC\\reports\\mercedes-phase-4b";
const args=Object.fromEntries(process.argv.slice(2).map(a=>{const i=a.indexOf('=');if(!a.startsWith('--')||i<3)throw Error('Use --cohort=frozen-pnpm --option=A|B');return[a.slice(2,i),a.slice(i+1)];}));
for(const key of Object.keys(args))if(!['cohort','option'].includes(key))throw Error('Unknown argument '+key);
const selected=args.cohort==='frozen-pnpm';
if(args.cohort&&!selected)throw Error('Unsupported cohort');
const option=args.option||'B';
if(!['A','B'].includes(option))throw Error('Option must be A or B');
const cohortRoot=selected?path.join(phase,'production-matched.local'):phase;
const baseline=path.join(cohortRoot,'baseline.local');
const candidate=path.join(cohortRoot,option==='A'?'candidate.local':'release-b.local');
const out=path.join(tests,selected?`frozen-pnpm-${option}-all-routes`:'all-routes');
await fs.mkdir(out,{recursive:true});
const startedAt=new Date().toISOString();
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const stable=value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
const decode=value=>value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[0-9a-f]+);/gi,item=>{
 const named={'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'};
 return named[item.toLowerCase()]||String.fromCodePoint(parseInt(item.slice(item[2]?.toLowerCase()==='x'?3:2,-1),item[2]?.toLowerCase()==='x'?16:10));
});
const text=html=>decode(html.replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim();
function attrs(tag){const result={};const n=tag.match(/^<\/?[^\s>]+/)?.[0].length||0;for(const m of tag.slice(n).matchAll(/([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g))result[m[1].toLowerCase()]=decode(m[2]??m[3]??m[4]??'');return result;}
function rootHtml(html){const m=/<div\b[^>]*\bid="root"[^>]*>/.exec(html);if(!m)throw Error('Missing root');const re=/<\/?div\b[^>]*>/gi;re.lastIndex=m.index+m[0].length;let depth=1;for(let t;(t=re.exec(html));){depth+=/^<\/div/i.test(t[0])?-1:1;if(!depth)return html.slice(m.index+m[0].length,t.index);}throw Error('Unclosed root');}
function metadata(html){
 const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];if(!head)throw Error('Missing head');
 const meta=[...head.matchAll(/<meta\b[^>]*>/gi)].map(m=>attrs(m[0])).sort((a,b)=>stable(a).localeCompare(stable(b)));
 const links=[...head.matchAll(/<link\b[^>]*>/gi)].map(m=>attrs(m[0]));
 const jsonLd=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m=>attrs('<script'+m[1]+'>').type==='application/ld+json').map(m=>JSON.parse(m[2]));
 return {language:attrs(html.match(/<html\b[^>]*>/i)?.[0]||'<html>'),titles:[...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(m=>text(m[1])),h1s:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>text(m[1])),descriptions:meta.filter(m=>m.name==='description').map(m=>m.content),robots:meta.filter(m=>m.name==='robots'||m.name==='googlebot'),canonicals:links.filter(m=>m.rel==='canonical'),alternates:links.filter(m=>m.rel==='alternate').sort((a,b)=>stable(a).localeCompare(stable(b))),allMeta:meta,jsonLd};
}
const checks=[];const routeRows=[];
const check=(group,name,passed,evidence={})=>checks.push({group,name,passed:Boolean(passed),...evidence});
const manifests={};
for(const[label,directory]of Object.entries({baseline,candidate}))manifests[label]=JSON.parse(await fs.readFile(path.join(directory,'src/lib/routing-paths.json'),'utf8'));
const routes=manifests.baseline.validPaths;
check('manifest','exactly 1256 unique rendered paths',routes.length===1256&&new Set(routes).size===1256,{observed:routes.length});
check('manifest','complete client route manifest unchanged',stable(manifests.baseline)===stable(manifests.candidate));
const strictPath=path.join(tests,selected?`frozen-pnpm-${option}-16/results.json`:'release-b-16/results.json');
const strict=JSON.parse(await fs.readFile(strictPath,'utf8'));
const sitemapFiles=['dist/sitemap.xml','public/sitemap.xml'];
const expectedStrictFailureFiles=option==='B'?sitemapFiles:[];
const strictFailures=strict.checks.filter(c=>!c.passed);
check('targeted verifier',option==='B'?'strict run has only the two intentional sitemap equality failures':'strict run passes all 75 assertions without exceptions',strict.assertions===75&&strict.passedAssertions===75-expectedStrictFailureFiles.length&&strictFailures.length===expectedStrictFailureFiles.length&&strictFailures.every(c=>c.group==='routing and public URL preservation'&&expectedStrictFailureFiles.includes(c.name)),{actualAssertions:strict.assertions,actualPassed:strict.passedAssertions,actualFailures:strictFailures});
const changed=new Set(['/brands/mercedes-benz-service-dubai','/services/mercedes-body-repair-dubai']);
const diffs=[];
for(const route of routes){
 try{
  const relative=path.join('dist',route==='/'?'':route.slice(1),'index.html');
  const [before,after]=await Promise.all([fs.readFile(path.join(baseline,relative),'utf8'),fs.readFile(path.join(candidate,relative),'utf8')]);
  const br=rootHtml(before),ar=rootHtml(after),bm=metadata(before),am=metadata(after);
  const metadataEqual=stable(bm)===stable(am);const rootEqual=br===ar;
  check(route,'all protected metadata and parsed JSON-LD unchanged',metadataEqual,metadataEqual?{}:{before:bm,after:am});
  if(changed.has(route)){
   const target=strict.routes.find(r=>r.route===route);
   const targetChecks=strict.checks.filter(c=>c.group===route);
   const exactTargetVerified=target&&targetChecks.length>0&&targetChecks.every(c=>c.passed)&&target.rootSha256.baseline===hash(br)&&target.rootSha256.candidate===hash(ar)&&target.rootSha256.candidateAfterReversingApprovedChanges===hash(br);
   check(route,'root differs only by exact approved changes independently reversed by targeted verifier',!rootEqual&&exactTargetVerified,{targetedChecks:targetChecks.length,targetedEvidence:path.relative(out,strictPath).replaceAll('\\','/')});
  }else check(route,'unaffected React root byte-identical',rootEqual,rootEqual?{}:{baselineRootSha256:hash(br),candidateRootSha256:hash(ar)});
  if(!rootEqual)diffs.push(route);
  routeRows.push({route,scope:changed.has(route)?'approved English change':'unaffected',metadataEqual,rootEqual,htmlSha256:{baseline:hash(before),candidate:hash(after)},rootSha256:{baseline:hash(br),candidate:hash(ar)},metadataSha256:{baseline:hash(stable(bm)),candidate:hash(stable(am))},observedProtectedValues:{titles:am.titles,h1s:am.h1s,descriptions:am.descriptions,canonicals:am.canonicals,robots:am.robots,language:am.language,alternates:am.alternates,jsonLdBlockCount:am.jsonLd.length,jsonLdSha256:hash(stable(am.jsonLd))}});
 }catch(error){check(route,'read and parse rendered route',false,{error:error.message});}
}
check('coverage','all 1256 route documents compared',routeRows.length===1256,{observed:routeRows.length});
check('scope','only the two authorized English roots differ',stable([...diffs].sort())===stable([...changed].sort()),{changedRoots:diffs});
function sitemapRows(xml){return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)].map(m=>({url:m[1],lastmod:m[2]}));}
const sitemapChecks=[];
for(const file of sitemapFiles){
 const [bt,at]=await Promise.all([fs.readFile(path.join(baseline,file),'utf8'),fs.readFile(path.join(candidate,file),'utf8')]);
 const b=sitemapRows(bt),a=sitemapRows(at);const dateDiffs=[];
 for(let i=0;i<a.length;i++)if(a[i].lastmod!==b[i]?.lastmod)dateDiffs.push({url:a[i].url,before:b[i]?.lastmod,after:a[i].lastmod});
 const expected=option==='B'?[{url:'https://digitecme.com/brands/mercedes-benz-service-dubai',before:'2026-10-20',after:'2026-10-26'},{url:'https://digitecme.com/services/mercedes-body-repair-dubai',before:'2026-09-28',after:'2026-10-26'}]:[];
 const onlyDates=bt.replace(/<lastmod>[^<]+<\/lastmod>/g,'<lastmod>__DATE__</lastmod>')===at.replace(/<lastmod>[^<]+<\/lastmod>/g,'<lastmod>__DATE__</lastmod>');
 const passed=a.length===1005&&b.length===1005&&stable(a.map(x=>x.url))===stable(b.map(x=>x.url))&&stable(dateDiffs)===stable(expected)&&onlyDates;
 check('sitemap',`${file}: ${option==='B'?'exactly the two proposed English content dates':'no date exceptions'}; 1005 URL sequence unchanged`,passed,{dateDiffs,baselineCount:b.length,candidateCount:a.length,onlyLastmodValuesDiffer:onlyDates});
 sitemapChecks.push({file,baselineSha256:hash(bt),candidateSha256:hash(at),dateDiffs,passed});
}
const artifactFiles=['scripts/prerender.mjs','src/lib/routing-paths.json','dist/_redirects','docs/seo/permanent-redirects.csv','docs/seo/mercedes-permanent-redirects.csv','docs/seo/removed-brand-urls.csv','cloudflare/production-seo-router.js','cloudflare/mercedes-seo-router.js'];
for(const file of artifactFiles){const[b,a]=await Promise.all([fs.readFile(path.join(baseline,file)),fs.readFile(path.join(candidate,file))]);check('generator and routing definitions',file,b.equals(a),{baselineSha256:hash(b),candidateSha256:hash(a)});}
const data={};
for(const[label,directory]of Object.entries({baseline,candidate})){const contents=await fs.readFile(path.join(directory,'cloudflare/routing-response-data.js'),'utf8');data[label]=Object.fromEntries([...contents.matchAll(/^export const (\w+) = (.*);$/gm)].map(m=>[m[1],JSON.parse(m[2])]));}
for(const name of ['validPaths','legacyPaths','localizedFallbacks'])check('routing response arrays',name,stable(data.baseline[name])===stable(data.candidate[name]),{baselineCount:data.baseline[name].length,candidateCount:data.candidate[name].length});
const failed=checks.filter(c=>!c.passed);
const report={startedAtUtc:startedAt,finishedAtUtc:new Date().toISOString(),cohort:selected?'Frozen pnpm reproduction cohort; no assertion of identical public/build-environment bytes':'Original Phase4B diagnostic cohort',option,offlineOnly:true,networkRequests:0,inputMutations:0,baselineRoot:baseline,candidateRoot:candidate,renderedRoutesCompared:routeRows.length,metadataUnchangedRoutes:routeRows.filter(r=>r.metadataEqual).length,byteIdenticalUnaffectedRoots:routeRows.filter(r=>!changed.has(r.route)&&r.rootEqual).length,approvedChangedRoots:diffs,assertions:checks.length,passedAssertions:checks.length-failed.length,failedAssertions:failed.length,passed:failed.length===0,targetedStrictResult:{evidence:path.relative(out,strictPath).replaceAll('\\','/'),passed:strict.passed,assertions:strict.assertions,passedAssertions:strict.passedAssertions,failedAssertions:strict.failedAssertions,meaning:option==='B'?'Strict Phase4 byte-equality result retained. Its two sitemap failures are resolved by separate exact-two-date checks in this report, not erased or relabelled.':'Strict verifier passes all 75 checks with no sitemap exception.'},sitemapChecks,checks,routes:routeRows,limits:['Local prerendered SSR and generated files only. No live routing, Cloudflare or Google indexing checks.','No protected body bytes are normalized: 1254 unaffected roots must be exactly equal.','Two changed roots are accepted only after exact approved-change reversal in the independent targeted verifier and matching root hashes.','Client bundle filenames outside the React root are outside metadata equality, with deployment/package matching assessed separately.','This comparison does not grant implementation or deployment approval for the additional route-lastmod metadata proposal.']};
report.finishedAtDubai=new Date(Date.parse(report.finishedAtUtc)+4*3600000).toISOString().replace('Z','+04:00');
await fs.writeFile(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n');
const csv=(value)=>'"'+String(value??'').replaceAll('"','""')+'"';
await fs.writeFile(path.join(out,'route-results.csv'),[['route','scope','metadata_equal','root_equal','baseline_html_sha256','candidate_html_sha256','baseline_root_sha256','candidate_root_sha256','baseline_metadata_sha256','candidate_metadata_sha256'],...routeRows.map(r=>[r.route,r.scope,r.metadataEqual,r.rootEqual,r.htmlSha256.baseline,r.htmlSha256.candidate,r.rootSha256.baseline,r.rootSha256.candidate,r.metadataSha256.baseline,r.metadataSha256.candidate])].map(row=>row.map(csv).join(',')).join('\n')+'\n');
const strictLink=path.relative(out,strictPath).replaceAll('\\','/');
const md=[`# Option ${option}: full SSR and date-scope comparison`,``,`**${report.passed?'PASS':'FAIL'}** — ${report.passedAssertions}/${report.assertions} assertions; ${report.renderedRoutesCompared}/1,256 routes read. Finished ${report.finishedAtUtc} / ${report.finishedAtDubai}.`,``,report.cohort+'.',``,`- Protected title, description, H1, canonical, robots, language, all metadata, hreflang and parsed JSON-LD unchanged on **${report.metadataUnchangedRoutes}/1,256** routes.`,`- **${report.byteIdenticalUnaffectedRoots}/1,254** unaffected React roots match byte for byte; no body normalization is used.`,`- Only the English Mercedes hub and body page differ, and exact reversal of approved links/phone/intake changes reproduces their baseline roots.`,option==='B'?`- Both sitemap files preserve all **1,005 URL entries/order** and differ only on English hub \`2026-10-20 → 2026-10-26\` and English body \`2026-09-28 → 2026-10-26\`. Other dates remain unchanged.`:`- Both sitemap files preserve all **1,005 URL entries/order** and every date; no exceptions.`,`- Prerender generator, route-path manifest, redirect definitions and routing-data arrays remain unchanged.`,``,option==='B'?`The [unmodified targeted verifier](${strictLink}) strictly reports **73/75**, with two intentional sitemap byte-equality failures. That raw result is retained. The separate checks here validate the two exact proposed date changes and the absence of any other sitemap difference; it is not represented as a 75/75 strict pass.`:`The [unmodified targeted verifier](${strictLink}) passes **75/75** with no date or content exceptions beyond the exact approved page changes.`,``,`[All assertions and protected values](results.json); [1,256 route fingerprint rows](route-results.csv).`,`` ,...(failed.length?[`## Failures`,``,...failed.map(c=>`- ${c.group}: ${c.name}${c.error?' — '+c.error:''}`),``]:[]),...report.limits.map(x=>'- '+x),``].join('\n');
await fs.writeFile(path.join(out,'README.md'),md);
console.log(JSON.stringify({passed:report.passed,renderedRoutesCompared:report.renderedRoutesCompared,metadataUnchangedRoutes:report.metadataUnchangedRoutes,byteIdenticalUnaffectedRoots:report.byteIdenticalUnaffectedRoots,approvedChangedRoots:report.approvedChangedRoots,assertions:report.assertions,passedAssertions:report.passedAssertions,failedAssertions:report.failedAssertions,failures:failed.map(({group,name,error})=>({group,name,error})),output:out},null,2));
if(!report.passed)process.exitCode=1;
