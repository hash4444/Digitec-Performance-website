from pathlib import Path
import hashlib, json, re
from PIL import Image, ImageDraw
from inspect_inputs import atoms

HERE = Path(__file__).resolve().parent
report = json.loads((HERE / 'media-manifest.json').read_text(encoding='utf-8'))
assertions = []

def check(condition, description):
    assertions.append({'passed':bool(condition), 'description':description})
    if not condition: raise AssertionError(description)

for media in report['media']:
    number = media['number']
    original = Path(media['original']['path'])
    output = Path(media['output']['path'])
    check(hashlib.sha256(original.read_bytes()).hexdigest() == media['original']['sha256'], f'{number}: original bytes remain unchanged')
    check(hashlib.sha256(output.read_bytes()).hexdigest() == media['output']['sha256'], f'{number}: encoded bytes match manifest')
    data = output.read_bytes()
    order = [tag for tag, _, _ in atoms(data)]
    check(order.index('moov') < order.index('mdat'), f'{number}: fast-start moov atom precedes media data')
    tracks = media['output']['tracks']
    video = next(t for t in tracks if t['handler'] == 'vide')
    audio = next(t for t in tracks if t['handler'] == 'soun')
    original_video = next(t for t in media['original']['tracks'] if t['handler'] == 'vide')
    original_audio = next(t for t in media['original']['tracks'] if t['handler'] == 'soun')
    check(video['codecFourcc'] == 'avc1' and audio['codecFourcc'] == 'mp4a', f'{number}: browser-compatible H.264/AAC container tracks')
    check(video['displayWidth'] == 720 and video['displayHeight'] == 1280, f'{number}: 720x1280 aspect preserved')
    check(abs(video['durationSeconds'] - original_video['durationSeconds']) <= 1/video['averageFps'] + 0.001, f'{number}: video duration within one output frame of original, no editorial trim')
    check(abs(audio['durationSeconds'] - original_audio['durationSeconds']) < 0.05, f'{number}: audio duration within AAC frame rounding of original')
    check((HERE / f'video-{number:02d}-decode.log').read_text(encoding='utf-8') == '', f'{number}: complete output audio/video decode has no warnings')
    log = (HERE / f'video-{number:02d}-encode.log').read_text(encoding='utf-8')
    check('yuv420p' in log, f'{number}: standard 8-bit 4:2:0 pixel format')
    poster = output.with_name(f'video-{number:02d}-poster.jpg')
    check(hashlib.sha256(poster.read_bytes()).hexdigest() == media['posterSha256'], f'{number}: poster bytes match manifest')
    with Image.open(poster) as image:
        check(image.size == (540, 960), f'{number}: portrait poster valid and appropriately sized')
    black_log = (HERE / f'video-{number:02d}-blackdetect.log').read_text(encoding='utf-8')
    media['blackBackgroundRuns'] = [
        {'startSeconds':float(start), 'endSeconds':float(end), 'durationSeconds':float(duration)}
        for start,end,duration in re.findall(r'black_start:([\d.]+) black_end:([\d.]+) black_duration:([\d.]+)', black_log)
    ]

report['encoding']['completeDurationRetained'] = 'Complete source clip, no editorial trim; at most one output-frame rounding, audio within 50 ms AAC rounding'
report['visualReview'] = {
    'allPostersInspected':True,
    'posterCount':len(report['media']),
    'posterTimestampSeconds':1.2,
    'imageObservations':['AC workshop scene','Technicians at vehicle rear','Technician under open bonnet','Wheel and brake workshop scene','Land Rover front workshop scene','Ferrari bonnet workshop view','Technician working in engine bay','Mercedes front with technician under open bonnet'][:len(report['media'])],
    'blackBackgroundTailExplanation':'Original DIGI-TEC logo outro; video 01 at 39 seconds visually checked. These are retained, not considered corrupt or empty frames.'
}
(HERE / 'media-manifest.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
verification = {'passed':all(a['passed'] for a in assertions), 'assertionCount':len(assertions), 'assertions':assertions}
(HERE / 'media-verification.json').write_text(json.dumps(verification, indent=2), encoding='utf-8')

columns = 4 if len(report['media']) > 5 else 5
rows = (len(report['media']) + columns - 1) // columns
sheet = Image.new('RGB', (columns*216, rows*410), '#101010')
draw = ImageDraw.Draw(sheet)
for i, media in enumerate(report['media']):
    poster = Path(media['output']['path']).with_name(f'video-{i+1:02d}-poster.jpg')
    with Image.open(poster) as image:
        sheet.paste(image.resize((216,384)), ((i % columns)*216,(i // columns)*410+26))
    draw.text(((i % columns)*216+8, (i // columns)*410+8), f'VIDEO {i+1:02d} — 1.2 seconds', fill='#ffffff')
sheet.save(HERE / 'poster-contact-sheet.jpg', quality=88)
print(json.dumps({'passed':verification['passed'], 'assertionCount':len(assertions), 'totalWebVideoBytes':report['totalVideoBytes'], 'totalPosterBytes':report['totalPosterBytes']}))
