import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const output = path.resolve(process.argv[2] || 'outputs/porsche-p2-2026-11-04');
const routerPath = path.resolve(process.argv[3] || 'cloudflare/production-seo-router.js');
const { handleRequest } = await import(pathToFileURL(routerPath).href);
const baseline = JSON.parse(await readFile(path.join(output, 'baseline/rendered.json'), 'utf8'));
const { getPublicRoutes, renderRoute } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const routeSet = new Set(routes.map(r => r.path));
const origin = 'https://digitecme.com';
const hub = '/brands/porsche-service-dubai';
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const report = { passed: false, checkedAt: new Date().toISOString(), edgeRouter: routerPath, routes: routes.length, porschePages: 0, internalLinks: 0, schemaBlocks: 0, languagePairs: 0, qualifiedWhatsAppLinks: 0, redirectChecks: 0, safetyChecks: 0, nonPorscheUnchanged: 0, porscheRelatedLabelUpdates: [], metadata: [], changedPorschePages: [], failures: [] };
// React useId values depend on sibling positions, not the visible content or
// destination. Normalize only those generated values; retain every other byte.
const normalizeIds = value => value.replace(/radix-:[A-Za-z0-9]+:/g, 'radix-ID');
const check = (label, fn) => { try { fn(); } catch (error) { report.failures.push({ label, error: error.message }); } };
assert.deepEqual(routes.map(r => [r.path, r.indexable, r.family]), baseline.routes.map(r => [r.path, r.indexable, r.family]), 'Public route membership/ownership changed');
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const beforeSitemap = await readFile(path.join(output, 'baseline/files/public/sitemap.xml'), 'utf8');
const locs = xml => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x => x[1]).sort();
assert.deepEqual(locs(sitemap), locs(beforeSitemap), 'Sitemap membership changed');
report.sitemapURLs = locs(sitemap).length;

