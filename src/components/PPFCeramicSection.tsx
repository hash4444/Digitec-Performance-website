
import React, { useState } from 'react';
import { Shield, Droplets, Check, ArrowRight, Sparkles } from 'lucide-react';
import ppfImage from '@/assets/ppf-application.png';
import ceramicImage from '@/assets/ceramic-coating.png';

const services = [
  {
    id: 'ppf',
    label: 'Paint Protection Film',
    icon: <Shield className="w-6 h-6" />,
    headline: 'Invisible Armor for Your Investment',
    description: 'Military-grade thermoplastic urethane film that shields your paint from rock chips, scratches, and UV damage — while maintaining a flawless factory finish.',
    image: ppfImage,
    features: [
      'Self-healing technology — minor scratches vanish with heat',
      '10-year manufacturer warranty',
      'Hydrophobic top coat for effortless cleaning',
      'Optically clear — zero visual distortion',
      'Custom precision-cut for every panel',
    ],
    packages: [
      { name: 'Full Body', coverage: 'Complete vehicle wrap — total protection', popular: true },
    ],
  },
  {
    id: 'ceramic',
    label: 'Ceramic Coating',
    icon: <Droplets className="w-6 h-6" />,
    headline: 'Permanent Gloss. Effortless Maintenance.',
    description: 'Nano-ceramic molecular bond that fuses with your clear coat — delivering showroom depth, extreme hydrophobicity, and years of UV resistance in a single application.',
    image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&h=600&fit=crop',
    features: [
      '9H hardness rating — industry maximum',
      'Extreme water beading & self-cleaning effect',
      'UV and chemical resistance',
      'Enhanced gloss depth up to 30%',
      '5-year certified protection',
    ],
    packages: [
      { name: 'Essential', coverage: 'Single-layer ceramic coat + paint decon', popular: false },
      { name: 'Elite', coverage: 'Two-layer coat + wheels + trim + glass', popular: true },
      { name: 'Ultimate', coverage: 'PPF + ceramic combo — the definitive shield', popular: false },
    ],
  },
];

export const PPFCeramicSection = () => {
  const [activeTab, setActiveTab] = useState<'ppf' | 'ceramic'>('ppf');
  const active = services.find((s) => s.id === activeTab)!;

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-burnt-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 text-burnt-orange font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Protection & Detailing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-off-white leading-tight mb-6">
            Shield Your Vehicle.<br className="hidden sm:block" /> Elevate Its Presence.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Trusted by Dubai's most discerning car owners — from AMG to M-Power, RS to Turbo S.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex bg-charcoal/60 backdrop-blur-sm rounded-full p-1.5 border border-gray-800/60">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id as 'ppf' | 'ceramic')}
                className={`flex items-center gap-2 px-5 sm:px-8 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                  activeTab === s.id
                    ? 'bg-burnt-orange text-black shadow-lg shadow-burnt-orange/30'
                    : 'text-gray-400 hover:text-off-white'
                }`}
              >
                {s.icon}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.id === 'ppf' ? 'PPF' : 'Ceramic'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* Image */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-1 bg-gradient-to-br from-burnt-orange/30 to-transparent rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-800/50">
              <img
                src={active.image}
                alt={active.label}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md text-burnt-orange text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-burnt-orange/30">
                  {active.icon}
                  {active.label}
                </span>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-off-white mb-5 leading-tight">
              {active.headline}
            </h3>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
              {active.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-10">
              {active.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-burnt-orange/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-burnt-orange" />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/97143402223?text=${encodeURIComponent(`Hi, I'm interested in your ${active.label} service. Can I get a free quote?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl shadow-burnt-orange/20 hover:shadow-burnt-orange/40"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
