import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const out = 'outputs/diagnostics-ac-2026-10-19';
const plan = JSON.parse(await readFile(`${out}/candidate-plan.json`, 'utf8'));
const manifest = JSON.parse(await readFile(`${out}/modified-files.json`, 'utf8'));
const baseline = JSON.parse(await readFile(`${out}/baseline/workspace-manifest.json`, 'utf8'));
const before = new Map(baseline.files.map(file => [file.file, file.sha256]));
const selected = ['src/pages/ServicePage.tsx','src/pages/BrandServicePage.tsx','src/components/DiagnosticAcEnquiryPanel.tsx','src/data/diagnosticsAcGeneralContent.ts','src/data/diagnosticsAcBrandContent.ts','scripts/validate-query-release.mjs'];
const records = [];
for (const file of selected) {
  const bytes = await readFile(file);
  await copyFile(file, `${plan.candidate}/${file}`);
  records.push({ file, change:before.has(file) ? 'modified' : 'added', beforeSha256: before.get(file) ?? null, afterSha256:createHash('sha256').update(bytes).digest('hex'), bytes:bytes.length });
}
await writeFile(`${out}/candidate-plan.json`, JSON.stringify({ ...plan, selected }, null, 2));
await writeFile(`${out}/modified-files.json`, JSON.stringify({ ...manifest, files: records }, null, 2));
console.log(JSON.stringify({ candidate:plan.candidate, files:records.length }));
