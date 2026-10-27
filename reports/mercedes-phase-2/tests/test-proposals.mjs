// Local contract checks against the actual JSON expression sets. This models
// only these literal sets; Cloudflare must validate expressions and live order.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const proposalText = await readFile(new URL('routing/redirect-proposals.json', root), 'utf8');
const proposal = JSON.parse(proposalText);
const historicalOilText = await readFile(new URL('../../../cloudflare/single-redirects/mercedes-oil-alias-2026-10-21.json', import.meta.url), 'utf8');
const expected = [
  ['/ar/brands/mercedes-benz-service-dubai/oil-change', '/ar/services/mercedes-oil-change-dubai'],
  ['/brands/mercedes-benz-service-dubai/body-repair', '/services/mercedes-body-repair-dubai'],
  ['/ar/brands/mercedes-benz-service-dubai/battery-replacement', '/ar/services/mercedes-battery-replacement-dubai'],
  ['/ar/brands/mercedes-benz-service-dubai/mechanical-repair', '/ar/services/mercedes-mechanical-repair-dubai']
];
let count = 0;
function equal(a, b, msg) { assert.deepEqual(a, b, msg); count++; }
function ok(value, msg) { assert.ok(value, msg); count++; }
const shape = /^\(http\.host in \{([^}]+)\}\) and \(http\.request\.method in \{([^}]+)\}\) and \(http\.request\.uri\.path in \{([^}]+)\}\)$/;
const items = s => [...s.matchAll(/"([^"]+)"/g)].map(m => m[1]);
equal(proposal.rules.length, 4, 'Only four new rules');
const definitions = proposal.rules.map((r, i) => {
  equal([r.source, r.target], [expected[i][0], 'https://digitecme.com' + expected[i][1]], 'Approved mapping');
  const expression = shape.exec(r.cloudflare_rule.expression);
  ok(expression, 'Expression contains only host/method/path literal sets');
  const [hosts, methods, paths] = expression.slice(1).map(items);
  equal(hosts, ['digitecme.com', 'www.digitecme.com'], 'Host exact scope');
  equal(methods, ['GET', 'HEAD'], 'Read requests only');
  equal(paths, [r.source, r.source + '/'], 'Exactly slash and slashless');
  equal(r.cloudflare_rule.action, 'redirect', 'Redirect action');
  equal(r.cloudflare_rule.enabled, false, 'Disabled review definition');
  equal(r.cloudflare_rule.action_parameters, { from_value: { target_url: { value: r.target }, status_code: 308, preserve_query_string: true } }, 'Static permanent target and query preservation');
  ok(!('position' in r.cloudflare_rule), 'No stale account position automatically applied');
  return { ...r, hosts, methods, paths };
});
for (const [i, r] of proposal.rules.entries()) {
  const payload = JSON.parse(await readFile(new URL(`routing/rules/${i + 1}-${r.key}.json`, root), 'utf8'));
  equal(payload, { ...r.cloudflare_rule, position: { before: proposal.position.verified_www_rule_id } }, 'Individual disabled creation payload and verified insertion anchor');
}
function matches(r, request) { return r.hosts.includes(request.host) && r.methods.includes(request.method) && r.paths.includes(request.path); }
function route(request) { const hits = definitions.filter(r => matches(r, request)); equal(hits.length <= 1, true, 'No multiple new-rule matches'); return hits[0] ? hits[0].target + (request.query || '') : null; }
for (const r of definitions) for (const host of r.hosts) for (const method of r.methods) for (const path of r.paths) for (const query of ['', '?utm_source=phase2', '?tag=a&tag=b&encoded=%2F%2B%26%3D&space=a%20b&plus=a+b&blank=']) {
  const target = route({ host, method, path, query });
  equal(target, r.target + query, 'Exact destination and opaque query string');
  const targetUrl = new URL(target);
  equal(route({ host: targetUrl.hostname, method, path: targetUrl.pathname, query: targetUrl.search }), null, 'Target never re-enters new alias rules');
}
for (const r of definitions) {
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'get', 'TRACE']) equal(route({ host: 'digitecme.com', method, path: r.source }), null, 'Other methods untouched');
  for (const host of ['evil.example', 'digitecme.com.evil.example', 'shop.digitecme.com', 'notdigitecme.com', 'www.digitecme.com.evil.example']) equal(route({ host, method: 'GET', path: r.source }), null, 'Other hosts untouched');
  for (const path of [r.source + '//', r.source + '/child', r.source + '-extra', r.source.toUpperCase(), r.source.replace('/brands/', '/%62rands/'), r.source.replace('/brands/', '/brands//'), r.source.replace('/brands/', '/brands%2F'), r.source + '.html', r.source.replace('mercedes-benz', 'bmw')]) equal(route({ host: 'digitecme.com', method: 'GET', path }), null, 'Near paths untouched in literal-set model');
}
const controls = ['/', '/ar', '/brands/mercedes-benz-service-dubai', '/ar/brands/mercedes-benz-service-dubai', '/brands/mercedes-benz-service-dubai/oil-change', '/brands/mercedes-benz-service-dubai/oil-change/', '/ar/brands/mercedes-benz-service-dubai/body-repair', '/services/mercedes-oil-change-dubai', '/services/mercedes-oil-change-dubai/', '/services/mercedes-repair-dubai', '/services/mercedes-service-dubai', '/best-mercedes-workshop-dubai', '/services/oil-change-dubai', '/blog/best-oil-change-dubai-mercedes', '/services/mercedes-diagnostics-dubai', '/tuning', '/booking', '/services/paint-protection-film'];
for (const path of controls) for (const host of ['digitecme.com', 'www.digitecme.com']) for (const method of ['GET', 'HEAD']) equal(route({ host, method, path }), null, 'Protected route untouched');
const oldOil = JSON.parse(historicalOilText);
ok(!definitions.some(r => r.paths.some(p => oldOil.expression.includes(`"${p}"`))), 'New paths disjoint from protected English oil definition');
const result = { at: new Date().toISOString(), passed: count, failed: 0, proposalSha256: createHash('sha256').update(proposalText).digest('hex'), historicalProtectedEnglishOilDefinitionSha256: createHash('sha256').update(historicalOilText).digest('hex'), limits: ['Models the literal expression sets and query passthrough; not the Cloudflare engine, URL normalization or current account state.', 'GET/HEAD public matrix tests deployed behavior only after a separately approved activation.', 'No Cloudflare or deployment mutation performed.'] };
await writeFile(new URL('routing/local-test-results.json', root), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
