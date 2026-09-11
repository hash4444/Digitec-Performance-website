import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const dir='outputs/suspension-2026-09-10';
const release=`${dir}/release-checkout`;
const before=JSON.parse(await readFile(`${dir}/before-local.json`,'utf8'));
const retained=[];
for(const route of ['/ar/services/suspension-repair-dubai','/services/steering-repair-dubai','/services/oil-change-dubai','/services/car-service-dubai']){
  const old=await readFile(`${dir}/${before[route].file}`,'utf8');
  const current=await readFile(`${release}/dist${route}/index.html`,'utf8');
  const bodyText=h=>(h.match(/<body\b[^>]*>([\s\S]*?)<\/body>/)?.[1]||'').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  assert.ok(bodyText(old).length>500,route);
  assert.equal(bodyText(current),bodyText(old),`Retained content: ${route}`);
  assert.equal(current.match(/<title>(.*?)<\/title>/s)?.[1],old.match(/<title>(.*?)<\/title>/s)?.[1]);
  retained.push(route);
}
const app=await readFile(`${release}/src/App.tsx`,'utf8');
assert.ok(!app.includes('TransmissionPage'));
const build=JSON.parse(await readFile(`${release}/release-qa.local/build-results.json`,'utf8'));
assert.equal(build.passed,true);
const checks=JSON.parse(await readFile(`${release}/docs/seo/suspension-validation.json`,'utf8'));
const result={checkedAt:new Date().toISOString(),passed:true,unchangedMainContentAndTitles:retained,unrelatedTransmissionEditsExcluded:true,build,checks};
await writeFile(`${dir}/release-checks.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify({passed:true,retained,buildFingerprint:build.sourceSha256,steps:build.steps.length}));
