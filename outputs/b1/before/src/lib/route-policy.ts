import { stripLocalePrefix } from '@/i18n/use-locale';
import { MERCEDES_UNTRANSLATED_MODEL_PATHS } from '@/i18n/mercedes-language';

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
  // Existing English ROX page has a distinct installation/repair process,
  // compatibility checks and local demand. Keep the generic Arabic template
  // excluded until it has an equivalent service-specific translation.
  if (!pathname.startsWith('/ar/') && brandSlug === 'rox' && serviceSlug === 'soft-close-door-installation') return false;
  return !PRIMARY_BRANDS.has(brandSlug) && !INDEXABLE_SECONDARY_SERVICES.has(serviceSlug);
};

export const isIndexableContentPath = (pathname: string): boolean =>
  !isLowValueBrandServicePath(pathname) && !(pathname.startsWith('/ar/') && MERCEDES_UNTRANSLATED_MODEL_PATHS.has(stripLocalePrefix(pathname)));
