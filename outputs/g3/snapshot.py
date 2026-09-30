import pathlib,subprocess,json,hashlib,zipfile,shutil
root=pathlib.Path.cwd(); out=root/'outputs/g3/baseline'
for name,args in [('git-status',['status']),('branch',['branch','--show-current']),('head',['rev-parse','HEAD']),('diff-stat',['diff','--stat']),('diff-name-only',['diff','--name-only'])]:
 (out/(name+'.txt')).write_bytes(subprocess.check_output(['git',*args]))
files=set(subprocess.check_output(['git','ls-files','-z']).decode().split('\0')); files.discard('')
files.update(str(p.relative_to(root)).replace('\\','/') for p in root.glob('g2-*') if p.is_file())
files.update(str(p.relative_to(root)).replace('\\','/') for p in (root/'outputs/g2').rglob('*') if p.is_file())
manifest={}
with zipfile.ZipFile(out/'local-g2-approved-files.zip','x',zipfile.ZIP_DEFLATED) as z:
 for rel in sorted(files):
  p=root/rel
  if p.is_file():
   data=p.read_bytes(); manifest[rel]={'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)};z.writestr(rel,data)
(out/'file-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
for src,dst in [('after-pages.json','approved-pages.json'),('after-routes.json','approved-routes.json')]:shutil.copy2(root/'outputs/g2'/src,out/dst)
(out/'baseline.json').write_text(json.dumps({'G3_BASELINE_TYPE':'LOCAL_G2_APPROVED_STATE','G3_PARENT_GIT_HEAD':subprocess.check_output(['git','rev-parse','HEAD']).decode().strip(),'sourceSnapshot':'local-g2-approved-files.zip','files':len(manifest),'validation':'PENDING'},indent=2))
print('Snapshot files:',len(manifest))
