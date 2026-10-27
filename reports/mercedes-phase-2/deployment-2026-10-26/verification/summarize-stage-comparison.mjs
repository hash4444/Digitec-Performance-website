// Local synthesis only; preserves and references the original HTTP captures.
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const here=fileURLToPath(new URL('./',import.meta.url));
const ledger=JSON.parse(await readFile(resolve(here,'activation-verification-ledger.json'),'utf8'));
const rows=[['stage','new_rule_id','observation_scope','method','source_url','before_request_at_UTC','before_chain','before_final_canonical','after_request_at_UTC','after_chain','after_final_canonical','expected_location','result','first_response_CF_Ray','raw_evidence_directory']];
const hashes=[];
for(const s of ledger.stages){
 const rawPath=resolve(here,s.evidenceDirectory,'capture.json');
 const raw=await readFile(rawPath,'utf8');
 const capture=JSON.parse(raw);
 const before=JSON.parse(await readFile(resolve(capture.baselinePath),'utf8'));
 hashes.push({stage:s.stage,capturePath:rawPath,captureSha256:createHash('sha256').update(raw).digest('hex')});
 for(const c of capture.cases.filter(c=>c.group==='source'&&c.rule===s.key)){
  const b=before.cases.find(b=>b.url===c.url&&b.method===c.method),first=c.chain[0],last=c.chain.at(-1);
  const pass=first.status===308&&first.headers.location===c.expectedTarget&&c.chain.length===2&&last.status===200&&last.url===c.expectedTarget&&!c.loop;
  const chain=items=>items.map(r=>`${r.status} ${r.headers.location||''}`).join(' -> ');
  rows.push([s.stage,s.ruleId,'each_rule_immediate_activation_checkpoint;not_full_final_post_matrix',c.method,c.url,b.chain[0].at,chain(b.chain),(b.chain.at(-1).canonical||[]).join(' | '),first.at,chain(c.chain),(last.canonical||[]).join(' | '),c.expectedTarget,pass?'PASS':'FAIL',first.headers['cf-ray']||'',s.evidenceDirectory]);
 }
}
const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
await writeFile(resolve(here,'new-rule-before-after-192-cases.csv'),csv);
await writeFile(resolve(here,'real-capture-sha256.json'),JSON.stringify({at:new Date().toISOString(),localSynthesisOnly:true,rawCaptureHashes:hashes},null,2));
console.log(`Local before/after comparison: ${rows.length-1} source combinations, ${rows.slice(1).filter(r=>r[12]==='FAIL').length} failing request. No network operations.`);
