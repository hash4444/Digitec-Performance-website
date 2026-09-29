"""Build B5 evidence registers from the saved workbook/GSC map and rendered pages."""
import csv, gzip, json, re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/b5'
BASE=ROOT/'outputs/b4'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
audit=read(OUT/'audit-summary.json')
before={p['path']:p for p in read(OUT/'pages-baseline.json')}
after={p['path']:p for p in read(OUT/'after-pages.json')}
coverage_fields='keyword normalized_keyword brand source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position search_intent cluster primary_owner coverage_class coverage_location reason b5_action notes'.split()
ownership_fields='url page_type primary_intent primary_keyword_cluster secondary_clusters gsc_evidence supporting_pages potential_competitor ownership_conflict indexability canonical b5_action notes'.split()
change_fields='url page_type old_title new_title old_h1 new_h1 primary_intent content_change internal_link_change faq_change schema_change reason'.split()
def write(name,rows,fields):
    with (ROOT/name).open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(rows)
def doc(path,phase):
    rec=(after if phase=='after' else before)[path]
    base=OUT if phase=='after' else BASE
    return html.fromstring(gzip.decompress((base/rec['htmlFile']).read_bytes()).decode('utf-8'))
def main(d):return (d.xpath('//main') or [d])[0]
def text(x):return re.sub(r'\s+',' ',x.text_content()).strip()
def ptype(path,brand):
    kind='ARABIC ' if path.startswith('/ar/') else ''
    bare=path.removeprefix('/ar')
    if bare==f'/brands/{brand}-service-dubai':return kind+'BROAD HUB'
    if bare==f'/blog/{brand}-best-workshop-dubai':return kind+'SELECTION GUIDE'
    if bare.startswith(f'/blog/{brand}-'):return kind+'MODEL / OWNER GUIDE'
    return kind+'COMMERCIAL SERVICE'
def intent(path,brand):
    kind=ptype(path,brand)
    if 'BROAD HUB' in kind:return f'{brand.title()} service and repair discovery'
    if 'SELECTION GUIDE' in kind:return f'Choosing an independent {brand.title()} workshop'
    if 'MODEL / OWNER GUIDE' in kind:return f'{brand.title()} model-specific service planning'
    return after[path]['seo']['title'].split('|')[0].strip()
