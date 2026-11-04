import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
// Optional evidence roots let follow-up phases reuse the R1 checks without
// overwriting the original R1 baseline or final report artifacts.
const evidenceRoot = process.argv.find(arg=>arg.startsWith('--evidence-root='))?.slice('--evidence-root='.length);
const out = evidenceRoot ? path.resolve(root,evidenceRoot) : path.join(root,'outputs/r1');
if(out!==root&&!out.startsWith(root+path.sep))throw new Error('Evidence root must stay in the workspace.');
const baseline = JSON.parse(await readFile(path.join(out,'baseline/routes.json'),'utf8'));
const after = JSON.parse(await readFile(path.join(out,'after/routes.json'),'utf8'));
const baseSummary = JSON.parse(await readFile(path.join(out,'baseline/summary.json'),'utf8'));
const afterSummary = JSON.parse(await readFile(path.join(out,'after/summary.json'),'utf8'));
const beforeSources = JSON.parse(await readFile(path.join(out,'baseline/source-manifest.json'),'utf8'));
const afterSources = JSON.parse(await readFile(path.join(out,'after/source-manifest.json'),'utf8'));
const sourceBeforeMap = new Map(beforeSources.files.map(r=>[r.path,r.sha256]));
const sourceAfterMap = new Map(afterSources.files.map(r=>[r.path,r.sha256]));
const sourceChanges=[...new Set([...sourceBeforeMap.keys(),...sourceAfterMap.keys()])].filter(p=>sourceBeforeMap.get(p)!==sourceAfterMap.get(p)).map(p=>({path:p,before:sourceBeforeMap.get(p),after:sourceAfterMap.get(p)}));
const beforeMap = new Map(baseline.map(r=>[r.path,r]));
const afterMap = new Map(after.map(r=>[r.path,r]));
const origin='https://digitecme.com';
const serviceKeys=['suspension-repair','transmission-repair','mechanical-repair','engine-diagnostics','ac-repair','electrical-repair','brake-repair','oil-change'];
const englishOwned=[...['range-rover','defender','land-rover'].map(b=>`/brands/${b}-service-dubai`),...['range-rover','defender'].flatMap(b=>serviceKeys.map(s=>`/brands/${b}-service-dubai/${s}`)),...['range-rover-sport-service-dubai-guide','range-rover-vogue-service-dubai-guide','defender-service-dubai-guide'].map(s=>`/blog/${s}`)];
const allowed=new Set(englishOwned.flatMap(p=>[p,`/ar${p}`]));
const additionalPathsFile=process.argv.find(arg=>arg.startsWith('--additional-paths-file='))?.slice('--additional-paths-file='.length);
if(additionalPathsFile){
  const additionalPaths=JSON.parse(await readFile(path.resolve(root,additionalPathsFile),'utf8'));
  if(!Array.isArray(additionalPaths)||additionalPaths.some(p=>typeof p!=='string'||!afterMap.has(p)||!/^\/(?:ar\/)?(?:brands\/(?:range-rover|defender|land-rover)-service-dubai(?:\/|$)|blog\/[^/]*(?:range-rover|defender|land-rover))/.test(p)))throw new Error('Additional paths must be existing scoped cluster routes.');
  for(const p of additionalPaths)allowed.add(p);
}
const decode=s=>String(s).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&#39;',"'").replaceAll('&nbsp;',' ');
const clean=s=>decode(String(s).replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const attr=(s,n)=>decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`,'i'))?.[1]||'');
const issues=[];
function check(ok,kind,detail) {if(!ok)issues.push({kind,...detail});}
const changed=[], concurrentTuning=[], derivativeBlogListings=[], unexpected=[];
const derivativeCardRoutes=new Set(['/blog','/blog/range-rover-land-rover-air-suspension-problems-dubai']);
const fields=['title','description','canonical','noindex','h1','hreflang','contentSha256','internalLinks','images','schemaTypes'];
for(const row of after){const before=beforeMap.get(row.path);if(!before){issues.push({kind:'new-route',path:row.path});continue;}const changes=fields.filter(k=>JSON.stringify(before[k])!==JSON.stringify(row[k]));if(changes.length){const entry={path:row.path,fields:changes};changed.push(entry);if(!allowed.has(row.path)){if(/^\/(ar\/)?tuning(?:\/|$)/.test(row.path))concurrentTuning.push(entry);else if(derivativeCardRoutes.has(row.path)&&changes.every(k=>['contentSha256','internalLinks'].includes(k))){const beforeLinks=new Set(before.internalLinks.map(l=>JSON.stringify(l)));const afterLinks=new Set(row.internalLinks.map(l=>JSON.stringify(l)));const deltas=[...beforeLinks].filter(l=>!afterLinks.has(l)).concat([...afterLinks].filter(l=>!beforeLinks.has(l))).map(l=>JSON.parse(l));if(deltas.every(l=>allowed.has(l.path)))derivativeBlogListings.push({...entry,reason:'The existing Range Rover Sport guide card reflects its revised excerpt; page metadata and primary copy are unchanged.',changedLinks:deltas});else unexpected.push(entry);}else unexpected.push(entry);}}check(before.canonical===row.canonical&&before.noindex===row.noindex,'canonical-or-indexability-change',{path:row.path,before:{canonical:before.canonical,noindex:before.noindex},after:{canonical:row.canonical,noindex:row.noindex}});}
for(const row of baseline)check(afterMap.has(row.path),'removed-route',{path:row.path});
check(after.length===baseline.length,'route-count',{before:baseline.length,after:after.length});
check(afterSummary.sitemapCanonicalCount===baseSummary.sitemapCanonicalCount,'sitemap-count',{before:baseSummary.sitemapCanonicalCount,after:afterSummary.sitemapCanonicalCount});
check(unexpected.length===0,'out-of-scope-render-changes',{rows:unexpected});
check(afterSummary.brokenInternalLinks.length===0,'broken-focused-links',{rows:afterSummary.brokenInternalLinks});
check(afterSummary.missingFragments.length===0,'missing-focused-fragments',{rows:afterSummary.missingFragments});
const focused=after.filter(r=>/range-rover|defender|land-rover/.test(r.path)&&!r.path.startsWith('/tuning/'));
const owned=after.filter(r=>allowed.has(r.path));
const duplicate=(rows,k)=>{const groups=new Map();for(const r of rows){const key=r[k];groups.set(key,[...(groups.get(key)||[]),r.path]);}return [...groups].filter(([,v])=>v.length>1).map(([value,paths])=>({value,paths}));};
check(duplicate(owned,'title').length===0,'duplicate-modified-titles',{rows:duplicate(owned,'title')});
check(duplicate(owned,'description').length===0,'duplicate-modified-descriptions',{rows:duplicate(owned,'description')});
for(const k of ['title','description']){const duplicates=duplicate(after,k).filter(g=>g.paths.some(p=>allowed.has(p)));check(duplicates.length===0,`modified-${k}-duplicates-anywhere`,{rows:duplicates});}
let schemaCount=0,faqPairs=0,internalLinks=0,imageCount=0,whatsappCount=0;
const staticRows=[];
for(const row of focused){
  const filepath=path.join(root,'dist',row.path.slice(1),'index.html');
  let html;
  try{html=await readFile(filepath,'utf8');}catch(e){issues.push({kind:'missing-built-route',path:row.path,error:e.message});continue;}
  const tags=[...html.matchAll(/<(link|meta)\b([^>]*)>/gi)].map(m=>({tag:m[1].toLowerCase(),raw:m[2]}));
  const canonicals=tags.filter(t=>t.tag==='link'&&attr(t.raw,'rel')==='canonical').map(t=>attr(t.raw,'href'));
  const descriptions=tags.filter(t=>t.tag==='meta'&&attr(t.raw,'name')==='description').map(t=>attr(t.raw,'content'));
  const hreflang=tags.filter(t=>t.tag==='link'&&attr(t.raw,'rel')==='alternate'&&attr(t.raw,'hreflang')).map(t=>({language:attr(t.raw,'hreflang'),href:attr(t.raw,'href')}));
  const robots=tags.filter(t=>t.tag==='meta'&&attr(t.raw,'name')==='robots').map(t=>attr(t.raw,'content'));
  const h1=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1]));
  const htmlTag=html.match(/<html\b([^>]*)>/i)?.[1]||'';
  const title=clean(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'');
  check(canonicals.length===1&&canonicals[0]===row.canonical,'built-canonical',{path:row.path,expected:row.canonical,actual:canonicals});
  check(descriptions.length===1&&descriptions[0]===row.description,'built-description',{path:row.path,actual:descriptions});
  check(title===row.title,'built-title',{path:row.path,expected:row.title,actual:title});
  check(h1.length===1,'built-h1-count',{path:row.path,h1});
  check(JSON.stringify(hreflang)===JSON.stringify(row.hreflang),'built-hreflang',{path:row.path,expected:row.hreflang,actual:hreflang});
  check(robots.length===1&&!robots.some(r=>/noindex|none/i.test(r)),'built-indexability',{path:row.path,robots});
  check(attr(htmlTag,'lang')===row.language,'built-language',{path:row.path,actual:attr(htmlTag,'lang')});
  if(row.path.startsWith('/ar/'))check(attr(htmlTag,'dir')==='rtl','built-rtl',{path:row.path});
  const schemas=[];
  for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
    if(attr(m[1],'type')!=='application/ld+json')continue;
    try {const parsed=JSON.parse(m[2]);schemas.push(...(parsed['@graph']||(Array.isArray(parsed)?parsed:[parsed])));schemaCount++;}catch(e){issues.push({kind:'invalid-jsonld',path:row.path,error:e.message});}
  }
  const types=[...new Set(schemas.flatMap(s=>[].concat(s['@type']||[])))];
  check(types.includes('BreadcrumbList'),'built-breadcrumb-schema',{path:row.path,types});
  if(allowed.has(row.path)&&row.path.includes('/brands/'))for(const type of ['Service','WebPage'])check(types.includes(type),'built-service-schema',{path:row.path,type,types});
  const visible=clean(html.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi,' '));
  for(const faq of schemas.filter(s=>[].concat(s['@type']||[]).includes('FAQPage')))for(const qa of faq.mainEntity||[]){faqPairs++;check(visible.includes(clean(qa.name))&&visible.includes(clean(qa.acceptedAnswer?.text||'')),'faq-visible-alignment',{path:row.path,question:qa.name});}
  internalLinks+=row.internalLinks.length;
  for(const m of html.matchAll(/<img\b([^>]*)>/gi))check(/\balt=["']/.test(m[1]),'image-alt-attribute',{path:row.path,image:attr(m[1],'src')});
  for(const image of row.images){imageCount++;if(image.src.startsWith('/')&&!image.src.startsWith('//')){try{await stat(path.join(root,'dist',image.src));}catch{issues.push({kind:'missing-built-image',path:row.path,image:image.src});}}}
  if(allowed.has(row.path)&&row.path.includes('/brands/')&&!row.path.includes('land-rover-service-dubai')){
    check(row.whatsapp.length>0,'missing-contextual-whatsapp',{path:row.path});
    for(const link of row.whatsapp){whatsappCount++;const url=new URL(link.href);check(url.hostname==='wa.me'&&url.pathname==='/97143402223','whatsapp-destination',{path:row.path,href:link.href});const message=url.searchParams.get('text')||'';check(Boolean(message.trim()),'whatsapp-message',{path:row.path});}
  }
  staticRows.push({path:row.path,titleLength:title.length,descriptionLength:row.description.length,h1:h1[0],canonical:canonicals[0],hreflangCount:hreflang.length,schemaTypes:types.join(' | ')});
}
const summary={validatedAt:new Date().toISOString(),passed:issues.length===0,baselineRouteCount:baseline.length,afterRouteCount:after.length,baselineSitemapCount:baseSummary.sitemapCanonicalCount,afterSitemapCount:afterSummary.sitemapCanonicalCount,focusedRoutesChecked:focused.length,permittedR1Routes:allowed.size,changedR1Routes:changed.filter(c=>allowed.has(c.path)).length,concurrentTuningChanges:concurrentTuning,derivativeBlogListings,unexpectedChanges:unexpected,internalLinksChecked:internalLinks,imageReferencesChecked:imageCount,jsonLdScriptsParsed:schemaCount,faqPairsChecked:faqPairs,contextualWhatsAppLinksChecked:whatsappCount,issues};
summary.modifiedMetadataLengths={titleMin:Math.min(...owned.map(r=>r.title.length)),titleMax:Math.max(...owned.map(r=>r.title.length)),descriptionMin:Math.min(...owned.map(r=>r.description.length)),descriptionMax:Math.max(...owned.map(r=>r.description.length))};
await mkdir(path.join(out,'validation'),{recursive:true});
const generatedPaths=['public/sitemap.xml','src/lib/routing-paths.json','cloudflare/routing-response-data.js','docs/seo/route-schema-matrix.csv','docs/seo/protection-release-validation.json','docs/seo/oil-change-validation.json','docs/seo/suspension-validation.json','docs/seo/transmission-validation.json','docs/seo/query-release-validation.json','docs/seo/schema-inventory.md'];
const generatedFiles=[];
for(const p of generatedPaths){try{const data=await readFile(path.join(root,p));generatedFiles.push({path:p,sha256:createHash('sha256').update(data).digest('hex'),bytes:data.length});}catch(e){if(e.code!=='ENOENT')throw e;}}
const finalGitHead=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8',windowsHide:true}).stdout.trim();
const finalGitStatus=spawnSync('git',['status','--short'],{cwd:root,encoding:'utf8',windowsHide:true}).stdout.trim();
check(finalGitHead===baseSummary.git.head,'head-changed',{before:baseSummary.git.head,after:finalGitHead});
summary.passed=issues.length===0;
await writeFile(path.join(out,'validation/generated-local-files.json'),JSON.stringify({note:'Local generated build/routing/schema evidence. These are workspace file hashes, not changes to deployed infrastructure or remote service settings.',capturedAt:new Date().toISOString(),files:generatedFiles,git:{head:finalGitHead,status:finalGitStatus}},null,2));
await Promise.all([writeFile(path.join(out,'validation/summary.json'),JSON.stringify(summary,null,2)),writeFile(path.join(out,'validation/changed-routes.json'),JSON.stringify(changed,null,2)),writeFile(path.join(out,'validation/static-routes.json'),JSON.stringify(staticRows,null,2)),writeFile(path.join(out,'validation/source-changes.json'),JSON.stringify({note:'This is elapsed shared-workspace drift, including concurrent Phase T3 work; it is not an R1 authorship list.',beforeCapturedAt:beforeSources.capturedAt,afterCapturedAt:afterSources.capturedAt,changes:sourceChanges},null,2))]);
const csv=(rows,keys)=>[keys.join(','),...rows.map(r=>keys.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(','))].join('\n');
await writeFile(path.join(out,'metadata-before-after.csv'),csv(owned.map(r=>({path:r.path,oldTitle:beforeMap.get(r.path)?.title,newTitle:r.title,titleLength:r.title.length,oldDescription:beforeMap.get(r.path)?.description,newDescription:r.description,descriptionLength:r.description.length,oldH1:beforeMap.get(r.path)?.h1.join(' | '),newH1:r.h1.join(' | '),canonical:r.canonical})),['path','oldTitle','newTitle','titleLength','oldDescription','newDescription','descriptionLength','oldH1','newH1','canonical']));
console.log(JSON.stringify(summary,null,2));
if(issues.length)process.exitCode=1;
