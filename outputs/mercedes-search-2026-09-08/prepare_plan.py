import json, re, unicodedata
from pathlib import Path
from collections import Counter

OUT=Path('outputs/mercedes-search-2026-09-08')
source=json.loads((OUT/'source.json').read_text(encoding='utf-8'))
live={x['path']:x for x in json.loads((OUT/'live.json').read_text(encoding='utf-8'))}
BASE='https://digitecme.com'
HUB='/brands/mercedes-benz-service-dubai'
pages=[]
def page(id,name,path,priority,title,h1,action,links,evidence='',status='Existing page'):
    obs=live.get(path,{})
    pages.append(dict(id=id,name=name,path=path,url=BASE+path,priority=priority,title=title,h1=h1,action=action,links=links,evidence=evidence,status=status,currentTitle=obs.get('title','Not checked'),http=obs.get('status'),canonical=obs.get('canonical','Not checked')))

page('HUB','Mercedes repair, service and workshop',HUB,'P1','Mercedes Repair & Service Dubai | Digi-Tec Specialists','Mercedes-Benz Repair & Service Dubai',
 'Keep the existing title, H1 and URL. Repair the legacy URL routing first. Retain Service A/B and workshop process sections. Add a useful minor/major service comparison with inclusions, exclusions and quote inputs; add verified model coverage for the long-tail families without separate pages for every variant. Make workshop directions, phone, hours and booking easy to find. Publish real repair evidence with customer permission.',
 'Link to engine, suspension, transmission, oil, AC, battery, diagnostics and model pages with service-specific anchors. These pages link back to this hub.',
 'Existing page already has substantial content and real workshop imagery; inspect the last 28 days before rewriting. Generic repair/service/garage terms share this primary destination.')
