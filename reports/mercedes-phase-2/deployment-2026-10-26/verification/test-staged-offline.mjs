import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const here=new URL('./',import.meta.url);
const baseline=process.argv.find(a=>a.startsWith('--baseline='))?.slice(11);
if(!baseline) throw new Error('--baseline=<passing pre capture> required');
const common=['--import',new URL('offline-staged-preloader.mjs',here).href,fileURLToPath(new URL('verify-staged.mjs',here)),`--baseline=${resolve(baseline)}`,`--synthetic-fixture=${resolve(baseline)}`];
const checks=[...['R1','R2','R3','R4'].map(stage=>[stage,'valid',0]),...['drop-query','loop','unexpected-pending-active','protected-oil-changed','target-content-changed'].map(s=>['R1',s,1])];
const results=[];
for(const [stage,scenario,expectedExitCode] of checks) {
 const r=spawnSync(process.execPath,[...common,`--through=${stage}`,`--fixture-scenario=${scenario}`],{encoding:'utf8',windowsHide:true});
 assert.equal(r.status,expectedExitCode,`${stage}/${scenario}\n${r.stdout}\n${r.stderr}`);
 const summary=JSON.parse(r.stdout.slice(r.stdout.indexOf('\n{')+1));
 assert.equal(summary.cases,106);
 const capture=JSON.parse(await readFile(resolve(summary.directory,'capture.json'),'utf8'));
 assert.equal(capture.syntheticOnly,true);
 assert.equal(capture.summary.networkRequests,0);
 assert.equal(capture.cases.filter(c=>c.group==='source'&&c.rule===capture.expectedActiveRules.at(-1)).length,48);
 if(scenario==='valid') assert.equal(summary.failed,0);
 else assert.ok(summary.failed>0);
 results.push({stage,scenario,expectedExitCode,observedExitCode:r.status,passed:true,...summary});
}
// Baseline drift guard must fail before any fixture request.
const badPath=fileURLToPath(new URL('SYNTHETIC-mismatched-baseline.json',here));
await writeFile(badPath,JSON.stringify({stage:'pre',summary:{failed:0},proposalSha256:'SYNTHETIC-MISMATCH'}));
const guard=spawnSync(process.execPath,common.map(a=>a.startsWith('--baseline=')?`--baseline=${badPath}`:a).concat(['--through=R1']),{encoding:'utf8',windowsHide:true});
assert.equal(guard.status,1);
assert.match(guard.stderr,/Baseline must be a passing preflight for this exact proposal file/);
results.push({scenario:'mismatched-proposal-baseline',passed:true,observedExitCode:guard.status});
await writeFile(new URL('offline-test-results.json',here),JSON.stringify({at:new Date().toISOString(),syntheticOnly:true,noNetworkRequests:true,noProductionDeploymentOrPostDeploymentResult:true,passed:results.length,results},null,2));
console.log(`${results.length}/${results.length} offline staged-verifier tests passed. No network requests.`);
