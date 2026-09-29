import assert from 'node:assert/strict';
import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const origin = 'https://digitecme.com';
const dist = path.resolve('dist');
const { getPublicRoutes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const { handleRequest } = await import(pathToFileURL(path.join(dist, '_worker.js')).href);
const routes = getPublicRoutes();
const known = new Set(routes.map((route) => route.path));
const money = ['/services/paint-protection-film', '/services/ceramic-coating', '/services/car-polishing-dubai'];
const hub = '/services/paint-protection-dubai';
const articles = ['/blog/ceramic-coating-vs-ppf-dubai', '/blog/why-ceramic-coating-matters-uae'];
const brands = ['mercedes-benz', 'bmw', 'porsche', 'ferrari', 'lamborghini', 'mclaren', 'aston-martin', 'rolls-royce', 'range-rover'].map((brand) => `/brands/${brand}-service-dubai`);
const relevant = ['/', '/services', '/sitemap', hub, ...money, '/services/car-body-repair-dubai', ...brands, ...articles];
const decode = (value = '') => value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"');
const text = (value = '') => decode(value.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const nodes = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
  const graph = JSON.parse(match[1]); return graph['@graph'] || [graph];
});
const htmlByRoute = new Map();
for (const route of routes) htmlByRoute.set(route.path, await readFile(path.join(dist, route.path, 'index.html'), 'utf8'));
const redirects = new Map((await readFile(path.join(dist, '_redirects'), 'utf8')).split(/\r?\n/).filter((line) => line.startsWith('/')).map((line) => line.split(/\s+/).slice(0, 2)));
const canonicalPath = (route) => redirects.get(route) || route;
const linksIn = (html, route) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].flatMap((match) => {
  const url = new URL(decode(match[1]), `${origin}${route}`);
  return url.origin === origin ? [{ source: route, target: canonicalPath(url.pathname), rawPath: url.pathname, fragment: decodeURIComponent(url.hash.slice(1)), anchor: text(match[2]) }] : [];
});
const htmlLinks = new Map();
const contentLinks = new Map();
for (const [route, html] of htmlByRoute) {
  htmlLinks.set(route, linksIn(html, route));
  contentLinks.set(route, linksIn(html.replace(/<header\b[\s\S]*?<\/header>/g, '').replace(/<footer\b[\s\S]*?<\/footer>/g, ''), route));
}

const linkFailures = [];
const imagesChecked = new Set();
const externalImages = new Set();
for (const route of relevant) {
  const html = htmlByRoute.get(route);
  assert.ok(html, `Missing relevant page ${route}`);
  for (const link of htmlLinks.get(route)) {
    if (known.has(link.target)) {
      if (link.fragment && !htmlByRoute.get(link.target).includes(`id="${link.fragment}"`) && !htmlByRoute.get(link.target).includes(`name="${link.fragment}"`)) linkFailures.push({ ...link, error: 'missing fragment' });
    } else {
      try { await access(path.join(dist, link.rawPath)); }
      catch { linkFailures.push({ ...link, error: 'missing destination' }); }
    }
  }
  for (const [, attributes] of html.matchAll(/<img\b([^>]+)>/g)) {
    const sources = [attributes.match(/\bsrc="([^"]+)"/)?.[1], ...(attributes.match(/\bsrcset="([^"]+)"/i)?.[1] || '').split(',').map((item) => item.trim().split(/\s+/)[0])].filter(Boolean);
    for (const src of sources) {
      if (src.startsWith('data:')) continue;
      const url = new URL(decode(src), `${origin}${route}`);
      if (url.origin !== origin) { externalImages.add(url.href); continue; }
      try { await access(path.join(dist, url.pathname)); imagesChecked.add(url.pathname); }
      catch { linkFailures.push({ source: route, image: src, error: 'missing image' }); }
    }
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^\"]+|tel:[^\"]+)"/g)) {
    if (href.startsWith('tel:')) assert.equal(href.replace(/[\s()-]/g, ''), 'tel:+97143402223');
    else assert.equal(new URL(decode(href)).pathname, '/97143402223');
  }
}
assert.deepEqual(linkFailures, [], 'Broken relevant-page HTML links, fragments or images');

const incoming = {};
for (const target of money) {
  const entries = [...contentLinks.values()].flat().filter((link) => link.target === target && link.source !== target);
  incoming[target] = {
    uniqueContentSources: new Set(entries.map((link) => link.source)).size,
    contentLinkInstances: entries.length,
    sources: [...new Set(entries.map((link) => link.source))].sort(),
    anchors: [...new Set(entries.map((link) => link.anchor))].sort(),
  };
  for (const source of ['/', '/services', hub, ...money.filter((route) => route !== target)]) {
    assert.ok(contentLinks.get(source).some((link) => link.target === target), `${source} must link to ${target}`);
  }
  assert.ok(articles.some((source) => contentLinks.get(source).some((link) => link.target === target)), `Article discovery for ${target}`);
  assert.ok(brands.some((source) => contentLinks.get(source).some((link) => link.target === target)), `Brand discovery for ${target}`);
}
for (const route of money) assert.ok(contentLinks.get(route).some((link) => link.target === hub), `Missing broader hub link from ${route}`);

