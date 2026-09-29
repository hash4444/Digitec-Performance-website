import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2] || process.cwd();
const routePath = '/services/car-polishing-dubai';
const canonical = `https://digitecme.com${routePath}`;
const html = await readFile(path.join(root, 'dist', routePath, 'index.html'), 'utf8');
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"').replaceAll(/<[^>]+>/g, '').replaceAll(/\s+/g, ' ').trim();
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.equal(decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'Car Polishing & Paint Correction Dubai');
assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), 'Car Polishing & Paint Correction Dubai | DIGI-TEC');
assert.equal(decode(html.match(/<meta name="description" content="([^"]+)"/)[1]), 'Professional car polishing and paint correction in Dubai. Assess swirl marks, light scratches and dull paint on your premium car. Get a DIGI-TEC quote.');
assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`));
assert.ok(html.includes('index, follow, max-image-preview:large'));
assert.ok(!html.includes('hreflang="ar-AE"'), 'Do not advertise an uncreated translation');
assert.equal((html.match(/<details\b/g) || []).length, 16);
assert.ok(html.includes('.paint-care-page'), 'Page stylesheet must be in the initial HTML');
assert.equal(html.match(/<style>([\s\S]*?)<\/style>/)[1], await readFile(path.join(root, 'src/styles/paint-correction.css'), 'utf8'), 'SSR must not HTML-escape CSS selectors');
assert.ok(!html.includes('id="paint-projects"'), 'No unverified project gallery');
assert.ok(!/From AED|AED 999/.test(decode(html)), 'No placeholder prices');
const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
const nodes = schemas.flatMap((schema) => schema['@graph'] || [schema]);
const service = nodes.find((node) => node['@id'] === `${canonical}#service`);
assert.ok(service);
assert.equal(service.provider['@id'], 'https://digitecme.com/#business');
const routeGraph = nodes.filter((node) => String(node['@id'] || '').startsWith(canonical));
assert.ok(!JSON.stringify(routeGraph).includes('AggregateRating'));
assert.ok(!routeGraph.some((node) => node['@type'] === 'FAQPage'));
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
assert.equal(routes.filter((route) => route.path === routePath).length, 1);
const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
assert.equal((sitemap.match(new RegExp(`<loc>${canonical}</loc>`, 'g')) || []).length, 1);
assert.ok(sitemap.includes(`${canonical}</loc>\n    <lastmod>2026-09-08</lastmod>`));
const known = new Set(routes.map((route) => route.path));
let links = 0;
const main = html.match(/<main id="paint-main">([\s\S]*?)<\/main>/)[1];
for (const match of main.matchAll(/href="([^"]+)"/g)) {
  const href = match[1];
  if (href.startsWith('#')) assert.ok(main.includes(`id="${href.slice(1)}"`), href);
  else if (href.startsWith('/') && !href.endsWith('.pdf')) { assert.ok(known.has(href.split('#')[0]), `Broken route ${href}`); links++; }
}
for (const match of main.matchAll(/<img\b([^>]+)>/g)) {
  assert.ok(/width="\d+"/.test(match[1]) && /height="\d+"/.test(match[1]));
  assert.ok(/alt="[^"]+"/.test(match[1]));
  const src = match[1].match(/src="([^"]+)"/)[1];
  await readFile(path.join(root, 'dist', src));
}
console.log(`Paint correction checks passed: metadata, single H1, 16 SSR FAQs, inline styles, canonical, sitemap, JSON-LD, ${links} internal links, images and unsupported-claim guards.`);
