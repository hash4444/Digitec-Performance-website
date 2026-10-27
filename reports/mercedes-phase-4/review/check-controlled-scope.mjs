// Read-only independent source-scope review. Writes report artifacts only here.
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const dir=fileURLToPath(new URL('./',import.meta.url));
const workspace=path.resolve(dir,'../../..');
const get=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const copy=get('--copy')?path.resolve(get('--copy')):null;
const baseline=get('--baseline')?path.resolve(get('--baseline')):workspace;
if(copy&&copy===baseline)throw new Error('Controlled copy and baseline must be different directories.');
const hash=s=>createHash('sha256').update(s).digest('hex');
const approved=[
 {path:'src/pages/BrandPage.tsx',ids:['H3-01','H3-02'],proposal:'reports/mercedes-phase-3/proposals/hub/proposed/BrandPage.tsx',beforeSha256:'f5d68037c056bb1f32d73cc5c009e066287da0ab225267b9606d834a23002c33',afterSha256:'fed34d81d52c879960d90eb38db91e31d9290ceb7b9895a222a2d075feb13bc2'},
 {path:'src/data/mercedesServiceContent.ts',ids:['S1'],proposal:'reports/mercedes-phase-3/proposals/services/proposed/src/data/mercedesServiceContent.ts',beforeSha256:'7ebb6013761160e8bebc48e3f3080ceae2e3fb330d4fa6edf86f02974481718d',afterSha256:'bd941c4c6e03c43501e32f304fea8df5de07941b93be3598b1d07431eb91b339'},
 {path:'src/pages/BrandServicePage.tsx',ids:['S1'],proposal:'reports/mercedes-phase-3/proposals/services/proposed/src/pages/BrandServicePage.tsx',beforeSha256:'b8bd67b40548b6e3c53db7611e7dd463cd5c92ce6774bbbdc954695b4395df2f',afterSha256:'38bca41fbfd9d7fba3a5ce9701791facc77d1fc0a7a67806903f71e7a096512c'},
];
const results=[];
for(const f of approved){
 const baselineBytes=await readFile(path.resolve(baseline,f.path)),proposalBytes=await readFile(path.resolve(workspace,f.proposal));
 const actual=copy?await readFile(path.resolve(copy,f.path)):null;
 results.push({...f,baselineObservedSha256:hash(baselineBytes),baselineMatchesReviewed:hash(baselineBytes)===f.beforeSha256,proposalObservedSha256:hash(proposalBytes),proposalMatchesReviewed:hash(proposalBytes)===f.afterSha256,controlledCopyObservedSha256:actual?hash(actual):null,controlledCopyMatchesApprovedExactly:actual?actual.equals(proposalBytes):null,controlledCopyMatchesApprovedTextIgnoringEol:actual?actual.toString('utf8').replaceAll('\r\n','\n')===proposalBytes.toString('utf8').replaceAll('\r\n','\n'):null});
}
async function list(root,relativeDir){const out=[];for(const ent of await readdir(path.resolve(root,relativeDir),{withFileTypes:true})){const rel=path.posix.join(relativeDir,ent.name);if(ent.isDirectory())out.push(...await list(root,rel));else if(ent.isFile())out.push(rel);else out.push(rel);}return out;}
const changedSource=[],missingSource=[],addedSource=[];
if(copy){const left=await list(baseline,'src'),right=await list(copy,'src');
 for(const rel of left){if(!right.includes(rel)){missingSource.push(rel);continue;}const a=await readFile(path.resolve(baseline,rel)),b=await readFile(path.resolve(copy,rel));if(!a.equals(b))changedSource.push({path:rel,baselineSha256:hash(a),controlledCopySha256:hash(b),approved:approved.some(f=>f.path===rel)});}
 addedSource.push(...right.filter(rel=>!left.includes(rel)));
}
const configPaths=['package.json','package-lock.json','index.html','vite.config.ts','tailwind.config.ts','postcss.config.js','tsconfig.json','tsconfig.app.json','tsconfig.node.json','eslint.config.js'];
const protectedFiles=[];
for(const rel of ['src/pages/ServicePage.tsx',...configPaths]){const before=await readFile(path.resolve(baseline,rel));let after=null;if(copy)after=await readFile(path.resolve(copy,rel));protectedFiles.push({path:rel,baselineSha256:hash(before),controlledCopySha256:after?hash(after):null,identical:after?after.equals(before):null,reason:rel==='src/pages/ServicePage.tsx'?'S2 explicitly excluded.':'No build/dependency/metadata configuration changes authorized.'});}
const patchPaths=['reports/mercedes-phase-3/proposals/hub/mercedes-hub-minimal.patch','reports/mercedes-phase-3/proposals/services/mercedes-body-enquiry-minimal.patch'];
const patches=await Promise.all(patchPaths.map(async rel=>({path:rel,bytes:await readFile(path.resolve(workspace,rel))})));
await mkdir(dir,{recursive:true});
await writeFile(path.resolve(dir,'approved-content-only.patch'),Buffer.concat(patches.map(p=>p.bytes)));
const errors=[];
for(const r of results){if(!r.baselineMatchesReviewed)errors.push('Reviewed baseline mismatch: '+r.path);if(!r.proposalMatchesReviewed)errors.push('Reviewed proposal mismatch: '+r.path);if(copy&&!r.controlledCopyMatchesApprovedExactly)errors.push('Controlled copy differs from exact approved proposal: '+r.path);}
if(copy){if(changedSource.length!==3||changedSource.some(r=>!r.approved))errors.push('Changed source paths do not equal the three-file allowlist.');if(missingSource.length||addedSource.length)errors.push('Source files added/removed.');if(protectedFiles.some(r=>!r.identical))errors.push('Protected file changed.');}
let rollbackReverseApplicability=null;
if(copy&&errors.length===0){
 const rel=path.relative(workspace,copy).replaceAll('\\','/');
 if(rel.startsWith('..')||path.isAbsolute(rel))throw new Error('Controlled copy must be inside the intended workspace for directory-scoped reverse check.');
 const args=['apply','--reverse','--check','--directory='+rel,'--',path.resolve(dir,'approved-content-only.patch')];
 const result=spawnSync('git',args,{cwd:workspace,encoding:'utf8',windowsHide:true});
 rollbackReverseApplicability={checkedAtUtc:new Date().toISOString(),command:'git',arguments:args,cwd:workspace,checkOnly:true,sourceHashesGuarded:true,exitCode:result.status,stdout:result.stdout,stderr:result.stderr,passed:result.status===0};
 if(result.status!==0)errors.push('Non-mutating approved-hunk reverse check failed.');
}
const report={checkedAtUtc:new Date().toISOString(),readOnlyApplicationReview:true,baselineDirectory:baseline,controlledCopyDirectory:copy,status:errors.length?'FAIL':copy?'PASS_APPROVED_SOURCE_SCOPE':'EXPECTED_SCOPE_READY_COPY_NOT_YET_REVIEWED',approvedIds:['H3-01','H3-02','S1'],excludedIds:['S2','H3-03','H3-04'],approvedFileCount:3,approvedFiles:results,changedSource,missingSource,addedSource,protectedFiles,proposalPatchSources:patches.map(p=>({path:p.path,sha256:hash(p.bytes)})),approvedCombinedPatchSha256:hash(Buffer.concat(patches.map(p=>p.bytes))),rollbackReverseApplicability,errors,limitations:['Exact source equality is not a build, typecheck, SSR, browser interaction, live destination or production verification result.','Generated build artifacts are outside src and are reviewed separately; no release/publication is performed by this checker.','Existing unrelated checkout changes are preserved; comparison is against the named baseline, not a whole-worktree Git reset.','Cloudflare state is not read or modified by this local source review.']};
await writeFile(path.resolve(dir,copy?'controlled-copy-scope-review.json':'expected-scope-review.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,controlledCopy:copy,approvedFileCount:3,changedSource:changedSource.map(r=>r.path),errors}));
if(errors.length)process.exitCode=1;
