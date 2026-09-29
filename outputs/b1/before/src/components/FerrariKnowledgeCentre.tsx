import { ArrowRight, CheckCircle2, Layers3, MessageCircle, Phone } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import {
  FERRARI_488_GUIDE_PATH,
  FERRARI_MAINTENANCE_GUIDE_PATH,
  ferrariModelPages,
} from '@/data/ferrariModelPages';
import ferrariEngineWorkshop from '@/assets/ferrari-engine-workshop-dubai.jpg';
import { FERRARI_HUB_SERVICES, FERRARI_WHATSAPP_HREF } from '@/data/ferrariHubContent';

const modelSummaries: Record<string, string> = {
  '488': 'Twin-turbo V8, seven-speed DCT, cooling, SCM-E suspension, brakes and diagnostic considerations.',
  'f8-tributo': 'Later F154 V8 development, seven-speed DCT, cooling, electronics and chassis-control systems.',
  'roma': 'Front-mid-engine turbo V8, eight-speed DCT, comfort electronics, suspension and roof considerations.',
  'sf90': 'Plug-in-hybrid V8, three-motor architecture, eight-speed DCT, regenerative braking and multiple cooling circuits.',
  '296': 'Plug-in-hybrid V6, rear MGU-K, eight-speed DCT, charging, thermal management and electronic controls.',
  'portofino': 'Turbo V8, retractable roof, model-dependent seven- or eight-speed DCT, SCM-E, cooling and AC.',
  '812': 'Naturally aspirated V12, seven-speed transaxle, cooling, steering, SCM-E suspension and brake systems.',
  'purosangue': 'Naturally aspirated V12, eight-speed rear transaxle, 4RM-S evo, 48-volt active suspension and electronics.',
};

const FerrariKnowledgeCentre = () => (
  <section id="ferrari-services" className="border-t border-white/5 bg-gradient-to-b from-charcoal/30 to-black py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-14 max-w-4xl">
        <p className="eyebrow mb-4">Independent Ferrari workshop in Al Quoz</p>
        <h2 className="text-3xl font-black sm:text-5xl">Ferrari specialist services in Dubai</h2>
        <p className="mt-5 text-base leading-relaxed text-gray-300">DIGI-TEC provides Ferrari servicing, fault diagnosis and repair assessment from its Dubai workshop. Start with the symptom or maintenance due. The team identifies the exact model and fitted systems, then confirms the appropriate inspection, available diagnostic functions and repair scope.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FERRARI_HUB_SERVICES.map((service) => (
          <article key={service.path} className="card-premium flex flex-col rounded-2xl p-6">
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="mb-5 mt-3 text-base leading-relaxed text-gray-300">{service.description}</p>
            <Link to={service.path} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline">{service.anchor}<ArrowRight className="h-4 w-4 shrink-0" /></Link>
          </article>
        ))}
      </div>
      <div className="my-14 grid gap-6 rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-black sm:text-4xl">Book a Ferrari inspection</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">Send the model, year, mileage, service history, warning text or symptoms, and your preferred appointment time. DIGI-TEC will confirm the appropriate first inspection and current availability.</p>
          <div className="mt-6 flex flex-col flex-wrap gap-3 sm:flex-row">
            <a href={FERRARI_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5" /> Request a Ferrari inspection</a>
            <a href="tel:+97143402223" className="btn-secondary"><Phone className="h-5 w-5" /> Call DIGI-TEC</a>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="font-bold">Include before booking</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-300">
            {['Ferrari model, year and VIN when available', 'Mileage and available service history', 'Exact warning message or symptoms', 'When the concern occurs and preferred appointment time'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" /><span>{item}</span></li>)}
          </ul>
        </div>
      </div>
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow mb-4">Ferrari knowledge centre</p>
          <h2 className="max-w-4xl text-3xl font-black sm:text-5xl">Ferrari models we service</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-300">Start with the model when engine, transmission, suspension, braking or diagnostic architecture changes the repair path. Hybrid-related work on the 296 and SF90 is accepted only after the warning, system, safety requirements and available workshop scope are confirmed.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ferrariModelPages.map((model) => (
              <Link key={model.path} to={model.path} className="card-premium group rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-burnt-orange">Published model guide</p>
                <h3 className="mt-2 text-xl font-black group-hover:text-burnt-orange">{model.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{modelSummaries[model.slug] ?? 'Maintenance, systems, symptoms and Dubai ownership considerations.'}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">{model.name} service &amp; repair <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
        <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
          <img src={ferrariEngineWorkshop} alt="Ferrari engine work documented at DIGI-TEC Performance Centre in Dubai" className="aspect-[4/5] w-full object-cover" width="941" height="1672" loading="lazy" />
          <figcaption className="border-t border-white/10 p-5 text-xs leading-relaxed text-white/45">Workshop imagery from DIGI-TEC. It documents Ferrari-related workshop work without assigning the vehicle to an unverified model or repair outcome.</figcaption>
        </figure>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="card-premium rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-burnt-orange">Owner guides</p>
          <div className="mt-5 grid gap-3">
            <Link to={FERRARI_MAINTENANCE_GUIDE_PATH} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 text-sm font-semibold hover:border-burnt-orange/40 hover:text-burnt-orange">Ferrari maintenance guide for Dubai <ArrowRight className="h-4 w-4 shrink-0" /></Link>
            <Link to={FERRARI_488_GUIDE_PATH} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 text-sm font-semibold hover:border-burnt-orange/40 hover:text-burnt-orange">Ferrari 488 owner maintenance guide <ArrowRight className="h-4 w-4 shrink-0" /></Link>
          </div>
        </div>
        <div className="card-premium rounded-2xl p-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burnt-orange"><Layers3 className="h-4 w-4" /> Model-specific architecture</span>
          <p className="mt-3 text-sm leading-relaxed text-white/58">Eight published model guides now separate V8, V12, seven- and eight-speed DCT, hybrid, active-suspension and GT roof-system requirements. Each guide returns to this hub for broad Ferrari service enquiries.</p>
          <p className="mt-5 text-sm font-semibold text-white/75">488 · F8 · Roma · SF90 · 296 · Portofino · 812 · Purosangue</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <article className="card-premium rounded-2xl p-6 lg:col-span-2">
          <p className="eyebrow mb-4">Ferrari servicing for Dubai conditions</p>
          <h2 className="text-2xl font-black sm:text-4xl">Regular inspection matters even on low-mileage cars</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300">High ambient temperature places sustained demand on cooling and air conditioning. Heat and storage can affect batteries, tyres, rubber components and fluids, while dust and stop-start traffic change how the car is used. These conditions make documented inspections useful; the applicable Ferrari maintenance guidance, vehicle record and measured condition still determine the actual work.</p>
          <p className="mt-4 text-base leading-relaxed text-gray-300">For cars that sit for extended periods, report slow starting, warning messages, flat spots, leaks or changes in fluid level before driving to the workshop. A stored car may have time-related needs even when annual mileage is low.</p>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold">How the repair scope is set</h3>
          <ol className="mt-5 space-y-4 text-sm leading-relaxed text-gray-300">
            <li><strong className="text-off-white">1. Identify:</strong> confirm the VIN, model, history and complaint.</li>
            <li><strong className="text-off-white">2. Inspect:</strong> combine compatible diagnostic information with physical tests.</li>
            <li><strong className="text-off-white">3. Approve:</strong> review the proposed work, parts, fluids and timing before repair.</li>
          </ol>
        </article>
      </div>
    </div>
  </section>
);

export default FerrariKnowledgeCentre;
