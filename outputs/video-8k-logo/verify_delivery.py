from pathlib import Path
import subprocess, re, json
P=Path(__file__).resolve().parent
FF=r'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'
source=Path(r'C:\Users\ADMIN\Downloads\IMG_0774.mp4')
def audio_hash(path):
    result=subprocess.run([FF,'-v','error','-i',str(path),'-map','0:a:0','-c','copy','-f','hash','-hash','sha256','-'],capture_output=True,text=True,check=True)
    return result.stdout.strip()
baseline=audio_hash(source)
report=[]
for name in ['IMG_0774_DIGITEC_preview.mp4','IMG_0774_DIGITEC_8K.mp4']:
    path=P/name
    result=subprocess.run([FF,'-hide_banner','-nostats','-i',str(path),'-map','0:v:0','-progress','pipe:1','-f','null','-'],capture_output=True,text=True,check=True)
    stream=next(line.strip() for line in result.stderr.splitlines() if 'Video:' in line)
    frames=int(re.findall(r'^frame=(\d+)',result.stdout,re.M)[-1])
    same_audio=audio_hash(path)==baseline
    assert frames==190 and same_audio, (name,frames,same_audio)
    report.append({'file':name,'bytes':path.stat().st_size,'video_stream':stream,'frames':frames,'original_audio_bit_exact':same_audio,'full_decode_passed':True})
(P/'delivery-verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
