import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../../..');
const candidatePath = 'outputs/mercedes-oil-routing-2026-10-21/proposal/single-redirect-rule.json';
const baselinePath = 'outputs/mercedes-oil-routing-2026-10-21/proposal/observed-single-redirect-baseline.json';
const candidateBytes = await readFile(path.join(root, candidatePath));
const baselineBytes = await readFile(path.join(root, baselinePath));
const candidate = JSON.parse(candidateBytes);
const baseline = JSON.parse(baselineBytes);
const expected = {
  description: 'Mercedes oil change legacy URLs to existing service',
  expression: '(http.host in {"digitecme.com" "www.digitecme.com"}) and (http.request.method in {"GET" "HEAD"}) and (http.request.uri.path in {"/brands/mercedes-benz-service-dubai/oil-change" "/brands/mercedes-benz-service-dubai/oil-change/"})',
  action: 'redirect',
  action_parameters: { from_value: { target_url: { value: 'https://digitecme.com/services/mercedes-oil-change-dubai' }, status_code: 308, preserve_query_string: true } },
  enabled: true,
  position: { before: 'dbe42693423442afbc3bab9b993242a7' },
};
assert.deepEqual(candidate, expected, 'Candidate must equal the exact reviewed rule, without extra scope or replacement fields');
assert.equal(baseline.rules.length, 2);
assert.equal(baseline.account_id, 'ae62fc81b63f3450e5ab4b63b7b7ece4');
assert.equal(baseline.zone_name, 'digitecme.com');
assert.equal(baseline.phase, 'http_request_dynamic_redirect');
assert.deepEqual(baseline.rules.map(r => r.id), ['dbe42693423442afbc3bab9b993242a7', '9781b1ef743f4ffbaadbe5cb3250eeca']);
assert.deepEqual(baseline.rules.map(r => r.observed_order), [1, 2]);
assert.equal(candidate.position.before, baseline.rules[0].id);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const files = [];
async function walk(relative) {
  for (const item of await readdir(path.join(root, relative), { withFileTypes: true })) {
    const next = path.posix.join(relative, item.name);
    if (item.isDirectory()) await walk(next);
    else if (item.isFile()) files.push({ file: next, sha256: hash(await readFile(path.join(root, next))) });
  }
}
for (const folder of ['src', 'public', 'scripts', 'cloudflare']) await walk(folder);
files.sort((a, b) => a.file.localeCompare(b.file));
const builtService = 'outputs/mercedes-oil-investigation-2026-10-21/qa/build/dist/services/mercedes-oil-change-dubai/index.html';
const additional = [candidatePath, baselinePath, builtService, 'package.json'];
for (const file of additional) files.push({ file, sha256: hash(await readFile(path.join(root, file))) });
await mkdir(directory, { recursive: true });
const manifest = { capturedAt: new Date().toISOString(), protectedSourceCount: files.length - additional.length, additionalCount: additional.length, files };
const beforePath = path.join(directory, 'protected-files-before.json');
if (process.argv.includes('--after')) {
  const before = JSON.parse(await readFile(beforePath, 'utf8'));
  const changed = files.filter(current => !before.files.some(old => old.file === current.file && old.sha256 === current.sha256));
  const missing = before.files.filter(old => !files.some(current => current.file === old.file));
  const comparison = { comparedAt: manifest.capturedAt, sourceCount: manifest.protectedSourceCount, filesCompared: files.length, changed, missing, unchanged: changed.length === 0 && missing.length === 0 };
  await writeFile(path.join(directory, 'protected-files-after.json'), JSON.stringify(manifest, null, 2));
  await writeFile(path.join(directory, 'protected-file-comparison.json'), JSON.stringify(comparison, null, 2));
  assert.ok(comparison.unchanged, JSON.stringify(comparison));
  console.log(JSON.stringify(comparison));
} else {
  await writeFile(beforePath, JSON.stringify(manifest, null, 2));
  const review = {
    reviewedAt: manifest.capturedAt, passed: true, candidatePath, candidateSha256: hash(candidateBytes), baselinePath, baselineSha256: hash(baselineBytes),
    exactReviewedDefinition: true, oneNewRuleOnly: true, existingRulesCount: 2, intendedInsertBefore: candidate.position.before,
    existingIds: baseline.rules.map(r => r.id), preservesIndexedSlashServicePath: true, protectedSourceFiles: manifest.protectedSourceCount,
    limitation: 'Saved baseline only; root must refresh authenticated production state and verify no drift before activation. Local review does not establish live activation, Cloudflare compilation, or HTTP cross-phase precedence.',
  };
  await writeFile(path.join(directory, 'candidate-review.json'), JSON.stringify(review, null, 2));
  console.log(JSON.stringify(review));
}
