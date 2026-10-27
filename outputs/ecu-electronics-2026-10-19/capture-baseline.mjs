import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const out = path.resolve('outputs/ecu-electronics-2026-10-19');
await mkdir(`${out}/baseline`, {recursive:true});
const git = args => {const r=spawnSync('git',args,{windowsHide:true,maxBuffer:64*1024*1024});if(r.status!==0)throw Error(r.stderr.toString());return r.stdout;};
const base=git(['rev-parse','HEAD']).toString().trim();
if(base!=='acef3427b57b48259bc5b39d6a0f75798603ae95')throw Error('Unexpected baseline');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const previous=JSON.parse(await readFile('outputs/diagnostics-ac-2026-10-19/modified-files.json','utf8'));
for(const item of previous.files){
  const bytes=await readFile(item.file);
  if(sha(bytes)!==item.afterSha256)throw Error('Completed diagnostics/AC source changed: '+item.file);
  const destination=path.join(out,'baseline/prior-work-overlay',item.file);
  await mkdir(path.dirname(destination),{recursive:true});await copyFile(item.file,destination);
}
await writeFile(`${out}/baseline/prior-work-manifest.json`,JSON.stringify(previous,null,2));
const newFiles=new Set(['src/data/ecuElectronicsContent.ts','src/components/EcuElectronicsEnquiryPanel.tsx']);
const files=git(['ls-files','--cached','--others','--exclude-standard','-z']).toString().split('\0').filter(Boolean).filter(file=>!file.startsWith('outputs/ecu-electronics-2026-10-19/')&&!newFiles.has(file));
const records=[];for(const file of files)records.push({file,sha256:sha(await readFile(file))});
await writeFile(`${out}/baseline/workspace-manifest.json`,JSON.stringify({capturedAt:new Date().toISOString(),base,branch:git(['branch','--show-current']).toString().trim(),status:git(['status','--porcelain=v1']).toString(),files:records},null,2));
await writeFile(`${out}/baseline/pre-existing.patch`,git(['diff','--binary']));
const paths=['src','public','scripts','cloudflare','.lovable','.env','.gitignore','package.json','package-lock.json','index.html','vite.config.ts','tsconfig.json','tsconfig.app.json','tsconfig.node.json','tailwind.config.ts','postcss.config.js','components.json','eslint.config.js','docs/seo','outputs/t1/baseline/tuningCars.ts','outputs/b0-a/baseline/cloudflare'];
git(['archive','--format=zip',`--output=${path.join(out,'baseline/source.zip')}`,base,'--',...paths]);
console.log(JSON.stringify({base,preservedFiles:records.length,completedPriorFiles:previous.files.length,archiveReady:true}));
