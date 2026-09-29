import pathlib,json,gzip,collections,re
from urllib.parse import urljoin,urldefrag,urlsplit
from bs4 import BeautifulSoup
O=pathlib.Path(__file__).parent;R=O.parents[1];B='https://digitecme.com'
c=json.loads((R/'audit-evidence/crawl/all-results.json').read_text(encoding='utf8'));selected=json.loads((O/'page-evidence.json').read_text(encoding='utf8'));targets={B+p for p in selected};out=collections.defaultdict(list);screen=[];seen=set()
for x in c:
 if x.get('status')!=200 or x.get('home_fallback') or not x.get('canonicals') or x['canonicals'][0]!=x['url'] or x['url'] in seen:continue
 seen.add(x['url']);screen.append({k:x.get(k) for k in ['url','titles','h1','meta_descriptions','crawl_indexability','sitemap','content_word_count']})
 f=R/'audit-evidence/crawl'/x['html_evidence']
 s=BeautifulSoup(gzip.decompress(f.read_bytes()),'html.parser')
 for a in s.select('a[href]'):
  t=urldefrag(urljoin(x['url'],a['href']))[0]
  if t not in targets or t==x['url']:continue
  region='footer' if a.find_parent('footer') else 'header' if a.find_parent('header') and not a.find_parent('main') else 'breadcrumb' if a.find_parent('nav',attrs={'aria-label':re.compile('breadcrumb|مسار',re.I)}) else 'navigation' if a.find_parent('nav') else 'content'
  leaf=urlsplit(x['url']).path.rstrip('/').split('/')[-1]
  child_service=bool(re.search(r'/brands/[^/]+/[^/]+$',x['url'])) and bool(re.search(r'repair|change|replacement|diagnostic|installation',leaf))
  kind='blog' if '/blog/' in x['url'] else 'service' if '/services/' in x['url'] or child_service else 'model' if '/models/' in x['url'] or re.search(r'/brands/[^/]+/[^/]+$',x['url']) else 'brand hub' if '/brands/' in x['url'] else 'directory' if leaf in ['services','brands'] else 'other'
  out[t].append({'source':x['url'],'anchor':a.get_text(' ',strip=True),'region':region,'source_type':kind})
summary={t:{'unique_sources':len({l['source'] for l in ls}),'by_region':{r:len({l['source'] for l in ls if l['region']==r}) for r in ['header','footer','navigation','breadcrumb','content']},'content_by_source_type':dict(collections.Counter(k for k in ['blog','model','service','brand hub','directory','other'] for _ in {l['source'] for l in ls if l['region']=='content' and l['source_type']==k})),'anchors':collections.Counter(l['anchor'] for l in ls).most_common(8),'content_examples':[l for l in ls if l['region']=='content'][:8]} for t,ls in out.items()}
(O/'internal-link-evidence.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf8');(O/'sitewide-screening.json').write_text(json.dumps(screen,ensure_ascii=False,indent=2),encoding='utf8');print('Screened',len(screen),'targets',len(summary))
