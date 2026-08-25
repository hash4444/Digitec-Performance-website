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

response = await request('https://digitecme.com/functions/v1/mcp', { method: 'POST', body: '{}' });
assert.equal(response.status, 200);

console.log('Hosting rule tests passed: canonical host, permanent redirects, valid routes, assets, functions and true 404 responses.');
