# Mercedes SEO implementation report — 8 September 2026

**Prepared and tested locally; production publication is blocked. No ranking improvement is claimed.**

The release accounts for all **353 queries and 31 briefs**: 29 briefs changed in the prepared release, the shared PPF brief retained as already satisfied, and the audio-upgrade page blocked by unconfirmed service capability. Original Search Console query, click, impression, CTR and position values match the original workbook exactly.

## Publication status and exact remaining actions

- GitHub repository reads succeeded, but creating the source tree returned HTTP 403: “Resource not accessible by integration.” No GitHub source update succeeded.
- The matching Lovable project is `b8255283-fdd9-4c2d-8b46-ccb596f695e1` (`dubai-performance-art`). File import was rejected because the connection lacks `projects:write`. No Lovable content update or deployment was submitted.
- Re-authorize Lovable with `projects:write` (the connector reports that it must be removed and added again; reconnecting retains old scopes), import the exact reviewed patch, verify file hashes/build, and publish the existing project. Alternatively, provide an authorized GitHub source-write connection and use its normal sync route.
- Cloudflare is logged out in the available browser. Sign in to the account managing `digitecme.com`, then activate the prepared **Mercedes-only** Worker or exact Bulk Redirect rule. This is separate from content publication.
- Public `_redirects` and `_worker.js` are served as assets by Lovable and do not themselves execute. Do not activate the older global Worker as part of this scoped release.

Latest public check: `2026-09-08T14:54:51.242615+00:00`. Permanent redirect tests passing: **0/16**. See [production-final.json](production-final.json) for each GET/HEAD result, Location, title and canonical. Unchanged pages matching existing checks are not evidence of release publication.

## Prepared release and validation

- Branch: `codex/mercedes-seo-2026-09-08`; local commit: `622176a65a48cd1e680fa2b289d79ac7cd905f65`.
- Full production pipeline: **9 steps passed**; 1,438 rendered routes and 1,154 sitemap URLs. Source fingerprint: `8a0fd23cd6100b4852a521595bd7dfc0fd30e95aeea29f50f77ad2cc95472700`.
- Routing: **792 alias cases**, 67 canonical slash variants, direct destinations, preserved repeated UTMs/click IDs, GET/HEAD, concrete Arabic fallbacks, and unrelated/mutation passthrough passed.
- TypeScript and whitespace/diff checks passed. The existing SEO, PPF, paint-correction and protection-release checks passed without being disabled.
- The language check now requires an indexable counterpart: a retained noindex template does not count as a translated page. Four old Arabic model templates are noindex, excluded from the sitemap and omitted from alternate-language declarations.
- Focused generated-HTML review: **37 pages** checked, including every existing brief target and supporting Arabic/tuning changes. Titles/descriptions are unique among these pages; every page has one H1, correct canonical/indexing, valid internal links/assets and parseable schema.
- FAQ questions were checked in initial HTML. Service FAQs use the same data as their schema; representative browser expansion confirmed the visible answer. Tuning FAQs are now visibly rendered in both languages.
- Browser checks covered desktop 1440×1000 and mobile 390×844: hub, oil/diagnostics service and C-Class model layouts; no horizontal overflow; hub-to-service and maintenance-anchor navigation; FAQ expansion; Arabic RTL and reciprocal hub links; phone/WhatsApp targets. No test enquiry or call was sent.
- A built-preview alias check confirmed that UTMs, gclid, msclkid and fbclid survive browser fallback. The homepage-fallback hydration mismatch discovered during that check was corrected separately in `src/main.tsx` and rechecked.

## Files to review

- [Page change register — every brief](page-change-register.csv)
- [All 353 query assignments with original measurements](query-coverage.csv)
- [Generated HTML verification](generated-html-verification.json)
- [Production checks](production-final.json)
- [Build results](build-results.json)
- [Exact reviewed source patch](Mercedes-reviewed-release.patch)
- [Expected source file hashes](source-file-hashes.json)
- [Browser verification record](browser-verification.json)
- [Publication attempt record](publication-attempts.json)
- [Every prepared Mercedes alias and permanent destination](../../docs/seo/mercedes-permanent-redirects.csv)
- [Production deployment instructions](../../docs/seo/mercedes-release-deployment.md)

