"""Read-only source verification and ECU/electronics GSC analysis.

Uses the prior sprint's extraction only after independently comparing every raw
workbook cell, exact worksheet row and source hash. No workbook is saved.
"""
from pathlib import Path
import csv, hashlib, json, re, sys, warnings
import openpyxl

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[2]
PRIOR = ROOT / 'outputs/diagnostics-ac-2026-10-19/research'
sys.stdout.reconfigure(encoding='utf-8')
warnings.filterwarnings('ignore', message='Workbook contains no default style')
OUT.mkdir(parents=True, exist_ok=True)

def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def norm(q): return re.sub(r'\s+', ' ', q.casefold()).strip()
def jwrite(name, data): (OUT/name).write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')
def cwrite(name, rows):
    keys = list(dict.fromkeys(k for r in rows for k in r))
    with (OUT/name).open('w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=keys); w.writeheader(); w.writerows(rows)

books = json.loads((PRIOR/'extracted-workbooks.json').read_text(encoding='utf-8'))
raw_rows = {}; sources = []; verification = []
for name, book in books.items():
    source = book['source']; p = Path(source['path']); before = digest(p)
    assert before == source['sha256'], f'Source changed since previous extraction: {p}'
    wb = openpyxl.load_workbook(p, read_only=True, data_only=True)
    extracted = {}; tables = {}
    for sheet in wb:
        values = list(sheet.values); headers = list(values[0]) if values else []
        extracted[sheet.title] = [dict(zip(headers, v)) for v in values[1:] if any(c is not None for c in v)]
        tables[sheet.title] = [(i, dict(zip(headers,v))) for i,v in enumerate(values[1:],2) if any(c is not None for c in v)]
    wb.close()
    assert extracted == book['data'], f'Raw workbook differs from reused extraction: {name}'
    assert digest(p) == before
    raw_rows[name] = tables
    sources.append({**source, 'current_sha256':before, 'raw_read_only_verified':True,
        'reused_extraction':str(PRIOR/'extracted-workbooks.json'), 'exact_rows_reverified':True})
    verification.append({'source_file':name,'sha256':before,'all_sheet_cells_equal_prior_extraction':True,
        'hash_unchanged_during_read':True,'query_rows':len(tables.get('Queries',[]))})
jwrite('source-manifest.json', sources)

PRIMARY = {
    '92d':'digitecme.com-Performance-on-Search-2026-10-12 (1).xlsx',
    '28d_historical':'digitecme.com-Performance-on-Search-2026-09-05.xlsx',
    '24h':'digitecme.com-Performance-on-Search-2026-10-19.xlsx',
}
CORE = re.compile(r'\b(?:ecu|ecm|tcu|dme|coding|programming|module|electrical|electrician|electronics|electronic|communication)\b|control unit|software update|calibration', re.I)
INFOTAINMENT = re.compile(r'\bcue\b|head.?unit|comand|mbux|touch.?screen|screen replacement|audio|carplay|infotainment|multimedia|bluetooth|navigation',re.I)
EXCLUDE = re.compile(r'\b(?:tuning|remap|remapping|stage|chip|security|immobilizer|immobiliser)\b|diesel calibration|ecu calibration',re.I)
def relevant(q): return bool((CORE.search(q) or INFOTAINMENT.search(q)) and not EXCLUDE.search(q))
def metadata(name):
    s = books[name]['source']
    return {'source_file':name,'source_path':s['path'],'source_period':f"{s['start']} to {s['end']}",
        'source_time_column':s['time_column'],'source_filters':json.dumps(s['filters'],ensure_ascii=False,separators=(',',':')),
        'semantic_duplicate_of':s['semantic_duplicate_of']}

evidence = []; independent_pages = []; excluded = []
for name, tables in raw_rows.items():
    for i, r in tables.get('Queries',[]):
        q = r['Top queries']
        if relevant(q):
            evidence.append({**metadata(name),'exact_source_query':q,'clicks':r['Clicks'],
                'impressions':r['Impressions'],'ctr_ratio':r['CTR'],'average_position':r['Position'],
                'source_range':f'Queries!A{i}:E{i}',
                'page_filter_owner_observation':books[name]['source']['filters'].get('Page'),
                'page_filter_note':'Exact query is observed on the Page filter only for that source period; not transferable to another period or keyword.' if books[name]['source']['filters'].get('Page') else 'No query-by-page attribution in this unfiltered Queries table.'})
        elif (CORE.search(q) or INFOTAINMENT.search(q)) and EXCLUDE.search(q):
            excluded.append({**metadata(name),'exact_source_query':q,'clicks':r['Clicks'],
                'impressions':r['Impressions'],'ctr_ratio':r['CTR'],'average_position':r['Position'],
                'source_range':f'Queries!A{i}:E{i}',
                'reason':'Performance tuning/calibration intent excluded from OEM programming demand; preserve tuning ownership.' if not re.search('security|immobil',q,re.I) else 'Security-related demand kept out of public expansion; not a proposed service.'})
    for i,r in tables.get('Pages',[]):
        url = r['Top pages']
        if re.search(r'diagnostic|electrical|head-unit|cue-screen|audio-upgrade|/tuning',url,re.I):
            independent_pages.append({**metadata(name),'url':url,'clicks':r['Clicks'],'impressions':r['Impressions'],
                'ctr_ratio':r['CTR'],'average_position':r['Position'],'source_range':f'Pages!A{i}:E{i}',
                'attribution':'Independent page dimension; not joined to a query by row order or similarity.'})
cwrite('ecu-electronics-query-evidence-all-periods.csv', evidence)
cwrite('independent-page-evidence.csv', independent_pages)
cwrite('excluded-remapping-security-query-evidence.csv', excluded)

attachment = Path(r'C:\Users\ADMIN\.codex\attachments\8da68c46-fb9b-478c-8458-8585c93a517d\Pasted text.txt').read_text(encoding='utf-8')
section = attachment.split('Investigate:')[1].split('Treat these as research candidates')[0]
requested = [l[2:].strip() for l in section.splitlines() if l.startswith('- ')]
assert len(requested) == 16
lookups = {label:{norm(r['Top queries']):(i,r) for i,r in raw_rows[name]['Queries']} for label,name in PRIMARY.items()}
all_lookup = {}
for e in evidence: all_lookup.setdefault(norm(e['exact_source_query']),[]).append(e)

DIAG='/services/car-diagnostics-dubai'
MDIAG='/services/mercedes-diagnostics-dubai'
BDIAG='/brands/bmw-service-dubai/engine-diagnostics'
ELEC='/services/auto-electrical-repair-dubai'
MELEC='/services/mercedes-electrical-repair-dubai'
BELEC='/brands/bmw-service-dubai/electrical-repair'
PELEC='/brands/porsche-service-dubai/electrical-repair'
CUE='/services/cadillac-cue-screen-repair-dubai'
HEAD='/services/head-unit-repair-dubai'
AUDIO='/services/mercedes-audio-upgrade-dubai'
owner_audit_path=ROOT/'outputs/ecu-electronics-2026-10-19/audit/baseline-owner-audit.json'
owner_audit=json.loads(owner_audit_path.read_text(encoding='utf-8'))
owners={r['route']:r for r in owner_audit['records']}
def classify(q):
    n=norm(q)
    if INFOTAINMENT.search(q):
        if 'cue' in n or ('cadillac' in n and ('screen' in n)): return CUE,'Infotainment screen repair/replacement','Existing website service claim; fitted unit and repair/replacement scope confirmed after assessment.'
        if 'head' in n or 'comand' in n or 'mbux' in n: return HEAD,'Head-unit fault assessment/repair','Existing head-unit repair claim; COMAND/MBUX generation and exact fault require assessment, no universal unit support.'
        if 'mercedes' in n and 'audio' in n: return AUDIO,'Audio upgrade consultation','Existing Mercedes audio service claim; fitted equipment, proposed parts and integration must be confirmed.'
        return HEAD,'Infotainment upgrade candidate','Outside confirmed brand/model scope; no cross-brand upgrade or activation promise. Existing head-unit owner is assessment context only.'
    electrical = bool(re.search(r'electr|communication|\bsam\b',n))
    if electrical:
        owner = MELEC if 'mercedes' in n else BELEC if 'bmw' in n else PELEC if 'porsche' in n else '/brands/audi-service-dubai/electrical-repair' if 'audi' in n else ELEC
        intent='Electrical fault investigation'
        boundary='Existing electrical diagnostic/repair claim; investigate wiring, supply and fault evidence. A communication fault does not prove module hardware failure.'
        if 'sam' in n: boundary='SAM-specific bench repair remains unverified. Electrical owner can assess the reported symptoms; do not advertise SAM repair.'
        return owner,intent,boundary
    owner=MDIAG if 'mercedes' in n else BDIAG if 'bmw' in n else DIAG
    if re.search(r'\b(?:repair|fix)\b',n): return owner,'ECU/control-module hardware repair candidate','Hardware ECU/module repair, cloning and used-unit support are unverified. Owner is fault-assessment context only; no advertised hardware repair service.'
    if 'scanning' in n or 'diagnostic' in n: return owner,'ECU scan / diagnostic assessment','Scan codes are diagnostic evidence, not proof that programming or ECU replacement will fix the fault.'
    if 'calibration' in n: return owner,'Calibration candidate','Specific steering/ADAS/module calibration and equipment compatibility remain unverified; no public expansion.'
    return owner,'OEM programming/coding enquiry','Existing conditional coding/programming website claim. Exact vehicle, module, software, access and requested function require workshop confirmation; no cloning, security or universal replacement support.'

# Manual commercial ordering is explained per row. No invented score, search
# volume, numeric difficulty, lead count or cross-period sum is calculated.
ranked = [
('mercedes coding service','Direct coding intent, 147 primary impressions. Use established Mercedes diagnostics owner and qualify exact module/function; website claim is not job-level verification.'),
('bmw coding service','Direct coding intent, 88 primary impressions, plus 2 fresh 24-hour impressions. Use existing BMW diagnostics owner with exact-function qualification.'),
('cue screen replacement in dubai','365 primary impressions and existing specialist screen owner. Distinct infotainment repair intent, not OEM programming demand.'),
('head unit repairing dubai','247 primary impressions; existing head-unit owner can clarify fault assessment and fitted-system compatibility. Separate from programming and planned audio upgrades.'),
('cadillac touch screen repair in dubai','364 primary impressions, same CUE owner as screen-replacement variants. Strengthen one owner and avoid a second keyword route.'),
('auto electrical diagnostics dubai','82 primary impressions with clear diagnostic intent on existing electrical owner. Supports fault evidence before coding/programming decisions.'),
('cadillac srx screen replacement in dubai','191 primary impressions at 49.25; explicit model, component and workshop location intent on the existing CUE owner. Exact unit and replacement suitability still require assessment.'),
('cadillac xts touch screen replacement in dubai','129 primary impressions at 40.04; explicit model and touchscreen-replacement intent shares the existing CUE owner. No separate model route is warranted.'),
('bmw electrical repair','21 primary impressions at 10.81; existing brand electrical owner offers focused fault-assessment intent. Preserve prior repair work.'),
('mercedes electrical repair','27 primary impressions at 18.33; existing Mercedes electrical owner supports communication and supply-fault assessment, without claiming SAM/TCM bench repair.'),
('porsche electrical repair dubai','27 primary impressions at 16.67; existing brand electrical owner. Monitor or link narrowly rather than expand unverified Porsche module programming.'),
('car electrical repair dubai','243 primary impressions but position 50.59 and broad competition; improve relevance and enquiry clarity on existing electrical owner, not a duplicate ECU page.'),
('car electrical fault repair in dubai','25 primary impressions at 41.20; explicit electrical-fault repair intent and Dubai location on the existing electrical owner. Scope follows fault investigation, not an assumed failed control module.'),
('mercedes car coding','17 primary impressions at 29.94; same Mercedes diagnostics owner as coding-service query. Explain function limits and ask whether a module was replaced.'),
('mercedes e class audio upgrade in dubai','151 primary impressions at 53.97 on distinct existing audio-upgrade owner; compatibility-qualified enquiry, separate from head-unit repairs or OEM coding.')
]
rankmap={norm(q):(i,why) for i,(q,why) in enumerate(ranked,1)}
proposed_extra=[
    'Mercedes SAM module fault diagnosis Dubai','Mercedes MBUX repair Dubai','Mercedes COMAND repair Dubai',
    'Car module software update Dubai','Control module adaptation Dubai','BMW control module replacement coding Dubai',
    'ECU hardware repair Dubai','ECU cloning Dubai'
]
measured_queries=list(dict.fromkeys(e['exact_source_query'] for e in evidence))
queries=list(measured_queries)
for q in requested+proposed_extra:
    if norm(q) not in {norm(x) for x in queries}: queries.append(q)

def baseline_fields(q):
    fields={}
    for label,name in PRIMARY.items():
        match=lookups[label].get(norm(q)); source=books[name]['source']
        fields.update({label+'_observed':bool(match),label+'_clicks':match[1]['Clicks'] if match else None,
            label+'_impressions':match[1]['Impressions'] if match else None,label+'_ctr_ratio':match[1]['CTR'] if match else None,
            label+'_average_position':match[1]['Position'] if match else None,label+'_source_file':name,
            label+'_source_period':f"{source['start']} to {source['end']}",label+'_source_time_column':source['time_column'],
            label+'_filters':json.dumps(source['filters'],ensure_ascii=False,separators=(',',':')),
            label+'_source_range':f'Queries!A{match[0]}:E{match[0]}' if match else None,
            label+'_missing_meaning':'' if match else 'Not observed in visible exported query rows; not zero search demand.'})
    return fields

rows=[]
for q in queries:
    owner,intent,boundary=classify(q); observations=all_lookup.get(norm(q),[])
    rank,why=rankmap.get(norm(q),(None,''))
    proposed=not observations
    hold=bool(re.search(r'hardware|cloning|\becu\b.*(?:repair|fix)|module repair|\bsam\b|calibration|\bmobile\b|toyota|vcds|aston martin|dodge|lexus|mustang|steering rack',norm(q)))
    if 'transmission control module' in norm(q): hold=True
    priority='P1: existing-owner improvement/measurement' if rank else 'P2: supporting measured variant'
    if hold: priority='HOLD: verify exact service/capability'
    elif proposed: priority='PROPOSED: no measured exact-query metrics'
    if norm(q) in ['ecu centre','mercedes ecu','car programming','ecu scanning service','ecu diagnostic service']:
        priority='P3: ambiguous intent, qualify before targeting'
    primary=next((e for e in observations if e['source_file']==PRIMARY['92d']),None)
    display=primary
    if not display:
        display=next((e for e in observations if e['source_file']==PRIMARY['24h']),None)
    if not display:
        display=next((e for e in observations if e['source_file']==PRIMARY['28d_historical']),None)
    if not display and observations:
        display=max(observations,key=lambda e:(books[e['source_file']]['source']['end'],not bool(e['page_filter_owner_observation'])))
    owner_record=owners.get(owner)
    assert owner_record, f'Assigned owner missing from baseline audit: {owner}'
    if 'steering rack' in norm(q): boundary='Electronic steering-rack repair is a distinct component repair, not evidence of generic ECU hardware or OEM module programming capability. Retain only as workshop-verification backlog; electrical owner is assessment context.'
    row={'query':q,'evidence_class':'Measured exact raw GSC query' if observations else 'Proposed exact variant; absent from inspected visible exports',
        'requested_candidate':norm(q) in {norm(x) for x in requested},'intent':intent,
        'commercial_priority':priority,'top15_rank':rank,'priority_reason':why or ('Capability evidence is required before public expansion.' if hold else 'Supporting variant shares an existing owner; no separate page.'),
        'structural_owner':owner,'owner_assignment_basis':'Editorial intent assignment to existing route verified in baseline-owner-audit.json; not inferred from independent GSC Pages rows.',
        'owner_indexable':not any('noindex' in x for x in owner_record['robots']),
        'owner_in_sitemap':owner_record['inSitemap'],
        'owner_canonical':owner_record['canonical'],
        'owner_baseline_html_sha256':owner_record['htmlSha256'],
        'arabic_counterpart':None if owner in [CUE,HEAD,AUDIO] else '/ar'+owner,
        'locale_note':'Existing specialist owner is EN-only; no Arabic counterpart route may be invented.' if owner in [CUE,HEAD,AUDIO] else 'Existing EN/AR owner pair; source audit confirms canonical/hreflang/sitemap.',
        'capability_boundary':boundary,
        'gsc_unfiltered_query_page_owner':None,
        'gsc_query_page_evidence':'No joined exact-query/page attribution for primary unfiltered baseline. See separate page-filter observations, if any.',
        'page_filtered_observations_json':json.dumps([e for e in observations if e['page_filter_owner_observation']],ensure_ascii=False,separators=(',',':')),
        'all_period_observations_not_summed':len(observations),
        'display_source_selection':'Exact primary 92-day row when present; otherwise exact fresh 24-hour, historical 28-day, then latest available source observation. Separate periods are never combined.',
        'display_exact_source_query':display['exact_source_query'] if display else None,
        'display_clicks':display['clicks'] if display else None,
        'display_impressions':display['impressions'] if display else None,
        'display_ctr_ratio':display['ctr_ratio'] if display else None,
        'display_average_position':display['average_position'] if display else None,
        'display_source_file':display['source_file'] if display else None,
        'display_source_period':display['source_period'] if display else None,
        'display_source_filters':display['source_filters'] if display else None,
        'display_source_range':display['source_range'] if display else None,
        'all_period_exact_observations_json':json.dumps(observations,ensure_ascii=False,separators=(',',':')),
        'other_observation_refs_json':json.dumps([{'source_file':e['source_file'],'source_period':e['source_period'],'source_filters':e['source_filters'],'source_range':e['source_range']} for e in observations if e['source_file'] not in PRIMARY.values()],ensure_ascii=False,separators=(',',':')),
        'recommended_action':'Assess the reported fault through existing owner, obtain workshop function evidence and joined GSC data; no public hardware/security/universal compatibility promise.' if hold else 'Improve existing owner explanation, exact-function enquiry and relevant internal links; no new route.' if rank else 'Retain as supporting owner/backlog. Verify function compatibility before adding factual coverage.',
        'competition':'Qualitative competitor service-page review only; no numeric keyword difficulty, rank report or DIGI-TEC capability inference.',
        'competition_sources':'qualitative-competition-review.json',**baseline_fields(q)}
    if proposed:
        assert not any(norm(r['Top queries'])==norm(q) for tables in raw_rows.values() for _,r in tables['Queries'])
    if priority.startswith('P3:'):
        row['priority_reason']='Broad ECU/scan/programming wording can include tool, DIY, informational or performance-tuning intent. Confirm the actual search results and query-by-page workshop relevance before treating it as qualified service demand.'
        row['recommended_action']='Retain exact measurements as intent-verification backlog; do not include in top commercial demand or infer a programming/hardware service. Existing diagnostic owner is context only.'
    rows.append(row)
rows.sort(key=lambda r:(r['top15_rank'] is None,r['top15_rank'] or 999,r['evidence_class'],r['query']))
jwrite('keyword-opportunity-matrix.json',rows); cwrite('keyword-opportunity-matrix.csv',rows)
top15=[r for r in rows if r['top15_rank']]
assert len(top15)==15 and all(r['92d_observed'] for r in top15)
jwrite('top15-commercial-opportunities.json',top15);cwrite('top15-commercial-opportunities.csv',top15)
cwrite('next-specialist-electronics-keyword-backlog.csv',[r for r in rows if not r['top15_rank']])
requested_rows=[]
for q in requested:
    found=next(r for r in rows if norm(r['query'])==norm(q))
    requested_rows.append({**found,'query':q})
cwrite('requested-candidate-baselines.csv', requested_rows)

competition={
    'reviewed_at':'2026-10-19','method':'Unpersonalized web search and primary competitor business-page text. Location unspecified. Qualitative assessment only; not local rank order, map ranking or numeric difficulty.',
    'clusters':[
        {'cluster':'Mercedes/BMW coding and electrical diagnostics','assessment':'Dedicated specialist businesses advertise coding/programming and electrical fault assessment. Clear competition exists; DIGI-TEC should explain scope and confirm exact functions rather than copy competitor capability claims.','sources':['https://mbcod.com/','https://www.germancarexpert.ae/services/electrical-repair/']},
        {'cluster':'General ECU/module programming','assessment':'Dedicated programming and electronics pages compete with general diagnostic owners. Search visibility is not evidence that DIGI-TEC supports the same hardware, security or access functions.','sources':['https://www.soranautotech.com/services','https://spikeautos.com/ecu-control-module-programming-coding-cloning-service-in-dubai/','https://spectrumgermanauto.ae/german-car-repair-service-dubai/car-computer-programming-dubai/']},
        {'cluster':'Cadillac screen repair','assessment':'A dedicated Cadillac CUE repair competitor explains screen symptoms and replacement choices. Existing DIGI-TEC specialist owner matches this distinct measured intent.','sources':['https://autodoctor.ae/cadillac-touch-screen-repair-dubai/']},
        {'cluster':'Mercedes audio upgrades','assessment':'Dedicated audio installers advertise C-Class and E-Class options. Confirm fitted equipment and proposed integration; do not imply universal retrofit compatibility.','sources':['https://alchapoautoservice.com/audio-infotainment-customization/','https://carplazadubai.com/services/sound-systems/']}
    ]}
jwrite('qualitative-competition-review.json',competition)
checks={'source_workbooks':len(sources),'all_raw_sources_verified_unchanged':all(s['raw_read_only_verified'] for s in sources),
    'all_cells_equal_reused_extraction':True,'matrix_rows':len(rows),'measured_distinct_queries':len(measured_queries),
    'proposed_distinct_queries':len(rows)-len(measured_queries),'requested_candidates':len(requested),
    'requested_exact_measured':sum(r['evidence_class'].startswith('Measured') for r in requested_rows),
    'requested_exact_proposed':sum(r['evidence_class'].startswith('Proposed') for r in requested_rows),
    'top15':len(top15),'all_top15_have_primary_92d_exact_rows':all(r['92d_observed'] for r in top15),
    'all_top15_ctr_and_clicks_measured_zero':all(r['92d_clicks']==0 and r['92d_ctr_ratio']==0 for r in top15),
    'primary_92d_matrix_queries':sum(r['92d_observed'] for r in rows),
    'overlapping_periods_summed':False,'independent_tabs_joined_to_queries':False,
    'page_filtered_tuning_ownership_observations':sum(bool(e['page_filter_owner_observation']) for e in evidence),
    'query_observations_all_sources_not_summed':len(evidence),'excluded_observations_not_summed':len(excluded),
    'monthly_search_volume_invented':False,'missing_metrics_coerced_to_zero':False,
    'all_structural_owners_verified_indexable':all(r['owner_indexable'] for r in rows),
    'all_structural_owners_in_sitemap':all(r['owner_in_sitemap'] for r in rows),
    'owner_audit_path':str(owner_audit_path),'owner_audit_sha256':digest(owner_audit_path),
    'raw_verification':verification}
jwrite('analysis-checks.json',checks)

report=[
'DIGI-TEC ECU PROGRAMMING AND SPECIALIST ELECTRONICS GSC RESEARCH — 19 OCTOBER 2026','',
f"{len(rows)} opportunities: {len(measured_queries)} distinct measured queries and {len(rows)-len(measured_queries)} proposed exact variants. All 16 requested candidates are retained. One requested exact query is measured historically: ECU repair Dubai. The other 15 candidates have no exact row in the visible exports and carry blank metrics.",
'', 'SOURCE BASIS',
'17 original workbooks independently reopened read-only with bundled Python. Every extracted sheet value, source hash, exact Queries row and before/after hash agrees with the prior extraction. No workbook was saved.',
'Primary 92-day: 10 July to 9 October 2026, Web, Last 3 months, no additional filter. This is the newest unfiltered query-level 92-day source.',
'Historical 28-day: 6 August to 2 September 2026, Web, Last 28 days. It overlaps the 92-day period; no sum or before/after change is calculated.',
'24-hour: 18 October 06:00 to 19 October 05:00, Time (UTC+04:00), Dubai time. Web (text-based), Last 24 hours. Tiny samples are fresh observations, not proof of post-sprint growth.',
'Other 7-day, older 92-day, 167-day, Mercedes-query-filtered, tuning-page-filtered, PPF-filtered and Product-snippets exports retain their original filters and are not pooled. Identical September workbooks are marked semantic duplicates.',
'Some Queries sheets contain 1000 exported rows. Missing/anonymized/capped queries make absence unavailable, not measured zero demand. CTR is retained exactly as the exported ratio; source rounding may differ from clicks/impressions recomputation.',
'No new 28-day query baseline can be reconstructed from daily Chart totals. Obtain a current unfiltered 28-day query export and a comparable nonoverlapping post-release period.',
'', 'OWNERSHIP AND CAPABILITY',
'Route ownership is an editorial assignment to verified existing indexable service owners. Independent Queries and Pages tabs are never joined by row order or wording.',
'The 5 September to 2 October /tuning page-filtered export does observe exact car programming, mercedes ecu, ecm programmer near me and ecu reprogramming near me on /tuning for that period. Those observations are retained as a cannibalization/intent warning. They do not transfer to unfiltered primary-period metrics and do not establish OEM programming capability.',
'OEM programming/coding, electrical fault assessment and infotainment repair/audio are separate intents. Performance ECU tuning/remapping is excluded from OEM programming totals and retained in a separate evidence appendix.',
'Existing conditional website coding/programming statements support factual explanations and exact-function enquiry only. Hardware ECU repair, cloning, SAM bench repair, TCM programming, used-unit configuration, manufacturer access and exact calibration support require workshop evidence. Security and immobilizer functions remain outside public expansion.',
'CUE, head-unit and Mercedes audio specialist owners are existing English-only routes. No Arabic counterpart route is invented. Diagnostic/electrical owners have existing English/Arabic pairs.',
'', 'PRIORITIZATION',
'Manual commercial ordering considers exact measured demand, average position, relevance to a supported existing owner, current capability boundaries and qualitative competitor pages. It is not an invented score or monthly volume estimate. Similar keyword variants share one owner; no new route is justified.',
'The top 15 all have exact primary 92-day rows. Screen/audio demand is explicitly classified as specialist electronics rather than padding OEM programming demand. Every top-15 query has 0 clicks and 0 exported CTR in that source.',
'ECU scanning service, ECU diagnostic service and car programming are retained as P3 intent-verification backlog, despite some favourable average positions. Without clear workshop/location intent, they may include tools, DIY, informational or tuning needs. Model-specific SRX/XTS touchscreen replacement and Dubai electrical-fault repair receive higher commercial priority.',
'', 'TOP 15 — PRIMARY 92-DAY EXACT QUERY, CLICKS / IMPRESSIONS / CTR / AVERAGE POSITION']
for r in top15:
    report.append(f"{r['top15_rank']}. {r['query']}: {r['92d_clicks']:g} / {r['92d_impressions']:g} / {r['92d_ctr_ratio']:.2%} / {r['92d_average_position']:.2f}. {r['structural_owner']}. {r['priority_reason']}")
report += ['', 'REQUESTED EXACT QUERY NOTES',
'ECU repair Dubai is absent from the visible primary 92-day and 24-hour exports. Historical 28-day evidence: 0 clicks, 8 impressions, 0 CTR, average position 46.38, Queries!A638:E638. Older 92-day evidence: 23 impressions at 47.26. 167-day evidence: 48 impressions at 41.38. These are separate overlapping periods and are not summed. Hardware repair remains unverified.',
'BMW coding Dubai is a proposed exact variant. The measured BMW coding service query has 88 primary impressions at 38.77; those metrics belong only to that exact raw query.',
'Automotive electrical diagnostics Dubai is a proposed exact variant. Measured auto electrical diagnostics Dubai has 82 primary impressions at 36.72; the wording and metrics remain separate.',
'No exact SAM, TCM programming, communication-fault, MBUX or COMAND query occurs in these visible exports. Such phrases are proposed scope-qualified backlog, without numeric demand claims.',
'', 'NEXT EVIDENCE',
'Obtain Search Analytics query+page dimensions for exact coding/programming, ECU scan, electrical and screen/head-unit clusters, retaining period and country/device/search-appearance filters. Inspect the actual canonical owner via Search Console URL Inspection.',
'Request workshop function/vehicle evidence before hardware, replacement configuration, access, cloning or specialized calibration expansion. Ask make/model/year, symptoms, warning messages, prior reports, recent module replacement and appointment preference; no passwords or immobilizer secrets.',
'Measure qualified received enquiries from actual lead records. WhatsApp drafts, button clicks and tel opens are contact attempts only.',
'', 'PRIMARY COMPETITION SOURCES']
for c in competition['clusters']:
    report.append(c['cluster']+': '+c['assessment'])
    report.extend('  '+s for s in c['sources'])
(OUT/'GSC-RESEARCH-REPORT.txt').write_text('\n'.join(report)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in checks.items() if k!='raw_verification'},indent=2))
