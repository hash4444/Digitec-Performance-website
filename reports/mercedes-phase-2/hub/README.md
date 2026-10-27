# Mercedes hub: minimal proposal for approval

Prepared 26 October 2026. **Proposal only. No application source, build output or production content was changed.**

The proposed patch changes two existing English Mercedes hub paragraphs in `src/pages/BrandPage.tsx`, adding two contextual links. Both paragraphs already sit inside `isMercedesServiceHub && !isArabic` branches. No new page or section is proposed.

## Review the change

- [Unified patch](mercedes-hub-minimal.patch)
- [Byte-preserved current source](before/src/pages/BrandPage.tsx)
- [Proposed source copy](proposed/src/pages/BrandPage.tsx)
- [Original source hashes](original-sha256.json)
- [Validation results](validation.json)
- [Conditional proof collection plan](conditional-proof-plan.md)

| Current source line | Proposed change | Reason and limit |
|---|---|---|
| `src/pages/BrandPage.tsx:1004` | Replace the engine-image caption with: “A Mercedes-AMG engine in the Digi-Tec workshop. Review our Mercedes XENTRY diagnostics and mechanical repair inspection scope for the steps relevant to your vehicle.” Link the two service phrases directly to `/services/mercedes-diagnostics-dubai` and `/services/mercedes-mechanical-repair-dubai`. | Give readers inspecting the workshop image a useful next step within existing service owners. The old caption already identifies the workshop and engine. The proposal avoids turning a photograph into a claimed completed repair, measured outcome or certification. These are contextual additions to already linked pages, not a claim that either page was orphaned. |
| `src/pages/BrandPage.tsx:1324` | Replace the existing local proof-card paragraph with: “Warehouses 11–15, Al Quoz Industrial Area 3, Dubai, UAE. Call +971 4 340 2223 to confirm your appointment and arrival details.” | Make the currently published full address and phone visible at the existing visit-information point. The exact warehouse range is already in the footer and business graph. This is source-consistent information; the audit did not independently verify the physical entrance, current hours or all directory citations. Confirm the current master address with the operator before publishing this line. |

## Retained content and targeting

The current title remains `Mercedes Service Dubai | Maintenance & Repair | DIGI-TEC`, the H1 remains `Mercedes-Benz Service in Dubai`, and the URL/canonical remains `https://digitecme.com/brands/mercedes-benz-service-dubai`. The description, repair wording, hero, CTA behavior, FAQs and schema are untouched. `mercedesServiceCampaign.ts` is not part of the patch.

Quotation clarity is already strong. `MercedesMaintenanceScope.tsx:16–19,33–35` separates Service A/B, minor/major scope and separately quoted diagnosis/repair, requests model/year/mileage/reminder/history, and names parts, fluid specifications and quantities, labour, diagnosis, tax and exclusions. `mercedesServiceCampaign.ts:8,16–17` and the existing booking flow reinforce vehicle-specific quotation and scope approval. Repeating that text would add length without an established customer need, so no quote paragraph is added.

`BrandPage.tsx:125` and `src/data/brands.ts:32,46` already qualify the verified XENTRY capability by vehicle, module and available access. Those limits remain. XENTRY does not establish manufacturer authorisation or unrestricted coding/programming access.

## Evidence and claims register

| Statement or feature | Evidence available | What it does not establish |
|---|---|---|
| Workshop image depicts a Mercedes-AMG engine at Digi-Tec | Current `BrandPage.tsx:48,994–1004`; October 26 audit, section 6, trust row; the captured hub HTML at `reports/evidence-2026-10-26/technical/html/035-_brands_mercedes-benz-service-dubai.html` | Identifiable repair job, complaint, fault, parts fitted, test results, repair success rate or a completed mechanical repair outcome. Caption scope remains limited accordingly. |
| XENTRY capability | Existing audit section 6 records user confirmation; current `BrandPage.tsx:125` and `src/data/brands.ts:32,46` specify capability and access limits | Dealer authorisation, named qualifications, blanket online coding or guaranteed acceptance of every model. No new capability claim is inserted. |
| Existing G63 conversion project | `BrandPage.tsx:1008–1021`; `src/data/blogPosts.ts:1557–1617` contains the G 800-style conversion entry and workshop image gallery | Proof of routine maintenance or mechanical, gearbox, suspension or engine-repair outcomes. Existing conversion card remains unchanged; no repair testimonial is inferred. |
| Published address and phone | `src/components/Footer.tsx:83–84`; `index.html:91–99`; October 26 captured hub graph and `reports/evidence-2026-10-26/technical/findings.md:59` agree on Warehouses 11–15, Al Quoz Industrial Area 3 and +971 4 340 2223 | Independent physical verification, entrance pin, hours or correctness of every third-party listing. These remain evidence requests. |
| Diagnostics and mechanical links point to existing owners | `src/data/mercedesServices.ts:9,251`; `src/App.tsx:109–110,122,130`; October 26 `technical/pages.csv` records both English destinations as 200, self-canonical, `index, follow, max-image-preview:large` | Current Google-selected canonical, index inclusion or a ranking benefit. Repeat fresh HTTP checks immediately before deployment. |
| Genuine repair case content is deferred | `src/data/mercedesCaseStudies.ts:2–6,44` explicitly leaves the repair case collection empty pending real vehicle, diagnosis, repair outcome and images | Permission to fill the collection, create a page, expose customer details or invent a result. No registry entry is proposed. |

The audit's current evidence predates deployment. Fresh hub and service HTTP evidence, where captured for the Phase 2 package, should be used alongside this record. It does not replace authenticated URL Inspection or operator confirmation of visit facts.

## Validation performed

`git apply --check -- reports/mercedes-phase-2/hub/mercedes-hub-minimal.patch` passed against the current working-tree source. This checks applicability without applying the patch. A TypeScript TSX parser accepted the proposed copy with zero parse diagnostics. SHA-256 checks confirmed all eight captured source files remained byte-identical after proposal generation. Details and hashes are in `validation.json` and `original-sha256.json`.

No project build, full typecheck, browser render, mobile layout test or live contact action was performed for this unimplemented proposal. In the approved implementation stage, apply it in an isolated working copy, run the repository's normal relevant checks, compare SSR title/H1/canonical/robots before and after, inspect the two existing sections on desktop and mobile, and verify both links resolve directly to relevant 200 pages. Keep the new caption links keyboard accessible. Do not submit a live booking or WhatsApp message merely to inspect the content.

## Approval and rollback boundary

Approval item H1 is the two-paragraph patch, including the two contextual service links. Publishing the full warehouse address additionally depends on confirmation that the current published address remains the operator's correct master address. Applying application-source changes, building a release and deploying are subsequent actions and have not occurred. No metadata experiment, new repair claim, new case page, FAQ expansion, review claim, hours, schema or tracking change is included.

If this exact patch is later applied without further edits, `git apply --reverse --check -- reports/mercedes-phase-2/hub/mercedes-hub-minimal.patch` can first check a source reversal. The actual reverse application is a later authorised change. Do not overwrite unrelated work or blindly copy the baseline file if the file has subsequently changed. For a released version, revert only the approved hub change and release through the same approved workflow; verify the prior title/H1/canonical, content and relevant HTTP responses. Content rollback does not undo separately approved Cloudflare rules.
