"""Independent reopening of primary workbooks against delivered matrix."""
from pathlib import Path
import csv, hashlib, json, warnings
import openpyxl

warnings.filterwarnings('ignore',message='Workbook contains no default style')
OUT=Path(__file__).resolve().parent
matrix=json.loads((OUT/'keyword-opportunity-matrix.json').read_text(encoding='utf-8'))
manifest=json.loads((OUT/'source-manifest.json').read_text(encoding='utf-8'))
assert len(matrix)==len({r['query'].lower() for r in matrix})==50
for source in manifest:
    assert hashlib.sha256(Path(source['path']).read_bytes()).hexdigest()==source['sha256']
checks=0; observed=0; books={}
for r in matrix:
    for label in ['24h','28d_historical','92d']:
        source=r[label+'_source_file']
        if source not in books:
            b=openpyxl.load_workbook(Path(r'C:\Users\ADMIN\Downloads')/source,read_only=True,data_only=True)
            books[source]={'Queries':list(b['Queries'].values),'Filters':list(b['Filters'].values)};b.close()
        values=books[source]['Queries']; filters=dict(books[source]['Filters'][1:])
        assert json.loads(r[label+'_filters'])==filters
        if r[label+'_observed']:
            observed+=1; number=int(r[label+'_source_range'].split('!A')[1].split(':')[0]);actual=values[number-1]
            assert actual[0].lower().replace('-',' ')==r['query'].lower().replace('-',' ')
            for name,value in zip(['clicks','impressions','ctr','position'],actual[1:5]):
                assert r[label+'_'+name]==value,(r['query'],label,name,r[label+'_'+name],value)
                checks+=1
        else:
            assert r[label+'_source_range'] is None
            assert all(r[label+'_'+x] is None for x in ['clicks','impressions','ctr','position'])
            assert 'not zero demand' in r[label+'_missing_meaning']
            assert not any(isinstance(x[0],str) and x[0].lower().replace('-',' ')==r['query'].lower().replace('-',' ') for x in values[1:])
with (OUT/'keyword-opportunity-matrix.csv').open(encoding='utf-8-sig',newline='') as f: csvrows=list(csv.DictReader(f))
assert len(csvrows)==50 and csvrows[0]['query']==matrix[0]['query']
result={'passed':True,'raw_workbook_hashes_reverified':len(manifest),'primary_workbooks_reopened':len(books),'matrix_period_rows_checked':len(matrix)*3,'observed_exact_primary_query_rows':observed,'numeric_metric_values_matched_exactly':checks,'absent_rows_retained_null':True,'csv_and_json_counts_match':True,'independent_check':'Reopened primary XLSX files read-only; checked exact worksheet rows, source filters and numeric values; no builder import.'}
(OUT/'independent-evidence-verification.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,indent=2))
