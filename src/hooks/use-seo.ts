import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function useSeo({ title, description, canonical, keywords, ogImage, jsonLd }: SeoProps) {
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
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (ogImage) {
      setMeta('og:image', ogImage);
      setMeta('twitter:image', ogImage);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
      if (canonical) setMeta('og:url', canonical);
    }

    let jsonLdScript: HTMLScriptElement | null = null;
    if (jsonLd) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.setAttribute('data-seo-jsonld', 'true');
      jsonLdScript.text = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdScript);
    }

    return () => {
      if (jsonLdScript && jsonLdScript.parentNode) {
        jsonLdScript.parentNode.removeChild(jsonLdScript);
      }
    };
  }, [title, description, canonical, keywords, ogImage, JSON.stringify(jsonLd)]);
}
