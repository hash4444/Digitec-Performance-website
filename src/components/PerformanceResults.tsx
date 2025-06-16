
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
            <div key={result.metric} className="text-center">
              <div className="bg-charcoal/50 border border-gray-800 p-8 mb-4 hover:border-burnt-orange/50 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-burnt-orange mb-2">
                  {result.value}
                </div>
                <div className="text-lg font-semibold text-gray-300">
                  {result.unit}
                </div>
              </div>
              <h3 className="text-lg font-bold text-off-white">{result.metric}</h3>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-charcoal/50 to-black/50 border border-gray-800 p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Before & After Performance Analysis
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto">
            Every vehicle undergoes comprehensive dyno testing before and after modifications. 
            We provide detailed performance reports showing exactly what improvements have been achieved.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-xl font-semibold text-burnt-orange mb-4">What We Measure:</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Peak Horsepower & Torque</li>
                <li>• Power Curve Analysis</li>
                <li>• Acceleration Times</li>
                <li>• Fuel Consumption</li>
                <li>• Emission Levels</li>
              </ul>
            </div>
            
            <div className="text-left">
              <h4 className="text-xl font-semibold text-burnt-orange mb-4">Documentation Provided:</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Detailed Dyno Reports</li>
                <li>• Performance Certificates</li>
                <li>• Modification Documentation</li>
                <li>• Warranty Information</li>
                <li>• Maintenance Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
