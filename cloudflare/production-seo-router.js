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

// Keep the confirmed PPF and paint-options aliases in the actual Wrangler
// entry point. The separately generated static Worker is not invoked here.
const protectionAliases = new Map([
  ['/ppf', '/services/paint-protection-film'],
  ['/services/ppf', '/services/paint-protection-film'],
  ['/paint-protection', '/services/paint-protection-dubai'],
  ['/car-paint-protection', '/services/paint-protection-dubai'],
  ['/services/paint-protection', '/services/paint-protection-dubai'],
  ['/services/car-paint-protection', '/services/paint-protection-dubai'],
].flatMap(([source, target]) => [[source, target], [`/ar${source}`, `/ar${target}`]]));
const protectionCanonicalPaths = new Set(protectionAliases.values());

export async function handleRequest(request, originFetch = fetch) {
  const url = new URL(request.url);
  if (['GET', 'HEAD'].includes(request.method) && ['digitecme.com', 'www.digitecme.com'].includes(url.hostname)) {
    const normalized = url.pathname.replace(/\/{2,}/g, '/').toLowerCase().replace(/\/+$/, '') || '/';
    const target = protectionAliases.get(normalized)
      || (protectionCanonicalPaths.has(normalized) ? normalized : undefined)
      || tyrePaths.get(normalized);
    if (target) {
      const destination = new URL('https://digitecme.com');
      destination.pathname = target;
      destination.search = url.search;
      if (destination.href !== url.href) return Response.redirect(destination.href, 308);
    }
  }
  // Keep scoped PPF/paint, Mercedes and tyre decisions ahead of the response guard.
  return handleMercedesRequest(request, (originRequest) => guardResponse(originRequest, originFetch));
}

export default { fetch(request) { return handleRequest(request); } };
