import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getPublicRoutes } from '../dist-server/entry-server.js';

const hub = '/brands/bmw-service-dubai';
const origin = 'https://digitecme.com';
const expectedTitle = 'BMW Service & Repair Dubai | Independent BMW Workshop | DIGI-TEC';
const expectedDescription = 'BMW service, repair, diagnostics and maintenance in Al Quoz, Dubai. DIGI-TEC inspects BMW engine, transmission, brakes, AC, electrical and coding concerns. Book via WhatsApp.';
const services = ['oil-change', 'mechanical-repair', 'engine-diagnostics', 'transmission-repair', 'brake-repair', 'suspension-repair', 'ac-repair', 'electrical-repair', 'battery-replacement', 'body-repair', 'steering-repair', 'exhaust-repair', 'fuel-system-repair', 'tire-repair'];
const models = ['3-series', 'm5', 'm4', '5-series', 'x5', 'x6', 'm3'];
const routes = getPublicRoutes();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const plain = (s) => decode(s.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const htmlFor = (route) => readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8');
const html = await htmlFor(hub);
const meta = (body, name) => decode(body.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1] ?? '');
const title = (body) => plain(body.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
const h1 = (body) => plain(body.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1] ?? '');
const hrefs = (body) => [...body.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((m) => decode(m[1]));
assert.equal(title(html), expectedTitle);
assert.equal(meta(html, 'description'), expectedDescription);
assert.equal(h1(html), 'BMW Service & Repair Dubai');
assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
assert.ok(html.includes(`<link rel="canonical" href="${origin}${hub}">`));
assert.ok(meta(html, 'robots').startsWith('index,'));

const graphs = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const nodes = graphs.flatMap((g) => g['@graph'] ?? [g]);
assert.ok(nodes.some((n) => [].concat(n['@type']).includes('AutoRepair')));
const breadcrumb = nodes.find((n) => n['@type'] === 'BreadcrumbList');
assert.equal(breadcrumb.itemListElement.at(-1).item, `${origin}${hub}`);
const faqs = nodes.find((n) => n['@type'] === 'FAQPage').mainEntity;
const visible = plain(html.replace(/<script\b[^>]*>.*?<\/script>/gs, ''));
assert.equal(faqs.length, 11);
for (const faq of faqs) {
  assert.ok(visible.includes(faq.name), `FAQ question missing from HTML: ${faq.name}`);
  assert.ok(visible.includes(faq.acceptedAnswer.text), `FAQ answer missing from HTML: ${faq.name}`);
}

const links = hrefs(html);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const path of [hub, ...[...services, ...models].map((slug) => `${hub}/${slug}`)]) {
  assert.ok(routes.find((r) => r.path === path)?.indexable, `${path} must stay indexable`);
  assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`), `${path} missing from sitemap`);
  if (path === hub) continue;
  assert.ok(links.includes(path), `Missing hub link: ${path}`);
  assert.ok(hrefs(await htmlFor(path)).includes(hub), `Missing reciprocal hub link: ${path}`);
}
for (const route of routes.filter((r) => r.indexable && r.path !== hub)) {
  const other = await htmlFor(route.path);
  assert.notEqual(title(other), expectedTitle, `Duplicate BMW title on ${route.path}`);
  assert.notEqual(meta(other, 'description'), expectedDescription, `Duplicate BMW description on ${route.path}`);
  assert.notEqual(h1(other), 'BMW Service & Repair Dubai', `Duplicate BMW H1 on ${route.path}`);
}
const bookingLinks = links.filter((href) => href.startsWith('https://wa.me/97143402223?') && new URL(href).searchParams.get('text')?.includes('I would like to book a BMW inspection.'));
assert.ok(bookingLinks.length >= 3, 'BMW booking links required in hero, service section and final CTA');
for (const href of bookingLinks) {
  const message = new URL(href).searchParams.get('text');
  for (const field of ['BMW model:', 'Year:', 'Mileage:', 'Warning lights or symptoms:', 'Preferred appointment time:']) assert.ok(message.includes(field));
}
assert.ok(links.filter((href) => href === 'tel:+97143402223').length >= 3);
assert.ok(html.includes('digitec-workshop-service-floor-'), 'Workshop photograph missing');
assert.ok(!visible.includes('40,000'), 'Unverified facility-size claim should not appear on the BMW hub');
console.log('BMW hub checks passed: metadata, canonical, indexability, 11 FAQ answers/schema, 14 service links, 7 model links, reciprocal links, sitemap, unique SEO fields and qualified booking links.');
