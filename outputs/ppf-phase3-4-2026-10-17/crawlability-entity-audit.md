# PPF crawlability and entity audit

17 October 2026, Asia/Dubai. Fresh public GET/HEAD evidence began at **13:44:06 Dubai time**. Eight canonical English/Arabic PPF, paint-options, comparison and ceramic pages pass the sampled core crawlability checks. This establishes accessible content and technical indexing signals, **not actual indexing or AI inclusion**.

Evidence: [public HTTP/HTML audit](crawlability/live-audit.json), [saved initial HTML](crawlability/html/), [robots](crawlability/robots.txt), [sitemap](crawlability/sitemap.xml), [structured entity comparison](crawlability/entity-audit.json). The comparison script [audit-entities.mjs](crawlability/audit-entities.mjs) is local/read-only and can be rerun after a final build. No source/configuration file was edited by this audit, and no production enquiry or deployment was performed.

The final local snapshot uses the successful **19/19-stage build** completed at 13:47:58 with application source hash `b2bf92aba294bbb0807b1abd4943e5b47dd93b262e4dd99a306e04b6f00049da`. The [build record](crawlability/build-snapshot.json) and [matching source manifest](crawlability/build-source-manifest.json) are preserved in this phase's output. The snapshot is labeled local throughout. Phase 1/2 evidence remains intact; the fresh public evidence is saved in this phase's directory.

## Canonical page results

| Owner, including its `/ar` counterpart | Public GET/HEAD | Initial HTML and canonical | Sitemap / language relationships | Purpose |
|---|---|---|---|---|
| `/services/paint-protection-film` | 200 / 200 | Substantial service text, one H1, one self-canonical in each language | Each appears once; reciprocal en-AE/ar-AE/x-default | Primary film installation and quotation owner |
| `/services/paint-protection-dubai` | 200 / 200 | Substantial options explanation, one H1, one self-canonical | Each appears once; expected language pair | Decision hub for PPF, coating and correction |
| `/blog/ceramic-coating-vs-ppf-dubai` | 200 / 200 | Substantial informational article, one H1, one self-canonical | Each appears once; expected language pair | Film versus coating comparison |
| `/services/ceramic-coating` | 200 / 200 | Substantial coating service text, one H1, one self-canonical | Each appears once; expected language pair | Separate coating offering |

All eight responses contain `index, follow, max-image-preview:large` and no sampled blocking `X-Robots-Tag`. The public sitemap has 1,005 URLs. Owner text is visible in the first server response without requiring client interactions; it is not merely an empty app shell. The sampled text ranges from roughly 3,900 characters on the Arabic comparison to over 17,000 on English ceramic. These sizes are diagnostic evidence of substantive initial HTML, not a content-length target or quality score.

Public homepage and service-directory HTML expose direct PPF/hub links in both languages. The verified English polishing page links to film, options and comparison content. The comparison also links contextually to commercial owners. These sampled links expose the PPF owner to crawlers; no neighborhood doorway pages or duplicate question URLs are needed.

## Remaining publication and response problems

| Severity / scope | Fresh observation | Implication and treatment |
|---|---|---|
| High, production routing | All 24 PPF/paint alias plus Arabic/slash samples return homepage HTML with HTTP 200 and homepage canonical. | The Phase 2 local entry-point repair has not established corrected live HTTP behavior. Keep the separate [Phase 2 release runbook](../ppf-phase2-2026-10-17/production-release-blockers.md); authenticated routing diagnosis and authorization remain required. |
| Medium, URL normalization | Eight sampled owner slash variants return 200 with slashless canonicals. | Canonical hints exist, but production normalization is still absent. Do not claim local router tests fixed public responses. |
| High, release visibility | Public EN PPF has the old four-control quotation UI; AR PPF has no form. Public Organization lacks the local legalName. | The local bilingual form/entity work has not been established as published. Current local initial HTML contains all eight named quote fields in each language and the confirmed legalName. |
| Medium, invalid-path behavior | Fresh nonexistent EN/AR paths and legacy Mercedes/tyre probes still return homepage 200. | Existing remote response-guard behavior is absent or bypassed. The exact remote version/routes/precedence is unknown without account access. |
| Monitor, conventional retrieval | A conventional search result for the comparison uses an older title/snippet than the current public HTML. | Preserve intended metadata and ownership; recheck retrieval/GSC after an authorized release and recrawl. This is not an observed inaccurate AI answer. |
| Unverified external evidence | No authenticated Search Console URL Inspection, selected-canonical report, CrUX dataset or AI answer was captured. | Do not claim indexed status, field CWV success, AI recommendation or AI citation. |

Public `/_worker.js` and `/_redirects` are still downloadable origin artifacts. A Cloudflare header or downloadable file does not identify an active Worker version. This phase did not inspect credentials or alter remote routing.

### Actual production-entry offline regression

The actual configured entry point was bundled again **after the final local build**, using the already installed Vite/esbuild dependency. The new [bundle](routing/production-seo-router.bundle.js), [routing source/config hash manifest](routing/router-bundle-manifest.json), [source test results](routing/scoped-router-tests.json) and [bundle test results](routing/scoped-router-bundle-tests.json) are saved only in this phase's output. Bundle SHA-256: `25b80f21fad85539aa29ee1c479ab2d334326824fd25707957de8498e51c8a48`.

