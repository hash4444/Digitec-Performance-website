"""Preserve BMW keyword provenance and assign an existing editorial owner before edits."""
import csv, json, re, warnings
from collections import Counter, defaultdict
from pathlib import Path
import openpyxl

warnings.filterwarnings('ignore', category=UserWarning, module='openpyxl')
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/b3'
DOWNLOADS=Path('C:/Users/ADMIN/Downloads')
WORKBOOK=DOWNLOADS/'DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx'
PAGES={p['path']:p for p in json.loads((OUT/'pages-baseline.json').read_text(encoding='utf-8'))}
HUB='/brands/bmw-service-dubai'
SVC=lambda slug:f'{HUB}/{slug}'

def norm(raw):
    s=str(raw or '').casefold().strip()
    for a,b in [('centre','center'),('servicing','service'),('repairs','repair'),('gear box','gearbox'),('transmission','gearbox'),('display','screen')]:
        s=s.replace(a,b)
    return re.sub(r'\s+',' ',s)

def owner_for(raw):
    k=norm(raw)
    if re.search(r'\b(abu dhabi|sharjah|ajman|al ain)\b',k):
        return '','Outside Dubai service area','Out-of-market','Do not target another city with a Dubai workshop page'
    if re.search(r'\b(best|compare|comparison|versus|vs)\b',k) and re.search(r'workshop|garage|dealer|specialist',k):
        return '/best-bmw-workshop-dubai','Workshop selection','Comparison','Comparison task; broad booking remains at hub'
    if re.search(r'\b(price|pricing|cost|how much)\b',k):
        return '/blog/bmw-maintenance-guide-dubai','Maintenance cost factors','Informational','Use existing guide; no invented fixed price'
    if re.search(r'\b(interval|schedule|how often|condition based service|cbs)\b',k):
        return '/blog/bmw-maintenance-guide-dubai','Service planning','Informational','Vehicle-specific maintenance guidance'
    if re.search(r'\b(carplay|retrofit|key programming|keyless|immobilizer|soft close|seat motor|sunroof|tailgate|tinting|wrap)\b',k):
        return '','Unverified function','Unverified service','BMW-specific function or offering not established by keyword evidence'
    if re.search(r'\b(tuning|remap|ecu tune|stage 1|stage 2)\b',k):
        return '/tuning','Performance project','Cross-brand commercial','Existing tuning owner; fitment requires confirmation'
    if re.search(r'\b(m3|m4|m5|x5|x6|3 series|5 series)\b',k) and re.search(r'\b(service|repair|workshop|garage|specialist|maintenance)\b',k) and not re.search(r'\b(oil|brake|gearbox|suspension|ac|battery|electrical|mechanical|engine|diagnos\w*|steering|exhaust|fuel|tyre|tire|body|cooling|turbo|idrive|screen|vanos|valvetronic|xdrive)\b',k):
        for token,slug in [('m3','m3'),('m4','m4'),('m5','m5'),('x5','x5'),('x6','x6'),('3 series','3-series'),('5 series','5-series')]:
            if re.search(r'\b'+re.escape(token)+r'\b',k):
                return SVC(slug),f'{token.upper()} model service','Model commercial','Existing model owner; repair tasks link to services'
    if re.search(r'\b(m service|m model|m performance)\b',k):
        return '/blog/bmw-m-service-dubai-guide','M-model considerations','Informational','M guide supports existing M3/M4/M5 owners'
    if re.search(r'\b(idrive|head unit|ccc|cic|nbt|infotainment|screen|camera|audio)\b',k):
        return SVC('electrical-repair'),'iDrive/electronics assessment','Commercial section','Fault diagnosis and upgrade enquiry remain distinct; no thin module URL'
    if re.search(r'\b(vanos|valvetronic)\b',k):
        return SVC('mechanical-repair'),'Engine timing/lift system assessment','Commercial section','Generation-specific system; no standalone acronym page'
    if re.search(r'\b(xdrive|transfer case|drivetrain malfunction|drivetrain warning)\b',k):
        return SVC('engine-diagnostics'),'Drivetrain warning/fault assessment','Diagnostic section','Warning is not proof of one failed component'
    if re.search(r'\b(won.t start|not start|no start|check engine|warning light|misfire|rough idle|overheating|coolant leak|oil leak|loss of power|smoke|shaking|vibration|slipping|jerking|battery keeps dying|not cooling)\b',k):
        if re.search(r'ac|air condition|not cooling',k):slug='ac-repair'
        elif re.search(r'coolant|oil leak|overheating|smoke',k):slug='mechanical-repair'
        elif re.search(r'jerking|slipping',k):slug='transmission-repair'
        else:slug='engine-diagnostics'
        return SVC(slug),'Symptom assessment','Service section','Existing service explains diagnostic route; no measured case for a separate thin guide'
    services=[
        (r'\b(ista|diagnos\w*|fault code|computer scan|test plan|coding|programming)\b','engine-diagnostics','BMW diagnostics'),
        (r'\b(gearbox|zf|clutch|gear shifting)\b','transmission-repair','BMW gearbox repair'),
        (r'\b(suspension|damper|bushing|control arm|ride height|shock absorber|air spring|chassis)\b','suspension-repair','BMW suspension repair'),
        (r'\b(brake|abs)\b','brake-repair','BMW brake repair'),
        (r'\b(oil change|oil service|engine oil|oil filter|major service)\b','oil-change','BMW oil service'),
        (r'\b(ac|air conditioning|compressor|condenser|refrigerant|climate control)\b','ac-repair','BMW AC repair'),
        (r'\b(battery|registration|ibs|charging)\b','battery-replacement','BMW battery assessment'),
        (r'\b(electrical|alternator|module|sensor|starter|wiring|ecu)\b','electrical-repair','BMW electrical repair'),
        (r'\b(steering|power steering)\b','steering-repair','BMW steering repair'),
        (r'\b(tire|tyre|wheel|rim|alignment|puncture)\b','tire-repair','BMW tyre/wheel service'),
        (r'\b(body|collision|accident|paint repair|painting|dent|panel|bumper)\b','body-repair','BMW body repair'),
        (r'\b(exhaust|catalytic|emissions|muffler)\b','exhaust-repair','BMW exhaust repair'),
        (r'\b(fuel|injector|fuel pump)\b','fuel-system-repair','BMW fuel repair'),
        (r'\b(engine|mechanical|cooling|coolant|radiator|thermostat|water pump|turbo|belt|chain|valve cover)\b','mechanical-repair','BMW mechanical repair'),
    ]
    for pattern,slug,label in services:
        if re.search(pattern,k):return SVC(slug),label,'Commercial service','Existing specific service; exact scope follows inspection'
    if re.search(r'\b(maintenance|ownership)\b',k):
        return '/blog/bmw-maintenance-guide-dubai','Maintenance planning','Informational','Guide supports hub booking'
    return HUB,'BMW service/repair discovery','Broad commercial','Single broad booking and directory owner'

