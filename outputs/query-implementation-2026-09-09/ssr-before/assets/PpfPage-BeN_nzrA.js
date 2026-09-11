import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, ChevronRight, Phone, ArrowRight, Check, MapPin } from "lucide-react";
import { Z as ppfCoverage, t as trackWhatsAppClick, e as useSeo, H as Header, L as LocalizedLink, _ as ppfFaqs, f as Footer, $ as PPF_WHATSAPP, S as SITE_URL, a0 as PPF_PATH, a1 as PPF_DESCRIPTION, a2 as PPF_TITLE, a3 as ppfBrandNames, r as brands, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, c as buildService, a4 as PPF_H1 } from "../entry-server.js";
import { f as formatVerifiedStartingPrice, P as ProtectionProjects } from "./verified-pricing-CGXp-YYp.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-z72M2dx1.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-accordion";
import "@radix-ui/react-select";
function PpfQuoteForm() {
  const [values, setValues] = useState({ brand: "", model: "", year: "", coverage: "Full Body" });
  const [error, setError] = useState("");
  const started = useRef(false);
  const submitting = useRef(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const resetSubmission = () => {
      submitting.current = false;
    };
    window.addEventListener("pageshow", resetSubmission);
    return () => window.removeEventListener("pageshow", resetSubmission);
  }, []);
  const track = (event) => {
    var _a;
    return (_a = window.gtag) == null ? void 0 : _a.call(window, "event", event, {
      page_path: window.location.pathname,
      form_id: "ppf-quote-form",
      cta_placement: "ppf_quote",
      service: "ppf"
    });
  };
  const update = (key, value) => {
    if (!started.current) {
      started.current = true;
      track("quote_started");
    }
    submitting.current = false;
    setValues((current) => ({ ...current, [key]: value }));
    setError("");
  };
  const submit = (event) => {
    event.preventDefault();
    if (!values.brand.trim() || !values.model.trim()) {
      setError("Please enter your vehicle brand and model.");
      return;
    }
    if (submitting.current) return;
    submitting.current = true;
    const message = `PPF quote request from digitecme.com
Vehicle brand: ${values.brand.trim()}
Model: ${values.model.trim()}
Year: ${values.year}
Requested coverage: ${values.coverage}
Please confirm panel coverage, film options, preparation, price and installation time.`;
    const url2 = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
    trackWhatsAppClick(url2);
    track("whatsapp_draft_opened");
    window.location.assign(url2);
  };
  return /* @__PURE__ */ jsxs("form", { id: "ppf-quote-form", className: "ppf-form", onSubmit: submit, "aria-describedby": "ppf-privacy", children: [
    /* @__PURE__ */ jsxs("div", { className: "ppf-form-grid", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "ppf-brand", children: "Vehicle brand" }),
        /* @__PURE__ */ jsx("input", { id: "ppf-brand", name: "vehicle_brand", required: true, maxLength: 60, value: values.brand, onChange: (e) => update("brand", e.target.value), placeholder: "e.g. Porsche", autoComplete: "off" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "ppf-model", children: "Vehicle model" }),
        /* @__PURE__ */ jsx("input", { id: "ppf-model", name: "vehicle_model", required: true, maxLength: 80, value: values.model, onChange: (e) => update("model", e.target.value), placeholder: "e.g. 911 Carrera", autoComplete: "off" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "ppf-year", children: "Year" }),
        /* @__PURE__ */ jsx("input", { id: "ppf-year", name: "vehicle_year", type: "number", inputMode: "numeric", required: true, min: 1900, max: (/* @__PURE__ */ new Date()).getFullYear() + 1, step: 1, value: values.year, onChange: (e) => update("year", e.target.value), placeholder: "e.g. 2025" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { id: "ppf-coverage-label", htmlFor: "ppf-requested-coverage", children: "Requested coverage" }),
        /* @__PURE__ */ jsxs(Select, { value: values.coverage, onValueChange: (value) => update("coverage", value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { id: "ppf-requested-coverage", "aria-labelledby": "ppf-coverage-label", className: "ppf-select", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: ppfCoverage.map(({ name }) => /* @__PURE__ */ jsx(SelectItem, { value: name, children: name }, name)) })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("p", { role: "alert", children: error }),
    /* @__PURE__ */ jsxs("button", { type: "submit", disabled: !ready, className: "ppf-button ppf-button-primary", children: [
      /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
      "Continue to WhatsApp"
    ] }),
    /* @__PURE__ */ jsxs("p", { id: "ppf-privacy", className: "ppf-small", children: [
      "Opens a WhatsApp draft with these vehicle details. Review and send it to request your quote. No name or phone number is needed here. ",
      /* @__PURE__ */ jsx("a", { href: "/privacy-policy.pdf", target: "_blank", rel: "noopener noreferrer", children: "Privacy policy" })
    ] }),
    /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("p", { children: "Please use the WhatsApp or call links on this page to request your quote." }) })
  ] });
}
const url = `${SITE_URL}${PPF_PATH}`;
const heroImage = "/images/ppf/film-application-1200.webp";
const heroAlt = "Transparent film being smoothed over a white Porsche bonnet";
const ppfBrands = ppfBrandNames.map((name) => brands.find((brand) => brand.name === name)).filter(Boolean);
const graph = pageGraph([
  buildWebPage({ url, name: PPF_TITLE, description: PPF_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, primaryImage: heroImage, mainEntityId: `${url}#service`, dateModified: "2026-09-08" }),
  buildBreadcrumb(url, [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Paint Protection Film", url }]),
  buildService({ url, name: PPF_H1, serviceType: "Paint Protection Film (PPF) installation", description: "DIGI-TEC Performance Center offers paint protection film installation with full-body and selected-panel coverage at Al Quoz Industrial Area 3, Dubai. Film, preparation and covered panels are confirmed in the quotation.", image: heroImage })
]);
function WhatsApp({ children = "Get Your PPF Quote", placement }) {
  return /* @__PURE__ */ jsxs("a", { href: PPF_WHATSAPP, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": `ppf_${placement}`, className: "ppf-button ppf-button-primary", children: [
    /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
    children
  ] });
}
const process = [
  ["Assess the paint", "Discuss your car, existing paint condition and the areas you want to protect. Previous repairs or paint defects may affect preparation and suitability."],
  ["Agree the scope", "Confirm the chosen film, covered panels, preparation, cutting method and edge treatment in the quotation before work begins."],
  ["Prepare and install", "The paint preparation and film installation method follow the agreed scope for your vehicle and selected product. Any correction work is assessed separately."],
  ["Review the finish and care", "Review the optical finish, coverage and film edges with the team. Ask for product-specific washing, maintenance and warranty information at handover."]
];
function PpfPage() {
  const { hash } = useLocation();
  useEffect(() => {
    var _a;
    if (hash) (_a = document.getElementById(hash.slice(1))) == null ? void 0 : _a.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash]);
  useSeo({ title: PPF_TITLE, description: PPF_DESCRIPTION, canonical: url, ogImage: `${SITE_URL}${heroImage}`, ogImageAlt: heroAlt, ogImageWidth: 1200, ogImageHeight: 1200, jsonLd: graph });
  return /* @__PURE__ */ jsxs("div", { className: "ppf-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { id: "ppf-main", children: [
      /* @__PURE__ */ jsxs("section", { className: "ppf-hero theme-dark-section", "aria-labelledby": "ppf-heading", children: [
        /* @__PURE__ */ jsxs("div", { className: "ppf-hero-copy", children: [
          /* @__PURE__ */ jsxs("nav", { className: "ppf-breadcrumb", "aria-label": "Breadcrumb", children: [
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "Services" }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { "aria-current": "page", children: "Paint Protection Film" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "DIGI-TEC Performance Center · Al Quoz, Dubai" }),
          /* @__PURE__ */ jsxs("h1", { id: "ppf-heading", children: [
            "Paint Protection Film ",
            /* @__PURE__ */ jsx("span", { children: "(PPF) Dubai" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ppf-lead", children: "Preserve the paint. Enjoy the drive." }),
          /* @__PURE__ */ jsx("p", { children: "PPF installation for luxury and performance cars at DIGI-TEC in Al Quoz, Dubai. Explore full-body and selected-panel coverage." }),
          /* @__PURE__ */ jsxs("div", { className: "ppf-actions", children: [
            /* @__PURE__ */ jsx(WhatsApp, { placement: "hero" }),
            /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "ppf_hero", className: "ppf-button ppf-button-secondary", children: [
              /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
              "Call the workshop"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("a", { className: "ppf-text-link", href: "#ppf-quote", children: [
            "Have your car details ready? Build your quote request ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("figure", { className: "ppf-hero-image", children: [
          /* @__PURE__ */ jsx("img", { src: heroImage, srcSet: "/images/ppf/film-application-640.webp 640w, /images/ppf/film-application-1200.webp 1200w", sizes: "(min-width: 1000px) 50vw, 100vw", width: 1200, height: 1200, alt: heroAlt, fetchPriority: "high" }),
          /* @__PURE__ */ jsx("figcaption", { children: "Film application detail" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ppf-proof", "aria-label": "Workshop and service facts", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Al Quoz Industrial Area 3" }),
          /* @__PURE__ */ jsx("span", { children: "Dubai workshop" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Luxury & performance vehicles" }),
          /* @__PURE__ */ jsx("span", { children: "Independent workshop care" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Coverage agreed for your car" }),
          /* @__PURE__ */ jsx("span", { children: "Film and preparation in the quotation" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "ppf-jump", "aria-label": "On this page", children: [
        /* @__PURE__ */ jsx("a", { href: "#ppf-coverage", children: "Coverage" }),
        /* @__PURE__ */ jsx("a", { href: "#ppf-cost", children: "Price & quote" }),
        /* @__PURE__ */ jsx("a", { href: "#ppf-process", children: "Process" }),
        /* @__PURE__ */ jsx("a", { href: "#ppf-comparison", children: "PPF vs coating" }),
        /* @__PURE__ */ jsx("a", { href: "#ppf-faq", children: "FAQs" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ppf-section ppf-two-column", "aria-labelledby": "ppf-definition", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "A physical layer of protection" }),
          /* @__PURE__ */ jsx("h2", { id: "ppf-definition", children: "What Is Paint Protection Film?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Paint protection film, or PPF, is a transparent protective film applied to painted exterior surfaces. It forms a replaceable barrier over the original paint to help reduce damage from small stone impacts, road debris and minor surface abrasion." }),
          /* @__PURE__ */ jsx("p", { children: "Coverage matters: only the filmed areas receive that barrier. PPF does not repair existing chips or make a car damage-proof. Some films offer a self-healing surface for light marks, subject to the product’s specified conditions." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-coverage", className: "ppf-section ppf-tinted", "aria-labelledby": "coverage-heading", children: [
        /* @__PURE__ */ jsxs("div", { className: "ppf-section-intro", children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Choose where protection matters" }),
          /* @__PURE__ */ jsx("h2", { id: "coverage-heading", children: "PPF Coverage Options" }),
          /* @__PURE__ */ jsx("p", { children: "Start with how you drive and the panels you want to preserve. DIGI-TEC offers full-body, partial-front and selected-panel options; the exact scope is agreed for each car." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ppf-coverage-grid", children: ppfCoverage.map((option, index) => /* @__PURE__ */ jsxs("article", { className: `ppf-coverage-card ${index === 0 ? "ppf-coverage-featured" : ""}`, children: [
          /* @__PURE__ */ jsxs("span", { className: "ppf-eyebrow", children: [
            "0",
            index + 1,
            " / ",
            option.eyebrow
          ] }),
          /* @__PURE__ */ jsx("h3", { children: option.title }),
          /* @__PURE__ */ jsx("p", { children: option.description }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Consider it:" }),
            " ",
            option.suitable
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ppf-small", children: option.detail }),
          formatVerifiedStartingPrice(option) && /* @__PURE__ */ jsx("p", { className: "ppf-price font-semibold", children: formatVerifiedStartingPrice(option) }),
          /* @__PURE__ */ jsxs("a", { href: "#ppf-quote", className: "ppf-text-link", children: [
            "Discuss ",
            index === 0 ? "full-body" : index === 1 ? "front" : "partial",
            " coverage ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] })
        ] }, option.name)) }),
        /* @__PURE__ */ jsxs("div", { className: "ppf-full-body", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Full Body PPF in Dubai" }),
            /* @__PURE__ */ jsx("p", { children: "For owners seeking full car PPF in Dubai, broad coverage helps protect paint beyond the front impact zones. Doors, rear panels and other agreed painted surfaces can also benefit from a physical barrier against everyday light abrasion." }),
            /* @__PURE__ */ jsx("p", { children: "“Full body” describes a coverage plan. It does not automatically include every trim piece, light, glass surface or hidden edge. Review a panel-by-panel scope with the workshop, including preparation for previous repairs and the finish you want." })
          ] }),
          /* @__PURE__ */ jsx(WhatsApp, { placement: "full_body", children: "Ask About Full Body PPF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ppf-section ppf-two-column", "aria-labelledby": "dubai-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Paint care for local driving" }),
          /* @__PURE__ */ jsx("h2", { id: "dubai-heading", children: "Why PPF Makes Sense in Dubai" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Frequent journeys on Sheikh Zayed Road and other Dubai highways expose forward-facing panels to road debris. Sand and dust also accumulate between washes, and rubbing a dry surface can create abrasion. PPF can help reduce some of that wear on covered paint." }),
          /* @__PURE__ */ jsx("p", { children: "Intense sun and heat make product selection and care relevant too. UV, staining and heat-related properties vary by film; ask for the selected product’s guidance. Careful washing remains essential, especially for high-value cars whose original paint you want to preserve." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ppf-section ppf-tinted ppf-two-column", "aria-labelledby": "finish-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Appearance & film choice" }),
          /* @__PURE__ */ jsx("h2", { id: "finish-heading", children: "Clear, Matte & Satin PPF: What Changes?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Clear gloss PPF" }),
            " is intended to retain the paint’s colour and glossy appearance. ",
            /* @__PURE__ */ jsx("strong", { children: "Matte PPF" }),
            " gives a flatter look, while ",
            /* @__PURE__ */ jsx("strong", { children: "satin PPF" }),
            " has a softer sheen between matte and gloss. These are finish categories, and the result depends on the underlying paint and film."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Ask DIGI-TEC which finishes are available for your car and request a sample of the selected product. Self-healing and water-beading properties are film-specific, so confirm them alongside finish, care and any warranty terms." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-process", className: "ppf-section", "aria-labelledby": "process-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "From paint assessment to handover" }),
        /* @__PURE__ */ jsx("h2", { id: "process-heading", children: "Our PPF Installation Process" }),
        /* @__PURE__ */ jsx("p", { className: "ppf-section-intro", children: "The vehicle’s condition and selected film determine the preparation and installation method. These are the key stages to discuss with the workshop." }),
        /* @__PURE__ */ jsx("ol", { className: "ppf-process", children: process.map(([title, description], index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("span", { "aria-hidden": "true", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: title }),
            /* @__PURE__ */ jsx("p", { children: description })
          ] })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-workshop", className: "ppf-section ppf-tinted ppf-workshop", "aria-labelledby": "workshop-heading", children: [
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "/images/ppf/workshop-960.webp", srcSet: "/images/ppf/workshop-540.webp 540w, /images/ppf/workshop-960.webp 960w", sizes: "(min-width: 900px) 42vw, 100vw", width: 960, height: 1280, loading: "lazy", decoding: "async", alt: "Porsche cars in DIGI-TEC’s workshop bays, with a BMW on a lift behind them" }),
          /* @__PURE__ */ jsx("figcaption", { children: "Inside the DIGI-TEC workshop in Al Quoz. Workshop vehicle photograph; PPF coverage is not documented for these cars." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Meet the workshop" }),
          /* @__PURE__ */ jsx("h2", { id: "workshop-heading", children: "Why Choose DIGI-TEC for PPF in Dubai?" }),
          /* @__PURE__ */ jsx("p", { children: "DIGI-TEC Performance Center is an independent Dubai workshop working with luxury and performance vehicles. Paint protection sits alongside paint correction, ceramic coating and bodywork, so existing paint condition can be considered before film is applied." }),
          /* @__PURE__ */ jsxs("ul", { className: "ppf-checks", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "Full-body and selected-panel coverage options"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "Film, preparation and coverage documented in the estimate"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "Related paint-care services in the same workshop"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "A workshop location in Al Quoz Industrial Area 3"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Before choosing, ask to see recent PPF work and finish examples relevant to your car and requested coverage." }),
          /* @__PURE__ */ jsxs("div", { className: "ppf-actions", children: [
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/about", className: "ppf-text-link", children: [
              "About DIGI-TEC ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "#ppf-contact", className: "ppf-text-link", children: [
              "Visit the workshop ",
              /* @__PURE__ */ jsx(MapPin, { size: 16, "aria-hidden": "true" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ProtectionProjects, { service: "ppf", className: "ppf-section" }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-cost", className: "ppf-section ppf-two-column", "aria-labelledby": "cost-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "A quote for your car" }),
          /* @__PURE__ */ jsx("h2", { id: "cost-heading", children: "How Much Does PPF Cost in Dubai?" }),
          /* @__PURE__ */ jsx(WhatsApp, { placement: "price", children: "Get an Exact PPF Quote for Your Car" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "PPF price in Dubai depends on the vehicle and installation scope. A selected-panel application and a full-body installation involve different material, preparation and fitting requirements." }),
          /* @__PURE__ */ jsxs("dl", { className: "ppf-cost-factors", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Vehicle size & shape" }),
              /* @__PURE__ */ jsx("dd", { children: "Panel area, curves, bumpers and access affect film use and fitting complexity." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Coverage" }),
              /* @__PURE__ */ jsx("dd", { children: "The number of panels and whether coverage is partial or complete change the scope." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Film & finish" }),
              /* @__PURE__ */ jsx("dd", { children: "The confirmed product and available finish determine material choices and properties." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Paint preparation" }),
              /* @__PURE__ */ jsx("dd", { children: "Existing defects, contamination or previous repairs may require assessment and preparation before film." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Compare quotations using the same covered panels, film, preparation and care terms. A headline price alone does not explain what is included." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-comparison", className: "ppf-section ppf-tinted", "aria-labelledby": "comparison-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Two different jobs" }),
        /* @__PURE__ */ jsx("h2", { id: "comparison-heading", children: "PPF vs Ceramic Coating" }),
        /* @__PURE__ */ jsx("p", { className: "ppf-section-intro", children: "Choose film when a physical barrier is the priority. Consider coating for surface behaviour and appearance. Compatible products can be used together." }),
        /* @__PURE__ */ jsx("div", { className: "ppf-table-wrap", role: "region", "aria-label": "PPF and ceramic coating comparison", tabIndex: 0, children: /* @__PURE__ */ jsxs("table", { children: [
          /* @__PURE__ */ jsx("caption", { className: "sr-only", children: "How PPF and ceramic coating compare; properties depend on the selected product." }),
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Consideration" }),
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Paint protection film" }),
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Ceramic coating" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: [
            ["Physical barrier", "A replaceable film over covered paint", "A bonded surface treatment"],
            ["Stone chips", "Can reduce damage from small impacts", "Not a stone-chip barrier"],
            ["Light abrasion", "Can reduce surface abrasion; some films self-heal light marks", "Does not prevent scratches or deep abrasion"],
            ["Water behaviour", "Depends on the film’s top surface", "Can improve water beading and ease of cleaning"],
            ["Appearance", "Clear or sheen-changing finishes, subject to availability", "Can enhance gloss after appropriate preparation"],
            ["Typical use", "Preserving paint on impact areas or across the body", "Supporting cleaning and finish maintenance"]
          ].map(([label, film, coating]) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "row", children: label }),
            /* @__PURE__ */ jsx("td", { children: film }),
            /* @__PURE__ */ jsx("td", { children: coating })
          ] }, label)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "ppf-actions", "aria-label": "Related paint care services", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/ceramic-coating", className: "ppf-text-link", children: [
            "Explore ceramic coating ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/blog/ceramic-coating-vs-ppf-dubai", className: "ppf-text-link", children: [
            "Read the comparison guide ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "ppf-small", children: [
          "Existing swirls or paint defects? Explore ",
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/car-polishing-dubai", children: "car polishing and paint correction" }),
          " before selecting protection."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ppf-section", "aria-labelledby": "brands-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Keep the original finish in focus" }),
        /* @__PURE__ */ jsx("h2", { id: "brands-heading", children: "PPF for Luxury & Performance Cars in Dubai" }),
        /* @__PURE__ */ jsx("p", { className: "ppf-section-intro", children: "A daily-driven performance car and a carefully kept weekend car may need different coverage. Discuss how you use the vehicle, its paint condition and the finish you want to retain. Explore DIGI-TEC’s existing brand workshop pages below, then ask about PPF suitability for your model." }),
        /* @__PURE__ */ jsx("div", { className: "ppf-brand-links", children: ppfBrands.map((brand) => brand && /* @__PURE__ */ jsxs(LocalizedLink, { to: `/brands/${brand.slug}`, children: [
          brand.name,
          /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
        ] }, brand.slug)) }),
        /* @__PURE__ */ jsx("p", { className: "ppf-small", children: "DIGI-TEC is an independent workshop. Brand names identify the vehicles discussed." })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-quote", className: "ppf-section ppf-quote-section", "aria-labelledby": "quote-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Your car. Your coverage." }),
          /* @__PURE__ */ jsx("h2", { id: "quote-heading", children: "Get Your PPF Quote" }),
          /* @__PURE__ */ jsx("p", { children: "Share four details so the workshop can discuss suitable film, coverage and preparation. If you are unsure about coverage, choose the closest option and ask the team to help." }),
          /* @__PURE__ */ jsx("p", { children: "Full-front requests are subject to confirmation for the vehicle. The quotation will identify what is included." })
        ] }),
        /* @__PURE__ */ jsx(PpfQuoteForm, {})
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-faq", className: "ppf-section", "aria-labelledby": "faq-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "Before you decide" }),
        /* @__PURE__ */ jsx("h2", { id: "faq-heading", children: "PPF Questions, Answered" }),
        /* @__PURE__ */ jsx("div", { className: "ppf-faqs", children: ppfFaqs.map((faq) => /* @__PURE__ */ jsxs("details", { children: [
          /* @__PURE__ */ jsx("summary", { children: faq.question }),
          /* @__PURE__ */ jsx("p", { children: faq.answer })
        ] }, faq.question)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ppf-contact", className: "ppf-section ppf-tinted ppf-two-column", "aria-labelledby": "contact-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ppf-eyebrow", children: "PPF near you in Dubai" }),
          /* @__PURE__ */ jsx("h2", { id: "contact-heading", children: "Talk to DIGI-TEC in Al Quoz" }),
          /* @__PURE__ */ jsxs("address", { children: [
            "DIGI-TEC Performance Center",
            /* @__PURE__ */ jsx("br", {}),
            "Al Quoz Industrial Area 3",
            /* @__PURE__ */ jsx("br", {}),
            "Dubai, UAE",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", "data-cta-placement": "ppf_contact", children: "+971 4 340 2223" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Send your vehicle details before visiting to discuss the scope and arrange a suitable time. Confirm current opening hours and appointment availability with the workshop." }),
          /* @__PURE__ */ jsxs("div", { className: "ppf-actions", children: [
            /* @__PURE__ */ jsx(WhatsApp, { placement: "contact", children: "WhatsApp DIGI-TEC" }),
            /* @__PURE__ */ jsxs("a", { className: "ppf-button ppf-button-secondary", href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "ppf_contact", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 18, "aria-hidden": "true" }),
              "View workshop area"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "ppf-small", children: [
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-dubai", children: "Compare paint-care options" }),
            " or ",
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "explore all workshop services" }),
            "."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsxs("nav", { className: "ppf-mobile-contact", "aria-label": "PPF contact shortcuts", children: [
      /* @__PURE__ */ jsxs("a", { href: PPF_WHATSAPP, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "ppf_mobile", children: [
        /* @__PURE__ */ jsx(MessageCircle, { size: 20, "aria-hidden": "true" }),
        "WhatsApp quote"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "ppf_mobile", children: [
        /* @__PURE__ */ jsx(Phone, { size: 19, "aria-hidden": "true" }),
        "Call"
      ] })
    ] })
  ] });
}
export {
  PpfPage as default
};
