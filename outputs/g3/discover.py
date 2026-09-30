import json,re,csv,unicodedata
from pathlib import Path
out=Path('outputs/g3'); records=json.loads((out/'all-source-observations.json').read_text(encoding='utf-8'))
pattern=re.compile(r'paint.?shield|prtection|protect|coating|paint.*film|clear.?coat|window.?tint|\bppf\b|paint[\s-]*protect|ceramic|nano.?coat|clear.?bra|clear.?film|polish|paint.?correct|swirl|scratch|paint.?restor|detail|حماية|سيراميك|تلميع',re.I)
selected=[r for r in records if pattern.search(r['keyword'])]
for r in selected:
 s=unicodedata.normalize('NFKC',r['keyword']).lower().strip();s=re.sub(r'[-–—]',' ',s);s=re.sub(r'\s+',' ',s);r['normalized_keyword']=s
(out/'protection-source-observations.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2),encoding='utf-8')
with (out/'protection-terms-review.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(selected[0]));w.writeheader();w.writerows(selected)
pages=json.loads(Path('outputs/g2/after-pages.json').read_text(encoding='utf-8'))
for p in pages:
 if pattern.search(p['path']): print(p['path'])
print('EVIDENCE',len(selected),'observations',len({r['normalized_keyword'] for r in selected}),'terms including brands and potential false positives')