The original plan workbook remains unchanged. Its page assignments are recommendations, not evidence of the page currently ranked by Google. Fresh joint query/page and indexing data is still required for that conclusion.

## All 31 briefs

| Brief | Target URL | Queries | Disposition |
|---|---|---:|---|
| HUB | https://digitecme.com/brands/mercedes-benz-service-dubai | 192 | Changed in prepared release |
| ENGINE | https://digitecme.com/services/mercedes-mechanical-repair-dubai | 3 | Changed in prepared release |
| SUSP | https://digitecme.com/services/mercedes-suspension-repair-dubai | 2 | Changed in prepared release |
| TRANS | https://digitecme.com/services/mercedes-transmission-repair-dubai | 8 | Changed in prepared release |
| OIL | https://digitecme.com/services/mercedes-oil-change-dubai | 13 | Changed in prepared release |
| DIAG | https://digitecme.com/services/mercedes-diagnostics-dubai | 17 | Changed in prepared release |
| AC | https://digitecme.com/services/mercedes-ac-repair-dubai | 11 | Changed in prepared release |
| BATTERY | https://digitecme.com/services/mercedes-battery-replacement-dubai | 6 | Changed in prepared release |
| BRAKES | https://digitecme.com/services/mercedes-brake-repair-dubai | 5 | Changed in prepared release |
| BODY | https://digitecme.com/services/mercedes-body-repair-dubai | 13 | Changed in prepared release |
| ELEC | https://digitecme.com/services/mercedes-electrical-repair-dubai | 6 | Changed in prepared release |
| STEER | https://digitecme.com/services/mercedes-steering-repair-dubai | 1 | Changed in prepared release |
| EXHAUST | https://digitecme.com/services/mercedes-exhaust-repair-dubai | 1 | Changed in prepared release |
| TUNE | https://digitecme.com/tuning | 28 | Changed in prepared release |
| AUDIO | https://digitecme.com/services/mercedes-audio-upgrade-dubai | 3 | Blocked |
| G63 | https://digitecme.com/blog/mercedes-g63-service-dubai-guide | 1 | Changed in prepared release |
| GCLASS | https://digitecme.com/mercedes/models/g-class-service-repair-dubai | 2 | Changed in prepared release |
| C63 | https://digitecme.com/mercedes/models/c63-service-repair-dubai | 2 | Changed in prepared release |
| CCLASS | https://digitecme.com/blog/mercedes-c-class-service-dubai-guide | 6 | Changed in prepared release |
| E63 | https://digitecme.com/mercedes/models/e63-service-repair-dubai | 1 | Changed in prepared release |
| ECLASS | https://digitecme.com/blog/mercedes-e-class-service-dubai-guide | 8 | Changed in prepared release |
| SCLASS | https://digitecme.com/blog/mercedes-s-class-service-dubai-guide | 4 | Changed in prepared release |
| S63 | https://digitecme.com/mercedes/models/s63-service-repair-dubai | 2 | Changed in prepared release |
| GLE | https://digitecme.com/mercedes/models/gle-service-repair-dubai | 6 | Changed in prepared release |
| GLS | https://digitecme.com/mercedes/models/gls-service-repair-dubai | 3 | Changed in prepared release |
| MAYBACH | https://digitecme.com/brands/maybach-service-dubai | 1 | Changed in prepared release |
| COST | https://digitecme.com/blog/mercedes-service-cost-dubai-guide | 1 | Changed in prepared release |
| INTERVAL | https://digitecme.com/blog/mercedes-service-intervals-dubai-heat | 4 | Changed in prepared release |
| OWNERSHIP | https://digitecme.com/blog/mercedes-benz-maintenance-guide-dubai | 1 | Changed in prepared release |
| PPF | https://digitecme.com/services/paint-protection-film | 1 | Already satisfied |
| AR | https://digitecme.com/ar/brands/mercedes-benz-service-dubai | 1 | Changed in prepared release |

### HUB — https://digitecme.com/brands/mercedes-benz-service-dubai

**Query groups:** General repair and workshop; Mercedes inspection; Other Mercedes model service; Scheduled service and maintenance. **Disposition:** Changed in prepared release.

