import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {getPublicRoutes} from '../../../dist-server/entry-server.js';
const base='outputs/sitewide-seo-2026-09-17';
const json=async file=>JSON.parse(await readFile(file,'utf8'));
const [beforeRows,afterRows,registered,publicXml,builtXml]=await Promise.all([
  json(`${base}/audit/baseline-local-records.json`),json(`${base}/audit/final-local-records.json`),json(`${base}/changed-content-paths.json`),readFile('public/sitemap.xml','utf8'),readFile('dist/sitemap.xml','utf8')
]);
const before=new Map(beforeRows.map(r=>[r.path,r]));
const designChanges=new Set(['/','/ar','/vrx','/ar/vrx']);
const changed=afterRows.filter(row=>{
  const old=before.get(row.path);
  return !old||row.contentSha256!==old.contentSha256||row.title!==old.title||JSON.stringify(row.descriptions)!==JSON.stringify(old.descriptions)||designChanges.has(row.path);
}).map(r=>r.path).sort();
const routes=new Map(getPublicRoutes().map(r=>[r.path,r]));
const sitemap=new Map([...builtXml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)].map(m=>[new URL(m[1]).pathname,m[2]]));
const changedCanonical=changed.filter(p=>routes.get(p)?.indexable);
const wrongRouteDates=changed.filter(p=>routes.get(p)?.lastmod!=='2026-09-17').map(p=>({path:p,lastmod:routes.get(p)?.lastmod}));
const wrongSitemapDates=changedCanonical.filter(p=>sitemap.get(p)!=='2026-09-17').map(p=>({path:p,lastmod:sitemap.get(p)}));
const missingRegistered=changed.filter(p=>!registered.includes(p)),unexpectedRegistered=registered.filter(p=>!changed.includes(p));
const report={checkedAt:new Date().toISOString(),changedPublicRoutes:changed.length,changedCanonicalRoutes:changedCanonical.length,registeredRoutes:registered.length,canonicalSitemapUrls:sitemap.size,publicAndBuiltSitemapsMatch:publicXml===builtXml,wrongRouteDates,wrongSitemapDates,missingRegistered,unexpectedRegistered,previouslyMissedPaths:['/ar/blog/mercedes-repair-dubai-complete-guide','/ar/blog/mercedes-service-intervals-dubai-heat','/blog'].map(path=>({path,registered:registered.includes(path),sitemapLastmod:sitemap.get(path)})),passed:wrongRouteDates.length===0&&wrongSitemapDates.length===0&&missingRegistered.length===0&&unexpectedRegistered.length===0&&publicXml===builtXml};
await writeFile(`${base}/audit/final-lastmod-verification.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
assert.equal(report.passed,true,'Truthful modification-date coverage mismatch');
