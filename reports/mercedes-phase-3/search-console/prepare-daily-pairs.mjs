// Offline plan only: actual observed 90d exact-query Pages pairs, no metrics invented.
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('./',import.meta.url));
const validation=JSON.parse(await readFile(resolve(root,'paired-ui-validation.json'),'utf8'));
const queries=['mercedes service dubai','mercedes repair dubai','mercedes specialist dubai','mercedes workshop dubai','mercedes maintenance dubai','mercedes oil change dubai'];
const pairs=[],cohorts=[];
for(const query of queries){
 const all=validation.cells.find(c=>c.query===query&&c.country==='ARE'&&c.device==='ALL'&&c.window.id==='90d');
 const usable=all?.status==='VALIDATED_VISIBLE_ROWS'?[all]:validation.cells.filter(c=>c.query===query&&c.country==='ARE'&&['MOBILE','DESKTOP'].includes(c.device)&&c.window.id==='90d'&&c.status==='VALIDATED_VISIBLE_ROWS');
 const observed=[...new Set(usable.flatMap(c=>c.rows.map(r=>r.page)))];
 pairs.push(...observed.map(page=>({query,page,country:'ARE',device:'ALL'})));
 const fallback=all?.status!=='VALIDATED_VISIBLE_ROWS';
 cohorts.push({query,plannedPairs:observed.length,sourceMode:fallback?'VALIDATED_DEVICE_UNION_FALLBACK':'VALIDATED_UAE_ALL_90D',sourceDevices:usable.map(c=>c.device),sourceAttemptIds:usable.map(c=>c.selectedAttemptId),allDeviceCaptureValid:!fallback,requiresRetry:fallback,deviceUnionComplete:!fallback||usable.some(c=>c.device==='MOBILE')&&usable.some(c=>c.device==='DESKTOP'),note:fallback?'Observed pairs only; missing ALL/DESKTOP/Tablet evidence can hide additional pairs. Daily capture requests ALL devices but this plan is not an ALL-device metric observation.':'Each pair comes from an actual exact-query+UAE+ALL-device90dPages row.'});
}
await writeFile(resolve(root,'daily-pair-capture-plan.json'),JSON.stringify(pairs,null,2)+'\n');
await writeFile(resolve(root,'daily-pair-capture-plan-evidence.json'),JSON.stringify({generatedAtUtc:new Date().toISOString(),planOnly:true,pairedInputSha256:validation.inputSha256,windowStart:'20260727',windowEnd:'20261024',dateGranularity:'DAILY',totalPairs:pairs.length,cohorts,limits:['Pairs identify requested exact Query+Exact Page+UAE+ALL-device daily captures, not new measured data.','A device-union fallback may omit tablet-only or uncollected-device pairs; retry ALL device capture to complete inventory.','Keep exact URL slash/host forms and query operator; do not merge canonical variants before source analysis.']},null,2)+'\n');
console.log(JSON.stringify({totalPairs:pairs.length,cohorts}));