def period(w):
    if 'Chart' not in w.sheetnames:return ''
    v=[str(r[0])[:10] for r in list(w['Chart'].values)[1:] if r and r[0]]
    return f'{v[0]} to {v[-1]}' if v else ''

records=[]
def add(keyword,source,file,span,evidence,clicks='',impressions='',ctr='',position='',context=''):
    if not keyword:return
    owner,cluster,intent,reason=owner_for(keyword)
    if owner and owner not in PAGES:raise ValueError(f'Unpublished owner {owner}: {keyword}')
    records.append(dict(raw_keyword=str(keyword),normalized_keyword=norm(keyword),source=source,source_file=file,source_period=span,measured_or_generated=evidence,gsc_clicks=clicks if clicks is not None else '',gsc_impressions=impressions if impressions is not None else '',gsc_ctr=ctr if ctr is not None else '',gsc_position=position if position is not None else '',search_intent=intent,cluster=cluster,primary_owner=owner,secondary_supporting_owner=HUB if owner and owner!=HUB else '',coverage_type='NOT TARGETED — INTENTIONALLY' if not owner else 'EXISTING OWNER',reason=reason,source_context=context))

w=openpyxl.load_workbook(WORKBOOK,read_only=True,data_only=True)
for n,row in enumerate(w['Master Keywords'].values,1):
    if n==1 or str(row[1]).casefold()!='bmw':continue
    evidence='MEASURED WORKBOOK' if row[7]=='Existing GSC query' else 'GENERATED TAXONOMY' if row[7]=='Generated taxonomy' else 'RESEARCH KEYWORD'
    add(row[0],f'Master Keywords!A{n}',WORKBOOK.name,'2026-04-12 to 2026-09-25' if evidence=='MEASURED WORKBOOK' else '',evidence,*row[8:12],str(row[2]))
