"""Provenance-preserving B6 keyword observations and editorial owners."""
import csv, json, re
from collections import Counter, defaultdict
from pathlib import Path
import openpyxl

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/b6'
DOWNLOADS = Path('C:/Users/ADMIN/Downloads')
WORKBOOK = DOWNLOADS / 'DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx'
PAGES = {p['path'] for p in json.loads((OUT/'pages-baseline.json').read_text(encoding='utf-8'))}
BRANDS = {'Range Rover':'range-rover','Land Rover Defender':'defender','Defender':'defender','Jaguar':'jaguar'}
HUB = {b:f'/brands/{b}-service-dubai' for b in ('range-rover','defender','jaguar')}
SERVICE = lambda b,s:f'{HUB[b]}/{s}'

def norm(raw):
    s = str(raw or '').casefold().strip().replace('rangerover','range rover').replace('landrover','land rover')
    for a,b in [('centre','center'),('servicing','service'),('repairs','repair'),('gear box','gearbox')]: s=s.replace(a,b)
    return re.sub(r'\s+',' ',s)

def owner(b, keyword):
    k=norm(keyword)
    if re.search(r'\b(abu dhabi|sharjah|ajman|al ain)\b',k): return '', 'Outside Dubai', 'Out-of-market', 'Do not create a Dubai location doorway for another city'
    if re.search(r'\b(high.voltage|hv battery|battery pack repair|inverter repair|immobilizer|key programming|retrofit|subwoofer upgrade|ecu remap)\b',k): return '', 'Unverified exact capability', 'Unverified service', 'Neither keyword evidence nor existing copy verifies this exact workshop scope'
    if b=='jaguar' and 'i-pace' in k and re.search(r'\b(oil|spark plug|turbo|engine repair|gearbox oil)\b',k): return '', 'I-PACE combustion mismatch', 'Inapplicable task', 'I-PACE is electric'
    if b=='range-rover':
        if re.search(r'\b(best|compare|choose|choosing)\b',k) and re.search(r'workshop|garage|specialist',k): return '/best-range-rover-workshop-dubai','Workshop selection','Selection guide','Existing selection page has distinct checklist task'
        if re.search(r'\b(service cost|maintenance cost|interval|schedule|how often)\b',k): return '/blog/range-rover-maintenance-guide-dubai','Maintenance planning','Informational guide','Existing maintenance guide; no fixed universal interval'
        if re.search(r'\b(vogue|range rover sport)\b',k) and not re.search(r'\b(ac|brake|suspension|transmission|gearbox|diagnos|oil|battery|engine|body|electrical)\b',k):
            url='/blog/range-rover-vogue-service-dubai-guide' if 'vogue' in k else '/blog/range-rover-sport-service-dubai-guide'
            return url,'Model and generation planning','Model guide','Existing guide; Vogue terminology qualified by model/year'
        if re.search(r'\b(air suspension problem|suspension warning|sagging|dropping overnight|air suspension fault)\b',k): return '/blog/range-rover-land-rover-air-suspension-problems-dubai','Air-suspension symptom','Problem guide','Existing symptom guide supports suspension repair owner'
    if b=='defender':
        if re.search(r'\b(accident|collision|body repair)\b',k):
            if re.search(r'\b(case|story|example|photos)\b',k):return '/blog/best-defender-workshop-dubai','Accident repair case','Case guide','Existing route documents a real accident repair'
            return SERVICE(b,'body-repair'),'Defender body repair','Commercial service','Commercial body-repair route owns booking; accident case provides evidence'
        if re.search(r'\b(90|110|130|interval|schedule|service cost|maintenance cost)\b',k) and not re.search(r'\b(ac|brake|suspension|transmission|gearbox|diagnos|oil|battery|engine|electrical)\b',k): return '/blog/defender-service-dubai-guide','Defender model/maintenance planning','Informational guide','Existing guide covers 90/110/130 without thin variant routes'
        if re.search(r'\b(best|compare|choose|choosing)\b',k): return HUB[b],'Workshop selection section','Hub section','Existing accident case does not own broad selection intent'
    if b=='jaguar':
        if re.search(r'\b(best|compare|choose|choosing)\b',k) and re.search(r'workshop|garage|specialist',k): return '/blog/jaguar-best-workshop-dubai','Workshop selection','Selection guide','Existing selection guide'
        if re.search(r'\b(i-pace|f-pace|f-type|e-pace|\bxe\b|\bxf\b|\bxj\b)\b',k) and not re.search(r'\b(ac|brake|suspension|transmission|gearbox|diagnos|oil|battery|engine|electrical)\b',k): return HUB[b],'Jaguar model enquiry','Hub model section','No dedicated model route; do not manufacture one from a generated term'
    generic=[(r'\b(ppf|paint protection)\b','/services/paint-protection-dubai','Paint protection'),(r'\b(ceramic coating)\b','/services/ceramic-coating','Ceramic protection'),(r'\b(tuning|stage 1|stage 2)\b','/tuning','Performance enquiry')]
    for pat,url,label in generic:
        if re.search(pat,k): return url,label,'Cross-brand commercial','Existing generic owner; exact application confirmed first'
    services=[
      (r'\b(diagnos\w*|warning light|fault code|scan|sdd|pathfinder)\b','engine-diagnostics','Diagnostics'),
      (r'\b(gearbox|transmission|jerking|shift|clutch|driveline|4wd|differential|transfer case)\b','transmission-repair','Transmission/driveline'),
      (r'\b(suspension|air spring|air strut|compressor|ride height|damper|shock absorber|bushing)\b','suspension-repair','Suspension'),
      (r'\b(brake|abs)\b','brake-repair','Brakes'),(r'\b(oil change|oil service|engine oil)\b','oil-change','Oil service'),
      (r'\b(ac|air conditioning|condenser|climate control|refrigerant)\b','ac-repair','AC'),
      (r'\b(battery|charging|no.start|won.t start)\b','battery-replacement','Low-voltage battery'),
      (r'\b(electrical|module|wiring|sensor|screen|infotainment|camera|audio)\b','electrical-repair','Electrical'),
      (r'\b(body|bumper|paint repair|dent|panel)\b','body-repair','Body repair'),
      (r'\b(engine|mechanical|cooling|coolant|overheat|radiator|turbo|leak)\b','mechanical-repair','Mechanical/cooling'),
    ]
    for pat,slug,label in services:
        if re.search(pat,k):
            url=SERVICE(b,slug)
            if url not in PAGES:
                url={'electrical-repair':'/services/auto-electrical-repair-dubai','battery-replacement':'/services/battery-replacement-dubai','mechanical-repair':'/services/mechanical-repair-dubai','body-repair':'/services/car-body-repair-dubai'}.get(slug,HUB[b])
            if url not in PAGES: url=HUB[b]
            return url,f'{b} {label}','Commercial service' if url.startswith(HUB[b]+'/') else 'Hub/generic service section','Existing owner; vehicle-specific scope confirmed before booking'
    return HUB[b],f'{b} broad service and repair','Broad commercial','Distinct brand hub owns general enquiry'

