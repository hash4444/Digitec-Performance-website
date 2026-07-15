import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';
import { getServiceBySlug, allServices } from '@/data/services';
import { brands } from '@/data/brands';
import { ChevronRight, Check, MessageCircle, Phone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  buildBreadcrumb,
  buildFAQ,
  buildService,
  buildWebPage,
  detectBrand,
  pageGraph,
} from '@/lib/schema';

// Map every legacy slug directly to its new slug (single-hop redirects, no chains).
// Also handles previously-indexed Google URLs.
const OLD_TO_NEW_SLUG: Record<string, string> = {
  // Original slugs → new H1-derived slugs
  'mercedes-repair': 'mercedes-repair-dubai',
  'mechanical-repair': 'mechanical-repair-dubai',
  'transmission-services': 'transmission-repair-dubai',
  'suspension-repair': 'suspension-repair-dubai',
  'steering-repair': 'steering-repair-dubai',
  'brake-system-repairs': 'brake-repair-dubai',
  'routine-maintenance': 'car-service-dubai',
  'oil-change-service': 'oil-change-dubai',
  'tire-repair': 'tire-repair-dubai',
  'battery-changes': 'battery-replacement-dubai',
  'exhaust-repair': 'exhaust-repair-dubai',
  'car-programming-diagnostic': 'car-diagnostics-dubai',
  'electrical-system-repairs': 'auto-electrical-repair-dubai',
  'fuel-system-repair': 'fuel-system-repair-dubai',
  'ac-repair-maintenance': 'car-ac-repair-dubai',
  'car-body-repair': 'car-body-repair-dubai',
  'car-paint-protection': 'paint-protection-dubai',
  // Legacy Google-indexed slugs → new slugs (flattened to one hop)
  'engine-diagnostics-dubai': 'car-diagnostics-dubai',
};

// External redirects (off /services/*)
const EXTERNAL_REDIRECTS: Record<string, string> = {
  'performance-tuning-dubai': '/tuning',
};

