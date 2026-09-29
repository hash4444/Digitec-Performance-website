"""B8 Volkswagen keyword observations and pre-edit editorial owners."""
import csv,hashlib,json,re
from collections import Counter,defaultdict
from pathlib import Path
import openpyxl

ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'outputs/b8';DL=Path('C:/Users/ADMIN/Downloads')
WB=DL/'DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx'
PAGES={p['path']:p for p in json.loads((OUT/'pages-baseline.json').read_text(encoding='utf-8'))}
HUB='/brands/volkswagen-service-dubai';GUIDE='/blog/volkswagen-best-workshop-dubai'
TRANS='/services/transmission-repair-dubai';DIAG=HUB+'/engine-diagnostics'
ELEC='/services/auto-electrical-repair-dubai';MECH='/services/mechanical-repair-dubai'

def norm(raw):
    s=str(raw or '').casefold().strip()
    s=re.sub(r'\bvw\b','volkswagen',s)
    for a,b in [('servicing','service'),('repairs','repair'),('service centre','service center'),('gear box','gearbox'),('diagnostics','diagnostic')]:s=s.replace(a,b)
    return re.sub(r'\s+',' ',s)

def owner(raw):
    k=norm(raw)
    if re.search(r'\b(abu dhabi|sharjah|ajman|al ain)\b',k):return '','','Out-of-market','No Dubai doorway for another city'
    if re.search(r'\b(high.voltage|hv battery|battery pack repair|inverter repair|retrofit|remap|stage 2)\b',k):return '','','Unverified capability','Exact Volkswagen service capability is unverified'
    if re.search(r'\b(coding|programming|adaptation|immobilizer|key programming)\b',k):return DIAG,'','Supported-function enquiry','Exact vehicle/module/software/security access must be verified before accepting work'
    if re.search(r'\b(best|choose|choosing|compare)\b',k) and re.search(r'\b(workshop|garage|specialist|mechanic)\b',k):return GUIDE,HUB,'Workshop selection','Existing guide serves evaluation, not broad booking'
    if re.search(r'\b(id\.3|id\.4|id\.5|id buzz|electric)\b',k) and re.search(r'\b(oil|spark plug|turbo|engine repair|dsg)\b',k):return '','','Inapplicable EV task','Do not apply combustion or DSG advice to an electric drive'
    if re.search(r'\b(dsg|mechatronic|gearbox|transmission|clutch|shuddering|jerking|slipping|not shifting|hard shifting|prnds)\b',k):
        if re.search(r'\b(diagnostic|odis|scan|fault code)\b',k) and not re.search(r'\b(repair|service|fluid|oil change)\b',k):return DIAG,TRANS,'DSG fault investigation','ODIS/diagnostic task precedes component repair'
        if re.search(r'\b(oil change|fluid|maintenance|service interval|service)\b',k) and not re.search(r'\b(repair|fault|warning|jerking|shuddering|slipping)\b',k):return TRANS,DIAG,'DSG maintenance','Generic transmission owner has DSG service; gearbox code determines fluid and interval'
        if re.search(r'\b(jerking|shuddering|slipping|warning|not shifting|hard shifting|hesitation|delayed)\b',k):return TRANS,DIAG,'DSG symptom','Symptom triage on transmission owner; no assumed failed part'
        return TRANS,DIAG,'DSG/transmission repair','Indexable generic transmission owner; Volkswagen transmission route remains noindex support'
    if re.search(r'\b(epc|check engine|warning light|misfire|rough idle|loss of power|fault code|odis|diagnostic|scan)\b',k):return DIAG,MECH,'Volkswagen diagnostics/EPC','Indexable VW diagnostic owner; code or warning does not identify a part'
    if re.search(r'\b(golf|gti|tiguan|touareg|passat|jetta|t.roc|teramont|arteon|polo|id\.3|id\.4|id\.5|id buzz)\b',k) and not re.search(r'\b(ac|brake|suspension|transmission|gearbox|diagnos|oil|battery|engine|electrical|dsg|service cost|interval)\b',k):return HUB,'','Volkswagen model enquiry','Hub model navigation; no thin model URL from generated keyword'
    if re.search(r'\b(service cost|maintenance cost|service interval|maintenance schedule|how often)\b',k):return HUB,GUIDE,'Maintenance/cost planning','Model-specific planning section; no universal interval or fixed price'
    checks=[(r'\b(ac|a/c|air conditioning|climate control|condenser)\b','ac-repair','AC'),(r'\b(brake|abs)\b','brake-repair','Brakes'),(r'\b(oil change|oil service|engine oil)\b','oil-change','Engine oil service'),(r'\b(battery|charging|no.start|won.t start)\b','battery-replacement','Low-voltage battery/no-start'),(r'\b(electrical|wiring|infotainment|screen|camera|module)\b','electrical-repair','Electrical/infotainment'),(r'\b(suspension|steering|damper|shock|bushing)\b','suspension-repair','Suspension/steering'),(r'\b(engine|mechanical|cooling|coolant|overheat|radiator|turbo|oil leak)\b','mechanical-repair','Mechanical/cooling'),(r'\b(body|bumper|paint repair|dent)\b','body-repair','Body repair')]
    fallback={'battery-replacement':'/services/battery-replacement-dubai','electrical-repair':ELEC,'suspension-repair':'/services/suspension-repair-dubai','mechanical-repair':MECH,'body-repair':'/services/car-body-repair-dubai'}
    for pattern,slug,label in checks:
        if re.search(pattern,k):
            brand=f'{HUB}/{slug}'
            if brand in PAGES and not PAGES[brand]['seo'].get('noindex'):return brand,HUB,label,'Indexable Volkswagen service owner'
            generic=fallback.get(slug,HUB)
            if generic not in PAGES:generic=HUB
            return generic,brand if brand in PAGES else HUB,label,'Existing Volkswagen service route remains intentionally noindex; indexable generic or hub owner'
    return HUB,'','Broad Volkswagen service','Existing hub owns broad service and repair discovery'

