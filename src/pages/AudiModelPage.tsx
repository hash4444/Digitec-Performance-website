import { ArrowRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AUDI_HUB_PATH, audiModelPages, audiModelPath, getAudiModelBySlug } from '@/data/audiModelPages';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildFAQ, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const workshopImage = '/images/mercedes-repair-dubai-hero.jpg';

const AudiModelPage = () => {
  const { pathname } = useLocation();
  const model = getAudiModelBySlug(pathname.split('/').filter(Boolean).pop());
  const path = model ? audiModelPath(model) : AUDI_HUB_PATH;
  const canonical = `${SITE_URL}${path}`;
  const faq = model ? buildFAQ(canonical, model.faqs.map((item) => ({ question: item.question, answer: item.answer }))) : null;
  const jsonLd = model ? pageGraph([
    buildWebPage({ url: canonical, name: model.metaTitle, description: model.metaDescription, breadcrumbId: `${canonical}#breadcrumb`, primaryImage: workshopImage, mainEntityId: `${canonical}#service`, dateModified: '2026-08-31' }),
    buildBreadcrumb(canonical, [
      { name: 'Home', url: `${SITE_URL}/` }, { name: 'Brands', url: `${SITE_URL}/brands` }, { name: 'Audi', url: `${SITE_URL}${AUDI_HUB_PATH}` }, { name: model.name, url: canonical },
    ]),
    buildService({ url: canonical, name: model.h1, serviceType: `${model.name} maintenance, diagnostics and repair`, description: model.metaDescription, image: workshopImage, brand: 'Audi', offers: model.services.map((item) => item.label), areaServed: ['Dubai'] }),
    faq,
  ]) : undefined;

  useSeo({ title: model?.metaTitle ?? 'Audi Models | Digi-Tec Dubai', description: model?.metaDescription ?? 'Audi model service and repair information from Digi-Tec in Dubai.', canonical, ogImage: workshopImage, ogImageAlt: model ? `${model.name} service and repair at Digi-Tec in Dubai` : undefined, jsonLd, hasArabicVersion: false });
  if (!model) return <Navigate to={AUDI_HUB_PATH} replace />;

  const related = audiModelPages.filter((item) => item.slug !== model.slug && item.series === model.series).slice(0, 3);
  const whatsapp = encodeURIComponent(`Hi, I would like to arrange an ${model.name} inspection at Digi-Tec. Model year: ____; mileage: ____; issue: ____.`);
  const systemSections = [
    ['Vehicle coverage', model.generations], ['Engine systems', model.engines], ['Transmission & quattro', model.transmission], ['Suspension & chassis', model.suspension],
  ];

  return <div className="min-h-screen bg-black text-off-white">
    <Header />
    <main>
      <nav aria-label="Breadcrumb" className="border-b border-white/5"><ol className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 text-xs text-white/55 sm:px-6"><li><Link to="/" className="hover:text-burnt-orange">Home</Link></li><li>/</li><li><Link to="/brands" className="hover:text-burnt-orange">Brands</Link></li><li>/</li><li><Link to={AUDI_HUB_PATH} className="hover:text-burnt-orange">Audi</Link></li><li>/</li><li className="text-white/85">{model.name}</li></ol></nav>
      <section className="relative isolate overflow-hidden border-b border-white/10"><img src={workshopImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" /><div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24"><p className="eyebrow mb-5">Audi {model.series} expertise</p><h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{model.h1}</h1><p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">{model.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsapp}`}><MessageCircle className="h-4 w-4" /> Book Audi inspection</a><a className="btn-secondary" href="tel:+97143402223"><Phone className="h-4 w-4" /> Call +971 4 340 2223</a></div><p className="mt-4 text-xs text-white/45">Include the VIN, year, mileage, warning text and when the issue occurs. The appropriate inspection is confirmed for the exact vehicle.</p></div></section>
      <section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mb-10 max-w-3xl"><p className="eyebrow mb-4">Model-specific service</p><h2 className="text-2xl font-black sm:text-4xl">What changes the {model.name} repair plan</h2></div><div className="grid gap-5 lg:grid-cols-2">{systemSections.map(([title, copy]) => <article key={title} className="card-premium rounded-2xl p-6"><h2 className="text-xl font-black">{title}</h2><p className="mt-3 text-sm leading-relaxed text-white/65">{copy}</p></article>)}</div></div></section>
      <section className="border-y border-white/5 bg-charcoal/20 py-14 sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2"><div><p className="eyebrow mb-4">Common concerns</p><h2 className="text-2xl font-black sm:text-4xl">Audi {model.name.replace('Audi ', '')} problems that need diagnosis</h2><ul className="mt-6 space-y-4">{model.commonProblems.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />{item}</li>)}</ul></div><div className="rounded-2xl border border-burnt-orange/25 bg-burnt-orange/5 p-6"><p className="eyebrow mb-4">Dubai ownership</p><h2 className="text-xl font-black">Preventive checks that make sense locally</h2><ul className="mt-5 space-y-4">{model.dubaiCare.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" />{item}</li>)}</ul><h3 className="mt-7 font-bold">Book promptly if you notice</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{model.warningSigns.join(' · ')}</p></div></div></section>
      <section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><p className="eyebrow mb-4">Relevant service pages</p><h2 className="text-2xl font-black sm:text-4xl">The next step after diagnosis</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{model.services.map((item) => <Link key={item.path} to={item.path} className="card-premium group rounded-2xl p-6"><h3 className="font-bold group-hover:text-burnt-orange">{item.label}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">View service <ArrowRight className="h-4 w-4" /></span></Link>)}</div></div></section>
      <section className="border-y border-white/5 py-14 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow mb-4">Direct answers</p><h2 className="text-2xl font-black sm:text-4xl">{model.name} FAQ</h2></div><Accordion type="single" collapsible className="space-y-3">{model.faqs.map((item, index) => <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-xl border border-white/10 bg-white/[0.025] px-5"><AccordionTrigger className="text-left font-bold hover:text-burnt-orange">{item.question}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-white/65">{item.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="bg-gradient-to-br from-burnt-orange/20 via-charcoal/30 to-black py-14 sm:py-20"><div className="mx-auto max-w-5xl px-4 text-center sm:px-6"><p className="eyebrow mb-4">Clear booking information</p><h2 className="text-3xl font-black sm:text-5xl">Request {model.name} service or diagnosis</h2><p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/65">Tell us the model year, mileage and issue, then Digi-Tec can confirm the suitable inspection and available scope before work begins.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a className="btn-primary" href={`https://wa.me/97143402223?text=${whatsapp}`}><MessageCircle className="h-4 w-4" /> WhatsApp workshop</a><Link className="btn-secondary" to={AUDI_HUB_PATH}>Return to Audi hub</Link></div></div></section>
      {related.length ? <section className="py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="text-xl font-black">Related Audi model pages</h2><div className="mt-5 flex flex-wrap gap-3">{related.map((item) => <Link key={item.slug} to={audiModelPath(item)} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:text-burnt-orange">{item.name} <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></Link>)}</div></div></section> : null}
    </main><Footer />
  </div>;
};
export default AudiModelPage;
