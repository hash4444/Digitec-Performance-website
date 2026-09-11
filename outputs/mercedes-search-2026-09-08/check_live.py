import json, re, concurrent.futures, urllib.request, urllib.error
from pathlib import Path
from html.parser import HTMLParser

BASE = 'https://digitecme.com'
paths = ['/brands/mercedes-benz-service-dubai', '/services/mercedes-repair-dubai', '/services/mercedes-repair-dubai/', '/best-mercedes-workshop-dubai', '/services/mercedes-service-dubai', '/brands/mercedes-benz-service-dubai/suspension-repair', '/tuning', '/ar/brands/mercedes-benz-service-dubai', '/blog/mercedes-service-cost-dubai-guide', '/blog/mercedes-service-intervals-dubai-heat', '/blog/mercedes-benz-maintenance-guide-dubai', '/services/pre-purchase-inspection-dubai', '/services/paint-protection-film']
paths += ['/services/'+s for s in re.findall(r"slug: '([^']+)'", Path('src/data/mercedesServices.ts').read_text(encoding='utf-8'))]
paths += re.findall(r"    path: '([^']+)'", Path('src/data/mercedesModelPages.ts').read_text(encoding='utf-8'))
paths += ['/services/mercedes-oil-change-dubai', '/services/mercedes-oil-change-dubai/', '/services/mercedes-ac-repair-dubai/']

class Meta(HTMLParser):
    def __init__(self):
        super().__init__(); self.title=''; self.h1=[]; self.canonical=''; self.robots=''; self.description=''; self.in_title=False; self.in_h1=False; self.links=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='title': self.in_title=True
        if tag=='h1': self.in_h1=True; self.h1.append('')
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href','')
        if tag=='meta' and a.get('name')=='robots': self.robots=a.get('content','')
        if tag=='meta' and a.get('name')=='description': self.description=a.get('content','')
        if tag=='a': self.links.append(a.get('href',''))
    def handle_endtag(self, tag):
        if tag=='title': self.in_title=False
        if tag=='h1': self.in_h1=False
    def handle_data(self, d):
        if self.in_title: self.title+=d
        if self.in_h1: self.h1[-1]+=d

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): return None

def check(path):
    url=BASE+path
    try:
        opener=urllib.request.build_opener(NoRedirect)
        try: resp=opener.open(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25)
        except urllib.error.HTTPError as e: resp=e
        text=resp.read().decode('utf-8',errors='replace'); p=Meta(); p.feed(text)
        return dict(path=path,status=resp.code,location=resp.headers.get('Location',''),title=p.title,h1=p.h1,canonical=p.canonical,robots=p.robots,description=p.description,bytes=len(text),links=p.links)
    except Exception as e: return dict(path=path,error=str(e))

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex: results=list(ex.map(check,dict.fromkeys(paths)))
Path('outputs/mercedes-search-2026-09-08/live.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
for r in results: print(json.dumps({k:v for k,v in r.items() if k not in ['links','description']},ensure_ascii=False))
