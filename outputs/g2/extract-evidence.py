"""Independent read-only source extraction for G2; no coverage conclusions yet."""
import hashlib
import json
from pathlib import Path
import openpyxl

OUT = Path(__file__).resolve().parent
DOWNLOADS = Path('C:/Users/ADMIN/Downloads')
records, inventory, signatures = [], [], {}

def add(query, file, cell, evidence, metrics=('', '', '', ''), period='', context='', original=False):
    if not isinstance(query, str) or not query.strip():
        return
    records.append(dict(keyword=query, source_file=file, source=cell,
        measured_or_generated=evidence, source_period=period, context=context,
        original_gsc=original, **dict(zip(
            ['gsc_clicks','gsc_impressions','gsc_ctr','gsc_position'], metrics))))

workbook = DOWNLOADS / 'DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx'
with workbook.open('rb') as stream:
    book = openpyxl.load_workbook(stream, read_only=True, data_only=True)
    for sheet in book:
        rows = list(sheet.values)
        inventory.append(dict(file=workbook.name, sheet=sheet.title, rows=len(rows)-1,
                              headers=rows[0], role='All rows read; only query-bearing fields extracted'))
        for number, row in enumerate(rows[1:], 2):
            name = sheet.title
            if name == 'Master Keywords':
                measured = row[7] == 'Existing GSC query'
                add(row[0], workbook.name, f'{name}!A{number}',
                    'MEASURED GSC' if measured else 'GENERATED TAXONOMY' if row[7] == 'Generated taxonomy' else 'RESEARCH',
                    row[8:12] if measured else ('',)*4,
                    'Workbook-derived; not additive to original exports' if measured else '', str(row[1:8]))
            elif name == 'GSC Opportunities':
                add(row[0], workbook.name, f'{name}!A{number}', 'MEASURED GSC', row[2:6],
                    'Workbook-derived; not additive to original exports', str(row[1]))
            elif name == 'Service Taxonomy':
                add(row[1], workbook.name, f'{name}!B{number}', 'GENERATED TAXONOMY', context=str(row[0]))
            elif name == 'Brand Specific Systems':
                add(f'{row[0]} {row[1]}', workbook.name, f'{name}!B{number}', 'RESEARCH')
            elif name == 'Page Strategy':
                for example in str(row[2] or '').split(';'):
                    add(example, workbook.name, f'{name}!C{number}', 'RESEARCH')
    book.close()

for file in sorted(DOWNLOADS.glob('digitecme.com-Performance*.xlsx')):
    book = openpyxl.load_workbook(file, read_only=True, data_only=True)
    sheets = {sheet.title: list(sheet.values) for sheet in book}
    book.close()
    digest = hashlib.sha256(json.dumps(sheets, ensure_ascii=False, default=str).encode()).hexdigest()
    filters = dict(sheets.get('Filters', [])[1:])
    dates = [str(row[0])[:10] for row in sheets.get('Chart', [])[1:] if row and row[0]]
    period = f'{min(dates)} to {max(dates)}' if dates else 'Unavailable'
    inventory.append(dict(file=file.name, filters=filters, period=period,
        sheets={name:len(rows)-1 for name,rows in sheets.items()}, tabular_sha256=digest,
        duplicate_of=signatures.get(digest)))
    if digest in signatures:
        continue
    signatures[digest] = file.name
    for number, row in enumerate(sheets.get('Queries', [])[1:], 2):
        add(row[0], file.name, f'Queries!A{number}', 'MEASURED GSC', row[1:5], period,
            json.dumps(filters, ensure_ascii=False), True)

for name, data in [('source-inventory.json', inventory), ('all-source-observations.json', records)]:
    (OUT/name).write_text(json.dumps(data, ensure_ascii=False, indent=2, default=str), encoding='utf-8')
print(json.dumps(dict(source_observations=len(records), workbook_sheets=sum('sheet' in x for x in inventory),
    exports=sum('filters' in x for x in inventory), unique_export_tables=len(signatures),
    status='Raw evidence only; generic symptom classification and owner mapping pending')))
