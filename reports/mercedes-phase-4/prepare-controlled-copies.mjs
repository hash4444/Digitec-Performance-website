import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const report = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(report, '../..');
const gate = JSON.parse(await fs.readFile(path.join(report,'preflight/source-proposal-preflight.json'),'utf8'));
// The independent gate is retained in full; verify the exact candidate inputs again here.
const expected = new Map([
 ['src/pages/BrandPage.tsx','f5d68037c056bb1f32d73cc5c009e066287da0ab225267b9606d834a23002c33'],
 ['src/data/mercedesServiceContent.ts','7ebb6013761160e8bebc48e3f3080ceae2e3fb330d4fa6edf86f02974481718d'],
 ['src/pages/BrandServicePage.tsx','b8bd67b40548b6e3c53db7611e7dd463cd5c92ce6774bbbdc954695b4395df2f']
]);
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
for(const [file, sha] of expected) if(hash(await fs.readFile(path.join(root,file)))!==sha) throw new Error('Reviewed source mismatch: '+file);
const dirs = ['src','public','scripts','docs','cloudflare'];
const roots = ['index.html','package.json','package-lock.json','vite.config.ts','tailwind.config.ts','postcss.config.js','tsconfig.json','tsconfig.app.json','tsconfig.node.json','eslint.config.js'];
const files = [];
async function walk(dir) {for(const e of await fs.readdir(path.join(root,dir),{withFileTypes:true})){const rel=path.posix.join(dir,e.name);if(e.isDirectory())await walk(rel);else if(e.isFile())files.push(rel);}}
for(const dir of dirs)await walk(dir);
files.push(...roots);
const sourceManifest = [];
for(const file of files.sort())sourceManifest.push({file,sha256:hash(await fs.readFile(path.join(root,file)))});
await fs.writeFile(path.join(report,'original-input-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),root,files:sourceManifest,excluded:'.env, Supabase functions, outputs, existing dist, node_modules contents; no dependency installation'},null,2));
for(const name of ['baseline.local','candidate.local']){
 const target=path.join(report,name);
 let exists=false;try{await fs.access(target);exists=true;}catch(e){if(e.code!=='ENOENT')throw e;}
 if(!exists){
  await fs.mkdir(target);
  for(const dir of dirs)await fs.cp(path.join(root,dir),path.join(target,dir),{recursive:true});
  for(const file of roots)await fs.copyFile(path.join(root,file),path.join(target,file));
 }
 // Resume only an identical unpatched snapshot; never overwrite existing files.
 for(const record of sourceManifest)if(hash(await fs.readFile(path.join(target,record.file)))!==record.sha256)throw new Error('Snapshot mismatch '+name+'/'+record.file);
}
const patches=['reports/mercedes-phase-3/proposals/hub/mercedes-hub-minimal.patch','reports/mercedes-phase-3/proposals/services/mercedes-body-enquiry-minimal.patch'];
await fs.mkdir(path.join(report,'diffs'),{recursive:true});
for(const patch of patches){
 const directory='reports/mercedes-phase-4/candidate.local';
 const checked=spawnSync('git',['apply','--check','--directory='+directory,patch],{cwd:root,encoding:'utf8',windowsHide:true});
 if(checked.status!==0)throw new Error(checked.stderr||'Patch context failure');
 const applied=spawnSync('git',['apply','--directory='+directory,patch],{cwd:root,encoding:'utf8',windowsHide:true});
 if(applied.status!==0)throw new Error(applied.stderr||'Patch application failure');
 await fs.copyFile(path.join(root,patch),path.join(report,'diffs',path.basename(patch)));
}
const proposed = [
 ['src/pages/BrandPage.tsx','fed34d81d52c879960d90eb38db91e31d9290ceb7b9895a222a2d075feb13bc2'],
 ['src/data/mercedesServiceContent.ts','bd941c4c6e03c43501e32f304fea8df5de07941b93be3598b1d07431eb91b339'],
 ['src/pages/BrandServicePage.tsx','38bca41fbfd9d7fba3a5ce9701791facc77d1fc0a7a67806903f71e7a096512c']
];
const changes=[];
for(const record of sourceManifest){const sha=hash(await fs.readFile(path.join(report,'candidate.local',record.file)));if(sha!==record.sha256)changes.push({file:record.file,before:record.sha256,after:sha});}
if(changes.length!==3)throw new Error('Unexpected candidate changed-file count');
for(const [file,sha]of proposed)if(changes.find(x=>x.file===file)?.after!==sha)throw new Error('Reviewed proposed bytes mismatch '+file);
const result={preparedAt:new Date().toISOString(),isolatedCopies:['baseline.local','candidate.local'],filesPerSnapshot:sourceManifest.length,approvedChanges:changes,patches,sourceFilesChangedInOriginal:0,environmentFilesCopied:false,sharedDependencies:'Resolve installed dependencies from ancestor checkout; no dependency install, update, copy or junction',passed:true};
await fs.writeFile(path.join(report,'controlled-copy.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
