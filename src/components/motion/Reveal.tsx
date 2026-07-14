import React, { useEffect, useRef, useState } from 'react';

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
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : hidden(direction, distance),
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
