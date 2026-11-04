# DIGITEC Phase T3 — local implementation and validation

Commit-readiness note: the proposed T3-only candidate is now prepared on `codex/t3-model-tuning-seo` in a separate worktree, based on committed T2 revision `085e64fe1e0e17c373b041ea6afeb579c36df89b`. The original shared checkout remains on `codex/t2-tuning-seo`. The proposed manifest contains ten product/test/sitemap files and these seven report/fixture files; generated response data, raw QA outputs, screenshots and evidence manifests are excluded. Fresh isolated validation evidence is retained in the original workspace at `outputs/t3/git-readiness/`. No files are staged or committed. The preservation fixture retains original raw hashes and adds immutable-base SHA-256 values normalized only for CRLF/LF checkout representation.

Completed 4 November 2026 (Asia/Dubai). All nine existing model tuning pages now provide model-specific ECU/remap content, distinct editorial structure, an interactive stage comparison and a tracked vehicle/stage-specific WhatsApp draft. Work remains local and uncommitted. Nothing was pushed, merged, deployed or changed in production, Search Console or Supabase.

## Search targeting and scope

G63 tune/tuning Dubai queries are assigned to `/tuning/mercedes-amg-g63`; Lamborghini Urus and colloquial Lambo tune Dubai intent is assigned to `/tuning/lamborghini-urus` within the verified V8 Urus scope. The other seven owners follow the same model-specific mapping. The published brand spelling is Lamborghini; no misspelling or hidden keyword list was added. Tuning, ECU tuning, ECU remapping/remap, supported stage terms, performance upgrades, relevant engine codes and control-unit work appear naturally in titles, headings, copy, FAQs and contextual links. Generic ECU/chip/performance tuning remains owned by `/tuning`.

[Keyword targeting matrix](keyword-matrix.csv) provides primary terms, natural aliases, ECU/stage intents, technical limits and evidence status for every owner. [Search evidence](search-evidence.md) distinguishes the historical hub-filtered export from the newer 18–24 October 2026 sitewide extract. The newer extract includes relevant E63, C63, G63 and Urus queries but has no query-to-page join and no observed exact requested misspelling. Additional aliases are provisional, without invented volumes or ranking promises.

Keywords were placed in useful visible content. Google documents that it does not use the meta keywords tag and recommends descriptive titles and helpful content: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Local implementation cannot demonstrate future organic rankings or enquiries.

## Repository and preservation

- Repository: https://github.com/hash4444/Digitec-Performance-website.git; branch `codex/t2-tuning-seo`; HEAD remains `085e64fe1e0e17c373b041ea6afeb579c36df89b`.
- Architecture: React 18 / TypeScript / Vite / React Router, with real React prerendering. The [investigation](investigation.md) was recorded before implementation.
- The main English and Arabic tuning hub source, functional configurator, package dataset, publication policy, Arabic package translations, language fallback and conversion/attribution implementation remain byte-for-byte unchanged against the baseline fingerprints.
- All nine URL paths and their self-canonicals remain unchanged. The only sitemap content change is the nine model last-modified dates, now 2026-11-04. Exact route and sitemap URL sets are preserved.
- No dependencies or animation libraries were added. Page styles load in initial HTML; full package tables, included work, FAQs and native WhatsApp links remain available without JavaScript.

## Nine page architectures

| Owner | Concept | Main section sequence |
| --- | --- | --- |
| /tuning/mercedes-amg-gt | Sports-Car Performance | platform → engineering → selector → packages → guide |
| /tuning/mercedes-amg-e63 | Performance Engineering | platform → engineering → selector → guide → packages |
| /tuning/mercedes-amg-g63 | Power & Capability | selector → platform → engineering → packages → guide |
| /tuning/mercedes-amg-gt63 | Digital Performance Dashboard | selector → engineering → platform → packages → guide |
| /tuning/mercedes-amg-s65 | V12 Luxury Engineering | engineering → platform → selector → guide → packages |
| /tuning/mercedes-amg-c63 | Stage Comparison & Upgrade Guide | platform → selector → guide → engineering → packages |
| /tuning/mercedes-amg-glc63 | Performance Upgrade Advisor | guide → platform → selector → engineering → packages |
| /tuning/aston-martin-db11 | Grand Touring Performance | engineering → platform → guide → selector → packages |
| /tuning/lamborghini-urus | Super-SUV Performance | platform → selector → engineering → packages → guide |

