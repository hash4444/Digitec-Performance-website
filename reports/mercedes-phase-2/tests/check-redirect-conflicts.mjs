// Offline checks of saved functional rule definitions. Never calls an API.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const root = new URL('../', import.meta.url);
const option = n => process.argv.find(a => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const beforeFile = option('before');
const afterFile = option('after');
const inventoryText = await readFile(beforeFile ? resolve(beforeFile) : new URL('evidence/cloudflare/current-inventory.json', root), 'utf8');
const inventory = JSON.parse(inventoryText);
const proposal = JSON.parse(await readFile(new URL('routing/redirect-proposals.json', root), 'utf8'));
const originalOil = JSON.parse(await readFile(new URL('../../../cloudflare/single-redirects/mercedes-oil-alias-2026-10-21.json', import.meta.url), 'utf8'));
const protectedIds = ['5addb0c068414fb5b985a869ded26c68', 'dbe42693423442afbc3bab9b993242a7', '9781b1ef743f4ffbaadbe5cb3250eeca'];
const checks = [];
function check(name, actual, ...expectedValues) { const expected = expectedValues.length ? expectedValues[0] : true; assert.deepEqual(actual, expected, name); checks.push({ name, passed: true }); }
const functional = r => ({ description: r.description, enabled: r.enabled, expression: r.expression, action: r.action, action_parameters: r.action_parameters });
const digest = r => createHash('sha256').update(JSON.stringify(functional(r))).digest('hex');
check('Exactly the reviewed original three rule IDs in the reviewed order', inventory.rules.map(r => r.id), protectedIds);
check('Current count matches saved capacity', inventory.capacity.used, inventory.rules.length);
check('Four available rule slots', inventory.capacity.used + proposal.rules.length <= inventory.capacity.limit);
check('Protected English oil functional definition matches October 21 saved definition', functional(inventory.rules[0]), functional(originalOil));
const quoted = s => [...s.matchAll(/"([^"]+)"/g)].map(m => m[1]);
function compile(r) {
  const compound = r.expression.match(/^\(http\.host in \{([^}]+)\}\) and \(http\.request\.method in \{([^}]+)\}\) and \(http\.request\.uri\.path in \{([^}]+)\}\)$/);
  const pathOnly = r.expression.match(/^http\.request\.uri\.path in \{([^}]+)\}$/);
  const hostOnly = r.expression.match(/^\(http\.host eq "([^"]+)"\)$/);
  let accepts;
  if (compound) {
    const [hosts, methods, paths] = compound.slice(1).map(quoted);
    accepts = q => hosts.includes(q.host) && methods.includes(q.method) && paths.includes(q.path);
  } else if (pathOnly) accepts = q => quoted(pathOnly[1]).includes(q.path);
  else if (hostOnly) accepts = q => q.host === hostOnly[1];
  else throw new Error(`Unknown expression syntax for ${r.id || r.description}; review drift manually.`);
  const value = r.action_parameters?.from_value;
  check(`${r.id || r.description}: understood redirect action`, r.action, 'redirect');
  check(`${r.id || r.description}: supported static/dynamic target`, !!value?.target_url?.value || value?.target_url?.expression === 'concat("https://digitecme.com", http.request.uri.path)');
  return { ...r, accepts, output: q => ({ status: value.status_code, location: (value.target_url.value || ('https://digitecme.com' + q.path)) + (value.preserve_query_string ? q.query : '') }) };
}
const existing = inventory.rules.map(compile);
const proposed = proposal.rules.map(r => compile({ ...r.cloudflare_rule, id: `proposed:${r.key}`, enabled: true }));
const anchor = existing.findIndex(r => r.id === protectedIds[2]);
const planned = [...existing.slice(0, anchor), ...proposed, ...existing.slice(anchor)];
check('All original IDs retain relative order', planned.filter(r => protectedIds.includes(r.id)).map(r => r.id), protectedIds);
const first = (rules, q) => rules.find(r => r.enabled && r.accepts(q));
const overlaps = [];
for (const p of proposal.rules) for (const scheme of ['https', 'http']) for (const host of ['digitecme.com', 'www.digitecme.com']) for (const method of ['GET', 'HEAD']) for (const suffix of ['', '/']) for (const query of ['', '?utm_source=phase2', '?tag=a&tag=b&encoded=%2F%2B%26%3D&space=a%20b&plus=a+b&blank=']) {
  const request = { scheme, host, method, path: p.source + suffix, query };
  const hit = first(planned, request);
  check('Each reviewed source selects its intended new rule before every existing overlap', hit?.id, `proposed:${p.key}`);
  const output = hit.output(request);
  check('Permanent direct static destination and raw query', output, { status: 308, location: p.target + query });
  const target = new URL(output.location);
  check('No new/existing modeled rule matches the destination (no chain or loop)', first(planned, { scheme: target.protocol.slice(0, -1), host: target.hostname, method, path: target.pathname, query: target.search })?.id, undefined);
  const oldHit = first(existing, request);
  if (oldHit) {
    check('Only www canonicalization overlaps a proposed source', oldHit.id, protectedIds[2]);
    if (!overlaps.some(o => o.source === p.source)) overlaps.push({ source: p.source, existingRuleId: oldHit.id, scope: 'www requests', treatment: 'Place new exact rule before www; appending would add a host-normalization hop.' });
  }
}
for (const path of ['/', '/brands/mercedes-benz-service-dubai/oil-change', '/brands/mercedes-benz-service-dubai/oil-change/', '/services/mercedes-repair-dubai', '/services/mercedes-repair-dubai/', '/services/mercedes-service-dubai', '/services/mercedes-service-dubai/', '/best-mercedes-workshop-dubai', '/best-mercedes-workshop-dubai/', '/brands/mercedes-benz-service-dubai', '/services/mercedes-oil-change-dubai', '/ar/services/mercedes-oil-change-dubai', '/services/mercedes-body-repair-dubai', '/ar/services/mercedes-battery-replacement-dubai', '/ar/services/mercedes-mechanical-repair-dubai']) for (const host of ['digitecme.com', 'www.digitecme.com']) for (const method of ['GET', 'HEAD', 'POST']) {
  const q = { host, method, path, query: '?tag=a&tag=b' };
  check('Protected and target route selection unchanged in model', first(planned, q)?.id, first(existing, q)?.id);
}
let afterReview = null;
if (afterFile) {
  const after = JSON.parse(await readFile(resolve(afterFile), 'utf8'));
  const rules = after.rules || after.result?.rules;
  check('After-state contains exactly four additional rules', rules.length, inventory.rules.length + 4);
  check('All original IDs retain relative order after activation', rules.filter(r => protectedIds.includes(r.id)).map(r => r.id), protectedIds);
  for (const before of inventory.rules) check(`Original rule ${before.id} functional definition unchanged`, functional(rules.find(r => r.id === before.id)), functional(before));
  const added = rules.filter(r => !protectedIds.includes(r.id));
  check('All four new IDs are unique', new Set(added.map(r => r.id)).size, 4);
  for (const proposalRule of proposal.rules) {
    const candidates = added.filter(r => r.expression === proposalRule.cloudflare_rule.expression);
    check(`Exactly one new rule for ${proposalRule.key}`, candidates.length, 1);
    check(`${proposalRule.key} exact approved enabled definition`, functional(candidates[0]), functional({ ...proposalRule.cloudflare_rule, enabled: true }));
    const at = rules.findIndex(r => r.id === candidates[0].id);
    check(`${proposalRule.key} follows legacy Mercedes and precedes www`, at > rules.findIndex(r => r.id === protectedIds[1]) && at < rules.findIndex(r => r.id === protectedIds[2]));
  }
  afterReview = { file: afterFile, newRuleIds: added.map(r => r.id) };
}
const report = { at: new Date().toISOString(), offlineOnly: true, inventoryObservedAt: inventory.observedAt, inventorySha256: createHash('sha256').update(inventoryText).digest('hex'), status: 'passed functional offline checks; no live mutation', checksPassed: checks.length, protectedRules: inventory.rules.map(r => ({ id: r.id, functionalSha256: digest(r) })), proposedOrder: planned.map(r => r.id), overlaps, afterReview, otherchecks: inventory.otherchecks, limits: ['The dashboard transcription covers displayed functional fields, not hidden API ruleset/version metadata.', 'The model covers only the saved expressions and targets. It cannot prove the absence of uninspected features, origin changes or URL normalization effects.', 'Refresh authenticated configuration and HTTP preflight before activation; require post-deployment HTTP plus actual after-state comparison.'] };
if (!process.argv.includes('--no-report')) await writeFile(new URL(afterFile ? 'routing/after-conflict-check.json' : 'routing/conflict-check.json', root), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ checksPassed: checks.length, overlaps: overlaps.length, plannedOrder: report.proposedOrder, otherchecks: inventory.otherchecks, afterReview }, null, 2));
