
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
    <section className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8">
            Why Choose <span className="text-burnt-orange">D</span>IGI-TEC
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Dubai's most trusted name in luxury automotive performance. Our commitment to excellence, 
            cutting-edge technology, and personalized service sets us apart in the region.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="text-center group">
              <div className="bg-gradient-to-br from-charcoal/60 to-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500 group-hover:scale-105">
                <div className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-burnt-orange mb-2 sm:mb-4">
                  {reason.number}
                </div>
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 sm:mb-4 text-white">{reason.title}</h3>
                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm lg:text-base">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-charcoal/40 to-black/20 backdrop-blur-sm border border-gray-800/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            State-of-the-Art Facility in the Heart of <span className="text-burnt-orange">D</span>ubai
          </h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
            Our 10,000 sq ft facility features the latest diagnostic equipment, precision tools, 
            and climate-controlled environments to ensure your luxury vehicle receives the care it deserves.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-sm">
            <div className="bg-black/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="font-semibold text-burnt-orange mb-2 text-base sm:text-lg">Advanced Diagnostics</div>
              <div className="text-gray-400 text-sm">Latest OEM diagnostic equipment</div>
            </div>
            <div className="bg-black/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="font-semibold text-burnt-orange mb-2 text-base sm:text-lg">Climate Controlled</div>
              <div className="text-gray-400 text-sm">Optimal working conditions</div>
            </div>
            <div className="bg-black/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="font-semibold text-burnt-orange mb-2 text-base sm:text-lg">Secure Storage</div>
              <div className="text-gray-400 text-sm">24/7 monitored facility</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
