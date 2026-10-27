# Minimal Mercedes hub proposal — approval required before implementation

This is a **two-line local proposal**, prepared from the current source on 26 October 2026. No application source or production content was changed. Review the [exact patch](mercedes-hub-minimal.patch), [before copy](before/BrandPage.tsx), [proposed copy](proposed/BrandPage.tsx) and [source evidence/hashes](source-evidence.json).

The existing hub already separates scheduled maintenance from fault diagnosis/repair and explains model/year/mileage/history, parts, fluid specifications, labour, tax, exclusions and approval for extra work. Preserve this quotation clarity and its commercial repair wording; another keyword or pricing paragraph has no established benefit.

| Proposal | Exact change | Purpose and evidence |
| --- | --- | --- |
| H3-01: contextual scope links | At current `src/pages/BrandPage.tsx:1004`, wrap the existing words **Diagnostics** and **repair planning** in links to `/services/mercedes-diagnostics-dubai` and `/services/mercedes-mechanical-repair-dubai`. Retain every word of the caption. | Let a visitor viewing the existing Mercedes-AMG workshop photograph inspect the relevant existing service scope. Both destinations were relevant 200 controls in the Phase 2B matrix; recheck before any later release. This does not claim a new repair outcome or that either page is orphaned. |
| H3-02: actionable visit contact | At current line 1324, append a clickable **Call +971 4 340 2223** and “to confirm arrival details” to the existing Al Quoz visit card. `data-cta-placement="workshop_proof"` uses the existing contact collector's placement field. | Reuse the workshop phone already published in the footer, Mercedes campaign FAQ and business graph. This adds no new address, hours, guarantee or availability claim. It proposes no GA4/GTM configuration change. |

Both lines occur within existing English Mercedes-only branches. Retain **URL/canonical** `https://digitecme.com/brands/mercedes-benz-service-dubai`, **title** `Mercedes Service Dubai | Maintenance & Repair | DIGI-TEC`, **H1** `Mercedes-Benz Service in Dubai`, description, schema builders, hero, repair/service sections, FAQs, Arabic content, other brands and existing CTA behavior. The measurement package is separate; this patch does not implement new measurement infrastructure.

This refines the earlier Phase 2 proposal. It preserves the existing caption's wording and replaces the conditional warehouse-address expansion with the already published phone action. Published address consistency is not independent physical verification: no warehouse-range, entrance pin or hours claim should be expanded until the operator confirms a dated master contact record.

## Evidence and deferred proof

The current engine caption and image support workshop context. They do not establish a completed mechanical repair, named customer, complaint, fault, parts fitted, measured result or Mercedes-specific job volume. The existing G63 conversion gallery supports its documented conversion scope, not an engine/gearbox repair success claim. Existing XENTRY capability wording remains qualified by vehicle/module/access; no new manufacturer-authorisation or programming claim is added.

`src/data/mercedesCaseStudies.ts` explicitly keeps repair cases empty pending real vehicle, diagnosis, repair outcome and images. Keep it empty. For any later evidence-backed addition to an existing page, obtain an anonymised job record, model/year/fitted system, initial complaint, diagnostic findings, approved/performed work, actual post-work checks, usable photographs, technician approval and publication rights. Exclude customer name, phone, VIN, registration and other identifiers from public copy. Clearly distinguish inspected, diagnosed, repaired and outcome confirmed. A record does not automatically authorize a case page, route, schema or sitemap entry.

## Impact, risk and verification backlog

| ID | Status / impact | Risks and dependencies | Verification before any approved publication |
| --- | --- | --- | --- |
| H3-01 | Prepared; modest navigation benefit, no ranking gain assumed. | Shared TSX page; link routing/localisation and keyboard focus need checking. | Patch applicability; TSX parse; release build/type/SSR checks; both direct relevant 200 destinations; keyboard/desktop/mobile inspection; unchanged title/H1/canonical/schema, Arabic and other-brand controls. |
| H3-02 | Prepared; clearer visit/contact action. | Published phone should still be confirmed with operator before publication. New phone link may produce an additional existing event with a new placement value; do not count it as a qualified lead. | Inspect exact `tel:+97143402223` and placement attribute; keyboard/mobile layout; approved analytics debug readback if available; do not place a live call or send a WhatsApp message merely to test. |
| H3-03 | Deferred; actual repair proof could improve usefulness after evidence exists. | Requires workshop/technician/privacy/publication approval; no repair record supplied. | Review factual evidence first, then prepare a separate exact diff for approval. No invented jobs, reviews, case counts, certifications, prices, turnaround or outcome claims. |
| H3-04 | Deferred; verified master visit facts. | Operator confirmation of warehouse range, entrance, public phone and current hours pending. | Dated named-owner fact sheet; reconcile conflicting citations separately; no automatic schema or directory edit. |

Read-only validation covers applicability and TSX syntax only; the proposed source was not applied, built or rendered. See [validation results](validation.json). The relevant Phase 2B HTTP evidence is an existing observation, not a promise of destination availability at a later release.

Approval would be needed to apply H3-01/H3-02 and publish through the normal isolated release workflow. Any later rollback must reverse only the approved content hunks through that workflow, preserving unrelated source and the separately deployed Cloudflare rules. No implementation, deployment or rollback is performed by this proposal.
