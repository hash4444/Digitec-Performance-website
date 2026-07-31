import React from 'react';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';
import { LocalizedLink } from '@/components/LocalizedLink';

const quickLinks = [
  { label: 'About Us', arabicLabel: 'من نحن', to: '/about' },
  { label: 'All Services', arabicLabel: 'جميع الخدمات', to: '/services' },
  { label: 'Brands We Service', arabicLabel: 'العلامات التي نخدمها', to: '/brands' },
  { label: 'GAD Performance', arabicLabel: 'أداء GAD', to: '/tuning' },
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
  const linkClass = 'block py-1.5 text-sm text-gray-400 transition-colors hover:text-burnt-orange';

  return (
    <footer className="border-t border-gray-800/50 bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.35fr_0.9fr_1.05fr_1.1fr] xl:gap-8">
          <section aria-label={isArabic ? 'مركز ديجي-تك بيرفورمانس' : 'DIGI-TEC Performance Center'}>
            <LocalizedLink to="/" className="inline-block">
              <img
                src="/lovable-uploads/916789e0-b6fb-43d4-9d52-79899ce5a1c2.png"
                alt={isArabic ? 'مركز ديجي-تك بيرفورمانس' : 'DIGI-TEC Performance Center'}
                className="h-9 w-auto brightness-110"
              />
            </LocalizedLink>
            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-300">
              {copy?.description ?? 'Independent luxury and performance car workshop in Al Quoz, Dubai. Specialist diagnostics, repair, maintenance and performance upgrades since 2002.'}
            </p>
            <a
              href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Warehouse+No.11-15+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-burnt-orange transition-colors hover:text-white"
            >
              {isArabic ? 'احصل على الاتجاهات إلى ورشتنا ←' : 'Get directions to our workshop →'}
            </a>
          </section>

          <nav aria-label={isArabic ? 'روابط سريعة' : 'Quick links'}>
            <h2 className="text-base font-black uppercase tracking-wide text-off-white">{isArabic ? 'روابط سريعة' : 'Quick Links'}</h2>
            <div className="mt-4">
              {quickLinks.map((link) => (
                <LocalizedLink key={link.to} to={link.to} className={linkClass}>
                  {isArabic ? link.arabicLabel : link.label}
                </LocalizedLink>
              ))}
            </div>
          </nav>

          <nav aria-label={isArabic ? 'خدمات مختارة' : 'Selected services'}>
            <h2 className="text-base font-black uppercase tracking-wide text-off-white">{isArabic ? 'خدمات مختارة' : 'Popular Services'}</h2>
            <div className="mt-4">
              {serviceLinks.map((link) => (
                <LocalizedLink key={link.to} to={link.to} className={linkClass}>
                  {isArabic ? link.arabicLabel : link.label}
                </LocalizedLink>
              ))}
            </div>
          </nav>

          <section aria-label={copy?.contact ?? 'Contact'}>
            <h2 className="text-base font-black uppercase tracking-wide text-off-white">{copy?.contact ?? 'Contact'}</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-gray-300">
              <p><span className="block font-semibold text-off-white">{isArabic ? 'ورشة دبي' : 'Dubai Workshop'}</span>{isArabic ? <>منطقة القوز الصناعية 3<br />مستودع رقم 11–15، دبي، الإمارات</> : <>Al Quoz Industrial Area 3<br />Warehouse No. 11–15, Dubai, UAE</>}</p>
              <p><span className="block font-semibold text-off-white">{isArabic ? 'ساعات العمل' : 'Working Hours'}</span>{isArabic ? <>الاثنين–الجمعة: 8 صباحاً–6:30 مساءً<br />السبت: 8 صباحاً–2 مساءً</> : <>Monday–Friday: 8:00 AM–6:30 PM<br />Saturday: 8:00 AM–2:00 PM</>}</p>
              <p><a href="tel:+97143402223" className="font-semibold text-off-white transition-colors hover:text-burnt-orange">+971 4 340 2223</a><br /><a href="mailto:info@digitecme.com" className="transition-colors hover:text-burnt-orange">info@digitecme.com</a></p>
            </div>
            <div className="mt-5 flex gap-3" aria-label={isArabic ? 'حسابات التواصل الاجتماعي' : 'Social media'}>
              <a href="https://www.instagram.com/digi_tec/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-bold text-gray-300 transition-colors hover:border-burnt-orange hover:text-burnt-orange" aria-label={isArabic ? 'ديجي-تك على إنستغرام' : 'DIGI-TEC on Instagram'}>IG</a>
              <a href="https://www.facebook.com/Digitecme/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-bold text-gray-300 transition-colors hover:border-burnt-orange hover:text-burnt-orange" aria-label={isArabic ? 'ديجي-تك على فيسبوك' : 'DIGI-TEC on Facebook'}>FB</a>
              <a href="https://www.youtube.com/@gad-motors-officialchannel8804" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-bold text-gray-300 transition-colors hover:border-burnt-orange hover:text-burnt-orange" aria-label={isArabic ? 'ديجي-تك على يوتيوب' : 'DIGI-TEC on YouTube'}>YT</a>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-800/50 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
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
