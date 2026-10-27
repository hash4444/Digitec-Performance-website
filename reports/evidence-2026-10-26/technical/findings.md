# Fresh technical evidence — Mercedes ecosystem, 26 October 2026

Read-only investigation. No website source, build output, DNS, Cloudflare rule, database, backend, deployment or published content was changed. New files are confined to this evidence directory. Existing reports are historical context, not proof of present production behavior.

The canonical commercial hub **exists and is technically accessible** at <https://digitecme.com/brands/mercedes-benz-service-dubai>. The principal confirmed weakness is that most alias mappings prepared in the repository do not produce their intended HTTP redirects in production. The oil redirect activated on 21 October is working in the fresh sample and should be preserved.

## Capture and coverage

- Primary capture: **26 October 2026, 10:06:37–10:06:57 UAE** (06:06:37–06:06:57 UTC). Supplemental hosting/navigation/bundle requests around 10:09–10:10 UAE.
- Public GET and limited HEAD only, without JavaScript execution, forms, booking submissions, analytics test events or authenticated configuration access.
- Live sitemap: **1,005 URLs**, no exact duplicate `<loc>` values. All **75 sitemap URLs containing `mercedes`** were fetched. This includes Arabic, repair/service, model, problem, informational, valuation and tuning pages; it is broader than the commercial service cluster.
- Four deliberately excluded Arabic model URLs and five control pages were added: **84 primary HTML responses in total**, including **79 Mercedes URLs**. All returned HTTP 200.
- **99 distinct slashless apex alias paths** were taken from the literal `aliases` Map in `cloudflare/mercedes-seo-router.js:2`, then requested. This tests a prepared mapping inventory, not a claim that all 99 paths have search demand or current inbound links.
- **35 additional request cases** cover canonical hub/oil, oil legacy and repair legacy routes across HTTP/HTTPS, apex/www, slash/no slash, two query-string cases and one nonexistent URL. Four targeted HEAD checks were also recorded.
- Links in the 79 Mercedes HTML pages yielded **166 distinct same-origin destinations** after stripping fragments and query strings: **164 HTML content URLs**, **one PDF**, and **one Cloudflare email-protection utility**. All 164 HTML targets returned 200 with exactly one canonical equal to the requested URL and nonempty page-specific title. The PDF returned 200. No homepage fallback was accepted as a healthy HTML link.
- The crawl does not prove Google indexing, Google-selected canonicals, crawl frequency, location-based rankings, whole-site link health or complete mobile usability.

## Confirmed findings and recommended treatment

