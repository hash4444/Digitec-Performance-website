"""Generate the requested G2 review artifacts from final evidence, never mutate website sources."""
import csv,gzip,json,re,subprocess
from collections import Counter
from pathlib import Path
from lxml import html,etree
O=Path(__file__).parent;R=O.parents[1];HEAD='bbca5e0dbd49b0ff7ef9b7873aa09b2e2e600c9c'
load=lambda n:json.loads((O/n).read_text(encoding='utf-8'))
rows=load('owner-decisions.json');families=load('family-decisions.json');audit=load('audit-summary.json');browser=load('browser-verification.json')
before={x['path']:x for x in load('baseline-pages.json')};after={x['path']:x for x in load('after-pages.json')};paths=load('generic-paths.json')
docs={p:html.fromstring(gzip.decompress((O/x['htmlFile']).read_bytes()).decode('utf-8')) for p,x in after.items()}
norm=lambda t:re.sub(r'\s+',' ',t or '').strip()
def git(*args):return subprocess.check_output(['git',*args],cwd=R,stderr=subprocess.DEVNULL).decode('utf-8').strip()
def csvout(name,fields,data):
 with (R/name).open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=fields.split(),extrasaction='ignore');w.writeheader();w.writerows(data)
def table(headers,data):
 def cell(s):return str(s).replace('|',' / ').replace('\n',' ')
 return '| '+' | '.join(headers)+' |\n| '+' | '.join('---' for _ in headers)+' |\n'+''.join('| '+' | '.join(cell(v) for v in r)+' |\n' for r in data)
def md(name,sections):
 (R/name).write_text('# '+name.removesuffix('.md').replace('-',' ').upper()+'\n\n'+''.join(f'## {i}. {title}\n\n{body}\n\n' for i,(title,body) in enumerate(sections,1)),encoding='utf-8')
coverage_classes=['COVERED — PRIMARY PROBLEM PAGE','COVERED — PROBLEM SECTION','COVERED — FAQ','COVERED — G1 COMMERCIAL OWNER','COVERED — BRAND OWNER','NOT TARGETED — INTENTIONALLY','DEFERRED — INSUFFICIENT EVIDENCE','GAP — REVIEW REQUIRED']
unique={x['normalized_keyword']:x for x in rows}
for term in unique:
 assert len({(x['primary_owner'],x['coverage_class']) for x in rows if x['normalized_keyword']==term})==1,term
for x in rows:
 if x.get('role')=='section':x.update(coverage_location='Repeated discharge versus a battery warning section',g2_action='Improve existing guide section and electrical path')
 if x['measured_or_generated']!='MEASURED GSC':assert all(x[k]=='' for k in ['gsc_clicks','gsc_impressions','gsc_ctr','gsc_position'])
csvout('g2-generic-problem-keyword-coverage.csv','keyword normalized_keyword source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position problem_intent problem_family primary_owner supporting_owner g1_commercial_owner brand_relationship coverage_class coverage_location reason g2_action notes',rows)

def english(p):return p.removeprefix('/ar')
def matches(p):return [x for x in rows if english(x['primary_owner'])==english(p)]
def related_brands(f):
 keys={'No-start':['wont-start'],'Battery drain':['battery'],'Battery warning':['battery-warning'],'Check-engine warning':['check-engine-light'],'Misfire / rough idle':['misfire'],'Overheating':['engine-overheating'],'Coolant leak':['coolant-leak'],'Oil leak':['oil-leak'],'Transmission symptoms':['gearbox-jerking','transmission-slipping','pdk-jerking'],'Suspension symptoms':['airmatic','suspension-dropping','pasm'],'Screen / head-unit fault':['cadillac-cue','head-unit'],'AC cooling / airflow':['ac-not-cooling'],'Steering symptoms':['steering-vibration'],'Brake symptoms':['brake-warning']}.get(f,[])
 return [p for p in before if not p.startswith('/ar') and any(k in p for k in keys) and (('/problems/' in p) or 'cadillac-cue' in p)][:6]
def family_for(p):
 xs=matches(p)
 if xs:return '; '.join(sorted({x['problem_family'] for x in xs}))
 return 'Supporting '+next((label for key,label in [('battery','battery'),('brake','brake'),('suspension','suspension'),('transmission','transmission'),('ac-repair','AC'),('summer','seasonal checks')] if key in p),'diagnostic context')
