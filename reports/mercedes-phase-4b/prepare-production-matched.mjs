import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath}from'node:url';
const report=path.dirname(fileURLToPath(import.meta.url));const root=path.resolve(report,'../..');const cohort=path.join(report,'production-matched.local');const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const inputs=JSON.parse(await fs.readFile(path.join(report,'fresh-input-manifest.json'),'utf8'));
for(const r of inputs.inputs)if(sha(await fs.readFile(path.join(root,r.file)))!==r.sha256)throw new Error('Shared source changed: '+r.file);
for(const name of ['baseline','candidate','release-b']){
 const dest=path.join(cohort,name+'.local');try{await fs.access(dest);throw new Error('Refuse overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
 await fs.mkdir(dest);
 for(const r of inputs.inputs){await fs.mkdir(path.dirname(path.join(dest,r.file)),{recursive:true});await fs.copyFile(path.join(root,r.file),path.join(dest,r.file));}
 if(name!=='baseline')for(const[file,proposal,expected]of inputs.approvedProposals){const bytes=await fs.readFile(path.join(root,proposal));if(sha(bytes)!==expected)throw new Error('Proposal changed');await fs.writeFile(path.join(dest,file),bytes);}
 if(name==='release-b')await fs.copyFile(path.join(report,'release-b.local/src/lib/route-manifest.ts'),path.join(dest,'src/lib/route-manifest.ts'));
}
await fs.copyFile(path.join(report,'run-build.mjs'),path.join(cohort,'run-build.mjs'));
const deps=[];
for(const name of Object.keys({...JSON.parse(await fs.readFile(path.join(root,'package.json'),'utf8')).dependencies,...JSON.parse(await fs.readFile(path.join(root,'package.json'),'utf8')).devDependencies})){
 const a=JSON.parse(await fs.readFile(path.join(root,'node_modules',name,'package.json'),'utf8'));const b=JSON.parse(await fs.readFile(path.join(cohort,'node_modules',name,'package.json'),'utf8'));deps.push({name,sharedVersion:a.version,frozenVersion:b.version,match:a.version===b.version});
}
const frozen=await fs.readFile(path.join(cohort,'pnpm-lock.yaml'));const actual=await fs.readFile(path.join(root,'node_modules/.pnpm/lock.yaml'));
const record={createdAt:new Date().toISOString(),cohort,source:'Actual installed pnpm lock snapshot; direct versions crosschecked; production-matched unpatched manifest is separate HTTP evidence',pnpmLockSha256:sha(frozen),sameLockSnapshot:frozen.equals(actual),directDependencies:deps,passed:frozen.equals(actual)&&deps.every(x=>x.match),sourceFilesAddedOrUpdatedInSharedCheckout:0,npmLockedCohort:'Preserved separately for comparison; not selected release dependency versions'};
await fs.writeFile(path.join(report,'production-matched-provenance.json'),JSON.stringify(record,null,2));if(!record.passed)throw new Error('Dependency freeze mismatch');console.log(JSON.stringify({passed:record.passed,directDependencies:deps.length,pnpmLockSha256:record.pnpmLockSha256},null,2));
