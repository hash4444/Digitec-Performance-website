import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const out = 'outputs/ppf-push-2026-10-17';
const roots = ['outputs/ppf-phase1-2026-10-17', 'outputs/ppf-phase2-2026-10-17', 'outputs/ppf-phase3-4-2026-10-17'];
const files = new Set((await readFile(roots[0] + '/modified-tracked-files.txt', 'utf8')).split(/\r?\n/).filter(Boolean));
for (const root of roots.slice(1)) for (const record of JSON.parse(await readFile(root + '/modified-files.json', 'utf8')).records) files.add(record.file);
for (const file of ['src/styles/ppf-form.css', 'src/lib/ppf-enquiry.ts', 'scripts/test-ppf-enquiry.mjs', 'docs/seo/ppf-phase1-2026-10-17.md', 'docs/seo/ppf-phase2-2026-10-17.md', 'docs/seo/ppf-phase3-4-2026-10-17.md']) files.add(file);
const excluded = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = dir + '/' + entry.name;
    if (entry.isSymbolicLink() || ['node_modules', 'artifact-work', 'workbook-runtime', 'tabular-work'].includes(entry.name) || /\/baseline\/source$|\/qa\/build-logs$/.test(file) || /\/baseline\/(?:start-tracked|pre-existing)\.patch$/.test(file)) { excluded.push(file); continue; }
    if (entry.isDirectory()) await walk(file);
    else files.add(file);
  }
}
for (const root of roots) await walk(root);
const candidate = [...files].sort();
const ignored = spawnSync('git', ['check-ignore', '--stdin'], { input: candidate.join('\n') + '\n', encoding: 'utf8', windowsHide: true });
if (![0, 1].includes(ignored.status)) throw new Error(ignored.stderr);
const ignoredPaths = new Set(ignored.stdout.split(/\r?\n/).filter(Boolean));
const selected = candidate.filter(file => !ignoredPaths.has(file));
for (const forbidden of ['supabase/functions/mcp/index.ts', 'outputs/seo-2026-09-16/master-validation.json']) if (selected.includes(forbidden)) throw new Error('Unrelated file selected: ' + forbidden);
const records = [];
for (const file of selected) {
  const data = await readFile(file);
  if (data.length > 10 * 1024 * 1024) throw new Error('Unexpected large artifact: ' + file);
  if (file.endsWith('.patch') && /diff --git a\/supabase\//.test(data.toString('utf8'))) throw new Error('Backend preservation patch selected: ' + file);
  if (/\.(?:mjs|js|ts|tsx|json|md|txt|patch|csv|html)$/.test(file) && /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|AKIA[0-9A-Z]{16}/.test(data.toString('utf8'))) throw new Error('Credential-like content needs review: ' + file);
  records.push({ file, bytes: (await stat(file)).size, sha256: createHash('sha256').update(data).digest('hex') });
}
await writeFile(out + '/selected-paths.txt', selected.join('\n') + '\n');
await writeFile(out + '/commit-plan.json', JSON.stringify({ branch: 'main', base: '5461e2c0f28c006f45196f6d9a7f4dcf312f464c', files: records, excluded, ignoredPaths: [...ignoredPaths] }, null, 2));
console.log(JSON.stringify({ selectedFiles: selected.length, megabytes: records.reduce((total, item) => total + item.bytes, 0) / 1048576, productAndReportFiles: selected.filter(file => !file.startsWith('outputs/')), excluded, ignoredFiles: ignoredPaths.size }, null, 2));
