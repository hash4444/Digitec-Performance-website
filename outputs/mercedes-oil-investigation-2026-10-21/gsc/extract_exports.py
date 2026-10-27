import csv
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

BASE = Path(__file__).parent
FILES = [Path('C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-21.xlsx'), Path('C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-21 (1).xlsx')]
NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

def col(s):
    v = 0
    for c in s:
        v = v * 26 + ord(c) - 64
    return v - 1

all_exports = []
for index, p in enumerate(FILES):
    with zipfile.ZipFile(p) as z:
        strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('s:si', NS):
                strings.append(''.join(t.text or '' for t in si.findall('.//s:t', NS)))
        rels = {e.attrib['Id']:e.attrib['Target'] for e in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
        sheets = {}
        for sheet in ET.fromstring(z.read('xl/workbook.xml')).findall('s:sheets/s:sheet', NS):
            name = sheet.attrib['name']
            rid = sheet.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
            target = rels[rid]
            target = target.lstrip('/') if target.startswith('/') else 'xl/' + target
            root = ET.fromstring(z.read(target))
            rows = []
            for row in root.findall('s:sheetData/s:row', NS):
                values = []
                for c in row.findall('s:c', NS):
                    ci = col(re.match(r'[A-Z]+', c.attrib['r'])[0])
                    while len(values) <= ci:
                        values.append(None)
                    v = c.find('s:v', NS)
                    typ = c.attrib.get('t')
                    if typ == 's':
                        value = strings[int(v.text)]
                    elif typ == 'inlineStr':
                        value = ''.join(t.text or '' for t in c.findall('.//s:t', NS))
                    elif v is None:
                        value = None
                    elif typ in ('str','e'):
                        value = v.text
                    elif typ == 'b':
                        value = v.text == '1'
                    else:
                        value = float(v.text)
                        if value.is_integer():
                            value = int(value)
                    values[ci] = value
                rows.append(values)
            sheets[name] = rows
            with (BASE / f'export-{index+1}-{name}.csv').open('w', encoding='utf-8-sig', newline='') as out:
                csv.writer(out).writerows(rows)
        record = {'source':str(p), 'sha256':hashlib.sha256(p.read_bytes()).hexdigest(), 'sheets':sheets}
        all_exports.append(record)
        (BASE / f'export-{index+1}-raw.json').write_text(json.dumps(record, indent=2, ensure_ascii=False), encoding='utf-8')
        print(json.dumps({'source':str(p), 'sheets':{name: {'count':len(rows), 'rows':rows[:12]} for name,rows in sheets.items()}}, ensure_ascii=False))
(BASE / 'all-exports.json').write_text(json.dumps(all_exports, indent=2, ensure_ascii=False), encoding='utf-8')
