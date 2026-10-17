# PPF lead attribution and CRM integration specification

Design date: 17 October 2026, Asia/Dubai. Status: local reference/acquisition helper implemented; CRM, receipt confirmation and advertising imports are **not connected**. This document specifies the next approved integration and a manual reconciliation process. No customer record, webhook, database, migration, messaging API or analytics-account change has been created.

## Implemented boundary

`PpfQuoteForm.tsx` still opens the established `wa.me/97143402223` workflow. On a valid submission it generates a random 96-bit `PPF-` reference, reuses it for retries/edits while the form remains mounted, and adds it to the editable draft. It is an **enquiry reference**, not a received lead ID. No record exists until the customer sends and the business receives the message.

The draft also contains restricted source/medium, campaign/ad-group and landing-path labels. Known source/medium labels reuse the existing acquisition convention. Only approved campaign codes and matching channel combinations are accepted; arbitrary UTM strings, click IDs and query/fragment text are excluded. Current tagged acquisition is kept together; it is not combined with a different stored first-touch visit. Untagged visits can reuse existing sanitized first-touch source/medium/landing, with campaign/ad group `unknown`.

Only known public landing paths are carried into the draft. Unrecognized values become `unknown`; the future intake adapter maps that sentinel to null in the restricted CRM contract. No new browser storage or network service was added. Campaign labels and the reference are not sent in custom analytics events. The reference is held in component memory; reload/remount creates a new reference. Actual customer details are still shared with WhatsApp by user action under the updated notice. All client-provided fields, including references and campaign labels, remain editable and untrusted.

## Data model

The [JSON design schema](lead-model.schema.json) and [empty register header](lead-register-template.csv) are review artifacts. They are not a production datastore or an approved customer-data location. Use an existing business-approved, access-controlled CRM/register after its owner approves handling, access and retention. Do not populate this repository or public outputs with real customer data.

| Field | Meaning / source of truth | Analytics boundary |
|---|---|---|
| `lead_id` | Stable CRM-generated ID assigned after actual receipt; never inferred from a click | Future nonpersonal deduplication only after approved mapping; currently not emitted |
| `enquiry_reference` | Optional `PPF-` draft reference copied from received message | Kept outside current analytics |
| `received_at`, `receipt_evidence_id` | Actual received-message/call intake time and restricted evidence pointer | Evidence pointer and message never sent |
| `source`, `medium` | Controlled labels plus unknown; provenance recorded separately | Aggregate source reporting only; never arbitrary customer input |
| `campaign`, `ad_group` | Approved campaign taxonomy when available | Current custom events do not send these draft labels |
| `landing_page` | Known public route, no query or fragment; unknown when missing | No personal URL paths/parameters |
| `attribution_basis` | reported_campaign, customer_reported, verified_click, or unknown | Client UTM labels are not verified paid-click attribution |
| `vehicle_make`, `vehicle_model`, `vehicle_year` | Received vehicle request, corrected by staff with customer | Restricted CRM only |
| `coverage_requested` | Full Body, Full Front requested/unconfirmed, Partial / High Impact Areas, or Unsure | Restricted CRM only |
| `qualification_status` | Pending, qualified or unqualified; staff reason recorded privately | Future stage counts only |
| `quotation_status`, `quotation_value_aed`, `quote_id` | Actual quote system record and documented value | No browser-created quote values |
| `booking_status`, `booking_id`, `booking_confirmed_at` | Actual appointment/booking record | Future booking event only on verified confirmation |
| `invoice_status`, `invoice_id`, `final_invoiced_value_aed` | Final accounting invoice, not the draft or quotation value | Future approved revenue reporting uses an agreed consistent value basis |
| `contact_record_id`, `owner_id`, `notice_version` | Restricted contact record, responsible staff and notice used at intake | Never analytics payload |

Amounts are AED, two decimal places, nullable when not yet known. Null is not zero. Do not copy the AED 5,000 advertising budget into quote or invoice fields. Staff must agree a consistent invoice value basis and treatment of voided/refunded invoices before reporting revenue. This specification sets no public price.

The contact record stores name, telephone/email and the actual correspondence only in the approved restricted system, separate from campaign exports. No raw or hashed customer identifier is added to this site's analytics events. Google requires avoiding PII in Analytics, including entered fields, URLs and campaign parameters. [Google Analytics privacy guidance](https://support.google.com/analytics/answer/6366371).

## Receipt and sales reconciliation

1. A valid website form opens a draft. Record this only as a draft diagnostic. No `quote_submitted` or lead row is created by the browser.
2. When the workshop actually receives the WhatsApp message, the assigned staff member records its receipt time and protected message pointer, creates a `lead_id`, and copies the reference and reported acquisition labels. If the customer removed the reference, create the lead with a missing-reference flag. Do not invent a match.
3. Deduplicate received conversations in the approved CRM using the actual customer, vehicle and active enquiry. Repeated messages with the same reference are not separate leads. Two different enquiries must not be merged solely because a customer copied a reference; preserve audit history and staff decisions.
4. Confirm vehicle details and coverage, qualify the request, and link the actual quotation by `quote_id`. Enter quotation value only from that quotation. Revisions update the quote version rather than multiplying leads.
5. Link the confirmed booking from the real booking record. A requested appointment, connected call or accepted quote alone does not prove booking confirmation.
6. Link the final invoice and its current accounting status. Distinguish issued from paid, cancellation and voids. Reconcile corrections/refunds before reporting net outcomes.
7. Compare received → qualified → quoted → booked → invoiced cohorts. Keep receipt date and sale date separately; allow late conversions to mature instead of assigning every invoice to the current month's spend.

