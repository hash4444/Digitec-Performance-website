"""Read all keyword sheets/exports; preserve observations and assign pre-edit G1 owners."""
import csv, gzip, hashlib, json, re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit
import openpyxl
from lxml import html

R=Path(__file__).resolve().parents[2]; O=R/'outputs/g1'; DL=Path('C:/Users/ADMIN/Downloads')
WB=DL/'DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx'
pages={p['path']:p for p in json.loads((O/'baseline-pages.json').read_text(encoding='utf-8'))}
S='/services/'
F={
'Broad workshop':('/', 'Independent workshop overview; navigation to individual services'),
'Workshop selection':('/best-car-workshop-dubai','Workshop selection criteria, not broad booking ownership'),
'Garage visit':(S+'car-garage-dubai','Planning a workshop visit and approved repair scope'),
'Local access':(S+'garage-near-me-dubai','Al Quoz access and contact, not fictional local branches'),
'Diagnostics':(S+'car-diagnostics-dubai','Fault investigation and supported data; repair separate'),
'Electrical':(S+'auto-electrical-repair-dubai','Circuit, wiring, charging and electrical repair'),
'Mechanical':(S+'mechanical-repair-dubai','Mechanical inspection and confirmed repair'),
'Engine':(S+'mechanical-repair-dubai','Engine work within existing mechanical owner'),
'Engine rebuild':(S+'mechanical-repair-dubai','Selected engine-rebuild work stated on existing page; exact scope confirmed'),
'Transmission repair':(S+'transmission-repair-dubai','Gearbox repair after diagnosis; system-specific scope'),
'Transmission maintenance':(S+'transmission-repair-dubai','Separate fluid/filter maintenance section within repair owner'),
'Mechatronic / DCT / DSG':(S+'transmission-repair-dubai','Generic transmission system assessment; VW DSG relationship retained'),
'Suspension':(S+'suspension-repair-dubai','Conventional/adaptive suspension assessment'),
'Air suspension':(S+'suspension-repair-dubai','Distinct air-suspension section within existing suspension owner'),
'Steering':(S+'steering-repair-dubai','Steering assistance/rack task'),
'Brakes':(S+'brake-repair-dubai','Measured wear and brake-service task'),
'AC repair':(S+'car-ac-repair-dubai','Cabin AC fault inspection and repair'),
'AC recharge':(S+'car-ac-repair-dubai','Refrigerant service follows identification and leak assessment'),
'Battery':(S+'battery-replacement-dubai','Low-voltage battery testing/fitting; registration only if applicable'),
'Oil change':(S+'oil-change-dubai','Engine oil and filter maintenance'),
'Routine service':(S+'car-service-dubai','Scheduled maintenance beyond oil alone'),
'Cooling / radiator':(S+'mechanical-repair-dubai','Cooling-system section under mechanical'),
'Turbo repair':(S+'mechanical-repair-dubai','Turbo assessment within mechanical; scope confirmed'),
'Fuel system':(S+'fuel-system-repair-dubai','Fuel-system checks and confirmed repair'),
'Exhaust repair':(S+'exhaust-repair-dubai','Leaks and damaged exhaust components; modifications separate'),
'Body / collision':(S+'car-body-repair-dubai','Damage restoration, dents and paint repair; protection deferred'),
'Tyres':(S+'tire-repair-dubai','Tyre/tire spelling variants share puncture/replacement owner'),
'Wheel alignment / balancing':(S+'tire-repair-dubai','Existing fitment/balancing/alignment scope; not new page'),
'Screen repair':(S+'auto-electrical-repair-dubai','Display/touchscreen assessment section; head unit separate'),
'Head unit':(S+'head-unit-repair-dubai','Existing generic head-unit assessment with protected COMAND relationship'),
'Audio repair':(S+'head-unit-repair-dubai','Audio fault assessment; amplifier/circuit causes considered'),
'Audio upgrade':('', 'Only existing Mercedes upgrade scope verified; generic multi-brand scope unverified'),
'Reverse camera repair':(S+'auto-electrical-repair-dubai','Camera power/wiring/display inspection section; installation separate'),
'Reverse camera installation':('', 'No verified generic installation capability; do not infer from repair'),
'Soft-close repair':(S+'soft-close-door-repair-dubai','Generic fitted-system repair, preserve B9 ROX installation owner'),
'Soft-close installation':(S+'soft-close-door-repair-dubai','Existing generic compatibility enquiry; ROX fitting remains brand-specific'),
'Coding / programming':(S+'car-diagnostics-dubai','Supported functions require vehicle/module/access confirmation'),
'ECU repair':(S+'auto-electrical-repair-dubai','Module/circuit assessment; component repair only after supported scope confirmed'),
'Key programming':('', 'No independently verified key-service capability; excluded'),
'Performance tuning':('/tuning','Existing GAD Motors relationship and project consultation'),
'Performance exhaust':('/tuning','Agreed project consultation; not generic exhaust repair'),
'Infotainment upgrades':('', 'Generic CarPlay/Android retrofit capability unverified'),
'High-voltage service':('', 'High-voltage/traction-battery capability unverified'),
'Body electronics':(S+'auto-electrical-repair-dubai','Window, door, seat electrical mechanisms within scope'),
'Pre-purchase inspection':('', 'Separate pre-purchase inspection offering not established by routine inspection'),
'Roadside assistance':(S+'roadside-assistance-dubai','Existing roadside enquiry page; availability confirmed'),
'Wheel / rim repair':('', 'Rim restoration distinct from tyre balancing; capability unverified'),
}

