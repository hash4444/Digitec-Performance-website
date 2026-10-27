import pathlib, zipfile, json, hashlib, shutil
root=pathlib.Path.cwd(); out=root/'outputs/ecu-electronics-2026-10-19'; candidate=out/'candidate.local'
if candidate.exists(): raise RuntimeError('Preserve existing candidate; refusing overwrite')
candidate.mkdir()
with zipfile.ZipFile(out/'baseline/source.zip') as archive: archive.extractall(candidate)
prior=json.loads((out/'baseline/prior-work-manifest.json').read_text(encoding='utf-8'))
for item in prior['files']:
    source=out/'baseline/prior-work-overlay'/item['file']
    if hashlib.sha256(source.read_bytes()).hexdigest()!=item['afterSha256']: raise RuntimeError('Prior work snapshot mismatch')
    (candidate/item['file']).parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,candidate/item['file'])
selected=['src/pages/ServicePage.tsx','src/pages/BrandServicePage.tsx','src/components/EcuElectronicsEnquiryPanel.tsx','src/data/ecuElectronicsContent.ts']
baseline=json.loads((out/'baseline/workspace-manifest.json').read_text(encoding='utf-8'));before={r['file']:r['sha256'] for r in baseline['files']}
records=[]
for name in selected:
    data=(root/name).read_bytes();(candidate/name).parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(root/name,candidate/name)
    records.append({'file':name,'change':'modified' if name in before else 'added','beforeSha256':before.get(name),'afterSha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)})
fixtures=['outputs/five-brand-service-2026-10-19/conversion/test-five-brand-browser.mjs','outputs/repair-service-2026-10-19/qa/test-repair-browser.mjs','outputs/repair-service-2026-10-19/qa/repair-routes.mjs','outputs/repair-service-2026-10-19/qa/test-brand-form.mjs']
for name in fixtures:
    (candidate/name).parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(root/name,candidate/name)
(out/'modified-files.json').write_text(json.dumps({'base':baseline['base'],'baselineIncludesUncommittedDiagnosticsAc':True,'priorOverlayManifest':'baseline/prior-work-manifest.json','files':records,'excluded':['supabase/functions/mcp/index.ts','outputs/seo-2026-09-16/master-validation.json','all unrelated existing work']},indent=2),encoding='utf-8')
(out/'candidate-plan.json').write_text(json.dumps({'base':baseline['base'],'candidate':str(candidate),'priorOverlayFiles':[r['file'] for r in prior['files']],'selected':selected,'fixtures':fixtures},indent=2),encoding='utf-8')
print(json.dumps({'candidate':str(candidate),'priorOverlay':len(prior['files']),'newSprintFiles':len(records),'base':baseline['base']}))
