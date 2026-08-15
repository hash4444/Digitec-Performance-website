
import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { buildFAQ, buildWebPage, pageGraph, businessRef, websiteRef } from '@/lib/schema';
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
          name: isArabic ? 'ديجي-تك — ورشة السيارات الفاخرة والألمانية في دبي' : 'Digi-Tec Performance Center — Luxury & German Car Workshop Dubai',
          description: isArabic ? 'ورشة مستقلة للسيارات الفاخرة والألمانية في دبي، متخصصة في مرسيدس وتطوير الأداء والتشخيص والبرمجة.' : 'Independent luxury and German car workshop in Dubai: Mercedes specialist, performance tuning, diagnostics and programming centre.',
          type: 'WebPage',
          primaryImage: 'https://digitecme.com/favicon-192x192.png',
        }),
        {
          '@type': 'ItemList',
          '@id': `${url}#coreServices`,
          name: isArabic ? 'الخدمات الأساسية' : 'Core capabilities',
          itemListElement: (isArabic ? [
            'إصلاح السيارات الفاخرة',
            'تطوير الأداء',
            'التخصص في مرسيدس',
            'مركز التشخيص والبرمجة',
            'ورشة سيارات في دبي',
          ] : [
            'Luxury Vehicle Repair',
            'Performance Tuning',
            'Mercedes Specialist',
            'Diagnostics & Programming Centre',
            'Dubai Automotive Workshop',
          ]).map((n, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: n,
          })),
        },
        // Enrich the sitewide WebSite with a SearchAction from the homepage.
        {
          '@type': 'WebSite',
          '@id': websiteRef['@id'],
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `https://digitecme.com${isArabic ? '/ar' : ''}/blog?s={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        },
        ...(displayedFaqs.length > 0 ? [buildFAQ(url, displayedFaqs)!] : []),
      ]),
    [displayedFaqs, isArabic, url],
  );

  useSeo({
    title: isArabic ? 'ديجي-تك دبي | مركز صيانة وأداء السيارات الفاخرة' : 'Digi-Tec Performance Center | Car Workshop Dubai',
    description: isArabic ? 'ديجي-تك مركز متخصص في صيانة وإصلاح وبرمجة السيارات الفاخرة في دبي. خبرة في مرسيدس وبي إم دبليو وأودي وفيراري وبورشه من ورشتنا في القوز.' : "Dubai's trusted luxury and German car workshop. Mercedes, BMW, Audi, Ferrari and Porsche repair, service and tuning. Call +971 4 340 2223.",
    canonical: url,
    jsonLd: homeGraph,
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
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
          ? 'مركز ديجي-تك بيرفورمانس ورشة مستقلة متخصصة في سيارات مرسيدس-بنز والسيارات الأوروبية الفاخرة في دبي، تأسست عام 2002 وتقع في القوز الصناعية 3. مع أكثر من عقدين من الخبرة، يقدم ديجي-تك خدمات سيارات شاملة مع تخصص قوي في سيارات مرسيدس-بنز، يغطي كل شيء من الصيانة الدورية والتشخيص بمستوى الوكالة إلى الإصلاحات الميكانيكية والكهربائية المعقدة، برمجة الوحدات، أعمال الهيكل، ترقيات السيارة وحلول الأداء. ورشتنا مجهزة بأنظمة تشخيص احترافية من الشركة المصنعة، بما في ذلك XENTRY لمرسيدس-بنز وISTA+ لبي إم دبليو وPIWIS 3 لبورشه وODIS لمجموعة VAG وأنظمة JLR، مما يتيح لفنيينا تشخيص وإصلاح السيارات الفاخرة الحديثة بدقة. وعلى الرغم من أن مرسيدس-بنز هي جوهر خبرتنا، تخدم ديجي-تك وتصلح أيضاً مجموعة واسعة من السيارات الأوروبية والفاخرة، بما فيها بي إم دبليو وأودي وبورشه ورينج روفر ولامبورغيني وفيراري ورولز-رويس وبنتلي ومازيراتي. كشريك رسمي لـ GAD Motors في الإمارات، توفر ديجي-تك أيضاً ضبط الأداء الاحترافي وتحسين السيارات للطرازات المدعومة. مركز ديجي-تك بيرفورمانس، القوز الصناعية 3، مستودعات 11 إلى 15، دبي، الإمارات. الاتصال أو واتساب: +971 4 340 2223.'
          : 'Digi-Tec Performance Centre is an independent Mercedes-Benz and European luxury car specialist in Dubai, established in 2002 and located in Al Quoz Industrial Area 3. With over two decades of experience, Digi-Tec provides comprehensive automotive services with a strong specialization in Mercedes-Benz vehicles, covering everything from routine maintenance and manufacturer-level diagnostics to complex mechanical and electrical repairs, module programming, bodywork, vehicle upgrades and performance solutions. Our workshop is equipped with professional manufacturer diagnostic systems, including Mercedes-Benz XENTRY, BMW ISTA+, Porsche PIWIS 3, VAG ODIS and JLR diagnostic platforms, allowing our technicians to accurately diagnose and repair modern luxury vehicles. While Mercedes-Benz is at the heart of our expertise, Digi-Tec also services and repairs a wide range of European and luxury vehicles, including BMW, Audi, Porsche, Range Rover, Lamborghini, Ferrari, Rolls-Royce, Bentley and Maserati. As the official GAD Motors partner in the UAE, Digi-Tec also provides professional performance tuning and vehicle optimization for supported models. Digi-Tec Performance Centre, Al Quoz Industrial Area 3, Warehouses 11 to 15, Dubai, UAE. Call or WhatsApp: +971 4 340 2223.'}
        facts={isArabic ? [
          'متخصصو مرسيدس-بنز في دبي بخبرة تشمل طرازات AMG ومايباخ ومرسيدس-بنز القياسية',
          'تأسست في دبي منذ عام 2002',
          'صيانة وخدمات وتشخيص وإصلاح كامل تحت سقف واحد',
          'تشخيص وإصلاح الأعطال الميكانيكية والكهربائية',
          'خدمات المحرك وناقل الحركة والتعليق والتبريد والفرامل',
          'تشخيص وبرمجة وترميز وحدة التحكم الإلكترونية والوحدات الإلكترية',
          'إصلاح الهيكل ودهان السيارة وترميم السيارات',
          'ترقيات الأداء والضبط للسيارات المدعومة',
          'معدات تشخيص بمستوى الوكالة تشمل XENTRY وISTA+ وPIWIS 3 وODIS وأنظمة JLR',
          'شرح نتائج الفحص والعمل المقترح قبل بدء الإصلاح',
          'شريك أداء GAD Motors الرسمي في الإمارات',
          'خبرة مع السيارات الأوروبية والفاخرة والرياضية وعالية الأداء',
        ] : [
          'Mercedes-Benz specialists in Dubai with experience across AMG, Maybach and standard Mercedes-Benz models',
          'Established in Dubai since 2002',
          'Complete servicing, maintenance, diagnostics and repair under one roof',
          'Mechanical and electrical fault diagnosis and repair',
          'Engine, transmission, suspension, cooling and braking system services',
          'ECU and electronic module diagnostics, coding and programming',
          'Body repair, paintwork and vehicle restoration',
          'Performance upgrades and tuning for supported vehicles',
          'Manufacturer-level diagnostic equipment including XENTRY, ISTA+, PIWIS 3, ODIS and JLR systems',
          'Inspection findings and recommended work explained before repairs begin',
          'Official GAD Motors UAE performance partner',
          'Experience with European, luxury, exotic and high-performance vehicles',
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
