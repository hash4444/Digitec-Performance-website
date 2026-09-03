import React from 'react';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';
import { LocalizedLink } from '@/components/LocalizedLink';

const quickLinks = [
  { label: 'About Us', arabicLabel: 'من نحن', to: '/about' },
  { label: 'All Services', arabicLabel: 'جميع الخدمات', to: '/services' },
  { label: 'Brands We Service', arabicLabel: 'العلامات التي نخدمها', to: '/brands' },
  { label: 'Performance Tuning', arabicLabel: 'تطوير الأداء', to: '/tuning' },
  { label: 'VRX', arabicLabel: 'VRX', to: '/vrx' },
  { label: 'Workshop Guides', arabicLabel: 'دليل الورشة', to: '/blog' },
];

const serviceLinks = [
  { label: 'Mercedes Repair', arabicLabel: 'إصلاح مرسيدس', to: '/brands/mercedes-benz-service-dubai' },
  { label: 'Diagnostics & Programming', arabicLabel: 'التشخيص والبرمجة', to: '/services/car-diagnostics-dubai' },
  { label: 'Oil Change Service', arabicLabel: 'تغيير الزيت', to: '/services/oil-change-dubai' },
  { label: 'Transmission Repair', arabicLabel: 'إصلاح ناقل الحركة', to: '/services/transmission-repair-dubai' },
  { label: 'Brake Repair', arabicLabel: 'إصلاح الفرامل', to: '/services/brake-repair-dubai' },
  { label: 'Performance Tuning', arabicLabel: 'تطوير الأداء', to: '/tuning' },
];

export const Footer = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.footer : null;
  const linkClass = 'block py-1.5 text-sm text-white/45 transition-colors hover:text-white';

  return (
    <footer className="border-t border-white/[0.08] bg-[#0b0c0d] py-16 sm:py-20">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_1fr_1.1fr] xl:gap-12">
          <section aria-label={isArabic ? 'مركز ديجي-تك بيرفورمانس' : 'DIGI-TEC Performance Center'}>
            <LocalizedLink to="/" className="inline-block">
              <img
                src="/lovable-uploads/916789e0-b6fb-43d4-9d52-79899ce5a1c2.png"
                alt={isArabic ? 'مركز ديجي-تك بيرفورمانس' : 'DIGI-TEC Performance Center'}
                className="h-9 w-auto brightness-110"
              />
            </LocalizedLink>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
              {copy?.description ?? 'Independent luxury and performance car workshop in Al Quoz, Dubai. Specialist diagnostics, repair, maintenance and performance upgrades since 2002.'}
            </p>
            <a
              href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-white transition-colors hover:text-burnt-orange"
            >
              {isArabic ? 'احصل على الاتجاهات إلى ورشتنا ←' : 'Get directions to our workshop →'}
            </a>
          </section>

          <nav aria-label={isArabic ? 'روابط سريعة' : 'Quick links'}>
            <h2 className="text-sm font-semibold text-off-white">{isArabic ? 'روابط سريعة' : 'Quick Links'}</h2>
            <div className="mt-5">
              {quickLinks.map((link) => (
                <LocalizedLink key={link.to} to={link.to} className={linkClass}>
                  {isArabic ? link.arabicLabel : link.label}
                </LocalizedLink>
              ))}
            </div>
          </nav>

          <nav aria-label={isArabic ? 'خدمات مختارة' : 'Selected services'}>
            <h2 className="text-sm font-semibold text-off-white">{isArabic ? 'خدمات مختارة' : 'Popular Services'}</h2>
            <div className="mt-5">
              {serviceLinks.map((link) => (
                <LocalizedLink key={link.to} to={link.to} className={linkClass}>
                  {isArabic ? link.arabicLabel : link.label}
                </LocalizedLink>
              ))}
            </div>
          </nav>

          <section aria-label={copy?.contact ?? 'Contact'}>
            <h2 className="text-sm font-semibold text-off-white">{copy?.contact ?? 'Contact'}</h2>
            <div className="mt-5 space-y-5 text-sm leading-6 text-white/45">
              <p><span className="block font-semibold text-off-white">{isArabic ? 'ورشة دبي' : 'Dubai Workshop'}</span>{isArabic ? <>منطقة القوز الصناعية 3<br />دبي، الإمارات</> : <>Al Quoz Industrial Area 3<br />Dubai, UAE</>}</p>
              <p><a href="tel:+97143402223" className="font-semibold text-off-white transition-colors hover:text-burnt-orange">+971 4 340 2223</a><br /><a href="mailto:info@digitecme.com" className="transition-colors hover:text-burnt-orange">info@digitecme.com</a></p>
            </div>
            <div className="mt-5 flex gap-3" aria-label={isArabic ? 'حسابات التواصل الاجتماعي' : 'Social media'}>
              <a href="https://www.instagram.com/digi_tec/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/45 transition-colors hover:text-white" aria-label={isArabic ? 'ديجي-تك على إنستغرام' : 'DIGI-TEC on Instagram'}>Instagram</a>
              <a href="https://www.facebook.com/Digitecme/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/45 transition-colors hover:text-white" aria-label={isArabic ? 'ديجي-تك على فيسبوك' : 'DIGI-TEC on Facebook'}>Facebook</a>
            </div>
          </section>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-7 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
          <p>{isArabic ? <>© 2026 مركز <span className="text-burnt-orange">ديجي-تك</span> بيرفورمانس. {copy?.rights}</> : <>© 2026 <span className="text-burnt-orange">D</span>IGI-TEC Performance Center. All rights reserved.</>}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <LocalizedLink to="/faq" className="transition-colors hover:text-burnt-orange">{isArabic ? 'الأسئلة الشائعة' : 'FAQ'}</LocalizedLink>
            <LocalizedLink to="/sitemap" className="transition-colors hover:text-burnt-orange">{copy?.sitemap ?? 'Sitemap'}</LocalizedLink>
            <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-burnt-orange">{copy?.privacy ?? 'Privacy Policy'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
