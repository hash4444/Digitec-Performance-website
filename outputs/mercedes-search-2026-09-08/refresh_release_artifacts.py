from pathlib import Path
import hashlib,json,subprocess

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/mercedes-release-2026-09-08'
GIT='C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd/git.exe'
BASE='704245d7ebfb561c9ad29d6001fa76c6d8564c11'
def git(*args):return subprocess.check_output([GIT,*args],cwd=ROOT)
head=git('rev-parse','HEAD').decode().strip()
assert not git('diff','--name-only').strip(), 'Commit source changes before packaging.'
paths=git('diff','--name-only',BASE,'HEAD').decode().splitlines()
assert all(not p.startswith(('outputs/','.')) for p in paths)
entries=[];hashes=[]
for path in paths:
    data=git('show',f'HEAD:{path}')
    entries.append({'path':path,'mode':'100644','type':'blob','content':data.decode('utf-8')})
    hashes.append({'path':path,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
patch=git('diff','--binary',BASE,'HEAD')
(OUT/'Mercedes-reviewed-release.patch').write_bytes(patch)
payload={'base':BASE,'baseTree':git('rev-parse',f'{BASE}^{{tree}}').decode().strip(),
         'expectedTree':git('rev-parse','HEAD^{tree}').decode().strip(),'localCommit':head,'entries':entries}
(OUT/'git-source-payload.json').write_text(json.dumps(payload,ensure_ascii=False),encoding='utf-8')
manifest={'base':BASE,'commit':head,'sourceFileCount':len(paths),'hashConvention':'Git blob bytes (LF); compare normalized source when checking a CRLF working copy',
          'patch':{'name':'Mercedes-reviewed-release.patch','bytes':len(patch),'sha256':hashlib.sha256(patch).hexdigest()},'files':hashes}
(OUT/'source-file-hashes.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in manifest.items() if k!='files'}))
