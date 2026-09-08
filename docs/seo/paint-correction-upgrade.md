# Car Polishing & Paint Correction — implementation report

Date: 8 September 2026. Status: implemented and tested locally; not deployed, published or committed.

The implementation adds one combined commercial page with an assessment-first enquiry flow. It keeps polishing, correction, swirls and paint-enhancement intent together. Real correction project photography and approved starting prices were unavailable, so neither was fabricated. The other workstreams retain ownership of PPF, Ceramic Coating and their shared changes.

## 1. Existing URLs discovered

The repository audit found these relevant routes and content sources:

| Existing route | Existing role and finding |
| --- | --- |
| `/services/paint-protection-dubai` | Broad paint-care hub covering correction, coating and film. Current title: “Car Paint Care Dubai \| Correction & Protection \| DIGI-TEC”; H1: “Paint Correction & Protection Options in Dubai”. Its description already distinguishes care options. |
| `/services/paint-protection-film` | Dedicated PPF service, owned by the concurrent PPF workstream. |
| `/services/ceramic-coating` | Dedicated ceramic service, owned by the concurrent Ceramic workstream. |
| `/services/car-body-repair-dubai` | Bodywork, refinishing and deeper damage; a different intent from surface correction. |
| `/blog/why-ceramic-coating-matters-uae` | Informational article with paint-correction preparation references. Its broad package/timing statements were not treated as verified correction packages. |
| `/blog/ceramic-coating-vs-ppf-dubai` | Informational comparison including paint condition before protection. |
| `/paint-protection`, `/car-paint-protection` | Existing legacy aliases of the broad paint-care hub; no new correction redirects were required. |

No dedicated canonical polishing page, dedicated correction page or standalone detailing service page was found. Detailing category labels and scattered paint-care references do not establish a separate commercial landing page. Existing service templates already provided the site header/footer, contact patterns and shared SEO/schema utilities.

This was a repository and locally rendered architecture audit. Search Console query ownership, live indexation and ranking data were not available.

## 2. Search intent and cannibalization

Polishing and paint correction substantially overlap: polishing is a technique used within correction. Separate new pages would currently split one commercial enquiry journey without supporting search evidence. Scratch depth, swirls, haze, dullness, water spots, cost and aftercare are addressed within the same page.

The broad paint-care hub still mentions correction in its H1 and copy. Keep it as a comparison/navigation hub and add a clear contextual link to this specialist page when its owner integrates inbound links. Do not redirect or canonicalize that broader page to the new page. PPF and Ceramic retain their own protection intent and canonicals. Body repair retains deeper-damage intent.

## 3. Architecture decision

One English commercial page: **Car Polishing & Paint Correction Dubai**. The page has a dedicated lazy-loaded component, scoped styling, an exact application route and a route-manifest entry. It follows the existing `/services/` architecture.

No additional swirl, scratch, price or correction URL was created. No Arabic equivalent is advertised. The language switch routes to the existing Arabic services hub until a real translation exists.

## 4. Selected canonical

`https://digitecme.com/services/car-polishing-dubai`

This is the intended production canonical embedded in local output, not a claim that the new page is live. Sitemap last modification is `2026-09-08` for this route only.

## 5. New page versus existing upgrade

A new dedicated page was necessary because the existing paint-care hub serves several different services and is shared with the concurrent workstreams. Preserving that hub avoids replacing or narrowing another team's work. The new page provides the depth and conversion flow missing from the current architecture.

## 6. Files changed by this workstream

New implementation files:

- [PaintCorrectionPage.tsx](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/pages/PaintCorrectionPage.tsx) — page, metadata, schema and outbound links.
- [paintCorrectionContent.ts](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/data/paintCorrectionContent.ts) — copy, FAQs, service objectives, pricing fields and verified-project data model.
- [PaintAssessmentForm.tsx](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/components/PaintAssessmentForm.tsx) — vehicle details and WhatsApp draft.
- [PaintCorrectionProjects.tsx](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/components/PaintCorrectionProjects.tsx) — conditional real-project comparisons.
- [paint-correction.css](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/styles/paint-correction.css) — page-scoped responsive presentation, including light theme and reduced motion.
- Four WebP derivatives in [public/images/paint-correction](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/public/images/paint-correction): `porsche-workshop-640.webp`, `porsche-workshop-1200.webp`, `workshop-floor-540.webp`, `workshop-floor-960.webp`.

