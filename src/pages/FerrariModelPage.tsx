import { AlertTriangle, ArrowRight, CheckCircle2, Gauge, MessageCircle, Phone, SearchCheck } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  FERRARI_HUB_PATH,
  ferrariModelPages,
  getFerrariModelByPath,
  type FerrariModelSection,
} from '@/data/ferrariModelPages';
import { useSeo } from '@/hooks/use-seo';
import { stripLocalePrefix } from '@/i18n/use-locale';
import { buildBreadcrumb, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const workshopImage = '/images/ferrari-service-dubai-hero.jpg';

const SystemCard = ({ section }: { section: FerrariModelSection }) => (
  <article className="card-premium rounded-2xl p-5 sm:p-7">
    <h2 className="text-xl font-black sm:text-2xl">{section.title}</h2>
    <p className="mt-3 text-sm leading-relaxed text-white/75">{section.directAnswer}</p>
    <ul className="mt-5 space-y-3">
      {section.points.map((point) => (
        <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/55">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" aria-hidden="true" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </article>
);

const FerrariModelPage = () => {
  const { pathname } = useLocation();
  const cleanPath = stripLocalePrefix(pathname).replace(/\/$/, '') || '/';
  const model = getFerrariModelByPath(cleanPath);
  const canonical = model ? `${SITE_URL}${model.path}` : `${SITE_URL}${FERRARI_HUB_PATH}`;
  const breadcrumbId = `${canonical}#breadcrumb`;

  const jsonLd = model
    ? pageGraph([
        buildBreadcrumb(model.path, [
          { name: 'Home', url: '/' },
          { name: 'Ferrari service Dubai', url: FERRARI_HUB_PATH },
          { name: model.shortName, url: model.path },
        ]),
        buildWebPage({
          url: model.path,
          name: model.h1,
          description: model.metaDescription,
          breadcrumbId,
          primaryImage: workshopImage,
          mainEntityId: `${canonical}#service`,
        }),
        buildService({
          url: model.path,
          name: model.h1,
          serviceType: `${model.name} maintenance, diagnostics and repair`,
          description: model.metaDescription,
          image: workshopImage,
          brand: 'Ferrari',
          offers: model.services.map((item) => item.label),
          areaServed: ['Dubai'],
        }),
      ])
    : undefined;

  useSeo({
    title: model?.metaTitle ?? 'Ferrari Models | DIGI-TEC Dubai',
    description: model?.metaDescription ?? 'Ferrari model service information from DIGI-TEC Performance Centre in Dubai.',
    canonical,
    ogImage: workshopImage,
    ogImageAlt: model ? `Ferrari workshop service support for ${model.name} owners in Dubai` : undefined,
    ogType: 'website',
    jsonLd,
    hasArabicVersion: false,
  });

  if (!model) return <Navigate to={FERRARI_HUB_PATH} replace />;

  const relatedModels = ferrariModelPages.filter((item) => item.path !== model.path).slice(0, 3);
  const whatsappText = encodeURIComponent(
    `Hi, I would like to arrange a ${model.name} inspection at DIGI-TEC. The model year is ____ and the concern is ____.`,
  );

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5 bg-black">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={FERRARI_HUB_PATH} className="hover:text-burnt-orange">Ferrari</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/80">{model.shortName}</li>
          </ol>
        </nav>

        <section className="theme-dark-section relative isolate overflow-hidden border-b border-white/10 bg-charcoal/20">
          <img
            src={workshopImage}
            alt="Ferrari in the DIGI-TEC Performance Centre workshop in Dubai"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
            width="941"
            height="1672"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/55" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.58fr] lg:py-28">
            <div>
              <p className="eyebrow mb-5">Independent Ferrari model expertise</p>
              <h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{model.h1}</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg">{model.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsappText}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp your concern
                </a>
                <a className="btn-secondary" href="tel:+97143402223">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call +971 4 340 2223
                </a>
              </div>
              <p className="mt-4 max-w-2xl text-xs leading-relaxed text-white/45">Send the VIN, year, mileage, service history, exact warning text and when the symptom occurs. Scope and diagnostic compatibility are confirmed for the vehicle before work is agreed.</p>
            </div>
            <aside className="card-premium rounded-3xl p-7 sm:p-8">
              <Gauge className="h-9 w-9 text-burnt-orange" aria-hidden="true" />
              <p className="mt-5 text-xl font-black">Direct answer</p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{model.directAnswer}</p>
            </aside>
          </div>
        </section>

        <section className="border-b border-white/5 py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow mb-4">Vehicle scope</p>
              <h2 className="text-2xl font-black sm:text-4xl">What this {model.shortName} page covers</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/55">Ferrari names can span different model years, drivetrains and equipment. The VIN and fitted hardware remain authoritative.</p>
            </div>
            <ul className="grid gap-4">
              {model.coverage.map((item) => (
                <li key={item} className="card-premium flex gap-3 rounded-2xl p-5 text-sm leading-relaxed text-white/70 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {model.hybridScopeNote ? (
          <section className="border-b border-amber-400/15 bg-amber-500/[0.06] py-8">
            <div className="mx-auto flex max-w-7xl gap-4 px-4 sm:px-6">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-black">Hybrid scope is confirmed before booking</h2>
                <p className="mt-2 max-w-4xl text-sm leading-relaxed text-white/65">{model.hybridScopeNote}</p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-gradient-to-b from-charcoal/20 to-black py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="eyebrow mb-4">Model-specific systems</p>
              <h2 className="text-2xl font-black sm:text-4xl">A Ferrari repair plan starts with the fitted system</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {model.systems.map((section) => <SystemCard key={section.title} section={section} />)}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
            <div className="card-premium rounded-2xl p-6 sm:p-8">
              <AlertTriangle className="h-7 w-7 text-burnt-orange" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black">Warnings and symptoms to document</h2>
              <ul className="mt-5 space-y-3">
                {model.warningSigns.map((item) => <li key={item} className="text-sm leading-relaxed text-white/62">• {item}</li>)}
              </ul>
            </div>
            <div className="card-premium rounded-2xl p-6 sm:p-8">
              <SearchCheck className="h-7 w-7 text-burnt-orange" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black">Our diagnostic approach</h2>
              <ol className="mt-5 space-y-3">
                {model.diagnosticApproach.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/62"><span className="font-black text-burnt-orange">{index + 1}.</span><span>{item}</span></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-charcoal/15 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Dubai ownership context</p>
            <h2 className="max-w-3xl text-2xl font-black sm:text-4xl">Heat, traffic, dust and storage all affect the inspection</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {model.dubaiConsiderations.map((item) => <p key={item} className="card-premium rounded-2xl p-5 text-sm leading-relaxed text-white/62">{item}</p>)}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Service pathways</p>
            <h2 className="text-2xl font-black sm:text-4xl">Continue to the relevant Ferrari service</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {model.services.map((item) => (
                <Link key={item.path} to={item.path} className="card-premium group rounded-2xl p-5 sm:p-6">
                  <h3 className="font-bold group-hover:text-burnt-orange">{item.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">View service <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow mb-4">Questions before booking</p>
              <h2 className="text-2xl font-black sm:text-4xl">{model.shortName} service FAQ</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/55">These answers set expectations; vehicle-specific advice follows VIN and condition checks.</p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {model.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-xl border border-white/10 bg-white/[0.025] px-5">
                  <AccordionTrigger className="text-left font-bold hover:text-burnt-orange">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-white/65">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-y border-white/5 bg-gradient-to-br from-burnt-orange/20 via-charcoal/30 to-black py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="eyebrow mb-4">Independent Ferrari workshop in Al Quoz</p>
            <h2 className="text-3xl font-black sm:text-5xl">Arrange a {model.name} inspection</h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">DIGI-TEC is independent and is not affiliated with Ferrari S.p.A. Vehicle scope, diagnostic access and the proposed repair are confirmed before work begins.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsappText}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp DIGI-TEC</a>
              <Link className="btn-secondary" to={FERRARI_HUB_PATH}>Return to Ferrari hub</Link>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-xl font-black sm:text-2xl">Related Ferrari model pages</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {relatedModels.map((item) => <Link key={item.path} to={item.path} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:border-burnt-orange/40 hover:text-burnt-orange">{item.shortName} <ArrowRight className="h-3.5 w-3.5" /></Link>)}
              {model.guides.map((item) => <Link key={item.path} to={item.path} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:border-burnt-orange/40 hover:text-burnt-orange">{item.label} <ArrowRight className="h-3.5 w-3.5" /></Link>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FerrariModelPage;
