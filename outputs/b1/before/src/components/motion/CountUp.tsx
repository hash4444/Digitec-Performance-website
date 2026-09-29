import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Animation length in ms. */
  duration?: number;
  /** Thousands separators (e.g. 50,000). */
  format?: boolean;
  className?: string;
}

/**
 * Counts a number up from zero the first time it scrolls into view.
 * Uses IntersectionObserver + requestAnimationFrame with an easeOutCubic
 * curve, and honours prefers-reduced-motion (renders the final value).
 */
export const CountUp = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1700,
  format = true,
  className,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started.current) return;
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const text = format ? display.toLocaleString('en-US') : String(display);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
};

export default CountUp;