records=[]
def add(raw,source,filename,period,evidence,metrics=('',)*4,context=''):
    if not raw:return
    primary,support,cluster,reason=owner(raw)
    if primary and primary not in PAGES:raise ValueError((raw,primary))
    vals=[x if x is not None else '' for x in metrics]
    records.append(dict(raw_keyword=str(raw),normalized_keyword=norm(raw),source=source,source_file=filename,source_period=period,measured_or_generated=evidence,gsc_clicks=vals[0],gsc_impressions=vals[1],gsc_ctr=vals[2],gsc_position=vals[3],search_intent=cluster,cluster=cluster,primary_owner=primary,supporting_owner=support,coverage_class='PRE-EDIT OWNER ASSIGNED' if primary else 'NOT TARGETED — INTENTIONALLY',reason=reason,context=context))

book=openpyxl.load_workbook(WB,read_only=True,data_only=True)
for n,row in enumerate(book['Master Keywords'].values,1):
    if n==1 or row[1]!='Volkswagen':continue
    e='MEASURED WORKBOOK' if row[7]=='Existing GSC query' else 'GENERATED TAXONOMY' if row[7]=='Generated taxonomy' else 'RESEARCH KEYWORD'
    add(row[0],f'Master Keywords!A{n}',WB.name,'2026-04-12 to 2026-09-25' if e=='MEASURED WORKBOOK' else '',e,row[8:12],str(row[2]))
for n,row in enumerate(book['GSC Opportunities'].values,1):
    if n>1 and row[1]=='Volkswagen':add(row[0],f'GSC Opportunities!A{n}',WB.name,'2026-04-12 to 2026-09-25','MEASURED WORKBOOK',row[2:6],'Workbook copy')
for n,row in enumerate(book['Brand Specific Systems'].values,1):
    if n>1 and row[0]=='Volkswagen':add(f'Volkswagen {row[1]}',f'Brand Specific Systems!B{n}',WB.name,'','RESEARCH KEYWORD',context='System suggestion')
