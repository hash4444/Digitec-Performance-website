import { cp, mkdir, lstat, symlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Execute the existing production pipeline against a local snapshot. The main
// checkout's dist, sitemap, redirect inventory and PPF files are never written.
const root = process.cwd();
const stage = path.join(root, 'ceramic-qa.local', 'build');
await mkdir(stage, { recursive: true });
for (const name of ['src', 'public', 'scripts', 'docs', 'cloudflare', 'package.json', 'index.html', 'vite.config.ts', 'tailwind.config.ts', 'postcss.config.js', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', '.env']) {
  await cp(path.join(root, name), path.join(stage, name), { recursive: true });
}
const modules = path.join(stage, 'node_modules');
if (!(await lstat(modules).catch(() => null))) await symlink(path.join(root, 'node_modules'), modules, 'junction');
const commands = [
  ['node_modules/vite/bin/vite.js', 'build'],
  ['node_modules/vite/bin/vite.js', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', 'dist-server'],
  ['scripts/prerender.mjs'],
  ['scripts/generate-hosting-rules.mjs'],
  ['scripts/test-hosting-rules.mjs'],
  ['scripts/validate-seo.mjs'],
];
const results = [];
for (const args of commands) {
  const result = spawnSync(process.execPath, args, { cwd: stage, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  const log = `${result.stdout || ''}\n${result.stderr || ''}`;
  await writeFile(path.join(root, 'ceramic-qa.local', `build-${results.length + 1}.log`), log);
  results.push({ command: ['node', ...args].join(' '), exitCode: result.status });
  console.log(`${args.join(' ')}: ${result.status === 0 ? 'passed' : 'failed'}`);
  if (result.status !== 0) { console.error(log.slice(-9000)); process.exit(result.status || 1); }
}
await writeFile(path.join(root, 'ceramic-qa.local', 'build-results.json'), JSON.stringify(results, null, 2));
console.log('Full production build, prerendering, routing and SEO validation passed in ceramic-qa.local/build. Main checkout build outputs were untouched.');