inventory=[];ownership=[];changes=[]
pageqa={x['url']:x for x in audit['pages']}
for p in paths:
 seo=after[p]['seo'];qa=pageqa[p];xs=matches(p);f=family_for(p);isblog='/blog/' in p
 g1=next((x['g1_commercial_owner'] for x in xs),'')
 if not g1:
  suffix=next((v for k,v in [('battery','battery-replacement-dubai'),('brake','brake-repair-dubai'),('suspension','suspension-repair-dubai'),('transmission','transmission-repair-dubai'),('ac-repair','car-ac-repair-dubai'),('summer','car-service-dubai')] if k in p),'car-diagnostics-dubai')
  g1='/services/'+suffix
 if p.startswith('/ar') and '/ar'+g1 in after:g1='/ar'+g1
 role='Dedicated problem guide' if any(x.get('role')=='problem' for x in xs) else 'Supporting guide / problem section' if isblog else 'G1 commercial owner / problem assessment'
 task=f+' — '+('symptom explanation and next step' if 'Dedicated' in role else 'supporting information, not a new symptom owner' if isblog else 'commercial inspection/repair task; not a dedicated problem page')
 evidence='; '.join(sorted({x['keyword']+' ['+x['source_period']+']' for x in xs if x['original_gsc']})) or 'No original query-level measured term assigned; editorial ownership only'
 brandrels='; '.join(sorted({v for x in xs for v in related_brands(x['problem_family'])})) or 'Brand-first/model/system searches stay with protected B1–B9 owners'
 body=(docs[p].xpath('//article') or docs[p].xpath('//main') or [docs[p]])[0]
 action='UPDATED — safety/context/FAQ/commercial path; existing URL retained' if qa['changed'] else 'RETAINED — scope reviewed'
 inventory.append(dict(url=p,page_type=role,problem_family=f,current_primary_task=task,current_title=seo['title'],current_h1=qa['new_h1'],indexability='noindex' if qa['noindex'] else 'index',canonical=seo['canonical'],commercial_owner=g1,brand_relationships=brandrels,gsc_evidence=evidence,content_depth=f'{len(norm(body.text_content()).split())} rendered words in article/main; role-specific content reviewed',potential_competitors='; '.join(sorted({x['supporting_owner'] for x in xs})),g2_action=action,notes='Existing route only. Commercial owner classifications do not claim a dedicated symptom page.'))
 ownership.append(dict(url=p,page_type=role,problem_family=f,primary_problem_intent=task,primary_keyword_cluster='; '.join(sorted({x['normalized_keyword'] for x in xs})),secondary_clusters='Related observations within stated task',gsc_evidence=evidence,g1_commercial_owner=g1,brand_relationships=brandrels,supporting_pages='; '.join(sorted({x['supporting_owner'] for x in xs})),potential_competitor='G1 next-step owner: '+g1,ownership_conflict='NO unresolved editorial conflict; ranking effect unproven',indexability='noindex' if qa['noindex'] else 'index',canonical=seo['canonical'],g2_action=action,notes='Task boundaries are editorial decisions, not historical query × landing-page evidence.'))
 changes.append(dict(url=p,page_type=role,problem_family=f,old_title=qa['old_title'],new_title=qa['new_title'],old_h1=qa['old_h1'],new_h1=qa['new_h1'],primary_problem_intent=task,content_change='Qualified symptoms, inspection and urgency; accurate modification date' if qa['changed'] else 'RETAINED',internal_link_change='G1 service next-step CTA added/corrected; generic warning guides no longer use Mercedes as default next step' if qa['changed'] else 'RETAINED',faq_change='Visible symptom FAQs reviewed; EN battery guidance qualified; Arabic battery body retained' if qa['changed'] else 'RETAINED',schema_change='Existing article/FAQ architecture retained; emitted answers match body; modification date updated' if qa['changed'] else 'RETAINED',g1_commercial_owner=g1,reason='Improve diagnostic uncertainty and route generic enquiries to generic commercial owner' if qa['changed'] else 'Existing commercial/support task can accommodate context; no needless rewrite'))
csvout('g2-generic-problem-inventory.csv','url page_type problem_family current_primary_task current_title current_h1 indexability canonical commercial_owner brand_relationships gsc_evidence content_depth potential_competitors g2_action notes',inventory)
csvout('g2-generic-problem-intent-ownership.csv','url page_type problem_family primary_problem_intent primary_keyword_cluster secondary_clusters gsc_evidence g1_commercial_owner brand_relationships supporting_pages potential_competitor ownership_conflict indexability canonical g2_action notes',ownership)
csvout('g2-generic-problem-before-after.csv','url page_type problem_family old_title new_title old_h1 new_h1 primary_problem_intent content_change internal_link_change faq_change schema_change g1_commercial_owner reason',changes)

limitations='Original exports provide query and page totals separately, not query × landing-page joins. Windows overlap and are never summed. Editorial owners do not prove historical ranking URLs. Generated and brief terms are not measured demand. Local QA cannot prove ranking, CTR or leads; Google has not recrawled these local edits. Procedures, warnings and urgency vary by vehicle and symptom severity. Manufacturer tooling does not establish universal access. Unverified programming, retrofits and high-voltage work remain excluded.'
counts=dict(source_observations=14271,brief_observations=sum(x['measured_or_generated']=='BRIEF EXAMPLE' for x in rows),generic_observations=len(rows),raw_generic_strings=len({x['keyword'] for x in rows}),normalized_terms=len(unique),original_gsc_terms=len({x['normalized_keyword'] for x in rows if x['original_gsc']}),generated_terms=len({x['normalized_keyword'] for x in rows if x['measured_or_generated']=='GENERATED TAXONOMY'}),research_terms=len({x['normalized_keyword'] for x in rows if x['measured_or_generated']=='RESEARCH'}),brief_terms=len({x['normalized_keyword'] for x in rows if x['measured_or_generated']=='BRIEF EXAMPLE'}),coverage={c:sum(x['coverage_class']==c for x in unique.values()) for c in coverage_classes},families=len(families),urls_reviewed=len(paths),urls_changed=len(audit['all_changed_routes']),urls_retained=len(paths)-len(audit['all_changed_routes']),new_urls=0,new_url_rejected=sum(x['role']!='deferred' for x in families.values()),new_url_deferred=sum(x['role']=='deferred' for x in families.values()),unresolved_conflicts=0,links=audit['contextual_links_checked'],all_main_links=audit['links_checked'],depth=audit['maximum_depth'])
counttable=table(['Measure','Count'],[(k,v) for k,v in counts.items() if k!='coverage'])+'\n'+table(['Coverage class','Normalized terms'],counts['coverage'].items())
familytable=table(['Family','Problem/assessment owner','G1 next step','Decision'],[(f,x['primary_owner'],x['g1_commercial_owner'],x['role']+': '+x['reason']) for f,x in families.items()])
deferred=[x for x in unique.values() if x['coverage_class'].startswith('DEFERRED')]
gaprows=[]
for f,x in families.items():
 measured=[r for r in rows if r['problem_family']==f and r['original_gsc']]
 ev='; '.join(f"{r['keyword']}: {r['gsc_clicks']} clicks, {r['gsc_impressions']} impressions, CTR {r['gsc_ctr']}, position {r['gsc_position']} ({r['source_period']})" for r in measured) or 'No original-GSC evidence; generated/research/brief only'
 gaprows.append([f,ev,x['primary_owner'],x['g1_commercial_owner'],'DEFER dedicated explanation' if x['role']=='deferred' else 'USE EXISTING OWNER',x['reason'],'NO', 'Existing supported inspection scope only; exact vehicle confirmed','Brand-specific warnings retained','Review future query × page evidence; no automatic new URL'])
