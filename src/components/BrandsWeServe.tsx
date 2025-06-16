
import React, { useEffect, useRef, useState } from 'react';

export const BrandsWeServe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);

  const brands = [
    {
      name: 'Mercedes-Benz',
      specialization: 'AMG Performance & Star Diagnostics',
      logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Maybach',
      specialization: 'Ultra-Luxury Comfort & Precision Service',
      logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Porsche',
      specialization: 'GT3 & Turbo Powertrain Tuning',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Audi',
      specialization: 'Quattro Systems & RS Performance',
      logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'BMW',
      specialization: 'M Series Optimization & iDrive Coding',
      logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Lamborghini',
      specialization: 'V10 & V12 Specialists',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Bentley',
      specialization: 'Continental & Flying Spur Excellence',
      logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'McLaren',
      specialization: 'Carbon Fiber & Turbo V8 Mastery',
      logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Ferrari',
      specialization: 'ECU & Powertrain Calibration',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Bugatti',
      specialization: 'Quad Turbo Optimization & Luxury Diagnostics',
      logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Range Rover',
      specialization: 'Terrain Response & Luxury SUV Systems',
      logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Rolls Royce',
      specialization: 'Quiet, Precise, Luxurious – Inside and Out',
      logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=120&h=120&fit=crop&crop=center'
    },
    {
      name: 'Aston Martin',
      specialization: 'British Elegance & V12 Precision',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&h=120&fit=crop&crop=center'
    }
  ];

  // Track mouse position for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
      }
    };

    const handleMouseEnter = () => setIsMouseInSection(true);
    const handleMouseLeave = () => setIsMouseInSection(false);

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Calculate magnetic effect for each logo
  const getMagneticTransform = (index: number, element: HTMLElement | null) => {
    if (!isMouseInSection || !element) return 'translate3d(0, 0, 0)';
    
    const rect = element.getBoundingClientRect();
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    if (!sectionRect) return 'translate3d(0, 0, 0)';
    
    const centerX = rect.left + rect.width / 2 - sectionRect.left;
    const centerY = rect.top + rect.height / 2 - sectionRect.top;
    
    const deltaX = mousePos.x - centerX;
    const deltaY = mousePos.y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    const maxDistance = 150;
    const strength = Math.max(0, 1 - distance / maxDistance);
    
    const moveX = deltaX * strength * 0.15;
    const moveY = deltaY * strength * 0.15;
    
    return `translate3d(${moveX}px, ${moveY}px, 0)`;
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden min-h-screen"
    >
      {/* Animated particle background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-burnt-orange/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/3 via-transparent to-burnt-orange/3"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-burnt-orange/8 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-burnt-orange/5 rounded-full blur-2xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-off-white tracking-tight">
            Only the Icons. Only the Elite.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            We specialize in diagnostics, performance, and precision service for the world's most iconic automotive brands.
          </p>
        </div>
        
        {/* Floating Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 mb-20">
          {brands.map((brand, index) => (
            <div 
              key={brand.name}
              className="group relative cursor-pointer"
              style={{
                transform: getMagneticTransform(index, document.getElementById(`brand-${index}`)),
                transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
              id={`brand-${index}`}
            >
              {/* Floating animation */}
              <div 
                className="relative"
                style={{
                  animation: `float 6s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`
                }}
              >
                {/* Glow ring on hover */}
                <div className="absolute -inset-4 bg-gradient-radial from-burnt-orange/0 via-burnt-orange/20 to-burnt-orange/0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md"></div>
                
                {/* Logo container */}
                <div className="relative bg-charcoal/20 border border-gray-800/30 p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 group-hover:border-burnt-orange/50 group-hover:bg-charcoal/40 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-burnt-orange/20">
                  
                  {/* Brand logo */}
                  <div className="relative mb-6">
                    <div className="h-20 flex items-center justify-center">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-600 via-gray-400 to-gray-600 group-hover:shadow-xl group-hover:shadow-burnt-orange/40 transition-all duration-500">
                        <img 
                          src={brand.logo} 
                          alt={`${brand.name} logo`}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        
                        {/* Metallic shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500"></div>
                        
                        {/* DIGI-TEC "D" overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-burnt-orange font-black text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse">
                            D
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Brand name */}
                  <h3 className="font-bold text-lg text-gray-300 group-hover:text-off-white transition-colors duration-500 mb-2 text-center tracking-wide">
                    {brand.name}
                  </h3>
                  
                  {/* Specialization - slides up on hover */}
                  <div className="overflow-hidden">
                    <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-burnt-orange font-semibold text-sm leading-tight text-center">
                        {brand.specialization}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="text-center">
          <div className="mb-8">
            <p className="text-xl text-gray-400 mb-3">
              Don't see your brand?
            </p>
            <p className="text-lg text-gray-300">
              We service all European and ultra-luxury vehicles. Just ask.
            </p>
          </div>
          
          <button className="relative bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-xl px-16 py-5 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-burnt-orange/40 overflow-hidden group">
            <span className="relative z-10">Talk to a Specialist</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(-4px) rotate(-1deg); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};
