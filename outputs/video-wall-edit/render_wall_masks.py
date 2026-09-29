from pathlib import Path
import subprocess, json
import numpy as np
from PIL import Image, ImageDraw
import imageio_ffmpeg
from wall_mask import WallMatte

root=Path(__file__).parent
first=np.asarray(Image.open(root/'source-01.png').convert('RGB'))
late=np.asarray(Image.open(root/'source-03.png').convert('RGB'))
engine=WallMatte(first,late)
exe=imageio_ffmpeg.get_ffmpeg_exe()
reader=subprocess.Popen([exe,'-v','error','-i','C:/Users/ADMIN/Downloads/IMG_0774.mp4','-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
writer=subprocess.Popen([exe,'-v','error','-y','-f','rawvideo','-pix_fmt','gray','-s','720x1280','-r','30','-i','-','-c:v','ffv1','-level','3',str(root/'masks.mkv')],stdin=subprocess.PIPE)
stats=[]
sheet=None
for i in range(190):
    buf=reader.stdout.read(720*1280*3)
    if len(buf)!=720*1280*3: raise RuntimeError(f'Unexpected end at frame {i}')
    frame=np.frombuffer(buf,np.uint8).reshape(1280,720,3)
    alpha, details=engine.mask(frame,True)
    writer.stdin.write((alpha*255).astype(np.uint8).tobytes())
    stats.append({'frame':i,'shift':details['shift'],'wall_pixels':int((alpha>.5).sum())})
    if i%48==0: sheet=Image.new('RGB',(2880,1110),(25,25,25))
    tint=frame.astype(np.float32)*(1-alpha[...,None]*.65)+np.array([255,0,255])*alpha[...,None]*.65
    tile=Image.fromarray(tint[340:690].astype(np.uint8)).resize((360,175))
    x=(i%48%8)*360;y=(i%48//8)*185
    sheet.paste(tile,(x,y+10))
    ImageDraw.Draw(sheet).text((x+4,y),f'n={i}',fill='white')
    if i%48==47 or i==189: sheet.save(root/f'mask-qa-{i//48+1:02}.jpg',quality=92)
    if i%30==0: print(f'frame {i}/190',flush=True)
writer.stdin.close()
writer.wait()
reader.stdout.close();reader.wait()
(root/'mask-stats.json').write_text(json.dumps(stats,indent=2))
print('DONE masks.mkv:190 frames,720x1280,30fps',flush=True)
