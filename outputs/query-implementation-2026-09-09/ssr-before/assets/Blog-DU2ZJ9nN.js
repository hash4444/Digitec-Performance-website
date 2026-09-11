import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default, { useState, useMemo } from "react";
import { u as useLocale, ae as brandWorkshopArticleSummaries, af as blogPosts, p as pageGraph, ag as organizationRef, b as buildWebPage, a as buildBreadcrumb, e as useSeo, H as Header, ah as blogCategories, L as LocalizedLink, F as FinalCTA, f as Footer } from "../entry-server.js";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { l as localizePostSummaryToArabic, c as categoryArabic } from "./ar-blog-DylLIgex.js";
import { P as PageIntro } from "./PageIntro-BZbZzflk.js";
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
import "@radix-ui/react-accordion";
const Blog = () => {
  const { isArabic } = useLocale();
  const [activeCategory, setActiveCategory] = useState("All");
  const url = `https://digitecme.com${isArabic ? "/ar" : ""}/blog`;
  const allPosts = [...brandWorkshopArticleSummaries, ...blogPosts].map((post) => isArabic ? localizePostSummaryToArabic(post) : post).sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
  const blogGraph = React__default.useMemo(
    () => pageGraph([
      buildWebPage({
        url,
        name: isArabic ? "مدونة السيارات في دبي | مركز ديجي-تك" : "Automotive Blog Dubai | Digitec Performance Center",
        description: isArabic ? "مقالات وإرشادات عربية عن صيانة السيارات الفاخرة وإصلاحها وتطوير أدائها والعناية بها في دبي." : "Expert insights on Mercedes service, GAD tuning, ceramic coating and luxury car care in Dubai.",
        type: "CollectionPage",
        breadcrumbId: `${url}#breadcrumb`,
        mainEntityId: `${url}#blog`
      }),
      buildBreadcrumb(url, [
        { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
        { name: isArabic ? "المقالات" : "Blog", url }
      ]),
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        name: isArabic ? "مدونة مركز ديجي-تك بيرفورمانس" : "Digitec Performance Center Blog",
        url,
        publisher: organizationRef,
        blogPost: allPosts.map((p) => ({
          "@type": "BlogPosting",
          "@id": `https://digitecme.com${isArabic ? "/ar" : ""}/blog/${p.slug}#article`,
          headline: p.title,
          url: `https://digitecme.com${isArabic ? "/ar" : ""}/blog/${p.slug}`,
          datePublished: p.date,
          author: organizationRef,
          publisher: organizationRef
        }))
      }
    ]),
    [allPosts, isArabic, url]
  );
  useSeo({
    title: isArabic ? "مدونة السيارات في دبي | مركز ديجي-تك" : "Automotive Blog Dubai | Digitec Performance Center",
    description: isArabic ? "مقالات وإرشادات عن صيانة السيارات الفاخرة وإصلاح مرسيدس وتطوير الأداء وحماية الطلاء والعناية بالسيارات في دبي." : "Expert insights on Mercedes service, GAD tuning, ceramic coating, and luxury car care in Dubai from Digitec Performance Center.",
    canonical: url,
    jsonLd: blogGraph
  });
  const filtered = useMemo(
    () => activeCategory === "All" ? allPosts : allPosts.filter((p) => p.category === activeCategory),
    [activeCategory, allPosts]
  );
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(
      PageIntro,
      {
        eyebrow: isArabic ? "خبرة ومعرفة" : "Insights & Expertise",
        title: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "مجلة ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "ديجي-تك" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "The ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Digitec" }),
          " Journal"
        ] }),
        description: isArabic ? "مقالات هندسية وأدلة لتطوير الأداء والعناية بالسيارات الفاخرة يكتبها فريق ورشتنا في دبي." : "Engineering insights, tuning deep dives, and luxury car care guides written by our Dubai workshop team."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "border-b border-white/[0.08] py-7", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-6 gap-y-3", children: blogCategories.map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveCategory(cat),
        className: `border-b py-2 text-sm font-medium transition-colors ${activeCategory === cat ? "border-burnt-orange text-white" : "border-transparent text-white/48 hover:border-white/30 hover:text-white"}`,
        children: isArabic ? categoryArabic[cat] ?? cat : cat
      },
      cat
    )) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3", children: filtered.map((post, idx) => /* @__PURE__ */ jsx(
        motion.article,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: idx * 0.08 },
          className: "group",
          children: /* @__PURE__ */ jsxs(
            LocalizedLink,
            {
              to: `/blog/${post.slug}`,
              className: "block h-full overflow-hidden",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `relative aspect-[16/10] overflow-hidden rounded-lg bg-gradient-to-br ${post.coverGradient}`,
                    children: post.coverImage && /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: post.coverImage,
                        alt: isArabic ? `صورة من ورشة ديجي-تك لمقال ${post.title}` : `Digi-Tec workshop illustration for ${post.title}`,
                        className: "absolute inset-0 h-full w-full object-cover object-center",
                        loading: idx < 3 ? "eager" : "lazy"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "pt-5", children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-burnt-orange", children: isArabic ? categoryArabic[post.category] ?? post.category : post.category }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-4 text-xs text-white/38", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
                      new Date(post.date).toLocaleDateString(isArabic ? "ar-AE" : "en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC"
                      })
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                      isArabic ? post.readTime.replace("min read", "دقيقة قراءة") : post.readTime
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("h2", { className: "mb-3 text-xl font-semibold leading-snug tracking-[-0.025em] transition-colors group-hover:text-burnt-orange", children: post.title }),
                  /* @__PURE__ */ jsx("p", { className: "mb-4 line-clamp-3 text-sm leading-relaxed text-white/48", children: post.excerpt }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-sm font-medium text-burnt-orange", children: [
                    isArabic ? "اقرأ المقال" : "Read article",
                    /* @__PURE__ */ jsx(ArrowRight, { className: `w-4 h-4 transition-transform ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}` })
                  ] })
                ] })
              ]
            }
          )
        },
        post.slug
      )) }),
      filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-white/40 py-16", children: isArabic ? "لا توجد مقالات في هذا التصنيف حالياً." : "No articles in this category yet." })
    ] }) }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Blog as default
};
