"""Generate the four B7 CSV deliverables from preserved evidence and rendered pages."""
import csv,gzip,json,re
from collections import Counter,defaultdict
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html

ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'outputs/b7'; BASE=ROOT/'outputs/b6-1'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
audit=read(OUT/'audit-summary.json')['brands']['cadillac']
records=read(OUT/'cadillac-keyword-owner-records.json')
before={x['path']:x for x in read(OUT/'pages-baseline.json')}
after={x['path']:x for x in read(OUT/'after-pages.json')}
coverage_fields='keyword normalized_keyword brand source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position search_intent cluster primary_owner coverage_class coverage_location reason b7_action notes'.split()
ownership_fields='url page_type primary_intent primary_keyword_cluster secondary_clusters gsc_evidence supporting_pages potential_competitor ownership_conflict indexability canonical b7_action notes'.split()
change_fields='url page_type old_title new_title old_h1 new_h1 primary_intent content_change internal_link_change faq_change schema_change reason'.split()
ctr_fields='keyword normalized_keyword source_period gsc_clicks gsc_impressions gsc_ctr gsc_position intent editorial_owner position_band opportunity_reason b7_action evidence_limitation'.split()

def write(name,rows,fields):
    with (ROOT/name).open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(rows)
def doc(p,phase='after'):
    rec=(after if phase=='after' else before)[p];base=OUT if phase=='after' else BASE
    return html.fromstring(gzip.decompress((base/rec['htmlFile']).read_bytes()).decode('utf-8'))
def main(d):return (d.xpath('//main') or [d])[0]
def clean(x):return re.sub(r'\s+',' ',x.text_content()).strip()
def ptype(p):
    ar='Arabic ' if p.startswith('/ar/') else '';bare=p.removeprefix('/ar')
    if bare=='/brands/cadillac-service-dubai':return ar+'hub'
    if bare.startswith('/brands/cadillac-service-dubai/'):return ar+'commercial service'
    if bare=='/blog/cadillac-best-workshop-dubai':return ar+'selection guide'
    if bare=='/services/cadillac-cue-screen-repair-dubai':return 'CUE commercial service'
    return ar+'supporting service'
def classify(r):
    owner=r['primary_owner']; intent=r['search_intent']
    if not owner:return 'NOT TARGETED — INTENTIONALLY'
    if owner=='/blog/cadillac-best-workshop-dubai':return 'COVERED — GUIDE'
    if intent=='Model enquiry':return 'COVERED — MODEL'
    if intent in ('Maintenance/cost planning','Camera fault','Head-unit fault'):return 'COVERED — SECTION'
    if owner=='/brands/cadillac-service-dubai':return 'COVERED — PRIMARY' if intent=='Broad Cadillac service' else 'COVERED — SECTION'
    if owner.startswith('/brands/cadillac-service-dubai/'):return 'COVERED — PRIMARY'
    if owner=='/services/cadillac-cue-screen-repair-dubai':return 'COVERED — PRIMARY'
    return 'COVERED — SECONDARY'

