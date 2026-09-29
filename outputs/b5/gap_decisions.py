import csv
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
rows=[]
def add(b,k,e,m,o,d,r,n,f):rows.append([b,k,e,m,o,d,r,n,f])
add('Rolls-Royce','Spectre / EV service','Manufacturer + generated workbook','','/brands/rolls-royce-service-dubai','Limit to verified low-voltage and general inspection scope','Spectre is electric; high-voltage capability is unverified','No','Confirm specific EV capability with workshop before a dedicated page')
add('Rolls-Royce','Cullinan / Ghost / Phantom / Wraith / Dawn model intent','Generated workbook','','/brands/rolls-royce-service-dubai','Hub/model sections retained','No model-specific query × page evidence or enough verified distinct scope for five new pages','No','Collect measured demand and service evidence')
add('Rolls-Royce','Suspension dropping / warning','Generated workbook','','/brands/rolls-royce-service-dubai/suspension-repair','Existing service section','Multiple possible causes; diagnosis precedes repair','No','Review enquiries for a distinct symptom-guide task')
add('Rolls-Royce','Maintenance interval and cost','Workbook research','','/blog/rolls-royce-best-workshop-dubai','Planning guide and hub','No universal schedule or fixed price','No','Improve planning information only after verified vehicle-specific references')
add('Bentley','Reverse-camera fault / installation','Original GSC + workbook','354 impressions; 0 clicks; position 44.35 in latest six-month export','/brands/bentley-service-dubai/electrical-repair#reverse-camera','Existing brand-specific owner improved','One page separates repair from retrofit; query-only GSC cannot identify historical ranking URL','No','Validate query × page and enquiries after release')
add('Bentley','Continental GT / Bentayga / Flying Spur model intent','Generated workbook','','/blog/bentley-continental-gt-service-dubai-guide; /brands/bentley-service-dubai','Retain existing guide and hub','Other models lack measured distinct-page demand and verified unique content','No','Gather demand and real workshop evidence before adding models')
add('Bentley','Transmission warning and shift symptoms','Generated workbook','','/brands/bentley-service-dubai/transmission-repair','Existing commercial owner','Fitted transmission and diagnosis vary by model','No','Use case evidence before a symptom URL')
add('Bentley','Hybrid/EV service','Manufacturer + generated workbook','','/brands/bentley-service-dubai','Conservative scope','Current and older Continental powertrains differ; high-voltage scope unverified','No','Confirm shop capability before claiming electrified service')
add('Bentley','Maintenance interval and cost','Workbook research','','/blog/bentley-best-workshop-dubai','Planning guide and hub','No universal schedule or fixed quote','No','Gather measured demand and verified schedule sources')
add('Maybach','Maybach S-Class / S580 / S680','Generated workbook','','/blog/maybach-s580-service-dubai-guide; /brands/maybach-service-dubai','Existing guide and hub','Maybach-specific intent is distinct from generic Mercedes S-Class','No','Consider a fuller model page only with demand and unique evidence')
add('Maybach','Maybach GLS / GLS 600','Generated workbook','','/brands/maybach-service-dubai','Existing hub section','No distinct page evidence; Mercedes GLS owner remains separate','No','Collect measured Maybach GLS demand')
add('Maybach','AIRMATIC / E-ACTIVE warning','Manufacturer + generated workbook','','/brands/maybach-service-dubai/suspension-repair','Existing service owner','Fitted systems depend on model and specification; warning is not a diagnosis','No','Add vehicle-specific symptom section if enquiry evidence supports it')
add('Maybach','XENTRY / COMAND / MBUX / rear display','Existing site + generated workbook','','/brands/maybach-service-dubai/engine-diagnostics; /brands/maybach-service-dubai/electrical-repair','Existing service sections','Supported access and equipment vary; Mercedes informational owners remain B1','No','Verify supported functions and actual enquiry volume')
add('Maybach','Maintenance interval and cost','Workbook research','','/blog/maybach-best-workshop-dubai','Planning guide and hub','No one interval or fixed price for all Maybach vehicles','No','Collect service-manual references and measured demand')
for b in ('rolls-royce','bentley','maybach'):
    with (ROOT/f'b5-{b}-keyword-coverage.csv').open(encoding='utf-8-sig',newline='') as f:
        for r in csv.DictReader(f):
            if r['coverage_class'].startswith('NOT TARGETED'):
                add({'rolls-royce':'Rolls-Royce','bentley':'Bentley','maybach':'Maybach'}[b],r['keyword'],r['measured_or_generated'],
                    f"{r['gsc_impressions']} impressions, {r['gsc_clicks']} clicks" if r['gsc_impressions'] else '',
                    'None — capability unverified','Intentionally untargeted','The existing site does not verify this exact service; a keyword alone does not authorize a promise','No','Confirm real workshop capability and demand before targeting')
head='# B5 gap decisions\n\nThese are page-creation decisions, not claims that an existing route cannot answer any related question. Query-only GSC does not prove a ranking URL.\n\n'
cols=['Brand','Keyword / Cluster','Evidence Type','Measured Evidence if Available','Existing Owner','Decision','Reason','New URL Needed?','Recommended Future Action']
lines=[head,'| '+' | '.join(cols)+' |','| '+' | '.join(['---']*len(cols))+' |']
for row in rows:lines.append('| '+' | '.join(str(x).replace('|','/') for x in row)+' |')
(ROOT/'b5-rolls-royce-bentley-maybach-gap-decisions.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(len(rows),'decisions')
