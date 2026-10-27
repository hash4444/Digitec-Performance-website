import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createCanvas,PROJECT} from './runtime.mjs';
import {loadAssets,renderFrame,FPS,DURATION,SCENES} from './composition.mjs';
const args=process.argv.slice(2),get=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
const scale=Number(get('--scale','1'));
if(![1,2].includes(scale))throw new Error('--scale must be 1 (HD) or 2 (4K UHD)');
const suffix=get('--suffix',scale===2?'4k':'');
if(suffix&&!/^[a-z0-9-]+$/i.test(suffix))throw new Error('Suffix must contain only letters, digits or hyphens');
const tag=suffix?'-'+suffix:'';
const formats={vertical:[1080*scale,1920*scale],horizontal:[1920*scale,1080*scale]};
const requested=get('--format','both'),targets=requested==='both'?Object.keys(formats):[requested];
const a=await loadAssets();
fs.mkdirSync(path.join(PROJECT,'renders'),{recursive:true});fs.mkdirSync(path.join(PROJECT,'qa'),{recursive:true});

if(args.includes('--preview')){
  const times=[2.7,6.6,11.7,17.1,21.1,23.2,25.8,28.6,30.3,33.6];
  for(const format of targets){
    const [W,H]=formats[format],c=createCanvas(W,H),thumbW=format==='vertical'?270:480,thumbH=format==='vertical'?480:270;
    const sheet=createCanvas(thumbW*5,thumbH*2+100),sc=sheet.getContext('2d');sc.fillStyle='#111';sc.fillRect(0,0,sheet.width,sheet.height);
    times.forEach((t,i)=>{renderFrame(c,a,t,{format});const row=Math.floor(i/5),col=i%5;sc.drawImage(c,col*thumbW,row*(thumbH+50),thumbW,thumbH);sc.fillStyle='#eee';sc.font='18px Arial';sc.fillText(`${t.toFixed(1)}s`,col*thumbW+10,row*(thumbH+50)+thumbH+30);fs.writeFileSync(path.join(PROJECT,'qa',`${format}${tag}-${String(i).padStart(2,'0')}.png`),c.encodeSync('png'));});
    fs.writeFileSync(path.join(PROJECT,'qa',`${format}${tag}-contact-sheet.jpg`),sheet.encodeSync('jpeg',90));
  }
  const poster=createCanvas(1080*scale,1920*scale);renderFrame(poster,a,2.7,{format:'vertical'});fs.writeFileSync(path.join(PROJECT,'renders',`digitec-cover${tag}.png`),poster.encodeSync('png'));
  console.log('Preview frames, contact sheets and cover rendered.');process.exit(0);
}
const ffmpeg=process.env.FFMPEG_PATH||path.join(PROJECT,'tools','ffmpeg','bin','ffmpeg.exe');
if(!fs.existsSync(ffmpeg))throw new Error(`FFmpeg missing: ${ffmpeg}. Set FFMPEG_PATH or follow README setup.`);
const limit=Number(get('--seconds',DURATION)),preview=args.includes('--draft'), fps=FPS;
for(const format of targets){
  const [W,H]=formats[format];if(!W)throw new Error('Unknown format '+format);
  const c=createCanvas(W,H),out=path.join(PROJECT,'renders',`digitec-${format}${tag}${preview?'-preview':''}.mp4`);
  const log=fs.createWriteStream(path.join(PROJECT,'qa',`${format}${tag}${preview?'-preview':''}-encode.log`));
  const command=['-y','-hide_banner','-f','rawvideo','-pix_fmt','rgba','-s',`${W}x${H}`,'-r',`${fps}`,'-i','pipe:0','-i',path.join(PROJECT,'assets','audio','master.wav'),'-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset',preview?'ultrafast':'medium','-crf',preview?'23':'17','-pix_fmt','yuv420p','-profile:v','high','-level:v',scale===2?'5.1':'4.1','-r',`${fps}`,'-fps_mode','cfr','-c:a','aac','-b:a','256k','-ar','48000','-af','loudnorm=I=-16:TP=-1.5:LRA=8','-t',`${limit}`,'-movflags','+faststart','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709',out];
  const proc=spawn(ffmpeg,command,{stdio:['pipe','ignore','pipe'],windowsHide:true});
  proc.stderr.pipe(log);let errors='';proc.stderr.on('data',b=>{errors=(errors+b.toString()).slice(-3000);});
  proc.stdin.on('error',()=>{});
  const started=Date.now();const frames=Math.round(limit*fps);let last=started;
  for(let frame=0;frame<frames;frame++){
    renderFrame(c,a,frame/fps,{format});
    if(!proc.stdin.write(c.data())) await once(proc.stdin,'drain');
    if(Date.now()-last>12000||frame===frames-1){console.log(`${format}: ${frame+1}/${frames} frames (${((frame+1)/fps).toFixed(1)}s), ${((Date.now()-started)/1000).toFixed(1)}s elapsed`);last=Date.now();}
  }
  proc.stdin.end();const [code]=await once(proc,'exit');log.end();if(code!==0)throw new Error(`FFmpeg exit ${code}: ${errors}`);
  console.log(`COMPLETE ${out} (${fs.statSync(out).size} bytes)`);
  fs.writeFileSync(path.join(PROJECT,'qa',`${format}${tag}${preview?'-preview':''}-render.json`),JSON.stringify({format,width:W,height:H,scale,fps,duration:limit,frames,elapsedSeconds:(Date.now()-started)/1000,bytes:fs.statSync(out).size,ffmpegArgs:command,scenes:SCENES},null,2));
}