md('g2-generic-problem-gap-decisions.md',[('Decision standard','Architecture asymmetry and generated phrases do not justify URLs. No unresolved GAP — REVIEW REQUIRED remains; seven normalized terms are explicitly deferred for deeper evidence, not represented as fully covered.'),('Family decisions',table(['Problem family / cluster','Evidence and measured values','Existing owner','G1 owner','Decision','Reason','New URL needed?','Verified scope','Brand relationship','Future action'],gaprows)),('Deferred terms',table(['Term','Recommended assessment path','Reason'],[(x['keyword'],x['g1_commercial_owner'],x['reason']) for x in deferred]))])

sources=[
('Ford warning lamps','https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1964740&Uid=G1964739&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G539493&userMarket=irl&vFilteringEnabled=False&variantid=6926','Supports stopping safely and switching off for high coolant temperature/low oil pressure in the cited vehicle. Exact manual takes precedence; not universal warning wording.'),
('Volkswagen engine management warning','https://www.volkswagen.co.uk/en/owners-and-services/my-car/warning-light/emission-control.html','Considers vibration, power loss and ability to travel safely. Used to avoid blanket steady-light driving permission; VW restart instructions are not generalized.'),
('DENSO AC diagnostic considerations','https://www.denso-am.eu/news/why-is-air-conditioning-system-servicing-so-challenging','Pressure readings alone can be insufficient; temperatures and live data may matter. Supports assessment before replacement, not a claim of workshop high-voltage scope.'),
('Volkswagen red brake system fault','https://www.volkswagen.co.uk/en/owners-and-services/my-car/warning-light/electric-brake-system-fault.html','Supports stop-safely response to a red brake-system warning. Generic major braking/control changes use a conservative editorial referral rule, not a diagnosis.'),
('Ford steering warnings','https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2132333&Uid=G2176054&buildtype=web&countryCode=USA&div=f&languageCode=en&vFilteringEnabled=False&variantid=9048','Distinguishes service-required and stop-safely steering messages. Do not apply exact warning text across brands.'),
('Ford transmission warning examples','https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2526147&Uid=G2526146&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G2374291&userMarket=GBR&vFilteringEnabled=False&variantid=11292','Illustrates vehicle-specific overheating instructions; some require engine running while cooling. Do not invent a universal gearbox cooling procedure.'),
('VARTA battery testing','https://www.varta-automotive.com/en-gb/knowledge/articles/article-details/car-battery-testing-instructions','Battery technology affects testing. State of charge and state of health are distinct; age or starting symptom alone is not a replacement verdict.'),
('Michelin unusual pressure loss','https://marketing.michelin.co.uk/tyre-academy/level1-2-key-safety-checks-part1.htm','Unusual loss warrants tyre, wheel and valve inspection. No universal puncture repair eligibility or run-flat range added.')]
md('g2-generic-problem-technical-sources.md',[
('MANUFACTURER / AUTHORITATIVE TECHNICAL SOURCES',table(['Source','URL','Evidence and limit'],sources)),
('OTHER AUTHORITATIVE SAFETY SOURCES','[RAC smoke guidance](https://www.rac.co.uk/drive/advice/know-how/engine-smoking-why-its-happening-and-what-to-do/) distinguishes smoke contexts. G2 deliberately does not repeat component verdicts from colour; dedicated white/blue/black-smoke content is deferred. Source review date: 2026-09-30.'),
('DIGI-TEC BUSINESS FACTS','Existing G1 service records and rendered pages establish an Al Quoz workshop and diagnostic/inspection enquiry paths. The brief explicitly excludes free diagnostics. No certification, guaranteed repair, universal tooling access, price or high-voltage offering was introduced.'),
('GSC EVIDENCE','All 13 original exports read, 11 distinct tabular datasets after duplicate detection. Source files, filters and windows are in outputs/g2/source-inventory.json. Each measured row retains its own period; six-month context is 2026-04-12 to 2026-09-25. No query × page join exists in the exports.'),
('KEYWORD WORKBOOK EVIDENCE','All seven sheets read. Query fields extracted from Master Keywords, GSC Opportunities, Service Taxonomy, Brand Specific Systems and Page Strategy. README and Brand Opportunity are contextual summaries, not extra keywords. Workbook-derived GSC copies are not additive to original exports.'),
('G1 COMMERCIAL OWNERSHIP','Approved g1-generic-commercial-intent-ownership.csv and the 47-route committed final render define commercial ownership. G2 has not changed those owners.'),
('EDITORIAL INFERENCE','Clustering, urgency scenario labels and choice of existing owner are editorial decisions. They are not manufacturer instructions or proof of demand. Symptom descriptions do not diagnose a failed component. '+limitations)])

