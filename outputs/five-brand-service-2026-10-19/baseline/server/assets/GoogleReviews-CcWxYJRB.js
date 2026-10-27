import { jsx, jsxs } from "react/jsx-runtime";
import React__default from "react";
import { Star, ArrowUpRight, ArrowRight, ArrowLeft, Play, Pause } from "lucide-react";
import { R as Reveal } from "./Reveal-B0bzMO-v.js";
import { u as useLocale } from "../entry-server.js";
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Digitec+Performance+Center+L.L.C./@25.1213214,55.2243735,17z/data=!4m8!3m7!1s0x3e5f6a2a79f55b5b:0x190c9fb42d33d1aa!8m2!3d25.1213214!4d55.2243735!9m1!1b1!16s%2Fg%2F11c2ppzjlb";
const reviews = [
  {
    name: "Maryam Alb",
    date: "September 2026",
    authorUrl: "https://www.google.com/maps/contrib/101741736742857276156/reviews?hl=en-GB",
    en: "I had an amazing experience with Samer. He was extremely helpful, kind, and professional throughout the whole process. He managed to get my car fixed in less than a day and went above and beyond to make everything easy and stress-free for me. I really appreciate his support, honesty, and the way he genuinely cared about helping me. Excellent service and a big thank you to Samer — highly recommended!",
    ar: "كانت تجربتي مع سامر رائعة. كان متعاوناً ولطيفاً ومحترفاً للغاية طوال العملية، وتمكن من إصلاح سيارتي في أقل من يوم وبذل جهداً إضافياً لجعل كل شيء سهلاً وخالياً من التوتر. أقدّر دعمه وصدقه واهتمامه الحقيقي بمساعدتي. خدمة ممتازة وشكر كبير لسامر — أوصي به بشدة!"
  },
  { name: "Juma Almarri", date: "2025", en: "Excellent service, respectful management and high-quality work. Thank you to the management and the team.", ar: "الخدمة ممتازه في هذا المركز، إدارة محترمة وشغل بجودة عالية. شكراً لإدارة المركز وفريق العمل." },
  { name: "Ali Ghanem", date: "2024", en: "Good accident-repair work and a clean finish. Thanks to Samer for his attention.", ar: "تعاملت معهم في ورشة إصلاح الحوادث، جيدين في العمل وشغلهم نظيف. الشكر للأخ سامر على اهتمامه." },
  { name: "Moh. Khalifa", date: "2021", en: "Clean, highly professional work, and Samer’s manner was excellent.", ar: "بصراحة شغل نظيف ومحترم جداً، والأخ سامر تعامله جداً راقي." },
  { name: "Mohammad Al alawi", date: "2025", en: "An excellent company, especially Samer.", ar: "شركة ممتازة، وخاصة الأخ سامر." },
  { name: "Ebrahim Rashad", date: "2019", en: "A top-level car repair garage.", ar: "جراج لتصليح السيارات مستوى توب." },
  { name: "Abdullah Salameh", date: "2018", en: "Their work is clean and excellent.", ar: "شغلهم نظيف وممتاز." },
  { name: "Abood", date: "2026", en: "One of the best car repair workshops in Dubai. My GT63 was completed in three days.", ar: "أفضل ورشة تصليح سيارات في دبي. ساعدني سامر في إنهاء سيارتي GT63 في 3 أيام." },
  { name: "Fassnawees", date: "2024", en: "Samer managed the accident repair and arranged paintless dent repair. I highly recommend the service.", ar: "أدار سامر إصلاح الحادث واستعان بفني لإصلاح الانبعاج بدون طلاء. أنصح بشدة بهذه الخدمة." },
  { name: "mohd bader", date: "2026", en: "Excellent service from start to finish, with a professional and knowledgeable team.", ar: "خدمة ممتازة من البداية إلى النهاية، وفريق عمل محترف وعلى قدر كبير من المعرفة." }
];
const pageCount = Math.ceil(reviews.length / 3);
const GoogleReviews = () => {
  const { isArabic } = useLocale();
  const [page, setPage] = React__default.useState(0);
  const [autoplayPaused, setAutoplayPaused] = React__default.useState(false);
  const [interactionPaused, setInteractionPaused] = React__default.useState(false);
  const [announcement, setAnnouncement] = React__default.useState("");
  React__default.useEffect(() => {
    if (autoplayPaused || interactionPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setPage((current) => (current + 1) % pageCount), 6500);
    return () => window.clearInterval(timer);
  }, [autoplayPaused, interactionPaused]);
  const visibleReviews = Array.from({ length: 3 }, (_, index) => reviews[(page * 3 + index) % reviews.length]);
  const move = (direction) => {
    const nextPage = (page + direction + pageCount) % pageCount;
    setPage(nextPage);
    setAnnouncement(isArabic ? `تم عرض مجموعة التقييمات ${nextPage + 1} من ${pageCount}` : `Showing review group ${nextPage + 1} of ${pageCount}`);
  };
  const toggleAutoplay = () => {
    const nextPaused = !autoplayPaused;
    setAutoplayPaused(nextPaused);
    setAnnouncement(isArabic ? nextPaused ? "تم إيقاف التدوير التلقائي" : "تم تشغيل التدوير التلقائي" : nextPaused ? "Automatic review rotation paused" : "Automatic review rotation playing");
  };
  return /* @__PURE__ */ jsx("section", { className: "home-section border-b border-white/[0.08] bg-black", "aria-labelledby": "google-reviews-heading", "aria-roledescription": "carousel", onMouseEnter: () => setInteractionPaused(true), onMouseLeave: () => setInteractionPaused(false), onFocusCapture: () => setInteractionPaused(true), onBlurCapture: (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false);
  }, children: /* @__PURE__ */ jsxs("div", { className: "home-container", children: [
    /* @__PURE__ */ jsxs(Reveal, { className: "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: isArabic ? "تقييمات Google الحقيقية" : "Real Google reviews" }),
        /* @__PURE__ */ jsx("h2", { id: "google-reviews-heading", className: "home-heading max-w-3xl", children: isArabic ? "تجارب عملائنا، بكلماتهم." : "Our customers, in their own words." })
      ] }),
      /* @__PURE__ */ jsxs("a", { href: GOOGLE_REVIEWS_URL, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "home_google_reviews", className: "inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-burnt-orange", children: [
        /* @__PURE__ */ jsx("span", { className: "flex gap-1", "aria-hidden": "true", children: [0, 1, 2, 3, 4].map((star) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-burnt-orange text-burnt-orange" }, star)) }),
        /* @__PURE__ */ jsx("span", { children: isArabic ? "4.4 من 155 تقييماً" : "4.4 from 155 reviews" }),
        /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": "true" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-3", "aria-live": "off", children: visibleReviews.map((review) => /* @__PURE__ */ jsxs("article", { role: "group", "aria-roledescription": "slide", "aria-label": `${reviews.indexOf(review) + 1} of ${reviews.length}`, className: "flex h-[34rem] flex-col rounded-2xl border border-white/[0.1] bg-white/[0.035] p-7 sm:h-[30rem]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-1", "aria-label": isArabic ? "5 نجوم" : "5 stars", children: [0, 1, 2, 3, 4].map((star) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-burnt-orange text-burnt-orange", "aria-hidden": "true" }, star)) }),
      /* @__PURE__ */ jsxs("blockquote", { className: "mt-8 line-clamp-10 overflow-hidden text-lg leading-8 text-white/80 md:line-clamp-9", children: [
        "“",
        isArabic ? review.ar : review.en,
        "”"
      ] }),
      /* @__PURE__ */ jsxs("footer", { className: "mt-auto pt-8", children: [
        "authorUrl" in review ? /* @__PURE__ */ jsx("a", { href: review.authorUrl, target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-white transition-colors hover:text-burnt-orange", children: review.name }) : /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: review.name }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs uppercase tracking-[0.14em] text-white/35", children: [
          "Google · ",
          review.date
        ] })
      ] })
    ] }, review.name)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center justify-between border-t border-white/[0.08] pt-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs leading-5 text-white/35", children: isArabic ? "مقتطفات من مراجعات عامة على ملف DIGI-TEC في Google." : "Excerpts from public reviews on the DIGI-TEC Google profile." }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => move(isArabic ? 1 : -1), className: "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-burnt-orange hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange", "aria-label": isArabic ? "المراجعات السابقة" : "Previous reviews", children: isArabic ? /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxs("span", { className: "min-w-12 text-center text-sm tabular-nums text-white/45", children: [
          page + 1,
          " / ",
          pageCount
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => move(isArabic ? -1 : 1), className: "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-burnt-orange hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange", "aria-label": isArabic ? "المراجعات التالية" : "Next reviews", children: isArabic ? /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: toggleAutoplay, className: "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-burnt-orange hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange", "aria-label": isArabic ? autoplayPaused ? "تشغيل التدوير التلقائي" : "إيقاف التدوير التلقائي" : autoplayPaused ? "Play automatic review rotation" : "Pause automatic review rotation", children: autoplayPaused ? /* @__PURE__ */ jsx(Play, { className: "h-4 w-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Pause, { className: "h-4 w-4", "aria-hidden": "true" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: announcement })
  ] }) });
};
export {
  GoogleReviews as G
};
