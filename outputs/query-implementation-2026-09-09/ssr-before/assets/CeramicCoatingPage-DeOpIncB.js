import { jsxs, jsx } from "react/jsx-runtime";
import { ChevronRight, Phone, ArrowRight, MapPin, Check, MessageCircle } from "lucide-react";
import { e as useSeo, H as Header, L as LocalizedLink, M as ceramicBenefits, N as ceramicProcess, O as ceramicOptions, G as Accordion, Q as ceramicFaqs, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer, S as SITE_URL, R as CERAMIC_PATH, U as CERAMIC_DESCRIPTION, V as CERAMIC_TITLE, W as ceramicBrands, r as brands, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, c as buildService, X as CERAMIC_H1, Y as ceramicStartingPrice } from "../entry-server.js";
import { P as ProtectionProjects, f as formatVerifiedStartingPrice } from "./verified-pricing-CGXp-YYp.js";
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
import "@radix-ui/react-accordion";
const url = `${SITE_URL}${CERAMIC_PATH}`;
const hero = "/images/ceramic-coating/black-mercedes-finish-1024.webp";
const whatsapp = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like a ceramic coating quote. Please help me choose the preparation and surfaces for my car.\nMake/model: \nYear: \nPaint condition or concerns: ")}`;
const relatedBrands = ceramicBrands.map((name) => brands.find((brand) => brand.name === name)).filter(Boolean);
const graph = pageGraph([
  buildWebPage({ url, name: CERAMIC_TITLE, description: CERAMIC_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, primaryImage: hero, mainEntityId: `${url}#service`, dateModified: "2026-09-08" }),
  buildBreadcrumb(url, [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Ceramic Coating", url }]),
  buildService({ url, name: CERAMIC_H1, serviceType: "Automotive ceramic coating", description: "DIGI-TEC Performance Center offers ceramic coating in Al Quoz Industrial Area 3, Dubai. Paint preparation, product choice and optional wheel, trim or glass coverage are confirmed in the estimate.", image: hero })
]);
function Quote({ placement, children = "Get Ceramic Coating Quote" }) {
  return /* @__PURE__ */ jsxs("a", { className: "cc-button cc-primary", href: whatsapp, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": `ceramic_${placement}`, children: [
    /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
    children
  ] });
}
function CeramicCoatingPage() {
  useSeo({ title: CERAMIC_TITLE, description: CERAMIC_DESCRIPTION, canonical: url, jsonLd: graph });
  return /* @__PURE__ */ jsxs("div", { className: "ceramic-page site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { id: "ceramic-main", children: [
      /* @__PURE__ */ jsxs("section", { className: "cc-hero theme-dark-section", "aria-labelledby": "ceramic-heading", children: [
        /* @__PURE__ */ jsxs("div", { className: "cc-hero-copy", children: [
          /* @__PURE__ */ jsxs("nav", { className: "cc-breadcrumb", "aria-label": "Breadcrumb", children: [
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "Services" }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { "aria-current": "page", children: "Ceramic Coating" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "DIGI-TEC Performance Center · Al Quoz" }),
          /* @__PURE__ */ jsx("h1", { id: "ceramic-heading", children: "Ceramic Coating Dubai" }),
          /* @__PURE__ */ jsxs("p", { className: "cc-hero-lead", children: [
            "A considered finish.",
            /* @__PURE__ */ jsx("br", {}),
            "Care that goes beyond the shine."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Professional ceramic coating for luxury and performance cars, with paint preparation and surface coverage matched to your vehicle. Discuss gloss, easier cleaning and the right care plan with our Dubai workshop." }),
          /* @__PURE__ */ jsxs("div", { className: "cc-actions", children: [
            /* @__PURE__ */ jsx(Quote, { placement: "hero" }),
            /* @__PURE__ */ jsxs("a", { className: "cc-button cc-secondary", href: "tel:+97143402223", "data-cta-placement": "ceramic_hero", children: [
              /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
              "Call the workshop"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("a", { className: "cc-text-link", href: "#ceramic-options", children: [
            "Explore coating options ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("figure", { className: "cc-hero-visual", children: [
          /* @__PURE__ */ jsx("img", { src: hero, srcSet: "/images/ceramic-coating/black-mercedes-finish-640.webp 640w, /images/ceramic-coating/black-mercedes-finish-1024.webp 1024w", sizes: "(min-width: 1000px) 48vw, 100vw", width: 1024, height: 1536, alt: "Black Mercedes-Benz G-Class with ceiling lights reflected across its bonnet and bodywork", loading: "eager" }),
          /* @__PURE__ */ jsx("figcaption", { children: "Paint finish detail" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cc-trust", "aria-label": "Verified workshop and service information", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(MapPin, { "aria-hidden": "true", size: 19 }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Al Quoz Industrial Area 3" }),
            "Dubai workshop"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Check, { "aria-hidden": "true", size: 19 }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Preparation & coating" }),
            "Scope agreed for your car"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Check, { "aria-hidden": "true", size: 19 }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Luxury & performance vehicles" }),
            "Independent workshop care"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "cc-jump", "aria-label": "On this page", children: [
        /* @__PURE__ */ jsx("a", { href: "#ceramic-benefits", children: "Benefits" }),
        /* @__PURE__ */ jsx("a", { href: "#ceramic-preparation", children: "Preparation" }),
        /* @__PURE__ */ jsx("a", { href: "#ceramic-options", children: "Options" }),
        /* @__PURE__ */ jsx("a", { href: "#ceramic-cost", children: "Price & quote" }),
        /* @__PURE__ */ jsx("a", { href: "#ceramic-comparison", children: "Compare with PPF" }),
        /* @__PURE__ */ jsx("a", { href: "#ceramic-faq", children: "FAQs" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "cc-section cc-split", "aria-labelledby": "ceramic-definition", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Understand the treatment" }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-definition", children: "What Is Ceramic Coating?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Ceramic coating is a protective treatment applied to automotive paint and other compatible surfaces. It can improve water behaviour, gloss and resistance to certain contaminants, helping maintain the appearance of properly prepared paint." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "The term ",
            /* @__PURE__ */ jsx("strong", { children: "nano ceramic coating" }),
            " is often used for this category of surface treatment. The actual product, preparation and maintenance determine its properties."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "cc-callout", children: [
            /* @__PURE__ */ jsx("strong", { children: "Coating does not make paint scratch-proof." }),
            " It does not remove existing defects or provide the physical stone-chip barrier of paint protection film."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ceramic-benefits", className: "cc-section cc-panel", "aria-labelledby": "ceramic-benefits-heading", children: [
        /* @__PURE__ */ jsxs("div", { className: "cc-section-intro", children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "What changes at the surface" }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-benefits-heading", children: "Ceramic Coating Benefits" }),
          /* @__PURE__ */ jsx("p", { children: "The aim is a well-prepared finish that is easier to care for. The selected coating determines the level and type of protection." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "cc-benefits", children: ceramicBenefits.map((benefit, index) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsxs("span", { className: "cc-number", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: benefit.title }),
          /* @__PURE__ */ jsx("p", { children: benefit.text })
        ] }, benefit.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "cc-section cc-split", "aria-labelledby": "ceramic-dubai", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Local conditions. Practical care." }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-dubai", children: "Why Ceramic Coating Makes Sense in Dubai" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Dust, sand and road contamination quickly collect on a regularly driven car in Dubai. Frequent washing makes the way you clean the surface important: a suitable coating can help dirt release, but rubbing dusty paint can still create marks." }),
          /* @__PURE__ */ jsx("p", { children: "Heat and strong sunlight make care and product selection relevant too. Wash and dry in suitable conditions, and follow the coating’s guidance rather than allowing dirty water to dry on hot panels. UV and environmental-resistance properties must be checked for the actual product." }),
          /* @__PURE__ */ jsx("p", { children: "For a premium vehicle, ceramic paint protection is part of an ongoing care routine. It does not completely prevent sun damage, sand abrasion, water spotting or scratches." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ceramic-preparation", className: "cc-section cc-panel cc-split", "aria-labelledby": "ceramic-preparation-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "The finish starts underneath" }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-preparation-heading", children: "Preparing Your Car for Ceramic Coating" }),
          /* @__PURE__ */ jsxs(LocalizedLink, { className: "cc-text-link", to: "/services/car-polishing-dubai", children: [
            "Explore paint correction & paint care ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Coating follows the surface underneath it. Existing swirls, haze and scratches remain visible if they are not addressed first. Applying a coating over poorly prepared paint can mean that further preparation and reapplication are needed to achieve the finish you wanted." }),
          /* @__PURE__ */ jsx("p", { children: "DIGI-TEC assesses the paint and confirms preparation in the estimate. Decontamination and polishing or paint correction can form part of the agreed scope where appropriate; every vehicle does not need the same amount of correction." }),
          /* @__PURE__ */ jsxs("ul", { className: "cc-check-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "Review paint condition, previous repairs and existing protection"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "Agree washing, decontamination and surface preparation"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "Discuss correction only where the paint and desired result justify it"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }),
              "Confirm the coating, treated surfaces and care requirements"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "cc-section", "aria-labelledby": "ceramic-process", children: [
        /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "From assessment to aftercare" }),
        /* @__PURE__ */ jsx("h2", { id: "ceramic-process", children: "Our Ceramic Coating Process" }),
        /* @__PURE__ */ jsx("p", { className: "cc-section-intro", children: "The exact preparation, application and curing schedule depend on the chosen coating system and your car. These are the stages to review with the workshop." }),
        /* @__PURE__ */ jsx("ol", { className: "cc-process", children: ceramicProcess.map((step, index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("span", { className: "cc-number", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: step.title }),
          /* @__PURE__ */ jsx("p", { children: step.text })
        ] }, step.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ceramic-options", className: "cc-section cc-panel", "aria-labelledby": "ceramic-options-heading", children: [
        /* @__PURE__ */ jsxs("div", { className: "cc-section-intro", children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Choose the scope, then the product" }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-options-heading", children: "Ceramic Coating Options" }),
          /* @__PURE__ */ jsx("p", { children: "Start with the painted surfaces, then discuss additional coverage or compatible PPF. Preparation, product choice, any layer schedule and product terms are confirmed in the quotation." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "cc-options", children: ceramicOptions.map((option) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: option.label }),
          /* @__PURE__ */ jsx("h3", { children: option.title }),
          /* @__PURE__ */ jsx("p", { children: option.text }),
          /* @__PURE__ */ jsx("p", { className: "cc-small", children: option.detail })
        ] }, option.title)) }),
        /* @__PURE__ */ jsx("div", { className: "cc-actions", children: /* @__PURE__ */ jsx(Quote, { placement: "options", children: "Get the Right Coating Option for Your Car" }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "cc-section cc-workshop", "aria-labelledby": "ceramic-workshop-heading", children: [
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "/images/ceramic-coating/workshop-vehicles-960.webp", srcSet: "/images/ceramic-coating/workshop-vehicles-540.webp 540w, /images/ceramic-coating/workshop-vehicles-960.webp 960w", sizes: "(min-width: 900px) 44vw, 100vw", width: 960, height: 1280, loading: "lazy", decoding: "async", alt: "Porsche cars parked in DIGI-TEC’s workshop with a BMW on a lift behind them" }),
          /* @__PURE__ */ jsx("figcaption", { children: "Inside the DIGI-TEC workshop. This photograph shows workshop vehicles; it is not a documented ceramic-coating before-and-after." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "See the workshop behind the service" }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-workshop-heading", children: "Why Choose DIGI-TEC for Ceramic Coating in Dubai?" }),
          /* @__PURE__ */ jsx("p", { children: "DIGI-TEC Performance Center is an independent automotive workshop in Al Quoz, serving luxury and performance vehicles. Ceramic coating sits alongside paint correction, PPF and bodywork, so paint condition can be considered before protection is selected." }),
          /* @__PURE__ */ jsx("p", { children: "The estimate identifies the proposed coating, preparation and covered surfaces. That helps you compare the scope of work and understand the care it will need." }),
          /* @__PURE__ */ jsx("h3", { children: "What to look for in real coating work" }),
          /* @__PURE__ */ jsx("p", { children: "Ask to see recent work relevant to your car and finish. Compare paint condition before preparation with the finished result under similar lighting, and ask which surfaces and preparation were included." }),
          /* @__PURE__ */ jsxs("div", { className: "cc-actions", children: [
            /* @__PURE__ */ jsx(Quote, { placement: "workshop", children: "Ask About Ceramic Coating" }),
            /* @__PURE__ */ jsxs(LocalizedLink, { className: "cc-text-link", to: "/about", children: [
              "About DIGI-TEC ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ProtectionProjects, { service: "ceramic", className: "cc-section" }),
      /* @__PURE__ */ jsxs("section", { id: "ceramic-cost", className: "cc-section cc-panel cc-split", "aria-labelledby": "ceramic-cost-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Price follows preparation & scope" }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-cost-heading", children: "How Much Does Ceramic Coating Cost in Dubai?" }),
          formatVerifiedStartingPrice(ceramicStartingPrice) && /* @__PURE__ */ jsx("p", { className: "cc-starting-price text-2xl font-semibold", children: formatVerifiedStartingPrice(ceramicStartingPrice) }),
          /* @__PURE__ */ jsx(Quote, { placement: "price", children: "Get an Exact Ceramic Coating Quote" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Ceramic coating price in Dubai varies with the condition of the car and the work included. A vehicle needing paint correction has a different preparation scope from one with a finish ready for coating." }),
          /* @__PURE__ */ jsxs("dl", { className: "cc-price-factors", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Vehicle size & surfaces" }),
              /* @__PURE__ */ jsx("dd", { children: "Painted area and any wheel, trim or glass coverage affect the work." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Paint condition" }),
              /* @__PURE__ */ jsx("dd", { children: "Contamination, swirls, previous repairs and existing protection influence preparation." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Correction required" }),
              /* @__PURE__ */ jsx("dd", { children: "Polishing or correction is assessed for the paint and desired finish." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Coating system" }),
              /* @__PURE__ */ jsx("dd", { children: "The selected product, application requirements and agreed coverage determine the coating scope." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Compare quotes using the same preparation, surfaces and product terms. Share your make, model, year and paint concerns to start the conversation; an inspection may be needed for an exact scope." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ceramic-comparison", className: "cc-section", "aria-labelledby": "ceramic-comparison-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Choose for the protection you need" }),
        /* @__PURE__ */ jsx("h2", { id: "ceramic-comparison-heading", children: "Ceramic Coating vs PPF" }),
        /* @__PURE__ */ jsx("p", { className: "cc-section-intro", children: "Coating focuses on surface behaviour and appearance. PPF provides a physical film over the panels it covers. The right choice depends on how you use and maintain your car." }),
        /* @__PURE__ */ jsx("div", { className: "cc-table-wrap", role: "region", "aria-label": "Ceramic coating and PPF comparison", tabIndex: 0, children: /* @__PURE__ */ jsxs("table", { children: [
          /* @__PURE__ */ jsx("caption", { className: "sr-only", children: "Ceramic coating and paint protection film compared by purpose. Properties vary by product." }),
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Priority" }),
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Ceramic coating" }),
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Paint protection film" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: [
            ["Physical protection", "A bonded surface treatment", "A replaceable physical film"],
            ["Stone chips", "No meaningful stone-chip barrier", "Can reduce small-impact damage on covered panels"],
            ["Water & cleaning", "Can improve water behaviour and ease of cleaning", "Depends on the film’s top surface or compatible coating"],
            ["Gloss & appearance", "Can enhance properly prepared paint", "Clear or sheen-changing film, subject to availability"],
            ["Contaminants", "Resistance depends on the selected coating", "Film properties and ongoing care determine resistance"],
            ["Paint preservation", "Supports appearance and surface maintenance", "Helps reduce some physical damage to covered paint"],
            ["Typical use", "A finish that is easier to maintain", "Impact-area or broader exterior protection"]
          ].map(([label, coating, film]) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "row", children: label }),
            /* @__PURE__ */ jsx("td", { children: coating }),
            /* @__PURE__ */ jsx("td", { children: film })
          ] }, label)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "cc-actions", "aria-label": "Related paint care services", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/paint-protection-film", className: "cc-text-link", children: [
            "Explore PPF coverage in Dubai ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsx(Quote, { placement: "comparison", children: "Discuss Your Paint Protection Options" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "cc-comparison-notes", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Can PPF and ceramic coating be combined?" }),
            /* @__PURE__ */ jsx("p", { children: "Yes, suitable systems can work together. DIGI-TEC’s existing options include combined PPF and coating for compatible surfaces. Confirm the specific products, application order and care requirements before proceeding." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Ceramic coating vs wax or sealant" }),
            /* @__PURE__ */ jsx("p", { children: "Traditional waxes and sealants are also used to improve appearance and water behaviour. Professional ceramic coating typically requires more deliberate preparation and product-specific curing. Product categories overlap, so compare the actual system and maintenance needs rather than assuming a fixed lifespan from the label." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "cc-section cc-panel", "aria-labelledby": "ceramic-brands-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Paint care around your car" }),
        /* @__PURE__ */ jsx("h2", { id: "ceramic-brands-heading", children: "Ceramic Coating for Luxury & Performance Cars in Dubai" }),
        /* @__PURE__ */ jsx("p", { className: "cc-section-intro", children: "Gloss, presentation and ease of maintenance can matter as much on a daily-driven luxury car as on a weekend performance car. Discuss the paint’s current condition and your care routine. Explore DIGI-TEC’s existing brand workshop pages, then confirm coating suitability for your model and finish." }),
        /* @__PURE__ */ jsx("div", { className: "cc-brand-links", children: relatedBrands.map((brand) => brand && /* @__PURE__ */ jsxs(LocalizedLink, { to: `/brands/${brand.slug}`, children: [
          brand.name,
          /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
        ] }, brand.slug)) }),
        /* @__PURE__ */ jsx("p", { className: "cc-small", children: "DIGI-TEC is an independent workshop. Vehicle brand names do not imply manufacturer authorization." })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ceramic-faq", className: "cc-section", "aria-labelledby": "ceramic-faq-heading", children: [
        /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Before you book" }),
        /* @__PURE__ */ jsx("h2", { id: "ceramic-faq-heading", children: "Ceramic Coating Questions, Answered" }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "cc-faq", children: ceramicFaqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `ceramic-faq-${index}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, children: faq.answer })
        ] }, faq.question)) }),
        /* @__PURE__ */ jsx("div", { className: "cc-actions", children: /* @__PURE__ */ jsx(Quote, { placement: "faq", children: "Check the Right Coating for Your Car" }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "ceramic-contact", className: "cc-section cc-contact cc-panel cc-split", "aria-labelledby": "ceramic-contact-heading", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "cc-kicker", children: "Looking for ceramic coating near you?" }),
          /* @__PURE__ */ jsx("h2", { id: "ceramic-contact-heading", children: "Visit DIGI-TEC in Al Quoz" }),
          /* @__PURE__ */ jsxs("address", { children: [
            "DIGI-TEC Performance Center",
            /* @__PURE__ */ jsx("br", {}),
            "Al Quoz Industrial Area 3",
            /* @__PURE__ */ jsx("br", {}),
            "Dubai, UAE",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", "data-cta-placement": "ceramic_contact", children: "+971 4 340 2223" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "mailto:info@digitecme.com", "data-cta-placement": "ceramic_contact", children: "info@digitecme.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Share your vehicle details and paint-care priorities before visiting. The team can discuss the appropriate assessment and confirm appointment availability and current opening hours." }),
          /* @__PURE__ */ jsxs("div", { className: "cc-actions", children: [
            /* @__PURE__ */ jsx(Quote, { placement: "contact", children: "WhatsApp DIGI-TEC" }),
            /* @__PURE__ */ jsxs("a", { className: "cc-button cc-secondary", href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "ceramic_contact", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 18, "aria-hidden": "true" }),
              "View workshop area"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "cc-actions", children: [
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/paint-protection-dubai", className: "cc-text-link", children: [
              "Compare paint-care options ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services", className: "cc-text-link", children: [
              "Explore all workshop services ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "cc-small cc-contact-note", children: [
            "WhatsApp opens a draft for you to review and send. ",
            /* @__PURE__ */ jsx("a", { href: "/privacy-policy.pdf", target: "_blank", rel: "noopener noreferrer", children: "Privacy policy" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("style", { children: ".cc-faq [role=region][data-state=closed] { display: block; animation: none; height: auto; overflow: visible; } .cc-faq button svg { display: none; }" }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsxs("nav", { className: "cc-mobile-contact", "aria-label": "Ceramic coating contact shortcuts", children: [
      /* @__PURE__ */ jsxs("a", { href: whatsapp, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "ceramic_mobile", children: [
        /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
        "WhatsApp quote"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "ceramic_mobile", children: [
        /* @__PURE__ */ jsx(Phone, { size: 19, "aria-hidden": "true" }),
        "Call"
      ] })
    ] })
  ] });
}
export {
  CeramicCoatingPage as default
};
