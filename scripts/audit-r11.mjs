import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const phase = process.argv.find(a => a.startsWith('--phase='))?.slice(8) || 'baseline';
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Invalid phase');
const out = path.join(root, 'outputs/r11', phase);
await mkdir(out, { recursive: true });
if (phase === 'baseline') {
  let baselineExists = false;
  try { await stat(path.join(out,'routes.json')); baselineExists = true; } catch {}
  if (baselineExists) throw new Error('R1.1 baseline already exists; use --phase=after to preserve the original evidence.');
}
const hash = text => createHash('sha256').update(text).digest('hex');
const run = (cmd, args) => { const p = spawnSync(cmd, args, { cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 64 * 1024 * 1024 }); if (p.status) throw new Error(`${cmd} ${args.join(' ')}: ${p.stderr || p.stdout}`); return p.stdout.trim(); };
const sourceManifest = [];
async function walk(dir) { for (const entry of await readdir(path.join(root, dir), { withFileTypes: true })) { const p = path.posix.join(dir, entry.name); if (entry.isDirectory()) await walk(p); else if (entry.isFile()) sourceManifest.push({ path:p, sha256:hash(await readFile(path.join(root,p))), modified:(await stat(path.join(root,p))).mtime.toISOString() }); } }
for (const dir of ['src','public','scripts']) await walk(dir);
for (const file of ['package.json','package-lock.json','index.html','vite.config.ts','tailwind.config.ts','tsconfig.app.json','tsconfig.node.json']) { try {sourceManifest.push({path:file,sha256:hash(await readFile(path.join(root,file)))});} catch(e) {if(e.code !== 'ENOENT')throw e;} }
const git = { branch:run('git',['branch','--show-current']),head:run('git',['rev-parse','HEAD']),status:run('git',['status','--short']),remote:run('git',['remote','get-url','origin']) };
if(phase!=='baseline')await writeFile(path.join(out, 'source-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),git,files:sourceManifest},null,2));
else try {await stat(path.join(out,'source-manifest.json'));} catch {await writeFile(path.join(out, 'source-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),git,files:sourceManifest},null,2));}
let build = spawnSync(process.execPath,[path.join(root,'node_modules/vite/bin/vite.js'),'build','--ssr','src/entry-server.tsx','--outDir',path.join(out,'server')],{cwd:root,encoding:'utf8',windowsHide:true,maxBuffer:64*1024*1024});
await writeFile(path.join(out,'ssr-build.log'),`${build.stdout || ''}\n${build.stderr || ''}`);
let auditBuildNote;
if(build.status) throw new Error(`SSR build failed: ${build.stderr}`);
const {getPublicRoutes,renderRoute}=await import(pathToFileURL(path.join(out,'server/entry-server.js')).href);
const routes=getPublicRoutes();
console.log('Immutable R1.1 SSR bundle captured; application edits may proceed.');
const decode = s => String(s).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&#39;',"'").replaceAll('&nbsp;',' ');
const clean = s=>decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const attr=(s,n)=>decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`,'i'))?.[1]||'');
const origin='https://digitecme.com';
const focusedPath=p=>/range-rover|defender|land-rover/.test(p) && !p.startsWith('/tuning/');
const records=[];
await mkdir(path.join(out,'focused-html'),{recursive:true});
for (const route of routes) {
  const rendered=await renderRoute(route.path);
  const seo=rendered.seo || {};
  const html=rendered.html;
  const main=(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||html).replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi,' ');
  const content=clean(main);
  const englishPath=route.path.replace(/^\/ar(?=\/|$)/,'')||'/';
  const links=[...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m=>({href:attr(m[1],'href'),anchor:clean(m[2])})).filter(l=>l.href);
  const internalLinks=links.flatMap(l=>{try{const u=new URL(l.href,origin+route.path);return u.origin===origin?[{path:u.pathname.replace(/\/$/,'')||'/',hash:u.hash,anchor:l.anchor}]:[];}catch{return [];}});
  const schemas=(seo.jsonLd?.['@graph'] || (Array.isArray(seo.jsonLd)?seo.jsonLd:seo.jsonLd?[seo.jsonLd]:[]));
  records.push({ ...route,title:seo.title,description:seo.description,titleLength:seo.title?.length,descriptionLength:seo.description?.length,canonical:seo.canonical,noindex:seo.noindex,language:seo.language,
    hreflang:!seo.noindex&&seo.canonical?[{language:'en-AE',href:origin+englishPath},...(seo.hasArabicVersion===false?[]:[{language:'ar-AE',href:origin+'/ar'+(englishPath==='/'?'':englishPath)}]),{language:'x-default',href:origin+englishPath}]:[],
    h2:[...main.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>clean(m[1])),h3:[...main.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)].map(m=>clean(m[1])),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>clean(m[1])),headings:[...main.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)].map(m=>clean(m[1])),
    ids:[...html.matchAll(/\bid=["']([^"']*)["']/g)].map(m=>decode(m[1])),contentSha256:hash(content),contentCharacters:content.length,htmlSha256:hash(html),internalLinks,
    images:[...main.matchAll(/<img\b([^>]*)>/gi)].map(m=>({src:attr(m[1],'src'),alt:attr(m[1],'alt'),width:attr(m[1],'width'),height:attr(m[1],'height'),loading:attr(m[1],'loading')})),
    schemaTypes:[...new Set(schemas.flatMap(s=>[].concat(s['@type']||[])))],schema:focusedPath(route.path)?seo.jsonLd:undefined,
    whatsapp:links.filter(l=>/wa\.me|api\.whatsapp/.test(l.href)),telephone:links.filter(l=>l.href.startsWith('tel:')),
  });
  if(focusedPath(route.path)) await writeFile(path.join(out,'focused-html',route.path.slice(1).replaceAll('/','__')+'.html'),html);
}
const sitemap=await readFile(path.join(root,'public/sitemap.xml'),'utf8');
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(m=>decode(m[1]));
const byPath=new Map(records.map(r=>[r.path,r]));
const focused=records.filter(r=>focusedPath(r.path));
const brokenInternalLinks=focused.flatMap(r=>r.internalLinks.filter(l=>!byPath.has(l.path)&&!/[.][a-z\d]+$/i.test(l.path)).map(l=>({from:r.path,...l})));
const missingFragments=focused.flatMap(r=>r.internalLinks.filter(l=>l.hash&&byPath.has(l.path)&&!byPath.get(l.path).ids.includes(decodeURIComponent(l.hash.slice(1)))).map(l=>({from:r.path,...l})));
const summary={capturedAt:new Date().toISOString(),git,auditBuildNote,routeCount:routes.length,indexableRouteCount:routes.filter(r=>r.indexable).length,sitemapCanonicalCount:sitemapUrls.length,sitemapSha256:hash(sitemap),focusedRouteCount:focused.length,focusedIndexableCount:focused.filter(r=>r.indexable).length,brokenInternalLinks,missingFragments};
await Promise.all([writeFile(path.join(out,'routes.json'),JSON.stringify(records,null,2)),writeFile(path.join(out,'focused-inventory.json'),JSON.stringify(focused,null,2)),writeFile(path.join(out,'summary.json'),JSON.stringify(summary,null,2)),writeFile(path.join(out,'sitemap.xml'),sitemap)]);
const csv=(rows,keys)=>[keys.join(','),...rows.map(r=>keys.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(','))].join('\n');
await writeFile(path.join(out,'url-inventory.csv'),csv(focused.map(r=>({...r,h1:r.h1.join(' | '),schemaTypes:r.schemaTypes.join(' | '),hreflang:r.hreflang.map(l=>l.language+':'+l.href).join(' | ')})),['path','family','indexable','title','titleLength','description','descriptionLength','h1','canonical','noindex','hreflang','schemaTypes','contentCharacters']));
console.log(JSON.stringify(summary,null,2));
