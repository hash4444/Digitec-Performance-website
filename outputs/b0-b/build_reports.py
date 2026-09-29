import json,pathlib,csv,re,collections,hashlib,datetime
from urllib.parse import urlsplit
O=pathlib.Path(__file__).parent;R=O.parents[1];BASE='https://digitecme.com'
def load(n):return json.loads((O/n).read_text(encoding='utf-8-sig'))
D=load('page-evidence.json');L=load('internal-link-evidence.json');S=load('content-similarity.json');T=load('gsc-trends.json');Q=load('query-family-demand.json');SCREEN=load('sitewide-screening.json');SCREENPATHS={urlsplit(x['url']).path for x in SCREEN}
def url(p):return BASE+p
def link(p):return f'[{p}]({url(p)})'
def ev(n):return f'[{n}]({(O/n).as_posix()})'
def table(headers,rows):
 def cell(x):return str(x if x is not None else 'Unavailable').replace('|','&#124;').replace('\n','<br>')
 return '\n| '+' | '.join(headers)+' |\n| '+' | '.join('---' for _ in headers)+' |\n'+'\n'.join('| '+' | '.join(cell(v) for v in row)+' |' for row in rows)+'\n'
def ar(p):
 a='/ar' if p=='/' else '/ar'+p
 return a if a in D or a in SCREENPATHS else None
def metric(p):
 g=D.get(p,{}).get('six_month_page')
 return f"{g['clicks']} clicks; {g['impressions']} impressions; CTR {g['ctr']:.2%}; position {g['position']}; Pages!A{g['row']}:E{g['row']}" if g else 'Not listed in six-month Pages export; not proof of zero traffic'
def links(p):
 l=L.get(url(p),{});b=l.get('by_region',{})
 return f"{l.get('unique_sources',0)} source pages; content {b.get('content',0)}, header {b.get('header',0)}, footer {b.get('footer',0)}, breadcrumb {b.get('breadcrumb',0)}, other navigation {b.get('navigation',0)}"
def similarity(a,b):
 s=next((x for x in S if (x['a'],x['b'])==(a,b) or (x['b'],x['a'])==(a,b)),None)
 return f"5-word Jaccard {s['five_word_jaccard']:.1%}; token cosine {s['token_cosine']:.2f}" if s else 'Task/scope comparison; no numerical threshold used'
def snapshot(ps):
 return table(['URL','Title / H1','Words / indexability','Six-month page totals (all queries)','Internal sources'],[[link(p),'; '.join(D[p]['title'])+' / '+'; '.join(D[p]['h1']),str(D[p]['clean_word_count'])+' / '+'; '.join(D[p]['robots']),metric(p),links(p)] for p in ps if p in D])
C=[]
def cluster(id,name,cl,action,priority,batch,paths,reason):
 C.append(dict(id=id,name=name,classification=cl,action=action,priority=priority,batch=batch,paths=paths,reason=reason));return C[-1]
OVER='INTENT OVERLAP';DIST='DISTINCT INTENT';INS='INSUFFICIENT EVIDENCE'
hub=lambda b:f'/brands/{b}-service-dubai'
best=lambda b:f'/best-{b}-workshop-dubai'
mh=hub('mercedes-benz')
A=cluster('A','Generic workshop',OVER,'CONSOLIDATE CANDIDATE','P2','B2 Generic', ['/',best('car'),'/services/car-garage-dubai','/services/garage-near-me-dubai'],'Same single-workshop booking task; the near-me page adds no separate branch or substantial visit-planning resource.')
for id,b in [('B','bmw'),('C','porsche'),('D','range-rover')]:cluster(id,b.replace('-',' ').title(),OVER,'CONSOLIDATE CANDIDATE','P2','B2 Brand ownership',[hub(b),best(b)],'The best URL currently sells this provider’s service and repair, with a one-provider criteria table rather than a separate selection resource.')
for id,b in [('E','ferrari'),('F','lamborghini')]:cluster(id,b.title(),DIST,'KEEP BOTH — DISTINCT INTENT','P2','B2 Selection',[hub(b),best(b)],'English checklist-led selection intent is distinguishable from service booking. Keep the checklist as supporting content and strengthen its actual selection utility later.')
G=cluster('G','AC information',OVER,'CONSOLIDATE CANDIDATE','P2','B2 AC',['/blog/car-ac-not-cold-dubai-causes','/blog/car-ac-repair-dubai','/services/car-ac-repair-dubai'],'Both blogs explain weak cooling, leaks, compressors and diagnosis. The service page remains a separate booking owner.')
H=cluster('H','Battery information',OVER,'CONSOLIDATE CANDIDATE','P2','B2 Battery',['/blog/car-battery-life-dubai-heat','/blog/car-battery-replacement-dubai','/services/battery-replacement-dubai'],'Both blogs answer heat-related life and replacement warning questions. Preserve the older article’s more qualified testing and scope advice before any consolidation.')
I=cluster('I','ROX and generic soft close',OVER,'DIFFERENTIATE','P2','B2 ROX',['/services/soft-close-door-repair-dubai','/brands/rox-service-dubai/soft-close-door-installation'],'Generic English title/H1 and ROX section intrude on the ROX-specific owner. Keep cross-brand versus ROX scope; do not consolidate.')
J=cluster('J','Paint treatments',DIST,'KEEP BOTH — DISTINCT INTENT','P3','B3 Paint',['/services/paint-protection-dubai','/services/paint-protection-film','/services/ceramic-coating','/services/car-polishing-dubai'],'Overview and selection, film, coating and correction are distinct treatment tasks.')
K=cluster('K','Audi workshop',OVER,'CONSOLIDATE CANDIDATE','P2','B2 Brand ownership',[hub('audi'),best('audi')],'Additional commercial duplicate-task pattern matches BMW and Porsche; not evidence of ranking harm.')
selection=[p for p in D if p.startswith('/blog/') and '-best-workshop-' in p]
LB=cluster('L','Other brand selection guides',DIST,'PRIMARY OWNER + SUPPORTING PAGE','P3','B3 Editorial',selection+[hub(b) for b in ['aston-martin','bentley','cadillac','chevrolet','ford','jaguar','land-rover','maserati','maybach','mclaren','mini','rolls-royce','volkswagen']],'Guides lead with choosing a workshop, inspection criteria, parts and quote review. Brand hubs own booking; templated guidance should gain brand-specific evidence later.')
aliases=['/best-mercedes-workshop-dubai','/services/mercedes-repair-dubai','/services/mercedes-repair-dubai/','/services/mercedes-service-dubai']
cluster('M0','Mercedes historical URL exposure',INS,'MONITOR','P1','B1 Mercedes',[mh]+aliases+['/brands/maybach-service-dubai/mechanical-repair'],'Historical multi-URL exposure is real, but old Mercedes routes now 301 to the hub. Missing dated query × page data prevents proof of current switching or harm.')
merc=[('Broad service / repair','mercedes repair dubai',mh,'mercedes service Dubai; Mercedes workshop; garage; specialist; service center; repair near me','Broad booking and navigation. Do not recreate an old service alias.'),('Oil','mercedes oil change dubai','/services/mercedes-oil-change-dubai','Mercedes oil service; MB-approved oil change','Oil approval, VIN, filter and completed-work scope; Service A/B is not automatically oil-only.'),('Mechanical / engine','mercedes engine repair dubai','/services/mercedes-mechanical-repair-dubai','Mercedes mechanical repair; engine repair; oil-leak repair','Physical repair owner; route unexplained warnings to diagnostics and symptom guides.'),('Suspension / AIRMATIC','mercedes airmatic repair dubai','/services/mercedes-suspension-repair-dubai','Mercedes suspension repair; ABC repair','Fitted-system assessment, leak/level checks and repair booking; do not describe every model as AIRMATIC.'),('Transmission','mercedes gearbox repair dubai','/services/mercedes-transmission-repair-dubai','Mercedes transmission repair; 7G; 9G','Gearbox assessment and repair scope; symptom education stays on problem guides.'),('Diagnostics / XENTRY / coding','mercedes diagnostics dubai','/services/mercedes-diagnostics-dubai','XENTRY; STAR; Mercedes coding Dubai','Supported scan, fault investigation and coding functions confirmed for the exact vehicle; not a blanket ECU repair promise.'),('AC','mercedes ac repair dubai','/services/mercedes-ac-repair-dubai','Mercedes air conditioning repair; AC service','Mercedes-specific repair booking, separate from cross-brand AC and symptom education.'),('COMAND / head-unit repair','mercedes comand repair dubai','/services/head-unit-repair-dubai','Mercedes command unit repair; head unit repair; MBUX fault assessment','Restore faulty installed equipment; this cross-brand page is the current Mercedes COMAND owner. Do not create a rival Mercedes COMAND URL.'),('Audio upgrades','mercedes audio upgrade dubai','/services/mercedes-audio-upgrade-dubai','Mercedes stereo upgrade; E-Class sound system upgrade','Change functioning equipment and listening performance; faults first go to head-unit diagnosis.'),('Body repair','mercedes body repair dubai','/services/mercedes-body-repair-dubai','Mercedes body shop; accident repair','Body damage and repair booking; retain paint protection and polishing as separate treatments.'),('Battery','mercedes battery replacement dubai','/services/mercedes-battery-replacement-dubai','Mercedes battery fitting; battery registration','Test, fit and supported registration; battery warning or repeat discharge does not prove replacement is needed.')]
cluster('M1','Mercedes hub, repair children and generic services',DIST,'KEEP BOTH — DISTINCT INTENT','P1','B1 Mercedes',[v[2] for v in merc if v[0] not in ['COMAND / head-unit repair','Audio upgrades']],'Broad Mercedes, exact repair, and generic multi-brand queries form a hierarchy; maintain the eleven specified commercial owners.')
cluster('M2','Infotainment repair versus upgrade',DIST,'KEEP BOTH — DISTINCT INTENT','P1','B1 Mercedes',['/services/head-unit-repair-dubai','/services/mercedes-audio-upgrade-dubai','/services/cadillac-cue-screen-repair-dubai'],'Fault restoration, audio improvement and Cadillac CUE assessment have different equipment and task boundaries despite high shared vocabulary.')
cluster('M3','Diagnostics versus electrical and battery',DIST,'KEEP BOTH — DISTINCT INTENT','P1','B1 Mercedes',['/services/mercedes-diagnostics-dubai','/services/mercedes-electrical-repair-dubai','/services/mercedes-battery-replacement-dubai'],'XENTRY/coding and fault investigation differ from circuit/wiring/charging repairs and battery fitting. Arabic template repetition requires later differentiation, not merger.')
modelpaths=[p for p in D if p.startswith('/mercedes/models/') or re.match(r'/blog/mercedes-(c-class|e-class|s-class|g63)-service',p)]
cluster('M4','Mercedes model ownership',DIST,'KEEP BOTH — DISTINCT INTENT','P1','B1 Mercedes',modelpaths,'Current G-Class page explicitly covers non-AMG vehicles and refers AMG G63 to the G63 page. C/E/S class blog paths currently host commercial model pages; a blog path alone does not make them informational.')
guides=['/blog/mercedes-service-intervals-dubai-heat','/blog/mercedes-service-cost-dubai-guide','/blog/best-oil-change-dubai-mercedes']
cluster('M5','Mercedes schedule, cost and oil selection',DIST,'PRIMARY OWNER + SUPPORTING PAGE','P1','B1 Mercedes',guides+['/services/mercedes-oil-change-dubai',mh],'ASSYST/due-work interpretation, cost drivers and choosing an oil service are separate questions from booking the due service.')
cluster('M6','Broad Mercedes maintenance guide',OVER,'DIFFERENTIATE','P1','B1 Mercedes',['/blog/mercedes-benz-maintenance-guide-dubai',mh,guides[0]],'Maintenance guide repeats workshop-selection and broad repair sales material. Reserve it for owner maintenance planning; intervals/ASSYST belong to the narrower guide and booking to the hub.')
problem=[p for p in D if p.startswith('/mercedes/problems')]
cluster('M7','Mercedes problem education',DIST,'PRIMARY OWNER + SUPPORTING PAGE','P1','B1 Mercedes',problem+['/blog/mercedes-repair-dubai-complete-guide'],'The complete-guide slug now has a Common Mercedes Problems title/H1. Keep symptom triage separate from commercial repairs; the index is navigation, while the article is a cross-system introduction.')
cluster('N','Porsche system, symptom and model hierarchy',DIST,'KEEP BOTH — DISTINCT INTENT','P3','B3 Porsche',[p for p in D if p.startswith('/porsche/')]+[p for p in D if p.startswith(hub('porsche')+'/')],'PDK/PASM explanation, PASM warning, 992 model scope, due intervals and specific repair booking are separate tasks.')
cluster('O','Land Rover, Defender and repair case',DIST,'KEEP BOTH — DISTINCT INTENT','P3','B3 JLR',[hub('range-rover'),hub('land-rover'),hub('defender'),'/blog/best-defender-workshop-dubai'],'Vehicle families are not synonyms; Defender best-workshop slug currently hosts an accident-repair case with a distinct evidence task.')
cluster('P','Scheduled car service versus broad workshop',DIST,'KEEP BOTH — DISTINCT INTENT','P3','B3 Generic',['/services/car-service-dubai','/','/services/mechanical-repair-dubai','/services/car-diagnostics-dubai'],'Scheduled due maintenance, finding a workshop, repairing a physical fault and diagnosing an unknown fault are distinct tasks.')
cluster('Q','Paint and workshop decision articles',DIST,'PRIMARY OWNER + SUPPORTING PAGE','P3','B3 Editorial',['/blog/ceramic-coating-vs-ppf-dubai','/blog/why-ceramic-coating-matters-uae','/blog/best-car-workshop-dubai','/blog/dealer-vs-independent-workshop-dubai'],'Treatment comparison, coating benefits, workshop selection and dealer-versus-independent decision support do not replace commercial service owners.')
for id,b in [('EA','ferrari'),('FA','lamborghini')]:cluster(id,b.title()+' Arabic selection',OVER,'DIFFERENTIATE','P2','B2 Arabic',['/ar'+hub(b),'/ar'+best(b)],'Arabic best page still leads with workshop service/repair, unlike the English selection title/H1. Keep both pending a genuine Arabic checklist brief; no automatic redirect.')
cluster('JA','Arabic paint template',OVER,'DIFFERENTIATE','P3','B3 Arabic',['/ar'+p for p in J['paths'] if '/ar'+p in D],'Published Arabic overview, film and coating pages repeat near-identical general service copy; differentiate treatment substance. No dedicated Arabic polishing counterpart was verified; do not fabricate one.')
CD={c['id']:c for c in C}
candidates={best('car'):('/', 'A','Selection criteria, workshop location and useful FAQs'),'/services/car-garage-dubai':('/', 'A','Service summary, inspection process and booking information'),'/services/garage-near-me-dubai':('/', 'A','Directions, location, what to bring and booking FAQs')}
for b,id in [('bmw','B'),('porsche','C'),('range-rover','D'),('audi','K')]:candidates[best(b)]=(hub(b),id,'Brand-specific workshop-selection criteria, parts/estimate questions and useful FAQs')
candidates['/blog/car-ac-repair-dubai']=('/blog/car-ac-not-cold-dubai-causes','G','Luxury multi-zone/electronic-control context, compressor symptoms, prevention and distinct FAQs; technical claims need workshop review')
candidates['/blog/car-battery-replacement-dubai']=('/blog/car-battery-life-dubai-heat','H','Condition-based replacement, no universal age, repeat-drain/charging checks, fitment/coding/cost scope and traction-battery exclusion')

