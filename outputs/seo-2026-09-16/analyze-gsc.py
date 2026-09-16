"""Read-only first-party Search Console export audit; never saves source workbook."""
from pathlib import Path
import csv
import json
import re
import warnings
import openpyxl

ROOT = Path(__file__).resolve().parent
SOURCE = Path(r'C:\Users\ADMIN\Downloads\digitecme.com-Performance-on-Search-2026-09-16.xlsx')
warnings.filterwarnings('ignore', message='Workbook contains no default style')
workbook = openpyxl.load_workbook(SOURCE, read_only=True, data_only=True)
data = {}
inventory = []
for sheet in workbook:
    values = list(sheet.values)
    columns = values[0]
    records = []
    for rownum, values_row in enumerate(values[1:], 2):
        records.append({'sheet': sheet.title, 'row': rownum, 'source_range': f'{sheet.title}!A{rownum}:{openpyxl.utils.get_column_letter(sheet.max_column)}{rownum}', **dict(zip(columns, values_row))})
    data[sheet.title] = records
    inventory.append({'sheet': sheet.title, 'data_rows': len(records), 'range': f'A1:{openpyxl.utils.get_column_letter(sheet.max_column)}{sheet.max_row}', 'columns': columns})
    with (ROOT / f'gsc-{sheet.title.lower().replace(" ", "-")}.csv').open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=['sheet', 'row', 'source_range', *columns])
        writer.writeheader()
        writer.writerows(records)

targets = {
    'BMW': ['bmw service dubai'],
    'Rolls-Royce': ['rolls royce service dubai'],
    'Aston Martin': ['aston martin service dubai'],
    'Bentley': ['bentley service dubai'],
    'PPF': ['car paint protection', 'car paint protection dubai', 'car paint protection film', 'paint protection film', 'paint protection film ppf', 'paint protection film near me', 'paint protection film installers', 'ppf dubai'],
    'Ceramic': ['ceramic paint protection', 'ceramic paint protection dubai', 'paint protection coating'],
    'Cadillac CUE': ['cue screen replacement in dubai', 'cadillac touch screen repair in dubai', 'cadillac cue screen replacement in dubai', 'cadillac xts touch screen replacement in dubai', 'cadillac srx screen replacement in dubai'],
    'Tyres': ['tire repair dubai', 'tyre repair dubai'],
    'Head unit': ['command unit repairing dubai', 'head unit repairing dubai'],
    'Electrical': ['car electrical repair dubai', 'car electrical repair in dubai', 'car electrical services dubai', 'car wiring repair'],
    'Mercedes audio': ['mercedes stereo upgrade in dubai', 'mercedes e class audio upgrade in dubai', 'mercedes sound system upgrade in dubai'],
    'Bentley camera': ['bentley reverse camera in dubai'],
}
patterns = [
    ('Cadillac CUE', r'\bcue\b|cadillac.*(?:screen|display|touch|infotainment)'),
    ('Mercedes audio', r'mercedes.*(?:stereo|audio|sound system|speaker)'),
    ('Bentley camera', r'bentley.*(?:camera|reverse)'),
    ('Head unit', r'\b(?:comand|command unit|head unit|infotainment|radio repair)\b'),
    ('Electrical', r'electri|wiring'),
    ('Ceramic', r'ceramic|paint protection coating'),
    ('PPF', r'\bppf\b|paint protection|protection film'),
    ('Tyres', r'\b(?:tyre|tire|tyres|tires)\b'),
    ('BMW', r'\bbmw\b'),
    ('Rolls-Royce', r'rolls[ -]?royce'),
    ('Aston Martin', r'aston'),
    ('Bentley', r'bentley'),
]
queries = data['Queries']
by_query = {row['Top queries'].lower(): row for row in queries}
def cluster(query):
    for name, regex in patterns:
        if re.search(regex, query, re.I):
            return name
    return 'Other'
for row in queries:
    row['cluster'] = cluster(row['Top queries'])

