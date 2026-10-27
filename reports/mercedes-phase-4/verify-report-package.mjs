// Local evidence packaging only. No browser/network/build/source mutation.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const outputs=new Set(['evidence-manifest.json','package-validation.json']);
const excludedDirs=new Set(['baseline.local','candidate.local']);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const entries=[],jsonErrors=[],linkErrors=[];
let jsonFilesParsed=0,localMarkdownLinksChecked=0;
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){
 const file=path.join(dir,e.name),rel=path.relative(root,file).split(path.sep).join('/');
 if(e.isDirectory()){if(dir!==root||!excludedDirs.has(e.name))await walk(file);continue;}
 if(!e.isFile()||outputs.has(rel))continue;
 const bytes=await fs.readFile(file);entries.push({path:rel,bytes:bytes.length,sha256:sha(bytes),scope:'report-evidence'});
 if(file.endsWith('.json')){jsonFilesParsed++;try{JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/,''));}catch(error){jsonErrors.push({path:rel,error:error.message});}}
 if(file.endsWith('.md'))for(const m of bytes.toString('utf8').matchAll(/\[[^\]]*\]\(([^\n)]+)\)/g)){
  const target=m[1].trim().replace(/^<|>$/g,'');if(/^(?:[a-z]+:|#)/i.test(target))continue;
  const decoded=decodeURIComponent(target.split('#')[0]);if(!decoded)continue;localMarkdownLinksChecked++;
  const resolved=path.resolve(path.dirname(file),decoded);if(outputs.has(path.relative(root,resolved)))continue;
  try{await fs.access(resolved);}catch{linkErrors.push({path:rel,target});}
 }
}}
await walk(root);
const inputs=JSON.parse(await fs.readFile(path.join(root,'original-input-manifest.json'),'utf8'));
for(const name of excludedDirs)for(const input of inputs.files){const rel=name+'/'+input.file;const bytes=await fs.readFile(path.join(root,rel));entries.push({path:rel,bytes:bytes.length,sha256:sha(bytes),scope:'controlled-build-input'});}
entries.sort((a,b)=>a.path.localeCompare(b.path));
const generatedAtUtc=new Date().toISOString();
const validation={generatedAtUtc,offlineOnly:true,networkRequests:0,filesHashed:entries.length,jsonFilesParsed,localMarkdownLinksChecked,jsonErrors,linkErrors,packagingPassed:jsonErrors.length===0&&linkErrors.length===0,applicationValidation:'PASS as recorded in build, SSR, browser and redirect reports',fullArtifactReleaseReady:false,releaseHold:'Generated sitemap dates outside approved content diff; see built-input-comparison.json and generated-artifact-review'};
await fs.writeFile(path.join(root,'evidence-manifest.json'),JSON.stringify({generatedAtUtc,scope:'Report evidence and 665 original input paths in each controlled copy; excludes build binaries, dependencies, and these two packaging outputs. Candidate dist files separately fingerprinted in candidate-dist-manifest.json.',entries},null,2));
await fs.writeFile(path.join(root,'package-validation.json'),JSON.stringify(validation,null,2));
console.log(JSON.stringify(validation,null,2));if(!validation.packagingPassed)process.exitCode=1;