# Ownership rows: one primary URL per explicitly delimited task. Repeated comparison groups are counted once by Cluster ID.
OWN=[]
def own(cid,brand,family,primary,secondary,intent,owner,support='',note=''):
 c=CD[cid];OWN.append(dict(cid=cid,brand=brand,family=family,primary=primary,secondary=secondary,intent=intent,owner=owner,support=support,note=note))
own('A','Cross-brand','Broad workshop','car workshop dubai','car garage Dubai; luxury car workshop; luxury car repair; car repair Dubai; workshop Al Quoz; garage near me','Transactional/local','/','/blog/best-car-workshop-dubai','Best as provider-seeking can use the homepage; explicit selection advice belongs to the blog. Near-me is proximity-dependent; do not promise citywide local rankings.')
for id,b in [('B','bmw'),('C','porsche'),('D','range-rover'),('K','audi')]:own(id,b.title(),'Broad brand workshop',b.replace('-',' ')+' service dubai','repair; garage; workshop; specialist; service center/centre; repair near me; best provider-seeking','Transactional/local',hub(b),best(b),'Best query is mixed: current source serves provider booking; consolidation is conditional on query-level validation. Preserve selection material.')
for id,b in [('E','ferrari'),('F','lamborghini')]:
 own(id,b.title(),'Broad brand workshop',b+' service dubai',b+' repair; workshop; specialist','Transactional',hub(b),best(b))
 own(id,b.title(),'Workshop selection','best '+b+' workshop dubai','how to choose '+b+' workshop; inspection and estimate criteria','Commercial investigation',best(b),hub(b),'Selection owner is a checklist, not an independently verified provider ranking.')
