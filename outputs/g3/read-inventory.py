import json,csv,gzip,re
from pathlib import Path
from lxml import html
O=Path('outputs/g3');pages=json.loads((O/'baseline/baseline-pages.json').read_text());rs=json.loads((O/'protection-source-observations.json').read_text(encoding='utf-8'))
for p in pages:
 if re.search('paint-protect|ceramic|polishing',p['path']):
  d=html.fromstring(gzip.decompress((O/'baseline'/p['htmlFile']).read_bytes()).decode());print(p['path'],json.dumps({k:p['seo'].get(k) for k in ['title','description','canonical','noindex','hasArabicVersion']},ensure_ascii=False));print('H1',d.xpath('//h1/text()'));print('BODY',re.sub(r'\s+',' ',''.join(d.xpath('//main//text()')))[:1200])
with Path('g1-to-g3-deferred-keywords.csv').open(encoding='utf-8-sig') as f:hand=list(csv.DictReader(f))
print('HANDOFF',len(hand),len({x['normalized_keyword'] for x in hand}))
print('TERMS',json.dumps(sorted({r['normalized_keyword'] for r in rs}),ensure_ascii=False))
