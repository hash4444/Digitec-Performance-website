import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { u as useLocale, a6 as ATTRIBUTION_KEY, r as trackWhatsAppClick } from "../entry-server.js";
const sources = /* @__PURE__ */ new Set(["google", "bing", "chatgpt", "openai", "perplexity", "gemini", "claude", "copilot", "duckduckgo", "instagram", "facebook", "youtube", "newsletter", "whatsapp"]);
const media = /* @__PURE__ */ new Set(["organic", "cpc", "ppc", "paid_search", "paid_social", "social", "email", "referral", "display", "direct", "organic_social"]);
const landingPaths = /* @__PURE__ */ new Set(["/", "/ar", "/services", "/ar/services", ...["/services/paint-protection-film", "/services/paint-protection-dubai", "/services/ceramic-coating", "/blog/ceramic-coating-vs-ppf-dubai"].flatMap((path) => [path, "/ar" + path]), "/services/car-polishing-dubai"]);
const searchGroups = /* @__PURE__ */ new Set(["ppf_general", "ppf_full_body", "ppf_quote"]);
const safeLabel = (value, allowed) => typeof value === "string" && allowed.has(value.toLowerCase().trim()) ? value.toLowerCase().trim() : "unknown";
function buildPpfEnquiryContext(href, firstTouch = {}) {
  const url = new URL(href);
  const stored = firstTouch && typeof firstTouch === "object" && !Array.isArray(firstTouch) ? firstTouch : {};
  const tagged = url.searchParams.has("utm_source") || url.searchParams.has("utm_medium") || url.searchParams.has("utm_campaign");
  const source = safeLabel(tagged ? url.searchParams.get("utm_source") : stored.utm_source, sources);
  const medium = safeLabel(tagged ? url.searchParams.get("utm_medium") : stored.utm_medium, media);
  let landing = tagged ? url.href : typeof stored.landing_page === "string" ? stored.landing_page : url.href;
  try {
    const parsed = new URL(landing, url.origin);
    landing = parsed.origin === url.origin && landingPaths.has(parsed.pathname) ? parsed.pathname : "unknown";
  } catch {
    landing = "unknown";
  }
  let campaign = "unknown";
  let adGroup = "unknown";
  const candidate = url.searchParams.get("utm_campaign");
  const group = url.searchParams.get("utm_content");
  if (tagged && source === "google" && ["cpc", "ppc", "paid_search"].includes(medium) && candidate === "ppf_search") {
    campaign = candidate;
    if (group && searchGroups.has(group)) adGroup = group;
  } else if (tagged && ["facebook", "instagram"].includes(source) && medium === "paid_social" && ["ppf_meta_prospecting", "ppf_meta_retargeting"].includes(candidate ?? "")) {
    campaign = candidate;
    const expectedGroup = candidate === "ppf_meta_prospecting" ? "ppf_prospecting" : "ppf_retargeting";
    if (group === expectedGroup) adGroup = group;
  }
  return { source, medium, campaign, ad_group: adGroup, landing_page: landing };
}
function createPpfEnquiryReference(random = crypto) {
  const bytes = random.getRandomValues(new Uint8Array(12));
  return "PPF-" + Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function ppfReferenceLines(reference, context) {
  return [
    "Enquiry reference: " + reference,
    "Reported source / medium: " + context.source + " / " + context.medium,
    "Reported campaign / ad group: " + context.campaign + " / " + context.ad_group,
    "Landing page: " + context.landing_page
  ];
}
function PpfQuoteForm() {
  const { isArabic } = useLocale();
  const text = (en, ar) => isArabic ? ar : en;
  const [values, setValues] = useState({ brand: "", model: "", year: "", coverage: "Unsure — advise me", name: "", contactMethod: "WhatsApp", contact: "", notes: "" });
  const [error, setError] = useState("");
  const started = useRef(false);
  const submitting = useRef(false);
  const enquiryReference = useRef();
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
    setValues((current) => ({ ...current, [key]: value, ...key === "contactMethod" ? { contact: "" } : {} }));
    setError("");
  };
  const submit = (event) => {
    event.preventDefault();
    if (!ready || submitting.current) return;
    if (![values.brand, values.model, values.name, values.contact].every((value) => value.trim())) {
      setError(text("Please enter your vehicle, name and contact details.", "يرجى إدخال بيانات السيارة والاسم وبيانات التواصل."));
      return;
    }
    const year = Number(values.year);
    if (!Number.isInteger(year) || year < 1900 || year > (/* @__PURE__ */ new Date()).getFullYear() + 1) {
      setError(text("Please enter a valid vehicle year.", "يرجى إدخال سنة صنع صحيحة."));
      return;
    }
    const contact = values.contact.trim();
    const validContact = values.contactMethod === "Email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) : /^\+?[\d\s().-]+$/.test(contact) && contact.replace(/\D/g, "").length >= 7 && contact.replace(/\D/g, "").length <= 15;
    if (!validContact) {
      setError(text("Please enter a valid email address or phone number with country code for your selected contact method.", "يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف مع رمز الدولة حسب وسيلة التواصل المختارة."));
      return;
    }
    let reference = enquiryReference.current;
    if (!reference) {
      try {
        reference = createPpfEnquiryReference();
      } catch {
        setError(text("The request could not be prepared. Please try again or use the WhatsApp or call links on this page.", "تعذّر إعداد الطلب. يرجى المحاولة مجدداً أو استخدام روابط واتساب أو الاتصال في هذه الصفحة."));
        return;
      }
      enquiryReference.current = reference;
    }
    let storedAttribution;
    try {
      storedAttribution = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
    } catch {
      storedAttribution = {};
    }
    const context = buildPpfEnquiryContext(window.location.href, storedAttribution);
    submitting.current = true;
    const message = [
      text("PPF quote request from digitecme.com", "طلب عرض سعر PPF من digitecme.com"),
      ...ppfReferenceLines(reference, context),
      "Vehicle brand: " + values.brand.trim(),
      "Model: " + values.model.trim(),
      "Year: " + values.year,
      "Requested coverage: " + values.coverage,
      "Customer name: " + values.name.trim(),
      "Preferred contact method: " + values.contactMethod,
      "Contact details: " + contact,
      ...values.notes.trim() ? ["Customer notes: " + values.notes.trim()] : [],
      "Please confirm panel coverage, film options, preparation, price and installation time.",
      "Contact permission: reply to this quote request only; no marketing subscription."
    ].join("\n");
    const url = "https://wa.me/97143402223?text=" + encodeURIComponent(message);
    trackWhatsAppClick(url);
    track("whatsapp_draft_opened");
    window.location.assign(url);
  };
  return /* @__PURE__ */ jsxs("form", { id: "ppf-quote-form", className: "ppf-form", onSubmit: submit, "aria-describedby": "ppf-privacy", dir: isArabic ? "rtl" : void 0, children: [
    /* @__PURE__ */ jsxs("fieldset", { disabled: !ready, children: [
      /* @__PURE__ */ jsx("legend", { className: "sr-only", children: text("Your PPF quotation details", "بيانات طلب عرض سعر PPF") }),
      /* @__PURE__ */ jsxs("div", { className: "ppf-form-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-brand", children: text("Vehicle brand", "ماركة السيارة") }),
          /* @__PURE__ */ jsx("input", { id: "ppf-brand", dir: "auto", name: "vehicle_brand", required: true, maxLength: 60, value: values.brand, onChange: (e) => update("brand", e.target.value), placeholder: text("e.g. Porsche", "مثلاً بورشه"), autoComplete: "off" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-model", children: text("Vehicle model", "طراز السيارة") }),
          /* @__PURE__ */ jsx("input", { id: "ppf-model", dir: "auto", name: "vehicle_model", required: true, maxLength: 80, value: values.model, onChange: (e) => update("model", e.target.value), placeholder: text("e.g. 911 Carrera", "مثلاً 911 كاريرا"), autoComplete: "off" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-year", children: text("Year", "سنة الصنع") }),
          /* @__PURE__ */ jsx("input", { id: "ppf-year", name: "vehicle_year", type: "number", inputMode: "numeric", required: true, min: 1900, max: (/* @__PURE__ */ new Date()).getFullYear() + 1, step: 1, value: values.year, onChange: (e) => update("year", e.target.value), placeholder: "2025" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-requested-coverage", children: text("Requested coverage", "التغطية المطلوبة") }),
          /* @__PURE__ */ jsxs("select", { id: "ppf-requested-coverage", name: "coverage", required: true, value: values.coverage, onChange: (e) => update("coverage", e.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "Unsure — advise me", children: text("Unsure — advise me", "غير متأكد — أحتاج إلى المشورة") }),
            /* @__PURE__ */ jsx("option", { value: "Full Body", children: text("Full Body", "تغطية كاملة للهيكل") }),
            /* @__PURE__ */ jsx("option", { value: "Full Front", children: text("Full Front — confirm availability", "تغطية أمامية كاملة — تُؤكّد الإتاحة") }),
            /* @__PURE__ */ jsx("option", { value: "Partial / High Impact Areas", children: text("Partial / High Impact Areas", "تغطية جزئية / مناطق معرّضة للصدمات") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-name", children: text("Customer name", "الاسم") }),
          /* @__PURE__ */ jsx("input", { id: "ppf-name", dir: "auto", name: "customer_name", autoComplete: "name", required: true, maxLength: 100, value: values.name, onChange: (e) => update("name", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-contact-method", children: text("Preferred contact method", "وسيلة التواصل المفضلة") }),
          /* @__PURE__ */ jsxs("select", { id: "ppf-contact-method", name: "contact_method", required: true, value: values.contactMethod, onChange: (e) => update("contactMethod", e.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "WhatsApp", children: text("WhatsApp", "واتساب") }),
            /* @__PURE__ */ jsx("option", { value: "Phone", children: text("Phone", "الهاتف") }),
            /* @__PURE__ */ jsx("option", { value: "Email", children: text("Email", "البريد الإلكتروني") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ppf-form-wide", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-contact-details", children: values.contactMethod === "Email" ? text("Email address", "البريد الإلكتروني") : text("Phone number including country code", "رقم الهاتف مع رمز الدولة") }),
          /* @__PURE__ */ jsx("input", { id: "ppf-contact-details", name: "contact_details", required: true, type: values.contactMethod === "Email" ? "email" : "tel", autoComplete: values.contactMethod === "Email" ? "email" : "tel", maxLength: 160, value: values.contact, onChange: (e) => update("contact", e.target.value), "aria-describedby": "ppf-contact-help", dir: "ltr" }),
          /* @__PURE__ */ jsx("p", { id: "ppf-contact-help", className: "ppf-small", children: text("Your preferred reply method will be included in the WhatsApp request.", "ستُدرج وسيلة الرد المفضلة في طلب واتساب.") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ppf-form-wide", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "ppf-notes", children: text("Customer notes (optional)", "ملاحظات (اختياري)") }),
          /* @__PURE__ */ jsx("textarea", { id: "ppf-notes", dir: "auto", name: "customer_notes", rows: 3, maxLength: 1e3, value: values.notes, onChange: (e) => update("notes", e.target.value) })
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("p", { id: "ppf-form-error", role: "alert", children: error }),
      /* @__PURE__ */ jsxs("button", { type: "submit", disabled: !ready, className: "ppf-button ppf-button-primary", children: [
        /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
        text("Continue to WhatsApp", "المتابعة إلى واتساب")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { id: "ppf-privacy", className: "ppf-small", children: [
      text("Continuing shares these vehicle and contact details with WhatsApp to prepare an editable draft. Review and send it to request a quote from DIGI-TEC Performance Center L.L.C. An enquiry reference and limited source labels help the team match your request to a quote. This form cannot confirm receipt. Choosing Phone or Email specifies how you prefer a reply. These details are for this enquiry and do not subscribe you to marketing. ", "بالمتابعة تُشارك بيانات السيارة والتواصل مع واتساب لإعداد مسودة قابلة للتعديل. راجعها وأرسلها لطلب عرض سعر من DIGI-TEC Performance Center L.L.C. يساعد رقم مرجعي للاستفسار ومعلومات مصدر محدودة في ربط طلبك بعرض السعر. لا يمكن لهذا النموذج تأكيد الاستلام. اختيار الهاتف أو البريد الإلكتروني يحدّد وسيلة الرد المفضلة. البيانات لهذا الاستفسار فقط ولا تشترك بها في رسائل تسويقية. "),
      /* @__PURE__ */ jsx("a", { href: "/privacy-policy.pdf", target: "_blank", rel: "noopener noreferrer", children: text("Privacy policy", "سياسة الخصوصية") })
    ] }),
    /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("p", { children: text("Please use the WhatsApp or call links on this page to request your quote.", "يرجى استخدام روابط واتساب أو الاتصال في هذه الصفحة لطلب عرض السعر.") }) })
  ] });
}
export {
  PpfQuoteForm as P
};
