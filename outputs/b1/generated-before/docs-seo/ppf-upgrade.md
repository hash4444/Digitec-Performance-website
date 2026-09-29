# DIGI-TEC PPF upgrade

Local implementation, 8 September 2026. Nothing was published, deployed or sent to a customer. The supplied pasted brief defines the scope. The Excel workbook was read as supporting priority context and was not edited; its broader brand, GBP, backlink and content-cluster actions were not treated as additional instructions.

## 1. Existing canonical and search-intent ownership

The existing, self-canonical PPF service page is **https://digitecme.com/services/paint-protection-film**. It has been upgraded in place, with a dedicated layout on the same route. No new public URL was created.

The initial alias inspection led to the broader paint-care hub; full inspection then found the dedicated film page. Final ownership is:

| Existing URL | Role after the change |
| --- | --- |
| `/services/paint-protection-film` | Main commercial PPF Dubai landing page |
| `/services/paint-protection-dubai` | Paint correction and protection-options hub; no longer assigned the PPF primary keyword |
| `/services/ceramic-coating` | Separate ceramic coating service |
| `/blog/ceramic-coating-vs-ppf-dubai` | Existing informational comparison |
| `/ppf`, `/services/ppf` | Direct redirects to the dedicated film page; generated Arabic equivalents retain Arabic |

The paint-care hub and comparison article remain indexable because they serve distinct needs. Existing Arabic content and reciprocal language alternates remain available. The English PPF page is the target of this content upgrade; a full Arabic content rewrite was not added.

## 2. Files changed

Paths below are relative to the project root.

| File | Change |
| --- | --- |
| `src/pages/PpfPage.tsx` | Dedicated layout on the existing PPF URL, content, service graph and contextual section navigation |
| `src/styles/ppf.css` | Scoped responsive layout, existing dark/light theme support, accessible controls and mobile contact bar |
| `src/data/ppfContent.ts` | Metadata, coverage explanations, brand selection and 14 factual FAQs |
| `src/components/PpfQuoteForm.tsx` | Four-field vehicle quote form using the existing WhatsApp booking/tracking approach |
| `src/App.tsx` | Dedicated component for the existing English route; correct the two English PPF aliases |
| `src/data/services.ts` | Shared PPF metadata and narrower paint-care hub positioning |
| `src/pages/ServicePage.tsx` | Contextual PPF links from the paint-care hub and ceramic coating page |
| `src/pages/BrandPage.tsx` | Contextual inbound links on nine relevant English brand hubs |
| `src/lib/whatsapp-tracking.ts` | Export the existing query-stripping WhatsApp URL sanitizer |
| `src/components/Analytics.tsx` | Use that sanitizer for the existing GA4 WhatsApp event too |
| `src/lib/route-manifest.ts` | Last-modified dates for the 14 affected English pages |
| `vite.config.ts` | Emit the client manifest so prerendering can discover the PPF stylesheet |
| `scripts/prerender.mjs` | Include PPF CSS in its initial HTML without waiting for the lazy JavaScript module |
| `package.json` | Add the focused PPF validator to the production build and expose `validate:ppf` |
| `scripts/validate-ppf.mjs` | Metadata, initial content/CSS, IDs, schema, links, image and redirect checks |
| `scripts/test-ppf-browser.mjs` | Local desktop/mobile, form, CTA, analytics and JavaScript-disabled browser checks |
| `scripts/optimize-ppf-images.mjs` | Reproducible responsive WebP conversion of existing images |
| `public/images/ppf/film-application-640.webp` | 54,804-byte mobile film image |
| `public/images/ppf/film-application-1200.webp` | 170,214-byte larger film image |
| `public/images/ppf/workshop-540.webp` | 46,620-byte mobile workshop image |
| `public/images/ppf/workshop-960.webp` | 122,198-byte larger workshop image |
| `public/sitemap.xml` | Generated last-modified updates; canonical URL count unchanged |
| `cloudflare/digitec-seo-router.js` | Generated PPF redirect targets, ready for a future approved deployment |
| `docs/seo/permanent-redirects.csv` | Generated redirect inventory |
| `docs/seo/route-schema-matrix.csv` | Generated schema and metadata inventory reflecting the affected content |
| `docs/seo/ppf-upgrade.md` | This handover |

The existing untracked video-production brief and two video/logo images were left untouched. Dependencies and lockfiles were preserved. Ignored build directories and `ppf-qa.local` contain local verification output. Separate ceramic-coating and paint-correction work appeared in the shared checkout during QA, including edits to shared files. Those changes were preserved and are not claimed as PPF work in the table above. Validation results describe the local build snapshot tested, not subsequent changes from other tasks.

## 3. SEO changes

- One existing URL owns commercial PPF intent, with a unique title, description and H1.
- Narrowed the overlapping hub's title, description, H1 and service keyword to paint care and service selection.
- Added direct answers, Dubai driving context, coverage decisions, cost factors, a comparison table and local workshop details.
- Retained the existing canonical, indexability, service route, global entity graph, sitemap entry and Arabic alternate.
- Corrected PPF aliases without redirecting or deleting either existing content page.
- Added contextual inbound links and section navigation instead of new doorway pages.

