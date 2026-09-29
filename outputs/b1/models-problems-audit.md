# B1 Mercedes model and problem audit — before implementation

Date: 28 September 2026. Read-only source audit plus the root agent's `before-pages.json` and saved local prerendered HTML. These are local implementation baselines, not claims about Google indexing or a newly deployed site. No website files changed while preparing this audit. Keyword ownership must be mapped before implementation.

## Existing owners to preserve

All 21 English model/problem routes below have one H1, self-canonical metadata and no `noindex` in the saved local baseline. Approximate main-content word counts exclude the header/footer and are diagnostic context, not content targets. Collapsed FAQ answers may not contribute to prerendered text counts.

| Model | Existing owner | Main words | Specific assessment |
|---|---|---:|---|
| AMG G63 | `/blog/mercedes-g63-service-dubai-guide` | 1,023 | Strong M157/M177, driveline and coil-spring distinction. Preserve G63 owner and actual conversion-project link. Add deliberate non-AMG G-Class counterpart guidance. |
| Non-AMG G-Class | `/mercedes/models/g-class-service-repair-dubai` | 909 | Correct separate G500/G550 and older diesel scope. Differential-lock symptom currently links to an engine-warning article; target diagnosis/appropriate existing service instead. |
| AMG C63 | `/mercedes/models/c63-service-repair-dubai` | 946 | Distinguishes W204 V8, W205 V8 and W206 hybrid. Broad claim that all three use the MCT concept misses early W204 SPEEDSHIFT PLUS 7G-TRONIC. Verify/qualify electrical architecture; avoid indiscriminate 48V language. |
| C-Class | `/blog/mercedes-c-class-service-dubai-guide` | 926 | W204/W205/W206 and C200/C300 coverage; W205 optional air suspension properly qualified. Needs clear C63 counterpart boundary and non-AMG gearbox wording. |
| AMG E63 | `/mercedes/models/e63-service-repair-dubai` | 905 | Distinguishes W212/W213 engines and AMG transmission/chassis needs. Preserve as AMG owner; connect to E-Class without implying equivalence. |
| E-Class | `/blog/mercedes-e-class-service-dubai-guide` | 944 | Good W212/W213/W214 and coupe/cabriolet caveats. Add useful E-Class audio-upgrade versus head-unit-repair route distinction if supported by mapped intent. |
| S-Class | `/blog/mercedes-s-class-service-dubai-guide` | 938 | Good W221/W222/W223, suspension and luxury-electronics scope. Related Maybach/S63 paragraph currently includes an S-Class self-link. Needs clear S63 separation and context for existing infotainment repair owner. |
| AMG S63 | `/mercedes/models/s63-service-repair-dubai` | 905 | Good W223 hybrid caution and generation-specific engine coverage. Related model paragraph includes an S63 self-link. Earlier S63 chassis and transmission generalisations deserve qualification to exact equipment. |
| GLE | `/mercedes/models/gle-service-repair-dubai` | 961 | Strong W166/W167, transfer-case, tyres, suspension and electrification differentiation. Add deliberate GLS relationship; avoid treating every E-ACTIVE concern as purely AIRMATIC. |
| GLS | `/mercedes/models/gls-service-repair-dubai` | 924 | Strong X166/X167, load, rear climate and 4MATIC coverage. Deliberate GLE relationship useful; retain AMG/Maybach compatibility caveats. |

Four `/blog/` model owners are deliberately resolved to `MercedesModelPage` only in English through `BlogArticleRouter.tsx`. They are commercial model owners despite the inherited path. Do not migrate them or edit the stale English blog source records to change the active English page.

| Problem owner under `/mercedes/problems/` | Main words | Current repair destination / specific opportunity |
|---|---:|---|
| `airmatic-malfunction` | 792 | Suspension. Preserve warning-versus-component distinction; link semantically to overnight drop. |
| `suspension-dropping-overnight` | 766 | Suspension. Preserve measured leak-down explanation and compressor-as-consequence caveat; explicitly account for optional C-Class air suspension when mentioning coil-spring models. |
| `gearbox-jerking` | 743 | Transmission. Strong engagement/shift/shudder distinctions and correct multiple AMG gearbox families; pair with slipping. |
| `transmission-slipping` | 715 | Transmission. Good ratio-slip and recovery advice; pair with jerking, with no automatic replacement diagnosis. |
| `check-engine-light` | 688 | Diagnostics. Preserve steady/flashing distinction and code limitations; relate to appropriate overheating/no-start symptoms. |
| `engine-overheating` | 694 | Mechanical plus diagnostics. Good cooling-circuit and fan/airflow explanation; connect to weak AC where shared airflow is discussed. |
| `ac-not-cooling` | 673 | AC. Good idle/moving, zone, refrigerant and leak distinctions; connect to overheating where appropriate. |
| `oil-leak` | 679 | Mechanical. Good fluid/source distinction; preserve no blind parts replacement. |
| `wont-start` | 868 | Diagnostics, electrical, battery. Already has six useful starting-pattern cards and five unique FAQs; preserve its recently expanded detail and battery-warning cross-link. |
| `battery-warning` | 682 | Electrical plus battery. Good 12V/auxiliary/48V distinction; map warning diagnosis separately from battery replacement, and pair with no-start. |
| `/mercedes/problems` index | 626 | Navigation owner. CollectionPage, BreadcrumbList and ItemList already match its purpose. Replace public SEO terminology with helpful navigation language. |