own('G','Cross-brand','AC troubleshooting','car AC not cooling','why car AC is not cold; car AC blowing hot air','Informational','/blog/car-ac-not-cold-dubai-causes','/services/car-ac-repair-dubai','Provisional content-led owner; only 8 page impressions and no exact query × page comparison. Target must preserve useful source coverage first.')
own('G','Cross-brand','AC service','car AC repair Dubai','car AC gas refill Dubai; leak repair; compressor service','Transactional','/services/car-ac-repair-dubai','/blog/car-ac-not-cold-dubai-causes','Gas refill is a service scope, not a diagnosis or promise that gas fixes every fault.')
own('H','Cross-brand','Battery life and replacement decision','car battery life Dubai','car battery life UAE; Dubai heat battery life; when to replace car battery','Informational','/blog/car-battery-life-dubai-heat','/services/battery-replacement-dubai','Provisional owner based on explicit task and one recorded click, not ranking proof. Preserve qualified advice from the source before any redirect.')
own('H','Cross-brand','Battery fitting','car battery replacement Dubai','battery testing; fitting; registration where required','Transactional','/services/battery-replacement-dubai','/blog/car-battery-life-dubai-heat')
own('H','Cross-brand','Repeat discharge investigation','battery keeps dying','battery drain; charging fault; repeated flat battery','Diagnostic booking','/services/auto-electrical-repair-dubai','/blog/car-battery-life-dubai-heat','Symptom phrase can be informational. Blog supplies initial explanation; repeated-draw investigation books through electrical, not automatic battery replacement.')
own('I','Cross-brand','Generic soft close','soft close door installation Dubai','soft close door repair Dubai; retrofit','Transactional',I['paths'][0],I['paths'][1],'Installation and repair share this generic equipment-assessment owner; preserve both scopes.')
own('I','ROX','ROX soft close','ROX 01 soft close door','ROX soft close installation; ROX latch or actuator fault','Transactional',I['paths'][1],I['paths'][0])
for p,q,f in zip(J['paths'],['paint protection Dubai','PPF Dubai','ceramic coating Dubai','car polishing Dubai'],['Overview and treatment selection','Protective film','Coating','Paint correction / polishing']):own('J','Cross-brand',f,q,'Compare scope and suitability for the actual paint condition','Commercial investigation / transactional' if p==J['paths'][0] else 'Transactional',p,'/blog/ceramic-coating-vs-ppf-dubai')
for v in merc:own('M0' if v[0]=='Broad service / repair' else 'M2' if v[0] in ['COMAND / head-unit repair','Audio upgrades'] else 'M1','Mercedes-Benz',v[0],v[1],v[3],'Transactional',v[2],mh if v[2]!=mh else '/mercedes/problems',v[4])
own('M3','Mercedes-Benz','Electrical fault repair','mercedes electrical repair dubai','wiring; circuits; charging; repeat discharge; ECU electrical faults','Transactional','/services/mercedes-electrical-repair-dubai','/services/mercedes-diagnostics-dubai','Diagnostics owns supported XENTRY/coding; electrical owns the tested circuit or hardware fault. Avoid broad ECU promises.')
for p,q in zip(guides,['Mercedes service intervals Dubai','Mercedes service cost Dubai','best Mercedes oil change Dubai']):own('M5','Mercedes-Benz','Due maintenance / scope advice',q,'ASSYST; Service A/B; itemised quote' if p!=guides[2] else 'oil specification; workshop selection','Informational / commercial investigation',p,mh)
own('M6','Mercedes-Benz','Broad maintenance planning','Mercedes maintenance guide Dubai','maintenance checklist; condition and history; ownership planning','Informational','/blog/mercedes-benz-maintenance-guide-dubai',guides[0]+'; '+mh,'Differentiate this broad planning guide; do not let it become a second broad booking hub or duplicate ASSYST explanations.')
for p in modelpaths:own('M4','Mercedes-Benz','Model service',D[p]['h1'][0], 'Exact model, generation and fitted equipment','Transactional model scope',p,mh,'Current task assessed from copy, not folder name. G-Class is non-AMG; G63 keeps AMG-specific scope.')
for p in problem:own('M7','Mercedes-Benz','Symptom education' if p!='/mercedes/problems' else 'Problem guide directory',D[p]['h1'][0], 'Meaning, evidence, urgency and next inspection','Informational / navigation',p,mh,'Commercial repair wording should link to the specific repair owner; retain distinct symptoms.')
for p in [p for p in D if p.startswith('/porsche/')]:own('N','Porsche','System / model / symptom',D[p]['h1'][0],'Specific Porsche system or vehicle task','Informational' if '/911/' not in p else 'Model scope',p,hub('porsche'),'PDK explainer differs from transmission booking; PASM explainer differs from fault triage and suspension repair.')
for p in [p for p in D if p.startswith(hub('porsche')+'/')]:own('N','Porsche','Specific repair',D[p]['h1'][0],'Porsche-specific equipment and repair scope','Transactional',p,hub('porsche'))
for p in selection:
 b=p.split('/blog/')[1].split('-best-workshop')[0];own('L',b.title(),'Workshop selection','best '+b.replace('-',' ')+' workshop Dubai','inspection, estimate and parts-selection questions','Commercial investigation',p,hub(b),'Keep as supporting selection resource; broad service/repair owner is the linked brand hub.')
for p in CD['Q']['paths']:own('Q','Cross-brand','Decision support',D[p]['h1'][0],'Comparison or benefit explanation','Commercial investigation / informational',p,'/services/paint-protection-dubai' if 'ceramic' in p else '/')
own('P','Cross-brand','Scheduled maintenance','car service Dubai','car servicing Dubai; scheduled car maintenance','Transactional','/services/car-service-dubai','/','Routine due work, distinct from generic workshop discovery.')
for b in ['land-rover','defender']:own('O',b.title(),'Vehicle-family workshop',b.replace('-',' ')+' service Dubai','repair; workshop; specialist','Transactional',hub(b),'/blog/best-defender-workshop-dubai' if b=='defender' else '/blog/land-rover-best-workshop-dubai')
own('O','Defender','Repair case evidence','Defender accident repair case Dubai','repair process; workshop case','Case study','/blog/best-defender-workshop-dubai',hub('defender'),'Do not turn the best-workshop slug into proof that the content duplicates a hub.')
for cid,b in [('EA','ferrari'),('FA','lamborghini')]:
 own(cid,b.title(),'Arabic service booking',b+' صيانة دبي','إصلاح; ورشة','Transactional','/ar'+hub(b),'/ar'+best(b))
 own(cid,b.title(),'Arabic workshop selection','اختيار ورشة '+b+' في دبي','معايير الفحص وعرض السعر','Commercial investigation — needs differentiation','/ar'+best(b),'/ar'+hub(b),'Proposed selection role needs Arabic-specific work; current title/H1 still target service/repair.')
for p in CD['JA']['paths']:own('JA','Cross-brand','Arabic treatment',D[p]['h1'][0],'Treatment-specific scope in Arabic','Commercial investigation / transactional',p,'/ar/blog/ceramic-coating-vs-ppf-dubai','Retain distinct owners while replacing generic shared treatment descriptions in a later approved batch.')

# Registry covers the full 1,247-page screen, plus redirect aliases. Deep-review rows contain fuller evidence.
allpaths={urlsplit(x['url']).path:x for x in SCREEN};allpaths.update({p:x for p,x in D.items()})
ownership={x['owner']:x for x in OWN};membership=collections.defaultdict(list)
for c in C:
 for p in c['paths']:membership[p].append(c['id'])
registry=[]
for p,x in sorted(allpaths.items()):
 en=p[3:] or '/' if p=='/ar' or p.startswith('/ar/') else p
 isar=p=='/ar' or p.startswith('/ar/');deep=p in D;ow=ownership.get(p);ids=membership.get(p) or membership.get(en) or []
 cid=ids[0] if ids else None;c=CD.get(cid);title=(x.get('h1') or x.get('titles') or x.get('title') or [p])[0]
 owner=p;decision='KEEP + OPTIMIZE LATER' if deep else 'MONITOR';cl=c['classification'] if c else (DIST if deep else INS);relationship='Primary owner for the page-specific task' if deep else 'Screened only; provisional self-owner pending focused query × page review'
 note=f"Scope: {'deep live/content review' if deep else 'sitewide metadata/indexability/link screen only'}. "
 if deep:note+=metric(p)+'. Canonical '+', '.join(x['canonical'])+'; robots '+', '.join(x['robots'])+'. '
 else:note+='No pairwise content or query × page conclusion; do not infer confirmed distinctness or permission to consolidate. '
 if c:note+=c['reason']+' '
 if ow:note+=ow['note']+' ';family=ow['family'];primary=ow['primary'];brand=ow['brand']
 else:
  family='Specific published page task';primary=title;brand='Mercedes-Benz' if 'mercedes' in p else (p.split('/brands/')[1].split('-service-dubai')[0].title() if '/brands/' in p else 'Cross-brand / page-specific')
 redirect='No';validate='No redirect proposed; validate before future implementation';batch=c['batch'] if c else 'Future focused audit'
 if p in candidates:
  target,cid,preserve=candidates[p];owner=target;decision='CONSOLIDATION CANDIDATE';cl=OVER;relationship='Potential source → preferred owner';redirect='Yes — proposal only';validate='REQUIRES PRE-REDIRECT VALIDATION';batch=CD[cid]['batch'];note+=f'Source {url(p)}; target {url(target)}. Confidence: medium in task overlap, low in ranking benefit. Evidence: live task/scope, page aggregates and link architecture; no exact query × page proof. Preserve: {preserve}. Risk: unknown backlinks/leads and historical query losses; content transfer and Arabic decision required before redirect. '
 elif p in aliases:
  owner=mh;decision='MONITOR';cl=INS;relationship='Existing 301 alias → Mercedes hub';note+='301 observed live, not created in B0-B. Historical exposure does not establish current competition. ';batch='B1 Mercedes'
 elif isar and en in candidates:
  decision='DIFFERENTIATE';cl=OVER;relationship='Arabic owner unresolved within this local pair';owner=ar(candidates[en][0]) or p;note+='English consolidation is NOT approved for Arabic. Candidate target here is a task preference only, not a redirect proposal; require locale-specific query and conversion review. ';validate='Arabic content/query review; no redirect proposed';batch='B2 Arabic'
 elif cid in ['I','M6','EA','FA','JA']:
  decision='DIFFERENTIATE';cl=OVER
 elif p.startswith('/blog/') and p not in modelpaths or isar and en.startswith('/blog/') and en not in modelpaths:
  decision='SUPPORTING CONTENT';relationship='Primary for its informational task; supports commercial owner'
 elif '/problems/' in p or '/systems/' in p or '/guides/' in p:
  decision='SUPPORTING CONTENT';relationship='Primary for system/symptom education; supports repair owner'
 if isar and en in ['/services/mercedes-diagnostics-dubai','/services/mercedes-electrical-repair-dubai']:
  decision='DIFFERENTIATE';note+='Distinct opening symptoms but highly repetitive process/parts template; Arabic diagnostics does not fully mirror English XENTRY/coding detail. Keep task owners separate. '
 if deep and any('noindex' in z for z in x['robots']):note+='Live noindex retained. This is a content/navigation owner, not an approved indexable SEO target; no noindex change authorised. '
 counterpart=(p if isar else ar(p)) or 'No verified Arabic page in this review; do not fabricate a route'
 registry.append(dict(url=url(p),brand=brand,intent_family=family,primary_intent=primary,preferred_owner=url(owner),relationship=relationship,classification=cl,recommended_action=decision,redirect_candidate=redirect,validation_required=validate,arabic_counterpart=url(counterpart) if counterpart.startswith('/') else counterpart,future_batch=batch,notes=note.strip()))
fields=['url','brand','intent_family','primary_intent','preferred_owner','relationship','classification','recommended_action','redirect_candidate','validation_required','arabic_counterpart','future_batch','notes']
with (R/'b0-b-url-decision-register.csv').open('w',encoding='utf-8-sig',newline='') as f:w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(registry)
(O/'clusters.json').write_text(json.dumps(C,ensure_ascii=False,indent=2),encoding='utf8');(O/'ownership-rows.json').write_text(json.dumps(OWN,ensure_ascii=False,indent=2),encoding='utf8')
counts=collections.Counter(c['classification'] for c in C)
stats={'clusters':len(C),'confirmed':counts['CONFIRMED CANNIBALIZATION'],'probable':counts['PROBABLE CANNIBALIZATION'],'intent_overlap':counts[OVER],'distinct_intent':counts[DIST],'insufficient_evidence':counts[INS],'consolidation_candidate_urls':len(candidates),'candidate_clusters':len({x[1] for x in candidates.values()}),'deep_urls':len(D),'screened_canonical_pages':len(SCREEN),'register_urls':len(registry),'ownership_rows':len(OWN)}
(O/'report-counts.json').write_text(json.dumps(stats,indent=2),encoding='utf8')

