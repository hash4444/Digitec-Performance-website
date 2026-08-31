import { ArrowRight, Layers3 } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import {
  FERRARI_488_GUIDE_PATH,
  FERRARI_MAINTENANCE_GUIDE_PATH,
  ferrariModelPages,
} from '@/data/ferrariModelPages';
import ferrariEngineWorkshop from '@/assets/ferrari-engine-workshop-dubai.jpg';

const FerrariKnowledgeCentre = () => (
  <section className="border-t border-white/5 bg-gradient-to-b from-charcoal/30 to-black py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow mb-4">Ferrari knowledge centre</p>
          <h2 className="max-w-4xl text-3xl font-black sm:text-5xl">Service information by Ferrari model</h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">Start with the model when engine, transmission, suspension, braking or diagnostic architecture changes the repair path. These pages support the main Ferrari service hub without replacing its broader commercial role.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ferrariModelPages.map((model) => (
              <Link key={model.path} to={model.path} className="card-premium group rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-burnt-orange">Published model guide</p>
                <h3 className="mt-2 text-xl font-black group-hover:text-burnt-orange">{model.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">Maintenance, systems, symptoms and Dubai ownership considerations.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">View {model.shortName} <ArrowRight className="h-4 w-4" /></span>
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
    </div>
  </section>
);

export default FerrariKnowledgeCentre;
