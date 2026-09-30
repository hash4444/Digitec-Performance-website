import json
from pathlib import Path
O=Path(__file__).parent;R=O.parents[1]
pages={x['path']:x for x in json.loads((O/'baseline-pages.json').read_text(encoding='utf-8'))}
rows=json.loads((O/'owner-decisions.json').read_text(encoding='utf-8'))
paths={x['primary_owner'] for x in rows}|{x['g1_commercial_owner'] for x in rows}
blogs=['car-ac-not-cold-dubai-causes','engine-overheating-dubai-what-to-do','check-engine-light-dubai-guide','car-battery-life-dubai-heat','car-battery-replacement-dubai','car-ac-repair-dubai','brake-repair-dubai','air-suspension-repair-dubai-guide','transmission-service-7g-9g-dubai','summer-car-preparation-dubai-checklist']
paths|={'/blog/'+x for x in blogs}
paths|={'/ar'+x for x in paths if not x.startswith('/ar') and '/ar'+x in pages}
paths=sorted(paths)
assert all(x in pages for x in paths)
(O/'generic-paths.json').write_text(json.dumps(paths),encoding='utf-8')
audit=(R/'outputs/g1/audit.py').read_text(encoding='utf-8')
audit=audit.replace(".read_bytes())", ".read_text(encoding='utf-8'))") if False else audit
audit=audit.replace("read_bytes())\n if not incoming", "read_bytes())\n if not incoming")
audit += '''\n# G2-specific preservation and initial HTML verification, in addition to shared checks.\ng1paths=json.loads((R/'outputs/g1/generic-paths.json').read_text(encoding='utf-8'))\nresult['g1_preservation']={'reviewed':len(g1paths),'changes':[p for p in g1paths if A[p]['seo']!=B[p]['seo'] or sig(docs['before'][p])!=sig(docs['after'][p])]}\nresult['all_changed_routes']=[p for p in A if A[p]['seo']!=B[p]['seo'] or sig(docs['before'][p])!=sig(docs['after'][p])]\nresult['initial_faq_issues']=[]\nfor p in paths:\n full=html.fromstring((R/'dist'/p.lstrip('/')/'index.html').read_text(encoding='utf-8'))\n visible=norm(main(full).text_content())\n for node in A[p]['seo'].get('jsonLd',{}).get('@graph',[]):\n  if node.get('@type')=='FAQPage':\n   for faq in node.get('mainEntity',[]):\n    if norm(faq.get('name')) not in visible or norm(faq.get('acceptedAnswer',{}).get('text')) not in visible:result['initial_faq_issues'].append([p,faq.get('name')])\n(O/'audit-summary.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')\nprint('G1 preservation',result['g1_preservation'],'changed routes',result['all_changed_routes'],'initial FAQ issues',result['initial_faq_issues'])\n'''
(O/'audit.py').write_text(audit,encoding='utf-8')
browser=(R/'outputs/g1/browser.mjs').read_text(encoding='utf-8').replace('outputs/g1','outputs/g2').replace('5197','5198')
browser=browser.replace('report.pages.push({route,width,...x});',"report.pages.push({route,width,...x}); if(route.includes('/blog/') && ['car-ac-not-cold-dubai-causes','engine-overheating-dubai-what-to-do','check-engine-light-dubai-guide'].some(s=>route.endsWith(s))) {await page.screenshot({path:'outputs/g2/'+route.replaceAll('/','_')+'-'+width+'.png',fullPage:true});}")
(O/'browser.mjs').write_text(browser,encoding='utf-8')
print(len(paths),'existing routes inventoried and selected for desktop/mobile/no-JS QA')
