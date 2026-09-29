"""Final B1 audit using the saved pre-edit and current full-site SSR snapshots."""
import csv, gzip, json, re, hashlib, html as html_std
from pathlib import Path
from collections import Counter, defaultdict, deque
from urllib.parse import urlsplit, unquote
from itertools import combinations
from lxml import html

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/b1'
def read(name): return json.loads((OUT/name).read_text(encoding='utf-8-sig'))
def norm(s): return re.sub(r'\s+',' ',html_std.unescape(s or '')).strip()
def key(s): return norm(s).casefold()
def write_json(name,obj): (OUT/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def write_csv(name,rows,columns):
    with (ROOT/name).open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=columns,extrasaction='ignore');writer.writeheader();writer.writerows(rows)
pages={p['path']:p for p in read('after-pages.json')}
before={p['path']:p for p in read('before-pages.json')}
routes={p['path']:p for p in read('after-routes.json')}
primary=set(read('primary-pages.json'))
source=read('keyword-owner-records.json')
groups={p['primary_owner']:p for p in read('keyword-grouped-owner-map.json')}
site_graph=defaultdict(set); main_graph=defaultdict(set); labels=defaultdict(list)
content={}; paragraphs={}; headings={}; images={}; main_html={}; breadcrumbs={}; ctas={}; faq={}; schema={}; html_checks=[]

def load_dom(path):
    rec=pages[path]
    return html.fromstring(gzip.decompress((OUT/rec['htmlFile']).read_bytes()).decode('utf-8'))
def dest(href,base):
    if not href or href.startswith(('mailto:','tel:','javascript:','#')): return None
    url=urlsplit(href)
    if url.scheme and url.scheme not in ('http','https'): return None
    if url.netloc and url.netloc not in ('digitecme.com','www.digitecme.com'): return None
    path=unquote(url.path or base)
    return path if path in pages else None
def content_links(node,path):
    result=[]
    for a in node.xpath('.//a[@href]'):
        if a.xpath('ancestor::header|ancestor::footer'): continue
        target=dest(a.get('href'),path)
        if target: result.append((target,norm(a.text_content())))
    return result
for path in pages:
    doc=load_dom(path)
    all_links=content_links(doc,path)
    site_graph[path].update(dst for dst,_ in all_links)
    for dst,label in all_links: labels[(path,dst)].append(label)
    mains=doc.xpath('//main')
    if not mains: continue
    main=mains[0]
    main_links=content_links(main,path)
    main_graph[path].update(dst for dst,_ in main_links)
    if path not in primary: continue
    text=norm(main.text_content());content[path]=text
    paragraphs[path]=[norm(p.text_content()) for p in main.xpath('.//p|.//li') if len(norm(p.text_content()))>=100]
    headings[path]=[norm(h.text_content()) for h in main.xpath('.//h1|.//h2|.//h3')]
    images[path]=[{'src':x.get('src'),'alt':x.get('alt'),'role':x.get('role')} for x in doc.xpath('//main//img')]
    main_html[path]=html.tostring(main,encoding='unicode')
    breadcrumbs[path]=len(doc.xpath('//*[@aria-label="Breadcrumb"]|//*[@aria-label="Breadcrumbs"]|//ol[contains(@class,"breadcrumb")]'))
    ctas[path]={'whatsapp':len(main.xpath('.//a[starts-with(@href,"https://wa.me/")]')),'telephone':len(main.xpath('.//a[starts-with(@href,"tel:")]')),'internal':len(main_links)}
    graph=pages[path]['seo'].get('jsonLd',{}).get('@graph',[])
    schema[path]=[{'type':x.get('@type'),'name':x.get('name'),'url':x.get('url'),'dateModified':x.get('dateModified'),'datePublished':x.get('datePublished')} for x in graph]
    faq[path]=[{'question':q.get('name'),'answer':q.get('acceptedAnswer',{}).get('text','')} for x in graph if x.get('@type')=='FAQPage' for q in x.get('mainEntity',[])]
    production=ROOT/'dist'/path.lstrip('/')/'index.html'
    complete=html.fromstring(production.read_text(encoding='utf-8')) if production.is_file() else doc
    html_checks.append({'path':path,'title':bool(complete.xpath('//head/title')),'description':bool(complete.xpath('//head/meta[@name="description"]')),'canonical':bool(complete.xpath('//head/link[@rel="canonical"]')),'h1':len(complete.xpath('//main//h1')),'main_text_length':len(text),'internal_main_links':len(main_links),'route_schema':bool(complete.xpath('//script[@data-route-jsonld="true"]'))})

