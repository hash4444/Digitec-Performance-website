import { ArrowRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PORSCHE_HUB_PATH } from '@/data/porscheArchitecture';
import { getPorscheModelByPath, porscheModelPages, type PorscheModelSection } from '@/data/porscheModelPages';
import { useSeo } from '@/hooks/use-seo';
import { stripLocalePrefix } from '@/i18n/use-locale';
import { buildBreadcrumb, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const SystemSection = ({ section }: { section: PorscheModelSection }) => (
  <section className="card-premium rounded-2xl p-5 sm:p-7">
    <h2 className="text-xl font-black sm:text-2xl">{section.title}</h2>
    <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">{section.summary}</p>
    <ul className="mt-5 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/70"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" /><span>{point}</span></li>)}</ul>
  </section>
);

const PorscheModelPage = () => {
  const { pathname } = useLocation();
  const path = stripLocalePrefix(pathname).replace(/\/$/, '') || '/';
  const model = getPorscheModelByPath(path);
  const canonical = model ? `${SITE_URL}${model.path}` : `${SITE_URL}${PORSCHE_HUB_PATH}`;
  const breadcrumb = model ? buildBreadcrumb(canonical, [
    { name: 'Home', url: SITE_URL },
    { name: 'Porsche', url: `${SITE_URL}${PORSCHE_HUB_PATH}` },
    ...(model.parentPath ? [{ name: model.parentLabel ?? 'Model', url: `${SITE_URL}${model.parentPath}` }] : []),
    { name: model.shortName, url: canonical },
  ]) : undefined;
  const jsonLd = model ? pageGraph([
    buildWebPage({ url: canonical, name: model.h1, description: model.metaDescription, breadcrumbId: `${canonical}#breadcrumb`, mainEntityId: `${canonical}#service` }),
    breadcrumb!,
    buildService({ url: canonical, name: model.h1, serviceType: `${model.name} inspection, maintenance and repair`, description: model.metaDescription, brand: 'Porsche', areaServed: ['Dubai'] }),
  ]) : undefined;
  useSeo({ title: model?.metaTitle ?? 'Porsche Service Dubai | Digi-Tec', description: model?.metaDescription ?? 'Porsche service in Dubai.', canonical, noindex: !model, jsonLd });
  if (!model) return <Navigate to={PORSCHE_HUB_PATH} replace />;
  const whatsapp = `https://wa.me/97143402223?text=${encodeURIComponent(`Hi Digi-Tec, I would like to arrange a ${model.shortName} inspection.\n\nModel year: \nVIN: \nMileage: \nWarning or symptom: `)}`;
  const siblings = porscheModelPages.filter((item) => item.path !== model.path && !item.parentPath);
  return <div className="min-h-screen bg-black text-off-white">
    <Header />
    <main>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6"><ol className="flex flex-wrap gap-2"><li><Link to="/">Home</Link></li><li>/</li><li><Link to={PORSCHE_HUB_PATH}>Porsche</Link></li>{model.parentPath ? <><li>/</li><li><Link to={model.parentPath}>{model.parentLabel}</Link></li></> : null}<li>/</li><li className="text-white">{model.shortName}</li></ol></nav>
      <section className="border-b border-white/5 py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><p className="eyebrow mb-4">Porsche model guide</p><h1 className="max-w-5xl text-4xl font-black sm:text-6xl">{model.h1}</h1><p className="mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-lg">{model.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-primary" href={whatsapp}><MessageCircle className="h-4 w-4" /> WhatsApp your concern</a><a className="btn-secondary" href="tel:+97143402223"><Phone className="h-4 w-4" /> Call +971 4 340 2223</a></div></div></section>
      <section className="py-14 sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow mb-4">Coverage</p><h2 className="text-3xl font-black">Which {model.shortName} vehicles this page covers</h2></div><ul className="grid gap-4">{model.coverage.map((item) => <li key={item} className="card-premium flex gap-3 rounded-2xl p-5 text-sm leading-relaxed text-white/70"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />{item}</li>)}</ul></div></section>
      <section className="bg-charcoal/20 py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mb-10 text-center"><p className="eyebrow mb-4">Model-specific systems</p><h2 className="text-3xl font-black sm:text-4xl">What changes the service and repair plan</h2></div><div className="grid gap-5 lg:grid-cols-2">{model.sections.map((section) => <SystemSection key={section.title} section={section} />)}</div></div></section>
      <section className="border-y border-white/5 py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><p className="eyebrow mb-4">Start with the symptom</p><h2 className="text-3xl font-black">Concerns {model.shortName} owners describe</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{model.symptoms.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><h3 className="font-bold">{item.title}</h3><p className="mt-3 text-sm text-white/60">{item.detail}</p><Link to={item.path} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">{item.label}<ArrowRight className="h-4 w-4" /></Link></article>)}</div></div></section>
      <section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="text-3xl font-black">Relevant DIGI-TEC services</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{model.services.map((item) => <Link key={item.path} to={item.path} className="card-premium group rounded-2xl p-6"><h3 className="font-bold group-hover:text-burnt-orange">{item.label}</h3><p className="mt-3 text-sm text-white/55">{item.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">View service <ArrowRight className="h-4 w-4" /></span></Link>)}</div></div></section>
      <section className="border-y border-white/5 py-14 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow mb-4">Questions before booking</p><h2 className="text-3xl font-black">{model.shortName} service FAQ</h2></div><Accordion type="single" collapsible className="space-y-3">{model.faqs.map((faq, i) => <AccordionItem key={faq.question} value={`faq-${i}`} className="rounded-2xl border border-white/10 px-5"><AccordionTrigger className="text-left">{faq.question}</AccordionTrigger><AccordionContent className="leading-relaxed text-white/65">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="text-2xl font-black">Continue through the Porsche knowledge centre</h2><div className="mt-6 flex flex-wrap gap-3"><Link className="btn-secondary" to={PORSCHE_HUB_PATH}>Porsche hub</Link>{siblings.slice(0, 5).map((item) => <Link key={item.path} className="btn-secondary" to={item.path}>{item.shortName}</Link>)}</div></div></section>
    </main><Footer />
  </div>;
};

export default PorscheModelPage;
