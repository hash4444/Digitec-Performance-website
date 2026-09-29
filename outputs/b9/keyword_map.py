"""Extract B9 Jetour and ROX keyword observations and assign pre-edit owners."""
import csv, hashlib, json, re
from collections import Counter, defaultdict
from pathlib import Path
import openpyxl

R=Path(__file__).resolve().parents[2]; O=R/'outputs/b9'; DL=Path('C:/Users/ADMIN/Downloads')
WB=DL/'DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx'
pages={x['path']:x for x in json.loads((O/'pages-baseline.json').read_text(encoding='utf-8'))}
H={'Jetour':'/brands/jetour-service-dubai','ROX':'/brands/rox-service-dubai'}
SOFT='/services/soft-close-door-repair-dubai'; ROXSOFT=H['ROX']+'/soft-close-door-installation'
GEN={'transmission':'/services/transmission-repair-dubai','mechanical':'/services/mechanical-repair-dubai','suspension':'/services/suspension-repair-dubai','electrical':'/services/auto-electrical-repair-dubai','battery':'/services/battery-replacement-dubai','body':'/services/car-body-repair-dubai','screen':'/services/head-unit-repair-dubai','camera':'/services/reverse-camera-repair-dubai'}
for k,v in GEN.items():
    if v not in pages:GEN[k]=GEN['electrical'] if k in ('screen','camera') else H['ROX']

def norm(raw, brand):
    s=str(raw or '').casefold().strip().replace('soft-close','soft close').replace('touch screen','touchscreen')
    s=re.sub(r'\brox\s*0?1\b','rox 01',s)
    for a,b in [('servicing','service'),('repairs','repair'),('service centre','service center')]:s=s.replace(a,b)
    return re.sub(r'\s+',' ',s)

def owner(raw,brand):
    k=norm(raw,brand); hub=H[brand]
    if re.search(r'\b(abu dhabi|sharjah|ajman|al ain)\b',k):return '','','Out-of-market','No Dubai doorway for another city'
    if re.search(r'\b(high voltage|traction battery repair|battery pack repair|inverter repair|electric drive unit repair|charging system repair|coding|programming|remap)\b',k):return '','','Unverified capability','Workshop capability not verified for this task'
    if 'soft close' in k:
        if brand=='ROX' and re.search(r'\brox\b',k):
            if re.search(r'\b(not working|malfunction|fault|broken|repair)\b',k):return SOFT,ROXSOFT,'Soft-close repair','Existing generic repair owner; ROX installation supports compatibility context'
            return ROXSOFT,SOFT,'ROX soft-close installation','Existing ROX-specific installation owner; confirm compatibility first'
        return SOFT,ROXSOFT,'Generic soft-close installation/repair','Generic cross-brand owner; ROX-specific installation is separate'
    if brand=='ROX' and re.search(r'\b(rental|rent|buy|price|sale|dealership)\b',k):return '','','Non-workshop intent','Rental/purchase intent is outside DIGI-TEC service scope'
    if re.search(r'\b(model|t2|x70|x90|dashing|x50|t1)\b',k) and brand=='Jetour' and not re.search(r'\b(ac|brake|diagnos|oil|transmission|gearbox|electrical|battery|suspension|repair cost)\b',k):return hub,'','Jetour model enquiry','Hub section owns model enquiry until distinct evidence exists'
    if brand=='ROX' and re.search(r'\brox 01\b',k) and not re.search(r'\b(ac|brake|diagnos|oil|electrical|battery|suspension|screen|camera|repair cost|service cost)\b',k):return hub,'','ROX 01 model/broad enquiry','Single existing hub owns both ROX and ROX 01 broad tasks'
    if re.search(r'\b(service cost|maintenance cost|service interval|maintenance schedule|how often)\b',k):return hub,'','Maintenance/cost planning','No fixed price or universal interval; hub explanation'
    if re.search(r'\b(warning|fault code|diagnos|scan|check engine|loss of power)\b',k):return hub+'/engine-diagnostics',hub,'Diagnostics/warning','Indexable brand diagnostics owner; inspection precedes part recommendation'
    checks=[(r'\b(ac|air conditioning|climate)\b','ac-repair','AC'),(r'\b(brake|abs)\b','brake-repair','Brakes'),(r'\b(oil change|oil service|engine oil)\b','oil-change','Engine oil service'),(r'\b(transmission|gearbox|shifting|jerking|driveline)\b','transmission-repair','Transmission/driveline'),(r'\b(screen|infotainment|head unit|touchscreen|display)\b','electrical-repair','Screen/infotainment'),(r'\b(camera|reverse camera)\b','electrical-repair','Camera/electrical'),(r'\b(electrical|wiring|module)\b','electrical-repair','Electrical'),(r'\b(battery|no.start|won.t start)\b','battery-replacement','Low-voltage battery/no-start'),(r'\b(suspension|steering|damper|shock)\b','suspension-repair','Suspension/steering'),(r'\b(engine|mechanical|cooling|coolant|overheat|turbo|misfire|rough idle)\b','mechanical-repair','Mechanical/cooling'),(r'\b(body|bumper|paint|dent)\b','body-repair','Body repair')]
    fallback={'transmission-repair':GEN['transmission'],'mechanical-repair':GEN['mechanical'],'suspension-repair':GEN['suspension'],'electrical-repair':GEN['electrical'],'battery-replacement':GEN['battery'],'body-repair':GEN['body']}
    for pat,slug,cluster in checks:
        if re.search(pat,k):
            brandroute=hub+'/'+slug
            if brandroute in pages and not pages[brandroute]['seo'].get('noindex'):
                if brand=='ROX' and slug=='oil-change':return brandroute,hub,cluster,'Range-extender generator oil only; exact vehicle schedule'
                return brandroute,hub,cluster,'Existing indexable brand service owner'
            return fallback.get(slug,hub),brandroute if brandroute in pages else hub,cluster,'Existing brand route is noindex; use indexable generic owner'
    return hub,'','Broad '+brand+' service','Existing hub owns broad service and repair enquiry'

