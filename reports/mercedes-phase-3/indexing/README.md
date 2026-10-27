# Mercedes body-repair indexing investigation

**The slashless body owner is publicly eligible but remains “Crawled – currently not indexed” in fresh stored Search Console evidence. Its trailing-slash variant is indexed and Google-selected in a separate, older stored record. Variant convergence is unresolved; the cause of the slashless exclusion is unconfirmed.** The relevant page is server-rendered and linked internally. No canonical change, new URL, content replacement or indexing request is supported as an immediate remedy.

Read-only capture: **26 October 2026, 11:45:54–11:46:03 Asia/Dubai**. Twenty-three relevant pages were requested with GET and HEAD: 46 cases, 50 HTTP responses including the legacy-body follow-up and robots/sitemap. No transport errors occurred; every final response was 200. All raw headers, CF-Ray values, request times and GET bodies are in [the public capture](http/2026-10-26T07-45-54-376Z/capture.json). No application code, backend, Cloudflare setting, cache, sitemap or index state was changed.

## Confirmed public and source evidence

| Check | Current result | Interpretation |
|---|---|---|
| English body owner | Direct 200 at `/services/mercedes-body-repair-dubai`; HEAD also 200 | Relevant owner is reachable without a redirect |
| Title / H1 | `Mercedes Body & Accident Repair Dubai \| Digi-Tec` / `Mercedes Body Repair & Paintwork in Dubai` | Commercial Mercedes bodywork/paintwork intent is already explicit; preserve both |
| Canonical | Exactly one `https://digitecme.com/services/mercedes-body-repair-dubai` | Current declared preference is consistent with owner URL and sitemap |
| Robots | `index, follow, max-image-preview:large`; no X-Robots-Tag exclusion on GET/HEAD | No current indexing exclusion observed |
| robots.txt / XML sitemap | Both direct 200; applicable `User-agent: *` permits this path; exact owner in sitemap | No present robots/sitemap omission explains non-indexing |
| Initial HTML | One main, one H1; 778 main words, 23 paragraphs, four process steps and three FAQ answers | Content is present before JavaScript; not an empty app shell or homepage fallback |
| Slash form | Direct 200 with the same slashless canonical and matching main content | Existing duplicate form signals the same preference; no slash redirect change proposed |
| Legacy R2 URL | One direct 308 to this owner, then relevant 200 | Correct current consolidation signal; no indexing outcome is inferred |
| Live internal discovery | Five distinct contextual inbound pages in the bounded sample, plus Arabic language-switch link | Page is not orphaned in the observed graph |

The public comparison sample includes Arabic body, oil, mechanical, diagnostics and battery service pages; English oil/mechanical/diagnostics and the main Mercedes hub; the general bodywork page, BMW body page, G63 conversion article, service/brand indexes, homepage, About and HTML sitemap. Google's indexed status is a separate authenticated observation; a technically healthy Arabic comparator is not automatically described as indexed here.

## Google evidence: stored state versus current fetch

The root operator's fresh authenticated inspection was accepted only after the displayed inspected URL exactly matched `https://digitecme.com/services/mercedes-body-repair-dubai` and the canonical detail fields were expanded. Captured **26 October 2026 at 08:22:33.455Z / 12:22:33.455 Dubai**, it reports:

| Stored Google field | Exact observation |
|---|---|
| Overall/indexing state | URL is not on Google; Page is not indexed: Crawled - currently not indexed |
| Last crawl | 11 Oct 2026, 09:31:46; dashboard display timezone unverified |
| Crawled as / crawl allowed / fetch | Googlebot smartphone / Yes / Successful |
| Indexing allowed | N/A |
| User-declared canonical | N/A |
| Google-selected canonical | N/A |
| Sitemaps | Temporary processing error |
| Referrers | `https://digitecme.com/ar/services/mercedes-body-repair-dubai` and `https://digitecme.com/services/mercedes-body-repair-dubai/` |

The [accepted collector record](../search-console/indexed-observations.json), [exact-URL visible text](../search-console/indexed/body-slashless-verified-visible.txt) and [accessibility record](../search-console/indexed/body-slashless-verified-ax.txt) are retained by the root collector; this component's [body observation mirror](body-indexed-observation.json) records the accepted fields and evidence hashes without modifying collector files. The older Phase 2 readback had the same stored crawl/status; it is historical corroboration, not a second current crawl.