`platform` covers generation/engine fit; `selector` compares stock and tuned reference output; `engineering` explains model hardware and control units; `guide` supports upgrade decisions; `packages` preserves the full specification and pricing tables. Shared hero, local navigation, model FAQ, GAD assessment and consultation sections complete each page. [Architecture detail](architectures.md) records the engineering emphasis.

Design differences include G63 capability panels; C63 comparison/checklist rows; E63 numbered engineering panels; GT paired variant cards and selector; GT63 monospace dashboard readouts; S65 refined V12 typography; GLC63 advisor cards; DB11 grand-touring editorial typography; Urus uppercase super-SUV and turbo/intercooler progression. Existing vehicle cutouts are reused. No generated vehicle/workshop imagery, testimonials or dyno charts were introduced.

## Final metadata

| URL | SEO title | Meta description |
| --- | --- | --- |
| /tuning/mercedes-amg-gt | Mercedes AMG GT Tuning Dubai \| ECU Remap \| DIGI-TEC | Compare AMG GT, GTS, GTC and GTR ECU tuning in Dubai. Explore separate M178 Stage 1–5 packages, stock vs tuned output, hardware and published EUR prices. |
| /tuning/mercedes-amg-e63 | Mercedes AMG E63 Tuning Dubai \| W213 ECU Remap \| DIGI-TEC | Explore W213 Mercedes-AMG E63 ECU remapping in Dubai. Compare Stage 1–4 outputs, CPC and TCU scope, turbo hardware, EUR prices and custom VIP work. |
| /tuning/mercedes-amg-g63 | Mercedes G63 Tuning Dubai \| ECU Remap & Stages \| DIGI-TEC | Plan a Mercedes G63 tune in Dubai. Compare M177 ECU remapping, Stage 1–4 power, exhaust upgrades, CPC/TCU scope and published EUR package prices. |
| /tuning/mercedes-amg-gt63 | Mercedes AMG GT63 Tuning Dubai \| 4-Door ECU Remap \| DIGI-TEC | Compare X290 AMG GT63 four-door ECU tuning in Dubai: Stage 1–4 power and torque, CPC/TCU work, turbo packages, EUR prices and custom VIP enquiries. |
| /tuning/mercedes-amg-s65 | Mercedes S65 AMG Tuning Dubai \| M279 V12 Remap \| DIGI-TEC | Explore Mercedes S65 AMG V12 ECU tuning in Dubai. Compare M279 Stage 1–5 torque, PCM/TCU work, cooling and NAG2 packages with published EUR totals. |
| /tuning/mercedes-amg-c63 | Mercedes C63 Tuning Dubai \| W205 ECU Remap & Stages \| DIGI-TEC | Compare W205 C63 ECU tuning in Dubai: Stage 1, Stage 2 and higher M177 packages, supporting hardware, MCT work, stock vs tuned output and EUR prices. |
| /tuning/mercedes-amg-glc63 | Mercedes GLC63 Tuning Dubai \| M177 ECU Remap \| DIGI-TEC | Choose GLC63 M177 ECU tuning in Dubai with generation and gearbox checks. Compare Stage 1–5 output, hardware, transmission options and EUR prices. |
| /tuning/aston-martin-db11 | Aston Martin DB11 Tuning Dubai \| V8 ECU Remap \| DIGI-TEC | Plan Aston Martin DB11 V8 ECU tuning in Dubai. Compare the supported M177 Stage 1–5 packages, torque, turbo hardware, EUR prices and transmission scope. |
| /tuning/lamborghini-urus | Lamborghini Urus Tuning Dubai \| ECU Remap \| DIGI-TEC | Explore Lamborghini Urus ECU tuning in Dubai. Compare V8 Stage 1–4 power, remap scope, turbo and intercooler upgrades with published EUR package prices. |

