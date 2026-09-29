"""Produce B8 evidence tables from the preserved keyword and render snapshots."""
import csv, gzip, json, re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/b8'
BASE = ROOT / 'outputs/b7'
read = lambda p: json.loads(p.read_text(encoding='utf-8-sig'))
records = read(OUT/'volkswagen-keyword-owner-records.json')
audit = read(OUT/'audit-summary.json')['brands']['volkswagen']
before = {x['path']: x for x in read(OUT/'pages-baseline.json')}
after = {x['path']: x for x in read(OUT/'after-pages.json')}
latest_file = 'digitecme.com-Performance-on-Search-2026-09-27.xlsx'
hub = '/brands/volkswagen-service-dubai'
diag = hub + '/engine-diagnostics'
trans = '/services/transmission-repair-dubai'

def write(name, fields, rows):
    with (ROOT/name).open('w', newline='', encoding='utf-8-sig') as f:
        w=csv.DictWriter(f, fieldnames=fields.split(','), extrasaction='ignore'); w.writeheader(); w.writerows(rows)

def doc(p, phase='after'):
    x=(after if phase=='after' else before)[p]
    base=OUT if phase=='after' else BASE
    return html.fromstring(gzip.decompress((base/x['htmlFile']).read_bytes()).decode('utf-8'))

def main(d): return (d.xpath('//main') or [d])[0]
def clean(x): return re.sub(r'\s+', ' ', x.text_content()).strip()
def ptype(p):
    ar='Arabic ' if p.startswith('/ar/') else ''
    q=p.removeprefix('/ar')
    if q==hub:return ar+'brand hub'
    if q==trans:return 'generic transmission service'
    if q.startswith(hub+'/'):return ar+'brand service'
    if q.startswith('/blog/'):return ar+'selection guide'
    return ar+'supporting service'

def coverage_class(r):
    owner=r['primary_owner']; intent=r['search_intent']; cluster=r['cluster'].lower(); term=r['normalized_keyword']
    if owner=='NOT TARGETED' or not owner:return 'NOT TARGETED — INTENTIONALLY'
    if 'model' in intent.lower() or 'golf' in cluster or 'tiguan' in cluster or 'touareg' in cluster:return 'COVERED — MODEL'
    if owner.startswith('/blog/'):return 'COVERED — GUIDE'
    if 'epc' in term:return 'COVERED — FAQ'
    if any(x in term for x in ('mechatronic','clutch','dsg oil','dsg fluid','dsg service','gearbox oil','gearbox fluid')):return 'COVERED — SECTION'
    if 'symptom' in intent.lower() or 'warning' in intent.lower() or 'epc' in cluster:return 'COVERED — PROBLEM'
    if any(x in cluster for x in ('service interval','maintenance cost','dsg fluid','dsg oil','mechatronic','clutch')):return 'COVERED — SECTION'
    if owner in (hub,diag,trans) or owner.startswith(hub+'/') and owner not in (hub+'/transmission-repair',):return 'COVERED — PRIMARY'
    return 'COVERED — SECONDARY'

groups=defaultdict(list)
for r in records:groups[r['normalized_keyword']].append(r)
coverage=[]
for term,items in sorted(groups.items()):
    r=max(items,key=lambda x:(x['measured_or_generated']=='MEASURED ORIGINAL GSC' and x['source_file']==latest_file,x['measured_or_generated']=='MEASURED ORIGINAL GSC',x['measured_or_generated']=='MEASURED WORKBOOK'))
    owner=r['primary_owner']; measured=r['measured_or_generated'].startswith('MEASURED')
    x={'keyword':r['raw_keyword'],'normalized_keyword':term,'brand':'Volkswagen','source':r['source'],'source_file':r['source_file'],'source_period':r['source_period'],'measured_or_generated':r['measured_or_generated'],'search_intent':r['search_intent'],'cluster':r['cluster'],'primary_owner':'' if owner=='NOT TARGETED' else owner,'coverage_class':coverage_class(r),'coverage_location':'' if owner=='NOT TARGETED' else owner,'reason':r['reason'],'b8_action':'VERIFY SCOPE' if owner=='NOT TARGETED' else 'IMPROVE EXISTING OWNER' if owner in audit['changed_urls'] else 'RETAIN EXISTING OWNER','notes':f'{len(items)} source observations; supporting owner: {r["supporting_owner"]}; query-only GSC does not establish ranking URL'}
    for k in ('gsc_clicks','gsc_impressions','gsc_ctr','gsc_position'):x[k]=r[k] if measured else ''
    coverage.append(x)
write('b8-volkswagen-keyword-coverage.csv','keyword,normalized_keyword,brand,source,source_file,source_period,measured_or_generated,gsc_clicks,gsc_impressions,gsc_ctr,gsc_position,search_intent,cluster,primary_owner,coverage_class,coverage_location,reason,b8_action,notes',coverage)