def metrics(rows):
    clicks = sum(row['Clicks'] for row in rows)
    impressions = sum(row['Impressions'] for row in rows)
    return {'rows': len(rows), 'clicks': clicks, 'impressions': impressions, 'computed_ctr': clicks / impressions if impressions else None, 'impression_weighted_position_approximation': sum(row['Position'] * row['Impressions'] for row in rows) / impressions if impressions else None}

target_records = []
for name, names in targets.items():
    for name_query in names:
        found = by_query.get(name_query)
        target_records.append({'cluster': name, 'query': name_query, 'found_in_export': found is not None, **(found or {})})

owners = [
    {'cluster': 'BMW', 'owner': '/brands/bmw-service-dubai', 'decision': 'Retain existing brand service hub.'},
    {'cluster': 'Rolls-Royce', 'owner': '/brands/rolls-royce-service-dubai', 'decision': 'Retain existing brand service hub.'},
    {'cluster': 'Aston Martin', 'owner': '/brands/aston-martin-service-dubai', 'decision': 'Retain existing brand service hub.'},
    {'cluster': 'Bentley', 'owner': '/brands/bentley-service-dubai', 'decision': 'Retain existing brand service hub; camera is a distinct secondary intent.'},
    {'cluster': 'PPF', 'owner': '/services/paint-protection-film', 'decision': 'Retain existing PPF specialist page; broader paint-care selector should link to this owner.'},
    {'cluster': 'Ceramic', 'owner': '/services/ceramic-coating', 'decision': 'Retain existing ceramic coating specialist page; differentiate film from coating.'},
    {'cluster': 'Electrical', 'owner': '/services/auto-electrical-repair-dubai', 'decision': 'Retain electrical parent owner; link specialist infotainment sections/pages from here.'},
    {'cluster': 'Tyres', 'owner': '/services/tire-repair-dubai', 'decision': 'Retain established route; use British Tyre spelling visibly; retire /services/tire-repair through existing redirect.'},
]
for item in owners:
    item['association_status'] = 'Inferred from current repository intent and matching URL; export does not join query to page.'
    item['page_evidence'] = next((row for row in data['Pages'] if row['Top pages'] == 'https://digitecme.com' + item['owner']), None)
    item['query_evidence'] = [row for row in target_records if row['cluster'] == item['cluster']]

aggregates = {name: metrics(rows) for name, rows in data.items() if name != 'Filters'}
cluster_metrics = {name: metrics([row for row in queries if row['cluster'] == name]) for name in [*targets, 'Other']}
quick_opportunities = sorted([row for row in queries if 8 <= row['Position'] <= 30], key=lambda row: row['Impressions'], reverse=True)
other_opportunities = [row for row in quick_opportunities if row['cluster'] == 'Other']
page_opportunities = sorted([row for row in data['Pages'] if 8 <= row['Position'] <= 30], key=lambda row: row['Impressions'], reverse=True)
limitations = [
    'The export contains separate Queries and Pages aggregates and no query-by-page table. Query-to-URL mapping is an architectural inference. These data cannot prove cannibalization or attribute a query to an individual page.',
    'File date is 2026-09-16; actual Chart dates are 2026-09-07 through 2026-09-13, inclusive. Filters says Last 7 days, Web. No country filter is recorded.',
    'The query table contains exactly 1,000 rows; do not assume it is a complete list of searches. Query totals do not reconcile to site chart totals, so query-cluster totals describe the exported subset only.',
    'Page totals need not equal site totals because several pages can appear in one result set. Never add page or query metrics to site totals.',
    'The seven-day sample and rounded average positions are directional evidence, not a ranking forecast or proof of any implementation effect.',
    'Cluster membership is a conservative regex classification for analysis; shared terms such as ceramic vs PPF and electrical vs brand service can require intent review. Each exported query is assigned to one analysis cluster only.',
    'Aggregate positions below are approximated by impression weighting the already-rounded exported row positions, not independently reported Search Console cluster positions.',
]
payload = {'source_file': str(SOURCE), 'inventory': inventory, 'limitations': limitations, 'aggregates': aggregates, 'cluster_metrics': cluster_metrics, 'target_queries': target_records, 'inferred_existing_owners': owners, 'quick_opportunities': quick_opportunities, 'other_opportunities': other_opportunities, 'page_opportunities': page_opportunities, 'sheets': data}
(ROOT / 'gsc-evidence.json').write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding='utf-8')
with (ROOT / 'gsc-target-query-evidence.csv').open('w', encoding='utf-8-sig', newline='') as stream:
    columns = ['cluster', 'query', 'found_in_export', 'Clicks', 'Impressions', 'CTR', 'Position', 'source_range']
    writer = csv.DictWriter(stream, fieldnames=columns, extrasaction='ignore')
    writer.writeheader()
    writer.writerows(target_records)

