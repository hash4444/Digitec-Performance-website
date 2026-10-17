import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
const output = 'outputs/ppf-phase3-4-2026-10-17';
await mkdir(output + '/qa', { recursive: true });
await writeFile(output + '/run-journeys.mjs', (await readFile('outputs/ppf-phase2-2026-10-17/run-journeys.mjs', 'utf8')).replaceAll('ppf-phase2-2026-10-17', 'ppf-phase3-4-2026-10-17').replaceAll('5198', '5199'));
const commands = [
  ['ppf-browser', ['scripts/test-ppf-browser.mjs', 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node', 'http://127.0.0.1:4173', '--prerendered']],
  ['paint-care-journeys', [output + '/run-journeys.mjs']],
];
const results = [];
for (const [name, args] of commands) {
  const start = Date.now();
  const result = spawnSync(process.execPath, args, { env: { ...process.env, QA_OUTPUT_DIR: output + '/browser' }, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024, windowsHide: true });
  await writeFile(output + '/qa/' + name + '.log', String(result.stdout || '') + String(result.stderr || ''));
  results.push({ name, exitCode: result.status, elapsedSeconds: (Date.now() - start) / 1000, error: result.error?.message || null });
  console.log(name + ': exit ' + result.status);
  if (result.status !== 0) console.error(String(result.stderr || result.error || result.stdout).slice(-6000));
}
await copyFile('paint-care-integration-qa.local/journey-results.json', output + '/qa/journey-results.json');
const build = JSON.parse(await readFile('release-qa.local/build-results.json', 'utf8'));
await writeFile(output + '/qa/browser-regression.json', JSON.stringify({ checkedAt: new Date().toISOString(), sourceSha256: build.sourceSha256, passed: results.every(result => result.exitCode === 0), results, scope: 'Local production HTML; external analytics, enquiry and other network requests blocked by test harnesses.' }, null, 2));
if (results.some(result => result.exitCode !== 0)) process.exitCode = 1;
