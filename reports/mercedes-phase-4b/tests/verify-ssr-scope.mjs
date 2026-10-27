// Offline only. Read controlled builds; write evidence solely in this tests directory.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const testsRoot = path.dirname(fileURLToPath(import.meta.url));
const phaseRoot = path.dirname(testsRoot);
const args = Object.fromEntries(process.argv.slice(2).map(arg => {
  const i = arg.indexOf('=');
  if (!arg.startsWith('--') || i < 3) throw new Error('Use --baseline=PATH --candidate=PATH --out=PATH');
  return [arg.slice(2, i), arg.slice(i + 1)];
}));
for (const key of Object.keys(args)) if (!['baseline', 'candidate', 'out'].includes(key)) throw new Error(`Unknown argument: ${key}`);
const baselineRoot = path.resolve(args.baseline || path.join(phaseRoot, 'baseline.local'));
const candidateRoot = path.resolve(args.candidate || path.join(phaseRoot, 'candidate.local'));
const out = path.resolve(args.out || path.join(testsRoot, 'results'));
function inside(parent, child) { const relative = path.relative(parent, child); return relative && !relative.startsWith('..') && !path.isAbsolute(relative); }
if (!inside(phaseRoot, baselineRoot) || !inside(phaseRoot, candidateRoot) || baselineRoot === candidateRoot) throw new Error('Distinct controlled copy roots below Phase 4 are required.');
if (!inside(testsRoot, out)) throw new Error('Output must remain within reports/mercedes-phase-4/tests.');
await fs.mkdir(out, { recursive: true });
const startedAt = new Date().toISOString();
const checks = [];
const rows = [];
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const stable = value => JSON.stringify(value, (_, v) => v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, v[k]])) : v);
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[0-9a-f]+);/gi, item => {
  const named = {'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'};
  if (named[item.toLowerCase()]) return named[item.toLowerCase()];
  return String.fromCodePoint(parseInt(item.slice(item[2]?.toLowerCase() === 'x' ? 3 : 2, -1), item[2]?.toLowerCase() === 'x' ? 16 : 10));
});
const escapeAttr = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const textContent = html => decode(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
function attributes(tag) {
  const attrs = {};
  const nameEnd = tag.match(/^<\/?[^\s>]+/)?.[0].length || 0;
  for (const m of tag.slice(nameEnd).matchAll(/([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  return attrs;
}
function check(group, name, passed, evidence = {}) { checks.push({group, name, passed: Boolean(passed), ...evidence}); }
function difference(before, after) {
  let i = 0;
  while (i < Math.min(before.length, after.length) && before[i] === after[i]) i++;
  return {firstDifferingByte: i, beforeLength: before.length, afterLength: after.length, beforeContext: before.slice(Math.max(0, i - 100), i + 180), afterContext: after.slice(Math.max(0, i - 100), i + 180)};
}
function rootContent(html) {
  const start = /<div\b[^>]*\bid="root"[^>]*>/.exec(html);
  if (!start) throw new Error('Missing #root');
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = start.index + start[0].length;
  let depth = 1;
  for (let match; (match = tags.exec(html));) {
    if (/^<\/div/i.test(match[0])) depth--; else depth++;
    if (!depth) return html.slice(start.index + start[0].length, match.index);
  }
  throw new Error('Unclosed #root');
}
function extract(html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  if (!head) throw new Error('Missing head');
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map(m => attributes(m[0])).sort((a, b) => stable(a).localeCompare(stable(b)));
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(m => attributes(m[0]));
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => textContent(m[1]));
  const jsonLd = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) if (attributes(`<script${m[1]}>`).type === 'application/ld+json') jsonLd.push(JSON.parse(m[2]));
  const meta = name => metas.filter(m => m.name === name).map(m => m.content);
  return {
    documentLanguage: attributes(html.match(/<html\b[^>]*>/i)?.[0] || '<html>'),
    titles: [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(m => textContent(m[1])),
    descriptions: meta('description'), robots: meta('robots'), h1s,
    canonicals: links.filter(l => l.rel === 'canonical').map(l => l.href),
    alternates: links.filter(l => l.rel === 'alternate').sort((a, b) => stable(a).localeCompare(stable(b))),
    allMeta: metas, jsonLd,
  };
}
function anchors(html) {
  return [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map(m => ({html:m[0], index:m.index, attributes:attributes(m[0].slice(0, m[0].indexOf('>') + 1)), text:textContent(m[0])}));
}
function pageCtas(html) { return anchors(html).filter(a => ['hero','service_scope','final_cta'].includes(a.attributes['data-cta-placement']) && a.attributes.href?.startsWith('https://wa.me/')); }
const hub = '/brands/mercedes-benz-service-dubai';
const body = '/services/mercedes-body-repair-dubai';
const routes = [
  hub, body,
  '/ar/brands/mercedes-benz-service-dubai', '/ar/services/mercedes-body-repair-dubai',
  '/brands/bmw-service-dubai', '/ar/brands/bmw-service-dubai',
  '/brands/bmw-service-dubai/body-repair', '/ar/brands/bmw-service-dubai/body-repair',
  '/services/mercedes-oil-change-dubai', '/ar/services/mercedes-oil-change-dubai',
  '/services/mercedes-diagnostics-dubai', '/ar/services/mercedes-diagnostics-dubai',
  '/services/mercedes-mechanical-repair-dubai', '/ar/services/mercedes-mechanical-repair-dubai',
  '/services/car-body-repair-dubai', '/ar/services/car-body-repair-dubai',
];
const message = 'Hi Digi-Tec, I would like a Mercedes bodywork assessment.\n\nModel/year: \nAffected panels: \nPrevious paint or repair (if known): \nSensor warning (if any): \nI can attach clear photos of the damage.';
const expectedWhatsApp = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
const oldDescription = 'Share the model, year, mileage and the concern you want checked. The workshop can confirm the appropriate assessment, scope and appointment availability.';
const newDescription = 'Send your model and year, which panels are damaged, any known previous repair and any sensor warning. Attach clear photos for the initial discussion; the final scope and price follow inspection.';
const caption = 'A real Mercedes-AMG engine in the Digi-Tec workshop. Diagnostics, fluid specifications and repair planning are matched to the fitted powertrain—not just the badge.';
function replaceOnce(group, html, from, to, label) {
  const count = html.split(from).length - 1;
  check(group, label, count === 1, {observedCount:count});
  return count === 1 ? html.replace(from, to) : html;
}
for (const route of routes) {
  const group = route;
  try {
    const relative = path.join('dist', route.slice(1), 'index.html');
    const [beforeBytes, afterBytes] = await Promise.all([fs.readFile(path.join(baselineRoot, relative)), fs.readFile(path.join(candidateRoot, relative))]);
    const before = beforeBytes.toString('utf8'), after = afterBytes.toString('utf8');
    const beforeMeta = extract(before), afterMeta = extract(after);
    const beforeRoot = rootContent(before), afterRoot = rootContent(after);
    const id = route.slice(1).replaceAll('/', '__');
    for (const [name, value] of [['baseline',beforeBytes],['candidate',afterBytes]]) {
      await fs.mkdir(path.join(out, 'html', name), {recursive:true});
      await fs.writeFile(path.join(out, 'html', name, `${id}.html`), value);
    }
    check(group, 'requested route self-canonical, one title/description/H1, indexable robots and JSON-LD before/after', [beforeMeta,afterMeta].every(m => m.canonicals.length === 1 && m.canonicals[0] === `https://digitecme.com${route}` && m.titles.length === 1 && m.titles[0] && m.descriptions.length === 1 && m.descriptions[0] && m.h1s.length === 1 && m.h1s[0] && m.robots.length === 1 && /(?:^|[,\s])index(?:[,\s]|$)/i.test(m.robots[0]) && !/noindex/i.test(m.robots[0]) && m.jsonLd.length));
    check(group, 'all title/description/meta/H1/canonical/hreflang/language/JSON-LD values unchanged', stable(beforeMeta) === stable(afterMeta), {beforeMetadataSha256:hash(stable(beforeMeta)), afterMetadataSha256:hash(stable(afterMeta))});
    let normalized = afterRoot;
    const observations = {};
    if (route === hub) {
      const figure = afterRoot.match(/<figcaption\b[^>]*>[\s\S]*?Inside our Mercedes workshop[\s\S]*?<\/figcaption>/)?.[0] || '';
      const p = [...figure.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].find(m => textContent(m[1]) === caption);
      check(group, 'workshop caption wording preserved', Boolean(p));
      for (const [href,label] of [['/services/mercedes-diagnostics-dubai','Diagnostics'],['/services/mercedes-mechanical-repair-dubai','repair planning']]) {
        const found = anchors(p?.[1] || '').filter(a => a.attributes.href === href && a.text === label);
        check(group, `one caption anchor ${href}`, found.length === 1, {observedCount:found.length});
        if (found.length === 1) normalized = replaceOnce(group, normalized, found[0].html, label, `reverse only caption anchor ${label}`);
      }
      check(group, 'caption has exactly two anchors', anchors(p?.[1] || '').length === 2);
      const phones = anchors(afterRoot).filter(a => a.attributes['data-cta-placement'] === 'workshop_proof');
      check(group, 'one workshop_proof telephone with exact recipient and label', phones.length === 1 && phones[0].attributes.href === 'tel:+97143402223' && phones[0].text === 'Call +971 4 340 2223', {observed:phones.map(a => ({...a.attributes,text:a.text}))});
      const phone = phones[0];
      check(group, 'telephone sits in the existing Dubai/Al Quoz visit card', Boolean(phone && /Al Quoz Industrial Area 3<\/h3><p\b[^>]*>Dubai, with a direct Google Maps route from this page\. $/.test(afterRoot.slice(0,phone.index)) && afterRoot.slice(phone.index + phone.html.length).startsWith(' to confirm arrival details.</p>')));
      if (phone) normalized = replaceOnce(group, normalized, ` ${phone.html} to confirm arrival details.`, '', 'reverse only approved visit-card addition');
      observations.workshopPhone = phone ? {href:phone.attributes.href,text:phone.text,placement:phone.attributes['data-cta-placement']} : null;
    } else if (route === body) {
      const beforeCtas = pageCtas(beforeRoot), afterCtas = pageCtas(afterRoot);
      const placements = ['hero','service_scope','final_cta'];
      check(group, 'exactly three scoped WhatsApp anchors before and after', beforeCtas.length === 3 && afterCtas.length === 3, {beforeCount:beforeCtas.length,afterCount:afterCtas.length});
      for (const placement of placements) {
        const b = beforeCtas.filter(a => a.attributes['data-cta-placement'] === placement);
        const a = afterCtas.filter(a => a.attributes['data-cta-placement'] === placement);
        check(group, `exact approved recipient/message/encoded line breaks at ${placement}`, b.length === 1 && a.length === 1 && a[0].attributes.href === expectedWhatsApp && new URL(a[0].attributes.href).searchParams.get('text') === message && (a[0].attributes.href.match(/%0A/g) || []).length === 6 && !a[0].attributes.href.includes('+'), {observedCount:a.length,observedHref:a[0]?.attributes.href});
        if (a.length === 1 && b.length === 1) {
          const replacement = a[0].html.replace(`href="${escapeAttr(a[0].attributes.href)}"`, `href="${escapeAttr(b[0].attributes.href)}"`);
          normalized = replaceOnce(group, normalized, a[0].html, replacement, `reverse only ${placement} draft href`);
        }
      }
      check(group, 'approved final quotation paragraph appears once in final CTA', afterRoot.split(newDescription).length - 1 === 1 && /<p class="home-lead">/.test(afterRoot.slice(Math.max(0,afterRoot.indexOf(newDescription) - 30),afterRoot.indexOf(newDescription))));
      normalized = replaceOnce(group, normalized, newDescription, oldDescription, 'reverse only approved final quotation paragraph');
      observations.bodyWhatsApp = afterCtas.map(a => ({placement:a.attributes['data-cta-placement'],href:a.attributes.href,label:a.text,decodedMessage:new URL(a.attributes.href).searchParams.get('text')}));
    }
    const same = normalized === beforeRoot;
    check(group, route === hub || route === body ? 'only approved rendered changes; reversing them exactly reproduces baseline root' : 'protected control root byte-identical', same, same ? {} : difference(beforeRoot,normalized));
    rows.push({route,changedPage:route===hub||route===body,inputFiles:{baseline:path.join(baselineRoot,relative),candidate:path.join(candidateRoot,relative)},htmlSha256:{baseline:hash(beforeBytes),candidate:hash(afterBytes)},rootSha256:{baseline:hash(beforeRoot),candidate:hash(afterRoot),candidateAfterReversingApprovedChanges:hash(normalized)},baselineMetadata:beforeMeta,candidateMetadata:afterMeta,observations});
  } catch (error) { check(group, 'read and parse complete built SSR documents', false, {error:error.message}); }
}
const routingFiles = ['src/lib/routing-paths.json','dist/sitemap.xml','public/sitemap.xml','dist/_redirects','docs/seo/permanent-redirects.csv','docs/seo/mercedes-permanent-redirects.csv','docs/seo/removed-brand-urls.csv','cloudflare/production-seo-router.js','cloudflare/mercedes-seo-router.js'];
for (const relative of routingFiles) {
  try {
    const [before,after] = await Promise.all([fs.readFile(path.join(baselineRoot,relative)),fs.readFile(path.join(candidateRoot,relative))]);
    check('routing and public URL preservation', relative, before.equals(after), {baselineSha256:hash(before),candidateSha256:hash(after)});
  } catch (error) { check('routing and public URL preservation',relative,false,{error:error.message}); }
}
const failures = checks.filter(c => !c.passed);
const report = {startedAt,finishedAt:new Date().toISOString(),offlineOnly:true,networkRequests:0,baselineRoot,candidateRoot,allowedChanges:['H3-01','H3-02','S1'],excludedChanges:['S2','production publication','Cloudflare configuration','metadata/canonical/schema changes'],routes:rows,expectedWhatsApp:{recipient:'97143402223',message,href:expectedWhatsApp,lineBreakCount:6},assertions:checks.length,passedAssertions:checks.length-failures.length,failedAssertions:failures.length,passed:failures.length===0,checks,limitations:['Prerendered local SSR output only; not Google-selected canonical/indexing or production HTTP.','Exact protected React-root checks do not cover interactive hydration or responsive visual layout.','These comparisons do not waive any failing required release-pipeline checks.','Generated files are read only; no app source, configuration or contact action is modified or invoked.']};
await fs.writeFile(path.join(out,'results.json'), JSON.stringify(report,null,2)+'\n');
const md = [`# Offline SSR/scope verification`, ``, `Result: **${report.passed?'PASS':'FAIL'}** — ${report.passedAssertions}/${report.assertions} assertions; ${rows.length}/${routes.length} route documents compared.`, ``, `Started ${startedAt}; finished ${report.finishedAt} (UTC). No network requests or source/configuration writes.`, ``, `| Route | Scope | Result |`, `|---|---|---|`, ...routes.map(route=>`| \`${route}\` | ${route===hub||route===body?'Approved content changes only':'Unchanged control'} | ${checks.some(c=>c.group===route&&!c.passed)?'FAIL':'PASS'} |`), ``, `The body drafts target \`97143402223\` and must contain the exact approved message with six encoded line breaks. The hub links and workshop telephone are checked in their existing content locations. All metadata/JSON-LD and routing-definition comparisons require equality.`, ``, ...(failures.length?[`## Failures`, ``, ...failures.map(c=>`- ${c.group}: ${c.name}${c.error?' — '+c.error:''}`),``]:[]), `Evidence: [complete assertions and observed metadata](results.json), original HTML in \`html/baseline/\` and \`html/candidate/\`.`, ``, ...report.limitations.map(l=>`- ${l}`), ``].join('\n');
await fs.writeFile(path.join(out,'summary.md'),md);
console.log(JSON.stringify({passed:report.passed,routes:rows.length,expectedRoutes:routes.length,assertions:report.assertions,passedAssertions:report.passedAssertions,failedAssertions:report.failedAssertions,output:out,failures:failures.map(({group,name,error})=>({group,name,error}))},null,2));
if (!report.passed) process.exitCode=1;