Minimal additions to existing files:

- [App.tsx](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/App.tsx) — one lazy import and one exact route before the generic service route.
- [route-manifest.ts](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/lib/route-manifest.ts) — one English-only service entry and its own last-modified date.
- [locale.ts](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/src/i18n/locale.ts) — fallback to `/ar/services` for this route only.

New verification and handoff files:

- [build-paint-correction-local.mjs](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/scripts/build-paint-correction-local.mjs).
- [validate-paint-correction.mjs](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/scripts/validate-paint-correction.mjs).
- [test-paint-correction-browser.mjs](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/scripts/test-paint-correction-browser.mjs).
- This report.

Ignored local evidence is in [paint-correction-qa.local](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/paint-correction-qa.local), including source baselines, isolated build snapshots, screenshots and browser results. Other modified/untracked files in `git status` belong to the existing concurrent work and are not claimed as this implementation.

## 7. Exact title tag

`Car Polishing & Paint Correction Dubai | DIGI-TEC`

## 8. Exact meta description

`Professional car polishing and paint correction in Dubai. Assess swirl marks, light scratches and dull paint on your premium car. Get a DIGI-TEC quote.`

## 9. Exact H1

`Car Polishing & Paint Correction Dubai`

One H1 appears in the server-rendered and hydrated page.

## 10. Full page structure

1. Breadcrumbs, premium hero, real Porsche workshop image, assessment CTA and WhatsApp CTA.
2. Three navigation shortcuts: understand marks, compare approaches, plan an assessment.
3. What Is Car Polishing?
4. What Is Paint Correction?
5. Paint Problems We Can Assess: seven rows covering swirls, surface scratches, haze/gloss, water spots, oxidation/dullness, previous polishing and contamination.
6. Can Car Scratches Be Polished Out? Depth distinctions, body-repair link and photo enquiry.
7. Swirl Mark Removal in Dubai: appearance, causes, correction limits and washing care.
8. Car Polishing vs Paint Correction: seven-row comparison table.
9. Professional Paint Assessment: paint history, safe limits and special finishes.
10. Four-step process: discuss/inspect, agree preparation/scope, perform agreed work, review/protect. No unverified machine or fixed stage package is specified.
11. Conditional Recent Paint Correction & Polishing Work section, currently omitted because verified jobs are unavailable.
12. Pricing section with separate polishing and correction objectives.
13. Finish-care sequence, ceramic-after-correction and preparation-before-PPF explanations.
14. Why DIGI-TEC, with a second genuine workshop photograph.
15. Luxury/performance vehicles and nine existing brand links.
16. Paint assessment form and photo-led WhatsApp alternative.
17. Sixteen concise FAQs using accessible native disclosure controls.
18. Al Quoz contact information, phone, WhatsApp, workshop-area map and related service links.
19. Existing site footer and a mobile photo/call contact bar.

## 11. Primary keyword

**Car polishing Dubai**, supported by the title, H1, commercial content, metadata and service entity.

## 12. Secondary keyword targets

Paint correction Dubai is the second major target. Supporting intent includes car polish, professional car polishing, car paint correction, machine polishing, paint restoration, scratch improvement, swirl mark removal, paint enhancement, pricing and nearby assessment. Copy uses natural phrases rather than mechanically repeating every exact-match variation.

## 13. Before/after functionality

A reusable comparison component supports real before/after photographs, vehicle, initial condition, service performed and result. It displays the pair side by side on larger screens and stacked on mobile, with captions, image dimensions and lazy loading.

Only records explicitly marked verified with provenance render. The current list is empty, so no gallery or placeholder case study appears. The populated gallery's visual QA must be performed when genuine assets are added; this task verified that the absent-data state remains absent. No slider, synthetic defect imagery or invented transformation was added.

## 14. Real assets used

| Source photograph | New responsive derivatives | Bytes |
| --- | --- | --- |
| `src/assets/porsche-gt3rs-workshop-dubai.jpg` | Porsche workshop, 640 px / 1200 px | 60,194 / 165,082 |
| `src/assets/digitec-workshop-service-floor.jpg` | Workshop floor, 540 px / 960 px | 48,596 / 133,194 |