def depths(graph,start):
    depth={start:0};q=deque([start])
    while q:
        src=q.popleft()
        for dst in graph.get(src,()):
            if dst not in depth:depth[dst]=depth[src]+1;q.append(dst)
    return depth
root_depth=depths(site_graph,'/')
arabic_root_depth=depths(site_graph,'/ar')
hub_depth=depths(main_graph,'/brands/mercedes-benz-service-dubai')
ar_hub_depth=depths(main_graph,'/ar/brands/mercedes-benz-service-dubai')
incoming_all=defaultdict(set);incoming_main=defaultdict(set)
for p,links in site_graph.items():
    for target in links:
        if target!=p:incoming_all[target].add(p)
for p,links in main_graph.items():
    for target in links:
        if target!=p:incoming_main[target].add(p)
linkrows=[]
for p in sorted(primary):
    rel=[x for x in main_graph[p] if x in primary and x!=p]
    localdepth=arabic_root_depth if p.startswith('/ar/') else root_depth
    linkrows.append({'url':p,'all_site_inbound_pages':len(incoming_all[p]),'main_content_inbound_pages':len(incoming_main[p]),'main_content_inbound_mercedes_pages':len(incoming_main[p]&primary),'outgoing_primary_mercedes_pages':len(rel),'locale_crawl_root':'/ar' if p.startswith('/ar/') else '/','site_crawl_depth':localdepth.get(p,''),'english_hub_content_depth':hub_depth.get(p,''),'arabic_hub_content_depth':ar_hub_depth.get(p,''),'breadcrumb_present':bool(breadcrumbs[p]),'sample_inbound_sources':' | '.join(sorted(incoming_main[p]&primary)[:5]),'sample_outgoing_destinations':' | '.join(sorted(rel)[:5])})
write_csv('b1-mercedes-link-depth.csv',linkrows,list(linkrows[0]))

# Each source observation remains a row. A source-specific metric belongs to
# its own window; overlapping exports are never summed to infer property demand.
word=re.compile(r'[\w\u0600-\u06ff]+',re.U)
stop={'mercedes','benz','mercedesbenz','dubai','service','repair','car','cars','near','me','in','for','of','a','the','and','best','مرسيدس','بنز','دبي','في','خدمة','إصلاح','صيانة'}
def meaningful(s): return {x for x in word.findall(key(s)) if len(x)>2 and x not in stop}
def coverage_status(r):
    owner=r['primary_owner']; intent=r['intent_cluster']; k=r['keyword_normalized'];decision=r['coverage_decision']
    if owner not in pages:return 'GAP — REVIEW REQUIRED','Mapped owner absent from published route inventory'
    if intent=='Window tint inquiry':return 'NOT TARGETED — INTENTIONALLY','Tinting is not described on the proposed paint-care page and is not a verified service; check service availability before targeting'
    if intent in ('Ambiguous / non-service or mixed-brand','Maybach boundary'):
        return 'NOT TARGETED — INTENTIONALLY','Mixed, product-only or separately owned Maybach intent; no Mercedes repair landing target'
    if owner in ['/services/car-polishing-dubai','/services/ceramic-coating','/services/paint-protection-film','/services/paint-protection-dubai','/tuning']:
        return 'NOT TARGETED — INTENTIONALLY','Separate cross-brand paint, protection or tuning owner retained outside B1 repair scope'
    if decision=='FAQ':return 'COVERED — FAQ','Page-specific question and service scope reviewed on mapped owner'
    if decision=='SECTION':return 'COVERED — SECTION','Narrower symptom/feature addressed within existing service page'
    if owner.startswith('/mercedes/problems/'):return 'COVERED — PROBLEM GUIDE','Existing symptom guide explains causes and next step'
    if '/models/' in owner or re.search(r'/blog/mercedes-(?:c-class|e-class|s-class|g63)-service-',owner):return 'COVERED — MODEL PAGE','Existing model/generation owner; no model × service landing page'
    if owner.startswith('/blog/'):return 'COVERED — INFORMATIONAL GUIDE','Existing interval, cost or maintenance owner'
    meta=' '.join([pages[owner]['seo'].get('title',''),pages[owner]['seo'].get('description','')]+headings.get(owner,[])[:6])
    terms=meaningful(k)
    overlap=len(terms&meaningful(meta))/max(1,len(terms))
    if intent=='Broad workshop / service':return 'COVERED — PRIMARY','Broad workshop query maps to the existing Mercedes hub'
    if overlap>=0.55:return 'COVERED — PRIMARY','Core service terms appear in the owner title/heading/description'
    return 'COVERED — SECONDARY','Specific variation maps to the owner section, model/application or symptom rather than a literal title'
