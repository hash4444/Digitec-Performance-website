import { ArrowRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BMW_HUB_PATH, bmwModelPages, getBmwModelBySlug } from '@/data/bmwModelPages';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const heroImage = '/brand-logos/showcase/bmw.png';

const BmwModelPage = ({ modelSlugOverride }: { modelSlugOverride?: string }) => {
  const { modelSlug } = useParams();
  const model = getBmwModelBySlug(modelSlugOverride ?? modelSlug);
  const canonical = model ? `${SITE_URL}${BMW_HUB_PATH}/${model.slug}` : `${SITE_URL}${BMW_HUB_PATH}`;
  const breadcrumbId = `${canonical}#breadcrumb`;
  const serviceId = `${canonical}#service`;

  useSeo({
    title: model?.metaTitle ?? 'BMW Models | Digi-Tec Dubai',
    description: model?.metaDescription ?? 'BMW model-specific service and repair information from Digi-Tec Dubai.',
    canonical,
    ogImage: heroImage,
    ogImageAlt: model ? `${model.name} service and repair in Dubai` : 'BMW service in Dubai',
    hasArabicVersion: false,
    jsonLd: model ? pageGraph([
      buildWebPage({ url: canonical, name: model.metaTitle, description: model.metaDescription, breadcrumbId, mainEntityId: serviceId, dateModified: '2026-08-31' }),
      buildBreadcrumb(canonical, [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'BMW Service & Repair Dubai', url: `${SITE_URL}${BMW_HUB_PATH}` },
        { name: model.name, url: canonical },
      ]),
      buildService({ url: canonical, name: model.h1, serviceType: `${model.name} maintenance, diagnostics and repair`, description: model.metaDescription, brand: 'BMW', offers: model.services.map((item) => item.label), areaServed: ['Dubai'] }),
    ]) : undefined,
  });

  if (!model) return <Navigate to={BMW_HUB_PATH} replace />;
  const related = bmwModelPages.filter((item) => item.slug !== model.slug).slice(0, 4);
  const whatsappText = encodeURIComponent(`Hi, I would like to arrange a ${model.name} inspection. Model year: ____; concern: ____.`);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5">
          <ol className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li><li aria-hidden="true">/</li>
            <li><Link to={BMW_HUB_PATH} className="hover:text-burnt-orange">BMW</Link></li><li aria-hidden="true">/</li>
            <li className="text-white/80">{model.name}</li>
          </ol>
        </nav>

        <section className="theme-dark-section relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-br from-blue-950/40 via-black to-black">
          <div className="absolute right-[8%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.35fr]">
            <div>
              <p className="eyebrow mb-5">BMW model expertise</p>
              <h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{model.h1}</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">{model.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsappText}`}><MessageCircle className="h-4 w-4" /> WhatsApp your concern</a>
                <a className="btn-secondary" href="tel:+97143402223"><Phone className="h-4 w-4" /> Call +971 4 340 2223</a>
              </div>
              <p className="mt-4 text-xs text-white/45">Scope statement: the VIN, generation, fitted hardware and reported concern determine available diagnostics, parts and repair work.</p>
            </div>
            <img src={heroImage} alt="BMW roundel" className="mx-auto hidden w-52 drop-shadow-[0_20px_40px_rgba(30,100,255,0.25)] lg:block" width="320" height="320" />
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Generation knowledge</p>
            <h2 className="text-2xl font-black sm:text-4xl">{model.name} generations covered</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {model.generations.map((item) => <article key={item.code} className="card-premium rounded-2xl p-6"><h3 className="text-lg font-bold">{item.code}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{item.detail}</p></article>)}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-charcoal/20 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Model-specific systems</p>
            <h2 className="text-2xl font-black sm:text-4xl">What changes the service plan</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {model.sections.map((section) => <article key={section.title} className="card-premium rounded-2xl p-6"><h3 className="text-xl font-bold">{section.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{section.summary}</p><ul className="mt-5 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/70"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" /><span>{point}</span></li>)}</ul></article>)}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Start with the symptom</p>
            <h2 className="text-2xl font-black sm:text-4xl">Common {model.name} concerns</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">These are possible diagnostic routes, not a remote diagnosis. Stop driving if there is overheating, low oil pressure, unsafe braking, severe vibration, smoke or another immediate safety risk.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {model.symptoms.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{item.detail}</p><Link to={item.servicePath} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">{item.serviceLabel} <ArrowRight className="h-4 w-4" /></Link></article>)}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-charcoal/15 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Related BMW services</p><h2 className="text-2xl font-black sm:text-4xl">Continue to the right commercial service</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{model.services.map((item) => <Link key={item.path} to={item.path} className="card-premium group rounded-2xl p-6"><h3 className="font-bold group-hover:text-burnt-orange">{item.label}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">{item.detail}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">View service <ArrowRight className="h-4 w-4" /></span></Link>)}</div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="eyebrow mb-4">Owner questions</p><h2 className="text-2xl font-black sm:text-4xl">{model.name} service FAQ</h2></div>
            <Accordion type="single" collapsible className="space-y-3">{model.faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-xl border border-white/10 bg-white/[0.025] px-5"><AccordionTrigger className="text-left font-bold hover:text-burnt-orange">{faq.question}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-white/65">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion>
          </div>
        </section>

        <section className="border-t border-white/5 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="text-2xl font-black sm:text-4xl">Explore related BMW models</h2><div className="mt-7 flex flex-wrap gap-3">{related.map((item) => <Link key={item.slug} to={`${BMW_HUB_PATH}/${item.slug}`} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold hover:border-burnt-orange hover:text-burnt-orange">{item.name}</Link>)}</div></div>
        </section>

        <section className="bg-gradient-to-br from-blue-900/30 via-charcoal/30 to-black py-16"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><h2 className="text-3xl font-black sm:text-5xl">Book {model.name} service or diagnosis</h2><p className="mx-auto mt-5 max-w-2xl text-white/65">Send the VIN, year, mileage, warning text and when the symptom occurs so the workshop can prepare the right first inspection.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsappText}`}><MessageCircle className="h-4 w-4" /> WhatsApp Digi-Tec</a><Link className="btn-secondary" to={BMW_HUB_PATH}>Return to BMW hub</Link></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default BmwModelPage;
