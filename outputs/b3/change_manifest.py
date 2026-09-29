import hashlib, json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
out=root/'outputs/b3'
before=json.loads((out/'source-hashes-before.json').read_text(encoding='utf-8'))
changed=[]
for name,old in before.items():
    p=root/name
    if not p.exists() or hashlib.sha256(p.read_bytes()).hexdigest()!=old:changed.append(name)
for directory in ('src','scripts','cloudflare','docs/seo'):
    for p in (root/directory).rglob('*'):
        if p.is_file() and p.relative_to(root).as_posix() not in before:changed.append(p.relative_to(root).as_posix())
changed=sorted(set(changed))
(out/'b3-change-manifest.json').write_text(json.dumps({'changed_or_new_files':changed,'count':len(changed)},indent=2)+'\n',encoding='utf-8')
print(len(changed),'B3 source/generated files')
