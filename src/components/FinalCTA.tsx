import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

export const FinalCTA = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.cta : null;
  const steps = [
    { title: copy?.cards[0].title ?? 'Share the details', text: copy?.cards[0].text ?? 'Make, model, year and current concern' },
    { title: copy?.cards[1].title ?? 'Arrange the visit', text: copy?.cards[1].text ?? 'Choose the appropriate workshop inspection or service' },
    { title: copy?.cards[2].title ?? 'Review the scope', text: copy?.cards[2].text ?? 'Discuss findings and proposed work before approval' },
  ];

  return (
    <section className="home-section border-t border-white/[0.08] bg-[#101113]">
      <div className="home-container">
        <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="home-kicker mb-4">{copy?.eyebrow ?? 'Contact the workshop'}</p>
            <h2 className="home-heading max-w-3xl">{copy?.title ?? 'Tell us about your vehicle.'}</h2>
          </div>
          <div className="lg:pt-2">
            <p className="home-lead">{copy?.description ?? 'Share the make, model, year and the service or symptoms you want checked. The Digi-Tec team can help arrange the appropriate workshop visit.'}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to schedule a consultation at Digi-Tec Performance Center.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="home-button home-button-primary"
              >
                {copy?.schedule ?? 'Request an appointment'} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+97143402223" className="home-button home-button-secondary">
                <Phone className="h-4 w-4" /> {copy?.call ?? 'Call +971 4 340 2223'}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid border-y border-white/[0.09] sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="border-b border-white/[0.09] py-6 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 sm:first:pl-0">
              <span className="text-xs text-burnt-orange">0{index + 1}</span>
              <h3 className="mt-6 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/42">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
