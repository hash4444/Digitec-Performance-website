from pathlib import Path
from urllib.request import Request, build_opener, HTTPRedirectHandler
from urllib.error import HTTPError
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import json, re, html, sys

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/mercedes-release-2026-09-08'
PLAN=json.loads((Path(__file__).parent/'plan.json').read_text(encoding='utf-8'))
CHECK=json.loads((OUT/'generated-html-verification.json').read_text(encoding='utf-8'))
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl): return None
def get(url, method='GET'):
    try:
        req=Request(url,method=method,headers={'User-Agent':'DigiTec-authorized-release-check/1.0','Cache-Control':'no-cache'})
        try: response=build_opener(NoRedirect()).open(req,timeout=25)
        except HTTPError as e: response=e
        with response:
            text=response.read().decode('utf-8','replace') if method=='GET' else ''
            extract=lambda tag: [' '.join(html.unescape(re.sub('<[^>]*>',' ',v)).split()) for v in re.findall(fr'<{tag}\b[^>]*>(.*?)</{tag}>',text,re.S)]
            canonical=re.search(r'<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"',text)
            robots=re.search(r'<meta\b[^>]*name="robots"[^>]*content="([^"]+)"',text)
            title=extract('title')
            return {'url':url,'method':method,'status':response.status,'location':response.headers.get('Location',''),
                    'title':title[0] if title else '', 'h1':extract('h1'),'canonical':canonical.group(1) if canonical else '',
                    'robots':robots.group(1) if robots else '',
                    'contentType':response.headers.get('Content-Type',''),
                    'script':next(iter(re.findall(r'<script[^>]*src="([^"]+)"',text)),''),
                    '_body':text}
    except Exception as e:return {'url':url,'method':method,'error':str(e)}
def canonical_check(record):
    result=get('https://digitecme.com'+record['path'])
    raw=result.pop('_body','')
    result['path']=record['path'];result['expectedTitle']=record['title']
    result['titleMatches']=result.get('title')==record['title']
    result['canonicalMatches']=result.get('canonical')==record['canonical']
    result['robotsMatch']=result.get('robots','').split(',')[0]==record['robots'].split(',')[0]
    result['h1Matches']=result.get('h1')==[record['h1']]
    # New heading/paragraph markers distinguish unchanged titles from content publication.
    local=(ROOT/'dist'/record['path'].strip('/')/'index.html').read_text(encoding='utf-8')
    known={
      'HUB':'Mercedes minor and major service: what is included?',
      'AR':'نطاق صيانة مرسيدس: الخدمة الصغيرة والكبيرة',
      'MAYBACH':'Mercedes-Maybach and S-Class equipment',
      'OWNERSHIP':'Is a Mercedes reliable for Gulf ownership?',
      'TUNE':'Mercedes-AMG ECU tuning and project planning',
      'COST':'What an itemized estimate should include',
      'INTERVAL':'What do A3, A9 or AH service messages mean?',
    }
    marker=known.get(record.get('briefId'))
    if record.get('briefId') in ['G63','GCLASS','C63','CCLASS','E63','ECLASS','SCLASS','S63','GLE','GLS']:marker='Mercedes scheduled service and booking'
    if record['path'].startswith('/services/mercedes-'):marker=record['h1']
    extraMarkers={'/ar/tuning':'أسئلة حول تطوير الأداء','/ar/blog/mercedes-benz-maintenance-guide-dubai':'هل تناسب مرسيدس الاستخدام في الخليج؟','/blog/mercedes-amg-gt-tuning-dubai':'Confirm the generation, engine, existing software and modifications'}
    marker=extraMarkers.get(record['path'],marker)
    visible=re.sub(r'<(script|style)\b[^>]*>.*?</\1>','',raw,flags=re.S)
    if marker:result['marker']=marker;result['contentMarkerPresent']=marker in html.unescape(re.sub('<[^>]*>',' ',visible))
    result['matchesRelease']=result.get('status')==200 and result['titleMatches'] and result['canonicalMatches'] and result['robotsMatch'] and result['h1Matches'] and result.get('contentMarkerPresent',True)
    return result

records=[]
with ThreadPoolExecutor(max_workers=8) as pool: records=list(pool.map(canonical_check,CHECK['records']))
aliases={
 '/services/mercedes-repair-dubai':'/brands/mercedes-benz-service-dubai',
 '/services/mercedes-repair-dubai/':'/brands/mercedes-benz-service-dubai',
 '/best-mercedes-workshop-dubai':'/brands/mercedes-benz-service-dubai',
 '/services/mercedes-service-dubai':'/brands/mercedes-benz-service-dubai',
 '/brands/mercedes-benz-service-dubai/suspension-repair':'/services/mercedes-suspension-repair-dubai',
 '/services/mercedes-oil-change-dubai/':'/services/mercedes-oil-change-dubai',
 '/services/mercedes-ac-repair-dubai/':'/services/mercedes-ac-repair-dubai',
 '/ar/mercedes/models/c63-service-repair-dubai':'/ar/brands/mercedes-benz-service-dubai',
}
jobs=[(path,target,method) for path,target in aliases.items() for method in ['GET','HEAD']]
def alias_check(job):
    path,target,method=job;query='?utm_source=release-check&gclid=mercedes-test&msclkid=scope-check'
    r=get('https://digitecme.com'+path+query,method);r.pop('_body',None)
    r['expectedLocation']='https://digitecme.com'+target+query
    r['passed']=r.get('status') in [301,308] and r.get('location')==r['expectedLocation']
    return r
with ThreadPoolExecutor(max_workers=8) as pool: redirect_records=list(pool.map(alias_check,jobs))
identity=get('https://dubai-performance-art.lovable.app/brands/mercedes-benz-service-dubai');identity.pop('_body',None)
assets=[]
for candidate in ['/images/mercedes-repair-dubai-hero.jpg',next((r.get('script') for r in records if r.get('script')), '')]:
    if candidate:
        r=get('https://digitecme.com'+candidate,'HEAD');r.pop('_body',None);assets.append(r)
result={'checkedAt':datetime.now(timezone.utc).isoformat(),'phase':sys.argv[1] if len(sys.argv)>1 else 'after',
 'canonicalPages':records,'redirects':redirect_records,'lovableIdentity':identity,'assets':assets,
 'summary':{'canonicalPagesMatching':sum(r['matchesRelease'] for r in records),'canonicalPagesChecked':len(records),
 'permanentRedirectsPassing':sum(r['passed'] for r in redirect_records),'redirectsChecked':len(redirect_records)}}
(OUT/f'production-{result["phase"]}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'checkedAt':result['checkedAt'],'phase':result['phase'],**result['summary']},ensure_ascii=False))