def norm(s):
 s=str(s or '').casefold().replace('’',"'").replace('–','-').replace('—','-')
 for a,b in [(r'\brepairs?\b','repair'),(r'\brepairing\b','repair'),(r'\bservicing\b','service'),(r'\btires?\b','tyre'),(r'\btyres\b','tyre'),(r'\bcenters?\b','centre'),(r'\btouch[ -]screen\b','touchscreen'),(r'\bair[ -]conditioning\b','ac'),(r'\bdiagnostic\b','diagnostics'),(r'\bgearbox\b','transmission'),(r'\bback[ -]?up camera\b','reverse camera'),(r'\bsoft-close\b','soft close'),(r'\bin dubai\b','dubai')]:s=re.sub(a,b,s)
 return re.sub(r'\s+',' ',re.sub(r'[^\w\s+\-/\']',' ',s)).strip()

brand_patterns=r'\b(mercedes|benz|amg|porsche|bmw|ferrari|lamborghini|rolls[ -]?royce|rollsroyce|bentley|maybach|range[ -]?rover|land[ -]?rover|defender|jaguar|cadillac|volkswagen|vw|jetour|rox\s*0?1?|aston[ -]?martin|mclaren|audi|volvo|bugatti|chrysler|jeep|toyota|lexus|nissan|honda|ford|chevrolet|chevy|dodge|tesla|byd|maserati|pagani|mini|kia|hyundai|renault|peugeot|suzuki|gmc|infiniti|mazda|mitsubishi|xentry|piwis|ista|cue|comand|airmatic|pasm|pdk)\b'
brand_services={x.removeprefix('/brands/').removesuffix('-service-dubai'):x for x in pages if x.startswith('/brands/') and x.count('/')==2}

def brand_owner(k):
 if re.search(r'\bcue\b',k):return S+'cadillac-cue-screen-repair-dubai'
 if re.search(r'\bcomand\b',k):return S+'head-unit-repair-dubai'
 if re.search(r'\b(xentry|airmatic)\b',k):return S+('mercedes-diagnostics-dubai' if 'xentry' in k else 'mercedes-suspension-repair-dubai')
 for label,p in brand_services.items():
  if label.replace('-',' ') in k or label in k:return p
 return ''

