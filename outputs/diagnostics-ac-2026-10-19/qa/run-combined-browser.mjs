import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const candidate = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);
if (!candidate.includes('diagnostics-ac-2026-10-19') || candidate === path.resolve('.')) throw Error('An isolated release candidate is required');
await mkdir(output, { recursive: true });
const runtime = 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const preload = path.join(path.dirname(fileURLToPath(import.meta.url)), 'browser-safety-preload.mjs');
const results = [];
async function suite(name, args, env = {}) {
  const started = Date.now();
  const logPath = path.join(output, `${name}.log`);
  const log = createWriteStream(logPath);
  const child = spawn(process.execPath, ['--import', pathToFileURL(preload).href, ...args], { cwd: candidate, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, ...env } });
  child.stdout.pipe(log, { end: false }); child.stderr.pipe(log, { end: false });
  const exitCode = await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', resolve); });
  await new Promise(resolve => log.end(resolve));
  results.push({ name, exitCode, passed: exitCode === 0, seconds: (Date.now() - started) / 1000, log: logPath });
  console.log(`${name}: ${exitCode === 0 ? 'PASS' : 'FAIL'} (${results.at(-1).seconds}s)`);
}
async function withPreview(port, run) {
  const base = `http://127.0.0.1:${port}`;
  const serverLog = createWriteStream(path.join(output, `preview-${port}.log`));
  const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', String(port)], { cwd: candidate, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.pipe(serverLog, { end: false }); server.stderr.pipe(serverLog, { end: false });
  let exited = false; server.once('exit', () => { exited = true; });
  try {
    let ready = false;
    for (let i = 0; i < 50; i++) {
      if (exited) throw Error('Preview exited during startup');
      try { if ((await fetch(base + '/brands/bmw-service-dubai', { signal: AbortSignal.timeout(1000) })).status === 200) { ready = true; break; } } catch { /* Startup only. */ }
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    if (!ready) throw Error('Local candidate preview did not become ready');
    await run(base);
  } finally {
    server.kill();
    if (!exited) await new Promise(resolve => server.once('exit', resolve));
    await new Promise(resolve => serverLog.end(resolve));
  }
}
try {
  await withPreview(5205, async base => {
    await suite('five-brand-browser', ['outputs/five-brand-service-2026-10-19/conversion/test-five-brand-browser.mjs', base, path.join(output, 'five-brand-browser')]);
  });
  await withPreview(5206, async base => {
    await suite('repair-browser', ['outputs/repair-service-2026-10-19/qa/test-repair-browser.mjs', base, path.join(output, 'repair-browser')]);
    await suite('master-seo-browser', ['scripts/test-master-seo-browser.mjs', runtime, base]);
    await suite('protection-routing-browser', ['scripts/test-protection-release-browser.mjs', runtime, base]);
    await suite('ppf-browser', ['scripts/test-ppf-browser.mjs', runtime, base, '--prerendered'], { QA_OUTPUT_DIR: path.join(output, 'ppf-browser') });
  });
} catch (error) {
  results.push({ name: 'orchestration', exitCode: 1, passed: false, error: error.message });
  console.error(error.stack);
}
await writeFile(path.join(output, 'combined-browser-results.json'), JSON.stringify({ checkedAt: new Date().toISOString(), candidate, passed: results.length === 5 && results.every(row => row.passed), safety: 'Loopback GET/HEAD requests only. Existing protected contact test stubs/blocked network retained. No actual message, customer enquiry, backend write, or production request.', results }, null, 2));
if (results.length !== 5 || results.some(row => !row.passed)) process.exitCode = 1;
