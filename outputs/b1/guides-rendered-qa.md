# Focused guide rendering QA

28 September 2026. Read-only comparison of the saved `before-pages.json` / `after-pages.json` SEO objects and corresponding compressed rendered HTML. No source edit or build was performed during this check.

**Result: pass for 14 guide routes and 14 unrelated controls; no blocking content or ownership regression found.** Detailed metadata, headings, schema types, FAQ text, dates and main-content links are in `guides-rendered-qa.json`. The reproducible check is `check-rendered-guides.py`.

## What was verified

* All five specified guides and both related generic guides were checked in English and Arabic. Each has one H1; canonical and noindex values match its baseline. Every internal main-content link exists in the current saved route inventory.
* Expected next-step owners are rendered: maintenance → interval/cost/hub; intervals → maintenance/cost/oil; cost → interval/maintenance/diagnostics; oil selection → oil-service booking/interval/cost; warning overview → relevant commercial assessment owners. English overview also exposes the dedicated symptom guides. Arabic main-content links remain Arabic and do not fabricate model/problem paths.
* Maintenance has planning-led metadata and body in both languages. Its schema changed from `ItemPage + BreadcrumbList + BlogPosting + Service + FAQPage` to `ItemPage + BreadcrumbList + BlogPosting + FAQPage`. Four matching planning questions are available through the FAQ controls in each language. The body focuses on records, due work, driving/use, incomplete history, equipment and written follow-up, rather than a second booking catalogue.
* Oil selection is visibly a comparison checklist with exact-engine oil approval, included work, records and its existing service-owner link. It does not claim that one workshop category is intrinsically superior.
* Interval English metadata is retained; Arabic metadata explicitly names ASSYST. Copy distinguishes a reminder/reset from completed maintenance and qualifies demanding-use recommendations.
* Cost metadata is retained and content compares due scope, diagnosis and line items. No fabricated fixed cost or universal interval was found.
* Warning overview no longer contains the reviewed unsupported model-specific failure/prevalence, generic-workshop or guaranteed-savings assertions. Head-unit fault assessment and functional audio upgrade have distinct English owners; the Arabic enquiry uses the actual existing hub because those service counterparts are not in the published route inventory.
* Generic transmission and air-suspension guides retain their cross-brand titles and tasks. Both EN and AR primary related CTAs point to the generic commercial owner. Mercedes-specific English links remain supplementary. Their Arabic bodies/metadata remain the pre-existing bespoke adaptations.

## FAQ details and final integration note

Every FAQ emitted in schema matches a rendered question and its answer, or a matching collapsible question control. At this snapshot the maintenance accordion answers are not in the initial HTML because the panels are collapsed. The parent is applying a scoped `forceMount` improvement and will rebuild; re-run this check against that final snapshot. This is recorded as an initial-HTML improvement, not an intent or factual defect.

The existing central `buildFAQ` safety filter emits a subset of visible FAQs in two cases: the English warning overview's negatively phrased question containing “guarantee” is filtered (2 of 3 emitted); the Arabic cost answer containing “معتمداً” is filtered (1 of 2 emitted). All remaining schema text matches the page. No shared filter or schema policy was changed. The Arabic generic supporting guides have no FAQ schema because their retained bodies have no FAQ section.

## Unrelated controls

The full rendered HTML hashes are identical before/after for English and Arabic versions of these seven articles (14 controls): BMW maintenance, Ferrari maintenance, Lamborghini maintenance, Rolls-Royce workshop selection, car AC repair, brake repair and dealer-versus-independent workshop choice. Their article text, metadata, H1, schema types and FAQs are consequently unchanged. This corroborates the earlier AST record-level scope check.

The parent owns final production-build checks, all-route invariants and browser interaction. This report does not claim that a browser interaction was executed by this subagent.
