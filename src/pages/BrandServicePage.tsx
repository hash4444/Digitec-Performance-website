import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Wrench, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BRAND_PROFILES,
  getBrandServiceCombo,
  getServicesForBrand,
} from '@/data/brandServices';
import { getBrandBySlug } from '@/data/brands';
import {
  buildBreadcrumb,
  buildFAQ,
  buildService,
  buildWebPage,
  pageGraph,
  SITE_URL,
} from '@/lib/schema';

const BrandServicePage: React.FC = () => {
  const { brandSlug, serviceSlug } = useParams<{ brandSlug: string; serviceSlug: string }>();
  const combo = brandSlug && serviceSlug ? getBrandServiceCombo(brandSlug, serviceSlug) : undefined;
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  const profile = brandSlug ? BRAND_PROFILES[brandSlug] : undefined;

  const url = combo ? `${SITE_URL}/brands/${combo.brandSlug}/${combo.serviceSlug}` : SITE_URL;

  const jsonLd = React.useMemo(() => {
    if (!combo || !brand || !profile) return undefined;
    const breadcrumb = buildBreadcrumb(url, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Brands', url: `${SITE_URL}/services` },
      { name: combo.brandName, url: `${SITE_URL}/brands/${combo.brandSlug}` },
      { name: combo.serviceName, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: combo.h1,
      description: combo.metaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: brand.logo,
    });
    const service = buildService({
      url,
      name: combo.h1,
      serviceType: `${combo.brandName} ${combo.serviceType}`,
      description: combo.heroCopy,
      brand: combo.brandName,
      offers: combo.processSteps.map((s) => `${combo.brandName} ${s.title}`),
      areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'United Arab Emirates'],
      keywords: [
        `${combo.brandName} ${combo.serviceName} Dubai`,
        `${combo.brandName} service Dubai`,
        `${combo.brandName} workshop Dubai`,
        ...combo.models.slice(0, 3).map((m) => `${combo.brandName} ${m} ${combo.serviceName}`),
      ],
    });
    const faq = buildFAQ(url, combo.faqs);
    return pageGraph([webPage, breadcrumb, service, ...(faq ? [faq] : [])]);
  }, [combo, brand, profile, url]);

  useSeo({
    title: combo ? combo.metaTitle : 'Brand Service | Digi-Tec Performance Centre',
    description: combo ? combo.metaDescription : 'Specialist brand service in Dubai at Digi-Tec Performance Centre.',
    canonical: combo ? url : `${SITE_URL}/services`,
    jsonLd,
  });

  if (!combo || !brand) {
    return <Navigate to="/services" replace />;
  }

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(combo.whatsAppMessage)}`;
  const otherServices = getServicesForBrand(combo.brandSlug).filter((s) => s.serviceSlug !== combo.serviceSlug);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/services" className="hover:text-burnt-orange">Brands</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to={`/brands/${combo.brandSlug}`} className="hover:text-burnt-orange">{combo.brandName}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-off-white font-semibold">{combo.serviceName}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 p-2 bg-white/90 rounded-full shadow-xl flex items-center justify-center">
                <img src={brand.logo} alt={`${combo.brandName} logo`} className="w-full h-full object-contain" />
              </div>
              <span className="text-burnt-orange font-bold uppercase tracking-widest text-[11px] sm:text-sm">
                {combo.brandName} Specialists
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              {combo.brandName} <span className="text-burnt-orange">{combo.serviceName}</span> Dubai
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              {combo.heroCopy}
            </p>
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
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">
            When to Book <span className="text-burnt-orange">{combo.brandName} {combo.serviceName}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {combo.symptoms.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-black/50 border border-white/5 rounded-2xl p-4 sm:p-5">
                <CheckCircle2 className="w-5 h-5 text-burnt-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            {combo.brandName} Models We <span className="text-burnt-orange">{combo.serviceName}</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            Every current and recent {combo.brandName} platform is supported in our Al Quoz workshop.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {combo.models.map((m) => (
              <div key={m} className="bg-black/50 border border-white/5 rounded-2xl p-3 sm:p-4 text-center">
                <span className="text-off-white text-xs sm:text-sm font-semibold">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-10">
            Our <span className="text-burnt-orange">{combo.serviceName}</span> Process
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {combo.processSteps.map((step, i) => (
              <div key={i} className="bg-gradient-to-br from-charcoal/60 to-black/40 border border-white/5 rounded-3xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-burnt-orange text-black font-black flex items-center justify-center text-sm">{i + 1}</span>
                  <h3 className="text-base sm:text-lg font-bold text-off-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-11">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-burnt-orange flex-shrink-0" />
            <div>
              <h2 className="text-xl sm:text-3xl font-black mb-3">
                Genuine <span className="text-burnt-orange">{combo.brandName}</span> Parts, Documented
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{combo.partsCopy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10">
            {combo.brandName} {combo.serviceName} <span className="text-burnt-orange">FAQs</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {combo.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-0 bg-black/50 border border-white/5 rounded-2xl px-5 sm:px-6">
                <AccordionTrigger className="text-left text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-5">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links: other services for this brand */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-burnt-orange" />
            <h2 className="text-2xl sm:text-4xl font-black">
              More <span className="text-burnt-orange">{combo.brandName}</span> Services
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.serviceSlug}
                to={`/brands/${combo.brandSlug}/${s.serviceSlug}`}
                className="group flex flex-col justify-between bg-black/50 border border-white/5 hover:border-burnt-orange/40 rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                  {combo.brandName} {s.label}
                </span>
                <ArrowRight className="w-4 h-4 text-burnt-orange mt-3" />
              </Link>
            ))}
            <Link
              to={`/brands/${combo.brandSlug}`}
              className="group flex flex-col justify-between bg-burnt-orange/10 border border-burnt-orange/30 hover:bg-burnt-orange/20 rounded-2xl p-4 sm:p-5 transition-all duration-300"
            >
              <span className="text-off-white font-bold text-sm sm:text-base leading-tight">
                All {combo.brandName} Services
              </span>
              <ArrowRight className="w-4 h-4 text-burnt-orange mt-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp Digi-Tec about ${combo.brandName} ${combo.serviceName}`}
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

export default BrandServicePage;
