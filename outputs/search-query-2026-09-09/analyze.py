from pathlib import Path
import json, re, collections, warnings
import openpyxl

ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).resolve().parent
SOURCE=Path(r'C:\Users\ADMIN\Downloads\digitecme.com-Performance-on-Search-2026-09-08 (2).xlsx')
warnings.filterwarnings('ignore',message='Workbook contains no default style')
w=openpyxl.load_workbook(SOURCE,read_only=True,data_only=True)
data={s.title:list(s.values) for s in w}
OUT.mkdir(parents=True,exist_ok=True)
(OUT/'source.json').write_text(json.dumps(data,ensure_ascii=False,indent=2,default=str),encoding='utf-8')
q=data['Queries'][1:]
def totals(rows):
    clicks=sum(r[1] for r in rows); imp=sum(r[2] for r in rows)
    return dict(rows=len(rows),clicks=clicks,impressions=imp,ctr=clicks/imp if imp else None,weighted_position=sum(r[2]*r[4] for r in rows)/imp if imp else None)
summary={k:totals(data[k][1:]) for k in ['Chart','Queries','Pages','Countries','Devices']}
summary['dates']=[data['Chart'][1][0],data['Chart'][-1][0]]
summary['near_wins']=[r for r in sorted(q,key=lambda x:-x[2]) if 4<=r[4]<=15][:70]
summary['page_one_zero_clicks']=[r for r in sorted(q,key=lambda x:-x[2]) if r[4]<=10 and r[1]==0][:50]
summary['paint']=[r for r in q if re.search(r'ppf|paint protect|ceramic|polish|detailing|paint correction',r[0],re.I)]
(OUT/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
(OUT/'all-queries.txt').write_text('\n'.join(f'{i+2}\t{r[0]}\t{int(r[1])}\t{int(r[2])}\t{r[4]}' for i,r in enumerate(q)),encoding='utf-8')
