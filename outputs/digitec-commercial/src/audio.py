"""Original DIGI-TEC score and sound design, synthesized without samples.

Run: python src/audio.py
Only Python 3 + NumPy are needed. No network, commercial samples, or plugins.
Outputs deterministic 35 s stereo 48 kHz/16-bit master and music/SFX stems.
"""
from __future__ import annotations

import json
import math
from pathlib import Path
import wave

import numpy as np

SR = 48000
DURATION = 35.0
N = round(SR * DURATION)
BPM = 108.0
BEAT = 60.0 / BPM
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "audio"
RNG = np.random.default_rng(791304)
music = np.zeros((N, 2), dtype=np.float64)
sfx = np.zeros((N, 2), dtype=np.float64)
cue_manifest: list[dict] = []


def timeline(duration: float) -> np.ndarray:
    return np.arange(round(duration * SR), dtype=np.float64) / SR


def hz(midi: float) -> float:
    return 440.0 * 2.0 ** ((midi - 69.0) / 12.0)


def fade_edges(x: np.ndarray, attack: float = 0.005, release: float = 0.04) -> np.ndarray:
    x = x.copy()
    a = min(len(x), round(attack * SR))
    r = min(len(x), round(release * SR))
    if a:
        x[:a] *= np.sin(np.linspace(0.0, np.pi / 2.0, a)) ** 2
    if r:
        x[-r:] *= np.cos(np.linspace(0.0, np.pi / 2.0, r)) ** 2
    return x


def noise(duration: float, lo: float, hi: float, rolloff: float = 1.0) -> np.ndarray:
    """Band-shaped noise by real FFT, normalized to RMS 1."""
    count = round(duration * SR)
    n = RNG.normal(0.0, 1.0, count)
    f = np.fft.rfftfreq(count, 1.0 / SR)
    # Smooth filters prevent the ringing of a brickwall frequency mask.
    low = 1.0 - np.exp(-((f / max(lo, 1.0)) ** 4)) if lo else np.ones_like(f)
    high = np.exp(-((f / hi) ** 4))
    color = 1.0 / np.maximum(f / max(lo, 100.0), 1.0) ** (rolloff / 2.0)
    y = np.fft.irfft(np.fft.rfft(n) * low * high * color, n=count)
    return y / (np.sqrt(np.mean(y * y)) + 1e-12)


def put(target: np.ndarray, start: float, mono: np.ndarray, gain: float = 1.0,
        pan: float = 0.0, room: float = 0.0) -> None:
    """Equal-power panning with sparse, low-level stereo early reflections."""
    start_i = round(start * SR)
    channel_gains = np.array([math.cos((pan + 1) * math.pi / 4),
                              math.sin((pan + 1) * math.pi / 4)])
    for delay, reflection, flip in [(0.0, 1.0, False), (0.047, room * 0.4, True),
                                     (0.089, room * 0.27, False), (0.157, room * 0.15, True)]:
        pos = start_i + round(delay * SR)
        lo = max(0, pos)
        hi = min(N, pos + len(mono))
        if hi <= lo:
            continue
        c = channel_gains[::-1] if flip else channel_gains
        target[lo:hi] += mono[lo-pos:hi-pos, None] * (gain * reflection * c[None, :])


def cue(start: float, duration: float, kind: str, description: str) -> None:
    cue_manifest.append({"start_seconds": start, "duration_seconds": duration,
                         "type": kind, "description": description})


def pad(start: float, duration: float, notes: list[int], gain: float) -> None:
    t = timeline(duration)
    for i, note in enumerate(notes):
        f = hz(note)
        detune = 0.0016 * (-1 if i % 2 else 1)
        p = RNG.random() * 2.0 * np.pi
        wave_a = np.sin(2 * np.pi * f * (1 + detune) * t + p)
        wave_b = 0.53 * np.sin(2 * np.pi * f * (1 - detune) * t + p + 0.4)
        wave_c = 0.13 * np.sin(4 * np.pi * f * t + p)
        breathing = 0.85 + 0.15 * np.sin(2 * np.pi * 0.16 * t + i)
        y = fade_edges((wave_a + wave_b + wave_c) * breathing, 0.65, 1.2)
        put(music, start, y, gain / len(notes), (i / (len(notes)-1)-0.5)*1.3, 0.35)


