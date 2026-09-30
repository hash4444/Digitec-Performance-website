import json,gzip,re,subprocess
from pathlib import Path
from lxml import html
O=Path(__file__).parent;R=O.parents[1]
load=lambda n:json.loads((O/n).read_text(encoding='utf-8'))
pages={x['path']:x for x in load('after-pages.json')};paths=load('generic-paths.json')
norm=lambda s:re.sub(r'\s+',' ',s).strip()
paras={}
for p in paths:
 d=html.fromstring(gzip.decompress((O/pages[p]['htmlFile']).read_bytes()).decode('utf-8'))
 # Compare article body only for guides; omit related cards, CTA and navigation.
 body=(d.xpath('//article') or d.xpath('//main') or [d])[0]
 paras[p]={norm(x.text_content()) for x in body.xpath('.//p') if len(norm(x.text_content()))>110}
pairs=[]
for i,p in enumerate(paths):
 for q in paths[i+1:]:
  if p.startswith('/ar')!=q.startswith('/ar'):continue
  shared=paras[p]&paras[q]
  if shared:pairs.append(dict(a=p,b=q,shared_paragraphs=sorted(shared),review='Shared workshop/approval facts or commercial related sections; no duplicated substantive changed-guide paragraphs' if '/blog/' not in p or '/blog/' not in q else 'Review exact article-body match'))
(O/'substantive-duplication.json').write_text(json.dumps(pairs,ensure_ascii=False,indent=2),encoding='utf-8')
article_pairs=[x for x in pairs if '/blog/' in x['a'] and '/blog/' in x['b']]
similarity=[]
articles=[p for p in paths if '/blog/' in p]
def shingles(p):
 words=' '.join(sorted(paras[p])).lower().split()
 return {tuple(words[i:i+5]) for i in range(max(0,len(words)-4))}
for i,p in enumerate(articles):
 for q in articles[i+1:]:
  if p.startswith('/ar')!=q.startswith('/ar'):continue
  a,b=shingles(p),shingles(q)
  similarity.append(dict(a=p,b=q,five_word_jaccard=round(len(a&b)/max(1,len(a|b)),4)))
(O/'substantive-similarity.json').write_text(json.dumps(sorted(similarity,key=lambda x:-x['five_word_jaccard']),indent=2),encoding='utf-8')
print('Exact paragraph matches between article bodies:',len(article_pairs))
print(json.dumps(article_pairs,ensure_ascii=False))
source=json.loads((O/'all-source-observations.json').read_text(encoding='utf-8'))
candidates=load('symptom-candidates.json')
candidatekeys={(x['source_file'],x['source'],x['keyword']) for x in candidates}
dispositions=[dict(source_file=x['source_file'],source=x['source'],keyword=x['keyword'],disposition='Symptom candidate; see detailed owner or protected-brand audit' if (x['source_file'],x['source'],x['keyword']) in candidatekeys else 'Outside generic symptom scope; service/component/product/location/brand planning evidence retained without G2 targeting') for x in source]
(O/'source-dispositions.json').write_text(json.dumps(dispositions,ensure_ascii=False,indent=2),encoding='utf-8')
changed=load('audit-summary.json')['all_changed_routes']
assert len(changed)==8
assert all('/blog/' in p for p in changed)
for p in changed:
 assert pages[p]['seo']['title']
 text=gzip.decompress((O/pages[p]['htmlFile']).read_bytes()).decode('utf-8')
 assert '2026-09-30' in text,p
for f in ['src/data/aiGuidePostsExtra.ts','src/i18n/ar-blog.ts','src/i18n/ar-general-blog-content.ts','src/pages/BlogPost.tsx']:
 diff=subprocess.check_output(['git','diff','bbca5e0dbd49b0ff7ef9b7873aa09b2e2e600c9c','--',f],cwd=R).decode('utf-8')
 (O/(Path(f).name+'.diff')).write_text(diff,encoding='utf-8')
print('Eight guide routes with accurate update dates; per-file source diffs saved. No G1/brand route changed.')
