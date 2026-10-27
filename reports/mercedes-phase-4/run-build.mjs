import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const report=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(report,'../..');
const name=process.argv[2];
if(!['baseline','candidate'].includes(name))throw new Error('Use baseline or candidate');
const cwd=path.join(report,name+'.local');
const out=path.join(report,'build',name);await fs.mkdir(out,{recursive:true});
const steps=JSON.parse(await fs.readFile(path.join(cwd,'package.json'),'utf8')).scripts.build.split(' && ');
const result={startedAt:new Date().toISOString(),cwd,declaredBuild:steps.join(' && '),dependencySource:path.join(root,'node_modules'),environmentFilesCopied:false,steps:[],passed:false};
for(const[index,command]of steps.entries()){
 const parts=command.trim().split(/\s+/);
 const args=parts[0]==='vite'?[path.join(root,'node_modules/vite/bin/vite.js'),...parts.slice(1)]:parts[0]==='node'?parts.slice(1):null;
 if(!args)throw new Error('Unexpected build command');
 const started=Date.now();
 const run=spawnSync(process.execPath,args,{cwd,encoding:'utf8',maxBuffer:40*1024*1024,windowsHide:true});
 const log=`step-${String(index+1).padStart(2,'0')}.log`;
 await fs.writeFile(path.join(out,log),(run.stdout||'')+'\n'+(run.stderr||'')+(run.error?'\n'+run.error.stack:''));
 result.steps.push({index:index+1,command,exitCode:run.status,seconds:(Date.now()-started)/1000,log});
 console.log(name+' step '+(index+1)+'/'+steps.length+' exit '+run.status+' '+command);
 await fs.writeFile(path.join(out,'production-build.json'),JSON.stringify(result,null,2));
 if(run.status!==0){result.firstFailedStep=index+1;result.unexecutedSteps=steps.slice(index+1);break;}
}
result.passed=result.steps.length===steps.length&&result.steps.every(x=>x.exitCode===0);
result.finishedAt=new Date().toISOString();
await fs.writeFile(path.join(out,'production-build.json'),JSON.stringify(result,null,2));
const checks=[];
for(const config of ['tsconfig.app.json','tsconfig.node.json']){
 const run=spawnSync(process.execPath,[path.join(root,'node_modules/typescript/bin/tsc'),'--noEmit','-p',config],{cwd,encoding:'utf8',maxBuffer:20*1024*1024,windowsHide:true});
 const log=config+'.log';await fs.writeFile(path.join(out,log),(run.stdout||'')+'\n'+(run.stderr||''));
 checks.push({config,exitCode:run.status,log});console.log(name+' typecheck '+config+' exit '+run.status);
}
await fs.writeFile(path.join(out,'typecheck.json'),JSON.stringify({ranAt:new Date().toISOString(),checks,passed:checks.every(x=>x.exitCode===0)},null,2));
process.exitCode=result.passed&&checks.every(x=>x.exitCode===0)?0:1;
