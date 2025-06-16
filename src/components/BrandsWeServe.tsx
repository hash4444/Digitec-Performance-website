
import React from 'react';

export const BrandsWeServe = () => {
  const brands = [
    'Mercedes-Benz', 'Ferrari', 'Porsche', 'Audi', 'Rolls Royce', 
    'BMW', 'Lamborghini', 'Bentley', 'McLaren', 'Maserati'
  ];

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Brands We Serve
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Specialized expertise across the world's most prestigious automotive manufacturers
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {brands.map((brand, index) => (
            <div 
              key={brand}
              className="bg-charcoal/50 border border-gray-800 p-8 text-center hover:border-burnt-orange/50 transition-all duration-300 group"
            >
              <div className="h-16 flex items-center justify-center mb-4">
                <div className="w-full h-8 bg-gradient-to-r from-gray-600 to-gray-400 rounded opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-bold text-sm text-gray-300 group-hover:text-off-white transition-colors duration-300">
                {brand}
              </h3>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-gray-400">
            Don't see your luxury brand? <span className="text-burnt-orange font-semibold cursor-pointer hover:underline">Contact us</span> for specialized services.
          </p>
        </div>
      </div>
    </section>
  );
};