# Full comparison fields, separate from the readable executive report.
details=['# B0-B page-comparison evidence','Observed 28 September 2026. Generated from saved response HTML; no website changes. All-query GSC page metrics refer to 12 April–25 September 2026. A missing row is unknown, not zero. Clean copy excludes semantic header/footer/nav/aside and scripts but retains in-body related links and CTAs; similarity is supporting evidence only. Full main text and all captured fields are in '+ev('page-evidence.json')+'.']
for p,x in D.items():
 details+=['\n## '+p, table(['Dimension','Observed'],[['Live URL / final',url(p)+' → '+x['final_url']],['HTTP chain',json.dumps(x['chain']) or '[]'],['Title', '; '.join(x['title'])],['Description','; '.join(x['description'])],['H1','; '.join(x['h1'])],['H2/H3','; '.join(x['h2']+x['h3'])],['Canonical / robots','; '.join(x['canonical']+x['robots'])],['Language / hreflang',str(x['language'])+'; '+json.dumps(x['hreflang'],ensure_ascii=False)],['Words / sitemap',str(x['clean_word_count'])+' / '+str(x['crawl_sitemap'])],['Schema','; '.join(x['schema_types'])],['FAQ schema',json.dumps(x['faqs'],ensure_ascii=False)],['CTA examples','; '.join(dict.fromkeys(a['anchor']+' → '+a['target'] for a in x['ctas']))[:2000]],['Main-copy opening / scope / audience',x['clean_text'][:1800]],['Internal link evidence',links(p)],['GSC all-query page row',metric(p)],['Capture',x['fetched_utc']+'; '+x['html_file']]])]
(O/'page-comparison-evidence.md').write_text('\n'.join(details),encoding='utf8')

