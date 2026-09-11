import { jsxs, jsx } from "react/jsx-runtime";
import { u as useLocale, e as useSeo, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, c as buildService, H as Header, f as Footer } from "../entry-server.js";
import { motion } from "framer-motion";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-accordion";
const arVrx = {
  seo: {
    title: "استشارة Mercedes V-Class VRX في دبي | ديجي-تك",
    description: "احجز فحصاً واستشارة خاصة بسيارة Mercedes V-Class لمشروع VRX لدى ديجي-تك في القوز بدبي. يُحدد نطاق العمل بعد مراجعة السيارة والطلب."
  },
  hero: {
    eyebrow: "فحص واستشارة خاصة بالسيارة",
    subtitle: "استشارة ورشة في دبي لمشروع مرسيدس V-Class",
    description: "ناقش السيارة وحالتها الحالية والاستخدام المطلوب وطلبات المقصورة أو التصميم الخارجي وأهداف الأداء قبل تحديد نطاق المشروع."
  },
  interior: "المقصورة الداخلية",
  exterior: "التصميم الخارجي",
  seatsTitle: "استشارة مقاعد المقصورة لمشروع VRX",
  seatsDescription: "يمكن مراجعة تصميم المقاعد الظاهر ضمن استشارة خاصة بالسيارة. يعتمد النطاق النهائي على السيارة والتصميم المطلوب.",
  ambientTitle: "استشارة الإضاءة الداخلية",
  ambientDescription: "يمكن مناقشة طلبات الإضاءة الداخلية أثناء الاستشارة وتأكيد ما يناسب السيارة المحددة.",
  consultation: {
    eyebrow: "مجالات الاستشارة",
    title: "يبدأ مشروع VRX من السيارة نفسها",
    intro: "لا توجد مواصفات واحدة تناسب كل سيارة. تراجع الورشة السيارة والنتيجة المطلوبة قبل مناقشة نطاق المشروع المحتمل.",
    rows: [
      { title: "حالة السيارة", description: "تُراجع السيارة الحالية وحالتها قبل اقتراح نطاق للمشروع." },
      { title: "الاستخدام المطلوب", description: "يُناقش الاستخدام اليومي واحتياجات الركاب وأهداف المشروع أثناء الاستشارة." },
      { title: "خطة المقصورة", description: "يمكن مراجعة طلبات المقاعد والإضاءة والمواد والتجهيزات للسيارة المحددة." },
      { title: "الخطة الخارجية", description: "يمكن مناقشة أعمال الهيكل والتشطيب والطلبات الخارجية من دون افتراض حزمة ثابتة." }
    ]
  },
  process: {
    title: "كيف تجري استشارة VRX؟",
    steps: [
      { title: "1. أرسل تفاصيل السيارة", description: "أرسل الطراز والسنة والحالة الحالية والنتيجة التي ترغب في مناقشتها." },
      { title: "2. رتب موعد الفحص", description: "تراجع الورشة السيارة قبل تأكيد الأعمال التي قد تناسبها." },
      { title: "3. أكد نطاق العمل", description: "يُحدد العمل المقترح والتقدير الخاص بالسيارة قبل بدء التنفيذ." }
    ]
  },
  cta: {
    title: "استشارة مشروع VRX",
    description: "اطلب فحصاً واستشارة. لا يُؤكد نطاق العمل أو التوفر أو المدة أو التقدير إلا بعد مراجعة السيارة والطلب المحددين.",
    button: "اطلب استشارة",
    whatsapp: "مرحباً، أود ترتيب فحص واستشارة لمشروع Mercedes V-Class VRX."
  }
};
const exteriorImage = { src: "/images/vrx-exterior.jpg", alt: "Mercedes V-Class VRX exterior" };
const VrxPage = () => {
  const { isArabic } = useLocale();
  const consultationAreas = isArabic ? arVrx.consultation.rows : [
    { title: "Vehicle condition", description: "The current vehicle and its condition are reviewed before a project scope is proposed." },
    { title: "Intended use", description: "Daily use, passenger needs and project goals are discussed during the consultation." },
    { title: "Interior plan", description: "Seating, lighting, trim and cabin requests can be reviewed for the specific vehicle." },
    { title: "Exterior plan", description: "Bodywork, finish and exterior requests can be discussed without assuming a fixed package." }
  ];
  const processSteps = isArabic ? arVrx.process.steps : [
    { title: "1. Share the vehicle details", description: "Send the model, year, current condition and the result you want to discuss." },
    { title: "2. Arrange an inspection", description: "The workshop reviews the vehicle before confirming what work may be suitable." },
    { title: "3. Confirm the scope", description: "Any proposed work and estimate are confirmed for that vehicle before work begins." }
  ];
  useSeo({
    title: isArabic ? arVrx.seo.title : "Mercedes V-Class VRX Consultation Dubai | DIGI-TEC",
    description: isArabic ? arVrx.seo.description : "Book a vehicle-specific inspection and consultation for a Mercedes V-Class VRX project at DIGI-TEC in Al Quoz, Dubai. Scope is confirmed after review.",
    canonical: `https://digitecme.com${isArabic ? "/ar" : ""}/vrx`,
    jsonLd: (() => {
      const url = `https://digitecme.com${isArabic ? "/ar" : ""}/vrx`;
      return pageGraph([
        buildWebPage({
          url,
          name: isArabic ? arVrx.seo.title : "Mercedes V-Class VRX Consultation | DIGI-TEC Dubai",
          description: isArabic ? arVrx.seo.description : "Vehicle-specific inspection and consultation for a Mercedes V-Class VRX project at the DIGI-TEC workshop in Al Quoz, Dubai.",
          type: "ItemPage",
          breadcrumbId: `${url}#breadcrumb`,
          primaryImage: exteriorImage.src,
          mainEntityId: `${url}#service`
        }),
        buildBreadcrumb(url, [
          { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
          { name: "VRX", url }
        ]),
        buildService({
          url,
          name: isArabic ? "استشارة ورشة مرسيدس V-Class VRX" : "Mercedes V-Class VRX workshop consultation",
          serviceType: isArabic ? "فحص السيارة واستشارة مشروع التحويل" : "Vehicle inspection and conversion-project consultation",
          description: isArabic ? "خدمة فحص واستشارة خاصة بسيارة مرسيدس V-Class لمشروع VRX، تشمل مناقشة الأداء وخطة المقصورة والتصميم الخارجي في ورشة ديجي-تك بدبي." : "Vehicle-specific inspection and consultation for a Mercedes V-Class VRX project, covering performance goals, interior planning and exterior requests at DIGI-TEC in Dubai.",
          image: exteriorImage.src,
          brand: "Mercedes-Benz"
        })
      ]);
    })()
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("section", { className: "border-b border-white/[0.08] py-16 sm:py-20 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-[90rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-12", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-5", children: isArabic ? arVrx.hero.eyebrow : "Vehicle-Specific Inspection & Consultation" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: [
          "Mercedes V-Class ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "VRX" }),
          " Consultation"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-white/64 sm:text-xl", children: isArabic ? arVrx.hero.subtitle : "Dubai workshop consultation for a Mercedes V-Class project." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl text-sm leading-7 text-white/45 sm:text-base", children: isArabic ? arVrx.hero.description : "Discuss the vehicle, its current condition, intended use, interior or exterior requests, and performance goals before a project scope is confirmed." })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 }, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/vrx-hero.jpg",
          alt: isArabic ? "مرسيدس V-Class VRX في دبي" : "Mercedes V-Class VRX in Dubai",
          className: "aspect-[4/3] w-full rounded-lg object-cover ring-1 ring-white/10"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-5 sm:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-12 md:mb-16", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsx("p", { className: "eyebrow mb-3", children: isArabic ? arVrx.interior : "Interior" })
        }
      ) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          className: "relative max-w-4xl mx-auto mb-10 md:mb-14",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/vrx-interior.jpg",
              alt: isArabic ? "المقصورة الداخلية لسيارة مرسيدس V-Class VRX" : "Mercedes V-Class VRX interior",
              className: "w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)]"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/vrx-seats.png",
                  alt: isArabic ? "مقاعد داخلية في مشروع مرسيدس V-Class VRX" : "Interior seating shown for a Mercedes V-Class VRX project",
                  className: "w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] mb-4"
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-off-white mb-2", children: isArabic ? arVrx.seatsTitle : "VRX interior seating consultation" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/50 leading-relaxed", children: isArabic ? arVrx.seatsDescription : "The seating shown can be reviewed as part of a vehicle-specific interior consultation. The final scope depends on the vehicle and requested design." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.1 },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/vrx-ambient.png",
                  alt: isArabic ? "إضاءة داخلية في مشروع مرسيدس V-Class VRX" : "Interior lighting shown for a Mercedes V-Class VRX project",
                  className: "w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] mb-4"
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-off-white mb-2", children: isArabic ? arVrx.ambientTitle : "Interior lighting consultation" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/50 leading-relaxed", children: isArabic ? arVrx.ambientDescription : "Interior-lighting requests can be discussed during the consultation and confirmed for the specific vehicle." })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-white/[0.01]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-5 sm:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-12 md:mb-16", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsx("p", { className: "eyebrow mb-3", children: isArabic ? arVrx.exterior : "Exterior" })
        }
      ) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          className: "relative max-w-4xl mx-auto mb-10 md:mb-14",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: exteriorImage.src,
              alt: isArabic ? "التصميم الخارجي لسيارة مرسيدس V-Class VRX" : exteriorImage.alt,
              className: "w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)]"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-3", children: isArabic ? arVrx.consultation.eyebrow : "Consultation Areas" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black", children: isArabic ? arVrx.consultation.title : "A VRX project starts with the vehicle" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-white/55 leading-relaxed", children: isArabic ? arVrx.consultation.intro : "There is no one-size-fits-all specification. The workshop reviews the vehicle and requested outcome before discussing a possible project scope." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2", children: consultationAreas.map((area) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-off-white", children: area.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-white/55", children: area.description })
      ] }, area.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-5 sm:px-6", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10 md:mb-14",
          children: /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-black", children: isArabic ? arVrx.process.title : "How a VRX consultation works" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-3", children: processSteps.map((step, index) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { delay: index * 0.08 },
          viewport: { once: true },
          className: "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-red-400", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: step.description })
          ]
        },
        step.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 border-t border-white/[0.06]", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-5 sm:px-6", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2", children: isArabic ? arVrx.cta.title : "VRX Project Consultation" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-white/55 leading-relaxed", children: isArabic ? arVrx.cta.description : "Request an inspection and consultation. Any proposed work, availability, timeline and estimate are confirmed only after the specific vehicle and request are reviewed." })
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? arVrx.cta.whatsapp : "Hi, I would like to arrange an inspection and consultation for a Mercedes V-Class VRX project.")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex-shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.14em] px-10 sm:px-12 py-4 sm:py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_28px_-10px_rgba(185,28,28,0.6)]",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
                isArabic ? arVrx.cta.button : "Request a Consultation"
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  VrxPage as default
};
