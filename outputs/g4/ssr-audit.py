import json,re,csv
from pathlib import Path
from lxml import html
O=Path(__file__).parent
import sys
phase=sys.argv[1] if len(sys.argv)>1 else 'baseline'
(O/phase).mkdir(exist_ok=True)
routes=json.loads((O/'baseline/approved-routes.json').read_text());rows=[];issues=[]
def norm(s):return re.sub(r'\s+',' ',html.fromstring('<div>'+str(s)+'</div>').text_content()).strip()
def nodes(v):
 if isinstance(v,dict):
  yield v
  for x in v.values():yield from nodes(x)
 elif isinstance(v,list):
  for x in v:yield from nodes(x)
for r in routes:
 p=r['path'];d=html.fromstring((Path('dist')/p.lstrip('/')/'index.html').read_text(encoding='utf-8'))
 can=d.xpath('//link[@rel="canonical"]/@href');schemas=[];si=[];fi=[]
 for s in d.xpath('//script[@type="application/ld+json"]/text()'):
  try:schemas.extend(nodes(json.loads(s)))
  except Exception:si.append('Invalid JSON-LD')
 visible=html.fromstring(html.tostring(d,encoding='unicode'))
 for n in visible.xpath('//script|//style'):n.drop_tree()
 txt=norm(visible.text_content());faqs=[n for n in schemas if n.get('@type')=='Question'];matched=0
 for q in faqs:
  answer=q.get('acceptedAnswer',{});answer=answer[0] if isinstance(answer,list) and answer else answer
  if norm(q.get('name','')) in txt and norm(answer.get('text','')) in txt:matched+=1
  else:fi.append(q.get('name','Missing question'))
 for s in schemas:
  if s.get('@type') in ('Service','Article','BlogPosting','WebPage') and s.get('url') and s['url'] not in can and r['family']!='blog-hub':si.append('Schema URL mismatch: '+s['url'])
 h1=d.xpath('//h1');main=d.xpath('//main') or visible.xpath('//body') or [visible];ssr=[]
 if len(h1)!=1:ssr.append('H1 count '+str(len(h1)))
 if not main or len(norm(main[0].text_content()))<100:ssr.append('Substantive main content needs review')
 row=dict(url=p,page_type=r['family'],schema_types=' | '.join(sorted({str(n['@type']) for n in schemas if '@type' in n})),canonical_match='PASS' if not si else 'REVIEW',breadcrumb_status='PRESENT' if any(n.get('@type')=='BreadcrumbList' for n in schemas) else 'NOT EMITTED',faq_schema_emitted='YES' if faqs else 'NO',visible_faq_count=matched,schema_faq_count=len(faqs),initial_html_title=bool(d.xpath('//title/text()')),initial_html_h1=len(h1),initial_html_body=bool(main),initial_html_links=len(d.xpath('//main//a[@href]')),schema_issue=' | '.join(si),faq_issue=' | '.join(fi),ssr_issue=' | '.join(ssr),g4_action='REVIEW' if si or fi or ssr else 'RETAINED',blocking='REVIEW' if si or fi or ssr else 'NO',notes='FAQ presence checked against initial HTML excluding script/style; accordion answers may be collapsed.')
 rows.append(row)
 if si or fi or ssr:issues.append(row)
with (O/phase/'schema-faq-ssr-audit.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
(O/phase/'schema-faq-ssr-issues.json').write_text(json.dumps(issues,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(dict(routes=len(rows),faq_pairs=sum(r['schema_faq_count'] for r in rows),issues=len(issues),sample=issues[:3]),ensure_ascii=False,indent=2))
