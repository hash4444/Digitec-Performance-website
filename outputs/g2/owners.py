"""Pre-edit symptom decisions. Generic commercial pages remain commercial owners."""
import json,csv,re,gzip
from pathlib import Path
from lxml import html
from prepare import norm,brand,patterns
O=Path(__file__).parent;R=O.parents[1]
load=lambda n:json.loads((O/n).read_text(encoding='utf-8'))
S='/services/';B='/blog/'
# family, primary owner, G1 next step, role, distinct context / decision
spec=[
('No-start',S+'car-diagnostics-dubai',S+'car-diagnostics-dubai','commercial','Separate no crank, cranks without firing and starts then dies; electrical testing when no crank. No new URL from brief examples alone.'),
('Battery drain',B+'car-battery-life-dubai-heat',S+'auto-electrical-repair-dubai','section','Repeated-discharge section within existing battery guide, then electrical assessment rather than automatic replacement.'),
('Battery warning',S+'auto-electrical-repair-dubai',S+'auto-electrical-repair-dubai','commercial','Warning is a charging/electrical task; low-voltage battery replacement only after testing.'),
('Oil pressure',S+'mechanical-repair-dubai',S+'mechanical-repair-dubai','deferred','Dedicated warning explanation deferred; urgent warning must follow exact vehicle manual, not oil-change marketing.'),
('Check-engine warning',B+'check-engine-light-dubai-guide',S+'car-diagnostics-dubai','problem','Warning interpretation and conditional urgency, then diagnostic assessment; cost queries remain commercial.'),
('Misfire / rough idle',S+'car-diagnostics-dubai',S+'car-diagnostics-dubai','commercial','Investigate running fault; mechanical repair follows findings. Do not presume ignition component failure.'),
('Overheating',B+'engine-overheating-dubai-what-to-do',S+'mechanical-repair-dubai','problem','Immediate safety and temperature context; distinct from coolant leak without temperature rise.'),
('Coolant leak',S+'mechanical-repair-dubai',S+'mechanical-repair-dubai','commercial','Locate fluid loss; related overheating guide supports urgency, not a claim all leaks cause overheating.'),
('Oil leak',S+'mechanical-repair-dubai',S+'mechanical-repair-dubai','commercial','Identify source and severity; distinguish fluid loss from oil-pressure warning.'),
('Smoke',S+'mechanical-repair-dubai',S+'mechanical-repair-dubai','deferred','White, blue and black exhaust smoke and engine-bay smoke remain separate observations. No measured generic case for a new page; colour alone does not diagnose.'),
('Transmission symptoms',S+'transmission-repair-dubai',S+'transmission-repair-dubai','commercial','Jerking, slipping, delayed engagement and warning are distinct contexts within fault assessment; maintenance is separate.'),
('AC cooling / airflow',B+'car-ac-not-cold-dubai-causes',S+'car-ac-repair-dubai','problem','Cooling output, weak airflow, idle-only and one-side complaints are distinguished; no automatic regas or compressor verdict.'),
('Suspension symptoms',S+'suspension-repair-dubai',S+'suspension-repair-dubai','commercial','Noise, lean and low ride height are assessment contexts; air suspension only where fitted.'),
('Steering symptoms',S+'steering-repair-dubai',S+'steering-repair-dubai','commercial','Assistance and steering feel; speed-related wheel vibration also supports tyre/suspension assessment.'),
('Brake symptoms',S+'brake-repair-dubai',S+'brake-repair-dubai','commercial','Squeak, grinding, braking vibration and changed pedal feel are not interchangeable; no pad replacement from noise alone.'),
('Screen / head-unit fault',S+'auto-electrical-repair-dubai',S+'auto-electrical-repair-dubai','commercial','Display/touch symptoms to electrical; head-unit or no-audio task to existing head-unit owner; CUE stays Cadillac.'),
('Camera fault',S+'auto-electrical-repair-dubai',S+'auto-electrical-repair-dubai','commercial','Power, connection and display checks; repair distinct from unverified generic camera installation.'),
('Soft-close fault',S+'soft-close-door-repair-dubai',S+'soft-close-door-repair-dubai','commercial','Fault in fitted system, distinct from protected ROX installation and compatibility enquiry.'),
('Power loss / boost',S+'car-diagnostics-dubai',S+'car-diagnostics-dubai','commercial','Power loss is not proof of turbo failure; mechanical, fuel and transmission checks depend on findings.'),
('Exhaust noise',S+'exhaust-repair-dubai',S+'exhaust-repair-dubai','commercial','Noise/leak assessment, not exhaust modification or tuning.'),
('Tyre / wheel symptoms',S+'tire-repair-dubai',S+'tire-repair-dubai','commercial','Puncture/air loss and speed-related wheel concerns; repair eligibility requires inspection.'),
('Vibration',S+'car-diagnostics-dubai',S+'car-diagnostics-dubai','deferred','Broad unspecified shaking cannot choose one system; idle, road speed and braking contexts are separated before referral.'),
('Engine noise',S+'mechanical-repair-dubai',S+'mechanical-repair-dubai','commercial','Identify noise conditions and associated warnings; do not invent common component failures.'),
('Electrical symptoms',S+'auto-electrical-repair-dubai',S+'auto-electrical-repair-dubai','commercial','Circuit/voltage investigation; multiple warnings do not imply multiple failed modules.'),
]
families={f:dict(problem_family=f,primary_owner=p,g1_commercial_owner=g,role=role,reason=why) for f,p,g,role,why in spec}
examples={
'No-start':["car won't start",'car not starting','vehicle will not start','no crank',"cranks but won't start",'car starts then dies'],
'Battery drain':['battery keeps dying','battery drain'],'Battery warning':['battery warning','battery light'],
'Oil pressure':['oil pressure warning','low oil level'],'Check-engine warning':['check engine light','flashing check engine light','dashboard warning light'],
'Misfire / rough idle':['engine misfire','rough idle','car shaking at idle'],
'Overheating':['car overheating','high engine temperature'],'Coolant leak':['coolant leak','low coolant'],
'Oil leak':['oil leak'],'Smoke':['white exhaust smoke','blue exhaust smoke','black exhaust smoke','smoke from engine bay'],
'Transmission symptoms':['gearbox jerking','transmission slipping','transmission shuddering','delayed gear engagement','gearbox warning','transmission not shifting','hard gear shifts'],
'AC cooling / airflow':['AC not cooling','AC blowing warm air','weak airflow','AC works driving not idle','AC bad smell'],
'Suspension symptoms':['suspension noise','car leaning','car sitting low','harsh ride','suspension warning'],
'Steering symptoms':['heavy steering','steering wheel vibration at speed','car pulling to one side','steering wheel not centered'],
'Brake symptoms':['brake squeaking','brake grinding','brake vibration','soft brake pedal','ABS warning light','car pulling when braking'],
'Electrical symptoms':['multiple electrical warnings','flickering lights'],
'Screen / head-unit fault':['black screen','touchscreen not working','frozen screen','screen restarting','head unit not working','no audio'],
'Camera fault':['reverse camera not working','reverse camera no signal','reverse camera distorted image'],
'Soft-close fault':['soft-close door not working','soft-close malfunction'],
'Power loss / boost':['loss of power','poor acceleration','loss of boost','turbo whistle'],
'Exhaust noise':['exhaust rattling','loud exhaust','exhaust smell'],
'Tyre / wheel symptoms':['slow puncture','tyre losing air','flat tyre','wheel vibration'],
'Vibration':['car shaking','car vibration at speed','car shaking when braking'],
'Engine noise':['engine knocking','engine noise']}
rows=load('symptom-candidates.json')
for f,terms in examples.items():
 for q in terms:rows.append(dict(keyword=q,normalized_keyword=norm(q),source='Explicit G2 brief example',source_file='G2 user brief',source_period='',measured_or_generated='BRIEF EXAMPLE',gsc_clicks='',gsc_impressions='',gsc_ctr='',gsc_position='',original_gsc=False,brand_specific=False,problem_family=f))
