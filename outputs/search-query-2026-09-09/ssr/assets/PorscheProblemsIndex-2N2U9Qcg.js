import { jsxs, jsx } from "react/jsx-runtime";
import { CircleAlert, ArrowRight } from "lucide-react";
import { e as useSeo, S as SITE_URL, aR as PORSCHE_PROBLEMS_PATH, p as pageGraph, aS as porscheProblemGuides, b as buildWebPage, a as buildBreadcrumb, H as Header, L as LocalizedLink, an as PORSCHE_HUB_PATH, f as Footer } from "../entry-server.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-accordion";
const PorscheProblemsIndex = () => {
  const url = `${SITE_URL}${PORSCHE_PROBLEMS_PATH}`;
  useSeo({ title: "Porsche Problems & Warning Signs | Digi-Tec", description: "Diagnostic guides for Porsche transmission, engine, cooling, suspension, brake, battery, AC and model-specific symptoms.", canonical: url, jsonLd: pageGraph([buildWebPage({ url, type: "CollectionPage", mainEntityId: `${url}#sitemap-list`, name: "Porsche Problems and Warning Signs", description: "Porsche symptom guides for owners.", breadcrumbId: `${url}#breadcrumb` }), buildBreadcrumb(url, [{ name: "Home", url: SITE_URL }, { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` }, { name: "Problems", url }]), { "@type": "ItemList", "@id": `${url}#sitemap-list`, name: "Porsche problem and warning sign guides", numberOfItems: porscheProblemGuides.length, itemListElement: porscheProblemGuides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.name, item: `${SITE_URL}${PORSCHE_PROBLEMS_PATH}/${g.slug}` })) }]), hasArabicVersion: false });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_HUB_PATH, children: "Porsche" }),
        " / ",
        /* @__PURE__ */ jsx("span", { className: "text-white", children: "Problems" })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx(CircleAlert, { className: "h-9 w-9 text-burnt-orange" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-5 text-4xl font-black sm:text-6xl", children: "Porsche Problems & Warning Signs" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-lg leading-relaxed text-white/65", children: "Choose the symptom you have noticed. These guides explain possibilities and driving risk; they do not diagnose a vehicle remotely." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: porscheProblemGuides.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${PORSCHE_PROBLEMS_PATH}/${item.slug}`, className: "card-premium group rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black group-hover:text-burnt-orange", children: item.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: item.summary }),
          /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "Read diagnostic guide ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.slug)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PorscheProblemsIndex as default
};
