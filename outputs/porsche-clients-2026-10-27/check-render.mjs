import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const root = process.cwd();
const task = path.join(root, 'outputs/porsche-clients-2026-10-27');
const files = ['src/pages/BrandPage.tsx', 'src/data/priorityBrandSeo.ts', 'src/components/PorscheKnowledgeCentre.tsx', 'src/data/porscheModelPages.ts'];
const before = new Map(await Promise.all(files.map(async file => [path.join(root, file).replaceAll('\\', '/'), await fs.readFile(path.join(task, 'baseline', path.basename(file)), 'utf8')])));
await build({
  logLevel: 'error',
  plugins: [{ name: 'porsche-baseline-sources', enforce: 'pre', load(id) { return before.get(id.split('?')[0].replaceAll('\\', '/')) ?? null; } }],
  build: { ssr: 'src/entry-server.tsx', outDir: path.join(task, 'ssr-before'), copyPublicDir: false },
});
const oldRender = (await import(pathToFileURL(path.join(task, 'ssr-before/entry-server.js')))).renderRoute;
const newRender = (await import(pathToFileURL(path.join(task, 'ssr/entry-server.js')))).renderRoute;
const text = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const report = [];
for (const route of ['/brands/mercedes-benz-service-dubai', '/ar/brands/mercedes-benz-service-dubai', '/brands/bmw-service-dubai', '/brands/range-rover-service-dubai']) {
  const oldPage = await oldRender(route), newPage = await newRender(route);
  assert.equal(text(newPage.html), text(oldPage.html), `Content changed outside Porsche: ${route}`);
  assert.deepEqual(newPage.seo, oldPage.seo, `SEO changed outside Porsche: ${route}`);
  report.push({ route, unchangedVisibleContentAndSeo: true });
}
const porsche = await newRender('/brands/porsche-service-dubai');
assert.equal((porsche.html.match(/<h1\b/g) ?? []).length, 1);
assert.equal(porsche.seo.title, 'Porsche Repair & Service Dubai | DIGI-TEC Al Quoz');
assert.equal(porsche.seo.canonical, 'https://digitecme.com/brands/porsche-service-dubai');
const sectionOrder = ['porsche-services', 'porsche-workshop', 'porsche-faqs', 'porsche-booking', 'porsche-knowledge-centre'];
const locations = sectionOrder.map(id => porsche.html.indexOf(`id="${id}"`));
assert(locations.every(i => i >= 0));
assert(locations.every((i, n) => n === 0 || locations[n - 1] < i));
for (const slug of ['oil-change','engine-diagnostics','mechanical-repair','transmission-repair','brake-repair','suspension-repair','ac-repair','electrical-repair','battery-replacement','steering-repair','exhaust-repair','fuel-system-repair','body-repair','tire-repair']) {
  assert(porsche.html.includes(`href="/brands/porsche-service-dubai/${slug}"`), `Missing service link: ${slug}`);
  const service = await newRender(`/brands/porsche-service-dubai/${slug}`);
  assert(service.seo && !service.seo.noindex, `Service owner not indexable: ${slug}`);
  assert(!service.html.includes('Page Not Found'), `Service not found: ${slug}`);
}
assert(porsche.html.includes('Review it and press Send in WhatsApp'));
assert(!porsche.html.includes('Recent workshop cases'));
assert(!porsche.html.includes('distinct owner need'));
assert(porsche.html.includes('Porsche model, year, mileage, service history, service due or symptoms'));
const faq = porsche.seo.jsonLd['@graph'].find(entry => entry['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 5);
for (const question of faq.mainEntity) assert(text(porsche.html).includes(question.name));
report.push({ route: '/brands/porsche-service-dubai', sectionOrder, indexableServiceOwners: 14, visibleFaqCount: 6, schemaFaqCount: 5, bookingDraftExplained: true });
for (const route of ['/ar/brands/porsche-service-dubai','/porsche/macan','/porsche/911/997']) {
  const page = await newRender(route);
  assert(page.seo && !page.seo.noindex, route);
  assert.equal((page.html.match(/<h1\b/g) ?? []).length, 1, route);
  report.push({ route, indexable: true, singleHeading: true });
}
await fs.writeFile(path.join(task, 'porsche-page.html'), porsche.html);
await fs.writeFile(path.join(task, 'render-checks.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
