
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

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = (e.clientX - rect.left - centerX) / centerX;
        const y = (e.clientY - rect.top - centerY) / centerY;
        setMousePos({ x: x * 20, y: y * 20 }); // Amplify movement
      }
    };

    const handleMouseEnter = () => setIsMouseInSection(true);
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

  // Calculate orbital positions for each logo
  const getOrbitalPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radiusX = 280; // Elliptical orbit
    const radiusY = 200;
    
    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
      angle: angle
    };
  };

  // Brand logo SVGs (simplified representations)
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
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20 30 L50 15 L80 30 L80 70 L50 85 L20 70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="55" textAnchor="middle" fontSize="24" fill="currentColor" fontWeight="bold">M</text>
        </svg>
      ),
      'Porsche': (
        <img 
          src="/lovable-uploads/b632a8da-5197-45f3-96f1-94cd0e9942e3.png" 
          alt="Porsche Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Audi': (
        <img 
          src="/lovable-uploads/8e59fadf-f1e4-4860-ac92-81509a23ec94.png" 
          alt="Audi Logo"
          className="w-full h-full object-contain"
        />
      ),
      'BMW': (
        <img 
          src="/lovable-uploads/f13e5867-fa2e-4bac-8132-8c6ee447feab.png" 
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
          src="/lovable-uploads/7a227eaa-c434-4d89-8827-fb1c5d640bc3.png" 
          alt="Bentley Logo"
          className="w-full h-full object-contain"
        />
      ),
      'McLaren': (
        <img 
          src="/lovable-uploads/70a5e539-8ab8-44b9-85a1-4ecac36681c2.png" 
          alt="McLaren Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Ferrari': (
        <img 
          src="/lovable-uploads/54bab4d8-e8ac-469c-8b33-0116edc6c3b0.png" 
          alt="Ferrari Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Bugatti': (
        <img 
          src="/lovable-uploads/0d7ae3eb-4e88-4a9b-ba5a-f7f1d25b74ec.png" 
          alt="Bugatti Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Range Rover': (
        <img 
          src="/lovable-uploads/bf4fc6ba-f08f-4fa6-a7c6-0e1a65b780b3.png" 
          alt="Range Rover Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Rolls Royce': (
        <img 
          src="/lovable-uploads/c509aefa-0c5f-4a03-8de8-0d508fcd68cc.png" 
          alt="Rolls Royce Logo"
          className="w-full h-full object-contain"
        />
      ),
      'Aston Martin': (
        <img 
          src="/lovable-uploads/a864ba86-0cc4-45a7-83e5-f3e39a34e6e5.png" 
          alt="Aston Martin Logo"
          className="w-full h-full object-contain"
        />
      )
    };

    return logoMap[brandName] || (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="50" y="55" textAnchor="middle" fontSize="14" fill="currentColor">
          {brandName.charAt(0)}
        </text>
      </svg>
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
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, -20px) scale(1.2); opacity: 0.7; }
        }
        
        .orbital-container {
          animation: orbit 120s linear infinite;
        }
        
        .brand-logo {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .brand-logo:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.6));
        }
        
        .central-d {
          text-shadow: 0 0 30px rgba(255, 107, 53, 0.8),
                       0 0 60px rgba(255, 107, 53, 0.6),
                       0 0 90px rgba(255, 107, 53, 0.4);
        }
        
        .particle {
          animation: particles 8s ease-in-out infinite;
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="relative py-32 bg-black overflow-hidden min-h-screen flex items-center justify-center"
      >
        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-burnt-orange/20 rounded-full"
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
        <div className="absolute inset-0 bg-gradient-radial from-burnt-orange/5 via-transparent to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-off-white tracking-tight">
              Brands We Serve
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Precision performance for the world's most prestigious automotive brands
            </p>
          </div>
          
          {/* Orbital system */}
          <div className="relative w-full h-[600px] flex items-center justify-center">
            {/* Central D */}
            <div className="absolute z-20 w-24 h-24 flex items-center justify-center">
              <div className="central-d text-7xl font-black text-burnt-orange">
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
                    className="absolute w-16 h-16 flex items-center justify-center group cursor-pointer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
                    }}
                  >
                    {/* Brand logo */}
                    <div className="brand-logo w-full h-full text-gray-400 group-hover:text-burnt-orange">
                      {getBrandLogo(brand.name)}
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="bg-charcoal/90 backdrop-blur-sm border border-burnt-orange/30 rounded-lg px-4 py-2 text-center whitespace-nowrap">
                        <div className="text-burnt-orange font-bold text-sm">{brand.name}</div>
                        <div className="text-gray-300 text-xs mt-1">{brand.specialization}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Experience precision service for your luxury vehicle
            </p>
            <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-burnt-orange/40">
              Schedule Service
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
