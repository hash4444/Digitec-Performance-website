import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import assert from 'node:assert/strict';
const output = 'outputs/ppf-phase3-4-2026-10-17';
const report = 'docs/seo/ppf-phase3-4-2026-10-17.md';
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trimEnd();
const git = args => {
  const result = spawnSync('git', args, { encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.stderr);
  return result.stdout;
};
const modified = JSON.parse(await readFile(output + '/modified-files.json', 'utf8'));
const allowed = new Set(modified.records.map(record => record.file));
const blocks = patch => new Map([...normalize(patch).matchAll(/^diff --git a\/(.+?) b\/\1\n[\s\S]*?(?=^diff --git |$(?![\s\S]))/gm)].map(match => [match[1], normalize(match[0])]));
const before = blocks(await readFile(output + '/baseline/start-tracked.patch', 'utf8'));
const after = blocks(git(['diff', '--binary', '--no-ext-diff']));
assert(before.size > 0 && after.size > 0, 'Tracked diff parser must not return an empty comparison');
const preserved = [];
for (const file of new Set([...before.keys(), ...after.keys()])) {
  if (allowed.has(file)) continue;
  assert.equal(after.get(file), before.get(file), 'Unrelated tracked diff changed: ' + file);
  preserved.push(file);
}
assert.equal(normalize(git(['rev-parse', 'HEAD'])), normalize(await readFile(output + '/baseline/head.txt', 'utf8')));
assert.equal(normalize(git(['branch', '--show-current'])), normalize(await readFile(output + '/baseline/branch.txt', 'utf8')));
assert((await readFile('outputs/seo-2026-09-16/master-validation.json')).equals(await readFile(output + '/baseline/pre-existing-master-validation.json')));
const oldManifest = JSON.parse(await readFile('outputs/ppf-phase2-2026-10-17/qa/source-manifest.json', 'utf8'));
const finalManifest = JSON.parse(await readFile(output + '/qa/source-manifest.json', 'utf8'));
assert.equal(oldManifest.length, finalManifest.length);
const oldHashes = new Map(oldManifest.map(item => [item.file, item.sha256]));
const inputChanges = [];
for (const item of finalManifest) {
  assert.equal(hash(await readFile(item.file)), item.sha256, 'Source changed after final build: ' + item.file);
  if (oldHashes.get(item.file) !== item.sha256) inputChanges.push(item.file);
}
assert.deepEqual(inputChanges.sort(), ['src/i18n/ar-protection-services.ts', 'src/pages/PpfPage.tsx']);
for (const record of modified.records) assert.equal(hash(await readFile(record.file)), record.afterSha256);
const docs = [report, ...(await readdir(output)).filter(file => file.endsWith('.md')).map(file => output + '/' + file), output + '/qa/visual-qa.md', output + '/qa/tracker-visual-qa.md', output + '/qa/independent-review.md', output + '/qa/final-report-review.md'];
const links = [];
for (const doc of docs) {
  const content = await readFile(doc, 'utf8');
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1].replace(/^<|>$/g, '');
    if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue;
    const target = path.resolve(path.dirname(doc), decodeURIComponent(href.split('#')[0]));
    if (target !== path.resolve(output + '/qa/final-preservation.json')) await access(target);
    links.push({ document: doc, href });
  }
}
const result = {
  verifiedAt: new Date().toISOString(), passed: true,
  headAndBranchPreserved: true, preExistingSeoOutputPreserved: true,
  unrelatedTrackedDiffPreserved: true, unrelatedBackendDiffPreserved: preserved.includes('supabase/functions/mcp/index.ts'),
  preservedDiffFiles: preserved, baselineComparedDiffFiles: before.size, finalComparedDiffFiles: after.size,
  phase2BuildInputs: oldManifest.length, changedBuildInputs: inputChanges, currentFilesMatchFinalManifest: true,
  incrementalFiles: modified.records.length, rollbackReverseCheckPassed: modified.rollbackReverseCheckPassed,
  reportDocumentsChecked: docs.length, localReportLinksChecked: links.length, localReportLinksValid: true,
};
await writeFile(output + '/qa/final-preservation.json', JSON.stringify(result, null, 2));
await access(output + '/qa/final-preservation.json');
console.log(JSON.stringify(result, null, 2));
