import React from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

export const WhyChooseUs = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.why : null;
  const reasons = [
    { value: '2002', title: 'Established in Dubai', description: 'Serving vehicle owners from our Al Quoz workshop since 2002' },
    { value: 'Al Quoz', title: 'Dubai Workshop', description: 'Located in Al Quoz Industrial Area 3, Warehouses 11–15' },
    { value: 'Inspect', title: 'Start With the Vehicle', description: 'The reported concern and current condition guide the next step' },
    { value: 'Explain', title: 'Clear Repair Scope', description: 'Findings and proposed work are discussed before approval' },
  ];
  const displayedReasons = reasons.map((reason, index) => copy ? { ...reason, ...copy.reasons[index] } : reason);

  return (
    <section className="home-section border-y border-white/[0.08] bg-[#0c0d0e]">
      <div className="home-container">
        <Reveal className="max-w-4xl">
          <p className="home-kicker mb-4">{copy?.eyebrow ?? 'The DIGI-TEC standard'}</p>
          <h2 className="home-heading">{copy?.title ?? 'Experience shaped by a clear process.'}</h2>
          <p className="home-lead mt-6">
            {copy?.description ?? 'An independent Dubai workshop for maintenance, diagnostics, repair, body work and vehicle-specific performance projects, established in 2002.'}
          </p>
        </Reveal>

        <div className="mt-16 grid border-y border-white/[0.09] sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {displayedReasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06} className="border-b border-white/[0.09] p-6 sm:border-r lg:border-b-0 lg:p-8 lg:first:pl-0 lg:last:border-r-0">
              <p className="text-lg font-medium tracking-[-0.02em] text-burnt-orange">{reason.value}</p>
              <h3 className="mt-8 text-lg font-semibold text-white">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{reason.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-2 lg:items-start">
          <h3 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {copy?.facilityTitle ?? 'Our workshop in Al Quoz, Dubai'}
          </h3>
          <div>
            <p className="home-lead">{copy?.facilityText ?? 'Visit Digi-Tec Performance Center at Al Quoz Industrial Area 3, Warehouses 11–15. Contact the team with your vehicle details so the appropriate inspection or service can be arranged.'}</p>
            <div className="mt-10 divide-y divide-white/[0.09] border-y border-white/[0.09]">
              {[0, 1, 2].map((index) => (
                <div key={index} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <p className="text-sm font-medium text-white">{copy?.facilities[index].title ?? ['Advanced Diagnostics', 'Workshop Services', 'Project Planning'][index]}</p>
                  <p className="text-sm leading-6 text-white/42">{copy?.facilities[index].text ?? [
                    'Fault finding based on the reported concern and vehicle condition',
                    'Maintenance plus mechanical, electrical and body repair',
                    'Vehicle-specific discussion before performance or conversion work',
                  ][index]}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
