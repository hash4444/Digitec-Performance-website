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
    "Tools for Digi-Tec Performance Center, an independent vehicle workshop established in Dubai in 2002 and located at Al Quoz Industrial Area 3. Use `list_services` to discover published service pages, `list_brands` to discover published brand pages, `get_contact_info` for verified contact/location details, and `build_booking_link` to create a WhatsApp enquiry URL. A listed page is not a blanket capability promise; confirm coverage for the exact VIN, model, year and requested work before booking.",
  tools: [getContactInfo, listServices, listBrands, buildBookingLink],
});
