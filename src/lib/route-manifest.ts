import { allServices, englishOnlyServices } from '@/data/services';
import { sitewideSeoUpdatedPaths } from '@/data/sitewideSeoUpdatedPaths';
import { localGaragePages } from '@/data/localGaragePages';
import { blogPosts } from '@/data/blogPosts';
import { brandWorkshopArticles } from '@/data/brandWorkshopArticles';
import { brands } from '@/data/brands';
import {
  BRAND_PROFILES,
  getAvailableServiceKeys,
} from '@/data/brandServices';
import { bestWorkshopPages } from '@/data/bestWorkshopPages';
import { mercedesModelPages } from '@/data/mercedesModelPages';
import { MERCEDES_PROBLEMS_PATH, mercedesProblemGuides } from '@/data/mercedesProblemGuides';
import { porscheModelPages } from '@/data/porscheModelPages';
import { audiModelPages, audiModelPath } from '@/data/audiModelPages';
import { PORSCHE_SYSTEMS_PATH, porscheSystemGuides } from '@/data/porscheSystemGuides';
import { PORSCHE_PROBLEMS_PATH, porscheProblemGuides } from '@/data/porscheProblemGuides';
import { PORSCHE_GUIDES_PATH, porscheOwnershipGuides } from '@/data/porscheOwnershipGuides';
import { porscheCaseStudies } from '@/data/porscheCaseStudies';
import { mercedesCaseStudies } from '@/data/mercedesCaseStudies';
import { BMW_HUB_PATH, bmwModelPages } from '@/data/bmwModelPages';
import { ferrariModelPages } from '@/data/ferrariModelPages';
import { ferrariCaseStudies } from '@/data/ferrariCaseStudies';
import { isIndexableContentPath } from '@/lib/route-policy';

export type RouteFamily =
  | 'home'
  | 'services-hub'
  | 'service'
  | 'brands-hub'
  | 'brand'
  | 'brand-service'
  | 'blog-hub'
  | 'article'
  | 'about'
  | 'faq'
  | 'tuning'
  | 'vrx'
  | 'html-sitemap'
  | 'workshop-guide';

export interface PublicRoute {
  path: string;
  family: RouteFamily;
  indexable: boolean;
  lastmod: string;
}

/** Date of the current verified SEO/content release. Change only on real edits. */
export const SEO_RELEASE_DATE = '2026-08-31';

const coreRoutes: Array<[string, RouteFamily]> = [
  ['/', 'home'],
  ['/services', 'services-hub'],
  ['/brands', 'brands-hub'],
  ['/blog', 'blog-hub'],
  ['/about', 'about'],
  ['/faq', 'faq'],
  ['/tuning', 'tuning'],
  ['/vrx', 'vrx'],
  ['/sitemap', 'html-sitemap'],
];

const canonicalServiceSlugs = allServices
  .map((service) => service.slug)
  .filter((slug) => slug !== 'mercedes-repair-dubai' && slug !== 'mercedes-service-dubai');