## 4. New page structure

1. Photographic hero, service/location, WhatsApp quote and call actions.
2. Verified workshop/service facts and section navigation.
3. What paint protection film is and its limitations.
4. Full-body, front and selected-area coverage cards.
5. Substantial full-body PPF explanation and quote action.
6. Dubai highway, dust, sand, sun and maintenance context.
7. Clear, matte and satin finish explanations, with availability explicitly subject to confirmation.
8. Four installation stages grounded in the existing assessment/quotation/installation/finish descriptions.
9. Actual workshop photograph, defensible reasons to consider DIGI-TEC and links to business/location information.
10. PPF cost factors and an exact-quote action.
11. PPF versus ceramic coating table and related service/guide links.
12. Luxury/performance vehicle context and nine existing brand hubs.
13. Four-field WhatsApp quote request.
14. Fourteen native, accessible FAQ disclosures; answers are present in initial HTML.
15. Al Quoz contact information, directions-area link and mobile WhatsApp/call bar.

## 5. Keyword targeting

Primary: **PPF Dubai**.

Secondary intent covered naturally: paint protection film Dubai, car PPF, PPF installation Dubai, car paint protection, full-body/full-car PPF Dubai, PPF price/cost Dubai, clear/matte/satin PPF, self-healing PPF, PPF for cars and PPF near me. Finish-related copy explains the choices without claiming unverified DIGI-TEC stock. No meta-keywords tag or repetitive exact-match paragraphs were added.

## 6. Implemented metadata

- **Title:** `PPF Dubai | Paint Protection Film for Cars | DIGI-TEC`
- **Description:** `PPF installation in Dubai for luxury and performance cars. Explore full-body and selected-panel paint protection film at DIGI-TEC. Get your car’s quote.`
- **H1:** `Paint Protection Film (PPF) Dubai`
- **Canonical:** `https://digitecme.com/services/paint-protection-film`
- **Robots:** `index, follow, max-image-preview:large`
- Open Graph/Twitter use the existing film-application image, with accurate alt text and dimensions.

## 7. Internal links

New contextual inbound links come from the paint-care hub, ceramic coating page and nine brand hubs: Mercedes-Benz, BMW, Porsche, Ferrari, Lamborghini, McLaren, Aston Martin, Rolls-Royce and Range Rover. Existing homepage/service-directory links are retained. The validator confirms all **13 inbound source pages**.

The PPF page links to the ceramic coating service, existing paint-care/correction hub, comparison article, nine brand hubs, About page, services directory and its contact section. At the initial audit there was no standalone polishing/detailing service page to link to, so the existing hub was used. Separate paint-correction work subsequently appeared in the checkout and was left to that task. All **53 internal link occurrences**, including shared navigation, have valid destinations; fragment destinations are checked as well.

## 8. Structured data

Uses the existing connected graph helpers for one page-scoped `WebPage`, `Service` and `BreadcrumbList`, with `ImageObject` data. The service references the existing business ID, `https://digitecme.com/#business`. Existing global `Organization`, automotive business and `WebSite` entities are preserved rather than duplicated.

