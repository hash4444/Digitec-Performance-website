import assert from 'node:assert/strict';
import {access, readFile, writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const source=ts.transpileModule(await readFile('src/data/transmissionContent.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const content=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const {TRANSMISSION_PATH:route,TRANSMISSION_TITLE:title,TRANSMISSION_DESCRIPTION:description,TRANSMISSION_H1:h1,transmissionSymptoms,transmissionServices,transmissionBrands,transmissionFaqs}=content;
const htmlFor=p=>readFile(path.join('dist',p,'index.html'),'utf8');
const html=await htmlFor(route);
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
const plain=s=>decode(s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());
const {getPublicRoutes}=await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes=getPublicRoutes();

assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)?.[1]||''),title);
assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]||''),description);
const headings=[...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)];
assert.equal(headings.length,1);
assert.equal(plain(headings[0][1]),h1);
assert.match(html,/class="trans-page"/);
assert.ok(html.includes(`rel="canonical" href="https://digitecme.com${route}"`));
assert.match(html,/name="robots" content="index,\s*follow/);
assert.equal(routes.find(item=>item.path===route)?.indexable,true);
assert.equal(routes.find(item=>item.path===route)?.lastmod,'2026-09-10');
assert.ok((await readFile('dist/sitemap.xml','utf8')).includes(`<loc>https://digitecme.com${route}</loc>`));

for(const id of ['symptoms','services','process','brands','faq','trans-book']) assert.ok(html.includes(`id="${id}"`),`SSR section ${id}`);
for(const [,fragment] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${fragment}"`),`Missing fragment ${fragment}`);
for(const [label] of transmissionSymptoms) assert.ok(plain(html).includes(label));
assert.ok(plain(html).includes(transmissionSymptoms[0][1]),'Initial symptom detail is server rendered');
for(const [label,detail] of transmissionServices){assert.ok(plain(html).includes(label));assert.ok(plain(html).includes(detail));}
for(const placement of ['transmission_hero','transmission_symptom','transmission_services','transmission_process','transmission_final']) assert.ok(html.includes(`data-cta-placement="${placement}"`),placement);

const entities=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match=>JSON.parse(match[1])).flatMap(graph=>graph['@graph']||[graph]);
for(const type of ['Service','WebPage','BreadcrumbList','FAQPage']) assert.equal(entities.filter(entity=>entity['@type']===type).length,1,type);
const service=entities.find(entity=>entity['@type']==='Service');
assert.equal(service['@id'],`https://digitecme.com${route}#service`);
assert.ok(service.provider?.['@id']);
for(const field of ['offers','aggregateRating','review']) assert.ok(!(field in service),`Unsupported ${field}`);
const faq=entities.find(entity=>entity['@type']==='FAQPage');
assert.equal(faq.mainEntity.length,transmissionFaqs.length);
assert.deepEqual(faq.mainEntity.map(item=>({question:item.name,answer:item.acceptedAnswer.text})),transmissionFaqs);
const faqHtml=html.match(/<section[^>]*id="faq"[\s\S]*?<\/section>/)?.[0]||'';
for(const item of transmissionFaqs){assert.ok(plain(faqHtml).includes(item.question));assert.ok(plain(faqHtml).includes(item.answer));}

for(const [,brandPath] of transmissionBrands){
  assert.ok(html.includes(`href="${brandPath}"`),brandPath);
  assert.equal(routes.find(item=>item.path===brandPath)?.indexable,true,brandPath);
  await htmlFor(brandPath);
}
for(const resource of ['/blog/transmission-service-7g-9g-dubai','/mercedes/problems/gearbox-jerking','/services/car-diagnostics-dubai','/services/mechanical-repair-dubai']){
  assert.ok(html.includes(`href="${resource}"`),resource);
  assert.equal(routes.find(item=>item.path===resource)?.indexable,true,resource);
}

let assets=0;
for(const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.match(tag,/src="\/[^"]+"/,'Every image has a local source');
for(const [,asset] of html.matchAll(/(?:src|href)="(\/(?:assets|images|brand-logos|lovable-uploads)\/[^"?#]+)"/g)){await access(path.join('dist',asset));assets++;}
for(const [,candidates] of html.matchAll(/srcset="([^"]+)"/gi)) for(const candidate of candidates.split(',')){await access(path.join('dist',candidate.trim().split(/\s+/)[0]));assets++;}
const css=(await Promise.all([...html.matchAll(/href="(\/assets\/[^"?#]+\.css)"/g)].map(([,asset])=>readFile(path.join('dist',asset),'utf8')))).join('\n');
assert.ok(css.includes('.trans-page'),'Dedicated styles in initial SSR stylesheet');
for(const candidate of routes){if(candidate.path===route)continue;const other=await htmlFor(candidate.path);assert.notEqual(decode(other.match(/<title>(.*?)<\/title>/s)?.[1]||''),title,`Duplicate title ${candidate.path}`);assert.notEqual(decode(other.match(/<meta name="description" content="([^"]*)"/)?.[1]||''),description,`Duplicate description ${candidate.path}`);}

const result={passed:true,route,oneH1:true,selfCanonical:true,indexable:true,sitemap:true,uniqueMetadataAcrossRoutes:routes.length,serverRenderedSections:6,symptomChoices:transmissionSymptoms.length,services:transmissionServices.length,matchingFaqs:transmissionFaqs.length,brandDestinations:transmissionBrands.length,resourceDestinations:4,localAssets:assets,initialCss:true,date:'2026-09-10'};
await writeFile('docs/seo/transmission-validation.json',JSON.stringify(result,null,2));
console.log(`Transmission checks passed: unique metadata, SSR, ${transmissionSymptoms.length} symptom choices, ${transmissionFaqs.length} aligned FAQs, ${transmissionBrands.length} brand links and ${assets} local assets.`);