Both source and bundle pass 5,424 alias cases, 192 PPF/hub canonical normalization cases, 90 PPF scope-safety cases, 266 existing passthrough/canonical checks, 13 guarded-request checks, four 404/HEAD checks and five origin-response checks. These cover the real `cloudflare/production-seo-router.js` entry point in addition to the generated Worker's build tests. Requests use an injected local origin; no production traffic, account changes or deployment occurs. Public routing failures above remain unresolved by these local passes.

## Entity identities and graph relationships

All eight live and local graphs use these same shared identifiers, with no competing typed definition of the business within a page:

| Entity | Stable identifier | Observed relationship |
|---|---|---|
| Organization | `https://digitecme.com/#organization` | Publisher of the WebSite/page graph; business refers to it as parentOrganization |
| Automotive business | `https://digitecme.com/#business` | One node typed AutoRepair/AutomotiveBusiness; provider of commercial Service and about target of WebPage |
| WebSite | `https://digitecme.com/#website` | WebPage isPartOf; published by shared Organization |
| Route page | `{canonical URL}#webpage` | Self URL; shared publisher/business; mainEntity and breadcrumb references where applicable |
| Service | `{canonical service URL}#service` | Film/coating/options service with provider `/#business` and page relationship |
| BreadcrumbList | `{canonical URL}#breadcrumb` | Actual Home → Services → service or Home → Blog → article hierarchy |
| Comparison article | `{canonical article URL}#article` | BlogPosting retained within the comparison page's graph |

English and Arabic page/article/service IDs differ by their real canonical URL, while the underlying business remains language independent. No second PPF-only location or business entity was introduced. JSON-LD parses successfully in all samples; the audit checks graph identity, references and visible-content agreement, not an external rich-results eligibility decision.

The existing public business record uses the brand name “Digi-Tec Performance Center”, telephone `+971 4 340 2223`, email `info@digitecme.com`, and `Al Quoz Industrial Area 3, Warehouses 11–15`, Dubai, AE. Local Organization adds the user-confirmed legalName `DIGI-TEC Performance Center L.L.C.` while retaining that public brand identity. The audit does not independently verify current opening hours, exact entrance pin, WhatsApp reception, a separate PPF facility or external profile ownership. Those remain in the business/profile verification workstream.

## Visible content and markup safeguards

- PPF service schema describes film installation and quotation-specific scope present in visible content. General film education explains a physical barrier on covered panels and limits; it does not establish installed-film specifications.
- The film owner and options hub remain distinct Service pages; the comparison remains BlogPosting. There is no new special AI schema.
- Existing AR PPF FAQ markup has four questions and existing EN comparison FAQ markup has four; their answers are present in initial HTML. Existing AR ceramic has three. English PPF retains visible FAQs without adding FAQPage; lack of optional markup is not an error or a rich-result guarantee.
- No PPF Offer, Product, price, Review or AggregateRating was found. The shared, pre-existing general-service OfferCatalog contains six nested Offer nodes per page. Those are reported as inherited catalogue markup, not newly created PPF offers or prices; this audit added none.
- The live/local graphs have no duplicate typed IDs within the sampled pages. Repeated references to the one business ID are expected relationships, not duplicate businesses.
- Existing workshop and application imagery is not treated as proof of a named customer's installation, completion date, manufacturer or result. The workshop image qualification remains necessary; original case-study publication requires the separate evidence/permission record.

## Robots and accessible content

The current public robots file permits the sampled public service/article paths and points to the correct sitemap. Its existing `/wp-admin` and `/wp-login` disallows remain. Explicit OpenAI crawler groups already exist; no group, security restriction, endpoint exposure or crawler-specific directive was changed. The root report handles current official crawler documentation separately; an allow rule alone does not guarantee a request, indexing, training use or recommendation.

Initial HTML contains text, heading structure, standard links, business contacts and the existing native/detail FAQ content. Local Phase 2 browser evidence previously passed both languages, mobile widths, no-JavaScript disabled forms, keyboard/contact paths and analytics privacy. Those results are historical for their captured build. Final Phases 3–4 mobile/quotation regression is reported separately by the root task; this audit does not relabel the earlier tests as new results or infer live mobile behavior from HTML alone.

## Recommended next verification

1. Retain the existing commercial, decision-hub and comparison owners. Publish only the reviewed local candidate after authorization, then recheck public content/metadata/form/entity differences.
2. Use the tested actual production-entry routing runbook to resolve remote aliases/404 behavior with the account owner. Keep public HTTP evidence separate from local tests.
3. After release, inspect priority EN/AR URLs in Search Console, confirm selected canonicals and indexing, and monitor retrieval titles/snippets. Sitemap inclusion is not sufficient evidence.
4. Run the real AI observation panel in an enabled browser and capture actual answers/citations. The current [AI baseline](ai-baseline.md) records access limits and separate conventional retrieval; no AI visibility claim is supported.
5. Collect original dated installation records and publication permission before new project articles or manufacturer/warranty/performance claims. Clear, verifiable evidence is the material remaining content opportunity.
