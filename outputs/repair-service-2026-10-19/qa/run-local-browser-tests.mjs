import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Keep the production router preview and Edge processes in the same execution
// boundary. Parent must finish the final production build before running this.
const output = 'outputs/repair-service-2026-10-19/qa';
const base = 'http://127.0.0.1:5196';
const masterOnly = process.argv.includes('--master-only');
const runtimeModules = 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
await mkdir(output, { recursive: true });
const log = createWriteStream(`${output}/local-preview.log`);
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', '5196'], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
server.stdout.pipe(log, { end: false });
server.stderr.pipe(log, { end: false });
let serverExited = false;
server.on('exit', () => { serverExited = true; });
const results = [];
async function run(name, args, filename) {
  console.log(`Running ${name}`);
  const childLog = createWriteStream(`${output}/${filename}`);
  const child = spawn(process.execPath, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.pipe(childLog, { end: false });
  child.stderr.pipe(childLog, { end: false });
  const exitCode = await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', resolve); });
  await new Promise(resolve => childLog.end(resolve));
  results.push({ name, exitCode, log: `${output}/${filename}` });
  console.log(`${name}: exit ${exitCode}`);
}
try {
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    if (serverExited) throw Error('Local production preview exited before readiness');
    try {
      if ((await fetch(`${base}/services/mercedes-mechanical-repair-dubai`, { signal: AbortSignal.timeout(1000) })).status === 200) { ready = true; break; }
    } catch { /* Child server startup only. */ }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  if (!ready) throw Error('Local production preview did not become reachable');
  console.log(`Production router preview ready: ${base}`);
  if (!masterOnly) await run('focused repair browser', [`${output}/test-repair-browser.mjs`, base, `${output}/browser`], 'focused-browser.log');
  await run('existing master SEO browser', ['scripts/test-master-seo-browser.mjs', runtimeModules, base], 'existing-master-browser.log');
  // Copy only this suite's current report and referenced screenshots. The parent
  // restores the globally shared output tree from its pre-sprint snapshot.
  const masterSource = 'outputs/seo-2026-09-16/browser';
  const masterTarget = `${output}/existing-master-browser`;
  await mkdir(masterTarget, { recursive: true });
  const masterReport = JSON.parse(await readFile(`${masterSource}/browser-results.json`, 'utf8'));
  await copyFile(`${masterSource}/browser-results.json`, `${masterTarget}/browser-results.raw.json`);
  for (const file of masterReport.screenshots || []) await copyFile(file, `${masterTarget}/${path.basename(file)}`);
  masterReport.screenshots = (masterReport.screenshots || []).map(file => `${masterTarget}/${path.basename(file)}`);
  masterReport.originalReport = `${masterTarget}/browser-results.raw.json`;
  await writeFile(`${masterTarget}/browser-results.json`, JSON.stringify(masterReport, null, 2));
} catch (error) {
  results.push({ name: 'orchestration', exitCode: 1, error: error.message });
  console.error(error.message);
} finally {
  server.kill();
  await new Promise(resolve => serverExited ? resolve() : server.once('exit', resolve));
  await new Promise(resolve => log.end(resolve));
  await writeFile(`${output}/browser-orchestration-results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), base, serverStopped: true, results }, null, 2));
}
console.log(JSON.stringify(results, null, 2));
if (results.some(result => result.exitCode !== 0)) process.exitCode = 1;
