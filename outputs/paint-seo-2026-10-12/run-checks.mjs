import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const output = 'outputs/paint-seo-2026-10-12/verification';
await mkdir(output, { recursive: true });
const checks = [
  ['lint', ['node_modules/eslint/bin/eslint.js', '.']],
  ['types-app', ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.app.json']],
  ['types-node', ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.node.json']],
  ['master-seo', ['scripts/validate-master-seo.mjs']],
  ['paint-care-cluster', ['scripts/validate-paint-care-cluster.mjs']],
];
const results = [];
for (const [name, args] of checks) {
  const result = spawnSync(process.execPath, args, { encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  await writeFile(`${output}/${name}.log`, `${result.stdout ?? ''}\n${result.stderr ?? ''}`);
  results.push({ name, exitCode: result.status });
  console.log(`${name}: ${result.status === 0 ? 'passed' : 'FAILED'}`);
  if (result.status !== 0) console.log(`${result.stdout ?? ''}\n${result.stderr ?? ''}`);
}
await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
if (results.some(result => result.exitCode !== 0)) process.exitCode = 1;
