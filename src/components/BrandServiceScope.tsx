import { LocalizedLink } from '@/components/LocalizedLink';
import { getServiceSprintBrand, getSprintServices } from '@/data/brandServiceSprint';

export function BrandServiceScope({ slug, isArabic }: { slug: string; isArabic: boolean }) {
  const content = getServiceSprintBrand(slug);
  if (!content) return null;
  const services = getSprintServices(slug, isArabic);
  return (
    <section className="brand-section border-t border-white/5 bg-black py-12 sm:py-20" aria-labelledby="brand-service-scope-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="brand-service-scope-title" className="text-2xl font-semibold sm:text-4xl">
          {isArabic ? `صيانة وإصلاح ${content.arabicName} في دبي` : 'Volkswagen maintenance, diagnostics and repair'}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-gray-300">
          {isArabic ? content.arabicModels : 'Volkswagen (VW) Golf, GTI, Golf R, Tiguan, Touareg, Passat and T-Roc service requests start with the model, year, mileage and history. ID electric-drive enquiries need a separate scope check; combustion-engine service and high-voltage repair are not assumed.'}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {services.map(service => (
            <article key={service.title} className="rounded-2xl border border-white/10 p-5 sm:p-6">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-300">{service.description}</p>
              <LocalizedLink to={service.path} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-burnt-orange underline">{service.label}</LocalizedLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
