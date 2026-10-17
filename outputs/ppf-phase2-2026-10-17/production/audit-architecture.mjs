import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import path from 'node:path';
const out='outputs/ppf-phase2-2026-10-17/production';
const hash=s=>createHash('sha256').update(s).digest('hex');
const paths=['/ppf','/services/ppf','/paint-protection','/car-paint-protection','/services/paint-protection','/services/car-paint-protection'];
const sources=paths.flatMap(p=>[p,`/ar${p}`]);
const canonical=['/services/paint-protection-film','/ar/services/paint-protection-film','/services/paint-protection-dubai','/ar/services/paint-protection-dubai'];
const originalPath='outputs/ppf-phase2-2026-10-17/baseline/source/cloudflare/production-seo-router.js';
let originalSource=await readFile(originalPath,'utf8');
for(const file of ['mercedes-seo-router.js','routing-response-guard.js'])originalSource=originalSource.replace(`'./${file}'`,JSON.stringify(pathToFileURL(path.resolve('cloudflare',file)).href));
const before=await import('data:text/javascript;base64,'+Buffer.from(originalSource).toString('base64'));
const after=await import(pathToFileURL(path.resolve('cloudflare/production-seo-router.js')).href);
const generated=await import(pathToFileURL(path.resolve('dist/_worker.js')).href);
const fallback=async request=>new Response(request.method==='HEAD'?null:'<!doctype html><title>Homepage fallback</title><link rel="canonical" href="https://digitecme.com/">',{status:200,headers:{'content-type':'text/html'}});
const cases=[];
for(const route of [...sources.flatMap(p=>[p,p+'/']),...canonical.flatMap(p=>[p,p+'/'])]){
 const url='https://digitecme.com'+route+'?utm_source=google&tag=a&tag=b';
 const b=await before.handleRequest(new Request(url),fallback);
 const a=await after.handleRequest(new Request(url),fallback);
 const g=await generated.handleRequest(new Request(url),{ASSETS:{fetch:fallback}});
 cases.push({route,url,before:{status:b.status,location:b.headers.get('location')},after:{status:a.status,location:a.headers.get('location')},generated:{status:g.status,location:g.headers.get('location')}});
}
const readWorker=async file=>{const source=await readFile(file,'utf8');const match=source.match(/const PERMANENT_REDIRECTS = new Map\((\[.*\])\);/);const aliases=new Map(match?JSON.parse(match[1]):[]);return {file,sha256:hash(source),bytes:Buffer.byteLength(source),ppfAliases:sources.map(source=>({source,target:aliases.get(source)||null})),hasGuard:/brandedNotFound|guardResponse/.test(source)};};
const config=JSON.parse(await readFile('cloudflare/wrangler.production-seo.jsonc','utf8'));
const report={checkedAt:new Date().toISOString(),method:'Pure local Request/Response handlers using an injected 200 homepage origin. No HTTP/network requests, account access, deployment or configuration changes.',entrypointConfig:{name:config.name,main:config.main,routes:config.routes,workers_dev:config.workers_dev},beforeSource:originalPath,beforeAfterCases:cases,artifactComparison:await Promise.all(['cloudflare/digitec-seo-router.js','dist/_worker.js',out+'/_worker.js'].map(readWorker)),limits:'A downloadable Worker is an origin asset, not proof of edge execution. Public behaviors contradict the tested entrypoint handlers, but deployed version, route bindings, route precedence and account ownership require authenticated inspection.'};
await writeFile(out+'/architecture-comparison.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({entrypointConfig:report.entrypointConfig,aliases:sources.length,beforeAliasStatuses:[...new Set(cases.filter(c=>sources.some(s=>c.route===s||c.route===s+'/')).map(c=>c.before.status))],afterAliasStatuses:[...new Set(cases.filter(c=>sources.some(s=>c.route===s||c.route===s+'/')).map(c=>c.after.status))],artifacts:report.artifactComparison.map(x=>({file:x.file,sha256:x.sha256,ppfAliasCount:x.ppfAliases.filter(x=>x.target).length}))},null,2));
