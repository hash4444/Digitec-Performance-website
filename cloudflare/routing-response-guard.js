import { validPaths, legacyPaths, localizedFallbacks, notFoundHtml } from './routing-response-data.js';
import { isHistoricalPath } from '../src/lib/historical-paths.js';

const valid = new Set(validPaths);
const legacy = new Set(legacyPaths);
const fallbacks = new Map(localizedFallbacks);

export async function guardResponse(request, originFetch = fetch) {
  const url = new URL(request.url);
  if (!['GET', 'HEAD'].includes(request.method) || !['digitecme.com', 'www.digitecme.com'].includes(url.hostname)) return originFetch(request);
  const normalized = url.pathname.replace(/\/{2,}/g, '/').toLowerCase().replace(/\/+$/, '') || '/';
  const destination = fallbacks.get(normalized);
  if (destination) {
    const target = new URL(destination, 'https://digitecme.com');
    target.search = url.search;
    return Response.redirect(target.href, 308);
  }
  // Preserve application endpoints and existing historical redirect handlers.
  if (/^\/(?:api|functions|cdn-cgi)(?:\/|$)/.test(normalized) || valid.has(normalized) || legacy.has(normalized)
    || isHistoricalPath(normalized)) return originFetch(request);

  // Respect real origin redirects/errors and real assets, but never a 200 HTML
  // SPA fallback for an unknown page. Fetch manually so redirects remain intact.
  const response = await originFetch(new Request(request, { redirect: 'manual' }));
  if ((response.status >= 300 && response.status < 400) || response.status >= 500
    || (!response.headers.get('content-type')?.includes('text/html') && response.status !== 404)) return response;
  if (response.body) await response.body.cancel();
  const language = normalized === '/ar' || normalized.startsWith('/ar/') ? 'ar' : 'en';
  return new Response(request.method === 'HEAD' ? null : notFoundHtml[language], {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Content-Language': language, 'X-Robots-Tag': 'noindex, follow', 'Cache-Control': 'no-store' },
  });
}
