import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

// Execute the declared production pipeline against the shared checkout. This
// deliberately creates the final dist/, not another isolated workstream build.
const root = process.cwd();
const output = path.join(root, 'release-qa.local');
await mkdir(output, { recursive: true });
async function fingerprint() {
  const files = [];
  async function walk(directory) {
    for (const item of await readdir(path.join(root, directory), { withFileTypes: true })) {
      const relative = path.posix.join(directory, item.name);
      if (item.isDirectory()) await walk(relative);
      else if (item.isFile() && relative !== 'public/sitemap.xml') files.push(relative);
    }
  }
  for (const directory of ['src', 'public', 'scripts']) await walk(directory);
  files.push('index.html', 'package.json', 'package-lock.json', 'vite.config.ts', 'tailwind.config.ts', 'postcss.config.js', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json');
  const records = [];
  for (const file of files.sort()) records.push({ file, sha256: createHash('sha256').update(await readFile(path.join(root, file))).digest('hex') });
  return records;
}
const before = await fingerprint();
await writeFile(path.join(output, 'source-manifest.json'), JSON.stringify(before, null, 2));
const steps = JSON.parse(await readFile('package.json', 'utf8')).scripts.build.split(' && ');
const report = { startedAt: new Date().toISOString(), outputDirectory: 'dist', sourceManifest: 'release-qa.local/source-manifest.json', sourceSha256: createHash('sha256').update(JSON.stringify(before)).digest('hex'), steps: [], passed: false };
for (const [index, command] of steps.entries()) {
  const parts = command.trim().split(/\s+/);
  const args = parts[0] === 'vite' ? [path.join(root, 'node_modules/vite/bin/vite.js'), ...parts.slice(1)] : parts[0] === 'node' ? parts.slice(1) : null;
  if (!args) throw new Error(`Unsupported production command: ${command}`);
  console.log(`Production step ${index + 1}/${steps.length}: ${command}`);
  const started = Date.now();
  const result = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, windowsHide: true });
  await writeFile(path.join(output, `build-${index + 1}.log`), `${result.stdout || ''}\n${result.stderr || ''}`);
  report.steps.push({ command, exitCode: result.status, seconds: (Date.now() - started) / 1000, log: `release-qa.local/build-${index + 1}.log` });
  console.log((result.stdout || '').split(/\r?\n/).filter((line) => /built in|Prerendered .*real React|passed|Generated .*redirect|warnings|errors/i.test(line)).join('\n'));
  if (result.status !== 0) {
    await writeFile(path.join(output, 'build-results.json'), JSON.stringify(report, null, 2));
    console.error(result.stderr || result.error || 'Production build failed');
    process.exit(result.status || 1);
  }
}
if (JSON.stringify(before) !== JSON.stringify(await fingerprint())) throw new Error('Source changed during build; rebuild before release.');
report.passed = true;
report.finishedAt = new Date().toISOString();
await writeFile(path.join(output, 'build-results.json'), JSON.stringify(report, null, 2));
console.log(`Combined production build passed. Source fingerprint: ${report.sourceSha256}`);