Kept the broad hub title/H1 and URL. Added bilingual minor/major and A/B scope comparison, exclusions, quote inputs and appointment information. The top maintenance card now reaches the comparison on this hub; AC has its own correctly targeted card. Fixed anchor scrolling and Arabic booking controls.

- Title before: Mercedes Repair & Service Dubai | Digi-Tec Specialists
- Title after: Mercedes Repair & Service Dubai | Digi-Tec Specialists
- H1 before: Mercedes-Benz Repair & Service Dubai
- H1 after: Mercedes-Benz Repair & Service Dubai
- Files: src/pages/BrandPage.tsx; src/components/MercedesMaintenanceScope.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: New repair case histories need original records and customer publication permission.

### ENGINE — https://digitecme.com/services/mercedes-mechanical-repair-dubai

**Query groups:** Engine repair. **Disposition:** Changed in prepared release.

Replaced generic mechanical copy with engine-first leaks, overheating, misfires, mounts, testing, repair/replacement assessment, quote components and post-work checks. Added the existing workshop engine photo with a limited factual caption and a direct gearbox link.

- Title before: Mercedes-Benz Mechanical Repair Dubai | Digi-Tec
- Title after: Mercedes Engine & Mechanical Repair Dubai | Digi-Tec
- H1 before: Mercedes-Benz Mechanical Repair Dubai
- H1 after: Mercedes Engine & Mechanical Repair in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: Existing engine photo reused; no documented diagnostic findings, repair scope and outcome record was supplied.

### SUSP — https://digitecme.com/services/mercedes-suspension-repair-dubai

**Query groups:** Suspension repair. **Disposition:** Changed in prepared release.

Added coil-versus-air identification, measured height/leak investigation, compressor/valve-block/sensor checks, estimate inclusions and verification. Retained the separate symptom guides.

- Title before: Mercedes-Benz Suspension Repair Dubai | Digi-Tec
- Title after: Mercedes Suspension & AIRMATIC Repair Dubai | Digi-Tec
- H1 before: Mercedes-Benz Suspension Repair Dubai
- H1 after: Mercedes Suspension & AIRMATIC Repair in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: A real before/after ride-height record is still needed.

### TRANS — https://digitecme.com/services/mercedes-transmission-repair-dubai

**Query groups:** Transmission and gearbox. **Disposition:** Changed in prepared release.

Separated scheduled fluid work from diagnosis, control/valve-body work, internal repair and replacement. Added exact gearbox identification, 7G/9G/AMG qualifications, quote components and post-work checks.

- Title before: Mercedes-Benz Transmission Repair Dubai | Digi-Tec
- Title after: Mercedes Transmission & Gearbox Repair Dubai | Digi-Tec
- H1 before: Mercedes-Benz Transmission Repair Dubai
- H1 after: Mercedes Transmission & Gearbox Repair in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: A documented repair and post-repair check record is still needed.

### OIL — https://digitecme.com/services/mercedes-oil-change-dubai

**Query groups:** Oil change. **Disposition:** Changed in prepared release.

Added VIN-based approval/quantity/filter selection, itemized scope, reset and record checks, due-item exclusions and links back to A/B booking on the hub.

- Title before: Mercedes-Benz Oil Change Dubai | Digi-Tec
- Title after: Mercedes Oil Change Dubai | Service & Filter | Digi-Tec
- H1 before: Mercedes-Benz Oil Change Dubai
- H1 after: Mercedes Oil Change in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: Genuine oil-service photographs were not supplied; no fabricated photo or priced example added.

### DIAG — https://digitecme.com/services/mercedes-diagnostics-dubai

**Query groups:** Diagnostics and coding. **Disposition:** Changed in prepared release.

Added distinct diagnostic scanning, supported coding and programming sections, VIN/module/access eligibility, reports and post-work checks. Linked hardware faults to electrical repair and performance requests to tuning.

- Title before: Mercedes-Benz Engine Diagnostics Dubai | Digi-Tec
- Title after: Mercedes Diagnostics & Coding Dubai | Digi-Tec
- H1 before: Mercedes-Benz Engine Diagnostics Dubai
- H1 after: Mercedes Diagnostics, Coding & Programming in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: Verified supported coding/programming job examples are still needed; eligibility remains conditional.

### AC — https://digitecme.com/services/mercedes-ac-repair-dubai

