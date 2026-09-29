import { ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { BMW_HUB_PATH, bmwModelPages } from '@/data/bmwModelPages';
import { bmwServicePath } from '@/data/bmwHubContent';

const priorityModels = [
  { slug: '3-series', description: 'Service planning by generation, with engine, transmission and chassis checks for your 3 Series.' },
  { slug: 'm5', description: 'M5 engine, cooling, brakes and drivetrain guidance matched to the generation and fitted systems.' },
  { slug: 'm4', description: 'M4 maintenance, oil service, S55/S58 engine and transmission considerations by generation.' },
];

const BmwKnowledgeHub = () => (
  <>
    <section className="border-y border-white/5 bg-gradient-to-b from-blue-950/15 to-black py-14 sm:py-20" aria-labelledby="choose-your-bmw">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl"><p className="eyebrow mb-4">Find your model</p><h2 id="choose-your-bmw" className="text-3xl font-black sm:text-5xl">BMW service by model</h2><p className="mt-5 text-base leading-relaxed text-gray-300">Find maintenance and repair guidance for your model, including the generations, engines and fitted systems that affect the service plan.</p></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {priorityModels.map(({ slug, description }) => {
            const model = bmwModelPages.find((item) => item.slug === slug);
            return model ? <Link key={slug} to={`${BMW_HUB_PATH}/${slug}`} className="card-premium group rounded-2xl p-6"><h3 className="text-xl font-bold group-hover:text-burnt-orange">{model.name} service in Dubai</h3><p className="mt-3 text-base leading-relaxed text-gray-300">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange">View model guide <ArrowRight className="h-4 w-4" /></span></Link> : null;
          })}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">{bmwModelPages.filter((model) => !priorityModels.some(({ slug }) => slug === model.slug)).map((model) => <Link key={model.slug} to={`${BMW_HUB_PATH}/${model.slug}`} className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:border-burnt-orange hover:text-burnt-orange">{model.name} service guide</Link>)}</div>
        <p className="mt-6 text-sm leading-relaxed text-gray-400">For other 1–8 Series, X, M or i models, send the model and year so the team can confirm service availability and the required diagnostic access.</p>
      </div>
    </section>

    <section className="py-14 sm:py-20" aria-labelledby="bmw-authority-systems">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow mb-4">BMW systems and diagnosis</p><h2 id="bmw-authority-systems" className="text-2xl font-black sm:text-4xl">What a BMW specialist checks before recommending repairs</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 p-6"><h3 className="text-xl font-bold">Engine code and fitted components</h3><p className="mt-3 text-base leading-relaxed text-gray-300">B48, B58, N20, N54, N55, N63, S55, S58 and S63 engines have different maintenance and diagnostic requirements. The VIN and engine code guide checks of cooling, oil leaks, charge pipes, oil separators or VANOS when symptoms and history warrant them.</p></article>
          <article className="rounded-2xl border border-white/10 p-6"><h3 className="text-xl font-bold">ZF 8HP, M-DCT and chassis systems</h3><p className="mt-3 text-base leading-relaxed text-gray-300">The fitted gearbox determines the fluid, filter and service procedure. ZF 8HP variants, M-DCT and manual gearboxes need different checks. Suspension inspection also distinguishes steel springs, Adaptive M dampers, rear self-levelling and two-axle air systems.</p></article>
          <article className="rounded-2xl border border-white/10 p-6"><h3 className="text-xl font-bold">ISTA-compatible testing and coding</h3><p className="mt-3 text-base leading-relaxed text-gray-300">Fault review and live data are combined with physical tests. ISTA, E-Sys, ENET, service resets, battery registration and iDrive functions are confirmed for the exact vehicle and required access. CarPlay, Live Cockpit or other retrofit enquiries also need hardware and software compatibility checks.</p></article>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-blue-950/10 p-6 sm:p-8"><h3 className="text-xl font-bold">BMW maintenance for Dubai heat and traffic</h3><p className="mt-3 max-w-4xl text-base leading-relaxed text-gray-300">Heat, stop-start driving and dust add load to cooling, batteries, air conditioning and filters. Share how the car is used alongside its service history. Cooling performance, leaks, battery health, brake wear and AC output can then be considered in the inspection, with the service plan matched to your BMW.</p><Link to={bmwServicePath('oil-change')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline">Oil specification and maintenance checks <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  </>
);

export default BmwKnowledgeHub;
