import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Run from the repository root after the production build has completed.
// Uses only local build artifacts; no production requests or analytics execute.
const root = process.cwd();
const output = path.resolve(root, 'outputs/ppf-phase2-2026-10-17');
const dist = path.join(root, 'dist');
const origin = 'https://digitecme.com';
const ppf = '/services/paint-protection-film';
const selectedRoutes = [
  ppf, '/ar' + ppf,
  '/services/paint-protection-dubai', '/ar/services/paint-protection-dubai',
  '/blog/ceramic-coating-vs-ppf-dubai', '/ar/blog/ceramic-coating-vs-ppf-dubai',
  '/services/ceramic-coating', '/ar/services/ceramic-coating',
  '/services/car-polishing-dubai', '/', '/ar', '/services', '/ar/services',
];
const { getPublicRoutes, renderRoute } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routeInventory = getPublicRoutes();
const publicPaths = new Map(routeInventory.map(route => [route.path, route]));
const fileFor = route => path.join(dist, route === '/' ? '' : route.slice(1), 'index.html');
const cache = new Map();
const htmlFor = async route => {
  if (!cache.has(route)) cache.set(route, await readFile(fileFor(route), 'utf8'));
  return cache.get(route);
};
const decode = value => String(value ?? '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;|&#x27;|&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
const text = value => decode(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
  .map(([, name, double, single, bare]) => [name.toLowerCase(), decode(double ?? single ?? bare ?? '')]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([tag]) => attributes(tag));
const nodesIn = graph => graph.flatMap(document => document['@graph'] ?? [document]);
const schemasIn = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(([, value]) => JSON.parse(value));
const types = node => [node['@type'] ?? []].flat();
const walk = object => object && typeof object === 'object' ? [object, ...Object.values(object).flatMap(walk)] : [];
const checks = [];
const advisories = [];
const check = (condition, detail, route = 'global') => checks.push({ pass: Boolean(condition), route, detail });
const equal = (actual, expected, detail, route) => check(JSON.stringify(actual) === JSON.stringify(expected), `${detail}${JSON.stringify(actual) === JSON.stringify(expected) ? '' : `; expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`}`, route);
const mainFor = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
  ?? html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const metadata = (route, html) => {
  const meta = tags(html, 'meta');
  const links = tags(html, 'link');
  const schemas = schemasIn(html);
  return {
    route,
    title: text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]),
    description: meta.filter(tag => tag.name === 'description').map(tag => tag.content),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(([, value]) => text(value)),
    canonical: links.filter(tag => tag.rel === 'canonical').map(tag => tag.href),
    robots: meta.filter(tag => tag.name === 'robots').map(({ name, content }) => ({ name, content })),
    hreflang: links.filter(tag => tag.rel === 'alternate' && tag.hreflang).map(tag => ({ lang: tag.hreflang, href: tag.href })),
    schemaTypes: nodesIn(schemas).map(node => node['@type']).filter(Boolean),
  };
};

