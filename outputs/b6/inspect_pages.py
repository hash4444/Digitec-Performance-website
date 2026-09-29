import json,gzip,re
from pathlib import Path
from lxml import html
x={p['path']:p for p in json.load(open('outputs/b6/pages-baseline.json',encoding='utf8'))};paths=['/best-range-rover-workshop-dubai','/blog/land-rover-best-workshop-dubai','/blog/best-defender-workshop-dubai','/blog/jaguar-best-workshop-dubai','/brands/range-rover-service-dubai','/brands/defender-service-dubai','/brands/jaguar-service-dubai','/blog/range-rover-maintenance-guide-dubai','/blog/range-rover-land-rover-air-suspension-problems-dubai']
for p in paths:
 rec=x[p];d=html.fromstring(gzip.decompress((Path('outputs/b5')/rec['htmlFile']).read_bytes()).decode('utf8'));m=(d.xpath('//main') or [d])[0];pars=[re.sub(r'\s+',' ',q.text_content()).strip() for q in m.xpath('.//p') if len(re.sub(r'\s+',' ',q.text_content()).strip())>90];print('\n',p,'\n',rec['seo']['title'],'\n','H1:',[q.text_content().strip() for q in m.xpath('.//h1')],'\n',*pars[:4],sep='\n')