boundary_titles=['Boundary Principles','No-Start','Battery-Drain / Warning','Check-Engine / Warning Lights','Misfire / Rough Idle','Shaking / Vibration','Loss of Power','Overheating','Coolant Leak','Oil Leak','Smoke','Transmission Symptoms','AC Symptoms','Suspension Symptoms','Steering Symptoms','Brake Symptoms','Electrical Symptoms','Screen / Infotainment','Reverse Camera','Soft-Close','Turbo / Boost','Tyre / Wheel','Generic vs Brand Warning Systems','Conflict Findings','Final Boundary Decisions']
boundary_fams=[None,'No-start','Battery drain','Check-engine warning','Misfire / rough idle','Vibration','Power loss / boost','Overheating','Coolant leak','Oil leak','Smoke','Transmission symptoms','AC cooling / airflow','Suspension symptoms','Steering symptoms','Brake symptoms','Electrical symptoms','Screen / head-unit fault','Camera fault','Soft-close fault','Power loss / boost','Tyre / wheel symptoms',None,None,None]
sections=[]
for title,f in zip(boundary_titles,boundary_fams):
 if f:
  x=families[f];text=f"Generic owner: `{x['primary_owner']}`. G1 next step: `{x['g1_commercial_owner']}`. {x['reason']}\n\nRelevant existing brand owners: "+('; '.join('`'+p+'`' for p in related_brands(f)) or 'No dedicated brand problem URL is inferred. Use the protected brand service graph when the query identifies a model/system.')+'\n\nDISTINCT INTENT: generic observation versus named brand/model/system context. No unresolved editorial conflict; no brand page rewritten.'
 else:text='Brand-first queries and named systems such as DSG, PASM, AIRMATIC, drivetrain malfunction and CUE retain established owners. Generic symptoms lead to G1 services, not a default brand. No primary-owner conflict is left unresolved; ranking cannibalization remains unproven without joined evidence.'
 if title=='Final Boundary Decisions':text+='\n\n'+familytable
 sections.append((title,text))
md('g2-brand-generic-problem-boundary.md',sections)

scenarios=[
('MONITOR / BOOK SERVICE','Reduced cabin cooling only','Book AC inspection; avoid unsafe cabin heat or impaired demisting.'),
('MONITOR / BOOK SERVICE','Touchscreen fault without safety-critical loss','Book display/electrical assessment; do not operate controls while driving.'),
('MONITOR / BOOK SERVICE','Camera image absent','Do not rely on the failed camera; assess whether the manoeuvre can be completed safely and book inspection.'),
('MONITOR / BOOK SERVICE','Soft-close convenience function inoperative','Confirm door can be safely latched; failed secure closure is a stronger safety concern.'),
('PROMPT INSPECTION','Steady engine warning without other symptoms','Handbook and safe-travel assessment; not blanket driving permission.'),
('PROMPT INSPECTION','Repeated battery discharge while safely parked','Electrical/charging assessment before replacement.'),
('PROMPT INSPECTION','No-start in a safe location','Differentiate no crank, normal cranking and starts-then-stops; arrange assessment.'),
('PROMPT INSPECTION','Mild intermittent shifting complaint','Transmission assessment; worsening behaviour or loss of drive escalates.'),
('PROMPT INSPECTION','Suspension noise without control change','Inspect; unsafe handling or severe ride-height loss escalates.'),
('PROMPT INSPECTION','Mild rough idle','Diagnostic assessment; severe running/flashing light escalates.'),
('LIMIT DRIVING','Unexplained ongoing fluid loss','Determine severity and system; major loss/critical warning requires stopping.'),
('LIMIT DRIVING','New vibration without immediate loss of control','Avoid provoking the symptom; tyre/steering/brake context directs inspection.'),
('LIMIT DRIVING','New power loss','Assess safe travel; severe change/other warning requires assistance.'),
('LIMIT DRIVING','Unusual tyre pressure loss','Tyre/wheel/valve inspection; flat or compromised control means stop safely.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Continuing overheating or steam','Stop safely, engine off; avoid hot pressurised system and seek assistance.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Oil-pressure warning while running','Stop safely and switch off; exact handbook instructions apply.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Major pedal/braking change or red brake warning','Stop safely; do not drive with unsafe braking.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Steering control compromised','Stop safely and seek assistance.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Flashing engine warning plus severe running or power loss','Stop safely and arrange assistance.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Significant fluid loss with a critical warning','Stop safely; no refill-and-drive assurance.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Smoke/burning smell indicating immediate hazard','Stop safely and seek assistance; do not approach an unsafe engine bay.'),
('STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Loss of drive, unsafe shifting or gearbox stop warning','Stop safely and follow exact manual; no universal idle/engine-off cooling rule.')]
safetytable=table(['Conditional urgency','Scenario','Action'],scenarios)
safetyheads=['Purpose','Safety Principles','MONITOR / BOOK SERVICE','PROMPT INSPECTION','LIMIT DRIVING','STOP DRIVING / RECOVERY MAY BE APPROPRIATE','Overheating','Oil / Lubrication Warnings','Brake Changes','Steering Changes','Transmission Behaviour','Smoke','Fluid Leaks','Electrical / Burning Smell','Warning Lights','Never Diagnose Remotely','CTA by Urgency','Final Editorial Rules']
safety=[]
for t in safetyheads:
 if t in {r[0] for r in scenarios}:body=table(['Scenario','Response'],[(b,c) for a,b,c in scenarios if a==t])
 elif t=='Purpose':body='An editorial triage framework for content review, not remote diagnosis or permission to drive. Counts refer to conditional scenarios, never fixed urgency assigned to a keyword.'
 elif t=='Final Editorial Rules':body=safetytable+'\n\nNo guaranteed cause, component verdict, restart experiment, hot coolant-cap instruction, or parts purchase recommendation. Follow exact vehicle instructions.'
 elif t=='CTA by Urgency':body='Routine issues may lead to an inspection booking. Safety-critical scenarios first direct the reader to stop safely and seek assistance; a workshop booking is secondary. No free check or instant diagnosis is offered.'
 else:body='Severity and associated symptoms govern the response. '+next((c for a,b,c in scenarios if t.split()[0].lower() in b.lower()),'Describe observations, refer to the correct commercial assessment and avoid unsupported component certainty.')+' Manufacturer examples in the technical-sources report are vehicle-specific. The scenario table below states the conservative editorial boundaries.'
 safety.append((t,body))
md('g2-safety-urgency-framework.md',safety)

clusterrows=[]
for f,x in families.items():
 terms=sorted({r['normalized_keyword'] for r in rows if r['problem_family']==f});raw=sorted({r['keyword'] for r in rows if r['problem_family']==f})
 clusterrows.append([f,'; '.join(raw),'; '.join(terms),x['primary_owner'],x['reason'],x['g1_commercial_owner'],'G1 assessment owner / related guide','Existing URL; separate observations inside relevant task'])
