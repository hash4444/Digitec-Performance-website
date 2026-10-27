import { jsxs, jsx } from "react/jsx-runtime";
import { L as LocalizedLink } from "../entry-server.js";
const verifiedProtectionProjects = [];
function ProtectionProjects({ service, className }) {
  const projects = verifiedProtectionProjects.filter((project) => project.service === service && project.verified && project.evidence.length > 0);
  if (!projects.length) return null;
  return /* @__PURE__ */ jsxs("section", { className, "aria-labelledby": `${service}-projects-heading`, children: [
    /* @__PURE__ */ jsx("h2", { id: `${service}-projects-heading`, children: service === "ppf" ? "Recent PPF Work" : "Recent Ceramic Coating Work" }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-8 sm:grid-cols-2", children: projects.map((project) => /* @__PURE__ */ jsxs("article", { children: [
      /* @__PURE__ */ jsx("h3", { children: project.vehicle }),
      /* @__PURE__ */ jsx("img", { ...project.image, loading: "lazy", decoding: "async" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Initial condition:" }),
        " ",
        project.initialCondition
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Work performed:" }),
        " ",
        project.workPerformed
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Result:" }),
        " ",
        project.result
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: project.brandPath, className: "underline", children: "Explore the vehicle’s brand workshop" }),
        project.caseStudyPath && /* @__PURE__ */ jsx(LocalizedLink, { to: project.caseStudyPath, className: "underline", children: "Read the documented project" })
      ] })
    ] }, project.id)) })
  ] });
}
const formatVerifiedStartingPrice = (price) => {
  var _a;
  return typeof price.fromAed === "number" && Number.isFinite(price.fromAed) && price.fromAed > 0 && ((_a = price.priceSource) == null ? void 0 : _a.trim()) ? `From AED ${price.fromAed.toLocaleString("en-AE")}` : null;
};
export {
  ProtectionProjects as P,
  formatVerifiedStartingPrice as f
};
