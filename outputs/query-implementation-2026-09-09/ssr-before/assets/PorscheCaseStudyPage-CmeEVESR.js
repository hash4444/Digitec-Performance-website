import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { aX as getPorscheCaseStudy, S as SITE_URL, e as useSeo, ao as PORSCHE_HUB_PATH, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, aj as buildArticle, H as Header, L as LocalizedLink, f as Footer } from "../entry-server.js";
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
const Section = ({ title, items }) => /* @__PURE__ */ jsxs("section", { className: "card-premium rounded-2xl p-6", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: title }),
  /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/65", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
    item
  ] }, item)) })
] });
const PorscheCaseStudyPage = () => {
  var _a;
  const { slug } = useParams();
  const item = slug ? getPorscheCaseStudy(slug) : void 0;
  const url = `${SITE_URL}/porsche/case-studies/${(item == null ? void 0 : item.slug) ?? ""}`;
  useSeo({ title: (item == null ? void 0 : item.metaTitle) ?? "Porsche Workshop Cases | Digi-Tec", description: (item == null ? void 0 : item.metaDescription) ?? "Verified Porsche workshop case studies.", canonical: item ? url : `${SITE_URL}${PORSCHE_HUB_PATH}`, noindex: !item, jsonLd: item ? pageGraph([buildWebPage({ url, name: item.title, description: item.metaDescription, type: "ItemPage", breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#article` }), buildBreadcrumb(url, [{ name: "Home", url: SITE_URL }, { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` }, { name: "Workshop Cases", url: `${SITE_URL}${PORSCHE_HUB_PATH}#porsche-cases-title` }, { name: item.title, url }]), buildArticle({ url, headline: item.title, description: item.metaDescription, datePublished: item.datePublished, author: "DIGI-TEC Workshop", image: (_a = item.workshopImages[0]) == null ? void 0 : _a.src, section: "Porsche Workshop Case Studies" })]) : void 0, hasArabicVersion: false });
  if (!item) return /* @__PURE__ */ jsx(Navigate, { to: `${PORSCHE_HUB_PATH}#porsche-cases-title`, replace: true });
  const facts = [item.modelYear && `Model year: ${item.modelYear}`, item.generation && `Generation: ${item.generation}`, item.engine && `Engine: ${item.engine}`, item.transmission && `Transmission: ${item.transmission}`, item.mileage && `Mileage: ${item.mileage}`].filter(Boolean);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("header", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Verified DIGI-TEC workshop case" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black sm:text-6xl", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-white/65", children: item.vehicle }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: facts.map((fact) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/10 px-3 py-2 text-sm", children: fact }, fact)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Section, { title: "Customer complaint and symptoms", items: [item.customerComplaint, ...item.symptoms] }),
          /* @__PURE__ */ jsx(Section, { title: "Initial inspection", items: item.initialInspection }),
          /* @__PURE__ */ jsx(Section, { title: "Diagnostic process", items: item.diagnosticProcess }),
          /* @__PURE__ */ jsx(Section, { title: "Fault identified", items: [item.faultIdentified] }),
          /* @__PURE__ */ jsx(Section, { title: "Repair performed", items: item.repairPerformed }),
          /* @__PURE__ */ jsx(Section, { title: "Components repaired or replaced", items: item.components }),
          /* @__PURE__ */ jsx(Section, { title: "Testing after repair", items: item.testing }),
          /* @__PURE__ */ jsx(Section, { title: "Result", items: [item.result] })
        ] }),
        item.workshopImages.length ? /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-14 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black", children: "Workshop images" }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-5 md:grid-cols-2", children: item.workshopImages.map((image) => /* @__PURE__ */ jsxs("figure", { children: [
            /* @__PURE__ */ jsx("img", { src: image.src, alt: image.alt, className: "rounded-2xl" }),
            /* @__PURE__ */ jsx("figcaption", { className: "mt-2 text-sm text-white/50", children: image.caption })
          ] }, image.src)) })
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Related Porsche information" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: item.relatedModel.path, children: item.relatedModel.label }),
          item.relatedSystem ? /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: item.relatedSystem.path, children: item.relatedSystem.label }) : null,
          item.relatedProblem ? /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: item.relatedProblem.path, children: item.relatedProblem.label }) : null,
          /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: item.relatedService.path, children: item.relatedService.label })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PorscheCaseStudyPage as default
};
