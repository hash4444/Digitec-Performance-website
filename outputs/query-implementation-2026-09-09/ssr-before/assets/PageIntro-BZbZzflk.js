import { jsx, jsxs } from "react/jsx-runtime";
const PageIntro = ({
  eyebrow,
  title,
  description,
  children,
  className = ""
}) => /* @__PURE__ */ jsx(
  "section",
  {
    className: `relative overflow-hidden border-b border-white/[0.08] bg-[#101113] py-20 sm:py-24 lg:py-28 ${className}`,
    children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
      /* @__PURE__ */ jsx("div", { className: "home-kicker mb-5", children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { className: "max-w-3xl text-[clamp(2.75rem,5.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white", children: title }),
      description && /* @__PURE__ */ jsx("div", { className: "mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg", children: description }),
      children && /* @__PURE__ */ jsx("div", { className: "mt-8", children })
    ] }) })
  }
);
export {
  PageIntro as P
};
