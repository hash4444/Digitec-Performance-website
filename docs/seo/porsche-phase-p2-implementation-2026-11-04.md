# Porsche SEO Phase P2 — local implementation report

Completed 4 November 2026. Implementation is local, uncommitted and undeployed. No indexing request or real customer enquiry was submitted.

## Baseline and preservation

- Existing branch retained: `codex/t2-tuning-seo`.
- HEAD retained: `085e64fe1e0e17c373b041ea6afeb579c36df89b`.
- The working tree already contained Mercedes, tuning, Range Rover, Defender and AI-discovery changes. The audit copied 420 relevant text files and recorded their SHA-256 values before implementation, without resetting, stashing or switching branches.
- Baseline: `outputs/porsche-p2-2026-11-04/baseline/manifest.json`; complete route/SEO/body snapshot: `baseline/rendered.json`.
- Public-route membership, route families and indexability remain unchanged: **1,256 application routes; 1,005 sitemap URLs; 101 Porsche pages comprising 81 English and 20 Arabic**.
- All 1,155 non-Porsche routes retain their metadata and content, with one explicit derived exception: the corrected Porsche checklist label appears in six neighbouring Arabic workshop lists and the Arabic sitemap. The sitemap's corresponding structured-data label updates too. No other content changes are accepted by the preservation test.
- GTM `GTM-T3GVSPND`, GA4 `G-4TRCEJSY4S`, analytics collection source, attribution helper, WhatsApp URL sanitization, `index.html`, `robots.txt` and `llms.txt` are byte-identical to the pre-P2 baseline.

## Page-by-page implementation

| Existing owner | Changes |
| --- | --- |
| `/brands/porsche-service-dubai` | Added distinct scheduled-maintenance and fault-investigation pathways. Narrowed the oil card to oil/filter work and linked full-maintenance planning to the existing guide. Added service-history and exact-warning fields to WhatsApp drafts. Retained the established English title, description and genuine workshop photos. |
| Hub `/transmission-repair` | Repair-led title/H1; separate due fluid work from fault diagnosis; gearbox/history identification, relevant PIWIS/physical investigation, itemised scope and verification. Fixed the inherited malformed symptom phrase through a Porsche-only symptom list. Added PDK/Tiptronic/symptom links and a qualified contextual enquiry CTA. |
| Hub `/battery-replacement` | Explicit 12V H1 and revised description. Added starting/discharge history, low-voltage testing, specification/registration confirmation and post-fitting checks. Distinguished repeated drain and charging faults from replacement and high-voltage work. Linked electrical, warning and Taycan 12V guidance. |
| Hub `/engine-diagnostics` | Traced composition: `getDiagnosticsAcBrandContent()` previously superseded Porsche-specific data. Added a final Porsche-only refinement after all generic overrides. Restored PIWIS 3 title and vehicle-specific scope, differentiated scans, testing, coding/programming and high-voltage work, and preserved the existing diagnostic enquiry panel and tracking. |
| Hub `/suspension-repair` | Revised title/H1/description and process; distinguished PASM damping, air suspension and PDCC, physical inspection, leak isolation and supported data. Added relevant system/problem/model links and a qualified enquiry CTA. |
| Hub `/brake-repair` | Retained strong existing metadata and technical introduction. Added fitted brake-package identification, measurements, possible vibration sources, parts justification and agreed verification. Linked PCCB, warning and model guidance. |
| `/blog/porsche-maintenance-guide-dubai` | Retained English title/description. Added an estimate checklist, full-service versus oil-only distinction, missing-history FAQ, contextual CTA placements and qualified drafts. Updated the actual modification date. |
| `/porsche/macan` | Preserved the existing petrol 95B scope, service-planning section and petrol/electric distinctions. Corrected full-maintenance links to the Porsche hub and improved model-specific enquiry drafts and the booking form. Existing technical content and metadata remain intact. |
| `/blog/porsche-911-service-dubai-guide` | Added direct navigation to the existing 997, 991 and 992 owners. Qualified model enquiry drafts and corrected scheduled-maintenance destination. No replacement parent URL was created. |
| Other existing Porsche model/service pages | Corrected model maintenance destinations; added safe model-chip links to existing owners; qualified service and model drafts. An unqualified “Cayman” chip is not mapped to the narrower 718 family. Arabic chips link only to published Arabic model owners. |
| Porsche AC child | Replaced inherited asserted dashboard wording and smell/water-to-cause assumptions with observed symptoms requiring investigation. No other brand's AC copy changes. |

