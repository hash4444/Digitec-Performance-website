"""Prepare an exact brand matte for the video overlay from the supplied JPEG."""
from pathlib import Path
import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
source = Path(r"C:\Users\ADMIN\Downloads\dfaf0ccb-60e7-44bf-9a01-5b0769bbcc76_resize.jpg")
rgb = np.asarray(Image.open(source).convert("RGB"), dtype=np.float32)
darkness = 255.0 - rgb[..., 1]
is_orange = ((rgb[..., 0] - rgb[..., 1]) > (darkness * 0.4)) & (np.arange(rgb.shape[1])[None, :] < 390)
alpha = np.clip(darkness / np.where(is_orange, 179.0, 224.0), 0.0, 1.0)
alpha[alpha < 0.025] = 0
rgba = np.full((*rgb.shape[:2], 4), 255, dtype=np.uint8)
rgba[is_orange, :3] = [242, 76, 36]
rgba[..., 3] = np.rint(alpha * 255).astype(np.uint8)
ys, xs = np.where(alpha > 0.5)
bounds = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
logo = Image.fromarray(rgba).crop(bounds)
logo.save(HERE / "digitec-video-overlay.png")
print({"source_bounds": bounds, "overlay_size": logo.size})