| ID | Severity / evidence state | Affected URLs and observed behavior | Expected impact / recommendation | Implementation risk |
| --- | --- | --- | --- | --- |
| T1 | **P1 when linked or present in GSC; confirmed HTTP behavior** | **95/99** prepared aliases return HTTP **200** with the homepage title, homepage canonical and an exact normalized-main-content hash matching `/`. Examples: `/ar/brands/mercedes-benz-service-dubai/oil-change`, `/brands/mercedes-benz-service-dubai/body-repair`, `/brands/mercedes-benz-service-dubai/suspension-repair`, `/services/mercedes-oil-change`, `/mercedes-oil-change`. Only four tested alias paths correctly redirect (listed below). `aliases.csv` records every source/intended target/status; `http-audit.json → aliases` preserves headers and hash. | An old search result or external link can initially resolve to unrelated homepage content. This can confuse canonical/indexing signals and users; the actual ranking effect is unmeasured. Prioritize aliases evidenced by the current GSC Pages export, server logs, backlinks or actual internal references. For each justified migration, propose a narrow permanent HTTP redirect directly to the existing corresponding service owner. Do not indiscriminately activate all speculative aliases. Preserve the existing oil and broad repair rules. | **Medium–high:** edge rule scope/order/query handling can affect existing migrations. Refresh actual authenticated rules before any future implementation, preserve IDs/order, require explicit approval. No settings were inspected or changed here. |
| T2 | **P2; confirmed canonical consolidation opportunity** | Both `/brands/mercedes-benz-service-dubai` and its slash form return **200**. Both oil service forms also return **200**. The slash pages point to the corresponding **slashless** canonical, while sitemap and visible internal links prefer slashless. `redirect-variants.csv` and `http-audit.json → variants` contain all responses. | Canonical hints already agree, so this is not a missing-canonical emergency. Compare current Google-selected vs declared canonicals for both forms before deciding whether an additional exact slash redirect is beneficial. The 21 October historical note says Google previously selected the oil slash form; that is not fresh Google evidence. Avoid switching preferred URL policy merely to standardize style. | **Medium**, especially oil: a new normalization rule must not override or reorder the working legacy oil rule or create a second hop. |
| T3 | **P2; confirmed single-sample soft-404-like fallback** | Invented `/seo-audit-nonexistent-mercedes-20261026` returned **200** with the homepage title/canonical. One deliberately nonexistent path was sampled. | Return a real 404/410 for unknown content paths while preserving valid routes and approved aliases. Google may classify such responses as soft 404s; that classification is a hypothesis until GSC confirms it. No claim is made that every unknown path behaves identically. | **Medium–high** if a global route guard is used; prefer a separately reviewed route policy with broad valid-page regressions. |
| T4 | **P1 measurement dependency; capability verified, receipt unverified** | GA4 `G-4TRCEJSY4S` and GTM `GTM-T3GVSPND` appear in all **79/79 Mercedes HTML pages**. Deployed main bundle contains `whatsapp_click`, `whatsapp_chat_opened`, `telephone_link_clicked`, landing-page and referrer attribution logic. Deployed hub chunk contains `whatsapp_draft_opened`, `brand-booking-form`, `scheduled_maintenance`. | Code existence does not establish GA4 receipt, event deduplication, key-event configuration, organic-channel reporting, enquiries, bookings or revenue. Obtain read access to GA4/GTM or an approved DebugView validation, then reconcile click events with qualified Mercedes enquiries and booked jobs. Do not count draft opening as a sent message or booked appointment. | **Low** for read-only configuration/report inspection; any later live test events need controlled documentation. No conversion tests were submitted during this audit. |
| T5 | **P2 evidence gap; no performance failure established** | Public mobile PageSpeed API request returned **429 RESOURCE_EXHAUSTED**, saved in `pagespeed-mobile.json`. No usable CrUX/Lighthouse metrics were returned. | Obtain GSC Core Web Vitals/CrUX or an authorized fresh mobile lab run. Diagnose LCP/INP/CLS using actual measurements before prioritizing code changes. | **Low** for collecting evidence; change risk depends on the measured issue. |

The T1 inventory is not a list of 95 broken current internal links. All sampled HTML internal-link targets passed the semantic checks. The business significance of an alias is strongest when the GSC export or other discovery evidence actually contains it. The parent audit should join `aliases.csv` to the supplied Pages export to select the first migrations.

### Existing redirects that pass

The following slashless apex aliases redirect directly to their expected owners:

| Source | Fresh status | Destination |
| --- | --- | --- |
| `/best-mercedes-workshop-dubai` | 301 | `/brands/mercedes-benz-service-dubai` |
| `/services/mercedes-repair-dubai` | 301 | `/brands/mercedes-benz-service-dubai` |
| `/services/mercedes-service-dubai` | 301 | `/brands/mercedes-benz-service-dubai` |
| `/brands/mercedes-benz-service-dubai/oil-change` | 308 | `/services/mercedes-oil-change-dubai` |

For the **English oil legacy path**, all **8 GET host/protocol/slash combinations** redirected in one 308 hop to the slashless oil service and then 200. The ninth oil-legacy GET preserved `?utm_source=seo_audit&gclid=example&tag=a&tag=b` exactly, including repeated parameters. Both apex HTTPS slash/no-slash HEAD requests returned the same 308. These observations are consistent with the 21 October rule description; they do not establish its account configuration or its ranking effects. The Arabic oil legacy URL is a separate path and currently returns homepage 200.