All new contact prompts request Porsche model, model year, mileage, service/symptoms, exact warning and service history/recent work. Applicable children also request gearbox conditions, battery/discharge history, suspension corner/height behaviour, brake concerns or AC conditions. Existing form/anchor event names and placements remain; a draft/open is never emitted as a confirmed lead.

## Arabic consistency

- Added a Porsche-only Arabic hub override. Removed generic six-month guidance, OEM-original conflation and general same-day expectations; confirmed intervals, parts, timing, access and high-voltage scope per vehicle.
- Updated Arabic primary-service copy and qualified WhatsApp prompts, with corresponding diagnostic, suspension and brake detail.
- The Arabic maintenance URL previously rendered a generic workshop article. It now renders a dedicated Arabic maintenance guide at the same URL, with its existing publication date retained and the actual revision date recorded. The English/Arabic maintenance pair remains reciprocal and self-canonical.
- Repositioned `/ar/best-porsche-workshop-dubai` as an informational selection checklist with appropriate scope, parts and approval questions, plus links to actual commercial owners.
- Added a Porsche-only main landmark to the workshop checklist and replaced a remote stock photo on the Arabic Porsche hub with an existing local DIGI-TEC Porsche workshop image. Captions do not claim a documented repair outcome.

## Routing corrections

`cloudflare/porsche-p2-router.js` now runs in the actual `cloudflare/production-seo-router.js` entry, ahead of the existing Mercedes handler and response guard. The existing PPF/paint/tyre decisions remain intact.

| Historical source | Existing destination | Status |
| --- | --- | --- |
| `/services/transmission-services` | `/services/transmission-repair-dubai` | 308 |
| `/services/suspension-repair` | `/services/suspension-repair-dubai` | 308 |
| `/services/steering-repair` | `/services/steering-repair-dubai` | 308 |
| `/services/performance-tuning-dubai` | `/tuning` | 308 |

The four mappings already exist in `ServicePage.tsx`; P2 makes the same decisions at the active edge. Arabic counterparts retain Arabic destinations. Slash/case/duplicate-slash and http/www variants resolve in one hop while preserving query strings.

The 61 exact Arabic requests corresponding to English-only `/porsche/*` model, system, problem and ownership pages resolve to `/ar/brands/porsche-service-dubai` with 308. This is a navigation fallback, not an equivalent translation or hreflang relationship. The 20 published Arabic Porsche owners continue to return their content directly.

Existing Porsche canonical-path variants normalize to their existing canonical URL. Unknown Porsche-like paths are not broadly redirected. POST/PUT/PATCH/DELETE/OPTIONS, APIs, unrelated hosts and unrelated valid pages retain passthrough behavior. No new public route was added.

Production currently remains unchanged. The source-versus-live discrepancy from P1 requires deploying both the reviewed site and the existing edge-worker entry; local success does not establish a production fix.

## Metadata before and after

Full titles and descriptions for all 101 Porsche URLs, including unchanged fields, are in:

- `outputs/porsche-p2-2026-11-04/metadata-before-after.csv`
- `outputs/porsche-p2-2026-11-04/metadata-before-after.json`

Twelve pages have changed title or description fields. The English hub, brake, maintenance and Macan metadata is deliberately retained.

| English page | Before title | After title |
| --- | --- | --- |
| Transmission | Porsche Transmission Service & PDK Repair Dubai \| DIGI-TEC | Porsche Transmission Repair Dubai \| PDK & Tiptronic |
| Diagnostics | Porsche Diagnostics Dubai \| Fault Assessment \| DIGI-TEC | Porsche Diagnostics Dubai \| PIWIS 3 \| DIGI-TEC |
| Suspension | Porsche Suspension & PASM Repair Dubai \| DIGI-TEC | Porsche Suspension Repair Dubai \| PASM & Air Suspension |
| Battery | Porsche 12V Battery Replacement Dubai \| DIGI-TEC | Retained; description now explicitly identifies testing/replacement and vehicle-specific checks |

