import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { getPublicRoutes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const ppfPath = '/services/paint-protection-film';
const url = `https://digitecme.com${ppfPath}`;
const pageFile = (route) => path.join('dist', route, 'index.html');
const html = await readFile(pageFile(ppfPath), 'utf8');
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const title = (value) => value.match(/<title>(.*?)<\/title>/s)?.[1];
const description = (value) => value.match(/<meta name="description" content="([^"]*)"/)?.[1];
assert.equal(title(html), 'PPF Dubai | Paint Protection Film for Cars | DIGI-TEC');
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.equal(html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1].replace(/<[^>]*>/g, ''), 'Paint Protection Film (PPF) Dubai');
assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
assert.ok(html.includes(`rel="canonical" href="${url}"`));
assert.ok(html.includes('content="index, follow, max-image-preview:large"'));
assert.equal((html.match(/<details>/g) || []).length, 14, 'All FAQs must be in prerendered HTML');
assert.ok(html.includes('Does PPF protect against sand?'));
assert.ok(html.includes('Continue to WhatsApp'));
assert.match(html, /<button[^>]*type="submit"[^>]*disabled/);
const stylesheet = html.match(/<link rel="stylesheet" crossorigin href="([^"]*PpfPage[^\"]*\.css)"/)[1];
assert.ok((await readFile(path.join('dist', stylesheet), 'utf8')).includes('.ppf-hero'));

const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
assert.equal(schemas.length, 2, 'One global and one route graph');
const localGraph = schemas.flatMap((schema) => schema['@graph'] || []).filter((node) => node['@id']?.startsWith(url));
for (const type of ['WebPage', 'Service', 'BreadcrumbList']) assert.equal(localGraph.filter((node) => node['@type'] === type).length, 1);
assert.ok(!JSON.stringify(localGraph).match(/AggregateRating|FAQPage|VideoObject|Review/));
assert.equal(localGraph.find((node) => node['@type'] === 'Service').provider['@id'], 'https://digitecme.com/#business');

const main = html.match(/<main[^>]*>(.*?)<\/main>/s)[1];
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const [, attributes] of main.matchAll(/<img\s([^>]+)>/g)) {
  for (const attribute of ['width', 'height', 'alt', 'srcSet']) assert.ok(attributes.toLowerCase().includes(`${attribute.toLowerCase()}=`));
}
const paths = new Set(routes.map((route) => route.path));
let linkCount = 0;
for (const [, raw] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
  const target = new URL(decode(raw), url);
  if (target.origin !== 'https://digitecme.com') continue;
  linkCount++;
  if (paths.has(target.pathname)) {
    if (target.hash) {
      const destination = await readFile(pageFile(target.pathname), 'utf8');
      assert.ok(destination.includes(`id="${target.hash.slice(1)}"`), `Missing anchor: ${target.href}`);
    }
  } else await access(path.join('dist', target.pathname));
}
for (const route of routes) {
  if (route.path === ppfPath) continue;
  const other = await readFile(pageFile(route.path), 'utf8');
  assert.notEqual(title(other), title(html), `Duplicate PPF title on ${route.path}`);
  assert.notEqual(description(other), description(html), `Duplicate PPF description on ${route.path}`);
}
const inbound = ['/', '/services', '/services/paint-protection-dubai', '/services/ceramic-coating', ...['mercedes-benz', 'bmw', 'porsche', 'ferrari', 'lamborghini', 'mclaren', 'aston-martin', 'rolls-royce', 'range-rover'].map((brand) => `/brands/${brand}-service-dubai`)];
for (const route of inbound) assert.ok((await readFile(pageFile(route), 'utf8')).includes(`href="${ppfPath}`), `Missing inbound link: ${route}`);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal(sitemap.split(`<loc>${url}</loc>`).length - 1, 1);
const redirects = await readFile('docs/seo/permanent-redirects.csv', 'utf8');
for (const route of ['/ppf', '/services/ppf', '/ar/ppf', '/ar/services/ppf']) assert.ok(redirects.includes(`"digitecme.com${route}","https://digitecme.com${route.startsWith('/ar') ? '/ar' : ''}${ppfPath}",301`));
console.log(`PPF validation passed: unique metadata, canonical, initial CSS/content, JSON-LD, dimensions, ${linkCount} internal links, ${inbound.length} inbound sources, sitemap and PPF redirects.`);
