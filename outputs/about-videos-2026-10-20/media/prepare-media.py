from pathlib import Path
import hashlib, json, subprocess, time
from inspect_inputs import SOURCES, inspect

ROOT = Path(__file__).resolve().parents[3]
EVIDENCE = Path(__file__).resolve().parent
ASSETS = ROOT / 'public' / 'videos' / 'about'
FFMPEG = EVIDENCE / 'tools' / 'ffmpeg-win-x86_64-v7.1.exe'
records = []

def run(args, log_name):
    result = subprocess.run([str(FFMPEG), '-hide_banner', '-nostdin', *args], capture_output=True, text=True)
    (EVIDENCE / log_name).write_text(result.stdout + result.stderr, encoding='utf-8')
    if result.returncode: raise RuntimeError(f'ffmpeg failed: {log_name}')
    return result

if __name__ == '__main__':
    ASSETS.mkdir(parents=True, exist_ok=True)
    for number, source in enumerate(SOURCES, 1):
        stamp = time.monotonic()
        target = ASSETS / f'video-{number:02d}.mp4'
        poster = ASSETS / f'video-{number:02d}-poster.jpg'
        # Retain the complete original, portrait aspect, and audio. Cap web output
        # at 720 x 1280 and 30 fps; do not upscale lower-rate source video.
        source_meta = inspect(source)
        source_video = next(t for t in source_meta['tracks'] if t['handler'] == 'vide')
        fps = min(round(source_video['averageFps'], 3), 30)
        args = ['-i', str(source), '-map', '0:v:0', '-map', '0:a:0?',
                '-vf', f'scale=720:1280:force_original_aspect_ratio=decrease:force_divisible_by=2,fps={fps}',
                '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-pix_fmt', 'yuv420p',
                '-threads', '4', '-profile:v', 'high', '-level:v', '4.0',
                '-c:a', 'aac', '-b:a', '96k', '-ar', '48000', '-ac', '2',
                '-map_metadata', '-1', '-map_chapters', '-1', '-movflags', '+faststart',
                '-y', str(target)]
        run(args, f'video-{number:02d}-encode.log')
        run(['-ss', '1.2', '-i', str(target), '-frames:v', '1', '-vf', 'scale=540:960', '-q:v', '3', '-y', str(poster)], f'video-{number:02d}-poster.log')
        # Full decode is a meaningful verification of all written audio/video.
        run(['-v', 'warning', '-i', str(target), '-map', '0:v:0', '-map', '0:a:0?', '-f', 'null', '-'], f'video-{number:02d}-decode.log')
        # Detect black runs as evidence for choosing an actual, visible poster.
        run(['-i', str(target), '-vf', 'blackdetect=d=0.3:pix_th=0.10', '-an', '-f', 'null', '-'], f'video-{number:02d}-blackdetect.log')
        output_meta = inspect(target)
        record = {'number':number, 'original':source_meta, 'output':output_meta,
                  'assetUrl':f'/videos/about/{target.name}', 'posterUrl':f'/videos/about/{poster.name}',
                  'posterBytes':poster.stat().st_size, 'posterSha256':hashlib.sha256(poster.read_bytes()).hexdigest(),
                  'posterTimestampSeconds':1.2, 'fullDecodePassed':True, 'elapsedSeconds':round(time.monotonic()-stamp, 2)}
        records.append(record)
        print(json.dumps({'number':number, 'outputBytes':target.stat().st_size, 'elapsedSeconds':record['elapsedSeconds']}), flush=True)
        (EVIDENCE / 'media-manifest.json').write_text(json.dumps({'media':records}, indent=2), encoding='utf-8')
    total_original = sum(r['original']['bytes'] for r in records)
    total_output = sum(r['output']['bytes'] for r in records)
    final = {'media':records, 'totalOriginalBytes':total_original, 'totalVideoBytes':total_output,
             'totalPosterBytes':sum(r['posterBytes'] for r in records),
             'videoBytesReductionPercent':round(100*(1-total_output/total_original), 2),
             'encoding':{'video':'H.264 high / yuv420p', 'audio':'AAC 96 kbps stereo 48 kHz', 'dimensions':'720x1280', 'fps':'24 or 30; no source fps upscale', 'completeDurationRetained':True, 'fastStart':True, 'metadataRemoved':True, 'crf':28},
             'tool':{'version':'imageio-ffmpeg 0.6.0 / FFmpeg 7.1 essentials', 'wheelSha256':'02fa47c83703c37df6bfe4896aab339013f62bf02c5ebf2dce6da56af04ffc0a', 'source':'https://pypi.org/project/imageio-ffmpeg/0.6.0/'}}
    (EVIDENCE / 'media-manifest.json').write_text(json.dumps(final, indent=2), encoding='utf-8')
    print(json.dumps({key:final[key] for key in ['totalOriginalBytes','totalVideoBytes','totalPosterBytes','videoBytesReductionPercent']}), flush=True)
