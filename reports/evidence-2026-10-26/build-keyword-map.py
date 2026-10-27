from pathlib import Path
import csv, json

root=Path(__file__).resolve().parent.parent
ev=root/'evidence-2026-10-26'
read=lambda p:list(csv.DictReader(p.open(encoding='utf-8-sig',newline='')))
queries={r['Top queries']:r for r in read(ev/'gsc/mercedes-queries.csv')}
pages={r['Top pages']:r for r in read(ev/'gsc/mercedes-pages.csv')}
technical={r['URL']:r for r in read(ev/'technical/pages.csv')}
origin='https://digitecme.com'
hub='/brands/mercedes-benz-service-dubai'
svc=lambda s:'/services/mercedes-'+s+'-dubai'
cost='/blog/mercedes-service-cost-dubai-guide'
interval='/blog/mercedes-service-intervals-dubai-heat'
maintenance='/blog/mercedes-benz-maintenance-guide-dubai'
rows=[]
def add(cluster,keywords,intent,path,support='',action='Retain existing owner; improve only with evidence',query='',priority='P2',gate='Confirm exact vehicle and service scope',note=''):
    url=origin+path
    q=queries.get(query)
    p=pages.get(url)
    metric=q or p
    rows.append(dict(cluster=cluster,keyword_examples=keywords,intent=intent,primary_url=url,
      supporting_urls='; '.join(origin+x for x in support.split(';') if x),
      action=action,priority=priority,observed_query=query if q else '',
      baseline_clicks=metric['Clicks'] if metric else '',baseline_impressions=metric['Impressions'] if metric else '',
      baseline_ctr=metric['calculated_ctr'] if metric else '',baseline_average_position=metric['Position'] if metric else '',
      metric_scope=('Exact query; no measured query-page attribution' if q else 'Page all-query aggregate; not model/service demand or keyword attribution' if p else 'No matching metric in visible export; not zero demand'),
      metric_period='2026-10-18 to 2026-10-24',source_range=metric['source_range'] if metric else '',
      fresh_primary_url_status=technical.get(url,{}).get('HTTP','Not in primary sample'),
      capability_gate=gate,search_volume='Unavailable; impressions are not search volume',notes=note))

for keyword in ['Mercedes service Dubai','Mercedes repair Dubai','Mercedes specialist Dubai','Mercedes workshop Dubai','Mercedes maintenance Dubai','Mercedes service center Dubai','Mercedes garage Dubai','Mercedes mechanic Dubai','Mercedes-Benz service Dubai','Mercedes-Benz repair Dubai']:
    lookup=keyword.lower().replace('mercedes-benz','mercedes benz')
    add('Broad Mercedes workshop',keyword,'Commercial workshop/service/repair',hub,svc('oil-change')+';'+cost+';'+interval,
      query=lookup,priority='P1' if 'repair' in keyword.lower() or 'specialist' in keyword.lower() else 'P2',
      note='All synonyms share this primary owner; no separate service/repair/specialist/garage landing page. Planned ownership, not measured ranking URL.')

services=[
 ('Oil service','Mercedes oil change; Mercedes oil change Dubai; MB-approved oil service','oil-change','mercedes oil change',interval+';/blog/best-oil-change-dubai-mercedes'),
 ('Engine repair','Mercedes engine repair Dubai; Mercedes mechanical repair Dubai','mechanical-repair','mercedes engine repair dubai','/mercedes/problems/check-engine-light'),
 ('Transmission repair','Mercedes transmission repair Dubai; 7G-Tronic; 9G-Tronic','transmission-repair','mercedes transmission repair dubai','/mercedes/problems/gearbox-jerking;/mercedes/problems/transmission-slipping'),
 ('Gearbox repair','Mercedes gearbox repair Dubai; Mercedes gearbox service','transmission-repair','mercedes transmission repair','/mercedes/problems/gearbox-jerking'),
 ('Suspension repair','Mercedes suspension repair Dubai; AIRMATIC repair; ABC fault','suspension-repair','mercedes suspension repair dubai','/mercedes/problems/airmatic-malfunction;/mercedes/problems/suspension-dropping-overnight'),
 ('Air conditioning repair','Mercedes AC repair Dubai; Mercedes air conditioning repair','ac-repair','mercedes ac repair dubai','/mercedes/problems/ac-not-cooling'),
 ('Electrical diagnostics','Mercedes electrical diagnostics Dubai; XENTRY diagnostics','diagnostics','mercedes diagnostics dubai',svc('electrical-repair')+';/mercedes/problems/battery-warning'),
 ('ECU programming','Mercedes ECU programming Dubai; Mercedes coding; supported adaptations','diagnostics','',svc('electrical-repair')),
 ('Brake repair','Mercedes brake repair Dubai; Mercedes brake pads and discs','brake-repair','mercedes brake repair',hub),
 ('Cooling system repair','Mercedes cooling system repair Dubai; coolant loss; water pump','mechanical-repair','','/mercedes/problems/engine-overheating'),
 ('Oil-leak repair','Mercedes oil leak repair Dubai','mechanical-repair','','/mercedes/problems/oil-leak'),
 ('Timing-chain repair','Mercedes timing chain repair Dubai','mechanical-repair','','/mercedes/problems/check-engine-light'),
 ('Turbocharger repair','Mercedes turbo repair Dubai; Mercedes turbocharger repair','mechanical-repair','','/mercedes/problems/check-engine-light'),
]
for cluster,kw,s,q,support in services:
    add(cluster,kw,'Commercial specific service',svc(s),support,query=q,
      gate='XENTRY capability user-confirmed; exact module access/programming remains conditional' if cluster=='ECU programming' else 'Confirm ability to perform this exact repair; timing-chain/turbo work needs job/capability evidence' if cluster in ['Timing-chain repair','Turbocharger repair'] else 'Confirm fitted system, parts and agreed inspection/repair scope',
      note='No new page proposed; distinct symptom research remains on supporting guides.')
