import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { services } from '@/data/services';
import { Reveal } from '@/components/motion/Reveal';
import { useLocale } from '@/i18n/use-locale';
import { arHome, arServiceCards } from '@/i18n/ar-home';

const categoryOrder = ['Core Mechanical Services', 'Diagnostics & Electrical', 'Comfort Systems', 'Body & Visual Work'];
const grouped = categoryOrder.map((title) => ({ title, services: services.filter((service) => service.category === title) }));

export const ServiceGrid = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.services : null;

  return (
    <section className="home-section">
      <div className="home-container">
        <Reveal className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end lg:mb-24">
          <div>
            <p className="home-kicker mb-4">{copy?.eyebrow ?? 'Workshop services'}</p>
            <h2 className="home-heading max-w-2xl">{copy?.title ?? 'Complete care, clearly organised.'}</h2>
          </div>
          <p className="home-lead lg:justify-self-end">
            {copy?.description ?? 'Maintenance, diagnostics and repair for the systems that keep your vehicle performing as intended.'}
          </p>
        </Reveal>

        <div className="space-y-20 lg:space-y-28">
          {grouped.map((category, categoryIndex) => (
            <section key={category.title} aria-labelledby={`service-category-${categoryIndex}`}>
              <div className="mb-7 flex items-end justify-between gap-5 border-b border-white/[0.1] pb-5">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-burnt-orange">0{categoryIndex + 1}</span>
                  <h3 id={`service-category-${categoryIndex}`} className="text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
                    {copy?.categories[category.title] ?? category.title}
                  </h3>
                </div>
                <span className="hidden text-xs text-white/30 sm:block">{category.services.length} services</span>
              </div>

              <div className="horizontal-scroll-container -mx-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
                <div className="flex w-max gap-5 sm:gap-7">
                  {category.services.map((service) => (
                    <Link
                      key={service.slug}
                      to={service.slug === 'mercedes-repair-dubai' ? '/brands/mercedes-benz-service-dubai' : `/services/${service.slug}`}
                      className="group block w-[17rem] sm:w-[21rem]"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#18191a]">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                        />
                      </div>
                      <div className="pt-5">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-base font-semibold leading-snug tracking-[-0.015em] text-white transition-colors group-hover:text-burnt-orange sm:text-lg">
                            {isArabic ? arServiceCards[service.slug]?.title ?? service.title : service.title}
                          </h4>
                          <ArrowRight className={`mt-1 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-burnt-orange ${isArabic ? 'rotate-180' : ''}`} />
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/42">
                          {isArabic ? arServiceCards[service.slug]?.description ?? service.description : service.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 border-t border-white/[0.1] pt-8 text-right">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-burnt-orange">
            {copy?.viewAll ?? 'View all services'} <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
};
