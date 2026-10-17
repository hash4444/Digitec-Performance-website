import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const output = 'outputs/ppf-phase3-4-2026-10-17';
const legacy = 'outputs/seo-2026-09-16/master-validation.json';
const original = await readFile(legacy);
await writeFile(output + '/baseline/pre-existing-master-validation.json', original);
const hash = value => createHash('sha256').update(value).digest('hex');
let result;
try {
  result = spawnSync(process.execPath, ['scripts/validate-master-seo.mjs'], { encoding: 'utf8', windowsHide: true });
  await writeFile(output + '/qa/master-validation.log', (result.stdout || '') + (result.stderr || ''));
  await writeFile(output + '/qa/master-validation.json', await readFile(legacy));
  console.log(result.stdout || result.stderr || result.error);
} finally {
  await writeFile(legacy, original);
  if (hash(await readFile(legacy)) !== hash(original)) throw new Error('Original validation artifact not restored');
  await writeFile(output + '/qa/master-artifact-preservation.json', JSON.stringify({ preserved: true, beforeSha256: hash(original), afterSha256: hash(await readFile(legacy)), rollbackPerformed: 'Only restored the pre-existing validation output overwritten by its own validator; no source rollback.' }, null, 2));
}
if (result?.status !== 0) process.exitCode = result?.status || 1;
