import React from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { AnswerBlock } from '@/components/AnswerBlock';
import { Footer } from '@/components/Footer';
import { TrustBar } from '@/components/TrustBar';
import { FinalCTA } from '@/components/FinalCTA';

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
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative py-12 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="eyebrow mb-2 sm:mb-4">{isArabic ? 'ما نقدمه' : 'What We Offer'}</span>
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4">
            {isArabic ? 'خدماتنا' : 'Our Services'}
          </h1>
          <p className="text-gray-400 text-xs sm:text-lg max-w-4xl mx-auto leading-snug sm:leading-relaxed">
            {isArabic ? 'يقدم مركز ديجي-تك مجموعة متكاملة من خدمات السيارات لمختلف العلامات، تجمع بين خبرة بمستوى الوكالة وسرعة أكبر وتسعير واضح. تشمل خدماتنا الصيانة والتشخيص والإصلاحات الميكانيكية وتطوير الأداء والعناية بالسيارات الفاخرة واليومية، ومنها مرسيدس-بنز ومايباخ وأودي وبي إم دبليو وبورشه وفيراري ولامبورغيني وماكلارين وبنتلي ورنج روفر ورولز رويس، إضافة إلى علامات أخرى عديدة.' : 'At Digitec Performance Center, we offer a comprehensive range of automotive services tailored to meet the needs of most vehicle brands, combining dealership-level expertise with faster turnaround times and competitive pricing. Our workshop specializes in servicing, diagnostics, mechanical repairs, performance upgrades, and maintenance for premium and everyday vehicles, including Mercedes-Benz and Maybach, Audi, BMW, Porsche, Lamborghini, Aston Martin, Bugatti, Nissan, Ferrari, McLaren, Bentley, Range Rover and Land Rover, Rolls-Royce, Toyota, Rox, Jetour, Zeekr, BYD, and Hongqi. Whether you own a luxury supercar, a high-performance vehicle, or a daily driver, Digitec delivers reliable, high-quality automotive solutions designed to keep your car performing at its best.'}
          </p>
        </div>
      </section>
      <AnswerBlock
        question={isArabic ? 'ما الخدمات التي يقدمها ديجي-تك في دبي؟' : 'What car services does Digi-Tec offer in Dubai?'}
        answer={isArabic
          ? 'يقدم ديجي-تك في القوز، دبي الصيانة الدورية وتغيير الزيت، والتشخيص الإلكتروني، وإصلاح المحرك وناقل الحركة، والفرامل والتعليق والتوجيه، وإصلاح التكييف والكهرباء، والبرمجة والتكويد، وأعمال الهيكل والطلاء، وحماية الطلاء والسيراميك، وتطوير الأداء. يشمل ذلك مرسيدس وبي إم دبليو وأودي وبورشه والسيارات الفاخرة والكهربائية.'
          : 'Digi-Tec in Al Quoz, Dubai covers scheduled servicing and oil changes, electronic diagnostics, engine and transmission repair, brakes, suspension and steering, air conditioning and electrical repair, module coding and programming, body and paint work, paint protection film and ceramic coating, and performance tuning. Brands include Mercedes-Benz, BMW, Audi, Porsche, Ferrari, Lamborghini, Range Rover and luxury electric vehicles.'}
        facts={isArabic ? [
          'صفحات خدمة مخصصة لكل علامة وكل نوع إصلاح',
          'قطع أصلية أو من مورد المصنع أو بديل مناسب باعتماد المالك',
          'فحص أولاً ثم عرض سعر مكتوب قبل الموافقة',
        ] : [
          'Dedicated service pages for each brand and each repair type',
          'Genuine, OE supplier or a suitable customer approved alternative parts',
          'Inspection first, then a written scope before you approve the work',
        ]}
      />

      <TrustBar className="mb-8 sm:mb-16" />

      {/* Services by Category */}
      <section className="pb-12 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-16">
          {categories.map((cat) => {
            const items = services.filter((s) => s.category === cat && s.slug !== 'mercedes-repair-dubai');
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className={`text-lg sm:text-3xl font-bold mb-4 sm:mb-8 ${isArabic ? 'border-r-4 pr-3 sm:pr-4' : 'border-l-4 pl-3 sm:pl-4'} border-burnt-orange`}>
                  {isArabic ? arHome.services.categories[cat] : categoryHeadings[cat]}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="card-premium group rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={s.image}
                          alt={isArabic ? arServiceCards[s.slug]?.title ?? s.title : s.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                          }}
                        />
                      </div>
                      <div className="p-2.5 sm:p-4 lg:p-5">
                        <h3 className="font-bold text-[13px] sm:text-base lg:text-lg leading-tight group-hover:text-burnt-orange transition-colors line-clamp-2">
                          {isArabic ? arServiceCards[s.slug]?.title ?? s.title : s.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-7 max-w-2xl">
            <p className="eyebrow mb-3">{isArabic ? 'طرق أخرى لمساعدتك' : 'More Ways We Can Help'}</p>
            <h2 id="local-garage-services" className="text-2xl font-black sm:text-4xl">{isArabic ? <>اختر <span className="text-burnt-orange">دعم الورشة المناسب</span></> : <>Find the right <span className="text-burnt-orange">workshop support</span></>}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: '/services/garage-near-me-dubai', title: isArabic ? 'ورشة سيارات قريبة مني في دبي' : 'Garage Near Me in Dubai', text: isArabic ? 'اعثر على ديجي-تك في القوز للفحص والتشخيص والصيانة والإصلاح.' : 'Find DIGI-TEC in Al Quoz for inspections, diagnostics, maintenance and repair support.' },
              { href: '/services/roadside-assistance-dubai', title: isArabic ? 'المساعدة على الطريق' : 'Roadside Assistance', text: isArabic ? 'احصل على إرشاد آمن وتنسيق النقل وفحص لاحق داخل الورشة.' : 'Get safe next-step guidance, recovery coordination and a follow-up workshop inspection.' },
              { href: '/services/car-garage-dubai', title: isArabic ? 'كراج سيارات في دبي' : 'Car Garage Dubai', text: isArabic ? 'خدمات متكاملة للصيانة والإصلاح والتشخيص وسيارات الأداء.' : 'Explore our complete garage support for servicing, repairs, diagnostics and performance cars.' },
            ].map((page) => (
              <Link key={page.href} to={page.href} className="card-premium group rounded-2xl p-6 transition-all hover:border-burnt-orange/50">
                <h3 className="text-xl font-black group-hover:text-burnt-orange">{page.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{page.text}</p>
                <span className="mt-5 inline-block text-sm font-bold text-burnt-orange">{isArabic ? 'استكشف الخدمة ←' : 'Explore service →'}</span>
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
