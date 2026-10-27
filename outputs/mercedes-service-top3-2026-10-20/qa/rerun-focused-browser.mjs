import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const out=path.dirname(fileURLToPath(import.meta.url)),candidate=path.resolve(out,'../candidate.local');const started=Date.now();
const r=spawnSync(process.execPath,['--import',pathToFileURL(path.join(out,'browser-safety-preload.mjs')).href,path.join(out,'test-mercedes-browser.mjs'),path.join(out,'mercedes-browser')],{cwd:candidate,windowsHide:true,encoding:'utf8',maxBuffer:16*1024*1024});
await fs.writeFile(path.join(out,'mercedes-campaign-browser.log'),(r.stdout??'')+'\n'+(r.stderr??''));
const aggregate=JSON.parse(await fs.readFile(path.join(out,'combined-browser-results.json'),'utf8'));
aggregate.results=aggregate.results.filter(x=>x.name!=='mercedes-campaign-browser');aggregate.results.push({name:'mercedes-campaign-browser',exitCode:r.status,passed:r.status===0,seconds:(Date.now()-started)/1000,log:path.join(out,'mercedes-campaign-browser.log'),rerunReason:'Focused retry after one isolated local networkidle navigation timeout. Identical12second timeout and all exact expected assertions retained; no product change.'});aggregate.checkedAt=new Date().toISOString();aggregate.passed=aggregate.results.length===9&&aggregate.results.every(x=>x.passed);await fs.writeFile(path.join(out,'combined-browser-results.json'),JSON.stringify(aggregate,null,2));console.log(r.stdout);console.log(JSON.stringify({passed:aggregate.passed,exitCode:r.status,suites:aggregate.results.length}));if(r.status!==0)process.exitCode=1;
