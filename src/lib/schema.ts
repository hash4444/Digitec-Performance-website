/**
 * Schema.org helpers for the connected entity graph on digitecme.com.
 *
 * Shared entities use one permanent @id. Route entities use their canonical
 * URL plus a stable fragment, so English and Arabic pages can reference the
 * same business and vehicle-brand nodes without publishing duplicate claims.
 */

export const SITE_URL = 'https://digitecme.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-bg.png`;

export const IDS = {
  organization: `${SITE_URL}/#organization`,
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  serviceCatalog: `${SITE_URL}/#service-catalog`,
} as const;

export const organizationRef = { '@id': IDS.organization };
export const businessRef = { '@id': IDS.business };
export const websiteRef = { '@id': IDS.website };

type Entity = Record<string, unknown>;

export const absoluteUrl = (url: string) =>
  url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

const languageForUrl = (url: string) => {
  const pathname = new URL(absoluteUrl(url)).pathname;
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar-AE' : 'en-AE';
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Wrap route entities in one JSON-LD graph document. */
export function pageGraph(entities: Array<Entity | null | undefined>): Entity {
  return {
    '@context': 'https://schema.org',
    '@graph': entities.filter(Boolean),
  };
}

/** A vehicle brand has one language-independent identity across the site. */
export function brandId(nameOrSlug: string): string {
  const clean = nameOrSlug.replace(/-service-dubai$/i, '');
  return `${SITE_URL}/#brand-${slugify(clean)}`;
}

export function brandRef(nameOrSlug: string): Entity {
  return { '@id': brandId(nameOrSlug) };
}

export function buildBrand(opts: {
  name: string;
  pageUrl?: string;
  logo?: string;
  description?: string;
}): Entity {
  const { name, pageUrl, logo, description } = opts;
  return {
    '@type': 'Brand',
    '@id': brandId(name),
    name,
    ...(description ? { description } : {}),
    ...(pageUrl ? { url: absoluteUrl(pageUrl), mainEntityOfPage: { '@id': `${absoluteUrl(pageUrl)}#webpage` } } : {}),
    ...(logo
      ? {
          logo: {
            '@type': 'ImageObject',
            '@id': `${brandId(name)}-logo`,
            url: absoluteUrl(logo),
            contentUrl: absoluteUrl(logo),
          },
        }
      : {}),
  };
}

/** BreadcrumbList with a URL-derived stable identity. */
export function buildBreadcrumb(
  pageUrl: string,
  items: { name: string; url: string }[],
): Entity {
  const url = absoluteUrl(pageUrl);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/** WebPage node referencing the shared WebSite, organization and business. */
export function buildWebPage(opts: {
  url: string;
  name: string;
  description?: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage' | 'ItemPage';
  breadcrumbId?: string;
  primaryImage?: string;
  datePublished?: string;
  dateModified?: string;
  mainEntityId?: string;
}): Entity {
  const {
    name,
    description,
    type = 'WebPage',
    breadcrumbId,
    primaryImage,
    datePublished,
    dateModified,
    mainEntityId,
  } = opts;
  const url = absoluteUrl(opts.url);
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: websiteRef,
    publisher: organizationRef,
    about: businessRef,
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            '@id': `${url}#primaryimage`,
            url: absoluteUrl(primaryImage),
            contentUrl: absoluteUrl(primaryImage),
            representativeOfPage: true,
          },
        }
      : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: languageForUrl(url),
  };
}

export function buildOfferCatalog(pageUrl: string, name: string, offers: string[]): Entity {
  const url = absoluteUrl(pageUrl);
  return {
    '@type': 'OfferCatalog',
    '@id': `${url}#offer-catalog`,
    name,
    itemListElement: offers.map((offerName, index) => {
      // Arabic and other non-Latin labels can normalize to an empty ASCII
      // slug. Prefixing the position also keeps repeated labels unique while
      // preserving deterministic IDs for a stable offer order.
      const normalizedName = slugify(offerName) || 'item';
      const key = `${index + 1}-${normalizedName}`;
      return {
        '@type': 'Offer',
        '@id': `${url}#offer-${key}`,
        itemOffered: {
          '@type': 'Service',
          '@id': `${url}#catalog-service-${key}`,
          name: offerName,
          provider: businessRef,
        },
      };
    }),
  };
}

