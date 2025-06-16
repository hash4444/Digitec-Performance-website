
import React, { useEffect, useRef, useState } from 'react';

export const BrandsWeServe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);

  const brands = [
    { name: 'Mercedes-Benz', specialization: 'AMG Performance & Star Diagnostics' },
    { name: 'Maybach', specialization: 'Ultra-Luxury Comfort & Precision Service' },
    { name: 'Porsche', specialization: 'GT3 & Turbo Powertrain Tuning' },
    { name: 'Audi', specialization: 'Quattro Systems & RS Performance' },
    { name: 'BMW', specialization: 'M Series Optimization & iDrive Coding' },
    { name: 'Lamborghini', specialization: 'V10 & V12 Specialists' },
    { name: 'Bentley', specialization: 'Continental & Flying Spur Excellence' },
    { name: 'McLaren', specialization: 'Carbon Fiber & Turbo V8 Mastery' },
    { name: 'Ferrari', specialization: 'ECU & Powertrain Calibration' },
    { name: 'Bugatti', specialization: 'Quad Turbo Optimization & Luxury Diagnostics' },
    { name: 'Range Rover', specialization: 'Terrain Response & Luxury SUV Systems' },
    { name: 'Rolls Royce', specialization: 'Quiet, Precise, Luxurious – Inside and Out' },
    { name: 'Aston Martin', specialization: 'British Elegance & V12 Precision' }
  ];

  // Track mouse position for parallax effect (disabled on mobile)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = (e.clientX - rect.left - centerX) / centerX;
        const y = (e.clientY - rect.top - centerY) / centerY;
        setMousePos({ x: x * 15, y: y * 15 });
      }
    };

    const handleMouseEnter = () => {
      if (window.innerWidth >= 768) {
        setIsMouseInSection(true);
      }
    };
    
    const handleMouseLeave = () => {
      setIsMouseInSection(false);
      setMousePos({ x: 0, y: 0 });
    };

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

  // Calculate orbital positions for each logo (responsive)
  const getOrbitalPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const isMobile = window.innerWidth < 768;
    const radiusX = isMobile ? 130 : 300; 
    const radiusY = isMobile ? 90 : 220;
    
    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
      angle: angle
    };
  };

  // Brand logo SVGs
  const getBrandLogo = (brandName: string) => {
    const logoMap: { [key: string]: JSX.Element } = {
      'Mercedes-Benz': (
        <img 
          src="/lovable-uploads/a6f453f2-f2c5-4140-8f2a-bfa3401611d7.png" 
          alt="Mercedes-Benz Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Maybach': (
        <img 
          src="/lovable-uploads/5cc5b8af-7dd9-46a9-9ee2-3e5b14fda559.png" 
          alt="Maybach Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Porsche': (
        <img 
          src="/lovable-uploads/8e7e2545-680e-42ac-bd97-ba1f9c063649.png" 
          alt="Porsche Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Audi': (
        <img 
          src="/lovable-uploads/a3e92dde-70a9-499b-a7b0-ae0df117baf9.png" 
          alt="Audi Logo"
          className="w-full h-full object-contain"
        />
      ),
      'BMW': (
        <img 
          src="/lovable-uploads/d66ea83e-7d6a-4c19-bf30-f27eca93ac8e.png" 
          alt="BMW Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Lamborghini': (
        <img 
          src="/lovable-uploads/8c4046ee-9977-417a-90a9-820452146832.png" 
          alt="Lamborghini Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Bentley': (
        <img 
          src="/lovable-uploads/b2cd5f78-8a43-4a9b-8a0a-19124642ca5a.png" 
          alt="Bentley Logo"
          className="w-full h-full object-contain"
        />
      ),
      'McLaren': (
        <img 
          src="/lovable-uploads/7f8d98f4-3581-451c-bfaf-262eb67cf14b.png" 
          alt="McLaren Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Ferrari': (
        <img 
          src="/lovable-uploads/11f29482-f2d3-4278-ae2a-397044a1ff95.png" 
          alt="Ferrari Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Bugatti': (
        <img 
          src="/lovable-uploads/69bd2660-e800-47b4-bc4d-de6e6b65b984.png" 
          alt="Bugatti Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Range Rover': (
        <img 
          src="/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png" 
          alt="Range Rover Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Rolls Royce': (
        <img 
          src="/lovable-uploads/a4c040e8-740a-4fcb-b837-b86e15c25306.png" 
          alt="Rolls Royce Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Aston Martin': (
        <img 
          src="/lovable-uploads/8d3bad14-09df-4ef1-86c6-13cfcba7042b.png" 
          alt="Aston Martin Logo"
          className="w-full h-full object-contain"
        />
      )
    };

    return logoMap[brandName] || (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-2xl font-black text-burnt-orange">
          {brandName.charAt(0)}
        </span>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes particles {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          50% { transform: translate(20px, -20px) scale(1.2); opacity: 0.3; }
        }
        
        .orbital-container {
          animation: orbit 120s linear infinite;
        }
        
        @media (max-width: 768px) {
          .orbital-container {
            animation: orbit 180s linear infinite;
          }
        }
        
        .brand-logo {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .brand-logo:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 8px 24px rgba(255, 107, 53, 0.3));
        }
        
        @media (max-width: 768px) {
          .brand-logo:active {
            transform: scale(1.15);
            filter: drop-shadow(0 6px 20px rgba(255, 107, 53, 0.4));
          }
        }
        
        .central-d {
          text-shadow: 0 0 40px rgba(255, 107, 53, 0.9),
                       0 0 80px rgba(255, 107, 53, 0.7),
                       0 0 120px rgba(255, 107, 53, 0.5);
          filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.8));
        }
        
        .particle {
          animation: particles 8s ease-in-out infinite;
          border-radius: 50%;
          background: rgba(255, 107, 53, 0.1);
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6"
      >
        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(window.innerWidth < 768 ? 20 : 40)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full shadow-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-burnt-orange/3 via-transparent to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-black tracking-tight">
              Brands We Serve
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-4">
              Precision performance for the world's most prestigious automotive brands
            </p>
          </div>
          
          {/* Orbital system */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Central D - Standalone with glow */}
            <div className="absolute z-20 flex items-center justify-center">
              <div className="central-d text-4xl sm:text-6xl lg:text-8xl font-black text-burnt-orange">
                D
              </div>
            </div>
            
            {/* Orbiting brands container */}
            <div 
              className="orbital-container absolute inset-0"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                transition: isMouseInSection ? 'none' : 'transform 0.8s ease-out'
              }}
            >
              {brands.map((brand, index) => {
                const position = getOrbitalPosition(index, brands.length);
                return (
                  <div
                    key={brand.name}
                    className="absolute w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center group cursor-pointer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
                    }}
                  >
                    {/* Brand logo - no background container */}
                    <div className="brand-logo w-full h-full p-1 sm:p-2">
                      {getBrandLogo(brand.name)}
                    </div>
                    
                    {/* Hover/Touch tooltip */}
                    <div className="absolute top-full mt-4 sm:mt-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 pointer-events-none z-30">
                      <div className="bg-white/95 backdrop-blur-md border border-burnt-orange/20 rounded-2xl sm:rounded-3xl px-3 sm:px-6 py-2 sm:py-4 text-center whitespace-nowrap shadow-2xl">
                        <div className="text-burnt-orange font-bold text-xs sm:text-sm">{brand.name}</div>
                        <div className="text-gray-700 text-xs mt-1 hidden sm:block">{brand.specialization}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg px-4">
              Experience precision service for your luxury vehicle
            </p>
            <button className="w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 rounded-2xl sm:rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-burnt-orange/25">
              Schedule Service
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
