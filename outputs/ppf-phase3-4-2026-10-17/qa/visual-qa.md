# Final visual QA — PPF Phases 3–4

**PASS for the inspected screenshots; no visual release blocker found.** Each of the eight final EN/AR quotation-form screenshots was opened and inspected directly with `view_image`, followed by the desktop hero, 320 px mobile hero/contact bar and workshop section.

Associated final application source fingerprint: `b2bf92aba294bbb0807b1abd4943e5b47dd93b262e4dd99a306e04b6f00049da`. The [build snapshot](../crawlability/build-snapshot.json) records 19 successful stages. The [visual manifest](visual-qa-manifest.json) preserves filenames, PNG dimensions and SHA-256 hashes of the exact 11 reviewed images. These are local regression artifacts, not screenshots of the newly published site.

| Screenshot pair | Result | Visual observations |
|---|---|---|
| [EN 320 dark](../browser/en-quote-320-dark.png) / [light](../browser/en-quote-320-light.png) | PASS | Single-column labels/fields fit the form. Coverage and reply-method values remain legible. Long notes and privacy copy wrap. Full-width WhatsApp button and privacy link are readable. |
| [EN 390 dark](../browser/en-quote-390-dark.png) / [light](../browser/en-quote-390-light.png) | PASS | Consistent field spacing and theme colors; longer lines fit naturally. Focused notes retain a visible orange outline. No text overlaps, clipped controls or displaced submit button observed. |
| [AR 320 dark](../browser/ar-quote-320-dark.png) / [light](../browser/ar-quote-320-light.png) | PASS | Arabic labels/helper/privacy text align RTL; the native select arrow is on the left. Latin make/model/name/notes remain LTR and readable; telephone retains its plus-prefix order. Arabic submit label and privacy link are legible. |
| [AR 390 dark](../browser/ar-quote-390-dark.png) / [light](../browser/ar-quote-390-light.png) | PASS | RTL spacing remains consistent at wider mobile size. Unsure coverage fits; mixed-script sample values do not spill into labels. Button and long privacy paragraph fit the form. |

The quotation images are cropped to the form element, so their PNG width is narrower than the named viewport. The orange focus outline approaches the crop boundary; this is not evidence that the full viewport clips the control. The test screenshots contain synthetic QA field values, not customer records or confirmed enquiries.

Additional layout review:

- [Desktop hero](../browser/desktop.png): heading, Dubai/Al Quoz context, breadcrumb, primary quotation/call actions, form-entry link and film-application image are balanced and legible. The image caption stays visible. The three supporting information panels and section navigation align without overlap.
- [320 px mobile hero](../browser/mobile-320.png): header controls and multiline H1 fit. Main quotation CTA remains visible above the fixed contact bar. The bar provides clear WhatsApp and Call actions. At the captured scroll position it covers part of the duplicate inline Call action near the viewport edge; this is normal fixed-bar overlap at that point, with a visible bar Call alternative and scrollable content. It is not a new visual blocker.
- [Workshop section](../browser/workshop.png): photograph, light-theme heading/body/checklist and links are readable. The caption explicitly says PPF coverage is not documented for the pictured cars, preserving the distinction between workshop context and installation evidence.

Limits: screenshot inspection does not establish screen-reader behavior, numeric contrast compliance, real-device keyboard/browser behavior, platform call/WhatsApp delivery, GA ingestion, field Core Web Vitals or production publication. Functional validation, focus/keyboard, no-JavaScript, deduplication and analytics assertions are covered separately by the final browser regression. AI-platform access limits and live routing failures remain in the other reports. No app source/configuration edit, new enquiry or deployment was performed during this review.
