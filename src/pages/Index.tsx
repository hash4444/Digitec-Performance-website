
import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { buildFAQ, buildWebPage, pageGraph, businessRef, websiteRef } from '@/lib/schema';
import { allFaqs } from '@/components/FAQ';
import Header from '@/components/Header';
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
