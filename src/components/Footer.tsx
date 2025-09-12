
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">
              <span className="text-burnt-orange">D</span>IGI-TEC Performance Center
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-md text-base sm:text-lg">
              Dubai's premier luxury automotive tuning specialists, transforming 
              high-performance vehicles into bespoke masterpieces since 2008.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-xs sm:text-sm font-bold text-burnt-orange">IG</span>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-xs sm:text-sm font-bold text-burnt-orange">FB</span>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-xs sm:text-sm font-bold text-burnt-orange">YT</span>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-xs sm:text-sm font-bold text-burnt-orange">LI</span>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-charcoal/30 to-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-burnt-orange">Contact</h4>
            <div className="space-y-3 sm:space-y-4 text-gray-300">
              <div>
                <div className="font-semibold text-off-white text-sm sm:text-base">Phone</div>
                <div className="text-sm sm:text-base">+971 4 340 2223</div>
              </div>
              <div>
                <div className="font-semibold text-off-white text-sm sm:text-base">Email</div>
                <div className="text-sm sm:text-base">info@digitecme.com</div>
              </div>
              <div>
                <div className="font-semibold text-off-white text-sm sm:text-base">Address</div>
                <div className="text-sm sm:text-base">Al Quoz Industrial Area 3<br />Warehouse No.11-15</div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="bg-gradient-to-br from-charcoal/30 to-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-burnt-orange">Quick Links</h4>
            <div className="space-y-2 sm:space-y-3">
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-2 sm:px-3 rounded-xl hover:bg-burnt-orange/10 text-sm sm:text-base">Services</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-2 sm:px-3 rounded-xl hover:bg-burnt-orange/10 text-sm sm:text-base">Brands</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-2 sm:px-3 rounded-xl hover:bg-burnt-orange/10 text-sm sm:text-base">Gallery</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-2 sm:px-3 rounded-xl hover:bg-burnt-orange/10 text-sm sm:text-base">Reviews</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-2 sm:px-3 rounded-xl hover:bg-burnt-orange/10 text-sm sm:text-base">Contact</a></div>
              <div><a href="#" className="text-gray-300 hover:text-burnt-orange transition-colors duration-300 block py-1 px-2 sm:px-3 rounded-xl hover:bg-burnt-orange/10 text-sm sm:text-base">Book Appointment</a></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
            © 2024 <span className="text-burnt-orange">D</span>IGI-TEC Performance Center. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-2 sm:px-4 rounded-xl hover:bg-burnt-orange/10">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-2 sm:px-4 rounded-xl hover:bg-burnt-orange/10">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-2 sm:px-4 rounded-xl hover:bg-burnt-orange/10">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
