// Local evidence ledger only. Operator-supplied activation times are identified.
import {readFile,writeFile} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const arg=name=>process.argv.find(a=>a.startsWith(`--${name}=`))?.slice(name.length+3);
const here=fileURLToPath(new URL('./',import.meta.url));
const capturePath=resolve(arg('capture')||'');
const capture=JSON.parse(await readFile(capturePath,'utf8'));
if(capture.syntheticOnly||!capture.activationCheckpoint||capture.summary?.networkRequests<1) throw new Error('Real staged capture required');
if(capture.cases.some(c=>c.chain.some(r=>r.status===0))) throw new Error('Actual HTTP evidence required; transport failure cannot be recorded as a verified stage');
const stage=capture.activationCheckpoint;
const ruleId=arg('id'),submittedAt=arg('submitted'),enabledObservedAt=arg('enabled');
if(!ruleId||!submittedAt||!enabledObservedAt) throw new Error('Require id/submitted/enabled operator metadata');
const path=resolve(here,'activation-verification-ledger.json');
let ledger={scope:'R1–R4 public HTTP observations and operator-supplied Cloudflare activation metadata',activationTimeMeaning:'submittedAt and enabledObservedAt are UI observation boundaries supplied by operator; provider exact activation time is not exposed',stages:[]};
try {ledger=JSON.parse(await readFile(path,'utf8'));} catch(e){if(e.code!=='ENOENT')throw e;}
if(ledger.stages.some(s=>s.stage===stage)) throw new Error('Stage already recorded; preserve original ledger instead of overwriting');
const key=capture.expectedActiveRules.at(-1);
const matrix=capture.cases.filter(c=>c.group==='source'&&c.rule===key);
ledger.stages.push({stage,key,ruleId,submittedAt,enabledObservedAt,activationMetadataSource:'Operator message; Cloudflare dashboard readback performed by root agent',observedHttpStartedAt:capture.startedAt,observedHttpFinishedAt:capture.finishedAt,status:capture.summary.failed===0?'PASS':'FAIL',newRuleMatrixCases:matrix.length,sourceFirstStatuses:[...new Set(matrix.map(c=>c.chain[0].status))],destinationFinalStatuses:[...new Set(matrix.map(c=>c.chain.at(-1).status))],observedSourceEdgeColos:[...new Set(matrix.map(c=>c.chain[0].headers['cf-ray']?.split('-').at(-1)).filter(Boolean))],...capture.summary,evidenceDirectory:relative(here,resolve(capturePath,'..')),baselinePath:capture.baselinePath});
ledger.updatedAt=new Date().toISOString();
await writeFile(path,JSON.stringify(ledger,null,2));
console.log(`${stage} ${ledger.stages.at(-1).status} recorded locally; no network or configuration operations.`);