for cluster,kw in [('Major service','Mercedes major service Dubai; Mercedes Service B'),('Minor service','Mercedes minor service Dubai; Mercedes Service A'),('Scheduled maintenance','Mercedes scheduled maintenance Dubai; Mercedes-Benz maintenance')]:
    add(cluster,kw,'Commercial scheduled maintenance',hub,cost+';'+interval+';'+maintenance,query='mercedes maintenance dubai',
      gate='Scope follows exact vehicle/reminder/history; A/B and minor/major are not universal fixed packages',note='Primary booking owner is hub; maintenance anchor #mercedes-maintenance-scope. Do not create another broad maintenance URL.')

model_rows=[
 ('C-Class','/blog/mercedes-c-class-service-dubai-guide'),('E-Class','/blog/mercedes-e-class-service-dubai-guide'),('S-Class','/blog/mercedes-s-class-service-dubai-guide'),
 ('G-Class','/mercedes/models/g-class-service-repair-dubai'),('GLE','/mercedes/models/gle-service-repair-dubai'),('GLC',hub),('GLS','/mercedes/models/gls-service-repair-dubai'),
 ('AMG C63','/mercedes/models/c63-service-repair-dubai'),('AMG E63','/mercedes/models/e63-service-repair-dubai'),('AMG G63','/blog/mercedes-g63-service-dubai-guide'),('AMG GT',hub),
 ('AMG S63','/mercedes/models/s63-service-repair-dubai')]
for name,path in model_rows:
    defer=name in ['GLC','AMG GT']
    add('Model '+name,f'Mercedes {name} service Dubai; Mercedes {name} repair Dubai','Commercial model service',path,svc('mechanical-repair')+';'+svc('diagnostics')+';'+svc('transmission-repair'),
      action='Retain model coverage on hub; defer dedicated URL until distinct sustained service demand and original evidence' if defer else 'Retain existing differentiated model owner; preserve current URL equity',
      priority='P3',gate='Verify exact generation, powertrain and offered services; tuning demand alone does not justify a repair page',
      note='Hub section #mercedes-models is current GLC/AMG GT service destination; no slug invented' if defer else 'G-Class is non-AMG; G63 has separate AMG scope. Page metrics below do not establish commercial model demand.' if name in ['G-Class','AMG G63'] else 'Existing /blog/ location does not itself require migration. Bare model and audio/tuning queries have different intent.')

ancillary=[('Electrical hardware','electrical-repair','Mercedes electrical repair Dubai; wiring; charging faults'),('Battery replacement','battery-replacement','Mercedes battery replacement Dubai'),('Steering repair','steering-repair','Mercedes steering repair Dubai'),('Tyre repair','tire-repair','Mercedes tyre repair Dubai; tire service'),('Exhaust repair','exhaust-repair','Mercedes exhaust repair Dubai'),('Fuel system','fuel-system-repair','Mercedes fuel system repair Dubai'),('Body repair','body-repair','Mercedes body repair Dubai; Mercedes body shop'),('Audio upgrades','audio-upgrade','Mercedes stereo upgrade in Dubai; E-Class audio upgrade; C-Class speaker upgrade')]
for cluster,s,kw in ancillary:
    add(cluster,kw,'Commercial specific service',svc(s),hub,query='mercedes stereo upgrade in dubai' if s=='audio-upgrade' else 'mercedes body repair dubai' if s=='body-repair' else '',
      note='Preserve existing owner. Six audio queries:204 impressions/0clicks at weighted position1.95; do not rewrite strong audio visibility to pursue maintenance keywords.' if s=='audio-upgrade' else 'Retain distinct repair task; protect generic multi-brand equivalents.')
