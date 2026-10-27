// Offline hashes and saved-inventory comparison only; never performs network I/O.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const outputRoot=fileURLToPath(new URL('../',import.meta.url));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const sourceBaselinePath='reports/mercedes-phase-2/deployment-2026-10-26/preflight/protected-source-fresh.json';
const sourceBaseline=JSON.parse(await readFile(resolve(sourceBaselinePath),'utf8'));
const sources=[];
for(const row of sourceBaseline){
 try{const now=sha(await readFile(resolve(row.path)));sources.push({...row,currentSha256:now,unchangedFromFresh:now===row.freshSha256,unchangedFromReviewed:now===row.reviewedSha256});}
 catch(e){sources.push({...row,error:e.message,unchangedFromFresh:false,unchangedFromReviewed:false});}
}
const artifactBaselinePath='reports/mercedes-phase-2/deployment-2026-10-26/preflight/approved-and-evidence-hashes.json';
const artifactBaseline=JSON.parse(await readFile(resolve(artifactBaselinePath),'utf8'));
const artifacts=[];
for(const row of artifactBaseline){const bytes=await readFile(resolve(row.path));const now=sha(bytes);artifacts.push({path:row.path,expectedSha256:row.sha256,currentSha256:now,expectedBytes:row.bytes,currentBytes:bytes.length,unchanged:now===row.sha256&&bytes.length===row.bytes});}
const checkpointBaselinePath='reports/mercedes-phase-2/deployment-2026-10-26/verification/real-capture-sha256.json';
const checkpointBaseline=JSON.parse(await readFile(resolve(checkpointBaselinePath),'utf8'));
const checkpoints=[];
for(const row of checkpointBaseline.rawCaptureHashes){const now=sha(await readFile(row.capturePath));checkpoints.push({...row,currentSha256:now,unchanged:now===row.captureSha256});}
const r4=checkpoints.find(c=>c.stage==='R4');
const anchoredR4Expected='a0c5b766b65c0755d9af1641b20b868c59765ef9e97dd64e8c8155a7fe9a95ef';
const r4Capture=JSON.parse(await readFile(r4.capturePath,'utf8'));
const failure=r4Capture.cases.find(c=>c.key==='source-ar-mechanical-repair-6');
const failedResponse=failure.chain[0];
const bodyPath=resolve(dirname(r4.capturePath),failedResponse.htmlFile);
const failureHtmlSha=sha(await readFile(bodyPath));
const failureEvidence={capturePath:r4.capturePath,expectedAnchoredCaptureSha256:anchoredR4Expected,currentCaptureSha256:r4.currentSha256,captureMatchesAnchoredHash:r4.currentSha256===anchoredR4Expected,url:failure.url,method:failure.method,status:failedResponse.status,canonical:failedResponse.canonical,requestAt:failedResponse.at,cfRay:failedResponse.headers['cf-ray'],htmlPath:bodyPath,recordedHtmlSha256:failedResponse.htmlSha256,currentHtmlSha256:failureHtmlSha,htmlMatchesRecordedHash:failureHtmlSha===failedResponse.htmlSha256,assertionFailuresStillRecorded:r4Capture.summary.failed};
const integrity={checkedAt:new Date().toISOString(),offlineOnly:true,readOnlyChecks:true,sourceBaselinePath,artifactBaselinePath,checkpointBaselinePath,summary:{protectedSourcesExpected:283,protectedSourcesChecked:sources.length,protectedSourcesUnchanged:sources.filter(s=>s.unchangedFromFresh&&s.unchangedFromReviewed).length,approvedArtifactsChecked:artifacts.length,approvedArtifactsUnchanged:artifacts.filter(a=>a.unchanged).length,phase2ACheckpointCapturesChecked:checkpoints.length,phase2ACheckpointCapturesUnchanged:checkpoints.filter(c=>c.unchanged).length},allPassed:sources.length===283&&sources.every(s=>s.unchangedFromFresh&&s.unchangedFromReviewed)&&artifacts.every(a=>a.unchanged)&&checkpoints.every(c=>c.unchanged)&&failureEvidence.captureMatchesAnchoredHash&&failureEvidence.htmlMatchesRecordedHash,protectedSources:sources,approvedArtifacts:artifacts,phase2ACheckpointCaptures:checkpoints,originalR4FailureEvidence:failureEvidence,limits:['Local file integrity against preserved baseline hashes; not a fresh production-origin source export.','No HTTP, browser, Cloudflare configuration, cache, indexing or website changes performed.']};
await writeFile(resolve(outputRoot,'source-integrity.json'),JSON.stringify(integrity,null,2));

