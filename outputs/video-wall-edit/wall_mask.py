"""Conservative wall-only compositing masks for the nearly locked IMG_0774 shot.

Only numpy/Pillow are required. Car reflections remain protected because each
detected upper silhouette is filled downward, rather than masking by color.
Coordinates and all alignment operations use the source's 720x1280 grid.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter


def estimate_shift(reference, frame, dx_range=range(-5, 6), dy_range=range(-20, 6)):
    """Return (dx,dy): frame[y+dy,x+dx] aligns to reference[y,x]."""
    # Ceiling edges remain visible throughout the drive-by. Exclude orange pole.
    yy, xx = np.mgrid[60:330:3, 30:690:3]
    keep = (xx < 260) | (xx > 390)
    yy, xx = yy[keep], xx[keep]
    ref = reference[yy, xx].astype(np.float32).mean(axis=1)
    best = (np.inf, 0, 0)
    for dy in dy_range:
        for dx in dx_range:
            v = frame[yy+dy, xx+dx].astype(np.float32).mean(axis=1)
            d = v-ref
            # Ignore modest global exposure shifts.
            score = np.mean(np.minimum(np.abs(d-np.median(d)), 50))
            if score < best[0]:
                best = (score, dx, dy)
    return best[1], best[2]


def align_to_reference(frame, shift):
    dx, dy = shift
    yy = np.clip(np.arange(frame.shape[0])+dy, 0, frame.shape[0]-1)
    xx = np.clip(np.arange(frame.shape[1])+dx, 0, frame.shape[1]-1)
    return frame[yy[:,None], xx[None,:]]


def make_original_background(first, late):
    """First frame is clear on left; n180 or later is clear on right."""
    late = align_to_reference(late, estimate_shift(first, late))
    bg = first.copy()
    # First frame's ceiling and upper wall are unobstructed even on the right.
    # Only its lower right needs the later unobstructed view.
    bg[520:,360:] = late[520:,360:]
    return bg


class WallMatte:
    def __init__(self, first, late):
        self.reference = first
        self.background = make_original_background(first, late)
        bg_image = Image.fromarray(self.background)
        # ±2 px tolerance avoids mistaking shutter ridges for moving objects.
        self.low = np.asarray(bg_image.filter(ImageFilter.MinFilter(5))).astype(np.int16)
        self.high = np.asarray(bg_image.filter(ImageFilter.MaxFilter(5))).astype(np.int16)
        self.height, self.width = first.shape[:2]
        xx = np.arange(self.width)
        self.top = np.interp(xx, [0,280,390,719], [451,438,416,398])
        self.bottom = np.interp(xx, [0,280,390,719], [660,654,644,635])

    def mask(self, frame, return_details=False):
        shift = estimate_shift(self.reference, frame)
        aligned = align_to_reference(frame, shift).astype(np.int16)
        difference = np.maximum(self.low-aligned, aligned-self.high).max(axis=2)
        yy = np.arange(self.height)[:,None]
        # Conservatively detect car within the visible wall strip, then protect
        # all pixels below its upper boundary (including white specular details).
        strip = (yy >= self.top[None,:]) & (yy <= self.bottom[None,:])
        marker = difference > 38
        support = marker & np.roll(marker,1,axis=0) & np.roll(marker,2,axis=0) & strip
        # Near the ceiling joint, ignore short runs caused by parallax; an
        # occluding window continues well below this joint into the wall strip.
        below = sum(np.roll(marker,-k,axis=0) for k in range(5,45))
        support &= (yy > self.top[None,:]+23) | (below >= 25)
        # The roof enters the ceiling area before the reflective windows cross
        # the wall. Detect that roof too, then fill below it to protect windows.
        chroma = aligned.max(axis=2)-aligned.min(axis=2)
        upper = (difference > 45) & (chroma > 35)
        upper &= (yy >= 260) & (yy < self.top[None,:]-25)
        upper &= np.roll(upper,1,axis=0) & np.roll(upper,2,axis=0)
        # Upper light/beam parallax must not suppress walls after the rear of
        # the car has passed. Require convincing car pixels in the wall band.
        car_below = (difference > 60) & ((aligned.mean(axis=2) < 120) | (chroma > 45)) & strip
        upper &= (car_below.sum(axis=0) > 20)[None,:]
        support |= upper
        hit = support.any(axis=0)
        edge = np.where(hit, np.argmax(support,axis=0)-5, self.height).astype(float)
        # The upper silhouette is spatially continuous. Median rejects static
        # door/pipe spikes and narrow gaps over reflected highlights.
        edge = np.median(np.lib.stride_tricks.sliding_window_view(np.pad(edge,(15,15),mode='edge'),31),axis=1)
        # Expand protection across 3px horizontally to keep antialiased edges.
        edge = np.minimum.reduce([np.roll(edge,k) for k in range(-3,4)])
        alpha = np.minimum(np.clip((yy-self.top[None,:])/2,0,1),
                           np.clip((self.bottom[None,:]-yy)/2,0,1))
        alpha *= np.clip((edge[None,:]-yy)/2,0,1)
        # Pole gets a conservative static matte; no background can overwrite it.
        pole_left = np.interp(yy[:,0], [0,430,670,1280], [291,298,306,319])
        pole_right = np.interp(yy[:,0], [0,430,670,1280], [360,365,373,390])
        xx = np.arange(self.width)[None,:]
        alpha[(xx >= pole_left[:,None]-2) & (xx <= pole_right[:,None]+2)] = 0
        # Return the matte in this frame's original coordinates.
        dx,dy=shift
        sy=np.clip(np.arange(self.height)-dy,0,self.height-1)
        sx=np.clip(np.arange(self.width)-dx,0,self.width-1)
        out=alpha[sy[:,None],sx[None,:]].astype(np.float32)
        if return_details:
            return out, {'shift':shift,'edge':edge,'changed':difference}
        return out


if __name__ == '__main__':
    root=Path(__file__).parent
    first=np.asarray(Image.open(root/'source-01.png').convert('RGB'))
    late=np.asarray(Image.open(root/'source-03.png').convert('RGB'))
    engine=WallMatte(first,late)
    for name in ['source-01','source-02','source-03','source-85']:
        frame=np.asarray(Image.open(root/(name+'.png')).convert('RGB'))
        matte,details=engine.mask(frame,True)
        Image.fromarray((matte*255).astype(np.uint8)).save(root/(name+'-wall-mask.png'))
        # Magenta is a QA visualization of where replacement is permitted.
        tint=frame.astype(np.float32)*(1-matte[...,None]*0.65)+np.array([255,0,255])*matte[...,None]*0.65
        Image.fromarray(tint.astype(np.uint8)).save(root/(name+'-wall-mask-qa.png'))
        print(name, 'shift', details['shift'], 'wall area', int((matte>.5).sum()))
