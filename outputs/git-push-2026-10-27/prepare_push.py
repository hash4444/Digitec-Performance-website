import base64
import collections
import json
import re
import subprocess
import sys
from pathlib import Path

root = Path.cwd()
out = root / 'outputs/git-push-2026-10-27'
def git_paths(*args):
    return [p.decode('utf-8') for p in subprocess.check_output(['git', *args, '-z']).split(b'\0') if p]
untracked = git_paths('ls-files', '--others', '--exclude-standard')
tracked = git_paths('ls-files', '-m')
generated_dirs = {'node_modules', '.pnpm-store', '.cache', 'build', 'dist', 'dist-server', 'dist-ssr', 'ssr', 'ssr-before', 'generated', 'tools', '__pycache__'}
archive_names = {'source.zip', 'remote-base-source.zip', 'application-static.zip', 'head-source.local.tar'}
private_patterns = [
    ('private key', re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')),
    ('GitHub token', re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{25,}|github_pat_[A-Za-z0-9_]{30,})\b')),
    ('cloud access key', re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b')),
    ('Supabase secret', re.compile(r'\bsb_secret_[A-Za-z0-9_-]{15,}\b')),
    ('OpenAI key', re.compile(r'\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{30,}\b')),
    ('assigned credential', re.compile(r'''(?im)(?<![A-Za-z0-9_])(?:access_token|refresh_token|client_secret|service_role_key|authorization|password)\s*["']?\s*[:=]\s*["'](?:Bearer\s+)?([A-Za-z0-9_./+=-]{24,})["']''')),
]
secret_files = []
included = []
excluded = []
ignore_entries = set()
for name in sorted(set(untracked + tracked)):
    file = root / name
    if not file.is_file():
        continue
    parts = name.split('/')
    size = file.stat().st_size
    reason = None
    if name in untracked:
        if any(p in generated_dirs for p in parts[1:-1]): reason = 'generated build, dependency or tool directory'
        elif any(p in {'analysis-runtime', 'tabular-work', 'artifact-work', 'workbook-runtime'} for p in parts): reason = 'temporary runtime or artifact workspace'
        elif '/baseline/source/' in name: reason = 'preservation source copy'
        elif file.name in archive_names or file.name.endswith('-built-dist.zip'): reason = 'build or source backup archive'
        elif file.suffix.lower() in {'.exe', '.dll', '.whl', '.pyc'}: reason = 'local tool binary or cache'
        elif size >= 100 * 1024 * 1024: reason = 'exceeds GitHub regular-file size limit'
    if not reason and (file.suffix.lower() in {'.json','.jsonl','.md','.txt','.ts','.tsx','.js','.mjs','.cjs','.py','.html','.xml','.csv','.yml','.yaml','.toml','.patch','.env','.ini','.config'} or file.name.startswith('.env')) and size <= 32*1024*1024:
        content = file.read_text(encoding='utf-8', errors='replace')
        labels = [label for label, pattern in private_patterns if pattern.search(content)]
        for jwt in re.findall(r'\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b', content):
            try:
                payload = jwt.split('.')[1]
                claims = json.loads(base64.urlsafe_b64decode(payload+'='*(-len(payload)%4)))
                if claims.get('role') == 'service_role': labels.append('service-role JWT')
            except Exception: pass
        if labels:
            secret_files.append({'path': name, 'kinds': sorted(set(labels)), 'tracked': name in tracked})
            if name in untracked: reason = 'credential candidate: review before Git publication'
    record = {'path': name, 'bytes': size}
    if reason:
        excluded.append({**record, 'reason': reason})
        generated_root = next((i for i, part in enumerate(parts[:-1]) if i > 0 and (part in generated_dirs or part in {'analysis-runtime', 'tabular-work', 'artifact-work', 'workbook-runtime'})), None)
        if generated_root is not None:
            ignore_entries.add('/'+'/'.join(parts[:generated_root+1])+'/')
        elif '/baseline/source/' in name:
            ignore_entries.add('/'+name.split('/baseline/source/')[0]+'/baseline/source/')
        else:
            ignore_entries.add('/'+name)
    else: included.append(record)
manifest = {'included':included, 'excluded':excluded, 'secret_candidates':secret_files}
(out/'selection-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
(out/'stage-paths.txt').write_bytes(b''.join(r['path'].encode('utf-8')+b'\0' for r in included))
if '--apply-ignore' in sys.argv:
    ignore_file = root / '.gitignore'
    content = ignore_file.read_text(encoding='utf-8')
    marker = '# Local build copies, runtime tools and credential-bearing working files (27 October 2026)'
    ignore_entries.add('/outputs/git-push-2026-10-27/stage-paths.txt')
    if marker in content:
        content = content.split(marker)[0].rstrip()+'\n'
    ignore_file.write_text(content.rstrip()+'\n\n'+marker+'\n'+'\n'.join(sorted(ignore_entries))+'\n',encoding='utf-8')
groups = collections.defaultdict(lambda:[0,0])
for item in included:
    group='/'.join(item['path'].split('/')[:2])
    groups[group][0]+=1
    groups[group][1]+=item['bytes']
print(json.dumps({'include_count':len(included),'include_bytes':sum(r['bytes'] for r in included),'exclude_count':len(excluded),'excluded_bytes':sum(r['bytes'] for r in excluded),'secret_candidates':secret_files,'groups':dict(groups)},indent=2))
