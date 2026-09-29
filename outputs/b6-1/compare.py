import gzip,json,re
from pathlib import Path
from lxml import html

ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'outputs/b6-1';OLD=ROOT/'outputs/b6'
load=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
before={x['path']:x for x in load(OUT/'before-pages.json')}
after={x['path']:x for x in load(OUT/'after-pages.json')}
old_routes={x['path']:x for x in load(OUT/'before-routes.json')}
new_routes={x['path']:x for x in load(OUT/'after-routes.json')}
assert set(before)==set(after)==set(old_routes)==set(new_routes)
def norm(s):return re.sub(r'\s+',' ',s or '').strip()
def dom(p,phase):
 rec=(after if phase=='after' else before)[p];root=OUT if phase=='after' else OLD
 return html.fromstring(gzip.decompress((root/rec['htmlFile']).read_bytes()).decode('utf-8'))
def signature(d):
 m=(d.xpath('//main') or [d])[0]
 return {'h1':[norm(x.text_content()) for x in m.xpath('.//h1')],
  'body':norm(m.text_content()),
  'links':[(x.get('href'),norm(x.text_content())) for x in m.xpath('.//a[@href]')],
  'images':[(x.get('src'),x.get('alt')) for x in m.xpath('.//img')],
  'faqs':[(norm(x.text_content())) for x in m.xpath('.//*[contains(@class,"faq")]')],
  'hreflang':[(x.get('hreflang'),x.get('href')) for x in d.xpath('//head/link[@rel="alternate"]')],
  'robots':[x.get('content') for x in d.xpath('//head/meta[@name="robots"]')]}
brand_paths={b:[p for p in before if b in p.casefold()] for b in ('mercedes','porsche','bmw','ferrari','lamborghini','rolls-royce','bentley','maybach','range-rover','defender','jaguar')}
changes={}
for b,paths in brand_paths.items():
 changes[b]={'urls':len(paths),'seo':[p for p in paths if before[p]['seo']!=after[p]['seo']], 'html_hash':[p for p in paths if before[p]['htmlHash']!=after[p]['htmlHash']]}
for p in brand_paths['lamborghini']:
 old=html.fromstring(gzip.decompress((OLD/before[p]['htmlFile']).read_bytes()).decode('utf-8'))
 new=html.fromstring(gzip.decompress((OUT/after[p]['htmlFile']).read_bytes()).decode('utf-8'))
 if signature(old)!=signature(new):changes['lamborghini'].setdefault('substantive',[]).append(p)
route_changes=[p for p in before if old_routes[p]!=new_routes[p]]
policy_changes=[(p,key) for p in before for key in ('canonical','noindex') if before[p]['seo'].get(key)!=after[p]['seo'].get(key)]
summary={'total_routes':len(before),'added_routes':len(set(after)-set(before)),'removed_routes':len(set(before)-set(after)),'route_changes':route_changes,'seo_policy_changes':policy_changes,'brand_changes':changes}
(OUT/'comparison.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'routes':len(before),'added':summary['added_routes'],'removed':summary['removed_routes'],'route_changes':len(route_changes),'policy_changes':len(policy_changes),'brands':{b:{'urls':v['urls'],'seo':len(v['seo']),'html':len(v['html_hash']),'substantive':len(v.get('substantive',[]))} for b,v in changes.items()}},indent=2))
