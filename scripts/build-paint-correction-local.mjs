import { cp, mkdir, readFile, writeFile, symlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

// Build a current source snapshot without replacing another workstream's dist,
// sitemap, route guard or generated SEO reports. No deployment or Git mutation.
const root = process.cwd();
const run = path.join(root, 'paint-correction-qa.local', `build-${Date.now()}`);
await mkdir(run, { recursive: true });
for (const directory of ['src', 'public', 'scripts', 'docs', 'cloudflare']) {
  await cp(path.join(root, directory), path.join(run, directory), { recursive: true });
}
for (const file of ['index.html', 'package.json', 'package-lock.json', 'vite.config.ts', 'tailwind.config.ts', 'postcss.config.js', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', '.env']) {
  if (existsSync(path.join(root, file))) await cp(path.join(root, file), path.join(run, file));
}
await symlink(path.join(root, 'node_modules'), path.join(run, 'node_modules'), 'junction');
await writeFile(path.join(root, 'paint-correction-qa.local', 'latest-build.txt'), run);
const declaredBuild = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8')).scripts.build;
console.log(`Running package.json production steps in ${run}`);
for (const command of declaredBuild.split(' && ')) {
  const parts = command.trim().split(/\s+/);
  const args = parts[0] === 'vite' ? [path.join(root, 'node_modules/vite/bin/vite.js'), ...parts.slice(1)] : parts[0] === 'node' ? parts.slice(1) : null;
  if (!args) throw new Error(`Unsupported build command: ${parts[0]}`);
  const result = spawnSync(process.execPath, args, { cwd: run, encoding: 'utf8', stdio: 'pipe', maxBuffer: 10 * 1024 * 1024 });
  await writeFile(path.join(run, `build-${parts[0]}-${parts[1].replaceAll(/[^a-z0-9]/gi, '-')}.log`), `${result.stdout || ''}\n${result.stderr || ''}`);
  console.log((result.stdout || '').split(/\r?\n/).filter((line) => /built in|Prerendered .*real React|passed|Generated .*redirect|warnings|errors|error/i.test(line)).join('\n'));
  if (result.status !== 0) { console.error(result.stderr || result.error || 'Build failed'); process.exit(result.status || 1); }
}
console.log('Isolated production build completed. Shared build artifacts were not changed.');
