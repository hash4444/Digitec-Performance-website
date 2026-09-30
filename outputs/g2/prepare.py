import json,re,gzip
from pathlib import Path
from collections import Counter
from lxml import html
O=Path(__file__).parent; R=O.parents[1]
load=lambda p:json.loads(p.read_text(encoding='utf-8'))
# Reuse the validated, committed G1 final render as the G2 baseline; no historical pre-brand state.
pages=load(R/'outputs/g1/after-pages.json')
for p in pages:p['htmlFile']='../g1/'+p['htmlFile']
(O/'baseline-pages.json').write_text(json.dumps(pages),encoding='utf-8')
(O/'baseline-routes.json').write_text((R/'outputs/g1/after-routes.json').read_text(encoding='utf-8'),encoding='utf-8')
(O/'baseline.json').write_text(json.dumps(dict(G2_BASELINE_HEAD='bbca5e0dbd49b0ff7ef9b7873aa09b2e2e600c9c',branch='main',initialWorkingTree='clean before G2 evidence extraction',typecheck='PASS',build='PASS',routeCount=len(pages),sitemapCanonicalCount=996,evidence='Approved G1 final output and precommit validation; reused as instructed, no baseline setup repeated'),indent=2),encoding='utf-8')
def norm(s):
 s=s.lower().replace('’',"'").replace('won’t',"won't")
 s=re.sub(r'\bgearbox\b','transmission',s)
 s=re.sub(r'\btires?\b','tyre',s)
 s=re.sub(r'touch[ -]screen','touchscreen',s)
 return re.sub(r'\s+',' ',s).strip()
brand=re.compile(r'mercedes|benz|amg|porsche|porche|bmw|ferrari|lamborghini|rolls|bentley|bently|maybach|range.rover|land.rover|defender|jaguar|cadillac|volkswagen|\bvw\b|jetour|\brox\b|audi|toyota|lexus|nissan|honda|ford|chevrolet|chevy|dodge|tesla|maserati|mclaren|aston|volvo|mini\b|kia\b|hyundai|jeep|gmc|infiniti|infinity|renault|peugeot|suzuki|mazda|mitsubishi|chrysler|bugatti|byd|hummer|genesis|lincoln|fiat|alfa|subaru|skoda|\b(dsg|pdk|airmatic|pasm|pdcc|cue|comand|xentry|ista|piwis|odis|mbux|idrive|vag|jlr|epc|srs|srx|xts)\b|مرسيدس|بورش|بنتلي|روكس|رنج|فولكس|جيتور|جاكوار|تويوتا|فورد|بي ام|أودي')
patterns=[
 ('No-start',r'no.?start|no.?crank|won.t start|not start|cranks? but|starts? then (dies|stalls)|car starting problem'),
 ('Battery drain',r'battery.*(drain|dying|discharg|dead|flat)|parasitic'),
 ('Battery warning',r'battery.*(warning|light)|charging.*(warning|fault|problem)'),
 ('Oil pressure',r'oil pressure|low oil|oil warning'),
 ('Check-engine warning',r'check.engine|engine (warning|light)|dashboard warning'),
 ('Misfire / rough idle',r'misfir|rough idle|idle.*(shak|vibrat)|stalling'),
 ('Overheating',r'overheat|high.*temperature|temperature.*high'),
 ('Coolant leak',r'coolant.*(leak|low|loss)|water leak|losing coolant'),
 ('Oil leak',r'oil.*leak|leaking oil'),
 ('Smoke',r'smoke|burning smell'),
 ('Transmission symptoms',r'(transmission|gear|clutch).*(jerk|slip|shudder|warning|not shift|hard shift|delay|problem|fault|leak)|gear shifting|delayed.*engagement'),
 ('AC cooling / airflow',r'(\bac\b|air con|aircon|air conditioning).*(not|warm|weak|smell|problem|leak)|weak airflow|مو بارد'),
 ('Suspension symptoms',r'(suspension|car).*(\blean|sitting low|drop|clunk)|suspension.*(noise|fault|warning|problem)|harsh ride'),
 ('Steering symptoms',r'steering.*(vibrat|shak|heavy|stiff|noise|problem|pull)|heavy steering|car pulls|pulling.*side'),
 ('Brake symptoms',r'brak.*(squeak|grind|vibrat|shak|noise|warning|soft|pull|problem)|soft.*pedal|abs.*(light|warning)'),
 ('Screen / head-unit fault',r'(screen|touchscreen|display|head.unit|infotainment).*(black|froz|freez|blank|restart|not|fault|problem)|no (audio|sound)|ghost touch'),
 ('Camera fault',r'camera.*(not|no signal|black|fault|problem|distort)'),
 ('Soft-close fault',r'soft.close.*(not|malfunction|fault|problem)'),
 ('Power loss / boost',r'loss of power|losing power|poor acceleration|boost.*(loss|leak|low)|loss of boost|turbo.*whist'),
 ('Exhaust noise',r'exhaust.*(noise|rattl|loud|smell|leak)'),
 ('Tyre / wheel symptoms',r'puncture|tyre.*(losing|flat|slow|vibrat)|wheel.*vibrat'),
 ('Vibration',r'shak|vibrat'),('Engine noise',r'engine.*(noise|knock|rattl)'),
 ('Electrical symptoms',r'flicker|electrical.*(fault|problem)|multiple.*warning'),
]
rows=[]
for x in load(O/'all-source-observations.json'):
 k=norm(x['keyword']); fam=next((n for n,p in patterns if re.search(p,k)),None)
 if fam:rows.append({**x,'normalized_keyword':k,'problem_family':fam,'brand_specific':bool(brand.search(k))})
(O/'symptom-candidates.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print('Candidate observations:',len(rows),'generic normalized:',len({x['normalized_keyword'] for x in rows if not x['brand_specific']}))
for fam in dict(patterns):
 terms=sorted({x['normalized_keyword'] for x in rows if x['problem_family']==fam and not x['brand_specific']})
 print(fam,':', '; '.join(terms))
