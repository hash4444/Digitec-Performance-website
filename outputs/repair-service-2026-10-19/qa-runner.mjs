import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const out='outputs/repair-service-2026-10-19/qa';
await mkdir(out,{recursive:true});
const checks=[
  ['lint',['node_modules/eslint/bin/eslint.js','.']],
  ['type-app',['node_modules/typescript/bin/tsc','--noEmit','-p','tsconfig.app.json']],
  ['type-node',['node_modules/typescript/bin/tsc','--noEmit','-p','tsconfig.node.json']],
  ['master-seo',['scripts/validate-master-seo.mjs']],
  ['bmw-hub',['scripts/validate-bmw-hub.mjs']],
  ['paint-care',['scripts/validate-paint-care-cluster.mjs']],
  ['tuning',['scripts/validate-tuning.mjs']],
  ['brand-form-source',['outputs/repair-service-2026-10-19/qa/test-brand-form.mjs']],
];
const results=[];
for(const [name,args] of checks){
  const start=Date.now();
  const r=spawnSync(process.execPath,args,{encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024,env:{...process.env,TUNING_VALIDATION_OUTPUT_DIR:`${out}/tuning`}});
  await writeFile(`${out}/${name}.log`,(r.stdout||'')+'\n'+(r.stderr||''));
  results.push({name,command:`node ${args.join(' ')}`,exitCode:r.status,passed:r.status===0,seconds:(Date.now()-start)/1000,log:`${out}/${name}.log`});
  console.log(`${name}: ${r.status===0?'PASS':'FAIL'}`);
}
await writeFile(`${out}/checks.json`,JSON.stringify({checkedAt:new Date().toISOString(),passed:results.every(r=>r.passed),results},null,2));
if(results.some(r=>!r.passed)) process.exitCode=1;
