import { startTransition, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const normalizeAttributionSearch = (search: string) => {
  const retained = new URLSearchParams();

  new URLSearchParams(search).forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey === 'gclid' || /^utm_[a-z0-9_]+$/.test(normalizedKey)) {
      retained.append(normalizedKey, value);
    }
  });

  const normalized = retained.toString();
  return normalized ? `?${normalized}` : '';
};

/**
 * Client-side cleanup for legacy and marketing URLs. HTTP redirects remain the
 * responsibility of the hosting layer; this keeps browser navigation clean when
 * a legacy URL reaches the React application.
 */
export const LegacyRedirectHandler = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let nextPath = pathname;
    let changed = false;

    // 1. Lowercase the path.
    if (nextPath !== nextPath.toLowerCase()) {
      nextPath = nextPath.toLowerCase();
      changed = true;
    }

    // 2. Strip trailing slash (except root)
    if (nextPath.length > 1 && nextPath.endsWith('/')) {
      nextPath = nextPath.replace(/\/+$/, '');
      changed = true;
    }

    // 3. Collapse duplicate slashes
    if (/\/{2,}/.test(nextPath)) {
      nextPath = nextPath.replace(/\/{2,}/g, '/');
      changed = true;
    }

    // 4. Retain attribution parameters and remove legacy or unrelated query junk.
    //    Canonical URL generation is handled independently by the SEO layer.
    const nextSearch = normalizeAttributionSearch(search);
    if (nextSearch !== search) {
      changed = true;
    }

    // 5. Send feed and WordPress-only paths to the closest live section.
    const feedRedirects: Array<[RegExp, string]> = [
      [/^\/feed$/, '/blog'],
      [/^\/comments\/feed$/, '/blog'],
      [/^\/blog\/feed$/, '/blog'],
      [/\/feed\/rss2?$/, '/blog'],
      [/^\/search\/.*\/feed\/rss2?$/, '/blog'],
      [/^\/search(\/.*)?$/, '/'],
      [/^\/wp-(admin|login|content|includes).*$/, '/'],
      [/^\/category(\/.*)?$/, '/blog'],
      [/^\/tag(\/.*)?$/, '/blog'],
      [/^\/author(\/.*)?$/, '/about'],
      [/^\/attachment(\/.*)?$/, '/'],
    ];
    for (const [pattern, target] of feedRedirects) {
      if (pattern.test(nextPath)) {
        nextPath = target;
        changed = true;
        break;
      }
    }

    // 6. Force the production origin while preserving allowed attribution data.
    if (typeof window !== 'undefined') {
      const { hostname, protocol } = window.location;
      const isProdHost = hostname === 'digitecme.com' || hostname === 'www.digitecme.com';
      const needsOriginFix = isProdHost && (hostname === 'www.digitecme.com' || protocol !== 'https:');
      if (needsOriginFix) {
        window.location.replace(`https://digitecme.com${nextPath}${nextSearch}${hash}`);
        return;
      }
    }

    if (changed) {
      // A normalized URL can arrive while a lazy route is still hydrating.
      // Mark the location update as non-urgent so React can finish reusing the
      // prerendered Suspense boundary instead of switching it to client render.
      startTransition(() => {
        navigate(`${nextPath}${nextSearch}${hash}`, { replace: true });
      });
    }
  }, [pathname, search, hash, navigate]);

  return null;
};

export default LegacyRedirectHandler;
