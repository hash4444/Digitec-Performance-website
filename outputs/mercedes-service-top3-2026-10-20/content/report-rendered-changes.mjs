import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const out=path.resolve('outputs/mercedes-service-top3-2026-10-20');
const before=path.resolve('outputs/ecu-electronics-2026-10-19/candidate.local/dist');
const after=path.join(out,'candidate.local/dist');
const nodes=html=>[...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']??[j];});
const records=[];
for(const route of ['/brands/mercedes-benz-service-dubai','/ar/brands/mercedes-benz-service-dubai']){
 const [old,current]=await Promise.all([fs.readFile(path.join(before,route,'index.html'),'utf8'),fs.readFile(path.join(after,route,'index.html'),'utf8')]);
 const oldNodes=nodes(old),newNodes=nodes(current);
 const ids=ns=>ns.filter(n=>n['@id']).map(n=>n['@id']).sort();
 const svc=ns=>ns.find(n=>n['@type']==='Service');
 const faq=ns=>ns.find(n=>n['@type']==='FAQPage');
 const sameIds=JSON.stringify(ids(oldNodes))===JSON.stringify(ids(newNodes));
 const sameProvider=JSON.stringify(svc(oldNodes)?.provider)===JSON.stringify(svc(newNodes)?.provider);
 const canonical=html=>(html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)||[])[1];
 records.push({route,canonicalBefore:canonical(old),canonicalAfter:canonical(current),sameEntityIds:sameIds,providerBefore:svc(oldNodes)?.provider,providerAfter:svc(newNodes)?.provider,sameProvider,entityIds:ids(newNodes),beforeFaqCount:faq(oldNodes)?.mainEntity?.length,afterFaqCount:faq(newNodes)?.mainEntity?.length,afterHtmlSha256:createHash('sha256').update(current).digest('hex')});
 if(!sameIds||!sameProvider||canonical(old)!==canonical(current))throw Error('Entity/canonical preservation failed '+route);
}
const report={checkedAt:new Date().toISOString(),passed:true,method:'Compare all parsed JSON-LD graph IDs, Service provider references and canonical URLs in before/after built hub HTML. See qa/metadata-before-after.json for the single authoritative before/after visible-text length comparison.',pages:records,newContextualIncomingLinks:{sourcePages:['/services','/ar/services'],destination:'/brands/mercedes-benz-service-dubai#mercedes-maintenance-scope',arabicDestination:'/ar/brands/mercedes-benz-service-dubai#mercedes-maintenance-scope',newPlacements:2},schemaChanges:'Existing Service/WebPage names and descriptions align to visible servicing focus; existing FAQPage uses six visible questions per locale. All graph IDs and Service provider references retained. No new schema type, rating, offer price or AI-specific entity.',sitemap:'Only the two hub and two service directory lastmod values set to2026-10-20; all route and indexing policies retained.'};
await fs.writeFile(path.join(out,'content/CONSOLIDATION-LINK-AND-SCHEMA-REPORT.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
