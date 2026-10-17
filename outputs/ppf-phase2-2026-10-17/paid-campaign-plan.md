# PPF paid acquisition specification

Prepared: 17 October 2026, Asia/Dubai. Status: DRAFT / HOLD. No advertising account was inspected or changed, no campaign was created, and no money was spent. Internal tokens below are controlled planning identifiers, not existing platform campaign/ad-group IDs.

## Launch recommendation

NO-GO for paid launch today. The existing website opens a WhatsApp draft and cannot verify receipt. Launch is gated on a tested way to reconcile actual received PPF enquiries to their source and deduplicate them, an approved production release, business confirmation of advertised services and explicit account/spend authorization. A working draft button alone does not meet this gate.

The accompanying `google-ads-spec.csv` is a review specification, not an Ads Editor import. Every record is `DRAFT_HOLD`. It contains one proposed Search campaign, three ad groups, 16 positive keyword seeds, campaign/ad-group negatives and 30 headlines plus 12 descriptions. Do not import/upload it without a later approved setup and review.

## Budget and pacing proposal

| Planned channel / controlled campaign token | Monthly allocation AED | Current disposition |
|---|---:|---|
| Google Search / `ppf_search` | 3,500 | Hold for all launch gates |
| Meta prospecting / `ppf_meta_prospecting` | 1,000 | Hold for receipt measurement, creative and account checks |
| Meta retargeting / `ppf_meta_retargeting` | 500 | Reserved; audience size, permission and delivery eligibility unverified |
| Total | 5,000 | Planning ceiling; actual authorized spend remains zero |

If retargeting is ineligible, unavailable, too small to deliver, or cannot be confined to the intended warm audience, hold its AED 500 unspent. A later approved alternative is Search AED 4,000 + Meta prospecting AED 1,000 + retargeting AED 0; do not silently increase either channel. If all Meta gates fail, keep that allocation unspent rather than substituting an unapproved channel. Confirm whether the AED 5,000 ceiling includes taxes/platform charges before account setup; reduce media allocations if it is an all-in cash ceiling.

Verify the actual account currency and reporting timezone before setup. These allocations are in AED and planning dates use Asia/Dubai; no existing account currency, exchange rate or timezone is assumed.

For a full approved calendar month, AED 3,500 / 30.4 is approximately AED 115.13 average daily Search budget; this is not a hard daily cap. Google's ordinary campaign rules can allow up to twice the average daily amount on a day and a monthly charging limit based on 30.4 days. Budget changes and partial months require a fresh pacing calculation. Proposed Meta amounts are period totals; verify available budget/spend controls and authorized start/end dates in Ads Manager instead of assuming a daily budget is a strict daily spending ceiling. [Google budget rules](https://support.google.com/google-ads/answer/1704424?hl=en)

All three Search groups share the campaign budget. Proposed review mix is general 45%, full body 30%, quote/cost 25%; these are planning shares, not ad-group budget settings or delivery guarantees. No CPC, impression, lead-volume, CPA or ROAS forecast is asserted. Before launch, obtain an authorized Keyword Planner forecast and set an owner-approved commercial acquisition limit using actual margin and qualified-lead-to-installation results.

## Search setup and ownership

