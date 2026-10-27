# Production QA — 17 September 2026

**Overall: FAIL.** The 12 canonical target pages pass their page checks. Permanent tyre/Mercedes redirects remain inactive, and live GA4 event receipt remains unverified. The three new pages are part of these 12 unique URLs, not three additional owners.

Fresh HTTP observations: 2026-09-17T06:13:57.606Z–2026-09-17T06:14:33.224Z. Hosting deployment ID: `160d16a7-7e6d-45ef-8cb2-032dc527d542`, unchanged from 16 September. Hosting is Lovable, as confirmed by the owner. No migration, content redesign or SEO rewrite was performed.

## Every target URL

| Canonical target | New | GET/HEAD | Canonical | Title | Description | H1 | Initial HTML | JSON-LD | Page result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [/brands/bmw-service-dubai](https://digitecme.com/brands/bmw-service-dubai) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/rolls-royce-service-dubai](https://digitecme.com/brands/rolls-royce-service-dubai) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/aston-martin-service-dubai](https://digitecme.com/brands/aston-martin-service-dubai) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/bentley-service-dubai](https://digitecme.com/brands/bentley-service-dubai) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/paint-protection-film](https://digitecme.com/services/paint-protection-film) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/ceramic-coating](https://digitecme.com/services/ceramic-coating) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/cadillac-cue-screen-repair-dubai](https://digitecme.com/services/cadillac-cue-screen-repair-dubai) | Yes | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/auto-electrical-repair-dubai](https://digitecme.com/services/auto-electrical-repair-dubai) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/head-unit-repair-dubai](https://digitecme.com/services/head-unit-repair-dubai) | Yes | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/mercedes-audio-upgrade-dubai](https://digitecme.com/services/mercedes-audio-upgrade-dubai) | Yes | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/brands/bentley-service-dubai/electrical-repair](https://digitecme.com/brands/bentley-service-dubai/electrical-repair) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| [/services/tire-repair-dubai](https://digitecme.com/services/tire-repair-dubai) | — | 200/200 PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

| Target | Internal links | Sitemap | Robots/indexability | Responsive rendering | Deployed analytics/WhatsApp code | Live GA4 receipt |
| --- | --- | --- | --- | --- | --- | --- |
| BMW | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| Rolls-Royce | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| Aston Martin | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| Bentley | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| PPF | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| Ceramic | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| Cadillac CUE (new) | PASS | PASS | PASS | PASS (1440/390/320px) | PASS* | NOT VERIFIED |
| Electrical | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| Head unit (new) | PASS | PASS | PASS | PASS (1440/390/320px) | PASS* | NOT VERIFIED |
| Mercedes audio (new) | PASS | PASS | PASS | PASS (1440/390/320px) | PASS* | NOT VERIFIED |
| Bentley camera | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |
| Tyres | PASS | PASS | PASS | PASS (1440/390px) | PASS* | NOT VERIFIED |

The Bentley camera owner includes the fragment `#reverse-camera`; its canonical and sitemap correctly use the underlying electrical page URL without a fragment.

## Evidence and acceptance boundaries

- Each canonical returns HTTP 200 for both GET and HEAD. Exactly one correct canonical, description and H1 are present; title, description, H1, full initial page text, anchor list and JSON-LD match the validated local build. No empty SPA shell is accepted as indexable content. Schema parses and includes the expected Service and related graph; FAQ answers are present in initial HTML.
- All 148 distinct internal destinations linked by the owners return 200; HTML destinations have their expected canonical. A 200 homepage fallback does not pass this check.
- Sitemap returns 200 with 996 entries. Every owner, including each new URL, appears exactly once.
- Robots.txt returns 200, permits the targets and declares the sitemap. Target robots meta and HTTP headers contain no noindex. This proves crawl/index eligibility, not actual Google indexing.
- Fresh live-browser checks: 12 pages at 1440px, 12 at 390px, the three new pages at 320px. Every case has one H1, correct rendered canonical, one route JSON-LD container, loaded visible images, WhatsApp links and a GTM script. No horizontal overflow. Narrow Mercedes audio screenshot inspected. No warnings/errors appeared in the queried browser log. Interaction checks from 16 September remain historical evidence and are not counted as fresh interaction tests here.
- Existing GTM `GTM-T3GVSPND` and GA4 `G-4TRCEJSY4S` script endpoints return 200. The published GTM container still references the property and whatsapp_click. Production main bundle `/assets/index-BYKtDuhZ.js` has SHA-256 `6f9a99cb5334d35967f45c3590615354496fb395b8ed220860f2d91693b5e4a0`, unchanged from the prior audit.
- *Tracking code PASS means the downloaded production functions passed an isolated Node VM test for each target: exactly one whatsapp_click, one whatsapp_chat_opened, correct page/placement, sanitized message/query data, SPA page view and listener cleanup. It does not establish live browser transport or GA4 receipt. No enquiry or form submission was sent. GA4 acceptance remains incomplete because no authenticated DebugView/Realtime access is available.

## Redirects — FAIL

All 135 tested source variants fail the required direct permanent destination for both GET and HEAD. The complete list is in redirects.csv and http-audit.json. It includes all 99 existing Mercedes aliases plus 36 tyre/Mercedes host/slash/query variants.

| Source | Actual | Required | Result |
| --- | --- | --- | --- |
| /services/tire-repair | 200 homepage HTML | 301/308 to /services/tire-repair-dubai | FAIL |
| /ar/services/tire-repair | 200 homepage HTML | 301/308 to /ar/services/tire-repair-dubai | FAIL |
| /services/mercedes-repair-dubai | 200 homepage HTML | 301/308 to /brands/mercedes-benz-service-dubai | FAIL |
| /services/mercedes-service-dubai | 200 homepage HTML | Same canonical Mercedes hub | FAIL |
| /best-mercedes-workshop-dubai | 200 homepage HTML | Same canonical Mercedes hub | FAIL |
| /brands/mercedes-benz-service-dubai/suspension-repair | 200 homepage HTML | 301/308 to /services/mercedes-suspension-repair-dubai | FAIL |
| Tested www aliases | 302 to the same legacy path on apex | Direct permanent canonical destination | FAIL |
| Tested HTTP aliases | 301 to HTTPS at the same legacy path | Direct permanent canonical destination | FAIL |

Query strings are preserved by existing host normalization, but the final alias mapping is absent. A browser-side navigation cannot change the initial HTTP response into a permanent redirect.

## Lovable diagnosis and narrowly scoped remedy

The website content is correctly deployed on Lovable. Production still serves /_redirects as a downloadable file and /_worker.js as JavaScript, both with HTTP 200. Their availability is not evidence of redirect execution.

Lovable's current documentation says connected secondary domains use a temporary 302. It also documents retaining Lovable hosting behind a CDN/proxy: enable **Uses Cloudflare or similar proxy** and use the CNAME supplied by the project. The standard A-record configuration must not simply be switched to proxied. These are distinct supported domain-connection modes. [Official Lovable domain documentation](https://docs.lovable.dev/features/custom-domain).

The prepared correction is cloudflare/production-seo-router.js plus cloudflare/wrangler.production-seo.jsonc. It reuses existing Mercedes rules and adds the two legacy tyre mappings, normalizes known scoped URLs, and preserves queries. It changes no page content. Source and deployable bundle passed 4,848 redirect cases and 231 passthrough cases on 16 September. Those test results are historical and the unchanged prepared fix has not been activated.

Activation requires authenticated access to the existing Lovable project's domain settings and the DNS/edge account controlling digitecme.com. Inspect and back up current domain records, proxy mode, earlier rules and attached Workers before changing anything. Retain Lovable as origin, use its supplied CNAME when enabling the supported proxy mode, deploy only the scoped handler and avoid overwriting unrelated routes. Then rerun the public audit, checking one-hop status, exact Location/query preservation and unchanged canonical pages. Restore the prior domain/routing configuration if verification fails. Do not activate the older broad 404/410 guard as part of this correction.

The connected Cloudflare API still returns no digitecme.com zone. This is an access/configuration blocker, not a missing permission to proceed from the user. Repository uploads or another Lovable content publish alone cannot activate these rules.

## Issues fixed / outstanding

| Issue | Work completed | Live status |
| --- | --- | --- |
| Incorrect tyre alias HTTP behavior | Diagnosed; scoped correction already prepared and tested | FAIL — activation blocked by domain access |
| Existing Mercedes alias HTTP behavior | Rechecked all aliases; existing handler retained in scoped fix | FAIL — activation blocked by domain access |
| www temporary redirect / extra legacy-path hop | Confirmed Lovable's built-in behavior; included in edge activation plan | FAIL — not changed |
| Metadata, HTML, schema, sitemap, internal-link or responsive regression | Fresh checks found none on the 12 owners | PASS — no fix needed |
| Analytics implementation regression | Existing deployed handler passes isolated tests | PASS* — receipt still unverified |

**Production issues fixed this run: none.** No production configuration mutation was possible. The report does not label a prepared local fix as a live fix.

## Exact metadata captured

### BMW

- Canonical: https://digitecme.com/brands/bmw-service-dubai
- Title: BMW Service & Repair Dubai | DIGI-TEC
- Description: BMW service and repair in Al Quoz, Dubai. Independent workshop for scheduled maintenance, engine diagnostics, transmission, brakes, AC and electrical faults.
- H1: BMW Service & Repair Dubai

### Rolls-Royce

- Canonical: https://digitecme.com/brands/rolls-royce-service-dubai
- Title: Rolls-Royce Service & Repair Dubai | DIGI-TEC
- Description: Rolls-Royce service and repair in Al Quoz, Dubai for Ghost, Cullinan, Phantom, Wraith and Dawn. Independent maintenance, suspension and electrical diagnosis.
- H1: Rolls-Royce Service & Repair Dubai

### Aston Martin

- Canonical: https://digitecme.com/brands/aston-martin-service-dubai
- Title: Aston Martin Service & Repair Dubai | DIGI-TEC
- Description: Aston Martin service and repair in Al Quoz, Dubai for Vantage, DB11, DBX and DBS. Engine diagnostics, brakes, maintenance and electrical fault assessment.
- H1: Aston Martin Service & Repair Dubai

### Bentley

- Canonical: https://digitecme.com/brands/bentley-service-dubai
- Title: Bentley Service & Repair Dubai | DIGI-TEC
- Description: Bentley service and repair in Al Quoz, Dubai for Continental GT, Flying Spur and Bentayga. Independent maintenance, diagnostics and repair estimates.
- H1: Bentley Service & Repair Dubai

### PPF

- Canonical: https://digitecme.com/services/paint-protection-film
- Title: PPF Dubai | Paint Protection Film for Cars | DIGI-TEC
- Description: Car paint protection film in Dubai. Compare full-body and selected-panel PPF, preparation and aftercare at DIGI-TEC in Al Quoz. Request a quote for your car.
- H1: Paint Protection Film (PPF) Dubai

### Ceramic

- Canonical: https://digitecme.com/services/ceramic-coating
- Title: Ceramic Coating Dubai | Car Paint Protection | DIGI-TEC
- Description: Ceramic paint protection in Dubai for luxury and performance cars. Explore coating, paint preparation and aftercare at DIGI-TEC in Al Quoz. Get your quote.
- H1: Ceramic Coating Dubai

### Cadillac CUE

- Canonical: https://digitecme.com/services/cadillac-cue-screen-repair-dubai
- Title: Cadillac CUE Screen Repair & Replacement Dubai | DIGI-TEC
- Description: Cadillac CUE touchscreen repair and replacement in Al Quoz, Dubai. Unresponsive touch, ghost touches and display faults assessed before parts are selected.
- H1: Cadillac CUE Screen Repair & Replacement in Dubai

### Electrical

- Canonical: https://digitecme.com/services/auto-electrical-repair-dubai
- Title: Car Electrical Repair Dubai | Wiring & Diagnostics | DIGI-TEC
- Description: Car electrical repair in Dubai for wiring, charging, starting and electronic faults. Book diagnosis at DIGI-TEC in Al Quoz before selecting parts.
- H1: Car Electrical Repair in Dubai

### Head unit

- Canonical: https://digitecme.com/services/head-unit-repair-dubai
- Title: Head Unit & Mercedes COMAND Repair Dubai | DIGI-TEC
- Description: Head-unit and Mercedes COMAND fault diagnosis in Al Quoz, Dubai. Screen, sound, restarts and connectivity problems checked before repair or replacement.
- H1: Head Unit & Mercedes COMAND Repair in Dubai

### Mercedes audio

- Canonical: https://digitecme.com/services/mercedes-audio-upgrade-dubai
- Title: Mercedes Stereo & Audio Upgrade Dubai | DIGI-TEC
- Description: Mercedes stereo and sound-system upgrades in Dubai, including E-Class enquiries. Review fitted equipment, speaker and amplifier options and vehicle integration.
- H1: Mercedes Stereo & Audio Upgrades in Dubai

### Bentley camera

- Canonical: https://digitecme.com/brands/bentley-service-dubai/electrical-repair
- Title: Bentley Electrical Repair Dubai | Digi-Tec
- Description: Bentley electrical repair in Dubai with model-specific inspection, confirmed parts options and a clear quote at Digi-Tec, Al Quoz.
- H1: Bentley Electrical Repair Dubai

### Tyres

- Canonical: https://digitecme.com/services/tire-repair-dubai
- Title: Tyre Repair Dubai | Puncture Checks & Replacement | DIGI-TEC
- Description: Tyre repair in Dubai with puncture inspection, pressure-loss diagnosis and replacement when needed. Discuss balancing, alignment and fitment at DIGI-TEC.
- H1: Tyre Repair Dubai

## Evidence files

Fresh evidence: outputs/production-qa-2026-09-17/http-audit.json, html/, robots.txt, sitemap.xml, browser-observations.json, deployed-analytics-tests.json, endpoint-checks.json and redirects.csv. The 16 September report and routing test outputs are retained separately; fresh and historical observations are not conflated.
