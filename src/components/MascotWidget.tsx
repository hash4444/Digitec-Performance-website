import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent(
  "Hi, I'd like to get in touch with Digi-Tec Performance Center.",
)}`;
const TEL_HREF = 'tel:+97143402223';

/**
 * DIGI-TEC mascot contact widget — replaces the plain floating chat/phone buttons.
 *
 * Behaviour:
 *  - Mascot peeks (head + upper body) from the bottom-right corner, gently bobbing.
 *  - Hover: he rises, waves, and the contact options appear.
 *  - Click/tap: toggles the options (touch devices have no hover).
 *  - Cursor over him: subtle perspective tilt follows the pointer for a 3D feel.
 *
 * Asset: /images/mascot.png (front view). Until it exists, a brand "D" avatar
 * renders instead, so the widget is fully functional either way.
 */
export const MascotWidget = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rootRef = useRef<HTMLDivElement>(null);

  const active = open || hovered;

  // Close on Escape or on click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  return (
    <>
      <style>{`
        @keyframes mascot-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes mascot-wave {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(22deg); }
          40% { transform: rotate(-12deg); }
          60% { transform: rotate(22deg); }
          80% { transform: rotate(-8deg); }
        }
        @keyframes mascot-pop {
          from { opacity: 0; transform: translateY(14px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mascot-option { animation: mascot-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .mascot-hand {
          transform-origin: 85% 90%;
          animation: mascot-wave 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mascot-bob-anim, .mascot-hand, .mascot-option { animation: none !important; }
        }
      `}</style>

      <div ref={rootRef} className="fixed bottom-0 right-3 sm:right-5 z-50 flex flex-col items-end select-none">
        {/* Contact options */}
        <div
          className={`flex flex-col items-end gap-2.5 mb-2 mr-1 transition-all duration-200 ${
            active ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!active}
        >
          {active && (
            <>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mascot-option inline-flex items-center gap-2.5 bg-burnt-orange hover:bg-[#ff7d4d] text-black font-bold text-xs uppercase tracking-[0.12em] pl-4 pr-5 py-3 rounded-full shadow-[0_10px_28px_-10px_rgba(255,107,53,0.6)] transition-colors"
                style={{ animationDelay: '0.05s' }}
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Message Us
              </a>
              <a
                href={TEL_HREF}
                className="mascot-option inline-flex items-center gap-2.5 bg-black/85 backdrop-blur-sm border border-white/20 hover:border-burnt-orange/70 text-off-white hover:text-burnt-orange font-bold text-xs uppercase tracking-[0.12em] pl-4 pr-5 py-3 rounded-full shadow-xl transition-all"
                style={{ animationDelay: '0.12s' }}
                onClick={() => setOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </>
          )}
        </div>

        {/* Mascot */}
        <button
          type="button"
          aria-label={open ? 'Close contact options' : 'Contact Digi-Tec — call or message us'}
          aria-expanded={active}
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setTilt({ x: 0, y: 0 });
          }}
          onMouseMove={handleMove}
          className="relative block outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange rounded-t-3xl cursor-pointer"
          style={{ perspective: '600px' }}
        >
          {/* Waving hand — appears when active */}
          <span
            className={`absolute -left-7 top-2 text-3xl sm:text-4xl transition-all duration-300 ${
              active ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-2'
            }`}
            aria-hidden="true"
          >
            <span className="mascot-hand inline-block drop-shadow-[0_2px_8px_rgba(255,107,53,0.5)]">👋</span>
          </span>

          {/* Online pulse dot */}
          <span
            className={`absolute top-1 right-1 z-10 flex h-3.5 w-3.5 transition-opacity duration-300 ${
              active ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-burnt-orange opacity-60" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-burnt-orange border-2 border-black" />
          </span>

          <span
            className={`mascot-bob-anim block transition-transform duration-300 ease-out ${
              active ? '' : ''
            }`}
            style={{
              animation: active ? 'none' : 'mascot-bob 3.2s ease-in-out infinite',
              transform: active
                ? `translateY(-8px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : undefined,
              transformStyle: 'preserve-3d',
            }}
          >
            {imgOk ? (
              <img
                src="/images/mascot.png"
                alt=""
                draggable={false}
                onError={() => setImgOk(false)}
                className="w-24 sm:w-28 h-auto translate-y-[26%] drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
                style={{
                  // Peek: show head + upper body only, fade the cut edge into the page
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 62%, transparent 78%), radial-gradient(120% 100% at 50% 40%, black 55%, transparent 72%)',
                  WebkitMaskComposite: 'source-in',
                  maskImage:
                    'linear-gradient(to bottom, black 0%, black 62%, transparent 78%), radial-gradient(120% 100% at 50% 40%, black 55%, transparent 72%)',
                  maskComposite: 'intersect',
                }}
              />
            ) : (
              /* Fallback avatar until /images/mascot.png is added */
              <span className="mb-3 mr-1 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black border border-burnt-orange/50 shadow-[0_10px_28px_-10px_rgba(255,107,53,0.5)] flex items-center justify-center">
                <span className="text-burnt-orange font-black text-2xl sm:text-3xl italic">D</span>
              </span>
            )}
          </span>

        </button>
      </div>
    </>
  );
};

export default MascotWidget;
