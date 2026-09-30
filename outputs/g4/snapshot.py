import pathlib,subprocess,json,hashlib,zipfile,shutil
root=pathlib.Path.cwd();out=root/'outputs/g4/baseline'
for name,args in [('git-status',['status']),('branch',['branch','--show-current']),('head',['rev-parse','HEAD']),('diff-stat',['diff','--stat','HEAD']),('diff-name-only',['diff','--name-only','HEAD'])]: (out/(name+'.txt')).write_bytes(subprocess.check_output(['git',*args]))
files={x for x in subprocess.check_output(['git','ls-files','-z']).decode().split('\0') if x and not x.startswith('outputs/')}
files.update(p.as_posix() for p in pathlib.Path('src').rglob('*') if p.is_file())
for glob in ['g2-*','g3-*']:files.update(p.as_posix() for p in pathlib.Path('.').glob(glob) if p.is_file())
files.update(p.as_posix() for p in pathlib.Path('outputs/g3/after-rendered').glob('*') if p.is_file())
files.update(['outputs/g3/after-pages.json','outputs/g3/after-routes.json'])
manifest={}
with zipfile.ZipFile(out/'local-g3-approved-files.zip','x',zipfile.ZIP_DEFLATED) as z:
 for rel in sorted(files):
  p=root/rel
  if p.is_file():
   data=p.read_bytes();manifest[rel]={'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)};z.writestr(rel,data)
(out/'file-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
for src,dst in [('after-pages.json','approved-pages.json'),('after-routes.json','approved-routes.json')]:shutil.copy2(root/'outputs/g3'/src,out/dst)
(root/'outputs/g4/baseline-manifest.json').write_text(json.dumps({'G4_BASELINE_TYPE':'LOCAL_G3_APPROVED_STATE','G4_PARENT_GIT_HEAD':subprocess.check_output(['git','rev-parse','HEAD']).decode().strip(),'sourceSnapshot':'baseline/local-g3-approved-files.zip','fileHashes':'baseline/file-manifest.json','files':len(manifest),'validation':'PENDING'},indent=2))
print('Saved local G3 baseline:',len(manifest),'files')