service_briefs=[
 ('ENGINE','Engine repair','mechanical-repair','P1','Mercedes Engine & Mechanical Repair Dubai | Digi-Tec','Mercedes Engine & Mechanical Repair in Dubai','Lead with engine diagnosis, overheating, leaks, misfires, mounts and repair-versus-replacement assessment. Match engine-family examples to real jobs and include a documented engine repair. Reduce broad gearbox targeting; link gearbox enquiries to the transmission page.','/mercedes/problems/oil-leak; /mercedes/problems/engine-overheating','Live title says Mechanical Repair while the two engine-repair queries account for 405 impressions.'),
 ('SUSP','Suspension and AIRMATIC','suspension-repair','P1','Mercedes Suspension & AIRMATIC Repair Dubai | Digi-Tec','Mercedes Suspension & AIRMATIC Repair in Dubai','Explain the leak/pressure/ride-height diagnostic process, compressor and valve-block checks, coil versus air systems and what an estimate includes. Add a real before/after ride-height repair record. Keep symptom guides informational.','/mercedes/problems/airmatic-malfunction; /mercedes/problems/suspension-dropping-overnight','Two suspension queries account for 363 impressions; generic and legacy suspension URLs also appear in the export.'),
 ('TRANS','Transmission and gearbox','transmission-repair','P1','Mercedes Transmission & Gearbox Repair Dubai | Digi-Tec','Mercedes Transmission & Gearbox Repair in Dubai','Explain how fluid service differs from fault diagnosis, valve-body work, internal repair and replacement. Use 7G/9G/AMG terms where supported, identify the exact gearbox before quoting and add a documented repair with post-repair checks.','/mercedes/problems/gearbox-jerking; /mercedes/problems/transmission-slipping; /blog/transmission-service-7g-9g-dubai','Use one transactional URL for transmission, gearbox service and applicable clutch work. No generic fluid approval for all gearboxes.'),
 ('OIL','Oil change','oil-change','P1','Mercedes Oil Change Dubai | Service & Filter | Digi-Tec','Mercedes Oil Change in Dubai','Show oil/filter scope, how the VIN determines oil approval and quantity, service-reset checks and quote factors. Keep full Service A/B booking intent on the hub. Add genuine oil-service photos and a sample itemized scope.','/blog/best-oil-change-dubai-mercedes; /blog/oil-specification-guide-dubai-luxury','Retain current URL; slash version already has a canonical to the non-slash version, but a permanent redirect can consolidate access.'),
 ('DIAG','Diagnostics, coding and programming','diagnostics','P2','Mercedes Diagnostics & Coding Dubai | Digi-Tec','Mercedes Diagnostics, Coding & Programming in Dubai','Create distinct sections for diagnostic scanning, supported module coding and programming. Explain eligibility checks, required VIN/module details, authorization where relevant, fault reports and post-programming tests. Use real supported examples. Link hardware faults to electrical repair.','/mercedes/problems/check-engine-light; /mercedes/problems/wont-start; /services/mercedes-electrical-repair-dubai','Coding service has 180 impressions at 51.60. Current live title is Engine Diagnostics, so supported coding deserves clearer coverage. No separate coding URL initially.'),
 ('AC','Air-conditioning repair','ac-repair','P1','Mercedes AC Repair Dubai | Air Conditioning | Digi-Tec','Mercedes AC & Air Conditioning Repair in Dubai','Answer weak cooling, uneven cabin temperature, leak diagnosis, recharge versus repair, compressor/evaporator work and quote factors. Identify refrigerant from the vehicle. Add a real diagnostic case and measured output checks; remove unverified universal failure claims.','/mercedes/problems/ac-not-cooling','Retain the Mercedes-specific page and strengthen links from the generic AC page; do not redirect the useful multi-brand page.'),
 ('BATTERY','Battery replacement','battery-replacement','P1','Mercedes Battery Replacement Dubai | Digi-Tec','Mercedes Battery Testing & Replacement in Dubai','Explain battery versus charging-fault diagnosis, VIN-based battery selection, supported adaptation and installation checks. Distinguish main, auxiliary and 48V systems. State actual booking location and availability rather than implying mobile service.','/mercedes/problems/battery-warning; /mercedes/problems/wont-start','Battery replacement near me averages 9.08 on 36 impressions; the Dubai term has 101 impressions at 23.18.'),
 ('BRAKES','Brake repair and service','brake-repair','P1','Mercedes Brake Repair & Service Dubai | Digi-Tec','Mercedes Brake Repair & Service in Dubai','Make pad/disc measurements, warning sensors, fluid checks, AMG specification and estimate inclusions clear. Add a real inspection record and verification after repair. Use the same page for brake service and repair variants.','/blog/brake-repair-dubai','Brake repair Dubai is at 9.64, while brake service Dubai is at 31.35; verify query-page data before attributing the difference.'),
 ('BODY','Body repair and body shop','body-repair','P2','Mercedes Body Repair & Body Shop Dubai | Digi-Tec','Mercedes Body Repair & Paintwork in Dubai','Explain inspected dent, bumper, panel and paintwork scope with original before/after work. State quote inputs, exclusions and any subcontracted work accurately. Keep body kits and performance conversion enquiries on the project/tuning route.','/services/car-body-repair-dubai','Do not claim Mercedes-authorized status, insurer approval or certification without evidence.'),
 ('ELEC','Electrical and ECU fault repair','electrical-repair','P2','Mercedes Electrical & ECU Fault Repair Dubai | Digi-Tec','Mercedes Electrical Fault Diagnosis & Repair in Dubai','Separate wiring, voltage, network and SAM faults from coding requests. For ECU repair terms, explain supported diagnosis and repair/replacement decisions without promising all modules can be repaired. Add one real electrical fault example.','/services/mercedes-diagnostics-dubai; /mercedes/problems/battery-warning','Preserve vehicle compatibility conditions and avoid duplicating the diagnostics page.'),
 ('STEER','Steering repair','steering-repair','P2','Mercedes Steering Repair Dubai | Digi-Tec','Mercedes Steering Repair in Dubai','Clarify rack, EPS and hydraulic diagnosis, inspection before replacement, supported calibration and alignment checks. Add model-specific evidence when available.','/brands/mercedes-benz-service-dubai','The main steering query is already close at 9.72 on 18 impressions; prioritize contextual links before a large rewrite.'),
 ('EXHAUST','Exhaust repair','exhaust-repair','P2','Mercedes Exhaust Repair Dubai | Digi-Tec','Mercedes Exhaust Repair in Dubai','Explain leak, mounting, noise and sensor diagnosis plus approved repair options. Distinguish repair from tuning hardware and show a real inspected repair.','/tuning','The query averages 6.50 on 14 impressions. Improve the existing page without creating another exhaust URL.'),
]
for id,name,slug,p,t,h,a,l,e in service_briefs:
    page(id,name,'/services/mercedes-'+slug+'-dubai',p,t,h,a,l,e)