const beforePath='reports/mercedes-phase-2/deployment-2026-10-26/cloudflare/before-inventory.json';
const currentPath='reports/mercedes-phase-2b/cloudflare/current-inventory.json';
const checkerPath='reports/mercedes-phase-2/tests/check-redirect-conflicts.mjs';
const check=spawnSync(process.execPath,[checkerPath,`--before=${beforePath}`,`--after=${currentPath}`,'--no-report'],{encoding:'utf8',windowsHide:true});
// Preserve the checker's exact stdout; --no-report protects the reviewed report.
await writeFile(resolve(outputRoot,'cloudflare/conflict-check.json'),check.stdout);
if(check.status!==0){await writeFile(resolve(outputRoot,'cloudflare/conflict-check-stderr.txt'),check.stderr);throw new Error(`Offline conflict checker failed: ${check.stderr}`);}
const conflict=JSON.parse(check.stdout);

const phase2AAfterPath='reports/mercedes-phase-2/deployment-2026-10-26/cloudflare/after-inventory.json';
const aBytes=await readFile(resolve(phase2AAfterPath));
const bBytes=await readFile(resolve(currentPath));
const a=JSON.parse(aBytes),b=JSON.parse(bBytes);
const fields=['id','order','description','enabled','expression','action','action_parameters','placementObserved'];
const rules=b.rules.map((current,index)=>{
 const prior=a.rules[index];
 const comparisons=fields.map(field=>({field,passed:isDeepStrictEqual(prior?.[field],current[field]),...(isDeepStrictEqual(prior?.[field],current[field])?{}:{before:prior?.[field],after:current[field]})}));
 return {index:index+1,id:current.id,allComparedFieldsMatch:comparisons.every(c=>c.passed),comparisons};
});
const comparison={comparedAt:new Date().toISOString(),offlineOnly:true,phase2AAfterPath,currentInventoryPath:currentPath,phase2AObservedAt:a.observedAt,currentObservedAt:b.observedAt,phase2AInventorySha256:sha(aBytes),currentInventorySha256:sha(bBytes),comparedRuleFields:fields,excludedObservationFields:['readAt (fresh observation time)','top-level observation metadata; rule field definitions and order are compared independently'],beforeCount:a.rules.length,currentCount:b.rules.length,exactlySeven:a.rules.length===7&&b.rules.length===7,sameOrderedIds:isDeepStrictEqual(a.rules.map(r=>r.id),b.rules.map(r=>r.id)),sameCapacity:isDeepStrictEqual(a.capacity,b.capacity),allEnabled:b.rules.every(r=>r.enabled===true),rules,allPassed:a.rules.length===7&&b.rules.length===7&&rules.every(r=>r.allComparedFieldsMatch)&&isDeepStrictEqual(a.rules.map(r=>r.id),b.rules.map(r=>r.id))&&isDeepStrictEqual(a.capacity,b.capacity)&&b.rules.every(r=>r.enabled===true),limits:['Compares authenticated UI-transcribed displayed fields, not hidden ruleset metadata or a per-edge execution log.','Matching saved control-plane definitions cannot establish which configuration a historical edge request evaluated.']};
await writeFile(resolve(outputRoot,'cloudflare/seven-rule-comparison.json'),JSON.stringify(comparison,null,2));
console.log(JSON.stringify({sourceIntegrity:integrity.summary,sourceIntegrityPassed:integrity.allPassed,originalR4FailureCaptureAndHtmlUnchanged:failureEvidence.captureMatchesAnchoredHash&&failureEvidence.htmlMatchesRecordedHash,conflictChecksPassed:conflict.checksPassed,sevenRuleComparisonPassed:comparison.allPassed,allSevenEnabled:comparison.allEnabled,ruleFieldsCompared:fields.length*rules.length,noNetworkRequests:true},null,2));
if(!integrity.allPassed||!comparison.allPassed||conflict.checksPassed!==799)process.exitCode=1;
