import json, pathlib, hashlib, csv, re, gzip
from capture import ROOT, OUT, parse

baseline=json.loads((OUT/'baseline/pages.json').read_text(encoding='utf8'))
rows=json.loads(gzip.decompress((OUT/'after-valid.json.gz').read_bytes()))
current={r['path']:parse(r['html']) for r in rows}
assert set(current)==set(baseline), 'Public route membership changed'
differences=[]
corrections=[]
all_links=[]
for route,page in current.items():
 for key in ['title','h1','canonical','robots','language','hreflang','schema']:
  if page[key]!=baseline[route][key]: differences.append({'path':route,'field':key})
 for href in page['arabic_links']:
  assert href in current, (route,href,'unpublished language destination')
  all_links.append({'source':route,'destination':href})
 if page['arabic_links']!=baseline[route]['arabic_links']:
  corrections.append({'source':route,'old':baseline[route]['arabic_links'],'new':page['arabic_links'],'translation':False,'hreflang_changed':page['hreflang']!=baseline[route]['hreflang']})
assert not differences, differences[:10]
assert len(corrections)==56,len(corrections)
assert (ROOT/'public/sitemap.xml').read_bytes()==(OUT/'baseline/public/sitemap.xml').read_bytes()
assert (ROOT/'public/robots.txt').read_bytes()==(OUT/'baseline/public/robots.txt').read_bytes()
sitemap=re.findall(r'<loc>https://digitecme.com([^<]*)</loc>',(ROOT/'dist/sitemap.xml').read_text())
assert len(sitemap)==996
for route in sitemap:
 assert route in current and 'noindex' not in current[route]['robots'] and current[route]['canonical']=='https://digitecme.com'+route,route
for route in sitemap:
 for language,target in current[route]['hreflang'].items():
  target=target.replace('https://digitecme.com','')
  assert target in current,(route,target)
  assert 'https://digitecme.com'+route in current[target]['hreflang'].values(),(route,target,'nonreciprocal')
brands=['mercedes-benz','porsche','ferrari','lamborghini','rolls-royce','bentley','maybach','range-rover','defender','bmw','cadillac','aston-martin','jetour','rox','jaguar','volkswagen']
brand_results=[]
for brand in brands:
 for locale in ['', '/ar']:
  route=f'{locale}/brands/{brand}-service-dubai'
  assert route in current,route
  brand_results.append(dict(path=route,**current[route]))
for name in ['negative','localized','aliases']:
 result=json.loads(gzip.decompress((OUT/f'after-{name}.json.gz').read_bytes()))
 for r in result:r.update(parse(r.pop('html')))
 (OUT/f'summary-{name}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
for name,value in [('page-metadata',current),('language-corrections',corrections),('language-link-crawl',all_links),('brand-regressions',brand_results)]:
 (OUT/f'{name}.json').write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf8')
summary={'passed':True,'public_routes_unchanged':len(current),'metadata_schema_differences':differences,'language_links_valid':len(all_links),'language_corrections':len(corrections),'sitemap_urls_unchanged':len(sitemap),'noindex_pages_preserved':sum('noindex' in p['robots'] for p in current.values()),'brand_hubs_en_ar':len(brand_results),'robots_bytes_unchanged':True,'sitemap_bytes_unchanged':True}
(OUT/'metadata-tests.json').write_text(json.dumps(summary,indent=2),encoding='utf8')
print(summary)
