import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { u as useLocale, p as pageGraph, a as buildWebPage, g as buildBreadcrumb, c as buildFAQ, d as useSeo } from "../entry-server.js";
import { c as arFaqCategories, H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { A as AnswerBlock } from "./AnswerBlock-DWkHPVA7.js";
import { a as allFaqs, F as FAQ } from "./FAQ-I3cfM1oW.js";
import { F as FinalCTA } from "./FinalCTA-DCkhXNCr.js";
import { P as PageIntro } from "./PageIntro-BZbZzflk.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "./accordion-DINZxoib.js";
import "@radix-ui/react-accordion";
import "./Reveal-B0bzMO-v.js";
const FAQPage = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? "/ar" : ""}/faq`;
  const displayedFaqs = isArabic ? arFaqCategories.flatMap((category) => category.faqs) : allFaqs;
  const faqGraph = React__default.useMemo(
    () => pageGraph([
      buildWebPage({
        url,
        name: isArabic ? "الأسئلة الشائعة | مركز ديجي-تك دبي" : "FAQ | DIGI-TEC Performance Center Dubai",
        description: isArabic ? "إجابات عن صيانة وإصلاح السيارات الفاخرة والتشخيص والبرمجة وتطوير الأداء لدى ديجي-تك في دبي." : "Answers about luxury car servicing, ECU tuning, and performance upgrades at DIGI-TEC Performance Center Dubai.",
        type: "WebPage",
        breadcrumbId: `${url}#breadcrumb`,
        mainEntityId: `${url}#faq`
      }),
      buildBreadcrumb(url, [
        { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
        { name: isArabic ? "الأسئلة الشائعة" : "FAQ", url }
      ]),
      ...displayedFaqs.length > 0 ? [buildFAQ(url, displayedFaqs)] : []
    ]),
    [displayedFaqs, isArabic, url]
  );
  useSeo({
    title: isArabic ? "الأسئلة الشائعة | مركز ديجي-تك دبي" : "FAQ | DIGI-TEC Performance Center Dubai",
    description: isArabic ? "إجابات عن صيانة وإصلاح السيارات الفاخرة والتشخيص والبرمجة وتطوير الأداء وحجز المواعيد لدى ديجي-تك في دبي." : "Find answers to common questions about luxury car servicing, ECU tuning, and performance upgrades at DIGI-TEC Performance Center Dubai.",
    canonical: url,
    jsonLd: faqGraph
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(
      PageIntro,
      {
        eyebrow: isArabic ? "نحن هنا للمساعدة" : "We're Here to Help",
        title: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "الأسئلة ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "الشائعة" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Frequently Asked ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Questions" })
        ] }),
        description: isArabic ? "كل ما تحتاج إلى معرفته عن خدماتنا وطريقة عملنا وخبراتنا." : "Everything you need to know about our services, process, and expertise."
      }
    ),
    /* @__PURE__ */ jsx(
      AnswerBlock,
      {
        question: isArabic ? "كيف أحجز موعداً في ديجي-تك؟" : "How do I book a service at Digi-Tec?",
        answer: isArabic ? "للحجز، اتصل أو أرسل رسالة واتساب إلى 971443402223+ مع ذكر طراز السيارة وسنة الصنع والأعراض التي تلاحظها، أو زر الورشة في القوز الصناعية 3، دبي. يبدأ العمل بالفحص، ثم يُشرح النطاق وعرض السعر قبل الموافقة على الإصلاح." : "To book, call or WhatsApp +971 4 340 2223 with your model, year and the symptoms you have noticed, or visit the workshop at Al Quoz Industrial Area 3, Dubai. Work starts with inspection, then the scope and estimate are explained before you approve any repair.",
        facts: isArabic ? [
          "الهاتف والواتساب: 971443402223+",
          "العنوان: القوز الصناعية 3، دبي",
          "البريد الإلكتروني: info@digitecme.com"
        ] : [
          "Phone and WhatsApp: +971 4 340 2223",
          "Address: Al Quoz Industrial Area 3, Dubai",
          "Email: info@digitecme.com"
        ]
      }
    ),
    /* @__PURE__ */ jsx(FAQ, {}),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  FAQPage as default
};
