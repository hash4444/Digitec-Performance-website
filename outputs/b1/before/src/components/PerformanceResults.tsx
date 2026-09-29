
import React from 'react';

export const PerformanceResults = () => {
  const results = [
    { metric: 'Vehicle condition', value: '01', unit: 'INSPECT' },
    { metric: 'Project goals', value: '02', unit: 'DEFINE' },
    { metric: 'Parts and software', value: '03', unit: 'CONFIRM' },
    { metric: 'Results', value: '04', unit: 'VERIFY' }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/10 via-transparent to-chocolate/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8">
            Performance <span className="text-burnt-orange">D</span>ata
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Each performance project begins with the exact vehicle, its current condition and the owner's intended use. Any measurable target must be agreed for that individual project.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {results.map((result, index) => (
            <div key={result.metric} className="text-center group">
              <div className="bg-gradient-to-br from-charcoal/60 to-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-3 sm:mb-4 lg:mb-6 hover:border-burnt-orange/30 transition-all duration-500 shadow-2xl group-hover:shadow-burnt-orange/20 group-hover:scale-105">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-burnt-orange mb-2 sm:mb-4">
                  {result.value}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-300 mb-2">
                  {result.unit}
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-off-white">{result.metric}</h3>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-charcoal/50 to-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Before & After Performance Analysis
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
            Available baseline and post-project checks depend on the vehicle, modification scope and agreed test method. Results are recorded when measurement is included in the approved project.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
            <div className="text-left bg-black/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <h4 className="text-lg sm:text-xl font-semibold text-burnt-orange mb-4 sm:mb-6">What We Measure:</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Peak Horsepower & Torque</li>
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Power Curve Analysis</li>
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Relevant diagnostic data</li>
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Temperatures and system behavior</li>
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Agreed before-and-after checks</li>
              </ul>
            </div>
            
            <div className="text-left bg-black/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <h4 className="text-lg sm:text-xl font-semibold text-burnt-orange mb-4 sm:mb-6">Documentation Provided:</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Approved project scope</li>
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Installed parts and software notes</li>
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Available measurement records</li>
                <li className="flex items-center text-sm sm:text-base"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3 flex-shrink-0"></span>Relevant maintenance guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
