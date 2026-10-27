# Independent saved-browser review

**PASS for the captured desktop/CSS-viewport evidence.** Reviewed 2026-10-26T09:13:29.495Z. This was an offline review of 30 saved observations, AX state captures, local destination responses and four viewed screenshots. No browser interaction, application edit or external contact was performed by this review.

The context is a desktop browser engine: 1272px desktop and actual 390px/320px-wide CSS iframes, 844px high. All recorded scroll widths are within their document client widths. These are responsive CSS viewport checks, not physical iOS/Android or touch testing.

The three desktop body contact records match the existing recipient, exact approved encoded draft and hero/service_scope/final_cta placements, including six encoded line breaks. The narrow body hero capture matches too. Desktop and narrow workshop phone interceptions match tel:+97143402223 and workshop_proof. Contacts were prevented by the QA wrapper; no call/message connection or receipt is inferred.

Saved focus states support visible keyboard focus for the new hub links, workshop phone and body final controls. AX evidence shows the body FAQ expanded/collapsed, a narrow FAQ answer expanded, and Menu expanded then collapsed with focus restored to Menu. These are recorded QA results; this independent review did not replay the keys. Local GET/HEAD responses for both linked service destinations are 200. The collected console-log API result is empty, with the capture limitation retained.

## Four visual checks

- [hub-desktop-diagnostics-focus](screenshots/hub-desktop-diagnostics-focus.png): Workshop caption text and both contextual links are readable. Diagnostics has a visible focus outline; no clipping of changed caption content is visible.
- [hub-mobile-390-caption-frame](screenshots/hub-mobile-390-caption-frame.png): 390px CSS viewport shows the full workshop caption, both new link phrases and visible Diagnostics focus outline. Text wraps within the card; fixed navigation/contact bars do not cover the changed caption in this captured view.
- [body-desktop-final-guidance-focus](screenshots/body-desktop-final-guidance-focus.png): Final inspection/quotation guidance and focused body-assessment CTA are fully readable. The telephone text wraps to two lines inside its adjacent button without visible horizontal clipping.
- [body-mobile-320-final-guidance](screenshots/body-mobile-320-final-guidance.png): 320px CSS viewport shows readable wrapped heading and complete new guidance. The focused body-assessment CTA is visible. The following phone control extends below this screenshot edge; ordinary vertical scrolling, not horizontal overflow, is required to view its remainder. No phone visibility defect is inferred from an earlier focusin rectangle.

A focusin rectangle may be measured before auto-scrolling. It is not treated as a failure by itself. The 320px body screenshot requires vertical scrolling for the remainder of the following phone control; it does not establish that the entire phone is visible in that frame. The reviewed changes remain readable without visible horizontal clipping.

The loopback wrapper adds QA-only CSP/contact interception in memory and blocks external analytics/connections/forms. All 32 current baseline/candidate HTML inputs still match their prior SSR hashes. This supports unchanged stored build bytes; it does not test production CSP, tracking delivery, touch behavior, dialers, WhatsApp delivery, leads or Google performance. No deployment or configuration change is authorized by this review.

[Machine-readable checks, screenshot hashes and source evidence](independent-review.json).
