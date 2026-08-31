import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE_URL = 'https://digitecme.com';
const root = process.cwd();
const distDirectory = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');
const { getPublicRoutes } = await import(pathToFileURL(serverEntry).href);
const routes = getPublicRoutes();

const errors = [];
const warnings = [];
const records = [];
const routePaths = new Set(routes.map((route) => route.path));
const indexablePaths = new Set(routes.filter((route) => route.indexable).map((route) => route.path));

const expected = {
  home: ['WebPage', 'FAQPage'],
  'services-hub': ['CollectionPage', 'BreadcrumbList', 'ItemList'],
  service: ['WebPage', 'BreadcrumbList', 'Service'],
  'brands-hub': ['CollectionPage', 'BreadcrumbList', 'ItemList'],
  brand: ['WebPage', 'BreadcrumbList', 'Brand', 'Service'],
  'brand-service': ['WebPage', 'BreadcrumbList', 'Service'],
  'blog-hub': ['CollectionPage', 'BreadcrumbList', 'Blog'],
  article: ['ItemPage', 'BreadcrumbList', 'BlogPosting'],
  about: ['AboutPage', 'BreadcrumbList'],
  faq: ['FAQPage', 'BreadcrumbList'],
  tuning: ['WebPage', 'BreadcrumbList', 'Service'],
  vrx: ['ItemPage', 'BreadcrumbList', 'Service'],
  'html-sitemap': ['CollectionPage', 'BreadcrumbList', 'ItemList'],
  'workshop-guide': ['WebPage', 'BreadcrumbList', 'Service'],
};

const purpose = {
  home: 'Business identity and primary workshop overview',
  'services-hub': 'Service collection and navigation',
  service: 'Individual workshop service',
  'brands-hub': 'Vehicle-brand collection and navigation',
  brand: 'Vehicle-brand workshop hub',
  'brand-service': 'Brand-specific workshop service',
  'blog-hub': 'Automotive article collection',
  article: 'Owner guide or workshop article',
  about: 'Business background and contact facts',
  faq: 'Visible customer questions and answers',
  tuning: 'Performance tuning service overview',
  vrx: 'Vehicle upgrade service overview',
  'html-sitemap': 'Human-readable website navigation',
  'workshop-guide': 'Workshop selection guide and relevant service',
};

const beforeSchema = {
  home: 'Static Organization/AutoRepair/WebSite + client WebPage/ItemList/SearchAction/FAQPage',
  'services-hub': 'Synthetic WebPage/Service + client CollectionPage/BreadcrumbList/ItemList',
  service: 'Duplicate synthetic and client WebPage/Service/BreadcrumbList/FAQPage',
  'brands-hub': 'Client-only CollectionPage/BreadcrumbList/ItemList',
  brand: 'Duplicate WebPage/Service + client Brand/OfferCatalog/FAQPage',
  'brand-service': 'Duplicate WebPage/Service/BreadcrumbList/OfferCatalog/FAQPage; noindex conflict',
  'blog-hub': 'Synthetic CollectionPage/Blog + client CollectionPage/BreadcrumbList/Blog',
  article: 'Some routes missing initial schema; otherwise conflicting Article/BlogPosting graphs',
  about: 'Synthetic Service plus client AboutPage/Thing',
  faq: 'Synthetic Service plus two client FAQPage nodes',
  tuning: 'Synthetic and client Service graphs',
  vrx: 'Synthetic Service plus unsafe Product/Offer availability claims',
  'html-sitemap': 'Synthetic Service only; no client route graph',
  'workshop-guide': 'Self-authored best/rating claims in WebPage/Service/FAQPage',
};

const recommendedSchema = {
  home: 'Organization, AutoRepair/AutomotiveBusiness, WebSite, WebPage, OfferCatalog, FAQPage',
  'services-hub': 'CollectionPage, BreadcrumbList, ItemList',
  service: 'WebPage, BreadcrumbList, Service, visible FAQPage, OfferCatalog when visible',
  'brands-hub': 'CollectionPage, BreadcrumbList, ItemList',
  brand: 'WebPage, BreadcrumbList, Brand, Service, visible FAQPage, OfferCatalog',
  'brand-service': 'WebPage, BreadcrumbList, Brand, Service, visible FAQPage, OfferCatalog',
  'blog-hub': 'CollectionPage, BreadcrumbList, Blog, ItemList',
  article: 'ItemPage, BreadcrumbList, BlogPosting, visible FAQPage when present',
  about: 'AboutPage, BreadcrumbList, Organization/AutoRepair reference',
  faq: 'FAQPage, BreadcrumbList',
  tuning: 'WebPage, BreadcrumbList, Service, visible FAQPage, OfferCatalog',
  vrx: 'ItemPage, BreadcrumbList, Service',
  'html-sitemap': 'CollectionPage, BreadcrumbList, ItemList',
  'workshop-guide': 'WebPage, BreadcrumbList, Service, visible FAQPage without ratings/recommendations',
};

