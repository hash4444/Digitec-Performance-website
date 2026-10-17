# PPF Phase 2 SEO ownership, GEO and installation-evidence plan

Prepared 17 October 2026, Asia/Dubai. Research and edits are local. No page, account, ad, production route, database or enquiry was published or changed.

## Outcome and Phase 1 boundary

Keep the established PPF service, paint-protection choice hub and coating-versus-film article. The six requested expansion clusters do not justify six new landing pages: cost and coverage already have substantial sections on the commercial PPF owner; care can be improved there; comparison already has a bilingual article. Matte/satin availability and four vehicle installation stories require evidence before publication.

The complete candidate register is [seo-expansion-matrix.csv](seo-expansion-matrix.csv). Every row identifies intent, primary/secondary keywords, intended customer, existing DIGI-TEC competitors, proposed URL/title/H1, links, factual requirements, available evidence and a publish/draft/reject decision. “Publish now” means content is suitable for the separately authorized production release; nothing has been published. Draft decisions are internal editorial concepts, not completed or public articles. Rejected/candidate URLs are illustrative proposals only and were not added to routing, links or sitemap.

Read Phase 1's report at `docs/seo/ppf-phase1-2026-10-17.md`, its baseline technical/ownership findings, source manifest, metadata and verification evidence. Current branch is `main`; HEAD remains `5461e2c0f28c006f45196f6d9a7f4dcf312f464c`. Phase 2 baseline's `phase1-comparison.json` reports 571 tracked Phase 1 build inputs and no subsequent changes to those inputs at capture. The working tree already contains Phase 1 and unrelated uncommitted work. Git diff against HEAD alone therefore does not isolate Phase 2. Use `outputs/ppf-phase2-2026-10-17/baseline/source/` for this phase's source comparison; preserve earlier work.

Phase 1's 1,248 local verification checks, 1,256 prerendered routes and 1,005 sitemap URLs are historical local evidence for its captured source fingerprint. They must not be relabelled as Phase 2 results. Root owns the fresh Phase 2 build, browser, analytics and release QA. Its live alias/Worker blocker remains separate from the content decision: good local HTML and redirect logic do not prove the production Worker executes.

## Search ownership and expansion decisions

| Cluster | Current owner and decision | Reason / evidence gate |
|---|---|---|
| A. Cost and quotation factors | Keep `/services/paint-protection-film#ppf-cost`; reject a second general cost article now. | Current section already itemizes vehicle shape, coverage, film/finish and paint preparation and explains same-scope quote comparison. Confirmed business policy is quotation-based; publish no prices. |
| B. Full-body vs partial-front | Keep `/services/paint-protection-film#ppf-coverage`; reject a second general coverage article now. | Existing cards and full-body/partial explanation cover panels, exclusions and visible boundaries. Full-front remains subject to confirmation and must not silently become an offered fixed package. |
| C. Care and aftercare | Improve existing EN/AR owner now; hold standalone guide until installed products and workshop care handout are verified. | A record-keeping checklist is useful without prescribing an unverified product, wash interval, chemical or repair procedure. A later guide can serve a distinct after-sales support task. |
| D. Film vs coating | Retain `/blog/ceramic-coating-vs-ppf-dubai` and Arabic counterpart; reject an alternate slug reversing the keyword order. | Article is already informational, includes preparation/care/limitations and links to both commercial owners. Broad hub remains the three-way PPF/coating/correction decision owner. |
| E. Matte/satin | Draft concept only; no new route or availability wording. | Manufacturer products establish that these finish types exist generally. They do not establish DIGI-TEC's offered product, finish, compatibility or result. |
| F. G-Class, 911, Urus, Range Rover | Four evidence-gated project concepts; reject generic model-name service-page templates. | No verified PPF project records are supplied. First publish an original project card within the existing owner when evidence is complete; a separate article is warranted only by substantial unique details. |

The primary service still owns PPF Dubai, paint protection film Dubai, car PPF Dubai, PPF installation Dubai and full body PPF Dubai. The broad hub owns ambiguous protection selection, and the article owns PPF-versus-ceramic education. Coating and safely correctable paint defects retain their existing service owners. Existing Arabic equivalents retain the same intent relationships; no unsupported Arabic polishing route is proposed.

These are editorial assignments based on actual content and the brief's historical observations. No current Keyword Planner volume/CPC, authenticated GSC query-by-page evidence, backlinks, qualified-lead distribution or ranking forecast was available. The supplied historical impressions must not be added to overlapping prior exports or treated as proof of cannibalization. Research confirms relevance and evidence needs, not a guaranteed search opportunity size.

## Current primary-source research

Manufacturer sources below support general explanations only. They are not evidence that DIGI-TEC installs those brands or receives their warranties, supplies their finishes or has an installer relationship. No supplier names, specifications, fixed timings or prices were inserted into customer-facing copy.

