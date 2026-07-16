import { useLocation } from 'react-router-dom';

export type SiteLocale = 'en' | 'ar';

export const isArabicPath = (pathname: string) => pathname === '/ar' || pathname.startsWith('/ar/');

export const stripLocalePrefix = (pathname: string) => pathname.replace(/^\/ar(?=\/|$)/, '') || '/';

export const localizePath = (pathname: string, locale: SiteLocale) => {
  const englishPath = stripLocalePrefix(pathname);
  return locale === 'ar' ? `/ar${englishPath === '/' ? '' : englishPath}` : englishPath;
};

export const useLocale = () => {
  const { pathname } = useLocation();
  const locale: SiteLocale = isArabicPath(pathname) ? 'ar' : 'en';
  return {
    locale,
    isArabic: locale === 'ar',
    pathname,
    englishPath: stripLocalePrefix(pathname),
    localizedPath: (path: string) => localizePath(path, locale),
  };
};
