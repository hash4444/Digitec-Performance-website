import { jsxs, jsx } from "react/jsx-runtime";
import { MessageCircle, ChevronRight, ArrowRight, Camera, Phone, MapPin } from "lucide-react";
import { j as paintConcerns, t as trackWhatsAppClick, k as paintWhatsappHref, v as verifiedPaintProjects, L as LocalizedLink, e as useSeo, H as Header, P as PAINT_ASSESSMENT_HREF, l as paintProblems, m as paintServiceLevels, n as paintFaqs, f as Footer, o as PAINT_PHOTO_HREF, q as paintBrandNames, r as brands, p as pageGraph, b as buildWebPage, S as SITE_URL, w as PAINT_CORRECTION_PATH, x as PAINT_CORRECTION_TITLE, y as PAINT_CORRECTION_DESCRIPTION, a as buildBreadcrumb, c as buildService, z as PAINT_CORRECTION_H1 } from "../entry-server.js";
import { useState, useRef, useEffect } from "react";
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
import "react-router-dom";
import "@radix-ui/react-accordion";
import "@radix-ui/react-select";
function PaintAssessmentForm() {
  const [values, setValues] = useState({ brand: "", model: "", year: "", concern: "Not sure / Need assessment" });
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const submitting = useRef(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const resetSubmission = () => {
      submitting.current = false;
      setOpening(false);
    };
    window.addEventListener("pageshow", resetSubmission);
    return () => window.removeEventListener("pageshow", resetSubmission);
  }, []);
  const track = (name) => {
    var _a;
    return (_a = window.gtag) == null ? void 0 : _a.call(window, "event", name, {
      page_path: window.location.pathname,
      service: "paint_correction",
      form_id: "paint-assessment-form",
      cta_placement: "paint_assessment"
    });
  };
  const update = (key, value) => {
    if (!started.current) {
      started.current = true;
      track("quote_started");
    }
    submitting.current = false;
    setOpening(false);
    setError("");
    setValues((current) => ({ ...current, [key]: value }));
  };
  const submit = (event) => {
    event.preventDefault();
    if (!values.brand.trim() || !values.model.trim()) {
      setError("Please enter your vehicle brand and model.");
      return;
    }
    if (submitting.current) return;
    const message = `Paint assessment request from digitecme.com
Vehicle brand: ${values.brand.trim()}
Model: ${values.model.trim()}
Year: ${values.year}
Main concern: ${values.concern}
I would like advice on polishing or paint correction. I can attach photos in this chat. Please confirm whether an in-person assessment is needed and advise on the scope and price.`;
    const href = paintWhatsappHref(message);
    submitting.current = true;
    setOpening(true);
    trackWhatsAppClick(href);
    track("whatsapp_draft_opened");
    window.location.assign(href);
  };
  return /* @__PURE__ */ jsxs("form", { id: "paint-assessment-form", className: "paint-form", onSubmit: submit, "aria-describedby": "paint-form-privacy", children: [
    /* @__PURE__ */ jsxs("div", { className: "paint-form-fields", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "paint-brand", children: "Vehicle brand" }),
        /* @__PURE__ */ jsx("input", { id: "paint-brand", required: true, maxLength: 60, autoComplete: "off", placeholder: "e.g. Mercedes-Benz", value: values.brand, onChange: (e) => update("brand", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "paint-model", children: "Vehicle model" }),
        /* @__PURE__ */ jsx("input", { id: "paint-model", required: true, maxLength: 80, autoComplete: "off", placeholder: "e.g. G 63", value: values.model, onChange: (e) => update("model", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "paint-year", children: "Year" }),
        /* @__PURE__ */ jsx("input", { id: "paint-year", required: true, type: "number", inputMode: "numeric", min: 1900, max: (/* @__PURE__ */ new Date()).getFullYear() + 1, step: 1, placeholder: "e.g. 2024", value: values.year, onChange: (e) => update("year", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { id: "paint-concern-label", htmlFor: "paint-concern", children: "Main concern" }),
        /* @__PURE__ */ jsxs(Select, { value: values.concern, onValueChange: (value) => update("concern", value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { id: "paint-concern", "aria-labelledby": "paint-concern-label", className: "paint-select", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: paintConcerns.map((concern) => /* @__PURE__ */ jsx(SelectItem, { value: concern, children: concern }, concern)) })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("p", { role: "alert", children: error }),
    /* @__PURE__ */ jsxs("button", { className: "paint-button paint-primary", type: "submit", disabled: !ready || opening, children: [
      /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
      opening ? "Opening WhatsApp…" : "Continue to WhatsApp"
    ] }),
    /* @__PURE__ */ jsxs("p", { id: "paint-form-privacy", className: "paint-note", children: [
      "Review the draft and add photos in WhatsApp before sending. No name, phone number or registration is required here. ",
      /* @__PURE__ */ jsx("a", { href: "/privacy-policy.pdf", target: "_blank", rel: "noopener noreferrer", children: "Privacy policy" })
    ] }),
    /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("p", { children: "Use a WhatsApp link or call the workshop to request your assessment." }) })
  ] });
}
function PaintProjectComparison({ project }) {
  if (!project.verified || !project.evidence.length) return null;
  return /* @__PURE__ */ jsxs("article", { className: "paint-project", children: [
    /* @__PURE__ */ jsx("h3", { children: project.vehicle }),
    /* @__PURE__ */ jsxs("div", { className: "paint-project-pair", children: [
      /* @__PURE__ */ jsxs("figure", { children: [
        /* @__PURE__ */ jsx("img", { ...project.before, loading: "lazy", decoding: "async" }),
        /* @__PURE__ */ jsxs("figcaption", { children: [
          "Before · ",
          project.initialCondition
        ] })
      ] }),
      /* @__PURE__ */ jsxs("figure", { children: [
        /* @__PURE__ */ jsx("img", { ...project.after, loading: "lazy", decoding: "async" }),
        /* @__PURE__ */ jsxs("figcaption", { children: [
          "After · ",
          project.result
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Service performed:" }),
      " ",
      project.service
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
      /* @__PURE__ */ jsx(LocalizedLink, { to: project.brandPath, className: "paint-link", children: "Explore the vehicle’s brand workshop" }),
      project.caseStudyPath && /* @__PURE__ */ jsx(LocalizedLink, { to: project.caseStudyPath, className: "paint-link", children: "Read the documented project" })
    ] })
  ] });
}
function PaintCorrectionProjects() {
  const projects = verifiedPaintProjects.filter((project) => project.verified && project.evidence.length > 0);
  if (!projects.length) return null;
  return /* @__PURE__ */ jsxs("section", { id: "paint-projects", className: "paint-section", "aria-labelledby": "paint-projects-title", children: [
    /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Documented workshop results" }),
    /* @__PURE__ */ jsx("h2", { id: "paint-projects-title", children: "Recent Paint Correction & Polishing Work" }),
    projects.map((project) => /* @__PURE__ */ jsx(PaintProjectComparison, { project }, project.id))
  ] });
}
const paintStyles = ".paint-care-page { --paint-muted: #b9bbc0; --paint-text: #f4f4f5; --paint-accent: #ff9d72; --paint-line: #ffffff28; background: #101113; color: var(--paint-text); font-size: 16px; }\n.paint-care-page main { background: #101113; }\n.paint-care-page main :is(h1,h2,h3) { color: var(--paint-text); font-weight: 600; text-wrap: balance; }\n.paint-care-page main p { margin: 0 0 1.25rem; color: var(--paint-muted); line-height: 1.8; }\n.paint-care-page main strong { color: var(--paint-text); font-weight: 600; }\n.paint-care-page :is(a,button,input,summary,[role=combobox]):focus-visible { outline: 2px solid #f9814d; outline-offset: 5px; }\n.paint-care-page [id] { scroll-margin-top: 110px; }\n.paint-care-page .paint-kicker { font-size: .8125rem; letter-spacing: .11em; line-height: 1.7; text-transform: uppercase; color: var(--paint-accent); margin-bottom: 1.2rem; }\n.paint-hero { display: grid; grid-template-columns: 1.1fr 1fr; max-width: 1600px; margin: auto; }\n.paint-hero-copy { padding: 2rem clamp(1.5rem,4.5vw,5rem) 3.5rem; align-self: center; }\n.paint-breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; font-size: .875rem; color: #b9bbc0; margin-bottom: 3.5rem; }\n.paint-hero h1 { font-size: clamp(2.7rem,4.4vw,4.85rem); letter-spacing: -.045em; line-height: 1.04; margin: 0 0 1.7rem; }\n.paint-hero h1 span { color: #ff9d72; }\n.paint-care-page .paint-hero-lead { color: #f4f4f5; font-size: 1.3rem; line-height: 1.45; }\n.paint-hero-photo { position: relative; min-height: 650px; background: #242629; }\n.paint-hero-photo img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; object-position: center 48%; }\n.paint-hero-photo figcaption { position: absolute; bottom: 1rem; right: 1rem; left: 1rem; color: #ddd; font-size: .8125rem; line-height: 1.6; padding: .7rem 1rem; background: #101113d9; width: fit-content; }\n.paint-actions { display: flex; flex-wrap: wrap; gap: .8rem; margin: 1.8rem 0; }\n.paint-button { display: inline-flex; align-items: center; justify-content: center; gap: .65rem; min-height: 52px; padding: .9rem 1.15rem; font-size: .9375rem; font-weight: 650; text-align: center; line-height: 1.4; border-radius: 6px; border: 1px solid transparent; transition: background .18s ease; }\n.paint-button svg { flex-shrink: 0; }\n.paint-care-page .paint-primary { background: #ff6b35; color: #000; }\n.paint-care-page .paint-primary:hover { background: #ff7d4d; }\n.paint-care-page .paint-secondary { border-color: #ffffff55; color: var(--paint-text); background: transparent; }\n.paint-secondary:hover { background: #ffffff12; }\n.paint-button:disabled { cursor: wait; opacity: .7; }\n.paint-overview-nav { display: grid; grid-template-columns: repeat(3,1fr); padding-inline: max(1.5rem,calc((100% - 1200px)/2)); border-block: 1px solid var(--paint-line); }\n.paint-overview-nav a { display: flex; gap: 1rem; align-items: center; color: var(--paint-text); padding: 1.6rem 1rem; border-right: 1px solid var(--paint-line); font-size: .9375rem; }\n.paint-overview-nav a:last-child { border-right: 0; }\n.paint-overview-nav span { color: var(--paint-accent); font-size: .875rem; }\n.paint-section { padding: clamp(3.5rem,7vw,6rem) max(1.5rem,calc((100% - 1200px)/2)); }\n.paint-section h2 { font-size: clamp(2rem,3vw,3.2rem); letter-spacing: -.035em; line-height: 1.13; margin-bottom: 1.8rem; }\n.paint-section h3 { font-size: 1.35rem; line-height: 1.35; letter-spacing: -.015em; margin-bottom: 1rem; }\n.paint-introduction, .paint-split { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem,6vw,6rem); }\n.paint-introduction > div + div { padding-top: 2.6rem; }\n.paint-soft { background: #191b1e; border-block: 1px solid var(--paint-line); }\n.paint-heading-row { display: grid; grid-template-columns: 1.2fr 1fr; align-items: end; gap: 4rem; margin-bottom: 2.5rem; }\n.paint-problems article { display: grid; grid-template-columns: 45px .85fr 1fr 1.3fr; gap: 1.5rem; align-items: start; padding: 1.65rem 0; border-bottom: 1px solid var(--paint-line); }\n.paint-problems article:first-child { border-top: 1px solid var(--paint-line); }\n.paint-problems h3 { margin-bottom: 0; font-size: 1.125rem; }\n.paint-problems p { font-size: .9375rem; margin: 0 !important; }\n.paint-number { color: var(--paint-accent); font-size: 1.125rem; }\n.paint-scratch-section { display: grid; grid-template-columns: 1.15fr 1fr; gap: 4rem; align-items: center; }\n.paint-photo-prompt { padding: 2.2rem; border: 1px solid #ff9d7255; border-radius: 8px; background: #201b18; }\n.paint-photo-prompt > svg { color: var(--paint-accent); margin-bottom: 1.5rem; }\n.paint-photo-prompt .paint-note { margin-top: 1rem; margin-bottom: 0; }\n.paint-care-page .paint-link { display: inline-flex; align-items: center; gap: .6rem; color: var(--paint-accent); font-size: .9375rem; line-height: 1.65; text-decoration: underline; text-underline-offset: 5px; }\n.paint-link svg { flex-shrink: 0; }\n.paint-care-page .paint-note { color: var(--paint-muted); font-size: .875rem; line-height: 1.75; }\n.paint-note a { color: var(--paint-accent); text-decoration: underline; text-underline-offset: 3px; }\n.paint-intro { max-width: 810px; }\n.paint-table-wrap { overflow-x: auto; border: 1px solid var(--paint-line); border-radius: 6px; margin-top: 2rem; }\n.paint-table-wrap table { border-collapse: collapse; text-align: left; width: 100%; min-width: 640px; font-size: .9375rem; }\n.paint-table-wrap th, .paint-table-wrap td { padding: 1.2rem 1.35rem; border-bottom: 1px solid var(--paint-line); vertical-align: top; line-height: 1.65; }\n.paint-table-wrap th { font-weight: 600; color: var(--paint-text); }\n.paint-table-wrap td { width: 36%; color: var(--paint-muted); }\n.paint-table-wrap thead { background: #ffffff08; }\n.paint-process { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; margin-top: 3rem; }\n.paint-process li { border-top: 1px solid var(--paint-line); padding-top: 1.5rem; }\n.paint-process h3 { margin-top: 1.25rem; }\n.paint-process p { font-size: .9375rem; }\n.paint-project { margin-top: 3rem; }\n.paint-project-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }\n.paint-project-pair img { width: 100%; height: auto; }\n.paint-project figcaption, .paint-workshop figcaption { font-size: .8125rem; color: var(--paint-muted); line-height: 1.7; margin-top: .8rem; }\n.paint-project > p { margin-top: 1rem; }\n.paint-prices { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 1.5rem; }\n.paint-prices article { padding: 2rem; border: 1px solid var(--paint-line); border-top: 3px solid #ff8a59; border-radius: 6px; background: #101113; }\n.paint-prices h3 { font-size: 1.6rem; }\n.paint-care-page .paint-price { font-size: 1.3rem; color: var(--paint-text); font-weight: 600; line-height: 1.45; margin-top: 2rem; }\n.paint-finish-flow { display: grid; grid-template-columns: repeat(4,1fr); gap: .75rem; padding: 1.5rem 0 2rem; margin-bottom: 2rem; border-bottom: 1px solid var(--paint-line); }\n.paint-finish-flow li { color: var(--paint-accent); font-size: .9375rem; line-height: 1.65; }\n.paint-finish-flow li:not(:last-child)::after { content: '→'; margin-left: 1rem; color: var(--paint-muted); }\n.paint-protection-options { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 2rem; }\n.paint-workshop { display: grid; grid-template-columns: .95fr 1.05fr; gap: 5rem; align-items: center; }\n.paint-workshop img { width: 100%; height: auto; max-height: 600px; object-fit: cover; object-position: center 75%; border-radius: 6px; }\n.paint-facts { list-style: disc; padding-left: 1.25rem; margin: 1.5rem 0; }\n.paint-facts li { line-height: 1.7; padding-left: .25rem; margin-bottom: .75rem; }\n.paint-facts li::marker { color: var(--paint-accent); }\n.paint-brands { display: grid; grid-template-columns: repeat(3,1fr); gap: .5rem 2rem; margin-top: 2rem; margin-bottom: 1.5rem; }\n.paint-brands a { display: flex; justify-content: space-between; align-items: center; gap: .5rem; color: var(--paint-text); padding: 1rem 0; border-bottom: 1px solid var(--paint-line); }\n.paint-brands a:hover { color: var(--paint-accent); }\n.paint-assessment-section { display: grid; grid-template-columns: 1fr 1.25fr; gap: 4rem; background: #231d19; border-block: 1px solid #ff9d7244; }\n.paint-form-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.5rem; }\n.paint-form label { display: block; color: var(--paint-text); font-size: .9375rem; margin-bottom: .6rem; }\n.paint-form input, .paint-form .paint-select { display: flex; width: 100%; min-width: 0; height: 54px; padding: .85rem 1rem; background: #101113; color: #f4f4f5; border: 1px solid #ffffff45; border-radius: 6px; font-size: 1rem; }\n.paint-form input::placeholder { color: #a2a4a9; }\n.paint-form > button { width: 100%; margin-bottom: 1rem; }\n.paint-faqs { max-width: 960px; }\n.paint-faqs details { padding: 1.3rem 0; border-bottom: 1px solid var(--paint-line); }\n.paint-faqs summary { font-size: 1.05rem; font-weight: 600; cursor: pointer; line-height: 1.65; }\n.paint-faqs details[open] summary { color: var(--paint-accent); }\n.paint-faqs details p { padding-top: 1rem; margin-bottom: 0; max-width: 810px; }\n.paint-care-page address { color: var(--paint-text); font-style: normal; line-height: 1.9; }\n.paint-care-page address a { color: var(--paint-accent); }\n#paint-contact .paint-note { margin-top: 1.5rem; }\n.paint-mobile-contact { display: none; }\n@media (max-width: 1100px) { .paint-heading-row, .paint-scratch-section, .paint-workshop, .paint-assessment-section { gap: 2rem; } .paint-process { grid-template-columns: repeat(2,1fr); } .paint-problems article { grid-template-columns: 35px .9fr 1.1fr; gap: 1rem; } .paint-problems article p:last-child { grid-column: 3; } }\n@media (max-width: 999px) { .paint-hero { grid-template-columns: 1fr; } .paint-hero-copy { max-width: 760px; padding: 1.5rem 1.5rem 2.5rem; } .paint-hero-photo { min-height: 330px; } .paint-hero-photo img { object-position: center 55%; } .paint-breadcrumb { margin-bottom: 2rem; } .paint-overview-nav { padding-inline: .5rem; } }\n@media (max-width: 767px) {\n  .paint-care-page { padding-bottom: calc(78px + env(safe-area-inset-bottom)); }\n  .paint-hero h1 { font-size: clamp(2.55rem,9.5vw,4rem); }\n  .paint-hero-copy { padding-top: 1rem; }\n  .paint-hero-copy .paint-actions { flex-direction: column; align-items: stretch; }\n  .paint-hero-copy .paint-kicker { margin-bottom: .85rem; }\n  .paint-hero-copy .paint-breadcrumb { margin-bottom: 1.4rem; }\n  .paint-hero-photo { min-height: 300px; }\n  .paint-overview-nav { display: flex; flex-direction: column; padding-inline: 1.5rem; }\n  .paint-overview-nav a { padding: 1rem 0; border-right: 0; border-bottom: 1px solid var(--paint-line); }\n  .paint-overview-nav a:last-child { border-bottom: 0; }\n  .paint-introduction, .paint-split, .paint-heading-row, .paint-scratch-section, .paint-prices, .paint-workshop, .paint-assessment-section, .paint-protection-options { grid-template-columns: 1fr; gap: 1.5rem; }\n  .paint-introduction > div + div { padding-top: 0; }\n  .paint-problems article { grid-template-columns: 30px 1fr; gap: .75rem 1rem; }\n  .paint-problems article p, .paint-problems article p:last-child { grid-column: 2; }\n  .paint-photo-prompt { padding: 1.5rem; }\n  .paint-process { grid-template-columns: 1fr; gap: 1.5rem; }\n  .paint-finish-flow { grid-template-columns: 1fr 1fr; gap: 1rem; }\n  .paint-project-pair { grid-template-columns: 1fr; }\n  .paint-workshop figure { order: 2; }\n  .paint-brands { grid-template-columns: 1fr 1fr; gap: .5rem 1rem; }\n  .paint-mobile-contact { display: grid; grid-template-columns: 1.7fr 1fr; position: fixed; bottom: 0; left: 0; right: 0; z-index: 40; padding: .65rem 1rem calc(.65rem + env(safe-area-inset-bottom)); gap: .65rem; background: #101113f5; border-top: 1px solid #ffffff40; }\n  .paint-mobile-contact a { display: flex; align-items: center; justify-content: center; gap: .55rem; color: #000; background: #ff6b35; min-height: 50px; padding: .65rem .5rem; border-radius: 5px; font-size: .9375rem; font-weight: 600; }\n  .paint-mobile-contact a:last-child { color: #fff; background: #282a2e; }\n}\n@media (max-width: 420px) { .paint-form-fields { grid-template-columns: 1fr; } .paint-prices article { padding: 1.5rem; } }\nhtml.theme-light .paint-care-page main :is(.paint-section,.paint-overview-nav) { --paint-muted: #56595e; --paint-text: #181a1d; --paint-accent: #a23d17; --paint-line: #181a1d28; color: var(--paint-text); }\nhtml.theme-light .paint-care-page main .paint-soft { background-color: #eaeae6 !important; }\nhtml.theme-light .paint-care-page .paint-prices article { background: #fff; }\nhtml.theme-light .paint-care-page .paint-photo-prompt,\nhtml.theme-light .paint-care-page main .paint-assessment-section { background-color: #f0e8e1 !important; }\nhtml.theme-light .paint-care-page .paint-form input,\nhtml.theme-light .paint-care-page .paint-form .paint-select { background: #fff; color: #181a1d; border-color: #181a1d55; }\nhtml.theme-light .paint-care-page .paint-form input::placeholder { color: #686a70; }\nhtml.theme-light .paint-care-page .paint-section .paint-secondary { border-color: #181a1d55; }\nhtml.theme-light .paint-care-page .paint-overview-nav { background: #f4f4f1; }\n@media (prefers-reduced-motion: reduce) { .paint-care-page *, .paint-care-page *::before, .paint-care-page *::after { transition: none !important; scroll-behavior: auto !important; } }\n";
const url = `${SITE_URL}${PAINT_CORRECTION_PATH}`;
const heroImage = "/images/paint-correction/porsche-workshop-1200.webp";
const graph = pageGraph([
  buildWebPage({ url, name: PAINT_CORRECTION_TITLE, description: PAINT_CORRECTION_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, primaryImage: heroImage, mainEntityId: `${url}#service`, dateModified: "2026-09-08" }),
  buildBreadcrumb(url, [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Car Polishing & Paint Correction", url }]),
  buildService({ url, name: PAINT_CORRECTION_H1, serviceType: "Car polishing and paint correction", description: "DIGI-TEC Performance Center in Al Quoz Industrial Area 3, Dubai assesses vehicle paint condition and provides paint correction and related paint-care options. Preparation, correction scope and achievable finish are assessed for the vehicle.", image: heroImage })
]);
const relevantBrands = paintBrandNames.map((name) => brands.find((brand) => brand.name === name)).filter(Boolean);
function ContactLink({ children = "WhatsApp DIGI-TEC", placement, photo = false }) {
  return /* @__PURE__ */ jsxs("a", { href: photo ? PAINT_PHOTO_HREF : PAINT_ASSESSMENT_HREF, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": `paint_${placement}`, className: "paint-button paint-primary", children: [
    photo ? /* @__PURE__ */ jsx(Camera, { size: 19, "aria-hidden": "true" }) : /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
    children
  ] });
}
function PaintCorrectionPage() {
  useSeo({ title: PAINT_CORRECTION_TITLE, description: PAINT_CORRECTION_DESCRIPTION, canonical: url, hasArabicVersion: false, jsonLd: graph });
  return /* @__PURE__ */ jsxs("div", { className: "paint-care-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: paintStyles } }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { id: "paint-main", children: [
      /* @__PURE__ */ jsxs("section", { className: "paint-hero theme-dark-section", "aria-labelledby": "paint-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "paint-hero-copy", children: [
          /* @__PURE__ */ jsxs("nav", { className: "paint-breadcrumb", "aria-label": "Breadcrumb", children: [
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "Services" }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { "aria-current": "page", children: "Car Polishing & Paint Correction" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "DIGI-TEC Performance Center / Dubai" }),
          /* @__PURE__ */ jsxs("h1", { id: "paint-title", children: [
            "Car Polishing & ",
            /* @__PURE__ */ jsx("span", { children: "Paint Correction" }),
            " Dubai"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "paint-hero-lead", children: "Swirled, scratched or dull paint?" }),
          /* @__PURE__ */ jsx("p", { children: "Ask our Al Quoz workshop what polishing or paint correction can safely improve, with a quote based on your car’s condition." }),
          /* @__PURE__ */ jsxs("div", { className: "paint-actions", children: [
            /* @__PURE__ */ jsxs("a", { href: "#paint-assessment", className: "paint-button paint-primary", children: [
              "Get Paint Assessment & Quote ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxs("a", { href: PAINT_ASSESSMENT_HREF, target: "_blank", rel: "noopener noreferrer", className: "paint-button paint-secondary", "data-cta-placement": "paint_hero", children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 18, "aria-hidden": "true" }),
              "WhatsApp DIGI-TEC"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("figure", { className: "paint-hero-photo", children: [
          /* @__PURE__ */ jsx("img", { src: heroImage, srcSet: "/images/paint-correction/porsche-workshop-640.webp 640w, /images/paint-correction/porsche-workshop-1200.webp 1200w", sizes: "(min-width: 1000px) 47vw, 100vw", width: 1200, height: 1600, ...{ fetchpriority: "high" }, alt: "Rear of a white Porsche GT3 RS inside DIGI-TEC’s workshop" }),
          /* @__PURE__ */ jsxs("figcaption", { children: [
            "Porsche GT3 RS at the DIGI-TEC workshop.",
            /* @__PURE__ */ jsx("br", {}),
            "Workshop photograph; no correction result is claimed."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "paint-overview-nav", "aria-label": "Explore paint care", children: [
        /* @__PURE__ */ jsxs("a", { href: "#paint-problems", children: [
          /* @__PURE__ */ jsx("span", { children: "01" }),
          "Understand the marks"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#paint-comparison", children: [
          /* @__PURE__ */ jsx("span", { children: "02" }),
          "Choose the right approach"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#paint-pricing", children: [
          /* @__PURE__ */ jsx("span", { children: "03" }),
          "Plan your assessment"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "paint-section paint-introduction", "aria-labelledby": "paint-definition-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Finish enhancement / Defect correction" }),
          /* @__PURE__ */ jsx("h2", { id: "paint-definition-title", children: "What Is Car Polishing?" }),
          /* @__PURE__ */ jsx("p", { children: "Car polishing uses a suitable polish and technique to improve clarity, gloss and certain surface imperfections. Machine polishing can refine a sound finish by removing a small amount of material where an abrasive polish is used." }),
          /* @__PURE__ */ jsx("p", { children: "It cannot replace missing paint, fill a stone chip, straighten a dent or repair peeling clear coat. The right starting point is the condition of your car’s finish." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { children: "What Is Paint Correction?" }),
          /* @__PURE__ */ jsx("p", { children: "Paint correction is a more deliberate approach to improving assessed paint defects. Swirl marks, light scratches, haze and some water spotting or oxidation may be correctable, but no single process is right for every car." }),
          /* @__PURE__ */ jsx("p", { children: "Defect depth, clear-coat condition, previous repairs and the amount of material available for safe correction all matter. The goal is a suitable improvement while preserving the finish." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-problems", className: "paint-section paint-soft", "aria-labelledby": "paint-problems-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "paint-heading-row", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Start with what you can see" }),
            /* @__PURE__ */ jsx("h2", { id: "paint-problems-title", children: "Paint Problems We Can Assess" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Strong Dubai sunlight can make fine marks obvious. Tell us when you notice them and whether the car has been repainted, polished or protected before." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "paint-problems", children: paintProblems.map((problem, index) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsxs("span", { className: "paint-number", "aria-hidden": "true", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: problem.title }),
          /* @__PURE__ */ jsx("p", { children: problem.appearance }),
          /* @__PURE__ */ jsx("p", { children: problem.assessment })
        ] }, problem.title)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-scratches", className: "paint-section paint-scratch-section", "aria-labelledby": "paint-scratches-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Scratch removal starts with depth" }),
          /* @__PURE__ */ jsx("h2", { id: "paint-scratches-title", children: "Can Car Scratches Be Polished Out?" }),
          /* @__PURE__ */ jsx("p", { children: "Some can. Very light clear-coat marks may improve with suitable polishing. Moderate scratches need a closer assessment: reducing their visibility may be safer than trying to remove them completely." }),
          /* @__PURE__ */ jsx("p", { children: "Deep scratches that reach beyond safely correctable layers may need touch-up or refinishing. Paint correction does not repair dents or replace paint lost to chips." }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/car-body-repair-dubai", className: "paint-link", children: [
            "Explore body and paint repair for deeper damage ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "paint-photo-prompt", children: [
          /* @__PURE__ */ jsx(Camera, { size: 32, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h3", { children: "Show us the scratch." }),
          /* @__PURE__ */ jsx("p", { children: "Send one view of the affected panel and a closer photo from an angle that shows the mark. Mention any previous paintwork. Photos help us discuss the concern; an inspection may still be needed to judge depth and safe correction." }),
          /* @__PURE__ */ jsx(ContactLink, { placement: "scratch_photo", photo: true, children: "Send Us a Photo of the Scratch" }),
          /* @__PURE__ */ jsx("p", { className: "paint-note", children: "Add the images directly in WhatsApp. There is no website photo upload." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "paint-section paint-split", "aria-labelledby": "paint-swirls-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Fine marks. Interrupted reflections." }),
          /* @__PURE__ */ jsx("h2", { id: "paint-swirls-title", children: "Swirl Mark Removal in Dubai" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Swirl marks are fine scratches that become easy to see around a bright reflection. Dust trapped in wash materials, wiping dry paint or unsuitable previous polishing can leave these marks. Sunlight and inspection lighting make them more visible, particularly on dark colours." }),
          /* @__PURE__ */ jsx("p", { children: "Appropriate polishing or correction can often improve shallow swirls. Afterward, gentle washing, clean materials and avoiding dry dust removal help preserve the improvement. Repeated aggressive polishing is not a substitute for careful maintenance." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-comparison", className: "paint-section paint-soft", "aria-labelledby": "paint-comparison-title", children: [
        /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "The scope matters more than the label" }),
        /* @__PURE__ */ jsx("h2", { id: "paint-comparison-title", children: "Car Polishing vs Paint Correction" }),
        /* @__PURE__ */ jsx("p", { className: "paint-intro", children: "These terms overlap: polishing is a technique used in correction. The distinction below helps frame the result you want, without assuming your car needs the most intensive option." }),
        /* @__PURE__ */ jsx("div", { className: "paint-table-wrap", role: "region", "aria-label": "Car polishing and paint correction comparison", tabIndex: 0, children: /* @__PURE__ */ jsxs("table", { children: [
          /* @__PURE__ */ jsx("caption", { className: "sr-only", children: "Typical focus of enhancement polishing compared with targeted paint correction" }),
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Consideration" }),
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Polishing / paint enhancement" }),
            /* @__PURE__ */ jsx("th", { scope: "col", children: "Paint correction" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: [
            ["Purpose", "Improve gloss and clarity; address suitable minor marks", "Target assessed defects while respecting paint limits"],
            ["Vehicle condition", "Sound paint mainly needing a fresher appearance", "Swirls, scratches, haze or other defects needing closer assessment"],
            ["Process intensity", "Chosen for the finish and desired enhancement", "Chosen for defect depth, paint condition and safe correction"],
            ["Assessment", "Check paint condition and previous work", "Review the defects, previous work and achievable improvement"],
            ["Expected result", "Improved appearance where the paint is suitable", "Reduction of safely correctable defects; some marks may remain"],
            ["Time required", "Confirmed from vehicle and agreed scope", "Confirmed from preparation and correction required"],
            ["Protection afterward", "Consider compatible coating or film and careful washing", "Consider compatible coating or film and careful washing"]
          ].map(([label, polish, correction]) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "row", children: label }),
            /* @__PURE__ */ jsx("td", { children: polish }),
            /* @__PURE__ */ jsx("td", { children: correction })
          ] }, label)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "paint-section paint-split", "aria-labelledby": "paint-inspection-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Preserve the paint you have" }),
          /* @__PURE__ */ jsx("h2", { id: "paint-inspection-title", children: "Professional Paint Assessment" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Begin with inspection, not an automatic correction package. DIGI-TEC assesses paint condition and preparation needs before a paint-care scope is agreed. Tell the team about repainting, previous correction and any existing film or coating." }),
          /* @__PURE__ */ jsx("p", { children: "Available paint thickness and clear-coat condition influence what can safely be corrected. Ask how suitability will be assessed for your car, what improvement is realistic and which marks should be left alone or repaired differently." }),
          /* @__PURE__ */ jsx("p", { children: "Matte or satin paint needs a different approach: conventional gloss polishing can change its appearance. Identify the finish before any correction is proposed." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-process", className: "paint-section paint-process-section", "aria-labelledby": "paint-process-title", children: [
        /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "From concern to agreed finish" }),
        /* @__PURE__ */ jsx("h2", { id: "paint-process-title", children: "Our Car Polishing & Paint Correction Process" }),
        /* @__PURE__ */ jsx("p", { className: "paint-intro", children: "The exact preparation and correction method are agreed for the vehicle. The existing paint-care service is based on assessment, a defined scope and a product-appropriate finish." }),
        /* @__PURE__ */ jsx("ol", { className: "paint-process", children: [
          ["Discuss & inspect", "Share the paint concerns, previous repairs and desired result. Photos can begin the conversation; suitability is assessed on the car."],
          ["Agree preparation & scope", "Review the required preparation, areas to be treated and realistic limits. Cleaning, contamination and existing protection affect the plan."],
          ["Carry out the agreed correction", "Polishing or correction is matched to the assessed finish and approved scope. More intensive work is not automatically the right choice."],
          ["Review & plan protection", "Review the finish and any remaining defects with the team. Discuss suitable care and whether ceramic coating or PPF fits your priorities."]
        ].map(([title, description], index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("span", { className: "paint-number", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsx("p", { children: description })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ jsx(PaintCorrectionProjects, {}),
      /* @__PURE__ */ jsxs("section", { id: "paint-pricing", className: "paint-section paint-soft", "aria-labelledby": "paint-pricing-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "paint-heading-row", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Plan the work around your paint" }),
            /* @__PURE__ */ jsx("h2", { id: "paint-pricing-title", children: "How Much Does Car Polishing & Paint Correction Cost in Dubai?" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Vehicle size, paint condition, defect severity, previous paintwork, preparation and the amount of correction required affect the quote. Protection afterward is a separate scope to discuss." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "paint-prices", children: paintServiceLevels.map((level) => {
          var _a;
          return /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("h3", { children: level.name }),
            /* @__PURE__ */ jsx("p", { children: level.purpose }),
            /* @__PURE__ */ jsx("p", { children: level.suitable }),
            /* @__PURE__ */ jsx("p", { className: "paint-price", children: typeof level.fromAed === "number" && Number.isFinite(level.fromAed) && level.fromAed > 0 && ((_a = level.priceSource) == null ? void 0 : _a.trim()) ? `From AED ${level.fromAed.toLocaleString("en-AE")}` : "Price based on vehicle & paint condition" }),
            /* @__PURE__ */ jsxs("a", { className: "paint-link", href: "#paint-assessment", children: [
              level.name === "Car Polishing" ? "Get an Exact Quote for Your Car" : "Get Paint Assessment & Quote",
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18, "aria-hidden": "true" })
            ] })
          ] }, level.name);
        }) }),
        /* @__PURE__ */ jsx("p", { className: "paint-note", children: "These describe different objectives for assessment, not fixed stage-based packages or guaranteed levels of scratch removal." })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-protection", className: "paint-section", "aria-labelledby": "paint-protection-title", children: [
        /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "After the improvement" }),
        /* @__PURE__ */ jsx("h2", { id: "paint-protection-title", children: "Protecting the Finish After Paint Correction" }),
        /* @__PURE__ */ jsxs("ol", { className: "paint-finish-flow", "aria-label": "Paint-care sequence", children: [
          /* @__PURE__ */ jsx("li", { children: "Assess paint condition" }),
          /* @__PURE__ */ jsx("li", { children: "Agree correction" }),
          /* @__PURE__ */ jsx("li", { children: "Review the improved finish" }),
          /* @__PURE__ */ jsx("li", { children: "Choose suitable protection" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "paint-protection-options", role: "group", "aria-label": "Related paint care services", children: [
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Should You Ceramic Coat After Paint Correction?" }),
            /* @__PURE__ */ jsx("p", { children: "A compatible ceramic coating may be considered once the paint has been prepared and its appearance improved. Depending on the product, it can support water beading, ease of cleaning and finish maintenance. It does not remove scratches or make the finish scratch-proof." }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/ceramic-coating", className: "paint-link", children: [
              "Explore ceramic coating ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Paint Correction Before PPF" }),
            /* @__PURE__ */ jsx("p", { children: "Film adds a physical barrier to covered panels, but it does not correct defects underneath. Paint condition, previous repairs and film compatibility should be assessed before installation. Discuss whether preparation or correction is appropriate before selecting coverage." }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/paint-protection-film", className: "paint-link", children: [
              "Explore paint protection film ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "paint-intro", children: "Careful washing remains part of the plan. Follow the chosen product’s care guidance, remove dust gently and ask about any new marks before attempting abrasive polishing yourself." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "paint-section paint-soft paint-workshop", "aria-labelledby": "paint-why-title", children: [
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: "/images/paint-correction/workshop-floor-960.webp", srcSet: "/images/paint-correction/workshop-floor-540.webp 540w, /images/paint-correction/workshop-floor-960.webp 960w", sizes: "(min-width: 900px) 42vw, 100vw", width: 960, height: 1280, loading: "lazy", decoding: "async", alt: "Luxury vehicles with DIGI-TEC plates parked in the workshop, including a Lamborghini SUV" }),
          /* @__PURE__ */ jsx("figcaption", { children: "Inside the DIGI-TEC workshop in Al Quoz. Vehicle photograph, not a polishing before-and-after." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "An independent Dubai workshop" }),
          /* @__PURE__ */ jsx("h2", { id: "paint-why-title", children: "Why Choose DIGI-TEC for Car Polishing & Paint Correction?" }),
          /* @__PURE__ */ jsx("p", { children: "DIGI-TEC’s paint-care offering includes paint correction, ceramic coating and PPF, alongside body repair. That allows the discussion to start with the actual condition of your car and whether it needs correction, protection or a different repair." }),
          /* @__PURE__ */ jsxs("ul", { className: "paint-facts", children: [
            /* @__PURE__ */ jsx("li", { children: "Paint condition and preparation assessed before the scope is agreed" }),
            /* @__PURE__ */ jsx("li", { children: "Luxury and performance vehicle workshop experience" }),
            /* @__PURE__ */ jsx("li", { children: "Related correction, bodywork and protection services" }),
            /* @__PURE__ */ jsx("li", { children: "A workshop location in Al Quoz Industrial Area 3, Dubai" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Ask to see recent correction work relevant to your paint concerns and discuss what improvement is realistic for your car." }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/about", className: "paint-link", children: [
            "About DIGI-TEC Performance Center ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "paint-section", "aria-labelledby": "paint-brands-title", children: [
        /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Care for the finish, not just the badge" }),
        /* @__PURE__ */ jsx("h2", { id: "paint-brands-title", children: "Paint Correction for Luxury & Performance Cars in Dubai" }),
        /* @__PURE__ */ jsx("p", { className: "paint-intro", children: "Original paint, repaired panels and special finishes need individual consideration. Owners of high-value cars may prefer a measured improvement that preserves the finish over chasing every mark. Explore DIGI-TEC’s existing brand workshop pages, then discuss the paint and history of your exact vehicle." }),
        /* @__PURE__ */ jsx("div", { className: "paint-brands", children: relevantBrands.map((brand) => brand && /* @__PURE__ */ jsxs(LocalizedLink, { to: `/brands/${brand.slug}`, children: [
          brand.name,
          /* @__PURE__ */ jsx(ArrowRight, { size: 16, "aria-hidden": "true" })
        ] }, brand.slug)) }),
        /* @__PURE__ */ jsx("p", { className: "paint-note", children: "DIGI-TEC is an independent workshop. Manufacturer names identify the vehicles discussed." })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-assessment", className: "paint-section paint-assessment-section", "aria-labelledby": "paint-assessment-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Start with your car" }),
          /* @__PURE__ */ jsx("h2", { id: "paint-assessment-title", children: "Get Paint Assessment & Quote" }),
          /* @__PURE__ */ jsx("p", { children: "Send your model, year and main concern. You can attach photos in WhatsApp and ask which areas may improve with polishing or paint correction." }),
          /* @__PURE__ */ jsx("p", { children: "Include a wider panel view and a close-up that shows the marks. An exact quote or correction recommendation may require inspection at the workshop." }),
          /* @__PURE__ */ jsx(ContactLink, { placement: "assessment_photos", photo: true, children: "Send Us Photos on WhatsApp" })
        ] }),
        /* @__PURE__ */ jsx(PaintAssessmentForm, {})
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-faq", className: "paint-section", "aria-labelledby": "paint-faq-title", children: [
        /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Know what to expect" }),
        /* @__PURE__ */ jsx("h2", { id: "paint-faq-title", children: "Car Polishing & Paint Correction FAQs" }),
        /* @__PURE__ */ jsx("div", { className: "paint-faqs", children: paintFaqs.map((faq) => /* @__PURE__ */ jsxs("details", { children: [
          /* @__PURE__ */ jsx("summary", { children: faq.question }),
          /* @__PURE__ */ jsx("p", { children: faq.answer })
        ] }, faq.question)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "paint-contact", className: "paint-section paint-soft paint-split", "aria-labelledby": "paint-contact-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "paint-kicker", children: "Car polishing near you in Dubai" }),
          /* @__PURE__ */ jsx("h2", { id: "paint-contact-title", children: "Visit DIGI-TEC in Al Quoz" }),
          /* @__PURE__ */ jsxs("address", { children: [
            "DIGI-TEC Performance Center",
            /* @__PURE__ */ jsx("br", {}),
            "Al Quoz Industrial Area 3",
            /* @__PURE__ */ jsx("br", {}),
            "Dubai, UAE",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", "data-cta-placement": "paint_contact", children: "+971 4 340 2223" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Discuss the paint condition before visiting and confirm current opening hours and appointment availability. The team can advise on the appropriate next assessment." }),
          /* @__PURE__ */ jsxs("div", { className: "paint-actions", children: [
            /* @__PURE__ */ jsx(ContactLink, { placement: "contact" }),
            /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "paint_contact", className: "paint-button paint-secondary", children: [
              /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
              "Call the workshop"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "paint_location", className: "paint-link", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 18, "aria-hidden": "true" }),
            "View the workshop area"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "paint-note", children: [
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-dubai", children: "Explore paint-care options" }),
            " or ",
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "all workshop services" }),
            "."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsxs("nav", { className: "paint-mobile-contact", "aria-label": "Paint assessment contact shortcuts", children: [
      /* @__PURE__ */ jsxs("a", { href: PAINT_PHOTO_HREF, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "paint_mobile_photos", children: [
        /* @__PURE__ */ jsx(Camera, { size: 19, "aria-hidden": "true" }),
        "Send paint photos"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "paint_mobile_call", children: [
        /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
        "Call"
      ] })
    ] })
  ] });
}
export {
  PaintCorrectionPage as default
};