brief=['Volkswagen DSG repair Dubai','VW DSG repair Dubai','DSG mechatronic repair Dubai','DSG jerking','Volkswagen EPC light','VW ODIS diagnostics Dubai','Volkswagen coding Dubai','Volkswagen Golf GTI service Dubai','Volkswagen ID.4 service Dubai']
for n,term in enumerate(brief,1):add(term,f'B8 brief example #{n}','B8 user brief','','OTHER SOURCE — USER BRIEF EXAMPLE')

seen=set();duplicates=[]
model=re.compile(r'\b(golf(?:\s+(?:gti|r))?|tiguan|touareg|passat|jetta|t-?roc|teramont|arteon|polo|id\.?\s?[345]|id\.?\s?buzz)\b',re.I)
primary=re.compile(r'\b(volkswagen|vw|dsg|odis|epc)\b',re.I)
for file in sorted(DL.glob('digitecme.com-Performance-on-Search-2026-09-*.xlsx')):
    digest=hashlib.sha256(file.read_bytes()).hexdigest()
    if digest in seen:duplicates.append(file.name);continue
    seen.add(digest);x=openpyxl.load_workbook(file,read_only=True,data_only=True)
    if 'Queries' not in x:continue
    dates=[str(r[0])[:10] for r in list(x['Chart'].values)[1:] if r and r[0]] if 'Chart' in x else []
    period=f'{dates[0]} to {dates[-1]}' if dates else ''
    for n,row in enumerate(x['Queries'].values,1):
        if n==1 or not row:continue
        raw=str(row[0]);candidate=primary.search(raw) or model.search(raw)
        if candidate:add(raw,f'Queries!A{n}',file.name,period,'MEASURED ORIGINAL GSC',row[1:5],'Query-only GSC; no landing-page join')

with (OUT/'volkswagen-keyword-owner-records.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(records[0]));w.writeheader();w.writerows(records)
(OUT/'volkswagen-keyword-owner-records.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
groups=defaultdict(list)
for r in records:groups[r['normalized_keyword']].append(r)
conflicts={k:sorted({r['primary_owner'] for r in v}) for k,v in groups.items() if len({r['primary_owner'] for r in v})>1}
summary={'source_observations':len(records),'raw_keyword_strings':len({r['raw_keyword'] for r in records}),'normalized_terms':len(groups),'measured_original_gsc_terms':len({r['normalized_keyword'] for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC'}),'duplicate_exports_skipped':duplicates,'owner_conflicts':conflicts,'owner_observations':dict(Counter(r['primary_owner'] or 'NOT TARGETED' for r in records))}
(OUT/'keyword-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
lines=['# B8 Volkswagen pre-edit keyword → owner map','','GSC is query-only. Workbook GSC rows duplicate source evidence. Overlapping exports are not added. Editorial owner does not prove the historical ranking URL.','','| Owner | Observations | Task |','|---|---:|---|']
for url,count in Counter(r['primary_owner'] or 'NOT TARGETED' for r in records).most_common():lines.append(f'| {url} | {count} | '+('Unverified, out-of-market or inapplicable' if not url else 'Term-level intent in CSV')+' |')
lines+=['','## Priority boundaries','',f'- Broad Volkswagen service: `{HUB}`.',f'- Workshop selection: `{GUIDE}`.',f'- DSG/transmission repair, service and symptom triage: `{TRANS}`. The Volkswagen transmission path is noindex support; no new DSG URL before evidence.',f'- Volkswagen ODIS/diagnostics and EPC warning investigation: `{DIAG}`. Repair follows confirmed findings, not the scan alone.',f'- General camera/electrical: `{ELEC}`. Programming/coding is a supported-function enquiry only, never a universal promise.','- Model variants: Volkswagen hub/model navigation until distinct evidence justifies a separate URL.','- No EV high-voltage capability or fixed DSG interval is assumed.','','## Source counts','',f'- Source observations: {len(records)}; raw strings: {summary["raw_keyword_strings"]}; normalized terms: {summary["normalized_terms"]}; measured original-GSC terms: {summary["measured_original_gsc_terms"]}.',f'- Duplicate export files skipped: {len(duplicates)}; primary-owner conflicts: {len(conflicts)}.']
(OUT/'volkswagen-keyword-owner-map.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k not in ('owner_observations','duplicate_exports_skipped')},indent=2))
