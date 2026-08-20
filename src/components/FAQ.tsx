import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLocale } from '@/i18n/use-locale';
import { arFaqCategories, arHome } from '@/i18n/ar-home';

export type FAQItem = { question: string; answer: string };
export type FAQCategory = { id: string; label: string; faqs: FAQItem[] };

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    label: 'General',
    faqs: [
      {
        question: "How often should I service my luxury vehicle in Dubai?",
        answer: "There is no single interval for every vehicle. Start with the schedule for the exact model, then consider age, mileage, recorded history, warning messages, and Dubai driving conditions. Contact the workshop if you need help confirming the appropriate inspection or service."
      },
      {
        question: "What are signs my vehicle needs immediate attention?",
        answer: "Warning lights, rough idling, overheating, shifting delays, unusual noise, or reduced efficiency are reasons to arrange an inspection. The appropriate diagnostic steps depend on the vehicle and symptoms."
      },
      {
        question: "What makes DIGI-TEC different from regular garages?",
        answer: "DIGI-TEC is an independent Dubai workshop established in 2002, focused on European, luxury, and performance vehicles. The team inspects the vehicle, explains the proposed scope, and seeks approval before work begins."
      },
      {
        question: "Can you repair hybrid and electric luxury cars?",
        answer: "Support depends on the exact model, system, and work required. Send the vehicle model, year, and concern so the team can confirm the currently available inspection and repair scope before booking."
      },
    ],
  },
  {
    id: 'car-service',
    label: 'Car Service',
    faqs: [
      {
        question: 'What is included in a car service in Dubai?',
        answer: 'The scope depends on the exact vehicle and scheduled service. It may include oil and filter replacement, fluid checks, brake and tyre inspection, battery testing, and other model-specific items. The agreed work should be listed before service begins.',
      },
      {
        question: 'How often should I service my car in Dubai?',
        answer: "Use the schedule for the exact model and consider the vehicle's age, mileage, service history, driving pattern, and Dubai conditions. A workshop should explain any recommendation rather than apply one interval to every car.",
      },
      {
        question: 'Do luxury cars like Mercedes, BMW, and Audi need special servicing?',
        answer: 'These vehicles can require model-specific fluids, parts, diagnostic steps, and reset or calibration procedures. Send the exact model, year, and requested work so the workshop can confirm the available service scope and proposed specification.',
      },
      {
        question: 'How much does car service cost in Dubai?',
        answer: 'Cost depends on the vehicle, inspection findings, labour scope, and parts or fluids selected. Request an estimate that identifies the proposed work and confirm it before approval.',
      },
      {
        question: 'How long does a car service take?',
        answer: 'Timing depends on the exact vehicle, scheduled work, inspection findings, parts availability, and any additional work the owner approves. Ask the workshop to confirm the expected timing for your booking.',
      },
      {
        question: 'Where can I find a reliable car service near me in Dubai?',
        answer: 'Digi-Tec Performance Center is an independent European and luxury car workshop in Al Quoz Industrial Area 3, Dubai. Contact the team with your model and requested service to confirm an appointment.',
      },
      {
        question: 'What happens if I skip car servicing?',
        answer: 'Skipping regular car servicing can lead to engine damage, reduced fuel efficiency, brake wear, and costly repairs over time. Regular maintenance ensures your vehicle remains safe, efficient, and reliable.',
      },
      {
        question: 'Do you service Ferrari and other performance cars?',
        answer: 'Contact the workshop with the exact brand, model, year, mileage, and requested work. The team will confirm the currently available inspection or service scope before booking.',
      },
    ],
  },
  {
    id: 'performance',
    label: 'Performance & Tuning',
    faqs: [
      {
        question: "Do you offer ECU tuning and power upgrades?",
        answer: "Performance work depends on the exact vehicle, current specification, mechanical condition, and intended use. Send those details so the team can confirm available tuning or upgrade options and any inspection required first."
      },
      {
        question: "Can you repair AMG models?",
        answer: "Send the exact AMG model, year, mileage, and concern so the workshop can confirm the available inspection, repair, or performance-work scope before booking."
      },
    ],
  },
  {
    id: 'ac-repair',
    label: 'Car AC Repair',
    faqs: [
      {
        question: "Why is my car AC not cooling in Dubai?",
        answer: "The most common reasons are low refrigerant, leaks, or a failing compressor. In Dubai's heat, even a small issue can significantly reduce cooling performance."
      },
      {
        question: "Can I just refill AC gas and fix the problem?",
        answer: "Not always. If the refrigerant is low due to a leak, simply refilling it will only fix the issue temporarily. The leak must be identified and repaired for a permanent solution."
      },
      {
        question: "How do I know if my AC compressor is failing?",
        answer: "Signs include weak cooling, unusual noises when the AC is on, or the AC stopping completely. In some cases, the compressor may still run but not efficiently."
      },
      {
        question: "How often should I service my car AC in Dubai?",
        answer: "There is no universal AC interval for every vehicle. Arrange an inspection when cooling weakens, noise appears, or the system behaves unusually, and consider a condition check before the hottest months based on the vehicle's history."
      },
      {
        question: "Do luxury cars require special AC repair?",
        answer: "AC system design varies by model and can include electronic controls, multiple zones, and vehicle-specific components. The workshop should confirm the exact system and required diagnostic process before recommending work."
      },
      {
        question: "How long does AC repair take?",
        answer: "Timing depends on the diagnosis, leak testing, required parts, and approved repair scope. The workshop can estimate timing after the vehicle and system have been assessed."
      },
      {
        question: "Does my car AC get damaged if I drive with the windows down in hot weather?",
        answer: "Driving with the windows down while the AC is running will not directly damage your air conditioning system, but it does force it to work much harder. In Dubai's extreme heat, hot air continuously enters the cabin, meaning the AC has to run at maximum capacity for longer periods. Over time, this added strain can accelerate wear on the compressor and reduce overall efficiency. Occasional use is fine, but keeping windows closed maintains optimal performance and reduces unnecessary load on the system."
      },
    ],
  },
  {
    id: 'location',
    label: 'Location & Service',
    faqs: [
      {
        question: "Where are you located in Dubai?",
        answer: "We're based in Al Quoz Industrial Area 3, Warehouses 11–15, Dubai."
      },
      {
        question: "Do you offer pickup and drop-off for services?",
        answer: "Contact the team to confirm whether pickup or drop-off is available for your location, requested service, and appointment time."
      },
      {
        question: "Can I visit the workshop from outside Dubai?",
        answer: "The workshop is located in Al Quoz Industrial Area 3, Dubai. Call before travelling so the team can confirm an inspection time and the requested service scope."
      },
    ],
  },
];