For direct WhatsApp links, telephone calls and manually edited messages, the website cannot currently establish a browser-to-sale join. Record the actual receipt and use optional customer-reported source or `unknown`. Do not attribute every unidentified PPF enquiry to Google. Existing click totals are useful diagnostics but are not a denominator for received-lead conversion rate.

## Campaign taxonomy and URL contract

| Channel | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` used as ad-group label |
|---|---|---|---|---|
| Search general | google | cpc | ppf_search | ppf_general |
| Search full body | google | cpc | ppf_search | ppf_full_body |
| Search quotation | google | cpc | ppf_search | ppf_quote |
| Meta prospecting | facebook or instagram | paid_social | ppf_meta_prospecting | ppf_prospecting |
| Meta retargeting, only if eligible | facebook or instagram | paid_social | ppf_meta_retargeting | ppf_retargeting |

Example (draft specification, no campaign created):

`https://digitecme.com/services/paint-protection-film?utm_source=google&utm_medium=cpc&utm_campaign=ppf_search&utm_content=ppf_quote#ppf-quote`

Do not put names, telephone numbers, email addresses, search-term text, VINs or notes in UTM values. `utm_content` means a controlled ad-group code in this design, not arbitrary ad text. Current runtime does not store campaign codes across navigation, reload-free language switches that drop the query, or later sessions. Such cases remain unknown; this is not cross-device or multi-touch attribution. The register records a stated attribution basis, not an advertising-platform match guarantee.

GCLID/GBRAID/WBRAID/Meta click identifiers are **not captured, stored or placed in the WhatsApp draft** in this release. A future protected receipt integration may handle approved click identifiers after account, privacy/consent, storage and retention review. Do not silently reconstruct them from browser history or add them to GA4 events.

## Event contract and lifecycle gates

| Event | Retained meaning | Allowed current context |
|---|---|---|
| `ppf_page_view` | PPF route visit, deduplicated against query/hash changes | Normalized page URL/path, language, service, origin-only referrer |
| `quote_started` | First edit per mounted form | Fixed form/service/placement + pathname |
| `whatsapp_click` | Existing dataLayer contact attempt | Query-free WhatsApp destination + pathname |
| `whatsapp_draft_opened` | Valid form initiates navigation to editable draft | Fixed form/service/placement + pathname |
| `telephone_link_clicked` | Existing telephone-link activation | Existing business phone destination, placement and sanitized acquisition |
| `quote_submitted` | Reserved until recipient/backend acknowledges actual receipt | Not emitted by this implementation |
| `booking_confirmed` | Reserved for verified booking data | Not emitted by this implementation |

The existing direct-link `whatsapp_chat_opened` event also remains. Do not sum the dataLayer click and GA draft/open events as separate people or leads. Do not make page views, clicks or drafts primary lead bidding goals. Before future server-side stage events, use an opaque idempotency key such as `lead_id + stage + source_record_version`, verify the receipt/booking evidence, and maintain an acknowledgement/retry log. The same confirmed milestone must not be counted twice through GA import and direct advertising imports.

## Safe local integration plan

Completed now: pure source-label/reference helper, frontend draft integration, bilingual notice and bidirectional fields, unit/property checks, browser message/event tests, and this empty data contract. There is no form receipt endpoint and no backend success state.

After a separate integration approval:

1. Inventory the existing CRM, quote, booking and invoice systems with read-only access; select the actual system of record and confirm roles, retention and notice/consent requirements.
2. Implement against local fake receipt/booking/invoice fixtures first. Test received versus draft, missing reference, invalid/edited labels, duplicates, retries, out-of-order timestamps, quote revisions, cancellations, zero/null amounts and invoice corrections. Never use real customer data in repository fixtures.
3. Choose a supported receipt mechanism. A manually confirmed intake process may be sufficient initially; an authenticated messaging/CRM integration requires its own approval. Validate identifiers server-side, authenticate/rate-limit endpoints, keep PII server-side, and acknowledge only after accepted receipt/storage. No Supabase migration, function or new webhook is authorized here.
4. Add an outbox with an opaque deduplication ID and actual source-system timestamps. Run dry-run exports and reconcile source-system totals before enabling any external transmission.
5. Review the real GA4/GTM property, consent and redaction settings in preview mode. Explicitly inspect automatic form/outbound tracking, URLs, debug payloads and key-event configuration. Existing code redaction does not establish container-wide behavior.
6. Select the current account-supported advertising import method and obtain separate authorization before connecting or sending. Official Google documentation now describes the June 15, 2026 transition to Data Manager API, with legacy Google Ads API access caveats; do not design a new legacy-upload integration by assumption. [Current offline import guidance](https://support.google.com/google-ads/answer/2998031), [migration and diagnostics](https://support.google.com/google-ads/answer/13321563).
7. Validate one controlled, authorized test receipt end to end and reconcile it to a real source record before enabling primary conversions. Keep live account changes and paid campaigns on hold until approved.

## Operating report specification

Weekly, report distinct received leads, qualified leads, quoted leads, confirmed bookings, completed installations where documented, issued/paid invoice values and unknown-attribution rate. Show diagnostic page views/form starts/drafts in separate columns. No result is supplied here because no actual CRM/spend records were accessed.

Use cost per **distinct received lead**, cost per qualified lead, booking rate among qualified leads, quote acceptance rate among issued quotes, and final invoiced value relative to matched cohort spend. Null denominators yield “not available”, not zero. Label campaign labels as reported unless a verified paid-click match exists. These are reporting definitions, not forecasts or promised returns.
