import assert from 'node:assert/strict';
import { writeFile, mkdir } from 'node:fs/promises';
import { aliases, canonicalPaths } from '../cloudflare/mercedes-seo-router.js';
const { handleRequest } = await import(new URL(process.argv[2] || '../cloudflare/production-seo-router.js', import.meta.url));

const pairs = [...aliases, ['/services/tire-repair', '/services/tire-repair-dubai'], ['/ar/services/tire-repair', '/ar/services/tire-repair-dubai']];
const queries = ['', '?utm_source=google&gclid=qa-check&tag=a&tag=b&text=a%20b'];
let redirects = 0, passthroughs = 0;
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
    const request = new Request(`https://digitecme.com${route}?keep=1`, { method });
    let count = 0;
    const response = await handleRequest(request, r => { assert.equal(r, request); count++; return new Response('origin', {status:200}); });
    assert.equal(count, 1); assert.equal(response.status, 200); passthroughs++;
  }
}
for (const url of ['https://unrelated.example/services/tire-repair', 'https://digitecme.com/services/tire-repair-extra', 'https://digitecme.com/services/mercedes-repair-dubai']) {
  const request = new Request(url, {method:'POST'});
  const response = await handleRequest(request, r => { assert.equal(r, request); return new Response('unchanged'); });
  assert.equal(await response.text(), 'unchanged'); passthroughs++;
}
await mkdir('outputs/production-qa-2026-09-16', {recursive:true});
const report = { testedAt:new Date().toISOString(), passed:true, redirects, passthroughs, deployed:false, scope:'101 aliases plus normalization of known Mercedes and tyre canonical paths; other paths and mutations unchanged' };
await writeFile(`outputs/production-qa-2026-09-16/${process.argv[2] ? 'scoped-router-bundle-tests' : 'scoped-router-tests'}.json`, JSON.stringify(report,null,2));
console.log(report);
