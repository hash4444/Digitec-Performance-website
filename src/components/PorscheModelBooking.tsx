import { MapPin, MessageCircle, Phone } from 'lucide-react';
import BrandBookingForm from '@/components/BrandBookingForm';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { PORSCHE_HUB_PATH } from '@/data/porscheArchitecture';

export default function PorscheModelBooking({ modelName, whatsappHref }: { modelName: string; whatsappHref: string }) {
  return (
    <section id="porsche-model-booking" aria-labelledby="porsche-model-booking-heading" className="scroll-mt-24 border-y border-white/10 bg-charcoal/20 py-12 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <p className="eyebrow mb-4">Independent Porsche workshop · Al Quoz, Dubai</p>
          <h2 id="porsche-model-booking-heading" className="text-3xl font-black sm:text-4xl">Arrange your {modelName} service or repair</h2>
          <p className="mt-5 text-base leading-relaxed text-gray-300">Tell the team your model year, mileage, available service history and the maintenance due or concern you want checked. Include the warning text and when the symptom occurs if relevant.</p>
          <p className="mt-4 text-base leading-relaxed text-gray-300">The workshop confirms the appropriate first inspection, any diagnostic charge and appointment availability. A repair estimate may require inspecting the vehicle; review the work, parts and expected timing before approval.</p>
          <div className="mt-6 flex flex-col flex-wrap gap-3 sm:flex-row">
            <a href={whatsappHref} data-cta-placement="porsche_model_booking" target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5 shrink-0" /> WhatsApp the workshop</a>
            <a href="tel:+97143402223" data-cta-placement="porsche_model_booking" className="btn-secondary"><Phone className="h-5 w-5 shrink-0" /> Call +971 4 340 2223</a>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-gray-400"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Al Quoz Industrial Area 3, Dubai. Contact the workshop before travelling.</p>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">This form prepares a WhatsApp draft. Review it and press Send in WhatsApp so the team receives your request. An appointment is confirmed by the workshop.</p>
          <Link to={PORSCHE_HUB_PATH} className="mt-5 inline-flex text-sm font-semibold text-burnt-orange hover:underline">Explore Porsche workshop services</Link>
        </div>
        <div className="min-w-0 rounded-2xl border border-white/10 bg-black p-5 sm:p-8">
          <BrandBookingForm brandName={modelName} issuePlaceholder={`${modelName} year, mileage, service history, service due or symptoms, and preferred appointment day/time`} />
        </div>
      </div>
    </section>
  );
}