const englishRoutes: Array<[string, RouteFamily]> = [
  ...coreRoutes,
  ...canonicalServiceSlugs.map((slug) => [`/services/${slug}`, 'service'] as [string, RouteFamily]),
  ...localGaragePages.map((page) => [`/services/${page.slug}`, 'service'] as [string, RouteFamily]),
  ...blogPosts.map((post) => [`/blog/${post.slug}`, 'article'] as [string, RouteFamily]),
  ...brandWorkshopArticles.map((article) => [`/blog/${article.slug}`, 'article'] as [string, RouteFamily]),
  ...brands.map((brand) => [`/brands/${brand.slug}`, 'brand'] as [string, RouteFamily]),
  ...Object.keys(BRAND_PROFILES)
    .filter((brandSlug) => brandSlug !== 'mercedes-benz-service-dubai')
    .flatMap((brandSlug) =>
      getAvailableServiceKeys(brandSlug).map(
        (serviceSlug) => [`/brands/${brandSlug}/${serviceSlug}`, 'brand-service'] as [string, RouteFamily],
      ),
    ),
  ...bestWorkshopPages.map((page) => [`/${page.slug}`, 'workshop-guide'] as [string, RouteFamily]),
];
// Phase-one Mercedes topical pages are English-only until equivalent Arabic
// content exists. Existing Arabic blog versions remain untouched.
const englishOnlyRoutes: Array<[string, RouteFamily]> = [
  ...englishOnlyServices.map((service) => [`/services/${service.slug}`, 'service'] as [string, RouteFamily]),
  ...bmwModelPages.map((model) => [`${BMW_HUB_PATH}/${model.slug}`, 'service'] as [string, RouteFamily]),
  ...ferrariModelPages.map((model) => [model.path, 'service'] as [string, RouteFamily]),
  ...ferrariCaseStudies.map((study) => [`/ferrari/case-studies/${study.slug}`, 'article'] as [string, RouteFamily]),
  ...mercedesModelPages.map((model) => [model.path, 'service'] as [string, RouteFamily]),
  ...porscheModelPages.filter((model) => !model.legacyBlogSlug).map((model) => [model.path, 'service'] as [string, RouteFamily]),
  ...audiModelPages.map((model) => [audiModelPath(model), 'service'] as [string, RouteFamily]),
  [PORSCHE_SYSTEMS_PATH, 'html-sitemap'],
  ...porscheSystemGuides.map((guide) => [`${PORSCHE_SYSTEMS_PATH}/${guide.slug}`, 'article'] as [string, RouteFamily]),
  [PORSCHE_PROBLEMS_PATH, 'html-sitemap'],
  ...porscheProblemGuides.map((guide) => [`${PORSCHE_PROBLEMS_PATH}/${guide.slug}`, 'article'] as [string, RouteFamily]),
  ...porscheOwnershipGuides.map((guide) => [`${PORSCHE_GUIDES_PATH}/${guide.slug}`, 'article'] as [string, RouteFamily]),
  ...porscheCaseStudies.map((item) => [`/porsche/case-studies/${item.slug}`, 'article'] as [string, RouteFamily]),
  [MERCEDES_PROBLEMS_PATH, 'html-sitemap'],
  ...mercedesProblemGuides.map((guide) => [guide.path, 'article'] as [string, RouteFamily]),
  ...mercedesCaseStudies.map(
    (caseStudy) => [`/mercedes/case-studies/${caseStudy.slug}`, 'article'] as [string, RouteFamily],
  ),
];

