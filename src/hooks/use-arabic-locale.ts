import { useEffect } from 'react';

export function useArabicLocale(arabicUrl: string, englishUrl: string) {
  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';

    const addAlternate = (hrefLang: string, href: string) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hrefLang;
      link.href = href;
      link.setAttribute('data-arabic-locale', hrefLang);
      document.head.appendChild(link);
      return link;
    };

    const ar = addAlternate('ar-AE', arabicUrl);
    const en = addAlternate('en-AE', englishUrl);
    const fallback = addAlternate('x-default', englishUrl);

    return () => {
      [ar, en, fallback].forEach((link) => link.remove());
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, [arabicUrl, englishUrl]);
}
