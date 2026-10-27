import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),out=path.resolve(process.argv[2]),workspace=path.resolve(root,'../../..'),prior=path.join(workspace,'outputs/mercedes-service-top3-2026-10-20/candidate.local/dist');
assert.ok(root.includes('about-videos-2026-10-20')&&root.endsWith('candidate.local'));
const {getPublicRoutes}=await import(pathToFileURL(path.join(root,'dist-server/entry-server.js')).href);
const routes=getPublicRoutes(),sitemap=await fs.readFile(path.join(root,'dist/sitemap.xml'),'utf8');
const dec=s=>String(s??'').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const text=s=>dec(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const attrs=s=>Object.fromEntries([...s.matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],dec(m[2])]));
function parse(h){return {title:text(h.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]??''),description:[...h.matchAll(/<meta\b([^>]+)>/gi)].map(m=>attrs(m[1])).find(m=>m.name==='description')?.content,canonical:[...h.matchAll(/<link\b([^>]+)>/gi)].map(m=>attrs(m[1])).filter(x=>x.rel==='canonical').map(x=>x.href),alternates:[...h.matchAll(/<link\b([^>]+)>/gi)].map(m=>attrs(m[1])).filter(x=>x.hreflang),robots:[...h.matchAll(/<meta\b([^>]+)>/gi)].map(m=>attrs(m[1])).filter(x=>x.name==='robots').map(x=>x.content),h1:[...h.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>text(m[1])),graphs:[...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]))};}
const sha=s=>createHash('sha256').update(s).digest('hex');
const visible=h=>(h.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]??h.match(/<div id="root">[\s\S]*<\/div>/i)?.[0]??h).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/radix-:[A-Za-z0-9]+:/g,'radix:<generated>').replace(/\s+/g,' ').trim();
const strip=h=>h.replace(/<section\b[^>]*\bdata-about-videos="true"[^>]*>[\s\S]*?<\/section>/,'');
const report={at:new Date().toISOString(),passed:false,checks:0,aboutPages:[],preservedRoutes:[],failures:[],normalization:'All routes compare metadata/schema exactly; visible root/main markup normalizes whitespace and generated Radix useId only. About removes exactly its one new marked video section before comparing previous visible markup.'};
function check(a,b,msg){report.checks++;assert.deepEqual(a,b,msg);}
for(const r of routes){try{
 const [aHtml,bHtml]=await Promise.all([fs.readFile(path.join(root,'dist',r.path,'index.html'),'utf8'),fs.readFile(path.join(prior,r.path,'index.html'),'utf8')]);
 const a=parse(aHtml),b=parse(bHtml);for(const k of['title','description','canonical','alternates','robots','h1','graphs'])check(a[k],b[k],`Unchanged ${k} ${r.path}`);
 if(['/about','/ar/about'].includes(r.path)){
  check((aHtml.match(/data-about-videos="true"/g)??[]).length,1,'One new section');check(sha(visible(strip(aHtml))),sha(visible(bHtml)),'All previous About markup remains');
  const section=aHtml.match(/<section\b[^>]*\bdata-about-videos="true"[^>]*>[\s\S]*?<\/section>/)?.[0];assert.ok(section);
  check((section.match(/class="about-video-strip__card"/g)??[]).length,16,'Eight cards plus loop clones');
  check((section.match(/aria-hidden="true"/g)??[]).length>=17,true,'Decorative previews and clone group hidden');
  check((section.match(/class="about-video-strip__group" aria-hidden="true"/g)??[]).length,1,'One hidden duplicate group');
  for(let i=1;i<=8;i++){const n=String(i).padStart(2,'0');check(section.includes(`src="/videos/about/video-${n}-poster.jpg"`),true,'Poster '+n);}
  check((section.match(/<video[^>]*\ssrc=/g)??[]).length,0,'No preview source loaded in initial HTML');
  check(section.includes('role="region"'),true,'Named manual scroller');check(section.includes('dir="ltr"'),true,'Stable visual order for scrolling');
  check((section.match(/href="https:\/\/www\.instagram\.com\/digi_tec\/" target="_blank" rel="noopener noreferrer"/g)??[]).length,16,'All cards open exact Instagram profile in a protected new tab');check(/about-video-strip__number|about-video-strip__controls|about-video-strip__toggle|about-video-player|Choose a video to watch with sound|اختر فيديو لمشاهدته مع الصوت|Watch video/.test(section),false,'Removed counters/buttons/sound prompt/modal');report.aboutPages.push({route:r.path,passed:true,metadata:a,uniqueFilms:8,cards:16,noInitialVideoSources:true,previousVisibleMarkupPreserved:true});
 }else{check(sha(visible(aHtml)),sha(visible(bHtml)),`Unchanged visible markup ${r.path}`);report.preservedRoutes.push({route:r.path,passed:true});}
}catch(e){report.failures.push({route:r.path,error:e.message});}}
check(routes.length,1256,'No new routes');check((sitemap.match(/<loc>/g)??[]).length,1005,'Sitemap size stable');check(report.preservedRoutes.length,1254,'All nonAbout routes preserved');
const baseline=await fs.readFile(path.join(workspace,'outputs/about-videos-2026-10-20/audit/AboutUs.before.tsx'),'utf8'),current=await fs.readFile(path.join(root,'src/pages/AboutUs.tsx'),'utf8');
check(current.replaceAll('\r\n','\n').replace("import AboutVideoStrip from '@/components/AboutVideoStrip';\n",'').replace('      <AboutVideoStrip />\n\n',''),baseline.replaceAll('\r\n','\n'),'About source integration has exactly import and render additions');
report.passed=report.aboutPages.length===2&&report.failures.length===0;await fs.writeFile(path.join(out,'about-static-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,checks:report.checks,aboutPages:report.aboutPages.length,preservedRoutes:report.preservedRoutes.length,failures:report.failures.slice(0,20)},null,2));if(!report.passed)process.exitCode=1;
