import json
from pathlib import Path
O=Path('outputs/g3')
b=json.loads((O/'baseline/baseline-pages.json').read_text(encoding='utf-8'))
for p in b:p['htmlFile']='baseline/'+p['htmlFile']
(O/'baseline-pages.json').write_text(json.dumps(b),encoding='utf-8')
paths=[p['path'] for p in b if any(x in p['path'] for x in ['paint-protection','ceramic','car-polishing'])]
paths+=['/services/car-body-repair-dubai','/ar/services/car-body-repair-dubai','/services','/ar/services','/brands/porsche']
paths=[p for p in paths if p in {x['path'] for x in b}]
(O/'generic-paths.json').write_text(json.dumps(paths))
s=Path('outputs/g2/audit.py').read_text(encoding='utf-8');s+='''\ng2paths=json.loads((R/'outputs/g2/generic-paths.json').read_text(encoding='utf-8'))\nresult['g2_preservation']={'reviewed':len(g2paths),'changes':[p for p in g2paths if A[p]['seo']!=B[p]['seo'] or sig(docs['before'][p])!=sig(docs['after'][p])]}\n(O/'audit-summary.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')\nprint('G2 preservation',result['g2_preservation'])\n''';(O/'audit.py').write_text(s,encoding='utf-8')
s=Path('outputs/g2/browser.mjs').read_text().replace('outputs/g2','outputs/g3').replace('5198','5199');start=s.index("if(route.includes('/blog/')");end=s.index(" {await page.screenshot",start);s=s[:start]+"if(['/services/paint-protection-film','/services/ceramic-coating','/ar/services/paint-protection-film','/ar/services/ceramic-coating','/ar/services/paint-protection-dubai','/services/car-polishing-dubai'].includes(route))"+s[end:];(O/'browser.mjs').write_text(s)
s=Path('outputs/g2/capture.mjs').read_text().replace("path.resolve('outputs/g2')","path.resolve('outputs/g3')");s=s[:s.index("if (phase === 'baseline')")]+"console.log(`Captured ${pages.length} pages`);\n";(O/'capture.mjs').write_text(s)
print('QA routes',len(paths))
