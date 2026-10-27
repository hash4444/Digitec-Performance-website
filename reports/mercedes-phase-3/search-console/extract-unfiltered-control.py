"""Read-only analysis of the authenticated native CSV export. No network or API.
Preserve ZIP/CSV bytes; write extraction and derived control summaries only here.
"""
from pathlib import Path
from datetime import date, timedelta, datetime, timezone
import csv
import hashlib
import io
import json
import zipfile

ROOT = Path(__file__).resolve().parent
ZIP_PATH = ROOT / 'exports/gsc-90d-all-country-all-device-unfiltered-2026-10-26.zip'
OUT_DIR = ROOT / 'exports/unfiltered-90d'
SUMMARY_PATH = ROOT / 'exports/unfiltered-90d-control-summary.json'

def sha(data):
    return hashlib.sha256(data).hexdigest()

def read_rows(raw):
    return list(csv.DictReader(io.StringIO(raw.decode('utf-8-sig'))))

def metrics(row):
    return {
        'clicks': int(row['Clicks']) if row['Clicks'].strip() else None,
        'impressions': int(row['Impressions']) if row['Impressions'].strip() else None,
        'ctr_fraction': float(row['CTR'].removesuffix('%')) / 100 if row['CTR'].strip() else None,
        'average_position': float(row['Position']) if row['Position'].strip() else None,
    }

def additive_summary(rows):
    clicks = sum(int(row['Clicks']) for row in rows)
    impressions = sum(int(row['Impressions']) for row in rows)
    return {
        'rows': len(rows), 'clicks': clicks, 'impressions': impressions,
        'ctr_fraction_calculated': clicks / impressions if impressions else None,
        'average_position_impression_weighted_from_rounded_rows_approx':
            sum(float(row['Position']) * int(row['Impressions']) for row in rows) / impressions if impressions else None,
    }

zip_before = ZIP_PATH.read_bytes()
tables = {}
source_files = []
OUT_DIR.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(io.BytesIO(zip_before)) as archive:
    if archive.testzip() is not None:
        raise ValueError('ZIP CRC validation failed')
    for entry in archive.infolist():
        if entry.is_dir():
            continue
        target = (OUT_DIR / entry.filename).resolve()
        if target.parent != OUT_DIR.resolve() or target.suffix.lower() != '.csv':
            raise ValueError('Unexpected path or non-CSV ZIP entry: ' + entry.filename)
        raw = archive.read(entry)
        if target.exists() and target.read_bytes() != raw:
            raise ValueError('Refusing to overwrite nonidentical extracted evidence: ' + str(target))
        if not target.exists():
            target.write_bytes(raw)
        rows = read_rows(raw)
        tables[entry.filename] = rows
        source_files.append({'file': entry.filename, 'bytes': len(raw), 'sha256': sha(raw), 'data_rows': len(rows),
                             'headers': list(rows[0]) if rows else next(csv.reader(io.StringIO(raw.decode('utf-8-sig'))))})

required = {'Chart.csv','Queries.csv','Pages.csv','Countries.csv','Devices.csv','Search appearance.csv','Filters.csv'}
if set(tables) != required:
    raise ValueError('Unexpected export table set')
filters = {row['Filter']: row['Value'] for row in tables['Filters.csv']}
if filters != {'Search type':'Web (text-based)','Date':'27 Jul 2026-24 Oct 2026'}:
    raise ValueError('Export filters differ from unfiltered 90-day plan: ' + repr(filters))
dates = [row['Date'] for row in tables['Chart.csv']]
expected_dates = [(date(2026,7,27) + timedelta(days=i)).isoformat() for i in range(90)]
if sorted(dates) != expected_dates or len(set(dates)) != 90:
    raise ValueError('Daily coverage not exactly 90 unique requested dates')

windows = [('7d-baseline','2026-10-18','2026-10-24'),('28d','2026-09-27','2026-10-24'),('90d','2026-07-27','2026-10-24')]
chart_windows = [{'window_id':name,'start':start,'end':end,**additive_summary([r for r in tables['Chart.csv'] if start <= r['Date'] <= end])}
                 for name,start,end in windows]