The three clocks must remain separate: October 11 is Google's displayed crawl time; October 26 at 11:45:54–11:46:03 Dubai is this component's public HTTP capture; October 26 at 12:22:33 Dubai is the fresh read of Google's stored report. The last recorded crawl precedes R2 activation on October 26 at 11:17. **The readback does not demonstrate Google recrawled the redirect or re-evaluated today's page.** It cannot establish that R2 caused non-indexing.

`N/A` is an unavailable recorded value, not a replacement canonical, proof Google chose another page, or evidence of a current missing canonical/noindex directive. The current public HTML supplies one correct canonical and index/follow. Likewise, the stored temporary sitemap-processing message is not proof the currently served sitemap fails: the current XML fetch is 200 and contains this owner. No sitemap rewrite or resubmission is proposed from that historical field alone.

Google describes this status as a crawled page that has not been indexed, with future inclusion uncertain; the definition supplies no specific content diagnosis and does not call for repeated resubmission. [Google's Page indexing report documentation](https://support.google.com/webmasters/answer/7440203?hl=en) supports retaining that distinction. The [URL Inspection documentation](https://support.google.com/webmasters/answer/9012289?hl=en) distinguishes stored index data from a live fetch and explains that even a successful live test cannot guarantee indexing or predict selected canonical. Redirects, declared canonical and sitemap are aligned signals, with different strengths; they do not force index inclusion. [Google's canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) supports preserving those signals. Primary guidance was reopened and verified during this update; concise supporting notes are in [primary-google-guidance.json](primary-google-guidance.json).

### Eight accepted indexed controls: material slash-variant finding

The root operator completed eight strict-URL indexed inspections between **12:19:17 and 12:26:21 Dubai**, then paused all GSC collection after a performance **429 Too many requests** response. No further canonical calls were made by this component. Other planned URLs remain unknown. The [structured comparator summary](indexed-comparator-summary.json) records exact observation times and raw-file hashes; [the table](indexed-comparator-summary.md) retains every inspected path and literal crawl date.

| Inspected owner/form | Stored result | Last crawl displayed | Google-selected URL versus declared preference |
|---|---|---|---|
| English body slashless | Crawled; currently not indexed | 11 Oct 2026, 09:31:46 | Both canonical fields N/A |
| English body with `/` | **Indexed** | **1 Jul 2026, 07:54:55** | Google: inspected **slash URL**; declared: slashless body owner |
| English oil slashless | Crawled; currently not indexed | 11 Oct 2026, 09:31:48 | Both canonical fields N/A |
| English oil with `/` | Indexed | 25 Sept 2026, 14:53:48 | Google: inspected slash URL; declared: slashless oil owner |
| English Mercedes hub | Indexed | 16 Oct 2026, 21:18:38 | Google: inspected hub; declared: same hub |
| English mechanical | Indexed | 11 Oct 2026, 09:31:46 | Google: inspected slashless owner; declared: same owner |
| English diagnostics | Indexed | 25 Sept 2026, 14:23:38 | Google: inspected slashless owner; declared: same owner |
| Arabic body | Indexed | 25 Sept 2026, 08:32:38 | Google: inspected Arabic owner; declared: same Arabic owner |

The body slash result was accepted at **08:24:32.987Z / 12:24:32.987 Dubai**. Its “Inspected URL” canonical means exactly `https://digitecme.com/services/mercedes-body-repair-dubai/`, including the final slash. The full raw report is [retained here](../search-console/indexed/body-slash-verified-visible.txt). Its old referrers include general bodywork, the former page sitemap and the broad Mercedes repair slash alias; those historical references must not be treated as current live anchors.

This evidence changes the diagnosis: **the entire English body topic is not absent from Google; the preferred slashless owner has not converged with an indexed slash variant in the observed stored records.** The analogous oil split is corroboration that variant ownership deserves separate evaluation; it does not prove the same cause. The body slash record is based on July's crawl, not today's HTML, so neither current quality nor post-R2 recrawl can be inferred from it. Keep both variants in any future query × page evidence to avoid losing measured activity under the indexed form. Preserve the present declared preference and deployed R2 while collecting a later ordinary-crawl record; a new slash redirect or canonical preference change would require a separate reviewed proposal and approval.

## Internal link graph and current source trace

The [live graph](live-internal-link-graph.json) records actual SSR anchor edges, labels and main-content placement, rather than counting mentions of a slug. Self-links and same-page anchors are excluded from inbound totals. Current direct contextual edges to the English body owner are:

