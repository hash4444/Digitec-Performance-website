import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default, { useState, useRef, useEffect } from "react";
import { u as useLocale, L as LocalizedLink, m as mercedesEngineWorkshop, b as brands, s as services, e as englishOnlyServices, p as pageGraph, a as buildWebPage, c as buildFAQ, d as useSeo, f as businessRef } from "../entry-server.js";
import { a as allFaqs, F as FAQ } from "./FAQ-I3cfM1oW.js";
import { a as arHome, b as arServiceCards, c as arFaqCategories, H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { A as AnswerBlock } from "./AnswerBlock-DWkHPVA7.js";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { R as Reveal } from "./Reveal-B0bzMO-v.js";
import { W as WhyChooseUs } from "./WhyChooseUs-CG-0lMu_.js";
import { T as TrustBar } from "./TrustBar-D6jkMLGQ.js";
import { G as GoogleReviews } from "./GoogleReviews-CcWxYJRB.js";
import { F as FinalCTA } from "./FinalCTA-DCkhXNCr.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "./accordion-DINZxoib.js";
import "@radix-ui/react-accordion";
const Hero = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.hero : null;
  return /* @__PURE__ */ jsxs("section", { className: "theme-dark-section relative flex min-h-[100svh] items-center overflow-hidden border-b border-white/[0.08]", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "/images/seo/hero-1536.webp",
        srcSet: "/images/seo/hero-768.webp 768w, /images/seo/hero-1536.webp 1536w",
        sizes: "(max-width: 640px) 150vw, 100vw",
        width: "1536",
        height: "1024",
        alt: "",
        "aria-hidden": "true",
        fetchPriority: "high",
        decoding: "async",
        className: "absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,12,0.94)_0%,rgba(10,11,12,0.78)_42%,rgba(10,11,12,0.25)_76%,rgba(10,11,12,0.38)_100%)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#101113]/80 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto w-full max-w-[90rem] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[46rem]", children: [
      /* @__PURE__ */ jsx("p", { className: "home-kicker mb-6", children: (copy == null ? void 0 : copy.eyebrow) ?? "Established in 2002 · Al Quoz, Dubai" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(3rem,6.2vw,6.25rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white", children: [
        /* @__PURE__ */ jsxs("span", { className: "block", children: [
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
          "IGI-TEC"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "block text-[0.78em] sm:text-[0.72em]", children: (copy == null ? void 0 : copy.titleLine) ?? "Performance Center" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-7 max-w-xl text-xl font-medium tracking-[-0.025em] text-white/90 sm:text-2xl", children: (copy == null ? void 0 : copy.subtitle) ?? "Independent Car Workshop in Al Quoz, Dubai" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl text-[0.95rem] leading-7 text-white/60 sm:text-base", children: (copy == null ? void 0 : copy.description) ?? "Independent vehicle maintenance, diagnostics, repair, body work and performance-project support from Digi-Tec Performance Center in Al Quoz Industrial Area 3." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to book an appointment at Digi-Tec Performance Center.")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "home-button home-button-primary",
            children: [
              (copy == null ? void 0 : copy.book) ?? "Book Appointment",
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", className: "home-button home-button-secondary", children: isArabic ? "استكشف خدماتنا" : "Explore Services" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-7 right-8 z-10 hidden items-center gap-3 text-xs text-white/45 lg:flex", children: [
      /* @__PURE__ */ jsx("span", { children: "European & luxury vehicle workshop" }),
      /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-white/25", "aria-hidden": "true" })
    ] })
  ] });
};
const capabilities = [
  {
    title: "Performance Tuning",
    text: "ECU and supporting-hardware projects planned around the vehicle, fuel, intended use and current condition.",
    image: mercedesEngineWorkshop,
    alt: "Mercedes-AMG engine prepared for performance tuning at DIGI-TEC Dubai",
    href: "/tuning"
  },
  {
    title: "Aesthetic Enhancement",
    text: "Body, exterior and wheel projects assessed for fitment, condition and the owner’s requested specification.",
    image: "/lovable-uploads/brabus-g-class.png",
    alt: "Aesthetic Enhancement - Brabus G-Class",
    href: "/services/car-body-repair-dubai"
  },
  {
    title: "Precision Maintenance",
    text: "Scheduled maintenance and fault inspection for the mechanical, electrical, cooling, brake and comfort systems.",
    image: "/lovable-uploads/02e53b99-9978-4722-8945-bab63d4a4973.png",
    alt: "Precision Maintenance - Engine Oil Service",
    href: "/services/car-service-dubai"
  }
];
const WhatWeDo = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.expertise : null;
  return /* @__PURE__ */ jsx("section", { className: "home-section", children: /* @__PURE__ */ jsxs("div", { className: "home-container", children: [
    /* @__PURE__ */ jsxs(Reveal, { className: "mb-14 grid gap-5 lg:mb-20 lg:grid-cols-2 lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: (copy == null ? void 0 : copy.eyebrow) ?? "Our expertise" }),
        /* @__PURE__ */ jsx("h2", { className: "home-heading", children: (copy == null ? void 0 : copy.title) ?? "Care for every part of the vehicle." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "home-lead lg:justify-self-end", children: (copy == null ? void 0 : copy.description) ?? "Digi-Tec provides maintenance, diagnostics, mechanical and electrical repair, body work and vehicle-specific performance projects from its Al Quoz workshop." })
    ] }),
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: capabilities[0].href, className: "group grid overflow-hidden rounded-xl bg-[#171819] lg:grid-cols-[1.35fr_0.65fr]", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden lg:aspect-[16/9]", children: /* @__PURE__ */ jsx("img", { src: capabilities[0].image, alt: capabilities[0].alt, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between p-6 sm:p-9 lg:p-12", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-white/35", children: "01" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-16 lg:mt-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl", children: (copy == null ? void 0 : copy.cards[0].title) ?? capabilities[0].title }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-7 text-white/50", children: (copy == null ? void 0 : copy.cards[0].text) ?? capabilities[0].text }),
          /* @__PURE__ */ jsxs("span", { className: "mt-7 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-burnt-orange", children: [
            "Explore ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-6 md:grid-cols-2", children: capabilities.slice(1).map((item, itemIndex) => {
      const copyIndex = itemIndex + 1;
      return /* @__PURE__ */ jsx(Reveal, { delay: itemIndex * 0.08, children: /* @__PURE__ */ jsxs(LocalizedLink, { to: item.href, className: "group block", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden rounded-xl bg-[#171819]", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: item.alt, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[2rem_1fr] gap-4 border-b border-white/[0.08] py-6", children: [
          /* @__PURE__ */ jsxs("span", { className: "pt-1 text-xs text-white/30", children: [
            "0",
            copyIndex + 1
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl", children: (copy == null ? void 0 : copy.cards[copyIndex].title) ?? item.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-xl text-sm leading-6 text-white/45", children: (copy == null ? void 0 : copy.cards[copyIndex].text) ?? item.text })
          ] })
        ] })
      ] }) }, item.title);
    }) })
  ] }) });
};
const LIGHTEN_ON_DARK = /* @__PURE__ */ new Set(["Hummer", "Lincoln", "Maserati"]);
const BrandsWeServe = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.brands : null;
  return /* @__PURE__ */ jsx("section", { id: "brands", className: "border-y border-white/[0.08] bg-[#0c0d0e] py-20 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "home-container", children: [
    /* @__PURE__ */ jsxs(Reveal, { className: "grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: (copy == null ? void 0 : copy.eyebrow) ?? "Marque specialists" }),
        /* @__PURE__ */ jsx("h2", { className: "home-heading", children: (copy == null ? void 0 : copy.title) ?? "Brands we serve" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:justify-self-end", children: [
        /* @__PURE__ */ jsx("p", { className: "home-lead", children: (copy == null ? void 0 : copy.description) ?? "Precision service for the world's most prestigious automotive marques." }),
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/brands", className: "mt-5 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-burnt-orange", children: [
          (copy == null ? void 0 : copy.view) ?? "Explore all brands",
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "horizontal-scroll-container -mx-5 mt-14 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-12 lg:mt-20 lg:px-12", "aria-label": "Car brands serviced by Digi-Tec", children: /* @__PURE__ */ jsx("div", { className: "flex w-max items-center divide-x divide-white/[0.08] border-y border-white/[0.08]", children: brands.map((brand) => /* @__PURE__ */ jsx(
      LocalizedLink,
      {
        to: `/brands/${brand.slug}`,
        className: "group flex h-28 w-44 items-center justify-center px-7 transition-colors hover:bg-white/[0.025]",
        "aria-label": `${brand.name} service and repair in Dubai`,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: brand.logo,
            alt: `${brand.name} logo`,
            className: `brand-logo-image opacity-65 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 ${LIGHTEN_ON_DARK.has(brand.name) ? "brand-logo-monochrome" : ""}`,
            loading: "lazy",
            decoding: "async"
          }
        )
      },
      brand.slug
    )) }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-xs text-white/35", children: (copy == null ? void 0 : copy.note) ?? "Choose your marque to explore specialist service, repair and diagnostics in Dubai." })
  ] }) });
};
const categoryOrder = ["Core Mechanical Services", "Diagnostics & Electrical", "Comfort Systems", "Body & Visual Work"];
const ServiceGrid = () => {
  const { isArabic } = useLocale();
  const grouped = categoryOrder.map((title) => ({ title, services: [...services, ...isArabic ? [] : englishOnlyServices].filter((service) => service.category === title) }));
  const copy = isArabic ? arHome.services : null;
  return /* @__PURE__ */ jsx("section", { className: "home-section", children: /* @__PURE__ */ jsxs("div", { className: "home-container", children: [
    /* @__PURE__ */ jsxs(Reveal, { className: "mb-16 grid gap-6 lg:grid-cols-2 lg:items-end lg:mb-24", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: (copy == null ? void 0 : copy.eyebrow) ?? "Workshop services" }),
        /* @__PURE__ */ jsx("h2", { className: "home-heading max-w-2xl", children: (copy == null ? void 0 : copy.title) ?? "Complete care, clearly organised." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "home-lead lg:justify-self-end", children: (copy == null ? void 0 : copy.description) ?? "Maintenance, diagnostics and repair for the systems that keep your vehicle performing as intended." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-20 lg:space-y-28", children: grouped.map((category, categoryIndex) => /* @__PURE__ */ jsxs("section", { "aria-labelledby": `service-category-${categoryIndex}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-end justify-between gap-5 border-b border-white/[0.1] pb-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-burnt-orange", children: [
            "0",
            categoryIndex + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { id: `service-category-${categoryIndex}`, className: "text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl", children: (copy == null ? void 0 : copy.categories[category.title]) ?? category.title })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "hidden text-xs text-white/30 sm:block", children: [
          category.services.length,
          " services"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "horizontal-scroll-container -mx-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "flex w-max gap-5 sm:gap-7", children: category.services.map((service) => {
        var _a, _b;
        return /* @__PURE__ */ jsxs(
          LocalizedLink,
          {
            to: service.slug === "mercedes-repair-dubai" ? "/brands/mercedes-benz-service-dubai" : `/services/${service.slug}`,
            className: "group block w-[17rem] sm:w-[21rem]",
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-lg bg-[#18191a]", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: service.image,
                  alt: service.title,
                  loading: "lazy",
                  className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "pt-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold leading-snug tracking-[-0.015em] text-white transition-colors group-hover:text-burnt-orange sm:text-lg", children: isArabic ? ((_a = arServiceCards[service.slug]) == null ? void 0 : _a.title) ?? service.title : service.title }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: `mt-1 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-burnt-orange ${isArabic ? "rotate-180" : ""}` })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm leading-6 text-white/42", children: isArabic ? ((_b = arServiceCards[service.slug]) == null ? void 0 : _b.description) ?? service.description : service.description })
              ] })
            ]
          },
          service.slug
        );
      }) }) })
    ] }, category.title)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 border-t border-white/[0.1] pt-8 text-right", children: /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services", className: "inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-burnt-orange", children: [
      (copy == null ? void 0 : copy.viewAll) ?? "View all services",
      " ",
      /* @__PURE__ */ jsx(ArrowRight, { className: `h-4 w-4 ${isArabic ? "rotate-180" : ""}` })
    ] }) })
  ] }) });
};
const WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent(
  "Hi, I'd like to get in touch with Digi-Tec Performance Center."
)}`;
const TEL_HREF = "tel:+97143402223";
const MascotWidget = () => {
  const { isArabic } = useLocale();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const active = open || hovered;
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { ref: rootRef, className: `fixed bottom-4 sm:bottom-12 ${isArabic ? "left-0 items-start" : "right-0 items-end"} z-50 flex flex-col select-none`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex flex-col ${isArabic ? "items-start ml-1" : "items-end mr-1"} gap-2.5 mb-2 transition-all duration-200 ${active ? "pointer-events-auto" : "pointer-events-none opacity-0"}`,
        "aria-hidden": !active,
        children: active && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: isArabic ? `https://wa.me/97143402223?text=${encodeURIComponent("مرحباً، أود التواصل مع مركز ديجي-تك بيرفورمانس.")}` : WHATSAPP_HREF,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "mascot-option inline-flex items-center gap-2.5 bg-burnt-orange hover:bg-[#ff7d4d] text-black font-bold text-xs uppercase tracking-[0.12em] pl-4 pr-5 py-3 rounded-full shadow-[0_10px_28px_-10px_rgba(255,107,53,0.6)] transition-colors",
              style: { animationDelay: "0.05s" },
              onClick: () => setOpen(false),
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4" }),
                isArabic ? "راسلنا" : "Message Us"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: TEL_HREF,
              className: "mascot-option inline-flex items-center gap-2.5 bg-black/85 backdrop-blur-sm border border-white/20 hover:border-burnt-orange/70 text-off-white hover:text-burnt-orange font-bold text-xs uppercase tracking-[0.12em] pl-4 pr-5 py-3 rounded-full shadow-xl transition-all",
              style: { animationDelay: "0.12s" },
              onClick: () => setOpen(false),
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                isArabic ? "اتصل بنا" : "Call Us"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-label": open ? isArabic ? "إغلاق خيارات التواصل" : "Close contact options" : isArabic ? "تواصل مع ديجي-تك بالاتصال أو الرسائل" : "Contact Digi-Tec — call or message us",
        "aria-expanded": active,
        onClick: () => setOpen((v) => !v),
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        },
        onMouseMove: handleMove,
        className: `relative block outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange ${isArabic ? "rounded-r-3xl" : "rounded-l-3xl"} cursor-pointer`,
        style: { perspective: "600px" },
        children: [
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: `absolute top-5 sm:top-8 ${isArabic ? "left-10 sm:left-20" : "right-10 sm:right-20"} z-10 flex h-3.5 w-3.5 transition-opacity duration-300 ${active ? "opacity-0" : "opacity-100"}`,
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-burnt-orange opacity-60" }),
                /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-3.5 w-3.5 bg-burnt-orange border-2 border-black" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "mascot-bob-anim relative block h-24 w-32 overflow-hidden transition-transform duration-500 ease-out sm:h-40 sm:w-56",
              style: {
                animation: active ? "none" : "mascot-bob 3.2s ease-in-out infinite",
                transform: active ? `${isArabic ? "translateX(-16%)" : "translateX(16%)"} rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : isArabic ? "translateX(-42%)" : "translateX(42%)",
                transformStyle: "preserve-3d"
              },
              children: imgOk ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/seo/mascot-256.webp",
                    width: "256",
                    height: "256",
                    decoding: "async",
                    fetchPriority: "low",
                    alt: "",
                    draggable: false,
                    onError: () => setImgOk(false),
                    className: `absolute inset-0 w-full h-auto origin-top scale-[1.18] drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)] transition-all duration-300 ${active ? "opacity-0" : "opacity-100"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/seo/mascot-wave-256.webp",
                    width: "256",
                    height: "256",
                    decoding: "async",
                    fetchPriority: "low",
                    alt: "",
                    draggable: false,
                    onError: () => setImgOk(false),
                    className: `absolute inset-0 w-full h-auto origin-top scale-[1.18] drop-shadow-[0_8px_24px_rgba(255,107,53,0.18)] transition-opacity duration-300 ${active ? "mascot-greet-anim opacity-100" : "opacity-0"}`
                  }
                )
              ] }) : (
                /* Fallback avatar until /images/mascot.png is added */
                /* @__PURE__ */ jsx("span", { className: "mb-3 mr-1 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black border border-burnt-orange/50 shadow-[0_10px_28px_-10px_rgba(255,107,53,0.5)] flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-burnt-orange font-black text-2xl sm:text-3xl italic", children: "D" }) })
              )
            }
          )
        ]
      }
    )
  ] }) });
};
const Index = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? "/ar" : "/"}`;
  const displayedFaqs = isArabic ? arFaqCategories.flatMap((category) => category.faqs) : allFaqs;
  const homeGraph = React__default.useMemo(
    () => pageGraph([
      buildWebPage({
        url,
        name: isArabic ? "ديجي-تك — ورشة سيارات مستقلة في دبي" : "Digi-Tec Performance Center — Independent Car Workshop Dubai",
        description: isArabic ? "ورشة سيارات مستقلة في دبي تأسست عام 2002، وتعرض خدمات الفحص والصيانة والإصلاح والبرمجة وأعمال الهيكل واستشارات مشاريع الأداء." : "Independent Dubai car workshop established in 2002, with vehicle inspection, maintenance, repair, programming, bodywork and performance-project consultation services.",
        type: "WebPage",
        primaryImage: "https://digitecme.com/images/seo/hero-1536.webp",
        mainEntityId: businessRef["@id"]
      }),
      {
        "@type": "ItemList",
        "@id": `${url}#coreServices`,
        name: isArabic ? "الخدمات الأساسية" : "Core capabilities",
        itemListElement: (isArabic ? [
          "إصلاح السيارات الفاخرة",
          "تطوير الأداء",
          "فحص وخدمة سيارات مرسيدس-بنز",
          "تشخيص وبرمجة السيارات",
          "ورشة سيارات في دبي"
        ] : [
          "Luxury Vehicle Repair",
          "Performance Tuning",
          "Mercedes-Benz Inspection and Service",
          "Vehicle Diagnostics and Programming",
          "Dubai Automotive Workshop"
        ]).map((n, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: n
        }))
      },
      ...displayedFaqs.length > 0 ? [buildFAQ(url, displayedFaqs)] : []
    ]),
    [displayedFaqs, isArabic, url]
  );
  useSeo({
    title: isArabic ? "ديجي-تك | ورشة سيارات مستقلة في دبي منذ 2002" : "Digi-Tec Performance Center | Independent Car Workshop Dubai",
    description: isArabic ? "ورشة سيارات مستقلة في القوز بدبي منذ 2002 لخدمات الفحص والصيانة والإصلاح والبرمجة وأعمال الهيكل واستشارات مشاريع الأداء." : "Independent car workshop in Al Quoz, Dubai since 2002 for inspection, maintenance, repair, programming, bodywork and performance-project consultation. Call +971 4 340 2223.",
    canonical: url,
    jsonLd: homeGraph
  });
  return /* @__PURE__ */ jsxs("div", { className: "home-premium min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { id: "main-content", children: [
      /* @__PURE__ */ jsx("div", { id: "home", children: /* @__PURE__ */ jsx(Hero, {}) }),
      /* @__PURE__ */ jsx(TrustBar, {}),
      /* @__PURE__ */ jsx(WhatWeDo, {}),
      /* @__PURE__ */ jsx(BrandsWeServe, {}),
      /* @__PURE__ */ jsx("div", { id: "services", children: /* @__PURE__ */ jsx(ServiceGrid, {}) }),
      /* @__PURE__ */ jsx("div", { id: "about", children: /* @__PURE__ */ jsx(WhyChooseUs, {}) }),
      /* @__PURE__ */ jsx(GoogleReviews, {}),
      /* @__PURE__ */ jsx(
        AnswerBlock,
        {
          question: isArabic ? "ما هو مركز ديجي-تك بيرفورمانس؟" : "What is Digi-Tec Performance Centre?",
          answer: isArabic ? "مركز ديجي-تك بيرفورمانس ورشة سيارات مستقلة في دبي، تأسست عام 2002 وتقع في القوز الصناعية 3. تشمل فئات الخدمة المعروضة الصيانة الدورية وفحص السيارة وتشخيص الأعطال والإصلاحات الميكانيكية والكهربائية وخدمات المحرك وناقل الحركة والتعليق والتبريد والفرامل وبرمجة الوحدات وأعمال الهيكل والطلاء والعناية بالسيارة واستشارات مشاريع الأداء. يمكن مناقشة السيارة والأعراض والعمل المطلوب قبل الاتفاق على نطاق الإصلاح. للاتصال أو واتساب: +971 4 340 2223." : "Digi-Tec Performance Centre is an independent car workshop in Dubai, established in 2002 and located in Al Quoz Industrial Area 3. Listed service categories include scheduled maintenance, vehicle inspection and diagnostics, mechanical and electrical repair, engine, transmission, suspension, cooling and brake work, module programming, body repair, paintwork, detailing and performance-project consultation. Owners can discuss the vehicle, symptoms and requested work before agreeing the repair scope. Call or WhatsApp +971 4 340 2223.",
          facts: isArabic ? [
            "تأسست في دبي منذ عام 2002",
            "فحص وخدمة سيارات مرسيدس-بنز والسيارات الأوروبية والفاخرة",
            "تشخيص وإصلاح الأعطال الميكانيكية والكهربائية",
            "خدمات المحرك وناقل الحركة والتعليق والتبريد والفرامل",
            "تشخيص وبرمجة وترميز وحدة التحكم الإلكترونية والوحدات الإلكترية",
            "إصلاح الهيكل ودهان السيارة وترميم السيارات",
            "استشارات مشاريع الأداء بحسب السيارة والاستخدام المطلوب",
            "شرح نتائج الفحص والعمل المقترح قبل بدء الإصلاح",
            "الموقع: القوز الصناعية 3، دبي",
            "الهاتف والواتساب: +971 4 340 2223"
          ] : [
            "Established in Dubai since 2002",
            "Inspection and service for Mercedes-Benz, European and luxury vehicles",
            "Mechanical and electrical fault diagnosis and repair",
            "Engine, transmission, suspension, cooling and braking system services",
            "ECU and electronic module diagnostics, coding and programming",
            "Body repair, paintwork and vehicle restoration",
            "Vehicle-specific performance-project consultation",
            "Inspection findings and recommended work explained before repairs begin",
            "Al Quoz Industrial Area 3, Dubai",
            "Call or WhatsApp +971 4 340 2223"
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { id: "faq", children: /* @__PURE__ */ jsx(FAQ, {}) }),
      /* @__PURE__ */ jsx(FinalCTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(MascotWidget, {})
  ] });
};
export {
  Index as default
};