[Metadata CSV](metadata.csv) also includes all nine final H1s. Every page has one H1 and logical H2/H3 sections. WebPage, Service, BreadcrumbList and FAQ markup use the same page definitions as visible content. No ratings, fabricated reviews or numeric price offers were added to schema.

## Technical information preserved and clarified

- All 16 source vehicle records and 67 source tuned packages remain unchanged. The existing hub continues to publish 62 packages; the nine model owners retain all 52 scoped packages, with exact source HP, Nm, EUR prices, time estimates and permitted included-work lists.
- GT/GTS and GTC/GTR remain separate M178 records. E63 W213, G63 source-identified W463 and GT63 X290 remain separate M177 packages. C63 is the W205 reference, not a blanket W204/W206/C63 S offer. GLC63 keeps its source platform identifier and seven/nine-speed price qualifications.
- S65 remains the M279 W222/W217 record with no VIP. DB11 remains the M177 V8 record, with all three unverified inherited reinforcement descriptions suppressed. Urus remains the V8 twin-turbo record, Stage 1–4 only, with no claimed TCU package, Stage 5, VIP or inferred support for other Urus/Lamborghini powertrains.
- New visible specification cautions document the inherited Stage 4 torque/reinforcement discrepancies: E63/G63/GT63 list 1,200 Nm engine torque against an approximately 1,150 Nm reinforcement description; S65 lists 1,300 Nm against approximately 1,250 Nm. No value was silently corrected. Written vehicle-specific confirmation is required.
- S65 previously referenced an S63 image. Its hero now uses a clean M279/V12 identity panel and generic tuning social image. Verified S65 photography remains an asset requirement.
- Generated power curves and unverified acceleration figures were not added. No performance or reliability guarantee was introduced. Published EUR references are not converted to AED or represented as a current final quotation.

## Internal links and conversion

- The existing `/tuning` hub already links to all nine model owners, so its content was not edited. Each model retains a parent-hub link, a matching hub package anchor, its brand service hub and selected related model/guide links. Model-relevant diagnostics links support vehicle assessment without changing service ownership. No identical nine-model link block was added to every page.
- Hero, planning and final CTAs contain model-specific prefilled drafts. The stage CTA also includes the selected variant and stage. The existing configured destination is unchanged: `https://wa.me/97143402223`.
- CTA placement attributes reuse the existing delegated `whatsapp_click` and `whatsapp_chat_opened` tracking and first-touch attribution. Tests intercepted contact clicks without opening WhatsApp or sending an enquiry; message content remains excluded from analytics.

## Arabic localization

The nine model URLs were English-only before this phase; no Arabic model equivalents exist in the current routing architecture. The existing `/ar/tuning` content, metadata, RTL package comparisons and reciprocal hub hreflang are preserved. Model language switching continues to the Arabic hub; model pages emit truthful English/x-default alternates without an invented Arabic counterpart. No new visible Arabic model copy or URLs were published. Full Arabic model translations and reciprocal hreflang require a separately approved URL expansion under the brief’s new-URL control.

## Validation results

| Check | Result | Evidence |
| --- | --- | --- |
| Declared production build | Passed all existing build/routing/SEO/service/attribution validators | `build.log` |
| TypeScript application and node checks | Passed | `typecheck.log` |
| Repository lint | Passed, 0 errors / 106 warnings elsewhere in the checkout | `lint.log` |
| Changed code and QA scripts lint | Passed without warnings | `focused-lint.log` |
| Focused model static validation | 9 models, 52 exact packages, 78 local route/fragment targets, metadata/schema/canonicals/indexability | `qa/model-validation.json` |
| Original tuning regression | 16 records, 67 source / 62 public packages, publication safeguards and bilingual hub agreement | `qa/tuning-validation.json` |
| Model browser tests | 18 desktop/mobile cases, 104 stage/variant selections, 18 keyboard checks, 9 no-JS pages, 9 analytics checks, model-to-Arabic-hub switch | `qa/browser/model-browser-results.json` |
| Existing bilingual hub browser regression | 6 viewport/language cases, 136 selections, 2 no-JS cases, 16 anchors, 4 analytics checks, 2 language switches | `qa/hub-browser/browser-results.json` |
| Tablet/light-dark supplement | 18 model/theme cases at 768px; no overflow or readout overlap | `qa/tablet-themes/tablet-theme-results.json` |
| Visual review | Representative G63/GT63/DB11 desktop/mobile and S65/GT63 light screenshots inspected | `qa/browser/`, `qa/tablet-themes/` |
| Key text/button palette contrast | 5.81:1–9.85:1 for checked pairs; not a full accessibility certification | `qa/palette-contrast.json` |

