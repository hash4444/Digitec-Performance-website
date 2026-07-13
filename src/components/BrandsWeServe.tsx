import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { getSlugForOrbitName } from '@/data/brands';

const SPEC = 'Repair • Maintenance • Diagnostics • Performance';

// Inner ring (5) + outer ring (8) = 13 marques.
const INNER = ['Mercedes-Benz', 'Porsche', 'BMW', 'Audi', 'Ferrari'];
const OUTER = [
  'Lamborghini',
  'Bentley',
  'McLaren',
  'Maybach',
  'Range Rover',
  'Aston Martin',
  'Rolls Royce',
  'Bugatti',
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
  return <img src={src} alt={`${name} Logo`} draggable={false} className="w-full h-full object-contain" />;
};

const MobileGrid = () => (
  <div className="grid grid-cols-4 gap-3 px-2">
    {[...INNER, ...OUTER].map((name) => (
      <Link
        key={name}
        to={`/brands/${getSlugForOrbitName(name) ?? ''}`}
        className="flex flex-col items-center gap-1.5 group"
        aria-label={`${name} service in Dubai`}
      >
        <div className="w-16 h-16 p-1.5 bg-white/90 rounded-full shadow-lg border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <BrandLogo name={name} />
        </div>
        <span className="text-[11px] text-gray-400 group-hover:text-burnt-orange text-center leading-tight font-medium">
          {name}
        </span>
      </Link>
    ))}
  </div>
);

// Geometry (design units — stage is 700×700, scaled responsively).
const R_INNER = 168;
const R_OUTER = 290;

// Static tachometer tick ring around the core.
const TICKS = Array.from({ length: 72 }, (_, i) => {
  const major = i % 6 === 0;
  const a = (i / 72) * Math.PI * 2;
  const cx = 105;
  const cy = 105;
  const rOut = 104;
  const rIn = rOut - (major ? 10 : 5);
  return {
    x1: cx + rOut * Math.cos(a),
    y1: cy + rOut * Math.sin(a),
    x2: cx + rIn * Math.cos(a),
    y2: cy + rIn * Math.sin(a),
    major,
  };
});

