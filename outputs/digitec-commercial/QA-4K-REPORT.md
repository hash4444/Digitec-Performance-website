# DIGI-TEC — number-free 4K vertical edition

Final video: `renders/digitec-vertical-4k.mp4`.

Removed all visible scene counters such as 01 / 07, chapter number prefixes, service list indices and engine component indices. Labels and service names remain. A text draw audit covering all 1,050 frames found zero numeric text draws; independent source review confirmed every numbering family was removed. See `qa/numbering-audit-4k.json`.

| Final encoded check | Result |
|---|---|
| Resolution | 2160 × 3840, vertical 9:16 |
| Duration | 35.000 seconds |
| Frame rate / count | Constant 30 fps / 1,050 frames |
| Codec | H.264 High, Level 5.1, YUV 4:2:0, BT.709 |
| Audio | AAC stereo, 48 kHz |
| Audio loudness / true peak | −15.81 LUFS / −1.37 dBTP |
| Full FFmpeg decode | Pass, no errors |
| Frame presentation timing | All timestamps increasing with constant 1/30 s intervals |
| Technical QA | 24 / 24 checks passed |
| File size | 20,168,269 bytes |

Final decoded samples include scene centers, both sides of each main cut and the opening/final frames. The decoded contact sheet was visually inspected for layout and numbering removal. Existing timing, music, sound design, service copy and animation are preserved.

Text, vector graphics and compositing are re-rendered directly on the 2160 × 3840 canvas. Original photographic plates and the official raster logo retain their available source detail; exporting at 4K does not create new photographic detail. Earlier HD exports and their original source archive remain separate.

Re-render with `node src/render.mjs --format vertical --scale 2`; verify with `node src/qa.mjs --4k`. The revised editable archive and cover use the `-4k` suffix. Full measured results are in `qa/technical-report-4k.json`; delivery hashes are in `qa/delivery-manifest-4k.json`.
