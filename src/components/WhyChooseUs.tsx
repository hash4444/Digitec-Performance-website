import React from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { CountUp } from '@/components/motion/CountUp';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

type Stat =
  | { value: number; suffix?: string; raw?: undefined; title: string; description: string }
  | { raw: string; value?: undefined; suffix?: undefined; title: string; description: string };

export const WhyChooseUs = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.why : null;
  const reasons: Stat[] = [
    {
      raw: '2002',
      title: 'Established in Dubai',
      description: 'Serving vehicle owners from our Al Quoz workshop since 2002',
    },
    {
      raw: 'Al Quoz',
      title: 'Dubai Workshop',
      description: 'Located in Al Quoz Industrial Area 3, Warehouses 11–15',
    },
    {
      raw: 'Inspect',
      title: 'Start With the Vehicle',
      description: 'The reported concern and current condition guide the next step',
    },
    {
      raw: 'Explain',
      title: 'Clear Repair Scope',
      description: 'Findings and proposed work are discussed before approval',
    },
  ];
  const displayedReasons = reasons.map((reason, index) => copy ? { ...reason, ...copy.reasons[index] } : reason);

  return (
    <section className="py-10 sm:py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <Reveal className="text-center mb-8 sm:mb-14 lg:mb-20">
          <span className="eyebrow mb-3 sm:mb-5">{copy?.eyebrow ?? 'The DIGI-TEC Standard'}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-5">
            {copy ? copy.title : <>Why Choose <span className="text-burnt-orange">D</span>IGI-TEC</>}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-4xl mx-auto leading-snug sm:leading-relaxed px-4">
            {copy?.description ?? <>An independent Dubai workshop for maintenance, diagnostics, repair, body work and vehicle-specific performance projects, established in 2002.</>}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-12 mb-8 sm:mb-14 lg:mb-20">
          {displayedReasons.map((reason, index) => (
            <Reveal key={reason.title} className="text-center group" delay={index * 0.1}>
              <div className="card-premium rounded-2xl p-3 sm:p-6 lg:p-8 mb-3 sm:mb-6 h-full">
                <div className="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-burnt-orange mb-1.5 sm:mb-4 tracking-tight tabular-nums">
                  {reason.raw ? (
                    reason.raw
                  ) : (
                    <CountUp value={reason.value} suffix={reason.suffix} />
                  )}
                </div>
                <h3 className="text-xs sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-4 text-white">{reason.title}</h3>
                <p className="text-gray-300 leading-snug sm:leading-relaxed text-xs sm:text-sm lg:text-base line-clamp-2 sm:line-clamp-none">{reason.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="card-premium rounded-2xl p-4 sm:p-8 lg:p-12 text-center">
          <h3 className="text-lg sm:text-3xl font-bold mb-3 sm:mb-6">
            {copy ? copy.facilityTitle : <>Our Workshop in <span className="text-burnt-orange">A</span>l Quoz, Dubai</>}
          </h3>
          <p className="text-sm sm:text-xl text-gray-300 mb-4 sm:mb-8 max-w-4xl mx-auto px-2 sm:px-4 leading-snug sm:leading-relaxed">
            {copy?.facilityText ?? <>Visit Digi-Tec Performance Center at Al Quoz Industrial Area 3, Warehouses 11–15. Contact the team with your vehicle details so the appropriate inspection or service can be arranged.</>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 text-sm">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 sm:p-6">
              <div className="font-semibold text-burnt-orange mb-1 sm:mb-2 text-sm sm:text-lg">{copy?.facilities[0].title ?? 'Advanced Diagnostics'}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{copy?.facilities[0].text ?? 'Fault finding based on the reported concern and vehicle condition'}</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 sm:p-6">
              <div className="font-semibold text-burnt-orange mb-1 sm:mb-2 text-sm sm:text-lg">{copy?.facilities[1].title ?? 'Workshop Services'}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{copy?.facilities[1].text ?? 'Maintenance plus mechanical, electrical and body repair'}</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 sm:p-6">
              <div className="font-semibold text-burnt-orange mb-1 sm:mb-2 text-sm sm:text-lg">{copy?.facilities[2].title ?? 'Project Planning'}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{copy?.facilities[2].text ?? 'Vehicle-specific discussion before performance or conversion work'}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