coverage=[]
for r in source:
    state,note=coverage_status(r)
    coverage.append({'keyword':r['keyword_raw'],'normalized_keyword':r['keyword_normalized'],'source':r['source_ref'],'measured_or_generated':r['evidence_class'],'gsc_clicks':r['clicks'],'gsc_impressions':r['impressions'],'gsc_ctr':r['ctr'],'gsc_position':r['position'],'date_start':r['date_start'],'date_end':r['date_end'],'original_six_month_match':r.get('original_six_month_match'),'source_cluster':r['intent_cluster'],'primary_owner':r['primary_owner'],'commercial_destination':r['commercial_destination'],'coverage_classification':state,'coverage_evidence_or_reason':note,'new_url_required':r['new_url_required']})
write_csv('outputs/b1/keyword-coverage-source-observations.csv',coverage,list(coverage[0]))
by_term=defaultdict(list)
for row,record in zip(coverage,source):by_term[row['normalized_keyword']].append((row,record))
keyword_rows=[]
for normalized,observations in sorted(by_term.items()):
    # Prefer a workbook Master row for the displayed wording and editorial
    # intent; select exactly one metric observation from the latest original
    # six-month GSC export. Never add overlapping counts.
    candidates=sorted(observations,key=lambda pair:(pair[1]['source_sheet']!='Master Keywords',pair[1]['evidence_class']!='MEASURED WORKBOOK',pair[1]['source_ref']))
    representative=candidates[0][0]
    latest=[x for x in observations if x[1]['evidence_class']=='MEASURED ORIGINAL GSC' and x[1]['date_start']=='2026-04-12' and x[1]['date_end']=='2026-09-25']
    measured=[x for x in observations if x[1]['clicks'] is not None and x[1]['impressions'] is not None]
    metric=(latest[0] if latest else sorted(measured,key=lambda pair:(pair[1]['date_end'] or '',pair[1]['source_ref']),reverse=True)[0] if measured else None)
    selected=metric[0] if metric else representative
    labels={x[0]['coverage_classification'] for x in observations}
    coverage_label=representative['coverage_classification']
    if 'GAP — REVIEW REQUIRED' in labels:coverage_label='GAP — REVIEW REQUIRED'
    elif labels=={'NOT TARGETED — INTENTIONALLY'}:coverage_label='NOT TARGETED — INTENTIONALLY'
    keyword_rows.append({'keyword':representative['keyword'],'normalized_keyword':normalized,'source':representative['source'],'measured_or_generated':selected['measured_or_generated'],'gsc_clicks':selected['gsc_clicks'] if metric else None,'gsc_impressions':selected['gsc_impressions'] if metric else None,'gsc_ctr':selected['gsc_ctr'] if metric else None,'gsc_position':selected['gsc_position'] if metric else None,'metric_source':metric[0]['source'] if metric else '', 'metric_window':f"{selected['date_start']} to {selected['date_end']}" if metric else '', 'source_observation_count':len(observations),'all_source_refs':' | '.join(sorted({x[0]['source'] for x in observations})),'primary_owner':representative['primary_owner'],'intent_cluster':representative['source_cluster'],'commercial_destination':representative['commercial_destination'],'coverage_classification':coverage_label,'coverage_evidence_or_reason':representative['coverage_evidence_or_reason'],'new_url_required':representative['new_url_required'],'note':'Metrics are from one selected source row only; other windows/duplicates are not added.'})