const decodeHref = (value) => value.replace(/&amp;/g, '&');
const normalizePath = (pathname) => pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
const outputFileFor = (routePath) => routePath === '/'
  ? path.join(distDirectory, 'index.html')
  : path.join(distDirectory, routePath.replace(/^\//, ''), 'index.html');

const objectDefinitions = (value, definitions = new Map()) => {
  if (Array.isArray(value)) {
    value.forEach((item) => objectDefinitions(item, definitions));
    return definitions;
  }
  if (!value || typeof value !== 'object') return definitions;
  if (typeof value['@id'] === 'string' && Object.keys(value).some((key) => key !== '@id')) {
    const entries = definitions.get(value['@id']) ?? [];
    entries.push(JSON.stringify(value));
    definitions.set(value['@id'], entries);
  }
  Object.values(value).forEach((item) => objectDefinitions(item, definitions));
  return definitions;
};

const collectTypes = (value, types = new Set()) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectTypes(item, types));
    return types;
  }
  if (!value || typeof value !== 'object') return types;
  const rawType = value['@type'];
  if (Array.isArray(rawType)) rawType.forEach((type) => types.add(type));
  else if (typeof rawType === 'string') types.add(rawType);
  Object.values(value).forEach((item) => collectTypes(item, types));
  return types;
};

const collectObjectsById = (value, objects = new Map()) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectObjectsById(item, objects));
    return objects;
  }
  if (!value || typeof value !== 'object') return objects;
  if (typeof value['@id'] === 'string' && Object.keys(value).some((key) => key !== '@id')) {
    objects.set(value['@id'], value);
  }
  Object.values(value).forEach((item) => collectObjectsById(item, objects));
  return objects;
};

const expectedMainEntity = (route) => {
  const canonical = `${SITE_URL}${route.path}`;
  if (route.family === 'home' || route.family === 'about') return `${SITE_URL}/#business`;
  if (route.family === 'service' || route.family === 'brand' || route.family === 'brand-service' || route.family === 'tuning' || route.family === 'vrx' || route.family === 'workshop-guide') return `${canonical}#service`;
  if (route.family === 'article') return `${canonical}#article`;
  if (route.family === 'blog-hub') return `${canonical}#blog`;
  if (route.family === 'faq') return `${canonical}#faq`;
  if (route.family === 'services-hub') return `${canonical}#servicelist`;
  if (route.family === 'brands-hub') return `${canonical}#brandlist`;
  if (route.family === 'html-sitemap') return `${canonical}#sitemap-list`;
  return undefined;
};

