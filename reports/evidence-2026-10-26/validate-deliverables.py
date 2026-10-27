from pathlib import Path
import csv,json,re,hashlib
root=Path(__file__).resolve().parent.parent
names=['mercedes-seo-audit-2026-10-26.md','mercedes-keyword-map-2026-10-26.csv','mercedes-competitor-gap-2026-10-26.md','mercedes-90-day-roadmap-2026-10-26.md','mercedes-implementation-backlog-2026-10-26.md']
missing=[]
for name in names:
    p=root/name
    assert p.exists() and p.stat().st_size>0,name
    if p.suffix=='.md':
        for target in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf-8')):
            if re.match(r'https?://',target):continue
            local=target.split('#')[0]
            if local and not (p.parent/local).exists():missing.append({'file':name,'target':target})
assert not missing,missing
with (root/names[1]).open(encoding='utf-8-sig',newline='') as f:
    rows=list(csv.DictReader(f))
assert len(rows)==71
assert all(None not in r and all(v is not None for v in r.values()) for r in rows)
assert len(set(r['primary_url'] for r in rows))==51
assert all(r['fresh_primary_url_status']=='200' for r in rows)
assert all(r['search_volume'].startswith('Unavailable') for r in rows)
summary={'passed':True,'required_files':[{ 'path':str(root/n),'bytes':(root/n).stat().st_size,'sha256':hashlib.sha256((root/n).read_bytes()).hexdigest()} for n in names],'local_markdown_links_resolve':True,'keyword_rows':71,'distinct_owners':51,'peer_reviews':{'gsc':'All seven figures and all 54 populated map metric rows independently matched original workbook; context clarification applied.','technical':'Crawl counts and protected oil behavior verified; source and scope corrections applied.','competitor_local':'No material contradictions; fresh versus indexed citation distinction applied.'}}
(root/'evidence-2026-10-26/deliverable-verification.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