def kick(start: float, strength: float = 1.0) -> None:
    t = timeline(0.35)
    f = 43.0 + 102.0 * np.exp(-t * 58.0)
    phase = np.cumsum(f) * (2 * np.pi / SR)
    body = np.sin(phase) * np.exp(-t * 12.0)
    transient = noise(0.35, 1400, 5000) * np.exp(-t * 160) * 0.07
    put(music, start, fade_edges(body + transient, 0.001, 0.04), 0.23 * strength)


def bass(start: float, note: int, duration: float, strength: float = 1.0) -> None:
    t = timeline(duration)
    f = hz(note)
    y = (np.sin(2*np.pi*f*t) + 0.29*np.sin(4*np.pi*f*t + 0.15)
         + 0.10*np.sin(6*np.pi*f*t + 0.3) + 0.05*np.sin(8*np.pi*f*t))
    y *= np.exp(-t * 2.0)
    put(music, start, fade_edges(y, 0.009, 0.07), 0.108 * strength)


def hat(start: float, strength: float = 1.0, pan: float = 0.0) -> None:
    t = timeline(0.14)
    y = noise(0.14, 5500, 12500, 0.3) * np.exp(-t * 52.0)
    put(music, start, fade_edges(y, 0.001, 0.03), 0.017 * strength, pan, 0.13)


def rim(start: float, strength: float = 1.0) -> None:
    t = timeline(0.19)
    y = (np.sin(2*np.pi*812*t) + 0.6*np.sin(2*np.pi*1339*t)) * np.exp(-t*85)
    y += noise(0.19, 1100, 5200, 0.4) * np.exp(-t*37) * 0.38
    put(music, start, fade_edges(y, 0.001, 0.04), 0.042 * strength, 0.18, 0.3)


def glass(start: float, note: int, gain: float, pan: float) -> None:
    t = timeline(1.5)
    f = hz(note)
    y = (np.sin(2*np.pi*f*t)*np.exp(-t*4.2) +
         0.25*np.sin(2*np.pi*f*2.004*t)*np.exp(-t*7.0) +
         0.09*np.sin(2*np.pi*f*3.91*t)*np.exp(-t*11.0))
    put(music, start, fade_edges(y, 0.008, 0.16), gain, pan, 0.7)


def whoosh(at: float, duration: float = 0.54, gain: float = 0.07, pan: float = 0.0) -> None:
    t = timeline(duration)
    u = t / duration
    env = np.sin(np.pi * u) ** 2.4
    y = noise(duration, 430, 7200, 0.7) * env
    y += 0.17*np.sin(2*np.pi*(110*t + 130*t*t/duration)) * env
    put(sfx, at-duration*0.74, fade_edges(y, 0.015, 0.08), gain, pan, 0.18)
    cue(round(at-duration*0.74, 3), duration, "transition", "Restrained filtered air/camera sweep, apex at scene cut")


def diagnostic(start: float, note: float, gain: float = 0.035, pan: float = 0.0) -> None:
    t = timeline(0.13)
    y = (np.sin(2*np.pi*note*t) + 0.18*np.sin(2*np.pi*note*2*t)) * np.exp(-t*37)
    put(sfx, start, fade_edges(y, 0.002, 0.04), gain, pan, 0.35)


def metal(start: float, gain: float = 0.07, pan: float = 0.0, size: float = 1.0) -> None:
    t = timeline(0.66)
    resonances = [(421, 1.0), (997, 0.55), (1643, 0.22), (2807, 0.13), (4310, 0.06)]
    y = np.zeros_like(t)
    for f, a in resonances:
        y += a * np.sin(2*np.pi*f/size*t + 0.1) * np.exp(-t*(14 + f/300))
    y += noise(0.66, 850, 7100, 0.3)*np.exp(-t*46)*0.36
    put(sfx, start, fade_edges(y, 0.0007, 0.08), gain, pan, 0.28)


