import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const origin = 'https://digitecme.com';
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const known = new Set(routes.map((route) => route.path));
const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'));
const entry = manifest['index.html'];
assert.ok(entry?.isEntry, 'Missing current client entry');
const client = await readFile(path.join(dist, entry.file), 'utf8');
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const worker = await readFile(path.join(dist, '_worker.js'), 'utf8');
const app = await readFile(path.join(root, 'src/App.tsx'), 'utf8');
const fileFor = (route) => path.join(dist, route.replace(/^\//, ''), 'index.html');
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"').replace(/<[^>]+>/g, '').trim();
const graphNodes = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => { const json = JSON.parse(match[1]); return json['@graph'] || [json]; });
const specifications = [
  { slug: 'paint-protection-film', component: 'PpfPage', h1: 'Paint Protection Film (PPF) Dubai', title: 'PPF Dubai | Paint Protection Film for Cars | DIGI-TEC' },
  { slug: 'ceramic-coating', component: 'CeramicCoatingPage', h1: 'Ceramic Coating Dubai', title: 'Ceramic Coating Dubai | Car Paint Protection | DIGI-TEC' },
  { slug: 'car-polishing-dubai', component: 'PaintCorrectionPage', h1: 'Car Polishing & Paint Correction Dubai', title: 'Car Polishing & Paint Correction Dubai | DIGI-TEC' },
];
const results = [];
for (const spec of specifications) {
  const route = `/services/${spec.slug}`;
  const url = `${origin}${route}`;
  const html = await readFile(fileFor(route), 'utf8');
  assert.ok(app.includes(`path="${route}" element={<${spec.component} />}`), `Missing exact component route: ${route}`);
  assert.ok(client.includes(route), `Route missing from built client: ${route}`);
  const chunk = manifest[`src/pages/${spec.component}.tsx`];
  assert.ok(chunk?.file && entry.dynamicImports.includes(`src/pages/${spec.component}.tsx`), `Missing dedicated client chunk: ${route}`);
  await readFile(path.join(dist, chunk.file));
  assert.equal(routes.filter((item) => item.path === route && item.indexable).length, 1, `Manifest: ${route}`);
  assert.equal((sitemap.match(new RegExp(`<loc>${url}</loc>`, 'g')) || []).length, 1, `Sitemap: ${route}`);
  assert.ok(worker.includes(JSON.stringify(route)), `Edge allowlist: ${route}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal(decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), spec.h1);
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), spec.title);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`<link rel="canonical" href="${url}">`));
  assert.ok(html.includes('index, follow, max-image-preview:large'));
  assert.ok(!html.includes('Service Not Found'));
  assert.ok(html.includes(`src="/${entry.file}"`), 'SSR and client must share the same entry');
  const nodes = graphNodes(html);
  const service = nodes.filter((node) => node['@id'] === `${url}#service`);
  assert.equal(service.length, 1);
  assert.equal(service[0]['@type'], 'Service');
  assert.equal(service[0].provider['@id'], `${origin}/#business`);
  const breadcrumbs = nodes.filter((node) => node['@type'] === 'BreadcrumbList' && node['@id'] === `${url}#breadcrumb`);
  assert.equal(breadcrumbs.length, 1);
  assert.equal(breadcrumbs[0].itemListElement.at(-1).item, url);
  for (const id of ['#business', '#organization', '#website']) assert.equal(nodes.filter((node) => node['@id'] === origin + '/' + id).length, 1);
  let internalLinks = 0;
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (!href.startsWith('/') && !href.startsWith('#') && !href.startsWith(origin)) continue;
    const target = new URL(href, url);
    if (target.origin !== origin || path.extname(target.pathname)) continue;
    assert.ok(known.has(target.pathname), `Unknown link on ${route}: ${href}`);
    const targetHtml = target.pathname === route ? html : await readFile(fileFor(target.pathname), 'utf8');
    if (target.hash) assert.ok(targetHtml.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Missing fragment ${href}`);
    internalLinks++;
  }
  const directory = await readFile(fileFor('/services'), 'utf8');
  assert.ok(directory.includes(`href="${route}"`), `Missing service-directory link: ${route}`);
  const list = graphNodes(directory).find((node) => node['@type'] === 'ItemList');
  assert.equal(list.itemListElement.filter((item) => item.url === url).length, 1, `Missing directory schema item: ${route}`);
  for (const source of ['/services/paint-protection-dubai', ...specifications.filter((other) => other !== spec).map((other) => `/services/${other.slug}`)]) {
    assert.ok((await readFile(fileFor(source), 'utf8')).includes(`href="${route}`), `Missing inbound link ${source} -> ${route}`);
  }
  results.push({ route, component: spec.component, canonical: url, title: spec.title, internalLinks, htmlSha256: createHash('sha256').update(html).digest('hex'), clientChunk: chunk.file, checks: 'passed' });
}
assert.ok(!known.has('/ar/services/car-polishing-dubai'), 'Do not create an untranslated Arabic route');
for (const route of ['/ar/services', '/ar/sitemap']) assert.ok(!(await readFile(fileFor(route), 'utf8')).includes('href="/ar/services/car-polishing-dubai"'));
assert.ok((await readFile(fileFor('/sitemap'), 'utf8')).includes('href="/services/car-polishing-dubai"'));
await writeFile(path.join(root, 'docs/seo/protection-release-validation.json'), JSON.stringify({ checkedAt: new Date().toISOString(), passed: true, outputDirectory: 'dist', clientEntry: entry.file, clientSha256: createHash('sha256').update(client).digest('hex'), prerenderedRoutes: routes.length, sitemapUrls: routes.filter((route) => route.indexable).length, pages: results }, null, 2) + '\n');
console.log('Combined protection release validation passed: all 3 dedicated client/SSR pages, routing, canonicals, sitemap, entity/schema, directory, cross-links and language boundaries.');
