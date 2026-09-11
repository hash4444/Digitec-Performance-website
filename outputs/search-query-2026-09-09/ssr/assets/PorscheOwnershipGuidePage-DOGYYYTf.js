import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { aU as getPorscheOwnershipGuide, S as SITE_URL, ap as PORSCHE_GUIDES_PATH, e as useSeo, am as PORSCHE_GUIDES_PARENT_PATH, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, an as PORSCHE_HUB_PATH, aj as buildArticle, H as Header, L as LocalizedLink, f as Footer } from "../entry-server.js";
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
const List = ({ title, items, negative = false }) => /* @__PURE__ */ jsxs("section", { className: "card-premium rounded-2xl p-6", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: title }),
  /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/65", children: [
    negative ? /* @__PURE__ */ jsx(XCircle, { className: "mt-0.5 h-4 w-4 shrink-0 text-amber-300" }) : /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
    item
  ] }, item)) })
] });
const PorscheOwnershipGuidePage = () => {
  const { slug } = useParams();
  const item = slug ? getPorscheOwnershipGuide(slug) : void 0;
  const url = `${SITE_URL}${PORSCHE_GUIDES_PATH}/${(item == null ? void 0 : item.slug) ?? ""}`;
  useSeo({ title: (item == null ? void 0 : item.metaTitle) ?? "Porsche Ownership Guides | Digi-Tec", description: (item == null ? void 0 : item.metaDescription) ?? "Porsche ownership guide.", canonical: item ? url : `${SITE_URL}${PORSCHE_GUIDES_PARENT_PATH}`, noindex: !item, jsonLd: item ? pageGraph([buildWebPage({ url, name: item.name, description: item.metaDescription, type: "ItemPage", breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#article` }), buildBreadcrumb(url, [{ name: "Home", url: SITE_URL }, { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` }, { name: "Ownership Guides", url: `${SITE_URL}${PORSCHE_GUIDES_PARENT_PATH}` }, { name: item.name, url }]), buildArticle({ url, headline: item.name, description: item.metaDescription, datePublished: "2026-08-31", author: "DIGI-TEC Workshop", section: "Porsche Ownership Guides" })]) : void 0, hasArabicVersion: false });
  if (!item) return /* @__PURE__ */ jsx(Navigate, { to: PORSCHE_GUIDES_PARENT_PATH, replace: true });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_HUB_PATH, children: "Porsche" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_GUIDES_PARENT_PATH, children: "Guides" }),
        " / ",
        /* @__PURE__ */ jsx("span", { className: "text-white", children: item.name })
      ] }),
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("header", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Porsche ownership guide" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black sm:text-6xl", children: item.name }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 rounded-2xl border border-burnt-orange/25 bg-burnt-orange/10 p-6", children: /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold leading-relaxed", children: item.answer }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx(List, { title: "Factors that change the answer", items: item.factors }),
          /* @__PURE__ */ jsx(List, { title: "Practical next steps", items: item.actions }),
          /* @__PURE__ */ jsx(List, { title: "What to avoid", items: item.avoid, negative: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Continue with related Porsche information" }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-2", children: item.related.map((link) => /* @__PURE__ */ jsxs(LocalizedLink, { to: link.path, className: "card-premium group flex items-center justify-between rounded-xl p-5 font-bold group-hover:text-burnt-orange", children: [
          link.label,
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }, link.path)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PorscheOwnershipGuidePage as default
};
