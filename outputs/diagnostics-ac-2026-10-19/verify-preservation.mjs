import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const out = 'outputs/diagnostics-ac-2026-10-19';
const json = async file => JSON.parse(await readFile(file, 'utf8'));
const baseline = await json(`${out}/baseline/workspace-manifest.json`);
const scope = await json(`${out}/modified-files.json`);
const plan = await json(`${out}/candidate-plan.json`);
const selected = new Map(scope.files.map(file => [file.file, file]));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const errors = [];
let unchanged = 0, intentionalChanges = 0;
for (const record of baseline.files) {
  try {
    const actual = sha(await readFile(record.file));
    const expected = selected.get(record.file)?.afterSha256 ?? record.sha256;
    if (actual !== expected) errors.push({ file:record.file, expected, actual });
    else if (selected.has(record.file)) intentionalChanges++;
    else unchanged++;
  } catch (error) { errors.push({ file:record.file, error:error.code }); }
}
for (const record of scope.files) {
  for (const file of [record.file, `${plan.candidate}/${record.file}`]) {
    const actual = sha(await readFile(file));
    if (actual !== record.afterSha256) errors.push({ file, expected:record.afterSha256, actual });
  }
}
const build = await json(`${plan.candidate}/release-qa.local/build-results.json`);
const buildSource = await json(`${plan.candidate}/release-qa.local/source-manifest.json`);
for (const record of buildSource) {
  const actual = sha(await readFile(`${plan.candidate}/${record.file}`));
  if (actual !== record.sha256) errors.push({ file:record.file, group:'candidate-build-input', expected:record.sha256, actual });
}
const buildHash = sha(Buffer.from(JSON.stringify(buildSource)));
if (!build.passed || buildHash !== build.sourceSha256) errors.push({ group:'build', error:'Build proof missing or inconsistent' });
const pkg = await json(`${out}/source-package-manifest.json`);
if (sha(await readFile(`${out}/${pkg.archive}`)) !== pkg.archiveSha256) errors.push({ group:'source-package', error:'Archive hash mismatch' });
const git = args => { const r = spawnSync('git', args, { windowsHide:true, maxBuffer:64*1024*1024 }); if (r.status !== 0) throw Error('Git read failed'); return r.stdout.toString().trim(); };
const branch = git(['branch', '--show-current']), head = git(['rev-parse','HEAD']);
const staged = git(['diff','--cached','--name-only']);
const original = new Set(baseline.files.map(file => file.file));
const added = git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean).filter(file => !file.startsWith(out + '/') && !original.has(file));
const unexpectedAdded = added.filter(file => !selected.has(file));
if (branch !== baseline.branch || head !== baseline.base || staged || unexpectedAdded.length) errors.push({ group:'git', branch, head, staged, unexpectedAdded });
const report = { checkedAt:new Date().toISOString(), passed:errors.length===0, base:baseline.base, branch, head, originalFiles:baseline.files.length, byteIdenticalUnrelatedFiles:unchanged, intentionallyModifiedExistingFiles:intentionalChanges, approvedNewFiles:scope.files.filter(file=>file.change==='added').map(file=>file.file), stagedFiles:staged ? staged.split('\n') : [], unexpectedAdded, candidateBuildInputs:buildSource.length, sourceSha256:buildHash, sourcePackageSha256:pkg.archiveSha256, errors };
await writeFile(`${out}/preservation-and-integrity.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if (!report.passed) process.exitCode=1;
