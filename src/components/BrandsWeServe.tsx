
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

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
  { name: 'Rolls Royce', specialization: 'Quiet, Precise, Luxurious: Inside and Out' },
  { name: 'Aston Martin', specialization: 'British Elegance & V12 Precision' }
];

const logoMap: Record<string, string> = {
  'Mercedes-Benz': '/lovable-uploads/a6f453f2-f2c5-4140-8f2a-bfa3401611d7.png',
  'Maybach': '/lovable-uploads/5cc5b8af-7dd9-46a9-9ee2-3e5b14fda559.png',
  'Porsche': '/lovable-uploads/8e7e2545-680e-42ac-bd97-ba1f9c063649.png',
  'Audi': '/lovable-uploads/a3e92dde-70a9-499b-a7b0-ae0df117baf9.png',
  'BMW': '/lovable-uploads/d66ea83e-7d6a-4c19-bf30-f27eca93ac8e.png',
  'Lamborghini': '/lovable-uploads/8c4046ee-9977-417a-90a9-820452146832.png',
  'Bentley': '/lovable-uploads/b2cd5f78-8a43-4a9b-8a0a-19124642ca5a.png',
  'McLaren': '/lovable-uploads/7f8d98f4-3581-451c-bfaf-262eb67cf14b.png',
  'Ferrari': '/lovable-uploads/11f29482-f2d3-4278-ae2a-397044a1ff95.png',
  'Bugatti': '/lovable-uploads/69bd2660-e800-47b4-bc4d-de6e6b65b984.png',
  'Range Rover': '/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png',
  'Rolls Royce': '/lovable-uploads/a4c040e8-740a-4fcb-b837-b86e15c25306.png',
  'Aston Martin': '/lovable-uploads/8d3bad14-09df-4ef1-86c6-13cfcba7042b.png',
};

const BrandLogo = ({ name }: { name: string }) => {
  const src = logoMap[name];
  if (!src) return <span className="text-2xl font-black text-burnt-orange">{name.charAt(0)}</span>;
  return <img src={src} alt={`${name} Logo`} className="w-full h-full object-contain" />;
};

const MobileGrid = () => (
  <div className="grid grid-cols-3 gap-6 px-2">
    {brands.map((brand) => (
      <div key={brand.name} className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 flex items-center justify-center">
          <BrandLogo name={brand.name} />
        </div>
        <span className="text-xs text-gray-600 text-center leading-tight font-medium">{brand.name}</span>
      </div>
    ))}
  </div>
);

export const BrandsWeServe = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const dragStartRef = useRef({ x: 0, y: 0, rotation: 0 });

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current && !isDragging) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = (e.clientX - rect.left - centerX) / centerX;
        const y = (e.clientY - rect.top - centerY) / centerY;
        setMousePos({ x: x * 20, y: y * 20 });
      }
    };

    const handleMouseEnter = () => setIsMouseInSection(true);
    const handleMouseLeave = () => { setIsMouseInSection(false); setMousePos({ x: 0, y: 0 }); };

    const handleMouseDown = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY, rotation: orbitRotation - angle };
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

    const handleMouseUp = () => setIsDragging(false);

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
  }, [isDragging, orbitRotation, isMobile]);

  useEffect(() => {
    if (isMobile || isDragging) return;
    const interval = setInterval(() => setOrbitRotation(prev => prev + 0.002), 16);
    return () => clearInterval(interval);
  }, [isDragging, isMobile]);

  const getOrbitalPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI + orbitRotation;
    return { x: Math.cos(angle) * 320, y: Math.sin(angle) * 240, angle };
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
        .orbital-container { cursor: ${isDragging ? 'grabbing' : 'grab'}; }
        .brand-logo { transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1); filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)); }
        .brand-logo:hover { transform: scale(1.25); filter: drop-shadow(0 8px 24px rgba(255, 107, 53, 0.4)); z-index: 10; }
        .central-d { animation: glowPulse 3s ease-in-out infinite; text-shadow: 0 0 30px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.6), 0 0 90px rgba(255, 107, 53, 0.4); }
        .pulse-ring { animation: pulseRing 2s ease-out infinite; border: 2px solid rgba(255, 107, 53, 0.3); border-radius: 50%; position: absolute; }
      `}</style>

      <section
        ref={sectionRef}
        className={`relative bg-white overflow-hidden flex items-center justify-center px-4 sm:px-6 select-none ${isMobile ? 'py-16' : 'py-16 sm:py-24 lg:py-32 min-h-screen'}`}
      >
        {/* Pulse rings - desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pulse-ring w-48 h-48" style={{ animationDelay: '0s' }} />
            <div className="pulse-ring w-60 h-60" style={{ animationDelay: '0.5s' }} />
            <div className="pulse-ring w-72 h-72" style={{ animationDelay: '1s' }} />
          </div>
        )}

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-black tracking-tight">
              Brands We Serve
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-4">
              Precision performance for the world's most prestigious automotive brands
            </p>
          </div>

          {isMobile ? (
            <MobileGrid />
          ) : (
            <div className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center">
              <div className="absolute z-20 flex items-center justify-center">
                <div className="central-d text-7xl lg:text-9xl font-black text-burnt-orange">D</div>
              </div>
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
                          className="absolute w-18 lg:w-22 h-18 lg:h-22 flex items-center justify-center group cursor-pointer"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
                          }}
                        >
                          <div className="brand-logo w-full h-full p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
                            <BrandLogo name={brand.name} />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-black/90 text-white border-burnt-orange/30 max-w-xs">
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
          )}

          <div className="text-center mt-10 sm:mt-16">
            <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg px-4">
              Experience precision service for your luxury vehicle
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
