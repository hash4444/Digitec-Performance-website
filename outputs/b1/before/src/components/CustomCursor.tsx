import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, summary, [role="button"]';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia('(pointer: fine)').matches) return undefined;

    const moveCursor = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.dataset.visible = 'true';
      cursor.dataset.interactive = event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR) ? 'true' : 'false';
    };

    const hideCursor = () => {
      cursor.dataset.visible = 'false';
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    document.documentElement.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};

export default CustomCursor;
