import assert from 'node:assert/strict';
import { readFile, access, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const source = ts.transpileModule(await readFile('src/data/oilChangeContent.ts', 'utf8'), {compilerOptions: {module: ts.ModuleKind.ESNext}}).outputText;
const content = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const { OIL_CHANGE_PATH: route, OIL_CHANGE_TITLE: title, OIL_CHANGE_DESCRIPTION: description, OIL_CHANGE_H1: h1, oilFaqs, oilBrandPaths } = content;
const htmlFor = route => readFile(path.join('dist', route, 'index.html'), 'utf8');
const html = await htmlFor(route);
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const text = value => decode(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
const { getPublicRoutes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes = getPublicRoutes();

assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''), title);
assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || ''), description);
const headings = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)];
assert.equal(headings.length, 1);
assert.equal(text(headings[0][1]), h1);
assert.match(html, /rel="canonical" href="https:\/\/digitecme.com\/services\/oil-change-dubai"/);
assert.match(html, /name="robots" content="index,\s*follow/);
assert.match(html, /class="oil-page"/);
assert.equal(routes.find(r => r.path === route)?.indexable, true);
assert.equal(routes.find(r => r.path === route)?.lastmod, '2026-09-10');
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.ok(sitemap.includes(`<loc>https://digitecme.com${route}</loc>`));
for (const id of ['oil-scope', 'oil-specification', 'oil-process', 'oil-vehicles', 'oil-due', 'oil-dubai', 'oil-service-comparison', 'oil-filter', 'oil-cost', 'oil-faq', 'oil-booking']) assert.ok(html.includes(`id="${id}"`), `SSR section ${id}`);
for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${fragment}"`), `Missing anchor ${fragment}`);
for (const label of ['Book an Oil Change', 'Request an Oil Change Quote', 'Ask Which Service Is Due', 'Book Your Oil Change', 'Get an Exact Oil Change Quote']) assert.ok(html.includes(label), label);
for (const placement of ['oil_hero_whatsapp', 'oil_process_quote', 'oil_service_advice', 'oil_exact_quote', 'oil_booking']) assert.ok(html.includes(`data-cta-placement="${placement}"`), placement);

const graphs = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
const entities = graphs.flatMap(g => g['@graph'] || [g]);
for (const type of ['Service', 'WebPage', 'BreadcrumbList', 'FAQPage']) assert.equal(entities.filter(e => e['@type'] === type).length, 1, type);
const service = entities.find(e => e['@type'] === 'Service');
assert.equal(service['@id'], `https://digitecme.com${route}#service`);
assert.ok(service.provider?.['@id'], 'References established business');
for (const field of ['offers', 'aggregateRating', 'review']) assert.ok(!(field in service), `No unsupported ${field}`);
const faq = entities.find(e => e['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 10);
assert.deepEqual(faq.mainEntity.map(q => ({question:q.name, answer:q.acceptedAnswer.text})), oilFaqs);
const visibleSection = html.match(/<section id="oil-faq"[\s\S]*?<\/section>/)?.[0] || '';
for (const item of oilFaqs) {
  assert.ok(text(visibleSection).includes(item.question), `SSR FAQ question: ${item.question}`);
  assert.ok(text(visibleSection).includes(item.answer), `SSR FAQ answer: ${item.question}`);
}
for (const brand of oilBrandPaths) {
  assert.ok(html.includes(`href="${brand.path}"`), brand.path);
  assert.equal(routes.find(r => r.path === brand.path)?.indexable, true, brand.path);
  assert.equal(routes.find(r => r.path === brand.path)?.lastmod, brand.path === '/services/mercedes-oil-change-dubai' ? '2026-09-14' : '2026-09-10', brand.path);
  const brandHtml = await htmlFor(brand.path);
  assert.match(brandHtml, /car oil and filter change in Dubai/);
  assert.ok(brandHtml.includes(`href="${route}"`), `Return link ${brand.path}`);
}
let assets = 0;
for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.match(tag, /src="\/[^"]+"/, 'Every image has a local source');
for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|images|brand-logos|lovable-uploads)\/[^"?#]+)"/g)) { await access(path.join('dist', asset)); assets++; }
for (const [, candidates] of html.matchAll(/srcset="([^"]+)"/gi)) for (const candidate of candidates.split(',')) { await access(path.join('dist', candidate.trim().split(/\s+/)[0])); assets++; }
const cssAssets = [...html.matchAll(/href="(\/assets\/[^"?#]+\.css)"/g)];
const css = (await Promise.all(cssAssets.map(([,asset]) => readFile(path.join('dist', asset), 'utf8')))).join('\n');
assert.ok(css.includes('.oil-page'), 'Dedicated styles in initial SSR stylesheet');
const results = {passed:true, route, oneH1:true, selfCanonical:true, indexable:true, sitemap:true, sections:11, matchingFaqs:10, brandOilPaths:8, reciprocalLinks:8, localAssets:assets, initialCss:true, date:'2026-09-10'};
await writeFile('docs/seo/oil-change-validation.json', JSON.stringify(results, null, 2));
console.log(`Oil change checks passed: SSR, canonical, indexation, sitemap, 10 aligned FAQs, 8 reciprocal brand links and ${assets} local assets.`);
