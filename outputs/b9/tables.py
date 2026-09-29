"""Create B9 keyword, ownership, before/after and measured CTR CSVs."""
import csv, gzip, json, re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html

R=Path(__file__).resolve().parents[2];O=R/'outputs/b9';BASE=R/'outputs/b8'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
audit=read(O/'audit-summary.json')['brands'];before={x['path']:x for x in read(O/'pages-baseline.json')};after={x['path']:x for x in read(O/'after-pages.json')}
latest_file='digitecme.com-Performance-on-Search-2026-09-27.xlsx';ROXSOFT='/brands/rox-service-dubai/soft-close-door-installation';SOFT='/services/soft-close-door-repair-dubai'
CF='keyword,normalized_keyword,brand,source,source_file,source_period,measured_or_generated,gsc_clicks,gsc_impressions,gsc_ctr,gsc_position,search_intent,cluster,primary_owner,coverage_class,coverage_location,reason,b9_action,notes'
OF='url,page_type,primary_intent,primary_keyword_cluster,secondary_clusters,gsc_evidence,supporting_pages,potential_competitor,ownership_conflict,indexability,canonical,b9_action,notes'
BF='url,page_type,old_title,new_title,old_h1,new_h1,primary_intent,content_change,internal_link_change,faq_change,schema_change,reason'
TF='brand,keyword,normalized_keyword,source_period,gsc_clicks,gsc_impressions,gsc_ctr,gsc_position,intent,editorial_owner,position_band,opportunity_reason,b9_action,evidence_limitation'

def write(name,fields,rows):
    with (R/name).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields.split(','),extrasaction='ignore');w.writeheader();w.writerows(rows)
def doc(p,phase='after'):
    item=(after if phase=='after' else before)[p];root=O if phase=='after' else BASE
    return html.fromstring(gzip.decompress((root/item['htmlFile']).read_bytes()).decode('utf-8'))
def main(d):return (d.xpath('//main') or [d])[0]
def clean(x):return re.sub(r'\s+',' ',x.text_content()).strip()
def page_type(p,brand):
    ar='Arabic ' if p.startswith('/ar/') else '';q=p.removeprefix('/ar')
    if q==f'/brands/{brand}-service-dubai':return ar+'brand hub'
    if q==ROXSOFT:return ar+'ROX installation service'
    if q==SOFT:return ar+'generic soft-close service'
    if q.startswith(f'/brands/{brand}-service-dubai/'):return ar+'brand service'
    return ar+'generic supporting service'
def classify(r,brand):
    owner=r['primary_owner'];t=r['normalized_keyword'];intent=r['search_intent'].lower()
    if not owner:return 'NOT TARGETED — INTENTIONALLY'
    if owner==ROXSOFT:return 'COVERED — PRIMARY'
    if owner==SOFT:return 'COVERED — SECONDARY'
    if 'model enquiry' in intent or 'model/broad enquiry' in intent:return 'COVERED — MODEL'
    if any(s in t for s in ('won\'t start','wont start','no start')):return 'COVERED — FAQ'
    if any(s in intent for s in ('warning','symptom','fault')):return 'COVERED — PROBLEM'
    if any(s in intent for s in ('maintenance/cost','cost planning')):return 'COVERED — SECTION'
    if owner==f'/brands/{brand}-service-dubai' or owner.startswith(f'/brands/{brand}-service-dubai/'):return 'COVERED — PRIMARY'
    return 'COVERED — SECONDARY'