const paths = new Map([['/', ['/']]]);
const queue = ['/'];
for (let position = 0; position < queue.length; position++) {
  const source = queue[position];
  for (const link of htmlLinks.get(source) || []) if (known.has(link.target) && !paths.has(link.target)) {
    paths.set(link.target, [...paths.get(source), link.target]); queue.push(link.target);
  }
}
const crawlDepth = Object.fromEntries(money.map((route) => {
  assert.ok(paths.has(route), `Orphan page ${route}`);
  return [route, { clicks: paths.get(route).length - 1, path: paths.get(route), alternative: ['/', '/services', route], viaHub: ['/', hub, route] }];
}));
assert.equal(crawlDepth[money[2]].clicks, 1, 'Polishing must be discoverable from the home service group');

const businessEntities = [];
const metadata = [];
for (const route of money) {
  const html = htmlByRoute.get(route);
  const graph = nodes(html);
  const url = origin + route;
  const business = graph.find((node) => node['@id'] === `${origin}/#business`);
  businessEntities.push(business);
  const service = graph.find((node) => node['@id'] === `${url}#service`);
  assert.equal(service.provider['@id'], `${origin}/#business`);
  const breadcrumb = graph.find((node) => node['@id'] === `${url}#breadcrumb`);
  assert.deepEqual(breadcrumb.itemListElement.map((item) => item.item), [origin + '/', origin + '/services', url]);
  const visibleBreadcrumb = html.match(/<nav[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(visibleBreadcrumb);
  assert.equal(text(visibleBreadcrumb.match(/<span[^>]*aria-current="page"[^>]*>([\s\S]*?)<\/span>/)?.[1]), breadcrumb.itemListElement.at(-1).name);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs on ${route}`);
  const priceText = text(html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1]);
  assert.ok(!/From AED\s*\d|AED\s*\d/.test(priceText), `Unverified displayed price on ${route}`);
  const title = text(html.match(/<title>(.*?)<\/title>/s)?.[1]);
  const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1]);
  for (const [otherRoute, otherHtml] of htmlByRoute) if (otherRoute !== route) {
    assert.notEqual(text(otherHtml.match(/<title>(.*?)<\/title>/s)?.[1]), title, `Duplicate title on ${otherRoute}`);
    assert.notEqual(decode(otherHtml.match(/<meta name="description" content="([^"]+)"/)?.[1]), description, `Duplicate description on ${otherRoute}`);
  }
  metadata.push({ route, title, h1, description, provider: service.provider['@id'], breadcrumb: breadcrumb.itemListElement });
}
assert.deepEqual(businessEntities[0], businessEntities[1]);
assert.deepEqual(businessEntities[0], businessEntities[2]);

const aliasChecks = [];
const env = { ASSETS: { fetch: async () => new Response('Local asset', { status: 200 }) } };
for (const [source, destination] of redirects) if ([...money, hub].includes(destination.replace(/^\/ar(?=\/|$)/, ''))) {
  assert.ok(!redirects.has(destination), `Redirect chain from ${source}`);
  assert.ok(!known.has(source), `Indexable alias ${source}`);
  const response = await handleRequest(new Request(`${origin}${source}?utm_source=qa`), env);
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), `${origin}${destination}?utm_source=qa`);
  assert.equal(source.startsWith('/ar/'), destination.startsWith('/ar/'), `Wrong language from ${source}`);
  aliasChecks.push({ source, destination, status: response.status });
}
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
for (const route of [...money, hub]) assert.equal(sitemap.split(`<loc>${origin}${route}</loc>`).length - 1, 1);
for (const alias of aliasChecks) assert.ok(!sitemap.includes(`<loc>${origin}${alias.source}</loc>`));
assert.ok(!known.has('/ar/services/car-polishing-dubai'));
for (const route of ['/', '/services', '/sitemap'].map((route) => route === '/' ? '/ar' : '/ar' + route)) assert.ok(!htmlByRoute.get(route).includes('href="/ar/services/car-polishing-dubai"'));

const ownershipCandidates = routes.filter((route) => route.indexable && !route.path.startsWith('/ar')).flatMap((route) => {
  const html = htmlByRoute.get(route.path);
  const title = text(html.match(/<title>(.*?)<\/title>/s)?.[1]);
  const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]);
  return /\bppf\b|paint protection film|ceramic coating|car polishing|paint correction/i.test(title + ' ' + h1) ? [{ route: route.path, title, h1 }] : [];
});
const build = JSON.parse(await readFile('release-qa.local/build-results.json', 'utf8'));
assert.equal(build.passed, true);
const report = { checkedAt: new Date().toISOString(), sourceSha256: build.sourceSha256, passed: true, inspectedRoutes: routes.length, relevantPages: relevant.length, imagesChecked: imagesChecked.size, externalImages: [...externalImages], brokenLinks: linkFailures, incoming, crawlDepth, metadata, business: businessEntities[0], aliases: aliasChecks, ownershipCandidates, importantLinks: relevant.flatMap((route) => contentLinks.get(route).filter((link) => [...money, hub, ...articles].includes(link.target))) };
await writeFile('docs/seo/paint-care-cluster-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(`Paint-care cluster passed: ${routes.length} routes scanned, ${relevant.length} relevant pages crawled, ${imagesChecked.size} local images, ${aliasChecks.length} permanent alias checks.`);
console.log(JSON.stringify({ crawlDepth, inboundSources: Object.fromEntries(money.map((route) => [route, incoming[route].uniqueContentSources])), ownershipCandidates }, null, 2));
