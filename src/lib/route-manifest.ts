import { allServices } from '@/data/services';
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
for (const [path, family] of englishRoutes) {
  for (const localizedPath of [path, path === '/' ? '/ar' : `/ar${path}`]) {
    routeMap.set(localizedPath, {
      path: localizedPath,
      family,
      indexable: isIndexableContentPath(localizedPath),
      lastmod: SEO_RELEASE_DATE,
    });
  }
}

for (const [path, family] of englishOnlyRoutes) {
  routeMap.set(path, {
    path,
    family,
    indexable: isIndexableContentPath(path),
    lastmod: SEO_RELEASE_DATE,
  });
}

export const publicRoutes = [...routeMap.values()].sort((a, b) =>
  a.path.localeCompare(b.path),
);

export const indexableRoutes = publicRoutes.filter((route) => route.indexable);
