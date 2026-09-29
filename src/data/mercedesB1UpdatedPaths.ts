// Existing pages with substantive B1 content edits. This affects sitemap dates
// only: it does not create routes or change canonical/indexability decisions.
const bilingual = [
  '/brands/mercedes-benz-service-dubai',
  ...['mercedes-service-cost-dubai-guide', 'mercedes-service-intervals-dubai-heat',
    'mercedes-benz-maintenance-guide-dubai', 'mercedes-repair-dubai-complete-guide',
    'best-oil-change-dubai-mercedes'].map(slug => `/blog/${slug}`),
  ...['c', 'e', 's', 'g63'].map(model => `/blog/mercedes-${model === 'g63' ? model : `${model}-class`}-service-dubai-guide`),
];
const serviceSlugs = ['mechanical-repair', 'transmission-repair', 'ac-repair',
  'battery-replacement', 'brake-repair', 'electrical-repair', 'body-repair',
  'steering-repair', 'exhaust-repair', 'fuel-system-repair', 'tire-repair'];

export const mercedesB1UpdatedPaths = new Set([
  ...bilingual.flatMap(path => [path, `/ar${path}`]),
  ...serviceSlugs.flatMap(slug => [`/services/mercedes-${slug}-dubai`, `/ar/services/mercedes-${slug}-dubai`]),
  ...['oil-change', 'suspension-repair', 'diagnostics'].map(slug => `/ar/services/mercedes-${slug}-dubai`),
  ...['g-class', 'c63', 'e63', 's63', 'gle', 'gls'].map(model => `/mercedes/models/${model}-service-repair-dubai`),
  '/mercedes/problems',
  ...['wont-start', 'check-engine-light', 'engine-overheating', 'oil-leak',
    'gearbox-jerking', 'transmission-slipping', 'airmatic-malfunction',
    'suspension-dropping-overnight', 'ac-not-cooling', 'battery-warning'].map(slug => `/mercedes/problems/${slug}`),
  '/services/head-unit-repair-dubai', '/services/mercedes-audio-upgrade-dubai',
  '/blog/transmission-service-7g-9g-dubai', '/blog/air-suspension-repair-dubai-guide',
]);