for n,row in enumerate(w['GSC Opportunities'].values,1):
    if n==1 or str(row[1]).casefold()!='bmw':continue
    add(row[0],f'GSC Opportunities!A{n}',WORKBOOK.name,'2026-04-12 to 2026-09-25','MEASURED WORKBOOK',*row[2:6],'Opportunity sheet copy')
for n,row in enumerate(w['Brand Specific Systems'].values,1):
    if n==1 or str(row[0]).casefold()!='bmw':continue
    add('BMW '+str(row[1]),f'Brand Specific Systems!B{n}',WORKBOOK.name,'','RESEARCH KEYWORD',context='System research suggestion')

# Candidate tasks explicitly named in the B3 brief. They are not measured
# demand unless a separate original GSC observation supplies metrics.
brief_examples=[
 'BMW service Dubai','BMW repair Dubai','BMW workshop Dubai','BMW garage Dubai',
 'BMW specialist Dubai','BMW service centre Dubai','BMW repair near me',
 'BMW diagnostics Dubai','BMW ISTA diagnostics Dubai','BMW computer diagnostics',
 'BMW fault diagnosis','BMW coding Dubai','BMW programming Dubai',
 'BMW engine repair Dubai','BMW mechanical repair Dubai','BMW oil leak',
 'BMW coolant leak','BMW overheating','BMW rough idle','BMW loss of power',
 'BMW turbo repair Dubai','BMW turbo malfunction','BMW loss of boost',
 'BMW transmission repair Dubai','BMW gearbox repair Dubai','BMW ZF transmission service',
 'BMW gearbox jerking','BMW transmission slipping','BMW drivetrain malfunction',
 'BMW drivetrain warning','BMW xDrive malfunction','BMW transfer case repair',
 'BMW suspension repair Dubai','BMW air suspension repair Dubai','BMW adaptive suspension repair Dubai',
 'BMW car leaning','BMW suspension warning','BMW AC repair Dubai','BMW AC not cooling',
 'BMW electrical repair Dubai','BMW battery replacement Dubai','BMW battery registration Dubai',
 'BMW brake repair Dubai','BMW brake pad replacement Dubai','BMW brake grinding',
 'BMW oil change Dubai','BMW oil service Dubai','BMW cooling system repair',
 'BMW iDrive repair Dubai','BMW iDrive not working','BMW screen repair Dubai',
 'BMW screen black','BMW head unit repair','BMW CCC repair','BMW CIC repair','BMW NBT repair',
 'BMW VANOS repair','BMW VANOS symptoms','BMW Valvetronic fault',
 'BMW check engine light','BMW won\'t start','BMW battery keeps dying',
 'BMW white smoke','BMW blue smoke','BMW shaking','BMW vibration',
 'BMW iDrive rebooting','BMW reverse camera not working','BMW steering vibration',
 'BMW service intervals UAE','BMW service cost Dubai',
 'BMW 3 Series service Dubai','BMW 5 Series service Dubai','BMW X5 service Dubai',
 'BMW X6 service Dubai','BMW M3 service Dubai','BMW M4 service Dubai','BMW M5 service Dubai',
 'BMW i4 service Dubai','BMW i5 service Dubai','BMW i7 service Dubai','BMW iX service Dubai',
]
for n,term in enumerate(brief_examples,1):
    add(term,f'B3 brief example #{n}','B3 user brief','','OTHER SOURCE — USER BRIEF EXAMPLE',context='Candidate user task, not measured demand')