md('g2-problem-cluster-consolidation.md',[('Principles','Consolidation is a content/ownership decision only: zero redirect, merge, canonical or route change. No crank differs from normal cranking; idle vibration differs from speed and braking vibration. Coolant loss differs from overheating; smoke colours remain separate and are deferred.'),('Final clusters',table(['Cluster','Raw terms','Normalized terms','Owner','Section/context decision','G1 owner','Potential competitor','Decision'],clusterrows))])
urlheads=['Executive Summary','New-URL Decision Standard','Existing Architecture First','Service Families Considered','Measured Evidence','Existing Candidate Owners','Diagnostic / Safety Depth','G1 Commercial Relationship','Brand Conflict Review','New URLs Approved','New URLs Rejected','New URLs Deferred','Final Decision Table']
urlbody=['No new URL created. Improve four existing English guide bodies and existing Arabic relationships/content where justified.','A new page must meet all eight brief thresholds: distinct intent, evidence/user value, depth, no sufficient owner, G1 path, low conflict, link position and protected-brand separation.','Commercial owners may satisfy assessment intent without pretending to be dedicated problem pages.',familytable,'Only 11 normalized generic candidates have original-GSC evidence; per-window values are in the measured-only CTR file. Puncture and electrical repair enquiries do not require new symptom pages.',familytable,'Existing warning, overheating, AC and battery content is sufficient for the justified improvements. Smoke colours, oil-pressure deep coverage and unspecified shaking are deferred, not forced into thin pages.','All 24 family decisions have a real G1 assessment path.','Brand-specific candidate terms are retained in the source audit and excluded from generic demand.','0.','21 family-level proposals rejected in favour of existing guides/sections/services.','3 family-level proposals deferred: Smoke, Oil pressure and broad Vibration. This represents seven normalized terms; no URL is silently scheduled. ',table(['Family','Keyword cluster','Measured evidence','Existing owner','G1 owner','Why sufficient / insufficient','Verified capability','Proposed URL','Risk','Decision'],[(f,'; '.join(sorted({r['normalized_keyword'] for r in rows if r['problem_family']==f})),'See per-window CTR rows; none inferred',x['primary_owner'],x['g1_commercial_owner'],x['reason'],'Existing inspection scope only','None','Avoid generic/brand and commercial duplication','DEFER' if x['role']=='deferred' else 'NO NEW URL') for f,x in families.items()])]
md('g2-new-problem-url-decisions.md',list(zip(urlheads,urlbody)))

pairdefs=[('No-start','battery-replacement-dubai'),('No-start','car-diagnostics-dubai'),('No-start','auto-electrical-repair-dubai'),('Battery drain','battery-replacement-dubai'),('Battery drain','auto-electrical-repair-dubai'),('Check-engine warning','car-diagnostics-dubai'),('Misfire / rough idle','car-diagnostics-dubai'),('Misfire / rough idle','mechanical-repair-dubai'),('Vibration','steering-repair-dubai'),('Vibration','brake-repair-dubai'),('Vibration','car-diagnostics-dubai'),('Power loss / boost','mechanical-repair-dubai'),('Power loss / boost','transmission-repair-dubai'),('Overheating','mechanical-repair-dubai'),('Overheating','coolant-leak'),('Oil leak','mechanical-repair-dubai'),('Smoke','white-blue-black-smoke'),('Transmission symptoms','transmission-repair-dubai'),('AC cooling / airflow','car-ac-repair-dubai'),('Suspension symptoms','suspension-repair-dubai'),('Steering symptoms','tire-repair-dubai'),('Steering symptoms','suspension-repair-dubai'),('Brake symptoms','brake-repair-dubai'),('Screen / head-unit fault','auto-electrical-repair-dubai'),('Screen / head-unit fault','head-unit-repair-dubai'),('Camera fault','auto-electrical-repair-dubai'),('Soft-close fault','soft-close-door-repair-dubai')]
cann=[]
for f,p in pairdefs:
 x=families[f];competitor='/services/'+p if p.endswith('dubai') else 'Context only; no separate URL: '+p
 cann.append(dict(problem_family=f,primary_owner=x['primary_owner'],g1_commercial_owner=x['g1_commercial_owner'],potential_competitor=competitor,brand_competitor='',relationship='Problem explanation to commercial service / different observation within one owner',classification='DISTINCT INTENT',evidence=x['reason'],g2_action='Clarify task; retain routes and G1 scope',future_validation='Obtain query × landing-page and conversion data before any consolidation',notes='No claim of proven harmful ranking cannibalization'))
for f,x in families.items():
 for p in related_brands(f):cann.append(dict(problem_family=f,primary_owner=x['primary_owner'],g1_commercial_owner=x['g1_commercial_owner'],potential_competitor='',brand_competitor=p,relationship='Generic observation versus named brand/model/system',classification='DISTINCT INTENT',evidence='Editorial task separation; no joined GSC evidence',g2_action='Preserve brand owner',future_validation='Query × page validation',notes='No brand rewrite'))
for primary,comp,f in [('/blog/car-battery-life-dubai-heat','/blog/car-battery-replacement-dubai','Battery drain'),('/blog/car-ac-not-cold-dubai-causes','/blog/car-ac-repair-dubai','AC cooling / airflow')]:
 cann.append(dict(problem_family=f,primary_owner=primary,g1_commercial_owner=families[f]['g1_commercial_owner'],potential_competitor=comp,brand_competitor='',relationship='Related informational guides',classification='INTENT OVERLAP',evidence='Broader maintenance/service guide supports selected symptom owner; topics touch without proof of ranking harm',g2_action='Keep explicit primary symptom decision; retain URLs',future_validation='Query × page, backlink and conversion evidence before consolidation',notes='No unresolved editorial primary owner: selected owner explicit'))
