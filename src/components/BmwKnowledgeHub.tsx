import { ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { BMW_HUB_PATH, bmwModelPages } from '@/data/bmwModelPages';

const groups = [
  { title: 'Sedans & Coupes', slugs: ['3-series', '5-series'] },
  { title: 'BMW X', slugs: ['x5', 'x6'] },
  { title: 'BMW M', slugs: ['m3', 'm4', 'm5'] },
];

const serviceLinks = [
  ['BMW Diagnostics', 'engine-diagnostics'], ['ZF Transmission', 'transmission-repair'],
  ['Suspension', 'suspension-repair'], ['Cooling & Mechanical', 'mechanical-repair'],
  ['Electrical & iDrive', 'electrical-repair'], ['AC Repair', 'ac-repair'],
];

const BmwKnowledgeHub = () => (
  <>
    <section className="border-y border-white/5 bg-gradient-to-b from-blue-950/15 to-black py-14 sm:py-20" aria-labelledby="choose-your-bmw">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl"><p className="eyebrow mb-4">Model-specific expertise</p><h2 id="choose-your-bmw" className="text-3xl font-black sm:text-5xl">Choose Your BMW</h2><p className="mt-5 leading-relaxed text-white/60">Select a published model guide for generation, engine, transmission, chassis and symptom-specific information. More models will be added only when a useful, distinct page is ready.</p></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {groups.map((group) => <section key={group.title} className="card-premium rounded-2xl p-6"><h3 className="text-xl font-bold">{group.title}</h3><div className="mt-5 grid gap-3">{group.slugs.map((slug) => { const model = bmwModelPages.find((item) => item.slug === slug); return model ? <Link key={slug} to={`${BMW_HUB_PATH}/${slug}`} className="group flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold hover:border-burnt-orange/60 hover:text-burnt-orange"><span>{model.name}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link> : null; })}</div></section>)}
        </div>
      </div>
    </section>

    <section className="py-14 sm:py-20" aria-labelledby="bmw-authority-systems">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow mb-4">BMW systems and symptoms</p><h2 id="bmw-authority-systems" className="text-2xl font-black sm:text-4xl">Diagnostics that connect the warning to the right repair</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{serviceLinks.map(([label, slug]) => <Link key={slug} to={`${BMW_HUB_PATH}/${slug}`} className="card-premium group rounded-2xl p-5"><h3 className="font-bold group-hover:text-burnt-orange">{label}</h3><p className="mt-2 text-sm leading-relaxed text-white/55">ISTA-compatible fault review, live data and physical testing are matched to the model, generation and fitted system.</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">Explore BMW service <ArrowRight className="h-4 w-4" /></span></Link>)}</div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 p-6"><h3 className="text-xl font-bold">Engines we understand</h3><p className="mt-3 text-sm leading-relaxed text-white/60">B48, B58, N20, N54, N55, N63, S55, S58 and S63 relationships are used to guide model-specific maintenance and diagnosis. The engine code is verified before parts or procedures are selected.</p></article>
          <article className="rounded-2xl border border-white/10 p-6"><h3 className="text-xl font-bold">ZF 8HP and M transmissions</h3><p className="mt-3 text-sm leading-relaxed text-white/60">8HP variants, manual gearboxes and M-DCT are not treated as one system. Shift warnings, adaptation values, fluid condition, mounts and the connected driveline are assessed together.</p></article>
          <article className="rounded-2xl border border-white/10 p-6"><h3 className="text-xl font-bold">ISTA, iDrive and coding</h3><p className="mt-3 text-sm leading-relaxed text-white/60">Scanning, service functions, coding, programming, battery registration and retrofit support depend on the vehicle, hardware, software, module access and required function.</p></article>
        </div>
      </div>
    </section>
  </>
);

export default BmwKnowledgeHub;
