import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { handleRequest } from '../cloudflare/production-seo-router.js';
import { aliases } from '../cloudflare/mercedes-seo-router.js';
import { validPaths, legacyPaths, localizedFallbacks } from '../cloudflare/routing-response-data.js';

const root = process.cwd();
const output = path.join(root, 'outputs/b0-a');
const normalize = value => value.replace(/\/{2,}/g, '/').toLowerCase().replace(/\/+$/, '') || '/';
const generic = await readFile('cloudflare/digitec-seo-router.js', 'utf8');
const existingRedirects = new Map(JSON.parse(generic.match(/const PERMANENT_REDIRECTS = new Map\((\[.*\])\);/)[1]));
// Reconstruct the existing static origin, including its erroneous SPA fallback.
// The production entry point, not the unrelated generic Worker, is under test.
export async function originFetch(request) {
  const url = new URL(request.url);
  const pathname = normalize(url.pathname);
  const target = existingRedirects.get(pathname);
  if (target && !/[:*]/.test(pathname)) return Response.redirect(`https://digitecme.com${target}${url.search}`, 308);
  let filename = path.join(root, 'dist', url.pathname.replace(/^\/+/, ''));
  if (!path.extname(filename)) filename = path.join(filename, 'index.html');
  let body;
  try { body = await readFile(filename); } catch { body = await readFile(path.join(root, 'dist/index.html')); filename = 'index.html'; }
  const contentType = ({ '.html':'text/html; charset=utf-8', '.xml':'application/xml', '.txt':'text/plain', '.js':'application/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.webp':'image/webp', '.ico':'image/x-icon', '.woff2':'font/woff2' })[path.extname(filename)] || 'application/octet-stream';
  return new Response(request.method === 'HEAD' ? null : body, { status:200, headers:{'content-type':contentType} });
}
export async function inspect(route, method='GET') {
  let url = `https://digitecme.com${route}`;
  const chain=[];
  let response;
  for (let i=0;i<5;i++) {
    response=await handleRequest(new Request(url,{method}),originFetch);
    if (response.status<300 || response.status>=400) break;
    chain.push({status:response.status,url,location:response.headers.get('location')});
    url=response.headers.get('location');
  }
  const html=await response.text();
  return {path:route,status:response.status,chain,final_url:url,headers:Object.fromEntries(response.headers),html};
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve('scripts/test-routing-response.mjs')) {
  await mkdir(output,{recursive:true});
  const negative = ['/', '/services/', '/brands/', '/blog/', '/mercedes/', '/porsche/', '/ar/', '/ar/services/', '/ar/brands/', '/ar/porsche/systems/', '/ar/porsche/problems/', '/ar/porsche/guides/', '/ar/mercedes/problems/', '/ar/mercedes/models/', '/ar/ferrari/case-studies/'].flatMap((prefix,i)=>[`${prefix}b0a-missing-${i}-20260928`,`${prefix}b0a-never-published-${i}-20260928`]);
  negative.push('/porsche/911','/seo-audit-nonexistent-20260928','/services/this-page-does-not-exist-20260928','/ar/this-page-does-not-exist-20260928','/missing-b0a.html','/assets/missing-b0a.js','/feed/this-is-not-a-feed');
  const { renderRoute } = await import('../dist-server/entry-server.js');
  const negativeResults=[];
  for (const route of negative) {
    const result=await inspect(route);
    assert.equal(result.status,404,route);assert.equal(result.chain.length,0,route);
    assert.match(result.html,/<h1[^>]*>404<\/h1>/);
    assert.match(result.html,/noindex, follow/);
    assert.doesNotMatch(result.html,/rel="canonical"|application\/ld\+json|DIGI-TECPerformance Center/);
    const head=await inspect(route,'HEAD');assert.equal(head.status,404);assert.equal(head.html,'');
    const rendered=await renderRoute(route);assert.match(rendered.html,/<h1[^>]*>404<\/h1>/,route);assert.equal(rendered.seo.noindex,true);assert.equal(rendered.seo.canonical,undefined);assert.equal(rendered.seo.jsonLd,undefined);
    negativeResults.push(result);
  }
  const validResults=[];
  for(const route of validPaths){const result=await inspect(route);assert.equal(result.status,200,route);assert.equal(result.chain.length,0,route);validResults.push(result);}
  const localizedResults=[];
  for(const [source,target] of localizedFallbacks){const result=await inspect(source+'?utm_source=b0a&gclid=test');assert.equal(result.chain.length,1,source);assert.equal(result.chain[0].status,308);assert.equal(result.final_url,`https://digitecme.com${target}?utm_source=b0a&gclid=test`);assert.equal(result.status,200);localizedResults.push(result);}
  const aliasResults=[];
  for(const [source,target] of aliases){const result=await inspect(source);assert.equal(result.chain[0]?.location,`https://digitecme.com${target}`,source);assert.equal(result.status,200,source);aliasResults.push(result);}
  // Unknown origin redirects, failures, non-HTML assets, methods and API endpoints survive.
  for(const [route,method,status,type] of [['/external-legacy','GET',301,'text/html'],['/origin-error','GET',503,'text/html'],['/asset.svg','GET',200,'image/svg+xml'],['/api/check','GET',200,'application/json'],['/functions/check','POST',201,'application/json'],['/whatever','POST',200,'text/html']]) {
    const result=await handleRequest(new Request('https://digitecme.com'+route,{method}),async()=>new Response('preserved',{status,headers:{'content-type':type,...(status===301?{location:'https://digitecme.com/about'}:{})}}));assert.equal(result.status,status);assert.equal(await result.text(),'preserved');
  }
  const {handleRequest:before}=await import('../outputs/b0-a/baseline/cloudflare/production-seo-router.js');
  for(const route of legacyPaths){if(localizedFallbacks.some(([source])=>source===route))continue; const request=new Request('https://digitecme.com'+route);const a=await before(request,originFetch);const b=await handleRequest(request,originFetch);assert.equal(a.status,b.status,route);assert.equal(a.headers.get('location'),b.headers.get('location'),route);}
  for(const [name,result] of Object.entries({negative:negativeResults,valid:validResults,localized:localizedResults,aliases:aliasResults}))await writeFile(path.join(output,`after-${name}.json.gz`),gzipSync(JSON.stringify(result)));
  const summary={passed:true,validPages:validResults.length,negativeGetAndHead:negativeResults.length,localizedRedirects:localizedResults.length,mercedesAliases:aliasResults.length,preservedLegacyPaths:legacyPaths.length,originPassthroughCases:6};
  await writeFile(path.join(output,'routing-tests.json'),JSON.stringify(summary,null,2));console.log(summary);
}
