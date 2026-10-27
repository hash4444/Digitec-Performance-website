"""Independent verification of final analytical CSV/JSON against source cells."""
from pathlib import Path
import csv, hashlib, json, re, warnings
import openpyxl

OUT=Path(__file__).resolve().parent
warnings.filterwarnings('ignore',message='Workbook contains no default style')
sources=json.loads((OUT/'source-manifest.json').read_text(encoding='utf-8'))
matrix=json.loads((OUT/'keyword-opportunity-matrix.json').read_text(encoding='utf-8'))
top=json.loads((OUT/'top15-commercial-opportunities.json').read_text(encoding='utf-8'))
books={}; assertion_count=0; source_cells=0
def check(value,message):
    global assertion_count
    assertion_count+=1
    if not value: raise AssertionError(message)
def norm(q): return re.sub(r'\s+',' ',q.casefold()).strip()
for s in sources:
    p=Path(s['path']); digest=hashlib.sha256(p.read_bytes()).hexdigest()
    check(digest==s['sha256']==s['current_sha256'],f'Source hash changed: {p.name}')
    wb=openpyxl.load_workbook(p,read_only=True,data_only=True)
    books[p.name]={sheet.title:list(sheet.values) for sheet in wb}
    wb.close()

def verify_ref(source_name,source_range,query,clicks,impressions,ctr,position):
    global source_cells
    match=re.fullmatch(r'Queries!A(\d+):E\1',source_range or '')
    check(bool(match),f'Invalid exact row reference: {source_range}')
    row=books[source_name]['Queries'][int(match[1])-1]
    for actual,expected in zip(row[:5],[query,clicks,impressions,ctr,position]):
        check(actual==expected,f'Source mismatch: {source_name} {source_range}: {actual} != {expected}')
        source_cells+=1

with (OUT/'ecu-electronics-query-evidence-all-periods.csv').open(encoding='utf-8-sig',newline='') as f:
    evidence=list(csv.DictReader(f))
for e in evidence:
    verify_ref(e['source_file'],e['source_range'],e['exact_source_query'],
        float(e['clicks']),float(e['impressions']),float(e['ctr_ratio']),float(e['average_position']))
for r in matrix:
    measured=r['evidence_class'].startswith('Measured')
    all_exact=[v[0] for b in books.values() for v in b['Queries'][1:] if v and v[0] is not None and norm(v[0])==norm(r['query'])]
    check(bool(all_exact)==measured,'Exact query evidence classification mismatch: '+r['query'])
    for label in ['92d','28d_historical','24h']:
        if r[label+'_observed']:
            exact=next(v for v in books[r[label+'_source_file']]['Queries'][1:] if v and norm(v[0])==norm(r['query']))[0]
            verify_ref(r[label+'_source_file'],r[label+'_source_range'],exact,
                r[label+'_clicks'],r[label+'_impressions'],r[label+'_ctr_ratio'],r[label+'_average_position'])
        else:
            check(all(r[label+k] is None for k in ['_clicks','_impressions','_ctr_ratio','_average_position','_source_range']),
                'Missing metrics coerced to values: '+r['query'])
    if measured:
        verify_ref(r['display_source_file'],r['display_source_range'],r['display_exact_source_query'],
            r['display_clicks'],r['display_impressions'],r['display_ctr_ratio'],r['display_average_position'])
    else:
        check(all(r[k] is None for k in ['display_clicks','display_impressions','display_ctr_ratio','display_average_position']),
            'Proposed metrics are populated: '+r['query'])
    check(r['owner_indexable'] and r['owner_in_sitemap'],'Owner is not verified indexable/in sitemap: '+r['query'])
    check(r['gsc_unfiltered_query_page_owner'] is None,'Unverified joined owner was assigned: '+r['query'])
check(len(top)==15 and [r['top15_rank'] for r in top]==list(range(1,16)),'Top 15 ranks incorrect')
check(all(r['92d_observed'] for r in top),'Top 15 includes unmeasured exact primary query')
check(len([r for r in matrix if r['requested_candidate']])==16,'Requested candidate coverage incomplete')
check(len([r for r in matrix if r['requested_candidate'] and r['evidence_class'].startswith('Measured')])==1,
    'Requested measured/proposed distinction changed')
with (OUT/'keyword-opportunity-matrix.csv').open(encoding='utf-8-sig',newline='') as f:
    csv_rows=list(csv.DictReader(f))
check(len(csv_rows)==len(matrix),'CSV and JSON row counts differ')
check([r['query'] for r in csv_rows]==[r['query'] for r in matrix],'CSV and JSON query order differs')
check(all(not re.search(r'\btuning\b|\bremap\b|immobili|security',r['query'],re.I) for r in matrix),'Excluded demand leaked into matrix')
result={'passed':True,'assertions':assertion_count,'source_metric_cells_checked':source_cells,
    'source_workbooks_reopened':len(books),'raw_evidence_observations_verified':len(evidence),
    'matrix_rows_verified':len(matrix),'top15_exact_primary_rows_verified':len(top),
    'proposed_metrics_unavailable_not_zero':True,'requested_exact_measured':1,'requested_exact_proposed':15,
    'independent_query_page_join_invented':False,'workbooks_modified':False}
(OUT/'independent-evidence-verification.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,indent=2))
