import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

type FAQItem = { question: string; answer: string };
type FAQCategory = { id: string; label: string; faqs: FAQItem[] };

const categories: FAQCategory[] = [
  {
    id: 'general',
    label: 'General',
    faqs: [
      {
        question: "How often should I service my luxury vehicle in Dubai?",
        answer: "In Dubai's extreme climate, we recommend servicing your Mercedes or performance vehicle every 10,000 to 12,000 km or 6 to 9 months, depending on usage. High-performance cars demand proactive care to retain efficiency, safety, and value."
      },
      {
        question: "What are signs my vehicle needs immediate attention?",
        answer: "Warning lights, rough idling, overheating, shifting delays, or reduced fuel efficiency are all red flags. At DIGI-TEC, we use advanced diagnostics to pinpoint issues early, before they become costly."
      },
      {
        question: "What makes DIGI-TEC different from regular garages?",
        answer: "We don't just fix; we engineer. With 40+ years of expertise and a luxury vehicle focus, we provide unmatched transparency, real-time updates, and performance-tuned service."
      },
      {
        question: "Can you repair hybrid and electric luxury cars?",
        answer: "Absolutely. DIGI-TEC technicians are certified in high-voltage system diagnostics and are fully equipped to repair Mercedes-Benz EVs, hybrids, and other high-tech platforms."
      },
    ],
  },
  {
    id: 'car-service',
    label: 'Car Service',
    faqs: [
      {
        question: 'What is included in a car service in Dubai?',
        answer: 'A professional car service in Dubai typically includes engine oil and filter replacement, fluid checks, brake inspection, battery testing, and a full vehicle inspection. At Digitec Performance Center, we follow manufacturer-recommended service schedules to ensure your vehicle remains reliable, safe, and performing at its best.',
      },
      {
        question: 'How often should I service my car in Dubai?',
        answer: "Due to Dubai's extreme heat and driving conditions, it is recommended to service your car every 5,000 to 10,000 km depending on your vehicle type. Regular servicing helps prevent engine wear, overheating, and costly repairs.",
      },
      {
        question: 'Do luxury cars like Mercedes, BMW, and Audi need special servicing?',
        answer: 'Yes, luxury vehicles such as Mercedes, BMW, Audi, and Porsche require specialized servicing using manufacturer-approved parts, oils, and diagnostic tools. At Digitec, we specialize in German and high-performance vehicles, ensuring your car receives the correct care it needs.',
      },
      {
        question: 'How much does car service cost in Dubai?',
        answer: 'Car service costs in Dubai vary depending on the vehicle type and service required. Basic servicing is more affordable, while major services for luxury or performance vehicles may cost more. At Digitec Performance Center, we offer transparent pricing with no hidden costs.',
      },
      {
        question: 'How long does a car service take?',
        answer: 'A standard car service usually takes between 1 to 3 hours, depending on the vehicle and the type of service. More complex services or repairs may take longer.',
      },
      {
        question: 'Where can I find a reliable car service near me in Dubai?',
        answer: 'If you are searching for a reliable car service near you in Dubai, Digitec Performance Center offers professional servicing for luxury and performance vehicles, with fast turnaround times and expert technicians.',
      },
      {
        question: 'What happens if I skip car servicing?',
        answer: 'Skipping regular car servicing can lead to engine damage, reduced fuel efficiency, brake wear, and costly repairs over time. Regular maintenance ensures your vehicle remains safe, efficient, and reliable.',
      },
      {
        question: 'Do you service Ferrari and other performance cars?',
        answer: 'Yes, at Digitec Performance Center, we service high-performance vehicles including Ferrari, Lamborghini, Porsche, and other luxury brands, using specialized tools and expert technicians.',
      },
    ],
  },
  {
    id: 'performance',
    label: 'Performance & Tuning',
    faqs: [
      {
        question: "Do you offer ECU tuning and power upgrades?",
        answer: "Yes. We specialize in ECU remapping, turbo tuning, and exhaust upgrades to unlock your vehicle's hidden performance. Whether it's more torque or refined throttle response, we tune it like a precision machine."
      },
      {
        question: "Can you repair AMG models?",
        answer: "Yes. We specialise in AMG performance vehicles and tuning, with technicians trained on the precision required for high-output Mercedes-Benz platforms."
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
        answer: "At least once a year. Regular checks help maintain cooling efficiency and prevent costly repairs caused by undetected leaks or component wear."
      },
      {
        question: "Do luxury cars require special AC repair?",
        answer: "Yes. Vehicles like Mercedes, BMW, Audi, and Porsche use advanced AC systems with electronic compressors and multi-zone climate control that require specialised diagnostics and expertise."
      },
      {
        question: "How long does AC repair take?",
        answer: "Simple services like gas refill can be done quickly, while more complex repairs such as compressor replacement may take longer depending on the issue."
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
        answer: "We're based in Al Quoz Industrial Area 3, a central hub that's easily accessible from Downtown, Business Bay, Dubai Hills, and Marina. Just 10 minutes from Sheikh Zayed Road."
      },
      {
        question: "Do you offer pickup and drop-off for services?",
        answer: "Yes. We provide concierge-style pickup and drop-off, so you don't need to leave your home or office. Premium service begins before your keys even arrive."
      },
      {
        question: "Do you serve clients outside of Dubai?",
        answer: "Yes. Many of our clients come from Sharjah, Abu Dhabi, and even Al Ain. If you drive something special, it's worth the trip, and we'll make it worth your time."
      },
    ],
  },
];

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const current = categories.find((c) => c.id === activeCategory) ?? categories[0];

  return (
    <section className="py-10 sm:py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/20 to-black"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-burnt-orange mx-auto rounded-full"></div>
          <p className="text-off-white/60 mt-3 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-snug sm:leading-relaxed px-2">
            Browse by topic to find answers about our services, expertise, and process.
          </p>
        </div>

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
            Still have questions?
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="https://wa.me/97143402223?text=Hi%2C%20I%20have%20a%20question%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Chat with us now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
