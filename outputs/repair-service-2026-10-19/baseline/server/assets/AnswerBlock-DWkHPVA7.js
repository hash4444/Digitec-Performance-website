import { jsx, jsxs } from "react/jsx-runtime";
const AnswerBlock = ({ question, answer, facts, className = "" }) => /* @__PURE__ */ jsx("section", { className: `home-section ${className}`, "aria-label": question, children: /* @__PURE__ */ jsxs("div", { className: "home-container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20", children: [
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: "Quick answer" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold leading-tight tracking-[-0.035em] text-off-white sm:text-4xl", children: question })
  ] }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-base leading-8 text-white/58 sm:text-lg", children: answer }),
    facts && facts.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-10 grid border-t border-white/[0.09] sm:grid-cols-2", children: facts.map((fact) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 border-b border-white/[0.09] py-4 pr-6 text-sm leading-6 text-white/45 sm:odd:border-r sm:even:pl-6", children: [
      /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-burnt-orange" }),
      /* @__PURE__ */ jsx("span", { children: fact })
    ] }, fact)) })
  ] })
] }) });
export {
  AnswerBlock as A
};