write_csv('b1-mercedes-keyword-coverage.csv',keyword_rows,list(keyword_rows[0]))

# Search Console query data here is a top-query export, not a landing-page join.
# Keep the six-month window only and retain page-level context separately.
six=[r for r in source if r['evidence_class']=='MEASURED ORIGINAL GSC' and r['date_start']=='2026-04-12' and r['date_end']=='2026-09-25' and r['keyword_normalized']!='head unit repairing dubai']
ctr=[]
for r in six:
    pos=r['position'];imp=r['impressions'];rate=r['ctr'] or 0
    if pos is None or imp is None:continue
    band='1–10 low CTR' if pos<=10 and rate<.02 else '11–20' if pos<=20 else '21–30' if pos<=30 else '31+' if pos>30 else '1–10 healthy/limited'
    if imp<25:level='Limited evidence'
    elif pos<=10 and rate<.02 and imp>=100:level='Review snippet'
    elif 4<=pos<=30 and imp>=100:level='Review intent and snippet'
    else:level='Monitor'
    owner=r['primary_owner']
    ctr.append({'query':r['keyword_raw'],'impressions':imp,'clicks':r['clicks'],'ctr':rate,'position':pos,'position_band':band,'editorial_owner_not_ranking_url':owner,'current_title':pages[owner]['seo']['title'],'current_description':pages[owner]['seo']['description'],'review_priority':level,'date_window':'2026-04-12 to 2026-09-25','caution':'Original query metrics are not joined to an actual landing page'})
ctr.sort(key=lambda r:(r['review_priority']=='Limited evidence',-r['impressions']))
write_csv('b1-mercedes-ctr-opportunities.csv',ctr,list(ctr[0]))

# Editorial ownership table uses one primary task per existing page. Potential
# competitor URLs are review candidates, never a claim of proven cannibalization.
def family_intent(p):
    if p.endswith('/brands/mercedes-benz-service-dubai'):return ('Book independent Mercedes workshop service/repair','Local commercial','Broad workshop/service')
    if '/services/' in p:
        label=pages[p]['seo']['title'].split('|')[0]
        return (f'Assess or book {label.lower()}','Commercial service','Specific repair/service')
    if '/models/' in p or re.search(r'/blog/mercedes-(?:c-class|e-class|s-class|g63)-service-',p):return (f'Plan service/repair for {headings[p][0]}','Model commercial','Vehicle family/generation')
    if '/problems/' in p:return (f'Understand {headings[p][0]} and decide next diagnostic step','Symptom information','Specific warning/symptom')
    return (f'Answer {headings[p][0]}','Ownership information','Cost/interval/planning/selection')
peer={
 '/brands/mercedes-benz-service-dubai':'/blog/mercedes-benz-maintenance-guide-dubai',
 '/services/mercedes-transmission-repair-dubai':'/mercedes/problems/gearbox-jerking',
 '/services/mercedes-suspension-repair-dubai':'/mercedes/problems/airmatic-malfunction',
 '/services/mercedes-diagnostics-dubai':'/services/mercedes-electrical-repair-dubai',
 '/services/mercedes-electrical-repair-dubai':'/services/mercedes-diagnostics-dubai',
 '/services/mercedes-battery-replacement-dubai':'/mercedes/problems/battery-warning',
 '/services/head-unit-repair-dubai':'/services/mercedes-audio-upgrade-dubai',
 '/services/mercedes-audio-upgrade-dubai':'/services/head-unit-repair-dubai',
 '/services/mercedes-oil-change-dubai':'/brands/mercedes-benz-service-dubai',
 '/blog/mercedes-benz-maintenance-guide-dubai':'/brands/mercedes-benz-service-dubai',
}
intent_rows=[]
for p in sorted(primary):
    task,kind,cluster=family_intent(p)
    g=groups.get(p,groups.get(p.removeprefix('/ar'),{}))
    supporting=sorted((main_graph[p]&primary)-{p})[:8]
    conflict=bool(pages[p]['seo'].get('title')==pages.get(peer.get(p,''),{}).get('seo',{}).get('title'))
    intent_rows.append({'url':p,'primary_intent':task,'primary_keyword_cluster':' | '.join(g.get('intent_clusters',[])) or cluster,'secondary_cluster':' | '.join(sorted({groups[x]['intent_clusters'][0] for x in supporting if x in groups and groups[x].get('intent_clusters',[])})[:3]),'intent_type':kind,'supporting_pages':' | '.join(supporting),'potential_competitor_page':peer.get(p,''),'ownership_conflict':'YES — review' if conflict else 'NO — distinct task'})
