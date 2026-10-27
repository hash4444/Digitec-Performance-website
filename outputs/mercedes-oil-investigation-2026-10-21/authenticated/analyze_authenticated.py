import csv
import json
import re
from datetime import datetime
from pathlib import Path

BASE = Path(__file__).parent
PERIODS = [('full-28-days','2026-09-21','2026-10-18'),('2026-09-21 to 2026-09-27','2026-09-21','2026-09-27'),('2026-09-28 to 2026-10-04','2026-09-28','2026-10-04'),('2026-10-05 to 2026-10-11','2026-10-05','2026-10-11'),('2026-10-12 to 2026-10-18','2026-10-12','2026-10-18')]

def read_rows(path):
    tables=json.loads(path.read_text(encoding='utf-8'))
    while tables and isinstance(tables[0][0],list):
        tables=tables[0]
    rows=[]
    for raw in tables[1:]:
        date=datetime.strptime(raw[0].replace('Sept','Sep'),'%d %b %Y').strftime('%Y-%m-%d')
        rows.append({'date':date,'clicks':int(raw[1]),'impressions':int(raw[2]),'ctr':None if raw[3] in ('—','-','') else float(raw[3].strip('%'))/100,'position':None if raw[4] in ('—','-','') else float(raw[4])})
    return sorted(rows,key=lambda r:r['date'])

def summarize(rows):
    clicks=sum(r['clicks'] for r in rows)
    impressions=sum(r['impressions'] for r in rows)
    return {'days':len(rows),'clicks':clicks,'impressions':impressions,'ctr':clicks/impressions if impressions else None,'approx_position_from_rounded_daily':sum(r['impressions']*(r['position'] or 0) for r in rows)/impressions if impressions else None}

summary={}
for path in BASE.glob('*daily.json'):
    rows=read_rows(path)
    with path.with_suffix('.csv').open('w',encoding='utf-8-sig',newline='') as out:
        writer=csv.DictWriter(out,fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    summary[path.stem]=[dict(period=label,start=start,end=end,**summarize([r for r in rows if start<=r['date']<=end])) for label,start,end in PERIODS]
(BASE/'weekly-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
page_rows=[]
for filename,query in [('exact-uae-28d-pages.txt','mercedes oil change'),('dubai-exact-uae-28d-pages.txt','mercedes oil change dubai'),('near-me-exact-uae-28d-pages.txt','mercedes oil change near me')]:
    for page,clicks,impressions,ctr,position in re.findall(r'- row "(https://[^\s]+) (\d+) (\d+) ([\d.]+)% ([\d.]+)":',(BASE/filename).read_text(encoding='utf-8')):
        page_rows.append({'start':'2026-09-21','end':'2026-10-18','query_match':'equals','query':query,'country':'United Arab Emirates','device':'all','aggregation':'page','page':page,'clicks':int(clicks),'impressions':int(impressions),'ctr':float(ctr)/100,'position':float(position),'source':filename})
with (BASE/'exact-query-by-page-28d.csv').open('w',encoding='utf-8-sig',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=list(page_rows[0]))
    writer.writeheader()
    writer.writerows(page_rows)
print(json.dumps(summary,indent=2))