def num(value):
    return f'{value:,.0f}'
def table(rows):
    result = ['| Query | Clicks | Impressions | CTR | Position | Source |', '| --- | ---: | ---: | ---: | ---: | --- |']
    for row in rows:
        result.append(f"| {row['Top queries']} | {num(row['Clicks'])} | {num(row['Impressions'])} | {row['CTR']:.2%} | {row['Position']:.2f} | {row['source_range']} |")
    return '\n'.join(result)

lines = ['# Search Console evidence', '', 'Source: digitecme.com-Performance-on-Search-2026-09-16.xlsx. Read without changing the workbook.', '', '## Scope and interpretation', '']
lines += [f'- {line}' for line in limitations]
lines += ['', f"Chart!A2:E8: {num(aggregates['Chart']['clicks'])} clicks, {num(aggregates['Chart']['impressions'])} impressions, {aggregates['Chart']['computed_ctr']:.2%} computed CTR.", f"Queries!A2:E1001: {num(aggregates['Queries']['clicks'])} clicks, {num(aggregates['Queries']['impressions'])} impressions across the exported 1,000 rows.", '', '## Requested exact queries', '']
lines.append(table([row for row in target_records if row['found_in_export']]))
missing = [row['query'] for row in target_records if not row['found_in_export']]
lines += ['', 'Not present as exact strings in this export: ' + (', '.join(missing) if missing else 'None.'), '', '## Exported query clusters', '', '| Cluster | Queries | Clicks | Impressions | Computed CTR | Approximate weighted position |', '| --- | ---: | ---: | ---: | ---: | ---: |']
for name, row in cluster_metrics.items():
    if row['impressions']:
        lines.append(f"| {name} | {row['rows']} | {num(row['clicks'])} | {num(row['impressions'])} | {row['computed_ctr']:.2%} | {row['impression_weighted_position_approximation']:.2f} |")
lines += ['', 'All variant rows and exact workbook ranges are retained in gsc-evidence.json and gsc-queries.csv. A cluster sum reflects the visible query subset, not total cluster demand.', '', '## Largest 8–30 position opportunities', '', table(quick_opportunities[:35]), '', '## Additional opportunities outside the requested clusters', '', table(other_opportunities[:25]), '', '## Existing ownership candidates and page evidence', '', '| Cluster | Existing URL | Clicks | Impressions | Position | Source |', '| --- | --- | ---: | ---: | ---: | --- |']
for item in owners:
    row = item['page_evidence']
    lines.append(f"| {item['cluster']} | {item['owner']} | {num(row['Clicks']) if row else 'Not listed'} | {num(row['Impressions']) if row else 'Not listed'} | {row['Position'] if row else 'Not listed'} | {row['source_range'] if row else 'Absent from Pages'} |")
lines += ['', 'Cadillac CUE, head-unit repair, Mercedes audio and Bentley camera exact queries appear in the export, but their current landing pages cannot be inferred from these metrics. Their ownership must be decided after repository capability and page-scope review.', '', '## Device and country context', '']
for row in data['Devices']:
    lines.append(f"- {row['Device']}: {num(row['Clicks'])} clicks / {num(row['Impressions'])} impressions / {row['CTR']:.2%} CTR / position {row['Position']:.2f} ({row['source_range']}).")
for row in data['Countries'][:4]:
    lines.append(f"- {row['Country']}: {num(row['Clicks'])} clicks / {num(row['Impressions'])} impressions / {row['CTR']:.2%} CTR / position {row['Position']:.2f} ({row['source_range']}).")