records={b:[] for b in HUB}
def add(b,k,source,filename,period,evidence,metrics=('',)*4,context=''):
    if not k:return
    url,cluster,intent,reason=owner(b,k)
    if url and url not in PAGES: raise ValueError(f'Missing owner {url}: {k}')
    vals=[v if v is not None else '' for v in metrics]
    records[b].append(dict(raw_keyword=str(k),normalized_keyword=norm(k),brand=b,source=source,source_file=filename,source_period=period,measured_or_generated=evidence,gsc_clicks=vals[0],gsc_impressions=vals[1],gsc_ctr=vals[2],gsc_position=vals[3],search_intent=intent,cluster=cluster,primary_owner=url,reason=reason,context=context))

wb=openpyxl.load_workbook(WORKBOOK,read_only=True,data_only=True)
for n,row in enumerate(wb['Master Keywords'].values,1):
    if n==1 or row[1] not in BRANDS:continue
    e='MEASURED WORKBOOK' if row[7]=='Existing GSC query' else 'GENERATED TAXONOMY' if row[7]=='Generated taxonomy' else 'RESEARCH KEYWORD'
    add(BRANDS[row[1]],row[0],f'Master Keywords!A{n}',WORKBOOK.name,'2026-04-12 to 2026-09-25' if e=='MEASURED WORKBOOK' else '',e,row[8:12],str(row[2]))
