
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Smartphone } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    {
      question: "How often should I service my luxury vehicle in Dubai?",
      answer: "In Dubai's extreme climate, we recommend servicing your Mercedes or performance vehicle every 10,000–12,000 km or 6–9 months, depending on usage. High-performance cars demand proactive care to retain efficiency, safety, and value."
    },
    {
      question: "What are signs my vehicle needs immediate attention?",
      answer: "Warning lights, rough idling, overheating, shifting delays, or reduced fuel efficiency are all red flags. At DIGI-TEC, we use advanced diagnostics to pinpoint issues early — before they become costly."
    },
    {
      question: "Do you offer ECU tuning and power upgrades?",
      answer: "Yes. We specialize in ECU remapping, turbo tuning, and exhaust upgrades to unlock your vehicle's hidden performance. Whether it's more torque or refined throttle response — we tune it like a precision machine."
    },
    {
      question: "Can you repair hybrid and electric luxury cars?",
      answer: "Absolutely. DIGI-TEC technicians are certified in high-voltage system diagnostics and are fully equipped to repair Mercedes-Benz EVs, hybrids, and other high-tech platforms."
    },
    {
      question: "Where are you located in Dubai?",
      answer: "We're based in Al Quoz Industrial Area 3 — a central hub that's easily accessible from Downtown, Business Bay, Dubai Hills, and Marina. Just 10 minutes from Sheikh Zayed Road."
    },
    {
      question: "Do you offer pickup and drop-off for services?",
      answer: "Yes. We provide concierge-style pickup and drop-off, so you don't need to leave your home or office. Premium service begins before your keys even arrive."
    },
    {
      question: "What makes DIGI-TEC different from regular garages?",
      answer: "We don't just fix — we engineer. With 40+ years of expertise, a luxury vehicle focus, and our DIGI-TEC App, we provide unmatched transparency, real-time updates, and performance-tuned service."
    },
    {
      question: "Do you serve clients outside of Dubai?",
      answer: "Yes. Many of our clients come from Sharjah, Abu Dhabi, and even Al Ain. If you drive something special, it's worth the trip — and we'll make it worth your time."
    },
    {
      question: "What can I do with the DIGI-TEC App?",
      answer: "Book services, track real-time vehicle status, view service history, and earn loyalty points — all from your phone. The app is your digital dashboard for luxury service."
    },
    {
      question: "How does your loyalty program work?",
      answer: "Every service you book through our app earns loyalty points, which you can redeem for discounts, performance upgrades, or exclusive offers. Think of it as miles — for your car."
    }
  ];

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/20 to-black"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-burnt-orange mx-auto rounded-full"></div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-charcoal/30 backdrop-blur-sm rounded-xl border border-off-white/10 overflow-hidden hover:border-burnt-orange/50 transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-bold text-lg text-white hover:text-burnt-orange transition-colors duration-300 hover:no-underline [&[data-state=open]]:text-burnt-orange [&[data-state=open]]:border-b [&[data-state=open]]:border-burnt-orange/20">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-off-white/80 leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">
            Still have questions?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with us now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
