import json, pathlib, hashlib, zipfile
root = pathlib.Path.cwd()
out = root / 'outputs/diagnostics-ac-2026-10-19'
manifest = json.loads((out / 'modified-files.json').read_text(encoding='utf-8'))
archive_path = out / 'diagnostics-ac-source-changes.zip'
records = []
with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as archive:
    for item in manifest['files']:
        data = (root / item['file']).read_bytes()
        sha = hashlib.sha256(data).hexdigest()
        if sha != item['afterSha256']:
            raise RuntimeError('Source changed since candidate preparation: ' + item['file'])
        archive.writestr(item['file'], data)
        records.append({'file':item['file'], 'sha256':sha, 'bytes':len(data)})
result = {'base':manifest['base'], 'files':records, 'archive':archive_path.name, 'archiveSha256':hashlib.sha256(archive_path.read_bytes()).hexdigest(), 'purpose':'Local review only; not committed, pushed or published'}
(out / 'source-package-manifest.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
print(json.dumps({'files':len(records), 'archiveSha256':result['archiveSha256']}))
