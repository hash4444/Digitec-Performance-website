import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const out = path.resolve('outputs/git-push-2026-10-20');
const git = (...args) => execFileSync('git', args, { maxBuffer: 32 * 1024 * 1024 });
const value = (...args) => git(...args).toString('utf8').trim();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const textBytes = bytes => Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n'));
const mode = process.argv[2] || 'prepare';
await fs.mkdir(out, { recursive: true });

if (mode === 'prepare') {
  const qa = JSON.parse(await fs.readFile('outputs/about-videos-2026-10-20/revision-instagram/qa/COMBINED-QA-SUMMARY.json', 'utf8'));
  if (!qa.passed || !qa.sourceStability.passed) throw Error('Final combined QA is not passing');
  if (value('rev-parse', 'HEAD') !== '2971301bb37d38f4785844af067eebd55f9f6dda' || value('branch', '--show-current') !== 'main') throw Error('Unexpected release base');
  if (value('diff', '--cached', '--name-only')) throw Error('Index must be empty before release preparation');
  const files = [];
  for (const row of qa.sourceStability.overlays) {
    const bytes = await fs.readFile(row.file);
    if (hash(bytes) !== row.expected) throw Error(`Tested source changed: ${row.file}`);
    if (bytes.length > 100 * 1024 * 1024) throw Error(`Git file size limit: ${row.file}`);
    files.push({ file: row.file, sha256: row.expected, bytes: bytes.length });
  }
  if (files.length !== 25 || new Set(files.map(row => row.file)).size !== 25) throw Error('Expected exactly 25 approved files');
  const preserved = [];
  for (const file of ['supabase/functions/mcp/index.ts', 'outputs/seo-2026-09-16/master-validation.json']) preserved.push({ file, sha256: hash(await fs.readFile(file)) });
  const manifest = { at: new Date().toISOString(), branch: 'main', base: value('rev-parse', 'HEAD'), files, preserved, qa: 'outputs/about-videos-2026-10-20/revision-instagram/qa/COMBINED-QA-SUMMARY.json', excluded: 'Generated invalid backend artifact and local audit/build/tool/data outputs remain untouched and uncommitted.' };
  await fs.writeFile(path.join(out, 'release-manifest.json'), JSON.stringify(manifest, null, 2));
  await fs.writeFile(path.join(out, 'stage-paths.nul'), Buffer.from(files.map(row => row.file).join('\0') + '\0'));
  console.log(JSON.stringify({ passed: true, files: files.length, bytes: files.reduce((total, row) => total + row.bytes, 0), base: manifest.base }));
} else {
  const manifest = JSON.parse(await fs.readFile(path.join(out, 'release-manifest.json'), 'utf8'));
  const committed = mode === 'verify-commit';
  if (!committed && value('rev-parse', 'HEAD') !== manifest.base) throw Error('HEAD changed before commit');
  if (committed && value('rev-parse', 'HEAD^') !== manifest.base) throw Error('Unexpected commit parent');
  const actual = (committed ? value('diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD') : value('diff', '--cached', '--name-only')).split('\n').filter(Boolean).sort();
  const expected = manifest.files.map(row => row.file).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw Error('Release scope differs from the approved 25 files');
  for (const row of manifest.files) {
    const working = await fs.readFile(row.file);
    if (hash(working) !== row.sha256) throw Error(`Working source changed: ${row.file}`);
    const stored = git('show', `${committed ? 'HEAD' : ''}:${row.file}`);
    const same = row.file.startsWith('public/') ? hash(working) === hash(stored) : hash(textBytes(working)) === hash(textBytes(stored));
    if (!same) throw Error(`Git content differs from tested source: ${row.file}`);
  }
  for (const row of manifest.preserved) if (hash(await fs.readFile(row.file)) !== row.sha256) throw Error(`Unrelated pending file changed: ${row.file}`);
  const result = { checkedAt: new Date().toISOString(), passed: true, mode, branch: value('branch', '--show-current'), head: value('rev-parse', 'HEAD'), files: actual.length, preserved: manifest.preserved.length };
  await fs.writeFile(path.join(out, committed ? 'committed-verification.json' : 'staged-verification.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
}
