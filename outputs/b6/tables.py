"""Create required B6 CSV evidence registers from source observations and SSR pages."""
import csv,gzip,json,re
from collections import Counter,defaultdict
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html

ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'outputs/b6';BASE=ROOT/'outputs/b5'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
audit=read(OUT/'audit-summary.json');before={x['path']:x for x in read(OUT/'pages-baseline.json')};after={x['path']:x for x in read(OUT/'after-pages.json')}
coverage_fields='keyword normalized_keyword brand source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position search_intent cluster primary_owner coverage_class coverage_location reason b6_action notes'.split()
ownership_fields='url page_type primary_intent primary_keyword_cluster secondary_clusters gsc_evidence supporting_pages potential_competitor ownership_conflict indexability canonical b6_action notes'.split()
change_fields='url page_type old_title new_title old_h1 new_h1 primary_intent content_change internal_link_change faq_change schema_change reason'.split()
def write(name,rows,fields):
 with (ROOT/name).open('w',newline='',encoding='utf-8-sig') as f:
  w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(rows)
def doc(p,phase='after'):
 rec=(after if phase=='after' else before)[p];base=OUT if phase=='after' else BASE
 return html.fromstring(gzip.decompress((base/rec['htmlFile']).read_bytes()).decode('utf-8'))
def main(d):return (d.xpath('//main') or [d])[0]
def clean(x):return re.sub(r'\s+',' ',x.text_content()).strip()
def ptype(p,b):
 bare=p.removeprefix('/ar');ar='Arabic ' if p.startswith('/ar/') else ''
 if bare==f'/brands/{b}-service-dubai':return ar+'hub'
 if bare.startswith(f'/brands/{b}-service-dubai/'):return ar+'commercial service'
 if bare=='/best-range-rover-workshop-dubai' or bare=='/blog/jaguar-best-workshop-dubai':return ar+'selection guide'
 if bare=='/blog/best-defender-workshop-dubai':return ar+'accident case guide'
 if 'air-suspension-problems' in bare:return ar+'problem guide'
 if 'maintenance-guide' in bare or bare=='/blog/defender-service-dubai-guide':return ar+'maintenance guide'
 return ar+'model guide'
def classification(r,b):
 owner=r['primary_owner'];intent=r['search_intent'].lower()
 if not owner:return 'NOT TARGETED — INTENTIONALLY'
 typ=ptype(owner,b) if owner in after and (b in owner or owner=='/best-range-rover-workshop-dubai') else ''
 if 'problem guide' in typ:return 'COVERED — PROBLEM'
 if 'selection guide' in typ or 'accident case' in typ or 'maintenance guide' in typ:return 'COVERED — GUIDE'
 if 'model' in typ:return 'COVERED — MODEL'
 if 'hub' in typ:return 'COVERED — PRIMARY' if 'broad' in intent else 'COVERED — SECTION'
 if 'commercial service' in typ:return 'COVERED — PRIMARY' if 'commercial' in intent else 'COVERED — SECTION'
 return 'COVERED — SECONDARY'
