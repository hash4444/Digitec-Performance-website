# Customer enquiry improvements — 9 September 2026

## Purpose

Reduce avoidable friction on the brand booking forms and make contact actions on the priority commercial pages easier to attribute. This release builds on query implementation commit `7f5f2b6`; it does not introduce new landing pages, pricing, service claims or ranking promises.

## Changes

- Brand enquiry forms in English and Arabic require the service concern only. Name and callback number are optional; a supplied callback number is still validated. Error messages are associated with their fields and announced to assistive technology.
- The action clearly says “Continue to WhatsApp”, with an explanation that the visitor reviews and sends the message there. Existing draft-open and WhatsApp events remain distinct from confirmed enquiries or customers.
- Brand, brand-service, general-service and final contact buttons identify their placement using existing analytics events. Oil/service detail buttons now carry the relevant service in the WhatsApp draft.
- Generic brand drafts no longer say the visitor found DIGI-TEC on Google regardless of their actual source.
- Site-controlled analytics page URLs omit query strings and fragments; referrers omit private paths. Stored first-touch attribution is sanitised, AI sources use host checks, and recognised source/medium labels are retained. Arbitrary campaign names, search terms, content labels and click IDs are no longer copied into custom contact payloads. Campaign-level advertising attribution and account-managed GTM tags require separate account validation before relying on paid-ad reports.
- Added a repeatable public-page check covering 18 priority URLs, their rendered SEO fields, booking details, contact placements, robots, sitemap and the two Mercedes redirects. Asset hashes are recorded but not treated as content differences across build environments.

## Verification

- Full 11-step production pipeline passed. Source fingerprint: `c369b52e340e5e38c66d7a406d16e452904c234029a5f14a31272811955cd7c4`.
- 1,438 React routes; 1,155 canonical sitemap URLs; 51,940 commercial internal links checked; no missing destinations.
- Existing routing, metadata, paint-care, query-release and WhatsApp event checks passed. Added attribution tests run as part of the production build.
- Both TypeScript configurations passed.
- Browser checks: English Mercedes form at 1280×720; Arabic Mercedes form at 390×844; BMW and oil service at 390×844. Empty concern and invalid callback errors checked. Both languages opened a correctly populated WhatsApp draft with name and phone blank. Test drafts were closed without sending messages. No horizontal overflow observed on these pages.
- Existing live Mercedes contact visibility checked at 390×844 before editing: hero WhatsApp/call and mobile bar were visible.

## Measurement baseline and remaining account work

`traffic-baseline.json` records the Lovable analytics response for the requested 12 August–9 September period. It reports 877 visitors, including 342 UAE visitors, and 1,366 pageviews. The response includes a 9 September time-series bucket. These are traffic figures, not verified leads or customers.

Cloudflare and Google Search Console still show sign-in screens. The public Mercedes aliases return HTTP 200 homepage content instead of permanent redirects; the scoped redirect implementation passes locally but still needs activation in the account serving the domain. Do not interpret a successful source build or Git push as proof of live edge redirects.

## Release status

- Committed and pushed to GitHub `main`: `8fbf86ad59cef80a4a1fafd8f83d82e4f5418b15` (Reduce enquiry friction and improve contact attribution).
- Lovable confirmed that exact commit as its latest synced revision, with project status completed.
- Publication is blocked: the Lovable deployment connector returned `INVALID_ARGUMENT` both with the project ID alone and with its existing `dubai-performance-art` slug. No deployment ID was returned. The browser fallback displays a private-project sign-in requirement.
- Public HTTP verification after the push returned HTTP 200 on all 18 priority URLs. All checked titles, H1s, descriptions, robots directives and canonicals matched the intended content. The latest optional-field and contact-placement changes were still absent on 15 applicable URLs, confirming the new release was not yet live. The three paint-care URLs matched the checked fields.
- `robots.txt` and the 1,155-URL sitemap returned HTTP 200. The two Mercedes aliases still returned HTTP 200 homepage content for GET and HTTP 200 without Location for HEAD. This is the pre-existing hosting defect, not a successful redirect deployment.
- `production-check.json` is the machine-readable live result. Its nonzero exit status intentionally reflects the unpublished content changes and unresolved redirects.
- Requested Lovable, Cloudflare and Search Console browser sign-in. No credentials requested in chat, no DNS migration performed, no test WhatsApp messages sent, and no unrelated mirror presented as the custom-domain release.

## Next execution after sign-in

1. Publish the synced `8fbf86a` revision from the existing Lovable project, then rerun `scripts/check-production-release.mjs`.
2. Activate the existing narrowly scoped Mercedes permanent redirect implementation in the domain's Cloudflare account; verify GET and HEAD, query preservation and the destination canonical from the public domain.
3. In Search Console, inspect the existing priority owners and sitemap, then compare UAE query/page performance against the supplied export. Evaluate actual enquiries and booked work separately from WhatsApp draft opens.
