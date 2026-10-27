import { cp, mkdir, readFile, writeFile, symlink, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = process.cwd();
const output = path.join(root, 'outputs/paint-seo-predeployment-2026-10-12');
const workspace = path.join(output, 'build.local');
await mkdir(workspace, { recursive: true });
const directories = ['src', 'scripts', 'public', 'cloudflare', 'docs', 'supabase'];
const files = ['index.html', 'package.json', 'package-lock.json', 'vite.config.ts', 'tailwind.config.ts', 'postcss.config.js', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'eslint.config.js'];
for (const directory of directories) await cp(path.join(root, directory), path.join(workspace, directory), { recursive: true });
for (const file of [...files, '.env']) {
  try { await cp(path.join(root, file), path.join(workspace, file)); }
  catch (error) { if (file !== '.env') throw error; }
}
await mkdir(path.join(workspace, 'outputs/seo-2026-09-16'), { recursive: true });
try { await access(path.join(workspace, 'node_modules')); }
catch { await symlink(path.join(root, 'node_modules'), path.join(workspace, 'node_modules'), 'junction'); }
const backendFile = path.join(workspace, 'supabase/functions/mcp/index.ts');
const beforeBackend = await readFile(backendFile);
const result = spawnSync(process.execPath, ['scripts/build-production-local.mjs'], { cwd: workspace, encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
await writeFile(path.join(output, 'isolated-build.log'), `${result.stdout ?? ''}\n${result.stderr ?? ''}`);
let backend = await readFile(backendFile);
await writeFile(path.join(output, 'generated-backend.txt'), backend);
const evidence = { workspace, exitCode: result.status, originalBackendSha256: createHash('sha256').update(beforeBackend).digest('hex'), generatedBackendSha256: createHash('sha256').update(backend).digest('hex'), backendChanged: !backend.equals(beforeBackend), generatedWindowsNpmImport: /from\s+["']npm:.*[A-Z]:\\/.test(backend.toString()), checkedAt: new Date().toISOString() };
await writeFile(path.join(output, 'isolated-build-side-effects.json'), JSON.stringify(evidence, null, 2));
console.log(result.stdout);
if (result.status !== 0) console.error(result.stderr);
console.log(evidence);
process.exitCode = result.status || 0;
