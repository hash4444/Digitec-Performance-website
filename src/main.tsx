import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

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
