import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { arabicPathForEnglishPath, englishPathForArabicPath, LOCALE_STORAGE_KEY, localeMessages } from '@/i18n/locale';

type MenuItem = { name: string; href: string };

const primaryLinks: MenuItem[] = [
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Brands', href: '/brands' },
  { name: 'GAD', href: '/tuning' },
  { name: 'VRX', href: '/vrx' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
];

const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
  'Hi DIGI-TEC, I would like to get in touch about my vehicle.',
)}`;

const THEME_STORAGE_KEY = 'digitec-color-theme';

type HeaderProps = {
  overlay?: boolean;
};

const Header = ({ overlay = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [colorTheme, setColorTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
  });
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isArabic = location.pathname === '/ar' || location.pathname.startsWith('/ar/');
  const isHome = location.pathname === '/' || location.pathname === '/ar';
  const englishPath = englishPathForArabicPath(location.pathname);
  const arabicPath = arabicPathForEnglishPath(location.pathname);
  const links = isArabic
    ? [
        { name: localeMessages.ar.nav.about, href: '/ar/about' },
        { name: localeMessages.ar.nav.services, href: '/ar/services' },
        { name: localeMessages.ar.nav.brands, href: '/ar/brands' },
        { name: localeMessages.ar.nav.performance, href: '/ar/tuning' },
        { name: localeMessages.ar.nav.vrx, href: '/ar/vrx' },
        { name: localeMessages.ar.nav.blog, href: '/ar/blog' },
        { name: localeMessages.ar.nav.faq, href: '/ar/faq' },
      ]
    : primaryLinks;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen && !isLanguageOpen) return undefined;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen, isLanguageOpen]);

  useEffect(() => {
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic]);

  useEffect(() => {
    const isLight = colorTheme === 'light';
    document.documentElement.classList.toggle('theme-light', isLight);
    document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
    window.localStorage.setItem(THEME_STORAGE_KEY, colorTheme);
  }, [colorTheme]);

  const rememberLocale = (locale: 'en' | 'ar') => localStorage.setItem(LOCALE_STORAGE_KEY, locale);

  return (
    <>
      <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-[70] px-3 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-7">
        <div className="relative mx-auto flex max-w-[112rem] items-center justify-between">
          <Link
            to={isArabic ? '/ar' : '/'}
            className="pointer-events-auto flex h-[60px] w-11 shrink-0 items-center justify-center overflow-visible transition-transform hover:-translate-y-0.5 sm:w-14 lg:h-[70px] lg:w-[86px]"
            aria-label={isArabic ? 'الصفحة الرئيسية لديجي-تك' : 'DIGI-TEC home'}
          >
            {colorTheme === 'dark' ? (
              <span className="relative block h-12 w-11 overflow-hidden sm:w-14 lg:h-[70px] lg:w-[86px]" aria-hidden="true">
                <img
                  src="/images/digitec-d-mark.png"
                  alt=""
                  className="absolute left-1/2 top-1/2 w-[220px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen sm:w-[250px] lg:w-[350px]"
                />
              </span>
            ) : (
              <span className="d-logo-mark block h-10 w-11 sm:h-11 sm:w-14 lg:h-[52px] lg:w-[70px]" aria-hidden="true" />
            )}
          </Link>

          <div className="pointer-events-auto relative w-fit lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <div className={cn(
              'flex h-[60px] w-fit items-center rounded-full border px-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.24)] transition-colors duration-300',
              colorTheme === 'light'
                ? 'border-black/[0.08] bg-white text-[#171819]'
                : 'border-white/[0.08] bg-[#171819] text-white',
              isScrolled && 'shadow-[0_14px_36px_rgba(0,0,0,0.36)]',
            )}>
              <button
                type="button"
                onClick={() => { setIsMenuOpen((open) => !open); setIsLanguageOpen(false); }}
                className={cn(
                  'flex h-11 shrink-0 items-center gap-2.5 rounded-full px-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange',
                  isArabic ? 'w-[104px]' : 'w-[92px]',
                  colorTheme === 'light' ? 'hover:bg-black/[0.05]' : 'hover:bg-white/[0.05]',
                )}
                aria-expanded={isMenuOpen}
                aria-controls="floating-navigation"
              >
                {isMenuOpen ? <X className="h-4 w-4 opacity-70" /> : <Menu className="h-4 w-4 opacity-70" />}
                <span>{isArabic ? 'القائمة' : 'Menu'}</span>
              </button>

              <button
                type="button"
                onClick={() => setColorTheme((theme) => theme === 'dark' ? 'light' : 'dark')}
                className={cn(
                  'mx-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange',
                  colorTheme === 'light' ? 'border-black/15 hover:bg-black/[0.05]' : 'border-white/18 hover:bg-white/[0.05]',
                )}
                aria-label={colorTheme === 'dark' ? (isArabic ? 'تفعيل المظهر الفاتح' : 'Use light theme') : (isArabic ? 'تفعيل المظهر الداكن' : 'Use dark theme')}
                title={colorTheme === 'dark' ? (isArabic ? 'المظهر الفاتح' : 'Light theme') : (isArabic ? 'المظهر الداكن' : 'Dark theme')}
              >
                {colorTheme === 'dark' ? <Sun className="h-[17px] w-[17px]" strokeWidth={1.6} /> : <Moon className="h-[17px] w-[17px]" strokeWidth={1.6} />}
              </button>

              <div className="relative ml-1">
                <button
                  type="button"
                  onClick={() => { setIsLanguageOpen((open) => !open); setIsMenuOpen(false); }}
                  className={cn(
                    'flex h-10 min-w-[70px] items-center justify-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange',
                    colorTheme === 'light' ? 'bg-black/[0.06] hover:bg-black/[0.1]' : 'bg-white/[0.08] hover:bg-white/[0.13]',
                  )}
                  aria-label={isArabic ? localeMessages.ar.language.menu : localeMessages.en.language.menu}
                  aria-expanded={isLanguageOpen}
                >
                  {isArabic ? 'AR' : 'EN'}
                  <ChevronDown className={cn('h-4 w-4 opacity-60 transition-transform', isLanguageOpen && 'rotate-180')} />
                </button>

                <div className={cn(
                  'absolute right-0 top-[calc(100%+0.75rem)] w-36 origin-top-right overflow-hidden rounded-2xl border p-1.5 shadow-2xl transition-all',
                  colorTheme === 'light' ? 'border-black/10 bg-white text-[#171819]' : 'border-white/10 bg-[#171922] text-white',
                  isLanguageOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0',
                )}>
                  <Link to={englishPath} onClick={() => rememberLocale('en')} className={cn('block rounded-xl px-4 py-2.5 text-sm font-semibold', colorTheme === 'light' ? 'hover:bg-black/[0.05]' : 'hover:bg-white/10', !isArabic && 'text-burnt-orange')}>English</Link>
                  <Link to={arabicPath} onClick={() => rememberLocale('ar')} className={cn('block rounded-xl px-4 py-2.5 text-sm font-semibold', colorTheme === 'light' ? 'hover:bg-black/[0.05]' : 'hover:bg-white/10', isArabic && 'text-burnt-orange')}>العربية</Link>
                </div>
              </div>
            </div>

            <nav
              id="floating-navigation"
              className={cn(
                'absolute right-0 top-[calc(100%+0.75rem)] w-[258px] max-w-[calc(100vw-1.5rem)] origin-top overflow-hidden rounded-[1.25rem] border p-2.5 shadow-2xl transition-all duration-200 lg:left-1/2 lg:right-auto lg:-translate-x-1/2',
                colorTheme === 'light' ? 'border-black/10 bg-white text-[#171819] shadow-black/15' : 'border-white/10 bg-[#171922] text-white shadow-black/60',
                isMenuOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-[0.98] opacity-0',
              )}
              aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}
            >
              <div className="grid grid-cols-2 gap-1">
                {links.map((item) => (
                  <Link key={item.href} to={item.href} className={cn('rounded-xl px-3 py-3 text-sm font-semibold opacity-75 transition-colors hover:opacity-100', colorTheme === 'light' ? 'hover:bg-black/[0.05]' : 'hover:bg-white/[0.07]')}>{item.name}</Link>
                ))}
              </div>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center rounded-2xl bg-burnt-orange px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600">
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
              </a>
            </nav>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'pointer-events-auto hidden min-h-[52px] min-w-[156px] items-center justify-center rounded-full border px-6 text-sm font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange lg:flex',
              colorTheme === 'light' ? 'border-black/[0.08] bg-white text-[#171819] hover:bg-[#f4f4f2]' : 'border-transparent bg-[#171819] text-white hover:bg-[#202122]',
            )}
          >
            {isArabic ? 'تواصل معنا' : 'Contact Us'}
          </a>
        </div>
      </header>

      {!isHome && !overlay && <div className="h-[98px] lg:h-[126px]" />}
    </>
  );
};

export default Header;
