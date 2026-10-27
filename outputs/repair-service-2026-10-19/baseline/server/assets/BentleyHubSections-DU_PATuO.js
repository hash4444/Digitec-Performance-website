import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { MapPin, CheckCircle2, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { L as LocalizedLink } from "../entry-server.js";
import { r as BENTLEY_WHATSAPP_HREF, s as BENTLEY_SERVICES, t as BENTLEY_HUB_PATH, u as BENTLEY_SECONDARY_SERVICES, v as BENTLEY_MODEL_GROUPS } from "./BrandPage-CFO-8NJW.js";
import { w as workshopLifts } from "./digitec-workshop-luxury-bays-BG9OSRaT.js";
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
const BentleyHubSections = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Independent Bentley service in Dubai" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Start with the exact Bentley and its history" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-relaxed text-gray-300", children: "Our Al Quoz workshop reviews the model, year, mileage, available service history and reported concern before confirming the appropriate assessment. This avoids applying the same maintenance, transmission, suspension or electrical procedure to every Bentley." }),
      /* @__PURE__ */ jsxs("a", { "data-cta-placement": "location_section", href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
        "Directions to the Al Quoz workshop"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "What to send before booking" }),
      /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: ["Bentley model and year", "Mileage and available service history", "Exact warning, symptom and when it occurs", "Preferred appointment time"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-gray-300", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
        item
      ] }, item)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", href: BENTLEY_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          "Book a Bentley inspection on WhatsApp"
        ] }),
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", href: "tel:+97143402223", className: "btn-secondary", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          "Call the Al Quoz workshop"
        ] })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-20", "aria-labelledby": "bentley-services", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Maintenance, diagnosis and repair" }),
    /* @__PURE__ */ jsx("h2", { id: "bentley-services", className: "text-3xl font-black sm:text-5xl", children: "Bentley workshop services in Dubai" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-relaxed text-gray-300", children: "Choose the service that matches your maintenance need or symptom. Review the inspection steps, model considerations and information needed for a useful estimate." }),
    /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: BENTLEY_SERVICES.map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${BENTLEY_HUB_PATH}/${service.slug}`, className: "card-premium group flex flex-col rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold group-hover:text-burnt-orange", children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "my-4 text-sm leading-relaxed text-gray-300", children: service.copy }),
      /* @__PURE__ */ jsxs("span", { className: "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        service.anchor,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, service.slug)) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-10 text-xl font-bold", children: "Further Bentley care" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: BENTLEY_SECONDARY_SERVICES.map((service) => /* @__PURE__ */ jsx(LocalizedLink, { to: `${BENTLEY_HUB_PATH}/${service.slug}`, className: "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-burnt-orange hover:text-burnt-orange", children: service.label }, service.slug)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col items-start justify-between gap-5 rounded-2xl border border-burnt-orange/25 bg-burnt-orange/5 p-6 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Not sure which inspection you need?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-gray-300", children: "Send the exact message or symptom. The workshop will confirm the appropriate first assessment and appointment availability." })
      ] }),
      /* @__PURE__ */ jsxs("a", { "data-cta-placement": "services_section", href: BENTLEY_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", className: "btn-primary shrink-0", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
        "Request a Bentley assessment"
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/40 to-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific assessment" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Bentley models require different service paths" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-relaxed text-gray-300", children: "Engine, transmission, suspension and electrical systems change across Bentley models and generations. The model year and fitted equipment determine the appropriate inspection and repair route." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: BENTLEY_MODEL_GROUPS.map((group) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: group.name }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-300", children: group.copy }),
      "guide" in group && /* @__PURE__ */ jsxs(LocalizedLink, { to: group.guide, className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        "Read the Continental GT guide ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, group.name)) })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-2xl border border-white/10", children: [
      /* @__PURE__ */ jsx("img", { src: workshopLifts, alt: "DIGI-TEC workshop bays in Al Quoz, Dubai", loading: "lazy", width: "1448", height: "1086", className: "aspect-[4/3] w-full object-cover" }),
      /* @__PURE__ */ jsx("figcaption", { className: "p-5 text-sm text-gray-300", children: "Service bays at the DIGI-TEC workshop in Al Quoz, Dubai." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Assessment, estimate and approval" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-4xl", children: "Bentley service cost follows the confirmed scope" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 leading-relaxed text-gray-300", children: "The model, year, mileage, history, due maintenance, test time, parts, fluids, labour and inspection findings affect an estimate. A responsible repair price or completion time may require an in-workshop assessment." }),
      /* @__PURE__ */ jsxs("ol", { className: "mt-6 space-y-5 text-gray-300", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "1. Identify:" }),
          " confirm the vehicle, fitted system and concern."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "2. Assess:" }),
          " combine compatible data with suitable physical testing."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "3. Quote:" }),
          " explain findings, proposed parts, scope and timing before approval."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "quote_section", href: BENTLEY_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          "Book a Bentley inspection"
        ] }),
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/blog/bentley-best-workshop-dubai", className: "btn-secondary", children: [
          "Compare workshops ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-10 sm:py-12", "aria-labelledby": "bentley-camera-electrical", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("h2", { id: "bentley-camera-electrical", className: "text-2xl font-bold sm:text-3xl", children: "Bentley camera and electrical enquiries" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4 text-base leading-8 text-gray-300", children: [
      "For a retrofit or a problem with an existing camera display, see ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: `${BENTLEY_HUB_PATH}/electrical-repair#reverse-camera`, className: "font-semibold text-burnt-orange hover:underline", children: "Bentley reverse-camera installation and diagnosis" }),
      ". The model year, display, fitted equipment and the result you want determine the compatible options and installation scope."
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4 text-base leading-8 text-gray-300", children: [
      "Battery drain, intermittent warnings and comfort-system faults need a separate ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: `${BENTLEY_HUB_PATH}/electrical-repair`, className: "font-semibold text-burnt-orange hover:underline", children: "Bentley electrical assessment" }),
      ". Our ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/auto-electrical-repair-dubai", className: "font-semibold text-burnt-orange hover:underline", children: "electrical diagnostic process" }),
      " explains how wiring, voltage and communication checks guide the repair."
    ] })
  ] }) })
] });
export {
  BentleyHubSections
};
