import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(out,'../../..');
const cohort=path.join(root,'reports/mercedes-phase-4b/production-matched.local');
const sha=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const labels=['baseline','candidate','release-b'];
const evidence={collectedAt:new Date().toISOString(),scope:'Read-only static source/build inspection; not browser attribution.',source:[],builds:[]};
for(const label of labels){
 const source=await fs.readFile(path.join(cohort,label+'.local/src/App.tsx'));
 const lines=source.toString().split(/\r?\n/);
 evidence.source.push({label,file:'src/App.tsx',sha256:sha(source),observerExcerpt:lines.slice(62,99).map((text,index)=>({line:index+63,text}))});
 const dist=path.join(cohort,label+'.local/dist');
 const manifestBytes=await fs.readFile(path.join(dist,'.vite/manifest.json'));
 const manifest=JSON.parse(manifestBytes);
 const build={label,manifestSha256:sha(manifestBytes),entry:manifest['index.html'],brand:Object.values(manifest).find(x=>x.name==='BrandPage'),body:Object.values(manifest).find(x=>x.name==='BrandServicePage'),observers:[],sourceMapFiles:[]};
 for(const file of (await fs.readdir(path.join(dist,'assets'))).sort()){
  if(file.endsWith('.map'))build.sourceMapFiles.push(file);
  if(!file.endsWith('.js'))continue;
  const bytes=await fs.readFile(path.join(dist,'assets',file));const text=bytes.toString();
  for(const match of text.matchAll(/MutationObserver/g)){
   const index=match.index;
   build.observers.push({file:'assets/'+file,sha256:sha(bytes),offsetZeroBased:index,line:text.slice(0,index).split('\n').length,columnOneBased:index-text.lastIndexOf('\n',index),excerpt:text.slice(Math.max(0,index-300),Math.min(text.length,index+700))});
  }
 }
 evidence.builds.push(build);
}
evidence.sourceIdentical=evidence.source.every(x=>x.sha256===evidence.source[0].sha256);
evidence.abManifestIdentical=evidence.builds[1].manifestSha256===evidence.builds[2].manifestSha256;
await fs.writeFile(path.join(out,'source-and-build-evidence.json'),JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({sourceIdentical:evidence.sourceIdentical,abManifestIdentical:evidence.abManifestIdentical,builds:evidence.builds.map(x=>({label:x.label,manifest:x.manifestSha256,observerOccurrences:x.observers.length,sourceMaps:x.sourceMapFiles.length,entry:x.entry.file}))}));
