import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const out = path.join(root, 'outputs/about-videos-2026-10-20/audit');
fs.mkdirSync(out, { recursive: true });
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const mercedes = JSON.parse(fs.readFileSync('outputs/mercedes-service-top3-2026-10-20/modified-files.json', 'utf8'));
const preserve = [...mercedes.files.map(row => row.file), 'supabase/functions/mcp/index.ts', 'outputs/seo-2026-09-16/master-validation.json'];
const about = 'src/pages/AboutUs.tsx';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const manifest = {
  capturedAt: new Date().toISOString(),
  branch: git('branch', '--show-current'),
  head: git('rev-parse', 'HEAD'),
  stagedFiles: git('diff', '--cached', '--name-only').split('\n').filter(Boolean),
  trackedWorktreeStatus: git('status', '--short', '--untracked-files=no').split('\n'),
  about: { file: about, bytes: fs.statSync(about).size, sha256: hash(fs.readFileSync(about)), status: git('status', '--short', '--', about) || 'clean' },
  preservedFiles: preserve.map(file => {
    const bytes = fs.readFileSync(file);
    return { file, bytes: bytes.length, sha256: hash(bytes), role: file.startsWith('src/') ? 'pending Mercedes campaign source' : 'unrelated pre-existing work' };
  }),
  note: 'Read-only baseline of product files; no product, Git index, remote, or production changes. Preserve all recorded pending files byte for byte.'
};
fs.writeFileSync(path.join(out, 'AboutUs.before.tsx'), fs.readFileSync(about));
for (const locale of ['en', 'ar']) {
  const file = path.join(root, 'dist', locale === 'ar' ? 'ar/about/index.html' : 'about/index.html');
  if (!fs.existsSync(file)) continue;
  const bytes = fs.readFileSync(file);
  fs.writeFileSync(path.join(out, `about-${locale}.before.html`), bytes);
  manifest[`rendered${locale.toUpperCase()}`] = { file: path.relative(root, file).replaceAll('\\', '/'), bytes: bytes.length, sha256: hash(bytes), note: 'Existing local dist from preceding sprint; not a production snapshot.' };
}
fs.writeFileSync(path.join(out, 'preservation-baseline.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ output: 'preservation-baseline.json', head: manifest.head, preservedFiles: manifest.preservedFiles.length, aboutSha256: manifest.about.sha256 }));