def engine(start: float, duration: float, gain: float, rev: bool) -> None:
    """Combustion pulse harmonics, uneven cylinders, filtered intake and turbine air.

    This is a cinematic synthesized engine, not a sampled or brand-specific engine.
    Firing-order imperfections and broad noise reduce the 'pure synth oscillator' tone.
    """
    t = timeline(duration)
    u = t / duration
    if rev:
        # Two gentle gear changes, avoiding a constant sci-fi pitch rise.
        firing = 30 + 105 * np.minimum(u/0.72, 1.0)**1.55
        firing -= 21*np.exp(-((u-0.46)/0.035)**2)
        firing -= 25*np.exp(-((u-0.74)/0.032)**2)
        env = np.sin(np.pi*np.minimum(u/0.96, 1.0)) ** 0.55
        env *= 0.58 + 0.42*np.minimum(u/0.3, 1.0)
    else:
        firing = 24 + 12*(1-np.exp(-t*6)) + 4*np.exp(-((t-0.62)/0.3)**2)
        env = (1-np.exp(-t*22))*np.exp(-t*0.85)
    jitter = noise(duration, 0, 22, 0.4)
    firing *= 1 + 0.016*jitter
    phase = np.cumsum(firing) * 2*np.pi/SR
    exhaust = np.zeros_like(t)
    for harmonic in range(1, 19):
        formant = 0.45 + 0.65*np.exp(-((harmonic*firing-480)/300)**2)
        exhaust += np.sin(phase*harmonic + harmonic*0.17) * formant / harmonic**0.82
    exhaust = np.tanh(exhaust * 1.2)
    uneven = 0.78 + 0.22*np.sin(phase*0.5 + 0.3)**2
    intake = noise(duration, 90, 1900, 0.8)*(0.45 + 0.55*np.sin(phase*0.5)**2)
    turbine = noise(duration, 1200, 6500, 0.25)*np.minimum(u/0.6, 1)*0.16 if rev else 0
    y = (exhaust*0.82*uneven + intake*0.31 + turbine) * env
    put(sfx, start, fade_edges(y, 0.025, 0.26), gain, 0.0, 0.22)


def ignition() -> None:
    t = timeline(0.44)
    starter = noise(0.44, 330, 2350, 0.2) * (0.50+0.50*np.sin(2*np.pi*21*t))
    starter += 0.45*np.sin(2*np.pi*(175*t + 35*t*t))
    put(sfx, 0.075, fade_edges(starter, 0.02, 0.07), 0.05, -0.1, 0.17)
    engine(0.3, 2.9, 0.19, False)
    t = timeline(1.3)
    sub = np.sin(2*np.pi*(31*t + 7*(1-np.exp(-t*8))/8)) * np.exp(-t*4.5)
    put(sfx, 0.27, fade_edges(sub, 0.008, 0.2), 0.15)
    cue(0.075, 3.125, "ignition", "Starter, uneven combustion catch, short low exhaust bloom")


def score() -> None:
    # D minor / suspended harmony. 108 BPM gives exactly 63 beats in 35 seconds.
    chords = [(0.5, 5.0, [50, 57, 60, 64], .105),
              (4.5, 5.0, [46, 53, 57, 60], .11),
              (8.7, 5.3, [43, 50, 57, 58], .108),
              (13.25, 5.3, [50, 57, 60, 64], .115),
              (17.7, 3.8, [48, 55, 62, 64], .11),
              (20.0, 5.0, [43, 50, 57, 62], .10),
              (24.0, 4.1, [46, 53, 57, 60], .10),
              (27.0, 4.6, [50, 57, 60, 64], .11),
              (31.0, 4.0, [50, 57, 60, 64], .10)]
    for data in chords:
        pad(*data)
    for beat in range(4, 56):
        at = beat*BEAT
        # Airy protection section breathes; percussion opens again for the montage.
        section = 0.67 if 20 <= at < 27 else 1.0
        if at < 31:
            kick(at, section*(1.0 if beat % 4 == 0 else 0.78))
            hat(at+BEAT*0.5, section*(0.75+0.25*(beat % 2)), (-1 if beat%2 else 1)*0.3)
            if beat%4 in (1, 3):
                rim(at, section*.8)
            if 14 <= at < 20 or 27 <= at < 31:
                hat(at+BEAT*.75, .38, -.45)
    for beat in range(8, 56):
        at = beat*BEAT
        if at >= 31:
            continue
        root_note = 26 if at < 8.7 else 31 if at < 13.25 else 26 if at < 17.7 else 24 if at < 20 else 31 if at < 24 else 22 if at < 27 else 26
        strength = .60 if 20 <= at < 27 else .9
        bass(at+BEAT*.06, root_note, BEAT*.65, strength)
        if beat%2 == 0 and not 20 <= at < 27:
            bass(at+BEAT*.76, root_note+12, BEAT*.20, strength*.55)
    notes = [62, 69, 72, 76, 74, 69, 65, 64]
    for i in range(46):
        at = 4.15 + i*BEAT
        if 19.5 < at < 23.5 or at > 30.3:
            continue
        glass(at, notes[i % len(notes)], .022 if at<14 else .026, math.sin(i*1.31)*.65)
    glass(31.12, 74, .035, -.22)
    glass(31.43, 81, .022, .3)
    cue(0.5, 34.5, "original_score", "108 BPM original electronic score in D minor, restrained pulse, sub-bass, evolving pad and sparse glass motif")


