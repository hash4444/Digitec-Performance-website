import pathlib,json,hashlib,zipfile
root=pathlib.Path.cwd();out=root/'outputs/ecu-electronics-2026-10-19'
scope=json.loads((out/'modified-files.json').read_text(encoding='utf-8'))
prior=json.loads((out/'baseline/prior-work-manifest.json').read_text(encoding='utf-8'))
plan=json.loads((out/'candidate-plan.json').read_text(encoding='utf-8'))
candidate=pathlib.Path(plan['candidate'])
def pack(names,name):
    records=[]
    with zipfile.ZipFile(out/name,'w',zipfile.ZIP_DEFLATED) as archive:
        for file in names:
            data=(root/file).read_bytes()
            if data!=(candidate/file).read_bytes():raise RuntimeError('Candidate mismatch: '+file)
            records.append({'file':file,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)})
            archive.writestr(file,data)
    return {'archive':name,'archiveSha256':hashlib.sha256((out/name).read_bytes()).hexdigest(),'files':records}
delta=pack([r['file'] for r in scope['files']],'ecu-electronics-sprint-delta.zip')
cumulative=pack(list(dict.fromkeys([r['file'] for r in prior['files']]+[r['file'] for r in scope['files']])),'cumulative-pending-seo-source.zip')
report={'base':scope['base'],'purpose':'Local review only; not committed or published','newSprint':delta,'cumulativePendingWork':cumulative,'dependencyNote':'New sprint delta requires the six completed uncommitted diagnostics/AC files. The cumulative archive contains their eight unique latest source paths together.'}
(out/'source-package-manifest.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({'newSprintFiles':len(delta['files']),'cumulativeFiles':len(cumulative['files']),'deltaSha256':delta['archiveSha256'],'cumulativeSha256':cumulative['archiveSha256']}))
