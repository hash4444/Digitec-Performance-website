"""Rendered B4 route, policy, FAQ, link and prior-batch regression evidence."""
import gzip, hashlib, html as html_std, json, re
from collections import Counter, defaultdict, deque
from pathlib import Path
from urllib.parse import urlsplit, unquote
from lxml import html

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/b6'
BASE=ROOT/'outputs/b5'
read=lambda root,name:json.loads((root/name).read_text(encoding='utf-8-sig'))
before={r['path']:r for r in read(OUT,'pages-baseline.json')}
after={r['path']:r for r in read(OUT,'after-pages.json')}
br={r['path']:r for r in read(OUT,'route-baseline.json')}
ar={r['path']:r for r in read(OUT,'after-routes.json')}
assert set(before)==set(after)==set(br)==set(ar)
def norm(s):return re.sub(r'\s+',' ',html_std.unescape(str(s or ''))).strip()
def doc(p,phase='after'):
    rec=after[p] if phase=='after' else before[p]
    root=OUT if phase=='after' else BASE
    return html.fromstring(gzip.decompress((root/rec['htmlFile']).read_bytes()).decode('utf-8'))
def main(d):return (d.xpath('//main') or d.xpath('//body') or [d])[0]
def sig(d):
    m=main(d)
    return (norm(m.text_content()),[(a.get('href'),norm(a.text_content())) for a in m.xpath('.//a[@href]')],[(i.get('src'),i.get('alt')) for i in m.xpath('.//img')])
def target(href,base):
    if not href or href.startswith(('mailto:','tel:','javascript:','#')):return None
    x=urlsplit(href)
    if x.scheme and x.scheme not in ('http','https'):return None
    if x.netloc and x.netloc not in ('digitecme.com','www.digitecme.com'):return None
    return unquote(x.path or base)
redirects={}
for line in (ROOT/'dist/_redirects').read_text(encoding='utf-8').splitlines():
    x=line.split()
    if len(x)>=3 and x[0].startswith('/') and x[-1] in ('301','302','307','308'):redirects[x[0]]=x[1]
sites=defaultdict(set);context=defaultdict(set);incoming=defaultdict(set)
for p in after:
    d=doc(p)
    for a in d.xpath('//a[@href]'):
        if a.xpath('ancestor::header|ancestor::footer'):continue
        q=target(a.get('href'),p)
        if q in after:sites[p].add(q)
    for a in main(d).xpath('.//a[@href]'):
        q=target(a.get('href'),p)
        if q in after:context[p].add(q);incoming[q].add(p)
def depth(start):
    got={start:0};queue=deque([start])
    while queue:
        p=queue.popleft()
        for q in sites[p]:
            if q not in got:got[q]=got[p]+1;queue.append(q)
    return got
depth_en=depth('/');depth_ar=depth('/ar')
route_changes=[p for p in after if {k:v for k,v in br[p].items() if k!='lastmod'}!={k:v for k,v in ar[p].items() if k!='lastmod'}]
lastmod_changes=[p for p in after if br[p].get('lastmod')!=ar[p].get('lastmod')]
policy_changes=[(p,k) for p in after for k in ('canonical','noindex','hasArabicVersion') if before[p]['seo'].get(k)!=after[p]['seo'].get(k)]
protected={}
for brand in ('mercedes','porsche','bmw','ferrari','lamborghini','rolls-royce','bentley','maybach'):
    urls=[p for p in after if brand in p.casefold()]
    protected[brand]={'reviewed':len(urls),'seo_changes':[p for p in urls if before[p]['seo']!=after[p]['seo']],
      'substantive_changes':[p for p in urls if sig(doc(p,'before'))!=sig(doc(p))]}
summary={'total_routes':len(after),'route_policy_changes':route_changes,'seo_policy_changes':policy_changes,
 'lastmod_changes':lastmod_changes,'prior_brand_regression':protected,'brands':{}}
