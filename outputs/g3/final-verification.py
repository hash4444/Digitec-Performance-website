import json,gzip,re,zipfile,hashlib,difflib,subprocess
from pathlib import Path
from lxml import html,etree
O=Path('outputs/g3');A={p['path']:p for p in json.loads((O/'after-pages.json').read_text(encoding='utf-8'))};B={p['path']:p for p in json.loads((O/'baseline-pages.json').read_text(encoding='utf-8'))};paths=json.loads((O/'generic-paths.json').read_text())
norm=lambda s:re.sub(r'\s+',' ',s).strip()
faqcount=0;issues=[];policy=[]
def nodes(v):
 if isinstance(v,dict):
  yield v
  for x in v.values():yield from nodes(x)
 elif isinstance(v,list):
  for x in v:yield from nodes(x)
for p in paths:
 d=html.fromstring((Path('dist')/p.lstrip('/')/'index.html').read_text(encoding='utf-8'));text=norm(d.text_content())
 for script in d.xpath('//script[@type="application/ld+json"]'):
  for node in nodes(json.loads(script.text or '{}')):
   if node.get('@type')=='FAQPage':
    for q in node.get('mainEntity',[]):
     faqcount+=1
     if norm(q.get('name','')) not in text or norm(q.get('acceptedAnswer',{}).get('text','')) not in text:issues.append([p,q.get('name')])
for p in A:
 if {k:A[p]['seo'].get(k) for k in ['canonical','noindex','hasArabicVersion']}!={k:B[p]['seo'].get(k) for k in ['canonical','noindex','hasArabicVersion']}:policy.append(p)
manifest=json.loads((O/'baseline/file-manifest.json').read_text());changed=[];g2changes=[];diffs=[]
with zipfile.ZipFile(O/'baseline/local-g2-approved-files.zip') as z:
 for rel,meta in manifest.items():
  f=Path(rel)
  if not f.is_file():continue
  data=f.read_bytes()
  if hashlib.sha256(data).hexdigest()==meta['sha256']:continue
  if rel.startswith('outputs/g2/') or rel.startswith('g2-'):g2changes.append(rel)
  try:
   before=z.read(rel).decode('utf-8').splitlines();after=data.decode('utf-8').splitlines()
  except UnicodeDecodeError:continue
  if before==after:continue
  diff=list(difflib.unified_diff(before,after,fromfile='LOCAL_G2/'+rel,tofile='G3/'+rel,lineterm=''))
  plus=sum(x.startswith('+') and not x.startswith('+++') for x in diff);minus=sum(x.startswith('-') and not x.startswith('---') for x in diff)
  changed.append({'file':rel,'added':plus,'removed':minus,'kind':'source' if rel.startswith('src/') else 'generated'})
  diffs.extend(diff)
 for f in Path('src').rglob('*'):
  rel=f.as_posix()
  if f.is_file() and rel not in manifest:
   lines=f.read_text(encoding='utf-8').splitlines();changed.append({'file':rel,'added':len(lines),'removed':0,'kind':'source'});diffs.extend(difflib.unified_diff([],lines,fromfile='/dev/null',tofile=rel,lineterm=''))
 def sitemap(data):return sorted(etree.fromstring(data).xpath('//*[local-name()="loc"]/text()'))
 sitemapEqual=sitemap(z.read('public/sitemap.xml'))==sitemap(Path('public/sitemap.xml').read_bytes())
(O/'g3-only.diff').write_text('\n'.join(diffs)+'\n',encoding='utf-8')
summary={'files':changed,'authored_source_files':sum(x['kind']=='source' for x in changed),'source_lines_added':sum(x['added'] for x in changed if x['kind']=='source'),'source_lines_removed':sum(x['removed'] for x in changed if x['kind']=='source'),'generated_files':sum(x['kind']=='generated' for x in changed),'g2_artifacts_modified':g2changes}
(O/'g3-only-diff-summary.json').write_text(json.dumps(summary,indent=2))
for n,args in [('combined-git-diff-stat',['diff','--stat','HEAD']),('combined-git-diff-names',['diff','--name-only','HEAD']),('final-git-status',['status','--short']),('final-head',['rev-parse','HEAD']),('final-branch',['branch','--show-current'])]: (O/(n+'.txt')).write_bytes(subprocess.check_output(['git',*args],stderr=subprocess.DEVNULL))
verification={'faq_pairs_in_initial_html':faqcount,'faq_issues':issues,'route_policy_changes':policy,'sitemap_membership_equal':sitemapEqual,'g2_artifacts_modified':g2changes}
(O/'policy-verification.json').write_text(json.dumps(verification,indent=2));print(json.dumps(verification));print(json.dumps(summary))
