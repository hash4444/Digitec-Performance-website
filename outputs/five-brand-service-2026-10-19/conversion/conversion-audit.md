# Five-brand service conversion audit — 19 October 2026

Source audit of the existing Rolls-Royce, Lamborghini, Volkswagen, Mercedes-Benz and BMW hubs and their shared service/booking components. The findings describe the source inspected before the sprint's final build; the final rendered/browser report is authoritative for the revised layout. No production, backend, analytics-property or PPF changes were made by this audit.

## Existing conversion paths

| Surface | Existing next step | Context retained | Measurement |
| --- | --- | --- | --- |
| Every brand hub hero | WhatsApp plus `tel:+97143402223` | Brand in the prefilled WhatsApp message | `whatsapp_click` plus `whatsapp_chat_opened` for a WhatsApp anchor; `telephone_link_clicked` for phone |
| Every hub booking section | WhatsApp, phone and BrandBookingForm | Read-only brand and visitor's issue; optional name/callback phone in draft | `whatsapp_click` plus `whatsapp_draft_opened` when form validation passes |
| BMW, Lamborghini, Rolls-Royce English hub detail sections | Qualified vehicle/concern checklist and brand WhatsApp action | Model, year, mileage and symptoms prompts; Rolls-Royce also service history | Tagged placements such as `details_card`, `booking_section`, `quote_section` |
| Shared individual brand-service template | Hero WhatsApp/phone and final appointment action | Brand plus selected service in `combo.whatsAppMessage` | Tagged `hero`, `service_scope` and `final_cta` |
| Footer | Phone, email and workshop directions | No vehicle context | Link-click events where the target is recognized |
| Header contact action | Generic vehicle WhatsApp action | Generic vehicle request | No placement attribute, so `unspecified` |

All sampled destinations use the same published telephone and WhatsApp digits: `+971 4 340 2223` / `97143402223`. Footer address is Warehouses 11–15, Al Quoz Industrial Area 3, Dubai, UAE; email is `info@digitecme.com`. The maps link is an area query rather than a verified Business Profile/place link. The audit confirms syntactic destinations and source consistency, not phone connection, WhatsApp account availability or message delivery.

## Form behavior and customer expectations

`src/components/BrandBookingForm.tsx` contains no fetch, database write or email send. It validates the issue and optional callback number, builds an editable WhatsApp draft, and calls `window.open`. The user must send that draft in WhatsApp. The form correctly labels its action “Continue to WhatsApp” and says “Review and send your message in WhatsApp.” Brand context survives the draft. Name and callback number remain optional; an issue shorter than five or longer than 600 characters, and an invalid supplied phone number, are rejected. Labels, error IDs, `aria-invalid`, `aria-describedby`, `role="alert"`, and autocomplete are present.

The surrounding hub copy initially said “use the form to send your details directly.” That wording implies direct delivery and should be replaced, scoped to the five brands, with an explicit WhatsApp-draft explanation. The initial generic Volkswagen booking description also promised a quote and earliest slot; align it to vehicle identification, appropriate assessment, scope confirmation and appointment availability, with a possible inspection before an accurate estimate. Arabic surrounding copy similarly deserves that qualified expectation on these existing routes. Do not silently turn the form into a backend submission.

Recommended follow-up: show a usable fallback link or status when opening WhatsApp fails or popups are blocked. The existing code ignores `window.open`'s return value. Capture model/year/mileage in clearer prompts where absent, but avoid forcing unnecessary personal data. Keep an always-available phone alternative.

## Attribution and enquiry counting

`src/components/Analytics.tsx` and `src/lib/contact-attribution.ts` keep clean route-level first-touch attribution in sessionStorage. Allowed source/medium labels and recognized AI referrers are retained; arbitrary campaign values, query strings, fragments and previous private keys are excluded. `src/lib/whatsapp-tracking.ts` strips WhatsApp query strings and fragments before recording the destination, protecting the draft's personal/message content. Form analytics send brand, route, form ID and placement; they omit typed name, callback phone and issue.

Every event above is a contact intent. Even the name `whatsapp_chat_opened` denotes the anchor click handled by the page; it cannot establish an app launch or delivered message. Do not count or sum `whatsapp_click`, `whatsapp_chat_opened`, `whatsapp_draft_opened`, telephone, email or directions clicks as confirmed enquiries. A single anchor action creates two different WhatsApp intent events, so making both key events would double count one action.

Recommend separately reporting organic landing sessions, CTA intents, verified workshop-received enquiries, qualified enquiries, quotations and booked jobs. Confirmed stages require consented workshop/CRM evidence and an operational matching process. The current brand form does not supply an enquiry reference or receipt callback. GA4 ingestion, key-event configuration, incoming calls, CRM matching, WhatsApp delivery and booking outcomes remain unverified. Add CRM integration only in a separately approved backend scope.

The global header loses specific brand/service context, and most footer/header links lack a placement attribute. Those are lower-priority shared-template recommendations because changing them would affect unrelated pages. The homepage mascot does not render on brand hubs, so it is not a second floating overlay there.

## Mobile findings and verification scope

The source uses stacked mobile hero actions, full-width inputs, responsive two-column form fields, labels and large booking buttons. Mercedes, BMW, Lamborghini and Rolls-Royce English hubs initially had a fixed mobile WhatsApp/phone bar with bottom page padding; Volkswagen did not. Mercedes/BMW shared hub conditions support Arabic; Lamborghini/Rolls-Royce priority bars were English-only. That difference is a conversion consistency opportunity, not proof the pages are unusable. Check all five English and Arabic hubs at 320px and 390px, including heading wrapping, horizontal overflow, sticky header/section-nav overlap, CTA hit targets, keyboard focus, footer clearance and form errors. Use the final browser evidence rather than old screenshot artifacts to claim current usability.

