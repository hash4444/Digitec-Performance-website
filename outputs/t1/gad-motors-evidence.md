# T1 GAD Motors relationship evidence

Verified 2026-10-05 (Asia/Dubai), baseline HEAD `546e02fb214212e187c159c303fda2354d480ff3`.

## Primary external business evidence

The [GAD Motors primary website](https://www.gad-motors.de/) lists DIGI-TEC in the section describing its dealer addresses and facilities for local GAD service enquiries. The entry links to `digitecme.com/who-we-are` and identifies UAE / Al Quoz Industrial, Dubai, telephone `+971 4 340 2223` and email `info@digitecme.com`. These identifiers match the repository/deployed DIGI-TEC business contact information.

The source describes a dealer/facility network and the ability to forward complex custom work to GAD in Germany. This supports a real, publicly listed commercial contact relationship. It does not establish an exclusive territory, ownership connection, a specific certification, unrestricted product availability or current support for every brand GAD might serve.

Defensible master-page wording:

> DIGI-TEC is listed by GAD Motors as a UAE contact in Al Quoz, Dubai. The exact GAD software or hardware included in a project is identified in the vehicle-specific proposal.

The English `/contact` path returned 404 during verification; use the verified [main GAD website](https://www.gad-motors.de/) as the authority link. Search also surfaced a Russian-language contact path with the same identifying details, but it is not necessary for the claim.

## Baseline repository and deployed evidence

| Source | Evidence and limit |
| --- | --- |
| `src/pages/Tuning.tsx` | GAD Motors heading, official-site link, GAD parts section and VRX link establish the site's stated offering, but cannot independently validate exclusivity/certification. |
| `src/data/tuningCars.ts` | Existing vehicle-specific packages name GAD hardware/software and several TCU modifications. Package contents support those configurations only. |
| `src/data/blogPosts.ts:835` | Existing GAD article requires vehicle-specific health, fuel, hardware and written scope. It already avoids treating a general partnership as package evidence. |
| `src/data/aiGuidePosts.ts:342` | Existing AMG GT guide says to identify the actual calibration/component supplier in project scope rather than imply one through a general partnership claim. |
| `src/data/aiGuidePostsExtra.ts:1440` | Existing ECU-remap guide says DIGI-TEC works with GAD software; this is consistent with the external listing, but its safety wording is not a universal guarantee. |
| `src/components/VRX/ExteriorTabs.tsx` and `FounderMessage.tsx` | GAD M177 447 VRX project material and named founder content are specific project evidence. They do not make VRX a configurator-supported model or prove every Mercedes/Porsche package. |
| `scripts/prerender-seo.mjs:476-481,529-533` | Fallback uses stronger “official partner” and “official calibration” labels. Replace with the narrower verifiable listing relationship; master HTML should match final visible copy. |

## Claims not established

No independent evidence was found for exclusive UAE distributor status, DIGI-TEC/GAD shared ownership, a named official certification, manufacturer authorization, universal guaranteed gains or a generic gearbox/TCU service applying to every car. The user subsequently confirmed separate Porsche tuning support; this confirms business availability, while model/stage/price/package data remain pending and are not supplied by the GAD dealer listing.

GAD's own general ECU/TCU descriptions are not proof that every DIGI-TEC configuration includes both. TCU service must remain connected to the actual package rows that explicitly name it in the configurator dataset.

## Ownership

Generic GAD Motors, GAD tuning, GAD Motors Dubai/UAE and GAD Mercedes commercial enquiries belong to `/tuning`. The GAD explanatory blog remains an informational supporting article; `/vrx` remains a distinct documented conversion offering. Neither should become a competing generic tuning owner.

## Implementation status

Evidence captured before source changes. The root agent uses the verified listed-UAE-contact relationship in the final master. This subtask replaced stale “official partner”/“official calibration” wording in legacy `scripts/prerender-seo.mjs` with the verified public-listing relationship. The actual build uses `scripts/prerender.mjs` and real React rendering, so visible source and active initial HTML share the root's final master copy. No exclusivity, certification or ownership relationship is introduced.

The AMG GT informational article now directs current package prices and commercial enquiries to `/tuning/mercedes-amg-gt`, with the generic Performance Configurator at `/tuning`. Arabic guidance links to `/ar/tuning`; it does not invent an Arabic model owner.
