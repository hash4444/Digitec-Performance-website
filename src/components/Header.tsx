import React, { useEffect, useState } from 'react';
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
  { name: 'Contact Us', href: '/about#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isArabic = location.pathname === '/ar' || location.pathname.startsWith('/ar/');
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
        { name: localeMessages.ar.nav.contact, href: '/ar/about#contact' },
      ]
    : primaryLinks;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic]);

  const closeMenus = () => {
    setIsMenuOpen(false);
  };

  const rememberLocale = (locale: 'en' | 'ar') => localStorage.setItem(LOCALE_STORAGE_KEY, locale);

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-[70] border-b border-white/10 bg-[#101113]/95 backdrop-blur-md transition-all duration-300',
          isScrolled && 'shadow-2xl shadow-black/50',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 md:h-20">
            <Link to={isArabic ? '/ar' : '/'} className="z-10 min-w-0" aria-label={isArabic ? 'الصفحة الرئيسية لديجي-تك' : 'DIGI-TEC home'}>
              <img
                src="/lovable-uploads/916789e0-b6fb-43d4-9d52-79899ce5a1c2.png"
                alt={isArabic ? 'مركز ديجي-تك بيرفورمانس' : 'DIGI-TEC Performance Center'}
                className="h-auto w-[clamp(10rem,56vw,15rem)] max-w-full brightness-110 md:h-9 md:w-auto"
              />
            </Link>

            <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
              {links.map((link) => (
                <Link key={link.href} to={link.href} className="nav-link">{link.name}</Link>
              ))}
            </nav>

            <div className={`hidden items-center gap-2 ${isArabic ? 'border-r pr-4' : 'border-l pl-4'} border-white/10 lg:flex`} aria-label={isArabic ? localeMessages.ar.language.menu : localeMessages.en.language.menu}>
              <Link to={englishPath} onClick={() => rememberLocale('en')} className={cn('rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors', !isArabic ? 'bg-burnt-orange/15 text-burnt-orange' : 'text-gray-400 hover:text-off-white')}>EN</Link>
              <Link to={arabicPath} onClick={() => rememberLocale('ar')} className={cn('rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors', isArabic ? 'bg-burnt-orange/15 text-burnt-orange' : 'text-gray-400 hover:text-off-white')}>العربية</Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] transition-colors hover:border-burnt-orange/60 hover:bg-burnt-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange lg:hidden"
              aria-label={isMenuOpen ? (isArabic ? 'إغلاق القائمة' : 'Close menu') : (isArabic ? 'فتح القائمة' : 'Open menu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="relative block h-5 w-6" aria-hidden="true">
                <span
                  className={cn(
                    'absolute left-0 top-[5px] h-0.5 w-6 rounded-full bg-off-white transition-transform duration-300 ease-out',
                    isMenuOpen && 'translate-y-[5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-[15px] h-0.5 w-6 rounded-full bg-off-white transition-transform duration-300 ease-out',
                    isMenuOpen && '-translate-y-[5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-navigation" className={cn('fixed inset-0 top-16 z-[60] transition-all duration-300 md:top-20 lg:hidden', isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0')}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMenus} />
        <div className={cn('relative h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#101113]/98 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-2xl transition-transform duration-300 md:h-[calc(100dvh-5rem)] sm:px-6', isMenuOpen ? 'translate-y-0' : '-translate-y-full')}>
          <nav className="mx-auto max-w-xl space-y-1.5" aria-label={isArabic ? 'التنقل عبر الهاتف' : 'Mobile navigation'}>
            {links.map((item) => <Link key={item.href} to={item.href} onClick={closeMenus} className="mobile-link">{item.name}</Link>)}
          </nav>
          <div className="mx-auto mt-6 flex max-w-xl items-center gap-2 border-t border-white/10 px-3 pt-5 text-sm">
            <Link to={englishPath} onClick={() => { rememberLocale('en'); closeMenus(); }} className={cn('rounded-md px-2.5 py-1.5 font-bold', !isArabic ? 'bg-burnt-orange/15 text-burnt-orange' : 'text-gray-400')}>English</Link>
            <Link to={arabicPath} onClick={() => { rememberLocale('ar'); closeMenus(); }} className={cn('rounded-md px-2.5 py-1.5 font-bold', isArabic ? 'bg-burnt-orange/15 text-burnt-orange' : 'text-gray-400')}>العربية</Link>
          </div>
        </div>
      </div>

      <div className="h-16 md:h-20" />

      <style>{`
        .nav-link { color: rgb(245 245 245); font-size: 0.875rem; font-weight: 600; letter-spacing: 0.025em; padding: 0.5rem 0; transition: color 150ms ease; white-space: nowrap; }
        .nav-link:hover { color: #ff6b35; }
        .mobile-link { display: flex; min-height: 3rem; align-items: center; border-radius: 0.625rem; padding: 0.75rem 0.875rem; color: rgb(229 231 235); font-size: 1.05rem; font-weight: 650; transition: all 150ms ease; }
        .mobile-link:hover { background: rgba(255,255,255,.05); color: #ff6b35; }
      `}</style>
    </>
  );
};

export default Header;
