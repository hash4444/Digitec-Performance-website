// Existing BMW URLs whose B3 rendered content changed. Sitemap dates only;
// route, canonical, robots and locale policy remain unchanged.
const root = '/brands/bmw-service-dubai';
export const bmwB3UpdatedPaths = new Set([
  root,
  `/ar${root}`,
  '/best-bmw-workshop-dubai',
  '/ar/best-bmw-workshop-dubai',
  '/blog/bmw-maintenance-guide-dubai',
  '/ar/blog/bmw-maintenance-guide-dubai',
  ...['3-series', '5-series', 'm3', 'm4', 'm5', 'x5', 'x6',
    'ac-repair', 'battery-replacement', 'brake-repair', 'electrical-repair',
    'engine-diagnostics', 'mechanical-repair', 'oil-change', 'suspension-repair']
    .map(slug => `${root}/${slug}`),
]);
