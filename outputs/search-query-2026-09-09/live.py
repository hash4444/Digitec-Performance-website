from pathlib import Path
import urllib.request,urllib.error,json,concurrent.futures,re,html,datetime
from html.parser import HTMLParser
OUT=Path(__file__).resolve().parent
inv={r['path']:r for r in json.loads((OUT/'inventory.json').read_text('utf-8'))}
paths=['/','/brands/mercedes-benz-service-dubai','/services/mercedes-repair-dubai','/services/mercedes-service-dubai','/services/mercedes-mechanical-repair-dubai','/services/mercedes-diagnostics-dubai','/services/mercedes-suspension-repair-dubai','/services/mercedes-oil-change-dubai','/services/mercedes-transmission-repair-dubai','/services/mercedes-brake-repair-dubai','/brands/bmw-service-dubai','/brands/bmw-service-dubai/transmission-repair','/brands/bmw-service-dubai/engine-diagnostics','/brands/porsche-service-dubai','/brands/porsche-service-dubai/steering-repair','/brands/porsche-service-dubai/engine-diagnostics','/brands/aston-martin-service-dubai/brake-repair','/brands/aston-martin-service-dubai/transmission-repair','/brands/mclaren-service-dubai','/brands/mclaren-service-dubai/oil-change','/brands/ferrari-service-dubai','/brands/rolls-royce-service-dubai','/brands/lamborghini-service-dubai','/services/oil-change-dubai','/services/exhaust-repair-dubai','/services/steering-repair-dubai','/services/tire-repair-dubai','/services/paint-protection-film','/services/ceramic-coating','/services/paint-protection-dubai','/services/car-polishing-dubai','/services/car-garage-dubai','/services/garage-near-me-dubai']
class Tags(HTMLParser):
 def __init__(self):super().__init__();self.meta={};self.h1=[];self.headings=[];self.title='';self.capture=None;self.canonical='';self.links=[];self.scripts=[];self.script=None;self.text=[];self.hidden=0;self.h1end=0
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.canonical=a.get('href','')
  if t in ['h1','h2','h3','title']:self.capture=[t,[]]
  if t in ['script','style']:self.hidden+=1
  if t=='a':self.links.append(a.get('href',''))
  if t=='script' and a.get('type')=='application/ld+json':self.script=[]
 def handle_data(self,s):
  if self.capture:self.capture[1].append(s)
  if self.script is not None:self.script.append(s)
  if not self.hidden:self.text.append(s)
 def handle_endtag(self,t):
  if self.capture and t==self.capture[0]:
   s=' '.join(' '.join(self.capture[1]).split())
   if t=='h1':self.h1.append(s);self.h1end=len(self.text)
   elif t=='title':self.title=s
   else:self.headings.append(s)
   self.capture=None
  if t=='script' and self.script is not None:self.scripts.append(''.join(self.script));self.script=None
  if t in ['script','style']:self.hidden=max(self.hidden-1,0)
def fetch(p):
 url='https://digitecme.com'+p
 try:
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; site-review)'}),timeout=25) as response:
   raw=response.read().decode('utf-8','replace'); final=response.url;status=response.status;headers=dict(response.headers)
  parser=Tags();parser.feed(raw)
  schemas=[]
  for script in parser.scripts:
   try:schemas.append(json.loads(script))
   except Exception:schemas.append({'parse_error':True})
  return {'path':p,'url':url,'status':status,'final_url':final,'title':parser.title,'h1':parser.h1,'headings':parser.headings,'opening':' '.join(' '.join(parser.text[parser.h1end:]).split()[:150]),'description':parser.meta.get('description',''),'canonical':parser.canonical,'robots':parser.meta.get('robots',''),'xrobots':headers.get('X-Robots-Tag',''),'phone':list(set(x for x in parser.links if x.startswith('tel:'))),'whatsapp':list(set(x.split('?')[0] for x in parser.links if 'wa.me/' in x)),'schema_blocks':len(schemas),'schema_json_parse_errors':sum(x.get('parse_error',False) for x in schemas if isinstance(x,dict)),'matches_local_title':parser.title==inv.get(p,{}).get('title'),'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 except Exception as e:return {'path':p,'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 results=list(pool.map(fetch,paths))
(OUT/'live.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(results,ensure_ascii=False,indent=2))