patterns=[
('High-voltage service',r'high voltage|traction battery|battery pack|charging system|electric drive unit|inverter repair'),
('Key programming',r'key (program|cod|replacement)|smart key|replacement key|key fob'),
('Infotainment upgrades',r'carplay|android auto|infotainment (upgrade|retrofit)'),
('Soft-close installation',r'soft close.*(install|retrofit|compatib)'),('Soft-close repair',r'soft close'),
('Reverse camera installation',r'(camera.*(install|retrofit)|install.*camera)'),('Reverse camera repair',r'camera'),
('Audio upgrade',r'(audio|stereo|speaker|sound system).*(upgrade|install)|upgrade.*(audio|stereo)'),
('Head unit',r'head[ -]?unit|command unit|navigation repair|infotainment repair'),('Screen repair',r'touchscreen|screen|display repair'),('Audio repair',r'audio|stereo|speaker|amplifier'),
('Performance exhaust',r'exhaust.*(upgrade|modif|performance)'),
('Performance tuning',r'\btun(e|ing|er)|remap|stage [12]|dyno|performance (upgrade|workshop)|gad|turbo upgrade'),
('ECU repair',r'(ecu|control module|module|computer) repair'),('Coding / programming',r'programming|\bcoding\b|\bcod(e|ing) service'),
('Transmission maintenance',r'transmission.*(service|fluid|oil|maintenance)|(?:fluid|oil).*transmission'),
('Mechatronic / DCT / DSG',r'mechatronic|\bdsg\b|\bdct\b|dual clutch|clutch repair'),('Transmission repair',r'transmission|\bcvt\b|torque converter'),
('Wheel alignment / balancing',r'alignment|balancing'),('Wheel / rim repair',r'(wheel|rim) repair'),('Tyres',r'\btyre\b|puncture|tpms'),
('Air suspension',r'air suspension|air strut|air spring'),('Suspension',r'suspension|shock absorber|strut|control arm|bushing'),('Steering',r'steering'),
('Brakes',r'brake|\babs\b|caliper|rotor'),('AC recharge',r'\bac\b.*(gas|refill|regas|recharge)|refrigerant|regas'),('AC repair',r'\bac\b|climate|air con'),
('Oil change',r'oil (change|service|filter)|engine oil'),('Battery',r'battery|batteries'),
('Diagnostics',r'diagnos|scanning|\bscan\b|fault code|fault diagnosis'),
('Body electronics',r'sunroof|window regulator|power window|door lock|tailgate|boot repair|seat (repair|motor)|keyless entry|instrument cluster'),
('Electrical',r'electri|wiring|alternator|starter|sensor replacement|communication fault'),
('Cooling / radiator',r'cooling|radiator|water pump|thermostat|coolant'),('Turbo repair',r'turbo'),('Fuel system',r'fuel|injector'),('Exhaust repair',r'exhaust|muffler|catalytic|emission|oxygen sensor'),
('Body / collision',r'body|collision|accident|dent|bumper|scratch|panel repair|paint repair|car paint(ing)?\b'),
('Engine rebuild',r'engine (rebuild|overhaul)'),('Engine',r'engine|timing chain|timing belt|gasket'),('Mechanical',r'mechanical|drivetrain|driveline'),
('Pre-purchase inspection',r'pre[ -]?purchase|\bppi\b|used car inspection'),('Roadside assistance',r'roadside|recovery|towing'),
('Routine service',r'minor service|major service|maintenance|service package|car service|scheduled|periodic|filter replacement|spark plug'),
('Workshop selection',r'\bbest\b|top rated'),('Local access',r'near me|nearby'),('Garage visit',r'\bgarage\b'),('Broad workshop',r'workshop|car repair|auto repair|auto service|automotive|service centre|specialist|\bdigitec\b|digi tec'),
]

