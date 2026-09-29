"""Replace only the tracked wall region; retain every source foreground frame."""
from pathlib import Path
import subprocess

P = Path(__file__).resolve().parent
FF = r'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'
graph = (
    '[0:v]settb=expr=1/30,setpts=N,scale=2160:3840:flags=lanczos,format=gbrp[original];'
    '[1:v]settb=expr=1/30,setpts=N,format=gbrp[wall];'
    "[2:v]settb=expr=1/30,setpts=N,drawbox=x=0:y=0:w=iw:h=ih:color=black:t=fill:enable='between(n,110,130)',scale=2160:3840:flags=bilinear,format=gbrp[mask];"
    '[original][wall][mask]maskedmerge=planes=7,format=yuv420p[v]'
)
subprocess.run([
    FF, '-hide_banner', '-y', '-i', r'C:\Users\ADMIN\Downloads\IMG_0774.mp4',
    '-loop', '1', '-framerate', '30', '-i', str(P / 'clean-wall-plate.png'),
    '-i', str(P / 'masks.mkv'), '-filter_complex_threads', '2', '-filter_complex', graph,
    '-map', '[v]', '-map', '0:a:0', '-frames:v', '190', '-t', '6.34',
    '-c:v', 'hevc_nvenc', '-preset', 'p5', '-rc', 'vbr', '-cq', '14', '-b:v', '0',
    '-tag:v', 'hvc1', '-c:a', 'copy', '-movflags', '+faststart',
    str(P / 'original-car-new-walls-4k.mp4')
], check=True)
