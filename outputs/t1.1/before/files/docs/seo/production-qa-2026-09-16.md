# Production SEO QA — 16 September 2026

**Release result: FAIL — permanent redirects are not active on production.**

All 12 unique intent-owner pages pass the page checks below. The three new URLs are already included in those 12 and are explicitly marked. Production serves the expected updated content, so no content redesign, SEO rewrite or content republishing was needed. No production configuration change was made: the correct domain account is unavailable. The scoped correction is prepared and tested, **not deployed or fixed live**.

HTTP audit: 2026-09-16T08:54:48.847Z to 2026-09-16T08:55:41.748Z. Browser checks: 2026-09-16T09:02:12.207Z. Origin: https://digitecme.com. Observed hosting deployment ID: `160d16a7-7e6d-45ef-8cb2-032dc527d542`. Baseline source: commit `6aa0db7b3148a52c647be806f0642e57c52f8cb3`; local build fingerprint `7cf75aad8fafea31a8964138a81be9ca7ddce881f86c4073762db190d941c7c4`. The host does not expose a Git commit; correspondence is established by exact page text, metadata, links and JSON-LD comparison, not by assuming its deployment ID equals a commit.

## Target URL results

Page QA excludes GA4 backend receipt, which remains unverified for every page. `PASS*` means deployed tracking markup and isolated production handler tests pass; it does **not** mean a real browser conversion was received by GA4.

