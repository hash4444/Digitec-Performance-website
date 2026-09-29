// Preserve historical aliases and enforce B0-A page response integrity.
// Deploy as a bundled Worker ahead of the existing origin; this file is not
// executed merely by publishing it as a Lovable static asset.
import { handleRequest as handleMercedesRequest } from './mercedes-seo-router.js';
import { guardResponse } from './routing-response-guard.js';

const tyrePaths = new Map([
  ['/services/tire-repair', '/services/tire-repair-dubai'],
  ['/ar/services/tire-repair', '/ar/services/tire-repair-dubai'],
  ['/services/tire-repair-dubai', '/services/tire-repair-dubai'],
  ['/ar/services/tire-repair-dubai', '/ar/services/tire-repair-dubai'],
]);

export async function handleRequest(request, originFetch = fetch) {
  const url = new URL(request.url);
  if (['GET', 'HEAD'].includes(request.method) && ['digitecme.com', 'www.digitecme.com'].includes(url.hostname)) {
    const normalized = url.pathname.replace(/\/{2,}/g, '/').toLowerCase().replace(/\/+$/, '') || '/';
    const target = tyrePaths.get(normalized);
    if (target) {
      const destination = new URL('https://digitecme.com');
      destination.pathname = target;
      destination.search = url.search;
      if (destination.href !== url.href) return Response.redirect(destination.href, 308);
    }
  }
  // Keep existing Mercedes/tyre decisions ahead of the B0-A response guard.
  return handleMercedesRequest(request, (originRequest) => guardResponse(originRequest, originFetch));
}

export default { fetch(request) { return handleRequest(request); } };
