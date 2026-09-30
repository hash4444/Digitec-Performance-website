import json,zipfile,hashlib
from pathlib import Path
b=Path('outputs/g3/baseline');m=json.loads((b/'file-manifest.json').read_text())
changed=[r for r,v in m.items() if Path(r).is_file() and hashlib.sha256(Path(r).read_bytes()).hexdigest()!=v['sha256']]
print('Build changed baseline files:',changed)
with zipfile.ZipFile(b/'local-g2-approved-files.zip') as z:
 for r in ['supabase/functions/mcp/index.ts','docs/seo/protection-release-validation.json']:
  if r in changed:Path(r).write_bytes(z.read(r))
d=json.loads((b/'baseline.json').read_text());d.update(typecheck='PASS',build='PASS',routingValidators='PASS',seoValidators='PASS',routeCount=1247,sitemapCanonicalCount=996);(b/'baseline.json').write_text(json.dumps(d,indent=2))
s=Path('outputs/g2/capture.mjs').read_text();s=s.replace("path.resolve('outputs/g2')","path.resolve('outputs/g3/baseline')");s=s[:s.index("if (phase === 'baseline')")]+"console.log(`Captured ${pages.length} local baseline pages`);\n";Path('outputs/g3/capture-baseline.mjs').write_text(s)
p=Path('outputs/g3/discover.py');s=p.read_text(encoding='utf-8-sig').replace(r'paint\s*protect',r'paint[\s-]*protect');p.write_text(s,encoding='utf-8')