| Source reviewed | What it supports | Limit on use |
|---|---|---|
| [3M auto-film support FAQ](https://www.3m.com/3M/en_US/car-personalization-us/support/) | Vehicle size, coverage and selected film affect installation cost; a tailored quote is more appropriate than a universal figure. | Do not import 3M installer status or treat a US manufacturer page as Dubai price evidence. |
| [3M coverage options](https://www.3m.com/3M/en_US/p/c/films-sheeting/surface-protection-materials/films/i/automotive/post-factory-installations/) | Partial, full-front and full-vehicle coverage are meaningfully different choices. | Manufacturer package examples do not define DIGI-TEC's included panels or establish full-front availability. |
| [XPEL product care](https://www.xpel.com/product-care) and [3M PPF FAQ, revision A](https://multimedia.3m.com/mws/media/2398297O/3m-paint-protection-film-faq.pdf) | Care instructions are tied to the particular product. The reviewed instructions use different first-wash periods, reinforcing the need to obtain the installed film's instructions. | No generic number, solvent, self-healing procedure or pressure-washing specification should be prescribed for an unknown installed film. |
| [3M EMEA installation/warranty record](https://multimedia.3m.com/mws/media/2427338O/3m-paint-protection-film-3m-protection-wrap-film-warranty-document-emea.pdf) | A film installation record identifies film type and installation date, supporting practical record-keeping advice. | Its terms do not establish DIGI-TEC's product or warranty entitlement; customers are asked for any actual written terms. |
| [Gtechniq comparison FAQ](https://gtechniq.com/faqs/about-gtechniq/) | Broad distinction between a physical film barrier and coating's surface-care role; decision depends on intended use. | Do not copy product thicknesses, lifespan ranges, guarantees, brand compatibility or sweeping performance language into DIGI-TEC copy. |
| [LLumar Platinum Matte](https://llumar.com/en/paint-protection-film/platinum-matte/) | Matte film can have a different visual purpose from gloss film; product availability is region-dependent. | Existence of a product is not evidence that DIGI-TEC offers matte/satin installation. |

The inference from the care sources is deliberately narrow: obtaining the actual installed-film record and instructions is more trustworthy than choosing one manufacturer's schedule for every car. The new text is original customer guidance and does not reproduce those manufacturers' procedures.

## Local content implementation

Only two source files were changed by this agent:

| File | Phase 2 addition | Preservation |
|---|---|---|
| `src/pages/PpfPage.tsx` | Existing care section gains “Keep your installation and care records” and one paragraph asking for film name, installation date, covered panels, product-specific care/first wash, agreed scope and any written terms. | Phase 1 H1/title/description, design classes, CTA/form, 14 FAQs, graph and routes unchanged. |
| `src/i18n/ar-protection-services.ts` | Arabic PPF `extraSections` gains the equivalent “احتفظ بسجل التركيب والعناية” paragraph. The original was saved to Phase 2 baseline/source before editing. | Existing Arabic route, language switching, RTL template and four FAQs preserved; no additional offer or product claim. |

`src/data/ppfContent.ts` was inspected and left unchanged. The cost section's four-factor definition list and scope-comparison paragraph already answer the current task; another repeated checklist was unnecessary. No route, image, sitemap, robots, structured-data type, dependency, backend, case-study record or film-specific claim was added by this agent. Root's form/attribution edits are separate Phase 2 work.

Fresh initial HTML must show both handover paragraphs after the build, preserve unique owner metadata and retain disabled pre-hydration form controls. Root's Phase 2 QA evidence is authoritative for the final source state; this report does not mark those pending checks passed in advance.

## GEO and crawlable entity audit

Google's current [AI-features guidance](https://developers.google.com/search/docs/appearance/ai-features) says its existing search fundamentals also apply to AI Overviews/AI Mode; there is no special AI schema or new machine-readable file requirement. Useful crawlable text, discovery links, visible/schema consistency and accurate business details are the appropriate focus. Eligibility does not guarantee crawling, indexing or appearance. That Google-specific guidance does not establish inclusion in ChatGPT or Gemini.

| User question | Current crawlable answer / entity support | Phase 2 treatment |
|---|---|---|
| Who is the provider? | Public DIGI-TEC brand and independent-workshop description; Phase 1 adds confirmed legal name to the shared Organization. | Retain `https://digitecme.com/#organization`, `/#business` and `/#website`; do not create a second PPF business entity. |
| Where does it operate? | Existing records identify Al Quoz Industrial Area 3, Warehouses 11–15, Dubai and the established telephone. | Treat this as the existing workshop record. Confirm a distinct PPF facility, entrance pin and current hours before making more precise claims. |
| What service is confirmed? | PPF installation, with existing full-body, partial-front and selected-panel scope and preparation agreed for the vehicle. | Keep Service provider reference `/#business`, canonical service URL and actual breadcrumb path. Full-front is an enquiry subject to confirmation. |
| What is required for a quote? | EN/AR form asks make, model, year, coverage/Unsure, name, preferred reply method/details and optional notes; privacy notice explains WhatsApp handoff. | Retain the distinction between an editable draft, sent message, received enquiry and confirmed booking. Attribution changes are owned by root. |
| What can PPF generally do? | Initial HTML explains replaceable physical film on covered panels and reduction of some stone-chip damage/minor abrasion. | General education remains qualified; it is not an installed-product specification. |
| What is not guaranteed? | Explicit limits: film does not repair defects or prevent every chip/scratch; service life, finish, care and terms depend on product/scope. | Preserve these limitations and product-specific instructions; no unverified brand, self-healing, UV, thickness or warranty claims. |
| How can a customer contact the business? | Established WhatsApp and telephone links plus structured quotation handoff. | Preserve +971 4 340 2223 integration. Neither number ownership/delivery nor real lead receipt is proven by a local button test. |
| What proves installation experience? | Existing photographs are descriptive, with workshop photo expressly not presented as PPF coverage evidence; verified project registry is empty. | Collect original job evidence below. Do not label general workshop/ceramic/conversion photos as PPF projects. |

The Phase 1 graph already uses WebPage, Service and BreadcrumbList, referencing the shared AutoRepair/AutomotiveBusiness entity. Main PPF's omission of FAQPage is optional and intentional in the retained validator. It is not an indexing defect; adding schema cannot substitute for useful visible information or make a commercial provider eligible for guaranteed FAQ rich results. No new Product, price Offer, Review or AggregateRating is justified by this evidence.

The current site's explicit AI crawler groups predate Phase 1; no new ones are proposed. Keep protected endpoints and existing robots restrictions. Production crawl access also depends on the actually executing hosting/CDN rules, which requires root's release-blocker review and later authorized production QA.

## Original project evidence: four candidates

Repository check: `verifiedProtectionProjects` in `src/data/paintCareProjects.ts` is empty, and `ProtectionProjects` displays only records marked verified with evidence. Searches of local source/docs and the public DIGI-TEC domain for PPF plus the four models found general brand/service/paint-care references, not a verified dated model-specific PPF job. Search non-discovery is not proof that the business has never completed such work; it means publication evidence is missing here.

| Candidate | Evidence seen | What must not be inferred | First useful publication if verified |
|---|---|---|---|
| Mercedes-Benz G-Class / G63 | Existing G-Class/G63 service owners, a different G63 exterior conversion case, and a G-Class ceramic-page image. | Body conversion or a reflective paint photo does not establish PPF installation. | A real coverage/preparation/edge-detail project card; article only if there is a unique documented task. |
| Porsche 911 | Porsche brand/model owners and a generic white-Porsche bonnet film photograph. | A Porsche badge or bonnet image does not verify 911 generation, job date, film, installer, coverage or customer result. | Exact-model project card supported by job record and original process photographs. |
| Lamborghini Urus | Existing Lamborghini PPF enquiry links and Urus maintenance guide. | Ability to discuss a Lamborghini PPF enquiry does not establish a completed Urus installation. | A real large-SUV panel/scope project with distinct installation detail and limits. |
| Range Rover | Broad Range Rover service/PPF references and model-specific service guides. | Generic Range Rover coverage cannot prove a particular model/generation/finish project. | An exact-model job showing agreed panels and original finish/edge evidence. |

For each candidate, collect a private evidence pack before writing public project prose:

1. Job identifier and date; exact model/year/generation and original/repainted/matte finish where relevant.
2. Actual work order: covered panels, exclusions, preparation and any removal; selected product/finish verified from the job, with supplier documentation retained privately.
3. Original, dated installation and finished-panel images showing the task, including edge/partial-panel detail; rights and customer/vehicle permission. Remove personal data and identifying plates where appropriate.
4. Workshop-reviewed account of the starting condition, agreed work, observations at handover and limitations. Customer quotes or measured results require their own evidence; no generic claims of improved resale value or perfect protection.
5. Actual care sheet and written commercial terms for that job. Avoid publishing private invoices, customer details, VINs or irrelevant pricing.

Prefer one verified card inside the commercial owner before a standalone case article. A short job may not need a new URL. An article should add material first-hand detail; four pages with only the vehicle name changed are rejected. Do not populate `verifiedProtectionProjects` with drafts or synthetic evidence strings. The [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) supports original, accurate, audience-useful work; it does not prescribe a word count or reward unsubstantiated model-page expansion.

## Priority order and verification gates

1. Resolve the production-routing release blocker before expanding URL count. Local Worker behavior remains distinct from production execution.
2. Review the small EN/AR handover addition alongside root's fresh type/lint/build/render/browser checks. Retain cost, coverage and comparison owners, links and metadata.
3. Confirm the actual PPF products/finishes and compile an approved handover/care record. This unlocks a useful after-sales guide and determines whether matte/satin content is accurate.
4. Collect the first real project pack for any of the four requested models. Prioritize whichever has the strongest evidence; no model is selected merely for keyword popularity.
5. Obtain current query-by-page GSC exports, selected-canonical/indexing checks and qualified-enquiry outcomes after an approved release. Use evidence to revisit a distinct cost/care article rather than assume additional URLs produce growth.

No ranking, AI citation, traffic, lead or revenue improvement is claimed. Business confirmation and an approved production release remain prerequisites for the corresponding external claims or actions.
