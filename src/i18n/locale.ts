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
  return `/ar${englishPath === '/' ? '' : englishPath}`;
};

export const englishPathForArabicPath = (path: string) => path.replace(/^\/ar(?=\/|$)/, '') || '/';
