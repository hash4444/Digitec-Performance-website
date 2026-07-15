import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { brands, getBrandBySlug } from '@/data/brands';
import { getServiceBySlug } from '@/data/services';
import {
  BRAND_OFFER_CATALOG,
  buildBreadcrumb,
  buildFAQ,
  buildWebPage,
  businessRef,
  pageGraph,
} from '@/lib/schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BrandBookingForm from '@/components/BrandBookingForm';
import { BRAND_PROFILES, getServicesForBrand } from '@/data/brandServices';
import { CtaAssurance } from '@/components/TrustBar';

const getBrandSeoCopy = (brand: { name: string; specialization: string; whyChoose: { title: string }[] }) => {
  const focusAreas = brand.whyChoose.map((w) => w.title).slice(0, 4);
  return {
    intro: `Digi-Tec Performance Centre is one of Dubai's most established independent specialists for ${brand.name}. From routine servicing to advanced performance work, our workshop in Al Quoz combines factory-grade diagnostics, genuine parts, and technicians who have spent their entire careers inside the ${brand.name} platform. Owners across Dubai, Abu Dhabi, and Sharjah trust us because we deliver dealer-level work without dealer-level downtime or cost.`,
    dubai: `The UAE climate is unforgiving on luxury vehicles. Ambient temperatures above 45°C accelerate oil degradation, stress cooling systems, and shorten the life of rubber bushings, AC components, and battery cells. Every ${brand.name} we service at Digi-Tec is inspected with Dubai conditions in mind. We use heat-rated fluids, recommend shorter service intervals where appropriate, and pay particular attention to cooling, suspension, and air-conditioning systems that bear the brunt of summer driving.`,
    expertise: `Our ${brand.name} specialisation covers ${focusAreas.join(', ')}, and the wider mechanical, electrical, and bodywork disciplines that a modern ${brand.name} demands. We invest in the same factory diagnostic platforms used by the official dealer network, which means accurate fault tracing, correct adaptation resets, and software updates that protect your resale value.`,
    parts: `Every ${brand.name} service at Digi-Tec uses genuine OEM parts and manufacturer-approved fluids by default. Where customers prefer high-quality OE-supplier or performance equivalents, we document the choice clearly and only fit components that match or exceed factory specification. Nothing leaves our workshop without a full inspection report and a transparent breakdown of work completed.`,
    cta: `If you are searching for ${brand.specialization.toLowerCase()} or a trusted ${brand.name} service centre in Dubai, Digi-Tec is ready to help. Call +971 4 340 2223, send a WhatsApp enquiry, or use the booking form on this page to receive a same-day quote and the earliest available workshop slot.`,
  };
};

const SERVICES = [
  {
    title: 'Vehicle Maintenance',
    description:
      'Scheduled servicing, fluid changes, brake work, and preventive maintenance to keep your vehicle at factory standards.',
  },
  {
    title: 'Mechanical Repairs',
    description:
      'Engine, transmission, suspension, and drivetrain repair by certified technicians using genuine parts.',
  },
  {
    title: 'Auto Body & Painting',
    description:
      'Collision repair, panel work, and colour-matched refinishing in a controlled spray-booth environment.',
  },
  {
    title: 'Detailing',
    description:
      'Paint correction, ceramic coating, PPF, and full interior detailing tailored to luxury finishes.',
  },
  {
    title: 'Electrical & Diagnostics',
    description:
      'Advanced OEM-grade diagnostics, ECU coding, and electrical system repair for modern luxury platforms.',
  },
];

const MERCEDES_SERVICE_PATHS: Record<string, string> = {
  'oil-change': '/services/mercedes-oil-change-dubai',
  'brake-repair': '/services/mercedes-brake-repair-dubai',
  'transmission-repair': '/services/mercedes-transmission-repair-dubai',
  'ac-repair': '/services/mercedes-ac-repair-dubai',
  'suspension-repair': '/services/mercedes-suspension-repair-dubai',
  'engine-diagnostics': '/services/mercedes-diagnostics-dubai',
  'mechanical-repair': '/services/mercedes-mechanical-repair-dubai',
  'steering-repair': '/services/mercedes-steering-repair-dubai',
  'battery-replacement': '/services/mercedes-battery-replacement-dubai',
  'electrical-repair': '/services/mercedes-electrical-repair-dubai',
  'exhaust-repair': '/services/mercedes-exhaust-repair-dubai',
  'fuel-system-repair': '/services/mercedes-fuel-system-repair-dubai',
  'body-repair': '/services/mercedes-body-repair-dubai',
  'tire-repair': '/services/mercedes-tire-repair-dubai',
};

