import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {handleRequest} from './mercedes-oil-exact-redirects.js';
let redirectCases=0,passthroughCases=0;
const sources=['/brands/mercedes-benz-service-dubai/oil-change','/brands/mercedes-benz-service-dubai/oil-change/','/services/mercedes-oil-change-dubai/'];
for(const host of ['https://digitecme.com','http://digitecme.com','https://www.digitecme.com','http://www.digitecme.com']) for(const source of sources) for(const method of ['GET','HEAD']) for(const query of ['','?utm_source=google&gclid=review-only&tag=a&tag=b&text=a%20b']) {
  const response=await handleRequest(new Request(host+source+query,{method}),()=>{throw Error('Exact redirect reached origin')});
  assert.equal(response.status,308);
  assert.equal(response.headers.get('location'),'https://digitecme.com/services/mercedes-oil-change-dubai'+query);
  redirectCases++;
}
for(const source of [...sources,'/services/mercedes-oil-change-dubai','/services/oil-change-dubai','/blog/best-oil-change-dubai-mercedes','/brands/mercedes-benz-service-dubai','/tuning','/services/paint-protection-film','/services/mercedes-diagnostics-dubai','/unknown-path']) for(const method of ['POST','PUT','PATCH','DELETE','OPTIONS']) {
  const request=new Request('https://digitecme.com'+source,{method});
  const response=await handleRequest(request,forwarded=>{assert.equal(forwarded,request);return new Response(null,{status:202});});
  assert.equal(response.status,202);passthroughCases++;
}
for(const url of ['https://another.example/services/mercedes-oil-change-dubai/','https://digitecme.com/services/mercedes-oil-change-dubai','https://digitecme.com/services/mercedes-oil-change-dubai/extra','https://digitecme.com/SERVICES/MERCEDES-OIL-CHANGE-DUBAI/','https://digitecme.com/services/oil-change-dubai/','https://digitecme.com/blog/best-oil-change-dubai-mercedes/','https://digitecme.com/brands/mercedes-benz-service-dubai/','https://digitecme.com/tuning','https://digitecme.com/services/paint-protection-film','https://digitecme.com/services/mercedes-diagnostics-dubai']) for(const method of ['GET','HEAD']) {
  const request=new Request(url+'?keep=a&keep=b',{method});const response=await handleRequest(request,forwarded=>{assert.equal(forwarded,request);return new Response(null,{status:202});});assert.equal(response.status,202);passthroughCases++;
}
const result={testedAt:new Date().toISOString(),passed:true,redirectCases,passthroughCases,assertions:redirectCases*2+passthroughCases*2,note:'Offline unit verification of this exact review copy only. Does not prove production activation or Google canonical selection.'};
await writeFile(new URL('./local-qa.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