const Orbit = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const innerRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const outerRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Cross-boundary flags shared between React handlers and the RAF loop.
  const hoveredRef = useRef(false);
  const movedRef = useRef(false);

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let angleIn = -90;
    let angleOut = 14;
    let cometA = 40;
    let speedMul = 1;
    let dragVel = 0;
    let dragging = false;
    let lastT = performance.now();
    let lastPA = 0;
    let lastPT = 0;
    let moveAcc = 0;
    // Cursor parallax (planets drift toward the pointer).
    let mx = 0;
    let my = 0;
    let px = 0;
    let py = 0;

    const BASE_IN = 8; // deg / second
    const BASE_OUT = -5;
    const COMET = 24;
    let rafId = 0;

    const stage = stageRef.current;
    if (!stage) return;

    const centerOf = () => {
      const r = stage.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    const pointerAngle = (e: PointerEvent) => {
      const c = centerOf();
      return (Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180) / Math.PI;
    };

    const onMove = (e: PointerEvent) => {
      const a = pointerAngle(e);
      let d = a - lastPA;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      angleIn += d;
      angleOut += d * 0.72;
      moveAcc += Math.abs(d);
      if (moveAcc > 4) movedRef.current = true;
      const now = performance.now();
      const dt = Math.max(now - lastPT, 1) / 1000;
      dragVel = Math.max(-720, Math.min(720, d / dt));
      lastPA = a;
      lastPT = now;
    };
    const onUp = () => {
      dragging = false;
      stage.classList.remove('is-dragging');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      moveAcc = 0;
      movedRef.current = false;
      stage.classList.add('is-dragging');
      lastPA = pointerAngle(e);
      lastPT = performance.now();
      dragVel = 0;
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    };
    const onHover = (e: PointerEvent) => {
      const c = centerOf();
      const r = stage.getBoundingClientRect();
      mx = ((e.clientX - c.x) / (r.width / 2)) * 12;
      my = ((e.clientY - c.y) / (r.height / 2)) * 12;
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onHover);
    stage.addEventListener('pointerleave', onLeave);

    const place = (el: HTMLElement | null, deg: number, r: number) => {
      if (!el) return;
      const rad = (deg * Math.PI) / 180;
      el.style.transform = `translate(-50%, -50%) translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`;
    };

    const frame = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      const targetMul = dragging ? 0 : hoveredRef.current ? 0.1 : 1;
      speedMul += (targetMul - speedMul) * Math.min(dt * 6, 1);

      if (!dragging) {
        angleIn += (BASE_IN * speedMul + dragVel) * dt;
        angleOut += (BASE_OUT * speedMul + dragVel * 0.72) * dt;
        dragVel *= Math.pow(0.06, dt);
        if (Math.abs(dragVel) < 2) dragVel = 0;
      }
      cometA += COMET * (0.35 + 0.65 * speedMul) * dt;

      px += (mx - px) * Math.min(dt * 4, 1);
      py += (my - py) * Math.min(dt * 4, 1);
      if (parallaxRef.current) parallaxRef.current.style.transform = `translate(${px}px, ${py}px)`;

      const stepIn = 360 / INNER.length;
      for (let i = 0; i < INNER.length; i++) place(innerRefs.current[i], angleIn + stepIn * i, R_INNER);
      const stepOut = 360 / OUTER.length;
      for (let i = 0; i < OUTER.length; i++) place(outerRefs.current[i], angleOut + stepOut * i, R_OUTER);

      if (cometRef.current) {
        const rad = (cometA * Math.PI) / 180;
        cometRef.current.style.transform = `translate(-50%, -50%) translate(${Math.cos(rad) * R_OUTER}px, ${Math.sin(rad) * R_OUTER}px) rotate(${cometA + 90}deg)`;
      }

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onHover);
      stage.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const guardClick = (e: React.MouseEvent) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const renderChip = (
    name: string,
    i: number,
    refs: React.MutableRefObject<(HTMLAnchorElement | null)[]>,
    size: string,
  ) => (
    <Link
      key={name}
      ref={(el) => (refs.current[i] = el)}
      to={`/brands/${getSlugForOrbitName(name) ?? ''}`}
      aria-label={`${name} service in Dubai`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onClick={guardClick}
      onMouseEnter={() => {
        hoveredRef.current = true;
        setActive(name);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        setActive(null);
      }}
      className={`chip-slot absolute left-1/2 top-1/2 flex items-center justify-center ${size}`}
    >
      <span className={`chip-visual ${active === name ? 'is-active' : ''}`}>
        <BrandLogo name={name} />
      </span>
    </Link>
  );

  return (
    <>
      <style>{`
        @keyframes dt-sweep { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes dt-pulse {
          0%   { transform: translate(-50%, -50%) scale(0.92); opacity: 0.65; }
          70%  { transform: translate(-50%, -50%) scale(1.24); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1.24); opacity: 0; }
        }
        @keyframes dt-glow {
          0%, 100% { text-shadow: 0 0 22px rgba(255,107,53,0.55), 0 0 50px rgba(255,107,53,0.3); }
          50%      { text-shadow: 0 0 34px rgba(255,107,53,0.8), 0 0 70px rgba(255,107,53,0.45); }
        }
        .dt-stage { cursor: grab; touch-action: none; }
        .dt-stage.is-dragging { cursor: grabbing; }
        .dt-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
        .chip-slot { will-change: transform; }
        .chip-visual {
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 100%; padding: 18%;
          border-radius: 9999px;
          background:
            radial-gradient(circle at 32% 26%, rgba(255,255,255,0.95), rgba(255,255,255,0.82) 60%);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 18px 34px -18px rgba(0,0,0,0.85);
          transition: transform .3s cubic-bezier(0.23,1,0.32,1), box-shadow .3s ease, border-color .3s ease;
        }
        .chip-slot:hover .chip-visual, .chip-visual.is-active {
          transform: scale(1.16);
          border-color: rgba(255,107,53,0.85);
          box-shadow: 0 0 0 5px rgba(255,107,53,0.14), 0 0 44px -6px rgba(255,107,53,0.6), 0 18px 34px -18px rgba(0,0,0,0.85);
        }
        @media (prefers-reduced-motion: reduce) {
          .dt-sweep, .dt-pulse { animation: none !important; }
          .dt-core-d { animation: none !important; }
        }
      `}</style>

      <div className="relative flex items-center justify-center h-[560px] md:h-[640px] lg:h-[720px]">
        <div
          ref={stageRef}
          className="dt-stage relative select-none scale-[0.72] md:scale-[0.82] lg:scale-100 origin-center"
          style={{ width: 700, height: 700 }}
        >
          {/* guide rings */}
          <div className="dt-center rounded-full border border-dashed border-white/[0.07]" style={{ width: 344, height: 344 }} />
          <div className="dt-center rounded-full border border-dashed border-white/[0.07]" style={{ width: 592, height: 592 }} />

          {/* radar sweep */}
          <div
            className="dt-center dt-sweep pointer-events-none"
            style={{
              width: 592,
              height: 592,
              borderRadius: '9999px',
              background:
                'conic-gradient(from 0deg, rgba(255,107,53,0.10) 0deg, rgba(255,107,53,0.03) 42deg, transparent 80deg, transparent 360deg)',
              WebkitMaskImage:
                'radial-gradient(circle, transparent 106px, black 108px, black 294px, transparent 296px)',
              maskImage:
                'radial-gradient(circle, transparent 106px, black 108px, black 294px, transparent 296px)',
              animation: 'dt-sweep 14s linear infinite',
            }}
          />

          {/* tachometer tick ring */}
          <svg className="dt-center pointer-events-none" width={210} height={210} viewBox="0 0 210 210" style={{ overflow: 'visible' }}>
            {TICKS.map((tk, i) => (
              <line
                key={i}
                x1={tk.x1}
                y1={tk.y1}
                x2={tk.x2}
                y2={tk.y2}
                stroke={tk.major ? 'rgba(255,107,53,0.7)' : 'rgba(255,255,255,0.16)'}
                strokeWidth={tk.major ? 2 : 1}
              />
            ))}
          </svg>

          {/* pulse + core */}
          <div
            className="dt-center dt-pulse pointer-events-none"
            style={{ width: 176, height: 176, borderRadius: '9999px', border: '1px solid rgba(255,107,53,0.35)', animation: 'dt-pulse 3.2s ease-out infinite' }}
          />
          <div
            className="dt-center pointer-events-none flex items-center justify-center"
            style={{
              width: 150,
              height: 150,
              borderRadius: '9999px',
              background:
                'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.07), transparent 58%), linear-gradient(160deg, #191919, #0c0c0c)',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px -12px rgba(255,107,53,0.35), 0 30px 60px -30px rgba(0,0,0,0.9)',
            }}
          >
            <span className="dt-core-d font-black italic text-burnt-orange" style={{ fontSize: 76, lineHeight: 1, transform: 'translateX(-3px)', animation: 'dt-glow 3s ease-in-out infinite' }}>
              D
            </span>
          </div>

          {/* planets + comet (parallax layer) */}
          <div ref={parallaxRef} className="absolute inset-0">
            {OUTER.map((name, i) => renderChip(name, i, outerRefs, 'w-[86px] h-[86px]'))}
            {INNER.map((name, i) => renderChip(name, i, innerRefs, 'w-[74px] h-[74px]'))}
            <div
              ref={cometRef}
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ width: 7, height: 7, borderRadius: '9999px', background: '#ff6b35', boxShadow: '0 0 12px 3px rgba(255,107,53,0.75)' }}
            >
              <span
                className="absolute"
                style={{ right: 4, top: '50%', width: 56, height: 1.5, transform: 'translateY(-50%)', background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.7))', borderRadius: 2 }}
              />
            </div>
          </div>
        </div>

        {/* hover info card */}
        <div
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-full bg-black/85 border border-white/10 backdrop-blur-sm whitespace-nowrap transition-all duration-300 ${
            active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
          <span className="font-bold text-sm text-off-white">{active ?? ''}</span>
          <span className="text-gray-400 text-xs tracking-wide">{SPEC}</span>
        </div>
      </div>
    </>
  );
};

export const BrandsWeServe = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 py-14 sm:py-20 lg:py-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_700px_at_50%_42%,rgba(255,107,53,0.06),transparent_62%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <span className="eyebrow mb-3 sm:mb-5">Marque Specialists</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-6 text-white tracking-tight">
            Brands We Serve
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-400 max-w-3xl mx-auto px-4 leading-snug sm:leading-relaxed">
            Precision performance for the world's most prestigious automotive marques.
          </p>
        </div>

        {isMobile ? <MobileGrid /> : <Orbit />}

        <div className="text-center mt-8 sm:mt-12">
          {!isMobile && (
            <p className="hidden md:flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500 mb-6">
              Drag to spin · <span className="text-burnt-orange">Hover a marque</span>
            </p>
          )}
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-lg px-4">
            Experience precision service for your luxury vehicle
          </p>
          <button className="btn-primary w-full sm:w-auto">Schedule Service</button>
        </div>
      </div>
    </section>
  );
};
