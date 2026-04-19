
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">
              <span className="text-burnt-orange">D</span>IGI-TEC Performance Center
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-md text-base sm:text-lg">
              Dubai's premier luxury automotive tuning specialists, transforming 
              high-performance vehicles into bespoke masterpieces high-performance vehicles into bespoke masterpieces since 2002.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://www.instagram.com/digi_tec/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-xs sm:text-sm font-bold text-burnt-orange">IG</span>
              </a>
              <a href="https://www.facebook.com/Digitecme/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-xs sm:text-sm font-bold text-burnt-orange">FB</span>
              </a>
              <a href="https://www.youtube.com/@gad-motors-officialchannel8804" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-charcoal to-black border border-gray-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                <span className="text-xs sm:text-sm font-bold text-burnt-orange">YT</span>
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-charcoal/30 to-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-burnt-orange">Contact</h4>
            <div className="space-y-3 sm:space-y-4 text-gray-300">
              <div>
                <div className="font-semibold text-off-white text-sm sm:text-base">Phone</div>
                <a href="tel:+97143402223" className="text-sm sm:text-base hover:text-burnt-orange transition-colors">+971 4 340 2223</a>
              </div>
              <div>
                <div className="font-semibold text-off-white text-sm sm:text-base">Email</div>
                <a href="mailto:info@digitecme.com" className="text-sm sm:text-base hover:text-burnt-orange transition-colors">info@digitecme.com</a>
              </div>
              <div>
                <div className="font-semibold text-off-white text-sm sm:text-base">Address</div>
                <a href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Warehouse+No.11-15+Dubai" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base hover:text-burnt-orange transition-colors">Al Quoz Industrial Area 3<br />Warehouse No.11-15</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
            © 2026 <span className="text-burnt-orange">D</span>IGI-TEC Performance Center. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-sm">
            <a href="/blog" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-2 sm:px-4 rounded-xl hover:bg-burnt-orange/10">Blog</a>
            <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-burnt-orange transition-colors duration-300 py-2 px-2 sm:px-4 rounded-xl hover:bg-burnt-orange/10">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
