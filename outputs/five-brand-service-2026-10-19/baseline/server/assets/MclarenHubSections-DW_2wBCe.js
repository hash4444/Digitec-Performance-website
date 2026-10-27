import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { MapPin, CheckCircle2, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { L as LocalizedLink } from "../entry-server.js";
import { M as MCLAREN_WHATSAPP_HREF, d as MCLAREN_SERVICES, e as MCLAREN_HUB_PATH, f as MCLAREN_SECONDARY_SERVICES, g as MCLAREN_MODEL_GROUPS } from "./BrandPage-j3Vp_AUl.js";
import { w as workshopLifts } from "./digitec-workshop-lifts-DkXx2c5B.js";
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
import "./ar-brands-CBVflR7-.js";
import "./ar-services-CclXnKHT.js";
import "./porsche-workshop-dubai-BV044Qn8.js";
import "./astonMartinHubContent-LMYRY7RB.js";
const MclarenHubSections = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Independent McLaren servicing in Dubai" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Start with the vehicle and the concern" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-relaxed text-gray-300", children: "Our Al Quoz workshop reviews the model, VIN, history and symptoms before confirming diagnostic access, parts or repair scope. This matters across conventional V8 and Artura hybrid platforms, and across different transmission and suspension systems." }),
      /* @__PURE__ */ jsxs("a", { "data-cta-placement": "location_section", href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
        " Directions to the Al Quoz workshop"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "What to send" }),
      /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: ["McLaren model and year", "Mileage and available service history", "Exact warning, symptom and when it occurs", "Preferred appointment time"].map((x) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-gray-300", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
        x
      ] }, x)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", className: "btn-primary", href: MCLAREN_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          " Request a McLaren assessment"
        ] }),
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", className: "btn-secondary", href: "tel:+97143402223", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          " Call the workshop"
        ] })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-20", "aria-labelledby": "mclaren-services", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Service, diagnosis and repair" }),
    /* @__PURE__ */ jsx("h2", { id: "mclaren-services", className: "text-3xl font-black sm:text-5xl", children: "McLaren workshop services in Dubai" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-relaxed text-gray-300", children: "Choose the page that matches the work or symptom. This hub covers broad McLaren service, repair, maintenance and independent-workshop intent; the existing service pages provide the detailed assessment path." }),
    /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: MCLAREN_SERVICES.map((s) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${MCLAREN_HUB_PATH}/${s.slug}`, className: "card-premium group flex flex-col rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold group-hover:text-burnt-orange", children: s.title }),
      /* @__PURE__ */ jsx("p", { className: "my-4 text-sm leading-relaxed text-gray-300", children: s.copy }),
      /* @__PURE__ */ jsxs("span", { className: "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        s.anchor,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, s.slug)) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-10 text-xl font-bold", children: "Other existing McLaren service pages" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: MCLAREN_SECONDARY_SERVICES.map((s) => /* @__PURE__ */ jsx(LocalizedLink, { to: `${MCLAREN_HUB_PATH}/${s.slug}`, className: "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-burnt-orange hover:text-burnt-orange", children: s.label }, s.slug)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col items-start justify-between gap-5 rounded-2xl border border-burnt-orange/25 bg-burnt-orange/5 p-6 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Not sure which service matches the warning?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-gray-300", children: "Send the exact warning or symptom. The message requests an assessment; the workshop will confirm the suitable first step and appointment availability." })
      ] }),
      /* @__PURE__ */ jsxs("a", { "data-cta-placement": "services_section", className: "btn-primary shrink-0", href: MCLAREN_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
        " Ask about McLaren diagnostics"
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/40 to-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Confirmed service scope first" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "McLaren models owners can ask us about" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-relaxed text-gray-300", children: "Share the exact model and year so the team can identify the fitted systems and suitable first assessment. Engine, transmission, suspension and diagnostic requirements vary across McLaren generations." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: MCLAREN_MODEL_GROUPS.map((group) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.18em] text-burnt-orange", children: group.name }),
      /* @__PURE__ */ jsx("h3", { className: "mt-3 text-lg font-bold", children: group.models }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-300", children: group.copy })
    ] }, group.name)) })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-2xl border border-white/10", children: [
      /* @__PURE__ */ jsx("img", { src: workshopLifts, alt: "DIGI-TEC service bays and vehicle lifts at the Al Quoz workshop in Dubai", loading: "lazy", width: "1086", height: "1448", className: "aspect-[4/3] w-full object-cover" }),
      /* @__PURE__ */ jsx("figcaption", { className: "p-5 text-sm text-gray-300", children: "The DIGI-TEC workshop floor in Al Quoz. This is genuine workshop context and is not presented as a McLaren repair case study." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Assessment, estimate and approval" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-4xl", children: "McLaren service costs depend on the vehicle and findings" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 leading-relaxed text-gray-300", children: "Model, year, mileage, history, requested work, diagnostic time, parts, fluids and inspection findings can all affect the estimate. A repair price or completion time cannot be confirmed responsibly before the required assessment." }),
      /* @__PURE__ */ jsxs("ol", { className: "mt-6 space-y-5 text-gray-300", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "1. Identify:" }),
          " confirm the vehicle, fitted system and reported concern."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "2. Assess:" }),
          " combine available diagnostic data with appropriate physical testing."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "3. Quote:" }),
          " explain findings, proposed parts, workshop scope and timing before owner approval."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "quote_section", className: "btn-primary", href: MCLAREN_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          " Request a McLaren service quote"
        ] }),
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/blog/mclaren-best-workshop-dubai", className: "btn-secondary", children: [
          "Compare a McLaren workshop ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] }) })
] });
export {
  MclarenHubSections
};
