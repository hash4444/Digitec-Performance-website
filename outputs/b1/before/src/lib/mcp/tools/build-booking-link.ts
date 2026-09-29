import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "build_booking_link",
  title: "Build WhatsApp booking link",
  description:
    "Build a WhatsApp deep link to Digitec Performance Center with a prefilled booking message that includes the car and service context.",
  inputSchema: {
    vehicle: z.string().min(1).describe("Vehicle make and model, e.g. 'Mercedes C63 AMG 2020'."),
    service: z.string().min(1).describe("Service the customer wants, e.g. 'Oil change' or 'AIRMATIC suspension fault'."),
    notes: z.string().optional().describe("Optional extra context like symptoms, mileage, or preferred date."),
  },
  annotations: { readOnlyHint: true, idempotentHint: false, openWorldHint: false },
  handler: ({ vehicle, service, notes }) => {
    const lines = [
      `Hi Digitec, I'd like to book a service.`,
      `Vehicle: ${vehicle}`,
      `Service: ${service}`,
    ];
    if (notes) lines.push(`Notes: ${notes}`);
    const message = lines.join("\n");
    const url = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
    return {
      content: [{ type: "text", text: url }],
      structuredContent: { whatsapp_url: url, message },
    };
  },
});