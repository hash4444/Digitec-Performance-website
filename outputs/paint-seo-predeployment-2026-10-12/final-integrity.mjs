import { readFile, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const root = process.cwd();
const out = path.join(root, 'outputs/paint-seo-predeployment-2026-10-12');
const build = path.join(out, 'build.local');
const sha = data => createHash('sha256').update(data).digest('hex');
const manifest = JSON.parse(await readFile(path.join(build, 'release-qa.local/source-manifest.json'), 'utf8'));
const mismatches = [];
for (const record of manifest) {
  if (sha(await readFile(path.join(root, record.file))) !== record.sha256) mismatches.push(record.file);
}
const originalBackend = spawnSync('git', ['show', 'HEAD:supabase/functions/mcp/index.ts'], { windowsHide: true });
if (originalBackend.status !== 0) throw new Error('Could not read baseline backend');
const backend = await readFile(path.join(root, 'supabase/functions/mcp/index.ts'));
const router = await readFile(path.join(build, 'cloudflare/digitec-seo-router.js'));
const worker = await readFile(path.join(build, 'dist/_worker.js'));
const routingData = await readFile(path.join(build, 'cloudflare/routing-response-data.js'), 'utf8');
const assetPaths = [...new Set(routingData.match(/\/assets\/[\w.-]+/g) ?? [])];
const missing404Assets = [];
for (const asset of assetPaths) {
  try { await access(path.join(build, 'dist', asset)); }
  catch { missing404Assets.push(asset); }
}
const result = {
  checkedAt: new Date().toISOString(),
  sourceFingerprint: sha(JSON.stringify(manifest)),
  sourceFilesChecked: manifest.length,
  currentSourceMatchesTestedBuild: mismatches.length === 0,
  mismatches,
  currentBackendMatchesHead: backend.equals(originalBackend.stdout),
  currentBackendSha256: sha(backend),
  frontendWorkerMatchesGeneratedCloudflareRouter: worker.equals(router),
  frontendWorkerSha256: sha(worker),
  notFoundAssetPaths: assetPaths,
  missing404Assets,
  packagingScope: 'Only fresh frontend dist and matching Cloudflare bundle; exclude generated Supabase output and unrelated workspace/QA outputs',
};
await writeFile(path.join(out, 'final-integrity.json'), JSON.stringify(result, null, 2));
console.log(result);
if (mismatches.length || !result.currentBackendMatchesHead || !result.frontendWorkerMatchesGeneratedCloudflareRouter || missing404Assets.length) process.exitCode = 1;