The shared BrandServicePage has no brand booking form; its hero and final WhatsApp/phone steps provide a clear alternative. Existing JavaScript-free HTML preserves contact anchors, but the form requires client-side JavaScript. Confirm that fallback anchors remain visible in the final prerender.

## Completed evidence

- `node scripts/test-contact-attribution.mjs` — PASS on 19 October 2026. Existing test verifies clean URLs, sanitized legacy session attribution, AI host checks, one initial GA4 configuration and recognized source labels.
- `node outputs/five-brand-service-2026-10-19/conversion/test-brand-form.mjs` — PASS. Exercises the real form and tracking source transpiled in an isolated Node VM: all five brands preserve context, private values are excluded from analytics, optional details work, invalid inputs do not open a draft or emit events, and Arabic draft labels work. Results and source hashes are saved in `form-functional-tests.json`.
- This source-level test sends no request or message. It does not claim browser popup success, real WhatsApp delivery, GA4 ingestion, backend receipt or confirmed enquiries.

## Existing test inventory for the release owner

- `npm run build`: complete existing SSR/client/prerender build; routing, production SEO router, SEO, PPF/protection, contact attribution, enquiry, oil-change, suspension, transmission and social metadata validators are chained. Run once under the release owner's coordination because it rewrites generated output.
- `npm run lint` and `npm run typecheck`: repository lint/type checks.
- `npm run test:routing`, `node scripts/test-production-seo-router.mjs`, `node scripts/test-routing-response.mjs`: routing/hosting checks with appropriate generated artifacts and local preview inputs.
- `npm run validate:seo`, `npm run validate:master-seo`, `node scripts/validate-bmw-hub.mjs`: rendered metadata/schema/internal-link/brand assertions. Some validators hardcode pre-sprint metadata and need distinguishing an outdated expectation from an actual regression.
- `node scripts/test-master-seo-browser.mjs <runtime-directory> <local-preview-url>` and `node scripts/test-sitewide-browser.mjs <runtime-directory> <local-preview-url>`: existing desktop/mobile/browser and no-JavaScript regression suites. They write dated output folders and do not cover all five hubs, so add focused checks for the five hubs without overwriting parallel evidence.
- Existing protection/PPF browser and enquiry tests are relevant regressions because shared templates/builds affect them; execute without changing PPF source.

## Release implications

No conversion blocker was found in the inspected source: each hub already exposes a meaningful contact path. Wording consistency, Volkswagen qualification and mobile consistency are justified local improvements. Release approval still depends on the final build, routing/schema checks and browser verification. Do not present click counts as enquiries or treat local test success as production authorization.

## Final local verification after sprint changes

The parent implemented scoped five-brand WhatsApp-draft explanations, qualified quotation/booking copy, a mobile WhatsApp/phone bar for all ten existing English/Arabic hubs, and left-to-right telephone-number isolation in the five Arabic hero/booking areas. Visual QA caught the initial mixed-direction Arabic telephone rendering; the final screenshots and explicit `bdi[dir="ltr"]` assertion verify that correction.

Final build source fingerprint supplied by the release owner: `20f8255baaea8e2604e05aff774ec05bb24256cc4b4b818f2d3d0d035409195a`. Focused browser verification used the preceding `ccfc2c87b0504e67e5d86d680ab1252a1dbcaa3d55307de15ccb22ba7d8553ee` build; the only later source change corrected a stale assertion in the existing master browser test, with application source unchanged.

- Focused browser suite: **PASS**, 30 hydrated route/viewport cases (all ten hubs at 1440px, 390px and 320px), 30 interaction cases and ten no-JavaScript pages. It verifies no horizontal overflow, hero contact links and safe analytics, localized visible mobile bars, FAQ mouse/keyboard interaction, invalid form handling, prepared WhatsApp drafts through a stub, optional personal fields, no private form values in analytics, crawlable body/FAQ answers and internal/contact links. There were zero runtime/hydration errors, failing local responses, real popups or attempted local writes. Full evidence: `browser/browser-results.json`; screenshots are listed there.
- Existing master browser suite: **PASS to completion** after correcting only its stale H1 assertion to the verified pre-existing Mercedes electrical wording. It completed 27 responsive checks, 17 interaction checks, seven SPA navigation checks and the prevented WhatsApp analytics/privacy check. There were zero runtime/hydration errors or failing local responses. Final JSON and all 29 referenced screenshots are preserved under `existing-master-browser/`, with the full `existing-browser.log`.
- The earlier master failure remains preserved as `existing-master-browser/regression-drift-before.json` and `existing-browser-before.log`. `/services/mercedes-electrical-repair-dubai` already rendered “Mercedes Electrical Repair & Fault Tracing in Dubai”; the old suite expected “Mercedes Electrical Fault Diagnosis & Repair in Dubai.” The original sprint baseline contains the actual wording at `baseline/server/entry-server.js:13070`. The release owner corrected the test expectation; no application copy was changed for that correction.
- The focused progress log printed zero per named viewport because a reporting-only layout key overwrote the text label with numeric width. The authoritative final JSON records all 30 successful cases and correct numeric widths; `browser-summary.json` gives ten successful cases per width. The reusable reporter key is corrected. No test assertion or pass/fail result was altered.

The first sandbox browser launch and an attempt to connect across Windows execution contexts failed before useful verification. Those environmental results remain in separate evidence files. The final successful focused run and the existing-suite run used a temporary production-aware preview plus browser children inside the same execution context on `127.0.0.1:5195`. The preview was stopped afterward. External requests and non-GET/HEAD requests were blocked, and real WhatsApp opening/sending was prevented. These results establish local behavior, not confirmed customer enquiries or production authorization.
