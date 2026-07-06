import { defineTool } from "@lovable.dev/mcp-js";

const SITE = "https://digitecme.com";

const brands = [
  { name: "Mercedes-Benz", slug: "mercedes-benz-service-dubai" },
  { name: "Maybach", slug: "maybach-service-dubai" },
  { name: "Porsche", slug: "porsche-service-dubai" },
  { name: "Audi", slug: "audi-service-dubai" },
  { name: "BMW", slug: "bmw-service-dubai" },
  { name: "Lamborghini", slug: "lamborghini-service-dubai" },
  { name: "Bentley", slug: "bentley-service-dubai" },
  { name: "McLaren", slug: "mclaren-service-dubai" },
  { name: "Ferrari", slug: "ferrari-service-dubai" },
  { name: "Bugatti", slug: "bugatti-service-dubai" },
  { name: "Land Rover", slug: "land-rover-service-dubai" },
  { name: "Rolls-Royce", slug: "rolls-royce-service-dubai" },
  { name: "Aston Martin", slug: "aston-martin-service-dubai" },
];

export default defineTool({
  name: "list_brands",
  title: "List brands serviced",
  description: "List luxury and performance car brands serviced by Digitec Performance Center in Dubai.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = brands.map((b) => ({ ...b, url: `${SITE}/brands/${b.slug}` }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, brands: items },
    };
  },
});