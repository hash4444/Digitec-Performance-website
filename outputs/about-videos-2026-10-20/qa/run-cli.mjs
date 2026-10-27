import {spawnSync} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),task=path.join(root,'outputs/about-videos-2026-10-20'),candidate=path.join(task,'candidate.local'),out=path.join(task,'qa');
await fs.mkdir(out,{recursive:true});
const checks=[
 ['generated-input-preflight',[path.join(out,'bootstrap-generated-input.mjs'),candidate,out]],
 ['production-build-19-steps',['scripts/build-production-local.mjs']],
 ['typescript-app',['node_modules/typescript/bin/tsc','--noEmit','-p','tsconfig.app.json']],
 ['typescript-node',['node_modules/typescript/bin/tsc','--noEmit','-p','tsconfig.node.json']],
 ['eslint',['node_modules/eslint/bin/eslint.js','.']],
 ['master-seo',['scripts/validate-master-seo.mjs']],
 ['bmw-hub',['scripts/validate-bmw-hub.mjs']],
 ['paint-care-regression',['scripts/validate-paint-care-cluster.mjs']],
 ['tuning-regression',['scripts/validate-tuning.mjs']],
 ['routing-response-regression',['scripts/test-routing-response.mjs']],
 ['brand-booking-form',['outputs/repair-service-2026-10-19/qa/test-brand-form.mjs']],
 ['about-and-site-preservation',[path.join(out,'validate-about-static.mjs'),out]],
];
const result={at:new Date().toISOString(),candidate,passed:false,results:[]};
for(const[name,args]of checks){const started=Date.now();const r=spawnSync(process.execPath,args,{cwd:candidate,windowsHide:true,encoding:'utf8',maxBuffer:64*1024*1024,env:{...process.env,TUNING_VALIDATION_OUTPUT_DIR:path.join(out,'tuning')}});await fs.writeFile(path.join(out,name+'.log'),`${r.stdout??''}\n${r.stderr??''}${r.error?.stack??''}`);const row={name,command:[process.execPath,...args],exitCode:r.status,passed:r.status===0,seconds:(Date.now()-started)/1000};result.results.push(row);console.log(`${name}: ${row.passed?'PASS':'FAIL'} (${row.seconds}s)`);await fs.writeFile(path.join(out,'combined-cli-results.json'),JSON.stringify(result,null,2));if(!row.passed&&name.includes('production-build'))break;}
result.passed=result.results.length===checks.length&&result.results.every(x=>x.passed);result.finishedAt=new Date().toISOString();await fs.writeFile(path.join(out,'combined-cli-results.json'),JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1;
