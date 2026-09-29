import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';
const phase=process.argv[2]||'before';
const out=path.resolve('outputs/b1',`${phase}-rendered`);
await fs.mkdir(out,{recursive:true});
const {getPublicRoutes,renderRoute}=await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes=getPublicRoutes();
await fs.writeFile(`outputs/b1/${phase}-routes.json`,JSON.stringify(routes,null,2));
const summary=[];
for(const r of routes){
 const result=await renderRoute(r.path);const hash=createHash('sha256').update(result.html).digest('hex');
 const id=createHash('sha256').update(r.path).digest('hex').slice(0,16);
 await fs.writeFile(path.join(out,id+'.html.gz'),gzipSync(result.html));
 summary.push({path:r.path,seo:result.seo,htmlHash:hash,htmlFile:`${phase}-rendered/${id}.html.gz`});
}
await fs.writeFile(`outputs/b1/${phase}-pages.json`,JSON.stringify(summary,null,2));
console.log(`${phase}: saved ${summary.length} page renders and SEO objects`);
