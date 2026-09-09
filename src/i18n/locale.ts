import { isEnglishMercedesModelPath } from './mercedes-language';

export type Locale = 'en' | 'ar';

export const LOCALE_STORAGE_KEY = 'digitec-locale';

export const localeMessages = {
  en: {
    nav: { about: 'About Us', services: 'Services', brands: 'Brands', performance: 'GAD', vrx: 'VRX', blog: 'Blog', faq: 'FAQ', contact: 'Contact Us' },
    language: { english: 'English', arabic: 'العربية', menu: 'Language selection' },
  },
  ar: {
    nav: { home: 'الرئيسية', services: 'الخدمات', brands: 'العلامات', about: 'من نحن', performance: 'GAD', vrx: 'VRX', blog: 'المقالات', faq: 'الأسئلة الشائعة', contact: 'تواصل معنا' },
    language: { english: 'EN', arabic: 'العربية', menu: 'اختيار اللغة' },
  },
} as const;

export const arabicPathForEnglishPath = (path: string) => {
  const englishPath = path.replace(/^\/ar(?=\/|$)/, '') || '/';
  // The combined paint-correction hub has no published Arabic equivalent yet.
  if (englishPath === '/services/car-polishing-dubai') return '/ar/services';
  if (isEnglishMercedesModelPath(englishPath)) return '/ar/brands/mercedes-benz-service-dubai';
  // These published model pages have no Arabic equivalent. Use the real brand
  // hub instead of constructing a URL that falls through to the homepage.
  const modelHub = englishOnlyModelHubs.get(englishPath);
  if (modelHub) return `/ar/brands/${modelHub}-service-dubai`;
  return `/ar${englishPath === '/' ? '' : englishPath}`;
};

const englishOnlyModelHubs = new Map<string, string>([
  ...['a4', 'a6', 'q5', 'q7', 'q8', 'r8', 'rs3', 'rs6'].map(slug => [`/brands/audi-service-dubai/${slug}`, 'audi'] as [string, string]),
  ...['3-series', '5-series', 'm3', 'm4', 'm5', 'x5', 'x6'].map(slug => [`/brands/bmw-service-dubai/${slug}`, 'bmw'] as [string, string]),
  ...['296', '488', '812', 'f8-tributo', 'portofino', 'purosangue', 'roma', 'sf90'].map(slug => [`/brands/ferrari-service-dubai/${slug}`, 'ferrari'] as [string, string]),
  ...['718', '911/991', '911/992', '911/997', 'macan', 'taycan'].map(slug => [`/porsche/${slug}`, 'porsche'] as [string, string]),
]);

export const englishPathForArabicPath = (path: string) => path.replace(/^\/ar(?=\/|$)/, '') || '/';