ownership=[]
for page in audit['pages']:
    p=page['url'];assigned=[r for r in records if r['primary_owner']==p];clusters=Counter(r['cluster'] for r in assigned)
    latest=[r for r in assigned if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']==latest_file]
    links={urlsplit(a.get('href','')).path for a in main(doc(p)).xpath('.//a[@href]')}
    supporting=' | '.join(sorted(x for x in links if ('volkswagen' in x or x in (trans,diag)) and x!=p)[:12])
    rival=trans if 'transmission' in p and p!=trans else diag if 'diagnostics' in p else '/blog/volkswagen-best-workshop-dubai' if p==hub else hub
    ownership.append({'url':p,'page_type':ptype(p),'primary_intent':(page['h1'] or [page['title']])[0],'primary_keyword_cluster':clusters.most_common(1)[0][0] if clusters else (page['h1'] or [page['title']])[0],'secondary_clusters':' | '.join(c for c,_ in clusters.most_common(5)[1:]),'gsc_evidence':f'{len(latest)} query rows, {sum(float(x["gsc_impressions"] or 0) for x in latest):g} impressions in 2026-09-27 query-only export' if latest else 'No query × landing-page join supplied','supporting_pages':supporting,'potential_competitor':rival,'ownership_conflict':'NO — editorial task distinct; ranking overlap unproven','indexability':'index' if page['indexable'] else 'noindex','canonical':page['canonical'],'b8_action':'UPDATED' if p in audit['changed_urls'] else 'RETAINED AFTER REVIEW','notes':'Existing route and index policy retained; noindex brand service may support an indexable commercial owner.'})
write('b8-volkswagen-intent-ownership.csv','url,page_type,primary_intent,primary_keyword_cluster,secondary_clusters,gsc_evidence,supporting_pages,potential_competitor,ownership_conflict,indexability,canonical,b8_action,notes',ownership)

changes=[]
for p in sorted(audit['changed_urls']):
    old=main(doc(p,'before'));new=main(doc(p));bb=before[p]['seo'];aa=after[p]['seo']
    oldh=' | '.join(clean(x) for x in old.xpath('.//h1'));newh=' | '.join(clean(x) for x in new.xpath('.//h1'))
    oldlinks={urlsplit(a.get('href','')).path for a in old.xpath('.//a[@href]')};newlinks={urlsplit(a.get('href','')).path for a in new.xpath('.//a[@href]')}
    changes.append({'url':p,'page_type':ptype(p),'old_title':bb.get('title'),'new_title':aa.get('title') if bb.get('title')!=aa.get('title') else 'RETAINED','old_h1':oldh,'new_h1':newh if oldh!=newh else 'RETAINED','primary_intent':next((x['primary_intent'] for x in ownership if x['url']==p),''),'content_change':'Volkswagen DSG/ODIS/EPC scope and contextual path clarified' if p in (hub,diag,hub+'/transmission-repair',trans) else 'Volkswagen-specific business copy or SSR FAQ visibility improved','internal_link_change':f'Added: {" | ".join(sorted(newlinks-oldlinks))}; removed: {" | ".join(sorted(oldlinks-newlinks))}' if oldlinks!=newlinks else 'RETAINED','faq_change':'Visible FAQ answers now present in initial HTML' if p.endswith('volkswagen-service-dubai') or 'best-workshop' in p else 'Relevant Volkswagen FAQ content updated' if p in (diag,hub+'/transmission-repair') else 'RETAINED','schema_change':'RETAINED' if bb.get('jsonLd')==aa.get('jsonLd') else 'Existing schema content updated to match visible copy','reason':'Separate broad Volkswagen, DSG service and ODIS/EPC diagnostic tasks without route-policy changes'})
write('b8-volkswagen-before-after.csv','url,page_type,old_title,new_title,old_h1,new_h1,primary_intent,content_change,internal_link_change,faq_change,schema_change,reason',changes)

latest=[r for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']==latest_file]
ctr=[]
for r in sorted(latest,key=lambda x:-float(x['gsc_impressions'] or 0)):
    pos=float(r['gsc_position'] or 0); imp=float(r['gsc_impressions'] or 0); rate=float(r['gsc_ctr'] or 0)
    if not (imp>=20 and (rate<.03 or 4<=pos<=30)):continue
    band='1–10' if pos<=10 else '11–20' if pos<=20 else '21–30' if pos<=30 else '31+'
    ctr.append({'keyword':r['raw_keyword'],'normalized_keyword':r['normalized_keyword'],'source_period':r['source_period'],'gsc_clicks':r['gsc_clicks'],'gsc_impressions':r['gsc_impressions'],'gsc_ctr':r['gsc_ctr'],'gsc_position':r['gsc_position'],'intent':r['search_intent'],'editorial_owner':r['primary_owner'],'position_band':band,'opportunity_reason':f'{imp:g} impressions, {rate:.1%} CTR, average position {pos:.1f}','b8_action':'Review title, description, intent alignment and internal links without clickbait','evidence_limitation':'Query-only GSC; editorial owner is not proven historical ranking URL'})
write('b8-volkswagen-ctr-opportunities.csv','keyword,normalized_keyword,source_period,gsc_clicks,gsc_impressions,gsc_ctr,gsc_position,intent,editorial_owner,position_band,opportunity_reason,b8_action,evidence_limitation',ctr)
summary={'coverage':len(coverage),'ownership':len(ownership),'changed':len(changes),'ctr_opportunities':len(ctr),'classes':dict(Counter(r['coverage_class'] for r in coverage)),'latest_original_gsc_rows':len(latest)}
(OUT/'table-summary.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2))
