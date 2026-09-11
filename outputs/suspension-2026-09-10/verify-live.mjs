import {writeFile} from 'node:fs/promises';
const checks=[];
for(const route of ['/services/suspension-repair-dubai','/services/oil-change-dubai']){
  const response=await fetch(`https://digitecme.com${route}`,{headers:{'cache-control':'no-cache'},signal:AbortSignal.timeout(30000)});
  const html=await response.text();
  checks.push({route,status:response.status,title:html.match(/<title>(.*?)<\/title>/s)?.[1],dedicatedSuspensionPage:html.includes('class="susp-page"'),dedicatedOilPage:html.includes('class="oil-page"')});
}
const result={checkedAt:new Date().toISOString(),commit:'84a5a4aeca76b91ab017e399a7983dcba1404688',mainPush:'confirmed',lovableSync:'matching commit confirmed',publication:'Pending explicit approval; no production publish action taken for this release',checks};
await writeFile('outputs/suspension-2026-09-10/release-status.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
