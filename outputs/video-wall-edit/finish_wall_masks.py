from pathlib import Path
import subprocess
import numpy as np
from PIL import Image,ImageDraw
import imageio_ffmpeg

root=Path(__file__).parent;exe=imageio_ffmpeg.get_ffmpeg_exe()
original=subprocess.Popen([exe,'-v','error','-i','C:/Users/ADMIN/Downloads/IMG_0774.mp4','-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
reader=subprocess.Popen([exe,'-v','error','-i',str(root/'masks.mkv'),'-f','rawvideo','-pix_fmt','gray','-'],stdout=subprocess.PIPE)
writer=subprocess.Popen([exe,'-v','error','-y','-f','rawvideo','-pix_fmt','gray','-s','720x1280','-r','30','-i','-','-c:v','ffv1','-level','3',str(root/'masks-final.mkv')],stdin=subprocess.PIPE)
for i in range(190):
    frame=np.frombuffer(original.stdout.read(720*1280*3),np.uint8).reshape(1280,720,3)
    source=np.frombuffer(reader.stdout.read(720*1280),np.uint8).reshape(1280,720)
    # White permits replacement. Erode horizontally to protect specular car
    # edges that resemble a white wall, without changing temporal alignment.
    padded=np.pad(source,((0,12),(0,0)),mode='edge')
    eroded=source.copy()
    for k in range(1,13): np.minimum(eroded,padded[k:k+1280,:],out=eroded)
    body=frame[500:620].astype(np.int16)
    car_columns=(((body.max(axis=2)-body.min(axis=2))>40)|(body.max(axis=2)<95)).sum(axis=0)>12
    car_columns[280:394]=False  # preserve original pole/static margins exactly
    mask=np.where(car_columns[None,:],eroded,source).astype(np.uint8)
    writer.stdin.write(mask.tobytes())
    alpha=mask.astype(np.float32)/255
    if i%48==0: sheet=Image.new('RGB',(2880,1110),(25,25,25))
    tint=frame.astype(np.float32)*(1-alpha[...,None]*.65)+np.array([255,0,255])*alpha[...,None]*.65
    tile=Image.fromarray(tint[340:690].astype(np.uint8)).resize((360,175))
    x=(i%48%8)*360;y=(i%48//8)*185;sheet.paste(tile,(x,y+10));ImageDraw.Draw(sheet).text((x+4,y),f'n={i}',fill='white')
    if i%48==47 or i==189: sheet.save(root/f'mask-qa-{i//48+1:02}.jpg',quality=92)
    if i in [60,85,140,180]: Image.fromarray(tint.astype(np.uint8)).save(root/f'mask-final-qa-{i}.png')
writer.stdin.close();writer.wait();reader.stdout.close();reader.wait();original.stdout.close();original.wait()
(root/'masks-final.mkv').replace(root/'masks.mkv')
print('FINAL READY 190 frames white=replace wall')