write_csv('b1-mercedes-intent-ownership-qa.csv',intent_rows,list(intent_rows[0]))

meta={x['path']:x for x in read('metadata-review.json')}
changes={x['path']:x for x in read('changed-pages.json')}
beforeafter=[]
major_overrides={
 '/brands/mercedes-benz-service-dubai':'Clarified XENTRY and fitted-system scope; separated weak AC from engine overheating; linked all existing service/model/guide owners.',
 '/ar/brands/mercedes-benz-service-dubai':'Added Arabic XENTRY process and AMG boundary; made four existing Arabic model guides discoverable from the hub.',
 '/mercedes/problems':'Grouped the ten distinct warnings by symptoms, urgency and the next inspection rather than a generic repair list.',
 '/mercedes/problems/wont-start':'Distinguished no electrical power, no-crank and crank-no-start paths with battery, authorization, fuel and sensor checks.',
 '/mercedes/problems/airmatic-malfunction':'Distinguished air, hydraulic and active suspension by fitted equipment before interpreting the warning or recommending parts.',
 '/mercedes/problems/suspension-dropping-overnight':'Explained overnight height observations and leak isolation without assuming compressor failure.',
 '/mercedes/problems/gearbox-jerking':'Separated a rough shift from slipping, engine-torque/mount symptoms and a due fluid service.',
 '/mercedes/problems/transmission-slipping':'Explained repeatable engine-speed flare, safe next steps and the evidence needed before gearbox repair.',
 '/mercedes/problems/check-engine-light':'Explained why a DTC does not identify the failed part and which XENTRY/physical checks may follow.',
 '/mercedes/problems/engine-overheating':'Separated engine cooling from cabin AC and added stop-driving guidance for temperature warnings.',
 '/mercedes/problems/oil-leak':'Explained source tracing, hot-exhaust risk and the difference between oil service and leak repair.',
 '/mercedes/problems/ac-not-cooling':'Distinguished airflow, refrigerant, electrical and climate-control causes before a refill.',
 '/mercedes/problems/battery-warning':'Distinguished battery, charging, auxiliary and 48V warnings; retained vehicle-specific coding limits.',
}
guide_overrides={
 'mercedes-benz-maintenance-guide-dubai':'Replaced the generic workshop template with records, due-work, condition, storage and follow-up planning.',
 'mercedes-service-cost-dubai-guide':'Clarified Service A/B inclusions, diagnostic charges and like-for-like quote comparison without fixed prices.',
 'mercedes-service-intervals-dubai-heat':'Clarified ASSYST reminders, time/mileage conditions and demanding use without a universal Dubai interval.',
 'best-oil-change-dubai-mercedes':'Turned the page into an oil-service proposal checklist: approval, filter/seals, scope and completed-work record.',
 'mercedes-repair-dubai-complete-guide':'Turned broad repair copy into warning-sign triage with distinct symptom and commercial next steps.',
}
for p in sorted(primary):
    if p not in changes:continue
    m=meta[p];oldlinks=set(main_graph.get(p,set())) # current graph; baseline below
    old_dom=html.fromstring(gzip.decompress((OUT/before[p]['htmlFile']).read_bytes()).decode('utf-8'))
    old_main=old_dom.xpath('//main')
    oldset={d for d,_ in content_links(old_main[0],p)} if old_main else set()
    newset=main_graph[p]
    oldfaq=[q for n in before[p]['seo'].get('jsonLd',{}).get('@graph',[]) if n.get('@type')=='FAQPage' for q in n.get('mainEntity',[])]
    newfaq=faq[p]
    old_h2={key(x.text_content()) for x in old_main[0].xpath('.//h2|.//h3')} if old_main else set()
    new_h2=[norm(x.text_content()) for x in load_dom(p).xpath('//main//h2|//main//h3') if key(x.text_content()) not in old_h2]
    old_para={key(x.text_content()) for x in old_main[0].xpath('.//p') if len(norm(x.text_content()))>=80} if old_main else set()
    fresh_paras=[norm(x.text_content()) for x in load_dom(p).xpath('//main//p') if len(norm(x.text_content()))>=80 and key(x.text_content()) not in old_para]
    substance=[]
    if new_h2:substance.append('New or revised section: '+new_h2[0][:100])
    if fresh_paras:substance.append('Detail: '+fresh_paras[0][:140])
    if not substance:substance.append('Revised body and navigation for this existing task')
    explicit=major_overrides.get(p) or guide_overrides.get(p.split('/')[-1])
    if explicit:substance=[explicit]
    oldq={key(q['name']) for q in oldfaq};newq={key(q['question']) for q in newfaq}
    added=sorted(newq-oldq)
    faq_change=f'{len(oldfaq)} → {len(newfaq)} emitted pairs'+('; new focus: '+added[0][:80] if added else '; wording or answer updated' if oldfaq!=newfaq else '; retained')
    oldtypes=[x.get('@type') for x in before[p]['seo'].get('jsonLd',{}).get('@graph',[])]
    newtypes=[x.get('@type') for x in pages[p]['seo'].get('jsonLd',{}).get('@graph',[])]
    schema_change='Types: '+', '.join(newtypes) if oldtypes!=newtypes else 'Same types; details/FAQ/date updated' if changes[p]['schema_changed'] else 'RETAINED'
    link_change=f'+{len(newset-oldset)} / -{len(oldset-newset)} contextual destinations'
    if newset-oldset:link_change+='; new: '+', '.join(sorted(newset-oldset)[:2])
    reason='Reinforce the existing '+family_intent(p)[1].lower()+' task with model or symptom-specific evidence; retain URL and indexing decision.'
    beforeafter.append({'url':p,'old_title':m['before_title'],'new_title':m['after_title'] if m['after_title']!=m['before_title'] else 'RETAINED: '+m['after_title'],'old_h1':m['before_h1'],'new_h1':m['after_h1'] if m['after_h1']!=m['before_h1'] else 'RETAINED: '+m['after_h1'],'primary_intent':family_intent(p)[0],'major_content_change':'; '.join(substance),'internal_link_change':link_change,'faq_change':faq_change,'schema_change':schema_change,'reason':reason})