**Query groups:** AC repair. **Disposition:** Changed in prepared release.

Added uneven/weak cooling and airflow assessment, vehicle refrigerant identification, leak/recharge distinction, compressor/evaporator access scope and measured post-work checks.

- Title before: Mercedes-Benz AC Repair Dubai | Digi-Tec
- Title after: Mercedes AC Repair Dubai | Air Conditioning | Digi-Tec
- H1 before: Mercedes-Benz AC Repair Dubai
- H1 after: Mercedes AC & Air Conditioning Repair in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: A real diagnostic case with measured output results is still needed.

### BATTERY — https://digitecme.com/services/mercedes-battery-replacement-dubai

**Query groups:** Battery replacement. **Disposition:** Changed in prepared release.

Separated main, auxiliary, 48V and charging/drain concerns. Added specification selection, conditional adaptation and installation checks; identified the Al Quoz appointment location.

- Title before: Mercedes-Benz Battery Replacement Dubai | Digi-Tec
- Title after: Mercedes Battery Replacement Dubai | Digi-Tec
- H1 before: Mercedes-Benz Battery Replacement Dubai
- H1 after: Mercedes Battery Testing & Replacement in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No additional business-evidence dependency identified.

### BRAKES — https://digitecme.com/services/mercedes-brake-repair-dubai

**Query groups:** Brake service and repair. **Disposition:** Changed in prepared release.

Added measured pad/disc condition, sensors and hydraulic/fluid checks, AMG package identification, estimate inclusions and post-repair verification.

- Title before: Mercedes-Benz Brake Repair Dubai | Digi-Tec
- Title after: Mercedes Brake Repair & Service Dubai | Digi-Tec
- H1 before: Mercedes-Benz Brake Repair Dubai
- H1 after: Mercedes Brake Repair & Service in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: A real inspection/measurement record is still needed.

### BODY — https://digitecme.com/services/mercedes-body-repair-dubai

**Query groups:** Body repair. **Disposition:** Changed in prepared release.

Added panel/dent/bumper/paint inspection, hidden-damage and access scope, estimate exclusions and specialist-performer confirmation. Linked shared body repair, PPF and the separately identified G63 conversion project.

- Title before: Mercedes-Benz Body Repair Dubai | Digi-Tec
- Title after: Mercedes Body Repair & Body Shop Dubai | Digi-Tec
- H1 before: Mercedes-Benz Body Repair Dubai
- H1 after: Mercedes Body Repair & Paintwork in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: A genuine body-repair before/after record is still needed; the conversion is not presented as an accident repair.

### ELEC — https://digitecme.com/services/mercedes-electrical-repair-dubai

**Query groups:** Electrical and ECU faults. **Disposition:** Changed in prepared release.

Separated supply/grounds/wiring/network and SAM investigation from coding. Explained conditional ECU repair/replacement and compatibility, with links to diagnostics and battery/no-start guides.

- Title before: Mercedes-Benz Electrical Repair Dubai | Digi-Tec
- Title after: Mercedes Electrical & ECU Fault Repair Dubai | Digi-Tec
- H1 before: Mercedes-Benz Electrical Repair Dubai
- H1 after: Mercedes Electrical Fault Diagnosis & Repair in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: A real electrical diagnostic case is still needed.

### STEER — https://digitecme.com/services/mercedes-steering-repair-dubai

**Query groups:** Steering repair. **Disposition:** Changed in prepared release.

Added electric/hydraulic/rack identification, testing before replacement, parts scope and conditional alignment/calibration checks. Linked suspension assessment.

- Title before: Mercedes-Benz Steering Repair Dubai | Digi-Tec
- Title after: Mercedes Steering Repair Dubai | Digi-Tec
- H1 before: Mercedes-Benz Steering Repair Dubai
- H1 after: Mercedes Steering Repair in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: Model-specific repair evidence can be added when an actual job record is supplied.

### EXHAUST — https://digitecme.com/services/mercedes-exhaust-repair-dubai

**Query groups:** Exhaust repair. **Disposition:** Changed in prepared release.

Added leak/mount/noise/sensor diagnosis, compatible repair options and verification. Kept performance hardware enquiries on the tuning page.

