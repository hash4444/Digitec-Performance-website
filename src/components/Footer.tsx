
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black mb-6">
              <span className="text-burnt-orange">D</span>IGI-TEC Performance Center
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md text-lg">
              Dubai's premier luxury automotive tuning specialists, transforming 
              high-performance vehicles into bespoke masterpieces since 2008.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-sm font-bold text-burnt-orange">IG</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-sm font-bold text-burnt-orange">FB</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-sm font-bold text-burnt-orange">YT</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-sm font-bold text-burnt-orange">LI</span>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-charcoal/30 to-black/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h4 className="text-xl font-bold mb-6 text-burnt-orange">Contact</h4>
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
          <div className="bg-gradient-to-br from-charcoal/30 to-black/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h4 className="text-xl font-bold mb-6 text-burnt-orange">Quick Links</h4>
            <div className="space-y-3">
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-3 rounded-xl hover:bg-burnt-orange/10">Services</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-3 rounded-xl hover:bg-burnt-orange/10">Brands</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-3 rounded-xl hover:bg-burnt-orange/10">Gallery</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-3 rounded-xl hover:bg-burnt-orange/10">Reviews</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-3 rounded-xl hover:bg-burnt-orange/10">Contact</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-3 rounded-xl hover:bg-burnt-orange/10">Book Appointment</a></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 <span className="text-burnt-orange">D</span>IGI-TEC Performance Center. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-burnt-orange/10">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-burnt-orange/10">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-burnt-orange/10">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
