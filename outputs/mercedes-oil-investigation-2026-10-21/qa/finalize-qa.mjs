import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const qaRoot=path.resolve('outputs/mercedes-oil-investigation-2026-10-21/qa');
const root=path.join(qaRoot,'build');
const report=JSON.parse(await readFile(path.join(qaRoot,'qa-results.json'),'utf8'));
const productionSteps=report.steps.filter(s=>s.log.includes('production-'));
const sourceSha256=createHash('sha256').update(await readFile(path.join(qaRoot,'shared-source-before.json'))).digest('hex');
await mkdir(path.join(root,'release-qa.local'),{recursive:true});
await writeFile(path.join(root,'release-qa.local/build-results.json'),JSON.stringify({passed:productionSteps.every(s=>s.exitCode===0),sourceSha256,steps:productionSteps,method:'isolated investigation harness executes every declared package.json production command; this summary is generated from actual results'},null,2));
report.initialIsolationSetupFailures=report.steps.filter(s=>s.exitCode!==0);
report.reruns=[];
for(const script of ['test-routing-response.mjs','validate-paint-care-cluster.mjs']) {
 const result=spawnSync(process.execPath,[`scripts/${script}`],{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024,windowsHide:true});
 const log=`logs/rerun-${script.replace('.mjs','')}.log`;
 await writeFile(path.join(qaRoot,log),`${result.stdout||''}\n${result.stderr||''}`);
 report.reruns.push({command:`node scripts/${script}`,exitCode:result.status,log});
 console.log(`${result.status===0?'PASS':'FAIL'} ${script}\n${(result.stdout||'').slice(-1500)}\n${(result.stderr||'').slice(0,2000)}`);
}
const {getPublicRoutes}=await import(pathToFileURL(path.join(root,'dist-server/entry-server.js')).href);
const routes=getPublicRoutes();
const sitemap=await readFile(path.join(root,'dist/sitemap.xml'),'utf8');
const paths=['/services/mercedes-oil-change-dubai','/services/oil-change-dubai','/blog/best-oil-change-dubai-mercedes','/brands/mercedes-benz-service-dubai'];
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
const plain=s=>decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const targeted=[];
for(const p of paths){
 const html=await readFile(path.join(root,'dist',p,'index.html'),'utf8');
 const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
 targeted.push({path:p,title:decode(html.match(/<title>(.*?)<\/title>/s)?.[1]||''),h1:[...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m=>plain(m[1])),canonical,robots:html.match(/name="robots" content="([^"]+)"/)?.[1],route:routes.find(r=>r.path===p),sitemapOccurrences:sitemap.split(`<loc>https://digitecme.com${p}</loc>`).length-1,mercedesOilServiceLinks:[...html.matchAll(/<a\b[^>]*href="(\/services\/mercedes-oil-change-dubai[^\"]*)"[^>]*>(.*?)<\/a>/gs)].map(m=>({href:m[1],anchor:plain(m[2])}))});
}
await writeFile(path.join(qaRoot,'targeted-fresh-build.json'),JSON.stringify(targeted,null,2));
report.productionPipelinePassed=productionSteps.every(s=>s.exitCode===0);
report.finalFailures=[...report.steps.filter(s=>s.exitCode!==0 && !report.reruns.some(r=>r.command===s.command)),...report.reruns.filter(s=>s.exitCode!==0)];
report.allRequiredAndAvailableChecksPassed=report.finalFailures.length===0;
await writeFile(path.join(qaRoot,'qa-results.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({productionPipelinePassed:report.productionPipelinePassed,sourcePreserved:report.sourcePreserved,finalFailures:report.finalFailures,targeted},null,2));
