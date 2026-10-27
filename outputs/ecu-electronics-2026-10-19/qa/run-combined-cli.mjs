import { spawnSync } from 'node:child_process';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const candidate = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);
if (!candidate.includes('ecu-electronics-2026-10-19') || candidate === path.resolve('.')) throw Error('An isolated release candidate directory is required');
await mkdir(output, { recursive: true });
const suiteDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(?=[A-Za-z]:)/, ''));
const checks = [
  ['production-build-19-steps', ['scripts/build-production-local.mjs']],
  ['typescript-app', ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.app.json']],
  ['typescript-node', ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.node.json']],
  ['eslint', ['node_modules/eslint/bin/eslint.js', '.']],
  ['master-seo', ['scripts/validate-master-seo.mjs']],
  ['bmw-hub', ['scripts/validate-bmw-hub.mjs']],
  ['paint-care-regression', ['scripts/validate-paint-care-cluster.mjs']],
  ['tuning-regression', ['scripts/validate-tuning.mjs']],
  ['routing-response-regression', ['scripts/test-routing-response.mjs']],
  ['brand-booking-form', ['outputs/repair-service-2026-10-19/qa/test-brand-form.mjs']],
  ['combined-service-seo', [path.join(suiteDir, 'validate-combined-static.mjs'), output]],
  ['diagnostics-ac-static', [path.join(suiteDir, 'validate-diagnostics-ac-static.mjs'), path.join(output, 'diagnostics-ac-regression')]],
  ['ecu-electronics-static', [path.join(suiteDir, 'validate-ecu-electronics-static.mjs'), output]],
];
const results = [];
for (const [name, args] of checks) {
  const started = Date.now();
  const result = spawnSync(process.execPath, args, { cwd: candidate, encoding: 'utf8', windowsHide: true, maxBuffer: 32 * 1024 * 1024, env: { ...process.env, TUNING_VALIDATION_OUTPUT_DIR: path.join(output, 'tuning') } });
  await writeFile(path.join(output, `${name}.log`), `${result.stdout || ''}\n${result.stderr || ''}${result.error ? '\n' + result.error.stack : ''}`);
  results.push({ name, command: [process.execPath, ...args], cwd: candidate, exitCode: result.status, passed: result.status === 0, seconds: (Date.now() - started) / 1000, log: path.join(output, `${name}.log`) });
  console.log(`${name}: ${result.status === 0 ? 'PASS' : 'FAIL'} (${results.at(-1).seconds}s)`);
  if (name === 'production-build-19-steps' && result.status !== 0) break;
}
let productionBuild = null;
try { productionBuild = JSON.parse(await readFile(path.join(candidate, 'release-qa.local/build-results.json'), 'utf8')); } catch { /* Captured by build result. */ }
await writeFile(path.join(output, 'combined-cli-results.json'), JSON.stringify({ checkedAt: new Date().toISOString(), candidate, passed: results.every(row => row.passed) && results.length === checks.length, expectedChecks: checks.length, productionBuild, results }, null, 2));
if (results.some(row => !row.passed) || results.length !== checks.length) process.exitCode = 1;
