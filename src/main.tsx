import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// After a new deploy, old hashed chunks disappear. Reload once so the browser
// fetches the fresh build instead of showing a blank screen.
const RELOAD_KEY = 'chunk-reload-at';
const reloadForStaleChunk = () => {
  const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
  if (Date.now() - last < 10_000) return;
  sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  window.location.reload();
};
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  reloadForStaleChunk();
});
window.addEventListener('unhandledrejection', (event) => {
  const message = String((event.reason as Error)?.message ?? event.reason ?? '');
  if (/Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(message)) {
    event.preventDefault();
    reloadForStaleChunk();
  }
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Missing #root element');
}

// Lovable can return homepage HTML for a legacy Mercedes URL before the edge
// rules are activated. That HTML is not the requested React tree. Render the
// browser redirect normally instead of trying to hydrate the wrong page.
const normalizedPath = (value: string) => value.replace(/\/{2,}/g, '/').toLowerCase().replace(/\/+$/, '') || '/';
const requestedPath = normalizedPath(window.location.pathname);
const canonicalHref = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
const renderedPath = canonicalHref ? normalizedPath(new URL(canonicalHref).pathname) : undefined;
const isMercedesFallback = /(?:^|\/)(?:best-)?mercedes(?:-|\/|$)/.test(requestedPath)
  && renderedPath !== undefined && renderedPath !== requestedPath;

if (rootElement.hasChildNodes() && !isMercedesFallback) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