records={'Jetour':[],'ROX':[]}
def add(raw,brand,source,file,period,evidence,metrics=('',)*4,context=''):
    if not raw:return
    primary,support,cluster,reason=owner(raw,brand)
    if primary and primary not in pages:raise ValueError((raw,primary))
    vals=[v if v is not None else '' for v in metrics]
    records[brand].append(dict(raw_keyword=str(raw),normalized_keyword=norm(raw,brand),brand=brand,source=source,source_file=file,source_period=period,measured_or_generated=evidence,gsc_clicks=vals[0],gsc_impressions=vals[1],gsc_ctr=vals[2],gsc_position=vals[3],search_intent=cluster,cluster=cluster,primary_owner=primary,supporting_owner=support,coverage_class='PRE-EDIT OWNER ASSIGNED' if primary else 'NOT TARGETED — INTENTIONALLY',reason=reason,context=context))

book=openpyxl.load_workbook(WB,read_only=True,data_only=True)
for n,row in enumerate(book['Master Keywords'].values,1):
    if n==1 or row[1] not in records:continue
    e='MEASURED WORKBOOK' if row[7]=='Existing GSC query' else 'GENERATED TAXONOMY' if row[7]=='Generated taxonomy' else 'RESEARCH KEYWORD'
    add(row[0],row[1],f'Master Keywords!A{n}',WB.name,'2026-04-12 to 2026-09-25' if e=='MEASURED WORKBOOK' else '',e,row[8:12],str(row[2]))
for n,row in enumerate(book['Brand Specific Systems'].values,1):
    if n>1 and row[0] in records:add(f'{row[0]} {row[1]}',row[0],f'Brand Specific Systems!B{n}',WB.name,'','RESEARCH KEYWORD',context='System suggestion')
