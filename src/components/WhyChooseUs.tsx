import React from 'react';

export const WhyChooseUs = () => {
  const reasons = [
    {
      number: '40+',
      title: 'Years of Excellence',
      description: 'Proven track record in luxury automotive performance'
    },
    {
      number: '50,000+',
      title: 'Cars Served',
      description: 'Successfully enhanced performance for discerning clients'
    },
    {
      number: '8,000+',
      title: 'Satisfied Clients',
      description: 'Unwavering commitment to exceeding expectations'
    },
    {
      number: '24/7',
      title: 'Premium Support',
      description: 'Round-the-clock assistance for our valued clients'
    }
  ];

  return (
    <section className="py-10 sm:py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-14 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-5">
            Why Choose <span className="text-burnt-orange">D</span>IGI-TEC
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-4xl mx-auto leading-snug sm:leading-relaxed px-4">
            Dubai's most trusted name in luxury automotive performance. Our commitment to excellence, 
            cutting-edge technology, and personalized service sets us apart in the region.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-12 mb-8 sm:mb-14 lg:mb-20">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="text-center group">
              <div className="bg-gradient-to-br from-charcoal/60 to-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 mb-3 sm:mb-6 shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500 group-hover:scale-105">
                <div className="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-burnt-orange mb-1.5 sm:mb-4">
                  {reason.number}
                </div>
                <h3 className="text-xs sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-4 text-white">{reason.title}</h3>
                <p className="text-gray-300 leading-snug sm:leading-relaxed text-xs sm:text-sm lg:text-base line-clamp-2 sm:line-clamp-none">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-charcoal/40 to-black/20 backdrop-blur-sm border border-gray-800/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 text-center shadow-2xl">
          <h3 className="text-lg sm:text-3xl font-bold mb-3 sm:mb-6">
            State-of-the-Art Facility in the Heart of <span className="text-burnt-orange">D</span>ubai
          </h3>
          <p className="text-sm sm:text-xl text-gray-300 mb-4 sm:mb-8 max-w-4xl mx-auto px-2 sm:px-4 leading-snug sm:leading-relaxed">
            Our 40,000 sq ft facility features the latest diagnostic equipment, precision tools, 
            and climate-controlled environments to ensure your luxury vehicle receives the care it deserves.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 text-sm">
            <div className="bg-black/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 backdrop-blur-sm">
              <div className="font-semibold text-burnt-orange mb-1 sm:mb-2 text-sm sm:text-lg">Advanced Diagnostics</div>
              <div className="text-gray-400 text-xs sm:text-sm">Latest OEM diagnostic equipment</div>
            </div>
            <div className="bg-black/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 backdrop-blur-sm">
              <div className="font-semibold text-burnt-orange mb-1 sm:mb-2 text-sm sm:text-lg">Climate Controlled</div>
              <div className="text-gray-400 text-xs sm:text-sm">Optimal working conditions</div>
            </div>
            <div className="bg-black/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 backdrop-blur-sm">
              <div className="font-semibold text-burnt-orange mb-1 sm:mb-2 text-sm sm:text-lg">Secure Storage</div>
              <div className="text-gray-400 text-xs sm:text-sm">24/7 monitored facility</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
