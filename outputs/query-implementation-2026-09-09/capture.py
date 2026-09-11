from pathlib import Path
import json, urllib.request, concurrent.futures, datetime, hashlib
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).resolve().parent
baseline=ROOT/'outputs/search-query-2026-09-09'
reports=json.loads((baseline/'reports.json').read_text('utf-8'))
queries=json.loads((baseline/'query-map.json').read_text('utf-8'))
paths=set(reports['proposals'])
paths.update(q['owner'].replace('https://digitecme.com','') for q in queries if q['owner'].startswith('https://digitecme.com') and (q['priority']=='CRITICAL' or q['position']<=10 and q['impressions']>=20 and q['ctr']<.01))
paths.update(g['existing_owner'].replace('https://digitecme.com','') for g in reports['gaps'] if g['existing_owner'].startswith('https://digitecme.com'))
paths.update(['/services/mercedes-repair-dubai','/services/mercedes-service-dubai'])
(OUT/'live-before').mkdir(exist_ok=True)
class Parser(HTMLParser):
 def __init__(self):
  super().__init__(); self.title='';self.h1=[];self.headings=[];self.meta={};self.canonical='';self.links=[];self.capture=None
 def handle_starttag(self,t,a):
  a=dict(a)
  if t in ['title','h1','h2','h3']:self.capture=[t,[]]
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.canonical=a.get('href','')
  if t=='a':self.links.append(a.get('href',''))
 def handle_data(self,s):
  if self.capture:self.capture[1].append(s)
 def handle_endtag(self,t):
  if self.capture and self.capture[0]==t:
   value=' '.join(' '.join(self.capture[1]).split())
   if t=='title':self.title=value
   elif t=='h1':self.h1.append(value)
   else:self.headings.append(value)
   self.capture=None
def fetch(p):
 try:
  with urllib.request.urlopen(urllib.request.Request('https://digitecme.com'+p,headers={'User-Agent':'Mozilla/5.0'}),timeout=35) as r:
   raw=r.read();status=r.status;final=r.url;headers=dict(r.headers)
  filename=p.strip('/').replace('/','__') or 'home'
  (OUT/'live-before'/f'{filename}.html').write_bytes(raw)
  a=Parser();a.feed(raw.decode('utf-8','replace'))
  return {'path':p,'status':status,'final_url':final,'title':a.title,'h1':a.h1,'description':a.meta.get('description',''),'canonical':a.canonical,'robots':a.meta.get('robots',''),'headings':a.headings,'links':a.links,'sha256':hashlib.sha256(raw).hexdigest(),'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 except Exception as e:return {'path':p,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(fetch,sorted(paths)))
(OUT/'live-before.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),'utf-8')
print(json.dumps({'pages':len(rows),'errors':[r for r in rows if 'error' in r]}))