summary={}
for b in ('range-rover','defender','jaguar'):
 records=read(OUT/f'{b}-keyword-owner-records.json');group=defaultdict(list)
 for r in records:group[r['normalized_keyword']].append(r)
 changed=set(audit['brands'][b]['changed_urls']);coverage=[]
 for term,items in sorted(group.items()):
  chosen=max(items,key=lambda r:(r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file'].endswith('2026-09-27.xlsx'),r['measured_or_generated']=='MEASURED ORIGINAL GSC',r['measured_or_generated']=='MEASURED WORKBOOK'))
  owner=chosen['primary_owner'];cls=classification(chosen,b)
  coverage.append({'keyword':chosen['raw_keyword'],'normalized_keyword':term,'brand':{'range-rover':'Range Rover','defender':'Defender','jaguar':'Jaguar'}[b],
   'source':chosen['source'],'source_file':chosen['source_file'],'source_period':chosen['source_period'],'measured_or_generated':chosen['measured_or_generated'],
   **{k:chosen[k] if chosen['measured_or_generated'].startswith('MEASURED') else '' for k in ('gsc_clicks','gsc_impressions','gsc_ctr','gsc_position')},
   'search_intent':chosen['search_intent'],'cluster':chosen['cluster'],'primary_owner':owner,'coverage_class':cls,'coverage_location':owner,
   'reason':chosen['reason'],'b6_action':'SCOPE CONFIRMATION REQUIRED' if not owner else 'IMPROVE EXISTING OWNER' if owner in changed else 'RETAIN EXISTING OWNER',
   'notes':f'{len(items)} source observations; query-only GSC is not landing-page attribution.'})
 write(f'b6-{b}-keyword-coverage.csv',coverage,coverage_fields)
 own=[]
 for page in audit['brands'][b]['pages']:
  p=page['url'];assigned=[r for r in records if r['primary_owner']==p];clusters=Counter(r['cluster'] for r in assigned)
  latest=[r for r in assigned if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file'].endswith('2026-09-27.xlsx')]
  evidence=f'{len(latest)} latest GSC query rows; {sum(float(r["gsc_impressions"] or 0) for r in latest):g} impressions; editorial mapping only' if latest else 'No query × landing-page join supplied'
  links=[urlsplit(a.get('href','')).path for a in main(doc(p)).xpath('.//a[@href]')]
  support=' | '.join(sorted({x for x in links if b in x and x!=p})[:12])
  rival='/brands/land-rover-service-dubai' if b in ('range-rover','defender') else f'/brands/{b}-service-dubai'
  if p==f'/brands/{b}-service-dubai':rival='/brands/land-rover-service-dubai' if b!='jaguar' else '/blog/jaguar-best-workshop-dubai'
  own.append({'url':p,'page_type':ptype(p,b),'primary_intent':page['h1'][0] if page['h1'] else page['title'],'primary_keyword_cluster':clusters.most_common(1)[0][0] if clusters else page['h1'][0] if page['h1'] else '',
   'secondary_clusters':' | '.join(c for c,_ in clusters.most_common(5)[1:]),'gsc_evidence':evidence,'supporting_pages':support,'potential_competitor':rival,
   'ownership_conflict':'NO — distinct editorial primary task; ranking overlap unproven','indexability':'index' if page['indexable'] else 'noindex',
   'canonical':page['canonical'],'b6_action':'UPDATED' if p in changed else 'RETAINED AFTER REVIEW','notes':'Potential competitor is editorial review, not query × page evidence.'})
 write(f'b6-{b}-intent-ownership.csv',own,ownership_fields)
 changes=[]
 for p in sorted(changed):
  old=main(doc(p,'before'));new=main(doc(p));bb=before[p]['seo'];aa=after[p]['seo']
  oldh=' | '.join(clean(x) for x in old.xpath('.//h1'));newh=' | '.join(clean(x) for x in new.xpath('.//h1'))
  oldlinks={urlsplit(a.get('href','')).path for a in old.xpath('.//a[@href]')};newlinks={urlsplit(a.get('href','')).path for a in new.xpath('.//a[@href]')}
  oldfaq=len(old.xpath('.//*[@data-state="closed"]'));newfaq=len(new.xpath('.//*[@data-state="closed"]'))
  changes.append({'url':p,'page_type':ptype(p,b),'old_title':bb.get('title'),'new_title':aa.get('title') if bb.get('title')!=aa.get('title') else 'RETAINED',
   'old_h1':oldh,'new_h1':newh if oldh!=newh else 'RETAINED','primary_intent':next((x['primary_intent'] for x in own if x['url']==p),''),
   'content_change':'Range Rover workshop selection checklist distinguished from broad service hub' if p=='/best-range-rover-workshop-dubai' else 'Jaguar-specific scope and I-PACE safeguards' if p=='/brands/jaguar-service-dubai' else 'Vehicle-specific service facts and/or visible FAQ answers updated',
   'internal_link_change':f'Added: {" | ".join(sorted(newlinks-oldlinks))}; removed: {" | ".join(sorted(oldlinks-newlinks))}' if oldlinks!=newlinks else 'RETAINED',
   'faq_change':'Visible FAQ answers in initial HTML' if oldfaq!=newfaq else 'RETAINED','schema_change':'RETAINED' if bb.get('jsonLd')==aa.get('jsonLd') else 'Existing schema content updated to match visible copy',
   'reason':'Distinct intent, technically qualified scope and FAQ/SSR alignment'})
 write(f'b6-{b}-before-after.csv',changes,change_fields)
 summary[b]={'coverage':len(coverage),'ownership':len(own),'changed':len(changes),'classes':dict(Counter(r['coverage_class'] for r in coverage))}
(OUT/'table-summary.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2))
