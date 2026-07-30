/**
 * Centralised Schema.org / JSON-LD helpers for digitecme.com.
 *
 * Every entity uses a stable `@id`. Per-page graphs reference sitewide
 * entities (Organization, AutoRepair business, WebSite) by @id instead of
 * duplicating them, so the site's structured data is fully interconnected
 * and Google's validator does not flag duplicates.
 *
 * Sitewide entities live in `index.html` (visible to non-JS crawlers).
 * Per-route entities are injected by `useSeo({ jsonLd })`.
 */

export const SITE_URL = 'https://digitecme.com';

export const IDS = {
  organization: `${SITE_URL}/#organization`,
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
} as const;

export const organizationRef = { '@id': IDS.organization };
export const businessRef = { '@id': IDS.business };
export const websiteRef = { '@id': IDS.website };

const abs = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`);
const languageForUrl = (url: string) => {
  const pathname = new URL(abs(url)).pathname;
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar-AE' : 'en-AE';
};

type Entity = Record<string, unknown>;

/** Wrap a list of entities in a single JSON-LD graph document. */
export function pageGraph(entities: Entity[]): Entity {
  return {
    '@context': 'https://schema.org',
    '@graph': entities.filter(Boolean),
  };
}

/** BreadcrumbList entity with a stable @id derived from the page URL. */
export function buildBreadcrumb(
  pageUrl: string,
  items: { name: string; url: string }[],
): Entity {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

/** WebPage entity referencing the sitewide WebSite/Business. */
export function buildWebPage(opts: {
  url: string;
  name: string;
  description?: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage' | 'ItemPage';
  breadcrumbId?: string;
  primaryImage?: string;
  datePublished?: string;
  dateModified?: string;
}): Entity {
  const {
    url,
    name,
    description,
    type = 'WebPage',
    breadcrumbId,
    primaryImage,
    datePublished,
    dateModified,
  } = opts;
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: websiteRef,
    publisher: organizationRef,
    about: businessRef,
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: abs(primaryImage),
            contentUrl: abs(primaryImage),
            representativeOfPage: true,
          },
        }
      : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: languageForUrl(url),
  };
}

/** Service entity — provider references sitewide Business. */
export function buildService(opts: {
  url: string;
  name: string;
  serviceType: string;
  description: string;
  image?: string;
  keywords?: string[];
  brand?: string;
  offers?: string[];
  areaServed?: string[];
}): Entity {
  const { url, name, serviceType, description, image, keywords, brand, offers, areaServed } = opts;
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    url,
    inLanguage: languageForUrl(url),
    ...(image ? { image: abs(image) } : {}),
    provider: businessRef,
    areaServed: (areaServed && areaServed.length > 0
      ? areaServed
      : ['Dubai', 'Abu Dhabi', 'Sharjah', 'United Arab Emirates']
    ).map((a) => ({ '@type': a === 'United Arab Emirates' ? 'Country' : 'City', name: a })),
    ...(brand ? { brand: { '@type': 'Brand', name: brand } } : {}),
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    ...(offers && offers.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${name} — Services`,
            itemListElement: offers.map((n) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: n },
            })),
          },
        }
      : {}),
  };
}

/** FAQPage entity built from a list of Q&A pairs. */
export function buildFAQ(pageUrl: string, faqs: { question: string; answer: string }[]): Entity | null {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    inLanguage: languageForUrl(pageUrl),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** BlogPosting / Article entity — publisher references the sitewide Organization. */
export function buildArticle(opts: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorType?: 'Person' | 'Organization';
  image?: string;
  section?: string;
  keywords?: string;
}): Entity {
  const {
    url,
    headline,
    description,
    datePublished,
    dateModified,
    author,
    authorType = 'Organization',
    image,
    section,
    keywords,
  } = opts;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorType === 'Organization' ? organizationRef : { '@type': authorType, name: author },
    publisher: organizationRef,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    ...(image
      ? {
          image: {
            '@type': 'ImageObject',
            url: abs(image),
            contentUrl: abs(image),
          },
        }
      : {}),
    ...(section ? { articleSection: section } : {}),
    ...(keywords ? { keywords } : {}),
    inLanguage: languageForUrl(url),
  };
}

/**
 * Detect the "brand" a service page targets from its slug or seoKeyword,
 * so brand-specific service pages (e.g. mercedes-brake-repair-dubai)
 * emit `brand: Mercedes-Benz` automatically.
 */
const BRAND_KEYWORDS: { match: RegExp; brand: string }[] = [
  { match: /mercedes|amg|maybach/i, brand: 'Mercedes-Benz' },
  { match: /\bbmw\b|\bm-?power\b/i, brand: 'BMW' },
  { match: /porsche/i, brand: 'Porsche' },
  { match: /\baudi\b/i, brand: 'Audi' },
  { match: /ferrari/i, brand: 'Ferrari' },
  { match: /lamborghini/i, brand: 'Lamborghini' },
  { match: /mclaren/i, brand: 'McLaren' },
  { match: /rolls\W?royce/i, brand: 'Rolls-Royce' },
  { match: /bentley/i, brand: 'Bentley' },
  { match: /bugatti/i, brand: 'Bugatti' },
  { match: /aston\W?martin/i, brand: 'Aston Martin' },
  { match: /range\W?rover|land\W?rover/i, brand: 'Land Rover' },
];

export function detectBrand(slug: string, seoKeyword?: string): string | undefined {
  const hay = `${slug} ${seoKeyword ?? ''}`;
  return BRAND_KEYWORDS.find((b) => b.match.test(hay))?.brand;
}

/** Common service catalog entries used to enrich brand pages. */
export const BRAND_OFFER_CATALOG = [
  'Scheduled Servicing',
  'Engine Repair',
  'Transmission Repair',
  'Suspension Repair',
  'Brake Repair',
  'Air Conditioning Repair',
  'ECU Programming',
  'ECU Remapping',
  'Diagnostics',
  'Body Repair',
  'Paint Protection & Ceramic Coating',
];
