import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/schema';
import { isArabicPath, stripLocalePrefix } from '@/i18n/use-locale';
import { isLowValueBrandServicePath } from '@/lib/route-policy';

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  noindex?: boolean;
  /** Emit an ar-AE alternate only when a real Arabic equivalent is published. */
  hasArabicVersion?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export interface ResolvedSeoProps extends SeoProps {
  canonical?: string;
  noindex: boolean;
  language: 'en' | 'ar';
}

type SeoCollector = (seo: ResolvedSeoProps) => void;
const SeoCollectorContext = React.createContext<SeoCollector | null>(null);

export const SeoCollectorProvider = ({
  collect,
  children,
}: {
  collect: SeoCollector;
  children: React.ReactNode;
}) => React.createElement(SeoCollectorContext.Provider, { value: collect }, children);

export function useSeo(props: SeoProps) {
  const {
    title,
    description,
    keywords,
    ogImage,
    ogImageAlt,
    ogImageWidth,
    ogImageHeight,
    ogTitle,
    ogDescription,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    hasArabicVersion = true,
    jsonLd,
  } = props;
  const { pathname } = useLocation();
  const collector = useContext(SeoCollectorContext);
  const isArabic = isArabicPath(pathname);
  const englishPath = stripLocalePrefix(pathname);
  const englishUrl = `${SITE_URL}${englishPath === '/' ? '/' : englishPath}`;
  const arabicUrl = `${SITE_URL}/ar${englishPath === '/' ? '' : englishPath}`;
  const effectiveNoindex = Boolean(props.noindex || isLowValueBrandServicePath(pathname));
  const effectiveCanonical = effectiveNoindex
    ? props.canonical
    : (isArabic ? arabicUrl : (props.canonical ?? englishUrl));
  const effectiveOgImage = ogImage || DEFAULT_OG_IMAGE;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : undefined;

  collector?.({
    ...props,
    canonical: effectiveCanonical,
    noindex: effectiveNoindex,
    language: isArabic ? 'ar' : 'en',
    ogImage: effectiveOgImage,
  });

  useEffect(() => {
    document.title = title;

    const upsertMeta = (
      selector: string,
      attribute: 'name' | 'property',
      key: string,
      content?: string,
    ) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!content) {
        element?.remove();
        return;
      }
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    // Meta keywords do not affect modern ranking and easily become stale.
    document.querySelector('meta[name="keywords"]')?.remove();
    upsertMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      effectiveNoindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    );

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle || title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', ogDescription || description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', ogType || 'website');
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', effectiveOgImage);
    upsertMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', ogImageAlt);
    upsertMeta('meta[property="og:image:width"]', 'property', 'og:image:width', ogImageWidth ? String(ogImageWidth) : undefined);
    upsertMeta('meta[property="og:image:height"]', 'property', 'og:image:height', ogImageHeight ? String(ogImageHeight) : undefined);
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', isArabic ? 'ar_AE' : 'en_AE');
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', twitterCard || 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', twitterTitle || ogTitle || title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', twitterDescription || ogDescription || description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', effectiveOgImage);
    upsertMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', ogImageAlt);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (effectiveCanonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = effectiveCanonical;
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', effectiveCanonical);
    } else {
      canonicalLink?.remove();
      upsertMeta('meta[property="og:url"]', 'property', 'og:url');
    }

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    if (!effectiveNoindex && effectiveCanonical) {
      [
        { hreflang: 'en-AE', href: englishUrl },
        ...(hasArabicVersion ? [{ hreflang: 'ar-AE', href: arabicUrl }] : []),
        { hreflang: 'x-default', href: englishUrl },
      ].forEach(({ hreflang, href }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
      });
    }

    const existingSchema = document.querySelector('script[data-route-jsonld="true"]');
    if (jsonLdString) {
      const script = existingSchema instanceof HTMLScriptElement
        ? existingSchema
        : document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.routeJsonld = 'true';
      script.text = jsonLdString;
      if (!script.parentNode) document.head.appendChild(script);
    } else {
      existingSchema?.remove();
    }
  }, [
    title,
    description,
    effectiveCanonical,
    effectiveNoindex,
    effectiveOgImage,
    ogImageAlt,
    ogImageWidth,
    ogImageHeight,
    isArabic,
    englishUrl,
    arabicUrl,
    keywords,
    ogTitle,
    ogDescription,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    hasArabicVersion,
    jsonLdString,
  ]);
}
