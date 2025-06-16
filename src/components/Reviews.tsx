
import React from 'react';

export const Reviews = () => {
  const reviews = [
    {
      name: 'Ahmed Al-Mansouri',
      vehicle: 'Mercedes-AMG GT 63 S',
      rating: 5,
      text: 'Exceptional service and incredible results. My AMG now produces 750hp and the transformation is remarkable. The team at DIGI-TEC truly understands luxury performance.',
      location: 'Dubai Marina'
    },
    {
      name: 'Sarah Johnson',
      vehicle: 'Porsche 911 Turbo S',
      rating: 5,
      text: 'Professional, knowledgeable, and delivered beyond expectations. The custom exhaust system sounds absolutely phenomenal. Worth every dirham.',
      location: 'Downtown Dubai'
    },
    {
      name: 'Mohammed bin Rashid',
      vehicle: 'Ferrari 488 GTB',
      rating: 5,
      text: 'Outstanding craftsmanship and attention to detail. The performance gains are incredible and the service is truly world-class. Highly recommended.',
      location: 'Emirates Hills'
    }
  ];

  return (
    <section className="py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our satisfied clients who have experienced the <span className="text-burnt-orange">D</span>IGI-TEC difference
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={review.name} className="bg-black/50 border border-gray-800 p-8">
              <div className="flex mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-burnt-orange mr-1"></div>
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 italic">
                "{review.text}"
              </p>
              
              <div className="border-t border-gray-700 pt-6">
                <div className="font-bold text-off-white mb-1">{review.name}</div>
                <div className="text-burnt-orange text-sm font-semibold mb-1">{review.vehicle}</div>
                <div className="text-gray-400 text-sm">{review.location}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="text-sm text-gray-400 mb-4">Verified Reviews from Real Clients</div>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-burnt-orange mr-1"></div>
              ))}
            </div>
            <span className="text-off-white font-semibold">4.9/5 Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};
