
import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { buildFAQ, buildWebPage, pageGraph, businessRef } from '@/lib/schema';
import { allFaqs } from '@/components/FAQ';
import Header from '@/components/Header';
import { AnswerBlock } from '@/components/AnswerBlock';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { BrandsWeServe } from '@/components/BrandsWeServe';
import { ServiceGrid } from '@/components/ServiceGrid';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { TrustBar } from '@/components/TrustBar';

import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import MascotWidget from '@/components/MascotWidget';
import { useLocale } from '@/i18n/use-locale';
import { arFaqCategories } from '@/i18n/ar-home';


const Index = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : '/'}`;
  const displayedFaqs = isArabic ? arFaqCategories.flatMap((category) => category.faqs) : allFaqs;
  const homeGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: isArabic ? 'ديجي-تك — ورشة سيارات مستقلة في دبي' : 'Digi-Tec Performance Center — Independent Car Workshop Dubai',
          description: isArabic ? 'ورشة سيارات مستقلة في دبي تأسست عام 2002، وتعرض خدمات الفحص والصيانة والإصلاح والبرمجة وأعمال الهيكل واستشارات مشاريع الأداء.' : 'Independent Dubai car workshop established in 2002, with vehicle inspection, maintenance, repair, programming, bodywork and performance-project consultation services.',
          type: 'WebPage',
          primaryImage: 'https://digitecme.com/favicon-192x192.png',
          mainEntityId: businessRef['@id'],
        }),
        {
          '@type': 'ItemList',
          '@id': `${url}#coreServices`,
          name: isArabic ? 'الخدمات الأساسية' : 'Core capabilities',
          itemListElement: (isArabic ? [
            'إصلاح السيارات الفاخرة',
            'تطوير الأداء',
            'فحص وخدمة سيارات مرسيدس-بنز',
            'تشخيص وبرمجة السيارات',
            'ورشة سيارات في دبي',
          ] : [
            'Luxury Vehicle Repair',
            'Performance Tuning',
            'Mercedes-Benz Inspection and Service',
            'Vehicle Diagnostics and Programming',
            'Dubai Automotive Workshop',
          ]).map((n, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: n,
          })),
        },
        ...(displayedFaqs.length > 0 ? [buildFAQ(url, displayedFaqs)!] : []),
      ]),
    [displayedFaqs, isArabic, url],
  );

  useSeo({
    title: isArabic ? 'ديجي-تك | ورشة سيارات مستقلة في دبي منذ 2002' : 'Digi-Tec Performance Center | Independent Car Workshop Dubai',
    description: isArabic ? 'ورشة سيارات مستقلة في القوز بدبي منذ 2002 لخدمات الفحص والصيانة والإصلاح والبرمجة وأعمال الهيكل واستشارات مشاريع الأداء.' : 'Independent car workshop in Al Quoz, Dubai since 2002 for inspection, maintenance, repair, programming, bodywork and performance-project consultation. Call +971 4 340 2223.',
    canonical: url,
    jsonLd: homeGraph,
  });

  return (
    <div className="home-premium min-h-screen bg-black text-off-white">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <TrustBar />
      <WhatWeDo />
      <BrandsWeServe />
      <div id="services">
        <ServiceGrid />
      </div>

      <div id="about">
        <WhyChooseUs />
      </div>

      <AnswerBlock
        question={isArabic ? 'ما هو مركز ديجي-تك بيرفورمانس؟' : 'What is Digi-Tec Performance Centre?'}
        answer={isArabic
          ? 'مركز ديجي-تك بيرفورمانس ورشة سيارات مستقلة في دبي، تأسست عام 2002 وتقع في القوز الصناعية 3، المستودعات 11–15. تشمل فئات الخدمة المعروضة الصيانة الدورية وفحص السيارة وتشخيص الأعطال والإصلاحات الميكانيكية والكهربائية وخدمات المحرك وناقل الحركة والتعليق والتبريد والفرامل وبرمجة الوحدات وأعمال الهيكل والطلاء والعناية بالسيارة واستشارات مشاريع الأداء. يمكن مناقشة السيارة والأعراض والعمل المطلوب قبل الاتفاق على نطاق الإصلاح. للاتصال أو واتساب: +971 4 340 2223.'
          : 'Digi-Tec Performance Centre is an independent car workshop in Dubai, established in 2002 and located in Al Quoz Industrial Area 3, Warehouses 11–15. Listed service categories include scheduled maintenance, vehicle inspection and diagnostics, mechanical and electrical repair, engine, transmission, suspension, cooling and brake work, module programming, body repair, paintwork, detailing and performance-project consultation. Owners can discuss the vehicle, symptoms and requested work before agreeing the repair scope. Call or WhatsApp +971 4 340 2223.'}
        facts={isArabic ? [
          'تأسست في دبي منذ عام 2002',
          'فحص وخدمة سيارات مرسيدس-بنز والسيارات الأوروبية والفاخرة',
          'تشخيص وإصلاح الأعطال الميكانيكية والكهربائية',
          'خدمات المحرك وناقل الحركة والتعليق والتبريد والفرامل',
          'تشخيص وبرمجة وترميز وحدة التحكم الإلكترونية والوحدات الإلكترية',
          'إصلاح الهيكل ودهان السيارة وترميم السيارات',
          'استشارات مشاريع الأداء بحسب السيارة والاستخدام المطلوب',
          'شرح نتائج الفحص والعمل المقترح قبل بدء الإصلاح',
          'الموقع: القوز الصناعية 3، المستودعات 11–15، دبي',
          'الهاتف والواتساب: +971 4 340 2223',
        ] : [
          'Established in Dubai since 2002',
          'Inspection and service for Mercedes-Benz, European and luxury vehicles',
          'Mechanical and electrical fault diagnosis and repair',
          'Engine, transmission, suspension, cooling and braking system services',
          'ECU and electronic module diagnostics, coding and programming',
          'Body repair, paintwork and vehicle restoration',
          'Vehicle-specific performance-project consultation',
          'Inspection findings and recommended work explained before repairs begin',
          'Al Quoz Industrial Area 3, Warehouses 11–15, Dubai',
          'Call or WhatsApp +971 4 340 2223',
        ]}
      />

      <div id="faq">
        <FAQ />
      </div>
      <FinalCTA />
      <Footer />
      <MascotWidget />
    </div>
  );
};

export default Index;
