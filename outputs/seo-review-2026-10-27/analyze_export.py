import collections
import datetime
import json
import re
import warnings
from pathlib import Path
import openpyxl

warnings.filterwarnings('ignore', category=UserWarning, module='openpyxl')
src = Path(r'C:\Users\ADMIN\Downloads\digitecme.com-Performance-on-Search-2026-10-27.xlsx')
out = Path(__file__).parent
wb = openpyxl.load_workbook(src, data_only=True, read_only=True)
data = {}
for sheet in wb:
    rows = list(sheet.values)
    data[sheet.title] = [dict(zip(rows[0], r), _row=i) for i,r in enumerate(rows[1:], 2)]

exclude = re.compile(r'mercedes|\bbenz\b|\bamg\b|maybach|\b[wcra]\s?(?:1[0-9]{2}|2[0-9]{2})\b', re.I)
pages = [r for r in data['Pages'] if not exclude.search(r['Top pages'])]
queries = [r for r in data['Queries'] if not exclude.search(r['Top queries'])]
def totals(rows):
    c = sum(r['Clicks'] for r in rows)
    i = sum(r['Impressions'] for r in rows)
    return {'rows': len(rows), 'clicks':c, 'impressions':i, 'ctr':c/i if i else None,
            'weighted_position':sum(r['Position']*r['Impressions'] for r in rows)/i if i else None}
def top(rows,n=40):
    return sorted(rows, key=lambda r:r['Impressions'],reverse=True)[:n]
summary = {'source':str(src), 'filters':data['Filters'], 'daily':data['Chart'],
           'site_totals':totals(data['Chart']), 'visible_page_totals':totals(data['Pages']),
           'non_mercedes_page_totals':totals(pages), 'visible_query_totals':totals(data['Queries']),
           'non_mercedes_visible_query_totals':totals(queries),
           'countries':data['Countries'][:12], 'devices':data['Devices'],
           'top_pages':top(pages,60), 'top_queries':top(queries,80),
           'near_page_one_pages':top([r for r in pages if 4 <=r['Position']<=20 and r['Impressions']>=20],50),
           'near_page_one_queries':top([r for r in queries if 4<=r['Position']<=20 and r['Impressions']>=5],60)}
(out/'workbook-data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
(out/'analysis.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
