import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { L as LocalizedLink } from "../entry-server.js";
import { w as ROX_CORE_SERVICES } from "./BrandPage-CFO-8NJW.js";
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
const RoxHubSections = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("section", { className: "brand-section border-t border-white/5 bg-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "brand-section-heading mb-10 text-center sm:mb-14", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "ROX 01 service support in Al Quoz" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl lg:text-5xl", children: [
        "Start with the ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "right ROX 01 concern" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base", children: "Each focused page covers one commercial service intent. This hub remains the place for broader ROX 01 service, repair and workshop enquiries." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: ROX_CORE_SERVICES.map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: service.path, className: "card-premium group rounded-2xl p-6 sm:p-7", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white transition-colors group-hover:text-burnt-orange sm:text-xl", children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-400", children: service.description }),
      /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
        "Explore this ROX 01 service ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, service.path)) })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "brand-section border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Before you book" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: "What to send for a ROX 01 inspection" }),
      /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3 text-sm leading-relaxed text-gray-300 sm:text-base", children: ["Model year and mileage", "Warning message, symptom or service request", "Whether the concern affects driving, charging, cooling or a comfort feature", "Preferred appointment time"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" }),
        item
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-premium flex flex-col justify-center rounded-2xl p-6 sm:p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Vehicle-specific scope" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Book a ROX 01 inspection" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-gray-400", children: "Send the basics first so the Al Quoz workshop can prepare for the right inspection. Diagnostic access, parts and final repair scope are confirmed from the vehicle." }),
      /* @__PURE__ */ jsxs("a", { href: "https://wa.me/97143402223?text=Hi%20Digi-Tec%2C%20I%20would%20like%20to%20book%20a%20ROX%2001%20inspection.%0A%0AModel%20year%20and%20mileage%3A%20%0AWarning%20or%20symptom%3A%20%0APreferred%20appointment%20time%3A%20", target: "_blank", rel: "noopener noreferrer", className: "btn-primary mt-6", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
        "Book on WhatsApp"
      ] }),
      /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", className: "mt-4 text-sm font-semibold text-burnt-orange hover:text-off-white", children: "Call the Al Quoz workshop" })
    ] })
  ] }) })
] });
export {
  RoxHubSections
};
