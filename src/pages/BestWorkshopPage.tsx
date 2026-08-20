import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Phone, MessageCircle, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CtaAssurance } from '@/components/TrustBar';
import { useSeo } from '@/hooks/use-seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getBestWorkshopPage, bestWorkshopPages } from '@/data/bestWorkshopPages';
import {
  buildBreadcrumb,
  buildFAQ,
  buildService,
  buildWebPage,
  pageGraph,
  SITE_URL,
} from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { localizeBestWorkshopPageToArabic } from '@/i18n/ar-best-workshop';

const BestWorkshopPage: React.FC = () => {
  const { isArabic, localizedPath } = useLocale();
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/^\/+/, '').split('/')[0];
  const sourcePage = slug ? getBestWorkshopPage(slug) : undefined;
  const page = sourcePage && isArabic ? localizeBestWorkshopPageToArabic(sourcePage) : sourcePage;
  const url = `${SITE_URL}${isArabic ? '/ar' : ''}/${slug}`;

  const jsonLd = React.useMemo(() => {
    if (!page) return undefined;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `${SITE_URL}${isArabic ? '/ar' : '/'}` },
      { name: page.h1, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: page.h1,
      description: page.metaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      mainEntityId: `${url}#service`,
      primaryImage: page.brandLogo,
    });
    const faq = buildFAQ(url, page.faqs.map((f) => ({ question: f.q, answer: f.a })));
    const service = buildService({
      url,
      name: page.h1,
      serviceType: `${page.brandKeyword ?? page.brand ?? 'Luxury Car'} Workshop`,
      description: page.metaDescription,
      image: page.brandLogo,
      brand: page.brandKeyword ?? page.brand,
      offers: page.brandKeyword === 'Range Rover'
        ? ['Range Rover diagnostics', 'Range Rover air suspension repair', 'Range Rover service', 'Range Rover transmission repair']
        : undefined,
      areaServed: ['Dubai'],
    });
    return pageGraph([webPage, breadcrumb, service, ...(faq ? [faq] : [])]);
  }, [isArabic, page, url]);

  useSeo({
    title: page ? page.metaTitle : isArabic ? 'ورشة سيارات مستقلة في دبي | ديجي-تك' : 'Independent Car Workshop Dubai | Digi-Tec',
    description: page ? page.metaDescription : isArabic ? 'ورشة سيارات مستقلة ومتخصصة في دبي.' : 'Independent European and luxury car workshop in Dubai.',
    canonical: page ? url : `${SITE_URL}/`,
    noindex: !page,
    jsonLd,
  });

  if (!page) return <Navigate to={localizedPath('/')} replace />;

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
    isArabic ? `مرحباً ديجي-تك، أبحث عن ورشة متخصصة في ${page.brand ?? 'السيارات'} بدبي. هل يمكنكم مساعدتي؟` : `Hi Digi-Tec, I'm looking for an independent ${page.brand ?? 'car'} workshop in Dubai. Can you help?`,
  )}`;

  const otherPages = bestWorkshopPages
    .filter((p) => p.slug !== page.slug)
    .map((item) => (isArabic ? localizeBestWorkshopPageToArabic(item) : item));

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Breadcrumbs */}
      <nav aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'} className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-burnt-orange">{isArabic ? 'الرئيسية' : 'Home'}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-off-white font-semibold">{page.h1}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 relative z-10">
          {page.brandLogo && (
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 p-2 bg-white/90 rounded-full shadow-xl flex items-center justify-center">
                <img src={page.brandLogo} alt={isArabic ? `شعار ${page.brand}` : `${page.brand} logo`} className="w-full h-full object-contain" />
              </div>
              <span className="text-burnt-orange font-bold uppercase tracking-widest text-[11px] sm:text-sm">
                {isArabic ? `متخصصون في ${page.brand}` : `${page.brand} Specialists`}
              </span>
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-5 sm:mb-6 leading-tight">
            {page.h1}
          </h1>

          {/* Direct answer — quote-ready for AI assistants */}
          <p className="card-premium text-gray-200 text-base sm:text-lg leading-relaxed rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8">
            {page.directAnswer}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm sm:text-base text-gray-300">
            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-burnt-orange" /> {isArabic ? 'القوز، دبي' : 'Al Quoz, Dubai'}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="w-5 h-5" />
              {isArabic ? 'تواصل معنا عبر واتساب' : 'WhatsApp Us'}
            </a>
            <a href="tel:+97143402223" className="btn-secondary">
              <Phone className="w-5 h-5" />
              {isArabic ? 'اتصل على ‎+971 4 340 2223' : 'Call +971 4 340 2223'}
            </a>
          </div>
          <CtaAssurance className="mt-4" align="start" />
        </div>
      </section>

      {page.brandKeyword === 'Range Rover' && (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="card-premium rounded-2xl p-6 sm:p-8">
              <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest">Range Rover specialist hub</span>
              <h2 className="text-2xl sm:text-4xl font-black mt-3">Need Range Rover Repair or Service in Dubai?</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
                Explore Digi-Tec's main Range Rover workshop page for model coverage, common faults, JLR diagnostics and dedicated service pages for air suspension, transmission, AC, brakes, electrical systems and scheduled maintenance.
              </p>
              <Link to="/brands/range-rover-service-dubai" className="btn-primary mt-6">
                Visit Our Range Rover Workshop Page <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Workshop facts */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">
            {isArabic ? <>معلومات عن <span className="text-burnt-orange">ديجي-تك</span></> : <>About the <span className="text-burnt-orange">Workshop</span></>}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {page.whyList.map((item, i) => (
              <li key={i} className="card-premium flex items-start gap-3 rounded-2xl p-4 sm:p-5">
                <CheckCircle2 className="w-5 h-5 text-burnt-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Criteria table */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            {isArabic ? <>معايير اختيار <span className="text-burnt-orange">ورشة {page.brandKeyword ?? 'سيارات'}</span></> : <>What to Compare in a <span className="text-burnt-orange">{page.brandKeyword ?? 'Car'} Workshop</span></>}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            {isArabic ? 'معايير عملية يمكن مقارنتها قبل حجز الفحص أو الموافقة على العمل.' : 'Practical criteria to compare before booking an inspection or approving work.'}
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className={`w-full ${isArabic ? 'text-right' : 'text-left'}`}>
              <thead className="bg-charcoal/60 text-off-white text-sm sm:text-base">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">{isArabic ? 'المعيار' : 'Criterion'}</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">Digi-Tec</th>
                </tr>
              </thead>
              <tbody className="bg-black/50 text-sm sm:text-base">
                {page.criteria.map((c, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300">{c.criterion}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-off-white font-semibold">{c.digitec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10">
            {isArabic ? <>الأسئلة الشائعة عن ورشة <span className="text-burnt-orange">{page.brandKeyword ?? 'السيارات'} في دبي</span></> : <>{page.brandKeyword ?? 'Workshop'} in Dubai <span className="text-burnt-orange">FAQs</span></>}
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {page.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40">
                <AccordionTrigger className={`${isArabic ? 'text-right' : 'text-left'} text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5`}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">
            {isArabic ? <>أدلة الورش حسب <span className="text-burnt-orange">العلامة</span></> : <>Workshop Guides by <span className="text-burnt-orange">Brand</span></>}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {otherPages.map((p) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                className="card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                  {p.h1}
                </span>
                <ArrowRight className={`w-4 h-4 text-burnt-orange mt-3 ${isArabic ? 'rotate-180' : ''}`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BestWorkshopPage;