queries = ['mercedes service dubai','mercedes repair dubai','mercedes specialist dubai','mercedes workshop dubai','mercedes maintenance dubai','mercedes oil change dubai']
query_controls = []
for query in queries:
    found = [(index+2,row) for index,row in enumerate(tables['Queries.csv']) if row['Top queries'] == query]
    if len(found) > 1:
        raise ValueError('Duplicate exact query row')
    item = {'query':query,'aggregation':'QUERY_ONLY_UNFILTERED_COUNTRY_DEVICE', 'window_start':'2026-07-27','window_end':'2026-10-24',
            'country':'ALL','device':'ALL','page_attribution':'NOT_AVAILABLE_FROM_THIS_EXPORT',
            'availability_status':'VISIBLE_ROW' if found else 'NOT_IN_VISIBLE_EXPORT'}
    if found:
        item.update({'source_row':found[0][0], **metrics(found[0][1])})
    query_controls.append(item)

workspace = ROOT.parents[2]
old_path = workspace / 'reports/evidence-2026-10-26/gsc/current-workbook-extraction.json'
old = json.loads(old_path.read_text(encoding='utf-8-sig'))
chart7 = [r for r in tables['Chart.csv'] if '2026-10-18' <= r['Date'] <= '2026-10-24']
old_by_date = {row['Date']:row for row in old['Chart']}
baseline_deltas = []
for row in chart7:
    prior = old_by_date[row['Date']]
    baseline_deltas.append({'date':row['Date'],'clicks_delta':int(row['Clicks'])-prior['Clicks'],
                           'impressions_delta':int(row['Impressions'])-prior['Impressions'],
                           'position_display_delta':float(row['Position'])-prior['Position']})

summary = {
    'generated_at_utc':datetime.now(timezone.utc).isoformat(),
    'method':'Native authenticated UI export supplied by root; ZIP CRC/path-safe extraction; CSV analysis only; no source refresh/mutation.',
    'zip_file':str(ZIP_PATH), 'zip_sha256':sha(zip_before), 'zip_unchanged_after_analysis':ZIP_PATH.read_bytes()==zip_before,
    'property':'sc-domain:digitecme.com','property_provenance':'Root authenticated UI capture; export Filters.csv itself omits property identifier.',
    'filters':filters,'country_filter':'ALL','device_filter':'ALL',
    'date_basis':'GSC daily dates; root verified Pacific Time reporting basis; Dubai used for capture timestamps only.',
    'finality':'Root confirmed October24 common latest complete day; this CSV does not independently expose dataState/API finality.',
    'source_files':source_files,'chart_coverage':{'days':len(dates),'start':min(dates),'end':max(dates),'unique_days':len(set(dates))},
    'sitewide_chart_windows':chart_windows,
    'query_only_90d_controls':query_controls,
    'uae_sitewide_90d_country_row':[{'country':r['Country'],**metrics(r),'source_row':i+2} for i,r in enumerate(tables['Countries.csv']) if r['Country']=='United Arab Emirates'],
    'global_sitewide_90d_devices':[{'device':r['Device'],**metrics(r),'source_row':i+2} for i,r in enumerate(tables['Devices.csv'])],
    'dimension_summaries_separate_not_joined':{name:additive_summary(tables[name]) for name in ['Queries.csv','Pages.csv','Countries.csv','Devices.csv']},
    'baseline_7d_control_comparison':{'source':str(old_path),'scope':'Sitewide daily Chart only; no query/page join',
                                      'clicks_impressions_position_match':all(all(r[k]==0 for k in ('clicks_delta','impressions_delta','position_display_delta')) for r in baseline_deltas),
                                      'daily_deltas':baseline_deltas},
    'limits':['Queries and Pages are independent unfiltered dimensions and must not be joined as measured pairs.',
              'Country/Device rows are sitewide, not Mercedes-specific; cannot combine them with exact query rows to create UAE/device metrics.',
              'Queries and Pages each have1000 visible rows at the UI export limit; completeness is not established. Privacy suppression and aggregation mean query rows need not reconcile to chart totals.',
              'Page-dimension impressions can differ from query/property totals; no cross-grain reconstruction is made.',
              'The overlapping 7/28/90-day chart windows cannot be added.',
              'CTR is calculated from additive clicks/impressions; weighted position from rounded daily rows is approximate.',
              'All data ends before October26 deployment, so it does not measure redirect recovery.']
}
SUMMARY_PATH.write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'zip_sha256':summary['zip_sha256'],'tables':source_files,'sitewide_chart_windows':chart_windows,
                  'query_only_controls':query_controls,'baseline_match':summary['baseline_7d_control_comparison']['clicks_impressions_position_match']},ensure_ascii=False))
