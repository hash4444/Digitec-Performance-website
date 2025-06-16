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
      <div className="w-full h-full rounded-3xl bg-gradient-to-br from-burnt-orange/20 to-chocolate/20 flex items-center justify-center">
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
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, -20px) scale(1.2); opacity: 0.7; }
        }
        
        .orbital-container {
          animation: orbit 120s linear infinite;
        }
        
        .brand-logo {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .brand-logo:hover {
          transform: scale(1.15);
          box-shadow: 0 16px 48px rgba(255, 107, 53, 0.25);
          border-radius: 28px;
        }
        
        .central-d {
          text-shadow: 0 0 30px rgba(255, 107, 53, 0.8),
                       0 0 60px rgba(255, 107, 53, 0.6),
                       0 0 90px rgba(255, 107, 53, 0.4);
        }
        
        .particle {
          animation: particles 8s ease-in-out infinite;
          border-radius: 50%;
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="relative py-32 bg-charcoal overflow-hidden min-h-screen flex items-center justify-center"
      >
        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 bg-burnt-orange/20 rounded-full shadow-lg"
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
            <div className="absolute z-20 w-28 h-28 flex items-center justify-center rounded-3xl bg-gradient-to-br from-burnt-orange/10 to-transparent shadow-2xl">
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
                    className="absolute w-20 h-20 flex items-center justify-center group cursor-pointer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
                    }}
                  >
                    {/* Brand logo */}
                    <div className="brand-logo w-full h-full text-gray-600 group-hover:text-burnt-orange bg-white/80 backdrop-blur-sm p-3 rounded-3xl shadow-lg">
                      {getBrandLogo(brand.name)}
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-md border border-burnt-orange/20 rounded-3xl px-6 py-4 text-center whitespace-nowrap shadow-2xl">
                        <div className="text-burnt-orange font-bold text-sm">{brand.name}</div>
                        <div className="text-gray-700 text-xs mt-1">{brand.specialization}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-8 text-lg">
              Experience precision service for your luxury vehicle
            </p>
            <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-lg px-12 py-4 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-burnt-orange/25">
              Schedule Service
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
