import { localizedFallbacks, validPaths } from './routing-response-data.js';

// These four historical destinations already exist in ServicePage's redirect
// maps. Resolve them at the deployed edge before a static SPA fallback can win.
export const porscheP2ServiceAliases = new Map([
  ['/services/transmission-services', '/services/transmission-repair-dubai'],
  ['/services/suspension-repair', '/services/suspension-repair-dubai'],
  ['/services/steering-repair', '/services/steering-repair-dubai'],
  ['/services/performance-tuning-dubai', '/tuning'],
].flatMap(([source, target]) => [[source, target], [`/ar${source}`, `/ar${target}`]]));

// Exact existing English-only Porsche paths only. Do not redirect working
// Arabic pages or claim the Arabic hub is a translated model/article page.
export const porscheP2ArabicFallbacks = new Map(localizedFallbacks.filter(([source]) => source.startsWith('/ar/porsche/')));
export const porscheP2CanonicalPaths = new Set(validPaths.filter(path => path.includes('porsche')));

export async function handlePorscheP2Request(request, originFetch = fetch) {
  const url = new URL(request.url);
  if (!['GET', 'HEAD'].includes(request.method) || !['digitecme.com', 'www.digitecme.com'].includes(url.hostname)) return originFetch(request);
  const normalized = url.pathname.replace(/\/{2,}/g, '/').toLowerCase().replace(/\/+$/, '') || '/';
  const target = porscheP2ServiceAliases.get(normalized) || porscheP2ArabicFallbacks.get(normalized)
    || (porscheP2CanonicalPaths.has(normalized) ? normalized : undefined);
  if (target) {
    const destination = new URL(target, 'https://digitecme.com');
    destination.search = url.search;
    if (destination.href !== url.href) return Response.redirect(destination.href, 308);
  }
  return originFetch(request);
}
