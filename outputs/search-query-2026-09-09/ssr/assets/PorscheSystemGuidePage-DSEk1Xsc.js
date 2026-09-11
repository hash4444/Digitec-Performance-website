import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { aQ as getPorscheSystemGuide, S as SITE_URL, aO as PORSCHE_SYSTEMS_PATH, e as useSeo, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, an as PORSCHE_HUB_PATH, aj as buildArticle, aP as porscheSystemGuides, H as Header, L as LocalizedLink, f as Footer } from "../entry-server.js";
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
const List = ({ title, items }) => /* @__PURE__ */ jsxs("section", { className: "card-premium rounded-2xl p-6", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: title }),
  /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/65", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
    item
  ] }, item)) })
] });
const PorscheSystemGuidePage = () => {
  const { slug } = useParams();
  const guide = slug ? getPorscheSystemGuide(slug) : void 0;
  const url = `${SITE_URL}${PORSCHE_SYSTEMS_PATH}/${(guide == null ? void 0 : guide.slug) ?? ""}`;
  useSeo({ title: (guide == null ? void 0 : guide.metaTitle) ?? "Porsche Systems | Digi-Tec", description: (guide == null ? void 0 : guide.metaDescription) ?? "Porsche system guide.", canonical: guide ? url : `${SITE_URL}${PORSCHE_SYSTEMS_PATH}`, noindex: !guide, jsonLd: guide ? pageGraph([buildWebPage({ url, name: guide.name, description: guide.metaDescription, type: "ItemPage", breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#article` }), buildBreadcrumb(url, [{ name: "Home", url: SITE_URL }, { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` }, { name: "Systems", url: `${SITE_URL}${PORSCHE_SYSTEMS_PATH}` }, { name: guide.name, url }]), buildArticle({ url, headline: guide.metaTitle.split("|")[0].trim(), description: guide.metaDescription, datePublished: "2026-08-31", author: "DIGI-TEC Workshop", section: "Porsche Systems" })]) : void 0, hasArabicVersion: false });
  if (!guide) return /* @__PURE__ */ jsx(Navigate, { to: PORSCHE_SYSTEMS_PATH, replace: true });
  const related = porscheSystemGuides.filter((item) => item.slug !== guide.slug).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_HUB_PATH, children: "Porsche" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_SYSTEMS_PATH, children: "Systems" }),
        " / ",
        /* @__PURE__ */ jsx("span", { className: "text-white", children: guide.name })
      ] }),
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("header", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Porsche system guide" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-black sm:text-6xl", children: [
            guide.name,
            " Explained"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-white/70", children: guide.intro })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsx(List, { title: "What the system does", items: guide.purpose }),
          /* @__PURE__ */ jsx(List, { title: "Models and applications", items: guide.applications }),
          /* @__PURE__ */ jsx(List, { title: "Normal characteristics", items: guide.normal }),
          /* @__PURE__ */ jsx(List, { title: "Warning signs", items: guide.warnings }),
          /* @__PURE__ */ jsx(List, { title: "Diagnostic considerations", items: guide.diagnosis }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-burnt-orange/25 bg-burnt-orange/10 p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: "When inspection is needed" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/65", children: "A warning or symptom does not identify the failed part. DIGI-TEC confirms compatible access and the appropriate initial test for the exact vehicle." }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: guide.servicePath, className: "mt-5 inline-flex items-center gap-1 font-semibold text-burnt-orange", children: [
              guide.serviceLabel,
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Relevant Porsche models" }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-3", children: guide.modelLinks.map((item) => /* @__PURE__ */ jsx(LocalizedLink, { to: item.path, className: "btn-secondary", children: item.label }, item.path)) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-10 text-2xl font-black", children: "Related systems" }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: related.map((item) => /* @__PURE__ */ jsx(LocalizedLink, { to: `${PORSCHE_SYSTEMS_PATH}/${item.slug}`, className: "card-premium group rounded-xl p-5 font-bold group-hover:text-burnt-orange", children: item.name }, item.slug)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PorscheSystemGuidePage as default
};