def sound_design() -> None:
    ignition()
    for at, duration, gain, pan in [(4, .52, .075, -.2), (9, .58, .08, .25),
                                    (14, .65, .09, -.1), (20, .73, .095, .15),
                                    (27, .54, .078, -.25), (31, .67, .10, .1)]:
        whoosh(at, duration, gain, pan)
    # Diagnostic readout: light two/three-note validations, never an alarm.
    for i, at in enumerate([4.12, 4.30, 5.16, 5.34, 6.10, 6.22, 7.28, 7.43, 8.32]):
        diagnostic(at, [1568, 2093, 1760][i%3], .027 if i%3 else .037, -.4 + (i%3)*.4)
    scan_t = timeline(4.2)
    scan = noise(4.2, 1000, 6200, .4)*(.5+.5*np.sin(2*np.pi*.42*scan_t))
    put(sfx, 4.35, fade_edges(scan, .5, .6), .011, 0, .15)
    cue(4.12, 4.41, "diagnostic", "Quiet, precisely spaced validation chirps and broadband scanner texture")
    for i, at in enumerate([9.07, 9.62, 10.38, 11.13, 11.83, 12.58, 13.24]):
        metal(at, .065 if i%2 else .085, math.sin(i*2)*.45, 1+.12*(i%3))
        # Short controlled servo movement preceding each metallic settle.
        t = timeline(.32)
        y = noise(.32, 250, 2800, .7)*np.sin(np.pi*t/.32)**1.5
        y += .12*np.sin(2*np.pi*(135*t + 40*t*t))
        put(sfx, at-.17, fade_edges(y, .02, .04), .026, math.cos(i)*.4, .15)
    cue(8.90, 5.0, "mechanical", "Controlled servo movement and metallic component settling; seven accents")
    engine(14.12, 5.7, .225, True)
    cue(14.12, 5.7, "acceleration", "Synthesized combustion/exhaust ramp, two gear-change dips, air/turbo texture")
    # Turbo pressure release at the acceleration/protection handoff.
    t = timeline(.66)
    release = noise(.66, 1200, 8500, .15)*np.exp(-t*6)*(.8+.2*np.sin(2*np.pi*34*t))
    put(sfx, 19.47, fade_edges(release, .018, .14), .072, .2, .15)
    cue(19.47, .66, "turbo_release", "Short filtered pressure-release air")
    # Film/squeegee textures are soft dry air and small surface details.
    for i, at in enumerate([20.35, 21.42, 23.15, 24.37, 25.72]):
        duration = .82 if i%2 else 1.1
        t = timeline(duration)
        env = np.sin(np.pi*t/duration)**1.8
        film = noise(duration, 1800, 10000, .8)*env
        put(sfx, at, fade_edges(film, .1, .16), .022, -.45+i*.2, .10)
    cue(20.35, 6.47, "surface", "Soft film movement/squeegee air and surface-polish texture")
    for i, at in enumerate([27.05, 27.83, 28.66, 29.45, 30.23]):
        metal(at, .036, (i%2-.5)*.7, 1.3)
        diagnostic(at+.12, [1046.5, 1174.7, 1318.5, 1396.9, 1568][i], .018, .2)
    cue(27.05, 3.7, "montage", "Five restrained mechanical/data accents")
    # Logo: a warm low impact, broadband attack and falling high resonance.
    t = timeline(2.7)
    f = 37 + 43*np.exp(-t*22)
    phase = np.cumsum(f)*2*np.pi/SR
    impact = np.sin(phase)*np.exp(-t*2.6)
    impact += .28*np.sin(2*np.pi*hz(50)*t)*np.exp(-t*2.1)
    impact += noise(2.7, 160, 4200, .8)*np.exp(-t*18)*.7
    put(sfx, 31.0, fade_edges(impact, .0015, .4), .18, 0, .40)
    cue(31.0, 2.7, "brand_impact", "Warm low closing impact with subtle metallic/air tail")
    engine(32.35, 1.6, .060, False)
    cue(32.35, 1.6, "closing_engine", "Subtle final engine breath beneath the call to action")


