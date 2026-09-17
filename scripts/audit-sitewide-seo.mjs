import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

// Read-only source / live-site audit. Writes evidence solely below the requested output folder.
const root = process.cwd();
const out = path.resolve(root, 'outputs/sitewide-seo-2026-09-17/audit');
const origin = 'https://digitecme.com';
const liveMode = process.argv.includes('--live');
const phase = process.argv.find(a => a.startsWith('--phase='))?.split('=')[1] || 'baseline';
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Invalid phase');
await mkdir(out, { recursive: true });
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const routeMap = new Map(routes.map(r => [r.path, r]));
const decode = s => String(s).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ');
const clean = s => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (s, n) => decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`, 'i'))?.[1] || '');
const tags = (s, n) => [...s.matchAll(new RegExp(`<${n}\\b[^>]*>`, 'gi'))].map(m => m[0]);
const normalizePath = p => p === '/' ? p : p.replace(/\/+$/, '');
const stripInfrastructure = html => html.replace(/<(script|style|svg|footer|nav)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, header => /<h1\b/i.test(header) ? header : ' ');
function parse(html, route) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  const contentHtml = stripInfrastructure(body);
  const content = clean(contentHtml);
  const arabicLetters = (content.match(/[\u0600-\u06ff]/g) || []).length;
  const latinLetters = (content.match(/[a-z]/gi) || []).length;
  const schemas = []; let invalidJsonLd = 0;
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attr(m[1], 'type') !== 'application/ld+json') continue;
    try { const j = JSON.parse(m[2]); schemas.push(...(j['@graph'] || (Array.isArray(j) ? j : [j]))); } catch { invalidJsonLd++; }
  }
  const linkRows = [...contentHtml.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m=> ({ href:attr(m[1],'href'), anchor:clean(m[2]), rel:attr(m[1],'rel') })).filter(l=>l.href);
  const meta = n => tags(html, 'meta').filter(t => attr(t, 'name').toLowerCase() === n).map(t => attr(t, 'content'));
  const images = tags(contentHtml,'img').map(t=>({src:attr(t,'src'),alt:attr(t,'alt'),hasAlt:/\balt=/.test(t),width:attr(t,'width'),height:attr(t,'height'),loading:attr(t,'loading')}));
  return {
    path:route, family:routeMap.get(route)?.family || 'unknown', indexable:routeMap.get(route)?.indexable ?? null,
    title:clean(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''), descriptions:meta('description'),
    canonicals:tags(html, 'link').filter(t=>attr(t,'rel')==='canonical').map(t=>attr(t,'href')),
    robots:[...meta('robots'),...meta('googlebot')],
    language:attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang'),
    hreflang:tags(html,'link').filter(t=>attr(t,'rel')==='alternate' && attr(t,'hreflang')).map(t=>({language:attr(t,'hreflang'),href:attr(t,'href')})),
    h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1])),
    headings:[...contentHtml.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)].map(m=>clean(m[1])),
    contentWords:content.split(/\s+/).filter(Boolean).length, contentCharacters:content.length,
    contentSha256:createHash('sha256').update(content).digest('hex'),
    arabicLetterPercent:Math.round(1000*arabicLetters/(arabicLetters+latinLetters || 1))/10,
    htmlBytes:Buffer.byteLength(html), hasMain:/<main\b/i.test(html),
    internalContentLinks:linkRows.map(l=>{try{const u=new URL(l.href, origin+route);return u.origin===origin?{path:normalizePath(u.pathname),hash:u.hash,anchor:l.anchor,rel:l.rel}:null}catch{return null}}).filter(Boolean),
    ids:[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>decode(m[1])),
    images, scripts:tags(html,'script').map(t=>attr(t,'src')).filter(Boolean),
    stylesheets:tags(html,'link').filter(t=>attr(t,'rel')==='stylesheet').map(t=>attr(t,'href')),
    schemaTypes:[...new Set(schemas.flatMap(s=>[].concat(s['@type'] || [])))],invalidJsonLd,
    paragraphs:[...contentHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(m=>clean(m[1])).filter(t=>t.split(/\s+/).length>=30),
  };
}
async function pool(items,fn,concurrency=6) { const result=new Array(items.length);let cursor=0,done=0;await Promise.all(Array.from({length:concurrency},async()=>{while(cursor<items.length){const i=cursor++;result[i]=await fn(items[i],i);done++;if(liveMode && done%100===0) console.log(`${done}/${items.length} checked`);}}));return result; }
async function request(url) {
  const start=Date.now();try { const res=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(25000)});const html=await res.text();return {status:res.status,elapsedMs:Date.now()-start,headers:Object.fromEntries([...res.headers].filter(([k])=>!['set-cookie'].includes(k))),html}; } catch(e) {return {status:0,elapsedMs:Date.now()-start,error:`${e.message}: ${e.cause?.code || e.cause?.message || ''}`,headers:{},html:''};}
}
const startedAt = new Date().toISOString();
const localSitemap = await readFile(path.join(root,'public/sitemap.xml'),'utf8');
let sitemap = localSitemap, infrastructure;
if(liveMode) {
  const [s,r] = await Promise.all([request(origin+'/sitemap.xml'),request(origin+'/robots.txt')]);
  sitemap=s.html;
  infrastructure={sitemap:{status:s.status,headers:s.headers,error:s.error},robots:{status:r.status,text:r.html,headers:r.headers,error:r.error}};
  await writeFile(path.join(out,`${phase}-live-sitemap.xml`),s.html);
  await writeFile(path.join(out,`${phase}-live-robots.txt`),r.html);
}
const sitemapPaths=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(decode(m[1])).pathname);
if(liveMode && !sitemapPaths.length) {
  await writeFile(path.join(out, `${phase}-live-blocked.json`), JSON.stringify({startedAt,failedAt:new Date().toISOString(),infrastructure},null,2));
  throw new Error(`Live sitemap unavailable: ${infrastructure?.sitemap.status} ${infrastructure?.sitemap.error || ''}`);
}
const paths=liveMode?sitemapPaths:routes.map(r=>r.path);
const records = await pool(paths,async route=>{
  if(liveMode) {const res=await request(origin+route);return {...parse(res.html,route),status:res.status,elapsedMs:res.elapsedMs,headers:res.headers,...(res.error?{error:res.error}:{})};}
  const file=path.join(root,'dist',route === '/'?'index.html':route.replace(/^\//,'')+'/index.html');
  try {const html=await readFile(file,'utf8');const fileStat=await stat(file);return {...parse(html,route),fileModified:fileStat.mtime.toISOString()};}catch(e){return {path:route,error:e.message};}
});
const good=records.filter(r=>!r.error), canonical=good.filter(r=>sitemapPaths.includes(r.path));
const byPath=new Map(good.map(r=>[r.path,r]));
const groups=(items,fn)=>{const map=new Map();for(const item of items){const key=fn(item);if(!key)continue;map.set(key,[...(map.get(key)||[]),item.path]);}return [...map].filter(([,p])=>p.length>1).map(([value,paths])=>({value,paths}));};
const inlinks = new Map(paths.map(p=>[p,new Set()]));
const brokenLinks=[], brokenFragments=[],noindexContentLinks=[];
for(const r of good) for(const l of r.internalContentLinks){
  if(routeMap.has(l.path) && l.path!==r.path && !['html-sitemap'].includes(r.family)) inlinks.get(l.path)?.add(r.path);
  if(!routeMap.has(l.path) && !/\.[a-z0-9]+$/i.test(l.path)) brokenLinks.push({from:r.path,...l});
  if(l.hash && byPath.has(l.path) && !byPath.get(l.path).ids.includes(decodeURIComponent(l.hash.slice(1)))) brokenFragments.push({from:r.path,...l});
  if(routeMap.has(l.path) && !routeMap.get(l.path).indexable) noindexContentLinks.push({from:r.path,to:l.path,anchor:l.anchor});
}
const paragraphMap=new Map();for(const r of canonical) for(const p of new Set(r.paragraphs)) paragraphMap.set(p,[...(paragraphMap.get(p)||[]),r.path]);
const repeatedParagraphs=[...paragraphMap].filter(([,p])=>p.length>=8).map(([text,paths])=>({text,count:paths.length,paths})).sort((a,b)=>b.count-a.count);
const metadataIssues=canonical.flatMap(r=>[
  ...(r.canonicals.length!==1||r.canonicals[0]!==origin+r.path?[{path:r.path,type:'canonical',values:r.canonicals}]:[]),
  ...(!r.title?[{path:r.path,type:'missing-title'}]:[]),
  ...(r.descriptions.length!==1 || !r.descriptions[0]?[{path:r.path,type:'description',values:r.descriptions}]:[]),
  ...(r.robots.some(v=>/noindex|none/i.test(v))?[{path:r.path,type:'noindex-in-sitemap'}]:[]),
  ...(r.h1.length!==1?[{path:r.path,type:'h1-count',values:r.h1}]:[]),
  ...(r.invalidJsonLd?[{path:r.path,type:'invalid-jsonld'}]:[]),
]);
const countBy=(items,fn)=>items.reduce((obj,r)=>{const k=fn(r);obj[k]=(obj[k]||0)+1;return obj;},{});
const summary={startedAt,completedAt:new Date().toISOString(),mode:liveMode?'fresh-live-http':'local-built-html',phase,
  totalPages:records.length,canonicalSitemapEntries:sitemapPaths.length,canonicalPagesChecked:canonical.length,
  sitemapDuplicatePaths:groups(sitemapPaths.map(path=>({path})),r=>r.path),
  families:countBy(good,r=>r.family),canonicalFamilies:countBy(canonical,r=>r.family),
  languages:countBy(canonical,r=>r.language),excludedFromSitemap:good.filter(r=>!sitemapPaths.includes(r.path)).length,
  errors:records.filter(r=>r.error).map(({path,error})=>({path,error})),
  ...(liveMode?{statusCounts:countBy(good,r=>r.status),non200:good.filter(r=>r.status!==200).map(r=>({path:r.path,status:r.status,location:r.headers.location})),infrastructure}:{}),
  metadataIssues,duplicateTitles:groups(canonical,r=>r.title.toLowerCase()),duplicateDescriptions:groups(canonical,r=>r.descriptions[0]?.toLowerCase()),duplicateH1:groups(canonical,r=>r.h1.join('|').toLowerCase()),duplicateContent:groups(canonical,r=>r.contentSha256),
  shortContentUnder300Words:canonical.filter(r=>r.contentWords<300).map(r=>({path:r.path,words:r.contentWords,family:r.family})),
  shortestContent:canonical.map(r=>({path:r.path,words:r.contentWords,family:r.family})).sort((a,b)=>a.words-b.words).slice(0,35),
  arabicPagesWithLowArabicShare:canonical.filter(r=>r.path.startsWith('/ar')&&r.arabicLetterPercent<50).map(r=>({path:r.path,arabicLetterPercent:r.arabicLetterPercent})),
  englishPagesWithHighArabicShare:canonical.filter(r=>!r.path.startsWith('/ar')&&r.arabicLetterPercent>20).map(r=>({path:r.path,arabicLetterPercent:r.arabicLetterPercent})),
  noContentInlinksExcludingSitemaps:canonical.filter(r=>r.path!=='/'&&(inlinks.get(r.path)?.size||0)===0).map(r=>r.path),
  lowestContentInlinkCounts:canonical.map(r=>({path:r.path,inlinks:inlinks.get(r.path)?.size||0})).sort((a,b)=>a.inlinks-b.inlinks).slice(0,40),
  brokenLinks,brokenFragments,noindexContentLinkCount:noindexContentLinks.length,
  missingImageAltAttributes:canonical.flatMap(r=>r.images.filter(i=>!i.hasAlt).map(i=>({path:r.path,src:i.src}))),
  imageElementsWithoutDimensions:canonical.reduce((n,r)=>n+r.images.filter(i=>!i.width||!i.height).length,0),
  largestHtml:canonical.map(r=>({path:r.path,bytes:r.htmlBytes})).sort((a,b)=>b.bytes-a.bytes).slice(0,15),
  repeatedParagraphCount:repeatedParagraphs.length,
  caveats:['Word counts, title length, shared paragraphs and language proportions are review signals, not Google ranking thresholds.','Paragraph/content extraction excludes header, footer, nav, script, style and SVG but may include shared in-page calls to action.','Inlinks count unique source pages excluding HTML sitemap sources; normal directory and related-service links remain.','Live HTTP response timing is a diagnostic sample, not Core Web Vitals.','The local compiled route manifest may predate concurrent source edits.'],
};
const name=`${phase}-${liveMode?'live':'local'}`;
await writeFile(path.join(out,`${name}-summary.json`),JSON.stringify(summary,null,2));
await writeFile(path.join(out,`${name}-records.json`),JSON.stringify(records.map(({paragraphs,ids,...r})=>r),null,2));
await writeFile(path.join(out,`${name}-repeated-paragraphs.json`),JSON.stringify(repeatedParagraphs,null,2));
await writeFile(path.join(out,`${name}-noindex-inlinks.json`),JSON.stringify(noindexContentLinks,null,2));
console.log(JSON.stringify({name,totalPages:summary.totalPages,canonicalPages:summary.canonicalPagesChecked,families:summary.canonicalFamilies,statusCounts:summary.statusCounts,errors:summary.errors.length,metadataIssues:metadataIssues.length,duplicateTitles:summary.duplicateTitles.length,duplicateDescriptions:summary.duplicateDescriptions.length,duplicateContent:summary.duplicateContent.length,shortPages:summary.shortContentUnder300Words.length,arabicLanguageFlags:summary.arabicPagesWithLowArabicShare.length,noInlinks:summary.noContentInlinksExcludingSitemaps.length,brokenLinks:brokenLinks.length,brokenFragments:brokenFragments.length,repeatedParagraphs:repeatedParagraphs.length},null,2));