write_csv('b1-mercedes-before-after.csv',beforeafter,list(beforeafter[0]))

# Exact duplicate substantial paragraphs and 7-token shingle similarity help
# reviewers spot copied boilerplate without treating shared site chrome as copy.
texts=defaultdict(list)
for p,paras in paragraphs.items():
    for text in paras:
        if len(text)>=140:texts[key(text)].append(p)
repeats=[{'text':t[:300],'pages':sorted(set(ps))} for t,ps in texts.items() if len(set(ps))>=3]
repeats.sort(key=lambda r:-len(r['pages']))
def shingles(s):
    toks=[x for x in word.findall(key(s)) if len(x)>2]
    return set(zip(*(toks[i:] for i in range(7)))) if len(toks)>=7 else set()
fingerprints={p:shingles(' '.join(paragraphs[p])) for p in primary}
similar=[]
for a,b in combinations(sorted(primary),2):
    if a.startswith('/ar/')!=b.startswith('/ar/'):continue
    aa=fingerprints[a];bb=fingerprints[b]
    score=len(aa&bb)/max(1,len(aa|bb))
    if score>=.2:similar.append({'a':a,'b':b,'shingle_jaccard':round(score,3),'shared_shingles':len(aa&bb)})
similar.sort(key=lambda r:-r['shingle_jaccard'])
write_json('final-duplication-review.json',{'repeated_substantial_paragraphs':repeats[:30],'most_similar_pairs':similar[:30],'pairs_over_0_4':sum(x['shingle_jaccard']>=.4 for x in similar)})

