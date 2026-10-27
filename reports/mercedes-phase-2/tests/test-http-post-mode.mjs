// Exercises the real post CLI offline. SYNTHETIC evidence is explicitly marked.
import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const baseline = process.argv.find(a => a.startsWith('--baseline='))?.slice(11);
if (!baseline) throw new Error('Pass --baseline=<latest passing real pre capture>');
const common = ['--import', new URL('tests/fixtures/offline-fetch-preloader.mjs', root).href, fileURLToPath(new URL('tests/verify-http.mjs', root)), '--stage=post', `--baseline=${resolve(baseline)}`, `--synthetic-fixture=${resolve(baseline)}`];
const results = [];
for (const [name, additional, expected] of [['valid-offline-post', [], 0], ['lost-query-negative', ['--fixture-scenario=drop-query'], 1]]) {
  const r = spawnSync(process.execPath, [...common, ...additional], { encoding: 'utf8', windowsHide: true });
  assert.equal(r.status, expected, `${name}\n${r.stdout}\n${r.stderr}`);
  const output = JSON.parse(r.stdout.slice(r.stdout.indexOf('\n{') + 1));
  results.push({ test: name, expectedExitCode: expected, observedExitCode: r.status, passed: true, ...Object.fromEntries(Object.entries(output).filter(([key]) => key !== 'failures')) });
}
const bad = { syntheticOnly: true, stage: 'pre', summary: { failed: 0 }, proposalSha256: 'SYNTHETIC-MISMATCH' };
const badPath = fileURLToPath(new URL('tests/fixtures/mismatched-proposal-baseline.json', root));
await writeFile(badPath, JSON.stringify(bad, null, 2));
const guard = spawnSync(process.execPath, common.map(a => a.startsWith('--baseline=') ? `--baseline=${badPath}` : a), { encoding: 'utf8', windowsHide: true });
assert.equal(guard.status, 1);
assert.match(guard.stderr, /Baseline must be a passing preflight for this exact proposal file/);
results.push({ test: 'mismatched-proposal-baseline-guard', expectedExitCode: 1, observedExitCode: guard.status, passed: true });
await writeFile(new URL('routing/http-post-mode-test-results.json', root), JSON.stringify({ at: new Date().toISOString(), syntheticOnly: true, noNetworkRequests: true, noProductionDeploymentOrPostDeploymentResult: true, passed: results.length, results }, null, 2));
console.log('3/3 offline post-mode tests passed: valid fixture, query-loss rejection, baseline mismatch guard. No production post-deployment test was run.');
