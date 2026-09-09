import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const routePaths = new Set(routes.map(route => route.path));
const expected = new Map([
  ['/brands/bmw-service-dubai', 'BMW Service &amp; Repair Dubai | DIGI-TEC'],
  ['/brands/bmw-service-dubai/engine-diagnostics', 'BMW Diagnostics &amp; Coding Dubai | DIGI-TEC'],
  ['/brands/porsche-service-dubai/engine-diagnostics', 'Porsche Diagnostics Dubai | DIGI-TEC Al Quoz'],
  ['/services/oil-change-dubai', 'Car Oil Change Dubai | Oil &amp; Filter Service | DIGI-TEC'],
  ['/services/exhaust-repair-dubai', 'Exhaust &amp; Muffler Repair Dubai | DIGI-TEC'],
  ['/services/steering-repair-dubai', 'Power Steering &amp; Rack Repair Dubai | DIGI-TEC'],
]);
const htmlFor = route => readFile(path.join(root, 'dist', route, 'index.html'), 'utf8');
for (const route of routes) {
  assert.doesNotMatch(await htmlFor(route.path), /\u0000/, `Invalid NUL in rendered HTML: ${route.path}`);
}
for (const [route, title] of expected) assert.ok((await htmlFor(route)).includes(`<title>${title}</title>`), route);
const steering = await htmlFor('/brands/porsche-service-dubai/steering-repair');
assert.match(steering, /Heavy steering, free play/);
assert.match(steering, /electric or hydraulic assistance/);
assert.doesNotMatch(steering, /Cayenne air suspension.*GT3/);
assert.match(steering, /Request a Porsche Steering Inspection/);
const transmission = await htmlFor('/brands/bmw-service-dubai/transmission-repair');
assert.match(transmission, /Delayed engagement, rough shifts, slipping/);
assert.match(transmission, /Compare service and repair options/);
for (const route of routes.filter(r => r.family === 'brand-service' || r.path.startsWith('/services/mercedes-'))) {
  const html = await htmlFor(route.path);
  assert.doesNotMatch(html, /Models We (?:<[^>]+>)*\s*(?:Steering|Transmission|Oil|Brake|AC|Engine|Electrical|Battery|Suspension|Body|Fuel|Tire|Exhaust)/, route.path);
}
let internalLinks = 0;
const hostingRedirects = new Map((await readFile('dist/_redirects', 'utf8')).split(/\r?\n/).filter(line => line.startsWith('/')).map(line => line.split(/\s+/).slice(0, 2)));
const existingLocaleFallbackLinks = [];
for (const route of routes.filter(r => r.family === 'brand-service' || r.family === 'service' || r.family === 'brand')) {
  const html = await htmlFor(route.path);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)) {
    const destination = href.split(/[?#]/)[0];
    if (!path.extname(destination) && !routePaths.has(destination)) {
      if (hostingRedirects.has(destination)) existingLocaleFallbackLinks.push({from: route.path, to: destination});
      else assert.fail(`${route.path} links to missing content ${destination}`);
    }
    internalLinks++;
  }
}
const rox = '/brands/rox-service-dubai/soft-close-door-installation';
assert.equal(routes.find(r => r.path === rox).indexable, true);
assert.equal(routes.find(r => r.path === `/ar${rox}`).indexable, false);
assert.doesNotMatch(await htmlFor(rox), /hreflang="ar-AE"/);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.ok(sitemap.includes(`<loc>https://digitecme.com${rox}</loc>`));
assert.ok(!sitemap.includes(`<loc>https://digitecme.com/ar${rox}</loc>`));

// Exercise the deployable Mercedes handler against actual production HTML,
// rather than an origin stub that returns 200 for every destination.
const { handleRequest } = await import(pathToFileURL(path.join(root, 'cloudflare/mercedes-seo-router.js')).href);
const assetFetch = async request => {
  const target = new URL(request.url).pathname;
  const html = await htmlFor(target);
  return new Response(request.method === 'HEAD' ? null : html, {status: 200, headers: {'content-type': 'text/html'}});
};
let redirects = 0;
for (const alias of ['/services/mercedes-repair-dubai', '/services/mercedes-service-dubai']) {
  for (const method of ['GET', 'HEAD']) {
    for (const origin of ['https://digitecme.com', 'http://www.digitecme.com']) {
      for (const suffix of ['', '/']) {
        const query = '?utm_source=seo%20test&gclid=abc&utm_source=again';
        const result = await handleRequest(new Request(`${origin}${alias}${suffix}${query}`, {method}), assetFetch);
        assert.equal(result.status, 308);
        assert.equal(result.headers.get('location'), `https://digitecme.com/brands/mercedes-benz-service-dubai${query}`);
        assert.equal(await result.text(), '');
        const final = await handleRequest(new Request(result.headers.get('location'), {method}), assetFetch);
        assert.equal(final.status, 200);
        const body = await final.text();
        if (method === 'HEAD') assert.equal(body, '');
        else assert.match(body, /rel="canonical" href="https:\/\/digitecme.com\/brands\/mercedes-benz-service-dubai"/);
        redirects++;
      }
    }
  }
}
// A pure helper regression check: one event, query and enquiry PII removed.
const tracker = ts.transpileModule(await readFile('src/lib/whatsapp-tracking.ts', 'utf8'), {compilerOptions: {module: ts.ModuleKind.ESNext}}).outputText;
globalThis.window = {location: {origin: 'https://digitecme.com', pathname: '/services/oil-change-dubai'}, dataLayer: []};
const {trackWhatsAppClick} = await import(`data:text/javascript;base64,${Buffer.from(tracker).toString('base64')}`);
trackWhatsAppClick('https://wa.me/97143402223?text=TEST_NAME%20TEST_VIN%20TEST_PHONE#private');
assert.deepEqual(window.dataLayer, [{event: 'whatsapp_click', link_url: 'https://wa.me/97143402223', page_path: '/services/oil-change-dubai'}]);
delete globalThis.window;
const report = {passed: true, routes: routes.length, titleChecks: expected.size, internalLinksChecked: internalLinks, existingLocaleFallbackLinks, realHtmlRedirectCases: redirects, roxEnglishOnlyIndexation: true, whatsappPiiAndSingleEvent: true};
await writeFile('docs/seo/query-release-validation.json', JSON.stringify(report, null, 2));
console.log(`Query release checks passed: ${expected.size} titles, ${internalLinks} links, ${redirects} real-HTML redirect cases, ROX directives and WhatsApp privacy. ${existingLocaleFallbackLinks.length} existing locale/alias fallback links recorded for review.`);
