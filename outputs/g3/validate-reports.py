import json,csv,re
from pathlib import Path
O=Path('outputs/g3');q=json.loads((O/'audit-summary.json').read_text(encoding='utf-8'));print({k:q[k] for k in ['links_checked','contextual_links_checked','maximum_depth','faq_pairs']})
files=sorted(Path('.').glob('g3-*'));print('Deliverables',len(files))
for p in files:
 if p.suffix=='.csv':
  with p.open(encoding='utf-8-sig') as f:r=list(csv.DictReader(f))
  assert all(None not in x for x in r),p
  print(p.name,len(r))
 else:print(p.name,len(re.findall(r'^## \d+\.',p.read_text(encoding='utf-8'),re.M)))
with Path('g3-protection-keyword-coverage.csv').open(encoding='utf-8-sig') as f:r=list(csv.DictReader(f))
for x in r:
 if x['measured_or_generated']!='MEASURED GSC':assert all(not x[k] for k in ['gsc_clicks','gsc_impressions','gsc_ctr','gsc_position']),x
assert len(files)==15
print('CSV metrics and shape PASS')