sections=[]
def sec(n,title,text):sections.append(f'## {n}. {title}\n\n{text}\n')
sec(1,'Executive Summary',f'''**Analysis only — no implementation.** The preferred architecture is one owner per user task, with broad hubs, specific repair pages and useful informational support kept separate.

{stats['clusters']} comparison clusters: **{stats['confirmed']} confirmed cannibalization, {stats['probable']} probable cannibalization, {stats['intent_overlap']} intent overlap, {stats['distinct_intent']} distinct intent and {stats['insufficient_evidence']} insufficient evidence**. Counts use unique Cluster IDs below, including three explicitly separate Arabic comparisons; ownership rows and individual URLs are not counted as clusters. **{len(candidates)} English URL consolidation candidates across {stats['candidate_clusters']} clusters** are conditional proposals, not redirects approved for execution. There are no Arabic redirect proposals.

Keep all eleven specified Mercedes commercial owners. Monitor the existing Mercedes broad aliases, which already return 301s to the hub. Preserve Ferrari/Lamborghini English selection pages, all four paint-treatment roles, generic versus brand repair scope, and repair versus audio upgrade. Differentiate the generic ROX-heavy page and broad Mercedes maintenance guide. Arabic copy needs its own brief.

The register contains {len(registry)} unique URLs: {len(SCREEN)} self-canonical pages screened across the saved site crawl plus four live redirect aliases. {len(D)} URLs received fresh detailed live review; screened-only rows explicitly remain MONITOR / INSUFFICIENT EVIDENCE. No page reduction target is assumed.''')
sec(2,'Evidence Available',f'''Evidence hierarchy was applied without converting separate query and page totals into query × page relationships.

* **Exact-query filtered GSC exports**: `2026-09-18 (1)` for “mercedes repair dubai”, and `2026-09-19` for “mercedes service dubai”. Their Pages sheets are valid page breakdowns for those exact query filters. A third export, `2026-09-19 (1)`, contains two matching queries and provides family-level page data only.
* **Original six-month export** `digitecme.com-Performance-on-Search-2026-09-27.xlsx`: Filters = Last 6 months; Chart dates **2026-04-12–2026-09-25**, 167 daily rows, 1,000 reported queries and 995 page rows. Site chart: 681 clicks / 136,283 impressions. This is the source for page metrics throughout.
* **Keyword workbook** `DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx`: 6,789 Master Keywords records include measured and generated research rows; the prior reconciled extraction contains 913 unique measured queries, 76,690 impressions and 96 clicks. Generated keyword rows are hypotheses, not measured demand. Do not add this subset to the original export.
* **Site content**: 1,247 self-canonical pages screened from the same-day audit; {len(D)} fresh URLs fetched successfully, including EN/AR content and four existing 301 aliases. Saved HTML, metadata, main text, FAQs, schema, canonicals and robots are retained.
* **Internal links**: incoming sources classified as header, footer, navigation, breadcrumbs and content; source type separates brand hubs, services, model pages and blogs. Self-links excluded. A language switcher can still contribute a header source; this is not a commercial anchor vote.
* **SERP observations**: small uncontrolled web-search samples show mixed provider and selection formats; they are qualitative corroboration only, not a Dubai-local rank audit.

Reproducible evidence: {ev('workbook-inventory.json')}, {ev('gsc-latest-tables.json')}, {ev('page-evidence.json')}, {ev('page-comparison-evidence.md')}, {ev('internal-link-evidence.json')}, {ev('sitewide-screening.json')}, {ev('content-similarity.json')}. Original workbook paths, hashes, sheet sizes, filters and chart boundaries appear in the inventory. The three unfiltered September 8 variants have the same tabular export content and are not summed. Other overlapping time windows are not additive.''')
sec(3,'Evidence Missing','''**INSUFFICIENT GSC PAGE-LEVEL EVIDENCE** for the main non-Mercedes overlap groups and almost all specific Mercedes intents. Available exact-query filters cover only two Mercedes broad queries; they do not supply daily page breakdowns.

Missing: query × page × date for each family; page-specific country/device splits; recent Google-selected canonicals and URL Inspection history; redirect implementation dates; complete non-anonymized query coverage; backlinks and referring domains; page-level qualified leads, calls and WhatsApp conversions; business value by service; controlled Dubai-local SERP observations. None is inferred from another aggregate. A URL absent from a top-row export is not proven to have zero impressions, zero links or no leads.''')
sec(4,'Methodology',f'''1. Captured git status, branch and HEAD and hashed 4,361 protected files before analysis. B0-A implementation hashes also matched the prior B0-A manifest. Preservation verification is recorded below.
2. Screened all 1,247 self-canonical crawl records; selected every named group, all generic service pages, Mercedes services/models/problems, selection-page patterns and representative Porsche/JLR hierarchies for deeper review. Screen-only pages retain provisional self-ownership pending a focused audit.
3. Compared title, description, H1, H2/H3, actual copy, service scope, CTA, FAQ, internal links, schema, canonical, robots, clean word count, uniqueness, audience, brand/location and selection language. {ev('page-comparison-evidence.md')} exposes the fields for every deeply reviewed URL; full copy remains in JSON and raw HTML.
4. Normalized case/whitespace, repairs → repair, servicing → service, service centre → center, gearbox → transmission, tyre/tire, touchscreen → screen, nearby → near me and “in Dubai” → Dubai. Garage/workshop and specialist are grouped for broad provider discovery only; their raw query is retained. Brand, model, symptom, upgrade, cost and best/selection modifiers remain meaningful. Screen/head-unit equivalence requires equipment context. {ev('normalized-queries.json')} preserves raw and normalized forms.
5. Used lexical cosine and 5-word-shingle Jaccard as supporting comparisons only. Semantic task duplication can have very low literal similarity; repeated CTA/related-link text can inflate scores. No score is a cannibalization threshold.
6. Chose owners from task fit, current coverage, hierarchy, observed internal links and limited GSC evidence. Confirmed would require observed same-intent competition with evidence of switching/suppression or harmful fragmentation after accounting for redirects, geography and device. Probable requires stronger page/query competition evidence than shared vocabulary. Neither threshold is met here.

Google describes [query/page/date dimensions and aggregation limits](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) and [export coverage limitations](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data). Separate aggregate tabs cannot establish which query produced a page impression. Decisions below describe proposed future work only.''')
generictext='''**Preferred broad owner: homepage.** It covers the actual Al Quoz workshop, service discovery, contact and visit task. “Garage near me” is a local provider/directions query; the current near-me page has a short location section and booking FAQs, not a distinct branch, access guide or location service. The car-garage page likewise offers no separate service product. The root best-car page is a provider landing page with a Digi-Tec-only comparison table.

Retain `/blog/best-car-workshop-dubai` for explicit workshop-selection advice and `/blog/dealer-vs-independent-workshop-dubai` for the dealer choice. A mixed “best” query does not force a merger; the consolidation proposal is based on these actual root-page tasks. Preserve useful selection criteria and all visit-planning details before considering the three same-task sources for a direct redirect. Do not redirect an authentic comparison article to the homepage.
'''
sec(5,'Generic Workshop Ownership',generictext+snapshot(A['paths']))
for n,id,b in [(6,'B','bmw'),(7,'C','porsche'),(8,'D','range-rover')]:
 extra=' Keep PDK explanation, Porsche transmission booking, PASM/system and fault guides, suspension, diagnostics and model pages separate.' if b=='porsche' else ' Range Rover, Land Rover and Defender are distinct vehicle audiences; no cross-family consolidation.' if b=='range-rover' else ' The X5 model page remains the X5-specific service owner; do not redirect it to the broad BMW hub.'
 sec(n,CD[id]['name']+' Ownership',f'''**Preferred broad owner: {link(hub(b))}.** Own service, repair, workshop, garage, specialist, service center/centre and local provider-seeking variants here. The current best page title/H1 explicitly says service and repair, with a short provider introduction, contact CTA and single-provider criteria table. Its limited comparison language does not currently constitute a separate substantial task.

**INTENT OVERLAP; CONSOLIDATE CANDIDATE.** The hub has broader relevant coverage and stronger contextual linking. Page totals are not proof that the URLs rank for the same queries. Preserve useful selection FAQs and criteria; validate selection-query traffic, backlinks and leads before redirecting.{extra}
'''+snapshot(CD[id]['paths'])+'\nSimilarity: '+similarity(*CD[id]['paths'])+'.')
for n,id,b in [(9,'E','ferrari'),(10,'F','lamborghini')]:
 sec(n,b.title()+' Ownership',f'''**Keep both English pages.** {link(hub(b))} owns service/repair booking. {link(best(b))} owns choosing a workshop and “best” queries where the task is evaluating capability, diagnostic access, parts and estimates. The English title explicitly says “Choosing” and H1 “How to Choose”; its introduction asks owners to verify exact model/system support.

The checklist is short and still contains a Digi-Tec-only table and sales CTA. Future differentiation should add useful selection criteria and evidence, not unsupported competitor rankings. Do not make it a second service catalogue. SERPs are mixed and do not prove this site’s pages compete. The **Arabic pair is a separate INTENT OVERLAP / DIFFERENTIATE decision** because its title/H1 still say service and repair.
'''+snapshot(CD[id]['paths']))
sec(11,'AC Content Ownership','''**Informational owner, provisional:** `/blog/car-ac-not-cold-dubai-causes` for not cooling/not cold/blowing hot air. **Commercial owner:** `/services/car-ac-repair-dubai` for repair and gas-refill enquiries.

Both blogs explain leaks, weak cooling, compressors, airflow and why a refill alone may fail. The longer older article adds luxury climate-control context and prevention, but not a clearly separate primary question. Candidate: older `/blog/car-ac-repair-dubai` → causes guide, only after preserving its useful material. The causes guide’s exact task fit supports this provisional choice; 8 all-query impressions do not establish superiority. The older article is absent from the latest Pages export but has more internal sources, so its traffic/backlinks must be checked rather than assumed absent. Reverse or abandon this proposed consolidation if full query/conversion evidence favours it. Do not consolidate the commercial page into a blog or vice versa.
'''+snapshot(G['paths'])+'\nSimilarity between blogs: '+similarity(*G['paths'][:2])+'.')
sec(12,'Battery Content Ownership','''**Informational owner, provisional:** `/blog/car-battery-life-dubai-heat` for life in UAE/Dubai, heat and when to consider replacement. **Commercial owner:** `/services/battery-replacement-dubai`. For repeated discharge, initial education can live in the life guide; fault-tracing booking belongs to `/services/auto-electrical-repair-dubai` when charging or unwanted draw needs investigation.

The two articles both lead with heat, battery life, warning signs and replacement. Candidate: replacement blog → life guide. This is a content-task preference, not a finding that the life guide “wins” rankings: the replacement article has 318 impressions versus 73 for the life guide, while the life guide has one click versus zero. The source was updated on September 17 with better qualification: no universal replacement age, testing before replacement, charging/drain checks, fitment/coding and a traction-battery exclusion. **Those improvements must be preserved and the target’s blanket lifespan language reviewed before any consolidation.** There is no permission to change either now. If full query data shows separable lifespan versus replacement-decision tasks, differentiate instead.
'''+snapshot(H['paths'])+'\nSimilarity between blogs: '+similarity(*H['paths'][:2])+'.')
sec(13,'ROX Soft-Close Ownership','''**Keep two owners; differentiate the English generic page.** `/services/soft-close-door-repair-dubai` owns cross-brand installation/retrofit and repair. `/brands/rox-service-dubai/soft-close-door-installation` owns ROX 01 installation and ROX-specific latch/wiring/alignment enquiries.

Actual conflict: generic title “Soft Close Door Installation Dubai | ROX 01 Retrofit” and H1 “Soft Close Door Installation & ROX 01 Retrofit in Dubai” give ROX primary prominence. It also has a ROX section/FAQ while linking to the specific page. Later reduce ROX-specific duplication on the generic owner to a concise example and descriptive link; retain ROX compatibility and fitment detail on the ROX owner. Do not merge the pages.

Arabic differs: generic heading is cross-brand and the ROX child is explicitly ROX. **The ROX Arabic child exists and is live noindex, follow.** It is a content/navigation counterpart, not presently an indexable search owner. Preserve that status and B0-A routing; do not infer an absent page or approve indexing changes.
'''+snapshot(I['paths']))
sec(14,'Paint Protection Ownership','''**Keep all four English roles:** paint-protection overview helps choose a route; PPF installs film; ceramic coating provides the coating treatment; polishing performs correction. Vocabulary overlap is expected and is not a merger rationale. The overview should link to specific treatments with scope-specific anchors; the PPF-versus-ceramic article answers a narrower comparison question.

Arabic requires a different content assessment: the overview and PPF page have approximately 77.6% 5-word-shingle overlap, largely generic service-process prose, whereas the English pair is approximately 0.2%. Keep the treatment owners and differentiate Arabic scope in a future batch. Repeated template copy is not proof of ranking cannibalization.
'''+snapshot(J['paths']))
sec(15,'Additional Overlaps Discovered','''The sitewide screen looked beyond the ten supplied groups. The detailed review found:

* **Audi root best page versus Audi hub (K):** same short provider-service pattern as BMW; one additional consolidation candidate.
* **Mercedes broad maintenance guide (M6):** long workshop-selection/service prose overlaps the hub and touches ASSYST. Differentiate toward maintenance planning; preserve the narrower intervals and cost guides.
* **Other brand selection articles (L):** Aston Martin, Bentley, Cadillac, Chevrolet, Ford, Jaguar, Land Rover, Maserati, Maybach, McLaren, MINI, Rolls-Royce and Volkswagen lead with choosing a workshop and approving an inspection/estimate. Keep supporting selection roles. Their shared editorial template is a quality/differentiation issue, not evidence that different brands cannibalize each other.
* **Defender case study (O):** `/blog/best-defender-workshop-dubai` currently describes a real accident-repair case. Keep its evidence task distinct from booking; the slug is not enough to classify intent.
* **Mercedes models (M4):** C/E/S-Class and G63 pages under `/blog/` are commercial model pages. The G-Class page explicitly excludes AMG scope and directs G63 separately. Keep each vehicle owner.
* **Diagnostics/electrical/battery (M3), infotainment repair/audio upgrade/Cadillac CUE (M2):** distinct equipment and work scopes. Avoid letting shared symptom paragraphs erase those boundaries.
* **Porsche PDK/PASM/system/problem/model pages (N), generic scheduled service (P), decision-support articles (Q):** legitimate hierarchy. No bulk consolidation.

Screened-only pages outside these comparisons remain MONITOR with INSUFFICIENT EVIDENCE. The register does not claim a completed pairwise content audit of all 1,247 pages.'''+snapshot(K['paths']))
sec(16,'Mercedes Ownership Review','''All eleven requested owners should remain separate. Scope is determined by the current content rather than folder or keyword occurrence. None needs to be renamed, recreated or merged for B1 ownership clarity.
'''+table(['Mercedes intent','Current primary owner','Boundary / B1 recommendation'],[[v[0],link(v[2]),v[4]] for v in merc])+'''
Additional boundaries: electrical repair owns confirmed wiring/circuit/charging faults; diagnostics owns supported XENTRY investigation and coding. The broad maintenance guide needs differentiation. Cost, intervals, oil-selection, symptom and model pages retain their own tasks. Historical Maybach mechanical exposure for the exact repair query is only three impressions; keep Maybach mechanical separate and monitor rather than cross-brand redirecting it.''')

linkrows=[]
for c in C:
 ps=[p for p in c['paths'] if p in D]
 strongest=max(ps,key=lambda p:L.get(url(p),{}).get('unique_sources',0)) if ps else None
 owners=list(dict.fromkeys(o['owner'] for o in OWN if o['cid']==c['id']))
 mixed='Yes: competing provider-service wording' if c['id'] in ['A','B','C','D','K'] else 'Yes: generic anchor includes ROX 01 retrofit' if c['id']=='I' else 'Broad guide can blur service versus planning' if c['id']=='M6' else 'Different task anchors; keep boundaries explicit'
 linkrows.append([c['id'],link(strongest) if strongest else 'Unavailable',links(strongest) if strongest else '', '; '.join(link(p) for p in ps if p!=strongest) or 'No separate rival',mixed,'; '.join(link(p) for p in owners) or 'Each specific task owner'])
sec(17,'Internal Linking Ownership Findings','''The hub is generally the strongest broad brand owner. Root best pages get many of their links from a reciprocal workshop-page set; this is weaker task-specific evidence than a hub’s links from its service and model children. For BMW, actual anchors to the best page include “BMW Service & Repair Workshop in Dubai” and “BMW workshop selection page”, which send mixed task signals. The generic soft-close anchor explicitly includes ROX 01 retrofit; it should later become generic, with ROX-specific anchors reserved for the child.

Header/footer, navigation, breadcrumbs and body links were separated. Mercedes broad hub exposure is heavily reinforced by the sitewide “Mercedes Repair” footer. Generic service directory cards describe exact services; brand hubs and model pages link to specific Mercedes repairs; service pages link back to brand hubs. These are hierarchy signals, not automatic competition. COMAND repair and audio-upgrade anchors already distinguish faults from upgrades.

Counts below are unique source pages from the 1,247-page self-canonical crawl; self-links and fragment-only self-navigation are excluded. Regional counts can overlap and are not additive. “Strongest” means total unique sources, not a PageRank estimate; body counts expose the boilerplate contribution. No links were changed.
'''+table(['Cluster','Strongest existing internal owner','Source counts by region','Other reviewed URLs','Mixed-signal finding','Future task owner(s)'],linkrows)+'\nDetailed anchors, blog/model/service/brand-source splits and examples: '+ev('internal-link-evidence.json')+'.')

