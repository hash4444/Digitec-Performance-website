# Baseline PPF quotation and analytics audit

Audit date: 2026-10-17 (Asia/Dubai). Read-only source inspection before Phase 1 edits. No enquiry, backend invocation, database operation, analytics account change, or production mutation was performed. Existing test scripts were inspected; their historical results are not evidence that the current build passes.

## Findings

| Severity | Affected URL | Evidence | Recommended local fix |
|---|---|---|---|
| High | `/services/paint-protection-film` | `src/components/PpfQuoteForm.tsx` collects only brand, model, year and three coverage values. Required customer name, preferred contact method, contact details, optional notes and “Unsure — advise me” are absent. Full Body is preselected. | Add the requested fields with input lengths, method-specific contact validation and no marketing enrolment. Default coverage to Unsure, presented as advice requested rather than a sold package. |
| High | `/ar/services/paint-protection-film` | `src/App.tsx` routes Arabic service slugs to `ServicePage`, which provides Arabic WhatsApp/telephone links but does not render `PpfQuoteForm`. | Reuse the localized PPF quotation component in the existing Arabic service layout. Preserve locale navigation, direction and canonical route. |
| Medium | EN PPF quotation section | `PpfPage.tsx` says “Share four details” and tells uncertain customers to choose the closest package. | Update the visible instructions alongside new fields and the explicit Unsure option. |
| Medium | EN/AR PPF analytics | `Analytics.tsx` suppresses its first automatic SPA page view because `index.html` already configures initial GA4 tracking. SPA page views are generic; there is no dedicated PPF page-view event. | Add a PPF-specific event with normalized route, language and service only, once per route visit; keep existing generic page-view convention and avoid rerender/search-parameter duplicates. |
| Medium / external dependency | EN/AR PPF conversion reporting | `PpfQuoteForm` opens `https://wa.me/97143402223` and has no server acknowledgement. `src/lib/mcp/tools/build-booking-link.ts` likewise builds a link. No quotation persistence or confirmed booking integration is wired to this funnel. | Preserve the supported WhatsApp draft handoff and label it accurately. Do not emit `quote_submitted`, `generate_lead` or `booking_confirmed` when opening the draft. A future verified receipt or booking system must supply deduplicated confirmation before those events are enabled. |
| Medium | PPF form validation/error states | Brand/model have explicit whitespace checks, while year is only native numeric HTML validation; no contact fields exist. Form uses a ref to suppress repeated submission, reset on `pageshow`, but has no opening status or navigation error recovery. | Validate all required values including year on submit, show accessible errors, disable repeat clicks while opening, restore on return/failure and keep a truthful recovery message. |
| Medium | PPF browser tests | `scripts/test-ppf-browser.mjs` checks only brand/model/year/coverage; it expects old title/H1 and exact old FAQ counts. Arabic form, new fields, contact methods, no successful lead on handoff and persistence checks are missing. | Exercise EN/AR prerendered form, new required fields, Unsure, valid/invalid contact methods, empty/year errors, single-start/single-handoff events, no PII in analytics/storage and disabled no-JS submission. Block every external request. |
| Low / verification gap | Privacy notice | Existing form links `/privacy-policy.pdf` and accurately says WhatsApp opens a draft. It currently says no name or phone is needed, which becomes stale once contact fields are added. No marketing opt-in or marketing workflow appears in the inspected PPF code. | Explain the new data handoff before the CTA: opening the prefilled draft shares its details with WhatsApp; the customer reviews and sends it to the workshop to request the quotation. State no marketing subscription. Keep optional marketing consent separate and unchecked if a real marketing workflow is later introduced. Privacy PDF content was not extracted in this audit; policy coverage requires review before publication. |

## Existing safeguards to retain

- The WhatsApp number `97143402223` matches existing PPF content, Header, Footer and the repository contact-info tool. This establishes existing supported repository workflow, not independent proof that the number can currently receive WhatsApp messages.
- `trackWhatsAppClick` strips URL query and fragment before `dataLayer` storage, preventing the structured enquiry message from being copied into the custom click event.
- Form events send route/form/service/placement only, and the form button does not bubble into global anchor tracking. The existing distinction is one `whatsapp_click` dataLayer event plus one `whatsapp_draft_opened` form event. Direct WhatsApp anchors produce `whatsapp_click` plus the established `whatsapp_chat_opened` event. These are contact attempts, not confirmed leads.
- Telephone anchors use the existing `telephone_link_clicked` event. It indicates a link click, not a connected call or booking.
- `contact-attribution.ts` excludes arbitrary UTM campaign/content/search values, sanitizes legacy stored attribution, retains origin/path only for landing URLs and origin only for referrers.
- Inputs have visible labels, sensible lengths, native year bounds, responsive single-column layout below 420px and an aria-described privacy notice.
- The form submit button is disabled during prerender/no-JS output; existing browser journeys explicitly test that pressing Enter does not leak vehicle fields into a GET URL.
- Existing tests block outbound enquiries and analytics; preserve this in all local verification.

