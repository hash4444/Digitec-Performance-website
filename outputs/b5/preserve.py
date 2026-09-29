import hashlib, json, pathlib, subprocess

root = pathlib.Path(__file__).resolve().parents[2]
out = root / 'outputs/b5'
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
for name in ('package.json', 'package-lock.json', 'public/sitemap.xml'):
    paths.add(root / name)
for name in ('b0-a-routing-fix-report.md', 'b1-mercedes-final-qa-report.md',
             'b2-porsche-final-report.md', 'b3-bmw-final-report.md', 'b4-ferrari-lamborghini-final-report.md'):
    paths.add(root / name)
manifest = {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(paths) if p.exists()}
(out / 'source-hashes-before.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
(out / 'route-baseline.json').write_bytes((root / 'outputs/b4/after-routes.json').read_bytes())
(out / 'pages-baseline.json').write_bytes((root / 'outputs/b4/after-pages.json').read_bytes())
print(f'B5 preservation checkpoint: {len(manifest)} files; HEAD {git("rev-parse", "HEAD").strip()}')


