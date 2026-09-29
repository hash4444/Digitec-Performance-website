# B1 Mercedes SEO implementation — local review

Completed 28 September 2026. The existing Mercedes cluster has been optimized in the local checkout. **Nothing was committed, pushed or deployed.** HEAD remains `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`.

The supplied B1 request ends mid-sentence in Step 14. This implementation covers the complete instructions supplied through that point. The earlier B0-A and B0-B decisions, original keyword workbook and existing uncommitted work were preserved.

## What changed

| Page group | English pages reviewed | Existing Arabic pages reviewed | Result |
| --- | ---: | ---: | --- |
| Mercedes hub | 1 | 1 | Broad service/repair/workshop intent retained. Clearer XENTRY capability, separated AC and engine-overheating paths, complete service/model navigation and links to five distinct planning guides. |
| Commercial services | 16 | 14 | Fourteen existing repair/service owners plus English head-unit and audio pages. Added specific diagnostic scope, symptom sections and deliberate links. Arabic services now have individual content, metadata and FAQs. |
| Model pages | 10 | 4 | Generation/equipment distinctions, standard versus AMG boundaries, semantic related models and model-specific planning. Existing blog paths retained. |
| Problem guides and index | 11 | 0 | Ten specific symptom answers, meaningful related guides, next-step service links and matching FAQ data. Existing index remains a collection. |
| Ownership/service guides | 5 | 5 | Separate interval, cost, oil-provider selection, maintenance-planning and warning-overview purposes. |
| **Primary scope** | **43** | **24** | **67 existing pages reviewed; 64 changed.** |

The English oil-change, diagnostics and suspension service pages already had distinct, substantial content. Their existing metadata and body scope were retained after review. All other primary pages received content, navigation, metadata or schema improvements as appropriate; titles were not changed merely to make every row look edited.

Two related English guides—7G/9G/ZF transmission servicing and air-suspension repair—received qualified technical wording and appropriate generic/Mercedes onward links. Their existing Arabic counterparts were checked and retained. Fifteen directory or related-article surfaces automatically reflect updated Mercedes article names, summaries or dates; their own primary metadata remains unchanged. No unrelated service owner was repurposed.

## Keyword evidence and ownership

The keyword-to-owner checkpoint was completed before source edits:

- **1,918 source observations**, representing **721 raw / 668 normalized keyword strings**.
- All **456 Mercedes records in the workbook Master sheet** included.
- **1,327 original GSC observations**, **218 measured workbook observations**, **327 generated taxonomy records** and **46 research records** kept distinct.
- All **218 measured workbook observations match the latest original GSC metrics**. Source records retain file, sheet/row, period, raw query and metrics.
- **39 existing primary owners**, zero normalized-query ownership conflicts and **zero new URLs** proposed.
- The six-month export contains 119 Mercedes/system/Arabic query rows with **18,056 impressions and 44 clicks**. A generic head-unit query with 170 impressions is separate context. Overlapping exports, workbook duplicates and time windows are not added together.

Earlier exports contain small measured model cohorts absent from the later top-1,000 query subset. These support improving existing model pages; they do not justify new pages. Missing-symptom work distinguishes observed demand from strategic coverage rather than inventing impressions or search volumes.

Evidence: [keyword owner map](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/keyword-owner-map.md), [all source records](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/keyword-owner-records.csv), [keyword QA](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/keyword-qa.json), [22 symptom coverage decisions](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/keyword-symptom-coverage-decisions.md).

## Important content decisions

- Engine shaking, rough idle, smoke, coolant loss and confirmed mechanical repair stay within the mechanical page. Unexplained reduced power and coding questions lead to diagnostics. Steering vibration, brake noise, camera faults and repeated battery drain use their existing repair owners.
- Head-unit fault repair stays separate from audio upgrades. Camera supply/wiring diagnosis is not automatically a screen replacement. COMAND/MBUX and retrofit functions remain vehicle-specific.
- Service A/B scope stays on the hub; engine oil booking stays on the oil page; ASSYST timing stays in the interval guide; cost comparisons stay in the cost guide.
- The maintenance guide now explains records, condition, storage, due work and repair priorities. It uses Article and FAQ markup instead of presenting itself as another repair service page.
- All ten models keep their owners. C-Class is separate from C63, E-Class from E63, S-Class from S63, and G-Class from G63. Maybach remains separate. W204 C63 gearbox and S63 suspension generalizations were corrected using manufacturer material.
- DIGI-TEC's user-confirmed XENTRY capability is stated clearly. Coding, programming, adaptation and module access remain qualified by the exact vehicle and supported function. No universal intervals, fixed repair prices, failure rates, unrestricted access or guaranteed outcomes were added.
- FAQs use each page's actual questions. Mercedes hub/model/problem/maintenance accordion answers are now present in initial HTML and remain expandable in the browser. Existing schema claim filtering remains unchanged; every emitted FAQ matches rendered content, although not every visible FAQ is emitted by that filter.
- No fictional case study was created. The dedicated case-study dataset is empty; existing real project links remain.