qa=[]
for p in sorted(primary):
    text=content[p]; rec=pages[p]; graph=rec['seo'].get('jsonLd',{}).get('@graph',[])
    types=[x.get('@type') for x in graph]
    faq_ok=all(key(q['question']) in key(text) and key(q['answer']) in key(text) for q in faq[p])
    bad_alt=[im for im in images[p] if im['alt'] is None or len(im['alt'])>160 or len(re.findall('mercedes',im['alt'],re.I))>2 or re.search(r'best mercedes|#1 mercedes',im['alt'],re.I)]
    bad_claim=bool(re.search(r'free\s+(?:diagnos|inspection|check)|مجاني(?:\w|\s){0,15}(?:فحص|تشخيص)|(?:guaranteed|dealer-level)\s+diagnos',text,re.I))
    missing_url=any(n.get('url') and n['url']!=rec['seo']['canonical'] for n in graph if n.get('@type') in ('WebPage','ItemPage','BlogPosting','Service'))
    production=ROOT/'dist'/p.lstrip('/')/'index.html'
    complete=html.fromstring(production.read_text(encoding='utf-8')) if production.is_file() else load_dom(p)
    qa.append({'path':p,'primary_intent':family_intent(p)[0],'h1_count':len(complete.xpath('//main//h1')),'content_characters':len(text),'heading_count':len(headings[p]),'incoming_main_links':len(incoming_main[p]),'outgoing_primary_links':len(main_graph[p]&primary),'faq_emitted':len(faq[p]),'faq_visible':faq_ok,'schema_types':types,'schema_url_mismatch':missing_url,'breadcrumb_present':bool(breadcrumbs[p]),'cta':ctas[p],'images':len(images[p]),'alt_issues':bad_alt,'free_or_guaranteed_diagnostic_claim':bad_claim,'noindex':bool(rec['seo'].get('noindex')),'hreflang_html':[(x.get('hreflang'),x.get('href')) for x in complete.xpath('//head/link[@rel="alternate"]')]})
write_json('final-page-audit.json',qa)
faq_occ=defaultdict(set)
for p,entries in faq.items():
    for item in entries:faq_occ[key(item['question'])].add(p)
summary={'primary_pages':len(primary),'source_records':len(source),'normalized_keywords':len(keyword_rows),'coverage_classes':dict(Counter(r['coverage_classification'] for r in keyword_rows)),'source_record_coverage_classes':dict(Counter(r['coverage_classification'] for r in coverage)),'gap_review_rows':[r for r in keyword_rows if r['coverage_classification']=='GAP — REVIEW REQUIRED'],'untargeted_rows':len([r for r in keyword_rows if r['coverage_classification']=='NOT TARGETED — INTENTIONALLY']),'six_month_ctr_queries':len(ctr),'ctr_priorities':dict(Counter(r['review_priority'] for r in ctr)),'orphans_sitewide':[r['url'] for r in linkrows if r['all_site_inbound_pages']==0],'weak_main_inbound':[r['url'] for r in linkrows if r['main_content_inbound_mercedes_pages']<=1],'no_main_outbound':[r['url'] for r in linkrows if r['outgoing_primary_mercedes_pages']==0],'max_site_depth':max(int(r['site_crawl_depth']) for r in linkrows if r['site_crawl_depth']!=''),'html_failures':[r for r in html_checks if not(r['title'] and r['description'] and r['canonical'] and r['h1']==1 and r['main_text_length']>150 and r['route_schema'])],'faq_visibility_failures':[r['path'] for r in qa if not r['faq_visible']],'schema_url_mismatches':[r['path'] for r in qa if r['schema_url_mismatch']],'alt_issues':[r['path'] for r in qa if r['alt_issues']],'free_claims':[r['path'] for r in qa if r['free_or_guaranteed_diagnostic_claim']],'duplication_pairs_over_0_4':sum(r['shingle_jaccard']>=.4 for r in similar),'duplicate_faq_questions':{q:sorted(ps) for q,ps in faq_occ.items() if len(ps)>1},'changed_primary':len(beforeafter)}
write_json('final-audit-summary.json',summary)
print(json.dumps(summary,ensure_ascii=False,indent=2))
