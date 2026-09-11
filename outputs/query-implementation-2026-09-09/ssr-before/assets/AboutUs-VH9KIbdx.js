import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { u as useLocale, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, e as useSeo, H as Header, A as AnswerBlock, T as TrustBar, a7 as defenderWorkshop, a8 as lamborghiniUrusWorkshop, a9 as WhyChooseUs, F as FinalCTA, f as Footer, aa as businessRef } from "../entry-server.js";
import { motion } from "framer-motion";
import { Wrench, Zap, Gauge, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import { w as workshopLifts, a as workshopServiceFloor, b as workshopLifts$1, p as porscheGt3rsWorkshop, f as ferrariEngineWorkshop, m as maybachWorkshop, l as lamborghiniWorkshop, c as porscheWorkshop } from "./porsche-workshop-dubai-95nDtwZI.js";
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
const AboutUs = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? "/ar" : ""}/about`;
  const aboutGraph = React__default.useMemo(
    () => pageGraph([
      buildWebPage({
        url,
        name: isArabic ? "عن مركز ديجي-تك | ورشة سيارات في دبي" : "About Digitec Performance Center | Car Workshop in Dubai",
        description: isArabic ? "ديجي-تك ورشة سيارات مستقلة في القوز بدبي، تأسست عام 2002 وتعرض خدمات الفحص والصيانة والإصلاح وأعمال الهيكل واستشارات مشاريع الأداء." : "Digi-Tec Performance Center is an independent workshop in Al Quoz, Dubai, established in 2002, with inspection, maintenance, repair, bodywork and performance-project consultation services.",
        type: "AboutPage",
        breadcrumbId: `${url}#breadcrumb`,
        mainEntityId: businessRef["@id"]
      }),
      buildBreadcrumb(url, [
        { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
        { name: isArabic ? "من نحن" : "About", url }
      ])
    ]),
    [isArabic, url]
  );
  useSeo({
    title: isArabic ? "عن مركز ديجي-تك | ورشة سيارات في دبي" : "About Digitec Performance Center | Car Workshop in Dubai",
    description: isArabic ? "تعرف على ديجي-تك، ورشة سيارات مستقلة في القوز بدبي منذ 2002 لخدمات الفحص والصيانة والإصلاح وأعمال الهيكل واستشارات مشاريع الأداء." : "Learn about Digi-Tec, an independent car workshop in Al Quoz, Dubai since 2002 for inspection, maintenance, repair, bodywork and performance-project consultation.",
    canonical: url,
    keywords: isArabic ? "ورشة سيارات دبي، صيانة سيارات دبي، إصلاح سيارات دبي، فحص سيارات القوز، صيانة سيارات فاخرة" : "car workshop Dubai, car maintenance Dubai, car repair Dubai, vehicle inspection Al Quoz, luxury car service",
    jsonLd: aboutGraph
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(
      PageIntro,
      {
        eyebrow: isArabic ? "من نحن" : "Who We Are",
        title: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "عن ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
          "IGI-TEC"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "About ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
          "IGI-TEC"
        ] }),
        description: isArabic ? "ورشة سيارات مستقلة في دبي منذ عام 2002، لخدمات الفحص والصيانة والإصلاح للسيارات الألمانية والفاخرة وعالية الأداء والكهربائية." : "An independent Dubai car workshop established in 2002, offering inspection, maintenance and repair services for German, luxury, performance and electric vehicles."
      }
    ),
    /* @__PURE__ */ jsx(
      AnswerBlock,
      {
        question: isArabic ? "لماذا يختار الملاك ديجي-تك في دبي؟" : "Why do owners choose Digi-Tec in Dubai?",
        answer: isArabic ? "ديجي-تك ورشة مستقلة في دبي منذ 2002. يمكن للملاك حجز فحص خاص بالسيارة ومناقشة الصيانة والإصلاح الميكانيكي أو الكهربائي وأعمال الهيكل والعناية بالسيارة أو مشروع الأداء قبل تحديد نطاق العمل. الموقع: القوز الصناعية 3، دبي." : "Digi-Tec is an independent Dubai workshop established in 2002. Owners can book a vehicle-specific inspection and discuss maintenance, mechanical or electrical repair, bodywork, detailing or a performance project before the work scope is confirmed. The workshop is in Al Quoz Industrial Area 3, Dubai.",
        facts: isArabic ? [
          "تأسست في دبي عام 2002",
          "فحص خاص بالسيارة قبل تحديد نطاق الإصلاح",
          "الهاتف والواتساب: +971 4 340 2223"
        ] : [
          "Established in Dubai in 2002",
          "Vehicle-specific inspection before repair scope is confirmed",
          "Call or WhatsApp +971 4 340 2223"
        ]
      }
    ),
    /* @__PURE__ */ jsx(TrustBar, {}),
    /* @__PURE__ */ jsx("section", { id: "contact", className: "py-16 md:py-24", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-5 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: isArabic ? 20 : -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black mb-6", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "عن مركز ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
              "IGI-TEC للأداء"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "About ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
              "igitec Performance Center"
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm sm:text-base leading-relaxed mb-4", children: isArabic ? "ديجي-تك ورشة سيارات مستقلة في دبي تأسست عام 2002. تشمل فئات الخدمة المعروضة فحص السيارة والصيانة والإصلاحات الميكانيكية والكهربائية وإصلاح الهيكل والطلاء والعناية بالسيارة واستشارات مشاريع الأداء." : "Digi-Tec Performance Centre is an independent Dubai car workshop established in 2002. Listed service categories include vehicle inspection, maintenance, mechanical and electrical repair, body repair, paintwork, detailing and performance-project consultation." }),
            /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm sm:text-base leading-relaxed mb-4", children: isArabic ? "يبدأ الموعد بتحديد السيارة والمشكلة أو الخدمة المطلوبة. بعد الفحص يمكن مناقشة النتائج والعمل المقترح قبل الاتفاق على نطاق الإصلاح." : "An appointment starts by identifying the vehicle and the concern or requested service. After inspection, the findings and proposed work can be discussed before the repair scope is agreed." }),
            /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm sm:text-base leading-relaxed", children: isArabic ? "تقع الورشة في القوز الصناعية 3، دبي. للحجز أو الاستفسار اتصل أو أرسل رسالة واتساب إلى +971 4 340 2223." : "The workshop is at Al Quoz Industrial Area 3, Dubai. To book or ask about a service, call or WhatsApp +971 4 340 2223." })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "grid grid-cols-2 gap-4",
          children: [
            { value: "2002", label: isArabic ? "تأسست في دبي" : "Established in Dubai" },
            { value: isArabic ? "القوز 3" : "Al Quoz 3", label: isArabic ? "موقع الورشة" : "Workshop location" },
            { value: "40,000", label: isArabic ? "قدم مربع مساحة المنشأة" : "Sq ft facility" },
            { value: isArabic ? "دبي" : "Dubai", label: isArabic ? "الإمارات العربية المتحدة" : "United Arab Emirates" }
          ].map((stat) => /* @__PURE__ */ jsxs("div", { className: "bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl font-black text-burnt-orange mb-1", children: stat.value }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-white/40", children: stat.label })
          ] }, stat.label))
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-charcoal/20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-5 sm:px-6", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "max-w-3xl mb-10 md:mb-12",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3", children: isArabic ? "داخل ديجي-تك" : "Inside Digi-Tec" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black mb-4", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "ورشتنا في ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "دبي" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "Our Dubai ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Workshop" })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm sm:text-base leading-relaxed", children: isArabic ? "توضح الصور مساحات الورشة في القوز حيث تُجرى فحوص السيارات وأعمال الصيانة والإصلاح." : "These images show the Al Quoz workshop areas used for vehicle inspection, maintenance and repair work." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5", children: [
        {
          image: workshopLifts,
          alt: isArabic ? "سيارات فاخرة وعالية الأداء داخل ورشة ديجي-تك في دبي" : "Luxury performance cars inside the Digi-Tec workshop in Dubai",
          label: isArabic ? "مساحات السيارات الفاخرة والأداء" : "Luxury & Performance Bays"
        },
        {
          image: workshopServiceFloor,
          alt: isArabic ? "ساحة خدمة ديجي-تك للسيارات الفاخرة في القوز دبي" : "Digi-Tec service floor with luxury vehicles in Al Quoz, Dubai",
          label: isArabic ? "ساحة الخدمة" : "Service Floor"
        },
        {
          image: workshopLifts$1,
          alt: isArabic ? "رافعات ومساحات إصلاح لدى ديجي-تك دبي" : "Vehicle lifts and repair bays at Digi-Tec Dubai",
          label: isArabic ? "مساحات الإصلاح" : "Repair Bays"
        }
      ].map((photo, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { delay: index * 0.1 },
          viewport: { once: true },
          className: "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black aspect-[4/3]",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: photo.image,
              alt: photo.alt,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          )
        },
        photo.label
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 md:mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5", children: [
        {
          image: porscheGt3rsWorkshop,
          alt: isArabic ? "بورشه GT3 RS داخل ورشة ديجي-تك في دبي" : "Porsche GT3 RS inside the Digi-Tec workshop in Dubai"
        },
        {
          image: ferrariEngineWorkshop,
          alt: isArabic ? "محرك فيراري داخل ورشة ديجي-تك في دبي" : "Ferrari engine work inside the Digi-Tec workshop in Dubai"
        },
        {
          image: defenderWorkshop,
          alt: isArabic ? "لاند روفر ديفندر داخل ورشة ديجي-تك في دبي" : "Land Rover Defender inside the Digi-Tec workshop in Dubai"
        },
        {
          image: maybachWorkshop,
          alt: isArabic ? "مايباخ تخضع للفحص في ورشة ديجي-تك بدبي" : "Maybach receiving an inspection at the Digi-Tec workshop in Dubai"
        },
        {
          image: lamborghiniWorkshop,
          alt: isArabic ? "لامبورغيني أوروس داخل ورشة ديجي-تك في دبي" : "Lamborghini Urus inside the Digi-Tec workshop in Dubai"
        },
        {
          image: porscheWorkshop,
          alt: isArabic ? "سيارات بورشه داخل ورشة ديجي-تك في دبي" : "Porsche cars inside the Digi-Tec workshop in Dubai"
        },
        {
          image: lamborghiniUrusWorkshop,
          alt: isArabic ? "لامبورغيني أوروس على الرافعة في ورشة ديجي-تك بدبي" : "Lamborghini Urus on a lift at the Digi-Tec workshop in Dubai"
        }
      ].map((photo, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          transition: { delay: index * 0.06 },
          viewport: { once: true },
          className: "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black aspect-[3/4]",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: photo.image,
              alt: photo.alt,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          )
        },
        photo.alt
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-charcoal/20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-5 sm:px-6", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3", children: isArabic ? "فئات الخدمة" : "Service Categories" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "طلبات خدمة حسب ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "السيارة" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "Vehicle-Specific ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Service Enquiries" })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
        {
          icon: Wrench,
          title: isArabic ? "خدمة السيارات الألمانية والفاخرة" : "German & Luxury Vehicle Service",
          text: isArabic ? "يمكن حجز فحص وصيانة وإصلاح لسيارات مرسيدس-بنز وBMW وأودي وبورشه وغيرها من السيارات الأوروبية والفاخرة، مع تحديد النطاق بحسب السيارة والمشكلة." : "Inspection, maintenance and repair can be requested for Mercedes-Benz, BMW, Audi, Porsche and other European or luxury vehicles, with the scope confirmed for the specific vehicle and concern."
        },
        {
          icon: Zap,
          title: isArabic ? "طلبات خدمة السيارات الصينية والكهربائية" : "Chinese & Electric Vehicle Enquiries",
          text: isArabic ? "يمكن الاستفسار عن فحص وخدمة سيارات مثل Zeekr وBYD وHongqi وJetour وROX. يؤكد الفريق نطاق العمل بعد معرفة الطراز والمشكلة المطلوبة." : "Owners of vehicles such as Zeekr, BYD, Hongqi, Jetour and ROX can request an inspection or service enquiry. The available scope is confirmed after the model and concern are reviewed."
        },
        {
          icon: Gauge,
          title: isArabic ? "استشارات مشاريع الأداء" : "Performance Project Consultation",
          text: isArabic ? "يمكن مناقشة هدف المشروع والاستخدام المطلوب وحالة السيارة قبل اقتراح أي برمجة أو تعديل. يعتمد النطاق النهائي على فحص السيارة." : "Performance enquiries begin with the project goal, intended use and vehicle condition. Any proposed programming or modification scope depends on a vehicle inspection."
        }
      ].map((item) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6",
          children: [
            /* @__PURE__ */ jsx(item.icon, { className: "w-7 h-7 text-burnt-orange mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-base sm:text-lg mb-3", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-white/55 text-sm leading-relaxed", children: item.text })
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-5 sm:px-6 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3", children: isArabic ? "رسالتنا" : "Our Mission" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black mb-6", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "خطوات واضحة في كل ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "زيارة" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "A Clear Process, Every ",
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Visit" })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white/60 text-base sm:text-lg leading-relaxed", children: isArabic ? "تقديم فحص وصيانة وإصلاح واستشارات لمشاريع السيارات في دبي، مع تحديد السيارة والمشكلة وشرح نطاق العمل المقترح قبل بدء الإصلاح." : "To provide vehicle inspection, maintenance, repair and project consultation in Dubai, identifying the vehicle and concern and explaining the proposed work scope before repair begins." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 text-left", children: [
        ...isArabic ? [
          "ورشة مستقلة في دبي منذ 2002",
          "فحص خاص بالسيارة قبل تحديد نطاق العمل",
          "صيانة وإصلاح ميكانيكي وكهربائي",
          "خدمات المحرك وناقل الحركة والتعليق والفرامل",
          "إصلاح الهيكل والطلاء والعناية بالسيارة",
          "استشارات مشاريع الأداء بحسب السيارة",
          "شرح العمل المقترح قبل بدء الإصلاح",
          "الموقع في القوز الصناعية 3"
        ] : [
          "Independent Dubai workshop since 2002",
          "Vehicle-specific inspection before scope is confirmed",
          "Mechanical and electrical maintenance and repair",
          "Engine, transmission, suspension and brake services",
          "Body repair, paintwork and detailing",
          "Vehicle-specific performance-project consultation",
          "Proposed work explained before repair begins",
          "Located in Al Quoz Industrial Area 3"
        ]
      ].map((point) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-burnt-orange shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "text-white/70 text-sm", children: point })
      ] }, point)) })
    ] }) }),
    /* @__PURE__ */ jsx(WhyChooseUs, {}),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-5 sm:px-6", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-black mb-4", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "زوروا ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "ديجي-تك" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Visit ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Us" })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: [
        { icon: MapPin, title: isArabic ? "الموقع" : "Location", text: isArabic ? "القوز الصناعية 3، دبي" : "Al Quoz Industrial Area 3, Dubai" },
        { icon: Phone, title: isArabic ? "الهاتف" : "Phone", text: "+971 4 340 2223" },
        { icon: Mail, title: isArabic ? "البريد الإلكتروني" : "Email", text: "info@digitecme.com" }
      ].map((item) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center",
          children: [
            /* @__PURE__ */ jsx(item.icon, { className: "w-6 h-6 text-burnt-orange mx-auto mb-3" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm mb-1", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-white/50 text-xs leading-relaxed", children: item.text })
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  AboutUs as default
};