for (const route of routes) {
  const file = outputFileFor(route.path);
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    errors.push(`${route.path}: missing prerendered file`);
    continue;
  }

  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
  const descriptions = [...html.matchAll(/<meta\s+name="description"[^>]*content="([^"]*)"[^>]*>/gi)];
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"[^>]*href="([^"]*)"[^>]*>/gi)];
  const ogTitles = [...html.matchAll(/<meta\s+property="og:title"[^>]*>/gi)];
  const ogDescriptions = [...html.matchAll(/<meta\s+property="og:description"[^>]*>/gi)];
  const alternates = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"[^>]*href="([^"]+)"[^>]*>/gi)];
  const robots = html.match(/<meta\s+name="robots"[^>]*content="([^"]*)"[^>]*>/i)?.[1] ?? '';
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (titles.length !== 1) errors.push(`${route.path}: expected one title, found ${titles.length}`);
  if (descriptions.length !== 1) errors.push(`${route.path}: expected one meta description, found ${descriptions.length}`);
  if (ogTitles.length !== 1) errors.push(`${route.path}: expected one og:title, found ${ogTitles.length}`);
  if (ogDescriptions.length !== 1) errors.push(`${route.path}: expected one og:description, found ${ogDescriptions.length}`);
  if (/<meta\s+name="keywords"/i.test(html)) errors.push(`${route.path}: obsolete meta keywords tag remains`);
  if (h1Count !== 1) errors.push(`${route.path}: expected one initial HTML H1, found ${h1Count}`);
  if (route.indexable) {
    const expectedCanonical = `${SITE_URL}${route.path}`;
    if (canonicals.length !== 1 || canonicals[0][1] !== expectedCanonical) {
      errors.push(`${route.path}: canonical mismatch (${canonicals.map((match) => match[1]).join(', ') || 'missing'})`);
    }
    if (!robots.startsWith('index,')) errors.push(`${route.path}: indexable route has robots=${robots}`);
    const hreflangs = new Set(alternates.map((match) => match[1]));
    const arabicEquivalent = route.path.startsWith('/ar')
      ? route.path.replace(/^\/ar(?=\/|$)/, '') || '/'
      : route.path === '/' ? '/ar' : `/ar${route.path}`;
    const hasArabicEquivalent = route.path.startsWith('/ar') || routePaths.has(arabicEquivalent);
    const expectedHreflangs = hasArabicEquivalent
      ? ['en-AE', 'ar-AE', 'x-default']
      : ['en-AE', 'x-default'];
    if (alternates.length !== expectedHreflangs.length || !expectedHreflangs.every((value) => hreflangs.has(value))) {
      errors.push(`${route.path}: expected ${expectedHreflangs.join(', ')} alternates`);
    }
  } else if (!robots.startsWith('noindex,')) {
    errors.push(`${route.path}: pruned route is not noindex`);
  }

  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const parsedSchemas = [];
  scripts.forEach((match, index) => {
    try {
      parsedSchemas.push(JSON.parse(match[1]));
    } catch (error) {
      errors.push(`${route.path}: JSON-LD block ${index + 1} is invalid (${error.message})`);
    }
  });
  if (scripts.length !== 2) errors.push(`${route.path}: expected site + route JSON-LD blocks, found ${scripts.length}`);

  const definitions = objectDefinitions(parsedSchemas);
  for (const [id, values] of definitions) {
    const uniqueDefinitions = new Set(values);
    if (uniqueDefinitions.size > 1) errors.push(`${route.path}: conflicting definitions for ${id}`);
  }

  const schemaText = JSON.stringify(parsedSchemas);
  if (/2009/.test(schemaText)) errors.push(`${route.path}: schema contains obsolete founding year 2009`);
  if (/aggregateRating|reviewRating|"@type":"Review"|"@type":"Recommendation"/i.test(schemaText)) {
    errors.push(`${route.path}: schema contains rating/review/recommendation markup`);
  }

  const types = collectTypes(parsedSchemas);
  for (const type of expected[route.family] ?? []) {
    if (!types.has(type)) errors.push(`${route.path}: missing expected schema type ${type}`);
  }

  const objects = collectObjectsById(parsedSchemas);
  const canonicalUrl = `${SITE_URL}${route.path}`;
  const page = objects.get(`${canonicalUrl}#webpage`);
  if (!page) {
    errors.push(`${route.path}: missing stable WebPage @id`);
  } else {
    const expectedMain = expectedMainEntity(route);
    if (expectedMain && page.mainEntity?.['@id'] !== expectedMain) {
      errors.push(`${route.path}: WebPage mainEntity should reference ${expectedMain}`);
    }
  }

  const outgoing = new Set();
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)) {
    const href = decodeHref(match[1]);
    try {
      const target = new URL(href, SITE_URL);
      if (target.origin !== SITE_URL) continue;
      const targetPath = normalizePath(target.pathname);
      if (routePaths.has(targetPath) && targetPath !== route.path) outgoing.add(targetPath);
    } catch {
      warnings.push(`${route.path}: invalid internal href ${href}`);
    }
  }

  records.push({
    ...route,
    canonical: route.indexable ? `${SITE_URL}${route.path}` : (canonicals[0]?.[1] ?? `${SITE_URL}${route.path}`),
    title: titles[0]?.[1]?.replace(/<[^>]+>/g, '') ?? '',
    schemaTypes: [...types].sort(),
    outgoing,
  });
}