| Target URL | New | GET / HEAD | Canonical | Title | Description | H1 | Page QA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [/brands/bmw-service-dubai](https://digitecme.com/brands/bmw-service-dubai) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/rolls-royce-service-dubai](https://digitecme.com/brands/rolls-royce-service-dubai) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/aston-martin-service-dubai](https://digitecme.com/brands/aston-martin-service-dubai) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/bentley-service-dubai](https://digitecme.com/brands/bentley-service-dubai) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/paint-protection-film](https://digitecme.com/services/paint-protection-film) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/ceramic-coating](https://digitecme.com/services/ceramic-coating) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/cadillac-cue-screen-repair-dubai](https://digitecme.com/services/cadillac-cue-screen-repair-dubai) | Yes | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/auto-electrical-repair-dubai](https://digitecme.com/services/auto-electrical-repair-dubai) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/head-unit-repair-dubai](https://digitecme.com/services/head-unit-repair-dubai) | Yes | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/mercedes-audio-upgrade-dubai](https://digitecme.com/services/mercedes-audio-upgrade-dubai) | Yes | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/bentley-service-dubai/electrical-repair](https://digitecme.com/brands/bentley-service-dubai/electrical-repair) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/tire-repair-dubai](https://digitecme.com/services/tire-repair-dubai) | — | 200 / 200 PASS | PASS | PASS | PASS | PASS | PASS |

| Target | Initial/indexable HTML | Structured data | Internal links | Sitemap | Robots/headers | Responsive | Tracking code |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BMW | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| Rolls-Royce | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| Aston Martin | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| Bentley | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| PPF | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| Ceramic | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| Cadillac CUE (new) | PASS | PASS | PASS | PASS | PASS | PASS (1440/390/320px) | PASS* |
| Electrical | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| Head unit (new) | PASS | PASS | PASS | PASS | PASS | PASS (1440/390/320px) | PASS* |
| Mercedes audio (new) | PASS | PASS | PASS | PASS | PASS | PASS (1440/390/320px) | PASS* |
| Bentley camera | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |
| Tyres | PASS | PASS | PASS | PASS | PASS | PASS (1440/390px) | PASS* |

The Bentley camera intent belongs to `/brands/bentley-service-dubai/electrical-repair#reverse-camera`. Its canonical and sitemap entry correctly omit the fragment. A native browser click from the Bentley hub reached that section, replaced the canonical and placed the section 112.25px below the viewport top at 390px width. The first camera disclosure expanded; the Mercedes audio FAQ expanded and collapsed with Enter.

### What PASS means

- HTTP: direct GET and HEAD both 200, HTML content type, no redirect required for canonical targets.
- Metadata: exactly one expected self-canonical, one expected description and H1; expected title. All values match the validated local output.
- HTML: the initial response already contains the same complete page text as the validated prerender, including all schema FAQ answers. This is not an empty SPA shell.
- Structured data: all JSON-LD parses and exactly matches the validated local graphs, including Service, business references and breadcrumbs. Browser inspection finds one Service node and one route JSON-LD container. This does not claim Google rich-result eligibility.
- Internal links: initial anchor lists match the local build; all 148 distinct internal destinations return 200 and HTML destinations have the correct self-canonical. No homepage fallback was accepted as a working link. Eleven owners have inbound references from other tested owners; the tyre page also has a crawlable link from the separately checked live /services directory. The three new pages have contextual and directory links. The HTML sitemap links to the service and brand owners; the Bentley electrical/camera child is linked from the Bentley hub.
- Sitemap: HTTP 200, 996 entries; every target occurs exactly once. The three new pages are present.
- Indexability: robots.txt returns 200, allows the targets for wildcard and named OpenAI crawlers, and declares the production sitemap. Target HTML has no noindex directive; response headers have no X-Robots-Tag noindex. This checks eligibility, not whether Google has indexed a URL.
- Responsive: 27 observed browser cases, all 12 at 1440px and 390px, the three new pages also at 320px. One visible H1, no horizontal overflow, loaded visible images, correct canonical and schema after rendering. Representative desktop/mobile Bentley and all three 320px heroes were visually inspected. No console errors/warnings appeared in the queried browser logs; this is not a claim of exhaustive network or field Core Web Vitals monitoring.

## Production redirect failures

**FAIL: all 135 tested URL variants fail the required direct 301/308 to the final canonical target (GET and HEAD).** This includes all 99 existing Mercedes alias paths plus 36 tyre/Mercedes host, slash and query variants. The evidence file lists every request and result.

| Request | Actual production response | Required | Result |
| --- | --- | --- | --- |
| /services/tire-repair | 200; homepage title and HTML; no Location | 301/308 directly to /services/tire-repair-dubai | FAIL |
| /ar/services/tire-repair | 200; homepage fallback | 301/308 directly to /ar/services/tire-repair-dubai | FAIL |
| /services/mercedes-repair-dubai | 200; homepage fallback | 301/308 directly to /brands/mercedes-benz-service-dubai | FAIL |
| /best-mercedes-workshop-dubai | 200; homepage fallback | Same Mercedes hub | FAIL |
| /services/mercedes-service-dubai | 200; homepage fallback | Same Mercedes hub | FAIL |
| /brands/mercedes-benz-service-dubai/suspension-repair | 200; homepage fallback | 301/308 directly to /services/mercedes-suspension-repair-dubai | FAIL |
| HTTPS www variants | 302 to same legacy path on apex; does not resolve the alias | Permanent direct canonical destination | FAIL |
| HTTP apex variants | 301 to HTTPS at same legacy path; does not resolve the alias | Permanent direct canonical destination | FAIL |

Observed totals: 111 responses with status 200, 12 with 301 to HTTPS at the legacy path, 12 with 302 from www to the legacy apex path. Existing host redirects preserve the tested query string, but alias resolution is missing. Test strings include repeated parameters and a synthetic click ID; no real lead data was used. Trailing slash variants show the same failure.

### Root cause and access blocker

Production returns `/_worker.js` as JavaScript (200) and `/_redirects` as a downloadable file (200). Uploading these artifacts to Lovable does not activate their HTTP behavior. The content deployment succeeded; the custom-domain edge routing is missing or inactive. The observed responses match the hosting limitation already recorded in `docs/seo/mercedes-release-deployment.md`.

Cloudflare DNS nameservers are amy.ns.cloudflare.com and vicky.ns.cloudflare.com; the apex resolves to 185.158.133.1. This alone does not prove a Worker route is attached or the zone record is proxied. The connected Cloudflare API returned zero matching zones for digitecme.com; the complete account listing also omitted it. The Cloudflare dashboard is signed out, and the Lovable project shows an access/sign-in screen. No DNS, Worker route or origin setting was changed without access to the correct configuration.

## Fixes and remaining work

| Issue | Action completed | Verification | Production status |
| --- | --- | --- | --- |
| Tyre alias and known tyre path normalization absent | Added a narrowly scoped wrapper in cloudflare/production-seo-router.js | 4848 alias/host/slash/case/query GET/HEAD tests pass across tyre and Mercedes rules | FAIL — prepared, not activated |
| Existing Mercedes aliases not activated | Wrapper reuses the existing generated Mercedes handler unchanged | 231 canonical/unrelated/mutation passthrough checks pass | FAIL — prepared, not activated |
| Deployable routing configuration missing for this combined scope | Added cloudflare/wrangler.production-seo.jsonc and a bundled Worker artifact | Bundle created with the existing Vite/esbuild dependency | FAIL — account access required |
| SEO content mismatch | None found | All 12 pages match the validated content and graph | PASS — no fix required |
| Analytics/WhatsApp implementation regression | None found in deployed code | Existing tags available; isolated downloaded-handler tests pass on all 12 routes | PASS* — GA4 receipt not verified |

**Issues fixed on production during this audit: none.** The domain-routing corrections cannot truthfully be marked fixed until activated and rechecked on the public domain. No broad SEO content edits, dependency additions, analytics changes or unrelated DNS/routing changes were made.

### Concrete activation procedure once account access is available

1. Inspect the actual digitecme.com zone, current apex/www records, Worker routes and redirect-rule precedence. Confirm origin settings and proxy support against the existing Lovable project. Do not change nameservers, migrate hosting or overwrite an existing unrelated Worker route.
2. Deploy the prepared scoped Worker (either bundle via API/dashboard or the supplied Wrangler configuration). It contains the 99 existing Mercedes aliases plus two tyre aliases, normalizes only known scoped paths, preserves the raw query string, and passes every other request to the existing origin. Configure the intended apex/www routes only after reviewing existing route ownership. Do not incidentally activate the older global 404/410 guard.
3. Check that an earlier HTTPS or www rule does not create a chain before this Worker. If it does, adjust only the scoped rule precedence or use equivalent direct edge redirects for these paths.
4. Rerun `node scripts/audit-production-seo.mjs`; all 135 redirect cases must become direct permanent responses and all 12 canonical destinations must remain 200. Repeat browser checks after any deployment change.
5. Rollback: detach only the newly added scoped routes or restore their recorded prior configuration. The page build and existing content remain untouched.

Cloudflare documents that [Worker routes require an active zone and proxied DNS](https://developers.cloudflare.com/workers/configuration/routing/routes/). The artifact follows [Workers request-handling guidance](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/); it adds no storage, secrets, writes or response-body processing.

## Analytics and WhatsApp evidence / limits

Existing GTM container `GTM-T3GVSPND` and GA4 property `G-4TRCEJSY4S` remain in all target HTML. Both Google script endpoints return 200; the GTM container references the GA property and `whatsapp_click`. The browser DOM shows the corresponding script elements on every tested page. All target WhatsApp links point to the existing business number.

The deployed main bundle `/assets/index-BYKtDuhZ.js` has SHA-256 `6f9a99cb5334d35967f45c3590615354496fb395b8ed220860f2d91693b5e4a0`. Its actual compiled analytics functions were extracted into an isolated Node VM with document/React-effect mocks. For each of the 12 routes, one simulated click emitted exactly one `whatsapp_click` and one `whatsapp_chat_opened`, retained the correct page and CTA placement, excluded draft message/query content, emitted the expected SPA page-view event, and removed its click listener during cleanup. No application analytics logic was rewritten.

**Live GA4 event receipt: FAIL / unverified acceptance check.** These harness tests prove deployed code behavior, not live browser transport or GA4 reporting. The available browser inspection isolates page globals, and no authenticated GA4 DebugView/Realtime session is available. A production browser conversion and its receipt were not asserted. No enquiry was sent and no contact form submitted. Finish this check with an authenticated analytics session and a controlled, clearly identified test event before calling the entire release PASS.

## Exact live metadata

### BMW

- URL/canonical: https://digitecme.com/brands/bmw-service-dubai
- Title: BMW Service & Repair Dubai | DIGI-TEC
- Meta description: BMW service and repair in Al Quoz, Dubai. Independent workshop for scheduled maintenance, engine diagnostics, transmission, brakes, AC and electrical faults.
- H1: BMW Service & Repair Dubai
- Initial visible-text length: 13859 characters.

### Rolls-Royce

- URL/canonical: https://digitecme.com/brands/rolls-royce-service-dubai
- Title: Rolls-Royce Service & Repair Dubai | DIGI-TEC
- Meta description: Rolls-Royce service and repair in Al Quoz, Dubai for Ghost, Cullinan, Phantom, Wraith and Dawn. Independent maintenance, suspension and electrical diagnosis.
- H1: Rolls-Royce Service & Repair Dubai
- Initial visible-text length: 11383 characters.

### Aston Martin

- URL/canonical: https://digitecme.com/brands/aston-martin-service-dubai
- Title: Aston Martin Service & Repair Dubai | DIGI-TEC
- Meta description: Aston Martin service and repair in Al Quoz, Dubai for Vantage, DB11, DBX and DBS. Engine diagnostics, brakes, maintenance and electrical fault assessment.
- H1: Aston Martin Service & Repair Dubai
- Initial visible-text length: 9870 characters.

### Bentley

- URL/canonical: https://digitecme.com/brands/bentley-service-dubai
- Title: Bentley Service & Repair Dubai | DIGI-TEC
- Meta description: Bentley service and repair in Al Quoz, Dubai for Continental GT, Flying Spur and Bentayga. Independent maintenance, diagnostics and repair estimates.
- H1: Bentley Service & Repair Dubai
- Initial visible-text length: 10820 characters.

### PPF

- URL/canonical: https://digitecme.com/services/paint-protection-film
- Title: PPF Dubai | Paint Protection Film for Cars | DIGI-TEC
- Meta description: Car paint protection film in Dubai. Compare full-body and selected-panel PPF, preparation and aftercare at DIGI-TEC in Al Quoz. Request a quote for your car.
- H1: Paint Protection Film (PPF) Dubai
- Initial visible-text length: 16215 characters.

### Ceramic

- URL/canonical: https://digitecme.com/services/ceramic-coating
- Title: Ceramic Coating Dubai | Car Paint Protection | DIGI-TEC
- Meta description: Ceramic paint protection in Dubai for luxury and performance cars. Explore coating, paint preparation and aftercare at DIGI-TEC in Al Quoz. Get your quote.
- H1: Ceramic Coating Dubai
- Initial visible-text length: 16164 characters.

### Cadillac CUE — new page

- URL/canonical: https://digitecme.com/services/cadillac-cue-screen-repair-dubai
- Title: Cadillac CUE Screen Repair & Replacement Dubai | DIGI-TEC
- Meta description: Cadillac CUE touchscreen repair and replacement in Al Quoz, Dubai. Unresponsive touch, ghost touches and display faults assessed before parts are selected.
- H1: Cadillac CUE Screen Repair & Replacement in Dubai
- Initial visible-text length: 7543 characters.

### Electrical

- URL/canonical: https://digitecme.com/services/auto-electrical-repair-dubai
- Title: Car Electrical Repair Dubai | Wiring & Diagnostics | DIGI-TEC
- Meta description: Car electrical repair in Dubai for wiring, charging, starting and electronic faults. Book diagnosis at DIGI-TEC in Al Quoz before selecting parts.
- H1: Car Electrical Repair in Dubai
- Initial visible-text length: 8451 characters.

### Head unit — new page

- URL/canonical: https://digitecme.com/services/head-unit-repair-dubai
- Title: Head Unit & Mercedes COMAND Repair Dubai | DIGI-TEC
- Meta description: Head-unit and Mercedes COMAND fault diagnosis in Al Quoz, Dubai. Screen, sound, restarts and connectivity problems checked before repair or replacement.
- H1: Head Unit & Mercedes COMAND Repair in Dubai
- Initial visible-text length: 7037 characters.

### Mercedes audio — new page

- URL/canonical: https://digitecme.com/services/mercedes-audio-upgrade-dubai
- Title: Mercedes Stereo & Audio Upgrade Dubai | DIGI-TEC
- Meta description: Mercedes stereo and sound-system upgrades in Dubai, including E-Class enquiries. Review fitted equipment, speaker and amplifier options and vehicle integration.
- H1: Mercedes Stereo & Audio Upgrades in Dubai
- Initial visible-text length: 7258 characters.

### Bentley camera

- URL/canonical: https://digitecme.com/brands/bentley-service-dubai/electrical-repair
- Title: Bentley Electrical Repair Dubai | Digi-Tec
- Meta description: Bentley electrical repair in Dubai with model-specific inspection, confirmed parts options and a clear quote at Digi-Tec, Al Quoz.
- H1: Bentley Electrical Repair Dubai
- Initial visible-text length: 6840 characters.

### Tyres

- URL/canonical: https://digitecme.com/services/tire-repair-dubai
- Title: Tyre Repair Dubai | Puncture Checks & Replacement | DIGI-TEC
- Meta description: Tyre repair in Dubai with puncture inspection, pressure-loss diagnosis and replacement when needed. Discuss balancing, alignment and fitment at DIGI-TEC.
- H1: Tyre Repair Dubai
- Initial visible-text length: 7476 characters.

## Evidence

All evidence is under `outputs/production-qa-2026-09-16/`: `http-audit.json` (all owners, 148 links and 135 alias cases), `html/` (raw target responses), `robots.txt`, `sitemap.xml`, `inbound-directory-links.json`, `browser-observations.json`, `deployed-analytics-tests.json`, `analytics-endpoints.json`, `scoped-router-tests.json`, the downloaded production routing files/main bundle, and `production-seo-router.bundle.js`. Reusable audit and focused tests are under `scripts/`.
