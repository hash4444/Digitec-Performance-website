# DIGI-TEC Performance Center commercial

## Number-free 4K vertical edition

The updated source removes all scene counters, chapter prefixes, service list indices and engine part numbers. The revised vertical output is `renders/digitec-vertical-4k.mp4`, 2160 × 3840 at 30 fps for 35 seconds. Text, vectors and compositing are rendered directly on the 4K canvas. Photographic plates retain the detail available in the supplied original assets.

```powershell
node src/render.mjs --preview --format vertical --scale 2
node src/render.mjs --format vertical --scale 2
node src/qa.mjs --4k
node src/package-source.mjs --4k
```

The revised source archive is `renders/digitec-editable-source-4k.zip`; the 4K cover is `renders/digitec-cover-4k.png`. The earlier HD exports and their QA records are preserved. See `QA-4K-REPORT.md` for the revised export's checks.

Editable, deterministic seven-scene automotive motion graphics project. The composition targets **35 seconds at 30 fps**, with separately composed **1080 × 1920 vertical** and **1920 × 1080 horizontal** exports, H.264 video and AAC stereo audio.

**Delivery status:** both complete MP4s have been rendered and passed 24 technical checks each. Both played from beginning to end in the in-app browser without media errors, and final encoded frames have been visually inspected. See `QA-REPORT.md` and `qa/technical-report.json` for the release record and limitations.

## Project files

| Path | Purpose |
| --- | --- |
| `src/composition.mjs` | Timeline, scene layouts, typography, diagnostics, telemetry, car reflections, film and coating animation |
| `src/engine.mjs` | Independent animated mechanical component artwork |
| `src/runtime.mjs` | Canvas loading and font registration |
| `src/render.mjs` | Preview generation and frame-by-frame FFmpeg encoding |
| `src/audio.py` | Original synthesized score, engine-inspired sounds, transitions and audio stems |
| `assets/` | Preserved brand images and original generated automotive plates |
| `assets/audio/` | 48 kHz stereo master, music and sound-design WAV stems; cue/measurement manifest |
| `renders/` | Output MP4s and social cover |
| `qa/` | Scene frames, contact sheets, encoder logs and render evidence |
| `asset-manifest.json` | Asset sources, hashes, rights status and claim sources |
| `docs/brand-research.md` | Official website research and permitted claim scope |
| `docs/asset-licenses.md` | Creative asset, font and tool licensing notes |

This is a Canvas2D / `@napi-rs/canvas` production with deterministic JavaScript animation and FFmpeg encoding. It uses 2.5D plates plus independently animated components, graphics and material effects. It contains no editable 3D vehicle model or physically simulated engine cycle. Generated automotive imagery illustrates the services; it does not document actual customer vehicles or completed DIGI-TEC jobs.

## Set up

Use Node.js **20.11 or newer** and npm. From this project directory:

```powershell
npm install
npm run preview
```

The preview command writes full-resolution scene PNGs, a contact sheet for each format, and `renders/digitec-cover.png`. It renders stills and does not start a web server or encode a preview MP4.

The render script uses `tools/ffmpeg/bin/ffmpeg.exe` by default. The local Windows FFmpeg build includes its license and README. To use another installed executable, set its full path before rendering:

```powershell
$env:FFMPEG_PATH = 'C:/Tools/ffmpeg/bin/ffmpeg.exe'
$env:FFPROBE_PATH = 'C:/Tools/ffmpeg/bin/ffprobe.exe'
```

On macOS/Linux, point `FFMPEG_PATH` to the local executable (for example `/usr/bin/ffmpeg`). It must support `libx264`, AAC, raw RGBA input and the `loudnorm` filter.

