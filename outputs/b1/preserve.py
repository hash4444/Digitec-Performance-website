import pathlib,json,hashlib,subprocess,shutil,datetime
R=pathlib.Path(__file__).resolve().parents[2];O=R/'outputs/b1';O.mkdir(parents=True,exist_ok=True)
for name,args in [('git-status-before.txt',['status','--porcelain=v1']),('branch-before.txt',['branch','--show-current']),('head-before.txt',['rev-parse','HEAD']),('diff-before.patch',['diff','--binary'])]:
 (O/name).write_bytes(subprocess.check_output(['git',*args],cwd=R))
files=set()
for folder in ['src','scripts','cloudflare']:
 for f in (R/folder).rglob('*'):
  if f.is_file() and f.suffix in ['.ts','.tsx','.js','.mjs','.json','.css','.html','.xml']:files.add(f)
for p in ['package.json','package-lock.json','public/sitemap.xml','b0-a-routing-fix-report.md','b0-b-intent-ownership-report.md','b0-b-url-decision-register.csv','b1-mercedes-ownership-map.md']:
 if (R/p).exists():files.add(R/p)
manifest={}
for f in sorted(files):
 rel=f.relative_to(R).as_posix();manifest[rel]=hashlib.sha256(f.read_bytes()).hexdigest();target=O/'before'/rel;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,target)
(O/'source-hashes-before.json').write_text(json.dumps(manifest,indent=2),encoding='utf8')
b0a=json.loads((R/'outputs/b0-a/changed-files.json').read_text(encoding='utf-8-sig'))
matches=[{'path':x['path'],'expected':x['sha256'],'actual':hashlib.sha256((R/x['path']).read_bytes()).hexdigest()} for x in b0a]
(O/'b0a-baseline.json').write_text(json.dumps(matches,indent=2),encoding='utf8')
assert all(x['expected']==x['actual'] for x in matches),'B0-A baseline mismatch'
print('Saved baseline for',len(files),'files; all',len(matches),'B0-A files match approved local implementation.')
