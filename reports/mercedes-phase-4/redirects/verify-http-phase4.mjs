// Read-only GET/HEAD verifier. No Cloudflare credentials, APIs, mutations, forms,
// browser JS, analytics events, deployment or generated website outputs.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../mercedes-phase-2/', import.meta.url));
const arg = name => process.argv.find(v => v.startsWith(`--${name}=`))?.slice(name.length + 3);
const stage = arg('stage') || 'pre';
if (!['pre', 'post'].includes(stage)) throw new Error('--stage must be pre or post');
const syntheticFixture = arg('synthetic-fixture');
if (!!syntheticFixture !== !!globalThis.__mercedesPhase2OfflineFixture) throw new Error('Synthetic mode requires the offline fixture preloader; never label real traffic as synthetic or synthetic traffic as production.');
const baselinePath = arg('baseline');
if (stage === 'post' && !baselinePath) throw new Error('Post stage requires --baseline=<pre capture.json>');
const baseline = baselinePath ? JSON.parse(await readFile(resolve(baselinePath), 'utf8')) : null;
const runId = `${syntheticFixture ? 'SYNTHETIC-' : ''}${stage}-${new Date().toISOString().replace(/[:.]/g, '-')}`;
const out = resolve(fileURLToPath(new URL('./http/', import.meta.url)), runId);
await mkdir(resolve(out, 'html'), { recursive: true });
const proposal = JSON.parse(await readFile(resolve(root, 'routing/redirect-proposals.json'), 'utf8'));
if (stage === 'post' && (baseline.stage !== 'pre' || baseline.summary?.failed !== 0 || baseline.proposalSha256 !== hash(await readFile(resolve(root, 'routing/redirect-proposals.json'), 'utf8')))) throw new Error('Baseline must be a passing preflight for this exact proposal file.');
const origin = 'https://digitecme.com';
const queries = ['', '?utm_source=mercedes_phase_2&gclid=phase2-example', '?tag=a&tag=b&encoded=%2F%2B%26%3D&space=a%20b&plus=a+b&blank='];
const hosts = [origin, 'http://digitecme.com', 'https://www.digitecme.com', 'http://www.digitecme.com'];
const methods = ['GET', 'HEAD'];
const slash = ['', '/'];
const decode = s => String(s).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ');
const clean = s => decode(String(s).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (s, n) => decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`, 'i'))?.[1] || '');
const tags = (s, n) => [...s.matchAll(new RegExp(`<${n}\\b[^>]*>`, 'gi'))].map(m => m[0]);
function hash(s) { return createHash('sha256').update(s).digest('hex'); }
function parse(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  return {
    title: clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''),
    h1: [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => clean(m[1])),
    canonical: tags(html, 'link').filter(t => attr(t, 'rel').toLowerCase() === 'canonical').map(t => attr(t, 'href')),
    robots: tags(html, 'meta').filter(t => /^(robots|googlebot)$/i.test(attr(t, 'name'))).map(t => attr(t, 'content')),
    mainTextSha256: hash(clean(main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ''))),
    htmlSha256: hash(html)
  };
}
const requests = [];
async function request(url, method) {
  const at = new Date().toISOString();
  try {
    const response = await fetch(url, { method, redirect: 'manual', signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'DIGI-TEC-Phase2-ReadOnly-HTTP-Verification/1.0' } });
    const body = method === 'GET' ? await response.text() : '';
    const headers = Object.fromEntries([...response.headers].filter(([k]) => k.toLowerCase() !== 'set-cookie'));
    const record = { at, url, method, status: response.status, headers, ...(method === 'GET' && /text\/html/i.test(headers['content-type'] || '') ? parse(body) : {}) };
    requests.push(record);
    return { record, body };
  } catch (e) {
    const record = { at, url, method, status: 0, headers: {}, error: `${e.message}: ${e.cause?.code || ''}` };
    requests.push(record);
    return { record, body: '' };
  }
}
async function follow(test) {
  const chain = [], visited = new Set();
  let next = test.url;
  for (let hop = 0; hop < 5; hop++) {
    if (visited.has(next)) return { ...test, chain, loop: true };
    visited.add(next);
    const { record, body } = await request(next, test.method);
    if (test.method === 'GET') {
      const name = `${test.key}-hop${hop}.html`;
      await writeFile(resolve(out, 'html', name), body);
      record.htmlFile = `html/${name}`;
    }
    chain.push(record);
    if (![301, 302, 303, 307, 308].includes(record.status) || !record.headers.location) return { ...test, chain, loop: false };
    const target = new URL(record.headers.location, next);
    if (!['http:', 'https:'].includes(target.protocol) || !['digitecme.com', 'www.digitecme.com'].includes(target.hostname)) return { ...test, chain, loop: false, unsafeFollowTarget: target.href };
    next = target.href;
  }
  return { ...test, chain, loop: false, exceededHopLimit: true };
}
async function pool(items, fn, n = 4) {
  const result = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (cursor < items.length) { const i = cursor++; result[i] = await fn(items[i], i); }
  }));
  return result;
}
const cases = [];
for (const rule of proposal.rules) for (const host of hosts) for (const s of slash) for (const method of methods) for (const query of queries) {
  const url = host + rule.source + s + query;
  cases.push({ key: `source-${rule.key}-${cases.length}`, group: 'source', rule: rule.key, url, method, expectedTarget: rule.target + query, saveHtml: host === origin && s === '' && method === 'GET' && query === '' });
}
const protectedOil = '/brands/mercedes-benz-service-dubai/oil-change';
for (const host of hosts) for (const s of slash) for (const method of methods) for (const query of queries) cases.push({ key: `english-oil-${cases.length}`, group: 'protected-oil', url: host + protectedOil + s + query, method, expectedTarget: origin + '/services/mercedes-oil-change-dubai' + query });
for (const path of ['/services/mercedes-repair-dubai', '/services/mercedes-service-dubai', '/best-mercedes-workshop-dubai']) for (const host of hosts) for (const s of slash) for (const method of methods) cases.push({ key: `protected-repair-${cases.length}`, group: 'protected-repair', url: host + path + s, method, expectedTarget: origin + '/brands/mercedes-benz-service-dubai' });
for (const rule of proposal.rules) for (const s of slash) for (const method of methods) cases.push({ key: `destination-${rule.key}-${s ? 'slash' : 'noslash'}-${method}`, group: 'destination', rule: rule.key, url: rule.target + s, method, expectedCanonical: rule.target, saveHtml: s === '' && method === 'GET' });
const controls = ['/', '/brands/mercedes-benz-service-dubai', '/ar/brands/mercedes-benz-service-dubai', '/services/mercedes-oil-change-dubai', '/services/mercedes-oil-change-dubai/', '/services/oil-change-dubai', '/blog/best-oil-change-dubai-mercedes', '/services/mercedes-diagnostics-dubai', '/services/paint-protection-film', '/tuning', '/services/mercedes-mechanical-repair-dubai'];
for (const [i, path] of controls.entries()) for (const method of methods) cases.push({ key: `control-${i}-${method}`, group: 'control', url: origin + path, method, saveHtml: method === 'GET' });
const report = { stage, startedAt: new Date().toISOString(), readOnly: true, syntheticOnly: !!syntheticFixture, notAProductionPostDeploymentResult: !!syntheticFixture, scope: syntheticFixture ? 'OFFLINE synthetic response fixtures only; fetch replaced and cannot access network' : 'GET/HEAD only; no browser JavaScript; no forms; no configuration/API mutations; cookies excluded from saved headers', proposalSha256: hash(await readFile(resolve(root, 'routing/redirect-proposals.json'), 'utf8')), verifierSha256: hash(await readFile(fileURLToPath(import.meta.url), 'utf8')), baselinePath: baselinePath || null, cases: [], knownOutOfScopeObservations: [] };
console.log(`Read-only ${stage} capture: ${cases.length} cases, concurrency 4`);
report.cases = await pool(cases, follow);
report.infrastructure = [];
for (const path of ['/robots.txt', '/sitemap.xml']) {
  const { record, body } = await request(origin + path, 'GET');
  const name = path.slice(1);
  await writeFile(resolve(out, name), body);
  report.infrastructure.push({ ...record, file: name });
}
const home = report.cases.find(c => c.url === origin + '/' && c.method === 'GET')?.chain.at(-1);
const robots = await readFile(resolve(out, 'robots.txt'), 'utf8');
const sitemap = await readFile(resolve(out, 'sitemap.xml'), 'utf8');
report.robotsReview = { textSha256: hash(robots), text: robots, note: 'Human review of applicable User-agent groups required; simplified checks do not replace parsing all future robots policies.' };
report.assertions = [];
function check(name, pass, details = '') { report.assertions.push({ name, pass: !!pass, details }); }
for (const c of report.cases) {
  const first = c.chain[0], last = c.chain.at(-1);
  check(`${c.key}: complete safe chain`, c.chain.length > 0 && c.chain.every(r => r.status > 0) && !c.loop && !c.unsafeFollowTarget && !c.exceededHopLimit);
  if (c.group === 'protected-repair') {
    const path = new URL(c.url).pathname;
    const knownSlashFallback = ['/services/mercedes-service-dubai/', '/best-mercedes-workshop-dubai/'].includes(path);
    if (stage === 'pre') {
      if (knownSlashFallback) {
        report.knownOutOfScopeObservations.push({ url: c.url, method: c.method, chain: c.chain.map(r => ({ status: r.status, location: r.headers.location || null })), observation: 'Existing slash variant serves homepage after host/scheme normalization; excluded from these four proposed changes.' });
        check(`${c.key}: known existing slash fallback captured`, last?.status === 200 && (c.method === 'HEAD' || (last.mainTextSha256 === home?.mainTextSha256 && last.canonical?.[0] === origin + '/')));
      } else {
        check(`${c.key}: existing repair redirect`, first?.status === 301 && first.headers.location === c.expectedTarget && c.chain.length === 2 && last?.status === 200);
      }
    } else {
      const before = baseline.cases.find(b => b.url === c.url && b.method === c.method);
      const stable = rows => rows.map(r => ({ url: r.url, status: r.status, location: r.headers.location || null, xRobotsTag: r.headers['x-robots-tag'] || null, ...(r.status === 200 ? { title: r.title, h1: r.h1, canonical: r.canonical, robots: r.robots, mainTextSha256: r.mainTextSha256 } : {}) }));
      check(`${c.key}: existing repair behavior unchanged from preflight`, before && JSON.stringify(stable(c.chain)) === JSON.stringify(stable(before.chain)));
    }
  }
  if (['source', 'protected-oil'].includes(c.group)) {
    if (c.group === 'source' && stage === 'pre') {
      check(`${c.key}: legacy source still ends at homepage 200`, last?.status === 200 && (c.method === 'HEAD' || (last?.mainTextSha256 === home?.mainTextSha256 && last?.canonical?.length === 1 && last.canonical[0] === origin + '/')));
    } else {
      const expectedStatus = 308;
      check(`${c.key}: direct permanent redirect preserves raw query`, first?.status === expectedStatus && first?.headers.location === c.expectedTarget && c.chain.length === 2 && last?.url === c.expectedTarget && last?.status === 200, `Expected ${expectedStatus} ${c.expectedTarget}`);
      if (c.method === 'GET') check(`${c.key}: target canonical indexable`, last?.canonical?.length === 1 && last.canonical[0] === c.expectedTarget.split('?')[0] && !last.robots.some(v => /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(v)) && !/(?:noindex|none)/i.test(last.headers['x-robots-tag'] || ''));
    }
  }
  if (c.group === 'destination') {
    check(`${c.key}: destination direct 200`, c.chain.length === 1 && first?.status === 200);
    check(`${c.key}: no X-Robots-Tag exclusion`, !/(?:noindex|none)/i.test(first?.headers['x-robots-tag'] || ''));
    if (c.method === 'GET') {
      check(`${c.key}: single self-canonical indexable HTML`, first?.canonical?.length === 1 && first.canonical[0] === c.expectedCanonical && first.title && first.h1?.length === 1 && first.robots?.length && !first.robots.some(v => /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(v)) && first.mainTextSha256 !== home?.mainTextSha256);
      check(`${c.key}: canonical destination in sitemap`, sitemap.includes(`<loc>${c.expectedCanonical}</loc>`));
    }
  }
  if (c.group === 'control') {
    check(`${c.key}: control direct 200`, c.chain.length === 1 && first?.status === 200);
    if (c.method === 'GET') {
      const preferred = c.url === origin + '/' ? c.url : c.url.replace(/\/$/, '');
      check(`${c.key}: correct control page rather than homepage fallback`, first?.title && first.h1?.length === 1 && first.canonical?.length === 1 && first.canonical[0] === preferred && (c.url === origin + '/' || first.mainTextSha256 !== home?.mainTextSha256));
      check(`${c.key}: control remains technically indexable`, first.robots?.length > 0 && !first.robots.some(v => /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(v)) && !/(?:noindex|none)/i.test(first.headers['x-robots-tag'] || ''));
    }
    if (stage === 'post') {
      const before = baseline.cases.find(b => b.url === c.url && b.method === c.method)?.chain[0];
      check(`${c.key}: protected response unchanged`, before && first.status === before.status && first.headers.location === before.headers.location && first.headers['x-robots-tag'] === before.headers['x-robots-tag'] && (c.method === 'HEAD' || (first.title === before.title && JSON.stringify(first.h1) === JSON.stringify(before.h1) && JSON.stringify(first.canonical) === JSON.stringify(before.canonical) && JSON.stringify(first.robots) === JSON.stringify(before.robots) && first.mainTextSha256 === before.mainTextSha256)));
    }
  }
}
for (const item of report.infrastructure) check(`${item.file}: direct 200`, item.status === 200);
check('robots: current Googlebot/general Mercedes routes not disallowed', !/^\s*Disallow:\s*(?:\/\s*$|\/ar\/?\s*$|\/services\/?\s*$|\/ar\/services\/?\s*$)/im.test(robots), 'Also review robotsReview.text and applicable User-agent groups.');
if (stage === 'post') check('robots unchanged from preflight', hash(robots) === baseline.robotsReview?.textSha256);
report.finishedAt = new Date().toISOString();
report.summary = { cases: report.cases.length, networkRequests: syntheticFixture ? 0 : requests.length, ...(syntheticFixture ? { fixtureResponses: requests.length } : {}), assertions: report.assertions.length, passed: report.assertions.filter(a => a.pass).length, failed: report.assertions.filter(a => !a.pass).length, sourceCases: report.cases.filter(c => c.group === 'source').length, protectedOilCases: report.cases.filter(c => c.group === 'protected-oil').length };
const csv = rows => rows.map(row => row.map(v => '"' + String(v ?? '').replaceAll('"', '""') + '"').join(',')).join('\r\n') + '\r\n';
await writeFile(resolve(out, 'capture.json'), JSON.stringify(report, null, 2));
await writeFile(resolve(out, 'requests.json'), JSON.stringify(requests, null, 2));
await writeFile(resolve(out, 'cases.csv'), csv([['group', 'key', 'method', 'url', 'chain', 'final canonical', 'final main text sha256'], ...report.cases.map(c => [c.group, c.key, c.method, c.url, c.chain.map(r => `${r.status} ${r.headers.location || ''}`).join(' -> '), (c.chain.at(-1)?.canonical || []).join(' | '), c.chain.at(-1)?.mainTextSha256 || ''])]));
await writeFile(resolve(out, 'assertions.csv'), csv([['name', 'pass', 'details'], ...report.assertions.map(a => [a.name, a.pass, a.details])]));
console.log(JSON.stringify({ directory: relative(process.cwd(), out), ...report.summary, failures: report.assertions.filter(a => !a.pass) }, null, 2));
process.exitCode = report.summary.failed ? 1 : 0;
