import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { arabicPathForEnglishPath, englishPathForArabicPath, LOCALE_STORAGE_KEY, localeMessages } from '@/i18n/locale';

type MenuItem = { name: string; href: string };

const primaryLinks: MenuItem[] = [
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Brands', href: '/brands' },
  { name: 'GAD Performance', href: '/tuning' },
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
          'fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md transition-all duration-300',
          isScrolled && 'shadow-2xl shadow-black/50',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 md:h-20">
            <Link to={isArabic ? '/ar' : '/'} className="z-10 flex-shrink-0" aria-label={isArabic ? 'الصفحة الرئيسية لديجي-تك' : 'DIGI-TEC home'}>
              <img
                src="/lovable-uploads/916789e0-b6fb-43d4-9d52-79899ce5a1c2.png"
                alt={isArabic ? 'مركز ديجي-تك بيرفورمانس' : 'DIGI-TEC Performance Center'}
                className="h-7 w-auto brightness-110 md:h-9"
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
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-charcoal/80 transition-all hover:bg-burnt-orange/20 lg:hidden"
              aria-label={isArabic ? 'فتح أو إغلاق القائمة' : 'Toggle menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5 text-off-white" /> : <Menu className="h-5 w-5 text-off-white" />}
            </button>
          </div>
        </div>
      </header>

      <div className={cn('fixed inset-0 top-16 z-40 transition-all duration-300 lg:hidden', isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0')}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMenus} />
        <div className={cn('relative max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-black/95 p-4 shadow-2xl transition-transform duration-300', isMenuOpen ? 'translate-y-0' : '-translate-y-full')}>
          <nav className="space-y-1" aria-label={isArabic ? 'التنقل عبر الهاتف' : 'Mobile navigation'}>
            {links.map((item) => <Link key={item.href} to={item.href} onClick={closeMenus} className="mobile-link">{item.name}</Link>)}
          </nav>
          <div className="mt-5 flex items-center gap-2 border-t border-white/10 px-4 pt-5 text-sm">
            <Link to={englishPath} onClick={() => { rememberLocale('en'); closeMenus(); }} className={cn('rounded-md px-2.5 py-1.5 font-bold', !isArabic ? 'bg-burnt-orange/15 text-burnt-orange' : 'text-gray-400')}>English</Link>
            <Link to={arabicPath} onClick={() => { rememberLocale('ar'); closeMenus(); }} className={cn('rounded-md px-2.5 py-1.5 font-bold', isArabic ? 'bg-burnt-orange/15 text-burnt-orange' : 'text-gray-400')}>العربية</Link>
          </div>
        </div>
      </div>

      <div className="h-16 md:h-20" />

      <style>{`
        .nav-link { color: rgb(245 245 245); font-size: 0.875rem; font-weight: 600; letter-spacing: 0.025em; padding: 0.5rem 0; transition: color 150ms ease; white-space: nowrap; }
        .nav-link:hover { color: #ff6b35; }
        .mobile-link { display: block; border-radius: 0.5rem; padding: 0.75rem 1rem; color: rgb(229 231 235); font-size: 1rem; font-weight: 600; transition: all 150ms ease; }
        .mobile-link:hover { background: rgba(255,255,255,.05); color: #ff6b35; }
      `}</style>
    </>
  );
};

export default Header;