def classify(raw,context=''):
 k=norm(raw)
 if re.search(r'\b(alfa romeo|fiat|saab|infinity|jlr|vag|vcds|pccb|srx|xts|f1 transmission|mb service)\b',k):return 'BRAND','Brand-first','','','Brand/model/system intent; excluded from generic demand'
 if re.search(r'free |delivery|at home|mobile ecu|industrial transmission|fuel system design|spare parts|repair parts|resonator delete|suspension upgrades|steering wheel restoration|car dvd installation|car fabrication|emission test|488 auto|gts car|digital solutions',k):return 'EXCLUDED','Unsupported or unrelated scope','','','Specific requested commercial capability is not verified; no implied mobile, free, industrial, retail or modification service'
 if re.search(r'paint film|paint shield',k):return 'G3','Protection','','','Protection product intent reserved for G3'
 if re.search(r'frenos',k):return 'G1','Brakes',F['Brakes'][0],'','Spanish brake wording shares brake-service intent'
 if re.search(r'vulcaniz',k):return 'G1','Tyres',F['Tyres'][0],'','Tyre repair terminology; repair eligibility still requires inspection'
 if re.search(r'ras al khaimah',k):return 'EXCLUDED','Out-of-market','','','Outside Dubai service intent'
 # Query-text aliases are evidence of brand intent even when the workbook labels them generic.
 if re.search(r'7g tronic|9g tronic|idrive|incontrol|mbux|pcm repair|pdcc|pivi pro|manettino|e gear|spirit of ecstasy|sport chrono|starlight headliner|terrain response|valvetronic|vanos|xdrive|bently|porche|merceds|mersedes|brabus|genesis|hummer|lincoln|lotus|subaru|teslaservice|بورش|مرسيدس|اود[ىي]|أودي|بنتل[ىي]|بي ام|رنج روفر|جيتور|جاكوار|جيب|دودج|روكس|رولز|فورد|فولكس|لينكو|مازدا|تويوتا|بي واي دي|مينى',k):
  return 'BRAND','Brand-first','','','Brand/model/system alias; preserve brand intent and do not assign generic demand'
 if re.search(brand_patterns,k):return 'BRAND','Brand-first','',brand_owner(k),'Protected brand-first/tool intent; no G1 re-optimization'
 if re.search(r'protec|paint coat|paint prtection|حماية',k):return 'G3','Protection','','','Protection/detailing task deferred to G3'
 if re.search(r'\b(ppf|ceramic|polish|detailing|paint protection|paint correction|coating|window tint)',k):return 'G3','Protection','', '', 'Protection/detailing ecosystem deferred to G3'
 if re.search(r'loss of power|misfire|overheating|gear shifting problem|مو بارد',k):return 'G2','Symptom','',F['Diagnostics'][0],'Problem-first intent reserved for G2 even when phrased as repair'
 aliases=[('Oil change',r'change oil|oil and filter change|تبديل زيت|تغيير زيت|غيار زيت'),('Transmission repair',r'gear box'),('AC repair',r'aircon|تكييف'),('AC recharge',r'gas refill'),('Tyres',r'puncher'),('Steering',r'rack and pinion'),('Exhaust repair',r'silencer'),('Brakes',r'break repair|break centre|بريكات|فرامل'),('Battery',r'بطارية'),('Suspension',r'تعليق|ride height adjustment'),('Wheel alignment / balancing',r'زوايا العجلات'),('Mechanical',r'الميكانيكي'),('Roadside assistance',r'road assistance|المساعدة على الطريق'),('Garage visit',r'garages|كراج سيارات'),('Local access',r'ورشة سيارات قريبة'),('Routine service',r'^car inspection$|^vehicle inspection$|cost of service'),('Body electronics',r'car door repair|deployable side step|rear entertainment|sticky buttons'),('Performance tuning',r'^performance$|performance centre|performance dubai|local performance shop|car code performance'),('Electrical',r'ecu fix|ecu centre|eletronic drive')]
 alias=next((f for f,p in aliases if re.search(p,k)),None)
 if alias:return 'G1',alias,F[alias][0],'',F[alias][1]
 if re.search(r'ambient lighting upgrade|lift system repair|ride installation|modification and outfitting|ev oem',k):return 'EXCLUDED','Unverified offering','','','No verified matching generic commercial capability; do not promote'
 fam=next((name for name,pat in patterns if re.search(pat,k)),None)
 if re.search(r'not (working|cooling|shifting|starting)|won.t start|keeps dying|overheating|jerk|shudder|slip|squeak|grind|shak|warning light|check engine|oil leak|loss of power|rough idle|misfire',k) and not re.search(r'repair|replacement|service|diagnos|inspection',k):
  return 'G2',fam or 'Symptom','',F.get(fam,('',''))[0],'Symptom-first task deferred to G2; commercial owner may support'
 if re.search(r'\b(abu dhabi|sharjah|ajman|fujairah|al ain|riyadh|doha)\b',k):return 'EXCLUDED',fam or 'Out-of-market','', '', 'Outside Dubai service intent; no location doorway'
 if re.search(r'\b(job|jobs|salary|vacancy|rental|rent a|buy a|for sale|used cars for sale|download|manual pdf)\b',k):return 'EXCLUDED',fam or 'Non-service','', '', 'Non-service or unrelated intent'
 if fam:
  owner,why=F[fam]
  return 'G1',fam,owner,'',why
 if k in ('repair','service','maintenance','specialist','service centre'):return 'EXCLUDED','Underspecified','', '', 'Taxonomy token lacks a sufficiently specific automotive task'
 return 'EXCLUDED','Underspecified / unrelated','', '', 'Reviewed query does not establish a specific in-scope commercial service task; no invented owner'