Proposed setup: Google Search only initially; Search partners and Display expansion held. Target Dubai with the presence option for people in or regularly in the area, rather than Dubai interest anywhere. Geo targeting is approximate, so review location reports after any authorized launch. English keyword/creative specification initially; Arabic landing and language switching remain available. Arabic paid keywords and native-reviewed creative need a separate approved language plan before budget is assigned to them. [Google location options](https://support.google.com/google-ads/answer/1722038?hl=en)

| Ad-group token | Intent and seed examples | Final landing / purpose |
|---|---|---|
| `ppf_general` | PPF installation in Dubai: [ppf dubai], \"paint protection film dubai\", [car ppf dubai], \"ppf installation dubai\" | [Primary PPF service](https://digitecme.com/services/paint-protection-film) |
| `ppf_full_body` | Coverage-specific installation: [full body ppf dubai], \"full body paint protection film\", [full car ppf dubai] | [PPF coverage section](https://digitecme.com/services/paint-protection-film#ppf-coverage) |
| `ppf_quote` | Vehicle-specific quotation: [ppf cost dubai], \"ppf quote dubai\", [paint protection film price dubai], [full body ppf cost dubai] | [PPF quotation section](https://digitecme.com/services/paint-protection-film#ppf-quote) |

These are intent hypotheses anchored to the supplied historical GSC PPF themes and existing page scope; they are not current search-volume or auction evidence. The quote group retains cost/price enquiries while the landing page explains quotation factors without displaying prices. No additional doorway landing page is proposed. Supporting comparison content remains informational and is not the main destination for these commercial groups. Do not use currently broken aliases such as `/ppf` as ad URLs.

Start with the exact/phrase seeds in the CSV to keep this small pilot reviewable. Google may match close variants and overlapping intent; exact match is not literal-only. Review actual search terms before widening match types, and do not claim negatives guarantee perfect routing. [Google keyword matching](https://support.google.com/google-ads/answer/7478529?hl=en)

Proposed routing priority is quote/cost > full body > general. General excludes full-body/full-car/full-vehicle variants and quote/cost modifiers; full body excludes quote/cost modifiers; quote owns full-body cost searches too. No quote/cost negatives apply campaign-wide. Negative phrase/exact mechanics differ from positive matching; explicitly review singular/plural and synonymous intent. [Google negative keywords](https://support.google.com/google-ads/answer/2453972?hl=en)

Shared exclusions cover DIY kits/film rolls/supply, employment/training, public-provident-fund queries and nonautomotive screen film. Temporarily exclude film brands, self-healing, matte and satin searches until the offering is verified. The exact historical query [ppf spectre] is held as ambiguous; no product or vehicle interpretation is assumed. Exact city-only searches outside Dubai are held, while city names are not blanket exclusions. Preserve price/quote intent. Review search terms after authorized launch and remove exclusions only with evidence and a relevant truthful offer.

## Search ad copy

One proposed English responsive search ad per group. Each has ten headlines and four descriptions, individually checked below the 30/90-character limits. All combinations must remain truthful; avoid dynamic keyword insertion, auto-created product claims or asset changes without review. No headline is pinned in this draft. Confirm current rendering and policy review in the account before launch. [Google responsive search ads](https://support.google.com/google-ads/answer/7684791?hl=en)

### ppf_general

| Headline | Characters |
|---|---:|
| PPF Dubai \| DIGI-TEC | 20 |
| Paint Protection Film Dubai | 27 |
| Request a PPF Quote | 19 |
| PPF Installation in Dubai | 25 |
| Discuss PPF Coverage | 20 |
| Full Body or Selected Panels | 28 |
| Plan PPF for Your Car | 21 |
| Vehicle-Specific Quotation | 26 |
| Dubai Workshop Enquiries | 24 |
| Talk to DIGI-TEC | 16 |

| Description | Characters |
|---|---:|
| Explore PPF coverage for your car. Request a vehicle-specific quote from DIGI-TEC. | 82 |
| Share make, model, year and coverage. Review and send your request on WhatsApp. | 79 |
| Discuss the film, preparation and covered panels before agreeing the installation. | 82 |
| PPF can reduce some stone-chip damage on covered paint. It is not damage-proof. | 79 |

### ppf_full_body

| Headline | Characters |
|---|---:|
| Full Body PPF Dubai | 19 |
| Request Full Body PPF Quote | 27 |
| Agree Covered Panels | 20 |
| PPF for Your Vehicle | 20 |
| Discuss Paint Preparation | 25 |
| Discuss Film Options | 20 |
| Vehicle-Specific PPF Quote | 26 |
| Compare Coverage Options | 24 |
| Ask DIGI-TEC About PPF | 22 |
| Start Your PPF Enquiry | 22 |

| Description | Characters |
|---|---:|
| Discuss full-body PPF for your car. Confirm the film, preparation and covered panels. | 85 |
| Full-body coverage is agreed panel by panel. Ask about exclusions for your vehicle. | 83 |
| Share make, model and year to request a full-body PPF quotation through WhatsApp. | 81 |
| Compare full-body and selected-panel coverage. PPF does not make paint damage-proof. | 84 |

### ppf_quote

| Headline | Characters |
|---|---:|
| PPF Cost in Dubai | 17 |
| Request a Vehicle PPF Quote | 27 |
| PPF Quotation \| DIGI-TEC | 24 |
| Discuss Scope Before Work | 25 |
| Vehicle-Specific Quotation | 26 |
| Coverage Affects PPF Cost | 25 |
| Share Your Car Details | 22 |
| Ask About PPF Preparation | 25 |
| Quote by Make, Model & Year | 27 |
| Review and Send on WhatsApp | 27 |

| Description | Characters |
|---|---:|
| PPF cost depends on your car, coverage, film and preparation. Request your quote. | 81 |
| Send make, model, year and coverage. Review the WhatsApp draft before sending it. | 81 |
| Discuss covered panels and preparation before agreeing the price for your vehicle. | 82 |
| Unsure about coverage? Ask DIGI-TEC to advise you before a vehicle-specific quote. | 82 |

The pipe symbol is literal ad text. No installed-film brand, price, discount, warranty duration, certification, turnaround time, absolute damage prevention or superlative is offered. Business confirmation of actual PPF coverage and installation scope remains a publication gate. Final/display domains must represent the advertised business and lead to working, relevant content. [Google final URL requirements](https://support.google.com/google-ads/answer/2684490?hl=en)

## Attribution contract and conversion actions

Use static reviewed tokens in the final URL suffix, never vehicle names, customer details, message text or raw search-query macros. Example for general Search:

```text
utm_source=google&utm_medium=cpc&utm_campaign=ppf_search&utm_content=ppf_general
```

Use `ppf_full_body` or `ppf_quote` for the other Search ad-group content tokens. Meta prospecting uses `utm_source=facebook&utm_medium=paid_social&utm_campaign=ppf_meta_prospecting&utm_content=ppf_prospecting`; retargeting uses `utm_source=facebook&utm_medium=paid_social&utm_campaign=ppf_meta_retargeting&utm_content=ppf_retargeting`. These campaign and ad-group labels follow the authoritative mapping in `lead-attribution-crm-spec.md`. This deliberately reports blended Meta placements as facebook/paid_social; do not infer Instagram placement from that source value. Platform numeric IDs and placement detail belong in the protected later campaign registry/CRM if approved. Auto-tagging/click-ID capture is a separate account/privacy integration, not implemented by these suffixes.

| Action | Truth condition | Proposed use |
|---|---|---|
| `ppf_page_view` | Commercial PPF route visited | Diagnostic only |
| `quote_started` | First form change | Diagnostic only |
| `whatsapp_click` | WhatsApp link activated | Diagnostic only |
| `whatsapp_draft_opened` | Valid form initiates draft handoff | Diagnostic only; no receipt |
| `telephone_link_clicked` | Telephone link activated | Diagnostic only; no connected-call claim |
| Proposed `ppf_received_enquiry` | Actual business recipient or approved CRM records an incoming PPF request and deduplicates it | Eligible primary lead action only after verification; specification name, not an implemented browser event |
| Qualified enquiry / booking / invoiced installation | Staff/approved system records the corresponding real outcome | Protected CRM outcomes; later approved imports/value reporting |

Exclude draft/click events from account-default primary goals and custom bidding goals. Google normally uses primary actions for bidding; secondary actions can still drive bidding when included in a custom goal, so secondary status alone is insufficient. Do not count each pipeline stage as an additional acquired lead. Use one lead-count definition per enquiry and a separate actual invoiced-value report. [Google primary and secondary actions](https://support.google.com/google-ads/answer/11461796?hl=en)

An approved receipt flow must prove one incoming enquiry links to an opaque lead ID, controlled campaign/ad-group tokens and landing page; repeated messages/refreshes must not create duplicate leads. Staff then updates quotation status/value, booking status and final invoice in the protected register. A draft token may be deleted or edited by the customer, so missing attribution stays unknown. Never infer receipt from a page return, successful URL navigation, a WhatsApp open, or a customer's unsent draft. No `quote_submitted` is emitted without verified receipt. Keep customer and vehicle fields out of analytics.

For future Google offline attribution, verify the current supported Data Manager path and account eligibility. Current Google guidance describes the June 2026 migration of offline uploads away from new Google Ads API integrations; do not design a new legacy API uploader from an old example. Customer identifiers, if a separately approved matching integration needs them, belong in that protected data flow and must never be sent as GA4 event parameters. This specification does not authorize enhanced conversions, customer-list uploads, pixel installation or consent changes. [Google offline import updates](https://support.google.com/google-ads/answer/13321563?hl=en)

## Meta prospecting and conditional retargeting

Proposed prospecting: one small campaign `ppf_meta_prospecting`, one broad adult Dubai ad set initially, with English creative. Do not assume luxury-car interests, inferred vehicle ownership, radius categories or detailed-targeting options exist or are accurate in the account. Use the website PPF page as destination and keep its quote-request meaning visible. A lead/conversion objective and performance goal may be selected only when actual receipt can be measured through an approved eligible setup; do not relabel traffic or outbound-click optimization as leads.

Prepare owned 4:5 feed and 9:16 vertical variants showing real verified workshop/installation work. Vehicle presence alone is not evidence of PPF installation. Obtain project identification, customer/image permission and actual job scope before using installation claims; exclude registrations or identifying details. Keep CTA and key text inside placement safe areas, and preview each placement. Meta's official Reels guidance supports vertical creative and safe-zone review; eligibility and account-specific objective controls remain unverified. [Meta Reels creative guidance](https://www.facebook.com/business/ads/facebook-instagram-reels-ads)

| Creative | Primary text draft | Headline | CTA / destination |
|---|---|---|---|
| Prospecting A | Considering PPF for your car in Dubai? Explore full-body and selected-panel coverage at DIGI-TEC. Share your vehicle details to request a quotation. Film, preparation and covered panels are confirmed for your car. | Request a PPF Quote | Learn More; primary PPF page |
| Prospecting B | How much PPF coverage suits your car? Review coverage, paint preparation and the limits of film protection, then send DIGI-TEC a vehicle-specific quote request through WhatsApp. | Explore PPF Coverage | Learn More; PPF coverage section |
| Retargeting, only if eligible | Still considering PPF? Review the panels you want to cover and share your car details. DIGI-TEC can discuss the film and preparation before a vehicle-specific quotation. | Discuss Your PPF Quote | Learn More; quotation section |

These are drafts without price/brand/warranty claims. They do not say the viewer owns a particular car or that the advertiser has observed their private behavior. Native-reviewed Arabic variants can follow when their audience, creative and language plan is approved. Do not enable unreviewed automatic translations or image generation that could invent installation evidence.

Retargeting proposal: approved warm visitors to PPF-relevant pages during a 30-day planning window, or an eligible first-party Meta engagement audience, excluding already received/converted leads only when the exclusion mechanism and permissions exist. A 30-day window is a proposed strategy, not a platform maximum. Do not upload quotation contact lists or use request-only form details as marketing permission. Meta customer-list terms require the necessary rights/permissions and respect for opt-outs. [Meta Customer List Custom Audiences Terms](https://www.facebook.com/legal/terms/customaudience/update)

Before allocating the reserved AED 500, an authorized operator must inspect the actual audience source, permission, population, status, estimated delivery, UAE/account eligibility and whether expansion can be disabled or would turn the campaign into prospecting. No universal minimum audience count is asserted. If these checks cannot be satisfied, the campaign stays held and the funds stay unspent. Public Meta retargeting/objective help currently redirects to login; that prevents independent verification of the account controls and audience eligibility here. [Meta retargeting information, login-gated](https://www.facebook.com/business/ads/retargeting)

## Review and launch gates

- Obtain explicit production/account/spend authorization and a named owner for budgets, response handling and stop decisions.
- Verify production canonical PPF routes, EN/AR switching, mobile quote validation, privacy disclosure and correct redirect behavior. Local routing tests do not prove live aliases are fixed.
- Prove a received enquiry is reconciled exactly once to a protected lead record and correct campaign/ad-group token; verify that unsent drafts and invalid forms generate zero received leads.
- Audit GA4/GTM/Ads goal configuration, external automatic form/outbound tracking, consent, linked accounts, attribution settings and receipt-data diagnostics with account access. No PII in event payloads or exported landing queries.
- Confirm the advertised coverage/process, phone/WhatsApp ownership and response staffing. Do not promise instant quotations, same-day fitting or unconfirmed opening hours.
- Preview every RSA/Meta creative and final URL on mobile, including URL parameters and anchors; pass current platform review. Define owner-approved CPL/qualified-lead and invoiced-return decision rules after real margin/close-rate data is available.
- For any approved launch, review search terms, location leakage, receipt reconciliation and budget pacing frequently at first. Pause affected delivery for broken landing pages, receipt tracking failure, misleading assets or budget-control problems. These are future operating instructions, not an automation or account change.

## Evidence and limits

Official sources linked at their relevant claims were checked on 17 October 2026. Most help pages do not state a publication date; access date is not a policy publication date. The accessible Meta customer-list terms state an effective date of 25 April 2023. Public Meta retargeting/objective help is login-gated, and the ad-standards index could not be retrieved; current in-account policy/eligibility review is therefore a launch gate. No third-party ad benchmark, unsupported audience threshold, current keyword volume, auction cost or performance promise is used.

