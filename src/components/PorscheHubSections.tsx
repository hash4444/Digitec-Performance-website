import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { PORSCHE_ADDITIONAL_SERVICES, PORSCHE_HUB_SERVICES, PORSCHE_WHATSAPP_HREF, porscheServicePath } from '@/data/porscheHubContent';
import porscheGt3rsWorkshop from '@/assets/porsche-gt3rs-workshop-dubai.jpg';
import porscheWorkshop from '@/assets/porsche-workshop-dubai.jpg';

const PorscheBookingActions = ({ placement }: { placement: string }) => (
  <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
    <a href={PORSCHE_WHATSAPP_HREF} data-cta-placement={placement} target="_blank" rel="noopener noreferrer" className="btn-primary">
      <MessageCircle className="h-5 w-5 shrink-0" /> Request Porsche Service
    </a>
    <a href="tel:+97143402223" data-cta-placement={placement} className="btn-secondary">
      <Phone className="h-5 w-5 shrink-0" /> Call the Al Quoz workshop
    </a>
  </div>
);

const PorscheHubSections = () => (
  <>
    <section id="porsche-services" className="brand-section brand-section--services scroll-mt-24 border-t border-white/5 bg-black py-12 sm:py-20" aria-labelledby="porsche-services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-9 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <p className="eyebrow mb-4">Porsche workshop · Al Quoz Industrial Area 3</p>
            <h2 id="porsche-services-heading" className="max-w-3xl text-3xl font-black sm:text-5xl">Porsche service and repair, with a clear next step</h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-300">Whether your service is due or something feels wrong, start with the concern you need help with. DIGI-TEC is an independent Dubai workshop established in 2002. The team checks your Porsche and explains the proposed work before repairs are agreed.</p>
            <div className="mt-6"><PorscheBookingActions placement="porsche_services_intro" /></div>
          </div>
          <aside className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8" aria-labelledby="porsche-booking-checklist-heading">
            <h3 id="porsche-booking-checklist-heading" className="text-xl font-bold">What to send before booking</h3>
            <ul className="mt-5 space-y-3 text-base text-gray-300">
              {['Porsche model and year', 'Current mileage and available service history', 'Service needed, warning message or symptom', 'When the concern occurs', 'Preferred appointment day and time'].map((item) => (
                <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-burnt-orange" /><span>{item}</span></li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-gray-400">The team may ask for the VIN to confirm equipment, parts or diagnostic access. Appointment availability and the first inspection are confirmed before your visit.</p>
          </aside>
        </div>

        <div className="brand-services-grid grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PORSCHE_HUB_SERVICES.map((service) => (
            <article key={service.slug} className="card-premium flex min-w-0 flex-col rounded-2xl p-6">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mb-5 mt-3 text-base leading-relaxed text-gray-300">{service.description}</p>
              <Link to={porscheServicePath(service.slug)} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline">
                {service.label}<ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 p-6 sm:p-8">
          <h3 className="text-xl font-bold">Other Porsche repair enquiries</h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-300">Choose the relevant service for battery, steering, exhaust, fuel-system, bodywork or tyre concerns. Unsure where to start? Send the symptom and the team will help confirm the appropriate inspection.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {PORSCHE_ADDITIONAL_SERVICES.map((service) => (
              <Link key={service.slug} to={porscheServicePath(service.slug)} className="inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline">{service.label}<ArrowRight className="h-4 w-4 shrink-0" /></Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="porsche-workshop" className="brand-section brand-section--proof scroll-mt-24 border-t border-white/5 bg-charcoal/20 py-12 sm:py-20" aria-labelledby="porsche-workshop-heading">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="grid min-w-0 grid-cols-2 items-start gap-3 sm:gap-5">
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <img src={porscheGt3rsWorkshop} alt="Rear of a white Porsche GT3 RS with a DIGI-TEC plate inside the Al Quoz workshop" width="1200" height="1600" loading="lazy" className="h-auto w-full" />
            <figcaption className="p-4 text-sm leading-relaxed text-gray-300">Porsche GT3 RS inside DIGI-TEC.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <img src={porscheWorkshop} alt="Red Porsche in the foreground and a yellow Porsche beside a lift at DIGI-TEC in Dubai" width="787" height="1400" loading="lazy" className="h-auto w-full" />
            <figcaption className="p-4 text-sm leading-relaxed text-gray-300">Porsche cars on the workshop floor.</figcaption>
          </figure>
          <p className="col-span-2 text-sm leading-relaxed text-gray-400">See more of the facility in our <Link to="/about" className="font-semibold text-burnt-orange hover:underline">workshop overview</Link>.</p>
        </div>
        <div className="min-w-0">
          <p className="eyebrow mb-4">An independent Dubai workshop since 2002</p>
          <h2 id="porsche-workshop-heading" className="text-3xl font-black sm:text-4xl">Arrange your Porsche visit in Al Quoz</h2>
          <ol className="mt-6 space-y-6 text-base leading-relaxed text-gray-300">
            <li><h3 className="font-bold text-off-white">1. Discuss the service or concern</h3><p className="mt-1">Share your vehicle details and what you need checked. The team confirms the appropriate first inspection, available appointment and any diagnostic charge.</p></li>
            <li><h3 className="font-bold text-off-white">2. Inspect and explain the findings</h3><p className="mt-1">The reported symptom is assessed using relevant physical tests and supported diagnostic functions. A fault code alone is a starting point for investigation.</p></li>
            <li><h3 className="font-bold text-off-white">3. Review the repair estimate</h3><p className="mt-1">Discuss the proposed work, parts, fluids and expected timing before authorising repairs. Parts options and availability are confirmed for your Porsche.</p></li>
          </ol>
          <div className="mt-8"><PorscheBookingActions placement="porsche_workshop_section" /></div>
          <a href="https://maps.google.com/?q=DIGI-TEC+Performance+Centre+Al+Quoz+Dubai" data-cta-placement="porsche_workshop_directions" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline"><MapPin className="h-5 w-5 shrink-0" /> Find DIGI-TEC in Al Quoz Industrial Area 3</a>
        </div>
      </div>
    </section>
  </>
);

export default PorscheHubSections;