csvout('g2-generic-problem-cannibalization-register.csv','problem_family primary_owner g1_commercial_owner potential_competitor brand_competitor relationship classification evidence g2_action future_validation notes',cann)
ctr=[]
for x in rows:
 if not x['original_gsc']:continue
 pos=float(x['gsc_position']);band='1–3' if pos<=3 else '4–10' if pos<=10 else '11–20' if pos<=20 else '21–30' if pos<=30 else '>30'
 ctr.append({**x,'editorial_owner':x['primary_owner'],'position_band':band,'opportunity_reason':'Zero/low clicks in this measured window; low-volume evidence' if x['gsc_clicks']==0 else 'Measured symptom/assessment query; assess intent before metadata changes','evidence_limitation':'Query-only export; not historical landing URL. Window overlaps others; do not sum. Original source: '+x['source_file']})
csvout('g2-generic-problem-ctr-opportunities.csv','keyword normalized_keyword source_period gsc_clicks gsc_impressions gsc_ctr gsc_position problem_family problem_intent editorial_owner g1_commercial_owner position_band opportunity_reason g2_action evidence_limitation',ctr)

baseline_sitemap=etree.fromstring(subprocess.check_output(['git','show',HEAD+':public/sitemap.xml'],cwd=R));current_sitemap=etree.parse(str(R/'public/sitemap.xml'))
locs=lambda d:set(d.xpath('//*[local-name()="loc"]/text()'))
policy=dict(routes_equal=set(before)==set(after),sitemap_membership_equal=locs(baseline_sitemap)==locs(current_sitemap),sitemap_canonical_count=len(locs(current_sitemap)))
(O/'policy-verification.json').write_text(json.dumps(policy,indent=2),encoding='utf-8')
assert browser['passed'] and policy['routes_equal'] and policy['sitemap_membership_equal']
assert not audit['g1_preservation']['changes'] and all(not v['changes'] for v in audit['protected'].values())
assert all(not audit[k] for k in ['policy_changes','broken_links','redirecting_links','missing_fragments','orphans','schema_issues','faq_issues','initial_faq_issues','image_issues','nojs_issues','hreflang_issues'])
numstats=[x.split('\t') for x in git('diff','--numstat',HEAD).splitlines()]
source=[x for x in numstats if x[2].startswith('src/')];generated=[x for x in numstats if not x[2].startswith('src/')]
diff=dict(baseline=HEAD,head=git('rev-parse','HEAD'),branch=git('branch','--show-current'),source_files=[x[2] for x in source],source_lines_added=sum(int(x[0]) for x in source),source_lines_removed=sum(int(x[1]) for x in source),generated_files=[x[2] for x in generated],reports=14,committed=False,pushed=False,deployed=False)
difftext=table(['Item','Value'],diff.items())+'\n\n```text\n'+git('diff','--stat',HEAD)+'\n```\n\nUntracked G2 reports and audit files are listed by git status; git diff does not include untracked files.'
preservation=table(['Protected scope','Routes compared','Substantive changes','Status'],[('G1',audit['g1_preservation']['reviewed'],0,'PASS')]+[(k,v['reviewed'],len(v['changes']),'PASS') for k,v in audit['protected'].items()])
qatext=table(['Check','Result'],[('TypeScript','PASS — outputs/g2/typecheck.log'),('Production build and all bundled validators','PASS — outputs/g2/build.log'),('Routes',len(after)),('Sitemap canonicals',policy['sitemap_canonical_count']),('Route/canonical/robots/hreflang/sitemap policy','PASS — zero policy/membership changes'),('Schema / initial FAQ','PASS — '+str(audit['faq_pairs'])+' question/answer pairs'),('Contextual links / all main links',str(audit['contextual_links_checked'])+' / '+str(audit['links_checked'])),('Broken / redirecting / fragments / orphans','0 / 0 / 0 / 0'),('Maximum same-language depth',audit['maximum_depth']),('Desktop / mobile / no JavaScript',f"{sum(x['width']==1440 for x in browser['pages'])} / {sum(x['width']==390 for x in browser['pages'])} / {len(browser['noJavaScript'])}"),('Images','Local assets and alt presence PASS; no new imagery. External images blocked in browser harness, not claimed verified.'),('Runtime / hydration errors',len(browser['errors'])),('Duplication','Substantive article comparison reviewed; related-card summaries/shared business facts excluded'),('Generic / brand / G1 ownership','0 unresolved editorial conflicts'),('Safety','Conditional urgency; exact handbook and inspection govern')])
regheads=['G2 Baseline','G2_BASELINE_HEAD','Git Baseline Status','TypeScript Baseline','Production-Build Baseline','Route Baseline','Sitemap Baseline','Post-G2 TypeScript','Post-G2 Production Build','Route Comparison','Sitemap Comparison','Canonical Comparison','Robots / Noindex Comparison','Hreflang Comparison','Schema Status','FAQ Visibility / SSR Status','Internal-Link Status','Image Status','Responsive Status','No-JavaScript Status','G1 Generic Regression','Mercedes Regression','Porsche Regression','BMW Regression','Ferrari Regression','Lamborghini Regression','Rolls-Royce Regression','Bentley Regression','Maybach Regression','Range Rover Regression','Defender Regression','Jaguar Regression','Cadillac Regression','Volkswagen Regression','Jetour Regression','ROX Regression','Generic-Problem QA Status','Safety QA Status','G2 Diff Summary','Final Regression Status']
reg=[]
for t in regheads:
 if t=='G2 Baseline':body='Approved pushed G1 output is the authoritative baseline. Baseline setup was not repeated, per instruction; committed G1 final render and validated precommit checks reused.'
 elif t=='G2_BASELINE_HEAD':body=HEAD
 elif t=='Git Baseline Status':body='main; clean before G2 evidence extraction; synchronized with origin/main at approved baseline.'
 elif 'Baseline' in t:body='1247 routes' if t=='Route Baseline' else '996 sitemap canonicals' if t=='Sitemap Baseline' else 'PASS — approved G1 precommit check; no historical pre-brand checkpoint used'
 elif 'Regression' in t and t not in ['Final Regression Status']:body=preservation
 elif t=='G2 Diff Summary':body=difftext
 elif t=='Final Regression Status':body='PASS — G2 READY FOR REVIEW. No protected substantive change, route-policy change or failing required local check. '+limitations
 elif t=='Safety QA Status':body='Four existing English guide bodies corrected; Arabic safety/context and service paths reviewed. No remote diagnosis or blanket steady-light driving permission. Deferred smoke/oil-pressure/vibration coverage remains explicit.'
 else:body=qatext
 reg.append((t,body))