brief={'Jetour':['Jetour service Dubai','Jetour T2 service Dubai','Jetour diagnostics Dubai','Jetour screen not working','Jetour transmission repair Dubai'], 'ROX':['ROX service Dubai','ROX 01 service Dubai','ROX 01 soft close door','ROX soft close installation','soft close door repair Dubai','soft close door installation Dubai','ROX 01 screen not working','ROX 01 diagnostics']}
for brand,terms in brief.items():
    for n,term in enumerate(terms,1):add(term,brand,f'B9 brief example #{n}','B9 user brief','','OTHER SOURCE — USER BRIEF EXAMPLE')

seen=set();skipped=[]
for file in sorted(DL.glob('digitecme.com-Performance-on-Search-2026-09-*.xlsx')):
    digest=hashlib.sha256(file.read_bytes()).hexdigest()
    if digest in seen:skipped.append(file.name);continue
    seen.add(digest);w=openpyxl.load_workbook(file,read_only=True,data_only=True)
    if 'Queries' not in w:continue
    dates=[str(r[0])[:10] for r in list(w['Chart'].values)[1:] if r and r[0]] if 'Chart' in w else []
    period=f'{dates[0]} to {dates[-1]}' if dates else ''
    for n,row in enumerate(w['Queries'].values,1):
        if n==1 or not row[0]:continue
        raw=str(row[0]);k=raw.casefold()
        if 'jetour' in k:add(raw,'Jetour',f'Queries!A{n}',file.name,period,'MEASURED ORIGINAL GSC',row[1:5])
        if re.search(r'\brox\s*0?1?\b',k) or 'soft close' in k or 'soft-close' in k:add(raw,'ROX',f'Queries!A{n}',file.name,period,'MEASURED ORIGINAL GSC',row[1:5],context='Generic soft-close' if 'rox' not in k else '')

for brand,rows in records.items():
    slug=brand.lower();fields='raw_keyword normalized_keyword brand source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position search_intent cluster primary_owner supporting_owner coverage_class reason'.split()
    with (O/f'{slug}-keyword-owner-records.csv').open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');writer.writeheader();writer.writerows(rows)
    (O/f'{slug}-keyword-owner-records.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    terms={x['normalized_keyword'] for x in rows};measured={x['normalized_keyword'] for x in rows if x['measured_or_generated']=='MEASURED ORIGINAL GSC'}
    summary={'source_observations':len(rows),'raw_keyword_strings':len({x['raw_keyword'] for x in rows}),'normalized_terms':len(terms),'measured_original_gsc_terms':len(measured),'duplicate_exports_skipped':skipped,'owner_observations':dict(Counter(x['primary_owner'] or 'NOT TARGETED' for x in rows)),'owner_conflicts':{}}
    (O/f'{slug}-keyword-summary.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
    mapping=f'# B9 {brand} pre-edit keyword → owner map\n\nOriginal GSC is query-only. Workbook rows may repeat it; overlapping exports were not summed. Editorial ownership is not proof of a historical ranking URL.\n\n| Owner | Observations |\n|---|---:|\n'
    for target,count in Counter(x['primary_owner'] or 'NOT TARGETED' for x in rows).most_common():mapping+=f'| `{target}` | {count} |\n'
    mapping+=f'\nSource observations: {len(rows)}; raw strings: {summary["raw_keyword_strings"]}; normalized terms: {len(terms)}; measured original-GSC terms: {len(measured)}. No unresolved editorial primary-owner conflict.\n'
    if brand=='ROX':mapping+=f'\nROX and ROX 01 broad/model enquiries share `{H[brand]}`. ROX-specific installation belongs to `{ROXSOFT}`; generic installation/repair and ROX malfunction belong to `{SOFT}`. High-voltage work remains excluded pending business confirmation.\n'
    else:mapping+=f'\nLow measured demand supports hub-level model coverage and existing generic services. No new Jetour model or symptom URL is justified.\n'
    (O/f'{slug}-keyword-owner-map.md').write_text(mapping,encoding='utf-8')
    print(brand,summary)