- Title before: Mercedes-Benz Exhaust Repair Dubai | Digi-Tec
- Title after: Mercedes Exhaust Repair Dubai | Digi-Tec
- H1 before: Mercedes-Benz Exhaust Repair Dubai
- H1 after: Mercedes Exhaust Repair in Dubai
- Files: src/data/mercedesServiceContent.ts; src/data/brandServices.ts; src/pages/BrandServicePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: A real inspected repair record is still needed.

### TUNE — https://digitecme.com/tuning

**Query groups:** Performance tuning and GAD. **Disposition:** Changed in prepared release.

Preserved the title, H1 and configurator. Added Mercedes-AMG assessment, stage definitions, hardware/fuel dependencies, coding distinction and all four planned project/guide links. Rendered the existing EN/AR FAQs so FAQ schema matches visible content.

- Title before: Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec
- Title after: Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec
- H1 before: GAD Motors Performance Tuning
- H1 after: GAD Motors Performance Tuning
- Files: src/pages/Tuning.tsx; src/data/aiGuidePosts.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No additional business-evidence dependency identified.

### AUDIO — https://digitecme.com/services/mercedes-audio-upgrade-dubai

**Query groups:** Audio upgrades. **Disposition:** Blocked.

No page created. Existing audio fault-repair wording does not establish upgrade capability. All three assigned audio-upgrade queries remain in the coverage register pending service confirmation.

- Title before: Not checked
- Title after: Not created
- H1 before: Not recorded
- H1 after: Not created
- Files: None; proposed page withheld
- Validation: Verified absent; conditional query assignments retained
- Remaining evidence: Confirm the offered upgrade service, supported configurations, fitting scope and actual examples before creating this page.

### G63 — https://digitecme.com/blog/mercedes-g63-service-dubai-guide

**Query groups:** G63 model service. **Disposition:** Changed in prepared release.

Preserved the existing generation-specific content and documented conversion link. Added contextual engine, suspension, gearbox and other system links; scheduled maintenance now leads to the hub.

- Title before: Mercedes-AMG G63 Service & Repair Dubai | Digi-Tec
- Title after: Mercedes-AMG G63 Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes-AMG G63 Service & Repair Dubai
- H1 after: Mercedes-AMG G63 Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: Existing G63 conversion retained, but no new model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### GCLASS — https://digitecme.com/mercedes/models/g-class-service-repair-dubai

**Query groups:** G-Class model service. **Disposition:** Changed in prepared release.

Preserved the substantial petrol/diesel/4x4 and coil-spring content. Added direct G63 sibling navigation, system service links and the correct scheduled-maintenance destination.

- Title before: Mercedes G-Class Service & Repair Dubai | Digi-Tec
- Title after: Mercedes G-Class Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes G-Class Service & Repair Dubai
- H1 after: Mercedes G-Class Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### C63 — https://digitecme.com/mercedes/models/c63-service-repair-dubai

**Query groups:** C63 model service. **Disposition:** Changed in prepared release.

Preserved W204/W205/W206 and hybrid distinctions. Qualified coupe/cabriolet coverage by generation and added contextual system links and hub maintenance booking.

- Title before: Mercedes-AMG C63 Service & Repair Dubai | Digi-Tec
- Title after: Mercedes-AMG C63 Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes-AMG C63 Service & Repair Dubai
- H1 after: Mercedes-AMG C63 Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### CCLASS — https://digitecme.com/blog/mercedes-c-class-service-dubai-guide

**Query groups:** C-Class model service. **Disposition:** Changed in prepared release.

Corrected W205 optional AIRMATIC to cover both axles. Added qualified C200/C300 and C205/A205 family coverage. Added system links and corrected maintenance booking.

- Title before: Mercedes C-Class Service & Repair Dubai | Digi-Tec
- Title after: Mercedes C-Class Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes C-Class Service & Repair Dubai
- H1 after: Mercedes C-Class Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### E63 — https://digitecme.com/mercedes/models/e63-service-repair-dubai

**Query groups:** E63 model service. **Disposition:** Changed in prepared release.

Preserved the detailed W212/W213, AMG transmission and driveline content. Added system-level links and corrected scheduled-maintenance booking; no unsupported model rewrite.

