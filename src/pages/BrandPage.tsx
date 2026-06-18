import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { brands, getBrandBySlug } from '@/data/brands';

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

const WHY_CHOOSE = [
  'Over 40 years of luxury automotive experience',
  'Factory-trained, brand-certified technicians',
  'Genuine OEM parts and approved equivalents',
  'State-of-the-art diagnostic equipment',
  '40,000 sq ft climate-controlled facility',
  'Transparent pricing and detailed reporting',
];

const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? getBrandBySlug(slug) : undefined;

  if (!brand) {
    return <Navigate to="/" replace />;
  }

  useSeo({
    title: `${brand.name} Service & Repair in Dubai | Digi-Tec Performance Centre`,
    description: `Expert ${brand.name} maintenance, diagnostics, and performance tuning in Dubai. Certified technicians, genuine parts, and state-of-the-art equipment at Digi-Tec Performance Centre.`,
    canonical: `https://digitecme.com/brands/${brand.slug}`,
  });

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
    `Hi, I'd like to enquire about ${brand.name} service at Digi-Tec Performance Centre.`,
  )}`;

  const otherBrands = brands.filter((b) => b.slug !== brand.slug);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
                {brand.name} <span className="text-burnt-orange">Service Centre</span> in Dubai
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                {brand.intro}
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
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                <img
                  src="/lovable-uploads/aeca6cb5-7000-451e-aaf7-d5171200659f.png"
                  alt={`${brand.name} workshop at Digi-Tec Performance Centre Dubai`}
                  className="w-full h-64 sm:h-80 lg:h-[28rem] object-cover"
                  loading="lazy"
                />
              </div>
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
                className="bg-gradient-to-br from-charcoal/60 to-black/40 border border-white/5 rounded-3xl p-6 sm:p-7 hover:border-burnt-orange/40 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              Why Choose <span className="text-burnt-orange">D</span>igi-Tec for {brand.name}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-black/40 border border-white/5 rounded-2xl p-4 sm:p-5"
              >
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-burnt-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default BrandPage;