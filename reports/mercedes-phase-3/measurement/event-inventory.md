# Source-confirmed event inventory and measurement gaps

Observed in the current frontend source on 26 October 2026. No live event stream, GA4/GTM account, consent setup, CRM or backend was inspected. Existing scripts do not prove that any event arrived, was registered as a custom dimension/key event, or has a nonzero count.

| Existing event / behavior | Source | What it establishes | What it does not establish |
| --- | --- | --- | --- |
| Initial GA4 configuration plus SPA `page_view` | `index.html:184–202`; `src/components/Analytics.tsx:62–80`; Analytics mounted at `src/App.tsx:144`. | Source installs a GA4 config; route changes emit page views after skipping the component's initial route event. Page URLs omit query/fragment; referrer is origin-only. | Live page-view delivery, session totals, source classification, consent behavior or duplicate-free collection. Both GTM bootstrap and direct gtag configuration exist; the actual container/stream configuration must be read before drawing a duplication conclusion. |
| `telephone_link_clicked` | `Analytics.tsx:22,84–101`. | Delegated anchor click on `tel:`; parameters include method, business link URL, page path, CTA placement/default `unspecified`, and available sanitised first touch. | Connected call, caller identity, enquiry quality, answered call, booking or sale. |
| `whatsapp_chat_opened` | `Analytics.tsx:24,84–101`. | A WhatsApp anchor click attempts navigation. WhatsApp query/hash, including prefilled text, are stripped from the analytics link URL. | Successful app opening, sent message, staff receipt or qualified lead. Event name is broader than the evidence. |
| `whatsapp_click` (dataLayer) | `src/lib/whatsapp-tracking.ts:24–33`; invoked by anchor handler and both booking forms. | Code pushes a sanitised link URL plus page path to dataLayer. | A collected GA4 event unless the current GTM mapping is verified. Do not add this count to the gtag WhatsApp counts: it can describe the same user action. |
| `whatsapp_draft_opened` | `src/components/MercedesServiceBookingForm.tsx:43–65`; generic `BrandBookingForm.tsx` equivalent. | After valid form fields, code emits an event and attempts `window.open` with a WhatsApp draft. Mercedes parameters: brand `Mercedes-Benz`, page path, form id, placement `booking_form`, intent `scheduled_maintenance`. No form values are sent in this event. | A successful new window, sent enquiry, confirmed appointment, repair enquiry or completed work. Event occurs before the window-open result; use “draft attempt” in reports. |
| `email_link_clicked`, `directions_clicked` | `Analytics.tsx:11–25,84–101`. | Supported anchor patterns create interaction events. Directions matching is limited to `maps.google.` in the reviewed function. | All Maps URLs, successful navigation or workshop arrival. Not a primary qualified-lead metric. |
| Session first touch | `src/lib/contact-attribution.ts`; `Analytics.tsx:28–38,58–60`. | `digitec_first_touch` in sessionStorage: sanitised landing URL, origin-only initial referrer, allowlisted source/medium, recognised AI-referrer label. | Durable user identity, cross-device attribution, a CRM join, free-text campaign labels, or an explicit stored click-ID bridge. Whether GA4 auto-tagging/GTM separately handles click IDs is unverified. |

The Mercedes hub uses `MercedesServiceBookingForm`, so form drafts must be counted separately from anchor interactions. Neither should be labelled “bookings.” A validly submitted draft may never be sent. The form contains customer details in its WhatsApp draft URL, while `safeWhatsAppUrl` intentionally removes query/hash before tracking; preserve that boundary in any later instrumentation.

## Read-only evidence needed before filling the dashboard

| Owner | Required existing export / inspection | Acceptance |
| --- | --- | --- |
| Analytics owner | GA4 property/stream identifiers, timezone, event report with parameter availability, landing/session acquisition fields, data quality notices and matching date range. | Confirm actual event delivery and definitions; missing dimensions remain unavailable. No setup change is implied. |
| Tag manager owner | Current published GTM export/readback, GA4 tags/triggers, parameter mappings and existing consent/collection controls. | Establish whether `whatsapp_click` maps to GA4; check duplicate page/contact events without assuming a defect. No tags, key events or consent settings changed. |
| Workshop/CRM owner | Restricted, anonymised enquiry/qualification/booking/cancellation extract with stable internal references and status dates. | Staff confirms received enquiry and qualification; deduplicate repeat contacts. No message/customer PII in dashboard. |
| Finance owner | Approved invoice/credit export, AED basis, net/VAT treatment and booking joins. | Reconcile totals and unmatched records; do not infer revenue from clicks or quotations. |

Future instrumentation/reference tokens, if useful after read-only validation, are separate proposed implementation work. Existing source events can support an interaction dashboard only after collection is verified; they cannot reconstruct missing historical CRM joins.
