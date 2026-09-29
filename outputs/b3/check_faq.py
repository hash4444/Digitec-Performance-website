import gzip, html as html_std, json, re
from pathlib import Path
from lxml import html

out=Path('outputs/b3')
pages={r['path']:r for r in json.loads((out/'after-pages.json').read_text(encoding='utf-8'))}
bad=[]
count=0
def norm(s):return re.sub(r'\s+',' ',html_std.unescape(str(s or ''))).strip()
for path,rec in pages.items():
    if 'bmw' not in path:continue
    d=html.fromstring(gzip.decompress((out/rec['htmlFile']).read_bytes()).decode('utf-8'))
    body=norm(d.text_content())
    for node in rec['seo'].get('jsonLd',{}).get('@graph',[]):
        if node.get('@type')!='FAQPage':continue
        for q in node.get('mainEntity',[]):
            count+=1
            answer=q.get('acceptedAnswer',{}).get('text','')
            if norm(answer) not in body:bad.append((path,q.get('name')))
from collections import Counter
print('BMW FAQ pairs',count,'missing initial HTML',len(bad))
for path,n in Counter(p for p,_ in bad).items():print(path,n)