group=defaultdict(list)
for r in records:group[r['normalized_keyword']].append(r)
changed=set(audit['changed_urls']);coverage=[]
for term,items in sorted(group.items()):
    chosen=max(items,key=lambda r:(r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx',r['measured_or_generated']=='MEASURED ORIGINAL GSC',r['measured_or_generated']=='MEASURED WORKBOOK'))
    owner=chosen['primary_owner'];measured=chosen['measured_or_generated'].startswith('MEASURED')
    coverage.append({'keyword':chosen['raw_keyword'],'normalized_keyword':term,'brand':'Cadillac','source':chosen['source'],'source_file':chosen['source_file'],'source_period':chosen['source_period'],'measured_or_generated':chosen['measured_or_generated'],
      **{k:chosen[k] if measured else '' for k in ('gsc_clicks','gsc_impressions','gsc_ctr','gsc_position')},
      'search_intent':chosen['search_intent'],'cluster':chosen['cluster'],'primary_owner':owner,'coverage_class':classify(chosen),'coverage_location':owner,
      'reason':chosen['reason'],'b7_action':'VERIFY SCOPE' if not owner else 'IMPROVE EXISTING OWNER' if owner in changed else 'RETAIN EXISTING OWNER',
      'notes':f'{len(items)} source observations; query-only GSC does not establish a historical landing page. Supporting owner: {chosen["supporting_owner"]}'})
write('b7-cadillac-keyword-coverage.csv',coverage,coverage_fields)

own=[]
for page in audit['pages']+[{'url':'/services/head-unit-repair-dubai','title':after['/services/head-unit-repair-dubai']['seo']['title'],'h1':['Head Unit & Mercedes COMAND Repair in Dubai'],'indexable':True,'canonical':after['/services/head-unit-repair-dubai']['seo']['canonical']}]:
    p=page['url'];assigned=[r for r in records if r['primary_owner']==p];clusters=Counter(r['cluster'] for r in assigned)
    latest=[r for r in assigned if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx']
    evidence=f'{len(latest)} query rows, {sum(float(r["gsc_impressions"] or 0) for r in latest):g} impressions in Sept 27 export; editorial mapping only' if latest else 'No query × landing-page join supplied'
    links=[urlsplit(a.get('href','')).path for a in main(doc(p)).xpath('.//a[@href]')]
    support=' | '.join(sorted({x for x in links if ('cadillac' in x or x in ('/services/auto-electrical-repair-dubai','/services/head-unit-repair-dubai')) and x!=p})[:12])
    rival='/services/head-unit-repair-dubai' if 'cue' in p else '/services/cadillac-cue-screen-repair-dubai' if 'electrical' in p or 'diagnostics' in p else '/blog/cadillac-best-workshop-dubai' if p.endswith('cadillac-service-dubai') else '/brands/cadillac-service-dubai'
    own.append({'url':p,'page_type':ptype(p),'primary_intent':page['h1'][0] if page['h1'] else page['title'],'primary_keyword_cluster':clusters.most_common(1)[0][0] if clusters else page['h1'][0] if page['h1'] else '',
      'secondary_clusters':' | '.join(c for c,_ in clusters.most_common(5)[1:]),'gsc_evidence':evidence,'supporting_pages':support,'potential_competitor':rival,
      'ownership_conflict':'NO — distinct editorial primary task; ranking overlap unproven','indexability':'index' if page['indexable'] else 'noindex','canonical':page['canonical'],
      'b7_action':'UPDATED' if p in changed else 'RETAINED AFTER REVIEW','notes':'Noindex service routes retain their policy; an indexable owner is mapped for search intent.'})
write('b7-cadillac-intent-ownership.csv',own,ownership_fields)

changes=[]
for p in sorted(changed):
    old=main(doc(p,'before'));new=main(doc(p));bb=before[p]['seo'];aa=after[p]['seo']
    oldh=' | '.join(clean(x) for x in old.xpath('.//h1'));newh=' | '.join(clean(x) for x in new.xpath('.//h1'))
    oldlinks={urlsplit(a.get('href','')).path for a in old.xpath('.//a[@href]')};newlinks={urlsplit(a.get('href','')).path for a in new.xpath('.//a[@href]')}
    changes.append({'url':p,'page_type':ptype(p),'old_title':bb.get('title'),'new_title':aa.get('title') if bb.get('title')!=aa.get('title') else 'RETAINED',
      'old_h1':oldh,'new_h1':newh if oldh!=newh else 'RETAINED','primary_intent':next((x['primary_intent'] for x in own if x['url']==p),''),
      'content_change':'CUE symptom and camera boundary clarified' if 'cue-screen' in p else 'Vehicle-specific Cadillac service facts and/or visible SSR FAQ answers updated',
      'internal_link_change':f'Added: {" | ".join(sorted(newlinks-oldlinks))}; removed: {" | ".join(sorted(oldlinks-newlinks))}' if oldlinks!=newlinks else 'RETAINED',
      'faq_change':'Visible FAQ answers in initial HTML' if ('/blog/cadillac-best-workshop-dubai' in p or p.endswith('cadillac-service-dubai')) else 'RETAINED',
      'schema_change':'RETAINED' if bb.get('jsonLd')==aa.get('jsonLd') else 'Existing schema content updated to match visible copy',
      'reason':'Cadillac intent and technically qualified scope; FAQ schema aligned with initial HTML'})
write('b7-cadillac-before-after.csv',changes,change_fields)

latest=[r for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']=='digitecme.com-Performance-on-Search-2026-09-27.xlsx']
ctr=[]
for r in sorted(latest,key=lambda x:-float(x['gsc_impressions'] or 0)):
    pos=float(r['gsc_position'] or 0);imp=float(r['gsc_impressions'] or 0);ct=float(r['gsc_ctr'] or 0)
    if not (imp>=20 and (ct<0.03 or 4<=pos<=30)):continue
    band='1–10' if pos<=10 else '11–20' if pos<=20 else '21–30' if pos<=30 else '31+'
    ctr.append({'keyword':r['raw_keyword'],'normalized_keyword':r['normalized_keyword'],'source_period':r['source_period'],'gsc_clicks':r['gsc_clicks'],'gsc_impressions':r['gsc_impressions'],'gsc_ctr':r['gsc_ctr'],'gsc_position':r['gsc_position'],'intent':r['search_intent'],'editorial_owner':r['primary_owner'],'position_band':band,
      'opportunity_reason':f'{imp:g} impressions, {ct:.1%} CTR, average position {pos:.1f} in selected export','b7_action':'Clarify title/description and CUE symptom match' if r['primary_owner']=='/services/cadillac-cue-screen-repair-dubai' else 'Review intent match and internal links without clickbait',
      'evidence_limitation':'Query-only GSC; editorial owner is not proven historical ranking URL'})
write('b7-cadillac-ctr-opportunities.csv',ctr,ctr_fields)
summary={'coverage':len(coverage),'ownership':len(own),'changed':len(changes),'ctr_opportunities':len(ctr),'classes':dict(Counter(r['coverage_class'] for r in coverage)),'latest_original_gsc_rows':len(latest)}
(OUT/'table-summary.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2))