page('TUNE','Mercedes and GAD tuning','/tuning','P1','Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec','GAD Motors Performance Tuning',
 'Keep the shared tuning page and configurator. Add a visible Mercedes-AMG section covering ECU tuning, supported stages, vehicle assessment, hardware dependencies and real GAD projects. Clearly separate coding/diagnostics from performance tuning. Use verified results and relationship wording; do not promise fixed gains on all cars.',
 '/blog/gad-tuning-explained; /blog/mercedes-amg-gt-tuning-dubai; /blog/mercedes-amg-gt-black-series-1300hp-build-dubai; /blog/g63-to-brabus-g800-conversion-dubai',
 'GAD queries are close to the target and existing project pages support them. Generic tuning queries may have international intent.')
page('AUDIO','Audio and stereo upgrades','/services/mercedes-audio-upgrade-dubai','Conditional','Mercedes Audio & Stereo Upgrades Dubai | Digi-Tec','Mercedes Audio & Stereo Upgrades in Dubai',
 'Create one dedicated page only after confirming this is a service Digi-Tec offers. Explain supported COMAND/MBUX and amplifier/speaker configurations, E-Class compatibility, factory-feature retention, installation scope and actual examples. Do not treat existing head-unit repair copy as proof of upgrade capability.',
 '/services/mercedes-electrical-repair-dubai; /blog/mercedes-e-class-service-dubai-guide',
 'Three audio upgrade queries total 375 impressions with average positions 55.81, 58.62 and 60.87. This is a service-coverage decision, not a quick ranking gain.',status='Proposed only if service confirmed')

models=[('G63','Mercedes-AMG G63','/blog/mercedes-g63-service-dubai-guide','P2'),('GCLASS','Mercedes G-Class','/mercedes/models/g-class-service-repair-dubai','P2'),('C63','Mercedes-AMG C63','/mercedes/models/c63-service-repair-dubai','P2'),('CCLASS','Mercedes C-Class','/blog/mercedes-c-class-service-dubai-guide','P2'),('E63','Mercedes-AMG E63','/mercedes/models/e63-service-repair-dubai','Protect'),('ECLASS','Mercedes E-Class','/blog/mercedes-e-class-service-dubai-guide','Protect'),('SCLASS','Mercedes S-Class','/blog/mercedes-s-class-service-dubai-guide','Protect'),('S63','Mercedes-AMG S63','/mercedes/models/s63-service-repair-dubai','Protect'),('GLE','Mercedes GLE','/mercedes/models/gle-service-repair-dubai','P2'),('GLS','Mercedes GLS','/mercedes/models/gls-service-repair-dubai','P2')]
for id,name,path,p in models:
    page(id,name,path,p,name+' Service & Repair Dubai | Digi-Tec',name+' Service & Repair Dubai',
     'Keep the existing canonical URL and model-specific content. Check query-to-page data and index status before rewriting. Add only verified variant coverage, a real model repair example, service scope and relevant system links. Preserve AMG versus base-model distinctions; do not copy a generic model template.',
     HUB+'; /services/mercedes-mechanical-repair-dubai; /services/mercedes-suspension-repair-dubai; /services/mercedes-transmission-repair-dubai',
     'Model queries often have fewer than 10 impressions. A top-five query average does not establish that this model page is the ranking URL.')
