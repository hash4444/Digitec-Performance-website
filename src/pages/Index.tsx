
import React from 'react';
import { useSeo } from '@/hooks/use-seo';
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
  useSeo({
    title: 'Digi-Tec Performance Center Dubai | Mercedes, Ferrari & Porsche Specialists',
    description: "Digi-Tec Performance Center, Dubai's trusted luxury and German car workshop. Mercedes, BMW, Audi, Ferrari, Porsche repair, service & tuning. 50,000+ cars served. Call +971 4 340 2223.",
    canonical: 'https://digitecme.com/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Digi-Tec Performance Center',
        url: 'https://digitecme.com/',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://digitecme.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Digi-Tec Performance Center',
        alternateName: ['Digitec', 'DIGI-TEC', 'Digi Tec', 'Digitec Performance Center L.L.C.'],
        url: 'https://digitecme.com/',
        logo: 'https://digitecme.com/favicon-192x192.png',
        telephone: '+971 4 340 2223',
        sameAs: [
          'https://www.instagram.com/digitecperformance/',
          'https://www.facebook.com/digitecperformance',
        ],
      },
    ],
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
