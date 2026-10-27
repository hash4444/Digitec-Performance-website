import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const out = 'outputs/automotive-release-2026-10-19';
const expectedCommit = 'acef3427b57b48259bc5b39d6a0f75798603ae95';
const baseline = JSON.parse(await readFile(`${out}/baseline/workspace-manifest.json`, 'utf8'));
const scope = JSON.parse(await readFile(`${out}/modified-file-manifest.json`, 'utf8'));
const git = args => {
  const result = spawnSync('git', args, { windowsHide: true, maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`git ${args[0]} failed`);
  return result.stdout.toString().trim();
};
const mismatches = [];
for (const file of baseline.files) {
  try {
    const actual = createHash('sha256').update(await readFile(file.file)).digest('hex');
    if (actual !== file.sha256) mismatches.push({ file: file.file, expected: file.sha256, actual });
  } catch (error) { mismatches.push({ file: file.file, error: error.code }); }
}
const head = git(['rev-parse', 'HEAD']);
const parent = git(['rev-parse', 'HEAD^']);
const changed = git(['diff-tree', '--no-commit-id', '--name-only', '-r', head]).split('\n').filter(Boolean).sort();
const expected = scope.sourceFiles.map(file => file.file).sort();
const scopeMatches = JSON.stringify(changed) === JSON.stringify(expected);
const original = new Set(baseline.files.map(file => file.file));
const unexpectedAdded = git(['ls-files', '--cached', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean).filter(file => !file.startsWith(out + '/') && !original.has(file));
const staged = git(['diff', '--cached', '--name-only']);
const branch = git(['branch', '--show-current']);
const report = {
  checkedAt: new Date().toISOString(), commit: head, parent, branch,
  changed, scopeMatches, baselineFilesChecked: baseline.files.length,
  mismatches, unexpectedAdded, indexEmpty: staged === '',
  passed: head === expectedCommit && parent === scope.base && branch === 'main' && scopeMatches && mismatches.length === 0 && unexpectedAdded.length === 0 && staged === '',
  productionPublicationCommandRun: false,
};
await writeFile(`${out}/push/local-after.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
