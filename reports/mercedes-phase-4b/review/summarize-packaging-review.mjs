// Offline readiness assertions; no build, network request, or publication.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,relative} from 'node:path';
const project=resolve('.'),out=resolve('reports/mercedes-phase-4b/review');
const sha=b=>createHash('sha256').update(b).digest('hex');
const cfile=resolve('reports/mercedes-phase-4b/production/production-comparison.json');
const bytes=await readFile(cfile),c=JSON.parse(bytes);
const selected=c.localComparisons.filter(x=>x.selectedCohort),checks=[];
const add=(name,pass,details)=>checks.push({name,pass,details});
add('Three selected cohort artifacts recorded',selected.length===3,selected.map(x=>x.name));
for(const build of selected){
 add(build.name+': normal 19-step build passed',build.buildProvenance?.passed&&build.buildProvenance.steps===19,build.buildProvenance);
 const typeFile=resolve(build.buildProvenance.path.replace('production-build.json','typecheck.json'));
 const tb=await readFile(typeFile),t=JSON.parse(tb);
 add(build.name+': both TypeScript configurations passed',t.passed&&t.checks.length===2&&t.checks.every(x=>x.exitCode===0),{file:relative(project,typeFile).replaceAll('\\','/'),sha256:sha(tb),...t});
 add(build.name+': frozen pnpm lock unchanged',build.frozenLock.sha256==='5764ae30d5b03c0bfbf425768df32c23646b88720d2062988c6b04b868dd085f',build.frozenLock);
 add(build.name+': 1005 URL set and order preserved',build.sitemap.urlCount===1005&&build.sitemap.uniqueUrlCount===1005&&build.sitemap.sameUrlSet&&build.sitemap.sameUrlOrder,{file:build.sitemap.file,sha256:build.sitemap.sha256,dateDifferencesFromPublic:build.sitemap.dateDifferencesFromPublic});
 add(build.name+': all manifest files and imports exist',build.manifest.missingReferences.length===0,{checked:build.manifest.referenceChecks,missing:build.manifest.missingReferences});
 add(build.name+': checked route/error document asset references exist',build.pageComparisons.every(p=>p.assetChecks&&p.assetChecks.every(a=>a.exists)),{pages:build.pageComparisons.length,assetReferences:build.pageComparisons.reduce((n,p)=>n+(p.assetChecks?.length||0),0)});
 add(build.name+': eight relevant page metadata fields preserved',build.pageComparisons.filter(p=>/^(hub|body|diagnostics|mechanical)-(en|ar)$/.test(p.key)).every(p=>p.differentMetadataFields.length===0),build.pageComparisons.filter(p=>/^(hub|body|diagnostics|mechanical)-(en|ar)$/.test(p.key)).map(p=>({key:p.key,differentMetadataFields:p.differentMetadataFields,sameMainText:p.sameMainText,sameMainLinks:p.sameMainLinks})));
}
const baseline=selected.find(x=>x.name==='production-matched-baseline'),a=selected.find(x=>x.name==='production-matched-candidate'),b=selected.find(x=>x.name==='production-matched-release-b');
add('Selected baseline main text equals public on eight relevant pages',baseline.pageComparisons.filter(p=>/^(hub|body|diagnostics|mechanical)-(en|ar)$/.test(p.key)).every(p=>p.sameMainText),null);
for(const build of [a,b])add(build.name+': only two relevant English page main texts change',JSON.stringify(build.pageComparisons.filter(p=>/^(hub|body|diagnostics|mechanical)-(en|ar)$/.test(p.key)&&!p.sameMainText).map(p=>p.key).sort())===JSON.stringify(['body-en','hub-en']),null);
add('Option A sitemap dates equal current public',a.sitemap.dateDifferencesFromPublic.length===0,null);
add('Option B changes only the two intended English revision dates',JSON.stringify(b.sitemap.dateDifferencesFromPublic.map(r=>({url:r.url,publicDate:r.publicDate,localDate:r.localDate})))===JSON.stringify([{url:'https://digitecme.com/brands/mercedes-benz-service-dubai',publicDate:'2026-10-20',localDate:'2026-10-26'},{url:'https://digitecme.com/services/mercedes-body-repair-dubai',publicDate:'2026-09-28',localDate:'2026-10-26'}]),b.sitemap.dateDifferencesFromPublic);
const result={preparedAtUtc:new Date().toISOString(),offlineOnly:true,comparisonFile:relative(project,cfile).replaceAll('\\','/'),comparisonSha256:sha(bytes),checks,passed:checks.every(c=>c.pass),recommendation:'Option B coherent complete application release after separate approval of the fourth source file and two actual revision dates. Option A complete application is technically coherent but retains previous dates. No selective compiled upload.',publicationAuthorizedByThisReview:false,publicationPerformed:false,newCloudflareRoutingAuthorized:false,newCloudflareRoutingPerformed:false,prohibitedSideEffects:['No Single Redirect edits or new rules','No Worker, Bulk Redirect or Pages advanced-mode activation','No origin migration or Sites mirror publication','No new 404/410 behavior or cache/indexing actions','No hand-edited compiled assets, mixed-build artifact, or manually copied old sitemap'],limits:['All-route semantic checks and final shared-checkout preservation guard are owned by the parent task.','Selected cohort name does not assert production byte identity; selected baseline manifest differs from public while relevant server-rendered content matches.','Hosted project metadata is relayed from the parent read-only tool; public HTTP does not attest account configuration.']};
await writeFile(resolve(out,'packaging-readiness.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({passed:result.passed,checks:checks.length,failed:checks.filter(x=>!x.pass)},null,2));
if(!result.passed)process.exitCode=1;
