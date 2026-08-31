import { AlertTriangle, ArrowRight, CheckCircle2, MessageCircle, ShieldAlert, Stethoscope } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MERCEDES_HUB_PATH } from '@/data/mercedesModelPages';
import {
  MERCEDES_GUIDE_PUBLISHED,
  MERCEDES_PROBLEMS_PATH,
  getMercedesProblemGuide,
  mercedesProblemGuides,
} from '@/data/mercedesProblemGuides';
import { useSeo } from '@/hooks/use-seo';
import { buildArticle, buildBreadcrumb, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const guideImage = '/images/mercedes-repair-dubai-hero.jpg';

const MercedesProblemGuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getMercedesProblemGuide(slug) : undefined;
  const canonical = guide ? `${SITE_URL}${guide.path}` : `${SITE_URL}${MERCEDES_PROBLEMS_PATH}`;
  const articleId = `${canonical}#article`;

  const jsonLd = guide
    ? pageGraph([
        buildWebPage({
          url: canonical,
          name: guide.metaTitle,
          description: guide.metaDescription,
          type: 'ItemPage',
          breadcrumbId: `${canonical}#breadcrumb`,
          primaryImage: guideImage,
          datePublished: MERCEDES_GUIDE_PUBLISHED,
          dateModified: MERCEDES_GUIDE_PUBLISHED,
          mainEntityId: articleId,
        }),
        buildBreadcrumb(canonical, [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Mercedes-Benz Repair & Service Dubai', url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
          { name: 'Mercedes Problems & Guides', url: `${SITE_URL}${MERCEDES_PROBLEMS_PATH}` },
          { name: guide.h1, url: canonical },
        ]),
        buildArticle({
          url: canonical,
          headline: guide.title,
          description: guide.summary,
          datePublished: MERCEDES_GUIDE_PUBLISHED,
          dateModified: MERCEDES_GUIDE_PUBLISHED,
          author: 'DIGI-TEC Workshop',
          authorType: 'Organization',
          image: guideImage,
          section: 'Mercedes diagnostic guides',
          keywords: `${guide.h1}, Mercedes diagnostics Dubai, Mercedes warning guide`,
        }),
      ])
    : undefined;

  useSeo({
    title: guide?.metaTitle ?? 'Mercedes Problems & Diagnostic Guides | Digi-Tec',
    description: guide?.metaDescription ?? 'Mercedes-Benz symptom and diagnostic guides from Digi-Tec in Dubai.',
    canonical,
    ogImage: guideImage,
    ogImageAlt: guide ? `${guide.h1} diagnostic guide from Digi-Tec in Dubai` : undefined,
    ogType: 'article',
    jsonLd,
    hasArabicVersion: false,
  });

  if (!guide) return <Navigate to={MERCEDES_PROBLEMS_PATH} replace />;

  const index = mercedesProblemGuides.findIndex((item) => item.slug === guide.slug);
  const adjacent = [mercedesProblemGuides[index - 1], mercedesProblemGuides[index + 1]].filter(Boolean);
  const whatsappText = encodeURIComponent(`Hi, I need a Mercedes diagnostic appointment. The symptom is: ${guide.h1}. My model/year is ____.`);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5">
          <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={MERCEDES_HUB_PATH} className="hover:text-burnt-orange">Mercedes-Benz</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={MERCEDES_PROBLEMS_PATH} className="hover:text-burnt-orange">Problems & guides</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/80">{guide.h1}</li>
          </ol>
        </nav>

        <section className="relative isolate overflow-hidden border-b border-white/10 py-16 sm:py-24">
          <img src={guideImage} alt="Mercedes diagnostic inspection inside the Digi-Tec workshop in Dubai" className="absolute inset-0 h-full w-full object-cover opacity-20" width="1920" height="1080" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/65" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="rounded-full border border-burnt-orange/35 bg-burnt-orange/10 px-3 py-1.5 text-burnt-orange">Informational diagnostic guide</span>
              {guide.urgent ? <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-red-200">Driving risk included</span> : null}
            </div>
            <h1 className="max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{guide.h1}</h1>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-xl">{guide.summary}</p>
            <p className="mt-6 text-sm text-white/45">Reviewed for diagnostic intent on 31 August 2026 · This guide does not replace inspection of the exact vehicle.</p>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <article className="min-w-0">
            <section className="rounded-2xl border border-burnt-orange/30 bg-burnt-orange/[0.08] p-5 sm:p-7" aria-labelledby="short-answer-heading">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-burnt-orange">Short answer</p>
              <h2 id="short-answer-heading" className="mt-3 text-xl font-black sm:text-2xl">The symptom is evidence, not a parts diagnosis</h2>
              <p className="mt-3 leading-relaxed text-white/70">{guide.summary}</p>
            </section>

            <div className="mt-12 space-y-12">
              {guide.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-black sm:text-3xl">{section.title}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-relaxed text-white/70">{paragraph}</p>)}
                  </div>
                  {section.points?.length ? (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-relaxed text-white/65">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-5 sm:p-7">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-300" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-black sm:text-2xl">Should you continue driving?</h2>
                    <p className="mt-3 leading-relaxed text-white/70">{guide.driveAdvice}</p>
                  </div>
                </div>
              </section>

              <section>
                <p className="eyebrow mb-4">Evidence-led process</p>
                <h2 className="text-2xl font-black sm:text-3xl">How this Mercedes symptom should be diagnosed</h2>
                <ol className="mt-6 space-y-4">
                  {guide.diagnosticSteps.map((step, stepIndex) => (
                    <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-burnt-orange text-sm font-black text-black">{stepIndex + 1}</span>
                      <p className="pt-1.5 text-sm leading-relaxed text-white/70 sm:text-base">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-2xl border border-white/10 bg-charcoal/25 p-5 sm:p-7">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-burnt-orange" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-black sm:text-2xl">Why a fault code does not prove a component failed</h2>
                    <p className="mt-3 leading-relaxed text-white/70">{guide.faultCodeNote}</p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-start gap-3">
                  <Stethoscope className="mt-0.5 h-6 w-6 shrink-0 text-burnt-orange" aria-hidden="true" />
                  <div>
                    <h2 className="text-2xl font-black sm:text-3xl">When professional diagnosis is appropriate</h2>
                    <p className="mt-4 leading-relaxed text-white/70">{guide.professionalHelp}</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black sm:text-3xl">Frequently asked questions</h2>
                <Accordion type="single" collapsible className="mt-6 space-y-3">
                  {guide.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faq.question} value={`faq-${faqIndex}`} className="rounded-xl border border-white/10 bg-white/[0.025] px-5">
                      <AccordionTrigger className="text-left font-bold hover:text-burnt-orange">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-white/65">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-burnt-orange/30 bg-burnt-orange/[0.08] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-burnt-orange">After diagnosis</p>
              <h2 className="mt-3 text-lg font-black">Related commercial service</h2>
              <div className="mt-4 space-y-4">
                {guide.relatedServices.map((item) => (
                  <div key={item.path}>
                    <Link to={item.path} className="font-bold text-off-white hover:text-burnt-orange">{item.label}</Link>
                    <p className="mt-1 text-xs leading-relaxed text-white/55">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <h2 className="text-lg font-black">Relevant model pages</h2>
              <ul className="mt-4 space-y-3">
                {guide.relatedModels.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-burnt-orange">{item.label} <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <h2 className="text-lg font-black">Need the symptom checked?</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">Send the model, year, VIN, warning text and when it occurs. Digi-Tec can confirm the appropriate first inspection.</p>
              <a href={`https://wa.me/97143402223?text=${whatsappText}`} className="mt-5 inline-flex items-center gap-2 font-bold text-burnt-orange hover:text-off-white"><MessageCircle className="h-4 w-4" /> WhatsApp Digi-Tec</a>
            </section>
          </aside>
        </div>

        <section className="border-t border-white/5 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl font-black sm:text-2xl">Continue through the Mercedes knowledge cluster</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {adjacent.map((item) => (
                <Link key={item.path} to={item.path} className="card-premium group rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-burnt-orange">Diagnostic guide</p>
                  <h3 className="mt-2 font-bold group-hover:text-burnt-orange">{item.h1}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-white/55">Read guide <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={MERCEDES_PROBLEMS_PATH} className="btn-secondary">All Mercedes problem guides</Link>
              <Link to={MERCEDES_HUB_PATH} className="btn-secondary">Mercedes service hub</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MercedesProblemGuidePage;