| Source | Anchor / placement |
|---|---|
| Main English Mercedes hub | Mercedes-Benz Body Repair Learn more; service card in main |
| English Mercedes diagnostics | Mercedes-Benz Body Repair; other-services grid in main |
| English Mercedes mechanical repair | Mercedes-Benz Body Repair; other-services grid in main |
| English Mercedes oil | Mercedes-Benz Body Repair; other-services grid in main |
| HTML sitemap | Mercedes Body Repair in Dubai; main |

The Arabic body page adds an English language-switch edge, recorded separately from contextual links. Observed shortest paths are home → Mercedes hub → body, and services → Mercedes hub → body: **two anchor hops** in the bounded live graph. Header/footer navigation can contribute to such paths; this is crawlable HTML distance, not a measured user click-rate.

The [existing local prerender graph](local-prerender-link-graph.json) scans **1,256 index.html pages**, dated October 19. It has fifteen contextual inbound body edges (hub, thirteen Mercedes sibling services and HTML sitemap), plus the Arabic language-switch edge. It is a labeled older local build, not a newly built or complete current production crawl. No build was run. Its consistent service-grid pattern is corroborated by the fresh live pages and current source:

1. `src/App.tsx` maps the explicit Mercedes body owner to `BrandServicePage`, with fixed `canonicalPath`.
2. `src/pages/BrandServicePage.tsx` obtains the English-specific combo with `mercedesEnglishContent: !isArabic`.
3. `src/data/brandServices.ts` applies `MERCEDES_SERVICE_CONTENT[key]` last; `src/data/mercedesServiceContent.ts` supplies the actual English body title, H1, hero, process and FAQs.
4. `src/pages/BrandPage.tsx` maps the body service to `/services/mercedes-body-repair-dubai` and uses that path in its service-card anchors.
5. `BrandServicePage` uses the same canonical owner map for each sibling service's other-services grid.

The older `src/data/mercedesServices.ts` record contains stronger accident/paint/insurance wording and a star in an old title. That record is **not the current English owner content source**: the current route/override and captured SSR show the cautious bodywork assessment copy instead. Editing that older record would not be a justified indexing repair.

The general bodywork page currently has no direct Mercedes-body contextual edge in its main content. A separately reviewable, optional single-link patch closes that useful customer path. It is an incremental link improvement, not an orphan-page fix. The current body page already links to the general bodywork page, paint protection and the G63 conversion article; those relevant links are retained.

## Content relevance, originality and workshop proof

The body owner distinguishes panel repair/replacement, inspection of hidden components, paint preparation/blending, separately confirmed sensor/calibration scope, exclusions, finish/fit checks and photographs versus a final estimate. Its FAQs separate PPF and a G63 conversion from accident repair. This is useful customer scope information; replacing it with generic brand keywords, a longer word count or unsupported fixed prices is not justified.

Descriptive five-word-shingle similarity of main HTML is low relative to sampled alternatives: Jaccard 3.4% against general bodywork, 11.2% against BMW bodywork, 11.1% against English oil, 7.9% against mechanical, 6.3% against diagnostics and 0.3% against the hub. Header/footer are excluded; repeated model grids, process headings and CTAs remain in main. These statistics are not Google's duplicate classifier and do not rule out other sitewide duplication or quality concerns. They provide no evidence that this page is simply a copy of one comparator. Full calculations and shared paragraphs are in [content-analysis.json](content-analysis.json).

The body page's **only main image is the Mercedes logo**, also used as its schema service/primary image. It has no on-page body-repair job gallery, named technical reviewer, dated inspection findings or documented before/after repair result. That is a confirmed evidence gap, not a confirmed exclusion cause. Some currently healthy comparator pages also use only a logo; adding an image alone is not an indexing remedy.

The existing linked G63 conversion article has an actual workshop-project gallery. Visual inspection of `src/assets/g63-brabus-g800-side-preparation.jpg` confirms a blue G-Class with exterior components removed in a workshop scene; the published article labels it as a conversion. This does not prove an accident repair, structural result, sensor calibration or any repair guarantee. The general `car-body-repair-v2.png` shows close-up panel preparation but does not independently establish workshop location, vehicle identity, job history or provenance. Neither image is proposed as evidence of a completed Mercedes accident repair.

