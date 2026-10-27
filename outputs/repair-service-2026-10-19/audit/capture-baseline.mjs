import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const out = path.join(root, 'outputs/repair-service-2026-10-19/audit');
const origin = 'https://digitecme.com';
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routeMap = new Map(getPublicRoutes().map(route => [route.path, route]));
const owners = [
  ['Mercedes engine repair Dubai', 'mercedes-benz', '/services/mercedes-mechanical-repair-dubai'],
  ['Mercedes suspension repair Dubai', 'mercedes-benz', '/services/mercedes-suspension-repair-dubai'],
  ['Mercedes diagnostics Dubai', 'mercedes-benz', '/services/mercedes-diagnostics-dubai'],
  ['Mercedes transmission repair Dubai', 'mercedes-benz', '/services/mercedes-transmission-repair-dubai'],
  ['BMW transmission repair Dubai', 'bmw', '/brands/bmw-service-dubai/transmission-repair'],
  ['BMW engine repair Dubai', 'bmw', '/brands/bmw-service-dubai/mechanical-repair'],
  ['Rolls-Royce engine repair Dubai', 'rolls-royce', '/brands/rolls-royce-service-dubai/mechanical-repair'],
  ['Rolls-Royce suspension repair Dubai', 'rolls-royce', '/brands/rolls-royce-service-dubai/suspension-repair'],
  ['Lamborghini transmission repair Dubai', 'lamborghini', '/brands/lamborghini-service-dubai/transmission-repair'],
  ['Lamborghini engine repair Dubai', 'lamborghini', '/brands/lamborghini-service-dubai/mechanical-repair'],
  ['Lamborghini engine diagnostics Dubai', 'lamborghini', '/brands/lamborghini-service-dubai/engine-diagnostics'],
];
const decode = value => String(value ?? '').replace(/&#x([\da-f]+);/gi, (_, c) => String.fromCodePoint(parseInt(c, 16)))
  .replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(Number(c)))
  .replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&nbsp;', ' ').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
const clean = value => decode(String(value ?? '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attribute = (tag, name) => {
  const m = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return m ? decode(m[1] ?? m[2]) : undefined;
};
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(m => m[0]);
const metadata = (html, name) => tags(html, 'meta').filter(t => attribute(t, 'name') === name || attribute(t, 'property') === name).map(t => attribute(t, 'content'));
const links = html => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m => ({ href: attribute(m[1], 'href'), label: clean(m[2]), placement: attribute(m[1], 'data-cta-placement') })).filter(x => x.href);
const nodes = html => [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m => attribute(m[1], 'type') === 'application/ld+json').flatMap(m => {
  const parsed = JSON.parse(m[2]); return Array.isArray(parsed) ? parsed : parsed['@graph'] ?? [parsed];
});
const visible = html => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
const fileFor = p => path.join(root, 'dist', p.replace(/^\//, ''), 'index.html');
await fs.mkdir(path.join(out, 'html'), { recursive: true });
const sitemap = await fs.readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
const records = [];
for (const [query, brand, owner] of owners) {
  for (const locale of ['en', 'ar']) {
    const prefix = locale === 'ar' ? '/ar' : '';
    const route = prefix + owner;
    const hub = `${prefix}/brands/${brand}-service-dubai`;
    const html = await fs.readFile(fileFor(route), 'utf8');
    const hubHtml = await fs.readFile(fileFor(hub), 'utf8');
    const body = visible(html), bodyText = clean(body);
    const schema = nodes(html);
    const service = schema.filter(n => [].concat(n['@type'] ?? []).includes('Service') && n.url === origin + route);
    const faqs = schema.filter(n => [].concat(n['@type'] ?? []).includes('FAQPage')).flatMap(n => n.mainEntity ?? []);
    const c = tags(html, 'link').filter(t => attribute(t, 'rel') === 'canonical').map(t => attribute(t, 'href'));
    const alternates = tags(html, 'link').filter(t => attribute(t, 'rel') === 'alternate' && attribute(t, 'hreflang')).map(t => ({ language: attribute(t, 'hreflang'), href: attribute(t, 'href') }));
    const heading = [...body.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => ({ level: Number(m[1].slice(1)), text: clean(m[2]) }));
    const pageLinks = links(html);
    const hubOwnerLinks = links(hubHtml).filter(l => new URL(l.href, origin + hub).pathname === route);
    const record = {
      query, locale, route, hub, manifestIndexable: routeMap.get(route)?.indexable ?? false,
      title: [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map(m => clean(m[1])),
      description: metadata(html, 'description'), robots: metadata(html, 'robots'), canonicals: c,
      selfCanonical: c.length === 1 && c[0] === origin + route,
      inSitemap: sitemap.includes(`<loc>${origin}${route}</loc>`), alternates,
      headings: heading, singleH1: heading.filter(h => h.level === 1).length === 1,
      headingSkips: heading.filter((h, i) => i > 0 && h.level > heading[i - 1].level + 1),
      visibleText: bodyText,
      serviceSchema: service,
      businessIds: schema.filter(n => [].concat(n['@type'] ?? []).some(t => ['AutoRepair', 'LocalBusiness'].includes(t))).map(n => n['@id']),
      schemaNodeTypes: schema.map(n => n['@type']),
      faqCount: faqs.length,
      faqAnswersInInitialHtml: faqs.filter(f => bodyText.includes(clean(f.acceptedAnswer?.text))).length,
      faqAnswersMissingFromInitialHtml: faqs.filter(f => !bodyText.includes(clean(f.acceptedAnswer?.text))).map(f => f.name),
      hubOwnerLinks,
      contactLinks: pageLinks.filter(l => /^(?:tel:|https:\/\/wa\.me\/)/.test(l.href)),
      internalLinks: pageLinks.filter(l => l.href.startsWith('/') || l.href.startsWith(origin)),
    };
    await fs.writeFile(path.join(out, 'html', `${route.slice(1).replaceAll('/', '__')}.html`), html);
    records.push(record);
  }
}
await fs.writeFile(path.join(out, 'baseline-repair-owner-audit.json'), JSON.stringify({ capturedAt: new Date().toISOString(), basis: 'Existing local dist generated by completed five-brand sprint; source files read only; no production read or mutation.', records }, null, 2));
const csv = [['query','locale','route','manifest_indexable','self_canonical','in_sitemap','title','description','h1','hub_links','service_schema','faq_total','faq_answers_in_initial_html'], ...records.map(r => [r.query,r.locale,r.route,r.manifestIndexable,r.selfCanonical,r.inSitemap,r.title.join(' | '),r.description.join(' | '),r.headings.filter(h => h.level === 1).map(h => h.text).join(' | '),r.hubOwnerLinks.length,r.serviceSchema.length,r.faqCount,r.faqAnswersInInitialHtml])].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
await fs.writeFile(path.join(out, 'baseline-repair-owner-audit.csv'), '\ufeff' + csv);
console.log(JSON.stringify(records.map(({ query, locale, route, manifestIndexable, selfCanonical, inSitemap, singleH1, headingSkips, hubOwnerLinks, serviceSchema, faqCount, faqAnswersInInitialHtml }) => ({ query, locale, route, manifestIndexable, selfCanonical, inSitemap, singleH1, headingSkips: headingSkips.length, hubLinks: hubOwnerLinks.length, serviceSchema: serviceSchema.length, faqCount, faqAnswersInInitialHtml })), null, 2));