- Title before: Mercedes-AMG E63 Service & Repair Dubai | Digi-Tec
- Title after: Mercedes-AMG E63 Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes-AMG E63 Service & Repair Dubai
- H1 after: Mercedes-AMG E63 Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### ECLASS — https://digitecme.com/blog/mercedes-e-class-service-dubai-guide

**Query groups:** E-Class model service. **Disposition:** Changed in prepared release.

Added generation-qualified E300/E350 and C207/A207/C238/A238 coupe/cabriolet coverage, avoiding a W214 coupe claim. Added engine and other system links and corrected maintenance booking.

- Title before: Mercedes E-Class Service & Repair Dubai | Digi-Tec
- Title after: Mercedes E-Class Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes E-Class Service & Repair Dubai
- H1 after: Mercedes E-Class Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### SCLASS — https://digitecme.com/blog/mercedes-s-class-service-dubai-guide

**Query groups:** S-Class model service. **Disposition:** Changed in prepared release.

Added qualified C217/A217 and S65 V12 enquiries, direct Maybach/S63 navigation and contextual engine/gearbox/system links.

- Title before: Mercedes S-Class Service & Repair Dubai | Digi-Tec
- Title after: Mercedes S-Class Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes S-Class Service & Repair Dubai
- H1 after: Mercedes S-Class Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### S63 — https://digitecme.com/mercedes/models/s63-service-repair-dubai

**Query groups:** S63 model service. **Disposition:** Changed in prepared release.

Added C217/A217 coupe/cabriolet identification, separated S65 V12 enquiries and linked S-Class/Maybach and relevant system services.

- Title before: Mercedes-AMG S63 Service & Repair Dubai | Digi-Tec
- Title after: Mercedes-AMG S63 Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes-AMG S63 Service & Repair Dubai
- H1 after: Mercedes-AMG S63 Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### GLE — https://digitecme.com/mercedes/models/gle-service-repair-dubai

**Query groups:** GLE and ML model service. **Disposition:** Changed in prepared release.

Qualified M-Class/ML63/GLE63 and SUV/Coupe equipment. Removed the assumption that every AMG uses conventional 9G-TRONIC. Added engine/system links and hub maintenance booking.

- Title before: Mercedes GLE Service & Repair Dubai | Digi-Tec
- Title after: Mercedes GLE Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes GLE Service & Repair Dubai
- H1 after: Mercedes GLE Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### GLS — https://digitecme.com/mercedes/models/gls-service-repair-dubai

**Query groups:** GLS and GL model service. **Disposition:** Changed in prepared release.

Qualified conventional versus AMG transmission scope and linked Maybach-specific enquiries. Added engine/system links and corrected scheduled-maintenance booking.

- Title before: Mercedes GLS Service & Repair Dubai | Digi-Tec
- Title after: Mercedes GLS Service & Repair Dubai | Digi-Tec
- H1 before: Mercedes GLS Service & Repair Dubai
- H1 after: Mercedes GLS Service & Repair Dubai
- Files: src/data/mercedesModelPages.ts; src/pages/MercedesModelPage.tsx; src/i18n/mercedes-language.ts
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No documented model repair case was supplied. Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.

### MAYBACH — https://digitecme.com/brands/maybach-service-dubai

**Query groups:** Maybach model service. **Disposition:** Changed in prepared release.

Preserved the dedicated hub and its existing service/repair title/H1. Added S-Class and Mercedes-hub navigation with VIN/Maybach equipment qualifications. No expansion based on the small query sample.

- Title before: Not checked
- Title after: Maybach Service & Repair Dubai | Digi-Tec Workshop
- H1 before: Not recorded
- H1 after: Maybach Repair & Service Dubai
- Files: src/pages/BrandPage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No additional business-evidence dependency identified.

### COST — https://digitecme.com/blog/mercedes-service-cost-dubai-guide

**Query groups:** Service costs. **Disposition:** Changed in prepared release.

Applied the cost-specific title/H1. Replaced universal A/B inclusions, annual outer-limit, blanket programming and resale guarantees with vehicle-specific scope, itemized costs, tax, exclusions and recordkeeping. Kept the original publication date and added an update date.

