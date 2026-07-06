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
      business: "Digitec Performance Center",
      phone: "+971 4 340 2223",
      whatsapp: "+971 4 340 2223",
      whatsapp_link: "https://wa.me/97143402223",
      website: "https://digitecme.com",
      area: "Al Quoz Industrial Area, Dubai, UAE",
      specialization:
        "Independent workshop for German and luxury cars: Mercedes-Benz, BMW, Audi, Porsche, Bentley, Ferrari, Lamborghini, McLaren, Rolls-Royce, Aston Martin, Land Rover, Maybach, Bugatti.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});