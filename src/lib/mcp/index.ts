import { defineMcp } from "@lovable.dev/mcp-js";
import getContactInfo from "./tools/get-contact-info";
import listServices from "./tools/list-services";
import listBrands from "./tools/list-brands";
import buildBookingLink from "./tools/build-booking-link";

export default defineMcp({
  name: "digitec-mcp",
  title: "Digitec Performance Center",
  version: "0.1.0",
  instructions:
    "Tools for Digitec Performance Center, an independent Dubai workshop for German and luxury cars. Use `list_services` to discover service pages, `list_brands` for supported brands, `get_contact_info` for phone/WhatsApp/location, and `build_booking_link` to generate a prefilled WhatsApp booking URL.",
  tools: [getContactInfo, listServices, listBrands, buildBookingLink],
});