add('Infotainment faults','Mercedes COMAND repair Dubai; Mercedes MBUX head unit fault','Commercial fault repair','/services/head-unit-repair-dubai',svc('diagnostics')+';'+svc('electrical-repair'),note='Existing cross-brand repair owner; not competing with upgrades. No new Mercedes COMAND page.')

guides=[('Maintenance costs',cost,'Mercedes service cost Dubai; Service A/B quotation'),('Service intervals',interval,'Mercedes service intervals Dubai; ASSYST due message'),('Maintenance planning',maintenance,'Mercedes maintenance guide; history and repair priorities'),('Oil selection','/blog/best-oil-change-dubai-mercedes','Mercedes oil-change comparison; selecting correct oil service'),('Broad problem navigation','/mercedes/problems','Mercedes problems and warning guides')]
for cluster,path,kw in guides:
    add(cluster,kw,'Informational / planning',path,hub+';'+svc('oil-change'),note='Support the commercial owner; no blanket consolidation without paired query/page and lead evidence.')
for slug,service,kw in [
 ('wont-start','diagnostics','Mercedes will not start; no crank'),('airmatic-malfunction','suspension-repair','Mercedes AIRMATIC malfunction'),('suspension-dropping-overnight','suspension-repair','Mercedes suspension dropping overnight'),('gearbox-jerking','transmission-repair','Mercedes gearbox jerking'),('transmission-slipping','transmission-repair','Mercedes transmission slipping'),('check-engine-light','diagnostics','Mercedes check engine light'),('ac-not-cooling','ac-repair','Mercedes AC not cooling'),('engine-overheating','mechanical-repair','Mercedes overheating'),('battery-warning','electrical-repair','Mercedes battery warning'),('oil-leak','mechanical-repair','Mercedes oil leak')]:
    add('Symptom '+slug,kw,'Informational symptom assessment','/mercedes/problems/'+slug,svc(service),note='Guide owns the warning/symptom question; linked service owns repair booking. Avoid automatic replacement promises.')

for model in ['c63','e63','g63','glc63','gt','gt63','s65']:
    add('Tuning AMG '+model.upper(),'Mercedes AMG '+model.upper()+' tuning Dubai; performance upgrades','Commercial performance tuning','/tuning/mercedes-amg-'+model,hub,
      priority='P3',gate='Only verified supported tuning scope and actual documented output',note='Separate from scheduled service/repair. Preserve stronger existing visibility; performance/model queries do not establish maintenance demand.')
add('Arabic Mercedes workshop','صيانة مرسيدس دبي; تصليح مرسيدس دبي','Arabic commercial service','/ar'+hub,'/ar'+svc('oil-change'),query='صيانة مرسيدس',gate='Arabic review and exact scope; preserve existing Arabic model noindex decisions',note='Language-specific owner; route Arabic legacy oil to existing Arabic owner only under separately approved routing plan.')
add('Valuation planning','Mercedes valuation Dubai; how much is my Mercedes worth','Informational vehicle valuation','/blog/how-much-is-my-mercedes-worth-dubai',hub,priority='P3',note='Outside core service lead objective; do not turn vehicle-selling queries into maintenance landing pages.')

for r in rows:
    if r['cluster'] in ['Major service','Minor service','Scheduled maintenance']:
        r['metric_scope']='Related broad maintenance query reused as context; not specific major/minor/scheduled demand; do not sum repeated source'

output=root/'mercedes-keyword-map-2026-10-26.csv'
with output.open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0])); w.writeheader();w.writerows(rows)
owners={}
for r in rows:
    assert not r['cluster'] in owners or owners[r['cluster']]==r['primary_url']
    owners[r['cluster']]=r['primary_url']
    assert r['fresh_primary_url_status']=='200',r

aliases={r['Requested URL']:r for r in read(ev/'technical/aliases.csv')}
joins=[]
for u,p in pages.items():
    a=aliases.get(u)
    if a:
        joins.append({'observed_url':u,'gsc_clicks':p['Clicks'],'gsc_impressions':p['Impressions'],'gsc_position':p['Position'],'source_range':p['source_range'],'fresh_http':a['HTTP'],'returned_canonical':a['Returned canonical'],'homepage_content':a['Same main content as homepage'],'intended_existing_owner':a['Source intended target']})
with (ev/'gsc-exposed-aliases.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(joins[0]));w.writeheader();w.writerows(joins)
summary={'keyword_map_rows':len(rows),'distinct_primary_urls':len(set(r['primary_url'] for r in rows)),'all_preferred_urls_fresh_200':True,'gsc_exposed_aliases':joins}
(ev/'keyword-map-validation.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
