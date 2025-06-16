
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const BrandsWeServe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const dragStartRef = useRef({ x: 0, y: 0, rotation: 0 });

  const brands = [
    { name: 'Mercedes-Benz', specialization: 'AMG Performance & Star Diagnostics' },
    { name: 'Maybach', specialization: 'Ultra-Luxury Comfort & Precision Service' },
    { name: 'Porsche', specialization: 'GT3 & Turbo Powertrain Tuning' },
    { name: 'Audi', specialization: 'Quattro Systems & RS Performance' },
    { name: 'BMW', specialization: 'M Series Optimization & iDrive Coding' },
    { name: 'Lamborghini', specialization: 'V10 & V12 Specialists' },
    { name: 'Bentley', specialization: 'Continental & Flying Spur Excellence' },
    { name: 'McLaren', specialization: 'Carbon Fiber & Turbo V8 Mastery' },
    { name: 'Ferrari', specialization: 'F1 ECU Tuning & Performance Calibration' },
    { name: 'Bugatti', specialization: 'Quad Turbo Optimization & Luxury Diagnostics' },
    { name: 'Range Rover', specialization: 'Terrain Response & Luxury SUV Systems' },
    { name: 'Rolls Royce', specialization: 'Quiet, Precise, Luxurious – Inside and Out' },
    { name: 'Aston Martin', specialization: 'British Elegance & V12 Precision' }
  ];

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && sectionRef.current && !isDragging) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = (e.clientX - rect.left - centerX) / centerX;
        const y = (e.clientY - rect.top - centerY) / centerY;
        setMousePos({ x: x * 20, y: y * 20 });
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

    // Drag functionality
    const handleMouseDown = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        
        setIsDragging(true);
        dragStartRef.current = { 
          x: e.clientX, 
          y: e.clientY, 
          rotation: orbitRotation - angle 
        };
      }
    };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (isDragging && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        
        setOrbitRotation(dragStartRef.current.rotation + angle);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);
      section.addEventListener('mousedown', handleMouseDown);
    }

    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
        section.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, orbitRotation]);

  // Auto rotation when not dragging
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setOrbitRotation(prev => prev + 0.002);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  // Calculate orbital positions
  const getOrbitalPosition = (index: number, total: number) => {
    const baseAngle = (index / total) * 2 * Math.PI;
    const angle = baseAngle + orbitRotation;
    const isMobile = window.innerWidth < 768;
    const radiusX = isMobile ? 140 : 320; 
    const radiusY = isMobile ? 100 : 240;
    
    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
      angle: angle
    };
  };

  // Brand logo components
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
    <TooltipProvider>
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.6)); }
          50% { filter: drop-shadow(0 0 40px rgba(255, 107, 53, 0.9)); }
        }
        
        .orbital-container {
          cursor: ${isDragging ? 'grabbing' : 'grab'};
        }
        
        .brand-logo {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
        }
        
        .brand-logo:hover {
          transform: scale(1.25);
          filter: drop-shadow(0 8px 24px rgba(255, 107, 53, 0.4));
          z-index: 10;
        }
        
        .central-d {
          animation: glowPulse 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(255, 107, 53, 0.8),
                       0 0 60px rgba(255, 107, 53, 0.6),
                       0 0 90px rgba(255, 107, 53, 0.4);
        }
        
        .pulse-ring {
          animation: pulseRing 2s ease-out infinite;
          border: 2px solid rgba(255, 107, 53, 0.3);
          border-radius: 50%;
          position: absolute;
        }
        
        .motion-trail {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 107, 53, 0.3);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6 select-none"
      >
        {/* Pulse rings around center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pulse-ring w-32 h-32 sm:w-48 sm:h-48" style={{ animationDelay: '0s' }} />
          <div className="pulse-ring w-40 h-40 sm:w-60 sm:h-60" style={{ animationDelay: '0.5s' }} />
          <div className="pulse-ring w-48 h-48 sm:w-72 sm:h-72" style={{ animationDelay: '1s' }} />
        </div>

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
          
          {/* Interactive orbital system */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Central D with enhanced glow */}
            <div className="absolute z-20 flex items-center justify-center">
              <div className="central-d text-5xl sm:text-7xl lg:text-9xl font-black text-burnt-orange">
                D
              </div>
            </div>
            
            {/* Orbiting brands container with parallax */}
            <div 
              className="orbital-container absolute inset-0"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                transition: isMouseInSection && !isDragging ? 'none' : 'transform 0.8s ease-out'
              }}
            >
              {brands.map((brand, index) => {
                const position = getOrbitalPosition(index, brands.length);
                return (
                  <Tooltip key={brand.name}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22 flex items-center justify-center group cursor-pointer"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
                        }}
                      >
                        <div className="brand-logo w-full h-full p-1 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
                          {getBrandLogo(brand.name)}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-black/90 text-white border-burnt-orange/30 max-w-xs"
                    >
                      <div className="text-center p-2">
                        <div className="text-burnt-orange font-bold text-sm mb-1">{brand.name}</div>
                        <div className="text-gray-300 text-xs">{brand.specialization}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          
          {/* Enhanced CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg px-4">
              {isDragging ? 'Drag to explore our expertise' : 'Experience precision service for your luxury vehicle'}
            </p>
            <button className="w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 rounded-2xl sm:rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-burnt-orange/25">
              Schedule Service
            </button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};