const records = [];
let internalLinkInstances = 0;
let localImageInstances = 0;
const localDestinations = new Set();
for (const route of selectedRoutes) {
  const html = await htmlFor(route);
  const record = metadata(route, html);
  records.push(record);
  equal(record.h1.length, 1, 'Exactly one H1 in initial HTML', route);
  equal(record.description.length, 1, 'Exactly one meta description', route);
  equal(record.canonical, [origin + route], 'Exactly one self canonical', route);
  check(Boolean(record.title), 'Non-empty title', route);
  check(Boolean(record.description[0]), 'Non-empty description', route);
  check(record.robots.length === 1 && /(?:^|[ ,])index(?:$|[ ,])/.test(record.robots[0].content) && !/noindex/i.test(record.robots[0].content), 'Explicit indexable robots meta', route);
  check(publicPaths.get(route)?.indexable, 'Indexable published route inventory entry', route);
  check(text(mainFor(html)).length > 100, 'Substantial prerendered crawlable content', route);
  if (!/<main\b/i.test(html)) advisories.push({ route, detail: 'Existing services-directory template has no main landmark; substantive crawlable body content and one H1 are present. No source change made.' });
  const arabic = route === '/ar' || route.startsWith('/ar/');
  const htmlTag = tags(html, 'html')[0];
  equal(htmlTag?.lang, arabic ? 'ar' : 'en', 'HTML language matches route', route);
  if (arabic) equal(htmlTag?.dir, 'rtl', 'Arabic initial HTML uses RTL', route);
  const englishPath = arabic ? route.slice(3) || '/' : route;
  const arabicPath = '/ar' + (englishPath === '/' ? '' : englishPath);
  const expectedAlternates = [
    { lang: 'en-AE', href: origin + englishPath },
    ...(publicPaths.has(arabicPath) ? [{ lang: 'ar-AE', href: origin + arabicPath }] : []),
    { lang: 'x-default', href: origin + englishPath },
  ];
  equal(record.hreflang, expectedAlternates, 'Real reciprocal EN/AR alternates; no invented Arabic route', route);
  for (const alternate of record.hreflang.filter(item => item.lang !== 'x-default')) {
    const targetPath = new URL(alternate.href).pathname;
    const target = metadata(targetPath, await htmlFor(targetPath));
    check(target.hreflang.some(item => item.href === origin + route && item.lang === (arabic ? 'ar-AE' : 'en-AE')), 'Alternate reciprocates current language URL: ' + targetPath, route);
  }

  const schemas = schemasIn(html);
  const nodes = nodesIn(schemas);
  check(schemas.length >= 2 && nodes.length > 0, 'Shared and page JSON-LD parse', route);
  const organization = nodes.find(node => node['@id'] === origin + '/#organization');
  const business = nodes.find(node => node['@id'] === origin + '/#business');
  equal(organization?.legalName, 'DIGI-TEC Performance Center L.L.C.', 'Confirmed legalName on shared organization', route);
  equal(business?.telephone, '+971 4 340 2223', 'Shared business phone matches established contact record', route);
  equal(business?.address?.streetAddress, 'Al Quoz Industrial Area 3, Warehouses 11–15', 'Established workshop address preserved', route);
  check(types(business ?? {}).includes('AutoRepair'), 'Shared AutoRepair identity retained', route);
  equal(nodes.filter(node => node['@id'] === origin + '/#business').length, 1, 'One shared business node', route);
  const pageNode = nodes.find(node => node['@id'] === origin + route + '#webpage');
  equal(pageNode?.url, origin + route, 'Route WebPage URL matches canonical', route);
  equal(pageNode?.inLanguage, arabic ? 'ar-AE' : 'en-AE', 'WebPage language matches route', route);
  const serviceNode = nodes.find(node => node['@id'] === origin + route + '#service');
  if (route.includes('/services/') && !route.endsWith('/services')) {
    check(Boolean(serviceNode), 'Service entity present', route);
    equal(serviceNode?.provider?.['@id'], origin + '/#business', 'Service reuses shared business provider', route);
  }
  if (!['/', '/ar'].includes(route)) {
    const breadcrumb = nodes.find(node => node['@id'] === origin + route + '#breadcrumb');
    check(Boolean(breadcrumb), 'BreadcrumbList present', route);
    check((breadcrumb?.itemListElement ?? []).every((item, index) => item.position === index + 1 && item.item?.startsWith(origin)), 'Breadcrumb positions/absolute URLs valid', route);
    const last = breadcrumb?.itemListElement?.at(-1);
    equal(last?.item, origin + route, 'Breadcrumb terminates at canonical route', route);
  }
  for (const node of walk(schemas).filter(node => types(node).includes('FAQPage'))) {
    for (const question of node.mainEntity ?? []) {
      check(text(html).includes(text(question.name)), 'FAQ schema question is visible: ' + question.name, route);
      check(text(html).includes(text(question.acceptedAnswer?.text)), 'FAQ schema answer is visible: ' + question.name, route);
    }
  }

  const ids = tags(html, '[a-z][a-z0-9:-]*').filter(tag => Object.hasOwn(tag, 'id')).map(tag => tag.id);
  equal(ids.length, new Set(ids).size, 'No duplicate HTML IDs', route);
  for (const link of tags(html, 'a').filter(tag => tag.href)) {
    let destination;
    try { destination = new URL(link.href, origin + route); } catch { check(false, 'Invalid link URL: ' + link.href, route); continue; }
    if (destination.origin !== origin) continue;
    internalLinkInstances++;
    localDestinations.add(destination.pathname);
    if (publicPaths.has(destination.pathname)) {
      await htmlFor(destination.pathname);
      if (destination.hash) {
        const fragment = decodeURIComponent(destination.hash.slice(1));
        const targetHtml = await htmlFor(destination.pathname);
        const targetIds = tags(targetHtml, '[a-z][a-z0-9:-]*').map(tag => tag.id).filter(Boolean);
        check(targetIds.includes(fragment), 'Internal fragment resolves: ' + destination.pathname + destination.hash, route);
      }
    } else {
      let exists = true;
      try { await access(path.join(dist, destination.pathname.slice(1))); } catch { exists = false; }
      check(exists, 'Local document/asset link exists: ' + destination.pathname, route);
    }
  }
  for (const image of tags(mainFor(html), 'img')) {
    check(Object.hasOwn(image, 'alt'), 'Main image has alt attribute', route);
    const sources = [image.src, ...(image.srcset ?? '').split(',').map(value => value.trim().split(/\s+/)[0])].filter(Boolean);
    for (const src of sources) {
      const sourceUrl = new URL(src, origin + route);
      if (sourceUrl.origin !== origin) continue;
      localImageInstances++;
      let exists = true;
      try { await access(path.join(dist, sourceUrl.pathname.slice(1))); } catch { exists = false; }
      check(exists, 'Local image exists: ' + sourceUrl.pathname, route);
    }
  }

  const rendered = await renderRoute(route);
  equal(rendered.seo?.title, record.title, 'Fresh SSR title equals prerendered title', route);
  equal(rendered.seo?.description, record.description[0], 'Fresh SSR description equals prerendered description', route);
  equal(rendered.seo?.canonical, record.canonical[0], 'Fresh SSR canonical equals prerendered canonical', route);
  equal([...rendered.html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(([, value]) => text(value)), record.h1, 'Fresh SSR heading equals prerendered heading', route);

  if (route.endsWith(ppf)) {
    const localGraph = nodes.filter(node => String(node['@id'] ?? '').startsWith(origin + route));
    const forbidden = walk(localGraph).flatMap(types).filter(type => ['Offer', 'AggregateOffer', 'Product', 'AggregateRating', 'Review'].includes(type));
    equal(forbidden, [], 'No unsupported route-scoped Offer/Product/ratings/reviews', route);
    // The longstanding generic sitewide OfferCatalog is deliberately preserved;
    // it is not a new PPF product or price offer.
    const form = html.match(/<form\b[^>]*id="ppf-quote-form"[^>]*>([\s\S]*?)<\/form>/i)?.[0];
    check(Boolean(form), 'PPF quotation form exists in EN/AR initial HTML', route);
    check(/<fieldset\b[^>]*\bdisabled(?:="")?[^>]*>/.test(form ?? ''), 'All quotation inputs disabled before hydration', route);
    check(/<button\b[^>]*type="submit"[^>]*\bdisabled(?:="")?/.test(form ?? ''), 'Submit button disabled before hydration', route);
    const fields = [...tags(form ?? '', 'input'), ...tags(form ?? '', 'select'), ...tags(form ?? '', 'textarea')];
    for (const name of ['vehicle_brand', 'vehicle_model', 'vehicle_year', 'coverage', 'customer_name', 'contact_details']) {
      const field = fields.find(item => item.name === name);
      check(Boolean(field) && Object.hasOwn(field, 'required'), 'Required quotation field: ' + name, route);
    }
    check(fields.some(field => field.name === 'contact_method'), 'Contact-method selection exists', route);
    check(fields.some(field => field.name === 'customer_notes' && !Object.hasOwn(field, 'required')), 'Optional customer notes field exists', route);
    check(/<option\b[^>]*value="Unsure — advise me"[^>]*selected/.test(form ?? ''), 'Unsure is the default coverage option', route);
    check((form ?? '').includes('privacy-policy.pdf') && (form ?? '').includes('DIGI-TEC Performance Center L.L.C.'), 'Legal entity and privacy policy included in form notice', route);
    check(arabic ? (form ?? '').includes('رسائل تسويقية') : (form ?? '').includes('do not subscribe you to marketing'), 'No marketing subscription implied by enquiry', route);
    const mainText = text(mainFor(html));
    const unsupportedPatterns = [
      /\b(?:XPEL|Llumar|STEK|Suntek|Spectre|3M)\b/i,
      /\b(?:\d+)[ -]year\s+(?:PPF\s+)?warranty\b/i,
      /\b(?:AED|د\.إ)\s*[\d,]+/i,
      /\b\d+(?:\.\d+)?\s*(?:mil|microns?|µm)\b/i,
      /\b(?:authori[sz]ed|certified)\s+(?:PPF|film|installer|manufacturer)\b/i,
      /(?:our|DIGI-TEC(?:’s|'s)?)\s+(?:film|PPF)\s+(?:is|has|provides)\s+(?:self.healing|hydrophobic|\d+%)/i,
    ];
    for (const pattern of unsupportedPatterns) check(!pattern.test(mainText), 'Unsupported film-claim pattern absent: ' + pattern, route);
    if (!arabic) {
      equal(record.title, 'Paint Protection Film (PPF) Dubai | DIGI-TEC', 'Approved main PPF title', route);
      equal(record.h1, ['Paint Protection Film (PPF) in Dubai'], 'Requested clear main H1', route);
      for (const image of tags(mainFor(html), 'img')) check(Boolean(image.width && image.height), 'Dedicated PPF image reserves intrinsic dimensions', route);
    }
  }
}

for (const key of ['title', 'description']) {
  const values = records.map(record => key === 'description' ? record.description[0] : record.title);
  equal(values.length, new Set(values).size, 'Selected routes have unique ' + key, 'selected routes');
}

for (const prefix of ['', '/ar']) {
  const ppfRoute = prefix + ppf;
  for (const source of [prefix || '/', prefix + '/services', prefix + '/services/paint-protection-dubai', prefix + '/services/ceramic-coating', prefix + '/blog/ceramic-coating-vs-ppf-dubai']) {
    check(tags(await htmlFor(source), 'a').some(link => link.href === ppfRoute || link.href?.startsWith(ppfRoute + '#')), 'Contextual/discovery inbound PPF link: ' + source, ppfRoute);
  }
}

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(([, value]) => decode(value));
equal(sitemapUrls.length, new Set(sitemapUrls).size, 'Sitemap URLs unique');
for (const route of selectedRoutes) equal(sitemapUrls.filter(url => url === origin + route).length, 1, 'Indexable owner in sitemap exactly once', route);
const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
equal(robots, await readFile(path.join(root, 'public/robots.txt'), 'utf8'), 'Build preserves approved robots.txt');
check(robots.includes('Sitemap: ' + origin + '/sitemap.xml'), 'Robots points to canonical sitemap');
check(robots.includes('Disallow: /wp-admin') && robots.includes('Disallow: /wp-login'), 'Existing protected endpoint exclusions retained');
check(/User-agent:\s*\*[\s\S]*?Allow:\s*\//.test(robots) && !/Disallow:\s*\/\s*(?:\n|$)/.test(robots), 'Public crawling not globally blocked');

// Exercise the generated production worker directly with local ASSETS. This is
// a local request/response check of the deployable router, with no network.
const { handleRequest } = await import(pathToFileURL(path.join(dist, '_worker.js')).href);
const assets = { async fetch(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname);
  const assetPath = path.resolve(dist, '.' + pathname, path.extname(pathname) ? '' : 'index.html');
  if (path.relative(dist, assetPath).startsWith('..')) return new Response('Not found', { status: 404 });
  let body;
  try { body = await readFile(assetPath); } catch { return new Response('Not found', { status: 404 }); }
  return new Response(request.method === 'HEAD' ? null : body, { status: 200, headers: { 'content-type': path.extname(assetPath) === '.html' ? 'text/html; charset=utf-8' : 'application/octet-stream' } });
} };
const workerResults = [];
for (const route of selectedRoutes) {
  const response = await handleRequest(new Request(origin + route), { ASSETS: assets });
  equal(response.status, 200, 'Generated worker GET status', route);
  const html = await response.text();
  equal(metadata(route, html).canonical, [origin + route], 'Generated worker serves correct route body/canonical', route);
  check(!/noindex/i.test(response.headers.get('x-robots-tag') ?? ''), 'Generated worker does not noindex owner', route);
  workerResults.push({ path: route, status: response.status, xRobotsTag: response.headers.get('x-robots-tag') });
  if (route !== '/') {
    const slash = await handleRequest(new Request(origin + route + '/?utm_source=local-qa'), { ASSETS: assets });
    check([301, 308].includes(slash.status), 'Trailing slash permanently redirects', route);
    equal(slash.headers.get('location'), origin + route + '?utm_source=local-qa', 'Slash redirect preserves query', route);
  }
}
for (const alias of ['/ppf', '/services/ppf', '/ar/ppf', '/ar/services/ppf']) {
  const response = await handleRequest(new Request(origin + alias + '?utm_source=local-qa'), { ASSETS: assets });
  check([301, 308].includes(response.status), 'Legacy PPF alias permanently redirects', alias);
  equal(response.headers.get('location'), origin + (alias.startsWith('/ar') ? '/ar' : '') + ppf + '?utm_source=local-qa', 'Legacy alias lands directly on language owner and preserves query', alias);
  workerResults.push({ path: alias, status: response.status, location: response.headers.get('location') });
}
const missing = await handleRequest(new Request(origin + '/services/not-a-real-ppf-service-phase1'), { ASSETS: assets });
equal(missing.status, 404, 'Unknown service returns real 404');
check(/noindex/i.test(missing.headers.get('x-robots-tag') ?? '') || /noindex/i.test(await missing.text()), 'Unknown route is noindex');

// Optional loopback preview check. Example: LOCAL_BASE_URL=http://127.0.0.1:5190
const httpChecks = [];
if (process.env.LOCAL_BASE_URL) {
  const base = new URL(process.env.LOCAL_BASE_URL);
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)) throw new Error('LOCAL_BASE_URL must be loopback; no production fetches are allowed.');
  for (const route of selectedRoutes) {
    const response = await fetch(new URL(route, base), { redirect: 'manual' });
    equal(response.status, 200, 'Loopback HTTP status', route);
    equal(metadata(route, await response.text()).canonical, [origin + route], 'Loopback serves canonical production metadata', route);
    httpChecks.push({ path: route, status: response.status });
  }
}

await writeFile(path.join(output, 'metadata-after.json'), JSON.stringify(records, null, 2) + '\n');
const before = JSON.parse(await readFile(path.join(output, 'baseline/metadata-before.json'), 'utf8'));
const csvRows = [['route', 'field', 'before', 'after', 'changed']];
for (const record of records) {
  const baseline = before.find(item => item.route === record.route);
  for (const field of ['title', 'description', 'h1', 'canonical']) {
    const oldValue = baseline?.[field];
    const oldText = oldValue === undefined ? '(not captured in baseline)' : Array.isArray(oldValue) ? oldValue.join(' | ') : oldValue;
    const newValue = record[field];
    const newText = Array.isArray(newValue) ? newValue.join(' | ') : newValue;
    csvRows.push([record.route, field, oldText, newText, oldValue === undefined ? 'BASELINE NOT CAPTURED' : String(oldText !== newText)]);
  }
}
await writeFile(path.join(output, 'metadata-before-after.csv'), '\uFEFF' + csvRows.map(row => row.map(value => '"' + String(value).replace(/"/g, '""') + '"').join(',')).join('\n') + '\n');
const failures = checks.filter(check => !check.pass);
const result = {
  verifiedAt: new Date().toISOString(), scope: 'Local final dist, fresh dist-server rendering and generated production worker only; no live traffic or external analytics.',
  routeCount: selectedRoutes.length, publicRouteCount: routeInventory.length, sitemapUrlCount: sitemapUrls.length,
  checks: checks.length, passed: checks.length - failures.length, failed: failures.length,
  internalLinkInstances, distinctLocalDestinations: localDestinations.size, localImageInstances,
  workerResults, httpChecks, failures, advisories,
  limitations: ['Pattern checks cannot prove every business statement; claims were also audited manually.', 'No production indexing, Google selected canonical, real-user Core Web Vitals, WhatsApp delivery, CRM lead or booking confirmation is established.'],
};
await writeFile(path.join(output, 'local-verification.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
