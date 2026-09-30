import json,gzip,re,zipfile,hashlib,difflib,subprocess
from pathlib import Path
from urllib.parse import urlsplit,unquote
from lxml import html,etree
O=Path(__file__).parent
load=lambda p:json.loads(p.read_text(encoding='utf-8'))
A={x['path']:x for x in load(O/'after-pages.json')};B={x['path']:x for x in load(O/'baseline/approved-pages.json')}
docs={p:html.fromstring((Path('dist')/p.lstrip('/')/'index.html').read_text(encoding='utf-8')) for p in A}
policy=[];hreflang=[];images=[];changed=[];diffs=[];textchanges=[];norm=lambda s:re.sub(r'\s+',' ',s).strip()
for p in A:
 if A[p]['seo']!=B[p]['seo']:policy.append(p)
 old=html.fromstring(gzip.decompress((Path('outputs/g3')/B[p]['htmlFile']).read_bytes()).decode('utf-8'));new=html.fromstring(gzip.decompress((O/A[p]['htmlFile']).read_bytes()).decode('utf-8'))
 for d in [old,new]:
  for n in d.xpath('//script|//style'):n.drop_tree()
 if norm(old.text_content())!=norm(new.text_content()):textchanges.append(p)
 for link in docs[p].xpath('//link[@hreflang]'):
  target=urlsplit(link.get('href')).path
  if target not in docs:hreflang.append([p,target,'missing destination']);continue
  if target!=p and not any(urlsplit(q.get('href')).path==p for q in docs[target].xpath('//link[@hreflang]')):hreflang.append([p,target,'non reciprocal'])
 for image in docs[p].xpath('//img'):
  src=urlsplit(image.get('src','')).path
  if image.get('src','').startswith('/') and not (Path('dist')/src.lstrip('/')).is_file():images.append([p,src,'missing local asset'])
  if image.get('alt') is None:images.append([p,src,'missing alt'])
manifest=load(O/'baseline/file-manifest.json')
with zipfile.ZipFile(O/'baseline/local-g3-approved-files.zip') as z:
 for rel,m in manifest.items():
  f=Path(rel)
  if not f.is_file() or rel.startswith('outputs/'):continue
  data=f.read_bytes()
  if hashlib.sha256(data).hexdigest()==m['sha256']:continue
  try:before=z.read(rel).decode('utf-8').splitlines();after=data.decode('utf-8').splitlines()
  except UnicodeDecodeError:continue
  if before==after:continue
  diff=list(difflib.unified_diff(before,after,fromfile='LOCAL_G3/'+rel,tofile='G4/'+rel,lineterm=''));diffs.extend(diff)
  changed.append(dict(file=rel,added=sum(x.startswith('+') and not x.startswith('+++') for x in diff),removed=sum(x.startswith('-') and not x.startswith('---') for x in diff),kind='source' if rel.startswith('src/') else 'generated'))
 sitemap=lambda b:sorted(etree.fromstring(b).xpath('//*[local-name()="loc"]/text()'))
 sitemap_equal=sitemap(z.read('public/sitemap.xml'))==sitemap(Path('public/sitemap.xml').read_bytes())
redirects={}
for l in Path('dist/_redirects').read_text().splitlines():
 x=l.split()
 if len(x)==3 and x[-1] in ('301','302','307','308'):redirects[x[0]]=x[1]
redirectissues=[]
for p,t in redirects.items():
 if t in redirects:redirectissues.append([p,t,'chain'])
 if t not in A:redirectissues.append([p,t,'destination missing'])
 if t in A and A[t]['seo'].get('noindex'):redirectissues.append([p,t,'noindex destination'])
result=dict(routes=len(A),sitemap_equal=sitemap_equal,seo_changes=policy,hreflang_issues=hreflang,image_issues=images,redirects=len(redirects),redirect_issues=redirectissues,rendered_text_changes=textchanges,route_sets_equal=set(A)==set(B),changes=changed)
(O/'final-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8');(O/'g4-only.diff').write_text('\n'.join(diffs)+'\n',encoding='utf-8')
for n,args in [('combined-git-diff-stat',['diff','--stat','HEAD']),('combined-git-diff-names',['diff','--name-only','HEAD']),('final-git-status',['status','--short']),('final-head',['rev-parse','HEAD']),('final-branch',['branch','--show-current'])]:(O/(n+'.txt')).write_bytes(subprocess.check_output(['git',*args]))
print(json.dumps({k:(len(v) if isinstance(v,list) else v) for k,v in result.items()},indent=2))
