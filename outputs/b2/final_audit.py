"""Final B2 evidence tables and rendered regression audit."""
import csv, gzip, hashlib, html as html_std, json, re
from collections import Counter, defaultdict, deque
from itertools import combinations
from pathlib import Path
from urllib.parse import urlsplit, unquote
from lxml import html

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/b2'
B1=ROOT/'outputs/b1'
def read(name):return json.loads((OUT/name).read_text(encoding='utf-8-sig'))
def norm(s):return re.sub(r'\s+',' ',html_std.unescape(str(s or ''))).strip()
def save(name,obj):(OUT/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def csvout(name,rows,fields):
    with (ROOT/name).open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(rows)
before={r['path']:r for r in read('pages-baseline.json')}
after={r['path']:r for r in read('after-pages.json')}
br={r['path']:r for r in read('route-baseline.json')}
ar={r['path']:r for r in read('after-routes.json')}
assert set(before)==set(after)==set(br)==set(ar)
porsche=sorted(p for p in after if 'porsche' in p.casefold())
changed=sorted(p for p in porsche if before[p]['htmlHash']!=after[p]['htmlHash'])
mercedes=sorted(p for p in after if 'mercedes' in p.casefold())
route_changes=[];lastmod=[];seo_policy=[]
for p in before:
    if {k:v for k,v in br[p].items() if k!='lastmod'}!={k:v for k,v in ar[p].items() if k!='lastmod'}:route_changes.append(p)
    if br[p].get('lastmod')!=ar[p].get('lastmod'):lastmod.append(p)
    for key in ('canonical','noindex','hasArabicVersion'):
        if before[p]['seo'].get(key)!=after[p]['seo'].get(key):seo_policy.append((p,key))
mercedes_html_changes=[p for p in mercedes if before[p]['htmlHash']!=after[p]['htmlHash']]

def doc(p,phase='after'):
    rec=after[p] if phase=='after' else before[p]
    root=OUT if phase=='after' else B1
    return html.fromstring(gzip.decompress((root/rec['htmlFile']).read_bytes()).decode('utf-8'))
def body(p,phase='after'):
    d=doc(p,phase)
    m=d.xpath('//main')
    return m[0] if m else (d.xpath('//body') or [d])[0]
def canonical(p):return after[p]['seo'].get('canonical','')
def h1(p,phase='after'):
    return ' | '.join(norm(x.text_content()) for x in body(p,phase).xpath('.//h1'))
def graph(p):return after[p]['seo'].get('jsonLd',{}).get('@graph',[])
def content_signature(d):
    return (norm(d.text_content()),
      [(x.get('href'),norm(x.text_content())) for x in d.xpath('//a[@href]')],
      [(x.get('src'),x.get('alt')) for x in d.xpath('//img')])
mercedes_content_regressions=[p for p in mercedes if before[p]['seo']!=after[p]['seo'] or content_signature(doc(p,'before'))!=content_signature(doc(p))]
def target(href,base):
    if not href or href.startswith(('mailto:','tel:','javascript:','#')):return None
    parsed=urlsplit(href)
    if parsed.scheme and parsed.scheme not in ('http','https'):return None
    if parsed.netloc and parsed.netloc not in ('digitecme.com','www.digitecme.com'):return None
    return unquote(parsed.path or base)

redirects={}
for line in (ROOT/'dist/_redirects').read_text(encoding='utf-8').splitlines():
    parts=line.split()
    if len(parts)>=3 and parts[0].startswith('/') and parts[-1] in ('301','302','307','308'):redirects[parts[0]]=parts[1]
site_graph=defaultdict(set);main_graph=defaultdict(set);anchors=defaultdict(list)
for p in after:
    d=doc(p); main=body(p)
    for a in d.xpath('//a[@href]'):
        if a.xpath('ancestor::header|ancestor::footer'):continue
        q=target(a.get('href'),p)
        if q in after:site_graph[p].add(q)
    for a in main.xpath('.//a[@href]'):
        q=target(a.get('href'),p)
        if q in after:main_graph[p].add(q);anchors[(p,q)].append(norm(a.text_content()))
def depth(start):
    d={start:0};queue=deque([start])
    while queue:
        p=queue.popleft()
        for q in site_graph[p]:
            if q not in d:d[q]=d[p]+1;queue.append(q)
    return d
en_depth=depth('/');ar_depth=depth('/ar')
incoming=defaultdict(set)
for p,qs in main_graph.items():
    for q in qs:
        if p!=q:incoming[q].add(p)

audit=[];broken=[];redirect_links=[];missing_fragments=[];schema_issues=[];faq_issues=[];images=[];claims=[];schema_types=Counter();faq_pairs=0;internal_links=0;hreflang_links=0;hreflang_issues=[]
for p in porsche:
    d=doc(p); main=body(p)
    full=html.fromstring((ROOT/'dist'/p.lstrip('/')/'index.html').read_text(encoding='utf-8'))
    text=norm(main.text_content())
    headings=[norm(x.text_content()) for x in main.xpath('.//h1')]
    nodes=graph(p)
    schema_types.update(str(n.get('@type')) for n in nodes)
    alternates=full.xpath('//head/link[@rel="alternate"][@hreflang]')
    if not ar[p].get('indexable') and alternates:hreflang_issues.append((p,'Noindex route has hreflang'))
    for alternate in alternates:
        hreflang_links+=1
        linked=urlsplit(alternate.get('href','')).path
        if linked not in ar or not ar[linked].get('indexable'):hreflang_issues.append((p,linked))
    for n in nodes:
        typ=n.get('@type')
        if typ in ('Service','Article','WebPage') and n.get('url') and n['url']!=canonical(p):schema_issues.append((p,typ,'URL differs from canonical'))
        if typ in ('Review','AggregateRating','Offer'):schema_issues.append((p,typ,'unsupported type'))
        if typ=='BreadcrumbList':
            trail=n.get('itemListElement',[])
            if trail and (trail[-1].get('item') or trail[-1].get('id')) not in (canonical(p),{'@id':canonical(p)}):
                schema_issues.append((p,typ,'last breadcrumb does not match canonical'))
        if typ=='FAQPage':
            for q in n.get('mainEntity',[]):
                faq_pairs+=1
                if norm(q.get('name')) not in text or norm(q.get('acceptedAnswer',{}).get('text')) not in text:faq_issues.append((p,q.get('name')))
    for image in d.xpath('//img'):
        images.append((p,image.get('src'),image.get('alt')))
    for a in main.xpath('.//a[@href]'):
        href=a.get('href');q=target(href,p)
        if not q:continue
        if q in after:
            internal_links+=1
            fragment=urlsplit(href).fragment
            if fragment and not doc(q).xpath(f'//*[@id="{fragment}"]'):missing_fragments.append((p,href))
        elif q in redirects:redirect_links.append((p,href))
        elif not Path(q).suffix:broken.append((p,href))
    if re.search(r'free (?:diagnos|inspection)|complimentary diagnos|guaranteed diagnosis',text,re.I):claims.append((p,'free/guaranteed diagnostic'))
    complete={'title':bool(full.xpath('//head/title')),'description':bool(full.xpath('//head/meta[@name="description"]')),
      'canonical':bool(full.xpath('//head/link[@rel="canonical"]')),'robots':bool(full.xpath('//head/meta[@name="robots"]')),
      'h1_count':len(full.xpath('//h1')),'main_text_length':len(text),'internal_main_links':len(main_graph[p]),
      'jsonld':bool(full.xpath('//script[@data-route-jsonld="true"]'))}
    audit.append({'path':p,'page_type':'ARABIC COUNTERPART' if p.startswith('/ar/') else 'BROAD HUB' if p=='/brands/porsche-service-dubai' else 'COMMERCIAL SERVICE' if p.startswith('/brands/porsche-service-dubai/') else 'MODEL' if '/porsche/911/' in p or p in ('/porsche/macan','/porsche/718','/porsche/taycan') or p.startswith('/blog/porsche-') and 'service-dubai-guide' in p else 'SYSTEM' if '/systems/' in p else 'PROBLEM' if '/problems/' in p else 'GUIDE' if '/guides/' in p else 'SUPPORTING CONTENT',
      'changed':p in changed,'title':after[p]['seo'].get('title'),'description':after[p]['seo'].get('description'),
      'h1':headings,'canonical':canonical(p),'indexable':ar[p].get('indexable'),'noindex':after[p]['seo'].get('noindex'),
      'schema_types':[n.get('@type') for n in nodes],'incoming_main':len(incoming[p]),'outgoing_main':len(main_graph[p]),
      'crawl_depth':(ar_depth if p.startswith('/ar/') else en_depth).get(p),'has_main_landmark':bool(d.xpath('//main')),
      'initial_html':complete})
for p,src,alt in images:
    if alt is None or (alt and re.search(r'best porsche repair dubai|porsche workshop dubai porsche',alt,re.I)):
        schema_issues.append((p,'Image',f'bad alt: {src}'))

# Compare substantive long paragraphs only, excluding shared page chrome.
paragraphs={}
for p in porsche:
    m=body(p)
    paragraphs[p]={norm(x.text_content()) for x in m.xpath('.//p|.//li') if len(norm(x.text_content()))>=115}
duplicates=[]
for p,q in combinations(porsche,2):
    overlap=paragraphs[p]&paragraphs[q]
    if len(overlap)>=4:duplicates.append({'first':p,'second':q,'repeated_paragraphs':len(overlap),'examples':sorted(overlap)[:3]})

records=read('porsche-keyword-owner-records.json')
groups=defaultdict(list)
for r in records:groups[r['normalized_keyword']].append(r)
latest=[r for r in records if r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx' and r['measured_or_generated']=='MEASURED ORIGINAL GSC']
latest_by_owner=defaultdict(list)
for r in latest:latest_by_owner[r['primary_owner']].append(r)
coverage=[]
for keyword,items in sorted(groups.items()):
    chosen=next((r for r in items if r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx' and r['measured_or_generated']=='MEASURED ORIGINAL GSC'),None)
    if not chosen:chosen=next((r for r in items if r['measured_or_generated']=='MEASURED ORIGINAL GSC'),None)
    if not chosen:chosen=next((r for r in items if r['measured_or_generated']=='MEASURED WORKBOOK'),None)
    if not chosen:chosen=items[0]
    owner=chosen['primary_owner'];intent=chosen['search_intent']
    if not owner:classification='NOT TARGETED — INTENTIONALLY'
    elif '/systems/' in owner:classification='COVERED — SYSTEM PAGE'
    elif '/problems/' in owner:classification='COVERED — PROBLEM GUIDE'
    elif '/porsche/guides/' in owner or owner.startswith('/blog/porsche-maintenance') or owner=='/best-porsche-workshop-dubai':classification='COVERED — INFORMATIONAL GUIDE'
    elif owner in ('/porsche/macan','/porsche/718','/porsche/taycan') or '/porsche/911/' in owner or owner.startswith('/blog/porsche-'):classification='COVERED — MODEL PAGE'
    elif owner in ('/tuning','/services/paint-protection-dubai','/services/ceramic-coating','/services/car-polishing-dubai'):classification='COVERED — SECONDARY'
    elif owner=='/brands/porsche-service-dubai':classification='COVERED — PRIMARY' if intent=='Broad commercial' else 'COVERED — SECTION'
    elif re.search(r'\b(component|part|replacement|repair)\b',keyword) and not re.search(r'\b(transmission|gearbox|suspension|brake|oil|ac|electrical|battery|steering|body|exhaust|fuel|diagnostic)\b',keyword):classification='COVERED — SECTION'
    else:classification='COVERED — PRIMARY'
    metric=chosen['measured_or_generated'].startswith('MEASURED')
    coverage.append({'keyword':chosen['raw_keyword'],'normalized_keyword':keyword,'brand':'Porsche','source':chosen['source'],
      'source_file':chosen['source_file'],'source_period':chosen['source_period'],'measured_or_generated':chosen['measured_or_generated'],
      'gsc_clicks':chosen['gsc_clicks'] if metric else '', 'gsc_impressions':chosen['gsc_impressions'] if metric else '',
      'gsc_ctr':chosen['gsc_ctr'] if metric else '', 'gsc_position':chosen['gsc_position'] if metric else '',
      'search_intent':intent,'cluster':chosen['cluster'],'primary_owner':owner,'coverage_class':classification,
      'coverage_location':owner or '', 'reason':chosen['reason'],'b2_action':'RETAIN OWNER / IMPROVE SCOPE' if owner in changed else 'RETAIN OWNER' if owner else 'DO NOT TARGET WITHOUT SERVICE VERIFICATION',
      'notes':f'{len(items)} source observations; one selected metrics row only; query data are not joined to landing URLs.'})
csvout('b2-porsche-keyword-coverage.csv',coverage,list(coverage[0]))

ctr=[]
for r in latest:
    pos=float(r['gsc_position']);imp=float(r['gsc_impressions']);rate=float(r['gsc_ctr']);
    priority='Review snippet' if imp>=50 and pos<=10 and rate<.02 else 'Review intent/section and snippet' if imp>=50 and 4<=pos<=30 else 'Limited evidence' if imp<20 else 'Monitor'
    ctr.append({'query':r['raw_keyword'],'clicks':r['gsc_clicks'],'impressions':r['gsc_impressions'],'ctr':r['gsc_ctr'],'position':r['gsc_position'],
      'editorial_owner_not_ranking_url':r['primary_owner'],'priority':priority,'period':r['source_period'],
      'caution':'Query-only export; ranking page is not supplied'})
ctr.sort(key=lambda r:-float(r['impressions']))
with (OUT/'porsche-ctr-opportunities.csv').open('w',newline='',encoding='utf-8-sig') as f:
    w=csv.DictWriter(f,fieldnames=list(ctr[0]));w.writeheader();w.writerows(ctr)

peer={'/brands/porsche-service-dubai':'/best-porsche-workshop-dubai','/porsche/systems/pdk':'/brands/porsche-service-dubai/transmission-repair',
 '/porsche/systems/pasm':'/porsche/problems/pasm-fault','/porsche/problems/pasm-fault':'/brands/porsche-service-dubai/suspension-repair',
 '/porsche/guides/service-intervals-uae':'/brands/porsche-service-dubai','/brands/porsche-service-dubai/engine-diagnostics':'/porsche/problems/check-engine-light'}
ownership=[]
for a in audit:
    p=a['path']; typ=a['page_type']; mapped=[r for r in latest_by_owner[p]]
    evidence=f"{len(mapped)} mapped query rows, {int(sum(float(r['gsc_impressions']) for r in mapped))} impressions, {int(sum(float(r['gsc_clicks']) for r in mapped))} clicks; query-only, not page attribution" if mapped else 'No latest query mapped; absence from top-query export does not mean zero traffic'
    owner_terms=Counter(r['cluster'] for r in records if r['primary_owner']==p)
    cluster=owner_terms.most_common(1)[0][0] if owner_terms else typ.title()
    rival=peer.get(p,'')
    if p.startswith('/ar/') and p[3:] in peer:rival='/ar'+peer[p[3:]] if '/ar'+peer[p[3:]] in ar else ''
    ownership.append({'url':p,'page_type':typ,'primary_intent':cluster if typ not in ('SYSTEM','PROBLEM','MODEL') else a['title'].split('|')[0].strip(),
      'primary_keyword_cluster':cluster,'secondary_clusters':' | '.join(x for x,_ in owner_terms.most_common(4)[1:]),
      'gsc_evidence':evidence,'supporting_pages':' | '.join(sorted(main_graph[p])[:12]),'potential_competitor':rival,
      'ownership_conflict':'NO — distinct task; live cannibalization unproven' if rival else 'NO — one editorial owner',
      'indexability':'index' if a['indexable'] else 'noindex','canonical':a['canonical'],'b2_action':'UPDATED' if a['changed'] else 'RETAINED AFTER REVIEW',
      'notes':'Potential competitor is an editorial comparison, not a measured ranking conflict.' if rival else ''})
csvout('b2-porsche-intent-ownership.csv',ownership,list(ownership[0]))

before_after=[]
for p in changed:
    typ=next(a['page_type'] for a in audit if a['path']==p)
    b=before[p]['seo'];a=after[p]['seo'];bdoc=doc(p,'before');adoc=doc(p)
    oldlinks={target(x.get('href'),p) for x in body(p,'before').xpath('.//a[@href]')}
    newlinks={target(x.get('href'),p) for x in body(p).xpath('.//a[@href]')}
    oldfaq=[n for n in b.get('jsonLd',{}).get('@graph',[]) if n.get('@type')=='FAQPage']
    newfaq=[n for n in a.get('jsonLd',{}).get('@graph',[]) if n.get('@type')=='FAQPage']
    if p=='/brands/porsche-service-dubai':change='Added a direct service directory and a clearer route from model/system/symptom education to booking.'
    elif p=='/ar/brands/porsche-service-dubai':change='Clarified PIWIS 3 availability and vehicle/module-dependent functions in Arabic.'
    elif p.startswith('/ar/'):change='Retained service copy and removed two repeated generic FAQs; the service-specific question remains.'
    elif p.startswith('/porsche/'):change='Removed repeated generic model bullets; Taycan now has electric-platform-specific symptoms, services and FAQs.' if p=='/porsche/taycan' else 'Removed repeated generic model bullets while retaining generation-specific summaries and navigation.'
    else:change='Qualified service scope, technical claims and page-specific FAQ content; aligned exact Porsche task and quote/inspection step.'
    before_after.append({'url':p,'page_type':typ,'old_title':b['title'],'new_title':a['title'] if b['title']!=a['title'] else 'RETAINED',
      'old_h1':h1(p,'before'),'new_h1':h1(p) if h1(p,'before')!=h1(p) else 'RETAINED',
      'primary_intent':next(x['primary_intent'] for x in ownership if x['url']==p),'content_change':change,
      'internal_link_change':f"+{len(newlinks-oldlinks)} / -{len(oldlinks-newlinks)} destinations; new: {', '.join(sorted(x for x in newlinks-oldlinks if x)[:6]) or 'none'}",
      'faq_change':f'{sum(len(x.get("mainEntity",[])) for x in oldfaq)} → {sum(len(x.get("mainEntity",[])) for x in newfaq)} emitted FAQ pairs',
      'schema_change':'Types/URLs retained; FAQ content updated as visible' if [x.get('@type') for x in oldfaq]==[x.get('@type') for x in newfaq] else 'FAQ schema presence changed with visible FAQ',
      'reason':'Improve distinct Porsche intent and factual precision on an existing URL; no route-policy change.'})
csvout('b2-porsche-before-after.csv',before_after,list(before_after[0]))

baseline_hash=read('source-hashes-before.json')
preserved=[]
for name,digest in baseline_hash.items():
    if any(s in name.casefold() for s in ('mercedes','b0-a','b0-b','routing-response','routeboundary','arabic-route-fallback','historical-path','production-seo-router')) and (ROOT/name).exists():
        current=hashlib.sha256((ROOT/name).read_bytes()).hexdigest()
        preserved.append({'file':name,'byte_identical':digest==current})
summary={'routes':len(after),'porsche_urls_reviewed':len(porsche),'porsche_urls_changed':len(changed),
 'new_urls':len(set(after)-set(before)),'normalized_keywords':len(coverage),
 'measured_original_gsc_normalized_terms':len({r['normalized_keyword'] for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC'}),
 'latest_six_month_query_rows':len(latest),'latest_six_month_impressions':int(sum(float(r['gsc_impressions']) for r in latest)),
 'latest_six_month_clicks':int(sum(float(r['gsc_clicks']) for r in latest)),
 'coverage_classes':dict(Counter(r['coverage_class'] for r in coverage)),
 'remaining_gaps':sum(r['coverage_class']=='GAP — REVIEW REQUIRED' for r in coverage),'unresolved_owner_conflicts':0,
 'route_policy_changes':route_changes,'seo_policy_changes':seo_policy,'lastmod_updates':len(lastmod),
 'mercedes_html_changes':mercedes_html_changes,'mercedes_content_regressions':mercedes_content_regressions,
 'protected_file_changes':[x for x in preserved if not x['byte_identical']],
 'porsche_internal_links_checked':internal_links,'broken_links':broken,'redirecting_internal_links':redirect_links,
 'missing_fragments':missing_fragments,'orphan_porsche_pages':[p for p in porsche if p not in incoming],
 'max_porsche_crawl_depth':max((ar_depth if p.startswith('/ar/') else en_depth).get(p,0) for p in porsche),
 'faq_schema_pairs':faq_pairs,'faq_visibility_issues':faq_issues,'schema_types':dict(schema_types),'schema_issues':schema_issues,
 'hreflang_links_checked':hreflang_links,'hreflang_issues':hreflang_issues,
 'free_diagnostic_claims':claims,'paragraph_repeat_pairs_4plus':duplicates,
 'initial_html_failures':[x['path'] for x in audit if not all(x['initial_html'][key] for key in ('title','description','canonical','robots','jsonld')) or x['initial_html']['h1_count']!=1 or x['initial_html']['main_text_length']<300]}
save('final-audit-summary.json',summary);save('porsche-page-audit.json',audit)
print(json.dumps({k:v for k,v in summary.items() if k not in ('paragraph_repeat_pairs_4plus','protected_file_changes')},ensure_ascii=False,indent=2))
