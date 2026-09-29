import { useState, useEffect, useRef } from 'react';

export function useAnimatedCounter(target: number, duration = 800, decimals = 0) {
  const [value, setValue] = useState(target);
  const animationRef = useRef<number>();
  const startRef = useRef<number>();
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    const diff = target - from;
    if (diff === 0) return;

    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = from + diff * eased;
      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = target;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      fromRef.current = target;
    };
  }, [target, duration, decimals]);

  return value;
}
