import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const output = 'outputs/ppf-phase2-2026-10-17';
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
for (const file of ['src/lib/ppf-enquiry.ts', 'scripts/test-ppf-enquiry.mjs']) {
  const content = await readFile(file);
  records.push({ file, kind: 'new', beforeSha256: null, afterSha256: hash(content) });
  const lines = content.toString('utf8').replace(/\r\n/g, '\n').trimEnd().split('\n');
  patch += 'diff --git a/' + file + ' b/' + file + '\nnew file mode 100644\n--- /dev/null\n+++ b/' + file + '\n@@ -0,0 +1,' + lines.length + ' @@\n' + lines.map(line => '+' + line).join('\n') + '\n';
}
await writeFile(output + '/phase2-only.patch', patch);
const check = spawnSync('git', ['apply', '--reverse', '--check', output + '/phase2-only.patch'], { encoding: 'utf8', windowsHide: true });
if (check.status !== 0) throw new Error('Rollback dry run failed: ' + check.stderr);
const result = { checkedAt: new Date().toISOString(), head: '5461e2c0f28c006f45196f6d9a7f4dcf312f464c', branch: 'main', scope: 'Only incremental Phase 2 code/generated changes, relative to saved Phase 1 working files; no rollback executed.', rollbackReverseCheckPassed: true, records };
await writeFile(output + '/modified-files.json', JSON.stringify(result, null, 2));
await writeFile(output + '/modified-files.csv', 'file,kind,before_sha256,after_sha256\n' + records.map(item => [item.file, item.kind, item.beforeSha256 || '', item.afterSha256].join(',')).join('\n') + '\n');
console.log(JSON.stringify({ incrementalFiles: records.length, rollbackReverseCheckPassed: true }));
