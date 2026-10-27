// Read-only resolution/package-byte comparison. Does not install or execute compiler packages.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const workspace=path.resolve(out,'../../../..');
const cohorts={shared:workspace,frozenPnpm:path.join(workspace,'reports/mercedes-phase-4b/production-matched.local')};
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const recipes=[
 ['vite','vite',null],['reactPlugin','@vitejs/plugin-react-swc',null],['tailwind','tailwindcss',null],['rootPostcss','postcss',null],
 ['rollup','rollup','vite'],['esbuild','esbuild','vite'],['vitePostcss','postcss','vite'],['lightningcss','lightningcss','vite'],
 ['swc','@swc/core','reactPlugin'],['rollupNative','@rollup/rollup-win32-x64-msvc','rollup'],['esbuildNative','@esbuild/win32-x64','esbuild'],['swcNative','@swc/core-win32-x64-msvc','swc'],
];
const packages={};
async function packageRoot(requireFrom,name){
 let resolved;
 try{resolved=requireFrom.resolve(name+'/package.json');}catch{resolved=requireFrom.resolve(name);}
 let directory=path.dirname(resolved);
 for(;;){try{const meta=JSON.parse(await fs.readFile(path.join(directory,'package.json'),'utf8'));if(meta.name===name)return {directory,meta,resolved};}catch{}const next=path.dirname(directory);if(next===directory)throw Error('Package root not found for '+name);directory=next;}
}
async function fingerprint(directory){
 const records=[];const skipped=[];
 async function walk(current,relative=''){
  for(const entry of await fs.readdir(current,{withFileTypes:true})){
   if(entry.name==='node_modules'){skipped.push(path.posix.join(relative,entry.name));continue;}
   const rel=path.posix.join(relative,entry.name),full=path.join(current,entry.name);
   if(entry.isDirectory())await walk(full,rel);
   else if(entry.isFile()){const bytes=await fs.readFile(full);records.push({file:rel,bytes:bytes.length,sha256:hash(bytes)});}
   else skipped.push(rel+' (non-regular entry)');
  }
 }
 await walk(directory);records.sort((a,b)=>a.file.localeCompare(b.file));
 return {files:records,skipped,treeSha256:hash(JSON.stringify(records))};
}
for(const[label,root]of Object.entries(cohorts)){
 packages[label]={};const rootRequire=createRequire(path.join(root,'package.json'));
 for(const[key,name,parent]of recipes){
  try{
   const parentInfo=parent?packages[label][parent]:null;
   if(parent&&!parentInfo?.packageDirectory)throw Error('Parent package unavailable: '+parent);
   const resolver=parent?createRequire(path.join(parentInfo.packageDirectory,'package.json')):rootRequire;
   const found=await packageRoot(resolver,name);
   const realPath=await fs.realpath(found.directory);
   const fp=await fingerprint(found.directory);
   packages[label][key]={name,version:found.meta.version,resolvedVia:parent||'project package.json',resolvedEntry:found.resolved,packageDirectory:found.directory,realPackageDirectory:realPath,fileCount:fp.files.length,treeSha256:fp.treeSha256,skipped:fp.skipped,files:fp.files};
  }catch(error){packages[label][key]={name,resolvedVia:parent||'project package.json',available:false,error:error.message};}
 }
}
const comparisons=[];
for(const[key,name,parent]of recipes){
 const a=packages.shared[key],b=packages.frozenPnpm[key];
 if(!a.packageDirectory||!b.packageDirectory){comparisons.push({key,name,resolvedVia:parent||'project package.json',comparable:false,sharedAvailable:Boolean(a.packageDirectory),frozenAvailable:Boolean(b.packageDirectory),sharedError:a.error,frozenError:b.error});continue;}
 const af=new Map(a.files.map(r=>[r.file,r])),bf=new Map(b.files.map(r=>[r.file,r]));const differing=[];
 for(const file of [...new Set([...af.keys(),...bf.keys()])].sort()){const x=af.get(file),y=bf.get(file);if(x?.sha256!==y?.sha256)differing.push({file,shared:x||null,frozenPnpm:y||null});}
 comparisons.push({key,name,resolvedVia:parent||'project package.json',comparable:true,sharedVersion:a.version,frozenVersion:b.version,versionsEqual:a.version===b.version,sharedPackageDirectory:a.realPackageDirectory,frozenPackageDirectory:b.realPackageDirectory,sharedFileCount:a.files.length,frozenFileCount:b.files.length,sharedTreeSha256:a.treeSha256,frozenTreeSha256:b.treeSha256,packageFileTreesEqual:differing.length===0,differingFileCount:differing.length,differingFiles:differing});
}
const now=new Date().toISOString();
const report={checkedAtUtc:now,checkedAtDubai:new Date(Date.parse(now)+4*3600000).toISOString().replace('Z','+04:00'),readOnly:true,networkRequests:0,dependencyInstalls:0,compilerPackageExecution:false,cohorts,process:{platform:process.platform,arch:process.arch,node:process.version,execPath:process.execPath,executableSha256:hash(await fs.readFile(process.execPath))},scope:'Package files in Vite/Rollup/esbuild/SWC/react plugin/PostCSS/Tailwind and resolved Windows native bindings. Transitives are resolved from their actual owning compiler package, not assumed from hoisted project names.',comparisons,packages,summary:{recipes:recipes.length,comparable:comparisons.filter(x=>x.comparable).length,equalPackageFileTrees:comparisons.filter(x=>x.comparable&&x.packageFileTreesEqual).length,differentPackageFileTrees:comparisons.filter(x=>x.comparable&&!x.packageFileTreesEqual).length,unavailableRecipes:comparisons.filter(x=>!x.comparable).length},limitations:['This compares the named compiler/CSS package byte trees, not the entire transitive closure, environment variables, filesystem paths, build caches or every runtime input.','node_modules subdirectories inside an owning package are excluded from its own tree and relevant nested dependencies are resolved separately through the specified parent.','Different resolution paths are observed facts, but path-sensitive bundle output is only a hypothesis unless separately tested. Equal versions alone establish no byte equivalence.','Any differing package bytes are evidence of an environment difference, not by themselves proof that a specific bundle difference was caused by those files.','A missing optional package in both cohorts is recorded as unavailable, not as an installed-byte mismatch.','No install, compiler invocation, configuration/source edit, network request or production action occurred.']};
await fs.writeFile(path.join(out,'comparison.json'),JSON.stringify(report,null,2)+'\n');
const md=[`# Compiler dependency bytes and resolution`, ``, `Read-only snapshot ${now}. No packages were installed or executed. ${report.summary.comparable}/${report.summary.recipes} recipes resolve in both environments: **${report.summary.equalPackageFileTrees} equal byte trees, ${report.summary.differentPackageFileTrees} different byte trees**; ${report.summary.unavailableRecipes} unavailable comparison(s).`, ``, `| Package / actual parent resolver | Shared version | Frozen pnpm version | Package files |`, `|---|---|---|---|`, ...comparisons.map(c=>`| \`${c.name}\` / ${c.resolvedVia} | ${c.sharedVersion??(c.sharedAvailable?'available':'unavailable')} | ${c.frozenVersion??(c.frozenAvailable?'available':'unavailable')} | ${!c.comparable?'Unavailable':c.packageFileTreesEqual?'All equal':c.differingFileCount+' differ'} |`), ``, `[All resolved/real paths, exact file hashes and differences](comparison.json).`, ``, ...report.limitations.map(x=>'- '+x), ``].join('\n');
await fs.writeFile(path.join(out,'README.md'),md);
console.log(JSON.stringify({summary:report.summary,comparisons:comparisons.map(({key,name,sharedVersion,frozenVersion,packageFileTreesEqual,differingFileCount,comparable,sharedAvailable,frozenAvailable})=>({key,name,sharedVersion,frozenVersion,packageFileTreesEqual,differingFileCount,comparable,sharedAvailable,frozenAvailable})),output:out},null,2));
