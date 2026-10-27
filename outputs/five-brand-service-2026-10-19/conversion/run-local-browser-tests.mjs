import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';

// Keep the production-aware preview and browser children inside one execution
// context, because Windows sandbox loopback is not shared with elevated Edge.
const output = 'outputs/five-brand-service-2026-10-19/conversion';
await mkdir(output, { recursive: true });
const runtimeModules = 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const base = 'http://127.0.0.1:5195';
const masterOnly = process.argv.includes('--master-only');
const serverLog = createWriteStream(`${output}/local-preview.log`);
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', '5195'], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
server.stdout.pipe(serverLog, { end: false });
server.stderr.pipe(serverLog, { end: false });
let serverExited = false;
server.on('exit', () => { serverExited = true; });
const results = [];

async function run(name, args, filename) {
  console.log(`Running ${name}`);
  const log = createWriteStream(`${output}/${filename}`);
  const child = spawn(process.execPath, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.pipe(log, { end: false });
  child.stderr.pipe(log, { end: false });
  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', resolve);
  });
  await new Promise(resolve => log.end(resolve));
  results.push({ name, exitCode, log: `${output}/${filename}` });
  console.log(`${name}: exit ${exitCode}`);
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    if (serverExited) throw new Error('Local preview exited before becoming ready');
    try {
      const response = await fetch(`${base}/brands/bmw-service-dubai`, { signal: AbortSignal.timeout(1000) });
      if (response.status === 200) { ready = true; break; }
    } catch { /* Wait for the child to start listening. */ }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  if (!ready) throw new Error('Local preview did not become reachable');
  console.log(`Preview ready: ${base}`);
  if (!masterOnly) await run('focused five-brand browser', [`${output}/test-five-brand-browser.mjs`, base], 'focused-browser.log');
  await run('existing master SEO browser', ['scripts/test-master-seo-browser.mjs', runtimeModules, base], 'existing-browser.log');
} catch (error) {
  results.push({ name: 'orchestration', exitCode: 1, error: error.message });
  console.error(error.message);
} finally {
  server.kill();
  await new Promise(resolve => serverExited ? resolve() : server.once('exit', resolve));
  await new Promise(resolve => serverLog.end(resolve));
  await writeFile(`${output}/browser-orchestration-results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), base, serverStopped: true, results }, null, 2));
}
console.log(JSON.stringify(results, null, 2));
if (results.some(result => result.exitCode !== 0)) process.exitCode = 1;