- Title before: Mercedes Service Dubai | Intervals, Scope and Cost Factors
- Title after: Mercedes Service Cost Dubai | A & B Scope | Digi-Tec
- H1 before: Mercedes Service in Dubai: Scope, Intervals and What Affects Cost
- H1 after: Mercedes Service Cost in Dubai: Service A & B Scope
- Files: src/data/aiGuidePosts.ts; src/data/blogPosts.ts; src/pages/BlogPost.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: Workshop-approved dated prices, VAT treatment and vehicle assumptions were not supplied; no price claims added.

### INTERVAL — https://digitecme.com/blog/mercedes-service-intervals-dubai-heat

**Query groups:** Service schedule and ASSYST. **Disposition:** Changed in prepared release.

Applied the ASSYST title/H1. Removed fixed Dubai-wide oil/brake-fluid/coolant/transmission intervals and the European-only schedule claim. Added VIN/history/display selection and conditional A3/A9/AH interpretation. Kept the original publication date and added an update date.

- Title before: Mercedes Service Intervals Dubai | Digitec Performance
- Title after: Mercedes Service Intervals & ASSYST Dubai | Digi-Tec
- H1 before: Mercedes Service Intervals in Dubai Heat: What You Need to Know
- H1 after: Mercedes Service Intervals & ASSYST in Dubai
- Files: src/data/blogPosts.ts; src/pages/BlogPost.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No additional business-evidence dependency identified.

### OWNERSHIP — https://digitecme.com/blog/mercedes-benz-maintenance-guide-dubai

**Query groups:** Ownership and reliability. **Disposition:** Changed in prepared release.

Added a Gulf ownership/reliability answer based on condition, history and fitted equipment, plus the pre-purchase guide link. Replaced blanket shortened-interval language and removed Mercedes customer-facing editorial/image-production instructions.

- Title before: Mercedes-Benz Maintenance Dubai | DIGI-TEC
- Title after: Mercedes-Benz Maintenance Dubai | DIGI-TEC
- H1 before: Mercedes-Benz Maintenance Guide for Dubai Owners
- H1 after: Mercedes-Benz Maintenance Guide for Dubai Owners
- Files: src/data/brandWorkshopArticles.ts; src/pages/BrandWorkshopArticlePage.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No additional business-evidence dependency identified.

### PPF — https://digitecme.com/services/paint-protection-film

**Query groups:** Paint protection. **Disposition:** Already satisfied.

Already satisfied: retained the shared PPF page, existing title/H1, conditional packages and Mercedes-hub links. Added an inbound link from Mercedes body repair; no thin Mercedes-only PPF page.

- Title before: PPF Dubai | Paint Protection Film for Cars | DIGI-TEC
- Title after: PPF Dubai | Paint Protection Film for Cars | DIGI-TEC
- H1 before: Paint Protection Film (PPF) Dubai
- H1 after: Paint Protection Film (PPF) Dubai
- Files: src/pages/BrandServicePage.tsx (inbound link only)
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: No original Mercedes film-job record/package details were found; a Mercedes case remains conditional.

### AR — https://digitecme.com/ar/brands/mercedes-benz-service-dubai

**Query groups:** Arabic repair. **Disposition:** Changed in prepared release.

Applied natural Arabic Mercedes name/title/H1, supported workshop/process/quote FAQs and bilingual maintenance comparison. Corrected Arabic OG fallback, readable phone ordering and mobile booking labels. Verified reciprocal hub language links and RTL layout.

- Title before: إصلاح وصيانة Mercedes-Benz في دبي | مركز ديجي-تك
- Title after: إصلاح وصيانة مرسيدس في دبي | ديجي-تك
- H1 before: Mercedes-Benz للإصلاح والصيانة في دبي
- H1 after: إصلاح وصيانة مرسيدس بنز في دبي
- Files: src/i18n/ar-brands.ts; src/pages/BrandPage.tsx; src/components/MercedesMaintenanceScope.tsx
- Validation: Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks
- Remaining evidence: The hub copy was reviewed in source and browser; no independent native-language business sign-off was supplied. Four old Arabic model templates are noindex and no longer advertised as equivalent translations.

## Additional affected URLs