records=[]; inventory=[]
def add(q,source,file,period,evidence,metrics=('',)*4,context='',original=False):
 if not isinstance(q,str) or not q.strip():return
 scope,fam,owner,support,reason=classify(q,context)
 records.append(dict(keyword=q,normalized_keyword=norm(q),source=source,source_file=file,source_period=period,measured_or_generated=evidence,gsc_clicks=metrics[0] or (0 if metrics[0]==0 else ''),gsc_impressions=metrics[1] or (0 if metrics[1]==0 else ''),gsc_ctr=metrics[2] or (0 if metrics[2]==0 else ''),gsc_position=metrics[3] or (0 if metrics[3]==0 else ''),scope=scope,commercial_intent=fam,service_family=fam,primary_owner=owner,supporting_owner=support,brand_relationship='Protected brand owners; service-first generic task' if scope=='G1' else 'Protected existing owner' if scope=='BRAND' else '',coverage_class='PRE-EDIT OWNER ASSIGNED' if owner else 'COVERED — BRAND OWNER' if scope=='BRAND' and support else 'DEFERRED — G2 SYMPTOM' if scope=='G2' else 'DEFERRED — G3 PROTECTION' if scope=='G3' else 'GAP — REVIEW REQUIRED' if scope=='REVIEW' else 'NOT TARGETED — INTENTIONALLY',reason=reason,original_gsc=original,context=context))

w=openpyxl.load_workbook(WB,read_only=True,data_only=True)
for sheet in w:
 rows=list(sheet.values);inventory.append(dict(file=WB.name,sheet=sheet.title,rows=len(rows)-1,columns=len(rows[0]),headers=rows[0]))
 if sheet.title=='Master Keywords':
  for n,row in enumerate(rows[1:],2):add(row[0],f'{sheet.title}!A{n}',WB.name,'Workbook-derived GSC; see original exports' if row[7]=='Existing GSC query' else '', 'MEASURED GSC' if row[7]=='Existing GSC query' else 'GENERATED TAXONOMY' if row[7]=='Generated taxonomy' else 'RESEARCH',row[8:12] if row[7]=='Existing GSC query' else ('',)*4,context=str(row[1:8]))
 elif sheet.title=='GSC Opportunities':
  for n,row in enumerate(rows[1:],2):add(row[0],f'{sheet.title}!A{n}',WB.name,'Workbook-derived GSC; not additive','MEASURED GSC',row[2:6],context=str(row[1]))
 elif sheet.title=='Service Taxonomy':
  for n,row in enumerate(rows[1:],2):add(row[1],f'{sheet.title}!B{n}',WB.name,'','GENERATED TAXONOMY',context=row[0])
 elif sheet.title=='Brand Specific Systems':
  for n,row in enumerate(rows[1:],2):add(f'{row[0]} {row[1]}',f'{sheet.title}!B{n}',WB.name,'','RESEARCH')
 elif sheet.title=='Page Strategy':
  for n,row in enumerate(rows[1:],2):
   for example in str(row[2] or '').split(';'):add(example,f'{sheet.title}!C{n}',WB.name,'','RESEARCH')