// Backwards-compatible local alias used below.
/** Flat list of every FAQ across all tabs — used by page JSON-LD. */
export const allFaqs: FAQItem[] = faqCategories.flatMap((c) => c.faqs);

export const FAQ = () => {
  const { isArabic } = useLocale();
  const categories: readonly FAQCategory[] = isArabic ? arFaqCategories : faqCategories;
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const current = categories.find((c) => c.id === activeCategory) ?? categories[0];
  const copy = isArabic ? arHome.faq : null;

  return (
    <section className="py-10 sm:py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/20 to-black"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center mb-6 sm:mb-12">
          <span className="eyebrow mb-3 sm:mb-5">{copy?.eyebrow ?? 'Answers'}</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
            {copy?.title ?? 'Frequently Asked Questions'}
          </h2>
          <p className="text-off-white/60 mt-3 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-snug sm:leading-relaxed px-2">
            {copy?.description ?? 'Browse by topic to find answers about our services, expertise, and process.'}
          </p>
        </Reveal>

        {/* Category Tabs */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-10 flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto flex-nowrap pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-burnt-orange text-white border-burnt-orange shadow-lg'
                  : 'bg-charcoal/30 text-off-white/70 border-off-white/10 hover:border-burnt-orange/50 hover:text-white'
              }`}
            >
              {cat.label}
              <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs opacity-70">({cat.faqs.length})</span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-16">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4" key={current.id}>
            {current.faqs.map((faq, index) => (
              <AccordionItem
                key={`${current.id}-${index}`}
                value={`item-${index}`}
                className="bg-charcoal/30 backdrop-blur-sm rounded-xl border border-off-white/10 overflow-hidden hover:border-burnt-orange/50 transition-all duration-300"
              >
                <AccordionTrigger className="px-4 py-3 sm:px-6 sm:py-4 text-left font-bold text-sm sm:text-lg text-white hover:text-burnt-orange transition-colors duration-300 hover:no-underline [&[data-state=open]]:text-burnt-orange [&[data-state=open]]:border-b [&[data-state=open]]:border-burnt-orange/20">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 sm:px-6 sm:pb-6 text-off-white/80 leading-snug sm:leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-6">
            {copy?.still ?? 'Still have questions?'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="https://wa.me/97143402223?text=Hi%2C%20I%20have%20a%20question%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              {copy?.chat ?? 'Chat with us now'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
