from pathlib import Path
import hashlib, json, struct

SOURCES = [
    Path(r'C:\Users\ADMIN\Downloads\DIGITEC AC FIX.mp4'),
    Path(r'C:\Users\ADMIN\Downloads\hf_20261009_132735_a955890b-0168-4e96-9cd6-e352216120ac.mp4'),
    Path(r'C:\Users\ADMIN\Downloads\digitek 24.mp4'),
    Path(r'C:\Users\ADMIN\Downloads\digitek brakes4.mp4'),
    Path(r'C:\Users\ADMIN\Downloads\IMG_9059.MP4'),
]

def atoms(data, start=0, end=None):
    end = len(data) if end is None else end
    offset = start
    while offset + 8 <= end:
        size, tag = struct.unpack_from('>I4s', data, offset)
        header = 8
        if size == 1:
            size = struct.unpack_from('>Q', data, offset + 8)[0]
            header = 16
        if size == 0:
            size = end - offset
        if size < header or offset + size > end:
            break
        yield tag.decode('latin-1'), offset + header, offset + size
        offset += size

def lookup(data, start, end, tag):
    return next((pair for pair in atoms(data, start, end) if pair[0] == tag), None)

def inspect(path):
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        while chunk := handle.read(1024 * 1024): digest.update(chunk)
    data = path.read_bytes()
    moov = lookup(data, 0, len(data), 'moov')
    tracks = []
    for tag, begin, end in atoms(data, moov[1], moov[2]):
        if tag != 'trak': continue
        tkhd = lookup(data, begin, end, 'tkhd')
        mdia = lookup(data, begin, end, 'mdia')
        mdhd = lookup(data, mdia[1], mdia[2], 'mdhd')
        hdlr = lookup(data, mdia[1], mdia[2], 'hdlr')
        pos = mdhd[1]
        version = data[pos]
        timescale_pos = pos + (20 if version else 12)
        timescale = struct.unpack_from('>I', data, timescale_pos)[0]
        duration = struct.unpack_from('>Q' if version else '>I', data, timescale_pos + 4)[0]
        track = {'handler':data[hdlr[1]+8:hdlr[1]+12].decode('latin-1'), 'durationSeconds':duration/timescale}
        if track['handler'] == 'vide':
            track['displayWidth'], track['displayHeight'] = [value / 65536 for value in struct.unpack_from('>II',data,tkhd[2]-8)]
        minf = lookup(data, mdia[1], mdia[2], 'minf')
        stbl = lookup(data, minf[1], minf[2], 'stbl')
        stsd = lookup(data, stbl[1], stbl[2], 'stsd')
        sample_entry = stsd[1] + 8
        track['codecFourcc'] = data[sample_entry+4:sample_entry+8].decode('latin-1')
        stts = lookup(data, stbl[1], stbl[2], 'stts')
        if stts:
            entries = struct.unpack_from('>I',data,stts[1]+4)[0]
            count = sum(struct.unpack_from('>I',data,stts[1]+8+i*8)[0] for i in range(entries))
            if track['handler'] == 'vide':
                track['sampleCount'] = count
                track['averageFps'] = count/(duration/timescale)
        tracks.append(track)
    return {'path':str(path), 'bytes':path.stat().st_size, 'sha256':digest.hexdigest(), 'tracks':tracks}

if __name__ == '__main__':
    report = {'sources':[inspect(p) for p in SOURCES]}
    report['totalOriginalBytes'] = sum(x['bytes'] for x in report['sources'])
    target = Path(__file__).with_name('original-input-metadata.json')
    target.write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps(report, indent=2))
