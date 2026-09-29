import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { aliases } from '../cloudflare/mercedes-seo-router.js';

// Read-only production audit; no forms, analytics events or mutation requests.
const origin = 'https://digitecme.com';
const out = process.argv[2] || 'outputs/production-qa-2026-09-16';
await mkdir(`${out}/html`, { recursive: true });
const baseline = JSON.parse(await readFile('outputs/seo-2026-09-16/master-validation.json', 'utf8'));
const decode = s => String(s).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ');
const clean = s => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (s, n) => decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`, 'i'))?.[1] || '');
const tags = (s, n) => [...s.matchAll(new RegExp(`<${n}\\b[^>]*>`, 'gi'))].map(m => m[0]);
function parse(html) {
  const json = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m => attr(m[1], 'type') === 'application/ld+json').map(m => JSON.parse(m[2]));
  const nodes = json.flatMap(v => v['@graph'] || (Array.isArray(v) ? v : [v]));
  return {
    title: clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''),
    canonical: tags(html, 'link').filter(t => attr(t, 'rel') === 'canonical').map(t => attr(t, 'href')),
    description: tags(html, 'meta').filter(t => attr(t, 'name') === 'description').map(t => attr(t, 'content')),
    robots: tags(html, 'meta').filter(t => /^(robots|googlebot)$/i.test(attr(t, 'name'))).map(t => attr(t, 'content')),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => clean(m[1])),
    links: tags(html, 'a').map(t => attr(t, 'href')).filter(Boolean),
    scripts: tags(html, 'script').map(t => attr(t, 'src')).filter(Boolean),
    bodyText: clean(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')),
    nodes,
  };
}
async function request(url, method = 'GET') {
  try {
    const r = await fetch(url, { method, redirect: 'manual', signal: AbortSignal.timeout(25000) });
    const headers = Object.fromEntries([...r.headers].filter(([k]) => !['set-cookie'].includes(k)));
    return { url, method, status: r.status, headers, body: method === 'HEAD' ? '' : await r.text() };
  } catch (e) { return { url, method, status: 0, headers: {}, body: '', error: e.message }; }
}
async function pool(items, fn, concurrency = 5) {
  const result = new Array(items.length); let cursor = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => { while (cursor < items.length) { const i = cursor++; result[i] = await fn(items[i], i); } }));
  return result;
}
const report = { checkedAt: new Date().toISOString(), origin, owners: [], redirects: [], internalLinks: [], infrastructure: {}, errors: [] };
const [robots, sitemap] = await Promise.all([request(`${origin}/robots.txt`), request(`${origin}/sitemap.xml`)]);
await writeFile(`${out}/robots.txt`, robots.body);
await writeFile(`${out}/sitemap.xml`, sitemap.body);
const sitemapUrls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decode(m[1]));
report.infrastructure = { robots: { status: robots.status, text: robots.body }, sitemap: { status: sitemap.status, count: sitemapUrls.length, deployment: sitemap.headers['x-deployment-id'] } };
const linked = new Map();
report.owners = await pool(baseline.owners, async owner => {
  const route = new URL(owner.canonical).pathname;
  const [live, head, localHtml] = await Promise.all([request(owner.canonical), request(owner.canonical, 'HEAD'), readFile(`dist${route}/index.html`, 'utf8')]);
  await writeFile(`${out}/html/${route.replaceAll('/', '_')}.html`, live.body);
  const actual = parse(live.body), local = parse(localHtml);
  for (const href of actual.links) { const u = new URL(href, owner.canonical); if (u.origin === origin) { u.hash = ''; u.search = ''; linked.set(u.href, [...(linked.get(u.href) || []), route]); } }
  const schemaMatch = JSON.stringify(actual.nodes) === JSON.stringify(local.nodes);
  const faqAnswers = actual.nodes.filter(n => [].concat(n['@type']).includes('FAQPage')).flatMap(n => n.mainEntity || []).map(q => clean(q.acceptedAnswer?.text || ''));
  const checks = {
    http: live.status === 200 && head.status === 200 && /text\/html/i.test(live.headers['content-type'] || ''),
    canonical: JSON.stringify(actual.canonical) === JSON.stringify([owner.canonical]),
    title: actual.title === owner.title,
    description: JSON.stringify(actual.description) === JSON.stringify([owner.description]),
    h1: JSON.stringify(actual.h1) === JSON.stringify([owner.h1]),
    initialHtml: actual.bodyText === local.bodyText && actual.bodyText.length > 1000,
    structuredData: schemaMatch && actual.nodes.some(n => [].concat(n['@type']).includes('Service')),
    faqAnswersInHtml: faqAnswers.every(a => actual.bodyText.includes(a)),
    linksMatchBuild: JSON.stringify(actual.links) === JSON.stringify(local.links),
    sitemap: sitemap.status === 200 && sitemapUrls.filter(u => u === owner.canonical).length === 1,
    robots: robots.status === 200 && robots.body.includes('Allow: /') && !actual.robots.some(r => /noindex|none/i.test(r)) && !/noindex|none/i.test(live.headers['x-robots-tag'] || '') && !/Disallow:\s*\/$/m.test(robots.body),
    analyticsMarkup: live.body.includes('GTM-T3GVSPND') && /G-[A-Z0-9]+/.test(live.body),
    whatsappLinks: actual.links.some(h => /^https:\/\/(wa.me|api.whatsapp.com)\//.test(h)),
  };
  return { cluster: owner.cluster, route, newPage: /cadillac-cue|head-unit|mercedes-audio/.test(route), status: live.status, headStatus: head.status, headers: live.headers, checks, passed: Object.values(checks).every(Boolean), title: actual.title, description: actual.description, canonical: actual.canonical, h1: actual.h1, robots: actual.robots, schemaTypes: actual.nodes.map(n => n['@type']), schemaMatch, initialTextLength: actual.bodyText.length, internalLinkCount: actual.links.filter(h => h.startsWith('/')).length, scripts: actual.scripts, htmlSha256: createHash('sha256').update(live.body).digest('hex') };
});
await writeFile(`${out}/http-audit.json`, JSON.stringify(report, null, 2));
console.log('Owners:', report.owners.map(o => ({route:o.route, passed:o.passed, failures:Object.entries(o.checks).filter(([,v])=>!v).map(([k])=>k)})));
report.internalLinks = await pool([...linked], async ([url, from]) => {
  const r = await request(url); const p = /text\/html/.test(r.headers['content-type'] || '') ? parse(r.body) : null;
  return { url, from: [...new Set(from)], status: r.status, location: r.headers.location, canonical: p?.canonical, title: p?.title, passed: r.status === 200 && (!p || (p.canonical.includes(url) && !p.h1.some(h=>/page not found/i.test(h)))) };
});
console.log('Internal links:', report.internalLinks.length, 'failures:', report.internalLinks.filter(r=>!r.passed).length);
const redirectCases = [...aliases].map(([source, target]) => ({ url: origin + source, target: origin + target }));
for (const source of ['/services/tire-repair', '/ar/services/tire-repair', '/services/mercedes-repair-dubai', '/best-mercedes-workshop-dubai', '/services/mercedes-service-dubai', '/brands/mercedes-benz-service-dubai/suspension-repair']) {
  const target = aliases.get(source) || source.replace('/tire-repair', '/tire-repair-dubai');
  for (const host of [origin, 'https://www.digitecme.com', 'http://digitecme.com']) for (const suffix of ['', '/']) redirectCases.push({ url: host + source + suffix + '?utm_source=production-qa&gclid=qa-check&tag=a&tag=b', target: origin + target + '?utm_source=production-qa&gclid=qa-check&tag=a&tag=b' });
}
report.redirects = await pool(redirectCases, async item => {
  const [get, head] = await Promise.all([request(item.url), request(item.url, 'HEAD')]);
  return { ...item, getStatus:get.status, headStatus:head.status, location:get.headers.location, headLocation:head.headers.location, title:clean(get.body.match(/<title>(.*?)<\/title>/)?.[1] || ''), passed:[301,308].includes(get.status) && [301,308].includes(head.status) && get.headers.location === item.target && head.headers.location === item.target };
});
report.completedAt = new Date().toISOString();
await writeFile(`${out}/http-audit.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({owners:report.owners.length, ownerFailures:report.owners.filter(o=>!o.passed).length, links:report.internalLinks.length, linkFailures:report.internalLinks.filter(o=>!o.passed).length, redirects:report.redirects.length, redirectFailures:report.redirects.filter(o=>!o.passed).length}));
