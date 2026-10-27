import csv
import json
from pathlib import Path

BASE = Path(__file__).parent
data = json.loads((BASE/'all-exports.json').read_text(encoding='utf-8'))
def summary(rows):
    clicks = sum(r[1] for r in rows)
    impressions = sum(r[2] for r in rows)
    return {'clicks':clicks, 'impressions':impressions, 'ctr':clicks/impressions if impressions else None, 'weighted_position_from_rounded_rows':sum((r[4] or 0)*r[2] for r in rows)/impressions if impressions else None}

out = {}
for i, export in enumerate(data):
    sheets=export['sheets']
    out[f'export-{i+1}'] = {'source':export['source'], 'sha256':export['sha256'], 'filters':sheets['Filters'], 'chart_first':sheets['Chart'][1][0], 'chart_last':sheets['Chart'][-1][0], 'dimension_summaries':{n:summary(sheets[n][1:]) for n in ('Chart','Queries','Pages','Countries','Devices')}}

chart=data[0]['sheets']['Chart']
periods=[('full-export','2026-07-19','2026-10-18'),('available-last-28-days','2026-09-21','2026-10-18'),('previous-28-days','2026-08-24','2026-09-20'),('latest-7-available-days','2026-10-12','2026-10-18'),('prior-7-days','2026-10-05','2026-10-11'),('week-3','2026-09-28','2026-10-04'),('week-4','2026-09-21','2026-09-27')]
out['contains_daily_periods']=[dict(label=label,start=start,end=end,days=len([r for r in chart[1:] if start<=r[0]<=end]),**summary([r for r in chart[1:] if start<=r[0]<=end])) for label,start,end in periods]
last28=[chart[0]]+[r for r in chart[1:] if '2026-09-21'<=r[0]<='2026-10-18']
with (BASE/'contains-query-last28-available-daily.csv').open('w',encoding='utf-8-sig',newline='') as f:csv.writer(f).writerows(last28)
(BASE/'metrics-summary.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
print(json.dumps(out,indent=2))
