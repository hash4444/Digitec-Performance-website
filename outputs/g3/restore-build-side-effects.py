import json,zipfile,hashlib
from pathlib import Path
O=Path('outputs/g3');base=O/'baseline';m=json.loads((base/'file-manifest.json').read_text())
with zipfile.ZipFile(base/'local-g2-approved-files.zip') as z:
 for r in ['supabase/functions/mcp/index.ts','docs/seo/protection-release-validation.json']:Path(r).write_bytes(z.read(r))
pages=json.loads((O/'after-pages.json').read_text(encoding='utf-8'))
print('BODY CANDIDATES',len([p for p in pages if 'body-repair' in p['path']]))
print('DUPLICATION',len(json.loads((O/'duplication.json').read_text(encoding='utf-8'))))
for p in json.loads((O/'duplication.json').read_text(encoding='utf-8')):print(p['a'],p['b'],p['identical_paragraphs'],p['examples'][0][:90])
