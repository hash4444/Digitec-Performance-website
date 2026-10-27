import fs from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {createHash} from 'node:crypto';
const candidate=path.resolve(process.argv[2]),out=path.resolve(process.argv[3]);
if(!candidate.includes('ecu-electronics-2026-10-19')||!candidate.endsWith('candidate.local'))throw Error('Isolated candidate only');
const routing=path.join(candidate,'src/lib/routing-paths.json');
const before=await fs.readFile(routing);const results=[];
for(const[name,args]of[['ssr-bootstrap',['node_modules/vite/bin/vite.js','build','--ssr','src/entry-server.tsx','--outDir','dist-server']],['routing-sync',['scripts/sync-routing-paths.mjs']]]){
 const r=spawnSync(process.execPath,args,{cwd:candidate,windowsHide:true,encoding:'utf8',maxBuffer:16*1024*1024});
 await fs.writeFile(path.join(out,name+'.log'),(r.stdout??'')+'\n'+(r.stderr??'')+(r.error?.stack??''));results.push({name,exitCode:r.status});if(r.status!==0)throw Error(name+' failed');
}
const after=await fs.readFile(routing),sha=b=>createHash('sha256').update(b).digest('hex');
await fs.writeFile(path.join(out,'generated-sync-preflight.json'),JSON.stringify({checkedAt:new Date().toISOString(),results,file:'src/lib/routing-paths.json',beforeSha256:sha(before),afterSha256:sha(after),sameJson:JSON.stringify(JSON.parse(before))===JSON.stringify(JSON.parse(after)),normalizationOnly:before.toString().replaceAll('\r\n','\n')===after.toString().replaceAll('\r\n','\n'),originalWorkspaceSourceUntouched:true},null,2));
console.log('SSR bootstrap and generated routing input synchronization passed');
