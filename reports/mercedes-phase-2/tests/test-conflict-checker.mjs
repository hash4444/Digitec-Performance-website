// Synthetic fixtures only. Proves the offline after-state checker rejects
// protected-rule changes, bad placement and duplicate/extra new rules.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const fixtureDir = new URL('tests/fixtures/', root);
await mkdir(fixtureDir, { recursive: true });
const before = JSON.parse(await readFile(new URL('evidence/cloudflare/current-inventory.json', root), 'utf8'));
const proposal = JSON.parse(await readFile(new URL('routing/redirect-proposals.json', root), 'utf8'));
const added = proposal.rules.map((p, i) => ({ ...p.cloudflare_rule, enabled: true, id: `SYNTHETIC-NEW-${i + 1}` }));
const good = { syntheticFixture: true, notAProductionObservation: true, rules: [...before.rules.slice(0, 2), ...added, before.rules[2]] };
const wrongPlacement = { ...good, rules: [...before.rules, ...added] };
const oilChanged = structuredClone(good); oilChanged.rules[0].action_parameters.from_value.status_code = 301;
const queryLost = structuredClone(good); queryLost.rules[2].action_parameters.from_value.preserve_query_string = false;
const duplicate = structuredClone(good); duplicate.rules[3] = { ...duplicate.rules[2], id: 'SYNTHETIC-DUPLICATE' };
const checks = [
  ['valid-after', good, 0],
  ['www-before-new-rules', wrongPlacement, 1],
  ['protected-oil-changed', oilChanged, 1],
  ['query-preservation-lost', queryLost, 1],
  ['duplicated-new-source', duplicate, 1]
];
const results = [];
for (const [name, fixture, expected] of checks) {
  const url = new URL(`${name}.json`, fixtureDir);
  await writeFile(url, JSON.stringify(fixture, null, 2));
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('tests/check-redirect-conflicts.mjs', root)), `--after=${fileURLToPath(url)}`, '--no-report'], { encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, expected, name + '\n' + result.stderr);
  results.push({ test: name, expectedExitCode: expected, observedExitCode: result.status, passed: true });
}
await writeFile(new URL('routing/conflict-checker-test-results.json', root), JSON.stringify({ at: new Date().toISOString(), syntheticOnly: true, noProductionAfterStateWasCaptured: true, passed: results.length, results }, null, 2));
console.log('5/5 synthetic checker tests passed, including four negative cases; no production after-state is claimed.');