The diagnostic title uses business confirmation received during P2: **“PIWIS 3 is currently in use; functions are confirmed for each vehicle.”** This is a business-supplied fact, not proof of manufacturer authorization or unrestricted access.

## Validation results

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed both application and Node TypeScript configurations. |
| `npm run build` | Passed the complete existing production pipeline, including SSR, client build, prerender, hosting/routing, SEO, PPF/paint, query ownership, attribution/privacy, oil, suspension, transmission, social metadata, AI discovery and Mercedes evidence checks. Full log: `outputs/porsche-p2-2026-11-04/production-build.log`. |
| Targeted ESLint | Passed all eight checked new/changed Porsche and booking source files. |
| `node scripts/validate-porsche-p2.mjs` | Passed: 101 Porsche pages, 202 parseable JSON-LD blocks, 20 real language pairs, 1,516 internal links, 93 qualified primary-service WhatsApp anchors, unchanged membership and non-Porsche preservation. |
| Porsche edge tests | Passed 3,514 redirect/normalization cases and 552 canonical/mutation/endpoint/scope safety checks. |
| Bundled edge artifact | Bundled locally with installed esbuild; Porsche tests and the existing production-router regression suite passed against the bundle. |
| `node scripts/test-porsche-p2-browser.mjs` | Passed 56 cases at 390px and 1440px across 21 Porsche paths and seven non-Porsche sentinels; no overflow, broken images, local error responses or runtime errors. |
| Browser contact behavior | Passed 21 WhatsApp anchor checks and three draft-form checks. Exactly one expected direct contact event and dataLayer click per tested action; message text excluded; no confirmed-lead event. |
| Language and SPA behavior | Four language-switch checks and one single-event SPA navigation check passed. |
| JavaScript disabled | Five key pages retained server-rendered content and WhatsApp contact paths. |
| Visual inspection | Reviewed mobile hub, mobile Macan, desktop diagnostics and mobile Arabic maintenance screenshots. 32 full-page/viewport captures retained in the browser artifact folder. |

Browser QA blocked all external network requests and contact navigation. It captured WhatsApp drafts in memory and sent no messages or production analytics requests. GA4 property/container settings and real enquiry receipt remain outside this local check.

Initial failures were corrected before completion:

1. Existing oil/suspension checks expected September Porsche modification dates. Updated only the Porsche expectations to match the actual P2 changes; generic and other-brand expectations remain intact.
2. The preservation harness compared JSON-omitted `undefined` keys and generated React IDs. Normalized only serialization and generated IDs; the explicit Porsche related-link label update is the only content exception.
3. Browser QA identified the missing Porsche checklist main landmark and remote Arabic-hub image. Both were fixed and the full build/browser tests rerun.
4. Browser harness corrections used the actual Mercedes diagnostic URL and opened the language menu before selecting its link. The first attempt is retained in `browser-results-attempt1.json`; final `browser-results.json` passes.
5. The initial sandbox could not reach the localhost preview; the completed browser run used approved localhost access with external requests blocked.

Existing non-fatal build warnings remain: the homepage React `fetchPriority` warning, the existing NotFound import/chunk warning, third-party PURE-comment annotations and large bundle notices. They did not fail the production build or browser runtime checks. No unrelated source was changed to suppress them.

## Exact changed files

Authored additions:

1. `cloudflare/porsche-p2-router.js`
2. `scripts/validate-porsche-p2.mjs`
3. `scripts/test-porsche-p2-browser.mjs`
4. `src/components/PorscheMaintenanceArabic.tsx`
5. `src/components/PorscheServiceDetails.tsx`
6. `src/data/porscheEnquiry.ts`
7. `src/data/porscheP2Content.ts`
8. `docs/seo/porsche-phase-p2-implementation-2026-11-04.md`

Existing files changed by P2, preserving their pre-existing work:

1. `cloudflare/production-seo-router.js`
2. `scripts/validate-oil-change.mjs`
3. `scripts/validate-query-release.mjs`
4. `scripts/validate-suspension.mjs`
5. `src/components/BrandBookingForm.tsx`
6. `src/components/PorscheHubSections.tsx`
7. `src/data/porscheHubContent.ts`
8. `src/data/porscheModelPages.ts`
9. `src/i18n/ar-best-workshop.ts`
10. `src/i18n/ar-brands.ts`
11. `src/lib/route-manifest.ts`
12. `src/pages/BestWorkshopPage.tsx`
13. `src/pages/BlogArticleRouter.tsx`
14. `src/pages/BrandPage.tsx`
15. `src/pages/BrandServicePage.tsx`
16. `src/pages/PorscheGuidesIndex.tsx`
17. `src/pages/PorscheModelPage.tsx`

Generated tracked artifacts changed by the production pipeline:

1. `cloudflare/routing-response-data.js`
2. `docs/seo/protection-release-validation.json`
3. `docs/seo/query-release-validation.json`
4. `docs/seo/route-schema-matrix.csv`
5. `public/sitemap.xml` — existing membership preserved; actual Porsche modification dates updated.

This is **30 source, documentation and generated paths** relative to the saved pre-P2 state. `dist/`, `dist-server/`, normal existing validation outputs and the P2 evidence folder are build/review artifacts, not new public routes. A machine-readable file/hash inventory is in `outputs/porsche-p2-2026-11-04/changed-files.json`.

## Remaining evidence requirements

- Current PIWIS 3 use is business-confirmed. A permission-cleared tool/vehicle photo and redacted scan plus directed-test example would provide publishable workshop evidence; none was fabricated.
- Obtain genuine Porsche job sheets, model/year/system details, findings, approved work and post-repair verification before publishing case studies or outcome claims.
- Confirm any specific coding/programming/security function, PCCB procedure and high-voltage acceptance individually. No blanket certification, authorization, guarantee or universal capability was added.
- No prices, reviews or customer identities were invented.
- Obtain query × page GSC data to investigate suspected generic/Porsche competition. Current aggregates do not prove harmful cannibalization.
- Inspect actual GA4/GTM key-event settings and workshop received-enquiry/booking records before treating contact opens as business leads.

## Production deployment instructions — after approval

1. Review the P2-specific changes against the saved baseline and preserve the other uncommitted work. This is a combined working-tree build; do not publish the entire dirty checkout as though it were an isolated Porsche-only release. Use the existing reviewed release/integration workflow.
2. From the approved source revision, run `npm run typecheck` and `npm run build`. Retain the P2 baseline evidence when rerunning the preservation validator; it intentionally compares against the pre-P2 snapshot. Run the Porsche validator and local browser test against the final approved build.
3. Publish the resulting `dist/` through the existing origin-host release workflow, or let that workflow rebuild the approved source. Preserve the existing analytics configuration and both language versions.
4. The zone-front Worker must also contain the reviewed `cloudflare/production-seo-router.js` entry and its new Porsche import. The existing configuration is `cloudflare/wrangler.production-seo.jsonc`. Using the approved Wrangler environment/version, first review a local bundle with `npx wrangler deploy --dry-run --config cloudflare/wrangler.production-seo.jsonc --outdir outputs/porsche-p2-2026-11-04/deploy-preview`. Only after deployment approval, use the same command without `--dry-run` and `--outdir`. Do not replace the entry with the separately generated static worker or a standalone Porsche-only handler; the existing Mercedes/PPF/paint/tyre/404 behavior must remain composed.
5. Verify live GET and HEAD responses for all four historical mappings, their Arabic forms, representative Arabic Porsche fallbacks, mixed-case/slash hub variants and unchanged canonical pages. Check query-string preservation, absence of chains and the final destination's canonical.
6. Verify live EN/AR metadata, hreflang, JSON-LD, key mobile/desktop layouts and analytics in preview/debug mode. Avoid sending test customer messages. Confirm actual inquiry and booking handling through workshop records.
7. Retain a rollback to the prior reviewed origin artifact and complete Worker bundle. Do not roll back unrelated work from the current branch. Record the release date for later non-overlapping 28-day GSC/lead comparisons.

No commit, push, merge, deployment or indexing action has been performed by P2.
