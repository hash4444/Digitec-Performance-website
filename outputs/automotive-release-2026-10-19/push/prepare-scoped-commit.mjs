import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const out = 'outputs/automotive-release-2026-10-19';
const manifest = JSON.parse(await readFile(`${out}/modified-file-manifest.json`, 'utf8'));
const git = args => {
  const result = spawnSync('git', args, { windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`git ${args[0]} failed: ${result.stderr.toString()}`);
  return result.stdout.toString().trim();
};
if (git(['branch', '--show-current']) !== 'main') throw new Error('Expected main branch');
if (git(['rev-parse', 'HEAD']) !== manifest.base) throw new Error('Release base changed');
if (git(['diff', '--cached', '--name-only'])) throw new Error('Existing staged work must be preserved; refusing to stage');
const files = manifest.sourceFiles.map(file => file.file);
if (files.length !== 11 || new Set(files).size !== 11) throw new Error('Unexpected release scope');
for (const file of manifest.sourceFiles) {
  const actual = createHash('sha256').update(await readFile(file.file)).digest('hex');
  if (actual !== file.releaseSha256) throw new Error(`Reviewed source changed: ${file.file}`);
}
const statusBefore = git(['status', '--short']);
git(['add', '--', ...files]);
const staged = git(['diff', '--cached', '--name-only']).split('\n').filter(Boolean);
if (JSON.stringify(staged.slice().sort()) !== JSON.stringify(files.slice().sort())) throw new Error('Staged scope mismatch; stop before commit');
for (const file of files) {
  const filteredHash = git(['hash-object', '--path', file, file]);
  if (filteredHash !== git(['rev-parse', `:${file}`])) throw new Error(`Staged content mismatch: ${file}`);
}
git(['diff', '--cached', '--check']);
const plan = { checkedAt: new Date().toISOString(), userAuthorization: 'push to mian git (interpreted as main)', branch: 'main', base: manifest.base, staged, sourceMatchesReviewedManifest: true, stagedMatchesFilteredSource: true, diffCheckPassed: true, statusBefore, diffStat: git(['diff', '--cached', '--stat']), deploymentAuthorized: false };
await writeFile(`${out}/push/commit-plan.json`, JSON.stringify(plan, null, 2));
console.log(JSON.stringify({ base: plan.base, stagedFiles: staged.length, diffCheckPassed: true, diffStat: plan.diffStat }, null, 2));
