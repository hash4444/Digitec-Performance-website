import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve('outputs/automotive-release-2026-10-19');
const json = async file => JSON.parse(await readFile(file, 'utf8'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const plan = await json(path.join(root, 'candidate-plan.json'));
const artifacts = await json(path.join(root, 'artifacts/artifact-checksums.json'));
const source = await json(path.join(root, 'modified-file-manifest.json'));
const dist = await json(path.join(root, 'artifacts/dist-file-manifest.json'));
const buildSource = await json(path.join(root, 'qa/production-build/source-manifest.json'));
const errors = [];
const check = async (file, expected, group) => {
  try {
    const actual = sha(await readFile(file));
    if (actual !== expected) errors.push({ file, group, expected, actual });
  } catch (error) { errors.push({ file, group, error: error.code }); }
};
for (const file of artifacts.files) await check(path.join(root, file.file), file.sha256, 'artifact');
for (const file of source.sourceFiles) {
  await check(path.resolve(file.file), file.releaseSha256, 'original-approved-source');
  await check(path.join(plan.candidate, file.file), file.releaseSha256, 'candidate-approved-source');
}
for (const file of buildSource) await check(path.join(plan.candidate, file.file), file.sha256, 'build-source');
for (const file of dist.files) await check(path.join(plan.candidate, 'dist', file.path), file.sha256, 'dist');
const actualDist = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) await walk(file);
    else if (item.isFile()) actualDist.push(path.relative(path.join(plan.candidate, 'dist'), file).replaceAll('\\', '/'));
    else errors.push({ file, group: 'dist', error: 'unexpected-special-file' });
  }
}
await walk(path.join(plan.candidate, 'dist'));
const expectedDist = new Set(dist.files.map(file => file.path));
for (const file of actualDist) if (!expectedDist.has(file)) errors.push({ file, group: 'dist', error: 'unexpected-file' });
const qa = await json(path.join(root, 'qa/COMBINED-QA-SUMMARY.json'));
const browser = await json(path.join(root, 'qa/combined-browser-results.json'));
const cli = await json(path.join(root, 'qa/combined-cli-results.json'));
const tuning = await json(path.join(root, 'qa/tuning-browser/browser-results.json'));
const expectedBuildHash = sha(Buffer.from(JSON.stringify(buildSource)));
if (expectedBuildHash !== qa.sourceSha256) errors.push({ group: 'build-source', expected: qa.sourceSha256, actual: expectedBuildHash });
if (![qa, browser, cli, tuning].every(result => result.passed === true)) errors.push({ group: 'qa', error: 'a-final-result-is-not-passed' });
const report = {
  checkedAt: new Date().toISOString(),
  passed: errors.length === 0,
  approvedSourceFiles: source.sourceFiles.length,
  buildInputFiles: buildSource.length,
  sourceSha256: expectedBuildHash,
  distFiles: actualDist.length,
  artifacts: artifacts.files.length,
  finalQaPassed: qa.passed && browser.passed && cli.passed && tuning.passed,
  errors,
};
await writeFile(path.join(root, 'final-integrity.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
