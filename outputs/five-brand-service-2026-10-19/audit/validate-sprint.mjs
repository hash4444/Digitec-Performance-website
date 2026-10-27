import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

// Read-only application/build audit. Writes evidence only in this sprint folder.
// Run from the repository root after npm run build.
const root = process.cwd();
const out = path.join(root, 'outputs/five-brand-service-2026-10-19/audit');
const baseDir = path.join(root, 'outputs/five-brand-service-2026-10-19/baseline');
const origin = 'https://digitecme.com';
await mkdir(out, { recursive: true });
const slugs = ['rolls-royce', 'lamborghini', 'volkswagen', 'mercedes-benz', 'bmw'];
const arabicNames = { 'rolls-royce': 'رولز رويس', lamborghini: 'لامبورغيني', volkswagen: 'فولكس فاجن', 'mercedes-benz': 'مرسيدس', bmw: 'بي إم دبليو' };
const routes = slugs.flatMap(slug => [`/brands/${slug}-service-dubai`, `/ar/brands/${slug}-service-dubai`]);
const allowedSourceChanges = new Set([
  'src/data/brands.ts',
  'src/data/priorityBrandSeo.ts',
  'src/data/brandServiceSprint.ts',
  'src/components/BrandServiceScope.tsx',
  'src/i18n/ar-brands.ts',
  'src/pages/BrandPage.tsx',
  'scripts/test-master-seo-browser.mjs',
]);
const checks = [];
const check = (name, pass, detail, route) => checks.push({ name, pass: Boolean(pass), ...(route ? { route } : {}), ...(detail === undefined ? {} : { detail }) });
const hash = data => createHash('sha256').update(data).digest('hex');
const decode = value => String(value)
  .replace(/&#x([a-f\d]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const normalizedText = text => decode(text).replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, '').replace(/\s+/g, ' ').trim();
const plain = html => normalizedText(html.replace(/<[^>]*>/g, ' '));
const attr = (tag, name) => decode(tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] || '');
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => match[0]);
const links = html => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(match => ({ href: attr(match[1], 'href'), text: plain(match[2]) })).filter(link => link.href);
const headingList = html => [...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(match => ({ level: match[1], text: plain(match[2]) }));
const normalizePath = pathname => pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
const pageFile = route => path.join(root, 'dist', route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`);
const baseline = JSON.parse(await readFile(path.join(baseDir, 'rendered.json'), 'utf8'));
const beforeMap = new Map(baseline.map(record => [record.route, record]));
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const publicRoutes = getPublicRoutes();
const routeMap = new Map(publicRoutes.map(route => [route.path, route]));
const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(match => decode(match[1])));
const sitemapPaths = new Set([...sitemapUrls].map(url => normalizePath(new URL(url).pathname)));
const records = [];
const htmlCache = new Map();
async function readPage(route) {
  if (!htmlCache.has(route)) htmlCache.set(route, await readFile(pageFile(route), 'utf8'));
  return htmlCache.get(route);
}
function parse(html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '';
  const visibleHtml = body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  const meta = name => tags(head, 'meta').filter(tag => attr(tag, 'name').toLowerCase() === name).map(tag => attr(tag, 'content'));
  const canonical = tags(head, 'link').filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href'));
  const alternates = tags(head, 'link').filter(tag => attr(tag, 'rel') === 'alternate' && attr(tag, 'hreflang')).map(tag => ({ language: attr(tag, 'hreflang'), href: attr(tag, 'href') }));
  const documents = [], schemaErrors = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attr(match[1], 'type') !== 'application/ld+json') continue;
    try { documents.push(JSON.parse(match[2])); } catch (error) { schemaErrors.push(String(error)); }
  }
  const nodes = documents.flatMap(document => document['@graph'] || (Array.isArray(document) ? document : [document]));
  return { title: [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(match => plain(match[1])), description: meta('description'), robots: meta('robots'), canonicals: canonical, alternates, headings: headingList(visibleHtml), links: links(visibleHtml), nodes, schemaErrors, visibleHtml, text: plain(visibleHtml), language: attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang') };
}

const indexSource = await readFile(path.join(root, 'index.html'), 'utf8');
const sourceGlobal = parse(indexSource).nodes;
const initialStatus = await readFile(path.join(baseDir, 'git-status.txt'), 'utf8');
let initialIndex;
try {
  // capture.mjs hashes source directories, not index.html. Initial git status
  // proves this tracked file was clean, so HEAD supplies its baseline bytes.
  if (/^[ MARCUD?!]{2}\s+index\.html\s*$/m.test(initialStatus)) throw new Error('Initial index.html was modified; no trustworthy baseline snapshot exists.');
  initialIndex = execFileSync('git', ['show', 'HEAD:index.html'], { cwd: root, encoding: 'utf8' });
  const normalizedInitial = initialIndex.replace(/\r\n/g, '\n');
  const normalizedFinal = indexSource.replace(/\r\n/g, '\n');
  check('Global index.html content unchanged from clean initial state', hash(normalizedInitial) === hash(normalizedFinal), { initialNormalizedSha256: hash(normalizedInitial), finalNormalizedSha256: hash(normalizedFinal), lineEndingsNormalized: true, baselineMethod: 'HEAD:index.html; initial git status confirms clean file; Git checkout line endings normalized' });
  check('Established global entity graph unchanged from initial state', JSON.stringify(parse(initialIndex).nodes) === JSON.stringify(sourceGlobal), undefined);
} catch (error) { check('Global index.html baseline available', false, String(error)); }
const sharedIds = ['#business', '#organization', '#website', '#logo', '#service-catalog'].map(fragment => `${origin}/${fragment}`);
const globalById = new Map(sourceGlobal.map(node => [node['@id'], node]));
for (const id of sharedIds) check('Shared global identity exists in source graph', globalById.has(id), id);

for (const route of routes) {
  const before = beforeMap.get(route);
  try {
    const html = await readPage(route);
    const data = parse(html);
    const isArabic = route.startsWith('/ar/');
    const englishPath = route.replace(/^\/ar(?=\/)/, '');
    const slug = slugs.find(candidate => englishPath === `/brands/${candidate}-service-dubai`);
    const h1 = data.headings.filter(heading => heading.level === 'h1').map(heading => heading.text);
    const url = `${origin}${route}`;
    check('One nonempty title', data.title.length === 1 && data.title[0].length > 0, data.title, route);
    check('One nonempty meta description', data.description.length === 1 && data.description[0].length > 0, data.description, route);
    check('One relevant H1', h1.length === 1 && (isArabic ? h1[0].includes(arabicNames[slug]) : h1[0].toLowerCase().includes(slug.replaceAll('-', ' ')) || h1[0].toLowerCase().includes(slug)), h1, route);
    check('Title and H1 cover service/repair in Dubai', isArabic ? [data.title[0], h1[0]].every(text => /صيانة/.test(text || '') && /إصلاح/.test(text || '') && /دبي/.test(text || '')) : [data.title[0], h1[0]].every(text => /service/i.test(text || '') && /repair/i.test(text || '') && /dubai/i.test(text || '')), undefined, route);
    check('One self canonical', data.canonicals.length === 1 && data.canonicals[0] === url, data.canonicals, route);
    check('Indexable robots and route manifest', data.robots.length === 1 && /(?:^|,)\s*index(?:,|$)/i.test(data.robots[0]) && !/noindex/i.test(data.robots.join(',')) && routeMap.get(route)?.indexable === true, { robots: data.robots, route: routeMap.get(route) }, route);
    check('Included in generated XML sitemap', sitemapUrls.has(url), undefined, route);
    check('Correct HTML language', data.language === (isArabic ? 'ar' : 'en'), data.language, route);
    const expectedAlternates = [{ language: 'en-AE', href: `${origin}${englishPath}` }, { language: 'ar-AE', href: `${origin}/ar${englishPath}` }, { language: 'x-default', href: `${origin}${englishPath}` }];
    check('Exact reciprocal-language alternate set', data.alternates.length === 3 && expectedAlternates.every(expected => data.alternates.some(actual => actual.language === expected.language && actual.href === expected.href)), data.alternates, route);
    check('JSON-LD parses', data.schemaErrors.length === 0, data.schemaErrors, route);
    for (const id of sharedIds) {
      const matches = data.nodes.filter(node => node['@id'] === id);
      check('Shared entity unique and unchanged', matches.length === 1 && JSON.stringify(matches[0]) === JSON.stringify(globalById.get(id)), { id, occurrences: matches.length }, route);
    }
    const serviceNodes = data.nodes.filter(node => node['@id'] === `${url}#service`);
    const service = serviceNodes[0];
    const webPage = data.nodes.find(node => node['@id'] === `${url}#webpage`);
    check('One route Service uses shared business', serviceNodes.length === 1 && service?.['@type'] === 'Service' && service?.provider?.['@id'] === `${origin}/#business`, undefined, route);
    check('WebPage retains shared graph references', webPage?.isPartOf?.['@id'] === `${origin}/#website` && webPage?.publisher?.['@id'] === `${origin}/#organization` && webPage?.about?.['@id'] === `${origin}/#business`, undefined, route);
    const expectedBrandId = `${origin}/#brand-${slug}`;
    check('Route Brand uses source brand identity', service?.brand?.['@id'] === expectedBrandId && data.nodes.some(node => node['@id'] === expectedBrandId && node['@type'] === 'Brand') && !data.nodes.some(node => node['@id'] === `${origin}/#brand-`), { expectedBrandId, actual: service?.brand }, route);
    const faqs = data.nodes.filter(node => node['@type'] === 'FAQPage').flatMap(node => node.mainEntity || []);
    const faqChecks = faqs.map(question => ({ question: question.name, questionInHtml: data.text.includes(normalizedText(question.name)), answerInHtml: data.text.includes(normalizedText(question.acceptedAnswer?.text || '')) }));
    check('FAQ schema has crawlable matching Q&A text', faqChecks.length > 0 && faqChecks.every(faq => faq.questionInHtml && faq.answerInHtml), faqChecks.filter(faq => !faq.questionInHtml || !faq.answerInHtml), route);
    const scopeMatch = data.visibleHtml.match(/<section\b[^>]*aria-labelledby="brand-service-scope-title"[^>]*>([\s\S]*?)<\/section>/i);
    const requiresScope = isArabic || slug === 'volkswagen';
    const scopeHtml = scopeMatch?.[1] || '';
    const scopeTitles = headingList(scopeHtml).filter(heading => heading.level === 'h3').map(heading => heading.text);
    const offers = (service?.hasOfferCatalog?.itemListElement || []).map(offer => offer.itemOffered?.name);
    if (requiresScope) {
      const expectedTitles = isArabic ? ['الصيانة الدورية وتغيير الزيت', 'التشخيص ورسائل التحذير', 'فحص الأعطال الميكانيكية', 'الكهرباء والبطارية'] : ['Volkswagen routine maintenance', 'Diagnostics and warning lights', 'Mechanical repair assessment', 'Electrical and battery concerns'];
      check('Four visible scope cards exactly match four schema offers', scopeTitles.length === 4 && JSON.stringify(scopeTitles) === JSON.stringify(expectedTitles) && JSON.stringify(offers) === JSON.stringify(expectedTitles), { scopeTitles, offers }, route);
    } else check('Existing bespoke English service sections retained', !scopeMatch && offers.length >= 6, { offers: offers.length }, route);
    check('Booking form and draft handoff are explicit', /id="brand-booking-form"/.test(data.visibleHtml) && (isArabic ? data.text.includes('يجهز النموذج مسودة في واتساب') && data.text.includes('فتح المسودة لا يؤكد الحجز') && data.text.includes('المتابعة إلى واتساب') : data.text.includes('The form prepares a WhatsApp draft.') && data.text.includes('Opening the draft does not confirm an appointment.') && data.text.includes('Continue to WhatsApp')), undefined, route);
    check('Phone and WhatsApp next steps present', data.links.some(link => link.href === 'tel:+97143402223') && data.links.some(link => link.href.startsWith('https://wa.me/97143402223?text=')), undefined, route);
    const internal = [];
    const beforeHrefs = new Set((before?.body?.links || []).map(link => link.href));
    const scopeHrefs = new Set(links(scopeHtml).map(link => link.href));
    for (const link of data.links) {
      let target;
      try { target = new URL(link.href, url); } catch { continue; }
      if (target.origin !== origin || !/^https?:$/.test(target.protocol)) continue;
      const targetPath = normalizePath(target.pathname);
      const isAsset = /\.[a-z\d]{2,6}$/i.test(targetPath) && !/\.html?$/i.test(targetPath);
      let exists = false, indexable = false, canonical = '', targetNoindex = false, assetExists = null;
      if (isAsset) {
        try { await access(path.join(root, 'dist', targetPath.replace(/^\//, ''))); assetExists = true; } catch { assetExists = false; }
        exists = assetExists;
      } else {
        exists = routeMap.has(targetPath);
        indexable = routeMap.get(targetPath)?.indexable === true;
        if (exists) {
          try { const parsedTarget = parse(await readPage(targetPath)); canonical = parsedTarget.canonicals[0] || ''; targetNoindex = parsedTarget.robots.some(value => /noindex/i.test(value)); } catch { exists = false; }
        }
      }
      const isNewHref = !beforeHrefs.has(link.href);
      const isScopeLink = scopeHrefs.has(link.href);
      let fragmentExists = true;
      if (target.hash && exists && !isAsset) {
        const targetHtml = await readPage(targetPath);
        const fragment = decodeURIComponent(target.hash.slice(1));
        fragmentExists = [...targetHtml.matchAll(/\bid=["']([^"']+)["']/g)].some(match => decode(match[1]) === fragment);
      }
      const directIndexable = exists && indexable && !targetNoindex && canonical === `${origin}${targetPath}` && fragmentExists;
      const row = { ...link, path: targetPath, hash: target.hash, exists, indexable, targetNoindex, canonical, fragmentExists, isAsset, assetExists, isNewHref, isScopeLink, directIndexable };
      internal.push(row);
      if (isNewHref || isScopeLink) check('New/internal scope link is directly indexable and valid', isAsset ? assetExists : directIndexable, row, route);
    }
    const beforeSeo = before?.seo || {};
    records.push({ route, htmlFile: path.relative(root, pageFile(route)).replaceAll('\\', '/'), htmlSha256: hash(html), before: { title: beforeSeo.title, description: beforeSeo.description, canonical: beforeSeo.canonical, noindex: beforeSeo.noindex, h1: (before?.body?.headings || []).filter(heading => heading.level === 'h1').map(heading => heading.text) }, after: { title: data.title[0], description: data.description[0], canonical: data.canonicals[0], robots: data.robots[0], h1, language: data.language, alternates: data.alternates }, metadataChanged: { title: beforeSeo.title !== data.title[0], description: beforeSeo.description !== data.description[0], h1: JSON.stringify((before?.body?.headings || []).filter(heading => heading.level === 'h1').map(heading => heading.text)) !== JSON.stringify(h1) }, schema: { types: [...new Set(data.nodes.flatMap(node => [].concat(node['@type'] || [])))], sharedEntityIds: sharedIds, brandId: service?.brand?.['@id'], serviceId: service?.['@id'], offerNames: offers, faq: faqChecks, jsonLdErrors: data.schemaErrors }, scope: { required: requiresScope, titles: scopeTitles, links: links(scopeHtml) }, internalLinks: internal });
  } catch (error) { check('Target built HTML readable/auditable', false, String(error), route); records.push({ route, error: String(error) }); }
}
const finalMap = new Map(records.map(record => [record.route, record]));
for (const record of records.filter(record => !record.error)) {
  for (const alternate of record.after.alternates.filter(alt => alt.language !== 'x-default')) {
    const partner = finalMap.get(new URL(alternate.href).pathname);
    check('Hreflang partner links back', partner?.after?.alternates?.some(alt => alt.href === `${origin}${record.route}`), alternate, record.route);
  }
}

const baselineManifest = JSON.parse(await readFile(path.join(baseDir, 'source-manifest.json'), 'utf8'));
const finalManifest = [];
async function walk(directory) {
  for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
    const file = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await walk(file);
    else finalManifest.push({ file, sha256: hash(await readFile(path.join(root, file))) });
  }
}
for (const directory of ['src', 'public', 'scripts', 'cloudflare', 'supabase']) await walk(directory);
const beforeHashes = new Map(baselineManifest.map(record => [record.file, record.sha256]));
const afterHashes = new Map(finalManifest.map(record => [record.file, record.sha256]));
const fileChanges = [...new Set([...beforeHashes.keys(), ...afterHashes.keys()])].filter(file => beforeHashes.get(file) !== afterHashes.get(file)).map(file => ({ file, change: !beforeHashes.has(file) ? 'added' : !afterHashes.has(file) ? 'deleted' : 'modified', beforeSha256: beforeHashes.get(file) || null, afterSha256: afterHashes.get(file) || null, allowed: allowedSourceChanges.has(file) }));
check('Source changes stay within explicit seven-file application and test allowlist', fileChanges.every(change => change.allowed), fileChanges);
const protectedFile = file => /(?:^|\/)(?:supabase|cloudflare)\//i.test(file) || /(?:ppf|paint-protection|tuning|backend)/i.test(file) || file === 'src/lib/schema.ts';
const protectedFiles = baselineManifest.filter(record => protectedFile(record.file)).map(record => ({ file: record.file, sha256: record.sha256, finalSha256: afterHashes.get(record.file) || null, unchanged: afterHashes.get(record.file) === record.sha256 }));
const protectedNewFiles = fileChanges.filter(change => change.change === 'added' && protectedFile(change.file));
check('PPF/tuning/backend/router/schema source hashes preserved', protectedFiles.every(record => record.unchanged) && protectedNewFiles.length === 0, { checkedFiles: protectedFiles.length, mismatches: protectedFiles.filter(record => !record.unchanged), protectedNewFiles });
const internalLinks = records.flatMap(record => (record.internalLinks || []).map(link => ({ from: record.route, ...link })));
const inheritedNoindexLinks = internalLinks.filter(link => !link.isAsset && (!link.indexable || link.targetNoindex) && !link.isNewHref && !link.isScopeLink);
const inheritedUnresolvedLinks = internalLinks.filter(link => !link.isAsset && !link.exists && !link.isNewHref && !link.isScopeLink);
const newLinks = internalLinks.filter(link => link.isNewHref || link.isScopeLink);
const csvCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const metadataColumns = ['route', 'titleBefore', 'titleAfter', 'descriptionBefore', 'descriptionAfter', 'h1Before', 'h1After', 'canonicalBefore', 'canonicalAfter', 'titleChanged', 'descriptionChanged', 'h1Changed'];
const metadataCsv = [metadataColumns, ...records.filter(record => !record.error).map(record => [record.route, record.before.title, record.after.title, record.before.description, record.after.description, record.before.h1.join(' | '), record.after.h1.join(' | '), record.before.canonical, record.after.canonical, record.metadataChanged.title, record.metadataChanged.description, record.metadataChanged.h1])].map(row => row.map(csvCell).join(',')).join('\n') + '\n';
const failures = checks.filter(item => !item.pass);
const report = { checkedAt: new Date().toISOString(), result: failures.length ? 'FAIL' : 'PASS', scope: 'Ten generated target hubs; static HTML and source safeguards. Does not prove live deployment, mobile rendering, delivered messages or confirmed enquiries.', counts: { routes: records.length, checks: checks.length, failed: failures.length, sourceFilesHashed: finalManifest.length, protectedFilesHashed: protectedFiles.length, internalLinkOccurrences: internalLinks.length, newOrScopeLinkOccurrences: newLinks.length, inheritedNoindexLinkOccurrences: inheritedNoindexLinks.length, inheritedUnresolvedLinkOccurrences: inheritedUnresolvedLinks.length }, failures, checks, records, fileChanges, protectedFiles, allowedSourceChanges: [...allowedSourceChanges], inheritedNoindexLinks, inheritedUnresolvedLinks };
await writeFile(path.join(out, 'final-source-manifest.json'), JSON.stringify(finalManifest, null, 2));
await writeFile(path.join(out, 'metadata-before-after.csv'), metadataCsv);
await writeFile(path.join(out, 'metadata-before-after.json'), JSON.stringify(records.map(({ route, before, after, metadataChanged, error }) => ({ route, before, after, metadataChanged, ...(error ? { error } : {}) })), null, 2));
await writeFile(path.join(out, 'internal-link-schema-report.json'), JSON.stringify({ counts: report.counts, routes: records.map(({ route, schema, scope, internalLinks, error }) => ({ route, schema, scope, internalLinks, ...(error ? { error } : {}) })), inheritedNoindexLinks, inheritedUnresolvedLinks }, null, 2));
await writeFile(path.join(out, 'static-sprint-validation.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ result: report.result, counts: report.counts, failures }, null, 2));
if (failures.length) process.exitCode = 1;
