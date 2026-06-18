import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, Star, Quote, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { brands, getBrandBySlug } from '@/data/brands';
import { getServiceBySlug } from '@/data/services';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BrandBookingForm from '@/components/BrandBookingForm';

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

const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? getBrandBySlug(slug) : undefined;

  useSeo({
    title: brand
      ? `${brand.name} Service & Repair in Dubai | Digi-Tec Performance Centre`
      : 'Brand Service in Dubai | Digi-Tec Performance Centre',
    description: brand
      ? `Expert ${brand.name} maintenance, diagnostics, and performance tuning in Dubai. Certified technicians, genuine parts, and state-of-the-art equipment at Digi-Tec Performance Centre.`
      : 'Expert luxury car maintenance, diagnostics, and performance tuning in Dubai at Digi-Tec Performance Centre.',
    canonical: brand ? `https://digitecme.com/brands/${brand.slug}` : 'https://digitecme.com/',
    jsonLd: brand
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: brand.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'AutomotiveBusiness',
            name: `Digi-Tec Performance Centre — ${brand.name} Service Dubai`,
            url: `https://digitecme.com/brands/${brand.slug}`,
            telephone: '+97143402223',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
            areaServed: 'Dubai, UAE',
            makesOffer: `${brand.name} service, maintenance, diagnostics, and performance tuning`,
          },
        ]
      : undefined,
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
                className="bg-black/50 border border-white/5 hover:border-burnt-orange/40 rounded-2xl p-5 sm:p-6 transition-colors"
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

      {/* Testimonial / Trust */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {brand.testimonial ? (
            <div className="bg-gradient-to-br from-charcoal/60 to-black/40 border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-burnt-orange mb-4" />
              <p className="text-lg sm:text-2xl text-off-white leading-relaxed italic mb-6">
                "{brand.testimonial.quote}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-burnt-orange text-burnt-orange" />
                ))}
              </div>
              <div className="font-bold text-off-white">{brand.testimonial.name}</div>
              <div className="text-burnt-orange text-sm font-semibold">{brand.testimonial.vehicle}</div>
            </div>
          ) : (
            <div className="text-center bg-gradient-to-br from-charcoal/60 to-black/40 border border-white/5 rounded-3xl p-6 sm:p-10">
              <div className="flex justify-center items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-burnt-orange text-burnt-orange" />
                ))}
              </div>
              <p className="text-off-white font-bold text-xl sm:text-2xl mb-2">4.9 / 5 Average Rating</p>
              <p className="text-gray-400 text-sm sm:text-base mb-8">
                Trusted by {brand.name} owners across the UAE.
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
          )}
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
                className="border-0 bg-black/50 border border-white/5 rounded-2xl px-5 sm:px-6"
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
            <div className="bg-gradient-to-br from-charcoal/60 to-black/40 border border-white/5 rounded-3xl p-5 sm:p-8 shadow-2xl">
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
                  className="group flex flex-col bg-black/50 border border-white/5 hover:border-burnt-orange/40 rounded-3xl overflow-hidden transition-all duration-300"
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