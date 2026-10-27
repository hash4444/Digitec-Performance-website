import fs from 'node:fs';
import path from 'node:path';
const records=JSON.parse(fs.readFileSync('outputs/paint-seo-predeployment-2026-10-12/independent-seo-records.json','utf8'));
const strip=x=>x.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const schemas=x=>[...x.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>JSON.parse(m[1]));
const changes=[];
for(const r of records.current){const old=fs.readFileSync(path.join('dist',r.route.slice(1),'index.html'),'utf8');const fresh=fs.readFileSync(path.join(records.dist,r.route.slice(1),'index.html'),'utf8');if(strip(old)!==strip(fresh)||JSON.stringify(schemas(old))!==JSON.stringify(schemas(fresh)))changes.push(r.route);}
const result={sourceFingerprint:'c5f55b95b6830a7371cd48d2782860a8884a213c5c838d97eff1618a74fa329d',reviewedDist:records.dist,assertionErrors:records.errors,textOrSchemaChangesVsEarlierDist:changes,routeCount:records.current.length};
fs.writeFileSync('outputs/paint-seo-predeployment-2026-10-12/fresh-seo-comparison.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
