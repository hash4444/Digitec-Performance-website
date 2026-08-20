import { stripLocalePrefix } from '@/i18n/use-locale';

/**
 * Brand/service combinations retained for users but excluded from indexing.
 * Primary brands keep their full service set; other brands keep only the four
 * service topics with sufficiently distinct, useful content.
 */
const PRIMARY_BRANDS = new Set([
  'mercedes-benz',
  'bmw',
  'audi',
  'porsche',
  'range-rover',
  'land-rover',
  'ferrari',
  'lamborghini',
  'bentley',
  'rolls-royce',
  'mclaren',
  'maserati',
  'aston-martin',
  'maybach',
  'defender',
  'toyota',
  'lexus',
  'nissan',
]);

const INDEXABLE_SECONDARY_SERVICES = new Set([
  'oil-change',
  'brake-repair',
  'ac-repair',
  'engine-diagnostics',
]);

export const isLowValueBrandServicePath = (pathname: string): boolean => {
  const englishPath = stripLocalePrefix(pathname);
  const match = englishPath.match(/^\/brands\/([a-z0-9-]+)-service-dubai\/([a-z0-9-]+)$/);
  if (!match) return false;
  const [, brandSlug, serviceSlug] = match;
  return !PRIMARY_BRANDS.has(brandSlug) && !INDEXABLE_SECONDARY_SERVICES.has(serviceSlug);
};

export const isIndexableContentPath = (pathname: string): boolean =>
  !isLowValueBrandServicePath(pathname);
