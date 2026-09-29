import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Return Digitec Performance Center contact details: phone, WhatsApp, email, address, and website.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      business: "Digi-Tec Performance Center",
      established: 2002,
      phone: "+971 4 340 2223",
      whatsapp: "+971 4 340 2223",
      whatsapp_link: "https://wa.me/97143402223",
      website: "https://digitecme.com",
      email: "info@digitecme.com",
      address: "Al Quoz Industrial Area 3, Dubai, UAE",
      service_area: "Dubai",
      specialization:
        "Independent workshop for vehicle inspection, maintenance, mechanical and electrical repair, body work, and vehicle-specific performance-project consultation. Confirm coverage for the exact vehicle and requested work.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
