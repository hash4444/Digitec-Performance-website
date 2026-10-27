import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const root = process.cwd();
const output = path.resolve(process.argv[2]);
await mkdir(output, { recursive: true });
const origin = 'https://digitecme.com';
const repair = await import(pathToFileURL(path.join(root, 'outputs/repair-service-2026-10-19/qa/repair-routes.mjs')));
const hubs = ['rolls-royce', 'lamborghini', 'volkswagen', 'mercedes-benz', 'bmw'].flatMap(brand => ['', '/ar'].map(prefix => ({ route: `${prefix}/brands/${brand}-service-dubai`, kind: 'hub', arabic: Boolean(prefix) })));
const selected = [...hubs, ...repair.routes.map(row => ({ ...row, kind: row.preservedOwner ? 'preserved-repair' : 'repair', arabic: row.language === 'ar' }))];
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')));
const manifest = new Map(getPublicRoutes().map(row => [row.path, row]));
const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
const decode = text => String(text ?? '').replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const clean = text => decode(String(text).replace(/<[^>]*>/g, ' ')).replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, '').replace(/\s+/g, ' ').trim();
const attr = (tag, name) => decode(tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'))?.slice(1).find(value => value !== undefined) ?? '');
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(match => match[0]);
const meta = (html, name) => tags(html, 'meta').filter(tag => attr(tag, 'name') === name).map(tag => attr(tag, 'content'));
const links = html => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(match => ({ href: attr(match[1], 'href'), text: clean(match[2]) })).filter(row => row.href);
const scripts = html => [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(match => attr(match[1], 'type') === 'application/ld+json').map(match => ({ route: attr(match[1], 'data-route-jsonld') === 'true', raw: match[2].trim(), value: JSON.parse(match[2]) }));
const nodes = html => scripts(html).flatMap(script => script.value['@graph'] || [script.value]);
const type = (graph, kind) => graph.filter(node => [].concat(node['@type']).includes(kind));
const file = route => path.join(root, 'dist', route.slice(1), 'index.html');
const cache = new Map();
async function htmlFor(route) { if (!cache.has(route)) cache.set(route, await readFile(file(route), 'utf8')); return cache.get(route); }
const sourceShared = scripts(await readFile(path.join(root, 'index.html'), 'utf8')).filter(script => !script.route);
assert.equal(sourceShared.length, 1, 'One existing global entity graph');
const report = { checkedAt: new Date().toISOString(), passed: false, pages: [], internalLinks: [], failures: [], checks: 0, limitations: 'Built candidate only; no live production checks or Google Rich Results API claims.' };
const check = (actual, expected, message) => { report.checks++; assert.deepEqual(actual, expected, message); };

for (const spec of selected) {
  try {
    const html = await htmlFor(spec.route);
    const body = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
    const bodyText = clean(body);
    const title = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(match => clean(match[1]));
    const description = meta(html, 'description');
    const canonical = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href'));
    const alternates = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'alternate');
    const h1 = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => clean(match[1]));
    check(title.length, 1, 'One title'); check(title[0].length > 12, true, 'Meaningful title');
    check(description.length, 1, 'One description'); check(description[0].length > 35, true, 'Meaningful description');
    check(h1.length, 1, 'One H1'); check(h1[0].length > 12, true, 'Meaningful H1');
    check(canonical, [origin + spec.route], 'Self canonical');
    check(/noindex/i.test(meta(html, 'robots').join(',')), false, 'Indexing eligible');
    check(manifest.has(spec.route) && manifest.get(spec.route).indexable !== false, true, 'Indexable manifest route');
    check(sitemap.includes(`<loc>${origin}${spec.route}</loc>`), true, 'Canonical in sitemap');
    const en = spec.route.replace(/^\/ar/, '');
    for (const [language, target] of [['en-AE', origin + en], ['ar-AE', `${origin}/ar${en}`], ['x-default', origin + en]]) check(alternates.filter(tag => attr(tag, 'hreflang') === language).map(tag => attr(tag, 'href')), [target], `${language} alternate`);
    if (spec.arabic) { check(/[\u0600-\u06ff]/.test(h1[0]), true, 'Arabic H1'); check(attr(tags(html, 'html')[0], 'lang'), 'ar', 'Arabic document language'); check(attr(tags(html, 'html')[0], 'dir'), 'rtl', 'Arabic direction'); }
    const graph = nodes(html);
    const ids = graph.map(node => node['@id']).filter(Boolean);
    check(new Set(ids).size, ids.length, 'Unique JSON-LD IDs');
    const service = type(graph, 'Service'); const faq = type(graph, 'FAQPage'); const breadcrumb = type(graph, 'BreadcrumbList');
    check(service.length, 1, 'One Service'); check(service[0]['@id'], `${origin}${spec.route}#service`, 'Service entity ID');
    check(service[0].provider['@id'], `${origin}/#business`, 'Preserved business provider'); check(breadcrumb.length, 1, 'One breadcrumb');
    check(faq.length, 1, 'One FAQ graph'); check(faq[0].mainEntity.length >= 3, true, 'Useful FAQ');
    for (const question of faq[0].mainEntity) { check(bodyText.includes(clean(question.name)), true, 'FAQ question crawlable'); check(bodyText.includes(clean(question.acceptedAnswer.text)), true, 'FAQ answer crawlable'); }
    check(scripts(html).filter(script => !script.route).map(script => script.raw), sourceShared.map(script => script.raw), 'Established shared graph identical');
    const pageLinks = links(body);
    const relevantSections = [...body.matchAll(/<section\b[^>]*(?:data-repair-enquiry|aria-labelledby="brand-service-scope-title")[^>]*>([\s\S]*?)<\/section>/gi)].map(match => match[0]);
    for (const link of relevantSections.flatMap(links).filter(link => link.href.startsWith('/'))) {
      const target = new URL(link.href, origin + spec.route).pathname;
      const targetHtml = await htmlFor(target);
      check(manifest.has(target) && manifest.get(target).indexable !== false, true, 'Direct internal destination indexable');
      check(tags(targetHtml, 'link').filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href')), [origin + target], 'Destination direct canonical');
      check(/noindex/i.test(meta(targetHtml, 'robots').join(',')), false, 'Destination not noindex');
      if (spec.arabic) check(target.startsWith('/ar/'), true, 'Arabic internal destination');
      report.internalLinks.push({ from: spec.route, to: target, text: link.text, indexable: true });
    }
    if (spec.kind !== 'hub') {
      check(links(await htmlFor(spec.hub)).some(link => new URL(link.href, origin + spec.hub).pathname === spec.route), true, 'Direct brand hub inlink');
      check(service[0].description, description[0], 'Repair schema and metadata agree');
    }
    if (spec.kind === 'repair') {
      check((html.match(/data-repair-enquiry(?:[\s=>])/g) || []).length, 1, 'One repair quotation panel');
      check(/<section\b[^>]*id="service-process"/.test(html), true, 'Crawlable diagnostic process');
      const hero = tags(html, 'a').filter(tag => attr(tag, 'data-cta-placement') === 'hero' && attr(tag, 'href').startsWith('https://wa.me/'));
      const quote = tags(html, 'a').filter(tag => attr(tag, 'data-cta-placement') === 'repair_quote' && attr(tag, 'href').startsWith('https://wa.me/'));
      check(hero.length, 1, 'One hero WhatsApp'); check(quote.length, 1, 'One quotation WhatsApp'); check(attr(hero[0], 'href'), attr(quote[0], 'href'), 'Quotation preserves service context');
      check(new URL(attr(quote[0], 'href')).pathname, '/97143402223', 'Established WhatsApp number');
    }
    check(pageLinks.some(link => link.href === 'tel:+97143402223'), true, 'Call next step');
    report.pages.push({ route: spec.route, kind: spec.kind, language: spec.arabic ? 'ar' : 'en', passed: true, title: title[0], description: description[0], h1: h1[0], canonical: canonical[0], faqQuestions: faq[0].mainEntity.length, sharedGraphSha256: createHash('sha256').update(sourceShared[0].raw).digest('hex') });
  } catch (error) { report.failures.push({ route: spec.route, error: error.message }); }
}
report.passed = report.failures.length === 0 && report.pages.length === 32;
await writeFile(path.join(output, 'combined-static-results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: report.passed, routes: report.pages.length, checks: report.checks, directInternalLinkOccurrences: report.internalLinks.length, failures: report.failures }, null, 2));
if (!report.passed) process.exitCode = 1;