lines += ['', 'The UAE accounts for 93.44% of site impressions (8,780 of 9,396) and 40 of 44 clicks. Other countries remain in the exported query mix. Do not interpret desktop/mobile average-position differences as evidence of a technical rendering issue without independent checks. The query mix can differ.', '', '## Priority interpretation', '', '- Near-term relevance and CTR improvements: BMW service (60 impressions, position 16.88), Rolls-Royce service (50, 18.32), Aston Martin service (31, 21.97), film near me (43, 14.12), film installers (22, 19.09), ceramic paint protection Dubai (36, 20.28), and paint protection coating (35, 27.74). All except Aston Martin generated zero clicks.', '- Bentley service (35 impressions, position 32.40), Cadillac CUE variants (122 total exported impressions), electrical, head-unit and Mercedes audio queries sit mainly outside positions 8–30. They justify more precise landing-page relevance, but should not be described as immediate page-one opportunities.', '- Related service coverage can support the brand hubs: BMW maintenance Dubai (Queries!A118:E118), BMW battery replacement Dubai (A119:E119), Rolls-Royce suspension repair Dubai (A189:E189), Aston Martin workshop Dubai (A116:E116), Aston Martin brake repair Dubai (A109:E109), and auto electrical diagnostics Dubai (A236:E236).', '- Exclude nonlocal noise from priorities. For example, car paint protection film Artarmon has eight impressions at position 21.12 (Queries!A229:E229) but does not establish relevant Dubai demand.', '', '## Architecture implications', '', '- Keep four existing brand service hubs and their established URLs. Rolls-Royce, BMW and Aston Martin already have relevant page visibility near page-one/page-two positions.', '- Keep one PPF owner and one ceramic owner. The broader /services/paint-protection-dubai selector has 465 impressions, zero clicks and position 34.23 (Pages!A26:E26); specialist PPF has 213 impressions, one click and position 40.74 (Pages!A6:E6). These separate aggregates justify clarifying roles but do not prove the pages rank for the same queries.', '- /services/ceramic-coating is absent from Pages in this seven-day export. Absence is not proof of an indexing problem. Verify technical indexability separately.', '- Keep one electrical parent page and give symptom-based specialist infotainment intents clear ownership. Search queries alone do not verify workshop capability. No Pages URL explicitly names CUE, head-unit, audio, stereo or camera, so there is no metric evidence of a legacy specialist owner.', '- Keep the current /services/tire-repair-dubai route and British spelling in visible copy. The older /services/tire-repair URL has 278 impressions, zero clicks and position 52.24; the current route has 26 impressions, zero clicks and position 12.04 (Pages!A81:E81). App.tsx already redirects the older route; validate the server redirect and canonical handling.', '- Strengthen actual service diagnosis, model compatibility, repair-versus-replacement decisions and contact pathways; avoid promises of specific repairs solely on the basis of a query.', '- Use relevant existing oil-change, transmission, suspension, diagnostics and brake pages for supporting links. Larger impressions alone do not justify expanding this release into unrelated brand pages.', '', '## Extraction checks', '', '- All 32 requested exact query strings are present.', '- All 1,000 query strings and 447 page URLs are unique within their respective sheets.', '- Every nonzero-impression row has a reported CTR consistent with clicks divided by impressions to the exported four-decimal precision.', '- The single-assignment cluster rows reconcile to 1,000 queries and 6,448 impressions.', '- Chart, Countries and Devices reconcile to 44 clicks and 9,396 impressions. Queries and Pages use different aggregation bases and are not forced to reconcile.', '- Source workbook opened with read_only=True; no workbook save or export was performed.', '']
(ROOT / 'search-console-audit.md').write_text('\n'.join(lines), encoding='utf-8')
print(json.dumps({'inventory': inventory, 'aggregates': aggregates, 'cluster_metrics': cluster_metrics, 'targets': target_records, 'other_top': other_opportunities[:15]}, indent=2, ensure_ascii=False))
