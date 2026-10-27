# Asset and licensing notes

Prepared 20 October 2026. This document describes the provenance and known usage conditions of this project. `asset-manifest.json` is the file-level source/hash register. Brand and service evidence is in `brand-research.md`.

## Automotive imagery and graphics

| Asset | Provenance | Usage record |
| --- | --- | --- |
| `assets/hero-coupe.png` | Original generic automotive plate, 1672 × 941, generated with the built-in image-generation service on 20 October 2026 | Used as the car plate in the 2.5D composition |
| `assets/engine-exploded.png` | Original generated illustrative engine artwork, 1024 × 1536 RGBA, same service and date | Supplied project asset; independent engine component motion is implemented in code |
| `assets/paint-macro.png` | Original generated paint/detail plate, 1672 × 941, same service and date | Used for paint-care material imagery |
| Timeline, component artwork, telemetry and surface effects | Original project source in `src/` | Editable production-created graphics; telemetry is illustrative |

The imagery was created for this commercial rather than licensed from a third-party photo collection. Use of generated output is governed by the terms applicable to the generating account and service. The [OpenAI Terms of Use](https://openai.com/policies/terms-of-use/) allocate output rights between the user and OpenAI to the extent permitted by law and state that outputs may be similar to other outputs. This record does not guarantee uniqueness, exclusive copyright or clearance of every possible third-party right. Business accounts may have a different governing agreement; the account's applicable terms control.

The car and engine are illustrative visuals, not photographed customer work, engineering documentation or a representation of a specific supported model's mechanical operation. No licensed third-party vehicle model is included. Existing local workshop/car photographs were examined only as references; no advertising-reuse license or release was established, so they are excluded from final production media.

## DIGI-TEC brand artwork

The logo copies come from the user's existing DIGI-TEC project and are used in the specifically requested DIGI-TEC commercial. They are not offered as freely licensed third-party logos.

| File | Source and treatment |
| --- | --- |
| `digitec-wordmark-light-original.png` | Existing website footer wordmark, 429 × 49; preserved unchanged and selected by the current composition |
| `digitec-wordmark-original.png` | Existing 5802 × 737 black/orange wordmark on white; preserved unchanged |
| `digitec-d-original.png` | Existing transparent standalone D, 437 × 308; preserved unchanged |
| `digitec-wordmark-light-existing.png` | Existing 2018 × 232 white/orange derivative from previous project video work; copied unchanged and currently unused |

The previous light derivative's source script records matte extraction from a supplied logo JPEG and recoloring to light letters/orange D. It is not a vector original and has some edge noise. No logo was generated with image generation for this commercial. The current 429 × 49 selected light logo is enlarged uniformly; its source resolution limits edge fidelity.

The underlying logo/trademark ownership was not independently audited. No GAD Motors logo is included. A plain-text GAD relationship line is supported by the official DIGI-TEC and GAD contact pages cited in the research document; it does not create an exclusive-partner or certification claim.

## Music and sound design

`src/audio.py` synthesizes the score and sound effects from mathematical oscillators, shaped noise and envelopes. It does not load commercial music, recorded engine clips, sample packs or third-party sound effects. The production WAVs are `assets/audio/master.wav`, `music.wav` and `sound-design.wav`; the adjacent `audio-manifest.json` records timing and audio measurements.

These are original production-created sounds. The engine-inspired synthesis is expressive sound design, not an authentic recording of the illustrated car's engine. No external music attribution or sample-pack license is required by this source provenance. Python and NumPy remain separately licensed software dependencies.

## Fonts

Bahnschrift, Segoe UI, Segoe UI Semibold and Consolas are read from the production machine's Windows font installation. **No system font files are distributed with the editable project.** An editor must have a lawful font installation or use appropriately licensed replacement fonts and inspect the resulting layout. The rendered video contains rasterized typography; the editable source only records family mappings. This document grants no font redistribution rights.

## Software and bundled encoder

`@napi-rs/canvas` is the declared Node dependency. Its [upstream license](https://github.com/Brooooooklyn/canvas/blob/main/LICENSE) includes the MIT license and additional notices. Preserve the actual installed package's license files and dependency notices if distributing that software. `npm install` installs the version recorded in the project package files; system fonts are not part of the package.

The local Windows encoder identifies itself in `tools/ffmpeg/README.txt` as **FFmpeg 9.0.2 essentials**, built by Gyan, under **GPL v3**. The original `tools/ffmpeg/LICENSE` and README are retained. The README identifies the FFmpeg source revision as [946fcce07b](https://github.com/FFmpeg/FFmpeg/commit/946fcce07b), and the [build provider page](https://www.gyan.dev/ffmpeg/builds/) supplies build and dependency information. Preserve these notices and observe the included license when redistributing encoder software; the FFmpeg binary can also be replaced with the recipient's own installation through `FFMPEG_PATH`.

Software licenses and creative-asset provenance are recorded separately. This project does not apply an invented blanket license to DIGI-TEC trademarks, proprietary system fonts or third-party software.
