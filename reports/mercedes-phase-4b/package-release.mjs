// Offline packaging only. Never edits compiled output or the shared checkout.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const report=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(report,'../..');
const cohort=path.join(report,'production-matched.local');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const input=JSON.parse(await fs.readFile(path.join(report,'fresh-input-manifest.json'),'utf8'));
const approved=input.approvedProposals.map(x=>x[0]);
async function walk(dir,prefix=''){let rows=[];for(const e of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const rel=prefix+e.name;if(e.isDirectory())rows.push(...await walk(path.join(dir,e.name),rel+'/'));else if(e.isFile()){const b=await fs.readFile(path.join(dir,e.name));rows.push({file:rel,bytes:b.length,sha256:hash(b)});}else throw Error('Unsupported artifact entry '+rel);}return rows;}
async function diff(file,to){let txt;try{txt=execFileSync('git',['diff','--no-index','--no-ext-diff','--',path.join(root,file),path.join(to,file)],{encoding:'utf8',windowsHide:true});}catch(e){if(e.status!==1)throw e;txt=e.stdout;}const lines=txt.split('\n');const first=lines.findIndex(x=>x.startsWith('@@'));if(first<0)throw Error('No patch '+file);return 'diff --git a/'+file+' b/'+file+'\n--- a/'+file+'\n+++ b/'+file+'\n'+lines.slice(first).join('\n');}
const summaries=[];
for(const [option,name]of [['A','candidate'],['B','release-b']]){
 const dir=path.join(cohort,name+'.local'),out=path.join(report,'options',option);await fs.mkdir(out,{recursive:true});
 const files=option==='A'?approved:[...approved,'src/lib/route-manifest.ts'];
 const changes=[];let patch='';for(const file of files){const before=await fs.readFile(path.join(root,file)),after=await fs.readFile(path.join(dir,file));changes.push({file,beforeSha256:hash(before),afterSha256:hash(after),approval:approved.includes(file)?'Previously reviewed H3-01/H3-02/S1':'Separate approval required: two English content-revision dates'});patch+=await diff(file,dir);}
 const sourceDrift=[];for(const r of input.inputs){const actual=hash(await fs.readFile(path.join(dir,r.file)));if(actual!==r.sha256)sourceDrift.push({file:r.file,sha256:actual,classification:files.includes(r.file)?'scoped source':r.file==='src/lib/routing-paths.json'?'generated routing manifest':r.file==='public/sitemap.xml'?'generated public sitemap':r.file.startsWith('docs/seo/')?'generated evidence':r.file==='cloudflare/routing-response-data.js'?'generated separate-router support':'UNEXPECTED'});}
 if(sourceDrift.some(x=>x.classification==='UNEXPECTED'))throw Error(JSON.stringify(sourceDrift));
 const publication=await walk(path.join(dir,'dist'));
 const base=await walk(path.join(cohort,'baseline.local/dist'));const am=new Map(publication.map(x=>[x.file,x])),bm=new Map(base.map(x=>[x.file,x]));
 const outputDiff=[...new Set([...am.keys(),...bm.keys()])].sort().filter(x=>am.get(x)?.sha256!==bm.get(x)?.sha256).map(file=>({file,change:!bm.has(file)?'added':!am.has(file)?'removed':'modified',before:bm.get(file)||null,after:am.get(file)||null}));
 const record={option,preparedAt:new Date().toISOString(),status:'OFFLINE PREPARED; NO PUBLICATION AUTHORIZED',artifactDirectory:path.relative(report,path.join(dir,'dist')).replaceAll('\\','/'),fileCount:publication.length,bytes:publication.reduce((a,b)=>a+b.bytes,0),contentManifestSha256:hash(JSON.stringify(publication)),publicationBoundary:'Complete existing-origin static application artifact only. _worker.js/_redirects remain inert static files under the observed current origin model; no Cloudflare Pages/Worker activation or new routing policy is authorized. Confirm the existing host preserves this boundary before a later publication.',sourceChanges:changes,files:publication};
 await fs.writeFile(path.join(out,'source.patch'),patch);await fs.writeFile(path.join(out,'source-changes.json'),JSON.stringify(changes,null,2));await fs.writeFile(path.join(out,'publication-manifest.json'),JSON.stringify(record,null,2));await fs.writeFile(path.join(out,'publication-files.csv'),'file,bytes,sha256\n'+publication.map(r=>[JSON.stringify(r.file),r.bytes,r.sha256].join(',')).join('\n')+'\n');await fs.writeFile(path.join(out,'versus-fresh-baseline.json'),JSON.stringify({option,sourceDrift,outputDiff},null,2));
 summaries.push({option,fileCount:record.fileCount,bytes:record.bytes,contentManifestSha256:record.contentManifestSha256,sourceFiles:changes.map(x=>x.file),baselineOutputDiffs:outputDiff.length});
}
const A=JSON.parse(await fs.readFile(path.join(report,'options/A/publication-manifest.json'),'utf8')),B=JSON.parse(await fs.readFile(path.join(report,'options/B/publication-manifest.json'),'utf8'));const am=new Map(A.files.map(x=>[x.file,x])),bm=new Map(B.files.map(x=>[x.file,x]));const differences=[...new Set([...am.keys(),...bm.keys()])].sort().filter(x=>am.get(x)?.sha256!==bm.get(x)?.sha256).map(file=>({file,a:am.get(file)||null,b:bm.get(file)||null}));
await fs.writeFile(path.join(report,'options/summary.json'),JSON.stringify({preparedAt:new Date().toISOString(),summaries,aVersusB:differences},null,2));console.log(JSON.stringify({summaries,aVersusB:differences.map(x=>x.file)},null,2));
