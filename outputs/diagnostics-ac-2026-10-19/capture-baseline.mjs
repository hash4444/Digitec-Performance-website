import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const out = path.resolve('outputs/diagnostics-ac-2026-10-19');
await mkdir(path.join(out, 'baseline'), { recursive: true });
const git = args => { const r = spawnSync('git', args, { windowsHide: true, maxBuffer: 64 * 1024 * 1024 }); if (r.status !== 0) throw Error(r.stderr.toString()); return r.stdout; };
const base = git(['rev-parse', 'HEAD']).toString().trim();
if (base !== 'acef3427b57b48259bc5b39d6a0f75798603ae95') throw Error('Unexpected baseline');
const files = git(['ls-files', '--cached', '--others', '--exclude-standard', '-z']).toString().split('\0').filter(Boolean).filter(file => !file.startsWith('outputs/diagnostics-ac-2026-10-19/'));
const records = [];
for (const file of files) { const bytes = await readFile(file); records.push({ file, sha256: createHash('sha256').update(bytes).digest('hex') }); }
const report = { capturedAt: new Date().toISOString(), base, branch: git(['branch', '--show-current']).toString().trim(), status: git(['status', '--porcelain=v1']).toString(), files: records };
await writeFile(path.join(out, 'baseline/workspace-manifest.json'), JSON.stringify(report, null, 2));
await writeFile(path.join(out, 'baseline/pre-existing.patch'), git(['diff', '--binary']));
const archivePaths = ['src','public','scripts','cloudflare','.lovable','.env','.gitignore','package.json','package-lock.json','index.html','vite.config.ts','tsconfig.json','tsconfig.app.json','tsconfig.node.json','tailwind.config.ts','postcss.config.js','components.json','eslint.config.js','docs/seo','outputs/t1/baseline/tuningCars.ts','outputs/b0-a/baseline/cloudflare'];
git(['archive', '--format=zip', `--output=${path.join(out, 'baseline/source.zip')}`, base, '--', ...archivePaths]);
console.log(JSON.stringify({ base, preservedFiles: records.length, archiveReady: true }));
