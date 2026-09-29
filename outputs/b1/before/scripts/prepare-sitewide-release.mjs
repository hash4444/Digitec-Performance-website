import { readFile, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const base = process.argv[2];
if (!/^[a-f0-9]{40}$/.test(base || '')) throw new Error('Pass the verified remote base commit SHA');
const git = args => {
  const result = spawnSync('git', args, { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) throw new Error(result.stderr);
  return result.stdout.trim().split(/\r?\n/).filter(Boolean);
};
const files = new Set([
  ...git(['diff', '--name-only', base, '--', 'src', 'public', 'scripts', 'package.json', 'docs/seo']),
  ...git(['ls-files', '--others', '--exclude-standard', '--', 'src', 'public/images/seo']),
  ...['audit-sitewide-seo.mjs', 'optimize-sitewide-images.mjs', 'test-sitewide-browser.mjs', 'validate-social-metadata.mjs', 'update-sitewide-lastmod.mjs', 'prepare-sitewide-release.mjs'].map(name => `scripts/${name}`),
  'docs/seo/sitewide-release-2026-09-17.md',
]);
const records = [];
for (const file of [...files].sort()) {
  if (!/^(?:src\/|public\/|scripts\/|docs\/seo\/|package\.json$)/.test(file) || file.includes('..')) throw new Error(`Unexpected path ${file}`);
  await access(file);
  const binary = /\.(?:png|jpe?g|webp|gif|ico|woff2?|mp4|mov|pdf)$/i.test(file);
  const bytes = await readFile(file);
  const normalized = binary ? bytes : Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n'));
  records.push({ path: file, bytes: normalized.length, binary, sha256: createHash('sha256').update(normalized).digest('hex') });
}
await writeFile('outputs/sitewide-seo-2026-09-17/release-files.json', JSON.stringify({ base, files: records }, null, 2));
console.log(JSON.stringify({ base, files: records.length, bytes: records.reduce((n, row) => n + row.bytes, 0), paths: records.map(row => row.path) }, null, 2));
