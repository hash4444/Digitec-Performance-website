import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SITE = "https://digitecme.com";

const services: { slug: string; title: string; category: "general" | "mercedes"; path?: string }[] = [
  { slug: "mercedes-benz-service-dubai", title: "Mercedes-Benz Repair & Service in Dubai", category: "mercedes", path: "/brands/mercedes-benz-service-dubai" },
  { slug: "mercedes-mechanical-repair-dubai", title: "Mercedes Mechanical Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-transmission-repair-dubai", title: "Mercedes Transmission Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-suspension-repair-dubai", title: "Mercedes Suspension Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-steering-repair-dubai", title: "Mercedes Steering Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-brake-repair-dubai", title: "Mercedes Brake Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-oil-change-dubai", title: "Mercedes Oil Change in Dubai", category: "mercedes" },
  { slug: "mercedes-tire-repair-dubai", title: "Mercedes Tire Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-battery-replacement-dubai", title: "Mercedes Battery Replacement in Dubai", category: "mercedes" },
  { slug: "mercedes-exhaust-repair-dubai", title: "Mercedes Exhaust Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-diagnostics-dubai", title: "Mercedes Diagnostics in Dubai", category: "mercedes" },
  { slug: "mercedes-electrical-repair-dubai", title: "Mercedes Electrical Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-fuel-system-repair-dubai", title: "Mercedes Fuel System Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-ac-repair-dubai", title: "Mercedes AC Repair in Dubai", category: "mercedes" },
  { slug: "mercedes-body-repair-dubai", title: "Mercedes Body Repair in Dubai", category: "mercedes" },
  { slug: "mechanical-repair-dubai", title: "Mechanical Repair in Dubai", category: "general" },
  { slug: "transmission-repair-dubai", title: "Transmission Repair in Dubai", category: "general" },
  { slug: "suspension-repair-dubai", title: "Suspension Repair in Dubai", category: "general" },
  { slug: "steering-repair-dubai", title: "Steering Repair in Dubai", category: "general" },
  { slug: "brake-repair-dubai", title: "Brake Repair in Dubai", category: "general" },
  { slug: "car-service-dubai", title: "Car Service in Dubai", category: "general" },
  { slug: "oil-change-dubai", title: "Oil Change in Dubai", category: "general" },
  { slug: "tire-repair-dubai", title: "Tire Repair in Dubai", category: "general" },
  { slug: "battery-replacement-dubai", title: "Battery Replacement in Dubai", category: "general" },
  { slug: "exhaust-repair-dubai", title: "Exhaust Repair in Dubai", category: "general" },
  { slug: "car-diagnostics-dubai", title: "Car Diagnostics in Dubai", category: "general" },
  { slug: "auto-electrical-repair-dubai", title: "Auto Electrical Repair in Dubai", category: "general" },
  { slug: "fuel-system-repair-dubai", title: "Fuel System Repair in Dubai", category: "general" },
  { slug: "car-ac-repair-dubai", title: "Car AC Repair in Dubai", category: "general" },
  { slug: "car-body-repair-dubai", title: "Car Body Repair in Dubai", category: "general" },
  { slug: "paint-protection-dubai", title: "Paint Protection (PPF & Ceramic) in Dubai", category: "general" },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description:
    "List Digitec Performance Center services in Dubai. Optionally filter by category (general or mercedes) or a case-insensitive search string on the title.",
  inputSchema: {
    category: z
      .enum(["general", "mercedes", "all"])
      .optional()
      .describe("Filter by service category. Defaults to all."),
    search: z
      .string()
      .optional()
      .describe("Case-insensitive substring to match against the service title."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, search }) => {
    const cat = category ?? "all";
    const q = search?.trim().toLowerCase();
    const filtered = services
      .filter((s) => cat === "all" || s.category === cat)
      .filter((s) => !q || s.title.toLowerCase().includes(q))
      .map(({ path, ...service }) => ({ ...service, url: `${SITE}${path ?? `/services/${service.slug}`}` }));
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { count: filtered.length, services: filtered },
    };
  },
});
