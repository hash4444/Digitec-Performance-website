import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useLocale } from '@/i18n/use-locale';

const WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent(
  "Hi, I'd like to get in touch with Digi-Tec Performance Center.",
)}`;
const TEL_HREF = 'tel:+97143402223';

/**
 * DIGI-TEC mascot contact widget — replaces the plain floating chat/phone buttons.
 *
 * Behaviour:
 *  - Mascot peeks (head + upper body) from the right edge, gently bobbing.
 *  - Hover: he slides further into view, raises his real hand, and the contact options appear.
 *  - Click/tap: toggles the options (touch devices have no hover).
 *  - Cursor over him: subtle perspective tilt follows the pointer for a 3D feel.
 *
 * Assets: /images/mascot.png (resting pose) and /images/mascot-wave.png
 * (greeting pose). Until they exist, a brand "D" avatar renders instead.
 */
export const MascotWidget = () => {
  const { isArabic } = useLocale();
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
      <div ref={rootRef} className={`fixed bottom-4 sm:bottom-12 ${isArabic ? 'left-0 items-start' : 'right-0 items-end'} z-50 flex flex-col select-none`}>
        {/* Contact options */}
        <div
          className={`flex flex-col ${isArabic ? 'items-start ml-1' : 'items-end mr-1'} gap-2.5 mb-2 transition-all duration-200 ${
            active ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!active}
        >
          {active && (
            <>
              <a
                href={isArabic ? `https://wa.me/97143402223?text=${encodeURIComponent('مرحباً، أود التواصل مع مركز ديجي-تك بيرفورمانس.')}` : WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mascot-option inline-flex items-center gap-2.5 bg-burnt-orange hover:bg-[#ff7d4d] text-black font-bold text-xs uppercase tracking-[0.12em] pl-4 pr-5 py-3 rounded-full shadow-[0_10px_28px_-10px_rgba(255,107,53,0.6)] transition-colors"
                style={{ animationDelay: '0.05s' }}
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                {isArabic ? 'راسلنا' : 'Message Us'}
              </a>
              <a
                href={TEL_HREF}
                className="mascot-option inline-flex items-center gap-2.5 bg-black/85 backdrop-blur-sm border border-white/20 hover:border-burnt-orange/70 text-off-white hover:text-burnt-orange font-bold text-xs uppercase tracking-[0.12em] pl-4 pr-5 py-3 rounded-full shadow-xl transition-all"
                style={{ animationDelay: '0.12s' }}
                onClick={() => setOpen(false)}
              >
                <Phone className="w-4 h-4" />
                {isArabic ? 'اتصل بنا' : 'Call Us'}
              </a>
            </>
          )}
        </div>

        {/* Mascot */}
        <button
          type="button"
          aria-label={open ? (isArabic ? 'إغلاق خيارات التواصل' : 'Close contact options') : (isArabic ? 'تواصل مع ديجي-تك بالاتصال أو الرسائل' : 'Contact Digi-Tec — call or message us')}
          aria-expanded={active}
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setTilt({ x: 0, y: 0 });
          }}
          onMouseMove={handleMove}
          className={`relative block outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange ${isArabic ? 'rounded-r-3xl' : 'rounded-l-3xl'} cursor-pointer`}
          style={{ perspective: '600px' }}
        >
          {/* Online pulse dot */}
          <span
            className={`absolute top-5 sm:top-8 ${isArabic ? 'left-10 sm:left-20' : 'right-10 sm:right-20'} z-10 flex h-3.5 w-3.5 transition-opacity duration-300 ${
              active ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-burnt-orange opacity-60" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-burnt-orange border-2 border-black" />
          </span>

          <span
            className="mascot-bob-anim relative block h-24 w-32 overflow-hidden transition-transform duration-500 ease-out sm:h-40 sm:w-56"
            style={{
              animation: active ? 'none' : 'mascot-bob 3.2s ease-in-out infinite',
              transform: active
                ? `${isArabic ? 'translateX(-16%)' : 'translateX(16%)'} rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : isArabic ? 'translateX(-42%)' : 'translateX(42%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {imgOk ? (
              <>
                <img
                  src="/images/mascot.png"
                  alt=""
                  draggable={false}
                  onError={() => setImgOk(false)}
                  className={`absolute inset-0 w-full h-auto origin-top scale-[1.18] drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)] transition-all duration-300 ${
                    active ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <img
                  src="/images/mascot-wave.png"
                  alt=""
                  draggable={false}
                  onError={() => setImgOk(false)}
                  className={`absolute inset-0 w-full h-auto origin-top scale-[1.18] drop-shadow-[0_8px_24px_rgba(255,107,53,0.18)] transition-opacity duration-300 ${
                    active ? 'mascot-greet-anim opacity-100' : 'opacity-0'
                  }`}
                />
              </>
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
