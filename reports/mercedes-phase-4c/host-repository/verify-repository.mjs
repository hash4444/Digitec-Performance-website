import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
const workspace = path.resolve(import.meta.dirname, '../../..');
const here = import.meta.dirname;
const option = path.join(workspace, 'reports/mercedes-phase-4b');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const blob = bytes => crypto.createHash('sha1').update(Buffer.from(`blob ${bytes.length}\0`)).update(bytes).digest('hex');
const normalized = bytes => bytes.toString('utf8').replace(/\r\n/g, '\n');
const known = {
 'package.json': '0c639a6aca03a0d33440f1b72cc2f9c5bb5b0ce2',
 'src/pages/BrandPage.tsx': '2c1606c6987a44f75a4a87db5637265e6dfc2a06',
 'src/data/mercedesServiceContent.ts': '78804b2a85dff0b9f88524801768656f6bc9dfe2',
 'src/pages/BrandServicePage.tsx': 'd4f095123e04c0cd1d2259a40383edee54f39870',
 'src/lib/route-manifest.ts': 'ad9f1e10eb817745619d132b031df7d3e7603fbd',
 'package-lock.json': 'd81dbb0bd2f532a2327a2c057cc78cdfeb896ec1',
 'bun.lock': 'b9c36667c584a6547ae278b776b81c6d83a80631',
 'vite.config.ts': 'd01793ef0162948818d6af1a0de3d01307913625',
 'README.md': '847d9be90032e7db2f1c7905ec220905bff10df6',
};
const files = [];
for (const [file, expectedBlob] of Object.entries(known)) {
 const dest = path.join(here, 'remote-source', file);
 let remote = await fs.readFile(dest);
 // The evidence writer appended a single newline. Remove it only when the
 // resulting bytes independently match the GitHub API blob identifier.
 if (blob(remote) !== expectedBlob && remote.at(-1) === 10 && blob(remote.subarray(0,-1)) === expectedBlob) {
   remote = remote.subarray(0,-1); await fs.writeFile(dest, remote);
 }
 if (blob(remote) !== expectedBlob) throw new Error(`Remote evidence bytes do not match API blob: ${file}`);
 const local = await fs.readFile(path.join(workspace, file));
 const entry = {file, gitHubBlob:expectedBlob, evidenceBlob:blob(remote), evidenceBytes:remote.length, sha256:sha(remote), localSha256:sha(local), localByteEqual:remote.equals(local), localNormalizedEqual:normalized(remote)===normalized(local)};
 const approved = (JSON.parse(await fs.readFile(path.join(option, 'options/B/source-changes.json'),'utf8'))).find(x=>x.file===file);
 if (approved) {
   const candidate = await fs.readFile(path.join(option, 'production-matched.local/release-b.local', file));
   entry.reviewedBeforeSha256 = approved.beforeSha256;
   entry.localMatchesReviewedBefore = sha(local) === approved.beforeSha256;
   entry.reviewedAfterSha256 = approved.afterSha256;
   entry.candidateMatchesReviewedAfter = sha(candidate) === approved.afterSha256;
 }
 files.push(entry);
}
const locks = {
  npm: JSON.parse(await fs.readFile(path.join(workspace,'package-lock.json'),'utf8')),
  bunText: await fs.readFile(path.join(workspace,'bun.lock'),'utf8'),
  validated: JSON.parse(await fs.readFile(path.join(option,'production-matched-provenance.json'),'utf8')),
};
const packages = locks.validated.directDependencies.map(p=>{
 const escaped = p.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const match = locks.bunText.match(new RegExp('"'+escaped+'": \\["'+escaped+'@([^" ]+)"'));
 const npmVersion = locks.npm.packages['node_modules/'+p.name]?.version;
 return {name:p.name,bunLockVersion:match?.[1]??null,npmLockVersion:npmVersion??null,validatedPnpmVersion:p.frozenVersion,bunMatchesValidated:match?.[1]===p.frozenVersion,npmMatchesValidated:npmVersion===p.frozenVersion};
});
const patchResult=spawnSync('git',['apply','--check','--directory=reports/mercedes-phase-4c/host-repository/remote-source','reports/mercedes-phase-4b/options/B/source.patch'],{cwd:workspace,encoding:'utf8',windowsHide:true});
const packageJson=JSON.parse(await fs.readFile(path.join(workspace,'package.json'),'utf8'));
const report={checkedAtUtc:new Date().toISOString(),readOnlyRemote:true,remoteMain:'13d1c19e99e9696ab63e5721ada18ffcfce11519',files,patchCheck:{exitCode:patchResult.status,stdout:patchResult.stdout,stderr:patchResult.stderr},dependencyComparison:packages,dependencyCounts:{direct:packages.length,bunDiffersFromValidated:packages.filter(x=>!x.bunMatchesValidated).length,npmDiffersFromValidated:packages.filter(x=>!x.npmMatchesValidated).length,bunUnparsed:packages.filter(x=>x.bunLockVersion===null).length},sourceBuildCommand:packageJson.scripts.build,sourceTypeScriptCommand:packageJson.scripts.typecheck,sourcePackageManagerField:packageJson.packageManager??null,sourceEnginesField:packageJson.engines??null,sourceWorkflowFiles:spawnSync('git',['ls-tree','-r','--name-only','HEAD','.github'],{cwd:workspace,encoding:'utf8',windowsHide:true}).stdout.trim().split('\n').filter(Boolean)};
await fs.writeFile(path.join(here,'repository-verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({files:files.map(x=>({file:x.file,localByteEqual:x.localByteEqual,normalizedEqual:x.localNormalizedEqual,approvedBefore:x.localMatchesReviewedBefore,approvedAfter:x.candidateMatchesReviewedAfter})),patchCheck:report.patchCheck,dependencyCounts:report.dependencyCounts},null,2));