Technical references and scoped detail: [source notes](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/technical-sources.md), [model/problem report](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/models-problems-implementation.md), [guide report](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/guides-completion.md).

## URL and B0-A preservation

The site still has **1,247 public routes and 996 indexable sitemap URLs**. Every existing route's canonical, indexability, language availability and route family matches the saved baseline. No redirect, removal, consolidation, new Arabic route or noindex change was introduced. The four existing Arabic model articles remain noindex.

Fourteen of the fifteen B0-A implementation files are byte-identical. The generated `cloudflare/routing-response-data.js` differs only in rebuilt JavaScript/CSS filenames embedded in the 404 HTML; its valid paths, legacy paths, localized fallbacks and 404 content are otherwise identical. B0-A/B0-B reports and the original ownership map are unchanged.

Sitemap modification dates were updated to 28 September only for the **66 substantively edited primary/supporting pages**. The route-manifest edit is a date overlay, not a routing change. Build-generated validation artifacts were refreshed; pre-build copies are retained under `outputs/b1/generated-before`.

## Verification

| Check | Result |
| --- | --- |
| TypeScript | Pass for application and Node projects. |
| Production build | Pass, including all existing routing, SEO, protection, contact-attribution, oil, suspension, transmission and social-metadata validators. |
| All-route comparison | 1,247 routes; zero route/canonical/noindex/language-policy regressions. |
| B0-A response tests | 1,247 valid pages, 37 negative GET/HEAD cases, 94 localized redirects, 99 Mercedes aliases, 253 preserved legacy paths and 6 origin passthrough cases pass. |
| Cluster rendering | 67 primary + 4 supporting-guide pages checked; one H1, expected canonical, distinct primary titles/descriptions/H1s and no new broken links or fragments. |
| FAQ and links | 214 emitted FAQ pairs present in rendered HTML; 3,387 valid internal links across reviewed pages. |
| Title review | 105 Mercedes/model/adjacent-title pages audited. Separate Maybach, valuation, tuning, conversion and V-Class purposes retained. |
| Guide isolation | 14 guide routes and 14 unrelated article controls pass; all 14 control HTML hashes unchanged. |
| Browser | 48 desktop/mobile route checks, 12 matching FAQ expand/collapse checks, 2 navigation journeys and 6 no-JavaScript HTML checks pass. Four additional final-copy smoke checks pass. No runtime/hydration errors or horizontal overflow. |
| Visual review | Desktop hub/model and mobile Arabic service/maintenance/problem screenshots inspected. |

The sandbox initially blocked Vite's parent-directory reads. The permitted local build was rerun with broader filesystem access and passed. These are local build and browser results, not a production deployment or post-release ranking measurement.

Detailed evidence: [rendered verification](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/verification.json), [B0-A regression results](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/routing/routing-tests.json), [browser results](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/browser/verification.json), [final browser smoke](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/browser/final-copy-verification.json), [guide QA](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/guides-rendered-qa.md), [build log](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/build.log).

## Review files

- [Before/after metadata, H1s and dates](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/metadata-review.csv)
- [All Mercedes and adjacent title audit](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/all-mercedes-title-audit.csv)
- [B1-only source patch against the saved working-copy baseline](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/b1-only-source.patch)
- [Changed-page inventory](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/changed-pages.json)
- [Related-card and directory propagation](C:/Users/ADMIN/Documents/ChatGPT/DIGITEC/outputs/b1/shared-reference-diff.json)

The local checkout and fresh build are ready for review. Deployment remains outside this request.
