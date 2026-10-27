# DIGI-TEC commercial: brand, claims and asset research

Research date: 20 October 2026 (Asia/Dubai). Research only; no website source or production deployment was changed.

## Brand and visual identity

The [official DIGI-TEC homepage](https://digitecme.com/) identifies the business as DIGI-TEC Performance Center, an independent workshop in Al Quoz Industrial Area 3, Dubai. It lists mechanical and electrical repairs, diagnostics, body work, maintenance and vehicle-specific performance projects. The requested orange `#EB6736`, black, white and graphite palette is appropriate for this commercial. The brief supplies that exact orange; it is not presented as a separately verified brand-guidelines specification.

The existing project contains a high-resolution orange-and-black DIGI-TEC wordmark at `public/images/digitec-logo-english.png` (5802 × 737). It was visually inspected and copied unchanged to `assets/digitec-wordmark-original.png`. The original aspect ratio is 7.8724559:1. Preserve it. Its white background should be considered when compositing against the dark commercial.

`src/components/Footer.tsx` uses the white-and-orange wordmark `public/lovable-uploads/916789e0-b6fb-43d4-9d52-79899ce5a1c2.png` (429 × 49); the unchanged copy is `assets/digitec-wordmark-light-original.png`. This lower-resolution version is a useful reference for the intended light-on-dark wordmark. It should not be enlarged for a large finale without evaluating edge quality. The standalone transparent D is `public/images/digitec-d.png` (437 × 308), copied unchanged to `assets/digitec-d-original.png`. The current header's glowing D is `public/images/digitec-d-mark.png` (1536 × 1024); it was inspected but omitted from the production copies because the brief calls for restrained glow and crisp branding.

The full wordmark and D visually share the same shape system. Source files have been preserved, not reconstructed with a substitute font. A live remote byte-for-byte match could not be established: direct shell DNS failed, and the web reader could read official pages but could not fetch those PNG endpoints. Repository references and visual inspection are the evidence available for the brand assets; do not describe them as remotely hash-verified.

### Additional light wordmark found in prior video work

An existing 2018 × 232 transparent RGBA white/orange wordmark was found at `outputs/video-wall-edit/digitec-video-overlay.png`, with an identical copy in `outputs/video-8k-logo/`. It has been copied unchanged to `assets/digitec-wordmark-light-existing.png` (SHA-256 `02d26bcac475a67a043e4b2c062999f21656e5e09fb2b4535cf3c32e66319cba`). The existing `outputs/video-wall-edit/prepare_logo.py` records its origin: a user-supplied JPEG in Downloads, matted and changed to white letters/orange D for the earlier video overlay. This is an existing derived brand asset, not an official original export or a newly generated logo. Its native alpha edges contain some noise; evaluate the final display size. The source supplied JPEG is `C:/Users/ADMIN/Downloads/dfaf0ccb-60e7-44bf-9a01-5b0769bbcc76_resize.jpg`. Preserve the 2018:232 proportions. The production owner will add any actual use of this asset to the final manifest.

Searches through all public/source image dimensions, named logo assets and SVG files found no DIGI-TEC SVG or higher-resolution original transparent light wordmark. The 5802 × 737 black/orange original remains the cleanest high-resolution source.

## Claims permitted by the inspected official pages

| Proposed screen text | Support and scope |
| --- | --- |
| ADVANCED DIAGNOSTICS | The [diagnostics page](https://digitecme.com/services/car-diagnostics-dubai) describes supported fault scanning, live data and relevant physical/circuit tests. This is a service category, not a claim of a particular manufacturer's diagnostic accreditation. |
| ECU & MODULE PROGRAMMING | The same page discusses coding and programming after checking the vehicle, module, software and available access. A small `Vehicle-specific scope` qualifier is appropriate. Do not imply every ECU or function is supported. |
| MECHANICAL REPAIRS / ELECTRICAL SYSTEMS / PRECISION SERVICING | Listed on the [homepage](https://digitecme.com/). Mechanical diagrams should remain illustrative, with no model-specific operation claimed. |
| PERFORMANCE TUNING / ENGINE & ECU CALIBRATION | The [tuning page](https://digitecme.com/tuning) supports ECU calibration and projects planned around vehicle condition, fuel, use and supporting hardware. Avoid gains, package prices, dyno results or universal compatibility. |
| BODY REPAIR | The [body repair page](https://digitecme.com/services/car-body-repair-dubai) supports panel repair, dent work, preparation and refinishing where suitable. The result depends on panel material, damage and paint condition. |
| PAINT PROTECTION FILM | The [PPF page](https://digitecme.com/services/paint-protection-film) supports full-body and selected-panel installation, with film and scope agreed for the car. Show a thin physical sheet following paint curvature; do not show an invulnerable barrier. |
| CERAMIC COATING | The [coating page](https://digitecme.com/services/ceramic-coating) supports surface treatment and paint preparation. Gloss and water-beading imagery are appropriate; do not imply chip protection, scratch proofing or a universal lifespan. |
| DUBAI, UAE / digitecme.com / BOOK YOUR SERVICE | The location and domain are supported by the homepage. The call to action is an invitation to contact; the official booking process requires confirmation by the workshop. |

`PRECISION. PERFORMANCE. EXCELLENCE.` and `ENGINEERED FOR EXCELLENCE.` are supplied creative slogans. They are not presented as pre-existing registered taglines or measurable guarantees.

## GAD Motors relationship

The [DIGI-TEC tuning page](https://digitecme.com/tuning) says GAD Motors lists DIGI-TEC as a UAE contact. The independently inspected [GAD Motors official homepage](https://www.gad-motors.de/) corroborates this: its worldwide contact area lists the DIGI-TEC website, matching telephone number, Al Quoz Industrial Dubai, and DIGI-TEC logo. Its introductory contact text refers to GAD dealers/approved repair facilities, but the conservative specific wording for this commercial is **GAD MOTORS · UAE CONTACT**. This preserves the verified relationship without introducing an exclusivity, certification or corporate-ownership claim. No GAD logo was licensed or copied for the commercial; use a modest plain-text relationship line if included.

## Image and audio provenance decision

The project includes potentially useful car images: `public/images/cars/amg-gt.png` (1024 × 640, studio coupe on white), `public/images/tuning-hero-bg.jpg` (1920 × 811, GAD vehicles), `public/images/hero-bg.png` (1536 × 1024) and `public/images/mercedes-engine-repair.png` (1086 × 1448). No usable ad-reuse license or customer/property release was found for them in the inspected project documentation. They are **reference only**, not cleared final-commercial assets. Existing website publication does not establish advertising rights. Likewise, a workshop vehicle photograph does not prove a PPF/coating installation on that vehicle; existing project SEO notes explicitly preserve that distinction.

Use original generated generic automotive imagery or original procedural geometry and animations for final scenes. Document those assets separately when produced. Do not include manufacturer badges, identifiable customer plates or a claim that illustrative visuals depict completed DIGI-TEC jobs. Original synthesis is the preferred audio source if licensed engine/music libraries are unavailable. No third-party audio or 3D model was acquired in this research phase.

Brand assets are supplied by the user's existing brand project and used in the specifically requested DIGI-TEC commercial. Underlying trademark ownership was not independently audited. `asset-manifest.json` records source locations, preserved SHA-256 hashes, dimensions and rights status. Production-generated assets, audio and fonts must be appended by their respective producers.

## Remaining production dependencies

- High-quality original generic automotive imagery/geometry and animated mechanical components.
- Original or expressly licensed soundtrack and synchronized sound effects.
- Font files with a redistribution license if bundled with editable source.
- Final scene and encode QA for both aspect ratios; this research document does not assert that any video has rendered.