const routeMap = new Map<string, PublicRoute>();
const paintCareUpdatedPaths = new Set([
  '/', '/services', '/sitemap', '/services/paint-protection-film',
  '/services/paint-protection-dubai', '/services/ceramic-coating',
  '/services/car-body-repair-dubai', '/sitemap',
  '/blog/why-ceramic-coating-matters-uae', '/blog/ceramic-coating-vs-ppf-dubai',
  ...['mercedes-benz', 'bmw', 'porsche', 'ferrari', 'lamborghini', 'mclaren', 'aston-martin', 'rolls-royce', 'range-rover'].map((brand) => `/brands/${brand}-service-dubai`),
]);
for (const [path, family] of englishRoutes) {
  for (const localizedPath of [path, path === '/' ? '/ar' : `/ar${path}`]) {
    routeMap.set(localizedPath, {
      path: localizedPath,
      family,
      indexable: isIndexableContentPath(localizedPath),
      lastmod: (localizedPath.startsWith('/brands/aston-martin-service-dubai') || ['/blog/aston-martin-best-workshop-dubai','/blog/aston-martin-db11-service-dubai-guide'].includes(localizedPath)) ? '2026-09-07' : [
        '/brands/audi-service-dubai',
        '/brands/audi-service-dubai/oil-change',
        '/brands/audi-service-dubai/engine-diagnostics',
        '/brands/audi-service-dubai/mechanical-repair',
        '/brands/audi-service-dubai/transmission-repair',
        '/brands/audi-service-dubai/brake-repair',
        '/brands/audi-service-dubai/suspension-repair',
        '/brands/audi-service-dubai/ac-repair',
        '/brands/audi-service-dubai/battery-replacement',
        '/brands/audi-service-dubai/body-repair',
        '/best-audi-workshop-dubai',
        '/blog/audi-maintenance-guide-dubai',
      ].includes(localizedPath) ? '2026-09-07' : localizedPath === BMW_HUB_PATH || [
        '/brands/bentley-service-dubai',
        '/brands/bentley-service-dubai/transmission-repair',
        '/brands/bentley-service-dubai/suspension-repair',
        '/brands/bentley-service-dubai/ac-repair',
        '/blog/bentley-best-workshop-dubai',
        '/blog/bentley-continental-gt-service-dubai-guide',
      ].includes(localizedPath) ? '2026-09-07' : localizedPath === BMW_HUB_PATH || [
        '/brands/mclaren-service-dubai',
        '/brands/mclaren-service-dubai/transmission-repair',
        '/brands/mclaren-service-dubai/engine-diagnostics',
        '/brands/mclaren-service-dubai/oil-change',
        '/brands/mclaren-service-dubai/mechanical-repair',
        '/blog/mclaren-best-workshop-dubai',
        '/brands/lamborghini-service-dubai',
        '/brands/lamborghini-service-dubai/battery-replacement',
        '/brands/lamborghini-service-dubai/engine-diagnostics',
        '/brands/lamborghini-service-dubai/transmission-repair',
        '/brands/lamborghini-service-dubai/suspension-repair',
        '/brands/lamborghini-service-dubai/oil-change',
        '/brands/lamborghini-service-dubai/mechanical-repair',
        '/brands/lamborghini-service-dubai/brake-repair',
        '/brands/lamborghini-service-dubai/ac-repair',
        '/brands/lamborghini-service-dubai/electrical-repair',
        '/best-lamborghini-workshop-dubai',
        '/blog/lamborghini-maintenance-guide-dubai',
        '/blog/lamborghini-urus-service-dubai-guide',
      ].includes(localizedPath) ? '2026-09-05' : SEO_RELEASE_DATE,
    });
  }
}

for (const [path, family] of englishOnlyRoutes) {
  routeMap.set(path, {
    path,
    family,
    indexable: isIndexableContentPath(path),
    lastmod: path === '/services/car-polishing-dubai' ? '2026-09-08' : SEO_RELEASE_DATE,
  });
}

const mercedesUpdatedPaths = new Set(["/brands/mercedes-benz-service-dubai", "/services/mercedes-mechanical-repair-dubai", "/services/mercedes-suspension-repair-dubai", "/services/mercedes-transmission-repair-dubai", "/services/mercedes-oil-change-dubai", "/services/mercedes-diagnostics-dubai", "/services/mercedes-ac-repair-dubai", "/services/mercedes-battery-replacement-dubai", "/services/mercedes-brake-repair-dubai", "/services/mercedes-body-repair-dubai", "/services/mercedes-electrical-repair-dubai", "/services/mercedes-steering-repair-dubai", "/services/mercedes-exhaust-repair-dubai", "/tuning", "/blog/mercedes-g63-service-dubai-guide", "/mercedes/models/g-class-service-repair-dubai", "/mercedes/models/c63-service-repair-dubai", "/blog/mercedes-c-class-service-dubai-guide", "/mercedes/models/e63-service-repair-dubai", "/blog/mercedes-e-class-service-dubai-guide", "/blog/mercedes-s-class-service-dubai-guide", "/mercedes/models/s63-service-repair-dubai", "/mercedes/models/gle-service-repair-dubai", "/mercedes/models/gls-service-repair-dubai", "/brands/maybach-service-dubai", "/blog/mercedes-service-cost-dubai-guide", "/blog/mercedes-service-intervals-dubai-heat", "/blog/mercedes-benz-maintenance-guide-dubai", "/ar/brands/mercedes-benz-service-dubai", "/ar/tuning", "/ar/blog/mercedes-benz-maintenance-guide-dubai", "/blog/mercedes-amg-gt-tuning-dubai"]);

