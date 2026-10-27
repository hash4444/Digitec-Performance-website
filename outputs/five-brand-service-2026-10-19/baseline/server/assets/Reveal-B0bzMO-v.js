import { jsx } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
const hidden = (dir, d) => {
  switch (dir) {
    case "up":
      return `translateY(${d}px)`;
    case "down":
      return `translateY(-${d}px)`;
    case "left":
      return `translateX(${d}px)`;
    case "right":
      return `translateX(-${d}px)`;
    default:
      return "none";
  }
};
const Reveal = ({
  children,
  className,
  delay = 0,
  distance = 26,
  direction = "up",
  duration = 0.6,
  amount = 0.2
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || !el.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches || el.getBoundingClientRect().top < window.innerHeight) return;
    let animation;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animation = el.animate([
              { opacity: 0, transform: hidden(direction, distance) },
              { opacity: 1, transform: "none" }
            ], {
              duration: duration * 1e3,
              delay: delay * 1e3,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              fill: "backwards"
            });
            io.disconnect();
          }
        });
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      animation == null ? void 0 : animation.cancel();
    };
  }, [amount, delay, direction, distance, duration]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className,
      children
    }
  );
};
export {
  Reveal as R
};
