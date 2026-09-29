# SEO audit comparison — candidate

The candidate build removes all baseline duplicate article titles/descriptions and broken content links, while preserving the canonical inventory. This is a **local artifact comparison**, not proof that the changes are deployed or ranking improvements have occurred.

| Check | Baseline | candidate |
| --- | ---: | ---: |
| metadataIssues | 0 | 0 |
| duplicateTitles | 32 | 0 |
| duplicateDescriptions | 31 | 0 |
| duplicateH1 | 32 | 1 |
| duplicateContent | 0 | 0 |
| brokenLinks | 6 | 0 |
| brokenFragments | 0 | 0 |

- Built routes: 1247 → 1247; canonical sitemap URLs: 996 → 996; 0 additions / 0 removals.
- Changed across the public inventory: 38 titles, 476 descriptions, 38 H1 values, 797 extracted content bodies and 125 content-link lists. These categories overlap and must not be summed.
- All four identified Porsche details now have in-content links: /porsche/problems/brake-warning-light, /porsche/problems/cayenne-air-suspension, /porsche/systems/rear-axle-steering, /porsche/systems/sport-chrono. Remaining zero-content-inlink entries are navigation/footer utility pages, not the previously isolated detail guides.
- Remaining H1 duplicate pairs: [{"value":"mercedes v-class vrx consultation","paths":["/ar/vrx","/vrx"]}]. The VRX English heading on /ar/vrx existed before this change; it is a localization task, not proof of an indexing block.

## Arabic adaptation coverage

At 2026-09-17T09:34:03.666Z, source maps contain explicit adaptations for **51/51** BlogPost records; **51/51** are connected in the resolver. This source snapshot can be ahead of the compiled candidate build and does not confirm their rendered output.

Not connected in this snapshot: None.

Before publishing a final 51-article coverage claim, verify the complete source maps are connected, confirm each final Arabic page includes the intended adaptation body, preserve true publication dates/media, and retain intentional noindex policy for untranslated specialist-boundary routes unless their policy is separately reviewed.

## Remaining blockers and evidence needs

- **Production routing:** the baseline's six nonexistent Arabic destinations return HTTP 200 with homepage canonical. Removing content links prevents those journeys but does not fix unknown URL status handling. This requires actual host/edge routing activation and fresh HTTP verification; uploading static routing files alone is insufficient.
- **Final rendered verification:** All 51 BlogPost adaptations are connected in the source snapshot. The final build must still be checked against the complete resolver output.
- **Deployment state:** candidate files are local. Live claims require a fresh post-deployment comparison, not reuse of baseline results.
- **Business evidence:** real workshop work, expert review, authentic photos, customer reviews and verified profile details remain the inputs that code cannot fabricate. These support usefulness and local credibility; lack of new evidence is not a reason to invent it.
- **Measurement:** historical GSC reporting dates remain September 7–13. No new ranking gain is demonstrated by this release. Field performance still needs an available report or subsequent collection; blocked PageSpeed quota is not a performance score.

No word-count thresholds or automated similarity scores are used as release blockers in this comparison. Those baseline signals prioritize editorial review only.