def write_wav(path: Path, audio: np.ndarray) -> None:
    pcm = np.round(np.clip(audio, -1.0, 1.0)*32767).astype("<i2")
    with wave.open(str(path), "wb") as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(pcm.tobytes())


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    score()
    sound_design()
    # Small music duck around the engine and closing impact keeps detail intelligible.
    t = np.arange(N)/SR
    duck = np.ones(N)
    for at, width, depth in [(0.55, 1.0, .25), (14.7, 1.2, .22), (18.2, 1.3, .18), (31.05, .45, .36)]:
        duck *= 1-depth*np.exp(-((t-at)/width)**2)
    music[:] *= duck[:, None]
    # Steer the score down for the elegant final CTA.
    music[:] *= (1-.38*np.clip((t-31)/3, 0, 1))[:, None]
    master = music + sfx
    # Transparent static soft saturation controls rare stacked transient peaks.
    drive = 1.08
    master = np.tanh(master*drive)/drive
    # Remove DC and inaudible infra-bass introduced by nonlinear exhaust synthesis.
    frequency = np.fft.rfftfreq(N, 1/SR)
    highpass = frequency**4 / (frequency**4 + 10.0**4)
    master = np.fft.irfft(np.fft.rfft(master, axis=0)*highpass[:, None], n=N, axis=0)
    target_peak = 10**(-1.5/20)
    scale = target_peak / np.max(np.abs(master))
    master *= scale
    # Stem gains reflect the master gain; nonlinear master processing is not baked into stems.
    music[:] *= scale
    sfx[:] *= scale
    ending = np.ones(N)
    fade_start = round(33.9*SR)
    ending[fade_start:] = np.cos(np.linspace(0, np.pi/2, N-fade_start))**2
    master *= ending[:, None]
    music[:] *= ending[:, None]
    sfx[:] *= ending[:, None]
    # TPDF dither below 16-bit quantization, preserving exact digital silence at the tail.
    dither = (RNG.random(master.shape)-RNG.random(master.shape))/65536
    master = np.where(np.abs(master)>1e-8, master+dither, 0)
    write_wav(OUT/"master.wav", master)
    write_wav(OUT/"music.wav", music)
    write_wav(OUT/"sound-design.wav", sfx)
    with wave.open(str(OUT/"master.wav"), "rb") as f:
        checked = np.frombuffer(f.readframes(f.getnframes()), "<i2").astype(float).reshape(-1, 2)/32768
        assert f.getnframes() == N and f.getframerate() == SR and f.getnchannels() == 2
    rms = float(np.sqrt(np.mean(checked**2)))
    peak = float(np.max(np.abs(checked)))
    block_peaks = [float(np.max(np.abs(checked[i*SR:(i+1)*SR]))) for i in range(35)]
    qa = {"duration_seconds": N/SR, "sample_rate_hz": SR, "channels": 2,
          "sample_format": "PCM signed 16-bit little-endian", "bpm": BPM,
          "peak_dbfs": round(20*np.log10(peak), 4),
          "rms_dbfs": round(20*np.log10(rms), 4),
          "clipped_samples": int(np.sum(np.abs(checked)>=32767/32768)),
          "finite_samples": bool(np.all(np.isfinite(checked))),
          "dc_mean": [round(float(v), 9) for v in checked.mean(axis=0)],
          "stereo_correlation": round(float(np.corrcoef(checked.T)[0, 1]), 6),
          "last_sample": checked[-1].tolist(),
          "one_second_peaks_dbfs": [round(20*np.log10(max(p, 1e-12)), 2) for p in block_peaks],
          "music_rms_dbfs": round(20*np.log10(np.sqrt(np.mean(music**2))), 2),
          "sfx_rms_dbfs": round(20*np.log10(np.sqrt(np.mean(sfx**2))), 2),
          "master_processing": "108 BPM deterministic synthesis, music ducking, mild tanh saturation, 10 Hz infrasonic/DC filter, peak normalization to -1.5 dBFS, 1.1 s cosine fade, 16-bit TPDF dither",
          "license": "Original procedural composition and synthesis created for this commission; no third-party samples or music.",
          "cues": sorted(cue_manifest, key=lambda c:c["start_seconds"])}
    assert qa["clipped_samples"] == 0
    assert abs(qa["duration_seconds"]-35.0)<1e-9
    assert np.max(np.abs(checked[-48:]))<0.0002
    (OUT/"audio-manifest.json").write_text(json.dumps(qa, indent=2)+"\n", encoding="utf-8")
    print(json.dumps({k:v for k,v in qa.items() if k not in ["cues", "one_second_peaks_dbfs"]}, indent=2))


if __name__ == "__main__":
    main()
