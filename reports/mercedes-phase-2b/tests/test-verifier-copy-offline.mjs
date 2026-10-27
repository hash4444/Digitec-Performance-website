import {spawnSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const here=new URL('./',import.meta.url);
const baseline=resolve('reports/mercedes-phase-2/evidence/http/pre-2026-10-26T07-06-59-812Z/capture.json');
const common=['--import',new URL('../../mercedes-phase-2/tests/fixtures/offline-fetch-preloader.mjs',here).href,fileURLToPath(new URL('verify-http-phase2b.mjs',here)),'--stage=post',`--baseline=${baseline}`,`--synthetic-fixture=${baseline}`];
const results=[];
for(const [scenario,expected] of [['valid',0],['drop-query',1]]){
 const r=spawnSync(process.execPath,[...common,`--fixture-scenario=${scenario}`],{encoding:'utf8',windowsHide:true});
 assert.equal(r.status,expected,r.stdout+'\n'+r.stderr);
 const summary=JSON.parse(r.stdout.slice(r.stdout.indexOf('\n{')+1));
 const capture=JSON.parse(await readFile(resolve(summary.directory,'capture.json'),'utf8'));
 assert.equal(capture.cases.length,326);
 assert.equal(capture.summary.networkRequests,0);
 assert.equal(capture.syntheticOnly,true);
 assert.ok(capture.cases.filter(c=>c.method==='GET').every(c=>c.chain.every(r=>r.htmlFile)));
 results.push({scenario,expectedExitCode:expected,observedExitCode:r.status,passed:true,...summary});
}
await writeFile(new URL('offline-test-results.json',here),JSON.stringify({at:new Date().toISOString(),syntheticOnly:true,noNetworkRequests:true,passed:results.length,results},null,2));
console.log('2/2 offline copy checks passed: full326 fixture succeeds; query loss fails; all GET-hop HTML retained. No network requests.');
