"""Assemble unoccluded wall areas for the original-footage composite."""
from pathlib import Path
from PIL import Image
import numpy as np
P = Path(__file__).resolve().parent
a = np.asarray(Image.open(P / 'clean-new-01.png').convert('RGB'), dtype=np.float32)
b = np.asarray(Image.open(P / 'clean-new-02.png').convert('RGB'), dtype=np.float32)
x = np.arange(a.shape[1]) / 3
blend = np.clip((x - 390) / 20, 0, 1)[None, :, None]
plate = a * (1 - blend) + b * blend
# Fill the original AI pole region with surrounding wall so only the original pole remains.
left, right = 282*3, 395*3
mix = np.linspace(0, 1, right-left)[None, :, None]
plate[:, left:right] = plate[:, left-1:left] * (1-mix) + plate[:, right:right+1] * mix
Image.fromarray(np.clip(plate, 0, 255).astype(np.uint8)).save(P / 'clean-wall-plate.png')
print('Saved clean-wall-plate.png')