Original images were preserved. The derivatives are WebP at quality 86. Images and captions identify workshop context, never a correction result. No correction-specific close-ups, matched pairs, service reviews or documented project videos were verified in the available material.

## 15. Internal links added

The page body contains 17 verified internal route links: Home, Services twice, body repair, Ceramic Coating, PPF, About, the paint-care hub and nine brands. The brand destinations cover Mercedes-Benz, BMW, Porsche, Ferrari, Lamborghini, McLaren, Aston Martin, Rolls-Royce and Range Rover using the existing brand data.

In-page anchors connect the hero, navigation and pricing to the assessment and explanatory sections. Existing header/footer contact access is retained; a local contact section provides phone and WhatsApp directly. No nonexistent detailing or contact route was invented. Inbound links are recommendations in section 27.

## 16. Structured data

The new page uses the existing schema utilities for `WebPage`, `Service`, `BreadcrumbList` and nested `ImageObject` data. The service refers to the established `https://digitecme.com/#business` provider entity; it does not create another business identity. Canonical URLs, images, description and modification date match the visible page.

No page-specific rating, review, price, offer or `VideoObject` was created. FAQs remain visible HTML without new `FAQPage` markup. Google's June 2026 update removed the FAQ rich-result search feature; no FAQ rich-result eligibility is claimed. See [Google Search documentation updates](https://developers.google.com/search/updates).

## 17. Local SEO

The page consistently uses DIGI-TEC Performance Center, Al Quoz Industrial Area 3, Dubai, UAE and `+971 4 340 2223`, matching existing site contact information. Dubai sunlight and local paint-care concerns appear where helpful. The map is accurately labelled as the workshop area, matching the existing area-level map destination.

No exact street/unit, unverified opening hours or invented neighborhood page was added. Visitors are prompted to confirm hours and appointment availability. Existing site-wide business schema and shared contact details were preserved.

## 18. GEO / AI search usefulness

Direct definitions explain the relationship between polishing and correction. The comparison table, defect descriptions, scratch-depth answer, four-step process and sixteen FAQs provide concise extractable explanations while retaining a customer-first tone.

Answers distinguish surface deposits from etching, gloss enhancement from missing/failed paint, and correction from later protection. Business location and service relationships are explicit. No AI-specific promises, fabricated examples or claims of AI-search visibility are made.

