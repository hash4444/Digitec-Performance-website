// Offline validation of blank artifacts, schema structure and local references.
// Uses existing repository dependencies; no installation or network request.
import { readFile,writeFile,readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=new URL('../../../',import.meta.url);
const out=new URL('./',import.meta.url);
const require=createRequire(new URL('package.json',root));
const Ajv2020=require('./node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/2020.js').default;
const addFormats=require('./node_modules/.pnpm/ajv-formats@3.0.1_ajv@8.20.0/node_modules/ajv-formats');
const ajv=new Ajv2020({allErrors:true,strict:false});
addFormats(ajv);
const read=async name=>JSON.parse(await readFile(new URL(name,out),'utf8'));
const dashboard=await read('dashboard-template.json');
const dashboardSchema=await read('dashboard.schema.json');
const sourceSchema=await read('measurement-record.schema.json');
const dashboardValidate=ajv.compile(dashboardSchema);
const templatePassed=dashboardValidate(dashboard);
ajv.compile(sourceSchema);
const windows=dashboard.windows.map(w=>w.days);
const uniqueMetricIds=dashboard.windows.every(w=>new Set(w.metrics.map(m=>m.metric_id)).size===w.metrics.length);
const allMetricsBlank=dashboard.windows.every(w=>w.metrics.every(m=>['current','previous','absolute_delta','relative_delta'].every(k=>m[k]===null)&&m.availability==='not_collected'));
const sourceTemplate=await read('source-record-template.json');
const sourceRecordsEmpty=sourceTemplate.records.length===0;
const schemaRejectsAdditionalFields=Object.values(sourceSchema.$defs).every(s=>s.additionalProperties===false);
const broken=[];
for(const dir of [fileURLToPath(out),fileURLToPath(new URL('../proposals/hub/',out))])for(const name of await readdir(dir))if(name.endsWith('.md')){
 const path=resolve(dir,name),content=await readFile(path,'utf8');
 for(const [,target] of content.matchAll(/\]\(([^)]+)\)/g))if(!/^[a-zA-Z][a-zA-Z0-9+.-]*:|^#/.test(target)&&!existsSync(resolve(dirname(path),target.split('#')[0])))broken.push({path,target});
}
const result={validatedAtUtc:new Date().toISOString(),offlineOnly:true,networkRequests:0,schemasCompiledDraft:'2020-12',dashboardTemplateSchemaPassed:templatePassed,errors:dashboardValidate.errors,windows,uniqueMetricIds,allMetricsBlank,sourceRecordsEmpty,schemaRejectsAdditionalFields,localMarkdownLinksBroken:broken,metricCountPerWindow:dashboard.windows.map(w=>w.metrics.length),limitations:['Schemas validate artifact structure, not whether future exports are complete or business attribution is correct.','No GA4/GTM/CRM/finance access or collected event counts were validated.']};
result.passed=templatePassed&&JSON.stringify(windows)==='[7,28,90]'&&uniqueMetricIds&&allMetricsBlank&&sourceRecordsEmpty&&schemaRejectsAdditionalFields&&!broken.length;
await writeFile(new URL('validation.json',out),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
process.exitCode=result.passed?0:1;
