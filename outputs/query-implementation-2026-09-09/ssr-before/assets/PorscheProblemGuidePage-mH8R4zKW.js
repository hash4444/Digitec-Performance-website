import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { TriangleAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { aV as getPorscheProblemGuide, S as SITE_URL, aT as PORSCHE_PROBLEMS_PATH, e as useSeo, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, ao as PORSCHE_HUB_PATH, aj as buildArticle, aU as porscheProblemGuides, H as Header, L as LocalizedLink, f as Footer } from "../entry-server.js";
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
import "@radix-ui/react-accordion";
const Panel = ({ title, items }) => /* @__PURE__ */ jsxs("section", { className: "card-premium rounded-2xl p-6", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: title }),
  /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/65", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
    item
  ] }, item)) })
] });
const PorscheProblemGuidePage = () => {
  const { slug } = useParams();
  const item = slug ? getPorscheProblemGuide(slug) : void 0;
  const url = `${SITE_URL}${PORSCHE_PROBLEMS_PATH}/${(item == null ? void 0 : item.slug) ?? ""}`;
  useSeo({ title: (item == null ? void 0 : item.metaTitle) ?? "Porsche Problems | Digi-Tec", description: (item == null ? void 0 : item.metaDescription) ?? "Porsche diagnostic guide.", canonical: item ? url : `${SITE_URL}${PORSCHE_PROBLEMS_PATH}`, noindex: !item, jsonLd: item ? pageGraph([buildWebPage({ url, name: item.name, description: item.metaDescription, type: "ItemPage", breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#article` }), buildBreadcrumb(url, [{ name: "Home", url: SITE_URL }, { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` }, { name: "Problems", url: `${SITE_URL}${PORSCHE_PROBLEMS_PATH}` }, { name: item.name, url }]), buildArticle({ url, headline: item.name, description: item.metaDescription, datePublished: "2026-08-31", author: "DIGI-TEC Workshop", section: "Porsche Diagnostic Guides" })]) : void 0, hasArabicVersion: false });
  if (!item) return /* @__PURE__ */ jsx(Navigate, { to: PORSCHE_PROBLEMS_PATH, replace: true });
  const related = porscheProblemGuides.filter((g) => g.slug !== item.slug && g.service.path === item.service.path).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_HUB_PATH, children: "Porsche" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_PROBLEMS_PATH, children: "Problems" }),
        " / ",
        /* @__PURE__ */ jsx("span", { className: "text-white", children: item.name })
      ] }),
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("header", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Porsche symptom guide" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black sm:text-6xl", children: item.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-white/70", children: item.summary })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Panel, { title: "What the driver may notice", items: item.notices }),
          /* @__PURE__ */ jsx(Panel, { title: "Possible causes", items: item.causes }),
          /* @__PURE__ */ jsx(Panel, { title: "Safe checks before booking", items: item.checks }),
          /* @__PURE__ */ jsx(Panel, { title: "What professional diagnosis may require", items: item.professional }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-amber-400/25 bg-amber-400/10 p-6 lg:col-span-2", children: [
            /* @__PURE__ */ jsx(TriangleAlert, { className: "h-6 w-6 text-amber-300" }),
            /* @__PURE__ */ jsx("h2", { className: "mt-3 text-xl font-black", children: "Is continued driving risky?" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-white/70", children: item.risk })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Relevant models and system" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          item.models.map((m) => /* @__PURE__ */ jsx(LocalizedLink, { to: m.path, className: "btn-secondary", children: m.label }, m.path)),
          item.system ? /* @__PURE__ */ jsx(LocalizedLink, { to: item.system.path, className: "btn-secondary", children: item.system.label }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 rounded-2xl border border-burnt-orange/25 bg-burnt-orange/10 p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "When the vehicle needs inspection" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-sm leading-relaxed text-white/65", children: "This guide remains informational. The linked commercial page explains the workshop inspection and repair process for a confirmed need." }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: item.service.path, className: "mt-5 inline-flex items-center gap-1 font-semibold text-burnt-orange", children: [
            item.service.label,
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }),
        related.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "mt-10 text-2xl font-black", children: "Related symptoms" }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: related.map((g) => /* @__PURE__ */ jsx(LocalizedLink, { to: `${PORSCHE_PROBLEMS_PATH}/${g.slug}`, className: "card-premium group rounded-xl p-5 font-bold group-hover:text-burnt-orange", children: g.name }, g.slug)) })
        ] }) : null
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PorscheProblemGuidePage as default
};