- `https://digitecme.com/ar/tuning` — index, follow, max-image-preview:large; برمجة وتطوير أداء السيارات في دبي | ديجي-تك. Supporting FAQ, ownership or tuning claim corrections described above.
- `https://digitecme.com/ar/blog/mercedes-benz-maintenance-guide-dubai` — index, follow, max-image-preview:large; ورشة Mercedes-Benz في دبي | ديجي-تك. Supporting FAQ, ownership or tuning claim corrections described above.
- `https://digitecme.com/blog/mercedes-amg-gt-tuning-dubai` — index, follow, max-image-preview:large; Mercedes AMG GT Tuning Dubai | Vehicle-Specific Guide. Supporting FAQ, ownership or tuning claim corrections described above.
- `https://digitecme.com/ar/blog/mercedes-g63-service-dubai-guide` — noindex, follow; Mercedes G63 Service Dubai | AMG G-Class Owner Guide. Generic Arabic model template removed from indexing/alternate claims; the browser language link points explicitly to the Arabic hub.
- `https://digitecme.com/ar/blog/mercedes-c-class-service-dubai-guide` — noindex, follow; Mercedes C-Class Service Dubai | Owner Maintenance Guide. Generic Arabic model template removed from indexing/alternate claims; the browser language link points explicitly to the Arabic hub.
- `https://digitecme.com/ar/blog/mercedes-e-class-service-dubai-guide` — noindex, follow; Mercedes E-Class Service Dubai | Maintenance and Repair Guide. Generic Arabic model template removed from indexing/alternate claims; the browser language link points explicitly to the Arabic hub.
- `https://digitecme.com/ar/blog/mercedes-s-class-service-dubai-guide` — noindex, follow; Mercedes S-Class Service Dubai | Maintenance and Repair Guide. Generic Arabic model template removed from indexing/alternate claims; the browser language link points explicitly to the Arabic hub.

## Files changed in the prepared source release

- `README.md`
- `cloudflare/mercedes-seo-router.js`
- `docs/seo/mercedes-permanent-redirects.csv`
- `docs/seo/mercedes-release-deployment.md`
- `docs/seo/protection-release-validation.json`
- `docs/seo/route-schema-matrix.csv`
- `docs/seo/schema-inventory.md`
- `public/sitemap.xml`
- `scripts/generate-hosting-rules.mjs`
- `scripts/test-hosting-rules.mjs`
- `scripts/validate-seo.mjs`
- `src/App.tsx`
- `src/components/Header.tsx`
- `src/components/LegacyRedirectHandler.tsx`
- `src/components/MercedesMaintenanceScope.tsx`
- `src/components/PreserveQueryNavigate.tsx`
- `src/data/aiGuidePosts.ts`
- `src/data/blogPosts.ts`
- `src/data/brandServices.ts`
- `src/data/brandWorkshopArticles.ts`
- `src/data/mercedesModelPages.ts`
- `src/data/mercedesServiceContent.ts`
- `src/i18n/ar-brands.ts`
- `src/i18n/locale.ts`
- `src/i18n/mercedes-language.ts`
- `src/lib/route-manifest.ts`
- `src/lib/route-policy.ts`
- `src/main.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/BrandPage.tsx`
- `src/pages/BrandServicePage.tsx`
- `src/pages/BrandWorkshopArticlePage.tsx`
- `src/pages/MercedesModelPage.tsx`
- `src/pages/Tuning.tsx`

## Evidence still needed

Real diagnostic/repair records, before/after measurements and approved publication permission are required before adding the proposed repair cases. Existing workshop/project photographs are reused only for what they document. Prices, upgrade capability, guaranteed outcomes and new qualifications were not invented. These evidence gaps affect those claims or case studies; they did not prevent the remaining implementation.

## Primary technical references

- [Mercedes C-Class generations, body styles and optional W205 AIRMATIC](https://media.mercedes-benz.com/article/ced8c5a0-ceee-4901-97d2-e5b1ed70fd7f)
- [Mercedes E-Class coupe/cabriolet history](https://media.mercedes-benz.fr/nouvelles-mercedes-benz-classe-e-coupe-et-cabriolet/)
- [Mercedes S-Class S63/S65 coupe and cabriolet](https://media.mercedes-benz.pt/os-novos-classe-s-coupe-e-classe-s-cabriolet/)
- [Lovable custom-domain hosting](https://docs.lovable.dev/features/custom-domain)
- [Cloudflare Bulk Redirect parameters](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/parameters/)