duplicates=[]; signatures={}; originals=[]
for p in sorted(DL.glob('digitecme.com-Performance*.xlsx')):
 g=openpyxl.load_workbook(p,read_only=True,data_only=True)
 sheets={s.title:list(s.values) for s in g};digest=hashlib.sha256(json.dumps(sheets,default=str,ensure_ascii=False).encode()).hexdigest()
 filters=dict(sheets.get('Filters',[])[1:]);dates=[str(z[0])[:10] for z in sheets.get('Chart',[])[1:] if z and z[0]];period=f'{min(dates)} to {max(dates)}' if dates else 'Unavailable'
 entry=dict(file=p.name,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),tabular_sha256=digest,filters=filters,period=period,sheets={k:len(v)-1 for k,v in sheets.items()},duplicate_of=signatures.get(digest))
 originals.append(entry)
 if digest in signatures:duplicates.append(entry);continue
 signatures[digest]=p.name
 for n,row in enumerate(sheets.get('Queries',[])[1:],2):add(row[0],f'Queries!A{n}',p.name,period,'MEASURED GSC',row[1:5],context=json.dumps(filters),original=True)
 if 'Last 6 months'==filters.get('Date') and not filters.get('Query'):
  (O/'gsc-six-month-pages.json').write_text(json.dumps(sheets.get('Pages',[]),default=str,ensure_ascii=False),encoding='utf-8')

# Explicit query examples only; instruction prose and output paths are not keywords.
for q in ['car electrical repair Dubai','transmission repair Dubai','transmission service Dubai','car AC repair Dubai','car diagnostics Dubai','air suspension repair Dubai','screen repair Dubai','head unit repair Dubai','reverse camera repair Dubai','reverse camera installation Dubai','soft close repair Dubai','soft close installation Dubai','ECU repair Dubai','ECU programming Dubai','key programming Dubai','car won’t start','car overheating','gearbox jerking','transmission slipping','battery keeps dying','AC not cooling','check engine light','car shaking','oil leak','PPF','ceramic coating','paint correction']:
 add(q,'Explicit G1 brief query example','G1 user brief','','BRIEF EXAMPLE')

def csvwrite(name,fields,rows):
 with (O/name).open('w',encoding='utf-8-sig',newline='') as f:
  z=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');z.writeheader();z.writerows(rows)

(O/'source-inventory.json').write_text(json.dumps(dict(workbook=inventory,exports=originals,duplicates=duplicates),ensure_ascii=False,indent=2),encoding='utf-8')
(O/'all-keyword-observations.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
selected=[x for x in records if x['scope']!='BRAND']
fields='keyword normalized_keyword source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position commercial_intent service_family primary_owner supporting_owner brand_relationship coverage_class reason'.split()
csvwrite('generic-service-owner-records.csv',fields,selected)
csvwrite('manual-review-keywords.csv',fields,[x for x in records if x['scope']=='REVIEW'])
(O/'taxonomy.json').write_text(json.dumps(F,ensure_ascii=False,indent=2),encoding='utf-8')
summary=dict(total_observations=len(records),scope_observations=dict(Counter(x['scope'] for x in records)),scope_normalized={s:len({x['normalized_keyword'] for x in records if x['scope']==s}) for s in {x['scope'] for x in records}},generic_families=dict(Counter(x['service_family'] for x in selected)),original_measured_generic_terms=len({x['normalized_keyword'] for x in selected if x['original_gsc']}))
(O/'extraction-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