## Tracking specification

| Stage | Existing or proposed event | Truth condition | Allowed payload |
|---|---|---|---|
| PPF page viewed | Proposed dedicated `ppf_page_view` | EN/AR commercial PPF route mounted/visited | route, language, service |
| Form started | Existing `quote_started` | First value change per mounted form | route, form ID, CTA placement, service, language if available |
| WhatsApp CTA clicked | Existing `whatsapp_click`; direct anchors also retain `whatsapp_chat_opened` | User activates a supported WhatsApp link | Query-free destination, route, placement/service context |
| Form draft opened | Existing `whatsapp_draft_opened` | Valid form initiates WhatsApp navigation | Route, form ID, placement, service, language; no entered values |
| Telephone CTA clicked | Existing `telephone_link_clicked` | User activates telephone anchor | Existing business link, route, placement, sanitized attribution |
| Quote submitted | Future `quote_submitted` | Supported recipient/backend verifies receipt, with stable deduplication ID | Nonpersonal service context and an opaque receipt ID; no message/contact details |
| Booking confirmed | Future `booking_confirmed` | Verified booking system reports actual confirmation | Nonpersonal booking context and opaque deduplication ID |

Do not configure draft/click events as confirmed lead or booking conversions. The production GTM/GA4 account configuration, ingestion, enhanced-measurement behavior and key-event settings remain unverified and are outside this local implementation. In particular, custom-event redaction does not itself prove that externally configured automatic form/outbound events cannot capture URL queries; review those settings with account access before publication.

## Required backend work if verified lead completion is needed

A later approved workstream must choose an existing supported receipt/booking integration, document request-only data use and retention, implement validation, spam/rate controls and error handling, and expose only a success acknowledgement after storage/delivery succeeds. Server-side confirmation needs an opaque deduplication identifier and must not include personal data in analytics. No Supabase function, table or migration is required or authorized for the current WhatsApp handoff.

## Verification limits

This audit proves source behavior and identifies coverage gaps. It does not prove current production reception of WhatsApp messages, delivery of a quotation, connected calls, analytics ingestion, booking conversion, privacy-policy legal adequacy or account consent configuration. The parent implementation report should append actual local browser/build results after changes.


## Implemented funnel verification

Final updated `scripts/test-ppf-browser.mjs` passed against the final prerendered build on 2026-10-17, after parent-confirmed build source SHA `d678ff0c908c97150a56a80befa9c5eedf6bf2f999064b2a8fe79b5814f18565`. Results: `browser/browser-results.json` beside this audit. Edge required an elevated local test process because Windows sandboxed Edge exited before launch; the test owned its local static server and blocked every external request. No live enquiry or analytics event was sent.

Verified English and Arabic quotation forms, all preferred reply methods, default Unsure coverage, optional notes, whitespace and required-data checks, invalid email/phone, invalid and fractional year values, duplicate-submit suppression, exactly one start/handoff event, no confirmed-lead/booking event, no entered values in analytics or browser storage, disabled no-JavaScript fields/submission, actual language-switch round trip, five WhatsApp anchor placements and telephone tracking. Dedicated PPF page-view payloads retain the correct destination path during ceramic-to-PPF and English/Arabic SPA navigation, omit location queries/fragments, include language and do not repeat for query/hash-only changes.

All eight isolated form screenshots were visually inspected: English/Arabic, 320/390px, light/dark. Labels, values, textarea, submit button and privacy notice are readable; no horizontal overflow or clipped controls was observed. The shared fixed header/contact bar is hidden only during isolated tall-form captures to avoid screenshot artifacts; ordinary page/mobile screenshots retain it. A minor existing RTL presentation behavior remains: a Latin model beginning with numbers can display with its leading number visually reordered; the exact stored and transmitted value is preserved. A future `dir="auto"` vehicle-input polish can address that without changing locale navigation.

The successful tests establish local application behavior. They do not verify GA ingestion or configuration, WhatsApp delivery, confirmed quotations/bookings, privacy-policy legal coverage, or an increase in rankings/sales.
