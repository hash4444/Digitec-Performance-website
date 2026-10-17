import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
const output = 'outputs/ppf-phase1-2026-10-17';
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', '5197'], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Local preview startup timeout')), 15000);
    server.once('error', reject);
    server.stdout.on('data', data => { if (String(data).includes('Combined production preview')) { clearTimeout(timer); resolve(); } });
    server.stderr.on('data', data => process.stderr.write(data));
  });
  let log = '';
  const result = await new Promise((resolve, reject) => {
    const test = spawn(process.execPath, ['scripts/test-paint-care-journeys.mjs', 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node', 'http://127.0.0.1:5197'], { windowsHide: true });
    test.stdout.on('data', data => { log += data; process.stdout.write(data); });
    test.stderr.on('data', data => { log += data; process.stderr.write(data); });
    test.once('error', reject);
    test.once('exit', resolve);
  });
  await writeFile(output + '/journeys.log', log);
  process.exitCode = result;
} finally { server.kill(); }
