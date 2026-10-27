from pathlib import Path
import csv
import hashlib
import json
import re
import zipfile
import xml.etree.ElementTree as ET

NS = {'x': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
PRIORITY = ['car paint protection', 'ceramic paint protection dubai',
            'paint protection coating', 'ceramic paint protection',
            'car paint protection dubai', 'paint protection film near me',
            'paint protection', 'paint protection dubai', 'ceramic coating dubai',
            'paint protection film dubai', 'ppf dubai', 'car polishing dubai',
            'paint correction dubai']
ROOT = Path('C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/paint-seo-2026-10-12')
PATHS = [Path('C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-12.xlsx'),
         Path('C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-12 (1).xlsx')]

def extract(path):
    result = {'path': str(path), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'sheets': {}}
    with zipfile.ZipFile(path) as z:
        shared = [ ''.join(si.itertext()) for si in ET.fromstring(z.read('xl/sharedStrings.xml')) ]
        relationships = {r.attrib['Id']: r.attrib['Target'] for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
        book = ET.fromstring(z.read('xl/workbook.xml'))
        for s in book.find('x:sheets', NS):
            target = relationships[s.attrib['{'+NS['r']+'}id']]
            filename = target.lstrip('/') if target.startswith('/') else 'xl/' + target
            tree = ET.fromstring(z.read(filename))
            rows = []
            for row in tree.findall('x:sheetData/x:row', NS):
                record = {'_row': int(row.attrib['r'])}
                for cell in row:
                    ref = cell.attrib['r']
                    val = cell.find('x:v', NS)
                    raw = None if val is None else val.text
                    if cell.attrib.get('t') == 's':
                        raw = shared[int(raw)]
                    elif cell.attrib.get('t') == 'inlineStr':
                        raw = ''.join(cell.find('x:is', NS).itertext())
                    elif raw is not None and cell.attrib.get('t') not in ('str', 'e'):
                        try:
                            raw = float(raw)
                            if raw.is_integer(): raw = int(raw)
                        except ValueError: pass
                    record[re.sub(r'\d+', '', ref)] = raw
                rows.append(record)
            if not rows:
                result['sheets'][s.attrib['name']] = {'headers': [], 'records': []}
                continue
            headers = [(c, v) for c, v in rows[0].items() if c != '_row']
            records = [{'_row': r['_row'], **{str(label): r.get(col) for col, label in headers}} for r in rows[1:]]
            result['sheets'][s.attrib['name']] = {'headers': dict(headers), 'records': records}
    return result

def aggregate(records):
    clicks = sum(r.get('Clicks', 0) or 0 for r in records)
    impressions = sum(r.get('Impressions', 0) or 0 for r in records)
    return {'rows': len(records), 'clicks': clicks, 'impressions': impressions,
            'ctr': clicks / impressions if impressions else None,
            'impression_weighted_position_from_rounded_rows':
            sum((r.get('Position', 0) or 0) * (r.get('Impressions', 0) or 0) for r in records) / impressions if impressions else None}

def summarize(book):
    sheets = book['sheets']
    summary = {k: v for k, v in book.items() if k != 'sheets'}
    summary['sheet_summaries'] = {}
    for name, sheet in sheets.items():
        rs = sheet['records']
        summary['sheet_summaries'][name] = {'headers': sheet['headers'], **aggregate(rs)}
        if name in ('Filters', 'Devices', 'Search appearance'):
            summary['sheet_summaries'][name]['records'] = rs
        if name == 'Countries':
            summary['sheet_summaries'][name]['top_by_clicks'] = sorted(rs, key=lambda r: r.get('Clicks',0), reverse=True)[:10]
    dates = sheets.get('Dates', sheets.get('Chart', {})).get('records', [])
    date_values = [str(r.get('Date')) for r in dates if r.get('Date')]
    summary['date_range'] = {'start': min(date_values) if date_values else None, 'end': max(date_values) if date_values else None,
                             'days': len(dates), 'source_sheet': 'Dates' if 'Dates' in sheets else 'Chart'}
    summary['date_head'] = dates[:3]
    summary['date_tail'] = dates[-3:]
    queries = sheets.get('Queries', {}).get('records', [])
    query_label = next((c for c in sheets.get('Queries', {}).get('headers', {}).values() if c not in ('Clicks', 'Impressions', 'CTR', 'Position')), None)
    by_query = {str(r.get(query_label)).lower(): r for r in queries}
    summary['priority_queries'] = [{ 'target': k, 'record': by_query.get(k) } for k in PRIORITY]
    summary['paint_queries'] = [r for r in queries if re.search(r'paint|ceramic|\bppf\b|polish',str(r.get(query_label)),re.I)]
    pages = sheets.get('Pages', {}).get('records', [])
    page_label = next((c for c in sheets.get('Pages', {}).get('headers', {}).values() if c not in ('Clicks', 'Impressions', 'CTR', 'Position')), None)
    summary['priority_pages'] = [r for r in pages if re.search(r'paint|ceramic|\bppf\b|polish',str(r.get(page_label)),re.I)]
    summary['top_queries_by_clicks'] = sorted(queries, key=lambda r:r.get('Clicks',0), reverse=True)[:10]
    summary['top_queries_by_impressions'] = sorted(queries, key=lambda r:r.get('Impressions',0), reverse=True)[:10]
    summary['top_pages_by_clicks'] = sorted(pages, key=lambda r:r.get('Clicks',0), reverse=True)[:10]
    summary['top_pages_by_impressions'] = sorted(pages, key=lambda r:r.get('Impressions',0), reverse=True)[:10]
    summary['interpretation_limits'] = [
        'Separate Queries and Pages worksheets do not establish a query-to-page association or prove cannibalization.',
        'Dimension totals must not be added across worksheets or overlapping export scopes.',
        'Query table totals may differ from the chart total because exported query rows do not represent all search activity.',
        'Aggregated position is reconstructed from rounded exported daily/row values and is approximate.'
    ]
    return summary

ROOT.mkdir(parents=True, exist_ok=True)
books = [extract(p) for p in PATHS]
summaries = [summarize(b) for b in books]
comparison = {'identical_file_hashes': books[0]['sha256'] == books[1]['sha256'],
              'same_extracted_values': books[0]['sheets'] == books[1]['sheets'],
              'equal_sheets': {k: books[0]['sheets'].get(k) == books[1]['sheets'].get(k) for k in books[0]['sheets']},
              'date_ranges_equal': summaries[0]['date_range'] == summaries[1]['date_range']}
analysis = {'sources': summaries, 'comparison': comparison}
analysis['documentation'] = [
    {'title': 'Google Search Console: About the data', 'url': 'https://support.google.com/webmasters/answer/17011364?hl=en'},
    {'title': 'Google Search Console: Troubleshooting data discrepancies', 'url': 'https://support.google.com/webmasters/answer/17010575?hl=en'}
]
(ROOT / 'gsc-baseline-analysis.json').write_text(json.dumps(analysis, indent=2, ensure_ascii=False), encoding='utf-8')
lines = [
    'DIGI-TEC Search Console export baseline',
    'Analysis date: 12 October 2026',
    'Read-only extraction; originals unchanged.',
    '',
    'Export scopes',
    'The two files are different exports, not duplicates. Both cover 10 July to 9 October 2026 (92 daily rows).',
    'The no-suffix file filters Web search to Product snippets. It has 0 clicks and 122 impressions.',
    'The (1) file filters Web search to Last 3 months with no Search appearance filter. It matches the brief:',
    '515 clicks, 108,445 impressions, calculated CTR 0.4749%, approximate daily-impression-weighted position 22.13.',
    'Use the (1) file for the overall search baseline. Do not add the filtered Product snippets export to it.',
    '',
    'Sheet coverage and reconciliation',
    'Each file contains Chart, Queries, Pages, Countries, Devices, Search appearance and Filters.',
    'The daily date dimension is called Chart; there is no separately named Dates worksheet.',
    'In (1), Chart, Countries and Devices reconcile to 515 clicks and 108,445 impressions.',
    'Queries contains exactly 1,000 rows totaling 138 clicks and 64,843 impressions.',
    'Pages contains exactly 1,000 rows totaling 519 clicks and 116,261 impressions.',
    'Google documents property/page aggregation differences, query privacy omissions and the 1,000-row table limit.',
    'The Pages sum is a different aggregation from the overall property total. The exported query table is incomplete.',
    'The Search appearance row in both exports is Product snippets: 0 clicks, 122 impressions, position 33.10.',
    '',
    'Priority service and blog rows in the sitewide (1) export',
    'URL suffix | Clicks | Impressions | Calculated CTR | Position | Excel range',
]
for r in summaries[1]['priority_pages']:
    n=r['_row']; imp=r['Impressions']; ctr=100*r['Clicks']/imp if imp else 0
    lines.append(f"{r['Top pages'].replace('https://digitecme.com','')} | {r['Clicks']} | {imp:,} | {ctr:.4f}% | {r['Position']:.2f} | Pages!A{n}:E{n}")
lines += ['', 'Priority query rows in the sitewide (1) export',
          'Query | Clicks | Impressions | Position | Excel range']
for item in summaries[1]['priority_queries']:
    r=item['record']
    if r:
        n=r['_row']
        lines.append(f"{r['Top queries']} | {r['Clicks']} | {r['Impressions']:,} | {r['Position']:.2f} | Queries!A{n}:E{n}")
    else:
        lines.append(item['target']+' | absent from exported top 1,000 rows; activity unavailable')
lines += [
    '',
    'Devices and location in the sitewide (1) export',
    'Mobile: 308 clicks, 37,621 impressions, calculated CTR 0.8187%, position 13.75 (Devices!A2:E2).',
    'Desktop: 204 clicks, 70,141 impressions, calculated CTR 0.2908%, position 26.60 (Devices!A3:E3).',
    'Tablet: 3 clicks, 683 impressions, calculated CTR 0.4392%, position 25.89 (Devices!A4:E4).',
    'United Arab Emirates: 436 clicks, 100,289 impressions, calculated CTR 0.4347%, position 22.72 (Countries!A2:E2).',
    'UAE accounts for 84.66% of clicks and 92.48% of impressions. These are sitewide segments, not service-specific segments.',
    '',
    'Interpretation',
    'All supplied service-page and query impression/position figures match the sitewide workbook.',
    'Paint protection film dubai also has 2 query clicks (4.00% CTR), which was not included in the brief table.',
    'The hub has the most priority-page impressions, and the priority service destinations have low search click volume.',
    'Separate query and page rows cannot prove which URL ranks for a query, keyword cannibalization or a language-specific query association.',
    'Absence of polishing/correction query or URL rows in the top 1,000 is not evidence that those searches receive no impressions.',
    'Arabic hub/PPF rows have small samples; do not treat their lower average positions as proof of superior performance.',
    '',
    'Official interpretation references',
    'https://support.google.com/webmasters/answer/17011364?hl=en',
    'https://support.google.com/webmasters/answer/17010575?hl=en',
    '',
    'Source integrity',
]
for s in summaries:
    lines += [Path(s['path']).name, 'SHA256: '+s['sha256']]
    if hashlib.sha256(Path(s['path']).read_bytes()).hexdigest() != s['sha256']:
        raise RuntimeError('Source changed during analysis: '+s['path'])
(ROOT / 'gsc-baseline-report.txt').write_text('\n'.join(lines)+'\n', encoding='utf-8')
with (ROOT / 'gsc-paint-query-page-rows.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f)
    w.writerow(['Source file','Dimension','Excel row','Query or URL','Clicks','Impressions','CTR fraction','Average position'])
    for s in summaries:
        for dimension, key in [('Queries','paint_queries'), ('Pages','priority_pages')]:
            for r in s[key]:
                label=next(k for k in r if k not in ('_row','Clicks','Impressions','CTR','Position'))
                w.writerow([Path(s['path']).name, dimension,r['_row'],r[label],r.get('Clicks'),r.get('Impressions'),r.get('CTR'),r.get('Position')])
print('\n'.join(lines))
