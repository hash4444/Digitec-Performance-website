import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { routes } from './repair-routes.mjs';

// Run only after final production build and restoration of unrelated generated
// evidence. Read-only outside this sprint's qa directory; no production access.
const root = process.cwd();
const out = path.join(root, 'outputs/repair-service-2026-10-19/qa');
const baselineDir = path.join(root, 'outputs/repair-service-2026-10-19/baseline');
const origin = 'https://digitecme.com';
const sha = value => createHash('sha256').update(value).digest('hex');
const selected = routes.filter(route => !route.preservedOwner);
const allowlist = [
  'src/pages/BrandServicePage.tsx',
  'src/data/repairServiceContent.ts',
  'src/data/repairServiceArabic.ts',
  'src/components/RepairEnquiryPanel.tsx',
];
await mkdir(out, { recursive: true });
const report = {
  checkedAt: new Date().toISOString(), passed: false, selectedRoutes: selected.length,
  ownerChecks: [], protectedRenderedChecks: [], sourcePreservation: {},
  sharedGraph: {}, metadata: [], internalLinks: [], schema: [], failures: [],
};
const decode = value => String(value ?? '')
  .replace(/&#x([\da-f]+);/gi, (_, c) => String.fromCodePoint(parseInt(c, 16)))
  .replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(Number(c)))
  .replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&nbsp;', ' ')
  .replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
