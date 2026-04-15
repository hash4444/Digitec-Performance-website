import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  description: string;
}

interface ExteriorHotspotImageProps {
  src: string;
  alt: string;
  hotspots: Hotspot[];
}

const ExteriorHotspotImage: React.FC<ExteriorHotspotImageProps> = ({ src, alt, hotspots }) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const activeData = hotspots.find((h) => h.id === activeHotspot);

  return (
    <div className="relative max-w-4xl mx-auto">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-3xl shadow-2xl"
      />

      {/* Hotspot dots */}
      {hotspots.map((spot) => (
        <button
          key={spot.id}
          onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
          className="absolute group"
          style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
          aria-label={spot.title}
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 w-10 h-10 -m-2 rounded-full bg-white/10 animate-ping" />
          {/* Outer circle */}
          <span className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
            activeHotspot === spot.id
              ? 'bg-red-600 border-red-600 scale-110'
              : 'bg-white/20 border-white/40 hover:bg-white/30 hover:border-white/60'
          }`}>
            {/* Inner dot */}
            <span className={`w-2 h-2 rounded-full transition-colors ${
              activeHotspot === spot.id ? 'bg-white' : 'bg-red-500'
            }`} />
          </span>
        </button>
      ))}

      {/* Info popup */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-6 sm:max-w-sm p-5 rounded-2xl bg-black/90 backdrop-blur-md border border-white/10"
          >
            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="text-base font-bold text-off-white mb-1.5 pr-6">{activeData.title}</h4>
            <p className="text-sm text-white/50 leading-relaxed">{activeData.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExteriorHotspotImage;
