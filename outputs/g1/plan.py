"""Pre-implementation owner/capability inventory from the approved current baseline."""
import csv,gzip,json,re
from pathlib import Path
from collections import defaultdict
from lxml import html
from urllib.parse import urlsplit
O=Path(__file__).parent;R=O.parents[1]
read=lambda n:json.loads((O/n).read_text(encoding='utf-8'))
P={x['path']:x for x in read('baseline-pages.json')};F=read('taxonomy.json');obs=read('all-keyword-observations.json')
def write(n,fields,rows):
 with (O/n).open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(rows)
def doc(p):return html.fromstring(gzip.decompress((O/P[p]['htmlFile']).read_bytes()).decode('utf-8'))
def txt(d):return re.sub(r'\s+',' ',d.text_content()).strip()
owners=sorted({v[0] for v in F.values() if v[0]}|{'/services'})
paths=sorted(set(owners)|{('/ar' if p=='/' else '/ar'+p) for p in owners if ('/ar' if p=='/' else '/ar'+p) in P})
incoming=defaultdict(set)
for p in P:
 d=doc(p)
 for a in d.xpath('//main//a[@href]'):
  q=urlsplit(a.get('href')).path
  if q in P:incoming[q].add(p)
rows=[]
for p in paths:
 d=doc(p);base=p.removeprefix('/ar') or '/';families=[k for k,v in F.items() if v[0]==base];seo=P[p]['seo']
 links=sorted({urlsplit(a.get('href')).path for a in d.xpath('//main//a[@href]') if urlsplit(a.get('href')).path in P and not a.xpath('ancestor::nav') and not any('Brand Specialists' in txt(s) or 'متخصصون' in txt(s) for s in a.xpath('ancestor::section') if s.xpath('.//h2'))})
 rows.append(dict(url=p,current_title=seo['title'],current_h1=' | '.join(txt(x) for x in d.xpath('//h1')),indexability='noindex' if seo.get('noindex') else 'index',canonical=seo['canonical'],current_primary_task=families[0] if families else 'Service directory',secondary_tasks='; '.join(families[1:]),service_family='; '.join(families),brand_relationships='; '.join(x for x in links if '/brands/' in x or '/mercedes-' in x or 'cadillac-cue' in x),gsc_evidence='Separate query observations and page totals; no generic query × page join',internal_link_strength=f'{len(incoming[p])} incoming contextual source pages',potential_competitors='; '.join(x for x in owners if x in links and x!=base),notes='Baseline rendered page reviewed; local language policy retained'))
write('generic-service-inventory.csv','url current_title current_h1 indexability canonical current_primary_task secondary_tasks service_family brand_relationships gsc_evidence internal_link_strength potential_competitors notes'.split(),rows)
(O/'generic-paths.json').write_text(json.dumps(paths),encoding='utf-8')
lines=['# G1 pre-implementation owner map','', 'Baseline: 1f4960a35d330ea56a1871cbd6efa06233828757. Created before source edits.','', 'Queries establish editorial intent, not historical landing URLs. Existing architecture first; no new URL proposed. Brand-first observations are retained in the evidence ledger but excluded from generic demand.','', '| Service family | Selected existing owner | Boundary / disposition |','|---|---|---|']
for f,(p,why) in F.items():lines.append(f'| {f} | {p or "NOT TARGETED / UNVERIFIED"} | {why} |')
lines+=['','## Implementation decisions','', 'Retain the existing specialized transmission, suspension, AC, oil, tyre and head-unit owners unless rendered QA identifies a defect. The mixed head-unit/COMAND owner and soft-close repair/ROX installation relationships are protected.','', 'Diagnostics: remove unsupported key-programming promotion; focus the heading on fault investigation; distinguish a diagnostic finding from a repair or programming decision. Electrical: make screen and reverse-camera fault assessment visible without promising screen replacement or installation. Routine service: focus the heading on maintenance rather than a list of brand names. Broad garage: distinguish planning an appointment from the homepage business overview.','', 'Capability ceiling: a current site statement is site evidence, not independent manufacturer authorization. Supported coding/programming, engine rebuild and performance exhaust remain vehicle-specific enquiries. Generic key programming, CarPlay, audio upgrades, camera installation, wheel restoration, pre-purchase inspection and high-voltage work are not promoted.','', 'Broad overlap remains an editorial risk, not proven harmful cannibalization. No redirects, mergers or canonical changes. Backlink/conversion evidence and generic query × page joins are unavailable.']
(O/'generic-service-owner-map.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps({'generic_routes':len(paths),'existing_owner_paths':len(owners),'families':len(F),'incoming_zero':[p for p in paths if not incoming[p]]}))


