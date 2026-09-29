// Existing Porsche URLs whose B2 HTML changed substantively. This is a
// sitemap-date overlay only; route, robots, canonical and locale policy stay put.
const porscheServiceRoot = '/brands/porsche-service-dubai';
const arabicServiceSlugs = ['ac-repair', 'battery-replacement', 'body-repair',
  'brake-repair', 'electrical-repair', 'engine-diagnostics', 'exhaust-repair',
  'fuel-system-repair', 'mechanical-repair', 'oil-change', 'steering-repair',
  'suspension-repair', 'tire-repair', 'transmission-repair'];
const englishServiceSlugs = ['ac-repair', 'battery-replacement', 'brake-repair',
  'electrical-repair', 'engine-diagnostics', 'mechanical-repair', 'oil-change',
  'suspension-repair', 'transmission-repair'];

export const porscheB2UpdatedPaths = new Set([
  porscheServiceRoot,
  `/ar${porscheServiceRoot}`,
  '/best-porsche-workshop-dubai', '/ar/best-porsche-workshop-dubai',
  '/ar/blog/porsche-maintenance-guide-dubai',
  ...arabicServiceSlugs.map(slug => `/ar${porscheServiceRoot}/${slug}`),
  ...englishServiceSlugs.map(slug => `${porscheServiceRoot}/${slug}`),
  '/porsche/718', '/porsche/macan', '/porsche/taycan',
  '/porsche/911/997', '/porsche/911/991', '/porsche/911/992',
]);
