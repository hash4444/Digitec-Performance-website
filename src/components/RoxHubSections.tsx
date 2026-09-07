import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { ROX_CORE_SERVICES } from '@/data/roxHubContent';

export const RoxHubSections = () => (
  <>
    <section className="brand-section border-t border-white/5 bg-black py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="brand-section-heading mb-10 text-center sm:mb-14">
          <p className="eyebrow mb-4">ROX 01 service support in Al Quoz</p>
          <h2 className="text-2xl font-black sm:text-4xl lg:text-5xl">Start with the <span className="text-burnt-orange">right ROX 01 concern</span></h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">Each focused page covers one commercial service intent. This hub remains the place for broader ROX 01 service, repair and workshop enquiries.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROX_CORE_SERVICES.map((service) => (
            <Link key={service.path} to={service.path} className="card-premium group rounded-2xl p-6 sm:p-7">
              <h3 className="text-lg font-bold text-white transition-colors group-hover:text-burnt-orange sm:text-xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">Explore this ROX 01 service <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section className="brand-section border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-premium rounded-2xl p-6 sm:p-8">
          <p className="eyebrow mb-4">Before you book</p>
          <h2 className="text-2xl font-black sm:text-3xl">What to send for a ROX 01 inspection</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base">
            {['Model year and mileage', 'Warning message, symptom or service request', 'Whether the concern affects driving, charging, cooling or a comfort feature', 'Preferred appointment time'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />{item}</li>)}
          </ul>
        </div>
        <div className="card-premium flex flex-col justify-center rounded-2xl p-6 sm:p-8">
          <p className="eyebrow mb-4">Vehicle-specific scope</p>
          <h2 className="text-2xl font-black">Book a ROX 01 inspection</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">Send the basics first so the Al Quoz workshop can prepare for the right inspection. Diagnostic access, parts and final repair scope are confirmed from the vehicle.</p>
          <a href="https://wa.me/97143402223?text=Hi%20Digi-Tec%2C%20I%20would%20like%20to%20book%20a%20ROX%2001%20inspection.%0A%0AModel%20year%20and%20mileage%3A%20%0AWarning%20or%20symptom%3A%20%0APreferred%20appointment%20time%3A%20" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6"><MessageCircle className="h-5 w-5" />Book on WhatsApp</a>
          <a href="tel:+97143402223" className="mt-4 text-sm font-semibold text-burnt-orange hover:text-off-white">Call the Al Quoz workshop</a>
        </div>
      </div>
    </section>
  </>
);