No application runtime/hydration errors or failed local asset/page responses were recorded. Browser QA blocked external requests and writes. The sandbox initially blocked loopback startup; the final tests passed with local browser access enabled. The initial Urus browser assertion used rendered uppercase text; the corrected test checks semantic H1 text, with exact source H1 also independently checked in static HTML.

Build warnings remain for the existing large shared client chunk, a shared static/dynamic NotFound import and React 18 fetchPriority usage elsewhere. The new model hero follows the existing lowercase fetchpriority convention. No field Core Web Vitals claim is made; production field measurements require a later approved release.

| Coverage | Before | After |
| --- | ---: | ---: |
| Public routes | 1256 | 1256 |
| Canonical sitemap URLs | 1005 | 1005 |
| Model owners | 9 | 9 |
| Published scoped model packages | 52 | 52 |

## Exact T3 file scope

- `src/App.tsx`
- `src/pages/TuningModelPage.tsx`
- `src/components/TuningModelStageSelector.tsx`
- `src/data/tuningModelPages.ts`
- `src/data/tuningModelEditorial.ts`
- `src/styles/tuning-models.css`
- `src/lib/route-manifest.ts`
- `public/sitemap.xml`
- `cloudflare/routing-response-data.js`
- `scripts/validate-tuning-models.mjs`
- `scripts/test-tuning-models-browser.mjs`
- `outputs/t3/**`: investigation/baseline, metadata, keyword mapping, source/evidence manifests, validation logs, generated report copies and screenshots. `artifact-manifest.json` lists individual artifact paths.

`cloudflare/routing-response-data.js` is regenerated local SEO response metadata from the required build; no Cloudflare account or infrastructure was contacted or modified. Regenerated shared validation reports were saved under `qa/generated-build-reports/` and their originally clean shared files restored. No unrelated service source was changed by this work.

Other concurrent work became visible during execution in Supabase MCP, blog/Arabic article files and R1 audit files. Those edits and the pre-existing untracked `outputs/t2/` were left intact and are excluded from T3’s file manifest. Build and browser evidence describes the T3 build artifact; it does not certify independent concurrent edits. HEAD is unchanged and T3 has no commit.

## Outstanding items and Search Console measurement

1. Resolve the documented drivetrain-rating differences with the technical package owner before treating those high-stage specifications as confirmed installation proposals. Keep the DB11 suppression and GLC63 compatibility qualifications.
2. Supply verified/licensed S65 photography when available. Full Arabic model pages require approved URLs and reviewed translations; existing Arabic coverage remains intact.
3. After a separately authorized release, verify each canonical URL in Search Console URL Inspection and confirm the intended model page is indexed. No Search Console action was performed in this task.
4. Request a query-by-page export filtered to the nine model URLs. Group correct-spelling/model aliases, Lambo/Lamborghini variants, ECU/remap terms and supported stage searches separately. Review the requested misspelling only as observed query evidence, not a reason to insert misspellings into content.
5. Compare equal 28-day periods and review at 28, 56 and 84 days after release. Track impressions, clicks, CTR, average position, actual landing URL, device, language/UAE context and qualified WhatsApp enquiries. Use the existing events and page path attribution; do not send VINs or draft text to analytics.
6. If the hub or an informational article appears for a model query, inspect the query-page pair and intent before changing ownership, links or snippets. Retain generic tuning ownership at `/tuning`. Check field Core Web Vitals after sufficient production traffic.

No organic ranking, traffic increase or conversion improvement is claimed from this local implementation.
