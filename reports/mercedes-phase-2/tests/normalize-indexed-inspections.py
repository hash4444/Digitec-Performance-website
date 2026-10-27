from pathlib import Path
import json,csv,re
folder=Path(__file__).resolve().parents[1]/'search-console'
raw=json.loads((folder/'indexed-inspection-observations.json').read_text(encoding='utf-8'))
rows=[]
def field(text,start,end):
    value=text.split(start+'\n',1)[1].split('\n'+end,1)[0]
    return '\n'.join(x for x in value.splitlines() if x not in ['info','','INSPECT']).strip()
for i,o in enumerate(raw['observations'],1):
    t=o['indexed_report_text']
    state=t.split('Page indexing\n',1)[1].splitlines()[0]
    user=field(t,'User-declared canonical','Google-selected canonical')
    selected=field(t,'Google-selected canonical','LEARN MORE')
    crawl=field(t,'Last crawl','Crawled as')
    resolved=o['url'] if selected=='Inspected URL' else user if selected=='Same as user-declared canonical' else selected
    rows.append({'inspection_url':o['url'],'captured_at_utc':o['captured_at'],'indexing_status_displayed':state,'user_canonical_displayed':user,'google_canonical_displayed':selected,'google_canonical_resolved':resolved,'last_crawl_ui_displayed_timezone_unverified':crawl,'crawl_allowed_displayed':field(t,'Crawl allowed?','Page fetch'),'page_fetch_displayed':field(t,'Page fetch','Indexing allowed?'),'indexing_allowed_displayed':field(t,'Indexing allowed?','Indexing'),'source_record':f'indexed-inspection-observations.json observations[{i-1}]','source_scope':'Stored Google Index result; not current HTTP fetch'})
with (folder/'indexed-inspection-summary.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
print(json.dumps({'rows':len(rows),'output':'search-console/indexed-inspection-summary.csv','all_canonicals_resolved_from_explicit_display_values':True}))