No ratings, reviews, prices, unsupported offers, film specifications or video schema were added. FAQ answers remain visible and crawlable without new `FAQPage` markup: Google confirmed removal of the FAQ rich-result feature in its [June 2026 documentation updates](https://developers.google.com/search/updates#june-2026). Structured data is valid JSON; rich-result appearance and rankings are not guaranteed.

## 9. Conversion improvements

- Immediate WhatsApp and call actions, plus five PPF WhatsApp anchor placements across the page/mobile bar.
- Quote prompts at full-body coverage, cost and local contact sections.
- Coverage cards link to the quote interaction.
- Brand, model, year and requested coverage are the only form fields.
- Full Front is a request subject to workshop confirmation; existing verified coverage includes partial-front.
- Valid submissions open an editable WhatsApp draft. A draft-open event does not prove a message was sent, received or qualified.
- Required/trimmed brand/model values and a valid year are checked. No new API, database or lead-storage system is introduced.
- No name or telephone field is collected. The form is disabled before hydration/without JavaScript, preventing a fallback GET submission from placing entered values in a site URL. Direct WhatsApp/call links and FAQ disclosures still work without JavaScript.

## 10. Analytics impact

| Action | Existing/new event behavior |
| --- | --- |
| PPF WhatsApp anchor | Existing `whatsapp_click` dataLayer event once and existing `whatsapp_chat_opened` GA4 event once |
| Call | Existing `telephone_link_clicked` event |
| First quote field change | New `quote_started` GA4 event once per form mount |
| Valid quote submission | Existing `whatsapp_click` once and existing `whatsapp_draft_opened` once; no delegated anchor duplicate |
| Landing sessions/page views | Existing GA4/GTM configuration retained |

Form analytics contain only fixed service/form/placement identifiers and page pathname. Brand, model, year, coverage selection and WhatsApp message text are not included in custom events. Entered vehicle data is encoded only in the intended WhatsApp draft destination and is not stored locally or added to the site's URL.

The existing dataLayer sanitizer already removed WhatsApp query strings. The parallel GA4 anchor handler did not; it now uses the same sanitizer. GTM container IDs, GA property configuration, attribution handling and the existing privacy approach were not changed. Existing WhatsApp event names represent two established measurement paths; they are not emitted twice within either path.

Browser tests block all external requests and inspect client event payloads/counts. Actual GTM container configuration, GA4 receipt, enhanced-measurement settings and production attribution were not authenticated or changed. Confirm those in Tag Assistant/GA4 after a separately authorized release.

## 11. Technical SEO and performance

- All critical content, comparison rows, FAQs and schema appear in prerendered HTML.
- Page-specific CSS is linked in initial HTML from the Vite manifest, avoiding an unstyled layout while JavaScript loads.
- Unique title/description, single H1, self-canonical, indexable robots, sitemap inclusion and stable business IDs checked.
- PPF alias redirects are direct 301s in generated hosting rules; both languages keep their respective content destinations.
- No new public pages, thin clusters or duplicated global business schema.
- Responsive WebP images have explicit dimensions and truthful alt text. Hero has high fetch priority; below-fold workshop image is lazy-loaded.
- Full-size page imagery totals about 292 KB, versus about 648 KB for the two source JPEGs. Smaller responsive variants total about 101 KB. Actual transfers depend on viewport and device pixel ratio.
- No additional dependency or animation library. The page component remains lazy-loaded.
- Keyboard labels, unique IDs, native FAQ interaction, reduced-motion support, light-theme readability and mobile safe-area spacing included.
- Existing robots policy remains unchanged. This is local technical validation, not field Core Web Vitals measurement or a Search Console indexing inspection.

## 12. Build and test results

- Production client build and SSR build passed.
- Prerendered **1,437 routes**; sitemap retains **1,157 canonical URLs**.
- Existing hosting-rule suite passed with **263 generated permanent redirects**.
- Existing all-route SEO validator passed.
- Focused PPF validator passed for metadata, canonical, initial CSS/content, IDs, schema, image attributes, sitemap, redirects and internal/inbound links.
- TypeScript application check passed.
- ESLint for changed TS/TSX files passed with no errors. The shared `BrandPage.tsx` retains one existing `react-hooks/exhaustive-deps` warning concerning the `brand` value.
- Existing build notices about dependency annotations, large shared chunks and React 18 `fetchPriority` handling remain non-blocking.
- Desktop/mobile browser tests cover 1440px, 390px and 320px widths, both themes, loaded images, FAQ interaction, quote validation, all PPF WhatsApp anchors, call tracking, event counts, privacy and contextual navigation from ceramic coating.
- Final production browser checks passed with **zero runtime/hydration errors**. They served the built HTML at its canonical path locally and also passed with JavaScript disabled: layout CSS, all 14 FAQs, native FAQ interaction and disabled form fallback were verified. Vite preview's directory-URL fallback was not mistaken for production routing.
- Local screenshots and event evidence are stored in the ignored `ppf-qa.local` directory.

The environment's pnpm launcher attempted dependency reconciliation and stopped. Installed dependencies were preserved, and the exact production script's steps were run directly with the existing Node/Vite executables. Windows permission escalation allowed Vite to read its existing configuration. No packages were installed or upgraded.

## 13. Unsupported facts intentionally omitted

No invented prices, warranties/durations, film brands, thicknesses, lifespan claims, certification, authorization, technician credentials, review scores/counts, customer counts, fixed turnaround, confirmed matte/satin availability or named completed PPF projects. No absolute scratch/sand/stone-chip protection promises.

The existing film-application photo is used descriptively; the repository does not establish a specific DIGI-TEC job, coverage or result for it. The real workshop photograph is not represented as a PPF before-and-after case. No sourced PPF-specific customer reviews were available to add accurately.

## 14. Assets and content still needed

1. Approved PPF job records and photographs showing vehicle/model, actual film, coverage, installation detail and final result; matched before/after images where meaningful.
2. The actual film range, finish availability, product data, care instructions and written warranty terms.
3. Confirmed package/panel definitions, especially full-front coverage, with any genuine prices or quoting rules.
4. Confirmed installation process and vehicle-specific expected timing.
5. Attributable PPF/detailing reviews that can be reused accurately.
6. Verified current opening hours and exact customer-entrance map pin. The existing area-level map link is preserved without pretending it is a verified entrance pin.

## 15. Recommended next step

Review this local page with DIGI-TEC and supply the proof/product details above, starting with a real PPF case study and finish samples. Integrate verified material before a separately approved deployment. After release, inspect the canonical in Search Console and validate GTM/GA4 event delivery. Compare PPF landing traffic, quote starts, draft opens and actual qualified WhatsApp enquiries against the baseline. No ranking position is promised.

Keep future full-body, price, finish and brand-specific PPF pages deferred until each has distinct intent and enough original evidence to justify a separate URL. The initial audit found the short `/ceramic-coating` alias leading to the broader paint-care hub; the separate ceramic-coating work is now updating that alias and its dedicated page.
