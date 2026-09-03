import { ArrowRight, CheckCircle2, MessageCircle, Phone, Wrench } from 'lucide-react';
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
  MERCEDES_HUB_PATH,
  getMercedesModelByPath,
  mercedesModelPages,
  type MercedesModelSection,
} from '@/data/mercedesModelPages';
import { useSeo } from '@/hooks/use-seo';
import { stripLocalePrefix } from '@/i18n/use-locale';
import { buildBreadcrumb, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const workshopImage = '/images/mercedes-repair-dubai-hero.jpg';

const ModelSystemSection = ({ section }: { section: MercedesModelSection }) => (
  <section className="card-premium rounded-2xl p-5 sm:p-7">
    <h2 className="text-xl sm:text-2xl font-black text-off-white">{section.title}</h2>
    <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65">{section.summary}</p>
    <ul className="mt-5 space-y-3">
      {section.points.map((point) => (
        <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/70">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" aria-hidden="true" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </section>
);

const MercedesModelPage = () => {
  const { pathname } = useLocation();
  const englishPath = stripLocalePrefix(pathname);
  const model = getMercedesModelByPath(englishPath);

  const canonical = model ? `${SITE_URL}${model.path}` : `${SITE_URL}${MERCEDES_HUB_PATH}`;
  const serviceId = `${canonical}#service`;
  const breadcrumbId = `${canonical}#breadcrumb`;
  const jsonLd = model
    ? pageGraph([
        buildWebPage({
          url: canonical,
          name: model.metaTitle,
          description: model.metaDescription,
          type: 'WebPage',
          breadcrumbId,
          primaryImage: workshopImage,
          mainEntityId: serviceId,
          dateModified: '2026-08-31',
        }),
        buildBreadcrumb(canonical, [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Mercedes-Benz Repair & Service Dubai', url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
          { name: model.name, url: canonical },
        ]),
        buildService({
          url: canonical,
          name: model.h1,
          serviceType: `${model.name} maintenance, diagnostics and repair`,
          description: model.metaDescription,
          image: workshopImage,
          brand: 'Mercedes-Benz',
          offers: model.services.map((item) => item.label),
          areaServed: ['Dubai'],
        }),
      ])
    : undefined;

  useSeo({
    title: model?.metaTitle ?? 'Mercedes-Benz Models | Digi-Tec Dubai',
    description: model?.metaDescription ?? 'Mercedes-Benz model service and repair information from Digi-Tec in Dubai.',
    canonical,
    ogImage: workshopImage,
    ogImageAlt: model ? `${model.name} service and repair at Digi-Tec Performance Centre in Dubai` : undefined,
    ogType: 'website',
    jsonLd,
    hasArabicVersion: Boolean(model?.legacyBlogSlug),
  });

  if (!model) return <Navigate to={MERCEDES_HUB_PATH} replace />;

  const otherModels = mercedesModelPages
    .filter((item) => item.path !== model.path)
    .filter((item) => {
      const isAmg = model.name.includes('AMG');
      return item.name.includes('AMG') === isAmg;
    })
    .slice(0, 3);

  const whatsappText = encodeURIComponent(
    `Hi, I'd like to arrange a ${model.name} inspection at Digi-Tec. My model year is ____ and the concern is ____.`,
  );

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5 bg-black">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={MERCEDES_HUB_PATH} className="hover:text-burnt-orange">Mercedes-Benz</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/80">{model.shortName}</li>
          </ol>
        </nav>

        <section className="theme-dark-section relative isolate overflow-hidden border-b border-white/10 bg-charcoal/20">
          <img
            src={workshopImage}
            alt={`${model.name} service and repair support at the Digi-Tec Mercedes workshop in Dubai`}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
            width="1920"
            height="1080"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.72fr] lg:py-28">
            <div>
              <p className="eyebrow mb-5">Mercedes model expertise</p>
              <h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{model.h1}</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">{model.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsappText}`}>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp your concern
                </a>
                <a className="btn-secondary" href="tel:+97143402223">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call +971 4 340 2223
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/45">Send the VIN, model year, mileage, warning text and when the symptom occurs. Workshop scope is confirmed for the exact vehicle.</p>
            </div>
            <div className="relative hidden min-h-72 lg:block">
              {model.vehicleImage ? (
                <img
                  src={model.vehicleImage}
                  alt={model.vehicleImageAlt ?? `${model.name} model`}
                  className="absolute inset-0 m-auto max-h-80 w-full object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,0.7)]"
                  loading="eager"
                />
              ) : (
                <div className="card-premium absolute inset-y-8 right-0 flex max-w-md items-center rounded-3xl p-8">
                  <div>
                    <Wrench className="h-9 w-9 text-burnt-orange" aria-hidden="true" />
                    <p className="mt-5 text-xl font-black">Model first. System second. Evidence before parts.</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">The VIN and fitted equipment determine the service procedure, compatible diagnostics and repair scope.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="eyebrow mb-4">Platforms covered</p>
                <h2 className="text-2xl font-black sm:text-4xl">Which {model.shortName} vehicles this page covers</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55">Badges can span several engine and chassis generations. Final compatibility is checked from the VIN and fitted systems.</p>
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
          </div>
        </section>

        <section className="bg-gradient-to-b from-charcoal/20 to-black py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="eyebrow mb-4">Model-specific systems</p>
              <h2 className="text-2xl font-black sm:text-4xl">What changes the service and repair plan</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {[model.maintenance, model.powertrain, model.transmission, model.suspension, model.climate, model.electrical].map((section) => (
                <ModelSystemSection key={section.title} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow mb-4">Start with the symptom</p>
              <h2 className="text-2xl font-black sm:text-4xl">Common {model.shortName} concerns owners describe</h2>
              <p className="mt-4 text-white/60">These guides explain what the symptom can mean and when to stop driving. They are informational; the commercial repair page is linked separately after diagnosis.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {model.symptoms.map((symptom) => (
                <article key={symptom.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
                  <h3 className="text-lg font-bold">{symptom.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{symptom.detail}</p>
                  <Link to={symptom.guidePath} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange hover:text-off-white">
                    {symptom.guideLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal/15 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow mb-4">Relevant Digi-Tec services</p>
              <h2 className="text-2xl font-black sm:text-4xl">Commercial service pages for the diagnosed need</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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

        {model.caseStudies?.length ? (
          <section className="border-t border-white/5 py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <p className="eyebrow mb-4">Real workshop evidence</p>
              <h2 className="text-2xl font-black sm:text-4xl">Documented {model.shortName} work</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {model.caseStudies.map((item) => (
                  <Link key={item.path} to={item.path} className="card-premium group rounded-2xl p-6">
                    <h3 className="text-xl font-bold group-hover:text-burnt-orange">{item.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">View documented project <ArrowRight className="h-4 w-4" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-y border-white/5 py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow mb-4">Questions before booking</p>
              <h2 className="text-2xl font-black sm:text-4xl">{model.shortName} service FAQ</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/55">Useful answers first; vehicle-specific decisions still depend on inspection and recorded evidence.</p>
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

        <section className="bg-gradient-to-br from-burnt-orange/20 via-charcoal/30 to-black py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="eyebrow mb-4">Arrange the right first inspection</p>
            <h2 className="text-3xl font-black sm:text-5xl">Book {model.name} service or diagnosis</h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">Send the VIN, year, mileage, warning message and symptoms. Digi-Tec will confirm the appropriate inspection and available booking options before work begins.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsappText}`}><MessageCircle className="h-4 w-4" /> WhatsApp Digi-Tec</a>
              <Link className="btn-secondary" to={MERCEDES_HUB_PATH}>Return to Mercedes hub</Link>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-xl font-black sm:text-2xl">Related Mercedes model pages</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {otherModels.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:border-burnt-orange/40 hover:text-burnt-orange">
                    {item.shortName} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MercedesModelPage;
