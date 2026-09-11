import { jsxs, jsx } from "react/jsx-runtime";
import { Cog, ArrowRight } from "lucide-react";
import { e as useSeo, S as SITE_URL, aO as PORSCHE_SYSTEMS_PATH, p as pageGraph, aP as porscheSystemGuides, b as buildWebPage, a as buildBreadcrumb, H as Header, L as LocalizedLink, an as PORSCHE_HUB_PATH, f as Footer } from "../entry-server.js";
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
const PorscheSystemsIndex = () => {
  const url = `${SITE_URL}${PORSCHE_SYSTEMS_PATH}`;
  useSeo({ title: "Porsche Systems Explained | Digi-Tec Dubai", description: "Understand Porsche PDK, Tiptronic, PASM, PDCC, PCCB, air suspension, Sport Chrono, rear-axle steering and PTM systems.", canonical: url, jsonLd: pageGraph([buildWebPage({ url, type: "CollectionPage", mainEntityId: `${url}#sitemap-list`, name: "Porsche Systems Explained", description: "Technical Porsche system guides for owners.", breadcrumbId: `${url}#breadcrumb` }), buildBreadcrumb(url, [{ name: "Home", url: SITE_URL }, { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` }, { name: "Systems", url }]), { "@type": "ItemList", "@id": `${url}#sitemap-list`, name: "Porsche system guides", numberOfItems: porscheSystemGuides.length, itemListElement: porscheSystemGuides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.name, item: `${SITE_URL}${PORSCHE_SYSTEMS_PATH}/${g.slug}` })) }]), hasArabicVersion: false });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
        " / ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_HUB_PATH, children: "Porsche" }),
        " / ",
        /* @__PURE__ */ jsx("span", { className: "text-white", children: "Systems" })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx(Cog, { className: "h-9 w-9 text-burnt-orange" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-5 text-4xl font-black sm:text-6xl", children: "Porsche Systems Explained" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-lg leading-relaxed text-white/65", children: "Technical, owner-readable guides that separate normal system behaviour from warning signs and connect education to the appropriate diagnostic service." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: porscheSystemGuides.map((guide) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${PORSCHE_SYSTEMS_PATH}/${guide.slug}`, className: "card-premium group rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black group-hover:text-burnt-orange", children: guide.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: guide.intro }),
          /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "Read guide ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, guide.slug)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PorscheSystemsIndex as default
};
