
import React from 'react';

export const PerformanceResults = () => {
  const results = [
    { metric: 'Average HP Gain', value: '+185', unit: 'HP' },
    { metric: 'Torque Increase', value: '+220', unit: 'NM' },
    { metric: '0-100 Improvement', value: '-0.8', unit: 'SEC' },
    { metric: 'Fuel Efficiency', value: '+12', unit: '%' }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/10 via-transparent to-chocolate/10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Performance <span className="text-burnt-orange">D</span>ata
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Real performance gains from our precision tuning. These numbers represent average improvements 
            across our client portfolio, demonstrating our commitment to measurable results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {results.map((result, index) => (
            <div key={result.metric} className="text-center group">
              <div className="bg-gradient-to-br from-charcoal/60 to-black/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 mb-6 hover:border-burnt-orange/30 transition-all duration-500 shadow-2xl group-hover:shadow-burnt-orange/20 group-hover:scale-105">
                <div className="text-4xl md:text-5xl font-black text-burnt-orange mb-4">
                  {result.value}
                </div>
                <div className="text-lg font-semibold text-gray-300 mb-2">
                  {result.unit}
                </div>
              </div>
              <h3 className="text-lg font-bold text-off-white">{result.metric}</h3>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-charcoal/50 to-black/30 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-3xl font-bold mb-6">
            Before & After Performance Analysis
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto">
            Every vehicle undergoes comprehensive dyno testing before and after modifications. 
            We provide detailed performance reports showing exactly what improvements have been achieved.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-left bg-black/30 rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-semibold text-burnt-orange mb-6">What We Measure:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Peak Horsepower & Torque</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Power Curve Analysis</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Acceleration Times</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Fuel Consumption</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Emission Levels</li>
              </ul>
            </div>
            
            <div className="text-left bg-black/30 rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-semibold text-burnt-orange mb-6">Documentation Provided:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Detailed Dyno Reports</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Performance Certificates</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Modification Documentation</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Warranty Information</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-burnt-orange rounded-full mr-3"></span>Maintenance Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
