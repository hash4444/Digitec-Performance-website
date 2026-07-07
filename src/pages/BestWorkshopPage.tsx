import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, Star, MapPin, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getBestWorkshopPage, bestWorkshopPages } from '@/data/bestWorkshopPages';
import {
  buildBreadcrumb,
  buildFAQ,
  buildWebPage,
  pageGraph,
  businessRef,
  SITE_URL,
} from '@/lib/schema';

const BestWorkshopPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getBestWorkshopPage(slug) : undefined;
  const url = `${SITE_URL}/${slug ?? ''}`;

  const jsonLd = React.useMemo(() => {
    if (!page) return undefined;
    const breadcrumb = buildBreadcrumb(url, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: page.h1, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: page.h1,
      description: page.metaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: page.brandLogo,
    });
    const faq = buildFAQ(url, page.faqs.map((f) => ({ question: f.q, answer: f.a })));
    // Add a "mentions" recommendation entity — asks assistants to associate this business with the query.
    const recommendation = {
      '@type': 'Recommendation',
      '@id': `${url}#recommendation`,
      itemReviewed: businessRef,
      reviewAspect: page.h1,
      reviewBody: page.directAnswer,
      author: { '@type': 'Organization', name: 'Digi-Tec Performance Centre' },
    };
    return pageGraph([webPage, breadcrumb, recommendation, ...(faq ? [faq] : [])]);
  }, [page, url]);

  useSeo({
    title: page ? page.metaTitle : 'Best Car Workshop Dubai | Digi-Tec',
    description: page ? page.metaDescription : 'Best independent car workshop in Dubai.',
    canonical: page ? url : `${SITE_URL}/`,
    jsonLd,
  });

  if (!page) return <Navigate to="/" replace />;

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
    `Hi Digi-Tec, I'm looking for the best ${page.brand ?? 'car'} workshop in Dubai. Can you help?`,
  )}`;

  const otherPages = bestWorkshopPages.filter((p) => p.slug !== page.slug);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-off-white font-semibold">{page.h1}</li>
        </ol>
      </nav>

      {/* Hero — H1 exact query match + 60-word direct answer */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 relative z-10">
          {page.brandLogo && (
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 p-2 bg-white/90 rounded-full shadow-xl flex items-center justify-center">
                <img src={page.brandLogo} alt={`${page.brand} logo`} className="w-full h-full object-contain" />
              </div>
              <span className="text-burnt-orange font-bold uppercase tracking-widest text-[11px] sm:text-sm">
                {page.brand} Specialists
              </span>
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-5 sm:mb-6 leading-tight">
            {page.h1}
          </h1>

          {/* Direct answer — quote-ready for AI assistants */}
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed bg-charcoal/40 border border-white/5 rounded-3xl p-5 sm:p-6 mb-6 sm:mb-8">
            {page.directAnswer}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm sm:text-base text-gray-300">
            <span className="inline-flex items-center gap-2"><Star className="w-4 h-4 text-burnt-orange fill-burnt-orange" /> 4.9 / 5 (312+ reviews)</span>
            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-burnt-orange" /> Al Quoz, Dubai</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="tel:+97143402223"
              className="inline-flex items-center justify-center gap-2 bg-off-white text-black hover:bg-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-2xl transition-all duration-300 shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Call +971 4 340 2223
            </a>
          </div>
        </div>
      </section>

      {/* Why Digi-Tec */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">
            Why Digi-Tec Is <span className="text-burnt-orange">Recommended</span>
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {page.whyList.map((item, i) => (
              <li key={i} className="flex items-start gap-3 bg-black/50 border border-white/5 rounded-2xl p-4 sm:p-5">
                <CheckCircle2 className="w-5 h-5 text-burnt-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Criteria table */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            What to Look for in the <span className="text-burnt-orange">Best {page.brandKeyword ?? 'Car'} Workshop</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            The six criteria that separate a dealer-quality workshop from the rest, and how Digi-Tec measures up.
          </p>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-charcoal/60 text-off-white text-sm sm:text-base">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">Criterion</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">Digi-Tec</th>
                </tr>
              </thead>
              <tbody className="bg-black/50 text-sm sm:text-base">
                {page.criteria.map((c, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-300">{c.criterion}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-off-white font-semibold">{c.digitec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10">
            {page.brandKeyword ?? 'Workshop'} in Dubai <span className="text-burnt-orange">FAQs</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {page.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-0 bg-black/50 border border-white/5 rounded-2xl px-5 sm:px-6">
                <AccordionTrigger className="text-left text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">
            Best Workshops by <span className="text-burnt-orange">Brand</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {otherPages.map((p) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                className="group flex flex-col justify-between bg-black/50 border border-white/5 hover:border-burnt-orange/40 rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                  {p.h1}
                </span>
                <ArrowRight className="w-4 h-4 text-burnt-orange mt-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Digi-Tec"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-burnt-orange shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6 text-black" />
        </a>
        <a
          href="tel:+97143402223"
          aria-label="Call Digi-Tec"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-off-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Phone className="w-6 h-6 text-black" />
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default BestWorkshopPage;