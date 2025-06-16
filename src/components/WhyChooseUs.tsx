
import React from 'react';

export const WhyChooseUs = () => {
  const reasons = [
    {
      number: '15+',
      title: 'Years of Excellence',
      description: 'Proven track record in luxury automotive performance'
    },
    {
      number: '500+',
      title: 'Elite Vehicles Transformed',
      description: 'Successfully enhanced performance for discerning clients'
    },
    {
      number: '100%',
      title: 'Client Satisfaction',
      description: 'Unwavering commitment to exceeding expectations'
    },
    {
      number: '24/7',
      title: 'Premium Support',
      description: 'Round-the-clock assistance for our valued clients'
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Why Choose <span className="text-burnt-orange">D</span>IGI-TEC
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Dubai's most trusted name in luxury automotive performance. Our commitment to excellence, 
            cutting-edge technology, and personalized service sets us apart in the region.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="text-center">
              <div className="text-5xl md:text-6xl font-black text-burnt-orange mb-4">
                {reason.number}
              </div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-gray-300 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-charcoal/30 border border-gray-800 p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">
            State-of-the-Art Facility in the Heart of <span className="text-burnt-orange">D</span>ubai
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Our 10,000 sq ft facility features the latest diagnostic equipment, precision tools, 
            and climate-controlled environments to ensure your luxury vehicle receives the care it deserves.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-semibold text-burnt-orange mb-2">Advanced Diagnostics</div>
              <div className="text-gray-400">Latest OEM diagnostic equipment</div>
            </div>
            <div>
              <div className="font-semibold text-burnt-orange mb-2">Climate Controlled</div>
              <div className="text-gray-400">Optimal working conditions</div>
            </div>
            <div>
              <div className="font-semibold text-burnt-orange mb-2">Secure Storage</div>
              <div className="text-gray-400">24/7 monitored facility</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
