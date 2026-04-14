
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationLinks: { name: string; href: string; isPage?: boolean }[] = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '/services', isPage: true },
    { name: 'Tuning', href: '/tuning', isPage: true },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (href: string, isPage?: boolean) => {
    setIsMenuOpen(false);
    if (isPage) {
      navigate(href);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-black/95 backdrop-blur-md border-b border-white/10",
        isScrolled ? "shadow-2xl shadow-black/50" : ""
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              className="flex-shrink-0 z-10 cursor-pointer"
              onClick={() => handleLinkClick('#home')}
              aria-label="Go to top"
            >
              <img 
                src="/lovable-uploads/916789e0-b6fb-43d4-9d52-79899ce5a1c2.png" 
                alt="DIGI-TEC Performance Center" 
                className="h-10 md:h-14 w-auto filter brightness-110 font-sans text-lg"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href, link.isPage)}
                  className="relative text-off-white font-semibold text-sm lg:text-base tracking-wide 
                           hover:text-burnt-orange transition-all duration-300 group cursor-pointer
                           py-2 px-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burnt-orange 
                                 transition-all duration-300 group-hover:w-full rounded-full
                                 shadow-lg shadow-burnt-orange/50"></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-10 w-10 h-10 rounded-lg bg-charcoal/80 
                       flex items-center justify-center border border-white/20
                       hover:bg-burnt-orange/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-off-white" />
              ) : (
                <Menu className="w-5 h-5 text-off-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={cn(
          "md:hidden fixed inset-0 top-16 transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className={cn(
            "relative bg-black/95 border-t border-white/10 shadow-2xl",
            "transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}>
            <nav className="px-4 py-6 space-y-1">
              {navigationLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href, link.isPage)}
                  className="block w-full text-left px-4 py-4 text-off-white font-semibold 
                           text-lg tracking-wide hover:text-burnt-orange hover:bg-white/5
                           transition-all duration-300 rounded-lg border border-transparent
                           hover:border-burnt-orange/30 hover:shadow-lg hover:shadow-burnt-orange/10"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 md:h-20" />

      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