for brand in ('rolls-royce','bentley','maybach'):
    records=read(OUT/f'{brand}-keyword-owner-records.json')
    grouped=defaultdict(list)
    for r in records:grouped[r['normalized_keyword']].append(r)
    changed=set(audit['brands'][brand]['changed_urls'])
    latest=[r for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx']
    coverage=[]
    for term,items in sorted(grouped.items()):
        chosen=max(items,key=lambda r:(r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx',r['measured_or_generated']=='MEASURED ORIGINAL GSC',r['measured_or_generated']=='MEASURED WORKBOOK'))
        owner=chosen['primary_owner'];kind=ptype(owner,brand) if owner in after else ''
        if not owner:cls='NOT TARGETED — INTENTIONALLY'
        elif 'MODEL / OWNER GUIDE' in kind:cls='COVERED — MODEL'
        elif 'SELECTION GUIDE' in kind:cls='COVERED — GUIDE'
        elif owner==f'/brands/{brand}-service-dubai':cls='COVERED — PRIMARY' if chosen['search_intent']=='Broad commercial' else 'COVERED — SECTION'
        elif owner.startswith(f'/brands/{brand}-service-dubai/'):cls='COVERED — PRIMARY' if 'section' not in chosen['search_intent'].lower() else 'COVERED — SECTION'
        else:cls='COVERED — SECONDARY'
        coverage.append({'keyword':chosen['raw_keyword'],'normalized_keyword':term,'brand':{'maybach':'Maybach','bentley':'Bentley','rolls-royce':'Rolls-Royce'}[brand],
         'source':chosen['source'],'source_file':chosen['source_file'],'source_period':chosen['source_period'],
         'measured_or_generated':chosen['measured_or_generated'],**{k:chosen[k] if chosen['measured_or_generated'].startswith('MEASURED') else '' for k in ('gsc_clicks','gsc_impressions','gsc_ctr','gsc_position')},
         'search_intent':chosen['search_intent'],'cluster':chosen['cluster'],'primary_owner':owner,'coverage_class':cls,'coverage_location':owner,
         'reason':chosen['reason'],'b5_action':'DO NOT TARGET UNTIL SCOPE VERIFIED' if not owner else 'IMPROVE EXISTING OWNER' if owner in changed else 'RETAIN EXISTING OWNER',
         'notes':f'{len(items)} source observations; query-only GSC is not landing-page attribution.'})
    write(f'b5-{brand}-keyword-coverage.csv',coverage,coverage_fields)
    ctr=[]
    for r in latest:
        pos=float(r['gsc_position']);imp=float(r['gsc_impressions']);rate=float(r['gsc_ctr'])
        opportunity='High impressions / weak CTR in top 10' if imp>=50 and pos<=10 and rate<.02 else 'Positions 4–20' if imp>=50 and 4<=pos<=20 else 'Positions 11–30' if imp>=50 and 11<=pos<=30 else 'Monitor / limited evidence'
        ctr.append({'keyword':r['raw_keyword'],'clicks':r['gsc_clicks'],'impressions':r['gsc_impressions'],'ctr':r['gsc_ctr'],'position':r['gsc_position'],'editorial_owner_not_ranking_url':r['primary_owner'],'opportunity':opportunity,'period':r['source_period']})
    ctr.sort(key=lambda r:-float(r['impressions']))
    write(f'outputs/b5/{brand}-ctr-opportunities.csv',ctr,list(ctr[0]) if ctr else ['keyword'])
    own=[]
    for page in audit['brands'][brand]['pages']:
        path=page['url'];assigned=[r for r in records if r['primary_owner']==path];clusters=Counter(r['cluster'] for r in assigned)
        mapped=[r for r in latest if r['primary_owner']==path]
        evidence=f"{len(mapped)} latest query rows; {int(sum(float(r['gsc_impressions']) for r in mapped))} impressions; {int(sum(float(r['gsc_clicks']) for r in mapped))} clicks; editorial owner, not proven landing URL" if mapped else 'No query × page evidence supplied'
        links=[urlsplit(a.get('href','')).path for a in main(doc(path,'after')).xpath('.//a[@href]')]
        support=' | '.join(sorted(set(x for x in links if brand in x and x!=path))[:12])
        rival='/brands/mercedes-benz-service-dubai' if brand=='maybach' and 'BROAD HUB' in ptype(path,brand) else f'/brands/{brand}-service-dubai' if 'BROAD HUB' not in ptype(path,brand) else f'/blog/{brand}-best-workshop-dubai'
        own.append({'url':path,'page_type':ptype(path,brand),'primary_intent':intent(path,brand),'primary_keyword_cluster':clusters.most_common(1)[0][0] if clusters else intent(path,brand),
          'secondary_clusters':' | '.join(c for c,_ in clusters.most_common(4)[1:]),'gsc_evidence':evidence,'supporting_pages':support,'potential_competitor':rival,
          'ownership_conflict':'NO — distinct editorial task; no query × page proof of cannibalization','indexability':'index' if page['indexable'] else 'noindex','canonical':page['canonical'],
          'b5_action':'UPDATED' if path in changed else 'RETAINED AFTER REVIEW','notes':'Potential competitor is an editorial review flag, not observed ranking overlap.'})
    write(f'b5-{brand}-intent-ownership.csv',own,ownership_fields)
    changes=[]
    for path in sorted(changed):
        b=before[path]['seo'];a=after[path]['seo'];old=main(doc(path,'before'));new=main(doc(path,'after'))
        oldlinks={urlsplit(x.get('href','')).path for x in old.xpath('.//a[@href]')};newlinks={urlsplit(x.get('href','')).path for x in new.xpath('.//a[@href]')}
        oldh=' | '.join(text(x) for x in old.xpath('.//h1'));newh=' | '.join(text(x) for x in new.xpath('.//h1'))
        if path==f'/brands/bentley-service-dubai/electrical-repair':content='Reverse-camera section now leads with fault assessment and clearly separates installation intent.'
        elif path==f'/brands/maybach-service-dubai':content='Added Maybach S-Class/GLS service-planning context and distinct links to Maybach owners.'
        elif '/blog/' in path:content='Replaced shared selection-guide body with brand-specific English or Arabic guidance; FAQ answers now ship in initial HTML; article modification date updated.'
        else:content='Existing visible FAQ answers now ship in initial HTML alongside FAQ schema.'
        changes.append({'url':path,'page_type':ptype(path,brand),'old_title':b.get('title'),'new_title':a.get('title') if b.get('title')!=a.get('title') else 'RETAINED',
         'old_h1':oldh,'new_h1':newh if oldh!=newh else 'RETAINED','primary_intent':intent(path,brand),'content_change':content,
         'internal_link_change':f"Added: {' | '.join(sorted(newlinks-oldlinks))}; removed: {' | '.join(sorted(oldlinks-newlinks))}" if newlinks!=oldlinks else 'RETAINED',
         'faq_change':'Answers exposed in initial HTML' if 'FAQ answers' in content else 'RETAINED','schema_change':'Article dateModified updated' if '/blog/' in path and b.get('jsonLd')!=a.get('jsonLd') else 'RETAINED','reason':'Differentiate selection intent and align visible FAQ/schema' if '/blog/' in path else 'Align rendered content with visible FAQ schema' if 'FAQ answers' in content else 'Clarify measured intent and brand ownership'})
    write(f'b5-{brand}-before-after.csv',changes,change_fields)
    print(brand,{'coverage':len(coverage),'ownership':len(own),'changed':len(changes),'classes':dict(Counter(r['coverage_class'] for r in coverage))})
