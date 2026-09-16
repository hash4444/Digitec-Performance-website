import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
const directory = 'outputs/seo-2026-09-16';
const checks = [
  ['TypeScript app', 'node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.app.json'],
  ['TypeScript node', 'node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.node.json'],
  ['ESLint', 'node_modules/eslint/bin/eslint.js', '.'],
  ['Master SEO', 'scripts/validate-master-seo.mjs'],
  ['BMW hub', 'scripts/validate-bmw-hub.mjs'],
];
const results = [];
for (const [name, ...args] of checks) {
  const result = spawnSync(process.execPath, args, { encoding: 'utf8', windowsHide: true });
  const log = `${directory}/${name.toLowerCase().replaceAll(' ', '-')}.log`;
  await writeFile(log, (result.stdout ?? '') + (result.stderr ?? ''));
  results.push({ name, command: `node ${args.join(' ')}`, exitCode: result.status, log });
  console.log(`${name}: ${result.status === 0 ? 'passed' : 'FAILED'}${name === 'ESLint' ? ' (see log for existing warnings)' : ''}`);
}
const report = { checkedAt: new Date().toISOString(), passed: results.every(result => result.exitCode === 0), results };
await writeFile(`${directory}/validation-results.json`, JSON.stringify(report, null, 2) + '\n');
if (!report.passed) process.exitCode = 1;
