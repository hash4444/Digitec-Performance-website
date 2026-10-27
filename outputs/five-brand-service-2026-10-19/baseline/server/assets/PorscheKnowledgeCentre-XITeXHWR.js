import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Car, Cog, CircleAlert, BookOpen, Wrench, ArrowRight } from "lucide-react";
import { ao as porscheModelNavigation, be as porscheSystemNavigation, bf as porscheProblemNavigation, bg as porscheGuideNavigation, bh as porscheServiceNavigation, L as LocalizedLink } from "../entry-server.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const NavigationCard = ({ item }) => {
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-off-white transition-colors group-hover:text-burnt-orange", children: item.title }),
      item.path ? /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0 text-burnt-orange" }) : null
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-gray-400", children: item.description }),
    item.status === "planned" ? /* @__PURE__ */ jsx("span", { className: "mt-3 inline-flex rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500", children: "Detailed guide planned" }) : null
  ] });
  return item.path ? /* @__PURE__ */ jsx(LocalizedLink, { to: item.path, className: "card-premium group block rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange", children: content }) : /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5", children: content });
};
const NavigationGroup = ({
  id,
  title,
  description,
  items,
  icon: Icon
}) => /* @__PURE__ */ jsxs("section", { id, "aria-labelledby": `${id}-title`, className: "scroll-mt-24", children: [
  /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-start gap-3", children: [
    /* @__PURE__ */ jsx("span", { className: "rounded-xl border border-burnt-orange/25 bg-burnt-orange/10 p-2.5 text-burnt-orange", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { id: `${id}-title`, className: "text-xl font-black text-off-white sm:text-2xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-relaxed text-gray-400", children: description })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: items.map((item) => /* @__PURE__ */ jsx(NavigationCard, { item }, item.title)) })
] });
const PorscheKnowledgeCentre = () => /* @__PURE__ */ jsx("section", { id: "porsche-knowledge-centre", className: "border-t border-white/5 bg-gradient-to-b from-charcoal/50 to-black py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
  /* @__PURE__ */ jsxs("header", { className: "max-w-3xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-burnt-orange", children: "Porsche Knowledge Centre" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-black leading-tight text-off-white sm:text-5xl", children: "Browse by model, system or symptom" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-relaxed text-gray-300", children: "Start with the Porsche you own, the system you want to understand or the symptom you have noticed. Each guide explains the topic and links to relevant inspection and repair information." })
  ] }),
  /* @__PURE__ */ jsx("nav", { "aria-label": "Porsche knowledge centre sections", className: "my-8 flex flex-wrap gap-2 border-y border-white/10 py-4", children: [
    ["Models", "#porsche-models"],
    ["Systems", "#porsche-systems"],
    ["Problems", "#porsche-problems"],
    ["Guides", "#porsche-guides"],
    ["Services", "#porsche-service-directory"]
  ].map(([label, href]) => /* @__PURE__ */ jsx("a", { href, className: "rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:border-burnt-orange/50 hover:text-burnt-orange", children: label }, href)) }),
  /* @__PURE__ */ jsxs("div", { className: "space-y-12 sm:space-y-16", children: [
    /* @__PURE__ */ jsx(NavigationGroup, { id: "porsche-models", title: "Porsche models", description: "Model-family guidance with generation detail added only where the platform creates a distinct owner need.", items: porscheModelNavigation, icon: Car }),
    /* @__PURE__ */ jsx(NavigationGroup, { id: "porsche-systems", title: "Porsche systems", description: "Understand the fitted system, its normal behaviour and the warning signs that need investigation.", items: porscheSystemNavigation, icon: Cog }),
    /* @__PURE__ */ jsx(NavigationGroup, { id: "porsche-problems", title: "Problems and warning signs", description: "A symptom is a starting point, not a confirmed diagnosis. These links lead to the relevant inspection or repair area.", items: porscheProblemNavigation, icon: CircleAlert }),
    /* @__PURE__ */ jsx(NavigationGroup, { id: "porsche-guides", title: "Ownership guides", description: "Maintenance and workshop-selection information for Porsche owners in Dubai.", items: porscheGuideNavigation, icon: BookOpen }),
    /* @__PURE__ */ jsx(NavigationGroup, { id: "porsche-service-directory", title: "Porsche inspection and repair", description: "Choose the work your Porsche needs. Each service explains its own inspection scope and booking step.", items: porscheServiceNavigation, icon: Wrench }),
    /* @__PURE__ */ jsx("section", { "aria-labelledby": "porsche-cases-title", className: "rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "rounded-xl border border-burnt-orange/25 bg-burnt-orange/10 p-2.5 text-burnt-orange", children: /* @__PURE__ */ jsx(Wrench, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { id: "porsche-cases-title", className: "text-xl font-black text-off-white sm:text-2xl", children: "Recent workshop cases" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-3xl text-sm leading-relaxed text-gray-400", children: "Verified Porsche case studies will appear here only when a real workshop record, diagnostic process, completed repair and supporting DIGI-TEC images are available. No example jobs are presented as completed work." })
      ] })
    ] }) })
  ] })
] }) });
export {
  PorscheKnowledgeCentre as default
};
