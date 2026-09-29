import pathlib,json,zipfile,xml.etree.ElementTree as ET,datetime,hashlib,gzip,concurrent.futures,re,sys
import requests
from bs4 import BeautifulSoup
ROOT=pathlib.Path(__file__).resolve().parents[2]; OUT=ROOT/'outputs/b0-b'; BASE='https://digitecme.com'
def dump(name,value): (OUT/name).write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf8')
def xlsx(file):
 z=zipfile.ZipFile(file); strings=[]
 if 'xl/sharedStrings.xml' in z.namelist(): strings=[''.join(n.itertext()) for n in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('{*}si')]
 rels={r.attrib['Id']:r.attrib['Target'].lstrip('/') for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
 result={}
 for sheet in ET.fromstring(z.read('xl/workbook.xml')).findall('.//{*}sheet'):
  target=rels[sheet.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']];target=target if target.startswith('xl/') else 'xl/'+target
  rows=[]
  for row in ET.fromstring(z.read(target)).findall('.//{*}sheetData/{*}row'):
   values={}
   for c in row:
    v=c.find('{*}v'); val=v.text if v is not None else ''
    if c.attrib.get('t')=='s': val=strings[int(val)] if val else ''
    elif c.attrib.get('t')=='inlineStr': val=''.join(c.find('{*}is').itertext())
    elif val:
     try: val=float(val);val=int(val) if val.is_integer() else val
     except ValueError:pass
    values[c.attrib['r']]=val
   rows.append({'row':int(row.attrib['r']),'cells':values})
  result[sheet.attrib['name']]=rows
 return result
def extract(html,url):
 s=BeautifulSoup(html,'html.parser');main=s.find('main') or s.body or s
 def vals(sel,attr=None):return [e.get(attr,'') if attr else e.get_text(' ',strip=True) for e in s.select(sel)]
 def links(node,region):return [{'target':requests.compat.urljoin(url,a.get('href','')),'anchor':a.get_text(' ',strip=True),'region':region} for a in node.select('a[href]')]
 schema=[]
 for e in s.select('script[type="application/ld+json"]'):
  try:schema.append(json.loads(e.get_text()))
  except:pass
 def nodes(obj):
  if isinstance(obj,dict):
   yield obj
   for v in obj.values():yield from nodes(v)
  elif isinstance(obj,list):
   for v in obj:yield from nodes(v)
 schema_nodes=list(nodes(schema));faq=[{'question':n.get('name'),'answer':n.get('acceptedAnswer',{}).get('text')} for n in schema_nodes if n.get('@type')=='Question']
 text=main.get_text(' ',strip=True)
 all_links=links(s,'other')
 for a in s.select('a[href]'):
  region='footer' if a.find_parent('footer') else 'header' if a.find_parent('header') and not a.find_parent('main') else 'breadcrumb' if a.find_parent('nav',attrs={'aria-label':re.compile('breadcrumb|مسار',re.I)}) else 'main' if a.find_parent('main') else 'other'
  # Preserve repeated anchors/regions; counts downstream deduplicate source pages.
  all_links.append({'target':requests.compat.urljoin(url,a.get('href','')),'anchor':a.get_text(' ',strip=True),'region':region})
 all_links=[a for a in all_links if a['region']!='other']
 return {'title':vals('title'),'description':vals('meta[name=description]','content'),'h1':vals('h1'),'h2':vals('h2'),'h3':vals('h3'),'canonical':vals('link[rel=canonical]','href'),'robots':vals('meta[name=robots]','content'),'language':s.html.get('lang') if s.html else None,'hreflang':[{ 'language':e.get('hreflang'),'url':e.get('href')} for e in s.select('link[hreflang]')],'main_text':text,'word_count':len(text.split()),'schema_types':sorted(set(t for n in schema_nodes for t in (n.get('@type',[]) if isinstance(n.get('@type'),list) else [n.get('@type')]) if t)),'faqs':faq,'links':all_links,'ctas':[a for a in all_links if re.search(r'wa.me|tel:|book|contact|quote|whatsapp|واتساب|احجز|اتصل',a['target']+' '+a['anchor'],re.I)],'main_sha256':hashlib.sha256(text.encode()).hexdigest()}
def fetch(p):
 url=BASE+p
 try:
  r=requests.get(url,headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36'},timeout=45)
  r.encoding='utf-8';filename=hashlib.sha256(p.encode()).hexdigest()[:16]+'.html.gz';(OUT/'html').mkdir(exist_ok=True);(OUT/'html'/filename).write_bytes(gzip.compress(r.content))
  return {'path':p,'url':url,'status':r.status_code,'final_url':r.url,'chain':[{'status':h.status_code,'url':h.url,'location':h.headers.get('location')} for h in r.history],'fetched_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'html_file':'html/'+filename,**extract(r.text,r.url)}
 except Exception as e:return {'path':p,'error':str(e)}
if __name__=='__main__':
 if sys.argv[1]=='workbooks':
  files=[pathlib.Path('C:/Users/ADMIN/Downloads/DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx')]+sorted(pathlib.Path('C:/Users/ADMIN/Downloads').glob('digitecme.com-Performance-on-Search-2026*.xlsx'))
  inventory=[]
  for f in files:
   data=xlsx(f); name='xlsx-'+f.stem+'.json';dump(name,data)
   chart=data.get('Chart',[]);filters=data.get('Filters',[])
   inventory.append({'file':str(f),'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'data_file':name,'sheets':{k:{'rows':len(v),'headers':v[0] if v else None} for k,v in data.items()},'filters':filters,'chart_first':chart[1] if len(chart)>1 else None,'chart_last':chart[-1] if chart else None})
  dump('workbook-inventory.json',inventory)
  for r in inventory:print(pathlib.Path(r['file']).name,[(k,v['rows']) for k,v in r['sheets'].items()],r['filters'],flush=True)
 if sys.argv[1]=='live':
  paths=json.loads((OUT/'investigation-paths.json').read_text())
  results=[]
  with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
   for i,r in enumerate(pool.map(fetch,paths),1):
    results.append(r)
    if i%25==0:print('Fetched',i,'/',len(paths),flush=True)
  dump('live-pages.json',results);print('Done',len(results),'errors',sum('error' in r for r in results))
