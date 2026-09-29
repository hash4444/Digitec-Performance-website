"""Generate separate B4 keyword, ownership and before/after registers."""
import csv, gzip, json, re, html as html_std
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html

ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'outputs/b4';BASE=ROOT/'outputs/b3'
audit=json.loads((OUT/'audit-summary.json').read_text(encoding='utf-8'))
before={r['path']:r for r in json.loads((OUT/'pages-baseline.json').read_text(encoding='utf-8'))}
after={r['path']:r for r in json.loads((OUT/'after-pages.json').read_text(encoding='utf-8'))}
def write(name,rows,fields):
    with (ROOT/name).open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(rows)
def norm(s):return re.sub(r'\s+',' ',html_std.unescape(str(s or ''))).strip()
def doc(p,phase):
    rec=(after if phase=='after' else before)[p];root=OUT if phase=='after' else BASE
    d=html.fromstring(gzip.decompress((root/rec['htmlFile']).read_bytes()).decode('utf-8'))
    return (d.xpath('//main') or [d])[0]
def page_type(p,brand):
    if p.startswith('/ar/'):return 'ARABIC COUNTERPART'
    if p==f'/brands/{brand}-service-dubai':return 'BROAD HUB'
    if p==f'/best-{brand}-workshop-dubai':return 'BEST-WORKSHOP / SELECTION'
    if p==f'/blog/{brand}-maintenance-guide-dubai':return 'MAINTENANCE GUIDE'
    if brand=='ferrari' and p.rsplit('/',1)[-1] in ('296','488','812','f8-tributo','portofino','purosangue','roma','sf90'):return 'MODEL'
    if p.startswith(f'/brands/{brand}-service-dubai/'):return 'COMMERCIAL SERVICE'
    if p.startswith('/blog/'):return 'GUIDE / SUPPORT'
    return 'SUPPORTING CONTENT'
