import json,pathlib,re,gzip,collections,math,csv,hashlib
from urllib.parse import urlsplit
from bs4 import BeautifulSoup
O=pathlib.Path(__file__).parent; R=O.parents[1]; B='https://digitecme.com'
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def save(n,v):(O/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf8')
def rows(stem,sheet):
 d=load(O/('xlsx-digitecme.com-Performance-on-Search-'+stem+'.json'))
 return [dict(zip(['key','clicks','impressions','ctr','position'],list(r['cells'].values())))|{'row':r['row']} for r in d[sheet][1:]]
live=load(O/'live-pages.json'); crawl=load(R/'audit-evidence/crawl/all-results.json'); by={r['url']:r for r in crawl}
pages=rows('2026-09-27','Pages');queries=rows('2026-09-27','Queries');pg={r['key']:r for r in pages}
inlinks=collections.defaultdict(list)
for x in crawl:
 if x.get('home_fallback') or x.get('status')!=200:continue
 for l in x.get('internal_links',[]):
  inlinks[l['url'].split('#')[0]].append({'source':x['url'],'anchor':l['anchor']})
def clean(raw):
 s=BeautifulSoup(raw,'html.parser'); n=s.find('main') or s.body or s
 for t in n.select('header,footer,nav,aside,script,style,noscript'):t.decompose()
 return re.sub(r'\s+',' ',n.get_text(' ',strip=True)).strip()
result={}
for x in live:
 if 'error' in x:continue
 path=x['path'];txt=clean(gzip.decompress((O/x['html_file']).read_bytes()))
 z=by.get(x['url'],{}); incoming=inlinks.get(x['url'],[])
 result[path]={**x,'clean_text':txt,'clean_word_count':len(txt.split()),'six_month_page':pg.get(x['url']),'crawl_sitemap':z.get('sitemap'),'crawl_indexability':z.get('crawl_indexability'),'crawl_content_word_count':z.get('content_word_count'),'inlink_source_count':len(set(l['source'] for l in incoming)),'inlink_anchors':collections.Counter(l['anchor'] for l in incoming).most_common(10),'inlink_examples':list({l['source']:l for l in incoming}.values())[:12]}
save('page-evidence.json',result)
def period(stem,start,end):
 rr=[r for r in rows(stem,'Chart') if start<=r['key']<=end];i=sum(r['impressions'] for r in rr);c=sum(r['clicks'] for r in rr)
 return {'start':start,'end':end,'days':len(rr),'clicks':c,'impressions':i,'ctr':c/i if i else 0,'approx_impression_weighted_position':sum(float(r['position'] or 0)*r['impressions'] for r in rr)/i if i else None}
trends={}
for stem,last,prev,end,p_end in [('2026-09-27','2026-08-29','2026-08-01','2026-09-25','2026-08-28'),('2026-09-19','2026-08-20','2026-07-23','2026-09-16','2026-08-19'),('2026-09-19 (1)','2026-08-20','2026-07-23','2026-09-16','2026-08-19')]:
 trends[stem]={'last28':period(stem,last,end),'previous28':period(stem,prev,p_end)}
trends['six_month_site']=period('2026-09-27','2026-04-12','2026-09-25')
save('gsc-trends.json',trends)
save('gsc-latest-tables.json',{'pages':pages,'queries':queries})
def normalize(q):
 q=q.lower().strip();q=re.sub(r'\bin dubai\b','dubai',q)
 for a,b in [(r'\brepairs\b','repair'),(r'\bservicing\b','service'),(r'\bservice centre\b','service center'),(r'\bgearbox\b','transmission'),(r'\btyres?\b','tire'),(r'\btires\b','tire'),(r'\btouchscreen\b','screen'),(r'\bnearby\b','near me')]:q=re.sub(a,b,q)
 return re.sub(r'\s+',' ',q)
normalized=[{**r,'normalized':normalize(r['key'])} for r in queries];save('normalized-queries.json',normalized)
patterns={'generic':r'car (?:garage|workshop)|garage near|luxury car (?:repair|workshop)|car repair dubai','bmw':r'bmw','porsche':r'porsche','range_rover':r'range rover','ferrari':r'ferrari','lamborghini':r'lamborghini','mercedes':r'mercedes|airmatic|comand|xentry','ac':r'\bac\b|air condition','battery':r'battery','rox_soft_close':r'rox|soft.close','paint':r'paint|ppf|ceramic|polish','audi':r'audi'}
demands={k:{'query_count':len(rr),'clicks':sum(x['clicks'] for x in rr),'impressions':sum(x['impressions'] for x in rr),'top_queries':sorted(rr,key=lambda x:-x['impressions'])[:12]} for k,p in patterns.items() for rr in [[r for r in queries if re.search(p,r['key'],re.I)]]};save('query-family-demand.json',demands)
pairs=[('/','/best-car-workshop-dubai'),('/','/services/car-garage-dubai'),('/','/services/garage-near-me-dubai')]+[(f'/brands/{b}-service-dubai',f'/best-{b}-workshop-dubai') for b in ['bmw','porsche','range-rover','ferrari','lamborghini','audi']]+[('/blog/car-ac-not-cold-dubai-causes','/blog/car-ac-repair-dubai'),('/blog/car-battery-life-dubai-heat','/blog/car-battery-replacement-dubai'),('/services/soft-close-door-repair-dubai','/brands/rox-service-dubai/soft-close-door-installation'),('/services/paint-protection-dubai','/services/paint-protection-film'),('/services/head-unit-repair-dubai','/services/mercedes-audio-upgrade-dubai'),('/services/mercedes-diagnostics-dubai','/services/mercedes-electrical-repair-dubai'),('/blog/mercedes-benz-maintenance-guide-dubai','/blog/mercedes-service-intervals-dubai-heat'),('/blog/mercedes-repair-dubai-complete-guide','/brands/mercedes-benz-service-dubai')]
sim=[]
for a,b in pairs+[(('/ar'+a if a!='/' else '/ar'),'/ar'+b) for a,b in pairs]:
 if a not in result or b not in result:continue
 ta=re.findall(r'\w+',result[a]['clean_text'].lower());tb=re.findall(r'\w+',result[b]['clean_text'].lower());ca=collections.Counter(ta);cb=collections.Counter(tb)
 sa=set(tuple(ta[i:i+5]) for i in range(len(ta)-4));sb=set(tuple(tb[i:i+5]) for i in range(len(tb)-4))
 sim.append({'a':a,'b':b,'token_cosine':sum(v*cb[k] for k,v in ca.items())/math.sqrt(sum(v*v for v in ca.values())*sum(v*v for v in cb.values())),'five_word_jaccard':len(sa&sb)/len(sa|sb) if sa|sb else 0,'shorter_shingle_containment':len(sa&sb)/min(len(sa),len(sb)) if sa and sb else 0})
save('content-similarity.json',sim)
print('Trends',json.dumps(trends,indent=2));print('Demand',[(k,v['clicks'],v['impressions']) for k,v in demands.items()])
for p in ['/blog/car-ac-not-cold-dubai-causes','/blog/car-ac-repair-dubai','/blog/car-battery-life-dubai-heat','/blog/car-battery-replacement-dubai','/ar/best-ferrari-workshop-dubai','/ar/best-lamborghini-workshop-dubai','/blog/mercedes-benz-maintenance-guide-dubai','/blog/mercedes-service-intervals-dubai-heat','/blog/mercedes-repair-dubai-complete-guide']:
 x=result.get(p,{})
 print('\nPAGE',p,'TITLE',x.get('title'),'GSC',x.get('six_month_page'),'LINKS',x.get('inlink_source_count'),'H2',x.get('h2'),'TEXT',x.get('clean_text','')[:16000])