page('MAYBACH','Mercedes-Maybach','/brands/maybach-service-dubai','P3','Maybach Repair & Service Dubai | Digi-Tec','Maybach Repair & Service in Dubai','Keep S-Class Maybach intent on the dedicated Maybach hub and add relevant links from Mercedes S-Class content. Preserve Maybach-specific evidence and supported scope.',HUB+'; /blog/mercedes-s-class-service-dubai-guide','One query has five impressions; refresh joint query-page data before investing in an expansion.')
page('COST','Service cost guide','/blog/mercedes-service-cost-dubai-guide','P3','Mercedes Service Cost Dubai | A & B Scope | Digi-Tec','Mercedes Service Cost in Dubai: Service A & B Scope','Retain the guide URL; refocus title/H1 on cost and scope rather than broad service booking. Add real priced examples only if workshop-approved, dated and explicit about VAT, included work and vehicle assumptions. Otherwise explain quote factors clearly.',HUB+'; /services/mercedes-oil-change-dubai','Current live title begins Mercedes Service Dubai and overlaps the commercial hub. Confirm overlap in joint data before considering any consolidation.')
page('INTERVAL','Service schedule and codes','/blog/mercedes-service-intervals-dubai-heat','P3','Mercedes Service Intervals & ASSYST Dubai | Digi-Tec','Mercedes Service Intervals & ASSYST in Dubai','Explain schedule selection from VIN, model year, service history and ASSYST. Add a concise service-code section for A3/A9/AH only after technical review. Do not present one fixed interval or code checklist for every car.',HUB+'; /blog/mercedes-service-cost-dubai-guide','Very small query samples; keep this guide informational.')
page('OWNERSHIP','Ownership and Gulf reliability','/blog/mercedes-benz-maintenance-guide-dubai','P3','Mercedes-Benz Maintenance Dubai | DIGI-TEC','Mercedes-Benz Maintenance Guide for Dubai Owners','Answer Gulf ownership concerns with documented maintenance considerations, history, inspection and model-dependent cost factors. Explain that reliability varies with condition and maintenance; avoid unsupported universal claims.',HUB+'; /blog/pre-purchase-inspection-dubai-guide','The long reliability question is a two-impression informational query, not a reason for a new landing page.')
page('PPF','Mercedes paint protection','/services/paint-protection-film','P3','PPF Dubai | Paint Protection Film for Cars | DIGI-TEC','Paint Protection Film (PPF) Dubai','Keep the existing PPF page. Add a Mercedes project only when original work and package details are available. Link from bodywork and the Mercedes hub as relevant.',HUB+'; /services/mercedes-body-repair-dubai','Seven impressions; no separate Mercedes PPF page justified by this export alone.')
page('AR','Arabic Mercedes repair','/ar/brands/mercedes-benz-service-dubai','P3','إصلاح وصيانة مرسيدس في دبي | ديجي-تك','إصلاح وصيانة مرسيدس بنز في دبي','Use natural Arabic brand wording after native-language review. Keep Arabic content, canonical and reciprocal language links accurate. Support the same confirmed workshop and booking details as English.',HUB,'One mixed Arabic/English query has five impressions. Proposed Arabic metadata requires language review.')

