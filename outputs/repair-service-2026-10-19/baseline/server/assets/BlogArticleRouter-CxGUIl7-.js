import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useParams, Navigate } from "react-router-dom";
import React__default from "react";
import { u as useLocale, ae as getBlogPostBySlug, g as buildBreadcrumb, a as buildWebPage, af as buildArticle, c as buildFAQ, p as pageGraph, d as useSeo, ag as MERCEDES_UNTRANSLATED_MODEL_PATHS, ab as blogPosts, L as LocalizedLink, ah as getBrandWorkshopArticle, S as SITE_URL, ai as mercedesMaintenanceGuide, aj as MERCEDES_MAINTENANCE_UPDATED, h as buildService, t as tuningCars, ak as porscheOwnershipGuides, al as PORSCHE_GUIDES_PATH, am as PORSCHE_GUIDES_PARENT_PATH, an as PORSCHE_HUB_PATH, ao as porscheModelNavigation, ap as getPorscheModelByLegacyBlogSlug, aq as getMercedesModelByLegacyBlogSlug } from "../entry-server.js";
import { motion } from "framer-motion";
import { ArrowLeft, User, Calendar, Clock, MessageCircle, Phone, ArrowRight, Wrench, CheckCircle2, MapPin, BookOpen } from "lucide-react";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { F as FinalCTA } from "./FinalCTA-DCkhXNCr.js";
import { a as localizeBlogPostToArabic, l as localizePostSummaryToArabic, c as categoryArabic, b as localizeBrandWorkshopArticleToArabic } from "./ar-blog--9StxQEy.js";
import { C as CtaAssurance } from "./TrustBar-D6jkMLGQ.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-DINZxoib.js";
import MercedesModelPage from "./MercedesModelPage-DVS_MErC.js";
import PorscheModelPage from "./PorscheModelPage-CBF9W44-.js";
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
import "./Reveal-B0bzMO-v.js";
import "@radix-ui/react-accordion";
const genericWords = /* @__PURE__ */ new Set(["a", "an", "and", "are", "at", "before", "best", "car", "cars", "complete", "dubai", "for", "guide", "how", "in", "is", "it", "of", "or", "owner", "owners", "service", "the", "to", "uae", "what", "with", "your"]);
const topicWords = (title) => new Set(title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word && !genericWords.has(word)));
const getRelatedArticles = (article, candidates, limit = 2) => {
  const words = topicWords(article.title);
  const ranked = candidates.filter((candidate) => candidate.slug !== article.slug).map((candidate, index) => ({
    candidate,
    index,
    score: [...topicWords(candidate.title)].filter((word) => words.has(word)).length * 4 + Number(candidate.category === article.category)
  })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.index - b.index);
  const topicalMatches = ranked.filter(({ score }) => score >= 4);
  return (topicalMatches.length ? topicalMatches : ranked).slice(0, limit).map(({ candidate }) => candidate);
};
const mercedesArabicLinkedArticles = /* @__PURE__ */ new Set([
  "mercedes-c-class-service-dubai-guide",
  "mercedes-e-class-service-dubai-guide",
  "mercedes-s-class-service-dubai-guide",
  "mercedes-g63-service-dubai-guide",
  "best-oil-change-dubai-mercedes",
  "mercedes-service-intervals-dubai-heat",
  "mercedes-service-cost-dubai-guide",
  "mercedes-repair-dubai-complete-guide",
  "mercedes-amg-gt-tuning-dubai"
]);
const getArticleFaqs = (content2) => {
  const faqs = [];
  let inFaqSection = false;
  content2.forEach((block, index) => {
    if (block.type === "h2") {
      inFaqSection = /\bfaqs?\b/i.test(block.text ?? "") || /الأسئلة الشائعة/.test(block.text ?? "");
      return;
    }
    if (!inFaqSection || block.type !== "h3" || !block.text) return;
    const answer = content2[index + 1];
    if ((answer == null ? void 0 : answer.type) === "p" && answer.text) {
      faqs.push({ question: block.text, answer: answer.text });
    }
  });
  return faqs;
};
const relatedServiceByPost = {
  "aston-martin-db11-service-dubai-guide": { href: "/brands/aston-martin-service-dubai", label: "Aston Martin service and repair in Dubai", description: "Discuss your model, maintenance or repair concern with the Al Quoz workshop." },
  "how-much-is-my-mercedes-worth-dubai": {
    href: "/brands/mercedes-benz-service-dubai",
    label: "Mercedes valuation and sale support in Dubai",
    description: "Ask Digi-Tec to inspect, value, prepare and help sell your Mercedes through an agreed, transparent process."
  },
  "best-oil-change-dubai-mercedes": {
    href: "/services/mercedes-oil-change-dubai",
    label: "Mercedes oil change in Dubai",
    description: "Confirm the engine-specific oil, filter, agreed checks and service records before booking in Al Quoz."
  },
  "car-ac-repair-dubai": {
    href: "/services/car-ac-repair-dubai",
    label: "Car AC repair in Dubai",
    description: "Book a diagnostic for weak cooling, leaks, compressor concerns, or inconsistent cabin temperature."
  },
  "brake-repair-dubai": {
    href: "/services/brake-repair-dubai",
    label: "Brake repair in Dubai",
    description: "Arrange a brake inspection for noise, vibration, warning lights, or reduced stopping confidence."
  },
  "car-battery-replacement-dubai": {
    href: "/services/battery-replacement-dubai",
    label: "Car battery testing and replacement",
    description: "Get a professional battery health check before replacing a weak or unreliable battery."
  },
  "best-car-workshop-dubai": {
    href: "/best-car-workshop-dubai",
    label: "car workshop services in Dubai",
    description: "See the workshop overview, service scope, and direct ways to contact Digi-Tec in Al Quoz."
  },
  "mercedes-repair-dubai-complete-guide": {
    href: "/mercedes/problems",
    label: "Mercedes problem and diagnostic guides",
    description: "Continue from this broad ownership overview into focused AIRMATIC, transmission, cooling, AC, oil-leak, no-start and battery-warning guides."
  },
  "range-rover-land-rover-air-suspension-problems-dubai": {
    href: "/services/suspension-repair-dubai",
    label: "Range Rover and Land Rover suspension repair in Dubai",
    description: "Book a suspension inspection for a leaning vehicle, Suspension Fault warning, slow lifting or compressor concerns."
  },
  "best-defender-workshop-dubai": {
    href: "/brands/defender-service-dubai",
    label: "Defender service in Dubai",
    description: "Arrange a Defender inspection for accident damage, warning lights, diagnostics, bodywork or ongoing maintenance."
  },
  "g63-to-brabus-g800-conversion-dubai": {
    href: "/blog/mercedes-g63-service-dubai-guide",
    label: "Mercedes-AMG G63 model service guide",
    description: "Review G63 generation, V8, transmission, chassis, cooling and diagnostic considerations before arranging an inspection."
  },
  "mercedes-amg-gt-black-series-1300hp-build-dubai": {
    href: "/tuning",
    label: "Mercedes-AMG performance tuning in Dubai",
    description: "Discuss a custom AMG build, ECU calibration or performance-project inspection with Digi-Tec in Al Quoz."
  },
  "air-suspension-repair-dubai-guide": {
    href: "/services/suspension-repair-dubai",
    label: "Suspension assessment and repair",
    description: "Confirm the fitted system and agree an assessment for a ride-height, levelling or ride-quality concern."
  },
  "transmission-service-7g-9g-dubai": {
    href: "/services/transmission-repair-dubai",
    label: "Transmission service and fault assessment",
    description: "Identify the gearbox and separate scheduled fluid service from the investigation of a shift fault."
  },
  "check-engine-light-dubai-guide": {
    href: "/services/car-diagnostics-dubai",
    label: "vehicle diagnostic assessment",
    description: "Describe the warning and driving symptoms so the appropriate diagnostic checks can be agreed."
  },
  "engine-overheating-dubai-what-to-do": {
    href: "/services/mechanical-repair-dubai",
    label: "cooling-system and mechanical assessment",
    description: "Discuss the temperature warning, fluid loss and safe transport before arranging inspection."
  },
  "car-ac-not-cold-dubai-causes": {
    href: "/services/car-ac-repair-dubai",
    label: "AC fault assessment",
    description: "Explain when cooling or airflow changes and arrange the relevant AC inspection."
  },
  "car-battery-life-dubai-heat": {
    href: "/services/auto-electrical-repair-dubai",
    label: "battery-drain and electrical fault assessment",
    description: "Describe the starting behaviour, parking duration and any charging warning before deciding on replacement."
  },
  "ferrari-488-service-dubai-guide": {
    href: "/brands/ferrari-service-dubai/488",
    label: "Ferrari 488 model service information",
    description: "Continue to the model page for 488 powertrain, seven-speed dual-clutch, SCM-E, brake, diagnostic and Dubai ownership considerations."
  },
  "rolls-royce-ghost-service-dubai-guide": {
    href: "/brands/rolls-royce-service-dubai",
    label: "Rolls-Royce service and repair in Dubai",
    description: "Continue to the Rolls-Royce hub for maintenance, diagnostics, suspension, transmission and vehicle-specific repair enquiries in Al Quoz."
  }
};
const arabicRelatedServiceByPost = {
  "air-suspension-repair-dubai-guide": { href: "/services/suspension-repair-dubai", label: "فحص وإصلاح التعليق حسب السيارة" },
  "check-engine-light-dubai-guide": { href: "/services/car-diagnostics-dubai", label: "فحص وتشخيص السيارة" },
  "engine-overheating-dubai-what-to-do": { href: "/services/mechanical-repair-dubai", label: "فحص التبريد والأجزاء الميكانيكية" },
  "car-ac-not-cold-dubai-causes": { href: "/services/car-ac-repair-dubai", label: "فحص وإصلاح مكيف السيارة" },
  "ferrari-488-service-dubai-guide": { href: "/brands/ferrari-service-dubai", label: "خدمات صيانة وإصلاح فيراري" },
  "mercedes-repair-dubai-complete-guide": { href: "/brands/mercedes-benz-service-dubai", label: "خدمات صيانة وإصلاح مرسيدس" },
  "transmission-service-7g-9g-dubai": { href: "/services/transmission-repair-dubai", label: "خدمة وفحص ناقل الحركة حسب السيارة" }
};
const BlogPost = () => {
  const { isArabic, localizedPath } = useLocale();
  const { slug } = useParams();
  const sourcePost = slug ? getBlogPostBySlug(slug) : void 0;
  const post = sourcePost && isArabic ? localizeBlogPostToArabic(sourcePost) : sourcePost;
  const articleJsonLd = React__default.useMemo(() => {
    if (!post) return void 0;
    const url = `https://digitecme.com${isArabic ? "/ar" : ""}/blog/${post.slug}`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
      { name: isArabic ? "المقالات" : "Blog", url: `https://digitecme.com${isArabic ? "/ar" : ""}/blog` },
      { name: post.title, url }
    ]);
    const webPage = buildWebPage({
      url,
      name: post.metaTitle,
      description: post.metaDescription,
      type: "ItemPage",
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: post.coverImage,
      datePublished: post.date,
      dateModified: post.updatedDate,
      mainEntityId: `${url}#article`
    });
    const article = buildArticle({
      url,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updatedDate,
      author: post.author,
      authorType: "Organization",
      image: post.coverImage,
      section: post.category,
      keywords: post.keywords
    });
    const faq = buildFAQ(url, getArticleFaqs(post.content));
    return pageGraph([webPage, breadcrumb, article, ...faq ? [faq] : []]);
  }, [isArabic, post]);
  useSeo({
    title: (post == null ? void 0 : post.metaTitle) || "Blog | Digitec Performance Center",
    description: (post == null ? void 0 : post.metaDescription) || "Digitec Performance Center blog.",
    keywords: post == null ? void 0 : post.keywords,
    ogTitle: post == null ? void 0 : post.ogTitle,
    ogDescription: post == null ? void 0 : post.ogDescription,
    ogType: post == null ? void 0 : post.ogType,
    twitterCard: post == null ? void 0 : post.twitterCard,
    twitterTitle: post == null ? void 0 : post.twitterTitle,
    twitterDescription: post == null ? void 0 : post.twitterDescription,
    canonical: post ? `https://digitecme.com${isArabic ? "/ar" : ""}/blog/${post.slug}` : `https://digitecme.com${isArabic ? "/ar" : ""}/blog`,
    jsonLd: articleJsonLd,
    noindex: isArabic && Boolean(post && MERCEDES_UNTRANSLATED_MODEL_PATHS.has(`/blog/${post.slug}`))
  });
  if (!post) return /* @__PURE__ */ jsx(Navigate, { to: localizedPath("/blog"), replace: true });
  const mercedesGuideRelated = /* @__PURE__ */ new Set(["best-oil-change-dubai-mercedes", "mercedes-service-intervals-dubai-heat", "mercedes-service-cost-dubai-guide", "mercedes-repair-dubai-complete-guide"]);
  const related = getRelatedArticles(sourcePost ?? post, blogPosts.filter(
    (item) => (!isArabic || !MERCEDES_UNTRANSLATED_MODEL_PATHS.has(`/blog/${item.slug}`)) && (!mercedesGuideRelated.has(post.slug) || item.slug !== "how-much-is-my-mercedes-worth-dubai")
  )).map((item) => isArabic ? localizePostSummaryToArabic(item) : item);
  const articleSections = post.content.flatMap((block, index) => block.type === "h2" && block.text ? [{ title: block.text, id: `article-section-${index + 1}` }] : []);
  const relatedService = relatedServiceByPost[post.slug];
  const relatedServiceCopy = relatedService && isArabic ? {
    ...relatedService,
    label: "الخدمة المرتبطة بهذا الموضوع",
    description: "احجز فحصاً متخصصاً لدى فريق ديجي-تك في القوز لتحديد السبب والحصول على توصية واضحة قبل بدء الإصلاح.",
    ...arabicRelatedServiceByPost[post.slug]
  } : relatedService;
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden border-b border-white/[0.08] bg-[#101113] py-16 sm:py-20 lg:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
        /* @__PURE__ */ jsxs(
          LocalizedLink,
          {
            to: "/blog",
            className: "mb-8 inline-flex items-center gap-2 text-sm text-white/48 transition-colors hover:text-burnt-orange",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: `w-4 h-4 ${isArabic ? "rotate-180" : ""}` }),
              isArabic ? "العودة إلى المقالات" : "Back to journal"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            className: "home-kicker mb-5 block",
            children: isArabic ? categoryArabic[post.category] ?? post.category : post.category
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "mb-7 max-w-4xl text-[clamp(2.65rem,5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.045em]",
            children: post.title
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-5 text-sm text-white/45", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
            post.author
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
            new Date(post.date).toLocaleDateString(isArabic ? "ar-AE" : "en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC"
            })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
            post.readTime
          ] }),
          post.updatedDate && /* @__PURE__ */ jsxs("span", { children: [
            isArabic ? "تحديث: " : "Updated: ",
            post.updatedDate
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-5 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 leading-relaxed mb-10 font-light italic border-l-2 border-burnt-orange pl-5", children: post.excerpt }),
        post.coverImage && /* @__PURE__ */ jsxs("figure", { className: "mb-10 overflow-hidden rounded-2xl border border-white/10 bg-charcoal", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: post.coverImage,
              alt: post.title,
              className: "h-[28rem] w-full object-cover object-center sm:h-[34rem]",
              loading: "eager"
            }
          ),
          /* @__PURE__ */ jsx("figcaption", { className: "px-4 py-3 text-sm text-white/55", children: post.title })
        ] }),
        post.video && /* @__PURE__ */ jsxs("figure", { className: "mb-10 overflow-hidden rounded-2xl border border-white/10 bg-charcoal", children: [
          /* @__PURE__ */ jsxs(
            "video",
            {
              className: "max-h-[38rem] w-full bg-black object-contain",
              controls: true,
              preload: "metadata",
              poster: post.video.poster,
              children: [
                /* @__PURE__ */ jsx("source", { src: post.video.src, type: "video/quicktime" }),
                isArabic ? "المتصفح لا يدعم تشغيل هذا الفيديو." : "Your browser does not support this video."
              ]
            }
          ),
          /* @__PURE__ */ jsx("figcaption", { className: "px-4 py-3 text-sm text-white/55", children: post.video.caption })
        ] }),
        post.gallery && post.gallery.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mb-10", "aria-label": isArabic ? "صور دراسة حالة من الورشة" : "Workshop case study gallery", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-burnt-orange text-xs font-bold uppercase tracking-wider", children: isArabic ? "حالة عمل حقيقية من الورشة" : "Real workshop case study" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2", children: post.gallery.map((image) => /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-2xl border border-white/10 bg-charcoal", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: image.src,
                alt: image.alt,
                className: "aspect-[4/5] w-full object-cover object-center",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx("figcaption", { className: "px-4 py-3 text-sm leading-relaxed text-white/55", children: image.caption })
          ] }, image.src)) })
        ] }),
        articleSections.length >= 3 && /* @__PURE__ */ jsxs("nav", { "aria-label": isArabic ? "في هذا المقال" : "In this article", className: "mb-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-3 font-semibold", children: isArabic ? "في هذا المقال" : "In this article" }),
          /* @__PURE__ */ jsx("ol", { className: "grid gap-3 text-sm leading-relaxed sm:grid-cols-2", children: articleSections.map((section) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `#${section.id}`, className: "text-white/70 underline decoration-white/20 underline-offset-4 hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange", children: section.title }) }, section.id)) })
        ] }),
        /* @__PURE__ */ jsx("article", { className: "space-y-6", children: post.content.map((block, i) => {
          var _a, _b;
          if (block.type === "h2")
            return /* @__PURE__ */ jsx("h2", { id: `article-section-${i + 1}`, className: "scroll-mt-28 text-2xl sm:text-3xl font-black mt-10 mb-2", children: block.text }, i);
          if (block.type === "h3")
            return /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-6", children: block.text }, i);
          if (block.type === "ul")
            return /* @__PURE__ */ jsx("ul", { className: "space-y-2 pl-1", children: (_a = block.items) == null ? void 0 : _a.map((it, j) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-white/70 leading-relaxed", children: [
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange mt-1.5", children: "▸" }),
              /* @__PURE__ */ jsx("span", { children: it })
            ] }, j)) }, i);
          return /* @__PURE__ */ jsxs("p", { className: "text-white/70 leading-relaxed text-base", children: [
            block.text,
            (!isArabic || mercedesArabicLinkedArticles.has(post.slug) || ["ceramic-coating-vs-ppf-dubai", "why-ceramic-coating-matters-uae"].includes(post.slug)) && ((_b = block.links) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsx("span", { className: "mt-3 flex flex-wrap gap-x-5 gap-y-2", children: block.links.map((link) => /* @__PURE__ */ jsx(LocalizedLink, { to: link.href, className: "text-burnt-orange underline", children: link.label }, link.href)) }) : null
          ] }, i);
        }) })
      ] }) }),
      relatedServiceCopy && /* @__PURE__ */ jsx("section", { className: "pb-12 md:pb-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto px-5 sm:px-6", children: /* @__PURE__ */ jsxs("aside", { className: "border border-burnt-orange/30 bg-burnt-orange/10 p-5 sm:p-6", "aria-label": isArabic ? "خدمة ذات صلة" : "Related service", children: [
        /* @__PURE__ */ jsx("p", { className: "text-burnt-orange text-xs font-bold uppercase tracking-wider mb-2", children: isArabic ? "خدمة ذات صلة" : "Related service" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-black mb-2", children: isArabic ? "هل تحتاج إلى فحص متخصص؟" : `Need ${relatedServiceCopy.label}?` }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 leading-relaxed mb-4", children: relatedServiceCopy.description }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: relatedServiceCopy.href, className: "btn-primary inline-flex", children: isArabic ? "استكشف الخدمة واحجز موعداً" : `Explore ${relatedServiceCopy.label}` })
      ] }) }) }),
      related.length > 0 && /* @__PURE__ */ jsx("section", { className: "pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-5 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black mb-8", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "تابع ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "القراءة" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Continue ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "reading" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: related.map((p) => /* @__PURE__ */ jsxs(
          LocalizedLink,
          {
            to: `/blog/${p.slug}`,
            className: "card-premium group rounded-2xl p-6 transition-all",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-wider", children: isArabic ? categoryArabic[p.category] ?? p.category : p.category }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mt-2 mb-2 group-hover:text-burnt-orange transition-colors", children: p.title }),
              /* @__PURE__ */ jsx("p", { className: "text-white/50 text-sm line-clamp-2", children: p.excerpt })
            ]
          },
          p.slug
        )) })
      ] }) }),
      /* @__PURE__ */ jsx(FinalCTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const content = {
  "Rolls-Royce": {
    lead: {
      en: "Start by identifying the exact Rolls-Royce and the task. A Ghost ride-height warning, a Cullinan cabin-cooling concern and a Spectre charging question do not call for the same equipment or service procedure. Ask the workshop to confirm what it can inspect on that vehicle before arranging work.",
      ar: "ابدأ بتحديد طراز رولز رويس والمهمة المطلوبة. تحذير ارتفاع سيارة Ghost، ومشكلة تبريد مقصورة Cullinan، واستفسار شحن Spectre ليست أعمالاً متشابهة. اطلب من الورشة تأكيد الفحوص التي تستطيع تنفيذها على السيارة المحددة قبل ترتيب العمل."
    },
    service: "/brands/rolls-royce-service-dubai",
    serviceLabel: { en: "Rolls-Royce service options", ar: "خدمات رولز رويس" },
    sections: [
      { title: { en: "Identify the model and fitted system", ar: "تحديد الطراز والنظام المركب" }, paragraphs: [
        { en: "For Ghost, Phantom, Cullinan, Wraith or Dawn, give the year, VIN when requested, warning text and service history. Suspension, transmission and comfort-system equipment varies by generation; a workshop should not quote a strut, module or gearbox procedure from the badge alone.", ar: "في Ghost أو Phantom أو Cullinan أو Wraith أو Dawn، أرسل السنة ورقم الهيكل عند الطلب ونص التحذير وسجل الصيانة. تختلف أنظمة التعليق وناقل الحركة والراحة حسب الجيل، فلا يصح تسعير دعامة أو وحدة إلكترونية أو إجراء لناقل الحركة اعتماداً على الشعار وحده." },
        { en: "Spectre is fully electric. Confirm a separate, verified EV work scope before booking; a combustion-engine oil or exhaust service is not a Spectre maintenance task. An independent workshop should be clear about any high-voltage work it cannot accept.", ar: "سيارة Spectre كهربائية بالكامل. تأكد من نطاق العمل الكهربائي المثبت قبل الحجز؛ تغيير زيت محرك الاحتراق أو إصلاح العادم ليس من صيانتها. يجب أن توضح الورشة المستقلة أي عمل جهد عالٍ لا يمكنها قبوله." }
      ] },
      { title: { en: "Ask how a ride or warning concern will be tested", ar: "اسأل عن طريقة فحص التعليق والتحذيرات" }, paragraphs: [
        { en: "If the car sits unevenly, record whether it drops after parking, only on one side or after a drive. The first assessment may need visible leak checks and supported height, pressure or fault information. Leaning does not by itself prove a failed air strut.", ar: "إذا انخفضت السيارة أو مالت، دوّن ما إذا حدث ذلك بعد الوقوف أو في جهة واحدة أو بعد القيادة. قد يحتاج الفحص الأول إلى مراجعة التسربات المرئية ومعلومات الارتفاع أو الضغط أو الأعطال المتاحة. الميل وحده لا يثبت تلف الدعامة الهوائية." },
        { en: "For engine, gearbox or low-voltage warnings on combustion models, ask which data and physical checks are available for the exact vehicle. A stored code or change in shift feel is evidence to investigate, not approval to replace a major component.", ar: "لتحذيرات المحرك أو الناقل أو البطارية منخفضة الجهد في طرازات الاحتراق، اسأل عن البيانات والاختبارات الفعلية المتاحة للسيارة. رمز العطل أو تغير سلوك النقل دليل يحتاج إلى فحص، لا موافقة تلقائية على استبدال مكوّن كبير." }
      ] },
      { title: { en: "Compare the estimate and maintenance plan", ar: "قارن عرض السعر وخطة الصيانة" }, paragraphs: [
        { en: "Ask for the initial inspection, parts specification, supported functions and any further specialist work to be itemised. The maintenance plan should use the exact model, year, history and use rather than one mileage interval or fluid recommendation for the whole marque.", ar: "اطلب تفصيل الفحص الأول ومواصفات القطع والوظائف المتاحة وأي عمل متخصص إضافي. يجب أن تعتمد خطة الصيانة على الطراز والسنة والسجل والاستخدام، لا على مسافة أو توصية سوائل واحدة لجميع سيارات العلامة." },
        { en: "DIGI-TEC is an independent Al Quoz workshop. Send the concern and vehicle details so it can confirm an appropriate first inspection and accepted work scope; no manufacturer-authorised status or universal diagnostic access is implied.", ar: "ديجي-تك ورشة مستقلة في القوز. أرسل المشكلة وبيانات السيارة حتى يؤكد الفريق الفحص الأول المناسب ونطاق العمل المقبول، من دون الإيحاء باعتماد الشركة المصنعة أو وصول تشخيصي شامل." }
      ] }
    ]
  },
  Bentley: {
    lead: {
      en: "A useful Bentley workshop comparison begins with the vehicle, not a luxury-car slogan. Continental GT, Bentayga and Flying Spur can differ in powertrain, suspension, display and camera equipment. Share the year, VIN when needed, fitted options and the symptom before asking for a repair estimate.",
      ar: "تبدأ مقارنة ورش بنتلي من السيارة نفسها لا من وصف عام للفخامة. قد تختلف Continental GT وBentayga وFlying Spur في المحرك والتعليق والشاشة وتجهيز الكاميرا. أرسل السنة ورقم الهيكل عند الحاجة والتجهيزات والأعراض قبل طلب تقدير الإصلاح."
    },
    service: "/brands/bentley-service-dubai",
    serviceLabel: { en: "Bentley service options", ar: "خدمات بنتلي" },
    sections: [
      { title: { en: "Separate a camera fault from a new installation", ar: "افصل بين عطل الكاميرا وتركيب كاميرا جديدة" }, paragraphs: [
        { en: "For a blank or intermittent reversing image, explain when the screen switches, whether parking sensors still work and whether the system is original or modified. Camera power, wiring, interface and display can produce similar symptoms; replacing the camera without testing can miss the cause.", ar: "عند غياب صورة الرجوع أو تقطعها، اشرح متى تنتقل الشاشة وهل ما زالت حساسات الوقوف تعمل وهل النظام أصلي أم معدل. قد تتشابه أعراض خلل التغذية أو الأسلاك أو الواجهة أو الشاشة مع عطل الكاميرا؛ والاستبدال قبل الاختبار قد لا يعالج السبب." },
        { en: "Adding a camera is a different request. Confirm screen compatibility, mounting, wiring, integration and any retained parking functions before agreeing to installation. The Bentley electrical page keeps these two tasks separate.", ar: "تركيب كاميرا جديدة طلب مختلف. يجب تأكيد توافق الشاشة والتثبيت والأسلاك والتكامل ووظائف الوقوف التي ستبقى قبل الموافقة. تفصل صفحة كهرباء بنتلي بين مهمتي الإصلاح والتركيب." }
      ] },
      { title: { en: "Check the fitted drivetrain and chassis", ar: "تحقق من المحرك والناقل والتعليق المركب" }, paragraphs: [
        { en: "A gearbox warning or shift change should be assessed against the exact transmission and model year. The same applies to ride-height warnings: the workshop should identify fitted air suspension, damping and related electrical equipment before proposing a part or calibration.", ar: "يجب فحص تحذير ناقل الحركة أو تغير النقل وفق نوع الناقل وسنة السيارة. وينطبق الأمر على تحذيرات ارتفاع السيارة: حدد التعليق الهوائي والتخميد والتجهيزات الكهربائية المركبة قبل اقتراح قطعة أو معايرة." },
        { en: "Current Continental GT information describes a hybrid powertrain, but older generations are not identical. Do not transfer a current model’s architecture, maintenance procedure or high-voltage requirement to every Continental GT. Ask which work is supported for the particular car.", ar: "تصف معلومات Continental GT الحالية نظام دفع هجينا، لكن الأجيال الأقدم ليست مطابقة. لا تطبق بنية الطراز الحالي أو صيانته أو متطلبات الجهد العالي على جميع سيارات Continental GT. اسأل عن العمل المتاح للسيارة المحددة." }
      ] },
      { title: { en: "Request an evidence-led quote", ar: "اطلب عرضاً مبنياً على الفحص" }, paragraphs: [
        { en: "For maintenance, provide the service record, mileage, storage and recent work. Ask the workshop to separate due items from newly diagnosed concerns and to verify the fluid, part and procedure for the fitted vehicle. One advertised package cannot describe every Bentley service.", ar: "للصيانة، قدم السجل والمسافة وفترات التخزين والأعمال الأخيرة. اطلب فصل البنود المستحقة عن الأعطال المكتشفة حديثاً والتحقق من السائل والقطعة والإجراء المناسب للسيارة. لا يمكن لحزمة معلنة واحدة وصف صيانة كل بنتلي." },
        { en: "At DIGI-TEC in Al Quoz, the practical next step is an agreed inspection and itemised scope. Send the exact symptom and vehicle details; a remote description cannot establish which component has failed or the final cost.", ar: "الخطوة العملية لدى ديجي-تك في القوز هي الاتفاق على فحص ونطاق عمل مفصل. أرسل العَرَض وبيانات السيارة؛ فالوصف عن بُعد لا يحدد القطعة التالفة أو التكلفة النهائية." }
      ] }
    ]
  },
  Maybach: {
    lead: {
      en: "A Mercedes-Maybach enquiry needs more than a generic S-Class or GLS service checklist. Identify whether it is an S580, S680, GLS 600 or another Maybach, then describe the rear-cabin, ride, climate, electrical or powertrain concern. The fitted comfort and chassis equipment determines the inspection route.",
      ar: "يحتاج استفسار مرسيدس-مايباخ إلى أكثر من قائمة صيانة عامة لفئة S أو GLS. حدد ما إذا كانت S580 أو S680 أو GLS 600 أو طرازاً آخر، ثم صف مشكلة المقصورة الخلفية أو الراحة أو التكييف أو الكهرباء أو نظام الدفع. التجهيزات المركبة تحدد مسار الفحص."
    },
    service: "/brands/maybach-service-dubai",
    serviceLabel: { en: "Maybach service options", ar: "خدمات مايباخ" },
    sections: [
      { title: { en: "Confirm the Maybach equipment", ar: "تأكد من تجهيزات مايباخ" }, paragraphs: [
        { en: "AIRMATIC and E-ACTIVE BODY CONTROL are not interchangeable labels for every Maybach. The exact model, year and specification determine what is fitted. For a ride-height warning or uneven stance, ask for evidence from the fitted system before approving a strut, compressor or control-unit replacement.", ar: "ليست AIRMATIC وE-ACTIVE BODY CONTROL تسميتين متبادلتين لكل مايباخ. يحدد الطراز والسنة والمواصفات النظام المركب. عند تحذير الارتفاع أو ميل السيارة، اطلب دليل الفحص من النظام الفعلي قبل اعتماد دعامة أو ضاغط أو وحدة تحكم." },
        { en: "Rear screens, seat functions and multi-zone climate controls also vary. Explain which function fails, when it fails and whether other cabin features change at the same time; that helps separate a local switch or supply issue from a wider control-system concern.", ar: "تختلف الشاشات الخلفية ووظائف المقاعد والتكييف متعدد المناطق أيضاً. صف الوظيفة التي تعطلت ووقت ظهور المشكلة وما إذا تغيرت وظائف أخرى؛ فهذا يساعد على التمييز بين خلل مفتاح أو تغذية موضعي ومشكلة نظام تحكم أوسع." }
      ] },
      { title: { en: "Keep Mercedes and Maybach tasks distinct", ar: "ميز بين مهام مرسيدس ومايباخ" }, paragraphs: [
        { en: "The Mercedes S-Class and GLS resources explain the wider vehicle families. A Maybach booking should stay with the Maybach hub or the relevant Maybach commercial service, because the badge and fitted equipment affect the question being asked. Shared Mercedes systems are useful context, not a reason to merge the owners.", ar: "تشرح صفحات مرسيدس فئة S وGLS العائلات الأوسع. يبقى حجز مايباخ في مركز مايباخ أو صفحة خدمتها المناسبة، لأن الشعار والتجهيزات يؤثران في المهمة المطلوبة. تشابه بعض أنظمة مرسيدس يوفر سياقاً مفيداً ولا يلغي تمييز الصفحات." },
        { en: "Compatible diagnosis or XENTRY access must be confirmed for the exact vehicle and requested function. A fault code does not by itself prove a failed module, and no workshop can promise every coding or programming operation without checking support and access.", ar: "يجب تأكيد التشخيص المتوافق أو وصول XENTRY للسيارة والوظيفة المطلوبة. رمز العطل وحده لا يثبت تلف وحدة إلكترونية، ولا يمكن وعد كل عمليات الترميز أو البرمجة قبل التحقق من الدعم والوصول." }
      ] },
      { title: { en: "Plan maintenance and approval around the car", ar: "خطط للصيانة والموافقة وفق السيارة" }, paragraphs: [
        { en: "Send the VIN, year, service history, mileage, use pattern and any warning. Do not apply one Maybach-wide interval, oil grade or cost estimate to S-Class and GLS variants. The workshop should identify due items, inspect the reported concern and separate optional work in an itemised estimate.", ar: "أرسل رقم الهيكل والسنة وسجل الصيانة والمسافة وطريقة الاستخدام وأي تحذير. لا تطبق موعد صيانة أو درجة زيت أو تقدير تكلفة واحداً على طرازات S وGLS. يجب تحديد البنود المستحقة وفحص المشكلة وفصل الأعمال الاختيارية في عرض مفصل." },
        { en: "DIGI-TEC is an independent Al Quoz workshop. Ask it to confirm the first assessment, available diagnostic functions and accepted repair scope before booking. Manufacturer-authorised status and universal programming capability are not claimed.", ar: "ديجي-تك ورشة مستقلة في القوز. اطلب تأكيد الفحص الأول ووظائف التشخيص المتاحة ونطاق الإصلاح المقبول قبل الحجز. لا تدعي الصفحة اعتماد الشركة المصنعة أو قدرة برمجة شاملة." }
      ] }
    ]
  }
};
function B5SelectionGuideBody({ brand, isArabic }) {
  const guide = content[brand];
  const language = isArabic ? "ar" : "en";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: `${isArabic ? "border-r-2 pr-5" : "border-l-2 pl-5"} border-burnt-orange`, children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: isArabic ? `كيف تختار ورشة ${brand}؟` : `Choosing a ${brand} workshop` }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-relaxed text-gray-300", children: guide.lead[language] })
    ] }),
    guide.sections.map((section) => /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: section.title[language] }),
      section.paragraphs.map((paragraph) => /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: paragraph[language] }, paragraph.en))
    ] }, section.title.en)),
    /* @__PURE__ */ jsx("p", { className: "mt-10", children: /* @__PURE__ */ jsx(LocalizedLink, { to: guide.service, className: "font-semibold text-burnt-orange underline underline-offset-4", children: guide.serviceLabel[language] }) })
  ] });
}
const guides = {
  "Range Rover": {
    lead: { en: "A Range Rover maintenance plan starts with the exact model, year, powertrain, history and fitted equipment. Range Rover, Sport, Velar and Evoque cannot share one oil grade, service interval or suspension procedure. Use the vehicle record to identify due work, then inspect any reported symptom separately.", ar: "تبدأ خطة صيانة رينج روفر بتحديد الطراز والسنة ونظام الدفع والسجل والتجهيزات. لا يمكن تطبيق درجة زيت أو موعد صيانة أو إجراء تعليق واحد على رينج روفر وسبورت وفيلار وإيفوك. راجع سجل السيارة لتحديد الأعمال المستحقة وافحص أي عَرَض بصورة منفصلة." },
    sections: [
      { heading: { en: "Confirm what is fitted", ar: "تأكد من التجهيزات المركبة" }, paragraphs: [
        { en: "Air suspension is specification-dependent. An Evoque with passive suspension does not need an air-strut inspection, while an equipped Velar or Sport may need height, leak, compressor and sensor checks. Ask the workshop to identify the fitted system before approving parts.", ar: "يعتمد التعليق الهوائي على المواصفات. لا تحتاج إيفوك ذات التعليق التقليدي إلى فحص دعامة هوائية، بينما قد تحتاج فيلار أو سبورت المجهزة به إلى فحص الارتفاع والتسرب والضاغط والحساسات. اطلب تحديد النظام المركب قبل اعتماد القطع." },
        { en: "The same applies to engine oil, transmission fluid and diagnostic functions. These are selected from the VIN, model year and applicable service data. A warning or fault code identifies a route for testing, not a failed component by itself.", ar: "ينطبق ذلك أيضاً على زيت المحرك وسائل ناقل الحركة ووظائف التشخيص. تُحدد وفق رقم الهيكل والسنة وبيانات الصيانة المعمول بها. يوجّه التحذير أو رمز العطل الاختبار ولا يثبت تلف قطعة وحده." }
      ] },
      { heading: { en: "Plan the inspection and estimate", ar: "خطط للفحص وعرض السعر" }, paragraphs: [
        { en: "Bring the service record, mileage, recent repair details and the exact message or driving change. Dubai heat and traffic can make cooling, AC, battery and tyre condition worth checking, but additional work should follow observations and an agreed estimate.", ar: "أحضر سجل الصيانة والمسافة وتفاصيل الإصلاحات الأخيرة ونص التحذير أو تغير القيادة. قد تجعل حرارة دبي وازدحامها فحص التبريد والتكييف والبطارية والإطارات مهماً، لكن الأعمال الإضافية تعتمد على النتائج وعرض سعر معتمد." },
        { en: "A service-cost question needs the due items, parts specification, labour and diagnostic findings. DIGI-TEC in Al Quoz can confirm the first inspection and supported scope for the vehicle before quoting; this guide is for planning, while the service hub handles booking.", ar: "يتطلب سؤال التكلفة معرفة البنود المستحقة ومواصفات القطع والعمالة ونتائج التشخيص. تستطيع ديجي-تك في القوز تأكيد الفحص الأول والنطاق المتاح للسيارة قبل التسعير؛ هذا دليل للتخطيط وتبقى صفحة الخدمة للحجز." }
      ] }
    ],
    links: [{ href: "/brands/range-rover-service-dubai", label: { en: "Range Rover service options", ar: "خدمات رينج روفر" } }, { href: "/brands/range-rover-service-dubai/suspension-repair", label: { en: "Suspension assessment", ar: "فحص التعليق" } }, { href: "/blog/range-rover-land-rover-air-suspension-problems-dubai", label: { en: "Air-suspension symptoms", ar: "أعراض التعليق الهوائي" } }]
  },
  Jaguar: {
    lead: { en: "Compare a Jaguar workshop by the task it can verify on your exact vehicle. An F-PACE cooling warning, an XF shift concern and an I-PACE electrical question have different inspection paths. Ask what diagnostic access, physical checks and repair scope are available before treating an estimate as final.", ar: "قارن ورش جاكوار وفق المهمة التي تستطيع تأكيدها للسيارة المحددة. يختلف مسار فحص تحذير تبريد F-PACE عن مشكلة تبديل XF أو سؤال كهرباء I-PACE. اسأل عن وصول التشخيص والفحوص الفعلية ونطاق الإصلاح قبل اعتماد أي تقدير نهائي." },
    sections: [
      { heading: { en: "Separate the symptom from the repair", ar: "افصل العَرَض عن الإصلاح" }, paragraphs: [
        { en: "A gearbox warning does not by itself require gearbox replacement. Record when the shift changes, whether the warning persists and what work was done recently. A workshop should check available fault and live data, fluid or leak evidence where applicable, and related electrical or driveline causes before recommending parts.", ar: "لا يعني تحذير ناقل الحركة وحده ضرورة استبداله. دوّن وقت تغير التبديل واستمرار التحذير والأعمال الأخيرة. ينبغي فحص بيانات الأعطال والبيانات الحية المتاحة والسائل أو التسرب عند انطباق ذلك، والأسباب الكهربائية أو أسباب مجموعة الدفع قبل اقتراح القطع." },
        { en: "A suspension warning also depends on the fitted system. Conventional, adaptive and air-suspension equipment varies by Jaguar model and specification. Ask what physical and electronic observations support the proposed repair.", ar: "يعتمد تحذير التعليق أيضاً على النظام المركب. تختلف تجهيزات التعليق التقليدي أو المتكيف أو الهوائي حسب طراز جاكوار ومواصفاته. اسأل عن الملاحظات الفعلية والإلكترونية التي تدعم الإصلاح المقترح." }
      ] },
      { heading: { en: "Check electric-vehicle scope and approval", ar: "تحقق من نطاق السيارة الكهربائية والموافقة" }, paragraphs: [
        { en: "I-PACE is fully electric. Combustion-engine oil, spark plugs and an ICE gearbox are not its service tasks. Discuss the exact brake, AC, low-voltage, chassis or warning concern and ask the workshop to confirm what it can safely inspect. Do not assume high-voltage battery or drive-unit repair capability.", ar: "I-PACE كهربائية بالكامل. لا تشمل صيانتها زيت محرك الاحتراق أو شمعات الإشعال أو ناقل حركة محرك احتراق. اشرح مشكلة الفرامل أو التكييف أو الكهرباء منخفضة الجهد أو الهيكل أو التحذير بدقة، واطلب تأكيد ما يمكن فحصه بأمان. لا تفترض توفر إصلاح البطارية عالية الجهد أو وحدة الدفع." },
        { en: "DIGI-TEC is an independent workshop in Al Quoz. Send the model, year, VIN when requested, service record and symptom. The first inspection and any further approved repair should be explained separately in the estimate.", ar: "ديجي-تك ورشة مستقلة في القوز. أرسل الطراز والسنة ورقم الهيكل عند الطلب والسجل والعَرَض. ينبغي شرح الفحص الأول وأي إصلاح لاحق معتمد بصورة منفصلة في عرض السعر." }
      ] }
    ],
    links: [{ href: "/brands/jaguar-service-dubai", label: { en: "Jaguar service options", ar: "خدمات جاكوار" } }, { href: "/brands/jaguar-service-dubai/engine-diagnostics", label: { en: "Jaguar diagnostic assessment", ar: "فحص جاكوار" } }, { href: "/brands/jaguar-service-dubai/transmission-repair", label: { en: "Transmission assessment", ar: "فحص ناقل الحركة" } }]
  }
};
function B6JlrGuideBody({ brand, isArabic }) {
  const guide = guides[brand], language = isArabic ? "ar" : "en";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "border-l-2 border-burnt-orange pl-5 text-lg leading-relaxed text-gray-200", children: guide.lead[language] }),
    guide.sections.map((section) => /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: section.heading[language] }),
      section.paragraphs.map((p) => /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: p[language] }, p.en))
    ] }, section.heading.en)),
    /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: isArabic ? "الخطوة التالية" : "Relevant next step" }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: guide.links.map((link) => /* @__PURE__ */ jsx(LocalizedLink, { to: isArabic ? `/ar${link.href}` : link.href, className: "rounded-xl border border-white/10 p-4 font-semibold text-burnt-orange hover:border-burnt-orange/50", children: link.label[language] }, link.href)) })
    ] })
  ] });
}
const configuratorTuningBrands = new Set(tuningCars.filter((car) => !["bmw", "audi"].includes(car.brand.toLowerCase())).map((car) => car.brand === "Mercedes" ? "Mercedes-Benz" : car.brand));
const generalServiceLinks = [
  { label: "Diagnostics", arLabel: "فحص وتشخيص السيارة", href: "/services/car-diagnostics-dubai" },
  { label: "Oil Change", arLabel: "تغيير الزيت", href: "/services/oil-change-dubai" },
  { label: "Mechanical Repair", arLabel: "الإصلاح الميكانيكي", href: "/services/mechanical-repair-dubai" },
  { label: "Transmission Repair", arLabel: "إصلاح ناقل الحركة", href: "/services/transmission-repair-dubai" },
  { label: "Suspension Repair", arLabel: "إصلاح نظام التعليق", href: "/services/suspension-repair-dubai" },
  { label: "Brake Repair", arLabel: "إصلاح الفرامل", href: "/services/brake-repair-dubai" },
  { label: "Electrical Repair", arLabel: "إصلاح كهرباء السيارة", href: "/services/auto-electrical-repair-dubai" },
  { label: "Performance Tuning", arLabel: "تطوير الأداء", href: "/tuning" }
];
const mercedesServiceLinks = [
  { label: "Mercedes Hub", arLabel: "مركز خدمات مرسيدس", href: "/brands/mercedes-benz-service-dubai" },
  { label: "Mercedes Diagnostics", arLabel: "فحص وتشخيص مرسيدس", href: "/services/mercedes-diagnostics-dubai" },
  { label: "Mercedes Oil Change", arLabel: "تغيير زيت مرسيدس", href: "/services/mercedes-oil-change-dubai" },
  { label: "Mercedes Mechanical Repair", arLabel: "إصلاح مرسيدس الميكانيكي", href: "/services/mercedes-mechanical-repair-dubai" },
  { label: "Mercedes Transmission Repair", arLabel: "إصلاح ناقل حركة مرسيدس", href: "/services/mercedes-transmission-repair-dubai" },
  { label: "Mercedes Suspension Repair", arLabel: "إصلاح تعليق مرسيدس", href: "/services/mercedes-suspension-repair-dubai" },
  { label: "Mercedes Brake Repair", arLabel: "إصلاح فرامل مرسيدس", href: "/services/mercedes-brake-repair-dubai" },
  { label: "Mercedes Electrical Repair", arLabel: "إصلاح كهرباء مرسيدس", href: "/services/mercedes-electrical-repair-dubai" }
];
const ferrariServiceLinks = [
  { label: "Ferrari Hub", arLabel: "مركز خدمات فيراري", href: "/brands/ferrari-service-dubai" },
  { label: "Ferrari Diagnostics", arLabel: "فحص وتشخيص فيراري", href: "/brands/ferrari-service-dubai/engine-diagnostics" },
  { label: "Ferrari Oil Service", arLabel: "خدمة زيت فيراري", href: "/brands/ferrari-service-dubai/oil-change" },
  { label: "Ferrari Transmission Repair", arLabel: "إصلاح ناقل حركة فيراري", href: "/brands/ferrari-service-dubai/transmission-repair" },
  { label: "Ferrari Suspension Repair", arLabel: "إصلاح تعليق فيراري", href: "/brands/ferrari-service-dubai/suspension-repair" },
  { label: "Ferrari Brake Repair", arLabel: "إصلاح فرامل فيراري", href: "/brands/ferrari-service-dubai/brake-repair" }
];
const mclarenServiceLinks = [
  { label: "McLaren Service Hub", arLabel: "مركز خدمات ماكلارين", href: "/brands/mclaren-service-dubai" },
  { label: "McLaren Engine Diagnostics", arLabel: "تشخيص محرك ماكلارين", href: "/brands/mclaren-service-dubai/engine-diagnostics" },
  { label: "McLaren Oil Service", arLabel: "خدمة زيت ماكلارين", href: "/brands/mclaren-service-dubai/oil-change" },
  { label: "McLaren Mechanical Repair", arLabel: "إصلاح ماكلارين الميكانيكي", href: "/brands/mclaren-service-dubai/mechanical-repair" },
  { label: "McLaren Transmission Assessment", arLabel: "فحص ناقل حركة ماكلارين", href: "/brands/mclaren-service-dubai/transmission-repair" },
  { label: "McLaren Suspension Assessment", arLabel: "فحص تعليق ماكلارين", href: "/brands/mclaren-service-dubai/suspension-repair" }
];
const lamborghiniServiceLinks = [
  { label: "Lamborghini Service Hub", arLabel: "مركز خدمات لامبورغيني", href: "/brands/lamborghini-service-dubai" },
  { label: "Engine Diagnostics", arLabel: "تشخيص المحرك", href: "/brands/lamborghini-service-dubai/engine-diagnostics" },
  { label: "Oil and Maintenance", arLabel: "الزيت والصيانة", href: "/brands/lamborghini-service-dubai/oil-change" },
  { label: "Transmission Assessment", arLabel: "فحص ناقل الحركة", href: "/brands/lamborghini-service-dubai/transmission-repair" },
  { label: "Suspension Assessment", arLabel: "فحص التعليق", href: "/brands/lamborghini-service-dubai/suspension-repair" },
  { label: "Battery Assessment", arLabel: "فحص البطارية", href: "/brands/lamborghini-service-dubai/battery-replacement" }
];
const rollsRoyceServiceLinks = [
  { label: "Rolls-Royce Service Hub", arLabel: "مركز خدمات رولز رويس", href: "/brands/rolls-royce-service-dubai" },
  { label: "Engine Diagnostics", arLabel: "تشخيص المحرك", href: "/brands/rolls-royce-service-dubai/engine-diagnostics" },
  { label: "Oil and Maintenance", arLabel: "الزيت والصيانة", href: "/brands/rolls-royce-service-dubai/oil-change" },
  { label: "Transmission Assessment", arLabel: "فحص ناقل الحركة", href: "/brands/rolls-royce-service-dubai/transmission-repair" },
  { label: "Suspension Assessment", arLabel: "فحص التعليق", href: "/brands/rolls-royce-service-dubai/suspension-repair" },
  { label: "AC Assessment", arLabel: "فحص التكييف", href: "/brands/rolls-royce-service-dubai/ac-repair" }
];
const BrandWorkshopArticleContent = ({ article, isArabic }) => {
  const isB5SelectionGuide = ["Rolls-Royce", "Bentley", "Maybach"].includes(article.brand);
  const hasConfiguratorTuning = configuratorTuningBrands.has(article.brand);
  const url = `${SITE_URL}${isArabic ? "/ar" : ""}/blog/${article.slug}`;
  const metaTitle = isArabic ? article.brand === "Ferrari" ? "صيانة فيراري في دبي | جدول الخدمة والتكلفة" : `ورشة ${article.brand} في دبي | ديجي-تك` : article.metaTitle ?? (article.existingBestPage ? `${article.brand} Maintenance Dubai | DIGI-TEC` : `${article.brand} Workshop Selection Guide Dubai | DIGI-TEC`);
  const metaDescription = isArabic ? article.brand === "Ferrari" ? "دليل صيانة فيراري في دبي: مواعيد الخدمة وعوامل التكلفة وعلامات التحذير والفحوص المهمة في حرارة الإمارات وفترات التخزين." : `ورشة متخصصة في ${article.brand} بدبي للفحص والصيانة والإصلاح. احجز لدى ديجي-تك في القوز للحصول على تشخيص واضح وخدمة احترافية.` : article.metaDescription ?? (article.existingBestPage ? `Plan ${article.brand} maintenance in Dubai: review service history, model-specific inspections, parts and the questions to ask before booking.` : `Compare ${article.brand} workshops in Dubai by inspection scope, model-specific capability, parts and estimate clarity. Prepare a useful service enquiry.`);
  const datePublished = article.datePublished ?? "2026-07-16";
  const dateModified = article.dateModified;
  const displayDate = dateModified ?? datePublished;
  const ogImage = article.coverImage ? `${SITE_URL}${article.coverImage}` : void 0;
  const keywords = isArabic ? `ورشة ${article.brand} دبي، تصليح ${article.brand} دبي، صيانة ${article.brand} دبي، متخصص ${article.brand} دبي` : article.brand === "Ferrari" ? "Ferrari maintenance Dubai, Ferrari service Dubai, Ferrari repair Dubai, Ferrari servicing, Ferrari service center Dubai, Ferrari specialist Dubai, Ferrari engine repair Dubai, Ferrari brake repair Dubai" : `${article.primaryKeyword}, ${article.brand} repair Dubai, ${article.brand} garage Dubai, ${article.brand} specialist Dubai, ${article.brand} maintenance Dubai`;
  const ferrariFaqs = [
    { question: "How often should a Ferrari be serviced in Dubai?", answer: "Ferrari's 7-Year Genuine Maintenance programme describes scheduled maintenance every 20,000 km or once a year. The handbook, age, service history, storage and use of the exact car should still determine its final plan." },
    { question: "What can a Ferrari maintenance service include?", answer: "The scope can include model-approved oil and filters, other time- or distance-based items, fluid and leak checks, cooling, tyres, brakes, suspension, battery condition, a supported system scan and a written inspection. Only items due for the exact car should be included." },
    { question: "How much does Ferrari maintenance cost in Dubai?", answer: "There is no reliable single price for every Ferrari. Cost depends on the model and generation, scheduled scope, diagnostic time, fluids, parts, tyre and brake condition, history and any additional findings. Ask for an itemised estimate before approving work." },
    { question: "Does a low-mileage or stored Ferrari still need maintenance?", answer: "Yes. Time, heat cycles and storage can affect fluids, seals, tyres, brakes and the low-voltage battery even when mileage is low. Annual attention and a condition check remain important." },
    { question: "Which engine oil should be used in a Ferrari?", answer: "Use the specification and approval required for the exact model, engine and model year. Do not choose oil from a generic brand-wide recommendation; confirm the correct product, quantity and level procedure before service." },
    { question: "How long does Ferrari maintenance take?", answer: "Timing depends on the scheduled scope, inspection findings, diagnostic work and parts availability. The workshop can give a more useful completion estimate after reviewing the exact car and requested work." },
    { question: "How can I request a Ferrari maintenance quote?", answer: "Send the model, year, mileage, service history, last service date and any warning or symptom. DIGI-TEC can then confirm the appropriate first inspection and prepare an itemised estimate for the agreed scope." }
  ];
  const englishFaqs = [
    { question: `How do I choose ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} workshop in Dubai?`, answer: `Choose a workshop that starts with a documented inspection, explains the fault in plain language, gives a written estimate before work, and can show how the proposed repair relates to your ${article.brand}'s service history and current condition.` },
    { question: `Does Dubai heat change ${article.brand} maintenance?`, answer: `It can. High ambient temperature, stop-start traffic, dust and heavy air-conditioning demand can increase the importance of cooling, tyres, brakes, batteries and fluid-condition checks. The right interval depends on the model and how it is used.` },
    { question: `What should ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} diagnostic include?`, answer: `A useful diagnostic is more than reading a code. It should combine a scan, live data where relevant, visual checks, a road test when appropriate, and a clear explanation of confirmed faults versus items that need monitoring.` },
    { question: `Should I use OEM or aftermarket ${article.brand} parts?`, answer: `The right choice depends on the component, vehicle age, budget and intended use. Safety-critical, electronic and complex driveline parts often need careful sourcing. Ask for the part brand, specification and applicable warranty terms in writing.` },
    { question: `Can DIGI-TEC inspect ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} before I buy it?`, answer: "Send the model, year and requested checks so the team can confirm whether it can accept the inspection and what it covers. Ask which physical checks, diagnostic functions and service-record review are included; an inspection cannot guarantee the absence of every hidden or future fault." },
    { question: `How long does ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} service take?`, answer: `Timing depends on the exact service, inspection findings, parts availability and workshop schedule. Ask for an estimated completion time after the vehicle and requested work have been reviewed.` },
    { question: `Can I book ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} inspection by WhatsApp?`, answer: `Yes. Send the model, year, mileage, concern and any warning-light information to DIGI-TEC on WhatsApp. The team can advise the best next step and arrange an inspection in Al Quoz.` },
    hasConfiguratorTuning ? { question: `Is performance tuning suitable for every ${article.brand}?`, answer: "No. Only the exact vehicles and configurations listed in the Performance Configurator have published packages. Confirm mechanical health, vehicle specification, software, fuel and any package hardware requirements before agreeing a project." } : { question: `Can you assess the mechanical condition of my ${article.brand}?`, answer: "Send the model, year, service history, existing modifications and any warnings or symptoms. The team confirms the available inspection scope, reviews the findings and explains any recommended maintenance or repair." },
    { question: `Where is the ${article.brand} workshop located?`, answer: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai." },
    { question: `What should I bring to my ${article.brand} appointment?`, answer: `Bring the key, service history if available, details of recent work, photos or videos of intermittent concerns, and the circumstances in which the issue occurs. This helps the inspection begin with useful context.` }
  ];
  const ferrariFaqsArabic = [
    { question: "كم مرة يجب صيانة فيراري في دبي؟", answer: "يوضح برنامج الصيانة الأصلية من فيراري صيانة مجدولة كل 20,000 كيلومتر أو مرة سنوياً. ويبقى دليل السيارة وعمرها وسجلها وطريقة تخزينها واستخدامها أساس تحديد الخطة النهائية." },
    { question: "ماذا يمكن أن تشمل صيانة فيراري؟", answer: "قد تشمل زيت المحرك والفلاتر بالمواصفات المناسبة، والبنود المستحقة حسب الوقت أو المسافة، وفحص السوائل والتسريبات والتبريد والإطارات والفرامل والتعليق والبطارية والأنظمة المدعومة، مع تقرير مكتوب." },
    { question: "كم تبلغ تكلفة صيانة فيراري في دبي؟", answer: "لا يوجد سعر واحد لجميع سيارات فيراري. تعتمد التكلفة على الطراز والجيل ونطاق الصيانة ووقت التشخيص والسوائل والقطع وحالة الإطارات والفرامل والسجل والنتائج الإضافية. اطلب عرضاً مفصلاً قبل اعتماد العمل." },
    { question: "هل تحتاج فيراري قليلة الاستخدام أو المخزنة إلى صيانة؟", answer: "نعم. قد تؤثر المدة والحرارة والتخزين في السوائل والأختام والإطارات والفرامل والبطارية حتى مع قلة المسافة، لذلك تبقى المتابعة السنوية وفحص الحالة مهمين." },
    { question: "ما زيت المحرك المناسب لسيارة فيراري؟", answer: "استخدم المواصفة والاعتماد المطلوبين للطراز والمحرك وسنة الصنع المحددة. يجب تأكيد المنتج والكمية وطريقة قياس المستوى قبل الخدمة بدلاً من الاعتماد على توصية عامة." },
    { question: "كم تستغرق صيانة فيراري؟", answer: "تعتمد المدة على نطاق الصيانة والنتائج وأعمال التشخيص وتوفر القطع. يمكن تقديم تقدير أدق بعد مراجعة السيارة والعمل المطلوب." },
    { question: "كيف أطلب عرض سعر لصيانة فيراري؟", answer: "أرسل الطراز والسنة والمسافة وسجل الصيانة وتاريخ آخر خدمة وأي تحذير أو أعراض، حتى يؤكد فريق ديجي-تك الفحص الأول المناسب ويعد عرضاً مفصلاً للنطاق المتفق عليه." }
  ];
  const arabicFaqs = [
    { question: `كيف أختار ورشة ${article.brand} متخصصة في دبي؟`, answer: `اختر ورشة تبدأ بفحص موثق، وتشرح سبب العطل بوضوح، وتقدم عرضاً مكتوباً قبل العمل، وتربط التوصية بسجل صيانة ${article.brand} وحالتها الحالية.` },
    { question: `هل تؤثر حرارة دبي في صيانة ${article.brand}؟`, answer: "نعم. الحرارة والازدحام والغبار والاستخدام المتواصل للمكيف تزيد أهمية فحص التبريد والإطارات والفرامل والبطارية والسوائل وفق حالة السيارة وطريقة استخدامها." },
    { question: `ماذا يجب أن يشمل فحص ${article.brand}؟`, answer: "يشمل الفحص المفيد قراءة الأنظمة الإلكترونية والبيانات الحية عند الحاجة، والفحص البصري، وتجربة الطريق عندما تكون آمنة، مع توضيح الأعطال المؤكدة وما يحتاج إلى متابعة." },
    { question: `هل أختار قطعاً أصلية أم بديلة لسيارة ${article.brand}؟`, answer: "يعتمد الاختيار على نوع القطعة وعمر السيارة والاستخدام والميزانية. نوضح مصدر القطعة ومواصفاتها والضمان قبل اعتمادها، مع عناية خاصة بأنظمة السلامة والإلكترونيات." },
    { question: `هل تقدم ديجي-تك فحص ${article.brand} قبل الشراء؟`, answer: "أرسل الطراز والسنة والفحوص المطلوبة لتأكيد قبول السيارة ونطاق العمل. اسأل عما يشمله الفحص الفعلي والتشخيص ومراجعة السجل؛ لا يضمن الفحص غياب كل عيب خفي أو عطل مستقبلي." },
    { question: `كم تستغرق صيانة ${article.brand}؟`, answer: "تعتمد المدة على نطاق العمل ونتائج الفحص والوصول إلى المكونات وتوفر القطع وأي إجراءات إضافية مطلوبة ومتاحة. يتم تأكيد الموعد والوقت المتوقع بعد مراجعة السيارة والعمل المطلوب." },
    { question: `هل يمكن حجز فحص ${article.brand} عبر واتساب؟`, answer: "نعم. أرسل الطراز والسنة والمسافة ووصف المشكلة ورسالة التحذير إن وجدت، وسيساعدك الفريق في ترتيب الموعد المناسب في القوز." },
    hasConfiguratorTuning ? { question: `هل يناسب تطوير الأداء جميع سيارات ${article.brand}؟`, answer: "لا. الحِزم المنشورة ترتبط بالسيارات والتكوينات المحددة في مهيئ الأداء. تُراجع حالة السيارة ومواصفاتها وبرمجياتها والوقود ومتطلبات القطع الخاصة بالحزمة قبل الاتفاق على المشروع." } : { question: `هل يمكن تقييم الحالة الميكانيكية لسيارة ${article.brand}؟`, answer: "أرسل الطراز والسنة وسجل الصيانة والتعديلات الموجودة وأي أعراض أو تحذيرات. يؤكد الفريق نطاق الفحص المتاح ويشرح النتائج وأي صيانة أو إصلاح مقترح." },
    { question: `أين تقع ورشة ${article.brand}؟`, answer: "يقع مركز ديجي-تك بيرفورمانس في منطقة القوز الصناعية 3 في دبي، ويخدم مالكي السيارات من مختلف مناطق دبي والإمارات بالمواعيد." },
    { question: `ماذا أحضر إلى موعد ${article.brand}؟`, answer: "أحضر المفتاح وسجل الصيانة إن توفر وتفاصيل الأعمال الأخيرة وأي صور أو فيديو للأعراض المتقطعة والظروف التي تظهر فيها المشكلة." }
  ];
  const mclarenFaqs = [
    { question: "How should I compare McLaren workshops in Dubai?", answer: "Ask how the workshop will identify the exact vehicle and fitted systems, what the initial assessment includes, which diagnostic functions are available, how parts and procedures are confirmed, and whether you will receive an itemised estimate before work." },
    { question: "Is DIGI-TEC a McLaren-authorised repairer?", answer: "This page presents DIGI-TEC as an independent workshop in Al Quoz, Dubai. Vehicle acceptance, diagnostic access, parts and repair scope are confirmed for the exact model before booking." },
    { question: "What should I send before requesting an estimate?", answer: "Send the model, year, mileage, warning text, symptoms, when they occur and your preferred appointment time. An accurate repair estimate may require an in-workshop inspection." },
    { question: "Does Dubai heat affect McLaren maintenance?", answer: "Heat, traffic, dust, storage and heavy AC use can make cooling, battery, tyre, brake and fluid-condition checks especially important. The final schedule still comes from model-specific service information and the vehicle history." },
    { question: "Can every warning be diagnosed from a fault code?", answer: "No. A code is evidence, not a parts diagnosis. The assessment may require compatible data, physical tests and a road test when appropriate; coverage is confirmed for the vehicle." },
    { question: "Do you quote McLaren repairs online?", answer: "The team can discuss the likely first step online, but final cost depends on the exact vehicle, diagnostic time, findings, parts and agreed scope. Request an itemised estimate before approving work." }
  ];
  const mclarenFaqsArabic = [
    { question: "كيف أقارن بين ورش مكلارين في دبي؟", answer: "اسأل كيف ستحدد الورشة السيارة والأنظمة المركبة، وما يشمله الفحص الأول، وما وظائف التشخيص المتاحة، وكيف يتم تأكيد القطع والإجراءات، وهل ستحصل على عرض مفصل قبل بدء العمل." },
    { question: "هل ديجي-تك مركز إصلاح مكلارين معتمداً؟", answer: "تقدم هذه الصفحة ديجي-تك كورشة مستقلة في القوز بدبي. يتم تأكيد قبول السيارة والوصول التشخيصي والقطع ونطاق الإصلاح للطراز المحدد قبل الحجز." },
    { question: "ماذا أرسل قبل طلب عرض السعر؟", answer: "أرسل الطراز والسنة والمسافة ونص التحذير والأعراض ووقت ظهورها والموعد المفضل. قد يتطلب عرض الإصلاح الدقيق فحص السيارة داخل الورشة." },
    { question: "هل تؤثر حرارة دبي في صيانة مكلارين؟", answer: "قد تزيد الحرارة والازدحام والغبار والتخزين والاستخدام المتواصل للمكيف أهمية فحص التبريد والبطارية والإطارات والفرامل والسوائل. يبقى الجدول النهائي معتمداً على معلومات الطراز وسجل السيارة." },
    { question: "هل يمكن تشخيص كل تحذير من رمز العطل؟", answer: "لا. الرمز دليل أولي وليس تشخيصاً لقطعة. قد يحتاج الفحص إلى بيانات متوافقة واختبارات فعلية وتجربة طريق عند ملاءمتها، ويتم تأكيد التغطية للسيارة." },
    { question: "هل يمكن تسعير إصلاح مكلارين عبر الإنترنت؟", answer: "يمكن للفريق مناقشة الخطوة الأولى، لكن التكلفة النهائية تعتمد على السيارة ووقت التشخيص والنتائج والقطع والنطاق المتفق عليه. اطلب عرضاً مفصلاً قبل اعتماد العمل." }
  ];
  const rollsRoyceFaqs = [
    { question: "How should I compare Rolls-Royce workshops in Dubai?", answer: "Ask how the workshop identifies the exact model and fitted systems, what the first assessment includes, which diagnostic functions are available, how parts and fluids are confirmed, and whether you receive an itemised estimate before work." },
    { question: "Is DIGI-TEC a Rolls-Royce-authorised repairer?", answer: "No authorised-repairer claim is made. DIGI-TEC is presented as an independent workshop in Al Quoz, Dubai. Vehicle acceptance, diagnostic access, parts and repair scope are confirmed for the requested work." },
    { question: "What should I send before requesting an estimate?", answer: "Send the model, year, mileage, service history, warning or symptoms and preferred appointment time. A responsible repair estimate may require an in-workshop assessment." },
    { question: "Does every Rolls-Royce use the same suspension and transmission?", answer: "No. Systems vary by model and generation. Rolls-Royce describes Planar, Flagbearer and satellite-aided transmission for the relevant newer Ghost generation, so those features are not assumed for every vehicle." },
    { question: "Can you service a Rolls-Royce Spectre?", answer: "Spectre is fully electric and is kept separate from combustion servicing. General and low-voltage enquiries may be discussed, but high-voltage battery, charging and isolation work is not advertised without confirmed training, equipment and scope." },
    { question: "What determines Rolls-Royce service cost?", answer: "The model, year, mileage, history, due maintenance, diagnostic time, findings, parts, fluids, labour and access requirements determine the estimate." }
  ];
  const rollsRoyceFaqsArabic = [
    { question: "كيف أقارن بين ورش رولز رويس في دبي؟", answer: "اسأل كيف تحدد الورشة الطراز والأنظمة المركبة، وما يشمله الفحص الأول، وما وظائف التشخيص المتاحة، وكيف تؤكد القطع والسوائل، وهل تقدم عرضاً مفصلاً قبل العمل." },
    { question: "هل ديجي-تك مركز رولز رويس معتمداً؟", answer: "لا تقدم الصفحة هذا الادعاء. ديجي-تك ورشة مستقلة في القوز بدبي، ويتم تأكيد قبول السيارة والوصول التشخيصي والقطع ونطاق الإصلاح قبل الحجز." },
    { question: "ماذا أرسل قبل طلب عرض السعر؟", answer: "أرسل الطراز والسنة والمسافة وسجل الصيانة والتحذير أو الأعراض والموعد المفضل. قد يتطلب عرض الإصلاح الدقيق فحص السيارة داخل الورشة." },
    { question: "هل تستخدم جميع سيارات رولز رويس نظام التعليق وناقل الحركة نفسيهما؟", answer: "لا. تختلف الأنظمة حسب الطراز والجيل، لذلك يجب تحديد السيارة والتجهيزات قبل اعتماد إجراءات أو قطع." },
    { question: "هل تشمل الصفحة صيانة Spectre الكهربائية؟", answer: "Spectre سيارة كهربائية وتبقى منفصلة عن صيانة محركات الاحتراق. لا يتم الإعلان عن أعمال البطارية عالية الجهد أو الشحن أو العزل من دون تأكيد التدريب والمعدات والنطاق." },
    { question: "ما الذي يحدد تكلفة خدمة رولز رويس؟", answer: "تعتمد التكلفة على الطراز والسنة والمسافة والسجل والصيانة المطلوبة ووقت التشخيص والنتائج والقطع والسوائل والعمالة." }
  ];
  const faqs = article.brand === "Range Rover" ? isArabic ? [
    { question: "هل تستخدم جميع سيارات رينج روفر التعليق الهوائي؟", answer: "لا. تختلف تجهيزات التعليق حسب الطراز والسنة والمواصفات، لذلك يجب تحديد النظام المركب قبل اقتراح الفحص أو القطع." },
    { question: "هل يوجد موعد صيانة واحد لكل طرازات رينج روفر؟", answer: "لا. حدد البنود المستحقة من معلومات السيارة وسجلها وطريقة استخدامها، ثم افصل أي إصلاح إضافي عن الصيانة الدورية." },
    { question: "كيف تُحدد تكلفة الصيانة؟", answer: "تعتمد على الطراز والبنود المستحقة ومواصفات القطع والسوائل ونتائج الفحص والعمالة المعتمدة." }
  ] : [
    { question: "Does every Range Rover use air suspension?", answer: "No. Suspension equipment varies by model, year and specification. The fitted system should be identified before a repair is proposed." },
    { question: "Is there one service interval for every Range Rover?", answer: "No. Due work depends on the exact vehicle, applicable service information, history and use." },
    { question: "What determines a Range Rover service estimate?", answer: "The due items, parts and fluid specifications, labour and inspection findings determine the agreed scope." }
  ] : article.brand === "Jaguar" ? isArabic ? [
    { question: "هل يعني تحذير ناقل الحركة ضرورة استبداله؟", answer: "لا. يتطلب تحديد السبب مراجعة الأعراض والبيانات المتاحة والفحوص الفعلية قبل اقتراح قطع أو إصلاح." },
    { question: "هل تُصان جاكوار I-PACE مثل سيارات البنزين؟", answer: "لا. I-PACE كهربائية ولا تحتاج إلى زيت محرك احتراق أو شمعات إشعال. يجب تأكيد نطاق أي عمل كهربائي أو جهد عالٍ قبل قبوله." },
    { question: "ما الذي يجب إرساله قبل حجز فحص جاكوار؟", answer: "أرسل الطراز والسنة والسجل ورسالة التحذير والأعراض ووقت ظهورها حتى تحدد الورشة الفحص الأول المناسب." }
  ] : [
    { question: "Does a Jaguar gearbox warning mean replacement?", answer: "No. The symptom, available fault data and relevant physical checks must be reviewed before a gearbox repair is recommended." },
    { question: "Is I-PACE maintained like a petrol Jaguar?", answer: "No. I-PACE is electric and does not need combustion-engine oil or spark-plug service. High-voltage work requires separate capability confirmation." },
    { question: "What should I share before a Jaguar inspection?", answer: "Send the model, year, history, exact warning and when the symptom occurs so the first assessment can be planned." }
  ] : article.brand === "Ferrari" ? isArabic ? ferrariFaqsArabic : ferrariFaqs : !isArabic && article.brand === "Aston Martin" ? [
    { question: "How should I compare Aston Martin workshops?", answer: "Ask about model-specific diagnostic access, the inspection process, parts options and written estimates before approving work." },
    { question: "What should I send before booking?", answer: "Model, year, mileage, service history and symptoms help the workshop plan the first assessment." },
    { question: "Is DIGI-TEC independent?", answer: "DIGI-TEC is an independent workshop in Al Quoz Industrial Area 3, Dubai. No factory authorization is claimed." }
  ] : isArabic ? article.brand === "McLaren" ? mclarenFaqsArabic : article.brand === "Rolls-Royce" ? rollsRoyceFaqsArabic : arabicFaqs : article.brand === "McLaren" ? mclarenFaqs : article.brand === "Rolls-Royce" ? rollsRoyceFaqs : englishFaqs;
  const relatedServiceLinks = article.brand === "Mercedes-Benz" ? mercedesServiceLinks : article.brand === "Ferrari" ? ferrariServiceLinks : article.brand === "McLaren" ? mclarenServiceLinks : article.brand === "Lamborghini" ? lamborghiniServiceLinks : article.brand === "Rolls-Royce" ? rollsRoyceServiceLinks : article.brand === "Range Rover" ? [
    { label: "Range Rover service", arLabel: "خدمات رينج روفر", href: "/brands/range-rover-service-dubai" },
    { label: "Suspension assessment", arLabel: "فحص التعليق", href: "/brands/range-rover-service-dubai/suspension-repair" },
    { label: "Engine diagnostics", arLabel: "تشخيص المحرك", href: "/brands/range-rover-service-dubai/engine-diagnostics" },
    { label: "Brake assessment", arLabel: "فحص الفرامل", href: "/brands/range-rover-service-dubai/brake-repair" }
  ] : article.brand === "Jaguar" ? [
    { label: "Jaguar service", arLabel: "خدمات جاكوار", href: "/brands/jaguar-service-dubai" },
    { label: "Jaguar diagnostics", arLabel: "تشخيص جاكوار", href: "/brands/jaguar-service-dubai/engine-diagnostics" },
    { label: "Transmission assessment", arLabel: "فحص ناقل الحركة", href: "/brands/jaguar-service-dubai/transmission-repair" },
    { label: "Suspension assessment", arLabel: "فحص التعليق", href: "/brands/jaguar-service-dubai/suspension-repair" }
  ] : article.brand === "Aston Martin" && !isArabic ? [{ label: "Aston Martin service and repair", arLabel: "", href: "/brands/aston-martin-service-dubai" }, { label: "DB11 owner guide", arLabel: "", href: "/blog/aston-martin-db11-service-dubai-guide" }, { label: "Brake assessment", arLabel: "", href: "/brands/aston-martin-service-dubai/brake-repair" }, { label: "Transmission assessment", arLabel: "", href: "/brands/aston-martin-service-dubai/transmission-repair" }] : generalServiceLinks;
  const jsonLd = (() => {
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "/ar" : "/" },
      { name: isArabic ? "المقالات" : "Blog", url: isArabic ? "/ar/blog" : "/blog" },
      { name: article.title, url }
    ]);
    const webPage = buildWebPage({
      url,
      name: article.title,
      description: metaDescription,
      type: "ItemPage",
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: article.coverImage,
      datePublished,
      dateModified,
      mainEntityId: `${url}#article`
    });
    const blogArticle = buildArticle({
      url,
      headline: article.title,
      description: metaDescription,
      datePublished,
      dateModified,
      author: isArabic ? "فريق ورشة ديجي-تك" : "DIGI-TEC Workshop",
      image: article.coverImage,
      section: isArabic ? "أدلة الورشة" : "Workshop Guides",
      keywords
    });
    const service = buildService({
      url,
      name: isArabic ? `خدمات ورشة ${article.brand} في دبي` : `${article.brand} workshop support in Dubai`,
      serviceType: isArabic ? `فحص وصيانة وإصلاح ${article.brand}` : `${article.brand} diagnostics, maintenance and repair`,
      description: metaDescription,
      image: article.coverImage,
      brand: article.brand,
      offers: isArabic ? ["الصيانة الدورية", "فحص وتشخيص السيارة", "الإصلاح الميكانيكي", "إصلاح الفرامل", "إصلاح التعليق", "إصلاح الكهرباء"] : ["Scheduled servicing", "Diagnostics", "Mechanical repair", "Brake repair", "Suspension repair", "Electrical repair"],
      areaServed: isArabic ? ["دبي"] : ["Dubai"]
    });
    const faq = buildFAQ(url, faqs);
    return pageGraph([webPage, breadcrumb, blogArticle, ...["Range Rover", "Jaguar"].includes(article.brand) ? [] : [service], ...faq ? [faq] : []]);
  })();
  useSeo({
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical: url,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage,
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterTitle: metaTitle,
    twitterDescription: metaDescription,
    jsonLd
  });
  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? `مرحباً ديجي-تك، أود حجز فحص لسيارة ${article.brand} في دبي.` : `Hi DIGI-TEC, I would like to book ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} inspection in Dubai.`)}`;
  const relatedArticles = article.brand === "Ferrari" ? [
    { path: "/blog/ferrari-488-service-dubai-guide", title: isArabic ? "دليل صيانة فيراري 488 في دبي" : "Ferrari 488 Service & Maintenance Guide" },
    { path: "/best-ferrari-workshop-dubai", title: isArabic ? "كيفية اختيار ورشة فيراري في دبي" : "How to Choose a Ferrari Workshop in Dubai" },
    { path: "/blog/pre-purchase-inspection-dubai-guide", title: isArabic ? "دليل فحص السيارة قبل الشراء في دبي" : "Pre-Purchase Inspection Guide for Dubai" }
  ] : [
    { path: "/blog/dealer-vs-independent-workshop-dubai", title: isArabic ? "المقارنة بين الوكالة والورشة المستقلة" : "Compare dealer and independent workshop scope" },
    { path: "/blog/car-service-cost-dubai-luxury-brands", title: isArabic ? "كيف تقرأ عرض صيانة السيارة؟" : "How to compare an itemised service estimate" },
    { path: "/blog/car-service-interval-dubai-heat", title: isArabic ? "مواعيد الصيانة والوقت والمسافة" : "Plan maintenance around time, mileage and use" }
  ];
  const t = (english, arabic) => isArabic ? arabic : english;
  const b4Link = (path) => isArabic && ["Range Rover", "Jaguar"].includes(article.brand) && path.startsWith(`/brands/${article.brand.toLowerCase().replace(" ", "-")}-service-dubai`) ? `/ar${path}` : isArabic && ["Ferrari", "Lamborghini"].includes(article.brand) && (path.startsWith(`/brands/${article.brand.toLowerCase()}-service-dubai`) || article.brand === "Ferrari" && ["/blog/ferrari-488-service-dubai-guide", "/best-ferrari-workshop-dubai"].includes(path)) ? `/ar${path}` : path;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": t("Breadcrumb", "مسار التنقل"), className: "mx-auto max-w-6xl px-5 pt-6 text-sm text-gray-400 sm:px-6", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: t("Home", "الرئيسية") }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog", className: "hover:text-burnt-orange", children: t("Blog", "المقالات") }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-off-white", children: article.brand })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: `relative mt-5 overflow-hidden bg-gradient-to-br ${article.coverGradient}`, children: [
        article.coverImage && /* @__PURE__ */ jsx("img", { src: article.coverImage, alt: article.imageAlt, width: article.brand === "Ferrari" ? 1672 : void 0, height: article.brand === "Ferrari" ? 941 : void 0, decoding: "async", className: "absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/55" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-24", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs font-bold uppercase tracking-[0.24em] text-burnt-orange", children: t("Dubai Workshop Guide", "دليل ورش السيارات في دبي") }),
          /* @__PURE__ */ jsx("h1", { className: "max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl", children: article.title }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 flex items-center gap-2 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-burnt-orange" }),
            t(dateModified ? "Updated" : "Published", dateModified ? "آخر تحديث" : "تاريخ النشر"),
            " ",
            new Date(displayDate).toLocaleDateString(isArabic ? "ar-AE" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            t("12 min read", "12 دقيقة قراءة")
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-lg leading-relaxed text-gray-200", children: article.excerpt ?? t(
            `Looking for ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} workshop in Dubai? This owner guide explains what a proper inspection should cover, the common concerns worth discussing, and how to plan maintenance around UAE driving conditions.`,
            `هل تبحث عن ورشة ${article.brand} في دبي؟ يوضح هذا الدليل ما يجب أن يشمله الفحص الصحيح، والأعطال التي تستحق المناقشة، وكيفية تخطيط الصيانة بما يناسب ظروف القيادة في الإمارات.`
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxs("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
              t("Book on WhatsApp", "احجز عبر واتساب")
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", className: "btn-secondary", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
              t("Call +971 4 340 2223", "اتصل على ‎+971 4 340 2223")
            ] })
          ] }),
          /* @__PURE__ */ jsx(CtaAssurance, { className: "mt-4", align: "start" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20", children: [
        ["Range Rover", "Jaguar"].includes(article.brand) ? /* @__PURE__ */ jsx(B6JlrGuideBody, { brand: article.brand, isArabic }) : isB5SelectionGuide ? /* @__PURE__ */ jsx(B5SelectionGuideBody, { brand: article.brand, isArabic }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("section", { className: `${isArabic ? "border-r-2 pr-5" : "border-l-2 pl-5"} border-burnt-orange`, children: article.brand === "Ferrari" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Ferrari maintenance in Dubai: the short answer", "صيانة فيراري في دبي: الإجابة المختصرة") }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-relaxed text-gray-300", children: t("Ferrari’s 7-Year Genuine Maintenance programme describes scheduled maintenance every 20,000 km or once a year. Use that as a reference, then confirm the handbook, programme status and recorded history for the exact model because classic, limited-edition and out-of-programme cars can differ.", "يوضح برنامج الصيانة الأصلية من فيراري صيانة مجدولة كل 20,000 كيلومتر أو مرة سنوياً. استخدم ذلك كمرجع، ثم راجع دليل السيارة وحالة البرنامج والسجل الموثق للطراز المحدد لأن السيارات الكلاسيكية والإصدارات المحدودة والسيارات خارج البرنامج قد تختلف.") }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-400", children: t("The work and price are not one universal package: model, age, mileage, storage, driving use, due items and inspection findings determine the final scope. Ask for those items to be separated in a written estimate before approval.", "لا يوجد نطاق أو سعر واحد لجميع السيارات؛ فالطراز والعمر والمسافة والتخزين وطريقة الاستخدام والبنود المستحقة ونتيجة الفحص هي ما يحدد العمل النهائي. اطلب فصل هذه البنود في عرض مكتوب قبل الاعتماد.") }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: ferrariServiceLinks.slice(0, 4).map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: service.href, className: "inline-flex min-h-11 items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold transition-colors hover:border-burnt-orange/50 hover:text-burnt-orange", children: [
              /* @__PURE__ */ jsx("span", { children: isArabic ? service.arLabel : service.label }),
              /* @__PURE__ */ jsx(ArrowRight, { className: `${isArabic ? "rotate-180" : ""} h-4 w-4 shrink-0 text-burnt-orange` })
            ] }, service.href)) })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t(`A practical answer for ${article.brand} owners`, `إجابة عملية لمالكي ${article.brand}`) }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-relaxed text-gray-300", children: t(`The best workshop decision is rarely about a slogan. It is about whether the team can understand the car, define the concern accurately, show you a sensible repair path and keep you informed before costs grow. At DIGI-TEC in Al Quoz, ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} appointment starts with the vehicle’s history, symptoms and current condition—not an assumption.`, `اختيار الورشة المناسبة لا يعتمد على شعار، بل على قدرة الفريق على فهم السيارة وتحديد المشكلة بدقة وشرح مسار إصلاح منطقي قبل ارتفاع التكلفة. في ديجي-تك بالقوز، يبدأ موعد ${article.brand} بمراجعة تاريخ السيارة وأعراضها وحالتها الحالية، لا بالافتراضات.`) }),
            article.existingBestPage && article.brand === "Mercedes-Benz" && /* @__PURE__ */ jsxs("p", { className: "mt-4 leading-relaxed text-gray-400", children: [
              t("For workshop information and booking, see our ", "للمعلومات عن الورشة والحجز، راجع "),
              /* @__PURE__ */ jsx(LocalizedLink, { to: article.existingBestPage, className: "font-semibold text-burnt-orange hover:underline", children: t("Mercedes-Benz repair and service hub", "مركز إصلاح وصيانة مرسيدس بنز") }),
              "."
            ] }),
            article.existingBestPage && article.brand !== "Mercedes-Benz" && /* @__PURE__ */ jsxs("p", { className: "mt-4 leading-relaxed text-gray-400", children: [
              t("For a direct comparison of what to look for in a workshop, see our ", "للمقارنة المباشرة بين معايير اختيار الورشة، راجع صفحة "),
              /* @__PURE__ */ jsx(LocalizedLink, { to: article.existingBestPage, className: "font-semibold text-burnt-orange hover:underline", children: t(`${article.brand} workshop selection page`, `دليل اختيار ورشة ${article.brand}`) }),
              t(". This article is intentionally focused on ownership, maintenance and repair preparation so it does not duplicate that landing page.", "؛ فهذا المقال يركز على الملكية والصيانة والاستعداد للإصلاح من دون تكرار محتوى صفحة الخدمة.")
            ] })
          ] }) }),
          article.brand !== "Ferrari" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Why a specialist approach matters", "لماذا تهم الخبرة المتخصصة؟") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t(`Modern ${article.brand} vehicles combine mechanical systems with networked control modules, safety functions, comfort features and model-specific service procedures. A warning light may point to a symptom rather than the failed part. Replacing components without checking fault history, live information, wiring, fluids and the surrounding system can turn a straightforward repair into repeated expense.`, `تجمع سيارات ${article.brand} الحديثة بين الأنظمة الميكانيكية ووحدات التحكم المتصلة ووظائف السلامة والراحة وإجراءات صيانة خاصة بالطراز. قد تشير رسالة التحذير إلى عَرَض لا إلى القطعة التالفة، لذلك يؤدي استبدال المكونات من دون مراجعة سجل الأعطال والبيانات الحية والأسلاك والسوائل إلى تكاليف متكررة.`) }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: !hasConfiguratorTuning ? t("A good workshop should state what is confirmed, what is likely and what still needs testing. That distinction matters when approving maintenance, a repair or a major component replacement, and it makes quotations easier to compare fairly.", "توضح الورشة الجيدة ما تم تأكيده وما هو محتمل وما يزال يحتاج إلى اختبار. هذا الفرق مهم عند اعتماد الصيانة أو الإصلاح أو استبدال مكوّن رئيسي، ويساعد على مقارنة عروض الأسعار بإنصاف.") : t("A good workshop should be comfortable saying what is confirmed, what is likely, and what still needs testing. That distinction matters when you are deciding whether to approve maintenance, a repair, a major component replacement or a performance upgrade. It also makes it easier to compare quotes fairly.", "توضح الورشة الجيدة ما تم تأكيده، وما هو محتمل، وما يزال يحتاج إلى اختبار. هذا الفرق مهم عند اعتماد الصيانة أو الإصلاح أو استبدال مكوّن كبير أو تطوير الأداء، ويساعدك أيضاً على مقارنة عروض الأسعار بإنصاف.") })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t(`${article.brand} models and common Dubai concerns`, `طرازات ${article.brand} والأعطال الشائعة في دبي`) }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t(`We see owners of ${article.models} looking for clear answers around reliability, service planning and the effect of Dubai heat. The exact concern depends on age, mileage, driving pattern and previous work, but these are the areas worth raising during an inspection:`, `يبحث مالكو طرازات ${article.models} عن إجابات واضحة حول الاعتمادية وخطة الصيانة وتأثير حرارة دبي. تختلف الأولويات حسب العمر والمسافة وطريقة القيادة والأعمال السابقة، لكن هذه أهم النقاط التي تستحق الفحص:`) }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-3", children: article.commonProblems.map((problem) => /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-5", children: [
                /* @__PURE__ */ jsx(Wrench, { className: "mb-3 h-5 w-5 text-burnt-orange" }),
                /* @__PURE__ */ jsx("h3", { className: "font-bold", children: problem }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-gray-400", children: t("The cause should be confirmed with a measured inspection before any major part is approved.", "يجب تأكيد السبب بفحص وقياسات واضحة قبل اعتماد استبدال أي قطعة رئيسية.") })
              ] }, problem)) }),
              /* @__PURE__ */ jsx("p", { className: "mt-6 leading-relaxed text-gray-300", children: t("Heat, traffic, dust, occasional short journeys and long periods of idling can expose a marginal cooling system, tired battery, worn tyre or ageing fluid sooner than an owner expects. The goal is not to replace parts early without reason; it is to identify the items that can cause a breakdown, safety issue or more expensive repair if ignored.", "قد تكشف الحرارة والازدحام والغبار والرحلات القصيرة وفترات التوقف الطويلة ضعف نظام التبريد أو البطارية أو الإطارات أو السوائل مبكراً. الهدف ليس تبديل القطع بلا سبب، بل تحديد ما قد يؤدي إلى تعطل أو مشكلة سلامة أو إصلاح أغلى إذا تم تجاهله.") })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Diagnostics and typical repair planning", "التشخيص وخطة الإصلاح المناسبة") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t(`For ${article.brand} work, the diagnostic focus is ${article.diagnosticFocus}. The technician should connect the symptom to evidence, then explain the order of work. A thoughtful plan often starts with the least invasive checks, confirms the source of the issue, and only then moves to repair or component replacement.`, `يركز تشخيص ${article.brand} على ${article.diagnosticFocus}. يربط الفني العَرَض بالدليل ثم يشرح ترتيب العمل. تبدأ الخطة المدروسة عادة بأقل الاختبارات تدخلاً، وتؤكد مصدر المشكلة، ثم تنتقل إلى الإصلاح أو الاستبدال.`) }),
              /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3 text-gray-300", children: article.repairFocus.map((repair) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
                /* @__PURE__ */ jsx("span", { children: repair })
              ] }, repair)) }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 leading-relaxed text-gray-300", children: t("A written inspection result helps you decide what is urgent, what can be scheduled, and which preventive items are genuinely worthwhile. It also gives you a useful record if you are comparing options, planning a long journey or preparing the car for sale.", "تساعدك نتيجة الفحص المكتوبة على معرفة ما هو عاجل وما يمكن جدولته وما يستحق الصيانة الوقائية فعلاً. كما توفر سجلاً مفيداً عند مقارنة الخيارات أو التخطيط للسفر أو تجهيز السيارة للبيع.") })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Maintenance in Dubai: plan by condition, not guesswork", "الصيانة في دبي: خطة مبنية على الحالة لا التخمين") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: article.maintenanceNote }),
              article.brand === "Mercedes-Benz" && /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: t("Is a Mercedes reliable for Gulf ownership?", "هل تناسب مرسيدس الاستخدام في الخليج؟") }),
                /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-300", children: t("Reliability depends on the individual car: generation, engine, equipment, maintenance, previous repairs and current condition. Check the cooling system, AC, batteries, tyres and warning history alongside the due schedule. A high or low mileage reading alone does not establish whether a car is a sensible purchase.", "تعتمد الاعتمادية على السيارة نفسها: جيل الطراز والمحرك والتجهيزات والصيانة والإصلاحات السابقة والحالة الحالية. راجع التبريد والتكييف والبطاريات والإطارات وسجل التحذيرات مع الصيانة المستحقة. المسافة المقطوعة وحدها لا تكفي للحكم على ملاءمة الشراء.") }),
                !isArabic && /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/pre-purchase-inspection-dubai-guide", className: "inline-block font-semibold text-burnt-orange hover:underline", children: "What a pre-purchase inspection should cover" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("A practical maintenance conversation covers engine oil and filters, brake condition, tyres, battery health, cooling performance, air-conditioning, fluids, leaks, service records and any stored warning codes. For performance, luxury and older vehicles, it also helps to discuss storage, battery conditioning and how often the car is driven. This gives the workshop a fuller picture than a mileage number on its own.", "تشمل مناقشة الصيانة العملية زيت المحرك والفلاتر والفرامل والإطارات والبطارية والتبريد والمكيف والسوائل والتسريبات وسجل الصيانة ورموز الأعطال المخزنة. وفي السيارات الفاخرة أو عالية الأداء أو الأقدم، تفيد معرفة مدة التخزين وطريقة شحن البطارية وعدد مرات الاستخدام، لأن هذه الصورة أدق من رقم المسافة وحده.") })
            ] })
          ] }),
          article.brand === "Ferrari" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Ferrari service schedule in Dubai: time matters as much as mileage", "جدول صيانة فيراري في دبي: الوقت مهم بقدر المسافة") }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 leading-relaxed text-gray-300", children: [
                t("Ferrari states that its 7-Year Genuine Maintenance programme provides scheduled maintenance every 20,000 km or once a year, without a mileage restriction on the annual option. Treat that as a useful reference point, then check the handbook and service history for your exact model because limited editions, classic cars and vehicles outside the programme may have different requirements.", "توضح فيراري أن برنامج الصيانة الأصلية لمدة سبع سنوات يعتمد الصيانة كل 20,000 كيلومتر أو مرة سنوياً. استخدم ذلك كمرجع أولي، ثم راجع دليل الطراز وسجل الصيانة لأن السيارات الكلاسيكية والإصدارات المحدودة والسيارات خارج البرنامج قد تختلف متطلباتها."),
                " ",
                /* @__PURE__ */ jsx("a", { href: "https://www.ferrari.com/en-EN/auto/car-part-services-warranty-maintenance", target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-burnt-orange hover:underline", children: t("Ferrari maintenance programme details", "تفاصيل برنامج صيانة فيراري") }),
                "."
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("Low mileage does not remove the need for annual attention. Heat cycles, long storage, battery condition, tyre age, fluid ageing and seals can all matter before the odometer reaches the next distance-based interval. Cars used on track or driven hard should be assessed around that use rather than relying on the calendar alone.", "قلة المسافة لا تلغي الحاجة إلى المتابعة السنوية. تؤثر الحرارة والتخزين الطويل وحالة البطارية وعمر الإطارات وتقادم السوائل والأختام حتى قبل بلوغ موعد المسافة التالي. أما سيارات الحلبة أو الاستخدام القوي فتحتاج إلى فحص يناسب طريقة استخدامها.") })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("What a Ferrari maintenance visit can include", "ماذا يمكن أن تشمل زيارة صيانة فيراري؟") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("There is no single package for every Ferrari. The due work should be selected from the exact model, model year, programme or handbook information and documented history, then adjusted only when inspection evidence supports it.", "لا توجد باقة واحدة تناسب جميع سيارات فيراري. تُحدد الأعمال المستحقة وفق الطراز وسنة الصنع ومعلومات البرنامج أو الدليل والسجل الموثق، ولا تضاف أعمال أخرى إلا عندما تدعمها نتيجة الفحص.") }),
              /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3 text-gray-300", children: [
                t("Model-approved engine oil, filter and other due consumables", "زيت المحرك والفلاتر والمواد المستحقة بالمواصفات المناسبة للطراز"),
                t("Fluid condition, visible leaks, cooling and heat-management checks", "حالة السوائل والتسريبات الظاهرة وفحص التبريد وإدارة الحرارة"),
                t("Tyre age and wear, brake condition, suspension and battery health", "عمر الإطارات وتآكلها وحالة الفرامل والتعليق والبطارية"),
                t("Supported system scan, warning review and service reset where applicable", "فحص الأنظمة المدعومة ومراجعة التحذيرات وإعادة ضبط الخدمة عند انطباقها"),
                t("Written findings with due, urgent and optional work separated", "تقرير مكتوب يفصل بين الأعمال المستحقة والعاجلة والاختيارية")
              ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
                /* @__PURE__ */ jsx("span", { children: item })
              ] }, item)) }),
              /* @__PURE__ */ jsxs("p", { className: "mt-5 leading-relaxed text-gray-300", children: [
                t("For the next step, review our ", "للخطوة التالية، راجع صفحة "),
                /* @__PURE__ */ jsx(LocalizedLink, { to: b4Link("/brands/ferrari-service-dubai/oil-change"), className: "font-semibold text-burnt-orange hover:underline", children: t("Ferrari oil service", "خدمة زيت فيراري") }),
                t(", ", "، و"),
                /* @__PURE__ */ jsx(LocalizedLink, { to: b4Link("/brands/ferrari-service-dubai/engine-diagnostics"), className: "font-semibold text-burnt-orange hover:underline", children: t("Ferrari diagnostics", "تشخيص فيراري") }),
                t(" or ", " أو "),
                /* @__PURE__ */ jsx(LocalizedLink, { to: b4Link("/brands/ferrari-service-dubai/transmission-repair"), className: "font-semibold text-burnt-orange hover:underline", children: t("F1 and dual-clutch transmission assessment", "فحص ناقل الحركة F1 وثنائي القابض") }),
                t(" pages for the workshop scope behind each concern.", " لمعرفة نطاق الورشة لكل حالة.")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("What affects Ferrari maintenance cost in Dubai?", "ما العوامل التي تحدد تكلفة صيانة فيراري في دبي؟") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("A responsible workshop cannot quote one Ferrari maintenance price without knowing the car. The cost changes with the model, generation, mileage, service history, scheduled scope and the evidence found during inspection. A routine annual visit is different from resolving an F1 gearbox concern, a cooling fault or deferred maintenance on a stored car.", "لا يمكن تقديم سعر واحد مسؤول لصيانة جميع سيارات فيراري من دون معرفة السيارة. تتغير التكلفة حسب الطراز والجيل والمسافة والسجل ونطاق الصيانة ونتيجة الفحص. تختلف الزيارة السنوية المعتادة تماماً عن إصلاح ناقل حركة F1 أو عطل تبريد أو صيانة مؤجلة لسيارة مخزنة.") }),
              /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3 text-gray-300", children: [
                t("The exact model, engine, transmission and model year", "الطراز والمحرك وناقل الحركة وسنة الصنع"),
                t("Scheduled fluids, filters, plugs and other required consumables", "السوائل والفلاتر وشمعات الاحتراق والمواد المطلوبة"),
                t("Diagnostic time for warning lights, drivability or electronic faults", "وقت التشخيص لرسائل التحذير أو مشكلات القيادة والإلكترونيات"),
                t("Tyre age, brake condition, suspension wear and battery health", "عمر الإطارات وحالة الفرامل والتعليق والبطارية"),
                t("OEM parts availability and any work discovered after inspection", "توفر القطع الأصلية وأي أعمال تظهر بعد الفحص")
              ].map((factor) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
                /* @__PURE__ */ jsx("span", { children: factor })
              ] }, factor)) }),
              /* @__PURE__ */ jsxs("p", { className: "mt-5 leading-relaxed text-gray-300", children: [
                t("Ask for an itemised estimate that separates diagnostics, labour, parts and optional preventive work. For a direct service overview or to arrange an inspection, visit our ", "اطلب عرضاً مفصلاً يفصل التشخيص والعمالة والقطع والأعمال الوقائية الاختيارية. للاطلاع على الخدمات أو حجز فحص، زر صفحة "),
                /* @__PURE__ */ jsx(LocalizedLink, { to: b4Link("/brands/ferrari-service-dubai"), className: "font-semibold text-burnt-orange hover:underline", children: t("Ferrari service Dubai page", "خدمة فيراري في دبي") }),
                "."
              ] })
            ] }),
            !isArabic && /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: "Ferrari service information by model" }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl leading-relaxed text-gray-300", children: "Use the model guides when the engine, transmission, suspension, braking or hybrid architecture changes the inspection path." }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
                ["Ferrari 488", "/brands/ferrari-service-dubai/488"],
                ["Ferrari F8 Tributo", "/brands/ferrari-service-dubai/f8-tributo"],
                ["Ferrari Roma", "/brands/ferrari-service-dubai/roma"],
                ["Ferrari SF90", "/brands/ferrari-service-dubai/sf90"],
                ["Ferrari 296", "/brands/ferrari-service-dubai/296"],
                ["Ferrari Portofino", "/brands/ferrari-service-dubai/portofino"],
                ["Ferrari 812", "/brands/ferrari-service-dubai/812"],
                ["Ferrari Purosangue", "/brands/ferrari-service-dubai/purosangue"]
              ].map(([label, path]) => /* @__PURE__ */ jsxs(LocalizedLink, { to: path, className: "card-premium rounded-xl p-4 text-sm font-bold transition-colors hover:text-burnt-orange", children: [
                label,
                /* @__PURE__ */ jsx(ArrowRight, { className: "mt-2 h-4 w-4 text-burnt-orange" })
              ] }, path)) })
            ] })
          ] }),
          article.brand === "Lamborghini" && /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Plan Lamborghini maintenance around the fitted vehicle", "خطط لصيانة لامبورغيني وفق السيارة وتجهيزاتها") }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("An Urus, a Huracán and an Aventador do not share one gearbox or one service procedure. Record the model, year, VIN, service history, warning text and storage pattern before requesting an estimate. The fitted transmission, brake hardware, suspension and fluid specifications determine the relevant checks; a generic “Lamborghini service package” cannot establish them.", "لا تستخدم أوروس وهوراكان وأفينتادور ناقل الحركة نفسه أو إجراءات صيانة واحدة. جهّز الطراز والسنة ورقم الهيكل وسجل الصيانة ونص التحذير وطريقة التخزين قبل طلب عرض السعر. يحدد ناقل الحركة والفرامل والتعليق والسوائل المركبة الفحوص المناسبة، ولا تكفي باقة عامة لتحديدها.") }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("For a car driven infrequently, ask for a condition-based review of low-voltage battery health, tyre age, visible fluid leaks and brake condition alongside the applicable schedule. A warning or a harsh shift should be assessed before a part or fluid change is approved. Hybrid models also require the workshop to confirm any high-voltage scope separately; this guide does not promise traction-battery repair.", "إذا كانت السيارة قليلة الاستخدام، اطلب مراجعة حالة البطارية منخفضة الجهد وعمر الإطارات والتسريبات الظاهرة والفرامل مع الجدول المناسب. يجب تقييم التحذير أو تبديل السرعات القاسي قبل اعتماد قطعة أو تغيير سائل. وتتطلب الطرازات الهجينة تأكيد نطاق الجهد العالي بصورة منفصلة؛ ولا يعد هذا الدليل بإصلاح بطارية الجر.") }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 leading-relaxed text-gray-300", children: [
              t("Request an estimate that separates inspection, due maintenance and optional findings. For a gearbox warning, follow the ", "اطلب عرضاً يفصل الفحص والصيانة المستحقة والملاحظات الاختيارية. عند تحذير ناقل الحركة، راجع صفحة "),
              /* @__PURE__ */ jsx(LocalizedLink, { to: b4Link("/brands/lamborghini-service-dubai/transmission-repair"), className: "font-semibold text-burnt-orange hover:underline", children: t("Lamborghini transmission assessment", "فحص ناقل حركة لامبورغيني") }),
              t("; for an unexplained engine warning, use the ", "؛ ولتحذير المحرك غير الواضح، راجع صفحة "),
              /* @__PURE__ */ jsx(LocalizedLink, { to: b4Link("/brands/lamborghini-service-dubai/engine-diagnostics"), className: "font-semibold text-burnt-orange hover:underline", children: t("diagnostics page", "التشخيص") }),
              "."
            ] })
          ] }),
          (article.brand === "Ferrari" || article.brand === "Lamborghini") && /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t(`When to stop driving a ${article.brand}`, `متى تتوقف عن قيادة ${article.brand}؟`) }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("A red oil-pressure or brake warning, overheating, smoke, a strong fuel smell or a sudden handling change calls for a safe stop and advice before the car is driven farther. For other warnings, record the exact message and when it appears. Avoid repeatedly clearing faults before an inspection, because stored information may help identify the affected system.", "يتطلب تحذير ضغط الزيت أو الفرامل الأحمر أو ارتفاع الحرارة أو الدخان أو رائحة وقود قوية أو تغيراً مفاجئاً في التحكم التوقف بأمان وطلب المشورة قبل متابعة القيادة. وللتحذيرات الأخرى، دوّن الرسالة ووقت ظهورها. تجنب مسح الأعطال مراراً قبل الفحص لأن البيانات المحفوظة قد تساعد في تحديد النظام المعني.") })
          ] }),
          article.brand !== "Ferrari" && article.brand !== "Lamborghini" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: !hasConfiguratorTuning || !isArabic && article.brand === "Aston Martin" ? t("Parts, fluids and confirmed workshop scope", "القطع والسوائل ونطاق العمل المؤكد") : t("OEM parts, alternatives and performance work", "القطع الأصلية والبدائل وتطوير الأداء") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("Parts choices should be transparent. The workshop should tell you whether a component is genuine OEM, OEM-equivalent or aftermarket, why it suits the job, and what warranty terms apply. The right choice depends on the repair: safety, electronics, complex driveline components and software-sensitive systems deserve especially careful sourcing.", "يجب أن يكون اختيار القطع واضحاً. من حقك معرفة ما إذا كانت القطعة أصلية أو مكافئة لمواصفات المصنع أو من سوق البدائل، ولماذا تناسب الإصلاح وما شروط ضمانها. تحتاج مكونات السلامة والإلكترونيات وناقل الحركة والأنظمة الحساسة للبرمجة إلى عناية خاصة في الاختيار.") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: isArabic && ["BMW", "Audi"].includes(article.brand) ? `تُراجع الحالة الميكانيكية لسيارة ${article.brand} وفق نتائج التشخيص وحالة التبريد والفرامل والإطارات وطريقة الاستخدام. تُسجل التعديلات الموجودة ضمن معلومات الفحص، وتُقترح الصيانة أو الإصلاح وفق النتائج.` : article.performanceNote })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("What a useful inspection should give you", "ماذا يجب أن يمنحك الفحص المفيد؟") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t(`A workshop visit should leave ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} owner with more than a list of parts. The useful outcome is a clear hierarchy: safety and breakdown risks first, faults that are confirmed by testing second, preventive work that makes sense for the car’s age and use third, and cosmetic or optional work last. This avoids treating every observation as an urgent repair while also preventing small concerns from being forgotten.`, `يجب أن يغادر مالك ${article.brand} الورشة بأكثر من قائمة قطع. النتيجة المفيدة هي ترتيب واضح: مخاطر السلامة والتعطل أولاً، ثم الأعطال المؤكدة بالاختبار، ثم الصيانة الوقائية المناسبة للعمر والاستخدام، وأخيراً الأعمال التجميلية أو الاختيارية. هكذا لا تتحول كل ملاحظة إلى إصلاح عاجل ولا تُنسى المشكلات الصغيرة.`) }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("Ask for the symptom, the evidence behind the recommendation, the proposed repair, the parts specification and the expected next step. If a fault is intermittent, video, temperature, speed, warning-light timing and recent driving conditions can all be valuable clues. That context is often the difference between finding the root cause and repeating the same diagnostic visit.", "اسأل عن العَرَض والدليل وراء التوصية والإصلاح المقترح ومواصفات القطع والخطوة التالية. وإذا كان العطل متقطعاً، فقد يكون الفيديو ودرجة الحرارة والسرعة وتوقيت رسالة التحذير وظروف القيادة أدلة مهمة للوصول إلى السبب الجذري.") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: article.brand === "Rolls-Royce" ? t("A documented condition assessment can establish a useful baseline for an existing owner. It may record tyre age, brake condition, fluids, visible leaks, low-voltage battery health, fault memory and exposed suspension or cooling components within the agreed scope. Pre-purchase inspection is not advertised here without separate capability confirmation.", "يمكن لفحص الحالة الموثق أن يحدد نقطة مرجعية مفيدة للمالك، تشمل عمر الإطارات وحالة الفرامل والسوائل والتسريبات الظاهرة والبطارية منخفضة الجهد وذاكرة الأعطال ومكونات التعليق أو التبريد ضمن النطاق المتفق عليه. لا تعلن الصفحة عن فحص ما قبل الشراء من دون تأكيد منفصل للقدرة.") : t(`For a used ${article.brand}, an inspection before purchase or before an extended trip can also establish a baseline. It can document tyre age, brake life, fluid condition, leak evidence, battery health, fault memory and the condition of exposed suspension and cooling components. The report is useful even when the car has no immediate fault because it helps the owner plan realistically.`, `في سيارة ${article.brand} مستعملة، يحدد فحص ما قبل الشراء أو السفر حالة مرجعية تشمل عمر الإطارات وحالة الفرامل والسوائل والتسريبات والبطارية وذاكرة الأعطال ومكونات التعليق والتبريد الظاهرة. يفيد التقرير حتى عند عدم وجود عطل فوري لأنه يساعد المالك على التخطيط الواقعي.`) })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("A Dubai maintenance checklist for luxury and performance cars", "قائمة صيانة سيارات الأداء والفخامة في دبي") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("Service intervals in the handbook are a starting point, not a substitute for observation. Dubai places sustained demand on cooling and air-conditioning systems, and city traffic can add heat cycles without adding many kilometres. Owners should pay attention to changes in operating temperature, weak cooling, hard starting, vibrations, tyre pressure changes, braking feel, new noises and any warning message, even if it disappears.", "فترات الصيانة في الكتيب نقطة بداية وليست بديلاً عن المراقبة. تضغط دبي باستمرار على التبريد والتكييف، ويضيف ازدحام المدينة دورات حرارية من دون زيادة كبيرة في الكيلومترات. راقب تغير الحرارة وضعف التبريد وصعوبة التشغيل والاهتزاز وضغط الإطارات وإحساس الفرامل والأصوات ورسائل التحذير حتى لو اختفت.") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: article.brand === "Rolls-Royce" ? t("For combustion models, a sensible routine includes the correct engine oil and approved fluids at the appropriate interval. Across the range, tyres, brakes and the low-voltage battery deserve condition-based checks, especially when a car is stored. Spectre follows an electric-vehicle maintenance path and is not included in engine-oil servicing. Low mileage does not stop tyres, seals, fluids or low-voltage batteries from ageing.", "لطرازات الاحتراق، يشمل الروتين المناسب زيت المحرك الصحيح والسوائل المعتمدة في الموعد الملائم. وتحتاج الإطارات والفرامل والبطارية منخفضة الجهد إلى فحوص بحسب الحالة، خاصة عند تخزين السيارة. تتبع Spectre مسار صيانة كهربائياً ولا تشملها خدمة زيت المحرك. لا تمنع قلة المسافة تقادم الإطارات والأختام والسوائل والبطارية منخفضة الجهد.") : t("A sensible routine includes checking engine oil and approved fluids at the right interval, monitoring tyres for age and uneven wear, inspecting brake condition before it becomes a metal-on-metal issue, and keeping the battery and charging system healthy. Vehicles that sit for long periods need particular attention: low mileage does not stop tyres, seals, fluids or batteries from ageing. A short drive is not always enough to recharge a battery or bring all systems through a complete operating cycle.", "يشمل الروتين السليم فحص زيت المحرك والسوائل المعتمدة والإطارات وعمرها وتآكلها والفرامل قبل وصولها إلى احتكاك معدني، والمحافظة على البطارية ونظام الشحن. وتحتاج السيارات المخزنة إلى اهتمام خاص؛ فقلة المسافة لا تمنع تقادم الإطارات والأختام والسوائل والبطارية.") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t(`When booking, describe how the ${article.brand} is used: city commuting, chauffeur work, school runs, weekend driving, towing, track days, desert trips or storage. That information helps the workshop tailor the inspection. A vehicle driven gently in Al Quoz traffic has different priorities from one used for high-speed motorway trips or performance driving, even when both have the same mileage.`, `عند الحجز، اشرح طريقة استخدام ${article.brand}: تنقل يومي، عمل بسائق، رحلات مدرسية، قيادة نهاية الأسبوع، سحب، حلبة، صحراء أو تخزين. تساعد هذه المعلومات الورشة على تخصيص الفحص، لأن سيارة تعمل في ازدحام القوز تختلف أولوياتها عن سيارة الطرق السريعة أو القيادة الرياضية حتى عند تساوي المسافة.`) })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("How clear workshop communication protects your budget", "كيف يحمي التواصل الواضح ميزانيتك؟") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("Luxury-car repairs can become expensive when a workshop starts without a confirmed scope. A clear estimate should separate diagnosis, labour, parts, consumables and any work that could only be confirmed after dismantling. It should also identify which items are essential for safe operation and which are advisable but can be scheduled. That makes the decision yours rather than a surprise at collection time.", "قد تصبح إصلاحات السيارات الفاخرة مكلفة عندما يبدأ العمل من دون نطاق مؤكد. يفصل عرض السعر الواضح بين التشخيص والعمالة والقطع والمواد وما لا يمكن تأكيده إلا بعد الفك، ويحدد ما يلزم للسلامة وما يمكن جدولته، حتى يبقى القرار بيدك ولا تتحول الفاتورة إلى مفاجأة.") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("If the vehicle requires further testing, the workshop should explain why. For example, a fault code may need wiring checks, pressure tests, a fluid inspection or a road test before a module, compressor, gearbox part or suspension component is blamed. That process takes more care than a quick scan, but it is usually the better way to avoid replacing a costly part that was not the cause.", "إذا احتاجت السيارة إلى اختبارات إضافية، يجب شرح السبب. فقد يتطلب رمز العطل فحص الأسلاك أو الضغط أو السوائل أو تجربة الطريق قبل اتهام وحدة إلكترونية أو ضاغط أو جزء في ناقل الحركة أو التعليق. هذا أدق من المسح السريع ويمنع تبديل قطعة غالية ليست سبب المشكلة.") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t(`Keep invoices and inspection reports with the service record. They support resale, help a future technician understand what has been done, and give you evidence of the fluids, parts and preventative work used on the car. This is especially useful on ${article.brand} vehicles with complex maintenance histories or owners who plan to sell within the UAE.`, `احتفظ بالفواتير وتقارير الفحص مع سجل الصيانة. فهي تدعم قيمة البيع وتساعد الفني لاحقاً على فهم ما تم إنجازه وتوثق السوائل والقطع والأعمال الوقائية، وهذا مهم خصوصاً لسيارات ${article.brand} ذات التاريخ المعقد أو عند البيع داخل الإمارات.`) })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Before you book: information that speeds up diagnosis", "قبل الحجز: معلومات تسرّع التشخيص") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t(`You can make ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} appointment more productive by sharing the model, year, mileage, VIN where appropriate, recent service work and the exact concern. Mention whether the issue occurs only when cold, in traffic, at speed, under braking, after refuelling, while using air-conditioning or after the vehicle has been parked. A short video of a noise or warning message can be more useful than a broad description.`, `اجعل موعد ${article.brand} أكثر فاعلية بإرسال الطراز والسنة والمسافة ورقم الهيكل عند الحاجة والأعمال الأخيرة ووصف المشكلة بدقة. اذكر إن كانت تظهر عند البرودة أو في الازدحام أو السرعة أو الفرملة أو بعد التعبئة أو تشغيل المكيف أو الوقوف. وقد يكون فيديو قصير للصوت أو التحذير أوضح من وصف عام.`) }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: article.brand === "McLaren" || article.brand === "Rolls-Royce" || !isArabic && article.brand === "Aston Martin" ? t("For maintenance or repair, explain recent work, storage, upcoming travel and how the car is used. Ask the workshop to confirm the first inspection and accepted scope before arranging transport or relying on a preliminary estimate.", "للصيانة أو الإصلاح، اشرح الأعمال الأخيرة والتخزين والسفر القريب وطريقة استخدام السيارة. اطلب من الورشة تأكيد الفحص الأول ونطاق العمل المقبول قبل ترتيب نقل السيارة أو الاعتماد على تقدير أولي.") : t("For maintenance work, tell the workshop about upcoming travel, inspection deadlines, track use, towing or plans for an upgrade. For a pre-purchase check, allow enough time for a proper review rather than asking for a rushed decision at the seller’s location. The purpose is not to make the process complicated; it is to give the technician enough information to inspect the right systems first and give you a more reliable answer.", "في أعمال الصيانة، أخبر الورشة عن السفر القريب أو موعد الفحص أو استخدام الحلبة أو السحب أو خطة التطوير. وفي فحص ما قبل الشراء، امنح الفني وقتاً كافياً بدلاً من طلب قرار متسرع. الهدف هو تزويد الفني بالمعلومات اللازمة لفحص الأنظمة الصحيحة أولاً وتقديم إجابة أكثر موثوقية.") })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t(`When ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} should be inspected urgently`, `متى تحتاج ${article.brand} إلى فحص عاجل؟`) }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("Some symptoms should not wait for the next scheduled service. Stop and arrange advice promptly if you see an overheating message, a red oil-pressure or brake warning, a strong fuel smell, smoke, a major coolant loss, sudden loss of power, a steering change, a harsh new transmission behaviour or a suspension warning that changes how the car sits or handles. Continuing to drive can turn a contained issue into damage to an engine, transmission, brake system or safety-related component.", "بعض الأعراض لا تنتظر موعد الصيانة التالي. توقف واطلب المشورة عند ظهور سخونة أو تحذير أحمر لضغط الزيت أو الفرامل أو رائحة وقود قوية أو دخان أو فقدان كبير لسائل التبريد أو قوة المحرك أو تغير في التوجيه أو سلوك قاسٍ لناقل الحركة أو تحذير تعليق يؤثر في ارتفاع السيارة أو التحكم بها. استمرار القيادة قد يحول المشكلة إلى تلف أكبر.") }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: t("For less urgent warnings, note the exact message and whether the car drives normally. Do not clear codes repeatedly before the appointment, because stored information may help identify the cause. If you are unsure whether it is safe to continue, contact the workshop with the warning, model and current symptoms. Clear information allows the team to advise whether to bring the vehicle in, arrange recovery or schedule a controlled inspection. It also prevents wasted time, protects the vehicle’s service record and helps you make a calmer, better-informed decision. A short call before driving across Dubai may save a costly avoidable failure today.", "للتحذيرات الأقل إلحاحاً، دوّن الرسالة وهل تقود السيارة بصورة طبيعية، ولا تمسح الرموز مراراً قبل الموعد لأن البيانات المخزنة قد تكشف السبب. إذا شككت في سلامة الاستمرار، تواصل مع الورشة وأرسل التحذير والطراز والأعراض. تساعد هذه المعلومات الفريق على تحديد ما إذا كان يجب إحضار السيارة أو طلب سطحة أو ترتيب فحص، وقد تمنع عطلاً مكلفاً يمكن تجنبه.") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14 rounded-3xl border border-burnt-orange/25 bg-burnt-orange/5 p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Why book with DIGI-TEC in Al Quoz", "لماذا تحجز لدى ديجي-تك في القوز؟") }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: article.brand === "Range Rover" ? t("For a Range Rover enquiry, send DIGI-TEC in Al Quoz the model, year, history and due-service information or symptom. The team can confirm the fitted system and first inspection before proposing parts or a maintenance estimate.", "لاستفسار رينج روفر لدى ديجي-تك في القوز، أرسل الطراز والسنة والسجل ومعلومات الصيانة المستحقة أو العَرَض. يمكن للفريق تأكيد النظام المركب والفحص الأول قبل اقتراح القطع أو تقدير الصيانة.") : article.brand === "Jaguar" ? t("For a Jaguar enquiry, identify whether the car is a combustion model or electric I-PACE and describe the warning or driving change. DIGI-TEC in Al Quoz confirms supported diagnostic and repair scope before work is agreed.", "لاستفسار جاكوار، حدد ما إذا كانت السيارة بطراز احتراق أو I-PACE الكهربائية واشرح التحذير أو تغير القيادة. تؤكد ديجي-تك في القوز نطاق التشخيص والإصلاح المتاح قبل اعتماد العمل.") : article.brand === "McLaren" ? t("DIGI-TEC Performance Center is an independent workshop in Al Quoz Industrial Area 3, Dubai. For a McLaren enquiry, share the model, year, mileage and concern so the team can confirm the appropriate first assessment and workshop scope before work moves forward.", "ديجي-تك بيرفورمانس ورشة مستقلة في القوز الصناعية 3 بدبي. لاستفسار مكلارين، أرسل الطراز والسنة والمسافة والمشكلة حتى يؤكد الفريق الفحص الأول المناسب ونطاق العمل قبل بدء التنفيذ.") : article.brand === "Rolls-Royce" ? t("DIGI-TEC Performance Center is an independent workshop in Al Quoz Industrial Area 3, Dubai. Share the Rolls-Royce model, year, mileage, history and concern so the team can confirm the appropriate first assessment, accepted scope and appointment availability before work moves forward.", "ديجي-تك بيرفورمانس ورشة مستقلة في القوز الصناعية 3 بدبي. أرسل طراز رولز رويس والسنة والمسافة والسجل والمشكلة حتى يؤكد الفريق الفحص الأول والنطاق المقبول وتوفر الموعد قبل بدء العمل.") : article.brand === "Bentley" ? t("For a Bentley enquiry, tell DIGI-TEC in Al Quoz whether the concern is maintenance, a warning, ride quality or a fitted reversing-camera fault. Include the model, year and relevant equipment so the workshop can confirm its first assessment and accepted scope.", "لاستفسار بنتلي لدى ديجي-تك في القوز، وضح ما إذا كان الطلب صيانة أو تحذيراً أو تغيراً في الراحة أو عطلاً في كاميرا الرجوع المركبة. أرسل الطراز والسنة والتجهيزات ذات الصلة حتى يؤكد الفريق الفحص الأول والنطاق المقبول.") : article.brand === "Maybach" ? t("For a Mercedes-Maybach enquiry, send DIGI-TEC in Al Quoz the VIN, S-Class or GLS variant, warning and affected rear-cabin or chassis function. The team can then confirm a suitable first inspection and available scope before work is agreed.", "لاستفسار مرسيدس-مايباخ، أرسل إلى ديجي-تك في القوز رقم الهيكل وطراز فئة S أو GLS والتحذير والوظيفة المتأثرة في المقصورة الخلفية أو التعليق. عندها يمكن للفريق تأكيد الفحص الأول والنطاق المتاح قبل اعتماد العمل.") : t("DIGI-TEC Performance Center is located in Al Quoz Industrial Area 3, Dubai. Our team works with luxury, performance and everyday vehicles, using a clear inspection-first process, practical service advice and written communication before repair work moves forward. Whether you need routine maintenance, a warning-light diagnosis, a second opinion or a pre-purchase check, the aim is to give you a useful decision path—not vague recommendations.", "يقع مركز ديجي-تك بيرفورمانس في منطقة القوز الصناعية 3 بدبي. يعمل فريقنا على السيارات الفاخرة وعالية الأداء والسيارات اليومية بمنهج يبدأ بالفحص، وتوصيات عملية، وتواصل مكتوب قبل بدء الإصلاح. سواء احتجت إلى صيانة دورية أو تشخيص تحذير أو رأي ثانٍ أو فحص قبل الشراء، هدفنا أن نمنحك مسار قرار واضحاً لا توصيات مبهمة.") }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxs("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
              t("Request a Quote", "اطلب عرض سعر")
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
              t("Get Directions", "اعرض الموقع على الخريطة")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: t("Related services and useful next steps", "خدمات مرتبطة وخطوات تالية مفيدة") }),
          article.brandHub && !relatedServiceLinks.some((service) => service.href === article.brandHub) && /* @__PURE__ */ jsx("p", { className: "mt-4", children: /* @__PURE__ */ jsx(LocalizedLink, { to: b4Link(article.brandHub), className: "font-semibold text-burnt-orange underline underline-offset-4", children: t(`${article.brand} service and repair options`, `خدمات صيانة وإصلاح ${article.brand}`) }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4", children: relatedServiceLinks.map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: b4Link(service.href), className: "card-premium rounded-xl p-4 text-sm font-bold transition-colors hover:text-burnt-orange", children: [
            isArabic ? service.arLabel : service.label,
            /* @__PURE__ */ jsx(ArrowRight, { className: `mt-2 h-4 w-4 text-burnt-orange ${isArabic ? "rotate-180" : ""}` })
          ] }, service.href)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center text-2xl font-black sm:text-3xl", children: t(`${article.brand} workshop FAQs`, `الأسئلة الشائعة عن ورشة ${article.brand}`) }),
          /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mt-7 space-y-3", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${index}`, className: "rounded-2xl border border-white/10 bg-white/[0.03] px-5", children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { className: `${isArabic ? "text-right" : "text-left"} font-bold hover:no-underline`, children: faq.question }),
            /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, className: "leading-relaxed text-gray-300", children: faq.answer })
          ] }, faq.question)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14 border-t border-white/10 pt-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: t("Related workshop guides", "أدلة ورش مرتبطة") }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-3", children: relatedArticles.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: b4Link(item.path), className: "card-premium rounded-2xl p-5 transition-colors hover:text-burnt-orange", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-burnt-orange", children: t("Workshop Guide", "دليل الورشة") }),
            /* @__PURE__ */ jsx("h3", { className: "mt-2 font-bold", children: item.title })
          ] }, item.path)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: `fixed bottom-4 ${isArabic ? "left-4" : "right-4"} z-30 hidden rounded-2xl border border-burnt-orange/40 bg-black/95 p-4 shadow-2xl shadow-black/60 lg:block`, "aria-label": t("Book a workshop inspection", "احجز فحصاً في الورشة"), children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: t(`Book ${article.brand === "Aston Martin" ? "an" : "a"} ${article.brand} inspection`, `احجز فحص ${article.brand}`) }),
      /* @__PURE__ */ jsxs("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", className: "mt-3 inline-flex text-sm font-bold text-burnt-orange hover:underline", children: [
        t("WhatsApp DIGI-TEC", "تواصل مع ديجي-تك عبر واتساب"),
        " ",
        /* @__PURE__ */ jsx(ArrowRight, { className: `${isArabic ? "mr-1 rotate-180" : "ml-1"} h-4 w-4` })
      ] })
    ] }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const MercedesMaintenanceArticle = ({ article, isArabic }) => {
  const guide = mercedesMaintenanceGuide[isArabic ? "ar" : "en"];
  const url = `${SITE_URL}${isArabic ? "/ar" : ""}/blog/${article.slug}`;
  const datePublished = article.datePublished ?? "2026-07-16";
  const breadcrumb = buildBreadcrumb(url, [
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "/ar" : "/" },
    { name: isArabic ? "المقالات" : "Blog", url: isArabic ? "/ar/blog" : "/blog" },
    { name: guide.title, url }
  ]);
  const faq = buildFAQ(url, guide.faqs);
  useSeo({
    title: guide.metaTitle,
    description: guide.description,
    canonical: url,
    ogTitle: guide.title,
    ogDescription: guide.description,
    ogType: "article",
    twitterTitle: guide.title,
    twitterDescription: guide.description,
    twitterCard: "summary_large_image",
    jsonLd: pageGraph([
      buildWebPage({ url, name: guide.title, description: guide.description, type: "ItemPage", breadcrumbId: `${url}#breadcrumb`, datePublished, dateModified: MERCEDES_MAINTENANCE_UPDATED, mainEntityId: `${url}#article` }),
      breadcrumb,
      buildArticle({ url, headline: guide.title, description: guide.description, datePublished, dateModified: MERCEDES_MAINTENANCE_UPDATED, author: isArabic ? "فريق ورشة ديجي-تك" : "DIGI-TEC Workshop", section: isArabic ? "تخطيط الصيانة" : "Maintenance planning" }),
      ...faq ? [faq] : []
    ])
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": isArabic ? "مسار التنقل" : "Breadcrumb", className: "mx-auto max-w-6xl px-5 pt-6 text-sm text-gray-400 sm:px-6", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: isArabic ? "الرئيسية" : "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog", className: "hover:text-burnt-orange", children: isArabic ? "المقالات" : "Blog" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-off-white", children: isArabic ? "تخطيط صيانة مرسيدس" : "Mercedes maintenance planning" })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: `mt-5 bg-gradient-to-br ${article.coverGradient}`, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-24", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs font-bold uppercase tracking-[0.24em] text-burnt-orange", children: isArabic ? "دليل المالك" : "Owner guide" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black leading-tight sm:text-5xl lg:text-6xl", children: guide.title }),
        /* @__PURE__ */ jsxs("p", { className: "mt-5 text-sm text-gray-400", children: [
          isArabic ? "آخر تحديث: " : "Updated: ",
          MERCEDES_MAINTENANCE_UPDATED
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-gray-200", children: guide.description })
      ] }) }),
      /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20", children: [
        /* @__PURE__ */ jsx("nav", { "aria-label": isArabic ? "في هذا الدليل" : "In this guide", className: "mb-12 rounded-xl border border-white/10 bg-white/[0.03] p-5", children: /* @__PURE__ */ jsx("ol", { className: "grid gap-3 text-sm sm:grid-cols-2", children: guide.sections.map((section, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "text-gray-300 underline underline-offset-4 hover:text-burnt-orange", href: `#planning-${index + 1}`, children: section.heading }) }, section.heading)) }) }),
        guide.sections.map((section, index) => /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { id: `planning-${index + 1}`, className: "scroll-mt-28 text-2xl font-black sm:text-3xl", children: section.heading }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: section.text }),
          section.items && /* @__PURE__ */ jsx("ul", { className: "mt-5 list-disc space-y-3 ps-5 text-gray-300", children: section.items.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) }),
          section.links && /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-x-6 gap-y-3", children: section.links.map((link) => /* @__PURE__ */ jsx(LocalizedLink, { to: link.href, className: "font-semibold text-burnt-orange underline underline-offset-4", children: link.label }, link.href)) })
        ] }, section.heading)),
        /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: isArabic ? "أسئلة عن تخطيط الصيانة" : "Maintenance-planning questions" }),
          /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mt-7 space-y-3", children: guide.faqs.map((item, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `planning-faq-${index}`, className: "rounded-2xl border border-white/10 bg-white/[0.03] px-5", children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { className: `${isArabic ? "text-right" : "text-left"} font-bold hover:no-underline`, children: item.question }),
            /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, className: "leading-relaxed text-gray-300", children: item.answer })
          ] }, item.question)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14 border-t border-white/10 pt-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: isArabic ? "أدلة تساعدك في الخطوة التالية" : "Continue with the detail you need" }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-3", children: guide.related.map((link) => /* @__PURE__ */ jsx(LocalizedLink, { to: link.href, className: "card-premium rounded-2xl p-5 font-semibold hover:text-burnt-orange", children: link.label }, link.href)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const BrandWorkshopArticlePage = () => {
  const { isArabic, localizedPath } = useLocale();
  const { slug } = useParams();
  const sourceArticle = slug ? getBrandWorkshopArticle(slug) : void 0;
  if (!sourceArticle) return /* @__PURE__ */ jsx(Navigate, { to: localizedPath("/blog"), replace: true });
  if (sourceArticle.slug === "mercedes-benz-maintenance-guide-dubai") return /* @__PURE__ */ jsx(MercedesMaintenanceArticle, { article: sourceArticle, isArabic });
  const article = isArabic ? localizeBrandWorkshopArticleToArabic(sourceArticle) : sourceArticle;
  return /* @__PURE__ */ jsx(BrandWorkshopArticleContent, { article, isArabic });
};
const DATE_PUBLISHED = "2026-08-31";
const DATE_MODIFIED = "2026-09-14";
const PORSCHE_OG_IMAGE = "/images/porsche-service-dubai-hero.jpg";
const porscheServiceLinks = [
  { label: "Porsche service & repair hub", path: PORSCHE_HUB_PATH },
  { label: "Porsche engine oil service", path: `${PORSCHE_HUB_PATH}/oil-change` },
  { label: "Porsche PDK & transmission repair", path: `${PORSCHE_HUB_PATH}/transmission-repair` },
  { label: "Porsche brake inspection & repair", path: `${PORSCHE_HUB_PATH}/brake-repair` },
  { label: "Porsche diagnostics", path: `${PORSCHE_HUB_PATH}/engine-diagnostics` }
];
const guideGroups = [
  {
    title: "Service schedule, scope & fluids",
    description: "Start with the exact vehicle schedule, then separate routine work from items due only at a particular time or distance.",
    slugs: ["service-intervals-uae", "how-often-service-dubai", "major-vs-minor-service", "oil-change-intervals", "pdk-service-intervals", "maintenance-cost-dubai"]
  },
  {
    title: "Dubai conditions & ownership checks",
    description: "Understand how heat, traffic, short trips and storage affect condition checks without inventing one replacement interval for every Porsche.",
    slugs: ["battery-life-dubai", "dubai-heat", "ac-maintenance-dubai", "cooling-maintenance", "brake-wear-dubai", "tyre-wear-dubai"]
  },
  {
    title: "Buying, warnings & workshop planning",
    description: "Prepare for an inspection, compare workshop scope and make decisions from the evidence found on the individual car.",
    slugs: ["pre-purchase-inspection-checklist", "buying-used-porsche-dubai", "dealer-vs-independent-specialist", "warning-lights", "common-problems-dubai"]
  },
  {
    title: "Model maintenance guides",
    description: "Use a model guide when the powertrain, transmission, chassis or high-voltage architecture changes the maintenance path.",
    slugs: ["macan-maintenance", "718-maintenance", "taycan-maintenance"]
  }
];
const porscheFaqs = [
  {
    question: "How often should a Porsche be serviced in Dubai?",
    answer: "Follow the maintenance information for the exact model, model year, powertrain and market, together with its recorded history and service display. Dubai heat, traffic, short trips, storage or performance use can justify earlier condition checks, but they do not create one universal replacement interval."
  },
  {
    question: "What is included in a Porsche maintenance service?",
    answer: "The scope is the set of items due for the exact car. A routine visit may include approved engine oil and filter where applicable, a vehicle inspection and checks of brakes, tyres and fluids. PDK service, spark plugs, brake fluid and filters are separate items only when due."
  },
  {
    question: "How much does Porsche maintenance cost in Dubai?",
    answer: "Cost depends on the model, generation, powertrain, scheduled scope, parts and fluid specifications, labour access and any findings that require diagnosis or repair. Compare itemised estimates containing the same work rather than relying on one generic online price."
  }
];
const PorscheGuidesIndex = () => {
  const url = `${SITE_URL}${PORSCHE_GUIDES_PARENT_PATH}`;
  const title = "Porsche Maintenance Dubai: Service Guide | Digi-Tec";
  const headline = "Porsche Maintenance in Dubai: Intervals & What Is Included";
  const description = "Porsche maintenance in Dubai: model-specific service intervals, what routine servicing includes, oil, PDK and brake-fluid guidance, and booking advice.";
  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to plan Porsche maintenance.\n\nModel and year: \nMileage: \nService history / last service: \nWarning or symptoms: \nPreferred appointment: ")}`;
  const guideList = {
    "@type": "ItemList",
    "@id": `${url}#guide-list`,
    name: "Porsche maintenance and ownership guides",
    numberOfItems: porscheOwnershipGuides.length,
    itemListElement: porscheOwnershipGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.name,
      url: `${SITE_URL}${PORSCHE_GUIDES_PATH}/${guide.slug}`
    }))
  };
  useSeo({
    title,
    description,
    canonical: url,
    ogTitle: title,
    ogDescription: description,
    ogImage: `${SITE_URL}${PORSCHE_OG_IMAGE}`,
    ogImageAlt: "Porsche inside the DIGI-TEC workshop in Dubai",
    ogType: "article",
    jsonLd: pageGraph([
      buildWebPage({
        url,
        type: "ItemPage",
        name: headline,
        description,
        breadcrumbId: `${url}#breadcrumb`,
        primaryImage: PORSCHE_OG_IMAGE,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        mainEntityId: `${url}#article`
      }),
      buildBreadcrumb(url, [
        { name: "Home", url: SITE_URL },
        { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` },
        { name: "Maintenance Guide", url }
      ]),
      buildArticle({
        url,
        headline,
        description,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        author: "DIGI-TEC Workshop",
        image: PORSCHE_OG_IMAGE,
        section: "Porsche Maintenance Guides",
        keywords: "Porsche maintenance Dubai, Porsche service intervals, Porsche service cost Dubai, Porsche PDK service"
      }),
      guideList,
      buildFAQ(url, porscheFaqs)
    ])
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_HUB_PATH, className: "hover:text-burnt-orange", children: "Porsche" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white", children: "Maintenance Guide" })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "h-9 w-9 text-burnt-orange" }),
        /* @__PURE__ */ jsx("p", { className: "eyebrow mt-5", children: "Porsche ownership guide" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-4 max-w-5xl text-4xl font-black leading-tight sm:text-6xl", children: headline }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-4xl text-lg leading-relaxed text-white/70", children: "Use this page to find the right Porsche maintenance answer, then continue to the exact interval, component, model or workshop service you need." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
            "Plan my Porsche service"
          ] }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: PORSCHE_HUB_PATH, className: "btn-secondary", children: [
            /* @__PURE__ */ jsx(Wrench, { className: "h-5 w-5" }),
            "View Porsche workshop services"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-white/45", children: /* @__PURE__ */ jsx("time", { dateTime: DATE_MODIFIED, children: "Updated 14 September 2026" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-burnt-orange/30 bg-burnt-orange/[0.07] p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Quick answer" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Porsche service intervals in Dubai" }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg leading-relaxed text-white/75", children: "Porsche maintenance should follow the schedule for the exact model, model year, powertrain, market and recorded history. A routine visit may include approved engine oil and filter where applicable, vehicle inspection, and checks of brakes, tyres and fluids; PDK service, spark plugs, brake fluid and filters are separate items only when due." }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-white/60", children: "Dubai heat, traffic, short trips and storage can justify earlier condition checks, but not one universal replacement interval. Use the focused guides below for detail rather than applying a number from another model or market." }),
          /* @__PURE__ */ jsx("div", { className: "mt-7 grid gap-4 sm:grid-cols-3", children: [
            ["1. Identify the vehicle", "Confirm the model, year, powertrain, market specification and service records."],
            ["2. Confirm what is due", "Separate time- and distance-based items from diagnosis or discovered repairs."],
            ["3. Check actual condition", "Use inspection evidence for heat-, storage- or usage-related recommendations."]
          ].map(([step, detail]) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-black/30 p-5", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-burnt-orange" }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 font-black", children: step }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-white/55", children: detail })
          ] }, step)) })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-white/[0.02] py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
            /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Workshop pathways" }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-4xl", children: "Porsche workshop services in Dubai" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-white/60", children: "These pages explain the inspection and workshop scope. Use the ownership guides below when you need background before deciding what to book." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: porscheServiceLinks.map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: service.path, className: "card-premium group flex min-h-32 flex-col justify-between rounded-2xl p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-black group-hover:text-burnt-orange", children: service.label }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "mt-5 h-5 w-5 text-burnt-orange" })
          ] }, service.path)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Maintenance knowledge centre" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Choose the guide that matches your question" }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl leading-relaxed text-white/60", children: "Each guide owns one focused topic so interval, cost, fluid and model advice stays specific instead of being repeated as generic guidance." }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 space-y-14", children: guideGroups.map((group) => {
            const guides2 = porscheOwnershipGuides.filter((guide) => group.slugs.includes(guide.slug));
            return /* @__PURE__ */ jsxs("section", { "aria-labelledby": `guide-group-${group.slugs[0]}`, children: [
              /* @__PURE__ */ jsx("h3", { id: `guide-group-${group.slugs[0]}`, className: "text-2xl font-black sm:text-3xl", children: group.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl leading-relaxed text-white/55", children: group.description }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: guides2.map((guide) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${PORSCHE_GUIDES_PATH}/${guide.slug}`, className: "card-premium group rounded-2xl p-6", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-black group-hover:text-burnt-orange", children: guide.name }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: guide.answer }),
                /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
                  "Read guide ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                ] })
              ] }, guide.slug)) })
            ] }, group.title);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-white/[0.02] py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-4xl", children: "Porsche maintenance by model" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl leading-relaxed text-white/60", children: "Choose the exact vehicle family when its engine, transmission, chassis or high-voltage systems change the inspection and service path." }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: porscheModelNavigation.filter((model) => model.path).map((model) => /* @__PURE__ */ jsxs(LocalizedLink, { to: model.path, className: "card-premium group rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black group-hover:text-burnt-orange", children: [
              "Porsche ",
              model.title
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: model.description }),
            /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
              "View model guide ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ] })
          ] }, model.path)) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl font-black sm:text-4xl", children: "Porsche maintenance FAQs" }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4", children: porscheFaqs.map((faq) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-black", children: faq.question }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-white/65", children: faq.answer })
          ] }, faq.question)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-12 rounded-3xl border border-burnt-orange/30 bg-burnt-orange/[0.07] p-7 text-center sm:p-10", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: "Need a vehicle-specific Porsche maintenance plan?" }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl leading-relaxed text-white/65", children: "Send the model, year, mileage, service history and current warnings or symptoms. DIGI-TEC can confirm the appropriate first inspection before you approve any work." }),
            /* @__PURE__ */ jsxs("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", className: "btn-primary mt-7", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
              "WhatsApp the workshop"
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const BlogArticleRouter = () => {
  const { slug } = useParams();
  const { isArabic } = useLocale();
  if (!isArabic && slug === "porsche-maintenance-guide-dubai") return /* @__PURE__ */ jsx(PorscheGuidesIndex, {});
  if (!isArabic && slug && getPorscheModelByLegacyBlogSlug(slug)) return /* @__PURE__ */ jsx(PorscheModelPage, {});
  if (!isArabic && slug && getMercedesModelByLegacyBlogSlug(slug)) return /* @__PURE__ */ jsx(MercedesModelPage, {});
  return slug && getBrandWorkshopArticle(slug) ? /* @__PURE__ */ jsx(BrandWorkshopArticlePage, {}) : /* @__PURE__ */ jsx(BlogPost, {});
};
export {
  BlogArticleRouter as default
};