out=[]
for x in rows:
 if x['brand_specific']:continue
 f=x['problem_family'];k=x['normalized_keyword']
 if k.startswith('abs '):f='Brake symptoms'
 if 'suspension warning' in k:f='Suspension symptoms'
 if 'braking' in k:f='Brake symptoms'
 if k=='car vibration at speed':f='Tyre / wheel symptoms'
 m=families[f].copy()
 if ('head unit' in k or 'no audio' in k):m.update(primary_owner=S+'head-unit-repair-dubai',g1_commercial_owner=S+'head-unit-repair-dubai')
 if 'diagnostic cost' in k:m.update(primary_owner=S+'car-diagnostics-dubai',g1_commercial_owner=S+'car-diagnostics-dubai',role='commercial')
 if k=='ac leak repair':m.update(primary_owner=S+'car-ac-repair-dubai',g1_commercial_owner=S+'car-ac-repair-dubai',role='commercial')
 if 'مو بارد' in k:m.update(primary_owner='/ar'+m['primary_owner'],g1_commercial_owner='/ar'+m['g1_commercial_owner'])
 coverage='COVERED — PRIMARY PROBLEM PAGE' if m['role']=='problem' else 'COVERED — PROBLEM SECTION' if m['role']=='section' else 'DEFERRED — INSUFFICIENT EVIDENCE' if m['role']=='deferred' else 'COVERED — G1 COMMERCIAL OWNER'
 out.append({**x,**m,'problem_intent':k,'supporting_owner':S+'car-diagnostics-dubai' if m['g1_commercial_owner']!=S+'car-diagnostics-dubai' else S+'auto-electrical-repair-dubai','brand_relationship':'Generic task only; brand-specific warnings and models retain B1–B9 owners','coverage_class':coverage,'coverage_location':'Existing commercial fault-assessment scope; not a dedicated problem page' if m['role']=='commercial' else 'Existing symptom guide' if m['role']=='problem' else 'Future research; commercial enquiry path only','g2_action':'Improve guide safety and commercial path' if m['role']=='problem' else 'RETAINED' if m['role']=='commercial' else 'Defer dedicated explanation; no new URL','notes':'Editorial owner is not historical ranking URL. Metrics remain per source observation; overlapping windows are not summed.'})
(O/'owner-decisions.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
(O/'family-decisions.json').write_text(json.dumps(families,ensure_ascii=False,indent=2),encoding='utf-8')
fields='keyword normalized_keyword source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position problem_intent problem_family primary_owner supporting_owner g1_commercial_owner brand_relationship coverage_class reason'.split()
with (O/'generic-problem-owner-records.csv').open('w',encoding='utf-8-sig',newline='') as stream:
 w=csv.DictWriter(stream,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(out)
text='# Pre-implementation problem owner map\n\nBaseline: bbca5e0dbd49b0ff7ef9b7873aa09b2e2e600c9c. No new URL is proposed. Brand candidates excluded from generic demand and retained in symptom-candidates.json.\n\n| Family | Owner | G1 next step | Decision |\n|---|---|---|---|\n'
for f,p,g,role,why in spec:text+=f'| {f} | {p} | {g} | {role}: {why} |\n'
(O/'generic-problem-owner-map.md').write_text(text,encoding='utf-8')
print('Pre-edit generic observations',len(out),'normalized',len({x['normalized_keyword'] for x in out}),'families',len(families))