const clean = value => decode(String(value ?? '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? decode(match[1] ?? match[2]) : undefined;
};
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(match => match[0]);
const meta = (html, name) => tags(html, 'meta').filter(tag => attribute(tag, 'name') === name).map(tag => attribute(tag, 'content'));
const allLinks = html => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(match => ({
  href: attribute(match[1], 'href'), label: clean(match[2]), placement: attribute(match[1], 'data-cta-placement'), markup: match[0],
})).filter(link => link.href);
const scripts = html => [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(match => attribute(match[1], 'type') === 'application/ld+json')
  .map(match => ({ raw: match[2].trim(), route: attribute(match[1], 'data-route-jsonld') === 'true', value: JSON.parse(match[2]) }));
const graph = html => scripts(html).flatMap(script => script.value['@graph'] ?? [script.value]);
const typed = (nodes, type) => nodes.filter(node => [].concat(node['@type']).includes(type));
const distFile = route => path.join(root, 'dist', route.replace(/^\//, ''), 'index.html');
const baselineHtmlFile = route => path.join(baselineDir, 'html', `${route.slice(1).replaceAll('/', '__')}.html`);
const safe = async (label, operation) => {
  try { await operation(); }
  catch (error) { report.failures.push({ at: label, message: error.message }); console.error(`FAIL ${label}: ${error.message}`); }
};
const baseline = JSON.parse(await readFile(path.join(baselineDir, 'rendered.json'), 'utf8'));
const baselineByRoute = new Map(baseline.map(record => [record.route, record]));
const baselineSources = JSON.parse(await readFile(path.join(baselineDir, 'source-manifest.json'), 'utf8'));
const { renderRoute, getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routeManifest = new Map(getPublicRoutes().map(route => [route.path, route]));
const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
const baselineIndex = await readFile(path.join(baselineDir, 'source/index.html'), 'utf8');
const baselineShared = scripts(baselineIndex).filter(script => !script.route);
assert.equal(baselineShared.length, 1, 'One shared factual graph in baseline index');

const destinationCache = new Map();
async function destination(href, from) {
  const url = new URL(href, origin + from);
  assert.equal(url.origin, origin, 'Related repair link is internal');
  const route = url.pathname;
  if (!destinationCache.has(route)) {
    const html = await readFile(distFile(route), 'utf8');
    const canonicals = tags(html, 'link').filter(tag => attribute(tag, 'rel') === 'canonical').map(tag => attribute(tag, 'href'));
    const robots = meta(html, 'robots');
    destinationCache.set(route, { route, canonical: canonicals[0], canonicalCount: canonicals.length, robots: robots[0], inManifest: routeManifest.has(route), indexableInManifest: routeManifest.get(route)?.indexable !== false, inSitemap: sitemap.includes(`<loc>${origin}${route}</loc>`) });
  }
  const record = destinationCache.get(route);
  assert.equal(record.canonicalCount, 1);
  assert.equal(record.canonical, origin + route, `${route}: direct self-canonical target`);
  assert.ok(record.inManifest && record.indexableInManifest && record.inSitemap, `${route}: published indexable route`);
  assert.doesNotMatch(record.robots ?? '', /noindex/i);
  return record;
}

for (const spec of routes) await safe(`Repair owner ${spec.route}`, async () => {
  const before = baselineByRoute.get(spec.route);
  assert.ok(before, 'Owner exists in baseline');
  const html = await readFile(distFile(spec.route), 'utf8');
  const body = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  const bodyText = clean(body);
  const title = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(match => clean(match[1]));
  const description = meta(html, 'description');
  const canonicals = tags(html, 'link').filter(tag => attribute(tag, 'rel') === 'canonical').map(tag => attribute(tag, 'href'));
  const h1 = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => clean(match[1]));
  const beforeHtml = await readFile(baselineHtmlFile(spec.route), 'utf8');
  const beforeH1 = [...beforeHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => clean(match[1]))[0];
  assert.equal(title.length, 1); assert.ok(title[0].length > 15);
  assert.equal(description.length, 1); assert.ok(description[0].length > 35);
  assert.equal(h1.length, 1); assert.ok(h1[0].length > 12);
  assert.equal(canonicals.length, 1); assert.equal(canonicals[0], origin + spec.route);
  assert.doesNotMatch(meta(html, 'robots').join(','), /noindex/i);
  assert.ok(routeManifest.has(spec.route) && routeManifest.get(spec.route).indexable !== false);
  assert.ok(sitemap.includes(`<loc>${origin}${spec.route}</loc>`));
  const alternates = tags(html, 'link').filter(tag => attribute(tag, 'rel') === 'alternate').map(tag => ({ language: attribute(tag, 'hreflang'), href: attribute(tag, 'href') }));
  const enRoute = spec.route.replace(/^\/ar/, '');
  for (const [language, expected] of [['en-AE', origin + enRoute], ['ar-AE', `${origin}/ar${enRoute}`], ['x-default', origin + enRoute]]) {
    const matches = alternates.filter(alternate => alternate.language === language);
    assert.equal(matches.length, 1); assert.equal(matches[0].href, expected);
  }
  if (spec.language === 'ar') {
    assert.match(h1[0], /[\u0600-\u06ff]/);
    const htmlTag = tags(html, 'html')[0];
    assert.equal(attribute(htmlTag, 'lang'), 'ar'); assert.equal(attribute(htmlTag, 'dir'), 'rtl');
  }
  const schema = graph(html);
  const service = typed(schema, 'Service');
  const faq = typed(schema, 'FAQPage');
  const breadcrumb = typed(schema, 'BreadcrumbList');
  const ids = schema.map(node => node['@id']).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, 'No duplicate entity IDs');
  assert.equal(service.length, 1); assert.equal(service[0]['@id'], `${origin}${spec.route}#service`);
  assert.equal(service[0].provider['@id'], `${origin}/#business`);
  assert.equal(service[0].description, description[0], 'Service schema description matches page metadata');
  assert.equal(breadcrumb.length, 1); assert.equal(breadcrumb[0].itemListElement.at(-1).item, origin + spec.route);
  assert.equal(faq.length, 1); assert.ok(faq[0].mainEntity.length >= 3);
  for (const item of faq[0].mainEntity) {
    assert.ok(bodyText.includes(clean(item.name)), 'FAQ question in crawlable body');
    assert.ok(bodyText.includes(clean(item.acceptedAnswer.text)), 'FAQ answer in crawlable body');
  }
  const shared = scripts(html).filter(script => !script.route);
  assert.equal(shared.length, 1);
  assert.equal(shared[0].raw, baselineShared[0].raw, 'Raw shared entity graph unchanged');
  const links = allLinks(html);
  const hubOwnerHtml = await readFile(distFile(spec.hub), 'utf8');
  const hubLinks = allLinks(hubOwnerHtml).filter(link => new URL(link.href, origin + spec.hub).pathname === spec.route);
  assert.ok(hubLinks.length > 0, 'Existing brand hub links directly to owner');
  const beforeLinks = allLinks(beforeHtml).map(link => ({ href: link.href, label: link.label, placement: link.placement }));
  const knownBefore = new Set(beforeLinks.map(link => `${link.href}\n${link.label}\n${link.placement}`));
  const newLinks = links.filter(link => !knownBefore.has(`${link.href}\n${link.label}\n${link.placement}`)).map(({ markup, ...link }) => link);
  const panelMatch = html.match(/<section\b[^>]*data-repair-enquiry\b[^>]*>([\s\S]*?)<\/section>/i);
  let panelLinks = [];
  if (!spec.preservedOwner) {
    assert.ok(panelMatch, 'Repair quotation panel is prerendered');
    assert.equal((html.match(/data-repair-enquiry(?:[\s=>])/g) ?? []).length, 1);
    const panel = panelMatch[0];
    const note = panel.match(/<p\b[^>]*data-repair-draft-note\b[^>]*>([\s\S]*?)<\/p>/i);
    assert.ok(note, 'Draft delivery and appointment explanation exists');
    assert.match(clean(note[1]), spec.language === 'ar' ? /إرسال.*واتساب/ : /press Send in WhatsApp/);
    assert.match(clean(note[1]), spec.language === 'ar' ? /لا يؤكد.*حجز موعد/ : /does not confirm receipt or an appointment/);
    const heroWhatsApp = links.filter(link => link.placement === 'hero' && link.href.startsWith('https://wa.me/'));
    const quoteWhatsApp = links.filter(link => link.placement === 'repair_quote' && link.href.startsWith('https://wa.me/'));
    assert.equal(heroWhatsApp.length, 1); assert.equal(quoteWhatsApp.length, 1);
    assert.equal(heroWhatsApp[0].href, quoteWhatsApp[0].href, 'Repair context survives both CTA placements');
    const draft = new URL(quoteWhatsApp[0].href);
    assert.equal(draft.origin + draft.pathname, 'https://wa.me/97143402223');
    const required = spec.language === 'ar'
      ? ['الطراز:', 'سنة الصنع:', 'المسافة:', 'سجل الصيانة', 'التحذير', 'متى تظهر:', 'الموعد المفضل:']
      : ['Model:', 'Year:', 'Mileage:', 'Service history', 'Warning or symptoms:', 'When it occurs:', 'Preferred appointment time:'];
    for (const field of required) assert.ok(draft.searchParams.get('text').includes(field), `Repair draft requests ${field}`);
    const panelLocal = allLinks(panel).filter(link => link.href.startsWith('/'));
    assert.equal(panelLocal.length, 2, 'Two direct repair destinations');
    for (const link of panelLocal) {
      if (spec.language === 'ar') assert.ok(link.href.startsWith('/ar/'), 'Arabic related path localized');
      panelLinks.push({ href: link.href, label: link.label, target: await destination(link.href, spec.route) });
    }
    if (spec.language === 'ar') {
      const phones = links.filter(link => ['hero', 'repair_quote'].includes(link.placement) && link.href === 'tel:+97143402223');
      assert.equal(phones.length, 2);
      assert.ok(phones.every(link => /<bdi\b[^>]*dir="ltr"/.test(link.markup)), 'Arabic phone digits isolated in both placements');
    }
    const process = html.match(/<section\b[^>]*id="service-process"[^>]*>([\s\S]*?)<\/section>/i);
    assert.ok(process && clean(process[1]).length > 200, 'Crawlable diagnosis and repair process');
    report.ownerChecks.push({ route: spec.route, language: spec.language, passed: true, selfCanonical: true, indexable: true, h1: h1[0], repairPanel: true, draftFields: required.length, hubLinks: hubLinks.length });
  } else assert.ok(!panelMatch, 'Unselected diagnostics owner remains outside implementation');
  report.metadata.push({
    route: spec.route, language: spec.language, selected: !spec.preservedOwner,
    titleBefore: before.seo.title, titleAfter: title[0], titleChanged: before.seo.title !== title[0],
    descriptionBefore: before.seo.description, descriptionAfter: description[0], descriptionChanged: before.seo.description !== description[0],
    h1Before: beforeH1, h1After: h1[0], h1Changed: beforeH1 !== h1[0],
    canonicalBefore: before.seo.canonical, canonicalAfter: canonicals[0],
    noindexBefore: before.seo.noindex, noindexAfter: false,
    faqBefore: typed(before.seo.jsonLd?.['@graph'] ?? [], 'FAQPage')[0]?.mainEntity?.length ?? 0,
    faqAfter: faq[0].mainEntity.length,
  });
  report.internalLinks.push({ route: spec.route, selected: !spec.preservedOwner, hub: spec.hub, existingHubInlinks: hubLinks.length, newLinks, repairPanelLinks: panelLinks });
  report.schema.push({ route: spec.route, selected: !spec.preservedOwner, provider: service[0].provider['@id'], entityIdsUnique: true, serviceCount: service.length, breadcrumbCount: breadcrumb.length, faqCount: faq[0].mainEntity.length, faqBodyParity: true, sharedEntityGraphRawUnchanged: true });
});

for (const before of baseline.filter(record => !record.selected)) await safe(`Protected SSR ${before.route}`, async () => {
  const rendered = await renderRoute(before.route);
  const after = sha(rendered.html);
  assert.equal(after, before.htmlSha256, 'Protected SSR HTML remains byte-for-byte identical');
  assert.deepEqual(JSON.parse(JSON.stringify(rendered.seo)), before.seo, 'Protected serialized SEO object unchanged');
  report.protectedRenderedChecks.push({ route: before.route, sha256: after, seoUnchanged: true, passed: true });
});

await safe('Source and existing uncommitted work preservation', async () => {
  const current = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = `${dir}/${entry.name}`;
      if (entry.isDirectory()) await walk(file);
      else current.push({ file, sha256: sha(await readFile(file)) });
    }
  }
  for (const dir of ['src', 'scripts', 'public', 'cloudflare', 'supabase']) await walk(dir);
  const beforeMap = new Map(baselineSources.map(record => [record.file, record.sha256]));
  const afterMap = new Map(current.map(record => [record.file, record.sha256]));
  const changed = baselineSources.filter(record => afterMap.get(record.file) !== record.sha256).map(record => ({ file: record.file, before: record.sha256, after: afterMap.get(record.file) ?? null }));
  const added = current.filter(record => !beforeMap.has(record.file)).map(record => record.file);
  const forbidden = [...changed.map(record => record.file), ...added].filter(file => !allowlist.includes(file));
  report.sourcePreservation = { baselineFiles: baselineSources.length, currentFiles: current.length, preservedBaselineFiles: baselineSources.length - changed.length, changed, added, allowlist, forbidden, protectedPriorUncommittedSourceBytes: forbidden.length === 0 };
  assert.deepEqual(forbidden, [], 'Only four explicitly authorized repair application source files may differ');
  assert.deepEqual([...changed.map(record => record.file), ...added].sort(), [...allowlist].sort(), 'Exactly the four intended app files differ from the sprint baseline');
  for (const file of ['index.html', 'package.json']) {
    const before = await readFile(path.join(baselineDir, 'source', file));
    assert.ok(before.equals(await readFile(file)), `${file} remains byte-identical`);
  }
});

report.sharedGraph = { rawBaselineSha256: sha(baselineShared[0].raw), preservedOnRepairPages: report.schema.filter(item => item.sharedEntityGraphRawUnchanged).length };
await safe('Complete focused validation coverage', async () => {
  assert.equal(report.ownerChecks.length, 20);
  assert.equal(report.metadata.length, 22);
  assert.equal(report.schema.length, 22);
  assert.equal(report.protectedRenderedChecks.length, 12, '10 five-brand hub locales and two preserved Lamborghini diagnostics locales');
});
report.passed = report.failures.length === 0;
report.finishedAt = new Date().toISOString();
const csvColumns = ['route', 'language', 'selected', 'titleBefore', 'titleAfter', 'titleChanged', 'descriptionBefore', 'descriptionAfter', 'descriptionChanged', 'h1Before', 'h1After', 'h1Changed', 'canonicalBefore', 'canonicalAfter', 'noindexBefore', 'noindexAfter', 'faqBefore', 'faqAfter'];
const csvCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
await writeFile(path.join(out, 'before-after-seo.csv'), '\uFEFF' + [csvColumns.join(','), ...report.metadata.map(record => csvColumns.map(column => csvCell(record[column])).join(','))].join('\r\n') + '\r\n');
await writeFile(path.join(out, 'internal-link-and-schema.json'), JSON.stringify({ checkedAt: report.checkedAt, internalLinks: report.internalLinks, schema: report.schema, sharedGraph: report.sharedGraph }, null, 2));
await writeFile(path.join(out, 'repair-static-validation.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: report.passed, selectedOwners: report.ownerChecks.length, metadataRows: report.metadata.length, protectedSSR: report.protectedRenderedChecks.length, sourcePreservation: report.sourcePreservation, failures: report.failures }, null, 2));
if (!report.passed) process.exitCode = 1;
