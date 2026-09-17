import React, { useEffect, useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating — use index * 0.08 for a stagger. */
  delay?: number;
  /** Travel distance in px (default 26). */
  distance?: number;
  direction?: Direction;
  /** Seconds. */
  duration?: number;
  /** Fraction of the element that must be visible before it triggers. */
  amount?: number;
}

const hidden = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up': return `translateY(${d}px)`;
    case 'down': return `translateY(-${d}px)`;
    case 'left': return `translateX(${d}px)`;
    case 'right': return `translateX(-${d}px)`;
    default: return 'none';
  }
};

/**
 * Fade + rise as the element scrolls into view. Uses IntersectionObserver
 * (which always emits an initial callback for the current state, so nothing
 * can get stuck invisible after fast scrolls or bfcache restores), animates
 * opacity/transform only, fires once, and honours prefers-reduced-motion.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  distance = 26,
  direction = 'up',
  duration = 0.6,
  amount = 0.2,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    // Render readable content in initial HTML and when JavaScript is unavailable.
    // Enhance only offscreen sections; never hide an already visible heading.
    if (!el || !('IntersectionObserver' in window) || !el.animate ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      el.getBoundingClientRect().top < window.innerHeight) return;

    let animation: Animation | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animation = el.animate([
              { opacity: 0, transform: hidden(direction, distance) },
              { opacity: 1, transform: 'none' },
            ], {
              duration: duration * 1000,
              delay: delay * 1000,
              easing: 'cubic-bezier(0.22,1,0.36,1)',
              fill: 'backwards',
            });
            io.disconnect();
          }
        });
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => { io.disconnect(); animation?.cancel(); };
  }, [amount, delay, direction, distance, duration]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
};

export default Reveal;