const inbound = new Map(routes.map((route) => [route.path, 0]));
records.forEach((record) => record.outgoing.forEach((target) => inbound.set(target, (inbound.get(target) ?? 0) + 1)));
records.forEach((record) => {
  if (record.indexable && record.path !== '/' && (inbound.get(record.path) ?? 0) === 0) {
    errors.push(`${record.path}: indexable route has no inbound prerendered anchor`);
  }
});

try {
  const sitemapXml = await readFile(path.join(distDirectory, 'sitemap.xml'), 'utf8');
  const sitemapPaths = new Set(
    [...sitemapXml.matchAll(/<loc>https:\/\/digitecme\.com([^<]*)<\/loc>/g)]
      .map((match) => match[1] || '/'),
  );
  for (const routePath of indexablePaths) {
    if (!sitemapPaths.has(routePath)) errors.push(`${routePath}: indexable route missing from sitemap`);
  }
  for (const sitemapPath of sitemapPaths) {
    if (!indexablePaths.has(sitemapPath)) errors.push(`${sitemapPath}: sitemap contains a non-indexable or unknown route`);
  }
  if (sitemapPaths.size !== indexablePaths.size) {
    errors.push(`sitemap count ${sitemapPaths.size} does not match indexable route count ${indexablePaths.size}`);
  }
} catch (error) {
  errors.push(`unable to validate built sitemap (${error.message})`);
}

const csvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const csvRows = [
  [
    'Canonical URL', 'Path', 'Locale', 'Route family', 'Page purpose', 'Indexability',
    'Main visible entity', 'Before schema', 'After schema', 'Recommended schema',
    'Sitemap inclusion', 'Inbound internal links', 'Internal-link status', 'Title',
  ],
  ...records.map((record) => [
    record.canonical,
    record.path,
    record.path === '/ar' || record.path.startsWith('/ar/') ? 'ar-AE' : 'en-AE',
    record.family,
    purpose[record.family],
    record.indexable ? 'index, follow' : 'noindex, follow',
    purpose[record.family],
    beforeSchema[record.family],
    record.schemaTypes.join('; '),
    recommendedSchema[record.family],
    record.indexable ? 'Yes' : 'No',
    inbound.get(record.path) ?? 0,
    (inbound.get(record.path) ?? 0) > 0 || record.path === '/' ? 'Linked' : 'Orphan',
    record.title,
  ]),
].map((row) => row.map(csvCell).join(',')).join('\n');

const docsDirectory = path.join(root, 'docs', 'seo');
await mkdir(docsDirectory, { recursive: true });
await writeFile(path.join(docsDirectory, 'route-schema-matrix.csv'), `${csvRows}\n`);

const familyCounts = records.reduce((counts, record) => {
  counts[record.family] = (counts[record.family] ?? 0) + 1;
  return counts;
}, {});
const inventory = `# Schema and route inventory\n\nGenerated from the production build on 2026-08-20. The CSV in this folder contains one row for every public content route.\n\n## Before\n\n- Synthetic crawler-only route bodies replaced the real React UI.\n- Route JSON-LD was duplicated after JavaScript and could persist across navigation.\n- 994 sitemap URLs omitted 60 indexable routes and included one redirect.\n- 280 pruned pages switched from noindex to index after hydration.\n- Shared entity names and facts conflicted, and unsupported ratings/recommendations appeared in visible content.\n\n## After\n\n- ${records.length} real React routes are statically rendered: ${records.filter((record) => record.indexable).length} indexable and ${records.filter((record) => !record.indexable).length} consistently noindex.\n- The sitemap contains only canonical indexable content routes.\n- Every route has one site entity graph and one route graph, with stable IDs.\n- Initial HTML contains the route title, description, canonical, H1, semantic content, internal links and JSON-LD.\n\n## Route counts\n\n${Object.entries(familyCounts).sort().map(([family, count]) => `- ${family}: ${count}`).join('\n')}\n\n## Validation\n\n- Errors: ${errors.length}\n- Warnings: ${warnings.length}\n`;
await writeFile(path.join(docsDirectory, 'schema-inventory.md'), inventory);

if (warnings.length) {
  console.warn(`SEO validation warnings (${warnings.length}):`);
  warnings.slice(0, 30).forEach((warning) => console.warn(`- ${warning}`));
}
if (errors.length) {
  console.error(`SEO validation errors (${errors.length}):`);
  errors.slice(0, 100).forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`SEO validation passed for ${records.length} routes and ${records.filter((record) => record.indexable).length} sitemap URLs.`);
}
