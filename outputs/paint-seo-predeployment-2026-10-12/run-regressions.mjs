import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const output = path.resolve('outputs/paint-seo-predeployment-2026-10-12');
const workspace = path.join(output, 'build.local');
const deps = 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node';
const base = 'http://127.0.0.1:5292';
await mkdir(path.join(output, 'regressions'), { recursive: true });
const checks = [
  ['lint', ['node_modules/eslint/bin/eslint.js', '.']],
  ['types-app', ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.app.json']],
  ['types-node', ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.node.json']],
  ['master-seo', ['scripts/validate-master-seo.mjs']],
  ['paint-care-cluster', ['scripts/validate-paint-care-cluster.mjs']],
  ['browser-routing', ['scripts/test-protection-release-browser.mjs', deps, base]],
  ['browser-journeys', ['scripts/test-paint-care-journeys.mjs', deps, base]],
  ['browser-ppf', ['scripts/test-ppf-browser.mjs', deps, base]],
  ['browser-ceramic', ['scripts/test-ceramic-browser.mjs', deps, base, 'dist']],
  ['browser-polishing', ['scripts/test-paint-correction-browser.mjs', deps, base]],
];
const results = [];
for (const [name, args] of checks) {
  const result = spawnSync(process.execPath, args, { cwd: workspace, encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024, env: { ...process.env, QA_OUTPUT_DIR: path.join(output, 'regressions', name) } });
  await writeFile(path.join(output, 'regressions', `${name}.log`), `${result.stdout ?? ''}\n${result.stderr ?? ''}`);
  results.push({ name, exitCode: result.status, error: result.error?.message });
  await writeFile(path.join(output, 'regressions/results.json'), JSON.stringify(results, null, 2));
  console.log(`${name}: ${result.status === 0 ? 'passed' : 'FAILED'}`);
  if (result.status !== 0) console.log(`${result.stdout ?? ''}\n${result.stderr ?? ''}`);
}
if (results.some(result => result.exitCode !== 0)) process.exitCode = 1;