def sheet(stem,name):
 raw=load('xlsx-digitecme.com-Performance-on-Search-'+stem+'.json')[name]
 return [(r['row'],list(r['cells'].values())) for r in raw[1:]]
gscrows=[]
for stem,q,period in [('2026-09-18 (1)','EXACT: mercedes repair dubai','2026-08-19–2026-09-15'),('2026-09-19','EXACT: mercedes service dubai','2026-06-17–2026-09-16'),('2026-09-19 (1)','CONTAINS family: mercedes repair dubai (two queries)','2026-06-17–2026-09-16')]:
 for row,v in sheet(stem,'Pages'):gscrows.append([q,v[0],v[1],v[2],f'{v[3]:.2%}',v[4],period,f'{stem}: Pages!A{row}:E{row}'])
trendrows=[]
for stem,label in [('2026-09-27','Whole site, unfiltered'),('2026-09-19','Exact mercedes service dubai'),('2026-09-19 (1)','Contains mercedes repair dubai family')]:
 for period in ['last28','previous28']:
  z=T[stem][period];trendrows.append([label,period,z['start']+'–'+z['end'],z['clicks'],z['impressions'],f"{z['ctr']:.2%}",f"{z['approx_impression_weighted_position']:.2f}"])
slice_rows=[]
for stem,label in [('2026-09-18 (1)','Exact repair, 28-day'),('2026-09-19','Exact service, 3-month'),('2026-09-19 (1)','Contains repair family, 3-month')]:
 for tab in ['Devices','Countries']:
  for row,v in sheet(stem,tab):
   if tab=='Countries' and v[0] not in ['United Arab Emirates','India']:continue
   slice_rows.append([label,tab,v[0],v[1],v[2],v[4]])
sec(18,'GSC Query × Page Findings','''**There is limited real query × page evidence.** Exact query filters make two Pages exports meaningful for their single query. The contains-filter export includes both “mercedes repair dubai” and “mercedes repair dubai near me”; its page metrics cannot be assigned individually to either query.

The exact repair query reports 4 clicks / 418 impressions over August 19–September 15. The hub receives 415 listed page impressions; Maybach mechanical receives 3. The exact service query reports 1 click / 592 query impressions over June 17–September 16, while its Pages sheet totals 601 impressions. Query/property versus page aggregation can differ; neither total should be forced to match the other.
'''+table(['Query / filter','Page','Clicks','Impressions','CTR','Position','Date range','Source range'],gscrows)+'''
**What this proves:** historical exposure of several pages for the exact service query, and near-exclusive hub exposure for the recent exact repair query. **What it does not prove:** simultaneous appearance, alternating owners on specific dates, one URL suppressing another, or current harmful competition. All four checked broad Mercedes aliases now 301 to the hub. Redirect dates are unknown, so the three-month averages straddle an unknown routing transition.

The contains-repair family has 1,023 impressions / 7 clicks for the exact query plus 15 / 2 for the near-me query. These query totals are not allocated to particular pages. The 3 Maybach impressions at position 17 are too small to justify destroying its distinct brand-specific mechanical page.

### Recent versus previous 28 days
'''+table(['Population','Window','Dates','Clicks','Impressions','CTR','Approx. position'],trendrows)+'''
Daily rounded positions were impression-weighted, so the resulting averages are approximate. Whole-site impressions rose from 30,095 to 36,562 and clicks from 150 to 180; exact-service position improved from about 16.72 to 10.20; the repair-family position improved from about 8.82 to 2.98. These are query/site trends, not dated page-owner trends and not causal proof that a redirect or other change caused improvement. The exact-repair 28-day export has no matched prior 28-day exact-query export. Never substitute the contains-family series for that missing exact-query comparison.

Six-month site context: April 12–September 25, 681 clicks / 136,283 impressions / 0.50% CTR, approximate position 23.45. Historical old-route page totals are preserved in the register rather than treated as live content.

### Country/device context, not owner splits
'''+table(['Filtered population','Dimension','Value','Clicks','Impressions','Position'],slice_rows)+'''
The geography/device tabs cannot identify which page owns a query within that slice. No device-specific or country-specific owner is asserted. Obtain a joined query/page/date dataset, then separate UAE versus other countries and mobile versus desktop before inferring competition.

### Measured demand used for priority
'''+table(['Family regex screen','Reported queries','Clicks','Impressions'],[[k,v['query_count'],v['clicks'],v['impressions']] for k,v in Q.items()])+'''
These are indicative, overlapping regex families within the 1,000-row September 27 query export. They are not exhaustive clusters and must not be summed or read as page-level traffic. The workbook’s 913 reconciled measured terms and its row references are retained separately; generated taxonomy/brand-research terms do not gain measured volumes.

### SERP observations

A small September 28 web-search sample surfaced a [BMW workshop-comparison format](https://bestbmwrepairdubai.ae/), a [Ferrari comparison article](https://cargarageexpert.com/best-ferrari-repair-in-dubai/), [official Ferrari aftersales](https://www.altayermotors.com/ferrari/aftersales/) and [Lamborghini service-provider content](https://carzillauae.com/lamborghini-repair-dubai/). This supports mixed interpretation of “best”, not those sources’ rankings or claims. Search location/device were uncontrolled, so no competitor rank or Digi-Tec cannibalization conclusion is drawn.''')
sec(19,'Confirmed Cannibalization','''**Count: 0.** Historical multiple-page exposure is documented, but no available dataset establishes current same-intent competition with harmful switching or suppression. Similar titles, low CTR, template similarity and two independently populated GSC tabs are insufficient. No ranking-benefit estimate is manufactured.''')
sec(20,'Probable Cannibalization','''**Count: 0.** Main non-Mercedes groups lack joined query × page evidence. Mercedes legacy exposure is explained at least partly by existing redirects and unknown change timing. The correct next action is monitor/obtain dated evidence, not elevate an architectural overlap to probable ranking harm.''')
sec(21,'Intent Overlap Without Proven Cannibalization',table(['Cluster','Scope','Why overlap','Action'],[[c['id'],c['name'],c['reason'],c['action']] for c in C if c['classification']==OVER])+'''
Arabic A/B/C/D/G/H/K reviewed pages can also overlap locally, but remain within the corresponding comparison cluster rather than inflating the cluster count. English redirects are not automatically proposed for them. EA, FA and JA are counted separately because the locale changes the actual intent classification versus English.''')
sec(22,'Distinct Intent Pages That Must Remain Separate',table(['Cluster','Scope','Why separate'],[[c['id'],c['name'],c['reason']] for c in C if c['classification']==DIST])+'''
The classification describes separation of user tasks; it does not claim perfect copy, complete indexing or proven query ownership. An informational page may own its own question while supporting a commercial owner.''')
candidate_rows=[]
for source,(target,cid,preserve) in candidates.items():
 why='Canonical broad business destination with location and service navigation' if target=='/' else 'Broader brand scope, clearer hierarchy and stronger contextual internal linking' if target.startswith('/brands/') else 'Explicit informational task match; provisional, weak performance evidence'
 candidate_rows.append([cid,link(source),link(target),why,metric(source),preserve,'Medium task-overlap confidence; low ranking-benefit confidence','Unknown backlinks/leads; historical query loss; source content must be preserved','REQUIRES PRE-REDIRECT VALIDATION'])
sec(23,'Consolidation Candidates',f'''**{len(candidates)} English source URLs; no redirect implemented or authorised by this report.** These proposals identify a task owner, not a forecast of ranking gains. AC and battery target choices are especially provisional. A direct permanent 301 or 308 could be appropriate only after confirming equivalent user value on the target and completing the validation below. No deletion without a redirect is proposed.
'''+table(['Cluster','Potential source','Potential target','Why this owner','Source six-month evidence','Unique content to preserve','Confidence','Risk','Gate'],candidate_rows)+'''
Future internal-link updates would include the root best-workshop reciprocal list, any blog references, service directory cards, contextual brand/model links and any breadcrumbs pointing to a retired source. Use the saved incoming-link examples and a fresh crawl to enumerate exact references before implementation. Arabic URLs must receive an independent task, traffic and backlink assessment; no English redirect automatically creates an Arabic one.''')
sec(24,'Differentiation Candidates','''* **Generic soft-close (I):** generic installation and repair owns cross-brand equipment; ROX child owns ROX compatibility. Remove conflicting priority only in a future approved batch.
* **Mercedes maintenance guide (M6):** own ownership/condition/history planning; let ASSYST intervals, cost and broad booking stay with their explicit owners.
* **Arabic Ferrari/Lamborghini (EA/FA):** decide and write real selection guidance in Arabic before claiming they are equivalent to the English checklists. Retain service hubs as booking owners.
* **Arabic paint (JA):** retain the published overview, film and coating roles while giving each its own suitability, process and limits. No dedicated Arabic polishing counterpart was verified; do not fabricate one. Generic repair/diagnostics wording currently obscures paint tasks.
* **Arabic Mercedes diagnostics/electrical:** keep the distinct symptom/service openings, but expand task-specific content instead of repeating nearly the same process and parts template. Scope and supported coding must be confirmed before making claims.
* **Arabic counterparts to English consolidation candidates:** DIFFERENTIATE / local evidence review, with no Arabic redirect proposal.

English Ferrari/Lamborghini selection and other brand guide improvements are maintenance of already distinct tasks, not additions to the overlap-cluster count. No content or metadata was changed.''')
sec(25,'URL Decision Register',f'''[Open the URL decision register]({(R/'b0-b-url-decision-register.csv').as_posix()}). It has the requested 13 columns and **{len(registry)} unique URL rows**, covering the full sitewide screen and all live-review URLs. Deep-reviewed pages have current canonical/robots and six-month page evidence. Screen-only rows remain MONITOR / INSUFFICIENT EVIDENCE with provisional self-ownership; they are not cleared for consolidation.

Allowed URL actions used are KEEP, KEEP + OPTIMIZE LATER, DIFFERENTIATE, CONSOLIDATION CANDIDATE, SUPPORTING CONTENT and MONITOR. No DELETE action is used. Supporting content retains its own informational owner even when it links to a commercial parent. Existing redirects are MONITOR, not new consolidation candidates. For every source candidate, notes specify source/target, confidence, evidence, unique content and risk. The Arabic-counterpart field on an Arabic row identifies that same reviewed Arabic asset.''')
arrows=[]
for c in C:
 if c['id'] in ['EA','FA','JA']:continue
 for p in c['paths']:
  if p.startswith('/ar') or p not in D:continue
  a=ar(p)
  if a:
   x=D[a];finding='Reviewed counterpart; preserve its independent language task'
   if p in candidates:finding='Arabic overlap present; DIFFERENTIATE / review, not an automatic consolidation candidate'
   if c['id'] in ['E','F']:finding='Service/repair title/H1 differs from English selection brief; DIFFERENTIATE'
   if c['id']=='J':finding='Generic shared treatment template; DIFFERENTIATE, keep treatment owners'
   if p=='/brands/rox-service-dubai/soft-close-door-installation':finding='Real ROX counterpart exists, noindex; preserve current routing/indexability'
   arrows.append([link(p),link(a),'; '.join(x['title']),'; '.join(x['robots']),finding])
  else:arrows.append([link(p),'No verified dedicated Arabic counterpart in deep review','—','—','Do not invent a translated URL or infer that a homepage fallback is a counterpart'])
