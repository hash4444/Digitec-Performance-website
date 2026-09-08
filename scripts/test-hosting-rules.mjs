import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const workerFile = path.join(process.cwd(), 'dist', '_worker.js');
const { handleRequest } = await import(`${pathToFileURL(workerFile).href}?test=${Date.now()}`);

const assetFetch = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === '/404.html') {
    return new Response('<!doctype html><title>Page Not Found</title>', {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
  if (url.pathname === '/images/hero-bg.png') {
    return new Response('image', { status: 200, headers: { 'Content-Type': 'image/png' } });
  }
  if (url.pathname === '/BingSiteAuth.xml') {
    return new Response('<?xml version="1.0"?><users><user>verification-code</user></users>', {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
  if (url.pathname === '/sitemap.xml') {
    return new Response('<?xml version="1.0"?><urlset></urlset>', {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
  return new Response('<!doctype html><title>Origin</title>', {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
const env = { ASSETS: { fetch: assetFetch } };

const request = (url, init) => handleRequest(new Request(url, init), env);

let response = await request('https://www.digitecme.com/brands/porsche-service-dubai?utm_source=test');
assert.equal(response.status, 308);
assert.equal(response.headers.get('location'), 'https://digitecme.com/brands/porsche-service-dubai?utm_source=test');

response = await request('https://digitecme.com/about-us?gclid=abc');
assert.equal(response.status, 308);
assert.equal(response.headers.get('location'), 'https://digitecme.com/about?gclid=abc');

response = await request('https://digitecme.com/services/engine-diagnostics');
assert.equal(response.status, 308);
assert.equal(response.headers.get('location'), 'https://digitecme.com/services/car-diagnostics-dubai');

response = await request('https://digitecme.com/brands/porsche-service-dubai');
assert.equal(response.status, 200);

response = await request('https://digitecme.com/not-a-real-page-seo-status-test');
assert.equal(response.status, 404);
assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
assert.match(await response.text(), /Page Not Found/);

response = await request('https://digitecme.com/images/hero-bg.png');
assert.equal(response.status, 200);
assert.equal(response.headers.get('content-type'), 'image/png');

response = await request('https://digitecme.com/images/missing.png');
assert.equal(response.status, 404);

response = await request('https://digitecme.com/BingSiteAuth.xml');
assert.equal(response.status, 200);
assert.equal(response.headers.get('content-type'), 'application/xml');

response = await request('https://digitecme.com/sitemap.xml');
assert.equal(response.status, 200);
assert.equal(response.headers.get('content-type'), 'application/xml');

response = await request('https://digitecme.com/functions/v1/mcp', { method: 'POST', body: '{}' });
assert.equal(response.status, 200);

console.log('Hosting rule tests passed: canonical host, permanent redirects, valid routes, assets, functions and true 404 responses.');

const { handleRequest: mercedesRequest, aliases, canonicalPaths } = await import(pathToFileURL(path.join(process.cwd(), 'cloudflare/mercedes-seo-router.js')).href);
const hub = '/brands/mercedes-benz-service-dubai';
const required = new Map([
  ['/services/mercedes-repair-dubai', hub],
  ['/best-mercedes-workshop-dubai', hub],
  ['/services/mercedes-service-dubai', hub],
  ['/brands/mercedes-benz-service-dubai/suspension-repair', '/services/mercedes-suspension-repair-dubai'],
  ['/ar/mercedes/models/c63-service-repair-dubai', '/ar/brands/mercedes-benz-service-dubai'],
  ['/ar/mercedes/problems/airmatic-malfunction', '/ar/brands/mercedes-benz-service-dubai'],
]);
for (const [source, target] of required) assert.equal(aliases.get(source), target);
assert.ok([...aliases.keys()].every((source) => !source.includes(':')), 'Exact redirects must not contain React parameter placeholders');
let checked = 0;
for (const [source, target] of aliases) {
  for (const host of ['https://digitecme.com', 'http://www.digitecme.com']) {
    for (const suffix of ['', '/']) {
      const query = '?utm_source=release%20check&gclid=abc&msclkid=xyz&fbclid=123&utm_source=second';
      for (const method of ['GET', 'HEAD']) {
        const result = await mercedesRequest(new Request(`${host}${source}${suffix}${query}`, { method }), assetFetch);
        assert.equal(result.status, 308, source);
        assert.equal(result.headers.get('location'), `https://digitecme.com${target}${query}`);
        const final = await mercedesRequest(new Request(result.headers.get('location'), { method }), assetFetch);
        assert.equal(final.status, 200, `Redirect chain or loop for ${source}`);
        checked++;
      }
    }
  }
}
for (const target of canonicalPaths) {
  const result = await mercedesRequest(new Request(`https://digitecme.com${target}/?utm_campaign=test`), assetFetch);
  assert.equal(result.status, 308);
  assert.equal(result.headers.get('location'), `https://digitecme.com${target}?utm_campaign=test`);
}
for (const url of ['https://digitecme.com/unrelated-missing-page', 'http://www.digitecme.com/about/', 'https://digitecme.com/services/mercedes-repair-dubai/extra', 'https://other.example/services/mercedes-repair-dubai']) {
  let forwarded;
  const original = new Request(url);
  const result = await mercedesRequest(original, async (request) => { forwarded = request; return new Response('unchanged', { status: 202 }); });
  assert.equal(forwarded, original);
  assert.equal(result.status, 202);
}
response = await mercedesRequest(new Request('https://digitecme.com/services/mercedes-repair-dubai', { method: 'POST', body: 'untouched' }), assetFetch);
assert.equal(response.status, 200);
console.log(`Mercedes scoped routing passed: ${checked} alias cases, ${canonicalPaths.size} slash variants, parameters, direct destinations and unrelated/mutation passthrough.`);
