# Original score and sound design

`assets/audio/master.wav` is the synchronized final mix for both aspect ratios. It is exactly **35.000 seconds**, stereo, **48,000 Hz**, **16-bit PCM**. The score is an original restrained electronic composition at **108 BPM**, with dark D-minor/suspended harmony, low percussion, sub-bass, evolving pads and a sparse glass motif. The first ignition and the closing logo have space around them; the protection section opens into softer air textures.

All music and effects are synthesized from oscillators and deterministically seeded noise in `src/audio.py`. There are no third-party recordings, stock music, commercial samples, voice recordings or sound-library dependencies. The automotive effect is a cinematic synthesized engine; it does not reproduce or claim to identify any manufacturer's engine recording.

## Timing

| Time | Sound |
| --- | --- |
| 0.075–3.20 s | Starter whir, uneven combustion catch and low exhaust bloom |
| 0.50–35.00 s | Original electronic score, with gentle final fade |
| 3.62–4.14 s | Camera/air sweep into diagnostics |
| 4.12–8.53 s | Precision validation chirps and scanning texture |
| 8.57–9.15 s | Mechanical transition sweep |
| 8.90–13.90 s | Servo movements and controlled metallic component settles |
| 13.52–14.17 s | Tuning transition sweep |
| 14.12–19.82 s | Combustion/exhaust acceleration, two small gear-change dips and turbo air |
| 19.46–20.19 s | Acceleration transition and short pressure release |
| 20.35–26.82 s | Soft film/squeegee movement and surface-polish textures |
| 26.60–27.14 s | Montage sweep |
| 27.05–30.75 s | Five mechanical/data accents through the service montage |
| 30.50–31.17 s | Sweep into the brand finale |
| 31.000 s | Warm cinematic closing impact |
| 32.35–33.95 s | Subtle final engine breath beneath the call to action |
| 33.90–35.00 s | Cosine fade to digital silence |

The detailed machine-readable cue sheet and measured audio checks are in `assets/audio/audio-manifest.json`.

## Editable audio and rendering

Run from the project folder with Python 3 and NumPy installed:

```powershell
python src/audio.py
```

The script regenerates the final `master.wav`, a `music.wav` stem, a `sound-design.wav` stem and the cue/QA manifest. To change individual events, edit their times and gains in `sound_design()`. To change musical material, edit `score()`, the chord list, note sequence or `BPM`. The current tempo spans exactly 63 quarter-note beats in 35 seconds. Changing BPM changes musical phrasing but does not change the fixed 35-second export length.

The mix uses music ducking around ignition, acceleration and the closing impact, mild bus saturation, a 10 Hz DC/infra-bass filter, peak normalization and 16-bit TPDF dither. Stem files carry the master gain and fade but remain unprocessed by bus saturation/DC filtering, so summing the stems will differ slightly from the mastered file. Use `master.wav` for the final video mux.

## Verification

The exported WAV was reopened and checked with NumPy: **1,680,000 stereo frames**, exact duration **35.000 s**, peak **−1.5003 dBFS**, average RMS **−17.6963 dBFS**, **zero clipped samples**, all samples finite, near-zero DC mean, final sample `[0, 0]`. Stereo correlation is **0.926297**, with centered low-frequency material and restrained panned details. RMS is a sample-domain measurement, not an integrated LUFS certification. AAC encoding and final audio/video playback require the checks in the main render pipeline.
