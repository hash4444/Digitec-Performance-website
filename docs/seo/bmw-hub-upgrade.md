# BMW hub update — 5 September 2026

Existing canonical: https://digitecme.com/brands/bmw-service-dubai

## Search intent ownership

These are intended primary landing pages, not a verified query-by-page ranking report. The supplied Search Console workbook has separate query and page tables; it does not establish which URL ranks for each query or prove cannibalisation. Use query-filtered page data in Search Console to confirm ownership after release.

| Query cluster | Existing URL owner |
| --- | --- |
| BMW service / repair / workshop / specialist / service centre / service center / maintenance / major service in Dubai | `/brands/bmw-service-dubai` |
| BMW engine repair, cooling and mechanical problems | `/brands/bmw-service-dubai/mechanical-repair` |
| BMW diagnostics, diagnostic Dubai and engine diagnostics | `/brands/bmw-service-dubai/engine-diagnostics` |
| BMW transmission repair / transmission service, including “in Dubai” variants | `/brands/bmw-service-dubai/transmission-repair` |
| BMW brake repair / brake service | `/brands/bmw-service-dubai/brake-repair` |
| BMW suspension / air suspension repair | `/brands/bmw-service-dubai/suspension-repair` |
| BMW AC repair | `/brands/bmw-service-dubai/ac-repair` |
| BMW electrical / ECU repair, coding and iDrive enquiries | `/brands/bmw-service-dubai/electrical-repair` |
| BMW battery / car battery replacement and registration | `/brands/bmw-service-dubai/battery-replacement` |
| BMW oil change | `/brands/bmw-service-dubai/oil-change` |
| BMW body repair / body shop / body repair garage | `/brands/bmw-service-dubai/body-repair` |
| BMW 3 Series service | `/brands/bmw-service-dubai/3-series` |
| BMW M5 service | `/brands/bmw-service-dubai/m5` |
| BMW M4 service / M4 oil change | `/brands/bmw-service-dubai/m4` |

Broad service variants are expressed naturally in hub content. Specific service detail remains on its existing child page. No new URLs, model/service combinations, location pages or exact-match keyword lists were created. Lower-volume model queries should be assessed against existing model guidance and real workshop capability before expanding the architecture.

## Content and evidence

- Uses the requested title, meta description and H1 exactly.
- Nine core service summaries, five additional repair links and seven existing model links; 3 Series, M5 and M4 receive prominent cards.
- VIN-specific diagnostic, parts and coding confirmation remains explicit. No new technician certification, equipment ownership, fixed pricing, turnaround, dealership relationship or performance claim.
- Reuses `src/assets/digitec-workshop-service-floor.jpg`, already published in the workshop overview. A BMW is visible in the photograph; no particular repair, result or case study is inferred from it.
- Uses the owner-confirmed founding year 2002 and established Al Quoz location. The old unverified 40,000-square-foot assertion is omitted from the English BMW hub.
- Hero, service-section and closing CTAs use BMW-specific WhatsApp messages asking for model, year, mileage, symptoms and preferred appointment time. The form gives the same guidance and continues to open a WhatsApp draft for the visitor to send.
- FAQ content and structured data share one source. Answers are included in initial HTML and remain available through the accessible accordion.

## Verification and release

Run the existing production build and `node scripts/validate-bmw-hub.mjs`. Check canonical, indexability, breadcrumb/business schema, visible FAQ content, unique metadata and H1, all 21 child links and reciprocal links, and sitemap inclusion. Child service/model content and slugs are preserved.

The Sites project is a private review copy and has no attached custom domain. Publishing there does not update digitecme.com. The production website uses the repository's existing Lovable/hosting release process; confirm the approved production release before measuring impact.

After the production release, inspect the canonical URL in Search Console and request recrawling through the normal account workflow. Record the actual release date. Compare equivalent date windows after recrawling, keeping country, device and search-type filters consistent. Review clicks, impressions, CTR, position and query-to-page ownership for the hub and existing BMW child pages. Track actual enquiries/bookings separately from CTA clicks. Rankings are outcomes to measure, not guarantees of this change.
