import json,re,hashlib
from pathlib import Path
from collections import Counter,defaultdict,deque
from urllib.parse import urljoin,urlsplit,unquote
from lxml import html
O=Path(__file__).parent
import sys
phase=sys.argv[1] if len(sys.argv)>1 else 'after'
routes=json.loads((O/'baseline/approved-routes.json').read_text())
paths={r['path'] for r in routes}; edges=[]; policies=[]; incoming=defaultdict(lambda:defaultdict(set)); graph=defaultdict(set)
norm=lambda s:re.sub(r'\s+',' ',s).strip()
for r in routes:
 p=r['path']; f=Path('dist')/p.lstrip('/')/'index.html'; raw=f.read_bytes(); d=html.fromstring(raw.decode('utf-8'))
 policies.append(dict(url=p,html_sha256=hashlib.sha256(raw).hexdigest(),canonical=d.xpath('//link[@rel="canonical"]/@href'),robots=d.xpath('//meta[@name="robots"]/@content'),hreflang=[dict(language=x.get('hreflang'),href=x.get('href')) for x in d.xpath('//link[@hreflang]')],schema=d.xpath('//script[@type="application/ld+json"]/text()')))
 for a in d.xpath('//a[@href]'):
  u=urlsplit(urljoin('https://digitecme.com'+p,a.get('href')))
  if u.netloc not in ('digitecme.com','www.digitecme.com'):continue
  target=unquote(u.path);anc=list(a.iterancestors());kind='contextual body'
  if any(n.tag=='footer' for n in anc):kind='footer'
  elif any(n.tag=='nav' and 'breadcrumb' in (n.get('aria-label','')+n.get('class','')).lower() for n in anc):kind='breadcrumb'
  elif a.get('hreflang') or (target!=p and ('/ar'+p==target or p.removeprefix('/ar')==target)):kind='language switch'
  elif any(n.tag=='nav' or n.tag=='header' and not n.xpath('.//h1') for n in anc):kind='navigation'
  elif a.xpath('.//h2|.//h3|.//h4'):kind='service / article card'
  elif any(n.tag=='section' and any('Brand Specialists' in norm(h.text_content()) or 'متخصصون' in norm(h.text_content()) for h in n.xpath('./div/h2|./h2|./div/div/h2')) for n in anc):kind='brand directory'
  edges.append(dict(source=p,target=target,fragment=unquote(u.fragment),anchor=norm(a.text_content()),kind=kind))
  if target in paths and target!=p:
   incoming[target][kind].add(p)
   if kind!='language switch':graph[p].add(target)
depth={}
for root in ['/','/ar']:
 q=deque([root]);depth[root]=0
 while q:
  p=q.popleft()
  for t in graph[p]:
   if t not in depth and (t=='/ar' or t.startswith('/ar/'))==(root=='/ar'):depth[t]=depth[p]+1;q.append(t)
(O/phase/'policy-html-manifest.json').write_text(json.dumps(policies,ensure_ascii=False),encoding='utf-8')
(O/'internal-link-graph.json').write_text(json.dumps(dict(edges=edges,depth=depth,incoming={p:{k:sorted(v) for k,v in kinds.items()} for p,kinds in incoming.items()}),ensure_ascii=False),encoding='utf-8')
summary=dict(link_types=dict(Counter(e['kind'] for e in edges)),max_depth=max(depth.values()),unreachable=sorted(paths-set(depth)),contextual_orphans=[p for p in paths if not incoming[p]['contextual body'] and not incoming[p]['service / article card']])
(O/phase/'graph-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