for brand in ('range-rover','defender','jaguar'):
    paths=sorted(p for p in after if brand in p.casefold())
    info={'urls_reviewed':len(paths),'changed_urls':[p for p in paths if before[p]['htmlHash']!=after[p]['htmlHash']],
      'links_checked':0,'broken_links':[],'redirecting_links':[],'missing_fragments':[],
      'orphan_pages':[],'max_same_language_depth':0,'faq_pairs':0,'faq_visibility_issues':[],
      'schema_issues':[],'hreflang_links_checked':0,'hreflang_issues':[],'nojs_issues':[],
      'image_issues':[],'prohibited_claims':[],'schema_types':{},'pages':[]}
    schema_types=Counter()
    for p in paths:
        d=doc(p);m=main(d);text=norm(m.text_content());seo=after[p]['seo'];canon=seo.get('canonical')
        full=html.fromstring((ROOT/'dist'/p.lstrip('/')/'index.html').read_text(encoding='utf-8'))
        headings=[norm(x.text_content()) for x in m.xpath('.//h1')]
        di=(depth_ar if p.startswith('/ar/') else depth_en).get(p)
        if di is not None:info['max_same_language_depth']=max(info['max_same_language_depth'],di)
        if not incoming[p]:info['orphan_pages'].append(p)
        types=[]
        for n in seo.get('jsonLd',{}).get('@graph',[]):
            typ=n.get('@type');types.append(typ);schema_types[str(typ)]+=1
            if typ in ('Review','AggregateRating','Offer'):info['schema_issues'].append([p,typ,'unsupported'])
            if typ in ('Service','Article','BlogPosting','WebPage') and n.get('url') and n['url']!=canon:info['schema_issues'].append([p,typ,'URL differs from canonical'])
            if typ=='FAQPage':
                for q in n.get('mainEntity',[]):
                    info['faq_pairs']+=1
                    if norm(q.get('name')) not in text or norm(q.get('acceptedAnswer',{}).get('text')) not in text:info['faq_visibility_issues'].append([p,q.get('name')])
        for a in m.xpath('.//a[@href]'):
            href=a.get('href');q=target(href,p)
            if not q:continue
            if q in after:
                info['links_checked']+=1
                frag=urlsplit(href).fragment
                if frag and not doc(q).xpath(f'//*[@id="{frag}"]'):info['missing_fragments'].append([p,href])
            elif q in redirects:info['redirecting_links'].append([p,href])
            elif not Path(q).suffix:info['broken_links'].append([p,href])
        for alt in full.xpath('//head/link[@rel="alternate"][@hreflang]'):
            info['hreflang_links_checked']+=1
            q=urlsplit(alt.get('href','')).path
            if q not in ar or not ar[q].get('indexable'):info['hreflang_issues'].append([p,q])
        for image in m.xpath('.//img'):
            src=image.get('src','');label=image.get('alt')
            if label is None or re.search(r'(best|#1|cheapest).*(range rover|defender|jaguar)',label,re.I):info['image_issues'].append([p,src,label])
            if src.startswith('/') and not (ROOT/'dist'/src.lstrip('/')).is_file():info['image_issues'].append([p,src,'missing asset'])
        if re.search(r'free (?:diagnos|inspection|scan)|complimentary (?:diagnos|inspection)|guaranteed diagnosis',text,re.I):info['prohibited_claims'].append(p)
        required={'title':bool(full.xpath('//head/title')),'description':bool(full.xpath('//head/meta[@name="description"]')),
          'canonical':bool(full.xpath('//head/link[@rel="canonical"]')),'robots':bool(full.xpath('//head/meta[@name="robots"]')),
          'one_h1':len(full.xpath('//h1'))==1,'body':len(text)>=300,'links':bool(m.xpath('.//a[@href]'))}
        if not all(required.values()):info['nojs_issues'].append([p,required])
        info['pages'].append({'url':p,'title':seo.get('title'),'description':seo.get('description'),'h1':headings,
          'indexable':ar[p].get('indexable'),'canonical':canon,'changed':p in info['changed_urls'],
          'incoming_contextual':len(incoming[p]),'outgoing_contextual':len(context[p]),'depth':di,'schema_types':types,
          'body_length':len(text),'image_count':len(m.xpath('.//img'))})
    info['schema_types']=dict(schema_types)
    summary['brands'][brand]=info
(OUT/'audit-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'route_changes':len(route_changes),'policy_changes':len(policy_changes),'protected':{k:(len(v['seo_changes']),len(v['substantive_changes'])) for k,v in protected.items()},
 'brands':{k:{x:len(v[x]) if isinstance(v[x],list) else v[x] for x in ('urls_reviewed','changed_urls','links_checked','broken_links','redirecting_links','missing_fragments','orphan_pages','max_same_language_depth','faq_pairs','faq_visibility_issues','schema_issues','hreflang_issues','nojs_issues','image_issues','prohibited_claims')} for k,v in summary['brands'].items()}},ensure_ascii=False,indent=2))


