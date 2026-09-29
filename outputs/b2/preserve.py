import hashlib, json, pathlib, subprocess

root = pathlib.Path(__file__).resolve().parents[2]
out = root / 'outputs/b2'
out.mkdir(parents=True, exist_ok=True)

def git(*args):
    return subprocess.check_output(['git', *args], cwd=root).decode('utf-8', errors='replace')

for name, args in {
    'git-status-before.txt': ('status', '--porcelain=v1'),
    'branch-before.txt': ('branch', '--show-current'),
    'head-before.txt': ('rev-parse', 'HEAD'),
    'diff-before.patch': ('diff', '--binary'),
}.items():
    (out / name).write_text(git(*args), encoding='utf-8')

paths = set()
for directory in ('src', 'scripts', 'cloudflare', 'docs/seo'):
    for path in (root / directory).rglob('*'):
        if path.is_file(): paths.add(path)
for name in ('package.json', 'package-lock.json', 'public/sitemap.xml',
             'b0-a-routing-fix-report.md', 'b0-b-intent-ownership-report.md',
             'b0-b-url-decision-register.csv', 'b1-mercedes-final-qa-report.md',
             'b1-mercedes-keyword-coverage.csv', 'b1-mercedes-before-after.csv'):
    path = root / name
    if path.exists(): paths.add(path)
manifest = {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(paths)}
(out / 'source-hashes-before.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
(out / 'route-baseline.json').write_bytes((root / 'outputs/b1/after-routes.json').read_bytes())
(out / 'pages-baseline.json').write_bytes((root / 'outputs/b1/after-pages.json').read_bytes())
print(f'B2 preservation checkpoint: {len(manifest)} files; HEAD {git("rev-parse", "HEAD").strip()}')