terms=re.compile(r'\b(bmw|idrive|vanos|valvetronic|xdrive|ista\+?)\b',re.I)
files=[]
for day in ('05','08','13','16','18','19','27'):
    file=DOWNLOADS/f'digitecme.com-Performance-on-Search-2026-09-{day}.xlsx'
    if not file.exists():continue
    files.append(file)
    book=openpyxl.load_workbook(file,read_only=True,data_only=True)
    span=period(book)
    for n,row in enumerate(book['Queries'].values,1):
        if n==1 or not row or not terms.search(str(row[0])):continue
        add(row[0],f'Queries!A{n}',file.name,span,'MEASURED ORIGINAL GSC',*row[1:5],'Original GSC query export')

OUT.mkdir(exist_ok=True)
with (OUT/'bmw-keyword-owner-records.csv').open('w',encoding='utf-8-sig',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=list(records[0]));writer.writeheader();writer.writerows(records)
(OUT/'bmw-keyword-owner-records.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
group=defaultdict(list)
for r in records:group[r['normalized_keyword']].append(r)
conflicts={k:sorted({r['primary_owner'] for r in v}) for k,v in group.items() if len({r['primary_owner'] for r in v})>1}
if conflicts:raise ValueError(f'Primary owner conflicts: {conflicts}')
owners=Counter(r['primary_owner'] for r in records)
latest=[r for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC' and r['source_file'].endswith('2026-09-27.xlsx')]
summary={'source_observations':len(records),'raw_terms':len({r['raw_keyword'] for r in records}),'normalized_terms':len(group),'workbook_master_bmw_rows':sum(r['source'].startswith('Master Keywords!') for r in records),'original_gsc_records':sum(r['measured_or_generated']=='MEASURED ORIGINAL GSC' for r in records),'original_gsc_normalized_terms':len({r['normalized_keyword'] for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC'}),'latest_six_month_queries':len(latest),'latest_six_month_impressions':sum(float(r['gsc_impressions']) for r in latest),'latest_six_month_clicks':sum(float(r['gsc_clicks']) for r in latest),'evidence_counts':dict(Counter(r['measured_or_generated'] for r in records)),'unresolved_owner_conflicts':conflicts,'gsc_files':[p.name for p in files]}
(OUT/'keyword-summary.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
lines=['# BMW keyword → primary owner map','','This pre-edit map keeps measured original GSC observations, workbook copies, generated taxonomy and research separate. Overlapping export periods are never summed. A primary owner is an editorial decision, not evidence that Google ranks that URL.','',f"{len(records)} source observations; {len(group)} normalized terms; {len(owners)} owner classes; zero unresolved primary-owner conflicts.",'','| Primary owner | Observations | Representative cluster |','| --- | ---: | --- |']
for owner,count in owners.most_common():
    example=next(r for r in records if r['primary_owner']==owner)
    lines.append(f"| `{owner or 'NOT TARGETED'}` | {count} | {example['cluster']} |")
lines.extend(['','Every raw observation and rationale is in `bmw-keyword-owner-records.csv`. Empty owner means an exact BMW function or offering has not been verified. Broad booking belongs to the hub; the best-workshop page remains a comparison task pending separate evidence-based consolidation.'])
(OUT/'bmw-keyword-owner-map.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2))