coverage_fields='keyword normalized_keyword brand source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position search_intent cluster primary_owner coverage_class coverage_location reason b4_action notes'.split()
own_fields='url page_type primary_intent primary_keyword_cluster secondary_clusters gsc_evidence supporting_pages potential_competitor ownership_conflict indexability canonical b4_action notes'.split()
change_fields='url page_type old_title new_title old_h1 new_h1 primary_intent content_change internal_link_change faq_change schema_change reason'.split()
for brand in ('ferrari','lamborghini'):
    records=json.loads((OUT/f'{brand}-keyword-owner-records.json').read_text(encoding='utf-8'))
    byterm=defaultdict(list)
    for r in records:byterm[r['normalized_keyword']].append(r)
    changes=set(audit['brands'][brand]['changed_urls']);coverage=[]
    for term,items in sorted(byterm.items()):
        rank=lambda r:(r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx' and r['measured_or_generated']=='MEASURED ORIGINAL GSC',r['measured_or_generated']=='MEASURED ORIGINAL GSC',r['measured_or_generated']=='MEASURED WORKBOOK')
        chosen=max(items,key=rank);owner=chosen['primary_owner'];intent=chosen['search_intent']
        if not owner:cls='NOT TARGETED — INTENTIONALLY'
        elif owner.startswith('/blog/') and brand=='lamborghini' and 'urus' in owner:cls='COVERED — MODEL'
        elif owner.startswith('/blog/') or owner.startswith('/best-'):cls='COVERED — GUIDE'
        elif brand=='ferrari' and owner.rsplit('/',1)[-1] in ('296','488','812','f8-tributo','portofino','purosangue','roma','sf90'):cls='COVERED — MODEL'
        elif owner in ('/tuning','/services/paint-protection-dubai','/services/ceramic-coating','/services/car-polishing-dubai'):cls='COVERED — SECONDARY'
        elif owner==f'/brands/{brand}-service-dubai':cls='COVERED — PRIMARY' if intent=='Broad commercial' else 'COVERED — SECTION'
        elif intent in ('Service section','Broad hub section'):cls='COVERED — SECTION'
        else:cls='COVERED — PRIMARY'
        metric=chosen['measured_or_generated'].startswith('MEASURED')
        coverage.append({'keyword':chosen['raw_keyword'],'normalized_keyword':term,'brand':brand.title(),
         'source':chosen['source'],'source_file':chosen['source_file'],'source_period':chosen['source_period'],
         'measured_or_generated':chosen['measured_or_generated'],
         **{k:chosen[k] if metric else '' for k in ('gsc_clicks','gsc_impressions','gsc_ctr','gsc_position')},
         'search_intent':intent,'cluster':chosen['cluster'],'primary_owner':owner,'coverage_class':cls,
         'coverage_location':owner or '', 'reason':chosen['reason'],
         'b4_action':'DO NOT TARGET WITHOUT SERVICE VERIFICATION' if not owner else 'IMPROVE EXISTING OWNER' if owner in changes else 'RETAIN EXISTING OWNER',
         'notes':f'{len(items)} source observations; one selected metrics row only. Query-only data are not joined to landing URLs.'})
    write(f'b4-{brand}-keyword-coverage.csv',coverage,coverage_fields)
    latest=[r for r in records if r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx' and r['measured_or_generated']=='MEASURED ORIGINAL GSC']
    ctr=[]
    for r in latest:
        pos=float(r['gsc_position']);imp=float(r['gsc_impressions']);rate=float(r['gsc_ctr'])
        opportunity='High impressions, weak CTR in top 10' if imp>=50 and pos<=10 and rate<.02 else 'Positions 4–20: intent and snippet' if imp>=50 and 4<=pos<=20 else 'Positions 11–30: content and linking' if imp>=50 and 11<=pos<=30 else 'Monitor / limited evidence'
        ctr.append({'keyword':r['raw_keyword'],'clicks':r['gsc_clicks'],'impressions':r['gsc_impressions'],'ctr':r['gsc_ctr'],'position':r['gsc_position'],'editorial_owner_not_ranking_url':r['primary_owner'],'opportunity':opportunity,'period':r['source_period']})
    ctr.sort(key=lambda r:-float(r['impressions']))
    write(f'outputs/b4/{brand}-ctr-opportunities.csv',ctr,list(ctr[0]) if ctr else ['keyword'])
    own=[]
    for page in audit['brands'][brand]['pages']:
        p=page['url'];pt=page_type(p,brand);assigned=[r for r in records if r['primary_owner']==p];clusters=Counter(r['cluster'] for r in assigned)
        primary=clusters.most_common(1)[0][0] if clusters else pt.title()
        if pt=='BROAD HUB':intent=f'{brand.title()} service, repair and workshop discovery'
        elif pt=='BEST-WORKSHOP / SELECTION':intent=f'How to select an independent {brand.title()} workshop'
        elif pt=='MAINTENANCE GUIDE':intent=f'{brand.title()} schedule and cost planning'
        elif pt=='MODEL':intent=f'{brand.title()} model-specific service considerations'
        else:intent=page['title'].split('|')[0].strip()
        mapped=[r for r in latest if r['primary_owner']==p]
        evidence=f"{len(mapped)} latest query rows, {int(sum(float(r['gsc_impressions']) for r in mapped))} impressions, {int(sum(float(r['gsc_clicks']) for r in mapped))} clicks; query-only, not page attribution" if mapped else 'No latest query mapped; top-query export does not establish zero page traffic'
        links=[urlsplit(a.get('href','')).path for a in doc(p,'after').xpath('.//a[@href]')]
        support=' | '.join(sorted(set(x for x in links if brand in x and x!=p))[:12])
        rival=f'/best-{brand}-workshop-dubai' if pt=='BROAD HUB' else f'/brands/{brand}-service-dubai' if pt in ('BEST-WORKSHOP / SELECTION','MAINTENANCE GUIDE','MODEL') else ''
        own.append({'url':p,'page_type':pt,'primary_intent':intent,'primary_keyword_cluster':primary,
         'secondary_clusters':' | '.join(c for c,_ in clusters.most_common(4)[1:]),'gsc_evidence':evidence,
         'supporting_pages':support,'potential_competitor':rival,'ownership_conflict':'NO — distinct editorial task; no query × page proof of cannibalization' if rival else 'NO — one editorial owner',
         'indexability':'index' if page['indexable'] else 'noindex','canonical':page['canonical'],
         'b4_action':'UPDATED' if p in changes else 'RETAINED AFTER REVIEW','notes':'Potential competitor is editorial only; no ranking-URL evidence.' if rival else ''})
    write(f'b4-{brand}-intent-ownership.csv',own,own_fields)
    reg=[]
    for p in sorted(changes):
        b=before[p]['seo'];a=after[p]['seo'];old=doc(p,'before');new=doc(p,'after')
        oldlinks={urlsplit(x.get('href','')).path for x in old.xpath('.//a[@href]')};newlinks={urlsplit(x.get('href','')).path for x in new.xpath('.//a[@href]')}
        oldfaq=sum(len(x.get('mainEntity',[])) for x in b.get('jsonLd',{}).get('@graph',[]) if x.get('@type')=='FAQPage')
        newfaq=sum(len(x.get('mainEntity',[])) for x in a.get('jsonLd',{}).get('@graph',[]) if x.get('@type')=='FAQPage')
        content='Existing FAQ answers now present in initial HTML.'
        if p==f'/ar/best-{brand}-workshop-dubai':content+=' Arabic title, H1, description and direct answer now express workshop-selection criteria rather than broad service booking.'
        if p==f'/brands/{brand}-service-dubai' and brand=='ferrari':content+=' Diagnostic-tool claim qualified to supported vehicle-specific access.'
        if p==f'/blog/{brand}-maintenance-guide-dubai':content+=' Replaced shared guide boilerplate with brand-specific maintenance planning and safety copy; article modification date updated.'
        if p==f'/brands/{brand}-service-dubai/electrical-repair' and brand=='lamborghini':content='Added fitted reversing-camera fault assessment, diagnostic steps and scoped FAQs; retrofit capability remains unpromised.'
        reg.append({'url':p,'page_type':page_type(p,brand),'old_title':b.get('title'),'new_title':a.get('title') if b.get('title')!=a.get('title') else 'RETAINED',
         'old_h1':' | '.join(norm(x.text_content()) for x in old.xpath('.//h1')),
         'new_h1':' | '.join(norm(x.text_content()) for x in new.xpath('.//h1')) if [norm(x.text_content()) for x in old.xpath('.//h1')]!=[norm(x.text_content()) for x in new.xpath('.//h1')] else 'RETAINED',
         'primary_intent':next(x['primary_intent'] for x in own if x['url']==p),'content_change':content,
         'internal_link_change':f'+{len(newlinks-oldlinks)} / -{len(oldlinks-newlinks)} destinations',
         'faq_change':f'{oldfaq} → {newfaq} schema pairs; answers visible in initial HTML',
         'schema_change':'Types and URLs retained; visible answers aligned with existing FAQ schema',
         'reason':'Clarify Arabic workshop-selection ownership; no route-policy change.' if p==f'/ar/best-{brand}-workshop-dubai' else 'Improve factual specificity on an existing owner; no route-policy change.' if p==f'/brands/{brand}-service-dubai/electrical-repair' and brand=='lamborghini' else 'Qualify diagnostic capability and align visible FAQs; no route-policy change.' if p==f'/brands/{brand}-service-dubai' and brand=='ferrari' else 'Differentiate brand-specific maintenance guidance and align modification date; no route-policy change.' if p==f'/blog/{brand}-maintenance-guide-dubai' else 'Ensure emitted FAQ answers exist in initial HTML; no route-policy change.'})
    write(f'b4-{brand}-before-after.csv',reg,change_fields)
    print(brand,len(coverage),'normalized terms;',len(changes),'changed URLs;',len(own),'ownership rows;',Counter(r['coverage_class'] for r in coverage))
