# Phase 2 quotation-form visual QA

Reviewed on 17 October 2026 (Asia/Dubai), against the eight latest generated form screenshots. Final build evidence records source SHA-256 `b66850d24222e5193cf8bc98e9631e61a0e6efbe650bb965ec88cd08e5efbc4e` in `qa/build-results.json`.

Result: no visual blockers observed in the reviewed captures. No source files were changed during this review.

| Screenshot in ../browser/ | Review outcome |
|---|---|
| en-quote-320-dark.png | Labels, values, optional notes, CTA and full notice readable; controls fit the captured form width. |
| en-quote-320-light.png | Text and field boundaries clear; notice and privacy link wrap without visible clipping. |
| en-quote-390-dark.png | Single-column flow clear; CTA and privacy notice fit. |
| en-quote-390-light.png | Clear field/label contrast; no obscured or clipped controls visible. |
| ar-quote-320-dark.png | Arabic labels/notice readable; Latin model retains leading 911; telephone remains legible left-to-right. |
| ar-quote-320-light.png | Direction, wrapping and spacing clear; notice/CTA/privacy link fit. |
| ar-quote-390-dark.png | Correct visible numeric-first Latin model order; Arabic labels and notice remain legible. |
| ar-quote-390-light.png | Clear Arabic layout, controls and complete notice; no visual clipping observed. |

The supplied `911 Test & Model` value now visibly retains that order in both languages. Source inspection separately confirms `dir="auto"` on vehicle brand/model, customer name and notes, with `dir="ltr"` on contact details. This resolves the numeric-first Latin presentation issue observed in the earlier Phase 1 screenshots.

Both language notices visibly explain the WhatsApp draft handoff, enquiry reference and limited source information, inability to confirm receipt, preferred reply method and absence of marketing subscription. The privacy link is visible. The CTA says Continue to WhatsApp / المتابعة إلى واتساب and does not visually claim successful submission or a confirmed booking. The selected coverage is the localized Unsure option.

The isolated tall-form screenshots hide fixed site chrome only during capture, so these images cannot establish header/sticky-bar interaction in an ordinary scrolling viewport. Screenshot inspection also cannot prove form validation, keyboard/screen-reader behavior, campaign-token allowlisting, analytics privacy, deduplication, receipt, delivery or runtime correctness. Those require the separate browser and other QA evidence; `../browser/browser-results.json` records the parent's completed browser run. No production behavior, account ingestion or received lead is claimed from these images.