For the **repair alias**, all 8 host/protocol/slash GET combinations returned one direct 301 to the hub. Canonical hub/oil HTTP and www samples returned a permanent 301 to HTTPS apex; trailing slash remained on the destination where supplied, then the HTML declared the slashless canonical. No redirect loops appeared in the 35-case sample.

## Technical strengths confirmed in the fresh HTML

The hub returns 200 for GET and HEAD, with title **“Mercedes Service Dubai | Maintenance & Repair | DIGI-TEC”**, one H1 **“Mercedes-Benz Service in Dubai”**, one description and the correct self-canonical. It is included once in the sitemap. Its initial response includes the main service content, XENTRY explanation, model navigation, repair links, six visible FAQ answers, review excerpts and booking form; the main content is not dependent on JavaScript rendering to exist.

All **84/84** primary HTML pages have exactly one nonempty title, one description, one canonical equal to the requested primary URL and one H1. There were **zero exact duplicate titles/descriptions/main-text hashes**, **zero H1-count failures**, **zero H1–H6 level jumps**, **zero duplicate DOM IDs**, **zero broken same-page `#fragment` links**, and **zero JSON-LD parsing errors** in this sample. These checks cannot rule out near-duplicate intent or Google canonical clustering.

All **75/75** Mercedes sitemap pages declare `index, follow, max-image-preview:large`; none returned an `X-Robots-Tag` noindex header. The four deliberately excluded Arabic model pages return `noindex, follow`, are absent from the sitemap, and retain self-canonicals. Their exclusion matches `src/i18n/mercedes-language.ts:1–10` and `src/lib/route-policy.ts:46–47`; it is not accidental commercial-page blocking.

`robots.txt` is HTTP 200, permits the Mercedes paths for `*`, declares the production sitemap, and restricts only `/wp-admin` and `/wp-login`. Explicit OpenAI crawler permission is present but is not a Google ranking signal. The sitemap itself is HTTP 200 XML. Eligibility to index is established; actual Google indexing is not.

All **79/79 Mercedes pages** have at least one incoming HTML link from another audited page when the `/tuning` hub supplement is included, even after excluding the HTML sitemap as an incoming source. No sampled Mercedes orphan was established. Five tuning model URLs initially looked unlinked from the service cluster; all are linked from the dedicated live `/tuning` hub. This is why cluster-only incoming-link checks should not be presented as whole-site orphan findings.

The one utility 404 is `/cdn-cgi/l/email-protection`, a Cloudflare obfuscated-email mechanism whose original links contain hash fragments. It is excluded from the 164 HTML content destinations. Stripping fragments makes that utility endpoint unsuitable as evidence of a broken email experience; rendered email behavior would need a separate check. The privacy PDF is an asset and is excluded from HTML-canonical requirements.

The hub emits Organization, WebSite, AutoRepair/AutomotiveBusiness, WebPage, BreadcrumbList, Brand, Service, OfferCatalog and FAQPage nodes. The local business entity has a consistent phone **+971 4 340 2223**, email **info@digitecme.com**, and address **Al Quoz Industrial Area 3, Warehouses 11–15, Dubai, AE**. It does not contain aggregateRating, geo coordinates, openingHours or hasMap. Verified opening hours/location identifiers could improve entity completeness; their absence is not proof of invalid markup or a ranking penalty. No stars or FAQ search appearance are promised.

All **266 FAQ question/answer pairs** across the 84 HTML pages (242 across the 79 Mercedes URLs; six on the main hub) occur in the corresponding initial main content. JSON parsing/content agreement is a syntax/content check, not a Google eligibility or rich-result validation. The current audit should not promise FAQ rich results.

## Repository behavior and production boundary