# Deduplicate pages shared across comparisons.
arrows=list({r[0]:r for r in arrows}.values())
sec(26,'Arabic Counterpart Review','''English decisions are not copied to Arabic. The fresh review checked whether counterpart HTML has the expected language, self-canonical, distinct title/H1 and relevant body. Some counterparts exist but are noindex; existence does not make them eligible search owners. Missing model/problem counterparts must not be fabricated. B0-A routing files remain untouched.

Notable differences: Ferrari/Lamborghini Arabic best titles are service/repair, not selection; Arabic paint pages use a highly repeated generic template; Arabic Mercedes diagnostics is described as engine diagnosis rather than mirroring all English XENTRY/coding detail; the ROX Arabic child exists and is noindex. The register records each inspected Arabic page separately.
'''+table(['English URL','Arabic counterpart','Arabic title','Live robots','Locale-specific decision'],arrows))
sec(27,'Pre-Redirect Validation Requirements','''**REQUIRES PRE-REDIRECT VALIDATION** applies to all nine proposed sources. This is a prerequisite for a later implementation batch, not a request to implement now.

1. Export query × page × date for source and target over six-month context, latest 28 days and prior 28 days, plus UAE/device slices. Preserve filter definitions and compare like-for-like periods; examine week/day switching and identify meaningful unique query tasks.
2. Review qualified calls, forms, WhatsApp leads and conversion value by landing page. Check backlinks, anchor relevance, external citations, referral traffic and bookmarks/direct-use proxies. Unknown values are not zero.
3. Inspect Google-selected canonicals, crawl/index history and current live status. Establish existing redirect dates for historical Mercedes analysis. Check that any intended target is a relevant, indexable, self-canonical 200 page when that is required for its SEO role.
4. Preserve useful unique content on the correct task owner; validate technical claims with the workshop. AC and battery candidates cannot proceed before source coverage and qualified battery guidance are reconciled.
5. Review Arabic separately, including language-specific queries and template differences. Verify B0-A deployment state; this report does not authorise deploying it.
6. If approved later, plan one direct 301/308 to the equivalent owner, no chain or unrelated-intent destination. Identify internal links, sitemap entries, canonicals and hreflang dependencies, baseline metrics, rollback and monitoring. Do not delete without preserving the URL transition.

If validation reveals a separate profitable task, keep/differentiate instead. Nothing in this report bypasses a fresh review of the concrete implementation.''')
sec(28,'Priority Order','''**P0: none newly established by B0-B.** Known live language-routing/fallback issues belong to the existing undeployed B0-A work; they are not new commercial duplicate pages or a reason to alter B0-A here.

**P1 — B1 Mercedes:** maintain the eleven commercial owners, differentiate the broad maintenance guide, preserve model/symptom/cost/interval scopes and monitor the already redirected broad aliases. Mercedes-related measured query-family demand is strongest among the inspected brand families and it is the next approved planning sequence.

**P2 — main broad overlaps and service decisions:** generic workshop, BMW, Porsche, Range Rover and Audi consolidation validation; ROX differentiation; AC and battery information consolidation validation; Ferrari/Lamborghini selection preservation and Arabic differentiation. Generic/brand workshop bookings rank ahead of narrower editorial changes within this band. Observed page impressions guide investigation, but unavailable conversion values prevent a numerical revenue ranking.

**P3 — supporting architecture and locale depth:** paint treatment/Arabic template work, Porsche systems/models, JLR/case study, other brand selection guides and generic maintenance distinction. **P4** is reserved for low-demand screen-only follow-up; no low-evidence screen result justifies a risky merge.

The final table is sorted by priority, then qualitative commercial importance within the band. Lower evidence or higher redirect risk reduces readiness even when demand is strong.''')

masterheaders=['Cluster ID','Brand','Intent Family','Primary Query','Secondary Queries','Search Intent','Current URLs','Preferred Owner','Supporting URL','GSC Page-Level Evidence','Content Similarity','Internal-Link Evidence','Cannibalization Classification','Recommended Action','Redirect Candidate?','Pre-Redirect Validation Needed?','Arabic Counterpart','Priority','Future Batch','Notes']
masterrows=[]
for o in OWN:
 c=CD[o['cid']];ps=c['paths'];pair=similarity(ps[0],ps[1]) if len(ps)>1 else 'Task comparison';cand=any(p in candidates for p in ps)
 gsc='Exact-query historical evidence; see §18. '+metric(o['owner']) if o['cid']=='M0' else 'INSUFFICIENT GSC PAGE-LEVEL EVIDENCE for query ownership; all-query page context: '+metric(o['owner'])
 masterrows.append([o['cid'],o['brand'],o['family'],o['primary'],o['secondary'],o['intent'],'; '.join(link(p) for p in ps),link(o['owner']),'; '.join(link(p.strip()) for p in o['support'].split(';') if p.strip()),gsc,pair,links(o['owner']),c['classification'],c['action'],'Yes: specified source(s) only' if cand else 'No','REQUIRES PRE-REDIRECT VALIDATION' if cand else 'No redirect proposed',link(ar(o['owner'])) if ar(o['owner']) else link(o['owner']) if o['owner'].startswith('/ar') else 'No verified dedicated counterpart',c['priority'],c['batch'],o['note'] or c['reason']])
sec(29,'Recommended B0-B Decisions','''Adopt these task boundaries as the planning handoff, not as permission to edit. Keep eleven Mercedes commercial owners. Use the nine English consolidation candidates only as a validation queue. Preserve distinct selection, symptom, model, system, repair and upgrade tasks. Differentiate ROX generic copy and the Mercedes maintenance guide. Treat the Arabic review as independent. No current ranking harm is proven.

### Master ownership table

Each row has one primary owner for the stated task. Cluster IDs may repeat because a legitimate comparison includes several distinct task owners. “Redirect candidate” is a cluster-level flag for the exact sources in §23; it never means every current URL or supporting page should redirect.
'''+table(masterheaders,masterrows))
sec(30,'Exact Recommendations for B1 Mercedes','''Use the separate [B1 Mercedes ownership handoff](b1-mercedes-ownership-map.md) alongside §16. B1 should:

1. Keep the hub as the broad Mercedes repair/service owner and retain the existing broad 301 destinations. Do not recreate old service or best-workshop pages.
2. Maintain the ten other specified commercial owners with exact service-specific scope. Do not merge generic equivalents, model pages or diagnostic articles into them.
3. Differentiate broad maintenance-planning prose from the hub, ASSYST/interval and cost guides. Keep current model pages, including those under `/blog/`, as model booking owners.
4. Preserve repair versus upgrade and diagnostics versus electrical/battery boundaries in any later titles, body sections and anchors. Confirm workshop capabilities before promising XENTRY/coding, specific equipment coverage or all-model services.
5. Obtain joined dated GSC data and a post-B0-A-deployment baseline when deployment is separately authorised. Monitor broad aliases and tiny Maybach leakage; no new Mercedes merger is justified here.
6. Review Arabic explicitly; do not fabricate translations for English-only model/problem routes and do not change current noindex based on this ownership map.

**No B1 implementation occurred. B1 requires the user’s subsequent approval.**''')
sec(31,'Things We Must NOT Merge','''* Commercial AC or battery services with their informational troubleshooting/lifespan guides.
* Mercedes audio upgrades with COMAND/head-unit fault repair, or Cadillac CUE repair with generic equipment coverage.
* Generic transmission/AC/oil/diagnostics and other generic services with Mercedes-specific services.
* Mercedes hub with specific repair children, model pages, problem guides, cost/interval guidance or the Maybach mechanical page.
* Non-AMG G-Class with AMG G63; C/E/S-Class with their AMG-specific vehicle scopes.
* Ferrari/Lamborghini English selection checklists with service hubs merely because they mention a workshop.
* Porsche PDK/PASM explainers, warning guides, model pages and commercial repair pages.
* Range Rover, Land Rover and Defender vehicle-family pages, or the Defender accident-repair case with a hub.
* ROX-specific soft-close with the cross-brand service; four paint-treatment owners with each other.
* Arabic pages according to an English-only decision, or existing noindex content solely to reduce page count.''')
sec(32,'Risks','''Largest risks are over-consolidating useful query tasks, losing unique advice/backlinks/leads, choosing an informational target from sparse GSC data, mistaking historical redirect exposure for current competition, and transferring English changes onto materially different Arabic pages. Page totals, average positions and content similarity cannot resolve these on their own. The AC/battery target selections are explicitly provisional; evidence could reverse the preferred direction or favour differentiation.

SERP samples are not controlled by location or device. The 1,000-query export is a reported subset and cannot establish total demand; family regex totals overlap. In-body CTA and related-link text remains in similarity calculations. Internal-link counts describe the captured DOM, including boilerplate and language switchers, not Google’s assessment of link value. Screen-only register rows do not establish unique content or lack of competition.

B0-A is local and undeployed. The live site can therefore differ from the protected local implementation; neither was edited for B0-B. No newly established P0, website mutation, redirect creation, content merge, metadata change, canonical/hreflang/robots/sitemap/noindex change, internal-link edit, commit, push or deployment was performed.

Preservation verification is recorded in `outputs/b0-b/preservation-verification.json` and the final checks below.''')
rank={'M0':0,'M1':1,'M2':2,'M3':3,'M4':4,'M6':5,'M5':6,'M7':7,'A':0,'B':1,'C':2,'D':3,'K':4,'I':5,'E':6,'F':7,'EA':8,'FA':9,'G':10,'H':11,'J':0,'JA':1,'P':2,'N':3,'O':4,'L':5,'Q':6}
finalrows=[]
for c in sorted(C,key=lambda c:(c['priority'],rank.get(c['id'],99))):
 oo=[o for o in OWN if o['cid']==c['id']];hascand=any(p in candidates for p in c['paths'])
 primary='; '.join(dict.fromkeys(o['primary'] for o in oo)) or c['name'];owners=list(dict.fromkeys(o['owner'] for o in oo));evidence='Historical exact-query page exposure plus current 301s; no dated switching proof' if c['id']=='M0' else 'Live task/scope + internal links + all-query page totals; INSUFFICIENT GSC PAGE-LEVEL EVIDENCE for competition'
 finalrows.append([c['priority'],c['id']+' — '+c['name'],primary,'; '.join(dict.fromkeys(o['intent'] for o in oo)) or 'Task hierarchy','; '.join(link(p) for p in c['paths']),'; '.join(link(p) for p in owners) or 'Specific page/task owners above',c['classification'],evidence,c['action'],'Yes — exact §23 sources only' if hascand else 'No','REQUIRES PRE-REDIRECT VALIDATION' if hascand else 'Scope/data review; no redirect proposed',c['batch']])