The editable-source ZIP includes all artwork, WAV stems, source, prompts, research, QA and the cover. The final MP4s are delivered separately. Node modules, FFmpeg executables and Windows fonts are excluded from the ZIP. Download an FFmpeg build from [FFmpeg's official download directory](https://ffmpeg.org/download.html) or the production build provider [Gyan](https://www.gyan.dev/ffmpeg/builds/) and set both executable paths above. On macOS/Linux also set `FFPROBE_PATH` to the installed `ffprobe` executable.

The supplied WAV files are ready for rendering; Python is needed only to regenerate sound. For regeneration, use Python 3.10+ with NumPy:

```powershell
python -m pip install numpy
python src/audio.py
```

## Fonts

The production machine reads these Windows-installed fonts from `C:/Windows/Fonts`; the files are not bundled:

| Filename | Canvas family |
| --- | --- |
| `bahnschrift.ttf` | `DigiDisplay` |
| `segoeui.ttf` | `DigiText` |
| `seguisb.ttf` | `DigiSemi` |
| `consola.ttf` | `DigiMono` |

On another system, use fonts you are entitled to install and set `DIGITEC_FONT_DIR` to their directory, or change the filename/family mapping in `src/runtime.mjs` to suitably licensed alternatives. Do not copy or redistribute Windows font files with this project.

```powershell
$env:DIGITEC_FONT_DIR = 'D:/LicensedFonts'
```

Missing named fonts may cause fallback. After any font change, inspect text width, line breaks, contrast and mobile legibility using both contact sheets before final rendering.

## Render

Render both complete outputs:

```powershell
npm run render
```

Or render one format:

```powershell
npm run render:vertical
npm run render:horizontal
```

Expected final files are `renders/digitec-vertical.mp4` and `renders/digitec-horizontal.mp4`. Each contains 1,050 deterministic animation frames. The encoder is configured for constant 30 fps, H.264 High profile, YUV420p, CRF 17, BT.709 tags, AAC 256 kbps/48 kHz, MP4 fast start and loudness normalization targeting −16 LUFS / −1.5 dBTP. These are configuration targets; final QA must report measured results. Rendering overwrites the output with the same filename.

For a short fast-encode motion check:

```powershell
node src/render.mjs --format vertical --seconds 8 --draft
```

This writes `renders/digitec-vertical-preview.mp4`. The draft uses a faster encoder preset and CRF 23 at the same canvas resolution. It remains a partial preview when `--seconds` is shorter than 35.

## Edit the commercial

Edit scene copy and layout in `src/composition.mjs`. `SCENES`, `FPS`, `DURATION` and `ORANGE` define the main timing and palette. Scene functions receive local time, and the vertical/horizontal layout branches position artwork separately. Changing an image only requires replacing the corresponding asset and preserving its filename, or changing `loadAssets()`; inspect both crops afterward.

| Seconds | Scene |
| --- | --- |
| 0–4 | Brand introduction and car reveal |
| 4–9 | Diagnostics and supported ECU/module programming |
| 9–14 | Mechanical repairs, electrical systems and servicing |
| 14–20 | Performance tuning and illustrative calibration graphics |
| 20–27 | Body repair, paint protection film and ceramic coating |
| 27–31 | Full-service montage |
| 31–35 | DIGI-TEC finale and booking call to action |

The audio timeline is separate in `src/audio.py`. Keep its duration and cue times aligned when changing scene boundaries. Rebuild the audio, run `npm run preview`, inspect the stills, render a draft, then produce the full MP4s. Edit the logo mapping only with approved brand artwork, preserve its native aspect ratio and update the asset manifest if replacing it.

Performance graphs are illustrative animation, not recorded measurements. Keep the website-supported service scope and GAD relationship wording recorded in the research document. Do not add horsepower gains, universal compatibility, certification, warranty, price or completed-job claims without evidence.

## Verify a delivery

Use the final QA report and machine-readable results in `qa/` as the release record. A complete check covers both output files, dimensions/codecs, duration, frame count, decode errors, audio peaks/loudness, scene continuity and text/logo appearance. Play both MP4s from start to finish after any final render. The supplied PNG contact sheets are useful for visual review but cannot establish smooth motion or audible quality.

Known source limitation: the official transparent light wordmark used by the current composition is 429 × 49 and enlarged uniformly for the finale. It is a raster asset, not a vector. A preserved 2018 × 232 light derivative is supplied for optional evaluation, but is not currently selected because its matte has visible edge noise. A cleaner high-resolution official transparent light wordmark would improve final logo fidelity.

## Review player and source archive

Run `npm run review` and open `http://127.0.0.1:8789/review.html`. The local player switches between the two final videos, offers scene navigation, and links to deliverables. It starts with sound muted; choose **Enable sound** for audio. You can also open `review.html` directly in a browser alongside the `renders/` files. After extracting only the source ZIP, re-render or copy the separately delivered MP4s into `renders/` before using the player.

Run `npm run qa` after a final render. It checks the encoded files and writes metadata, decoded frames, presentation timestamps and audio measurements. Run `npm run package` to rebuild the source ZIP after updating documentation and QA. Packaging also produces `qa/delivery-manifest.json` with SHA-256 hashes of the final files.
