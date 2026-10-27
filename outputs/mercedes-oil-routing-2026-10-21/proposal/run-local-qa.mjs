import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const proposal = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(proposal, '../../..');
const build = path.join(root, 'outputs/mercedes-oil-investigation-2026-10-21/qa/build');
const logs = path.join(proposal, 'qa-logs');
await mkdir(logs, { recursive: true });
async function fingerprint(base, folders) {
  const records = [];
  async function walk(relative) {
    for (const item of await readdir(path.join(base, relative), { withFileTypes: true })) {
      const next = path.posix.join(relative, item.name);
      if (item.isDirectory()) await walk(next);
      else if (item.isFile()) records.push({ file: next, sha256: createHash('sha256').update(await readFile(path.join(base, next))).digest('hex') });
    }
  }
  for (const folder of folders) await walk(folder);
  return records.sort((a, b) => a.file.localeCompare(b.file));
}
const protectedFolders = ['src', 'public', 'scripts', 'cloudflare'];
const before = await fingerprint(root, protectedFolders);
await writeFile(path.join(proposal, 'source-hashes-before.json'), JSON.stringify(before, null, 2));
const rootSource = await fingerprint(root, ['src']);
const builtSource = await fingerprint(build, ['src']);
assert.deepEqual(builtSource, rootSource, 'Previous isolated build source must match current source');
const targetRelative = 'dist/services/mercedes-oil-change-dubai/index.html';
const targetBefore = createHash('sha256').update(await readFile(path.join(build, targetRelative))).digest('hex');
const steps = [
  ['test-single-redirect.mjs', proposal],
  ['scripts/test-hosting-rules.mjs', build],
  ['scripts/test-production-seo-router.mjs', build],
  ['scripts/test-routing-response.mjs', build],
  ['scripts/validate-seo.mjs', build],
  ['scripts/validate-oil-change.mjs', build],
  ['scripts/validate-master-seo.mjs', build],
  ['scripts/validate-query-release.mjs', build],
  ['scripts/validate-protection-release.mjs', build],
  ['scripts/validate-ppf.mjs', build],
  ['scripts/validate-tuning.mjs', build],
  ['scripts/validate-paint-care-cluster.mjs', build],
];
const result = { testedAt: new Date().toISOString(), mode: 'Alias-only Cloudflare Single Redirect proposal; source unchanged; existing matching-source isolated build reused', priorFullBuild: '../..//mercedes-oil-investigation-2026-10-21/qa/qa-results.json', sourceMatchesPriorBuild: true, steps: [] };
for (const [index, [script, cwd]] of steps.entries()) {
  const started = Date.now();
  const run = spawnSync(process.execPath, [script], { cwd, encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  const log = `qa-logs/${String(index + 1).padStart(2, '0')}-${path.basename(script, '.mjs')}.log`;
  await writeFile(path.join(proposal, log), `${run.stdout || ''}\n${run.stderr || ''}${run.error ? '\n' + run.error.message : ''}`);
  result.steps.push({ command: `node ${script}`, cwd, exitCode: run.status, seconds: (Date.now() - started) / 1000, log });
  console.log(`${run.status === 0 ? 'PASS' : 'FAIL'} ${script}`);
}
const targetAfter = createHash('sha256').update(await readFile(path.join(build, targetRelative))).digest('hex');
result.serviceHtmlSha256Before = targetBefore;
result.serviceHtmlSha256After = targetAfter;
result.serviceHtmlUnchanged = targetBefore === targetAfter;
const after = await fingerprint(root, protectedFolders);
await writeFile(path.join(proposal, 'source-hashes-after.json'), JSON.stringify(after, null, 2));
result.sourceFilesCompared = before.length;
result.sourceUnchanged = JSON.stringify(before) === JSON.stringify(after);
result.failures = result.steps.filter(step => step.exitCode !== 0);
result.passed = result.failures.length === 0 && result.sourceUnchanged && result.serviceHtmlUnchanged;
result.limits = ['Offline rule simulation is not Cloudflare expression compilation or feature-precedence validation.', 'No live rule was created or activated.', 'Always Use HTTPS is ON; actual cross-phase HTTP chain behavior must be verified after separate authorization.', 'Matching-source prior full build reused; no full rebuild necessary for a rules-only local proposal.'];
await writeFile(path.join(proposal, 'qa-results.json'), JSON.stringify(result, null, 2));
assert.ok(result.passed, JSON.stringify({ failures: result.failures, sourceUnchanged: result.sourceUnchanged, serviceHtmlUnchanged: result.serviceHtmlUnchanged }));
console.log(`All ${steps.length} local checks passed; ${before.length} protected source files unchanged; service HTML unchanged.`);
