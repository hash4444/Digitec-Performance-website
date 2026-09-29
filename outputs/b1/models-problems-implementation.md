# B1 model and symptom implementation

Completed locally on 28 September 2026, after the keyword-owner-map checkpoint. No new routes, route-policy changes, Arabic indexing changes, commits, pushes or deployments were made by this subtask.

## Changed scope

- `src/data/mercedesModelPages.ts`: all 10 existing English model owners retain their URLs, H1s and existing unique system sections/FAQs. Added individual scope notes, standard-model/AMG comparisons, deliberate related-owner links and model-specific planning context. C240 and E200 demand is covered within the existing C-/E-Class owners. C-/S-Class electronics point to head-unit repair; E-Class upgrade context points to the existing audio-upgrade owner. Added actual modification dates. Corrected original W204 C63 transmission generalisation; removed unverified blanket W206 48V language; qualified S63 air/hydraulic suspension and gearbox equipment.
- `src/pages/MercedesModelPage.tsx`: FAQ schema comes from the visible model FAQ data; semantic model links replace incidental array order; self-links removed; data-driven scope/planning content rendered. Removed customer-facing SEO terminology and unqualified “common concern” heading.
- `src/data/mercedesProblemGuides.ts`: all 10 existing symptoms now have distinct direct-answer headings and answers, semantic related symptoms, and substantive revision dates. Existing detailed diagnostics, driving advice and unique FAQs preserved. Clarified dashboard-warning versus engine-light intent and optional C-Class air suspension. Battery-warning diagnosis links to diagnostics as well as electrical/battery owners. Reworded the no-start scan FAQ to avoid a tool-brand name that the existing schema filter excluded; all five visible questions now match the schema.
- `src/pages/MercedesProblemGuidePage.tsx`: renders specific answers, semantic related guides and plain inspection/repair language. Existing Article/FAQ/breadcrumb architecture retained.
- `src/pages/MercedesProblemsIndex.tsx`: retains navigation/CollectionPage ownership; clearer symptom selection and inspection guidance, current revision date.
- `src/i18n/ar-model-blog-content.ts`: only the four existing Mercedes G63, C-Class, E-Class and S-Class records changed. Expanded Arabic model/generation and AMG boundaries, practical inspection content and links to existing Arabic service owners. All other brands' records compare unchanged against the saved baseline.

The shared `BlogPost.tsx` and `ar-blog.ts` link/date changes were coordinated with the intent-review agent, not edited by this subtask. Arabic head-unit/audio specialist URLs do not exist in the baseline owner inventory; Arabic model content therefore uses real electrical/diagnostics owners. The English head-unit/audio destinations remain distinct. All four Arabic model pages retain existing `noindex: true`, self-canonicals, Arabic text and Article schema. No Arabic model/problem routes were created.

No dedicated Mercedes case-study record was added: the existing data array is empty and no new real diagnostic record was supplied. The published G63 conversion-project link remains.

## Evidence-based corrections

- Original W204 C63: manufacturer archive identifies SPEEDSHIFT PLUS 7G-TRONIC. The manufacturer's transmission explanation distinguishes its torque converter from MCT. Later C63 generation wording now identifies the transmission before service instead of calling every W204 an MCT. [Mercedes archive](https://mercedes-benz-publicarchive.com/marsClassic/en/instance/picture/C-63-AMG-Estate---S-204.xhtml?oid=34580684), [Mercedes-AMG transmission distinctions](https://www.mbusa.com/en/amg/performance/transmissions), [2018 C63 release](https://media.mbusa.com/news/the-new-mercedes-amg-c-63-models).
- S63: suspension is not uniformly pneumatic across body styles and generations. The manufacturer's W221 manual covers ABC, and its 2014 coupe release distinguishes AIRMATIC and MAGIC BODY CONTROL by drivetrain. Copy now requires identifying fitted air or hydraulic hardware. [W221 official manual](https://static.oneweb.mercedes-benz.com/css-oom-assets/en-bh/pdf/mercedes-s-class-saloon-2009-w221-owners-manual-01.pdf), [2014 S63 Coupe manufacturer release](https://media.mercedes-benz.fr/nouvelle-s-63-amg-coupe/).

## Verification and limits

`models-problems-render-check.json` records 25 successful local SSR checks: 10 English models, 10 individual symptoms, the problem index and four Arabic model articles. Each has one H1, its preserved canonical and expected indexing setting. Internal page links resolve to baseline owner paths or existing public assets. All 40 model FAQs and 32 symptom FAQs exactly match their schema questions/answers. Arabic modification dates are 28 September, and only the four delegated Arabic records changed.

ESLint passed for all six owned website files. The first application TypeScript check passed; a later integrated check encountered a concurrent root-owned `BrandServicePage.tsx` import of an as-yet-unexported `MERCEDES_ARABIC_RELATED_CONTENT`. That cross-file work is being finished by the root agent and is outside these six files. The final integrated build/typecheck is owned by root.

Vite's ad hoc SSR run emitted a Windows dependency-optimizer access warning, while all route renders and assertions completed successfully. Root's production build and final browser checks remain the authoritative integrated verification. These local results are not deployment or Google-indexing claims.
