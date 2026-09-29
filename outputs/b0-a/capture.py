import json, pathlib, hashlib, shutil, sys, requests, concurrent.futures
from bs4 import BeautifulSoup
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/b0-a'
PROBES=['/','/ar/','/brands/porsche-service-dubai','/ar/brands/porsche-service-dubai','/ar/porsche/systems/pdk','/ar/porsche/problems/pasm-fault','/ar/porsche/guides/service-intervals-uae','/ar/mercedes/problems','/seo-audit-nonexistent-20260928','/services/this-page-does-not-exist-20260928','/ar/this-page-does-not-exist-20260928','/porsche/911']
def parse(html):
 s=BeautifulSoup(html,'html.parser')
 def attr(sel,key):
  e=s.select_one(sel); return e.get(key) if e else None
 return dict(title=s.title.get_text() if s.title else None,h1=[e.get_text(' ',strip=True) for e in s.select('h1')],canonical=attr('link[rel=canonical]','href'),robots=attr('meta[name=robots]','content'),language=attr('html','lang'),hreflang={e.get('hreflang'):e.get('href') for e in s.select('link[hreflang]')},schema=[json.loads(e.string or e.get_text()) for e in s.select('script[type="application/ld+json"]')],arabic_links=[e.get('href') for e in s.select('a[href]') if 'العربية' in e.get_text()],homepage=attr('link[rel=canonical]','href')=='https://digitecme.com/')
def fetch(p,base='https://digitecme.com'):
 r=requests.get(base+p,headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36'},timeout=45)
 return dict(path=p,status=r.status_code,chain=[{'status':h.status_code,'url':h.url,'location':h.headers.get('Location')} for h in r.history],final_url=r.url,**parse(r.text))
if __name__=='__main__':
 if sys.argv[1]=='before':
  files=['src/App.tsx','src/i18n/locale.ts','scripts/prerender.mjs','cloudflare/production-seo-router.js','public/sitemap.xml','public/robots.txt','package.json','cloudflare/mercedes-seo-router.js','src/hooks/use-seo.ts','src/lib/route-manifest.ts']
  hashes={}
  for f in files:
   dest=OUT/'baseline'/f;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(ROOT/f,dest);hashes[f]=hashlib.sha256((ROOT/f).read_bytes()).hexdigest()
  (OUT/'baseline/hashes.json').write_text(json.dumps(hashes,indent=2))
  with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: results=list(pool.map(fetch,PROBES))
  (OUT/'before-http.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8')
  print([(r['path'],r['status'],r['homepage']) for r in results])
 elif sys.argv[1]=='snapshot':
  results={}
  for file in (ROOT/'dist').rglob('index.html'):
   p='/'+file.relative_to(ROOT/'dist').as_posix().removesuffix('/index.html');p='/' if p=='/index.html' else p
   results[p]=parse(file.read_text(encoding='utf8'))
  (OUT/'baseline/pages.json').write_text(json.dumps(results,ensure_ascii=False),encoding='utf8')
  print('Baseline pages',len(results))
 elif sys.argv[1]=='after':
  results=[fetch(p,'http://127.0.0.1:5191') for p in PROBES]
  (OUT/'after-http.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8')
  for name in ['sitemap.xml','robots.txt']:
   r=requests.get('http://127.0.0.1:5191/'+name,timeout=30)
   assert r.status_code==200 and r.content==(ROOT/'public'/name).read_bytes()
  print([(r['path'],r['status'],len(r['chain'])) for r in results])