for (const route of routes) {
  const rendered = await renderRoute(route.path);
  const main = (rendered.html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] || rendered.html).replace(/\b(?:src|srcset)="[^"]*"/g, '');
  const before = baseline.pages[route.path];
  if (!route.path.includes('porsche')) {
    const previousSeo = route.path === '/ar/sitemap'
      ? JSON.parse(JSON.stringify(before.seo).replaceAll('ورشة خدمة وإصلاح Porsche في دبي', 'كيف تختار ورشة مستقلة لسيارات بورشه في دبي'))
      : before.seo;
    check(`Unchanged non-Porsche SEO ${route.path}`, () => assert.deepEqual(JSON.parse(JSON.stringify(rendered.seo)), previousSeo));
    const currentMain = normalizeIds(main);
    const previousMain = normalizeIds(before.main);
    if (currentMain === previousMain) report.nonPorscheUnchanged++;
    else {
      // Neighbouring Arabic workshop lists derive the Porsche anchor label from
      // its corrected H1. This one explicit label change is the only exception.
      check(`Only Porsche related-link label changed ${route.path}`, () => assert.equal(currentMain, previousMain.replaceAll('ورشة خدمة وإصلاح Porsche في دبي', 'كيف تختار ورشة مستقلة لسيارات بورشه في دبي')));
      report.porscheRelatedLabelUpdates.push(route.path);
    }
    continue;
  }
  report.porschePages++;
  const html = await readFile(path.join('dist', route.path, 'index.html'), 'utf8');
  const plain = decode(main.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  check(`Canonical and H1 ${route.path}`, () => {
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.deepEqual([...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(x => x[1]), [`${origin}${route.path}`]);
    assert.doesNotMatch(html, /name="robots" content="noindex/);
    assert.equal(rendered.seo.language, route.path.startsWith('/ar/') ? 'ar' : 'en');
  });
  for (const [, json] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    check(`JSON-LD ${route.path}`, () => JSON.parse(json)); report.schemaBlocks++;
  }
  const english = route.path.replace(/^\/ar(?=\/)/, '');
  const hasArabic = routeSet.has(`/ar${english}`);
  check(`Hreflang ${route.path}`, () => {
    if (hasArabic) {
      assert.ok(html.includes(`hreflang="en-AE" href="${origin}${english}"`));
      assert.ok(html.includes(`hreflang="ar-AE" href="${origin}/ar${english}"`));
      if (!route.path.startsWith('/ar/')) report.languagePairs++;
    } else assert.doesNotMatch(html, /hreflang="ar-AE"/);
  });
  for (const [, href] of main.matchAll(/href="([^"]+)"/g)) {
    const destination = decode(href);
    if (destination.startsWith('/')) {
      const target = destination.split(/[?#]/)[0];
      if (!path.extname(target)) check(`Existing internal owner ${route.path} → ${target}`, () => assert.ok(routeSet.has(target), target));
      report.internalLinks++;
    }
  }
  if (JSON.stringify(rendered.seo) !== JSON.stringify(before.seo) || main !== before.main) report.changedPorschePages.push(route.path);
  report.metadata.push({ path: route.path, before: { title: before.seo.title, description: before.seo.description }, after: { title: rendered.seo.title, description: rendered.seo.description } });
  const primary = route.path === hub || route.path === `/ar${hub}` || route.path.startsWith(`${hub}/`) || route.path.startsWith(`/ar${hub}/`) || ['/porsche/macan', '/blog/porsche-maintenance-guide-dubai', '/ar/blog/porsche-maintenance-guide-dubai'].includes(route.path);
  if (primary) {
    const ctas = [...main.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^"]*)"[^>]*>/g)].map(x => decode(x[1]));
    const qualified = ctas.filter(href => {
      const message = new URL(href).searchParams.get('text') || '';
      return route.path.startsWith('/ar/') ? ['طراز بورشه:', 'سنة الصنع:', 'المسافة المقطوعة:', 'سجل الصيانة', 'نص التحذير'].every(s => message.includes(s)) : ['Porsche model:', 'Model year:', 'Mileage:', 'Service history', 'Exact warning'].every(s => message.includes(s));
    });
    check(`Qualified WhatsApp draft ${route.path}`, () => assert.ok(qualified.length > 0));
    report.qualifiedWhatsAppLinks += qualified.length;
  }
  if (route.path === `${hub}/engine-diagnostics`) {
    check('Final diagnostics override', () => { assert.equal(rendered.seo.title, 'Porsche Diagnostics Dubai | PIWIS 3 | DIGI-TEC'); assert.match(plain, /supported|Supported/); assert.match(plain, /programming/); });
  }
  if (route.path === '/blog/porsche-911-service-dubai-guide') for (const generation of ['997', '991', '992']) check(`911 → ${generation}`, () => assert.ok(main.includes(`href="/porsche/911/${generation}"`)));
  if (route.path.startsWith('/ar/') && [hub, '/best-porsche-workshop-dubai'].includes(english)) check(`Arabic claim qualification ${route.path}`, () => assert.doesNotMatch(plain, /الفحص كل 6 أشهر|نوفر قطع OEM أصلية|الصيانة الأساسية في اليوم نفسه غالباً/));
}

const pairs = [
  ['/services/transmission-services', '/services/transmission-repair-dubai'],
  ['/services/suspension-repair', '/services/suspension-repair-dubai'],
  ['/services/steering-repair', '/services/steering-repair-dubai'],
  ['/services/performance-tuning-dubai', '/tuning'],
].flatMap(([s, t]) => [[s, t], [`/ar${s}`, `/ar${t}`]]);
const englishOnly = routes.filter(r => r.path.startsWith('/porsche/') && !routeSet.has(`/ar${r.path}`));
assert.equal(englishOnly.length, 61);
pairs.push(...englishOnly.map(r => [`/ar${r.path}`, `/ar${hub}`]));
for (const [source, target] of pairs) {
  assert.ok(routeSet.has(target), target);
  for (const host of [origin, 'https://www.digitecme.com', 'http://digitecme.com', 'http://www.digitecme.com']) for (const variant of [source, source + '/', source.toUpperCase().replaceAll('/', '//')]) for (const method of ['GET', 'HEAD']) for (const query of ['', '?utm_source=google&gclid=p2-test&tag=a&tag=b']) {
    const response = await handleRequest(new Request(`${host}${variant}${query}`, { method }), () => { throw Error('Redirect reached origin'); });
    assert.equal(response.status, 308, source);
    assert.equal(response.headers.get('location'), `${origin}${target}${query}`);
    if (method === 'HEAD') assert.equal(await response.text(), '');
    report.redirectChecks++;
  }
}
for (const route of routes.filter(r => r.path.includes('porsche'))) for (const method of ['GET', 'HEAD']) {
  const request = new Request(`${origin}${route.path}?keep=1`, { method });
  const response = await handleRequest(request, forwarded => { assert.equal(forwarded, request); return new Response(null, { status: 202 }); });
  assert.equal(response.status, 202); report.safetyChecks++;
  const variant = route.path.toUpperCase() + '/';
  const normalized = await handleRequest(new Request(`${origin}${variant}?keep=1`, { method }), () => { throw Error('Porsche normalization reached origin'); });
  assert.equal(normalized.status, 308); assert.equal(normalized.headers.get('location'), `${origin}${route.path}?keep=1`); report.redirectChecks++;
}
for (const [source] of pairs) for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
  const body = method === 'OPTIONS' ? undefined : '{"preserved":true}';
  const request = new Request(`${origin}${source}?tag=a&tag=b`, { method, body });
  const response = await handleRequest(request, async forwarded => { assert.equal(forwarded, request); assert.equal(await forwarded.text(), body || ''); return new Response(null, { status: 202 }); });
  assert.equal(response.status, 202); report.safetyChecks++;
}
for (const url of ['https://unrelated.example/services/suspension-repair', `${origin}/tuning?next=/porsche/macan`, `${origin}/api/porsche`, `${origin}/brands/range-rover-service-dubai`, `${origin}/brands/defender-service-dubai`]) {
  const request = new Request(url);
  const response = await handleRequest(request, forwarded => { assert.equal(forwarded, request); return new Response(null, { status: 202 }); });
  assert.equal(response.status, 202); report.safetyChecks++;
}
// The async byte checks are outside check() so failures cannot be swallowed.
for (const name of ['src/components/Analytics.tsx', 'src/lib/whatsapp-tracking.ts', 'src/lib/contact-attribution.ts', 'index.html', 'public/robots.txt', 'public/llms.txt']) assert.equal(await readFile(name, 'utf8'), await readFile(path.join(output, 'baseline/files', name), 'utf8'), `Protected file changed: ${name}`);
assert.match(await readFile('index.html', 'utf8'), /GTM-T3GVSPND/);
assert.match(await readFile('index.html', 'utf8'), /G-4TRCEJSY4S/);
await mkdir(output, { recursive: true });
report.passed = report.failures.length === 0;
await writeFile(path.join(output, process.argv[3] ? 'validation-bundle.json' : 'validation.json'), JSON.stringify(report, null, 2));
await writeFile(path.join(output, 'metadata-before-after.json'), JSON.stringify(report.metadata, null, 2));
console.log(JSON.stringify({ ...report, metadata: undefined, changedPorschePages: report.changedPorschePages.length, failures: report.failures.map(f => ({ label: f.label, error: f.error.slice(0, 350) })) }, null, 2));
assert.equal(report.failures.length, 0, 'Porsche P2 validation failures; see validation.json');