const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? getBrandBySlug(slug) : undefined;

  // Model lists per brand — surfaces which vehicles the brand page covers
  // to search engines and AI systems. Editable list, not exhaustive.
  const BRAND_MODELS: Record<string, string[]> = {
    'mercedes-benz-service-dubai': ['A-Class','C-Class','E-Class','CLA','CLS','GLA','GLC','GLE','GLS','S-Class','G-Class','AMG GT','SL','Maybach','EQ Series'],
    'maybach-service-dubai': ['Maybach S-Class','Maybach GLS','Maybach S680','Maybach S580'],
    'porsche-service-dubai': ['911','718 Cayman','718 Boxster','Panamera','Macan','Cayenne','Taycan'],
    'audi-service-dubai': ['A3','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','RS Range','R8','e-tron'],
    'bmw-service-dubai': ['1 Series','3 Series','4 Series','5 Series','7 Series','8 Series','X1','X3','X5','X6','X7','M Range','i Range'],
    'lamborghini-service-dubai': ['Huracán','Urus','Revuelto','Aventador'],
    'bentley-service-dubai': ['Continental GT','Flying Spur','Bentayga'],
    'mclaren-service-dubai': ['720S','765LT','Artura','GT','750S'],
    'ferrari-service-dubai': ['Roma','Portofino','296','SF90','812','Purosangue'],
    'bugatti-service-dubai': ['Chiron','Divo','Mistral'],
    'land-rover-service-dubai': ['Range Rover','Range Rover Sport','Range Rover Velar','Range Rover Evoque','Defender','Discovery'],
    'rolls-royce-service-dubai': ['Phantom','Ghost','Cullinan','Spectre','Wraith','Dawn'],
    'aston-martin-service-dubai': ['DB12','Vantage','DBX','DBS'],
  };

  const brandJsonLd = React.useMemo(() => {
    if (!brand) return undefined;
    const url = `https://digitecme.com/brands/${brand.slug}`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: 'Home', url: 'https://digitecme.com/' },
      { name: 'Brands', url: 'https://digitecme.com/services' },
      { name: brand.name, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: `${brand.name} Service & Repair in Dubai`,
      description: brand.intro,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: brand.logo,
    });
    const models = BRAND_MODELS[brand.slug] ?? [];
    const brandEntity = {
      '@type': 'Brand',
      '@id': `${url}#brand`,
      name: brand.name,
      logo: brand.logo.startsWith('http') ? brand.logo : `https://digitecme.com${brand.logo}`,
    };
    const svc = {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `${brand.name} Service & Repair in Dubai`,
      serviceType: `${brand.name} Repair`,
      description: brand.intro,
      url,
      provider: businessRef,
      brand: { '@id': `${url}#brand` },
      areaServed: [
        { '@type': 'City', name: 'Dubai' },
        { '@type': 'City', name: 'Abu Dhabi' },
        { '@type': 'City', name: 'Sharjah' },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${brand.name} Service Catalog`,
        itemListElement: BRAND_OFFER_CATALOG.map((n) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: `${brand.name} ${n}` },
        })),
      },
      ...(models.length > 0
        ? {
            audience: {
              '@type': 'Audience',
              name: `${brand.name} owners`,
            },
            isRelatedTo: models.map((m) => ({
              '@type': 'Vehicle',
              vehicleModelDate: undefined,
              manufacturer: { '@id': `${url}#brand` },
              model: m,
              name: `${brand.name} ${m}`,
            })),
          }
        : {}),
    };
    const faq = buildFAQ(
      url,
      brand.faqs.map((f) => ({ question: f.q, answer: f.a })),
    );
    return pageGraph([webPage, breadcrumb, brandEntity, svc, ...(faq ? [faq] : [])]);
  }, [brand]);

  useSeo({
    title: brand
      ? `${brand.name} Repair & Service Dubai | Specialist Workshop | Digi-Tec`
      : 'Brand Service in Dubai | Digi-Tec Performance Centre',
    description: brand
      ? `Independent ${brand.name} repair and service in Dubai: diagnostics, maintenance, brakes, transmission, suspension and AC. Genuine parts and specialist workshop care at Digi-Tec.`
      : 'Expert luxury car maintenance, diagnostics, and performance tuning in Dubai at Digi-Tec Performance Centre.',
    canonical: brand ? `https://digitecme.com/brands/${brand.slug}` : 'https://digitecme.com/',
    noindex: !brand,
    jsonLd: brandJsonLd,
  });

  if (!brand) {
    return <Navigate to="/" replace />;
  }

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
    `Hi, I'd like to enquire about ${brand.name} service at Digi-Tec Performance Centre.`,
  )}`;

  const otherBrands = brands.filter((b) => b.slug !== brand.slug);
  const relatedServices = brand.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<ReturnType<typeof getServiceBySlug>> => Boolean(s));
  const seoCopy = getBrandSeoCopy(brand);
  const brandServices = getServicesForBrand(brand.slug);
  const profile = BRAND_PROFILES[brand.slug];
  const models = BRAND_MODELS[brand.slug] ?? [];
  const getServicePath = (serviceSlug: string) =>
    brand.slug === 'mercedes-benz-service-dubai'
      ? MERCEDES_SERVICE_PATHS[serviceSlug] ?? `/brands/${brand.slug}/${serviceSlug}`
      : `/brands/${brand.slug}/${serviceSlug}`;

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 bg-white/90 rounded-full shadow-xl flex items-center justify-center">
                  <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
                </div>
                <span className="text-burnt-orange font-bold uppercase tracking-widest text-xs sm:text-sm">
                  {brand.specialization}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                {brand.name} <span className="text-burnt-orange">Repair & Service Dubai</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                {brand.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
                <a href="tel:+97143402223" className="btn-secondary">
                  <Phone className="w-5 h-5" />
                  Call +971 4 340 2223
                </a>
              </div>
              <CtaAssurance className="mt-4" align="start" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              Our <span className="text-burnt-orange">{brand.name}</span> Services
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-lg">
              Comprehensive care for every {brand.name}, from routine maintenance to advanced performance work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="card-premium rounded-2xl p-6 sm:p-7 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand-specific workshop capability */}
      {profile && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                How We Service <span className="text-burnt-orange">{brand.name}</span> in Dubai
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                The workshop process is tailored to the diagnostic systems, drivetrain, and climate-related wear points of your {brand.name}.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">Diagnostic platform</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{profile.diagnosticTool} for fault tracing, live data, coding, and service resets.</p>
              </div>
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">Core systems</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{profile.transmissionName}, {profile.suspensionType}, and the wider {profile.engineFamily} range.</p>
              </div>
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">Dubai-focused care</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{profile.climateNote}</p>
              </div>
            </div>
            {models.length > 0 && (
              <div className="mt-6 sm:mt-8 card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{brand.name} models we work with</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{models.join(' • ')}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              Why {brand.name} Owners Choose <span className="text-burnt-orange">D</span>igi-Tec
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Real technical depth on the systems that define your {brand.name}, not generic service copy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {brand.whyChoose.map((item) => (
              <div
                key={item.title}
                className="card-premium rounded-2xl p-5 sm:p-6 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-burnt-orange flex-shrink-0 mt-1" />
                  <h3 className="text-base sm:text-lg font-bold text-off-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-8">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated brand-service SEO pages */}
      {brandServices.length > 0 && (
        <section className="py-12 sm:py-20 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                {brand.name} <span className="text-burnt-orange">Repair Dubai</span> — Every Service
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                Whether you searched for {brand.name} repair Dubai, {brand.name} oil change Dubai, or {brand.name} brake repair Dubai, every specialist service has its own dedicated page with brand-specific parts, tools, and technical detail.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {brandServices.map((s) => (
                <Link
                  key={s.serviceSlug}
                  to={getServicePath(s.serviceSlug)}
                  className="card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 min-h-[110px]"
                >
                  <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                    {brand.name} {s.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-burnt-orange text-xs font-semibold mt-3">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
            {/* Secondary-intent keyword copy — targets "{brand} repair dubai", "{brand} oil change dubai", "{brand} brake repair dubai" */}
            <div className="max-w-4xl mx-auto mt-10 sm:mt-14 space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {brand.name} Repair Dubai
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Full mechanical and electrical repair for every {brand.name} platform, from engine and transmission overhauls to suspension, brakes, and cooling system work. Our workshop in Al Quoz handles {brand.name} repair in Dubai with genuine OEM parts and factory diagnostic tools.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {brand.name} Oil Change Dubai
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Manufacturer-approved oil and filter service using the correct {brand.name} specification fluid for Dubai's climate. Every {brand.name} oil change in Dubai includes a full multi-point inspection, service reset, and digital service record.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {brand.name} Brake Repair Dubai
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Pads, discs, sensors, calipers, and full hydraulic system work using genuine {brand.name} components. Our {brand.name} brake repair service in Dubai covers ceramic, carbon-ceramic, and standard iron setups with proper bedding-in and system bleeding.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="card-premium text-center rounded-2xl p-6 sm:p-10">
            <p className="text-off-white font-bold text-xl sm:text-2xl mb-2">
              Trusted by {brand.name} owners across the UAE
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-8">
              Genuine OEM parts, factory-grade diagnostics, and transparent pricing since 2009.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">50,000+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Cars Served</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">8,000+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Satisfied Customers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">40,000</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Sq Ft Facility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* SEO Content */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <article className="space-y-8 sm:space-y-10">
            <header>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                Specialist <span className="text-burnt-orange">{brand.name}</span> Service in Dubai
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{seoCopy.intro}</p>
            </header>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                Built for Dubai Driving Conditions
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.dubai}</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                {brand.name} Expertise You Can Verify
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.expertise}</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                Genuine Parts and Transparent Reporting
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.parts}</p>
            </div>
            <div className="border-l-2 border-burnt-orange pl-5 sm:pl-6">
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{seoCopy.cta}</p>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              {brand.name} <span className="text-burnt-orange">FAQs</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              The questions {brand.name} owners ask us most.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {brand.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40"
              >
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

      {/* Booking CTA + Form */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                Book Your <span className="text-burnt-orange">{brand.name}</span> Service
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                Tell us about your car and the work you need. We will get back to you on WhatsApp with a quote and the earliest available slot.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </a>
                <a
                  href="tel:+97143402223"
                  className="inline-flex items-center justify-center gap-2 bg-off-white text-black hover:bg-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  +971 4 340 2223
                </a>
              </div>
              <p className="text-gray-500 text-sm">
                Or use the form to send your details directly.
              </p>
            </div>
            <div className="card-premium rounded-2xl p-5 sm:p-8">
              <BrandBookingForm brandName={brand.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-black mb-3">
                Related <span className="text-burnt-orange">Services</span> for {brand.name}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                The specialist work we do most often for {brand.name} owners.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="card-premium group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={typeof s.image === 'string' ? s.image : (s.image as unknown as string)}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-off-white mb-2 group-hover:text-burnt-orange transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Brands */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-black mb-3">
              Other <span className="text-burnt-orange">Brands</span> We Service
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Specialist care for every prestige marque in our workshop.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                to={`/brands/${b.slug}`}
                className="group flex flex-col items-center gap-2 p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-burnt-orange/40 rounded-2xl transition-all duration-300"
                aria-label={`${b.name} service in Dubai`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 p-2 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src={b.logo} alt={`${b.name} logo`} className="w-full h-full object-contain" />
                </div>
                <span className="text-[11px] sm:text-xs text-gray-300 group-hover:text-burnt-orange text-center font-medium leading-tight">
                  {b.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandPage;