General technical limits were checked against primary manufacturer references: [3M machine polish](https://www.3m.com/3M/en_US/p/d/b40065595/) and [3M scratch-removal guidance](https://multimedia.3m.com/mws/media/643074O/3m-introduces-the-scratch-removal-system-press-release.pdf). These inform the explanation; the page does not claim DIGI-TEC uses those products.

## 19. Conversion improvements

The primary hero CTA leads to a short assessment form. Visitors enter brand, model, year and one of six concerns, then continue to a WhatsApp draft where they can review the message and attach photos. There is no automatic message send or website photo upload.

Required fields, whitespace checks, sensible year bounds, length limits and duplicate-submit protection improve enquiry quality. The page also provides direct photo CTAs at the scratch explanation, form and mobile bar. Phone links give an alternative. No personal name, telephone number or registration is requested in the form.

No-JavaScript visitors receive the complete content and styling, usable FAQs, and direct WhatsApp/call alternatives. The interactive form needs JavaScript.

## 20. Pricing implementation

Both service panels currently display **“Price based on vehicle & paint condition”**. The section explains vehicle size, condition, defect severity, previous work, preparation, correction scope and optional protection.

The content model accepts `fromAed` and `priceSource`. A positive finite amount displays only when a nonempty source record is also present. Once DIGI-TEC approves real starting prices and inclusions, they can be added without redesigning the panels. This source field is an editorial safeguard, not automatic proof of approval. No fake number, discount, fixed stage package or price offer schema is present.

## 21. Analytics impact

Shared analytics files were not edited. Direct WhatsApp anchors use the existing delegated tracker, emitting one `whatsapp_click` plus the existing `whatsapp_chat_opened` event per click. The form emits `quote_started` once per mount, then one existing `whatsapp_click` and one page-specific `whatsapp_draft_opened` event when proceeding.

The form uses a button-based navigation, so it does not also trigger the anchor event. Event payloads contain static page/service/form/placement values and the sanitized contact URL. Entered vehicle details and the encoded WhatsApp message are excluded from analytics. Invalid submissions produce no contact event.

Tests checked all five page-specific WhatsApp anchors, a phone link, validation and the form draft. External requests were blocked; no test enquiry was sent and no production analytics endpoint received test events. Opening a WhatsApp draft is an intent signal, not proof of a sent message or qualified lead. No new GA4 key-event configuration was performed.

## 22. Technical SEO and performance

- The canonical route occurs once in the manifest and isolated sitemap; it is indexable and prerenders substantive content without JavaScript.
- Exact title, description, canonical and H1 passed the focused validator. All sixteen FAQ answers are in initial HTML.
- Breadcrumbs and page/service JSON-LD parse and reference the existing business identity.
- No nonexistent Arabic hreflang is emitted. The language switch uses the existing Arabic services hub.
- Every body route and anchor resolves in the generated route set. Image files, alt text and dimensions are checked.
- The hero uses responsive WebP, explicit dimensions and high fetch priority; the workshop image is responsive, asynchronously decoded and lazy loaded. No video or comparison-slider library is loaded.
- Scoped CSS is present in initial HTML. A discovered HTML-escaping/hydration mismatch was corrected and covered by an exact stylesheet assertion; the final browser run had zero runtime errors.
- Desktop 1440 px and mobile 390/320 px passed overflow checks. Dark/light views, FAQ keyboard operation and no-JavaScript presentation were checked.
- Local desktop sample: LCP **304 ms**, observed CLS **0**. Local mobile sample at 390 px, 4× CPU slowdown, 150 ms latency and 1.6 Mbps download: LCP **3,568 ms**, observed CLS **0**.

These are single-run browser observations against a local static preview with external resources blocked, not field Core Web Vitals or a production performance pass. The throttled mobile LCP needs follow-up against the actual compressed/CDN-served release; INP and real-user performance were not established. Shared bundles were left outside this workstream's scope.

The shared working-tree sitemap, generated Cloudflare route guard and SEO CSV outputs were intentionally not rewritten. The isolated production build generated and validated their correct versions. A coordinated release build must regenerate these artifacts from the combined source before any separately authorized deployment.

## 23. Build, lint and prerender results

The full declared production build ran in an isolated source snapshot, avoiding replacement of another workstream's `dist`, sitemap, edge rules or reports.

| Check | Result |
| --- | --- |
| Vite production and SSR build | Passed |
| Prerender | 1,438 real React routes |
| Existing SEO validator | Passed, 1,158 sitemap URLs |
| Hosting-rule generation and tests | Passed; 263 permanent redirects |
| Existing PPF validator in the declared build | Passed |
| Focused paint-correction validator | Passed; metadata, SSR, schema, links, images and claim guards |
| Relevant ESLint with zero-warning limit | Passed |
| TypeScript app configuration, no emit | Passed |
| Playwright / headless Edge browser checks | Passed |

Existing nonfatal build warnings concern `fetchPriority` in the shared BrandPage render and an unused `toast` import in shared Sonner code. Neither was changed by this workstream.

Build evidence: [production snapshot](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/paint-correction-qa.local/build-1788864156961). Browser evidence: [results JSON](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/paint-correction-qa.local/browser-results.json), [desktop](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/paint-correction-qa.local/desktop.png), [mobile](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/paint-correction-qa.local/mobile-390.png), [light-theme form](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/paint-correction-qa.local/light-form.png), [without JavaScript](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/paint-correction-qa.local/no-javascript.png).

Reproduction from the workspace root:

```powershell
node scripts/build-paint-correction-local.mjs
$paintBuildPath = Get-Content -LiteralPath 'paint-correction-qa.local/latest-build.txt'
node scripts/validate-paint-correction.mjs $paintBuildPath
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json
node node_modules/eslint/bin/eslint.js src/pages/PaintCorrectionPage.tsx src/components/PaintAssessmentForm.tsx src/components/PaintCorrectionProjects.tsx src/data/paintCorrectionContent.ts src/App.tsx src/lib/route-manifest.ts src/i18n/locale.ts scripts/build-paint-correction-local.mjs scripts/validate-paint-correction.mjs scripts/test-paint-correction-browser.mjs --max-warnings 0
```

The browser script accepts the directory containing the bundled Node runtime's package metadata and a separately running local production-preview URL. It deliberately blocks external requests and must not be used as evidence of a real sent enquiry.

## 24. Unsupported claims excluded

No new correction percentages, universal scratch removal, Dubai ranking, completed-car totals, experience-year claim, authorization, certification, warranty, fixed turnaround, product brand, specific inspection equipment, fixed one/two/three-stage package, price, review or rating was introduced in the new service content. Existing generic/shared site text was preserved.

The page explains that abrasive work removes material, deep damage may require repair, and matte/satin finishes require a different approach. No promise is made that coating or film repairs underlying scratches or makes the car scratch-proof.

## 25. Missing DIGI-TEC information and assets

The highest-value additions are matched, permission-cleared before/after photographs of real correction jobs, including close-ups under comparable lighting. Each needs the actual vehicle, initial condition, performed service, outcome and a supporting job record. A real short inspection/result video could follow.

Also needed: approved starting prices with inclusions/exclusions; confirmed process and equipment details before adding specific claims; defensible turnaround guidance; genuine service-relevant customer reviews with source records; and any more precise approved address/hours information. No Search Console or lead-quality data was supplied for a future URL split.

## 26. Future supporting pages

Consider separate paint-correction, swirl-removal, scratch-removal or polishing-price pages only if Search Console and conversion evidence establish a distinct need. Keep these subjects on the combined hub for now. No extra supporting URL was created.

Future project pages should document real jobs and link both to this service and the relevant brand page. The current project model can supply verified source material; it does not automatically create project URLs.

## 27. Recommended inbound links

| Source for a later coordinated edit | Suggested placement / natural anchor |
| --- | --- |
| `/services` | A dedicated polishing/correction entry within body and visual work. |
| `/services/paint-protection-dubai` | Correction overview: “explore polishing and paint correction”. |
| `/services/ceramic-coating` | Preparation section: “paint correction before coating”; Ceramic owner to integrate. |
| `/services/paint-protection-film` | Paint-condition/preparation section: “assess the paint before protection”; PPF owner to integrate. |
| `/services/car-body-repair-dubai` | Distinguish shallow surface marks from refinishing: “polishing for suitable light marks”. |
| Existing nine brand workshop pages | A relevant appearance-care paragraph using “paint assessment” or “restore paint clarity”. |
| The two existing coating/PPF articles | Contextual links from correction/preparation passages. |
| Future genuine correction case studies | Link the performed service to this canonical page. |

These editorial inbound links have not been added. XML discovery is prepared in the route manifest, but the page still needs coordinated navigation/context links to avoid relying on sitemap discovery alone. No separate HTML-sitemap component was edited.

## 28. Concurrent-work boundaries

The starting Git state and baseline copies of the three necessary shared files were inspected. Final comparison shows the route-manifest and locale additions listed above; App.tsx also contains the other workstream's Ceramic changes, which were retained.

This task did not edit PPF page/content/style/form files, Ceramic page/content/style files, service data, shared analytics, shared WhatsApp tracking, BrandPage, ServicePage, Vite configuration, the declared package build, shared prerender scripts or other generated root SEO artifacts. No repository reset, checkout, discard, broad formatting, staging, commit, deployment or publishing occurred. Changes made by other active workstreams were not restored to old baseline hashes.

The isolated build compiles the complete source graph as required by the production checks; it does not overwrite the other workstreams' source or production artifacts.

## 29. Recommended next step

Review the local page and obtain two or three genuine, documented correction projects plus approved pricing. Populate and visually verify the real comparison section, then coordinate the inbound links with the PPF/Ceramic owners. Run the combined release build and production-like mobile performance checks before requesting any separate deployment authorization.

After an authorized launch, inspect indexation and query ownership in Search Console and distinguish enquiry clicks from confirmed WhatsApp leads. Use that evidence to refine content and decide whether any supporting page deserves its own URL. Rankings and lead volume are not guaranteed by this implementation.