- `src/entry-server.tsx:19` defines React server rendering, with a static router and SEO collector at `:50`. `scripts/prerender.mjs:37–53` inserts collected title/description/robots/canonical into generated HTML. `src/main.tsx:42–45` hydrates existing markup. This matches the content-rich initial live responses.
- `src/hooks/use-seo.ts:70–81` resolves language-specific canonicals/indexability; `:118–123` maintains robots after browser navigation. Fresh HTML and source align for the reviewed hub and the intentional Arabic exclusions.
- `src/data/mercedesServiceCampaign.ts:5–9` supplies the current hub title, H1, description and introduction. The older September B1 report describes a different title and a then-pending local release; it must not override October production evidence.
- `cloudflare/mercedes-seo-router.js:2` contains the prepared alias inventory. The handler `:4–14` expresses permanent redirect intent, but local code is not proof of edge activation. Fresh production `/_redirects` returns 200 `application/octet-stream` and `/_worker.js` returns 200 JavaScript as downloadable assets (`supplements.json`). Together with the live responses, this shows that merely publishing these artifact files does not implement the prepared alias behavior on this hosting setup. It does not prove there is no unrelated Worker/rule configured in the account.
- `docs/seo/mercedes-oil-alias-redirect-2026-10-21.md` is explicitly historical context: it records a narrow English oil rule, three then-active rules and prior Google canonical selection. None of those account-state facts were assumed current without authentication.

## Analytics interpretation

`src/components/Analytics.tsx:12–26` names phone, email, WhatsApp and directions interactions. `:28–39` stores sanitized first-touch information in sessionStorage; `:82–99` adds landing/referrer context to anchor interaction events. `src/lib/contact-attribution.ts:5–61` strips arbitrary URL parameters and referrer paths while retaining known source/medium labels. `src/lib/whatsapp-tracking.ts:17–33` removes the prefilled WhatsApp message from analytics `link_url`. No customer form contents were collected in this audit.

`src/components/MercedesServiceBookingForm.tsx:54–65` builds a WhatsApp draft, emits `whatsapp_click` into the dataLayer and `whatsapp_draft_opened` through gtag, then opens WhatsApp. The deployed `BrandPage-CAb6TprA.js` contains the relevant event and form strings (`deployed-brand-bundle-evidence.json`). Main-bundle evidence confirms the anchor contact handlers are deployed. GTM container mappings and GA4 receipt remain unverified; two differently named WhatsApp intent events should not be summed as unique leads.

## Remaining evidence limits

Current authenticated Cloudflare rule definitions/order, live GSC URL Inspection, indexed canonical selection, GA4 event reports/DebugView, GTM configuration, field Core Web Vitals, mobile interactions, external backlinks and server logs were not available in this technical sub-audit. No build, test suite that writes generated website files, or application backend was run. The parent audit's desktop observation is a separate single-viewport check; it is not a mobile pass.

The seven-day search snapshot cannot show whether the October oil redirect caused improvement or decline. Technical correctness and ranking causation are separate questions. Preserve the working English oil migration while investigating the unrelated confirmed aliases and collecting longer comparable Search Console windows.

## Evidence index

- `http-audit.json`: response headers/status, metadata, headings, links, schema, hashes, full variants and timestamps.
- `html/`: 84 raw initial HTML bodies; filenames are referenced in each page record.
- `pages.csv`, `aliases.csv`, `redirect-variants.csv`, `internal-targets.csv`: compact review tables.
- `derived-summary.json`: computed counts, heading/fragment/schema checks and image inventory; generated by `analyze.mjs`.
- `robots.txt`, `sitemap.xml`: raw production infrastructure responses.
- `supplements.json`, `supplement-0.txt` to `supplement-3.txt`: live tuning navigation, published `_redirects`, published `_worker.js`, deployed main JavaScript.
- `deployed-brand-bundle-evidence.json`, `deployed-brand-bundle.js.txt`: booking-event deployment evidence.
- `pagespeed-mobile.json`: failed public PageSpeed request, HTTP 429.
- Numbered `src_*.txt`, `scripts_prerender.mjs.txt`, `cloudflare_*.txt`, `docs_*.txt`: source/context snapshots for line verification.
- `capture.mjs`, `analyze.mjs`: reproducible evidence-only GET/HEAD and analysis scripts. They write only inside this technical directory.
