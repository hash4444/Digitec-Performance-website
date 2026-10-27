// Test-only fetch replacement. No fallback to the real network exists.
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
const arg = name => process.argv.find(v => v.startsWith(`--${name}=`))?.slice(name.length + 3);
const fixturePath = arg('synthetic-fixture');
if (!fixturePath) throw new Error('Offline preloader requires --synthetic-fixture=<passing pre capture>');
const fixtureDir = dirname(resolve(fixturePath));
const fixture = JSON.parse(await readFile(resolve(fixturePath), 'utf8'));
const requests = JSON.parse(await readFile(resolve(fixtureDir, 'requests.json'), 'utf8'));
const proposal = JSON.parse(await readFile(new URL('../../routing/redirect-proposals.json', import.meta.url), 'utf8'));
const pageBodies = new Map();
for (const c of fixture.cases) for (const row of c.chain) if (row.htmlFile) pageBodies.set(row.url, await readFile(resolve(fixtureDir, row.htmlFile), 'utf8'));
pageBodies.set('https://digitecme.com/robots.txt', await readFile(resolve(fixtureDir, 'robots.txt'), 'utf8'));
pageBodies.set('https://digitecme.com/sitemap.xml', await readFile(resolve(fixtureDir, 'sitemap.xml'), 'utf8'));
globalThis.__mercedesPhase2OfflineFixture = true;
globalThis.fetch = async (input, options = {}) => {
  const url = String(input), method = options.method || 'GET';
  const u = new URL(url);
  const rule = proposal.rules.find(r => u.pathname === r.source || u.pathname === r.source + '/');
  if (rule) {
    const query = arg('fixture-scenario') === 'drop-query' ? '' : u.search;
    return new Response(method === 'HEAD' ? null : '<title>Offline synthetic 308</title>', { status: 308, headers: { 'content-type': 'text/html', location: rule.target + query } });
  }
  const row = requests.find(r => r.url === url && r.method === method) || requests.find(r => r.url === u.origin + u.pathname && r.method === method);
  if (!row) throw new Error(`Offline fixture has no response for ${method} ${url}; network is disabled.`);
  let body = '';
  if (method === 'GET') {
    if ([301, 302, 303, 307, 308].includes(row.status)) body = '<title>Offline synthetic existing redirect</title>';
    else body = pageBodies.get(url) || pageBodies.get(u.origin + u.pathname) || pageBodies.get(row.canonical?.[0]);
    if (body === undefined) throw new Error(`Offline fixture lacks body for ${url}; network is disabled.`);
  }
  return new Response(method === 'HEAD' ? null : body, { status: row.status, headers: row.headers });
};
