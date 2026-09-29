import json,gzip,re,collections
from pathlib import Path
from lxml import html
x=json.load(open('outputs/b5/after-pages.json',encoding='utf8')); b=[p for p in x if any(t in p['path'] for t in ['rolls-royce','bentley','maybach','mercedes-benz'])]; s=collections.defaultdict(set)
for p in b:
 d=html.fromstring(gzip.decompress((Path('outputs/b5')/p['htmlFile']).read_bytes()).decode('utf8'))
 for e in d.xpath('//main//p'):
  t=re.sub(r'\s+',' ',e.text_content()).strip()
  if len(t)>120:s[t].add(p['path'])
shared=[(t,ps) for t,ps in s.items() if len(ps)>1 and len({('rr' if 'rolls-royce' in x else 'be' if 'bentley' in x else 'ma' if 'maybach' in x else 'me') for x in ps})>1]
print('cross-brand exact substantive paragraphs',len(shared));print([(len(t),len(ps),list(ps)[:3]) for t,ps in shared[:10]])