report='# DIGI-TEC B0-B — Search-intent ownership decisions\n\n28 September 2026 · DIGI-TEC Performance Center L.L.C., Dubai · Analysis only\n\n'+'\n'.join(sections)+'\n## Final recommendation table\n\nSorted by priority, then qualitative commercial importance; multiple owners within a comparison mean different explicitly named tasks, never two preferred owners for one task.\n'+table(['Priority','Cluster','Primary Query','Intent','URLs','Preferred Owner','Cannibalization Status','Evidence','Action','Redirect Candidate','Validation Required','Future Batch'],finalrows)
report=report.replace('[B1 Mercedes ownership handoff](b1-mercedes-ownership-map.md)',f'[B1 Mercedes ownership handoff]({(R/"b1-mercedes-ownership-map.md").as_posix()})')
if (O/'preservation-verification.json').exists():
 pv=load('preservation-verification.json')
 verification=f"**Preservation verified:** {pv['protected_files']:,} protected files hashed; {len(pv['changed'])} changed and {len(pv['missing'])} missing. Branch remains `{pv['branch_after']}`; HEAD remains `{pv['head_after']}`. The pre-existing dirty checkout was preserved. Git status adds only the three requested reports and the B0-B evidence directory. No build, commit, push or deployment was run. Evidence: {ev('preservation-verification.json')}, {ev('git-status-before.txt')}, {ev('git-status-after.txt')} and {ev('validation-results.json')}."
 report=report.replace('Preservation verification is recorded in `outputs/b0-b/preservation-verification.json` and the final checks below.',verification)
(R/'b0-b-intent-ownership-report.md').write_text(report,encoding='utf8')

supports={
 'Broad service / repair':['/mercedes/problems','/blog/mercedes-service-cost-dubai-guide','/blog/mercedes-service-intervals-dubai-heat'],
 'Oil':['/blog/best-oil-change-dubai-mercedes','/blog/mercedes-service-intervals-dubai-heat'],
 'Mechanical / engine':['/mercedes/problems/oil-leak','/mercedes/problems/engine-overheating','/mercedes/problems/check-engine-light'],
 'Suspension / AIRMATIC':['/mercedes/problems/airmatic-malfunction','/mercedes/problems/suspension-dropping-overnight'],
 'Transmission':['/mercedes/problems/gearbox-jerking','/mercedes/problems/transmission-slipping'],
 'Diagnostics / XENTRY / coding':['/mercedes/problems/check-engine-light','/mercedes/problems/wont-start'],
 'AC':['/mercedes/problems/ac-not-cooling','/blog/car-ac-not-cold-dubai-causes'],
 'COMAND / head-unit repair':['/services/mercedes-diagnostics-dubai','/services/mercedes-electrical-repair-dubai'],
 'Audio upgrades':['/services/head-unit-repair-dubai'],
 'Body repair':[mh],
 'Battery':['/mercedes/problems/battery-warning','/mercedes/problems/wont-start','/services/mercedes-electrical-repair-dubai']}
handoffrows=[]
for v in merc:
 boundary='Old broad aliases; broad maintenance guide must not duplicate booking' if v[0]=='Broad service / repair' else 'Audio upgrade must not target fault repair; Cadillac CUE stays specific' if v[0]=='COMAND / head-unit repair' else 'Head-unit fault repair must not target upgrade planning' if v[0]=='Audio upgrades' else 'Electrical hardware repair and battery fitting are separate from coding/diagnostic scope' if v[0]=='Diagnostics / XENTRY / coding' else 'Broad hub, generic equivalents and symptom/model pages retain their distinct tasks'
 gsc='Exact repair: hub 4 clicks/415 imps (Aug19–Sep15); exact service: hub 0/348 (Jun17–Sep16). Existing broad aliases 301. No current harmful competition proven.' if v[0]=='Broad service / repair' else 'INSUFFICIENT GSC PAGE-LEVEL EVIDENCE for this query family. All-query page context: '+metric(v[2])
 handoffrows.append([v[0],v[1]+'; '+v[3],link(v[2]),'; '.join(link(p) for p in supports[v[0]]),boundary,'Keep owner; clarify exact work scope and links only in approved B1',gsc,v[4]])
handoff='''# B1 Mercedes ownership handoff

28 September 2026. **Planning only; no B1 implementation.** Keep all eleven commercial owners below. Do not create a second broad Mercedes service URL or a separate competing COMAND page. Existing broad service/best URLs already 301 to the hub; B0-B did not create these redirects. B0-A remains local and undeployed.

The supplied keyword workbook measures Mercedes demand, but most specific service families lack joined query × page data. The original September 27 export covers April 12–September 25. All-query page totals below are context, not evidence that the listed query ranks on that page.
'''+table(['Mercedes intent','Primary query cluster','Current owner','Supporting pages','Pages that must not compete','Recommended B1 action','GSC evidence','Notes'],handoffrows)+'''
## Additional ownership constraints

* **Electrical repair:** `/services/mercedes-electrical-repair-dubai` owns wiring, circuits, charging and tested electrical hardware faults. XENTRY/coding stays with diagnostics; a battery warning does not automatically belong to replacement.
* **Maintenance planning:** differentiate `/blog/mercedes-benz-maintenance-guide-dubai` toward owner planning/history/condition. ASSYST and intervals belong to `/blog/mercedes-service-intervals-dubai-heat`; cost and Service A/B scope to `/blog/mercedes-service-cost-dubai-guide`; booking to the hub.
* **Models:** existing C/E/S-Class and G63 pages under `/blog/` currently serve commercial model tasks. Keep them. `/mercedes/models/g-class-service-repair-dubai` explicitly covers non-AMG G-Class; G63 remains AMG-specific. C63/E63/S63/GLE/GLS keep their exact audiences. No blanket “all models use AIRMATIC” claim.
* **Problems:** the problem index is navigation; the common-problems blog is an overview; individual guides explain specific warning/symptom tasks. AIRMATIC malfunction versus dropping overnight, and jerking versus slipping, are related but distinguishable problems. Route booking links to the actual repair owner.
* **Other specific repairs:** Mercedes brake, steering, tyre, exhaust and fuel-system pages remain specific service owners. Keep generic multi-brand counterparts separate. Model pages introduce work relevant to that vehicle and link to the repair owner rather than duplicating a full service page.
* **Arabic:** review each existing counterpart independently. Arabic diagnostics/electrical share a large template but distinct openings; expand relevant substance later, not merge. Do not fabricate Arabic model/problem URLs, change noindex or bypass B0-A routing work. The register identifies actual counterparts and current robots.

## Evidence and execution gate

Exact query “mercedes repair dubai” is dominated by the hub in the available recent 28-day export: 415 page impressions versus 3 for Maybach mechanical. Exact “mercedes service dubai” historically exposed the hub and old repair routes, but those routes are now 301s. No daily query × page data proves current switching, simultaneous competition or suppression. Keep the Maybach page for its own brand task.

Before any consolidation proposal, obtain dated query × page data, country/device slices, backlinks and qualified-lead evidence. Establish a baseline after B0-A is separately approved and deployed. Preserve existing 301 destinations. Confirm exact workshop capabilities before making coding or model-coverage claims. B1 may improve the approved owners only after the user approves B1; this handoff does not authorise implementation.
'''+f'\nFull decisions: [B0-B report]({(R/"b0-b-intent-ownership-report.md").as_posix()}); [URL register]({(R/"b0-b-url-decision-register.csv").as_posix()}); {ev("page-comparison-evidence.md")}.\n'
(R/'b1-mercedes-ownership-map.md').write_text(handoff,encoding='utf8')
print(json.dumps(stats,indent=2))