/** Service node. The default service area is the confirmed Dubai location. */
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
  const { name, serviceType, description, image, brand, offers } = opts;
  const url = absoluteUrl(opts.url);
  const areas = opts.areaServed?.length ? opts.areaServed : ['Dubai'];
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    url,
    inLanguage: languageForUrl(url),
    ...(image
      ? {
          image: {
            '@type': 'ImageObject',
            '@id': `${url}#service-image`,
            url: absoluteUrl(image),
            contentUrl: absoluteUrl(image),
            representativeOfPage: true,
          },
        }
      : {}),
    provider: businessRef,
    areaServed: areas.map((area) => ({
      '@type': /united arab emirates|الإمارات العربية المتحدة/i.test(area) ? 'Country' : 'City',
      name: area,
    })),
    ...(brand ? { brand: brandRef(brand) } : {}),
    ...(offers?.length
      ? { hasOfferCatalog: buildOfferCatalog(url, `${name} services`, offers) }
      : {}),
  };
}

/** FAQ markup is emitted only from Q&A pairs rendered on the same route. */
export function buildFAQ(pageUrl: string, faqs: { question: string; answer: string }[]): Entity | null {
  const unsupportedClaim = /(?:highest[- ]rated|top[- ]rated|\bbest\b|\bleading\b|most trusted|official (?:gad|partner)|gad motors partner|factory support|dealer-level|manufacturer[- ]approved|\b(?:authori[sz]ed|certified)\b|coding rights|approved supply|\bguarantee(?:d)?\b|same[- ]day|free (?:diagnos|assess|consult)|30\s*[–-]\s*50\s*%|\b40\+|50,?000\+|8,?000\+|\b15\+\s*years|(?:genuine|original)\s+(?:oem\s+)?parts?\s+(?:are|is|for every|by default)|\b(?:xentry|ista\+?|piwis|odis|pathfinder|ldas|deis)\b|أعلى\s*تقييم|الأفضل|أفضل\s+ورشة|شريك\s+رسمي|الشريك\s+الرسمي|معتمد|قطع\s+أصلية|مجاني|في\s+نفس\s+اليوم|ضمان|٤٠\+|٥٠[،,]?٠٠٠\+)/i;
  const safeFaqs = (faqs ?? []).filter(
    (faq) => !unsupportedClaim.test(`${faq.question} ${faq.answer}`),
  );
  if (!safeFaqs.length) return null;
  const url = absoluteUrl(pageUrl);
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    isPartOf: websiteRef,
    inLanguage: languageForUrl(url),
    mainEntity: safeFaqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `${url}#question-${index + 1}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** BlogPosting node. dateModified is omitted unless a real update date exists. */
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
  const url = absoluteUrl(opts.url);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline,
    description,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: authorType === 'Organization'
      ? organizationRef
      : { '@type': 'Person', name: author },
    publisher: organizationRef,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    ...(image
      ? {
          image: {
            '@type': 'ImageObject',
            '@id': `${url}#primaryimage`,
            url: absoluteUrl(image),
            contentUrl: absoluteUrl(image),
            representativeOfPage: true,
          },
        }
      : {}),
    ...(section ? { articleSection: section } : {}),
    ...(keywords ? { keywords } : {}),
    inLanguage: languageForUrl(url),
    isAccessibleForFree: true,
  };
}

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
  { match: /range\W?rover|land\W?rover|defender/i, brand: 'Land Rover' },
];

export function detectBrand(slug: string, seoKeyword?: string): string | undefined {
  const haystack = `${slug} ${seoKeyword ?? ''}`;
  return BRAND_KEYWORDS.find((candidate) => candidate.match.test(haystack))?.brand;
}

export const BRAND_OFFER_CATALOG = [
  'Scheduled Servicing',
  'Engine Repair',
  'Transmission Repair',
  'Suspension Repair',
  'Brake Repair',
  'Air Conditioning Repair',
  'ECU Programming',
  'Diagnostics',
  'Body Repair',
  'Paint Protection Film and Ceramic Coating',
];
