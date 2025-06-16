
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black mb-6">
              <span className="text-burnt-orange">D</span>IGI-TEC Performance Center
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Dubai's premier luxury automotive tuning specialists, transforming 
              high-performance vehicles into bespoke masterpieces since 2008.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-charcoal border border-gray-700 flex items-center justify-center hover:border-burnt-orange transition-colors duration-300 cursor-pointer">
                <span className="text-xs font-bold">IG</span>
              </div>
              <div className="w-10 h-10 bg-charcoal border border-gray-700 flex items-center justify-center hover:border-burnt-orange transition-colors duration-300 cursor-pointer">
                <span className="text-xs font-bold">FB</span>
              </div>
              <div className="w-10 h-10 bg-charcoal border border-gray-700 flex items-center justify-center hover:border-burnt-orange transition-colors duration-300 cursor-pointer">
                <span className="text-xs font-bold">YT</span>
              </div>
              <div className="w-10 h-10 bg-charcoal border border-gray-700 flex items-center justify-center hover:border-burnt-orange transition-colors duration-300 cursor-pointer">
                <span className="text-xs font-bold">LI</span>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <div className="space-y-4 text-gray-300">
              <div>
                <div className="font-semibold text-off-white">Phone</div>
                <div>+971 4 XXX XXXX</div>
              </div>
              <div>
                <div className="font-semibold text-off-white">Email</div>
                <div>info@digitec-performance.ae</div>
              </div>
              <div>
                <div className="font-semibold text-off-white">Address</div>
                <div>Al Quoz Industrial Area<br />Dubai, UAE</div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <div className="space-y-3">
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300">Services</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300">Brands</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300">Gallery</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300">Reviews</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300">Contact</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300">Book Appointment</a></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 <span className="text-burnt-orange">D</span>IGI-TEC Performance Center. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
