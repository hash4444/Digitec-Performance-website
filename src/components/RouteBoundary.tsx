import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import routingPaths from '@/lib/routing-paths.json';
import localizedFallbacks from '@/i18n/arabic-route-fallbacks.json';
import { isHistoricalPath } from '@/lib/historical-paths';

const recognized = new Set([...routingPaths.validPaths, ...routingPaths.legacyPaths, ...Object.keys(localizedFallbacks)]);

/** Reject unknown slugs before dynamic components can redirect them to a hub. */
export default function RouteBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/{2,}/g, '/').toLowerCase().replace(/\/+$/, '') || '/';
  return recognized.has(path) || isHistoricalPath(path) ? children : <NotFound />;
}
