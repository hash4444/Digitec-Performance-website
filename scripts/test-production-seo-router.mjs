import assert from 'node:assert/strict';
import { writeFile, mkdir } from 'node:fs/promises';
import { aliases, canonicalPaths } from '../cloudflare/mercedes-seo-router.js';
const { handleRequest } = await import(new URL(process.argv[2] || '../cloudflare/production-seo-router.js', import.meta.url));

const pairs = [...aliases, ['/services/tire-repair', '/services/tire-repair-dubai'], ['/ar/services/tire-repair', '/ar/services/tire-repair-dubai']];
const queries = ['', '?utm_source=google&gclid=qa-check&tag=a&tag=b&text=a%20b'];
let redirects = 0, passthroughs = 0, guardedRequests = 0, notFoundChecks = 0, originResponseChecks = 0;
const assertGuardedRequest = (forwarded, original) => {
  assert.notEqual(forwarded, original);
  assert.equal(forwarded.url, original.url);
  assert.equal(forwarded.method, original.method);
  assert.deepEqual([...forwarded.headers], [...original.headers]);
  assert.equal(forwarded.redirect, 'manual');
  guardedRequests++;
};
for (const [source, target] of pairs) {
  for (const host of ['https://digitecme.com', 'http://digitecme.com', 'https://www.digitecme.com', 'http://www.digitecme.com']) {
    for (const variant of [source, `${source}/`, source.toUpperCase().replaceAll('/', '//')]) {
      for (const method of ['GET', 'HEAD']) for (const query of queries) {
        const response = await handleRequest(new Request(`${host}${variant}${query}`, { method }), () => { throw new Error('Alias reached origin'); });
        assert.equal(response.status, 308);
        assert.equal(response.headers.get('location'), `https://digitecme.com${target}${query}`);
        redirects++;
      }
    }
  }
}
for (const route of [...canonicalPaths, '/services/tire-repair-dubai', '/ar/services/tire-repair-dubai', '/services/head-unit-repair-dubai', '/services/cadillac-cue-screen-repair-dubai', '/brands/bmw-service-dubai', '/unknown-page', '/functions/contact', '/assets/app.js']) {
  for (const method of ['GET', 'HEAD', 'POST']) {
    const request = new Request(`https://digitecme.com${route}?keep=1`, { method, headers: { 'X-Router-Test': 'preserve' } });
    let count = 0;
    const response = await handleRequest(request, r => {
      if (['GET', 'HEAD'].includes(method) && ['/unknown-page', '/assets/app.js'].includes(route)) assertGuardedRequest(r, request);
      else assert.equal(r, request);
      count++;
      return new Response('origin', {status:200});
    });
    assert.equal(count, 1); assert.equal(response.status, 200); passthroughs++;
  }
}
for (const url of ['https://unrelated.example/services/tire-repair', 'https://digitecme.com/services/tire-repair-extra', 'https://digitecme.com/services/mercedes-repair-dubai']) {
  const request = new Request(url, {method:'POST'});
  const response = await handleRequest(request, r => { assert.equal(r, request); return new Response('unchanged'); });
  assert.equal(await response.text(), 'unchanged'); passthroughs++;
}
for (const pathname of ['/unknown-page', '/ar/unknown-page']) {
  for (const method of ['GET', 'HEAD']) {
    const request = new Request(`https://digitecme.com${pathname}?tag=a&tag=b`, { method, headers: { 'X-Router-Test': 'preserve' } });
    let count = 0;
    const response = await handleRequest(request, r => {
      assertGuardedRequest(r, request); count++;
      return new Response('<!doctype html><title>SPA fallback</title>', {status:200, headers:{'Content-Type':'text/html; charset=utf-8'}});
    });
    assert.equal(count, 1);
    assert.equal(response.status, 404);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
    assert.equal(response.headers.get('content-language'), pathname.startsWith('/ar/') ? 'ar' : 'en');
    const html = await response.text();
    if (method === 'HEAD') assert.equal(html, '');
    else assert.match(html, new RegExp(`<html lang="${pathname.startsWith('/ar/') ? 'ar' : 'en'}"`));
    notFoundChecks++;
  }
}
for (const [pathname, contentType, content] of [['/assets/app.js', 'application/javascript', 'console.log("asset")'], ['/images/test-router.png', 'image/png', 'image']]) {
  const request = new Request(`https://digitecme.com${pathname}?keep=1`, {headers:{'X-Router-Test':'preserve'}});
  const origin = new Response(content, {status:200, headers:{'Content-Type':contentType}});
  let count = 0;
  const response = await handleRequest(request, r => { assertGuardedRequest(r, request); count++; return origin; });
  assert.equal(count, 1); assert.equal(response, origin);
  assert.equal(response.status, 200); assert.equal(response.headers.get('content-type'), contentType);
  assert.equal(await response.text(), content); originResponseChecks++;
}
for (const status of [302, 307, 503]) {
  const request = new Request('https://digitecme.com/unknown-origin-response?keep=1', {headers:{'X-Router-Test':'preserve'}});
  const location = 'https://digitecme.com/about?tag=a&tag=b';
  const origin = new Response('origin response', {status, headers:{'Content-Type':'text/html', ...(status < 400 ? {'Location':location} : {})}});
  let count = 0;
  const response = await handleRequest(request, r => { assertGuardedRequest(r, request); count++; return origin; });
  assert.equal(count, 1); assert.equal(response, origin); assert.equal(response.status, status);
  assert.equal(response.headers.get('location'), status < 400 ? location : null);
  assert.equal(await response.text(), 'origin response'); originResponseChecks++;
}
const mutation = new Request('https://digitecme.com/unknown-page?keep=1', {method:'POST', headers:{'Content-Type':'application/json'}, body:'{"unchanged":true}'});
let mutationCount = 0;
const mutationResponse = await handleRequest(mutation, async r => {
  assert.equal(r, mutation); mutationCount++;
  assert.equal(await r.text(), '{"unchanged":true}');
  return new Response('mutation unchanged', {status:202});
});
assert.equal(mutationCount, 1); assert.equal(mutationResponse.status, 202); passthroughs++;
const unrelated = new Request('https://unrelated.example/services/tire-repair?keep=1');
const unrelatedResponse = await handleRequest(unrelated, r => { assert.equal(r, unrelated); return new Response('unrelated unchanged', {status:202}); });
assert.equal(unrelatedResponse.status, 202); passthroughs++;
const outputDir = process.env.SEO_ROUTER_TEST_OUTPUT_DIR || 'outputs/production-qa-2026-09-16';
await mkdir(outputDir, {recursive:true});
const report = { testedAt:new Date().toISOString(), passed:true, redirects, passthroughs, guardedRequests, notFoundChecks, originResponseChecks, deployed:false, scope:`${pairs.length} aliases plus known Mercedes/tyre normalization; canonical, endpoint, unrelated-host and mutation identity; unknown GET/HEAD request preservation and manual origin fetch; HTML 404, HEAD body, assets and origin redirects/errors` };
await writeFile(`${outputDir}/${process.argv[2] ? 'scoped-router-bundle-tests' : 'scoped-router-tests'}.json`, JSON.stringify(report,null,2));
console.log(report);
