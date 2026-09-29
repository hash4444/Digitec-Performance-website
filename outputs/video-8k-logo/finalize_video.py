"""Composite the exact logo and original soundtrack, then export delivery files."""
import argparse
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
FFMPEG = Path(r"C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe")
SOURCE = Path(r"C:\Users\ADMIN\Downloads\IMG_0774.mp4")
LOGO = HERE / "digitec-video-overlay.png"

parser = argparse.ArgumentParser()
parser.add_argument("input", type=Path)
parser.add_argument("--edited-frames", type=int, required=True)
parser.add_argument("--edited-fps", type=float, required=True)
args = parser.parse_args()

# The source has 190 frames at 30 fps. Match that full timeline, including endpoints.
factor = (189 / 30) / ((args.edited_frames - 1) / args.edited_fps)
for name, w, h, encoder in [
    ("IMG_0774_DIGITEC_preview.mp4", 1080, 1920, "libx264"),
    ("IMG_0774_DIGITEC_8K.mp4", 4320, 7680, "hevc_nvenc"),
]:
    width = round(w * 392 / 2160)
    top = round(h * 3227 / 3840)
    graph = (
        f"[0:v]setpts=(PTS-STARTPTS)*{factor:.12f},fps=30,"
        f"tpad=stop_mode=clone:stop_duration=1,scale={w}:{h}:flags=lanczos,setsar=1[base];"
        f"[1:v]format=rgba,scale={width}:-1:flags=lanczos[logo];"
        f"[base][logo]overlay=(W-w)/2:{top}:format=auto,format=yuv420p[out]"
    )
    command = [str(FFMPEG), "-hide_banner", "-y", "-i", str(args.input), "-i", str(LOGO),
               "-i", str(SOURCE), "-filter_complex_threads", "2", "-filter_complex", graph,
               "-map", "[out]", "-map", "2:a:0", "-frames:v", "190", "-t", "6.34",
               "-c:v", encoder]
    if encoder == "hevc_nvenc":
        command += ["-preset", "p5", "-tune", "hq", "-rc", "vbr", "-cq", "18", "-b:v", "0", "-tag:v", "hvc1"]
    else:
        command += ["-preset", "medium", "-crf", "18", "-threads", "6"]
    command += ["-c:a", "copy", "-color_primaries", "bt709", "-color_trc", "bt709",
                "-colorspace", "bt709", "-map_metadata", "-1", "-movflags", "+faststart",
                str(HERE / name)]
    subprocess.run(command, check=True)
    # Remux the complete AAC stream after the frame-limited encode so the
    # encoder's final-frame cutoff cannot trim the original soundtrack.
    muxed = HERE / (Path(name).stem + '.muxed.mp4')
    subprocess.run([str(FFMPEG), '-hide_banner', '-y', '-i', str(HERE / name),
                    '-i', str(SOURCE), '-map', '0:v:0', '-map', '1:a:0',
                    '-c', 'copy', '-map_metadata', '-1', '-movflags', '+faststart',
                    str(muxed)], check=True)
    muxed.replace(HERE / name)
    print(f"Saved {HERE / name}", flush=True)