md('g2-generic-problem-regression-report.md',reg)

heads=['Executive Summary','Scope Completed','G2 Baseline','G1 Deferred Register Review','Complete Problem Keyword Extraction','Keyword Normalization','Generic Problem Taxonomy','Existing Problem Content Inventory','Problem → Owner Map','Page vs Section vs FAQ Decisions','No-Start Review','Battery-Drain Review','Check-Engine / Warning-Light Review','Misfire / Rough-Idle Review','Shaking / Vibration Review','Loss-of-Power Review','Overheating Review','Coolant-Leak Review','Oil-Leak Review','Exhaust-Smoke Review','Transmission-Symptom Review','AC-Not-Cooling Review','Suspension-Symptom Review','Steering-Symptom Review','Brake-Symptom Review','Electrical-Symptom Review','Screen / Infotainment Problem Review','Reverse-Camera Problem Review','Soft-Close Problem Review','Turbo / Boost Problem Review','Exhaust / Noise Problem Review','Tyre / Wheel Problem Review','Other Problem Families','Problem Page Content Standard','Safety / Urgency Framework','G2 → G1 Commercial Paths','Internal Linking Review','Brand ↔ Generic Problem Boundary','Title / Meta / H1 Review','FAQ Review','Technical Claim Safety Review','Content Quality Review','New Problem URL Decisions','Problem Cluster Consolidation','Generic Problem Cannibalization Regression','Generic Problem Keyword Coverage','Remaining Gaps','CTR Opportunities','Problem Safety Review','Generic Problem Page Quality Control','Indexability Review','Schema Review','Image / Alt Review','CTA Review','Local SEO Review','Arabic Problem Review','Internal-Link Final QA','Mobile / Desktop QA','No-JavaScript QA','Build / Test Results','G1 Commercial Regression','Protected Brand Regression','G2 Diff Summary','Remaining Risks','Future Generic Problem Opportunities','Final PASS / PARTIAL / FAIL']
familysections={11:'No-start',12:'Battery drain',13:'Check-engine warning',14:'Misfire / rough idle',15:'Vibration',16:'Power loss / boost',17:'Overheating',18:'Coolant leak',19:'Oil leak',20:'Smoke',21:'Transmission symptoms',22:'AC cooling / airflow',23:'Suspension symptoms',24:'Steering symptoms',25:'Brake symptoms',26:'Electrical symptoms',27:'Screen / head-unit fault',28:'Camera fault',29:'Soft-close fault',30:'Power loss / boost',31:'Exhaust noise',32:'Tyre / wheel symptoms'}
text={
1:'Local G2 is ready for review. Eight existing routes changed (four English guides and their existing Arabic routes); zero new URLs. G1 and all protected brands retain their rendered content and ownership. No commit, push or deployment.',
2:'Complete source extraction, 24-family disposition, 43-route inventory, four-guide improvement, safety/boundary registers, 14 requested deliverables and local validation. Seven normalized terms are intentionally deferred for deeper evidence, not marked covered.',
3:HEAD+' on main. Reused approved final G1 output; no historical baseline recreated.',
4:'Read the 21-term G1 handoff and independently scanned the complete workbook and original exports. It is not the full G2 universe. Source observations retained per file/cell/window.',
5:counttable+'\nSource workbook has seven sheets; original exports total 13 files and 11 distinct tabular datasets. Brand-specific symptom candidates remain in the audit but are excluded from generic demand. Additional stem review separated AC, transmission and exhaust leaks from unrelated starter replacement and exhaust-cleaning service terms.',
6:'Case/whitespace and typographic apostrophes standardized; gearbox/transmission, tire/tyre and touchscreen spelling normalized. No-crank versus normal-cranking, idle versus speed/braking vibration, smoke colours, battery drain versus warning and coolant loss versus overheating remain separate terms/contexts. Source-class counts overlap and are not additive.',
7:familytable,8:'See the exact-column inventory CSV for all 43 existing routes, including Arabic. Three dedicated symptom guides, a battery-guide section and relevant G1 commercial/supporting guide owners are distinguished. No invented URL.',9:familytable,
10:'Three existing dedicated guides improved; battery drain uses a section of the existing battery-life article. Most enquiries remain explicitly COVERED — G1 COMMERCIAL OWNER. Smoke colours, oil-pressure deep coverage and unspecified shaking are deferred. No schema-only FAQ or new URL.',
33:'Oil-pressure deep coverage is deferred while current urgent-warning text directs safe stopping. Engine-noise assessment uses mechanical repair. No high-voltage, coding, retrofit or new service claim was introduced.',
34:'Changed guides explain the observation, useful context, broad systems, urgency, inspection and named commercial next step. Retained commercial pages remain commercial fault-assessment pages and are not relabelled as full symptom guides.',
35:safetytable,
36:familytable,
37:'Generic check-engine and overheating next steps now use G1 diagnostics/mechanical owners instead of a default Mercedes route. AC and battery guides have task-specific service CTAs. No giant symptom directory or all-brand link list was added.',
38:'The boundary report documents named-system exclusions (DSG, PASM, AIRMATIC, CUE) and actual existing brand relationships. Zero unresolved editorial conflicts; brand source and rendered content unchanged.',
39:'Titles and H1s were accurate and retained. The battery-life meta description now qualifies testing and vehicle-specific registration. Other metadata retained to avoid unnecessary retargeting. Modification dates updated to 2026-09-30 for changed routes; original publication dates retained.',
40:'Changed symptom answers are visible and use conditional language. Existing FAQ extraction/filtering architecture retained. All '+str(audit['faq_pairs'])+' emitted pairs across reviewed routes verified in SSR and initial HTML.',
41:'Manufacturer warning examples and supplier diagnostic guidance documented separately from editorial inference. Removed blanket steady-light driving permission, automatic AC-leak/recharge assumptions and fixed battery life/universal registration claims.',
42:'Specific observations and decisions replace repetitive cause lists in changed guides. Titles/introductions are not copied between overheating, check-engine, AC and battery tasks.',
43:'Zero created; 21 family-level new-page proposals rejected for existing-owner coverage and three deferred. See the decision register; generated terms alone are insufficient.',
44:'No start wording shares assessment intent, while no-crank/cranks-no-start remain distinguished. Vibration context, smoke colour and fluid/warning distinctions are not collapsed. No URL merges or redirects.',
45:table(['Classification','Rows'],Counter(x['classification'] for x in cann).items())+'\nTwo informational guide pairs have topic overlap, with explicit primary symptom decisions. Harmful ranking cannibalization is not claimed.',
46:counttable,
47:table(['Deferred term','Current assessment path'],[(x['keyword'],x['g1_commercial_owner']) for x in deferred])+'\nNo unresolved GAP — REVIEW REQUIRED. Deferral is intentional and does not establish a dedicated guide exists.',
48:'Measured-only CTR CSV preserves original windows. Most measured candidates are puncture/repair enquiries; the Arabic AC complaint and check-engine diagnostic-cost query each have only two impressions in their relevant short windows. No aggregate combines windows or claims a historical landing URL.',
49:'Conditional scenario framework reviewed for overheating, oil pressure, major braking/steering change, severe running, significant fluid loss, smoke and transmission behaviour. No remote component diagnosis or replacement instruction.',
50:'Existing-owner coverage reviewed against rendered scope. Dedicated problem guides provide explanation; commercial rows intentionally provide inspection paths. Deeper unsupported symptom explanations remain deferred.',
51:'Zero route, canonical, robots/noindex or sitemap membership change. No demand-driven indexing or fake Arabic symmetry.',
52:'Article/BlogPosting and existing breadcrumbs retained; no informational guide converted to Service. Updated visible FAQs drive existing FAQ schema. No price, rating, review or affiliation added.',
53:'No new image or alt claim. Existing local assets and alt presence passed. Changed guides use existing gradient covers. External image availability is outside the blocked-network browser harness and is not represented as verified.',
54:'Specific diagnostic/mechanical/AC/electrical paths added or corrected. Safety-critical text prioritizes safe stopping/assistance. No free inspection, instant diagnosis or same-day promise.',
55:'Existing Dubai/Al Quoz context retained for workshop next steps; explanatory headings are not stuffed with location or repair synonyms.',
56:'Existing Arabic guide routes reviewed and preserved. Three Arabic bodies gain safety/context/FAQ material; battery Arabic body retained with correct electrical CTA and modification date. No new Arabic route.',
57:qatext,58:qatext,59:qatext,60:qatext,
61:preservation,62:preservation,63:difftext,
64:limitations+' Non-blocking baseline warnings: React fetchPriority SSR warning and existing build chunk-size/Browserslist notices; no runtime/hydration errors in browser checks.',
65:'Collect query × landing-page evidence and monitor approved owners after a separately authorized deployment. Revisit deferred smoke/oil-pressure/shaking depth only when evidence or distinct user value justifies it. No new service capability is assumed.',
66:'PASS — G2 READY FOR REVIEW\n\nLocal QA only. '+limitations+'\n\nNo G3, commit, push or deployment.'}
sections=[]
for n,title in enumerate(heads,1):
 if n in familysections:
  f=familysections[n];x=families[f];body=f"Owner: `{x['primary_owner']}`. G1 next step: `{x['g1_commercial_owner']}`.\n\n{x['reason']}\n\nDisposition: {x['role']}. Existing scope retained unless included in the eight changed routes. Equipment and exact diagnostic access require vehicle confirmation."
 else:body=text[n]
 sections.append((title,body))
