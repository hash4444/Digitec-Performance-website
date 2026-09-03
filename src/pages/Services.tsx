import React from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { AnswerBlock } from '@/components/AnswerBlock';
import { Footer } from '@/components/Footer';
import { TrustBar } from '@/components/TrustBar';
import { FinalCTA } from '@/components/FinalCTA';
import { PageIntro } from '@/components/PageIntro';

import { services } from '@/data/services';
import { buildBreadcrumb, buildWebPage, pageGraph } from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { arHome, arServiceCards } from '@/i18n/ar-home';

const categories = [
  'Core Mechanical Services',
  'Diagnostics & Electrical',
  'Comfort Systems',
  'Body & Visual Work',
];

const categoryHeadings: Record<string, string> = {
  'Core Mechanical Services': 'Core Mechanical Services in Dubai',
  'Diagnostics & Electrical': 'Diagnostics & Electrical Services in Dubai',
  'Comfort Systems': 'Car Comfort Systems in Dubai',
  'Body & Visual Work': 'Car Body, Paint & Visual Services in Dubai',
};

const Services = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/services`;
  const servicesGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: isArabic ? 'خدمات صيانة وإصلاح السيارات في دبي | ديجي-تك' : 'All Services | DIGI-TEC Performance Center Dubai',
          description: isArabic ? 'دليل خدمات السيارات في دبي من الإصلاح الميكانيكي والتشخيص إلى الهيكل وحماية الطلاء لدى مركز ديجي-تك.' : 'Full catalog of automotive services in Dubai — mechanical repair, diagnostics, body work, and paint protection at DIGI-TEC Performance Center.',
          type: 'CollectionPage',
          breadcrumbId: `${url}#breadcrumb`,
          mainEntityId: `${url}#servicelist`,
        }),
        buildBreadcrumb(url, [
          { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
          { name: isArabic ? 'الخدمات' : 'Services', url },
        ]),
        {
          '@type': 'ItemList',
          '@id': `${url}#servicelist`,
          name: isArabic ? 'الخدمات التي يقدمها مركز ديجي-تك' : 'Services offered by Digitec Performance Center',
          numberOfItems: services.filter((s) => s.slug !== 'mercedes-repair-dubai').length,
          itemListElement: services.filter((s) => s.slug !== 'mercedes-repair-dubai').map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://digitecme.com${isArabic ? '/ar' : ''}/services/${s.slug}`,
            name: isArabic ? arServiceCards[s.slug]?.title ?? s.title : s.title,
          })),
        },
      ]),
    [isArabic, url],
  );

  useSeo({
    title: isArabic ? 'خدمات صيانة وإصلاح السيارات في دبي | ديجي-تك' : 'All Services | DIGI-TEC Performance Center Dubai',
    description: isArabic
      ? 'اكتشف خدمات ديجي-تك لصيانة وإصلاح السيارات في دبي، من الميكانيكا والتشخيص إلى كهرباء السيارات والتكييف والهيكل وحماية الطلاء.'
      : 'Explore our full range of automotive services in Dubai — from mechanical repair and diagnostics to body work and paint protection. DIGI-TEC Performance Center.',
    canonical: url,
    jsonLd: servicesGraph,
  });

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />

      <PageIntro
        eyebrow={isArabic ? 'ما نقدمه' : 'What We Offer'}
        title={isArabic ? 'خدماتنا' : 'Our Services'}
        description={isArabic ? 'يعرض مركز ديجي-تك خدمات صيانة وفحص وإصلاح وبرمجة وأعمال هيكل وعناية بالسيارات من ورشته المستقلة في القوز، دبي. يمكن لمالكي السيارات الأوروبية والفاخرة وبعض السيارات الكهربائية واليومية إرسال رقم الهيكل وتفاصيل العطل أو الخدمة المطلوبة للتأكد من التغطية وتحديد نطاق الفحص المناسب قبل الموعد.' : 'Digi-Tec lists vehicle maintenance, inspection, repair, programming, bodywork and car-care services from its independent workshop in Al Quoz, Dubai. Owners of European, luxury, selected electric and everyday vehicles can share the VIN and requested service or symptoms so coverage and the appropriate inspection scope can be confirmed before an appointment.'}
      />
      <AnswerBlock
        question={isArabic ? 'ما الخدمات التي يقدمها ديجي-تك في دبي؟' : 'What car services does Digi-Tec offer in Dubai?'}
        answer={isArabic
          ? 'يقدم ديجي-تك في القوز، دبي الصيانة الدورية وتغيير الزيت، والتشخيص الإلكتروني، وإصلاح المحرك وناقل الحركة، والفرامل والتعليق والتوجيه، وإصلاح التكييف والكهرباء، والبرمجة والتكويد، وأعمال الهيكل والطلاء، وحماية الطلاء والسيراميك، وتطوير الأداء. يشمل ذلك مرسيدس وبي إم دبليو وأودي وبورشه والسيارات الفاخرة والكهربائية.'
          : 'Digi-Tec in Al Quoz, Dubai covers scheduled servicing and oil changes, electronic diagnostics, engine and transmission repair, brakes, suspension and steering, air conditioning and electrical repair, module coding and programming, body and paint work, paint protection film and ceramic coating, and performance tuning. Brands include Mercedes-Benz, BMW, Audi, Porsche, Ferrari, Lamborghini, Range Rover and luxury electric vehicles.'}
        facts={isArabic ? [
          'صفحات منفصلة للعلامات وفئات الإصلاح المعروضة',
          'تُحدد خيارات القطع حسب رقم الهيكل والإصلاح وعرض السعر المتفق عليه',
          'تُناقش نتائج الفحص ونطاق العمل المقترح قبل الموافقة',
        ] : [
          'Separate pages for the listed brands and repair categories',
          'Parts options are specified for the VIN, repair and agreed quotation',
          'Inspection findings and the proposed work scope are discussed before approval',
        ]}
      />

      <TrustBar className="mb-8 sm:mb-16" />

      {/* Services by Category */}
      <section className="pb-16 sm:pb-28">
        <div className="mx-auto max-w-[90rem] space-y-14 px-5 sm:space-y-20 sm:px-8 lg:px-12">
          {categories.map((cat) => {
            const items = services.filter((s) => s.category === cat && s.slug !== 'mercedes-repair-dubai');
            if (items.length === 0) return null;
            return (
              <div key={cat} className="border-t border-white/[0.09] pt-6 sm:pt-8">
                <h2 className="mb-6 max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-white sm:mb-9 sm:text-3xl">
                  {isArabic ? arHome.services.categories[cat] : categoryHeadings[cat]}
                </h2>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="group block overflow-hidden"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-white/[0.03]">
                        <img
                          src={s.image}
                          alt={isArabic ? arServiceCards[s.slug]?.title ?? s.title : s.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025] group-hover:opacity-90"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                          }}
                        />
                      </div>
                      <div className="pt-3 sm:pt-4">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-tight tracking-[-0.01em] transition-colors group-hover:text-burnt-orange sm:text-base lg:text-lg">
                          {isArabic ? arServiceCards[s.slug]?.title ?? s.title : s.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/45 sm:text-sm">
                          {isArabic ? arServiceCards[s.slug]?.description ?? s.description : s.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTA />

      <section className="border-t border-white/10 bg-black py-12 sm:py-16" aria-labelledby="local-garage-services">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <div className="mb-7 max-w-2xl">
            <p className="eyebrow mb-3">{isArabic ? 'طرق أخرى لمساعدتك' : 'More Ways We Can Help'}</p>
            <h2 id="local-garage-services" className="text-2xl font-semibold tracking-[-0.03em] sm:text-4xl">{isArabic ? <>اختر <span className="text-burnt-orange">دعم الورشة المناسب</span></> : <>Find the right <span className="text-burnt-orange">workshop support</span></>}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: '/services/garage-near-me-dubai', title: isArabic ? 'ورشة سيارات قريبة مني في دبي' : 'Garage Near Me in Dubai', text: isArabic ? 'اعثر على ديجي-تك في القوز للفحص والتشخيص والصيانة والإصلاح.' : 'Find DIGI-TEC in Al Quoz for inspections, diagnostics, maintenance and repair support.' },
              { href: '/services/roadside-assistance-dubai', title: isArabic ? 'المساعدة على الطريق' : 'Roadside Assistance', text: isArabic ? 'احصل على إرشاد آمن وتنسيق النقل وفحص لاحق داخل الورشة.' : 'Get safe next-step guidance, recovery coordination and a follow-up workshop inspection.' },
              { href: '/services/car-garage-dubai', title: isArabic ? 'كراج سيارات في دبي' : 'Car Garage Dubai', text: isArabic ? 'خدمات متكاملة للصيانة والإصلاح والتشخيص وسيارات الأداء.' : 'Explore our complete garage support for servicing, repairs, diagnostics and performance cars.' },
            ].map((page) => (
              <Link key={page.href} to={page.href} className="group border-t border-white/[0.1] py-6 transition-colors hover:border-burnt-orange/60">
                <h3 className="text-xl font-semibold tracking-[-0.02em] group-hover:text-burnt-orange">{page.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/48">{page.text}</p>
                <span className="mt-5 inline-block text-sm font-medium text-burnt-orange">{isArabic ? 'استكشف الخدمة ←' : 'Explore service →'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
