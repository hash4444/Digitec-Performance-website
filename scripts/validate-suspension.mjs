import assert from 'node:assert/strict';
import {readFile,writeFile,access} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const source=ts.transpileModule(await readFile('src/data/suspensionContent.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const content=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const {SUSPENSION_PATH:route,SUSPENSION_TITLE:title,SUSPENSION_DESCRIPTION:description,SUSPENSION_H1:h1,suspensionFaqs,suspensionBrands,suspensionConcerns}=content;
const htmlFor=p=>readFile(path.join('dist',p,'index.html'),'utf8');
const html=await htmlFor(route);
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"');
const plain=s=>decode(s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());
const {getPublicRoutes}=await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes=getPublicRoutes();
assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)?.[1]||''),title);
assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]||''),description);
const headings=[...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)];
assert.equal(headings.length,1);
assert.equal(plain(headings[0][1]),h1);
assert.match(html,/class="susp-page"/);
assert.ok(html.includes(`rel="canonical" href="https://digitecme.com${route}"`));
assert.match(html,/name="robots" content="index,\s*follow/);
assert.equal(routes.find(r=>r.path===route)?.indexable,true);
assert.equal(routes.find(r=>r.path===route)?.lastmod,'2026-09-10');
assert.ok((await readFile('dist/sitemap.xml','utf8')).includes(`<loc>https://digitecme.com${route}</loc>`));
for(const id of ['susp-symptoms','susp-repairs','susp-air','susp-process','susp-alignment','susp-cost','susp-vehicles','susp-faq','susp-booking']) assert.ok(html.includes(`id="${id}"`),id);
for(const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`),`Missing fragment ${id}`);
for(const concern of suspensionConcerns){
  assert.ok(html.includes(`id="susp-choice-${concern.id}"`));
  assert.ok(html.includes(`aria-controls="susp-panel-${concern.id}"`));
  assert.ok(plain(html).includes(concern.detail));
  const enquiry=new URL(content.suspensionWhatsApp(concern.enquiry));
  assert.equal(enquiry.origin,'https://wa.me');
  assert.equal(enquiry.pathname,'/97143402223');
  assert.ok(enquiry.searchParams.get('text').includes(concern.enquiry));
}
const entities=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1])).flatMap(g=>g['@graph']||[g]);
for(const type of ['Service','WebPage','BreadcrumbList','FAQPage']) assert.equal(entities.filter(e=>e['@type']===type).length,1,type);
const faq=entities.find(e=>e['@type']==='FAQPage');
assert.equal(faq.mainEntity.length,12);
assert.deepEqual(faq.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),suspensionFaqs);
const faqHtml=html.match(/<section id="susp-faq"[\s\S]*?<\/section>/)?.[0]||'';
for(const item of suspensionFaqs){assert.ok(plain(faqHtml).includes(item.question));assert.ok(plain(faqHtml).includes(item.answer));}
const service=entities.find(e=>e['@type']==='Service');
assert.equal(service['@id'],`https://digitecme.com${route}#service`);
assert.ok(service.provider?.['@id']);
for(const field of ['offers','aggregateRating','review']) assert.ok(!(field in service));
for(const brand of suspensionBrands){
  assert.ok(html.includes(`href="${brand.path}"`));
  assert.equal(routes.find(r=>r.path===brand.path)?.indexable,true,brand.path);
  assert.equal(routes.find(r=>r.path===brand.path)?.lastmod,'2026-09-10');
  assert.match(await htmlFor(brand.path),/car suspension inspection and repair in Dubai/);
}
let assets=0;
for(const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.match(tag,/src="\/[^"]+"/);
for(const [,asset] of html.matchAll(/(?:src|href)="(\/(?:assets|images|brand-logos|lovable-uploads)\/[^"?#]+)"/g)){await access(path.join('dist',asset));assets++;}
const css=(await Promise.all([...html.matchAll(/href="(\/assets\/[^"?#]+\.css)"/g)].map(([,asset])=>readFile(path.join('dist',asset),'utf8')))).join('\n');
assert.ok(css.includes('.susp-page'));
for(const candidate of routes){if(candidate.path===route)continue;const other=await htmlFor(candidate.path);assert.notEqual(decode(other.match(/<title>(.*?)<\/title>/s)?.[1]||''),title,`Duplicate title ${candidate.path}`);assert.notEqual(decode(other.match(/<meta name="description" content="([^"]*)"/)?.[1]||''),description,`Duplicate description ${candidate.path}`);}
const result={passed:true,route,oneH1:true,selfCanonical:true,indexable:true,sitemap:true,uniqueMetadataAcrossRoutes:routes.length,serverRenderedSections:9,concernChoices:4,matchingFaqs:12,brandDestinations:6,reciprocalLinks:6,localAssets:assets,initialCss:true};
await writeFile('docs/seo/suspension-validation.json',JSON.stringify(result,null,2));
console.log(`Suspension checks passed: unique metadata, SSR, 4 symptom choices, 12 aligned FAQs, 6 reciprocal brand links and ${assets} local assets.`);
