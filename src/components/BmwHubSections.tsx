import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { BMW_ADDITIONAL_SERVICES, BMW_CORE_SERVICES, BMW_WHATSAPP_HREF, bmwServicePath } from '@/data/bmwHubContent';
import workshopServiceFloor from '@/assets/digitec-workshop-service-floor.jpg';

export const BmwBookingActions = () => (
  <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
    <a href={BMW_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary">
      <MessageCircle className="h-5 w-5 shrink-0" /> Book a BMW inspection on WhatsApp
    </a>
    <a href="tel:+97143402223" className="btn-secondary">
      <Phone className="h-5 w-5 shrink-0" /> Call the Al Quoz workshop
    </a>
  </div>
);

export const BmwBookingChecklist = () => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
    <h3 className="text-xl font-bold">What to send before booking</h3>
    <ul className="mt-4 space-y-2 text-base text-gray-300">
      {['BMW model and year', 'Current mileage', 'Warning lights, symptoms and when they occur', 'Preferred appointment day and time'].map((item) => (
        <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-burnt-orange" /><span>{item}</span></li>
      ))}
    </ul>
    <p className="mt-4 text-sm leading-relaxed text-gray-400">The team may ask for the VIN to confirm fitted systems and the appropriate inspection.</p>
  </div>
);

export const BmwCoreServices = () => (
  <section id="bmw-services" className="brand-section brand-section--services scroll-mt-24 border-t border-white/5 bg-black py-12 sm:py-20" aria-labelledby="bmw-services-heading">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="brand-section-heading mb-10 max-w-3xl">
        <p className="eyebrow mb-4">Maintenance, repairs and diagnosis</p>
        <h2 id="bmw-services-heading" className="text-3xl font-black sm:text-5xl">BMW service in Dubai, from routine care to fault finding</h2>
        <p className="mt-5 text-base leading-relaxed text-gray-300">Choose the concern you need help with. Each service page explains the inspection and repair options in more detail, with scope confirmed for your BMW.</p>
      </div>
      <div className="brand-services-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BMW_CORE_SERVICES.map((service) => (
          <article key={service.slug} className="card-premium flex flex-col rounded-2xl p-6">
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="mb-5 mt-3 text-base leading-relaxed text-gray-300">{service.description}</p>
            <Link to={bmwServicePath(service.slug)} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline">
              {service.label}<ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-white/10 p-6 sm:p-8">
        <h3 className="mb-3 text-xl font-bold">Need help choosing the right inspection?</h3>
        <p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300">Describe the service due, warning or symptom on WhatsApp. The workshop will confirm the next step and appointment availability.</p>
        <BmwBookingActions />
      </div>
      <div className="mt-10 border-t border-white/10 pt-8">
        <h3 className="text-xl font-bold">Bodywork and other BMW repairs</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-300">{BMW_ADDITIONAL_SERVICES[0].description} You can also ask about steering, exhaust, fuel-system or tyre concerns.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {BMW_ADDITIONAL_SERVICES.map((service) => <Link key={service.slug} to={bmwServicePath(service.slug)} className="inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline">{service.label}<ArrowRight className="h-4 w-4" /></Link>)}
        </div>
      </div>
    </div>
  </section>
);

export const BmwWorkshopProof = () => (
  <section className="brand-section brand-section--proof border-t border-white/5 bg-black py-12 sm:py-20" aria-labelledby="bmw-workshop-heading">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
      <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <img src={workshopServiceFloor} alt="BMW sedan alongside other customer vehicles on the DIGI-TEC service floor in Al Quoz, Dubai" loading="lazy" width="1086" height="1448" className="aspect-[4/3] w-full object-cover object-[center_68%]" />
        <figcaption className="p-5 text-sm leading-relaxed text-gray-300">A BMW on the DIGI-TEC service floor in Al Quoz. This workshop photograph is also featured in our <Link to="/about" className="font-semibold text-burnt-orange hover:underline">workshop overview</Link>.</figcaption>
      </figure>
      <div>
        <p className="eyebrow mb-4">An independent Dubai workshop since 2002</p>
        <h2 id="bmw-workshop-heading" className="text-3xl font-black sm:text-4xl">Your BMW workshop in Al Quoz</h2>
        <p className="mt-5 text-base leading-relaxed text-gray-300">Looking for an independent BMW service centre in Dubai? DIGI-TEC provides a workshop appointment where you can discuss the concern, review the findings and agree the next step with the team.</p>
        <ol className="mt-6 space-y-5 text-base leading-relaxed text-gray-300">
          <li><h3 className="font-bold text-off-white">1. Identify the vehicle and concern</h3><p>Model, year, mileage, VIN and service history guide the diagnostic route and any required access checks.</p></li>
          <li><h3 className="font-bold text-off-white">2. Inspect and explain the findings</h3><p>The reported symptom is checked against diagnostic evidence and physical testing before a repair is recommended.</p></li>
          <li><h3 className="font-bold text-off-white">3. Agree the work and parts</h3><p>Discuss proposed parts, fluids, scope and timing before authorising repairs. Genuine BMW, OE-supplier or suitable customer-approved options depend on the job and availability.</p></li>
        </ol>
        <a href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline"><MapPin className="h-5 w-5" /> Directions to Al Quoz Industrial Area 3</a>
      </div>
    </div>
  </section>
);
