import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const out=path.dirname(new URL(import.meta.url).pathname.replace(/^\/(?=[A-Za-z]:)/,''));
const candidate=path.resolve(out,'../candidate.local');
const proof=[];
for(const route of ['/ar/services/paint-protection-film','/ar/services/paint-protection-dubai','/ar/services/ceramic-coating']){
 const prior=path.resolve(out,'../../automotive-release-2026-10-19/candidate.local/dist',route.slice(1),'index.html');
 const current=path.join(candidate,'dist',route.slice(1),'index.html');
 const main=html=>html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)[0].replace(/\s+/g,' ').trim();
 const before=main(await fs.readFile(prior,'utf8')),after=main(await fs.readFile(current,'utf8'));
 const normalize=value=>value.replace(/radix-:[A-Za-z0-9]+:/g,'radix:<generated>');
 let first=0;while(first<Math.min(before.length,after.length)&&before[first]===after[first])first++;
 proof.push({route,rawEqual:before===after,normalizedEqual:normalize(before)===normalize(after),firstDifferentCharacter:first,beforeContext:before.slice(Math.max(0,first-50),first+60),afterContext:after.slice(Math.max(0,first-50),first+60),beforeRadixTokens:[...before.matchAll(/radix-:[A-Za-z0-9]+:/g)].slice(0,4).map(m=>m[0]),afterRadixTokens:[...after.matchAll(/radix-:[A-Za-z0-9]+:/g)].slice(0,4).map(m=>m[0]),normalizedSha256:createHash('sha256').update(normalize(after)).digest('hex')});
}
await fs.writeFile(path.join(out,'protected-radix-diff.json'),JSON.stringify({checkedAt:new Date().toISOString(),normalization:'Only generated Radix/React useId values and whitespace. No text, links, form controls, styles or semantic attributes removed.',proof},null,2));
const started=Date.now(),command=[path.join(out,'validate-diagnostics-ac-static.mjs'),out];
const result=spawnSync(process.execPath,command,{cwd:candidate,encoding:'utf8',windowsHide:true,maxBuffer:32*1024*1024});
await fs.writeFile(path.join(out,'diagnostics-ac-static-rerun.log'),`${result.stdout??''}\n${result.stderr??''}`);
const summary=JSON.parse(await fs.readFile(path.join(out,'combined-cli-results.json'),'utf8'));
summary.harnessAdjustment={at:new Date().toISOString(),reason:'All 16 target routes passed originally. The protected HTML fixture needed generated Radix ID normalization and alias checks belong to routing tests, rather than nonexistent alias HTML files.',archivedFirstAttempt:path.join(out,'static-harness-first-attempt'),proof:path.join(out,'protected-radix-diff.json')};
summary.results=summary.results.map(row=>row.name==='diagnostics-ac-static'?{...row,command:[process.execPath,...command],exitCode:result.status,passed:result.status===0,seconds:(Date.now()-started)/1000,log:path.join(out,'diagnostics-ac-static-rerun.log'),rerunAt:new Date().toISOString()}:row);
summary.passed=summary.results.length===summary.expectedChecks&&summary.results.every(row=>row.passed);summary.checkedAt=new Date().toISOString();
await fs.writeFile(path.join(out,'combined-cli-results.json'),JSON.stringify(summary,null,2));
process.stdout.write(result.stdout??'');process.stderr.write(result.stderr??'');process.exitCode=result.status??1;
