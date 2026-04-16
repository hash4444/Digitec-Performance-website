import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';
import { getServiceBySlug, services } from '@/data/services';
import { ChevronRight, Check, MessageCircle, Phone } from 'lucide-react';

// Map old Google-indexed slugs to correct destinations
const SLUG_REDIRECTS: Record<string, string> = {
  'mercedes-brake-repair-dubai': '/services/brake-system-repairs',
  'mercedes-transmission-repair-dubai': '/services/transmission-services',
  'mercedes-ac-repair-dubai': '/services/ac-repair-maintenance',
  'mercedes-suspension-repair-dubai': '/services/suspension-repair',
  'performance-tuning-dubai': '/tuning',
  'engine-diagnostics-dubai': '/services/car-programming-diagnostic',
  'mercedes-oil-change-dubai': '/services/oil-change-service',
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();

  // Check custom redirect map first
  const customRedirect = slug ? SLUG_REDIRECTS[slug] : undefined;

  // Then check generic -dubai suffix
  const isDubaiSuffix = !customRedirect && slug?.endsWith('-dubai');
  const effectiveSlug = isDubaiSuffix ? slug.replace(/-dubai$/, '') : slug;
  const service = !customRedirect && effectiveSlug ? getServiceBySlug(effectiveSlug) : undefined;

  useSeo({
    title: service ? `${service.seoKeyword} | DIGI-TEC Performance Center` : 'Service Not Found | DIGI-TEC',
    description: service ? `${service.intro.slice(0, 155)}…` : '',
    canonical: service ? `https://digitecme.com/services/${service.slug}` : undefined,
  });

  if (customRedirect) {
    return <Navigate to={customRedirect} replace />;
  }

  if (isDubaiSuffix && service) {
    return <Navigate to={`/services/${effectiveSlug}`} replace />;
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

  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
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
            <Link to="/services" className="hover:text-burnt-orange transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-burnt-orange">{service.title}</span>
          </nav>
          <span className="text-burnt-orange font-semibold text-sm uppercase tracking-widest mb-3 block">
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

              {/* Local Intent */}
              <div className="bg-charcoal/40 border border-gray-800/50 rounded-2xl p-6 sm:p-8">
                <p className="text-gray-300 leading-relaxed text-lg italic">{service.localIntent}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-charcoal/60 border border-gray-800/50 rounded-2xl p-6 sticky top-24">
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
                </ul>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/97143402223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 rounded-xl transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:+97143402223"
                    className="flex items-center justify-center gap-2 w-full border border-burnt-orange/50 text-burnt-orange hover:bg-burnt-orange/10 font-bold py-3 rounded-xl transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
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
                  className="group bg-charcoal/60 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-burnt-orange/50 transition-all duration-300"
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

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default ServicePage;
