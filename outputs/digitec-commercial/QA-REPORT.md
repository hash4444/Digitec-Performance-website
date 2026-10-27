# DIGI-TEC commercial — final QA

Production date: 20 October 2026, Asia/Dubai.

## Final encoded deliverables

| Check | Vertical | Horizontal |
|---|---|---|
| File | `renders/digitec-vertical.mp4` | `renders/digitec-horizontal.mp4` |
| Resolution | 1080 × 1920 | 1920 × 1080 |
| Duration | 35.000 seconds | 35.000 seconds |
| Frame rate / count | 30 fps / 1,050 frames | 30 fps / 1,050 frames |
| Video | H.264 High, YUV 4:2:0, BT.709 | H.264 High, YUV 4:2:0, BT.709 |
| Audio | AAC stereo, 48 kHz, 256 kb/s target | AAC stereo, 48 kHz, 256 kb/s target |
| File size | 10,847,119 bytes | 10,260,794 bytes |
| Full FFmpeg decode | Pass; no errors | Pass; no errors |
| Technical checks | 24 / 24 pass | 24 / 24 pass |
| HTML5 browser playback | Played 0–35 s; ended, no media error | Played 0–35 s; ended, no media error |
| Presentation timestamps | Strictly increasing, constant 1/30 s | Strictly increasing, constant 1/30 s |
| Encoded loudness | −15.81 LUFS integrated | −15.81 LUFS integrated |
| Decoded true peak | −1.37 dBTP; no clipping | −1.37 dBTP; no clipping |

Checks ran against the final MP4 streams, not only source canvases. Every video frame was decoded; all 1,050 presentation timestamps were checked in each output. No missing or irregular timestamp intervals were found. Full metadata, logs and sampled final frames are in `qa/technical-report.json`, `qa/decoded-vertical/` and `qa/decoded-horizontal/`. MP4 headers are moved to the front for streaming playback.

Both final files were also played from the beginning to the end in the in-app browser, with readyState 4, correct dimensions, duration 35, ended=true and no media error. The browser tracks were muted. The observed start and end media states are recorded in `qa/browser-playback.json`.

## Visual and continuity review

The complete preview was rendered before final export. Final encoded samples cover all seven scenes, both sides of each primary scene cut, opening and final frames. Full-resolution composition frames and decoded contact sheets were inspected. Independent design review identified and corrected two portrait telemetry collisions and an engine reassembly discontinuity before the final exports.

The car plate feathers into the studio environment. Diagnostic paths, scanning grids, signal markers, four separate engine component layers, calibration graphics, moving reflections, flexible film overlay and coating droplets animate independently. Typography has separate portrait and landscape placements. Main service copy remains within the composition; engine masks have no visible seams or missing sections. The official light logo retains its native proportions and is centered on the final slate. Initial black, brief dark cut shutters and the closing fade are intentional.

The cover at `renders/digitec-cover.png` is 1080 × 1920. Both contact sheets and the editable source are supplied.

## Audio and claims

The score and effects are original deterministic synthesis, with no commercial music or stock samples. Ignition, diagnostic ticks, mechanical accents, acceleration, film movement, montage accents and the final impact align to the scene timeline. Final AAC audio was decoded and measured; the WAV master and stems are supplied. Playback checks were muted for automation, so they verify media playback and decoding rather than a human listening assessment.

Official site research supports diagnostics, supported ECU/module programming, mechanical/electrical repair, performance calibration, body repair, PPF and ceramic coating. GAD wording is limited to **GAD MOTORS · UAE CONTACT**. Telemetry is labeled illustrative; there are no power gains, pricing, certification, warranty or universal compatibility claims. Research URLs, original visual prompts and rights notes are recorded in the manifest and `docs/`.

## Remaining limitations

- This is a finished 2.5D motion graphics commercial using original generated automotive plates. It does not include an editable full 3D vehicle mesh, true orbiting camera or validated mechanical simulation.
- The engine study illustrates generic assembly and servicing. It is not a model-specific engineering instruction or a real operational cycle. The engine-inspired audio is synthesized, not a recording of a specific vehicle.
- The supplied official transparent light logo is 429 × 49. It is proportionally enlarged for the closing slate; a cleaner official vector or larger transparent original would improve logo fidelity. A larger existing derivative was rejected for visible matte noise.
- Generated imagery is illustrative and does not depict verified customer work. PPF and coating visuals communicate surface treatment conceptually.
- Platform-specific ad placement overlays and final platform recompression were not tested. The source allows easy repositioning or alternate exports if needed.

Final file SHA-256 values and archive validation are recorded in `qa/delivery-manifest.json`. No website deployment, production push or unrelated code change was performed.
