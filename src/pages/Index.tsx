
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
import { Reviews } from '@/components/Reviews';

import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';


const Index = () => {
  const url = 'https://digitecme.com/';
  const homeGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: 'Digi-Tec Performance Center — Luxury & German Car Workshop Dubai',
          description:
            'Independent luxury and German car workshop in Dubai: Mercedes specialist, performance tuning, diagnostics and programming centre.',
          type: 'WebPage',
          primaryImage: 'https://digitecme.com/favicon-192x192.png',
        }),
        {
          '@type': 'ItemList',
          '@id': `${url}#coreServices`,
          name: 'Core capabilities',
          itemListElement: [
            'Luxury Vehicle Repair',
            'Performance Tuning',
            'Mercedes Specialist',
            'Diagnostics & Programming Centre',
            'Dubai Automotive Workshop',
          ].map((n, i) => ({
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
              urlTemplate: 'https://digitecme.com/blog?s={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        },
        ...(allFaqs.length > 0 ? [buildFAQ(url, allFaqs)!] : []),
      ]),
    [],
  );

  useSeo({
    title: 'Digi-Tec Performance Center Dubai | Mercedes, Ferrari & Porsche Specialists',
    description: "Digi-Tec Performance Center, Dubai's trusted luxury and German car workshop. Mercedes, BMW, Audi, Ferrari, Porsche repair, service & tuning. 50,000+ cars served. Call +971 4 340 2223.",
    canonical: 'https://digitecme.com/',
    jsonLd: homeGraph,
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <div id="home">
        <Hero />
      </div>
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
      
    </div>
  );
};

export default Index;