Google's [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) supports original, useful experience and accurate evidence. It supplies no preferred word-count target. A genuine operator-approved repair example would be more informative than invented testimonials, certificates or generic extra text; any such addition remains blocked on job evidence and consent.

## Hypotheses, limits and next decisions

| Candidate explanation | Evidence status | Decision |
|---|---|---|
| Present noindex / wrong canonical / missing sitemap / empty SSR page | Not observed; current public checks pass | Preserve current metadata and URL |
| No internal discovery | Contradicted by fresh actual inbound edges and old GSC referrers | Keep hub/service/sitemap links; optional relevant general-body edge only |
| Near duplicate of sampled body or Mercedes pages | Not demonstrated by sampled text comparison | No page merge or canonical switch proposed |
| Slash/slashless Google ownership differs | **Confirmed in stored records**: slash body selected/indexed from July, slashless excluded from October; both current forms declare slashless | Treat as unresolved canonical convergence; include both forms in performance analysis and compare later crawls before proposing another routing change |
| Legacy source signals / stale indexed assessment | Plausible: fresh readback still cites October 11, before R2, with historical legacy routing faults; no proof Google has processed today's redirect | Compare a later stored record with a newer crawl/canonical decision; preserve R2 and current owner; no indexing submission |
| Current sitemap failure inferred from GSC's stored processing field | Not established: current XML is direct 200 and includes this URL; indexed record still shows a temporary processing message | Retain both observations; inspect dated sitemap coverage/error evidence separately before proposing a fix |
| Insufficient specific experience or commercial differentiation | Plausible: limited original job proof, shared template scaffolding | Collect genuine bodywork evidence; do not state Google identified this as the reason |
| Google render issue, bot-specific response or intermittent edge behavior | Unresolved by this public-client capture | Read existing rendered crawl evidence if available; separate authorized visual/device checks |
| Competitive demand/authority or query ownership | Not established by this content review | Use properly paired query/page/country/device evidence from the separate GSC work |

This component's initial browser inventory was unavailable, but the root operator subsequently completed a separate read-only **desktop public-page render at 12:27:21.552 Dubai**. The [1272 × 6069 full-page screenshot](browser/body-rendered-desktop.png), [rendered accessibility tree](browser/body-rendered-desktop-ax.txt), [first FAQ expanded state](browser/body-faq-expanded-ax.txt) and [observation record](browser/observations.json) show relevant bodywork content, visible hero/final WhatsApp and call choices, and the first price-from-photos FAQ expanding to its inspection/quotation explanation. The screenshot was visually reviewed. The service main still contains only the Mercedes logo and no accident-repair job gallery. No contact link or form was submitted.

SSR semantics additionally have one H1/main, descriptive CTA links, all on-page anchor targets present and named FAQ buttons with expanded-state/control attributes. The blank header-mark alt is intentionally decorative inside `aria-hidden`, not an alt-text failure. **Mobile layout, keyboard navigation, complete accessibility/contrast conformance, Googlebot rendering and analytics/lead receipt were not tested.** Google documents its own screenshots as a live-test feature, so the stored indexed record is not a current Google rendered screenshot. No Test live URL or indexing action was invoked. Current-page desktop QA does not validate the unimplemented proposed patches; implementation-stage checks remain required after approval.

## Ready proposals and approval boundary

The [service proposal README](../proposals/services/README.md) contains two independent existing-page diffs: S1 improves the body enquiry draft and final CTA; S2 adds one contextual link from general bodywork to the Mercedes owner. Both preserve URL, title, description, H1, canonical, robots, schema and all repair-capability wording. Applicability and proposed TS/TSX syntax pass; source files remain unchanged. Their expected benefits are clearer enquiries and relevant navigation, with **unproven indexing/ranking impact**.

See [evidence-backlog.json](evidence-backlog.json) for conditions, qualitative impact, risk and verification. Application, build/release, publication, new claims/media, metadata/canonical changes, new pages, configuration work and indexing submissions remain outside this read-only investigation.

The root operator ran the final [offline integrity guard](final-integrity-guard-plan.md) at **12:30:45 Dubai**. Its [saved result](source-integrity-final.json) is **PASS**: all 283 protected sources, ten reviewed artifacts, four Phase 2A activation captures, the protected October 21 rule definition, Phase 2B full capture, original R4 failure body and three proposed-source checks remain unchanged. The tracked-status list still contains the same two pre-existing modifications. The guard made no HTTP/account requests and did not apply a patch or build the site.