byid={p['id']:p for p in pages}
def classify(raw):
    q=' '.join(unicodedata.normalize('NFKC',raw).replace('\u200b','').lower().split())
    fit='Relevant'; id='HUB'; cluster='General repair and workshop'; section='Workshop and booking'; note='Use the main Mercedes page for broad repair, service, garage and specialist wording.'
    if any(t in q for t in ['stereo','audio upgrade','sound system']):
        return 'AUDIO','Audio upgrades','Compatibility and E-Class examples','Conditional','Confirm audio upgrade capability before publishing or targeting this proposed URL.'
    if any(t in q for t in ['gad','tuning','tuner','chip tuning','performance','modification companies','body kit','upgrades']):
        id='TUNE'; cluster='Performance tuning and GAD'; section='Mercedes-AMG tuning and verified projects'; note='Use the Mercedes section of the existing tuning page and relevant project evidence.'
    elif any(t in q for t in ['coding','programming','diagnostic','star service']) or re.search(r'\bu[0-9a-f]{6}\b',q):
        id='DIAG'; cluster='Diagnostics and coding'; section='Coding/programming' if any(t in q for t in ['coding','programming']) else 'Diagnostic process'; note='Match supported vehicle/module functions; do not create a page per fault code.'
    elif any(t in q for t in ['electri','ecu repair']) or q=='mercedes ecu':
        id='ELEC'; cluster='Electrical and ECU faults'; section='Electrical testing and module assessment'; note='Distinguish hardware/electrical repair from module coding and ECU tuning.'
    elif 'suspension' in q:
        id='SUSP'; cluster='Suspension repair'; section='Suspension and AIRMATIC diagnosis'; note='Use the Mercedes suspension service page, with links to relevant symptom guides.'
    elif any(t in q for t in ['transmission','gearbox','clutch']):
        id='TRANS'; cluster='Transmission and gearbox'; section='Gearbox service and fault diagnosis'; note='Match transmission repair, service and applicable clutch work to one transactional page.'
    elif any(t in q for t in ['oil change','change oil','oil filter']) or q=='mercedes oil':
        id='OIL'; cluster='Oil change'; section='Oil/filter scope and vehicle specification'; note='Keep oil-only intent here and broader Service A/B intent on the hub.'
    elif 'battery' in q:
        id='BATTERY'; cluster='Battery replacement'; section='Battery testing, replacement and location'; note='Explain model-specific battery selection and supported installation checks.'
    elif 'brake' in q and 'shooting brake' not in q:
        id='BRAKES'; cluster='Brake service and repair'; section='Pads, discs and inspection'; note='Use brake service and repair naturally on the same page.'
    elif 'steering' in q:
        id='STEER'; cluster='Steering repair'; section='Rack and steering diagnosis'; note='Strengthen contextual links to the existing steering page.'
    elif 'exhaust' in q:
        id='EXHAUST'; cluster='Exhaust repair'; section='Exhaust fault inspection'; note='Retain repair intent; performance modification belongs on tuning.'
    elif re.search(r'\bac\b',q) or 'air conditioning' in q:
        id='AC'; cluster='AC repair'; section='AC diagnosis, recharge and repair'; note='Use AC and air conditioning as natural wording on the same page.'
    elif any(t in q for t in ['body','collision']):
        id='BODY'; cluster='Body repair'; section='Body shop and paintwork scope'; note='Show original repair evidence and genuine workshop capability.'
    elif 'engine repair' in q or 'engine service' in q:
        id='ENGINE'; cluster='Engine repair'; section='Engine diagnosis and mechanical repair'; note='Make engine repair prominent on the existing mechanical URL; avoid another competing URL.'
    elif 'ppf' in q:
        id='PPF'; cluster='Paint protection'; section='Mercedes PPF examples'; note='Use the existing PPF page with verified Mercedes examples.'
    elif 'cost' in q:
        id='COST'; cluster='Service costs'; section='Quote factors and approved examples'; note='Answer costs in the guide and link service bookings to the hub.'
    elif 'schedule' in q or re.search(r'\ba[39]\b',q) or 'service ah' in q:
        id='INTERVAL'; cluster='Service schedule and ASSYST'; section='Intervals and service display codes'; note='Verify code meaning against the exact model; avoid universal code checklists.'
    elif 'reliability' in q:
        id='OWNERSHIP'; cluster='Ownership and reliability'; section='Gulf ownership considerations'; note='Retain original query text; address the underlying ownership question naturally.'
    elif 'maybach' in q:
        id='MAYBACH'; cluster='Maybach model service'; section='S-Class Maybach service'; note='Use the existing Maybach hub.'
    elif re.search(r'\bg63\b',q):
        id='G63'; cluster='G63 model service'; section='AMG G63 coverage'; note='Retain the established G63 model URL.'
    elif 'g class' in q or 'g wagon' in q:
        id='GCLASS'; cluster='G-Class model service'; section='G-Class coverage'; note='Keep broad G-Class service separate from AMG G63.'
    elif re.search(r'\bc63\b',q):
        id='C63'; cluster='C63 model service'; section='AMG C63 and coupe coverage'; note='Check exact generation and body style before adding scope.'
    elif re.search(r'\bc(?: class|200|240|300|43)\b',q):
        id='CCLASS'; cluster='C-Class model service'; section='C-Class variants'; note='Add applicable C200/C240/C300/C43/coupe detail only when confirmed; C63 stays separate.'
    elif re.search(r'\be63\b',q):
        id='E63'; cluster='E63 model service'; section='AMG E63 coverage'; note='Keep the model page and protect existing visibility.'
    elif re.search(r'\be(?: class|200|300|350|43|55)\b',q):
        id='ECLASS'; cluster='E-Class model service'; section='E-Class variants'; note='Group relevant E-Class variants here; verify older E55 and coupe/cabriolet scope. E63 stays separate.'
    elif re.search(r'\bs63\b',q):
        id='S63'; cluster='S63 model service'; section='AMG S63 and coupe coverage'; note='Preserve the S63-specific destination.'
    elif re.search(r'\bs(?: class|65)\b',q):
        id='SCLASS'; cluster='S-Class model service'; section='S-Class variants'; note='S65 is a distinct V12 application; add only a confirmed section, not S63 engine copy.'
    elif 'gle' in q or 'm class' in q or 'ml63' in q:
        id='GLE'; cluster='GLE and ML model service'; section='GLE/ML variants'; note='Verify older ML/M-Class, coupe and AMG coverage and clearly distinguish generations.'
    elif 'gls' in q or 'gl class' in q:
        id='GLS'; cluster='GLS and GL model service'; section='GLS/GL variants'; note='Verify older GL and AMG coverage; do not assume identical systems.'
    elif re.search(r'mercedes benz .+ service dubai',q) and not re.search(r'(?:car|auto) service dubai',q):
        cluster='Other Mercedes model service'; section='Models serviced'; note='Use a confirmed model-family section on the hub initially. A dedicated family page needs service evidence and sustained demand; do not publish a thin page per variant.'
    elif 'inspection' in q:
        cluster='Mercedes inspection'; section='Inspection scope'; note='Use the hub inspection section and clarify general diagnosis versus a pre-purchase inspection before promising scope.'
    elif any(t in q for t in ['service','maintenance','servicing','servise','aftersales']):
        cluster='Scheduled service and maintenance'; section='Service A/B and minor/major scope'; note='Use one service booking destination; explain scope and link oil-only work and informational schedules separately.'
    if re.search(r'[\u0600-\u06ff]',q):
        id='AR'; cluster='Arabic repair'; section='Arabic repair and service'; note='Route mixed Arabic intent to the Arabic hub with native-reviewed copy.'
    if 'near me' in q:
        note+=' Include accurate Al Quoz location and Business Profile links; proximity varies by searcher.'
    if any(t in q for t in ['authorized','certified','approved mercedes']):
        fit='Hold'; note='Official/dealer or certification intent. Digi-Tec is positioned as independent; do not optimize by implying unverified authorization. URL is a related alternative only.'
    if any(t in q for t in ['for sale','performance cars','body parts','gearbox supplier','oil filter abu dhabi','vin decoder','roadside assistance','service contract']):
        fit='Hold'; note='Product, tool or service capability is not established by this export/site review. Confirm an actual matching offering before targeting; URL is a related alternative only.'
    if 'abu dhabi' in q:
        fit='Hold'; note='Outside the verified Al Quoz location. Do not imply an Abu Dhabi branch; confirm real service-area support before targeting. URL is a related alternative only.'
    if 'bmw x4' in q:
        fit='Hold'; note='Mixed-brand, mixed-location query. Preserve it in the baseline but do not write an exact-match landing page; oil page is a related alternative.'
    if q=='mercedes doctor':
        fit='Hold'; note='Ambiguous possible named-business query with two impressions. Check the search results before targeting; hub is a related alternative.'
    if any(t in q for t in ['slr mclaren','sls amg','citan','viano','vito','v class','g65','560','benz 240','benz 190','benz 420','benz 230','benz 600','benz 320','benz 260','benz 380','benz 450','benz 300','benz 280','benz 250','benz 220']):
        if fit=='Relevant': fit='Conditional'; note+=' Confirm exact classic, rare-model or van workshop coverage before making landing-page claims.'
    return id,cluster,section,fit,note

