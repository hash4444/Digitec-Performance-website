import { jsxs, jsx } from "react/jsx-runtime";
import { CheckCircle2, ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { L as LocalizedLink } from "../entry-server.js";
import { b as bmwServicePath, B as BMW_CORE_SERVICES, a as BMW_ADDITIONAL_SERVICES, c as BMW_WHATSAPP_HREF } from "./BrandPage-CFO-8NJW.js";
import { w as workshopServiceFloor } from "./digitec-workshop-service-floor-BbSs2ssb.js";
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
const BmwBookingActions = () => /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-wrap gap-3 sm:flex-row", children: [
  /* @__PURE__ */ jsxs("a", { href: BMW_WHATSAPP_HREF, "data-cta-placement": "booking_section", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
    /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5 shrink-0" }),
    " Request BMW Service"
  ] }),
  /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "booking_section", className: "btn-secondary", children: [
    /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 shrink-0" }),
    " Call the Al Quoz workshop"
  ] })
] });
const BmwBookingChecklist = () => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [
  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "What to send before booking" }),
  /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-base text-gray-300", children: ["BMW model and year", "Current mileage", "Warning lights, symptoms and when they occur", "Preferred appointment day and time"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
    /* @__PURE__ */ jsx("span", { children: item })
  ] }, item)) }),
  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-gray-400", children: "The team may ask for the VIN to confirm fitted systems and the appropriate inspection." })
] });
const BmwCoreServices = () => /* @__PURE__ */ jsx("section", { id: "bmw-services", className: "brand-section brand-section--services scroll-mt-24 border-t border-white/5 bg-black py-12 sm:py-20", "aria-labelledby": "bmw-services-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
  /* @__PURE__ */ jsxs("div", { className: "brand-section-heading mb-10 max-w-3xl", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Maintenance, repairs and diagnosis" }),
    /* @__PURE__ */ jsx("h2", { id: "bmw-services-heading", className: "text-3xl font-black sm:text-5xl", children: "BMW service in Dubai, from routine care to fault finding" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-relaxed text-gray-300", children: "Choose the concern you need help with. Each service page explains the inspection and repair options in more detail, with scope confirmed for your BMW." })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "mb-8 grid gap-5 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Service due or history incomplete?" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-base leading-relaxed text-gray-300", children: [
        "Bring the Condition Based Service information and any available invoices. Our ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: bmwServicePath("oil-change"), className: "font-semibold text-burnt-orange hover:underline", children: "BMW oil service and maintenance checks" }),
        " help establish what is due for the engine, mileage and history before agreeing the work."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Battery warning or slow starting?" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-base leading-relaxed text-gray-300", children: [
        "Start with ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: bmwServicePath("battery-replacement"), className: "font-semibold text-burnt-orange hover:underline", children: "BMW battery and charging checks" }),
        ". Repeated discharge may need ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/auto-electrical-repair-dubai", className: "font-semibold text-burnt-orange hover:underline", children: "electrical fault tracing" }),
        "; fitting a battery alone may leave the cause unresolved."
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "brand-services-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: BMW_CORE_SERVICES.map((service) => /* @__PURE__ */ jsxs("article", { className: "card-premium flex flex-col rounded-2xl p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: service.title }),
    /* @__PURE__ */ jsx("p", { className: "mb-5 mt-3 text-base leading-relaxed text-gray-300", children: service.description }),
    /* @__PURE__ */ jsxs(LocalizedLink, { to: bmwServicePath(service.slug), className: "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline", children: [
      service.label,
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
    ] })
  ] }, service.slug)) }),
  /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border border-white/10 p-6 sm:p-8", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-bold", children: "Need help choosing the right inspection?" }),
    /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-3xl text-base leading-relaxed text-gray-300", children: "Describe the service due, warning or symptom on WhatsApp. The workshop will confirm the next step and appointment availability." }),
    /* @__PURE__ */ jsx(BmwBookingActions, {})
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t border-white/10 pt-8", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Bodywork and other BMW repairs" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-3 max-w-3xl text-base leading-relaxed text-gray-300", children: [
      BMW_ADDITIONAL_SERVICES[0].description,
      " You can also ask about steering, exhaust, fuel-system or tyre concerns."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-x-6 gap-y-3", children: BMW_ADDITIONAL_SERVICES.map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: bmwServicePath(service.slug), className: "inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline", children: [
      service.label,
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
    ] }, service.slug)) })
  ] })
] }) });
const BmwWorkshopProof = () => /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--proof border-t border-white/5 bg-black py-12 sm:py-20", "aria-labelledby": "bmw-workshop-heading", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12", children: [
  /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]", children: [
    /* @__PURE__ */ jsx("img", { src: workshopServiceFloor, alt: "BMW sedan alongside other customer vehicles on the DIGI-TEC service floor in Al Quoz, Dubai", loading: "lazy", width: "1086", height: "1448", className: "aspect-[4/3] w-full object-cover object-[center_68%]" }),
    /* @__PURE__ */ jsxs("figcaption", { className: "p-5 text-sm leading-relaxed text-gray-300", children: [
      "A BMW on the DIGI-TEC service floor in Al Quoz. This workshop photograph is also featured in our ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/about", className: "font-semibold text-burnt-orange hover:underline", children: "workshop overview" }),
      "."
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "An independent Dubai workshop since 2002" }),
    /* @__PURE__ */ jsx("h2", { id: "bmw-workshop-heading", className: "text-3xl font-black sm:text-4xl", children: "Your BMW workshop in Al Quoz" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-relaxed text-gray-300", children: "Looking for an independent BMW service centre in Dubai? DIGI-TEC provides a workshop appointment where you can discuss the concern, review the findings and agree the next step with the team." }),
    /* @__PURE__ */ jsxs("ol", { className: "mt-6 space-y-5 text-base leading-relaxed text-gray-300", children: [
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-off-white", children: "1. Identify the vehicle and concern" }),
        /* @__PURE__ */ jsx("p", { children: "Model, year, mileage, VIN and service history guide the diagnostic route and any required access checks." })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-off-white", children: "2. Inspect and explain the findings" }),
        /* @__PURE__ */ jsx("p", { children: "The reported symptom is checked against diagnostic evidence and physical testing before a repair is recommended." })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-off-white", children: "3. Agree the work and parts" }),
        /* @__PURE__ */ jsx("p", { children: "Discuss proposed parts, fluids, scope and timing before authorising repairs. Genuine BMW, OE-supplier or suitable customer-approved options depend on the job and availability." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline", children: [
      /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
      " Directions to Al Quoz Industrial Area 3"
    ] })
  ] })
] }) });
export {
  BmwBookingActions,
  BmwBookingChecklist,
  BmwCoreServices,
  BmwWorkshopProof
};
