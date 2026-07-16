import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@/lib/schema';
import { isArabicPath, stripLocalePrefix } from '@/i18n/use-locale';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function useSeo({
  title,
  description,
  canonical,
  keywords,
  ogImage,
  ogTitle,
  ogDescription,
  ogType,
  twitterCard,
  twitterTitle,
  twitterDescription,
  noindex,
  jsonLd,
}: SeoProps) {
  const { pathname } = useLocation();
  const isArabic = isArabicPath(pathname);
  const englishPath = stripLocalePrefix(pathname);
  const englishUrl = `${SITE_URL}${englishPath === '/' ? '/' : englishPath}`;
  const arabicUrl = `${SITE_URL}/ar${englishPath === '/' ? '' : englishPath}`;
  const effectiveCanonical = isArabic ? arabicUrl : canonical;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    document.title = title;

    const upsertMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsertMeta('meta[name="description"]', 'name', 'description', description);

    if (keywords) {
      upsertMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    upsertMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    );

    // OG / Twitter tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) ||
               document.querySelector(`meta[name="${property}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };
    setMeta('og:title', ogTitle || title);
    setMeta('og:description', ogDescription || description);
    setMeta('og:type', ogType || 'website');
    setMeta('twitter:card', twitterCard || 'summary_large_image');
    setMeta('twitter:title', twitterTitle || ogTitle || title);
    setMeta('twitter:description', twitterDescription || ogDescription || description);
    if (ogImage) {
      setMeta('og:image', ogImage);
      setMeta('twitter:image', ogImage);
    }

    if (effectiveCanonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', effectiveCanonical);
      setMeta('og:url', effectiveCanonical);
    }

    setMeta('og:locale', isArabic ? 'ar_AE' : 'en_AE');

    const alternateLinks = [
      { hreflang: 'en-AE', href: englishUrl },
      { hreflang: 'ar-AE', href: arabicUrl },
      { hreflang: 'x-default', href: englishUrl },
    ].map(({ hreflang, href }) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.setAttribute('data-route-hreflang', 'true');
        document.head.appendChild(link);
      }
      link.href = href;
      return link;
    });

    let jsonLdScript: HTMLScriptElement | null = null;
    if (jsonLdString) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.setAttribute('data-seo-jsonld', 'true');
      jsonLdScript.text = jsonLdString;
      document.head.appendChild(jsonLdScript);
    }

    return () => {
      if (jsonLdScript && jsonLdScript.parentNode) {
        jsonLdScript.parentNode.removeChild(jsonLdScript);
      }
      alternateLinks.forEach((link) => {
        if (link.dataset.routeHreflang === 'true') link.remove();
      });
    };
  }, [
    title,
    description,
    effectiveCanonical,
    isArabic,
    englishUrl,
    arabicUrl,
    keywords,
    ogImage,
    ogTitle,
    ogDescription,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    noindex,
    jsonLdString,
  ]);
}
