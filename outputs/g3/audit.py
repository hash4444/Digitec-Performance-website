import gzip,json,re,csv
from pathlib import Path
from collections import defaultdict,deque
from urllib.parse import urlsplit,unquote
from lxml import html
from difflib import SequenceMatcher
O=Path(__file__).parent;R=O.parents[1]
load=lambda n:json.loads((O/n).read_text(encoding='utf-8'))
B={x['path']:x for x in load('baseline-pages.json')};A={x['path']:x for x in load('after-pages.json')};paths=load('generic-paths.json')
def norm(x):return re.sub(r'\s+',' ',str(x or '')).strip()
docs={phase:{p:html.fromstring(gzip.decompress((O/x['htmlFile']).read_bytes()).decode('utf-8')) for p,x in data.items()} for phase,data in [('before',B),('after',A)]}
def main(d):return (d.xpath('//main') or [d])[0]
def sig(d):
 m=main(d)
 return [norm(m.text_content()),[(a.get('href'),norm(a.text_content())) for a in m.xpath('.//a[@href]')],[(i.get('alt'),re.sub(r'-[\w-]{8}([.])',r'\1',i.get('src',''))) for i in m.xpath('.//img')]]
incoming=defaultdict(set);graph=defaultdict(set)
def target(h,p):
 u=urlsplit(h)
 if u.scheme not in ('','http','https') or u.netloc not in ('','digitecme.com','www.digitecme.com'):return None
 return unquote(u.path or p)
for p,d in docs['after'].items():
 for a in main(d).xpath('.//a[@href]'):
  q=target(a.get('href'),p)
  if q in A and q!=p:graph[p].add(q);incoming[q].add(p)
def depths(root):
 dist={root:0};queue=deque([root])
 while queue:
  p=queue.popleft()
  for q in graph[p]:
   if q not in dist and q.startswith('/ar')==root.startswith('/ar'):dist[q]=dist[p]+1;queue.append(q)
 return dist
dep={**depths('/'),**depths('/ar')}
redirects={}
for line in (R/'dist/_redirects').read_text().splitlines():
 x=line.split()
 if len(x)>2 and x[-1] in ('301','302','307','308'):redirects[x[0]]=x[1]
result=dict(route_count=len(A),route_set_equal=set(A)==set(B),policy_changes=[],protected={},pages=[],links_checked=0,broken_links=[],redirecting_links=[],missing_fragments=[],orphans=[],schema_issues=[],faq_issues=[],image_issues=[],nojs_issues=[],hreflang_issues=[],faq_pairs=0)
result['contextual_links_checked']=0
for p in A:
 for k in ('canonical','noindex','hasArabicVersion'):
  if A[p]['seo'].get(k)!=B[p]['seo'].get(k):result['policy_changes'].append([p,k])
for brand in ['mercedes','porsche','bmw','ferrari','lamborghini','rolls-royce','bentley','maybach','range-rover','defender','jaguar','cadillac','volkswagen','jetour','rox']:
 ps=[p for p in A if brand in p]
 result['protected'][brand]={'reviewed':len(ps),'changes':[p for p in ps if B[p]['seo']!=A[p]['seo'] or sig(docs['before'][p])!=sig(docs['after'][p])]}
