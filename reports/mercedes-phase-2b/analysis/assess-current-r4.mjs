// Offline synthesis of completed read-only Phase 2B evidence. No network or UI.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, relative } from 'node:path';
const here=fileURLToPath(new URL('./',import.meta.url));
const phase2b=fileURLToPath(new URL('../',import.meta.url));
const workspace=fileURLToPath(new URL('../../../',import.meta.url));
const paths={historical:resolve(here,'phase2a-failure-analysis.json'),matrix:resolve(phase2b,'http/post-2026-10-26T07-35-12-026Z/capture.json'),inventory:resolve(phase2b,'cloudflare/current-inventory.json'),phase2aInventory:resolve(workspace,'reports/mercedes-phase-2/deployment-2026-10-26/cloudflare/after-inventory.json'),repeats:resolve(phase2b,'repeats/repeat-2026-10-26T07-35-52-836Z/capture.json')};
const raw=Object.fromEntries(await Promise.all(Object.entries(paths).map(async([k,p])=>[k,await readFile(p,'utf8')])));
const parsed=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,JSON.parse(v)]));
const {historical,matrix,inventory,phase2aInventory,repeats}=parsed;
if(matrix.syntheticOnly || matrix.summary.failed!==0 || matrix.summary.cases!==326 || repeats.requests.length!==12 || repeats.summary.failed!==0 || !repeats.finishedAtUtc) throw new Error('Completed passing real matrix and twelve repeats required.');
const canonicalJson=value=>JSON.stringify(value,(_,v)=>v && !Array.isArray(v) && typeof v==='object' ? Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))) : v);
const stableRule=r=>({id:r.id,order:r.order,description:r.description,enabled:r.enabled,expression:r.expression,action:r.action,action_parameters:r.action_parameters});
const ruleComparisons=inventory.rules.map(r=>({id:r.id,order:r.order,unchanged:canonicalJson(stableRule(r))===canonicalJson(stableRule(phase2aInventory.rules.find(p=>p.id===r.id)))}));
if(ruleComparisons.length!==7 || ruleComparisons.some(r=>!r.unchanged)) throw new Error('Fresh inventory differs from Phase 2A.');
const source=historical.failure.url,target='https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai';
const point=c=>({key:c.key,method:c.method,url:c.url,requestStartedAtUtc:c.chain[0].at,firstStatus:c.chain[0].status,location:c.chain[0].headers.location||null,cfRay:c.chain[0].headers['cf-ray']||null,cfRayColoSuffix:c.chain[0].headers['cf-ray']?.split('-').at(-1)||null,chainResponses:c.chain.length,finalStatus:c.chain.at(-1).status,finalUrl:c.chain.at(-1).url,finalCanonical:c.chain.at(-1).canonical||[],loop:c.loop||false});
const exact=matrix.cases.find(c=>c.method==='GET'&&c.url===source);
const exactPoint=point(exact);
const matrixSource=matrix.cases.filter(c=>c.group==='source');
const matrixR4=matrixSource.filter(c=>c.rule==='ar-mechanical-repair');
const directPass=c=>c.chain[0].status===308&&c.chain[0].headers.location===c.expectedTarget&&c.chain.length===2&&c.chain.at(-1).status===200&&c.chain.at(-1).url===c.expectedTarget&&!c.loop;
const repeatRows=repeats.requests.map(r=>({sequence:r.sequence,transport:r.transport,requestStartedAtUtc:r.sourceResponse.startedAtUtc,sourceStatus:r.sourceResponse.status,location:r.sourceResponse.location,cfRay:r.sourceResponse.cfRay,cfRayColoSuffix:r.sourceResponse.cloudflareColo,targetStatus:r.targetResponse?.status,targetCanonical:r.targetResponse?.canonical,passed:r.passed}));
const sourceHashes=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,{path:relative(workspace,paths[k]).replaceAll('\\','/'),sha256:createHash('sha256').update(v).digest('hex')}]));
const assessment={
  generatedAtUtc:new Date().toISOString(),readOnly:true,sourceHashes,
  conclusion:'R4 currently passes the full sampled matrix and twelve exact-condition repeats without a configuration change. The historical miss remains real and unexplained. Evidence is consistent with a transient routing/configuration-consistency event, but propagation is not proven.',
  noProductionActionByThisAnalysis:true,
  freshMatrix:{startedAt:matrix.startedAt,finishedAt:matrix.finishedAt,summary:matrix.summary,sourceCases:matrixSource.length,sourceDirectPasses:matrixSource.filter(directPass).length,r4SourceCases:matrixR4.length,r4DirectPasses:matrixR4.filter(directPass).length,r4SourceColos:[...new Set(matrixR4.map(c=>point(c).cfRayColoSuffix))],r4AmsCases:matrixR4.filter(c=>point(c).cfRayColoSuffix==='AMS').length,r4AmsDirectPasses:matrixR4.filter(c=>point(c).cfRayColoSuffix==='AMS'&&directPass(c)).length},
  exactFailedConditionFreshMatrix:exactPoint,
  secondsBetweenHistoricalFailedRequestAndFreshMatrixExactPass:(Date.parse(exactPoint.requestStartedAtUtc)-Date.parse(historical.failure.requestStartedAtUtc))/1000,
  freshExactRepeats:{startedAtUtc:repeats.startedAtUtc,finishedAtUtc:repeats.finishedAtUtc,summary:repeats.summary,noCacheHeadersSent:repeats.requestCacheHeaders.length===0,noQueryAdded:repeats.source===source,rows:repeatRows},
  currentConfiguration:{observedAt:inventory.observedAt,allSevenDefinitionsIdsOrderEnabledUnchanged:ruleComparisons.every(r=>r.unchanged),ruleComparisons,limits:inventory.limits},
  causeAssessments:[
    {candidate:'Transient post-activation routing/configuration inconsistency',status:'Consistent with observed timing and non-reproduction, not confirmed',reason:'Historical miss was 25.013s after enabled first observation; current unchanged rule passes exact tuple from AMS and other reported colos. No per-request historical configuration version/trace exists.'},
    {candidate:'Cloudflare cached homepage HIT',status:'Not supported',reason:'Historical response was DYNAMIC with no Age and a no-cache/must-revalidate policy; current repeats used no cache purge, cache header or cache-busting query.'},
    {candidate:'Persistent R4 expression/destination/order defect',status:'No current evidence supports an edit',reason:'Current literal expression matches the failed tuple, readback matches Phase 2A, all 48 R4 variants and exact repeats pass.'},
    {candidate:'www canonicalization conflict',status:'Not supported for the failed apex GET',reason:'Apex does not match www; R4 precedes www and fresh www variants redirect directly.'},
    {candidate:'URI normalization mismatch',status:'No observed mismatch',reason:'Exact ASCII tuple matches R4 path literal; fresh identical tuple passes. Neither UI inventory nor HTTP headers exposes the historical evaluated path.'},
    {candidate:'Homepage fallback returned after missing the redirect',status:'Historical content confirmed, initiating cause unresolved',reason:'Historical canonical/title/main-text matches baseline homepage fallback. No direct origin log or trace proves the bypass layer.'}
  ],
  recommendation:{action:'Retain the current enabled R4 configuration; no edit, purge, movement or rollback is supported by these passing current observations.',authority:'Analytical recommendation only; no production mutation performed or authorized by this analysis.',rationale:'All sampled current redirect/target checks pass; displayed rule matches approved scope and protected rules. Disabling R4 would restore known legacy homepage fallback, while a speculative edit would add risk without an identified defect.',nextIfRecurrence:'Retain the failed method/URL/time/CF-Ray, headers and body, stop consequential changes, and seek Cloudflare request-specific trace/support evidence plus explicit approval before any proposed fix or rollback.'},
  limits:['One runtime/network. CF-Ray suffix diversity does not establish independent UAE/mobile/global coverage or the same edge instance.','Exact Cloudflare server activation time, per-edge configuration version, historical request rule trace and direct origin logs are unavailable.','Connection: close was an explicit request header; no actual socket/TLS lifecycle or route independence was measured.','Repeated passes do not erase the original failure or prove non-recurrence.','No fresh Google crawl, indexing, canonical-selection, ranking or traffic recovery evidence is part of Phase 2B.'],
  documentation:historical.documentation
};
await writeFile(resolve(here,'current-r4-assessment.json'),JSON.stringify(assessment,null,2)+'\n');
console.log(JSON.stringify({output:relative(workspace,resolve(here,'current-r4-assessment.json')),currentExactPoint:exactPoint,summary:assessment.freshMatrix,repeatSummary:repeats.summary,configurationUnchanged:assessment.currentConfiguration.allSevenDefinitionsIdsOrderEnabledUnchanged}));
