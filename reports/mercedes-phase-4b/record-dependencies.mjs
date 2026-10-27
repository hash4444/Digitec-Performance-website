import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));const root=path.resolve(here,'../..');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const lockBytes=await fs.readFile(path.join(here,'package-lock.json'));
const lock=JSON.parse(lockBytes);const rows=[],errors=[];
if(sha(lockBytes)!==sha(await fs.readFile(path.join(root,'package-lock.json'))))throw new Error('Lock changed');
for(const[relative,expected]of Object.entries(lock.packages)){
 if(!relative||!relative.startsWith('node_modules/'))continue;
 try{const p=JSON.parse(await fs.readFile(path.join(here,relative,'package.json'),'utf8'));const row={path:relative,expected:expected.version,observed:p.version,optional:!!expected.optional,match:p.version===expected.version};rows.push(row);if(!row.match)errors.push(row);}
 catch(error){if(error.code!=='ENOENT')throw error;rows.push({path:relative,expected:expected.version,installed:false,optional:!!expected.optional,os:expected.os,cpu:expected.cpu});if(!expected.optional)errors.push({path:relative,error:'Required package missing'});}
}
const direct=[];
for(const name of ['vite','typescript','react','react-dom','zod','@supabase/supabase-js','@vitejs/plugin-react-swc']){
 const pinned=JSON.parse(await fs.readFile(path.join(here,'node_modules',name,'package.json'),'utf8'));
 const shared=JSON.parse(await fs.readFile(path.join(root,'node_modules',name,'package.json'),'utf8'));
 direct.push({name,lockedInstallation:pinned.version,sharedInstallation:shared.version});
}
const result={recordedAt:new Date().toISOString(),nodeVersion:process.version,nodeExecutable:process.execPath,packageLockSha256:sha(lockBytes),packageJsonSha256:sha(await fs.readFile(path.join(here,'package.json'))),installCommand:'npm ci --ignore-scripts --no-audit --no-fund (isolated Phase4B root/cache)',sharedDependencyMutations:0,direct,packages:rows,errors,passed:errors.length===0};
await fs.writeFile(path.join(here,'dependency-provenance.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({passed:result.passed,direct,packages:rows.length,errors},null,2));if(errors.length)process.exitCode=1;