// Service enquiry paths changed in both languages; English brand hubs gained
// specific booking labels and selected paint-care links. Retained articles and
// the unchanged polishing page keep their actual preceding release date.
const queryReleaseChanged = (route: PublicRoute) =>
  route.family === 'brand-service' ||
  (route.family === 'brand' && !route.path.startsWith('/ar/')) ||
  (route.family === 'service' && /^\/(ar\/)?services\//.test(route.path) && !['/services/car-polishing-dubai', ...localGaragePages.map(page => `/services/${page.slug}`), ...localGaragePages.map(page => `/ar/services/${page.slug}`)].includes(route.path));

// Dedicated English oil page and the eight oil pages with a contextual return link.
const oilChangeUpdatedPaths = new Set([
  '/services/oil-change-dubai', '/services/mercedes-oil-change-dubai',
  ...['bmw', 'porsche', 'lamborghini', 'ferrari', 'mclaren', 'rolls-royce', 'bentley'].map(brand => `/brands/${brand}-service-dubai/oil-change`),
]);

const suspensionUpdatedPaths = new Set([
  '/services/suspension-repair-dubai', '/services/mercedes-suspension-repair-dubai',
  ...['bmw', 'porsche', 'audi', 'range-rover', 'bentley'].map(brand => `/brands/${brand}-service-dubai/suspension-repair`),
]);

const currentMercedesSeoPaths = new Set([
  '/brands/mercedes-benz-service-dubai',
  '/services/mercedes-diagnostics-dubai',
  '/services/mercedes-oil-change-dubai',
  '/services/mercedes-suspension-repair-dubai',
  '/mercedes/problems/wont-start',
]);

const currentMaintenanceGuidePaths = new Set([
  '/blog/ferrari-maintenance-guide-dubai',
  '/ar/blog/ferrari-maintenance-guide-dubai',
  '/blog/porsche-maintenance-guide-dubai',
]);

const masterSeoUpdatedPaths = new Set([
  '/services', '/sitemap',
  '/brands/bmw-service-dubai', '/brands/rolls-royce-service-dubai',
  '/brands/aston-martin-service-dubai', '/brands/bentley-service-dubai',
  '/brands/cadillac-service-dubai', '/brands/mercedes-benz-service-dubai',
  '/brands/bentley-service-dubai/electrical-repair',
  '/services/mercedes-electrical-repair-dubai',
  '/services/paint-protection-film', '/services/ceramic-coating',
  '/services/auto-electrical-repair-dubai', '/services/tire-repair-dubai',
  '/services/cadillac-cue-screen-repair-dubai', '/services/head-unit-repair-dubai',
  '/services/mercedes-audio-upgrade-dubai',
]);

export const publicRoutes = [...routeMap.values()].map((route) => sitewideSeoUpdatedPaths.has(route.path) ? { ...route, lastmod: '2026-09-17' } : masterSeoUpdatedPaths.has(route.path) ? { ...route, lastmod: '2026-09-16' } : (currentMercedesSeoPaths.has(route.path) || currentMaintenanceGuidePaths.has(route.path)) ? { ...route, lastmod: '2026-09-14' } : (route.path === '/services/transmission-repair-dubai' || oilChangeUpdatedPaths.has(route.path) || suspensionUpdatedPaths.has(route.path)) ? { ...route, lastmod: '2026-09-10' } : queryReleaseChanged(route) ? { ...route, lastmod: '2026-09-09' } : (paintCareUpdatedPaths.has(route.path) || mercedesUpdatedPaths.has(route.path)) ? { ...route, lastmod: '2026-09-08' } : route).sort((a, b) =>
  a.path.localeCompare(b.path),
);

export const indexableRoutes = publicRoutes.filter((route) => route.indexable);