interface ServicePageProps {
  slugOverride?: string;
  canonicalPath?: string;
  brandPath?: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ slugOverride, canonicalPath, brandPath }) => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const slug = slugOverride ?? routeSlug;

  const externalRedirect = slug ? EXTERNAL_REDIRECTS[slug] : undefined;
  const newSlug = slug ? OLD_TO_NEW_SLUG[slug] : undefined;
  const service = slug && !newSlug && !externalRedirect ? getServiceBySlug(slug) : undefined;

  // Build the per-page JSON-LD @graph. Sitewide Organization / Business / WebSite
  // are declared in index.html; here we only add page-scoped entities and reference
  // the sitewide ones by @id.
  const serviceJsonLd = React.useMemo(() => {
    if (!service) return undefined;
    const url = `https://digitecme.com${canonicalPath ?? `/services/${service.slug}`}`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: 'Home', url: 'https://digitecme.com/' },
      { name: brandPath ? 'Mercedes-Benz' : 'Services', url: `https://digitecme.com${brandPath ?? '/services'}` },
      { name: service.title, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: service.metaTitle || `${service.title} | DIGI-TEC`,
      description: service.metaDescription || service.description,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: typeof service.image === 'string' ? service.image : undefined,
    });
    const brand = detectBrand(service.slug, service.seoKeyword);
    // For the flagship Mercedes Repair page, expose the full offer catalog Google
    // uses to render service sub-links; other pages get a lean Service entity.
    const isMercedesRepair = service.slug === 'mercedes-repair-dubai';
    const svc = buildService({
      url,
      name: service.title,
      serviceType: service.seoKeyword,
      description: service.metaDescription || service.description,
      image: typeof service.image === 'string' ? service.image : undefined,
      brand,
      ...(isMercedesRepair
        ? {
            offers: [
              'Mercedes Engine Repair',
              'Mercedes Transmission Repair',
              'Mercedes ECU Programming',
              'Mercedes ECU Remapping',
              'Mercedes Suspension Repair',
              'Mercedes Brake Repair',
              'Mercedes Air Conditioning Repair',
              'Mercedes Oil Service',
            ],
            keywords: [
              'Mercedes Repair Dubai',
              'Mercedes Service Dubai',
              'Mercedes Specialist Dubai',
              'Mercedes Garage Dubai',
              'Mercedes Workshop Dubai',
              'Mercedes Diagnostics Dubai',
              'Mercedes ECU Programming Dubai',
              'Mercedes ECU Remapping Dubai',
              'Mercedes Maintenance Dubai',
              'Mercedes-Benz Repair UAE',
            ],
          }
        : {}),
    });
    const faq = service.faqs && service.faqs.length > 0 ? buildFAQ(url, service.faqs) : null;
    return pageGraph([webPage, breadcrumb, svc, ...(faq ? [faq] : [])]);
  }, [service, canonicalPath, brandPath]);

  useSeo({
    title: service?.metaTitle || (service ? `${service.seoKeyword} | DIGI-TEC Performance Center` : 'Service Not Found | DIGI-TEC'),
    description: service?.metaDescription || (service ? `${service.intro.slice(0, 155)}…` : ''),
    canonical: service ? `https://digitecme.com${canonicalPath ?? `/services/${service.slug}`}` : undefined,
    noindex: !service && !newSlug && !externalRedirect,
    jsonLd: serviceJsonLd,
  });

  if (externalRedirect) {
    return <Navigate to={externalRedirect} replace />;
  }

  if (newSlug) {
    return <Navigate to={`/services/${newSlug}`} replace />;
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-off-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link to="/services" className="text-burnt-orange hover:underline">
              ← Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isMercedes = service.slug.startsWith('mercedes-');
  const related = allServices
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .filter((s) => (isMercedes ? s.slug.startsWith('mercedes-') : !s.slug.startsWith('mercedes-')))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-12 sm:pb-16">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-burnt-orange transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={brandPath ?? '/services'} className="hover:text-burnt-orange transition-colors">{brandPath ? 'Mercedes-Benz' : 'Services'}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-burnt-orange">{service.title}</span>
          </nav>
          <span className="text-burnt-orange font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] mb-3 block">
            {service.category}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Intro */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-5">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{service.intro}</p>
              </div>

              {/* Why It Matters */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-5">Why It Matters</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{service.whyImportant}</p>
              </div>

              {/* Models We Service (optional) */}
              {service.modelsSection && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-5">{service.modelsSection.heading}</h2>
                  <p className="text-gray-300 leading-relaxed text-lg mb-4">{service.modelsSection.intro}</p>
                  <ul className="space-y-3 mb-4">
                    {service.modelsSection.models.map((model, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-lg">
                        <Check className="w-5 h-5 text-burnt-orange mt-1 shrink-0" />
                        {model}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-300 leading-relaxed text-lg">{service.modelsSection.outro}</p>
                </div>
              )}

              {/* Why Choose Digi-Tec */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-5">Why Choose Digi-Tec</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{service.whyChoose}</p>
              </div>

              {/* Services Intro (optional) */}
              {service.servicesIntro && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-5">{service.servicesIntro.heading}</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">{service.servicesIntro.text}</p>
                </div>
              )}

              {/* What's Included */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-5">What's Included</h2>
                <ul className="space-y-3">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-lg">
                      <Check className="w-5 h-5 text-burnt-orange mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extra Sections (optional) */}
              {service.extraSections?.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-5">{section.heading}</h2>
                  {section.text && <p className="text-gray-300 leading-relaxed text-lg mb-4">{section.text}</p>}
                  {section.items && (
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-300 text-lg">
                          <Check className="w-5 h-5 text-burnt-orange mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* FAQs (optional) */}
              {service.faqs && service.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-5">
                    {service.slug === 'oil-change-dubai'
                      ? 'Oil Change FAQs'
                      : service.slug === 'car-service-dubai'
                      ? 'Car Service FAQs'
                      : 'Frequently Asked Questions'}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {service.faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40"
                      >
                        <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 text-base leading-relaxed pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Local Intent */}
              <div className="card-premium rounded-2xl p-6 sm:p-8">
                <p className="text-gray-300 leading-relaxed text-lg italic">{service.localIntent}</p>
              </div>

              {/* Related Blog: Battery */}
              {service.slug === 'battery-replacement-dubai' && (
                <div className="bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block">
                    Learn More
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Want to understand more about your car battery?
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-5">
                    Check out our in-depth guide on why batteries fail in Dubai's heat, warning signs to watch for, and answers to the most common replacement questions.
                  </p>
                  <Link
                    to="/blog/car-battery-replacement-dubai"
                    className="inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Read the Battery Guide
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}

              {/* Related Blog: Brakes */}
              {service.slug === 'brake-repair-dubai' && (
                <div className="bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block">
                    Learn More
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Want to understand more about your brakes?
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-5">
                    Check out our in-depth guide on why brakes wear faster in Dubai, the warning signs to watch for, and answers to the most common brake repair questions.
                  </p>
                  <Link
                    to="/blog/brake-repair-dubai"
                    className="inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Read the Brake Guide
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}

              {/* Related Blog: Mercedes */}
              {service.slug === 'mercedes-repair-dubai' && (
                <div className="bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block">
                    Learn More
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Want the complete Mercedes owner guide for Dubai?
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-5">
                    Read our 2026 Mercedes repair guide covering common UAE issues, AIRMATIC and AMG specifics, warning signs, and how to choose the right specialist workshop.
                  </p>
                  <Link
                    to="/blog/mercedes-repair-dubai-complete-guide"
                    className="inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Read the Mercedes Guide
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}

              {/* Related Blog: Car AC */}
              {service.slug === 'car-ac-repair-dubai' && (
                <div className="bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block">
                    Learn More
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Why does your car AC stop cooling in Dubai?
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-5">
                    Read our specialist guide on why AC systems fail in Dubai's heat, the most common compressor and refrigerant issues, and what actually fixes them long term.
                  </p>
                  <Link
                    to="/blog/car-ac-repair-dubai"
                    className="inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Read the AC Repair Guide
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card-premium rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-burnt-orange">Why Choose Us</h3>
                <ul className="space-y-3 text-gray-300 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-burnt-orange mt-1">✓</span>
                    OEM & performance-grade parts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-burnt-orange mt-1">✓</span>
                    Factory-trained technicians
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-burnt-orange mt-1">✓</span>
                    Transparent pricing, no hidden fees
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-burnt-orange mt-1">✓</span>
                    40+ years, 50,000+ vehicles serviced
                  </li>
                </ul>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/97143402223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-burnt-orange hover:bg-[#ff7d4d] text-black font-bold text-sm uppercase tracking-[0.12em] py-3.5 rounded-lg transition-colors duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:+97143402223"
                    className="flex items-center justify-center gap-2 w-full border border-white/20 text-off-white hover:border-burnt-orange/70 hover:text-burnt-orange font-bold text-sm uppercase tracking-[0.12em] py-3.5 rounded-lg transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                  <p className="text-[11px] text-gray-500 text-center leading-snug pt-1">
                    Free assessment · No obligation · Reply within minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="py-16 border-t border-gray-800/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Related Services</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="card-premium group rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg group-hover:text-burnt-orange transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">{s.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand pages — internal linking to boost brand hub authority for "{brand} service dubai" queries */}
      <section className="py-14 border-t border-gray-800/50 bg-gradient-to-br from-charcoal/30 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Brand Specialists in <span className="text-burnt-orange">Dubai</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Every {service?.title.toLowerCase() ?? 'service'} we perform is available for the marques below.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {brands.map((b) => (
              <Link
                key={b.slug}
                to={`/brands/${b.slug}`}
                aria-label={`${b.name} service Dubai`}
                className="group flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-burnt-orange/40 rounded-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 p-1.5 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src={b.logo} alt={`${b.name} service Dubai`} className="w-full h-full object-contain" />
                </div>
                <span className="text-[11px] sm:text-xs text-gray-300 group-hover:text-burnt-orange text-center font-medium leading-tight">
                  {b.name} Service
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default ServicePage;