for p in paths:
 d=docs['after'][p];m=main(d);text=norm(m.text_content());seo=A[p]['seo'];old=B[p]['seo'];full=html.fromstring((R/'dist'/p.lstrip('/')/'index.html').read_bytes())
 if not incoming[p]:result['orphans'].append(p)
 for a in m.xpath('.//a[@href]'):
  h=a.get('href');q=target(h,p)
  if q is None:continue
  result['links_checked']+=1
  if not a.xpath('ancestor::nav') and not any('Brand Specialists' in norm(s.text_content()) or 'متخصصون' in norm(s.text_content()) for s in a.xpath('ancestor::section') if s.xpath('.//h2')):result['contextual_links_checked']+=1
  if q in A:
   f=unquote(urlsplit(h).fragment)
   if f and not docs['after'][q].xpath('//*[@id=$v]',v=f):result['missing_fragments'].append([p,h])
  elif q in redirects:result['redirecting_links'].append([p,h])
  elif not Path(q).suffix:result['broken_links'].append([p,h])
 for n in seo.get('jsonLd',{}).get('@graph',[]):
  typ=n.get('@type')
  if typ in ('Service','WebPage','Article') and n.get('url') and n['url']!=seo['canonical']:result['schema_issues'].append([p,typ,'URL mismatch'])
  if typ=='FAQPage':
   for faq in n.get('mainEntity',[]):
    result['faq_pairs']+=1
    if norm(faq.get('name')) not in text or norm(faq.get('acceptedAnswer',{}).get('text')) not in text:result['faq_issues'].append([p,faq.get('name')])
 for i in m.xpath('.//img'):
  src=i.get('src','')
  if i.get('alt') is None or (src.startswith('/') and not (R/'dist'/src.lstrip('/')).is_file()):result['image_issues'].append([p,src])
 for a in full.xpath('//head/link[@rel="alternate"][@hreflang]'):
  q=target(a.get('href'),p)
  if q not in A or A[q]['seo'].get('noindex'):result['hreflang_issues'].append([p,q])
 checks={'title':bool(full.xpath('//title')),'description':bool(full.xpath('//meta[@name="description"]')),'canonical':bool(full.xpath('//link[@rel="canonical"]')),'robots':bool(full.xpath('//meta[@name="robots"]')),'h1':len(full.xpath('//h1'))==1,'body':len(text)>300,'links':bool(m.xpath('.//a[@href]'))}
 if not all(checks.values()):result['nojs_issues'].append([p,checks])
 result['pages'].append(dict(url=p,old_title=old['title'],new_title=seo['title'],old_h1=' | '.join(norm(x.text_content()) for x in docs['before'][p].xpath('//h1')),new_h1=' | '.join(norm(x.text_content()) for x in d.xpath('//h1')),changed=old!=seo or sig(docs['before'][p])!=sig(d),incoming=len(incoming[p]),outgoing=len(graph[p]),depth=dep.get(p),canonical=seo['canonical'],noindex=bool(seo.get('noindex'))))
# Compare paragraph text, excluding navigation, business/contact/CTA blocks, rather than whole-page template chrome.
paras={p:[norm(x.text_content()) for x in main(docs['after'][p]).xpath('.//p') if len(norm(x.text_content()))>110 and not x.xpath('ancestor::header|ancestor::footer')] for p in paths}
similar=[]
for i,p in enumerate(paths):
 for q in paths[i+1:]:
  if p.startswith('/ar')!=q.startswith('/ar'):continue
  a=set(paras[p]);b=set(paras[q]);shared=a&b
  if shared:similar.append({'a':p,'b':q,'identical_paragraphs':len(shared),'shorter_page_share':round(len(shared)/max(1,min(len(a),len(b))),3),'examples':sorted(shared)[:2]})
(O/'duplication.json').write_text(json.dumps(similar,ensure_ascii=False,indent=2),encoding='utf-8')
result['maximum_depth']=max(x['depth'] or 0 for x in result['pages']);result['unreachable']=[x['url'] for x in result['pages'] if x['depth'] is None]
(O/'audit-summary.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k not in ('pages','protected')},ensure_ascii=False))
print(json.dumps(result['protected']))



# G2-specific preservation and initial HTML verification, in addition to shared checks.
g1paths=json.loads((R/'outputs/g1/generic-paths.json').read_text(encoding='utf-8'))
result['g1_preservation']={'reviewed':len(g1paths),'changes':[p for p in g1paths if A[p]['seo']!=B[p]['seo'] or sig(docs['before'][p])!=sig(docs['after'][p])]}
result['all_changed_routes']=[p for p in A if A[p]['seo']!=B[p]['seo'] or sig(docs['before'][p])!=sig(docs['after'][p])]
result['initial_faq_issues']=[]
for p in paths:
 full=html.fromstring((R/'dist'/p.lstrip('/')/'index.html').read_text(encoding='utf-8'))
 visible=norm(main(full).text_content())
 for node in A[p]['seo'].get('jsonLd',{}).get('@graph',[]):
  if node.get('@type')=='FAQPage':
   for faq in node.get('mainEntity',[]):
    if norm(faq.get('name')) not in visible or norm(faq.get('acceptedAnswer',{}).get('text')) not in visible:result['initial_faq_issues'].append([p,faq.get('name')])
(O/'audit-summary.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print('G1 preservation',result['g1_preservation'],'changed routes',result['all_changed_routes'],'initial FAQ issues',result['initial_faq_issues'])

g2paths=json.loads((R/'outputs/g2/generic-paths.json').read_text(encoding='utf-8'))
result['g2_preservation']={'reviewed':len(g2paths),'changes':[p for p in g2paths if A[p]['seo']!=B[p]['seo'] or sig(docs['before'][p])!=sig(docs['after'][p])]}
(O/'audit-summary.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print('G2 preservation',result['g2_preservation'])
