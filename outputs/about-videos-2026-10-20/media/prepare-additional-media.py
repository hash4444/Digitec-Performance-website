from pathlib import Path
import hashlib, json, subprocess, time
from inspect_inputs import inspect

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
ASSETS = ROOT / 'public' / 'videos' / 'about'
FFMPEG = HERE / 'tools' / 'ffmpeg-win-x86_64-v7.1.exe'
SOURCES = [Path(r'C:\Users\ADMIN\Downloads\DIGITEC4.mp4'), Path(r'C:\Users\ADMIN\Downloads\IMG_9427.mp4'), Path(r'C:\Users\ADMIN\Downloads\IMG_9072 (2).mp4')]

def run(args, log_name):
    result = subprocess.run([str(FFMPEG), '-hide_banner', '-nostdin', *args], capture_output=True, text=True)
    (HERE / log_name).write_text(result.stdout + result.stderr, encoding='utf-8')
    if result.returncode: raise RuntimeError(f'ffmpeg failed: {log_name}')

if __name__ == '__main__':
    report = json.loads((HERE / 'media-manifest.json').read_text(encoding='utf-8'))
    assert len(report['media']) == 5, 'Append only to first-five manifest'
    (HERE / 'media-manifest-first-five.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    (HERE / 'media-verification-first-five.json').write_bytes((HERE / 'media-verification.json').read_bytes())
    original_five = {Path(m['output']['path']):m['output']['sha256'] for m in report['media']}
    for number, source in enumerate(SOURCES, 6):
        stamp = time.monotonic()
        target = ASSETS / f'video-{number:02d}.mp4'
        poster = ASSETS / f'video-{number:02d}-poster.jpg'
        assert not target.exists() and not poster.exists(), 'Never overwrite existing video assets'
        source_meta = inspect(source)
        source_video = next(t for t in source_meta['tracks'] if t['handler'] == 'vide')
        fps = min(round(source_video['averageFps'], 3), 30)
        args = ['-i', str(source), '-map', '0:v:0', '-map', '0:a:0?',
                '-vf', f'scale=720:1280:force_original_aspect_ratio=decrease:force_divisible_by=2,fps={fps}',
                '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-pix_fmt', 'yuv420p',
                '-threads', '4', '-profile:v', 'high', '-level:v', '4.0',
                '-c:a', 'aac', '-b:a', '96k', '-ar', '48000', '-ac', '2',
                '-map_metadata', '-1', '-map_chapters', '-1', '-movflags', '+faststart', '-n', str(target)]
        run(args, f'video-{number:02d}-encode.log')
        run(['-ss', '1.2', '-i', str(target), '-frames:v', '1', '-vf', 'scale=540:960:force_original_aspect_ratio=decrease', '-q:v', '3', '-n', str(poster)], f'video-{number:02d}-poster.log')
        run(['-v', 'warning', '-i', str(target), '-map', '0:v:0', '-map', '0:a:0?', '-f', 'null', '-'], f'video-{number:02d}-decode.log')
        run(['-i', str(target), '-vf', 'blackdetect=d=0.3:pix_th=0.10', '-an', '-f', 'null', '-'], f'video-{number:02d}-blackdetect.log')
        output_meta = inspect(target)
        record = {'number':number, 'original':source_meta, 'output':output_meta,
                  'assetUrl':f'/videos/about/{target.name}', 'posterUrl':f'/videos/about/{poster.name}',
                  'posterBytes':poster.stat().st_size, 'posterSha256':hashlib.sha256(poster.read_bytes()).hexdigest(),
                  'posterTimestampSeconds':1.2, 'fullDecodePassed':True, 'elapsedSeconds':round(time.monotonic()-stamp, 2)}
        report['media'].append(record)
        print(json.dumps({'number':number, 'outputBytes':target.stat().st_size, 'elapsedSeconds':record['elapsedSeconds']}), flush=True)
    for path, expected in original_five.items():
        assert hashlib.sha256(path.read_bytes()).hexdigest() == expected, f'Original five asset changed: {path}'
    total_original = sum(r['original']['bytes'] for r in report['media'])
    total_output = sum(r['output']['bytes'] for r in report['media'])
    report.update({'totalOriginalBytes':total_original, 'totalVideoBytes':total_output,
                   'totalPosterBytes':sum(r['posterBytes'] for r in report['media']),
                   'videoBytesReductionPercent':round(100*(1-total_output/total_original), 2),
                   'originalFiveEncodedAssetsUnchanged':True})
    (HERE / 'media-manifest.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps({key:report[key] for key in ['totalOriginalBytes','totalVideoBytes','totalPosterBytes','videoBytesReductionPercent']}), flush=True)
