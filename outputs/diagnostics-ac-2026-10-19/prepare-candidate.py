import pathlib, zipfile, json, hashlib, shutil
root = pathlib.Path.cwd()
out = root / 'outputs/diagnostics-ac-2026-10-19'
candidate = out / 'candidate.local'
selected = ['src/pages/ServicePage.tsx', 'src/pages/BrandServicePage.tsx', 'src/components/DiagnosticAcEnquiryPanel.tsx', 'src/data/diagnosticsAcGeneralContent.ts', 'src/data/diagnosticsAcBrandContent.ts', 'scripts/validate-query-release.mjs']
if candidate.exists():
    raise RuntimeError('Candidate already exists; preserve prior evidence')
candidate.mkdir()
with zipfile.ZipFile(out / 'baseline/source.zip') as archive:
    archive.extractall(candidate)
baseline = json.loads((out / 'baseline/workspace-manifest.json').read_text(encoding='utf-8'))
before = {f['file']: f['sha256'] for f in baseline['files']}
sha = lambda b: hashlib.sha256(b).hexdigest()
records = []
for name in selected:
    source = root / name
    (candidate / name).parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, candidate / name)
    records.append({'file':name, 'change':'modified' if name in before else 'added', 'beforeSha256':before.get(name), 'afterSha256':sha(source.read_bytes()), 'bytes':source.stat().st_size})
fixtures = [
    'outputs/five-brand-service-2026-10-19/conversion/test-five-brand-browser.mjs',
    'outputs/repair-service-2026-10-19/qa/test-repair-browser.mjs',
    'outputs/repair-service-2026-10-19/qa/repair-routes.mjs',
    'outputs/repair-service-2026-10-19/qa/test-brand-form.mjs',
]
for name in fixtures:
    (candidate / name).parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(root / name, candidate / name)
(out / 'modified-files.json').write_text(json.dumps({'base':baseline['base'], 'files':records, 'qaFixtures':fixtures, 'excluded':['supabase/functions/mcp/index.ts','outputs/seo-2026-09-16/master-validation.json','all other pre-existing changes and evidence']}, indent=2), encoding='utf-8')
(out / 'candidate-plan.json').write_text(json.dumps({'base':baseline['base'], 'candidate':str(candidate), 'selected':selected, 'fixtures':fixtures}, indent=2), encoding='utf-8')
print(json.dumps({'candidate':str(candidate), 'base':baseline['base'], 'selectedFiles':len(records), 'fixtures':len(fixtures)}))