for n,row in enumerate(wb['GSC Opportunities'].values,1):
    if n==1 or row[1] not in BRANDS:continue
    add(BRANDS[row[1]],row[0],f'GSC Opportunities!A{n}',WORKBOOK.name,'2026-04-12 to 2026-09-25','MEASURED WORKBOOK',row[2:6],'Workbook opportunity copy')
for n,row in enumerate(wb['Brand Specific Systems'].values,1):
    if n==1 or row[0] not in BRANDS:continue
    add(BRANDS[row[0]],f'{row[0]} {row[1]}',f'Brand Specific Systems!B{n}',WORKBOOK.name,'','RESEARCH KEYWORD',context='System suggestion')
for b,terms in {'range-rover':['Range Rover repair Dubai','Range Rover air suspension warning','Range Rover Sport service Dubai','Range Rover Vogue service Dubai','Range Rover service intervals Dubai'],'defender':['Defender 90 service Dubai','Defender 110 service Dubai','Defender 130 service Dubai','Defender air suspension repair Dubai','Defender 4WD warning'],'jaguar':['Jaguar repair Dubai','Jaguar diagnostics Dubai','Jaguar I-PACE service Dubai','Jaguar gearbox warning','Jaguar electrical repair']}.items():
    for n,k in enumerate(terms,1):add(b,k,f'B6 brief example #{n}','B6 user brief','','OTHER SOURCE — USER BRIEF EXAMPLE')
patterns={'range-rover':re.compile(r'\brange\s*rover\b',re.I),'defender':re.compile(r'\bdefender\b',re.I),'jaguar':re.compile(r'\bjaguar\b',re.I)}
for day in ('05','08','13','16','18','19','27'):
    file=DOWNLOADS/f'digitecme.com-Performance-on-Search-2026-09-{day}.xlsx'
    if not file.exists():continue
    book=openpyxl.load_workbook(file,read_only=True,data_only=True)
    dates=[str(r[0])[:10] for r in list(book['Chart'].values)[1:] if r and r[0]] if 'Chart' in book else []
    period=f'{dates[0]} to {dates[-1]}' if dates else ''
    for n,row in enumerate(book['Queries'].values,1):
        if n==1 or not row:continue
        for b,pat in patterns.items():
            if pat.search(str(row[0])):add(b,row[0],f'Queries!A{n}',file.name,period,'MEASURED ORIGINAL GSC',row[1:5],'Query-only GSC; no landing-page join')
summary={}
for b,items in records.items():
    with (OUT/f'{b}-keyword-owner-records.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(items[0]));w.writeheader();w.writerows(items)
    (OUT/f'{b}-keyword-owner-records.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    groups=defaultdict(list)
    for r in items:groups[r['normalized_keyword']].append(r)
    conflicts={k:list({r['primary_owner'] for r in v}) for k,v in groups.items() if len({r['primary_owner'] for r in v})>1}
    if conflicts:raise ValueError(f'{b} conflicting owners: {conflicts}')
    gsc={r['normalized_keyword'] for r in items if r['measured_or_generated']=='MEASURED ORIGINAL GSC'}
    summary[b]={'source_observations':len(items),'raw_terms':len({r['raw_keyword'] for r in items}),'normalized_terms':len(groups),'measured_original_gsc_terms':len(gsc),'latest_gsc_rows':sum(r['source_file'].endswith('2026-09-27.xlsx') and r['measured_or_generated']=='MEASURED ORIGINAL GSC' for r in items),'unresolved_conflicts':len(conflicts),'owner_observations':dict(Counter(r['primary_owner'] or 'NOT TARGETED' for r in items))}
(OUT/'keyword-summary.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2))
