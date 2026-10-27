import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Run only after the requested production build has finished.
// This verifier uses generated HTML and baseline snapshots, not source content arrays.
const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const output = path.join(root, 'outputs/paint-seo-2026-10-12');
const dist = path.join(root, 'dist');
const origin = 'https://digitecme.com';
const expectedServicePaths = [
  '/services/paint-protection-dubai', '/services/paint-protection-film',
  '/services/ceramic-coating', '/services/car-polishing-dubai',
  '/ar/services/paint-protection-dubai', '/ar/services/paint-protection-film',
  '/ar/services/ceramic-coating',
];
const noArabicPolishing = '/ar/services/car-polishing-dubai';
const errors = [];
const warnings = [];
const check = (condition, route, rule, actual) => {
  if (!condition) errors.push({ route, rule, ...(actual === undefined ? {} : { actual }) });
};
const decode = (s = '') => s.replace(/&(?:amp|quot|apos|lt|gt|nbsp);|&#(?:x[\da-f]+|\d+);/gi, value => {
  const names = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
  if (names[value.toLowerCase()]) return names[value.toLowerCase()];
  const number = value.slice(2, -1);
  const code = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : parseInt(number, 10);
  return Number.isFinite(code) ? String.fromCodePoint(code) : value;
});
const text = (s = '') => decode(s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (s, name) => {
  const match = s.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? decode(match[1] ?? match[2]) : undefined;
};
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(m => m[0]);
const mainIn = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
const bodyText = html => text(html.replace(/<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)>/gi, ''));
const fileFor = (route, prefix = dist) => path.join(prefix, route.replace(/^\//, ''), 'index.html');
const csv = rows => '\uFEFF' + rows.map(row => row.map(v => '"' + String(v ?? '').replaceAll('"', '""') + '"').join(',')).join('\n') + '\n';
const flatten = value => Array.isArray(value) ? value.flatMap(flatten) : value && typeof value === 'object' ? [value, ...Object.values(value).flatMap(flatten)] : [];
const hasType = (node, type) => (Array.isArray(node['@type']) ? node['@type'] : [node['@type']]).includes(type);
const schemaIn = (html, route) => {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m => attr(m[1], 'type') === 'application/ld+json');
  const documents = [];
  for (const script of scripts) {
    try { documents.push(JSON.parse(script[2])); }
    catch (error) { errors.push({ route, rule: 'JSON-LD syntax', actual: error.message }); }
  }
  return documents.flatMap(document => Array.isArray(document) ? document : document['@graph'] || [document]);
};
const metadataIn = (html, route) => {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
  const titles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(m => text(m[1]));
  const descriptions = tags(head, 'meta').filter(t => attr(t, 'name')?.toLowerCase() === 'description').map(t => attr(t, 'content'));
  const canonicals = tags(head, 'link').filter(t => attr(t, 'rel') === 'canonical').map(t => attr(t, 'href'));
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  const alternates = tags(head, 'link').filter(t => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang')).map(t => ({ language: attr(t, 'hreflang'), href: attr(t, 'href') }));
  const robots = tags(head, 'meta').filter(t => ['robots', 'googlebot'].includes(attr(t, 'name')?.toLowerCase())).map(t => attr(t, 'content'));
  return { route, title: titles[0], description: descriptions[0], canonical: canonicals[0], h1: h1s[0], titles, descriptions, canonicals, h1s, alternates, robots };
};
const linksIn = (html, route) => [...mainIn(html).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].flatMap(m => {
  const href = attr(m[1], 'href');
  if (!href) return [];
  try {
    const url = new URL(href, origin + route);
    return [{ source: route, href, target: url.href, pathname: url.pathname, hash: decodeURIComponent(url.hash.slice(1)), anchor: text(m[2]), placement: attr(m[1], 'data-cta-placement'), internal: url.origin === origin }];
  } catch (error) { errors.push({ route, rule: 'Valid link URL', actual: href }); return []; }
});
const faqCount = html => {
  const main = mainIn(html);
  // Radix SSR emits aria-expanded/data-state triggers before aria-controls.
  return tags(main, 'summary').length + tags(main, 'button').filter(t => attr(t, 'aria-expanded') !== undefined && attr(t, 'data-orientation') === 'vertical' && attr(t, 'data-radix-collection-item') !== undefined).length;
};
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const routeMap = new Map(routes.map(r => [r.path, r]));
const beforeRoutes = JSON.parse(await readFile(path.join(output, 'before/public-routes.json'), 'utf8'));
const beforeMetadata = JSON.parse(await readFile(path.join(output, 'before/metadata.json'), 'utf8'));
const beforeRouteMap = new Map(beforeRoutes.map(r => [r.path, r]));
const addedRoutes = routes.filter(r => !beforeRouteMap.has(r.path)).map(r => r.path);
const removedRoutes = beforeRoutes.filter(r => !routeMap.has(r.path)).map(r => r.path);
const indexabilityChanged = routes.filter(r => beforeRouteMap.has(r.path) && r.indexable !== beforeRouteMap.get(r.path).indexable).map(r => r.path);
check(addedRoutes.length === 0 && removedRoutes.length === 0 && indexabilityChanged.length === 0, 'site', 'Public routes and indexability unchanged', { addedRoutes, removedRoutes, indexabilityChanged });
check(!routeMap.has(noArabicPolishing), 'site', 'No invented Arabic polishing route');
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const redirectLines = (await readFile(path.join(dist, '_redirects'), 'utf8')).split(/\r?\n/).filter(line => line.trim().startsWith('/')).map(line => line.trim().split(/\s+/));
const redirects = new Map(redirectLines.filter(line => !line[0].includes('*') && ['301', '302', '307', '308'].includes(line[2])).map(([source, destination]) => [source, destination]));
const resolveRedirect = pathname => {
  const seen = new Set();
  let current = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  while (redirects.has(current)) {
    if (seen.has(current)) return { pathname: current, cycle: true };
    seen.add(current);
    const next = new URL(redirects.get(current), origin);
    if (next.origin !== origin) return { external: next.href };
    current = next.pathname === '/' ? '/' : next.pathname.replace(/\/+$/, '');
  }
  return { pathname: current, hops: seen.size };
};
const htmlCache = new Map();
const htmlFor = async route => {
  if (!htmlCache.has(route)) htmlCache.set(route, await readFile(fileFor(route), 'utf8'));
  return htmlCache.get(route);
};
const baselineHtml = await readFile(fileFor(expectedServicePaths[0], path.join(output, 'before/html')), 'utf8');
const baselineNodes = schemaIn(baselineHtml, 'baseline');
const baselineBusiness = baselineNodes.find(n => n['@id'] === `${origin}/#business`);
check(Boolean(baselineBusiness), 'baseline', 'Verified baseline business identity exists');
const records = [];
const metadataDiff = [['Route', 'Field', 'Before', 'After', 'Changed']];
const linkDiff = [['Change', 'Source', 'Destination', 'Anchor text', 'CTA placement']];
const imagePaths = new Set();
const externalImages = new Set();
const intrinsicDimensionAdvisories = [];
let linksChecked = 0;
for (const before of beforeMetadata) {
  const route = before.route;
  const html = await htmlFor(route);
  const metadata = metadataIn(html, route);
  for (const field of ['title', 'description', 'canonical', 'h1']) metadataDiff.push([route, field, before[field], metadata[field], before[field] !== metadata[field]]);
  const oldHtml = await readFile(fileFor(route, path.join(output, 'before/html')), 'utf8');
  const afterLinks = linksIn(html, route);
  const oldLinks = linksIn(oldHtml, route);
  const key = link => JSON.stringify([link.target, link.anchor, link.placement ?? '']);
  const oldKeys = new Set(oldLinks.map(key));
  const newKeys = new Set(afterLinks.map(key));
  for (const link of afterLinks.filter(l => !oldKeys.has(key(l)))) linkDiff.push(['Added', route, link.target, link.anchor, link.placement]);
  for (const link of oldLinks.filter(l => !newKeys.has(key(l)))) linkDiff.push(['Removed', route, link.target, link.anchor, link.placement]);
  for (const link of afterLinks.filter(l => l.internal)) {
    linksChecked++;
    const resolved = resolveRedirect(link.pathname);
    check(!resolved.cycle, route, 'No redirect cycle', link.href);
    if (resolved.external) { warnings.push({ route, rule: 'External redirect not fetched', actual: resolved.external }); continue; }
    const target = resolved.pathname;
    check(target !== noArabicPolishing, route, 'No links to invented Arabic polishing', link.href);
    if (routeMap.has(target)) {
      const destinationHtml = target === route ? html : await htmlFor(target);
      if (link.hash) {
        const ids = [...tags(destinationHtml, '[a-z][a-z0-9:-]*')].map(t => attr(t, 'id'));
        const names = tags(destinationHtml, 'a').map(t => attr(t, 'name'));
        check(ids.includes(link.hash) || names.includes(link.hash), route, 'Internal fragment exists', link.href);
      }
    } else {
      try { await access(path.join(dist, decodeURIComponent(link.pathname).replace(/^\//, ''))); }
      catch { errors.push({ route, rule: 'Main internal link resolves to real route or file', actual: link.href }); }
    }
  }
  for (const image of tags(mainIn(html), 'img')) {
    check(attr(image, 'alt') !== undefined, route, 'Image alt attribute exists', attr(image, 'src'));
    const intrinsicDimensions = /^\d+$/.test(attr(image, 'width') || '') && /^\d+$/.test(attr(image, 'height') || '');
    if (!intrinsicDimensions) {
      const main = mainIn(html);
      const wrapper = tags(main.slice(0, main.indexOf(image)), 'div').at(-1) || '';
      const reservedWrapper = /aspect-\[4\/3\]|w-12 h-12 sm:w-14 sm:h-14/.test(attr(wrapper, 'class') || '');
      check(reservedWrapper, route, 'Image reserves space through intrinsic size or existing fixed wrapper', attr(image, 'src'));
      intrinsicDimensionAdvisories.push({ route, src: attr(image, 'src'), reservedWrapper, rule: 'Explicit intrinsic dimensions omitted; existing wrapper reserves layout space' });
    }
  }
  for (const image of [...tags(mainIn(html), 'img'), ...tags(mainIn(html), 'source')]) {
    const sources = [attr(image, 'src'), ...(attr(image, 'srcset') || '').split(',').map(s => s.trim().split(/\s+/)[0])].filter(Boolean);
    for (const src of sources) {
      if (src.startsWith('data:')) continue;
      const url = new URL(src, origin + route);
      if (url.origin !== origin) { externalImages.add(url.href); continue; }
      imagePaths.add(url.pathname);
      try { await access(path.join(dist, decodeURIComponent(url.pathname).replace(/^\//, ''))); }
      catch { errors.push({ route, rule: 'Main image asset exists', actual: src }); }
    }
  }
  const serviceRoute = expectedServicePaths.includes(route);
  if (!serviceRoute) { records.push({ ...metadata, mainLinks: afterLinks.length, faqCount: faqCount(html) }); continue; }
  check(routeMap.get(route)?.indexable === true, route, 'Canonical route indexable in manifest');
  check(metadata.titles.length === 1 && Boolean(metadata.title), route, 'One nonempty title', metadata.titles);
  check(metadata.descriptions.length === 1 && Boolean(metadata.description), route, 'One nonempty description', metadata.descriptions);
  check(metadata.h1s.length === 1 && Boolean(metadata.h1), route, 'One nonempty H1', metadata.h1s);
  check(metadata.canonicals.length === 1 && metadata.canonical === origin + route, route, 'One self-canonical', metadata.canonicals);
  check(metadata.robots.length > 0 && metadata.robots.every(r => !/\b(noindex|none|nofollow)\b/i.test(r || '')), route, 'Robots permits indexing and following', metadata.robots);
  check(sitemap.split(`<loc>${origin + route}</loc>`).length - 1 === 1, route, 'One canonical sitemap entry');
  const english = route.replace(/^\/ar(?=\/)/, '');
  const arabic = '/ar' + english;
  const hasArabic = routeMap.has(arabic);
  const expectedAlternates = [{ language: 'en-AE', href: origin + english }, ...(hasArabic ? [{ language: 'ar-AE', href: origin + arabic }] : []), { language: 'x-default', href: origin + english }];
  const sorted = value => value.map(v => `${v.language}:${v.href}`).sort();
  check(JSON.stringify(sorted(metadata.alternates)) === JSON.stringify(sorted(expectedAlternates)), route, 'Real equivalent language alternates', metadata.alternates);
  if (hasArabic) {
    const alternateMetadata = metadataIn(await htmlFor(route.startsWith('/ar/') ? english : arabic), arabic);
    check(JSON.stringify(sorted(alternateMetadata.alternates)) === JSON.stringify(sorted(expectedAlternates)), route, 'Reciprocal language alternates', alternateMetadata.alternates);
  }
  const htmlTag = tags(html, 'html')[0] || '';
  check(attr(htmlTag, 'lang') === (route.startsWith('/ar/') ? 'ar' : 'en'), route, 'Correct HTML language', attr(htmlTag, 'lang'));
  if (route.startsWith('/ar/')) check(attr(htmlTag, 'dir') === 'rtl', route, 'Arabic HTML uses RTL');
  const nodes = schemaIn(html, route);
  const service = nodes.filter(n => n['@id'] === `${origin + route}#service` && hasType(n, 'Service'));
  check(service.length === 1, route, 'One Service node');
  check(service[0]?.provider?.['@id'] === `${origin}/#business`, route, 'Service references verified provider');
  const business = nodes.filter(n => n['@id'] === `${origin}/#business`);
  check(business.length === 1 && JSON.stringify(business[0]) === JSON.stringify(baselineBusiness), route, 'Business identity preserved from baseline');
  const breadcrumb = nodes.filter(n => hasType(n, 'BreadcrumbList') && n['@id'] === `${origin + route}#breadcrumb`);
  const prefix = route.startsWith('/ar/') ? '/ar' : '';
  const expectedBreadcrumb = [origin + (prefix || '/'), origin + prefix + '/services', origin + route];
  check(breadcrumb.length === 1 && JSON.stringify(breadcrumb[0].itemListElement.map(i => i.item)) === JSON.stringify(expectedBreadcrumb), route, 'Localized breadcrumb URLs', breadcrumb[0]?.itemListElement);
  check(breadcrumb[0]?.itemListElement.every((i, index) => i.position === index + 1 && i.name), route, 'Breadcrumb names and positions');
  const routeNodes = nodes.filter(n => String(n['@id'] || '').startsWith(origin + route + '#'));
  const bannedObjects = flatten(routeNodes).filter(n => ['AggregateRating', 'Review', 'Offer', 'Product'].some(t => hasType(n, t)) || ['price', 'priceCurrency', 'offers', 'aggregateRating', 'review'].some(k => Object.hasOwn(n, k)));
  check(bannedObjects.length === 0, route, 'No invented route ratings, product offers or prices', bannedObjects);
  const visibleText = bodyText(mainIn(html));
  check(!/\b(?:from\s+)?AED\s*\d|\d[\d,.]*\s*(?:AED|درهم)/i.test(visibleText), route, 'No unverified displayed price');
  check(!/parts\s+and\s+fluids|\bdiagnostics\b|mechanical repairs|قطع الغيار والسوائل|قطع غيار وسوائل|التشخيص والبرمجة/i.test(visibleText), route, 'No mechanical boilerplate in paint main content');
  const faqs = faqCount(html);
  check(faqs > 0 && faqs >= faqCount(oldHtml), route, 'FAQ disclosures present and not lost', { before: faqCount(oldHtml), after: faqs });
  const faqAnswerRegions = [...mainIn(html).matchAll(/<div\b(?=[^>]*\brole="region")([^>]*)>([\s\S]*?)<\/div>/gi)].filter(m => attr(m[1], 'aria-labelledby') && bodyText(m[2]));
  const detailsWithAnswers = [...mainIn(html).matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].filter(m => text(m[1].replace(/<summary\b[^>]*>[\s\S]*?<\/summary>/i, '')).length > 0);
  check(faqAnswerRegions.length + detailsWithAnswers.length === faqs, route, 'FAQ answers present in initial HTML', { disclosures: faqs, answerRegions: faqAnswerRegions.length, detailsWithAnswers: detailsWithAnswers.length });
  const faqSchemas = nodes.filter(n => hasType(n, 'FAQPage'));
  for (const faqSchema of faqSchemas) {
    check(faqSchema.mainEntity?.length > 0 && faqSchema.mainEntity.length <= faqs, route, 'FAQ schema represents existing visible disclosures');
    if (faqSchema.mainEntity?.length < faqs) warnings.push({ route, rule: 'Existing schema builder publishes a subset of visible FAQ disclosures', actual: { visible: faqs, published: faqSchema.mainEntity.length } });
    for (const faq of faqSchema.mainEntity || []) check(visibleText.includes(text(faq.name)) && visibleText.includes(text(faq.acceptedAnswer?.text)), route, 'FAQ question and answer present in initial main HTML', faq.name);
  }
  const telephone = baselineBusiness.telephone.replace(/[^\d+]/g, '');
  const whatsapp = afterLinks.filter(l => l.target.startsWith('https://wa.me/'));
  const call = afterLinks.filter(l => l.href.startsWith('tel:'));
  check(whatsapp.some(l => new URL(l.target).pathname === '/' + telephone.replace('+', '') && l.placement), route, 'Tracked WhatsApp CTA retains verified number');
  check(call.some(l => l.href.replace(/[\s()-]/g, '') === 'tel:' + telephone), route, 'Call CTA retains verified number');
  if (route.endsWith('/paint-protection-dubai')) {
    const comparison = mainIn(html).match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/i)?.[1] || '';
    check(tags(comparison, 'tr').length === 8, route, 'Hub has all eight comparison topics', tags(comparison, 'tr').length);
    const rows = [...comparison.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
    check(rows.every(r => tags(r[1], 'th').length === 1 && tags(r[1], 'td').length === 3), route, 'Comparison distinguishes PPF, coating and correction');
  }
  records.push({ ...metadata, mainLinks: afterLinks.length, faqCount: faqs, faqSchemaCount: faqSchemas.length, publishedFaqQuestionCount: faqSchemas.reduce((count, schema) => count + (schema.mainEntity?.length || 0), 0), jsonLdTypes: [...new Set(flatten(nodes).flatMap(n => Array.isArray(n['@type']) ? n['@type'] : n['@type'] ? [n['@type']] : []))], htmlSha256: createHash('sha256').update(html).digest('hex') });
}
const arabicArticlePaths = ['/ar/blog/ceramic-coating-vs-ppf-dubai', '/ar/blog/why-ceramic-coating-matters-uae'];
const arabicArticles = [];
const arabicArticleCsv = [['Route', 'Title', 'Description', 'H1', 'Canonical', 'Hub link', 'PPF link', 'Ceramic link', 'RTL', 'JSON-LD types']];
for (const route of arabicArticlePaths) {
  const html = await htmlFor(route);
  const metadata = metadataIn(html, route);
  const nodes = schemaIn(html, route);
  const links = linksIn(html, route);
  const articleHtml = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] || '';
  const articleLinks = linksIn('<main>' + articleHtml + '</main>', route);
  const articleDestinations = new Set(articleLinks.filter(l => l.internal).map(l => resolveRedirect(l.pathname).pathname));
  const destinations = new Set(links.filter(l => l.internal).map(l => resolveRedirect(l.pathname).pathname));
  const commercialLinks = ['/ar/services/paint-protection-dubai', '/ar/services/paint-protection-film', '/ar/services/ceramic-coating'].map(target => ({ target, present: destinations.has(target), contextualInArticle: articleDestinations.has(target), anchors: articleLinks.filter(l => resolveRedirect(l.pathname).pathname === target).map(l => l.anchor) }));
  check(routeMap.get(route)?.indexable === true, route, 'Arabic article canonical route indexable');
  check(metadata.titles.length === 1 && metadata.descriptions.length === 1 && metadata.h1s.length === 1 && metadata.canonicals.length === 1 && metadata.canonical === origin + route, route, 'Arabic article complete unique metadata and canonical counts');
  check(/[\u0600-\u06ff]/.test(metadata.title + metadata.description + metadata.h1), route, 'Arabic article metadata localized');
  check(metadata.robots.length > 0 && metadata.robots.every(r => !/\b(noindex|none|nofollow)\b/i.test(r || '')), route, 'Arabic article indexable robots');
  check(sitemap.split(`<loc>${origin + route}</loc>`).length - 1 === 1, route, 'Arabic article sitemap entry');
  const htmlTag = tags(html, 'html')[0] || '';
  const rtl = attr(htmlTag, 'dir') === 'rtl' && attr(htmlTag, 'lang') === 'ar';
  check(rtl, route, 'Arabic article RTL and language');
  const english = route.replace(/^\/ar/, '');
  const expectedAlternates = [{ language: 'en-AE', href: origin + english }, { language: 'ar-AE', href: origin + route }, { language: 'x-default', href: origin + english }];
  const sorted = value => value.map(v => `${v.language}:${v.href}`).sort();
  check(JSON.stringify(sorted(metadata.alternates)) === JSON.stringify(sorted(expectedAlternates)), route, 'Arabic article real language alternates');
  check(JSON.stringify(sorted(metadataIn(await htmlFor(english), english).alternates)) === JSON.stringify(sorted(expectedAlternates)), route, 'Arabic article reciprocal language alternates');
  check(nodes.some(n => hasType(n, 'BlogPosting') && n.url === origin + route && n.inLanguage === 'ar-AE'), route, 'Arabic BlogPosting identity and language');
  check(commercialLinks.every(link => link.present), route, 'Arabic article links to the three real commercial owners', commercialLinks);
  check(commercialLinks.every(link => link.contextualInArticle), route, 'Commercial owner links are in the Arabic article body', commercialLinks);
  for (const link of links.filter(l => l.internal)) {
    linksChecked++;
    const resolved = resolveRedirect(link.pathname);
    check(!resolved.cycle, route, 'Arabic article internal link has no redirect cycle', link.href);
    check(resolved.pathname !== noArabicPolishing, route, 'Arabic article avoids invented polishing route', link.href);
    if (resolved.external) continue;
    if (routeMap.has(resolved.pathname)) {
      if (link.hash) {
        const targetHtml = await htmlFor(resolved.pathname);
        check(tags(targetHtml, '[a-z][a-z0-9:-]*').some(t => attr(t, 'id') === link.hash || attr(t, 'name') === link.hash), route, 'Arabic article fragment exists', link.href);
      }
    } else {
      try { await access(path.join(dist, decodeURIComponent(link.pathname).replace(/^\//, ''))); }
      catch { errors.push({ route, rule: 'Arabic article internal link resolves', actual: link.href }); }
    }
  }
  const types = [...new Set(flatten(nodes).flatMap(n => Array.isArray(n['@type']) ? n['@type'] : n['@type'] ? [n['@type']] : []))];
  arabicArticles.push({ ...metadata, rtl, commercialLinks, jsonLdTypes: types, mainInternalLinks: links.filter(l => l.internal).length, htmlSha256: createHash('sha256').update(html).digest('hex') });
  arabicArticleCsv.push([route, metadata.title, metadata.description, metadata.h1, metadata.canonical, ...commercialLinks.map(l => l.present), rtl, types.join(', ')]);
}
for (const field of ['title', 'description']) {
  const values = records.filter(r => expectedServicePaths.includes(r.route)).map(r => r[field]?.toLowerCase());
  check(new Set(values).size === expectedServicePaths.length, 'cluster', `Unique service ${field}`);
}
const build = JSON.parse(await readFile(path.join(root, 'release-qa.local/build-results.json'), 'utf8'));
check(build.passed === true && build.steps.every(step => step.exitCode === 0), 'build', 'Recorded completed build passed every stage');
const summary = { checkedAt: new Date().toISOString(), sourceSha256: build.sourceSha256, buildPassed: build.passed, passed: errors.length === 0, scope: 'Local initial HTML; no live production or browser interactions', beforeRouteCount: beforeRoutes.length, routeCount: routes.length, beforeIndexableCount: beforeRoutes.filter(r => r.indexable).length, indexableCount: routes.filter(r => r.indexable).length, servicePagesChecked: expectedServicePaths.length, relatedBlogPagesChecked: records.length - expectedServicePaths.length, arabicArticlesChecked: arabicArticles.length, mainInternalLinksChecked: linksChecked, localImageAssetsChecked: imagePaths.size, externalImagesUnfetched: [...externalImages], intrinsicDimensionAdvisories, addedRoutes, removedRoutes, indexabilityChanged, errors, warnings, pages: records, arabicArticles, metadataChangedFields: metadataDiff.slice(1).filter(r => r.at(-1)).length, addedMainLinks: linkDiff.slice(1).filter(r => r[0] === 'Added').length, removedMainLinks: linkDiff.slice(1).filter(r => r[0] === 'Removed').length };
await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'paint-route-qa.json'), JSON.stringify(summary, null, 2) + '\n');
await writeFile(path.join(output, 'metadata-before-after.csv'), csv(metadataDiff));
await writeFile(path.join(output, 'main-link-diff.csv'), csv(linkDiff));
await writeFile(path.join(output, 'arabic-article-final-metadata.csv'), csv(arabicArticleCsv));
console.log(JSON.stringify({ passed: summary.passed, routeCount: summary.routeCount, indexableCount: summary.indexableCount, servicePagesChecked: summary.servicePagesChecked, mainInternalLinksChecked: summary.mainInternalLinksChecked, localImageAssetsChecked: summary.localImageAssetsChecked, metadataChangedFields: summary.metadataChangedFields, addedMainLinks: summary.addedMainLinks, removedMainLinks: summary.removedMainLinks, errors, warnings }, null, 2));
if (!summary.passed) process.exitCode = 1;
