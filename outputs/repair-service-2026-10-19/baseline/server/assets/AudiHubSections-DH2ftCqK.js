import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { MapPin, CheckCircle2, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { L as LocalizedLink, aF as audiModelPages, aD as audiModelPath } from "../entry-server.js";
import { A as AUDI_WHATSAPP_HREF, o as AUDI_SERVICES, p as AUDI_HUB_PATH, q as AUDI_SECONDARY_SERVICES } from "./BrandPage-CFO-8NJW.js";
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
import "./Footer-D0Xl6ot8.js";
import "./accordion-DINZxoib.js";
import "@radix-ui/react-accordion";
import "zod";
import "./GoogleReviews-CcWxYJRB.js";
import "./Reveal-B0bzMO-v.js";
import "./TrustBar-D6jkMLGQ.js";
import "./ar-brands-DYbuhqMi.js";
import "./ar-services-CclXnKHT.js";
import "./porsche-workshop-dubai-BV044Qn8.js";
import "./astonMartinHubContent-LMYRY7RB.js";
const priorityModels = ["a4", "a6", "q5", "q7", "q8", "rs3", "rs6", "r8"];
const AudiHubSections = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Independent Audi service in Dubai" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Start with the vehicle and the symptom" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl leading-8 text-gray-300", children: "Audi systems vary by generation, engine, gearbox, quattro layout and option package. DIGI-TEC checks the model, year, mileage, history and concern before confirming the relevant diagnostic access, parts and workshop scope." }),
      /* @__PURE__ */ jsxs("a", { "data-cta-placement": "location_section", href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "mt-5 inline-flex items-center gap-2 font-semibold text-burnt-orange", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
        "Directions to the Al Quoz workshop"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "What to send before booking" }),
      /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: ["Audi model and year", "Mileage and available service history", "Exact warning, symptom and when it occurs", "Preferred appointment time"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-gray-300", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
        item
      ] }, item)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", href: AUDI_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          "Book an Audi inspection on WhatsApp"
        ] }),
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", href: "tel:+97143402223", className: "btn-secondary", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          "Call the Al Quoz workshop"
        ] })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-20", "aria-labelledby": "audi-services", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Maintenance, diagnosis and repair" }),
    /* @__PURE__ */ jsx("h2", { id: "audi-services", className: "text-3xl font-black sm:text-5xl", children: "Audi service areas" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl leading-8 text-gray-300", children: "This hub owns broad Audi service, repair, workshop and specialist intent. Choose the focused page for the specific work or symptom, so each commercial service keeps a clear search purpose." }),
    /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: AUDI_SERVICES.map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${AUDI_HUB_PATH}/${service.slug}`, className: "card-premium group flex flex-col rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold group-hover:text-burnt-orange", children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "my-4 text-sm leading-7 text-gray-300", children: service.copy }),
      /* @__PURE__ */ jsxs("span", { className: "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        service.anchor,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, service.slug)) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-10 text-xl font-bold", children: "Other existing Audi service pages" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: AUDI_SECONDARY_SERVICES.map((service) => /* @__PURE__ */ jsx(LocalizedLink, { to: `${AUDI_HUB_PATH}/${service.slug}`, className: "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-burnt-orange hover:text-burnt-orange", children: service.label }, service.slug)) })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/40 to-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific guidance" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Audi models with their own service information" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl leading-8 text-gray-300", children: "Use model pages when the generation, engine, transmission, quattro system or suspension configuration changes the inspection conversation. Every model page links back here for broad Audi service and repair enquiries." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: audiModelPages.filter((model) => priorityModels.includes(model.slug)).map((model) => /* @__PURE__ */ jsxs(LocalizedLink, { to: audiModelPath(model), className: "card-premium group rounded-2xl p-5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-burnt-orange", children: model.series }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-black group-hover:text-burnt-orange", children: model.name }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/55", children: "Service, repair, diagnostics and common concerns." }),
      /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
        "View ",
        model.name,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, model.slug)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 card-premium rounded-2xl p-6 sm:p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Inspection, estimate and approval" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "A clear repair process before work begins" }),
      /* @__PURE__ */ jsxs("ol", { className: "mt-5 grid gap-4 text-gray-300 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "1. Identify:" }),
          " confirm the vehicle, systems, history and concern."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "2. Assess:" }),
          " use appropriate diagnostic and physical checks."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "3. Agree:" }),
          " explain findings, parts and scope before approval."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/best-audi-workshop-dubai", className: "inline-flex items-center gap-2 font-semibold text-burnt-orange", children: [
          "How to choose an Audi workshop",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/blog/audi-maintenance-guide-dubai", className: "inline-flex items-center gap-2 font-semibold text-burnt-orange", children: [
          "Read the Audi maintenance guide",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] }) })
] });
export {
  AudiHubSections
};
