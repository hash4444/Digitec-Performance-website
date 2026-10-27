import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const directory = path.dirname(fileURLToPath(import.meta.url));
const proposed = JSON.parse(await readFile(path.join(directory, 'single-redirect-rule.json'), 'utf8'));
const baseline = JSON.parse(await readFile(path.join(directory, 'observed-single-redirect-baseline.json'), 'utf8'));
const prior = baseline.rules;
const priorDigest = JSON.stringify(prior);
let assertions = 0;
const check = (actual, expected, note) => { assert.deepEqual(actual, expected, note); assertions++; };

// Deliberately limited semantic model. This does not compile the Cloudflare
// expression or validate Cloudflare's cross-phase/URL-normalization behavior.
function matches(expression, request) {
  const url = new URL(request.url);
  const fields = { 'http.host': url.hostname, 'http.request.method': request.method, 'http.request.uri.path': url.pathname };
  return expression.split(/\s+and\s+/).every(raw => {
    const clause = raw.trim().replace(/^\(/, '').replace(/\)$/, '');
    const member = clause.match(/^(http\.(?:host|request\.method|request\.uri\.path)) in \{(.*)\}$/);
    if (member) return [...member[2].matchAll(/"([^"\\]*)"/g)].some(match => fields[member[1]] === match[1]);
    const equals = clause.match(/^(http\.(?:host|request\.method|request\.uri\.path)) eq "([^"\\]*)"$/);
    if (equals) return fields[equals[1]] === equals[2];
    throw new Error(`Unsupported model expression: ${clause}`);
  });
}
function evaluate(rules, request) {
  for (const rule of rules) {
    if (rule.enabled === false || !matches(rule.expression, request)) continue;
    const value = rule.action_parameters.from_value;
    let destination = value.target_url.value;
    if (!destination) {
      assert.equal(value.target_url.expression, 'concat("https://digitecme.com", http.request.uri.path)');
      destination = `https://digitecme.com${new URL(request.url).pathname}`;
    }
    if (value.preserve_query_string) destination += new URL(request.url).search;
    return { outcome: 'redirect', rule: rule.id || 'proposed', status: value.status_code, destination };
  }
  return { outcome: 'origin', url: request.url, method: request.method };
}
function follow(rules, request) {
  const visited = new Set();
  const hops = [];
  for (let count = 0; count < 8; count++) {
    if (visited.has(request.url)) throw new Error(`Loop: ${request.url}`);
    visited.add(request.url);
    const result = evaluate(rules, request);
    if (result.outcome === 'origin') return { hops, final: result };
    hops.push(result);
    request = { ...request, url: result.destination };
  }
  throw new Error('Unexpected redirect chain');
}
check(proposed.position, { before: prior[0].id }, 'Insert before observed first rule');
check(proposed.action, 'redirect');
check(proposed.enabled, true);
check(proposed.action_parameters.from_value.status_code, 308);
check(proposed.action_parameters.from_value.preserve_query_string, true);
check(proposed.action_parameters.from_value.target_url, { value: 'https://digitecme.com/services/mercedes-oil-change-dubai' });
check(Object.hasOwn(proposed, 'id'), false, 'No invented new rule ID');
const candidate = [proposed, ...prior];
const aliases = ['/brands/mercedes-benz-service-dubai/oil-change', '/brands/mercedes-benz-service-dubai/oil-change/'];
const queries = ['', '?utm_source=google', '?tag=a&tag=b&gclid=oil-routing-qa&gbraid=sample&wbraid=sample', '?text=a%20b&plus=a+b&encoded=%2F%3F%26%3D&empty=&flag', '?utm_source=&utm_source=second&x=%E2%9C%93&esc=%25'];
const cases = [];
let redirectCases = 0;
for (const scheme of ['http', 'https']) for (const host of ['digitecme.com', 'www.digitecme.com']) for (const method of ['GET', 'HEAD']) for (const alias of aliases) for (const query of queries) {
  const request = { url: `${scheme}://${host}${alias}${query}`, method };
  const result = evaluate(candidate, request);
  const expected = `https://digitecme.com/services/mercedes-oil-change-dubai${query}`;
  check(result, { outcome: 'redirect', rule: 'proposed', status: 308, destination: expected }, request.url);
  check(new URL(result.destination).search, new URL(request.url).search, 'Query unchanged');
  const chain = follow(candidate, request);
  check(chain.hops.length, 1, 'One Single Redirect hop including www');
  check(chain.final, { outcome: 'origin', url: expected, method }, 'Final owner passes to origin');
  redirectCases++;
  cases.push({ ...request, result, redirectHopsInObservedSingleRules: chain.hops.length });
}
const unrelated = ['/', '/services/mercedes-oil-change-dubai', '/services/mercedes-oil-change-dubai/', '/services/oil-change-dubai', '/blog/best-oil-change-dubai-mercedes', '/brands/mercedes-benz-service-dubai', '/services/mercedes-diagnostics-dubai', '/services/paint-protection-film', '/tuning', '/ar/services/mercedes-oil-change-dubai', '/ar/brands/mercedes-benz-service-dubai/oil-change', '/brands/mercedes-benz-service-dubai/oil-change-extra', '/brands/mercedes-benz-service-dubai/oil-change/subpath', '/brands/mercedes-benz-service-dubai/Oil-Change', '/brands/mercedes-benz-service-dubai//oil-change', '/robots.txt', '/sitemap.xml', '/assets/main.js', '/functions/contact', '/services/mercedes-repair-dubai', '/services/mercedes-repair-dubai/', '/services/mercedes-service-dubai', '/best-mercedes-workshop-dubai'];
let unchangedCases = 0;
for (const scheme of ['http', 'https']) for (const host of ['digitecme.com', 'www.digitecme.com']) for (const method of ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) for (const pathname of unrelated) for (const query of ['', '?tag=a&tag=b&gclid=sample']) {
  const request = { url: `${scheme}://${host}${pathname}${query}`, method };
  check(evaluate(candidate, request), evaluate(prior, request), 'Unrelated behavior equals observed baseline');
  unchangedCases++;
}
let excludedAliasCases = 0;
for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'TRACE']) for (const host of ['digitecme.com', 'www.digitecme.com']) for (const alias of aliases) {
  const request = { method, url: `https://${host}${alias}?tag=a&tag=b` };
  check(evaluate(candidate, request), evaluate(prior, request), 'Mutation follows existing baseline, not proposed rule');
  excludedAliasCases++;
}
for (const host of ['example.com', 'digitecme.com.example.com', 'sub.digitecme.com']) for (const method of ['GET', 'HEAD']) for (const alias of aliases) {
  const request = { method, url: `https://${host}${alias}?gclid=sample` };
  check(evaluate(candidate, request), evaluate(prior, request), 'Other host unaffected');
  excludedAliasCases++;
}
for (const pathname of ['/services/mercedes-oil-change-dubai', '/services/mercedes-oil-change-dubai/']) for (const method of ['GET', 'HEAD']) {
  check(evaluate(candidate, { method, url: `https://digitecme.com${pathname}?tag=a&tag=b` }).outcome, 'origin', 'Both service forms retained');
}
check(JSON.stringify(prior), priorDigest, 'Existing baseline rules never modified');
const misplaced = [...prior, proposed];
check(follow(misplaced, { method: 'GET', url: `https://www.digitecme.com${aliases[0]}?tag=a&tag=b` }).hops.length, 2, 'Negative order control exposes www chain');
check(follow(candidate, { method: 'GET', url: `https://www.digitecme.com${aliases[0]}?tag=a&tag=b` }).hops.length, 1, 'First-position proposal removes that modeled chain');
await writeFile(path.join(directory, 'routing-test-cases.json'), JSON.stringify(cases, null, 2));
await writeFile(path.join(directory, 'routing-test-results.json'), JSON.stringify({ testedAt: new Date().toISOString(), passed: true, redirectCases, unchangedCases, excludedAliasCases, assertions, existingRulesPreserved: true, targetFormsPassedThrough: true, noChainsOrLoopsInObservedSingleRedirectModel: true, limitation: 'Offline semantic model only; not Cloudflare compilation, live activation, cross-phase redirect order, or URL normalization verification. Existing www rule can still redirect mutation requests unchanged from baseline.' }, null, 2));
console.log(`PASS: ${redirectCases} exact redirect cases, ${unchangedCases} unchanged baseline cases, ${excludedAliasCases} excluded alias/host cases; ${assertions} assertions.`);