md('g2-generic-problems-final-report.md',sections)

# Required working-path companions, identical to final registers where appropriate.
for source,target in [('g2-generic-problem-inventory.csv','generic-problem-inventory.csv'),('g2-brand-generic-problem-boundary.md','brand-generic-problem-boundary.md'),('g2-new-problem-url-decisions.md','g2-new-problem-url-decisions.md')]:
 (O/target).write_bytes((R/source).read_bytes())
counts['urgency_scenarios']=dict(Counter(x[0] for x in scenarios));counts['cannibalization_classes']=dict(Counter(x['classification'] for x in cann));counts['brand_relationships']=sum(bool(x['brand_competitor']) for x in cann)
(O/'final-counts.json').write_text(json.dumps(counts,ensure_ascii=False,indent=2),encoding='utf-8')
(O/'git-diff-summary.json').write_text(json.dumps(diff,indent=2),encoding='utf-8')
(O/'git-diff-stat.txt').write_text(git('diff','--stat',HEAD),encoding='utf-8')
(O/'git-diff-name-only.txt').write_text(git('diff','--name-only',HEAD),encoding='utf-8')
(O/'final-git-status.txt').write_text(git('status','--short'),encoding='utf-8')
print(json.dumps(counts,ensure_ascii=False,indent=2));print(json.dumps(diff,indent=2))
