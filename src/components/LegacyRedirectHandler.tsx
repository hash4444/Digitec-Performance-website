import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Global legacy URL normalizer.
 * Runs on every route change BEFORE <Routes> matches, so we can:
 *  - Strip WordPress-style trailing slashes (/about/ -> /about)
 *  - Strip query strings used by old PageSpeed / WP plugins (?PageSpeed=noscript, ?replytocom, ?feed, etc.)
 *  - Hard-redirect old WP feed / search / attachment URLs to the closest live page (single hop, 301-equivalent via replace)
 *  - Lowercase paths (Google sometimes indexes mixed-case)
 *
 * All redirects use navigate(..., { replace: true }) so they do not create history entries
 * and behave like a permanent redirect for the user. Combined with the per-route <Navigate replace />
 * rules in App.tsx, every legacy URL resolves in a single hop to the final canonical URL.
 */
export const LegacyRedirectHandler = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let nextPath = pathname;
    let changed = false;

    // 1. Lowercase the path (preserve case in query/hash)
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

    // 4. Drop ALL query parameters — site has no legitimate query-driven pages.
    //    This nukes ?PageSpeed=noscript, ?replytocom=, ?p=, ?feed=, UTM-like junk we don't want indexed, etc.
    //    (We keep UTM links working visually because GA reads them before this runs — but we strip from URL after.)
    let nextSearch = search;
    if (nextSearch && nextSearch.length > 0) {
      nextSearch = '';
      changed = true;
    }

    // 5. Feed / WordPress-only paths → home or closest section (single hop)
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
      [/^\/\?.*$/, '/'],
    ];
    for (const [pattern, target] of feedRedirects) {
      if (pattern.test(nextPath)) {
        nextPath = target;
        nextSearch = '';
        changed = true;
        break;
      }
    }

    if (changed) {
      navigate(`${nextPath}${nextSearch}${hash}`, { replace: true });
    }
  }, [pathname, search, hash, navigate]);

  return null;
};

export default LegacyRedirectHandler;