mapped=[]
for idx,row in enumerate(source['Queries'][1:],2):
    id,cluster,section,fit,note=classify(row[0]); p=byid[id]
    mapped.append(dict(query=row[0],clicks=row[1],impressions=row[2],ctr=row[3],position=row[4],id=id,cluster=cluster,section=section,fit=fit,action=note,url=p['url'],sourceRow=idx))
assert len(mapped)==353 and len({r['query'] for r in mapped})==353
assert all('mercedes' in r['query'].lower() for r in mapped)
assert sum(x['impressions'] for x in mapped)==10597
for p in pages:
    rows=[r for r in mapped if r['id']==p['id']]
    p['queries']=len(rows); p['impressions']=sum(r['impressions'] for r in rows); p['clicks']=sum(r['clicks'] for r in rows)
    p['weightedPosition']=sum(r['impressions']*r['position'] for r in rows)/p['impressions'] if rows else None
    p['examples']='; '.join(r['query'] for r in sorted(rows,key=lambda r:-r['impressions'])[:4])

problems=[]
for path in ['/services/mercedes-repair-dubai','/services/mercedes-repair-dubai/','/best-mercedes-workshop-dubai','/services/mercedes-service-dubai','/brands/mercedes-benz-service-dubai/suspension-repair']:
    obs=live[path]
    dest='/services/mercedes-suspension-repair-dubai' if 'suspension' in path else HUB
    problems.append(dict(path=path,url=BASE+path,http=obs['status'],canonical=obs['canonical'],title=obs['title'],target=BASE+dest,action='Implement a server/CDN 301 or 308 directly to the target. Verify the Location response with JavaScript disabled, then inspect the target in Search Console. Do not rely on a client-side redirect.'))

plan=dict(pages=pages,queries=mapped,problems=problems,live=list(live.values()),source=source)
(OUT/'plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
print('Fits:',dict(Counter(r['fit'] for r in mapped)))
print('Pages by mapped impressions:')
for p in sorted(pages,key=lambda p:-p['impressions']): print(p['id'],p['queries'],p['impressions'],round(p['weightedPosition'] or 0,2))
print('Other model examples:',[r['query'] for r in mapped if r['cluster']=='Other Mercedes model service'])