## Arabic model pages already present

The four `/ar/blog/mercedes-{g63,c-class,e-class,s-class}-service-dubai-guide` routes are real Arabic pages, not new-route opportunities. They use `BlogPost` and the four corresponding records in `src/i18n/ar-model-blog-content.ts`; each contains four short model-specific sections. Baseline words: G63 378, C-Class 360, E-Class 353, S-Class 354. Each has one Arabic H1, self-canonical, ItemPage/BlogPosting/BreadcrumbList, `inLanguage: ar-AE`, and existing `noindex: true`.

Preserve that locale and indexing policy. No new Arabic model/problem routes. The shorter Arabic adaptations omit much of the English generation detail and family/AMG boundary; inherited English `keywords` metadata is also present. Copy refinement should be limited to the four existing Arabic records only if delegated, because their source file is shared with other brands. Root owns shared renderer and locale decisions.

## Renderer and link findings

1. `MercedesModelPage.tsx` selects related models by same AMG flag and first three array entries. This misses direct C-Class/C63, E-Class/E63, S-Class/S63 and G-Class/G63 counterpart explanations, and GLE/GLS neighbours. Curated existing paths should replace incidental array order.
2. A special paragraph for S-Class/S63/GLS creates self-links on S-Class and S63. Use deliberate related-model content and exclude the current path.
3. All ten model pages already emit WebPage, BreadcrumbList and Service. Four visible model FAQs each are present, but no FAQPage is emitted. Adding schema generated from those same visible questions is a parity improvement, not a guarantee of a Google rich result.
4. All model WebPage nodes hardcode `dateModified: 2026-09-08`. Model-specific content dates should reflect an actual substantive revision, without altering route-policy infrastructure. Problem pages already support an optional per-guide date; only no-start currently overrides the 31 August publication date with 14 September.
5. Model page public copy exposes `Commercial service pages for the diagnosed need` and informational/commercial distinctions. Problem sidebar says `Related commercial service`; footer says `Continue through the Mercedes knowledge cluster`. Index also explains `commercial repair intent`. Replace with plain customer-facing language, while preserving the underlying ownership separation.
6. Problem page links to previous/next array entries are not semantic relationships. Curate the useful symptom pairs listed above rather than copying links across every article.
7. Problem short-answer heading is generic on nine articles; only no-start has dedicated answer cards. Where keyword mapping shows specific variants, add concise symptom-specific answer content, not repetitive boilerplate FAQs. Its existing answer-card heading is hardcoded to starting, so future non-start cards need a data-driven heading.
8. English model main content already contains six relevant system service links, model-specific service cards, symptom guides, and booking CTAs. Do not add a dense all-services list. Add head-unit repair/audio upgrade only where the model content supports that choice; routine planning can refer to existing maintenance/interval/cost guides without broadening their intent.
9. C-Class, E-Class, S-Class and G-Class reuse AMG vehicle illustrations with broadly worded alt text. This is a content presentation caveat, not evidence of an H1, canonical or indexing defect. Avoid claiming those illustrations document an actual customer repair.

## Case studies and evidence limits

`src/data/mercedesCaseStudies.ts` currently exports an empty array. Its dedicated renderer has Article, breadcrumb and one H1, but there are no published dedicated Mercedes case-study records to optimise. Do not fabricate vehicles, fault codes, diagnoses, outcomes or photos. The existing G63-to-Brabus conversion blog link is an actual published project record and remains distinct from an invented repair case.

## Confirmed technical source for later correction

Mercedes-Benz's archive identifies the original 2007-series C63 as SPEEDSHIFT PLUS 7G-TRONIC; Mercedes-Benz USA describes that transmission family as using a torque converter. This supports qualifying the current blanket W204-MCT sentence. The 2018 manufacturer release identifies the later C63 MCT 9-speed and wet start-off clutch. Use exact-generation wording and retain VIN/equipment checks.

- [Original C63 manufacturer archive](https://mercedes-benz-publicarchive.com/marsClassic/en/instance/picture/C-63-AMG-Estate---S-204.xhtml?oid=34580684)
- [Mercedes-AMG transmission distinctions](https://www.mbusa.com/en/amg/performance/transmissions)
- [2018 Mercedes-AMG C63 manufacturer release](https://media.mbusa.com/news/the-new-mercedes-amg-c-63-models)

## Proposed bounded implementation after keyword-map confirmation

Owned website files only: `src/data/mercedesModelPages.ts`, `src/data/mercedesProblemGuides.ts`, `src/pages/MercedesModelPage.tsx`, `src/pages/MercedesProblemGuidePage.tsx`, `src/pages/MercedesProblemsIndex.tsx`. Leave empty case data and renderer untouched unless an actual sourced case is provided. No new URLs, no route/canonical/noindex/locale changes, no shared component edits, no sitemap/robots/B0-A changes, no commit/push/deploy. Use mapped measured and generated keyword labels honestly; preserve the substantial existing unique content and add only justified model-specific improvements.
