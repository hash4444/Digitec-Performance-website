import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const output = 'outputs/ppf-phase3-4-2026-10-17';
const baseline = output + '/baseline/source/';
const hash = data => createHash('sha256').update(data).digest('hex');
const originals = [];
async function walk(prefix = '') {
  for (const entry of await readdir(baseline + prefix, { withFileTypes: true })) {
    if (entry.isDirectory()) await walk(prefix + entry.name + '/');
    else originals.push(prefix + entry.name);
  }
}
await walk();
const records = [];
let patch = '';
for (const file of originals.sort()) {
  const [before, after] = await Promise.all([readFile(baseline + file), readFile(file)]);
  if (before.equals(after)) continue;
  records.push({ file, kind: 'modified', beforeSha256: hash(before), afterSha256: hash(after), rollbackSource: baseline + file });
  const diff = spawnSync('git', ['diff', '--no-index', '--binary', '--', baseline + file, file], { encoding: 'utf8', windowsHide: true });
  if (diff.status !== 1) throw new Error('Expected a changed-file diff: ' + file + ' ' + diff.stderr);
  patch += diff.stdout.replace(/^diff --git .*$/m, 'diff --git a/' + file + ' b/' + file).replace(/^--- .*$/m, '--- a/' + file).replace(/^\+\+\+ .*$/m, '+++ b/' + file);
}
await writeFile(output + '/phase3-4-only.patch', patch);
const check = spawnSync('git', ['apply', '--reverse', '--check', output + '/phase3-4-only.patch'], { encoding: 'utf8', windowsHide: true });
if (check.status !== 0) throw new Error('Rollback dry run failed: ' + check.stderr);
const result = { checkedAt: new Date().toISOString(), head: '5461e2c0f28c006f45196f6d9a7f4dcf312f464c', branch: 'main', scope: 'Only incremental Phases 3–4 code/generated changes, relative to saved Phase 2 working files; no source rollback executed. New report/evidence files are separate.', rollbackReverseCheckPassed: true, records };
await writeFile(output + '/modified-files.json', JSON.stringify(result, null, 2));
await writeFile(output + '/modified-files.csv', 'file,kind,before_sha256,after_sha256\n' + records.map(item => [item.file, item.kind, item.beforeSha256 || '', item.afterSha256].join(',')).join('\n') + '\n');
console.log(JSON.stringify({ incrementalFiles: records.length, files: records.map(record => record.file), rollbackReverseCheckPassed: true }));