ctr=[];summaries={}
for brand in ('Jetour','ROX'):
    slug=brand.lower();records=read(O/f'{slug}-keyword-owner-records.json');info=audit[slug];changed=set(info['changed_urls']);hub=f'/brands/{slug}-service-dubai'
    group=defaultdict(list)
    for x in records:group[x['normalized_keyword']].append(x)
    coverage=[]
    for term,items in sorted(group.items()):
        r=max(items,key=lambda x:(x['measured_or_generated']=='MEASURED ORIGINAL GSC' and x['source_file']==latest_file,x['measured_or_generated']=='MEASURED ORIGINAL GSC',x['measured_or_generated']=='MEASURED WORKBOOK'))
        owner=r['primary_owner'];measured=r['measured_or_generated'].startswith('MEASURED')
        row={'keyword':r['raw_keyword'],'normalized_keyword':term,'brand':brand,'source':r['source'],'source_file':r['source_file'],'source_period':r['source_period'],'measured_or_generated':r['measured_or_generated'],'search_intent':r['search_intent'],'cluster':r['cluster'],'primary_owner':owner,'coverage_class':classify(r,slug),'coverage_location':owner,'reason':r['reason'],'b9_action':'VERIFY SCOPE' if not owner else 'IMPROVE EXISTING OWNER' if owner in changed else 'RETAIN EXISTING OWNER','notes':f'{len(items)} source observations; supporting owner: {r["supporting_owner"]}; query-only GSC does not establish ranking URL'}
        for k in ('gsc_clicks','gsc_impressions','gsc_ctr','gsc_position'):row[k]=r[k] if measured else ''
        coverage.append(row)
    write(f'b9-{slug}-keyword-coverage.csv',CF,coverage)

    primary_urls={r['primary_owner'] for r in records if r['primary_owner']}
    page_map={x['url']:x for x in info['pages']}
    for p in sorted(primary_urls-set(page_map)):
        if p not in after:continue
        seo=after[p]['seo'];d=doc(p);page_map[p]={'url':p,'title':seo.get('title'),'h1':[clean(x) for x in main(d).xpath('.//h1')],'indexable':not seo.get('noindex'),'canonical':seo.get('canonical')}
    ownership=[]
    for p,page in sorted(page_map.items()):
        assigned=[r for r in records if r['primary_owner']==p];clusters=Counter(r['cluster'] for r in assigned)
        latest=[r for r in assigned if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']==latest_file]
        links={urlsplit(a.get('href','')).path for a in main(doc(p)).xpath('.//a[@href]')}
        support=' | '.join(sorted(q for q in links if (brand.lower() in q or q in primary_urls) and q!=p)[:12])
        rival=SOFT if p==ROXSOFT else ROXSOFT if p==SOFT and brand=='ROX' else hub
        ownership.append({'url':p,'page_type':page_type(p,slug),'primary_intent':(page['h1'] or [page['title']])[0],'primary_keyword_cluster':clusters.most_common(1)[0][0] if clusters else (page['h1'] or [page['title']])[0],'secondary_clusters':' | '.join(c for c,_ in clusters.most_common(6)[1:]),'gsc_evidence':f'{len(latest)} query rows, {sum(float(x["gsc_impressions"] or 0) for x in latest):g} impressions in 2026-09-27 query-only export' if latest else 'No query × landing-page join supplied','supporting_pages':support,'potential_competitor':rival,'ownership_conflict':'NO — editorial task distinct; ranking overlap unproven','indexability':'index' if page['indexable'] else 'noindex','canonical':page['canonical'],'b9_action':'UPDATED' if p in changed else 'RETAINED AFTER REVIEW','notes':'Existing route and index policy retained. Generic service owners support brand enquiries where the brand route is noindex.'})
    write(f'b9-{slug}-intent-ownership.csv',OF,ownership)

    changes=[]
    for p in sorted(changed):
        old=main(doc(p,'before'));new=main(doc(p));bs=before[p]['seo'];as_=after[p]['seo']
        oldh=' | '.join(clean(x) for x in old.xpath('.//h1'));newh=' | '.join(clean(x) for x in new.xpath('.//h1'))
        oldlinks={urlsplit(a.get('href','')).path for a in old.xpath('.//a[@href]')};newlinks={urlsplit(a.get('href','')).path for a in new.xpath('.//a[@href]')}
        detail='ROX 01 installation versus cross-brand repair separated' if 'soft-close' in p else 'ROX range-extender and verified workshop scope clarified' if brand=='ROX' else 'Jetour model, service and diagnostic scope clarified'
        changes.append({'url':p,'page_type':page_type(p,slug),'old_title':bs.get('title'),'new_title':as_.get('title') if bs.get('title')!=as_.get('title') else 'RETAINED','old_h1':oldh,'new_h1':newh if oldh!=newh else 'RETAINED','primary_intent':next((x['primary_intent'] for x in ownership if x['url']==p),''),'content_change':detail,'internal_link_change':f'Added: {" | ".join(sorted(newlinks-oldlinks))}; removed: {" | ".join(sorted(oldlinks-newlinks))}' if oldlinks!=newlinks else 'RETAINED','faq_change':'Visible FAQ or page-specific wording updated' if bs.get('jsonLd')!=as_.get('jsonLd') else 'RETAINED','schema_change':'Existing schema content updated to match visible copy' if bs.get('jsonLd')!=as_.get('jsonLd') else 'RETAINED','reason':'Distinct Jetour/ROX tasks and conservative technical scope without route-policy changes'})
    write(f'b9-{slug}-before-after.csv',BF,changes)

    latest=[r for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file']==latest_file]
    for r in latest:
        pos=float(r['gsc_position'] or 0);imp=float(r['gsc_impressions'] or 0);rate=float(r['gsc_ctr'] or 0)
        band='1–10' if pos<=10 else '11–20' if pos<=20 else '21–30' if pos<=30 else '31+'
        ctr.append({'brand':brand,'keyword':r['raw_keyword'],'normalized_keyword':r['normalized_keyword'],'source_period':r['source_period'],'gsc_clicks':r['gsc_clicks'],'gsc_impressions':r['gsc_impressions'],'gsc_ctr':r['gsc_ctr'],'gsc_position':r['gsc_position'],'intent':r['search_intent'],'editorial_owner':r['primary_owner'],'position_band':band,'opportunity_reason':f'{imp:g} impressions, {rate:.1%} CTR, average position {pos:.1f} in selected window','b9_action':'Differentiate ROX-specific installation from generic repair and review snippet after recrawl' if 'soft close' in r['normalized_keyword'] else 'Review intent match after recrawl','evidence_limitation':'Query-only GSC; editorial owner is not a proven historical ranking URL'})
    summaries[slug]={'coverage':len(coverage),'ownership':len(ownership),'changed':len(changes),'classes':dict(Counter(x['coverage_class'] for x in coverage)),'latest_original_gsc_rows':len(latest)}
write('b9-jetour-rox-ctr-opportunities.csv',TF,sorted(ctr,key=lambda x:-float(x['gsc_impressions'] or 0)))
(O/'table-summary.json').write_text(json.dumps(summaries,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summaries,indent=2))
