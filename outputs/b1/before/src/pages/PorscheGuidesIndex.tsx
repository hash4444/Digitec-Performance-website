import { ArrowRight, BookOpen, CheckCircle2, MessageCircle, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { PORSCHE_HUB_PATH, porscheModelNavigation } from '@/data/porscheArchitecture';
import {
  PORSCHE_GUIDES_PARENT_PATH,
  PORSCHE_GUIDES_PATH,
  porscheOwnershipGuides,
} from '@/data/porscheOwnershipGuides';
import { useSeo } from '@/hooks/use-seo';
import {
  buildArticle,
  buildBreadcrumb,
  buildFAQ,
  buildWebPage,
  pageGraph,
  SITE_URL,
} from '@/lib/schema';

const DATE_PUBLISHED = '2026-08-31';
const DATE_MODIFIED = '2026-09-14';
const PORSCHE_OG_IMAGE = '/images/porsche-service-dubai-hero.jpg';

const porscheServiceLinks = [
  { label: 'Porsche service & repair hub', path: PORSCHE_HUB_PATH },
  { label: 'Porsche engine oil service', path: `${PORSCHE_HUB_PATH}/oil-change` },
  { label: 'Porsche PDK & transmission repair', path: `${PORSCHE_HUB_PATH}/transmission-repair` },
  { label: 'Porsche brake inspection & repair', path: `${PORSCHE_HUB_PATH}/brake-repair` },
  { label: 'Porsche diagnostics', path: `${PORSCHE_HUB_PATH}/engine-diagnostics` },
];

const guideGroups = [
  {
    title: 'Service schedule, scope & fluids',
    description: 'Start with the exact vehicle schedule, then separate routine work from items due only at a particular time or distance.',
    slugs: ['service-intervals-uae', 'how-often-service-dubai', 'major-vs-minor-service', 'oil-change-intervals', 'pdk-service-intervals', 'maintenance-cost-dubai'],
  },
  {
    title: 'Dubai conditions & ownership checks',
    description: 'Understand how heat, traffic, short trips and storage affect condition checks without inventing one replacement interval for every Porsche.',
    slugs: ['battery-life-dubai', 'dubai-heat', 'ac-maintenance-dubai', 'cooling-maintenance', 'brake-wear-dubai', 'tyre-wear-dubai'],
  },
  {
    title: 'Buying, warnings & workshop planning',
    description: 'Prepare for an inspection, compare workshop scope and make decisions from the evidence found on the individual car.',
    slugs: ['pre-purchase-inspection-checklist', 'buying-used-porsche-dubai', 'dealer-vs-independent-specialist', 'warning-lights', 'common-problems-dubai'],
  },
  {
    title: 'Model maintenance guides',
    description: 'Use a model guide when the powertrain, transmission, chassis or high-voltage architecture changes the maintenance path.',
    slugs: ['macan-maintenance', '718-maintenance', 'taycan-maintenance'],
  },
];

const porscheFaqs = [
  {
    question: 'How often should a Porsche be serviced in Dubai?',
    answer: 'Follow the maintenance information for the exact model, model year, powertrain and market, together with its recorded history and service display. Dubai heat, traffic, short trips, storage or performance use can justify earlier condition checks, but they do not create one universal replacement interval.',
  },
  {
    question: 'What is included in a Porsche maintenance service?',
    answer: 'The scope is the set of items due for the exact car. A routine visit may include approved engine oil and filter where applicable, a vehicle inspection and checks of brakes, tyres and fluids. PDK service, spark plugs, brake fluid and filters are separate items only when due.',
  },
  {
    question: 'How much does Porsche maintenance cost in Dubai?',
    answer: 'Cost depends on the model, generation, powertrain, scheduled scope, parts and fluid specifications, labour access and any findings that require diagnosis or repair. Compare itemised estimates containing the same work rather than relying on one generic online price.',
  },
];

const PorscheGuidesIndex = () => {
  const url = `${SITE_URL}${PORSCHE_GUIDES_PARENT_PATH}`;
  const title = 'Porsche Maintenance Dubai: Service Guide | Digi-Tec';
  const headline = 'Porsche Maintenance in Dubai: Intervals & What Is Included';
  const description = 'Porsche maintenance in Dubai: model-specific service intervals, what routine servicing includes, oil, PDK and brake-fluid guidance, and booking advice.';
  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to plan Porsche maintenance.\n\nModel and year: \nMileage: \nService history / last service: \nWarning or symptoms: \nPreferred appointment: ')}`;
  const guideList = {
    '@type': 'ItemList',
    '@id': `${url}#guide-list`,
    name: 'Porsche maintenance and ownership guides',
    numberOfItems: porscheOwnershipGuides.length,
    itemListElement: porscheOwnershipGuides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.name,
      url: `${SITE_URL}${PORSCHE_GUIDES_PATH}/${guide.slug}`,
    })),
  };

  useSeo({
    title,
    description,
    canonical: url,
    ogTitle: title,
    ogDescription: description,
    ogImage: `${SITE_URL}${PORSCHE_OG_IMAGE}`,
    ogImageAlt: 'Porsche inside the DIGI-TEC workshop in Dubai',
    ogType: 'article',
    jsonLd: pageGraph([
      buildWebPage({
        url,
        type: 'ItemPage',
        name: headline,
        description,
        breadcrumbId: `${url}#breadcrumb`,
        primaryImage: PORSCHE_OG_IMAGE,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        mainEntityId: `${url}#article`,
      }),
      buildBreadcrumb(url, [
        { name: 'Home', url: SITE_URL },
        { name: 'Porsche', url: `${SITE_URL}${PORSCHE_HUB_PATH}` },
        { name: 'Maintenance Guide', url },
      ]),
      buildArticle({
        url,
        headline,
        description,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        author: 'DIGI-TEC Workshop',
        image: PORSCHE_OG_IMAGE,
        section: 'Porsche Maintenance Guides',
        keywords: 'Porsche maintenance Dubai, Porsche service intervals, Porsche service cost Dubai, Porsche PDK service',
      }),
      guideList,
      buildFAQ(url, porscheFaqs),
    ]),
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={PORSCHE_HUB_PATH} className="hover:text-burnt-orange">Porsche</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white">Maintenance Guide</li>
          </ol>
        </nav>

        <section className="border-b border-white/5 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <BookOpen className="h-9 w-9 text-burnt-orange" />
            <p className="eyebrow mt-5">Porsche ownership guide</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">{headline}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/70">Use this page to find the right Porsche maintenance answer, then continue to the exact interval, component, model or workshop service you need.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5" />Plan my Porsche service</a>
              <Link to={PORSCHE_HUB_PATH} className="btn-secondary"><Wrench className="h-5 w-5" />View Porsche workshop services</Link>
            </div>
            <p className="mt-5 text-sm text-white/45"><time dateTime={DATE_MODIFIED}>Updated 14 September 2026</time></p>
          </div>
        </section>

        <article>
          <section className="py-14 sm:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="rounded-3xl border border-burnt-orange/30 bg-burnt-orange/[0.07] p-6 sm:p-8">
                <p className="eyebrow mb-4">Quick answer</p>
                <h2 className="text-2xl font-black sm:text-4xl">Porsche service intervals in Dubai</h2>
                <p className="mt-5 text-lg leading-relaxed text-white/75">Porsche maintenance should follow the schedule for the exact model, model year, powertrain, market and recorded history. A routine visit may include approved engine oil and filter where applicable, vehicle inspection, and checks of brakes, tyres and fluids; PDK service, spark plugs, brake fluid and filters are separate items only when due.</p>
                <p className="mt-4 leading-relaxed text-white/60">Dubai heat, traffic, short trips and storage can justify earlier condition checks, but not one universal replacement interval. Use the focused guides below for detail rather than applying a number from another model or market.</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {[
                    ['1. Identify the vehicle', 'Confirm the model, year, powertrain, market specification and service records.'],
                    ['2. Confirm what is due', 'Separate time- and distance-based items from diagnosis or discovered repairs.'],
                    ['3. Check actual condition', 'Use inspection evidence for heat-, storage- or usage-related recommendations.'],
                  ].map(([step, detail]) => <div key={step} className="rounded-2xl border border-white/10 bg-black/30 p-5"><CheckCircle2 className="h-5 w-5 text-burnt-orange" /><h3 className="mt-3 font-black">{step}</h3><p className="mt-2 text-sm leading-relaxed text-white/55">{detail}</p></div>)}
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-white/5 bg-white/[0.02] py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <p className="eyebrow mb-4">Workshop pathways</p>
                <h2 className="text-3xl font-black sm:text-4xl">Porsche workshop services in Dubai</h2>
                <p className="mt-4 leading-relaxed text-white/60">These pages explain the inspection and workshop scope. Use the ownership guides below when you need background before deciding what to book.</p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {porscheServiceLinks.map((service) => <Link key={service.path} to={service.path} className="card-premium group flex min-h-32 flex-col justify-between rounded-2xl p-5"><h3 className="font-black group-hover:text-burnt-orange">{service.label}</h3><ArrowRight className="mt-5 h-5 w-5 text-burnt-orange" /></Link>)}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <p className="eyebrow mb-4">Maintenance knowledge centre</p>
              <h2 className="text-3xl font-black sm:text-5xl">Choose the guide that matches your question</h2>
              <p className="mt-5 max-w-3xl leading-relaxed text-white/60">Each guide owns one focused topic so interval, cost, fluid and model advice stays specific instead of being repeated as generic guidance.</p>
              <div className="mt-12 space-y-14">
                {guideGroups.map((group) => {
                  const guides = porscheOwnershipGuides.filter((guide) => group.slugs.includes(guide.slug));
                  return (
                    <section key={group.title} aria-labelledby={`guide-group-${group.slugs[0]}`}>
                      <h3 id={`guide-group-${group.slugs[0]}`} className="text-2xl font-black sm:text-3xl">{group.title}</h3>
                      <p className="mt-3 max-w-3xl leading-relaxed text-white/55">{group.description}</p>
                      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {guides.map((guide) => <Link key={guide.slug} to={`${PORSCHE_GUIDES_PATH}/${guide.slug}`} className="card-premium group rounded-2xl p-6"><h4 className="text-lg font-black group-hover:text-burnt-orange">{guide.name}</h4><p className="mt-3 text-sm leading-relaxed text-white/55">{guide.answer}</p><span className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-burnt-orange">Read guide <ArrowRight className="h-4 w-4" /></span></Link>)}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="border-y border-white/5 bg-white/[0.02] py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <h2 className="text-3xl font-black sm:text-4xl">Porsche maintenance by model</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-white/60">Choose the exact vehicle family when its engine, transmission, chassis or high-voltage systems change the inspection and service path.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {porscheModelNavigation.filter((model) => model.path).map((model) => <Link key={model.path} to={model.path!} className="card-premium group rounded-2xl p-6"><h3 className="text-lg font-black group-hover:text-burnt-orange">Porsche {model.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">{model.description}</p><span className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-burnt-orange">View model guide <ArrowRight className="h-4 w-4" /></span></Link>)}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="text-center text-3xl font-black sm:text-4xl">Porsche maintenance FAQs</h2>
              <div className="mt-8 grid gap-4">
                {porscheFaqs.map((faq) => <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h3 className="text-lg font-black">{faq.question}</h3><p className="mt-3 leading-relaxed text-white/65">{faq.answer}</p></div>)}
              </div>
              <div className="mt-12 rounded-3xl border border-burnt-orange/30 bg-burnt-orange/[0.07] p-7 text-center sm:p-10">
                <h2 className="text-2xl font-black sm:text-3xl">Need a vehicle-specific Porsche maintenance plan?</h2>
                <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/65">Send the model, year, mileage, service history and current warnings or symptoms. DIGI-TEC can confirm the appropriate first inspection before you approve any work.</p>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7"><MessageCircle className="h-5 w-5" />WhatsApp the workshop</a>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PorscheGuidesIndex;
