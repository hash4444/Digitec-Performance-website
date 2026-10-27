import {readFile,writeFile,mkdir,copyFile,symlink,lstat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=process.cwd();
const out=path.resolve('outputs/automotive-release-2026-10-19');
const plan=JSON.parse(await readFile(`${out}/candidate-plan.json`,'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const records=[];
for(const file of plan.selected){
  const destination=path.resolve(plan.candidate,file);
  if(!destination.startsWith(plan.candidate+path.sep))throw Error('Candidate overlay escaped its root');
  const original=spawnSync('git',['show',`${plan.base}:${file}`],{windowsHide:true,maxBuffer:16*1024*1024});
  const base=original.status===0?original.stdout:null;
  const data=await readFile(file);
  await mkdir(path.dirname(destination),{recursive:true});await writeFile(destination,data);
  records.push({file,change:base?'modified':'added',baseSha256:base?sha(base):null,releaseSha256:sha(data),bytes:data.length});
}
// QA helpers are test-only fixtures, not part of the source patch or deployable dist.
const fixtures=[
  'outputs/five-brand-service-2026-10-19/conversion/test-five-brand-browser.mjs',
  'outputs/repair-service-2026-10-19/qa/test-repair-browser.mjs',
  'outputs/repair-service-2026-10-19/qa/repair-routes.mjs',
  'outputs/repair-service-2026-10-19/qa/test-brand-form.mjs',
];
for(const file of fixtures){const target=path.join(plan.candidate,file);await mkdir(path.dirname(target),{recursive:true});await copyFile(file,target);}
const modules=path.join(plan.candidate,'node_modules');
try{await lstat(modules);}catch(e){if(e.code!=='ENOENT')throw e;await symlink(path.join(root,'node_modules'),modules,'junction');}
await writeFile(`${out}/modified-file-manifest.json`,JSON.stringify({base:plan.base,sourceFiles:records,qaFixtures:fixtures,excluded:['supabase/functions/mcp/index.ts','outputs/seo-2026-09-16/master-validation.json','all unrelated working-tree artifacts'],nodeModules:'Local junction; never packaged'},null,2));
await writeFile(`${out}/release-paths.txt`,plan.selected.join('\n')+'\n');
console.log(`Overlaid ${records.length} approved files; no original source files changed`);
