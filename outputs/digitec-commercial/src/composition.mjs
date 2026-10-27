import {createCanvas,loadImage,PROJECT} from './runtime.mjs';
import {drawEngine} from './engine.mjs';
import path from 'node:path';

export const FPS=30, DURATION=35;
export const ORANGE='#EB6736', WHITE='#f5f4f1', MUTED='#90918e';
export const SCENES=[
  {start:0,end:4,name:'Precision. Performance. Excellence.'},
  {start:4,end:9,name:'Diagnostics & programming'},
  {start:9,end:14,name:'Mechanical & electrical'},
  {start:14,end:20,name:'Performance tuning'},
  {start:20,end:27,name:'Bodywork & paint protection'},
  {start:27,end:31,name:'Engineered for excellence'},
  {start:31,end:35,name:'Book your service'}
];
export const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
export const smooth=(n)=>{n=clamp(n);return n*n*(3-2*n);};
export const ease=(n)=>1-Math.pow(1-clamp(n),3);
const lerp=(a,b,p)=>a+(b-a)*p;
let assets;
export async function loadAssets(){
  if(assets)return assets;
  const files={car:'hero-coupe.png',engine:'engine-exploded.png',macro:'paint-macro.png',logo:'digitec-wordmark-light-original.png',mark:'digitec-d-original.png'};
  assets=Object.fromEntries(await Promise.all(Object.entries(files).map(async([k,f])=>[k,await loadImage(path.join(PROJECT,'assets',f))])));
  // Feather the photographic layer inside the composition, leaving its source file intact.
  const plate=createCanvas(assets.car.width,assets.car.height),pc=plate.getContext('2d'),pw=plate.width,ph=plate.height;
  pc.drawImage(assets.car,0,0);pc.globalCompositeOperation='destination-in';
  let pg=pc.createLinearGradient(0,0,0,ph);pg.addColorStop(0,'#0000');pg.addColorStop(.29,'#000');pg.addColorStop(.88,'#000');pg.addColorStop(1,'#0000');pc.fillStyle=pg;pc.fillRect(0,0,pw,ph);
  pg=pc.createLinearGradient(0,0,pw,0);pg.addColorStop(0,'#0000');pg.addColorStop(.065,'#000');pg.addColorStop(.94,'#000');pg.addColorStop(1,'#0000');pc.fillStyle=pg;pc.fillRect(0,0,pw,ph);
  assets.carPlate=plate;
  return assets;
}
function text(c,str,x,y,size,color=WHITE,font='DigiDisplay',spacing=0,align='left'){
  c.fillStyle=color;c.font=`${size}px ${font}, sans-serif`;c.textBaseline='alphabetic';c.textAlign=align;
  if(!spacing){c.fillText(str,x,y);return;}
  const chars=[...str];let w=chars.reduce((a,v)=>a+c.measureText(v).width,0)+spacing*(chars.length-1);
  if(align==='center')x-=w/2;else if(align==='right')x-=w;
  c.textAlign='left';for(const char of chars){c.fillText(char,x,y);x+=c.measureText(char).width+spacing;}
}
function line(c,x,y,x2,y2,color=ORANGE,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();}
function pathLine(c,points,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();}
function circle(c,x,y,r,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();}
function withAlpha(c,a,fn){c.save();c.globalAlpha*=clamp(a);fn();c.restore();}
function revealText(c,str,x,y,size,t,delay=0,color=WHITE,font='DigiDisplay',spacing=0){
  const p=ease((t-delay)/.65);withAlpha(c,p,()=>text(c,str,x,y+24*(1-p),size,color,font,spacing));
}
function imageCover(c,img,x,y,w,h,px=.5,py=.5){let scale=Math.max(w/img.width,h/img.height);c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.drawImage(img,x+(w-img.width*scale)*px,y+(h-img.height*scale)*py,img.width*scale,img.height*scale);c.restore();}
function vignette(c,W,H){const g=c.createRadialGradient(W*.52,H*.48,Math.min(W,H)*.17,W*.5,H*.5,Math.max(W,H)*.7);g.addColorStop(0,'#00000000');g.addColorStop(.6,'#00000012');g.addColorStop(1,'#000000b8');c.fillStyle=g;c.fillRect(0,0,W,H);}
function background(c,W,H,t){
  c.fillStyle='#070808';c.fillRect(0,0,W,H);
  let g=c.createRadialGradient(W*.65,H*.5,20,W*.65,H*.5,W*.75);g.addColorStop(0,'#1b1d1e');g.addColorStop(1,'#070808');c.fillStyle=g;c.fillRect(0,0,W,H);
  withAlpha(c,.13,()=>{for(let i=0;i<6;i++)line(c,W*.13+i*W*.17,0,W*.13+i*W*.17,H,'#555650',.6);});
}
function brand(c,a,x,y,w,alpha=1){withAlpha(c,alpha,()=>c.drawImage(a.logo,x,y,w,w*a.logo.height/a.logo.width));}
function chrome(c,a,W,H,t,V){
  const m=V?78:108, top=V?134:86, bottom=V?1770:1000;
  brand(c,a,m,top,V?250:257,.9);
  line(c,m,bottom,W-m,bottom,'#414341',1);
  line(c,m,bottom,m+(W-2*m)*t/DURATION,bottom,ORANGE,2);
  text(c,'DUBAI, UAE',m,bottom+38,V?20:16,'#aaaca8','DigiText',3);
  text(c,'digitecme.com',W-m,bottom+38,V?21:17,'#a9aba7','DigiText',1,'right');
}
function chapter(c,W,V,label,t){
  const x=V?80:110,y=V?280:226;
  withAlpha(c,ease(t/.5),()=>{line(c,x,y-9,x+38,y-9,ORANGE,3);text(c,label,x+58,y,V?22:18,ORANGE,'DigiMono',2);});
}
function carPlate(c,a,x,y,w,t,brightness=1,scale=1){
  const h=w*a.car.height/a.car.width;
  c.save();c.translate(x+w/2,y+h/2);c.scale(scale,scale);c.translate(-w/2,-h/2);
  c.globalAlpha=brightness;
  c.drawImage(a.carPlate,0,0,w,h);
  // The photograph is only one layer: a moving narrow studio reflection is composited on the paint.
  c.beginPath();c.moveTo(w*.08,h*.75);c.bezierCurveTo(w*.13,h*.49,w*.38,h*.48,w*.43,h*.35);c.bezierCurveTo(w*.62,h*.24,w*.75,h*.33,w*.84,h*.5);c.lineTo(w*.92,h*.7);c.bezierCurveTo(w*.75,h*.75,w*.57,h*.83,w*.11,h*.8);c.closePath();c.clip();
  let sx=(.1+(t*.145)%1.1)*w,g=c.createLinearGradient(sx-w*.12,0,sx+w*.12,h);g.addColorStop(0,'#ffffff00');g.addColorStop(.45,'#dbe7ec00');g.addColorStop(.5,'#e5edf71b');g.addColorStop(.55,'#dbe7ec00');g.addColorStop(1,'#ffffff00');c.fillStyle=g;c.globalCompositeOperation='screen';c.fillRect(0,0,w,h);
  c.restore();return {x,y,w,h};
}
function ribbon(c,W,H,t,y){
  const p=clamp(t/.75),x=lerp(-W*.4,W*1.4,p),g=c.createLinearGradient(x-W*.45,y,x,y);
  g.addColorStop(0,'#EB673600');g.addColorStop(.8,'#EB673650');g.addColorStop(1,ORANGE);c.fillStyle=g;c.fillRect(x-W*.45,y,W*.45,2);
}
function intro(c,a,W,H,t,V){
  const x=V?80:110, titleY=V?406:352,size=V?83:78;
  const carW=V?1370:1320,carX=V?-150:600,carY=V?790:183;
  carPlate(c,a,carX+20*Math.sin(t*.18),carY,carW,t,smooth((t-.18)/1.3),1+.018*smooth(t/4));
  // A wide shutter uncovers the vehicle through a precise warm slit.
  withAlpha(c,1-smooth((t-.4)/1.9),()=>{c.fillStyle='#030404';c.fillRect(0,V?730:250,W,V?800:600);});
  ['PRECISION.','PERFORMANCE.','EXCELLENCE.'].forEach((s,i)=>revealText(c,s,x,titleY+i*(size+15),size,t,.35+i*.27,i===1?ORANGE:WHITE));
  revealText(c,'AUTOMOTIVE CARE. REFINED.',x,V?708:663,V?22:20,t,1.55,'#aeb1ad','DigiText',3.5);
  ribbon(c,W,H,t-.18,V?850:720);
  withAlpha(c,ease((t-2)/.7),()=>{text(c,'DIGI-TEC PERFORMANCE CENTER',x,V?1580:880,V?23:18,WHITE,'DigiText',2.1);text(c,'AL QUOZ · DUBAI',x,V?1620:918,V?21:16,MUTED,'DigiText',2.8);});
}
function scanNetwork(c,r,t){
  const {x,y,w,h}=r, s=smooth((t-.4)/3.7), sx=x+w*(.1+s*.81);
  c.save();c.beginPath();c.moveTo(x+w*.075,y+h*.79);c.lineTo(x+w*.115,y+h*.57);c.lineTo(x+w*.4,y+h*.42);c.lineTo(x+w*.49,y+h*.31);c.lineTo(x+w*.67,y+h*.31);c.lineTo(x+w*.84,y+h*.49);c.lineTo(x+w*.92,y+h*.71);c.lineTo(x+w*.86,y+h*.82);c.lineTo(x+w*.1,y+h*.86);c.closePath();c.clip();
  const g=c.createLinearGradient(sx-95,y,sx+25,y);g.addColorStop(0,'#EB673600');g.addColorStop(.8,'#EB67362c');g.addColorStop(1,'#EB67360a');c.fillStyle=g;c.fillRect(sx-95,y,120,h);line(c,sx,y,sx,y+h,'#ff8b59',2.3);
  withAlpha(c,.42,()=>{for(let j=0;j<14;j++)line(c,x,y+h*(.25+j*.045),x+w,y+h*(.25+j*.045),'#bbc2bc',.6);for(let j=0;j<24;j++)line(c,x+w*j/24,y,x+w*j/24,y+h,'#bbc2bc',.6);});c.restore();
  const nodes=[[.3,.63],[.46,.56],[.59,.5],[.75,.61],[.84,.62]];
  nodes.forEach((n,i)=>{const p=ease((t-.4-i*.16)/.9),nx=x+w*n[0],ny=y+h*n[1];withAlpha(c,p*.8,()=>{circle(c,nx,ny,6,ORANGE,1.5);circle(c,nx,ny,12,'#EB67365a',1);if(i){const prev=nodes[i-1];pathLine(c,[[x+w*prev[0],y+h*prev[1]],[nx-25,ny],[nx,ny]],'#EB6736a0',1.2);const progress=(t*.65+i*.19)%1;circle(c,lerp(x+w*prev[0],nx,progress),lerp(y+h*prev[1],ny,progress),2.4,WHITE,2);}});});
}
function smallSystem(c,x,y,w,t,label){
  line(c,x,y,x+w,y,'#555a56',1);text(c,label,x,y+31,16,MUTED,'DigiMono',1);
  for(let i=0;i<28;i++){const h=8+16*(.5+.5*Math.sin(i*.87+t*2.1));c.fillStyle=i>19?ORANGE:'#565d59';c.fillRect(x+i*w/28,y+65-h,w/40,h);}
}
function diagnostics(c,a,W,H,t,V){
  chapter(c,W,V,'DIAGNOSTICS & PROGRAMMING',t);
  const x=V?80:110;revealText(c,'ADVANCED',x,V?405:334,V?88:78,t,.15);revealText(c,'DIAGNOSTICS',x,V?507:423,V?88:78,t,.28);
  revealText(c,'ECU & MODULE PROGRAMMING',x,V?580:490,V?33:24,t,.5,ORANGE,'DigiText',1.7);
  const r=carPlate(c,a,V?-120:590,V?745:188,V?1320:1330,t+4,1,1+.015*Math.sin(t*.3));scanNetwork(c,r,t);
  const yy=V?1475:779;
  withAlpha(c,ease((t-.9)/.6),()=>{smallSystem(c,x,yy,V?420:390,t,'ELECTRONIC SYSTEMS');smallSystem(c,V?580:110,V?yy:yy+115,V?405:390,t+1,'MODULE COMMUNICATION');});
  const chipX=V?580:1515,chipY=V?1320:820;
  withAlpha(c,ease((t-1.3)/.8),()=>{for(let i=0;i<7;i++){line(c,chipX+i*20,chipY-14,chipX+i*20,chipY,'#808780',2);line(c,chipX+i*20,chipY+103,chipX+i*20,chipY+117,'#808780',2);}c.strokeStyle='#7e8781';c.lineWidth=1;c.strokeRect(chipX-12,chipY,150,103);c.strokeStyle=ORANGE;c.strokeRect(chipX+12,chipY+20,102,61);text(c,'ECU',chipX+63,chipY+58,22,WHITE,'DigiMono',3,'center');});
  text(c,'SUPPORTED FUNCTIONS CONFIRMED FOR YOUR VEHICLE',x,V?1663:948,V?17:14,'#9b9e97','DigiText',1.25);
}
function mechanical(c,a,W,H,t,V){
  chapter(c,W,V,'MECHANICAL & ELECTRICAL',t);
  const x=V?80:110;revealText(c,'PRECISION',x,V?406:350,V?88:80,t,.12);revealText(c,'IN EVERY DETAIL.',x,V?506:445,V?77:64,t,.27);
  const ex=V?65:830,ey=V?595:142,ew=V?950:980,eh=V?930:800;
  drawEngine(c,{t,x:ex,y:ey,width:ew,height:eh,image:a.engine,orange:ORANGE});
  const yy=V?1560:641;
  ['MECHANICAL REPAIRS','ELECTRICAL SYSTEMS','PRECISION SERVICING'].forEach((s,i)=>{withAlpha(c,ease((t-.5-i*.16)/.7),()=>{line(c,x,yy+i*55-9,x+20,yy+i*55-9,ORANGE,2);text(c,s,x+36,yy+i*55,V?32:25,WHITE,'DigiText',1.7);});});
}
function torqueCurve(c,x,y,w,h,t){
  for(let i=0;i<5;i++)line(c,x,y+i*h/4,x+w,y+i*h/4,'#5e655b45',1);
  for(let i=0;i<7;i++)line(c,x+i*w/6,y,x+i*w/6,y+h,'#5e655b32',1);
  const pts=[];for(let i=0;i<90;i++){let p=i/89;pts.push([x+p*w,y+h*(.9-.74*Math.sin(p*Math.PI*.83)**.72)]);}
  const count=Math.floor(pts.length*ease(t/1.8));if(count>1)pathLine(c,pts.slice(0,count),ORANGE,3);
  text(c,'CALIBRATION CURVE',x,y-20,17,'#bcc1b9','DigiMono',1);text(c,'ILLUSTRATIVE',x+w,y+h+30,13,MUTED,'DigiMono',1,'right');
}
function rpm(c,x,y,r,t){
  const power=.35+.5*smooth(t/4),start=Math.PI*.78,end=Math.PI*2.22;
  for(let i=0;i<=44;i++){let a=start+(end-start)*i/44;line(c,x+Math.cos(a)*(r-8),y+Math.sin(a)*(r-8),x+Math.cos(a)*r,y+Math.sin(a)*r,i/44<power?ORANGE:'#454c47',i%5===0?3:1.5);}
  const a=start+(end-start)*power;line(c,x,y,x+Math.cos(a)*(r-22),y+Math.sin(a)*(r-22),WHITE,2);circle(c,x,y,5,ORANGE,3);
  text(c,'RPM',x,y+r*.7,19,MUTED,'DigiMono',2,'center');
}
function tune(c,a,W,H,t,V){
  chapter(c,W,V,'PERFORMANCE TUNING',t);
  const x=V?80:110;revealText(c,'POWER.',x,V?407:352,V?100:88,t,.1);revealText(c,'WITH PRECISION.',x,V?512:447,V?72:65,t,.25);
  revealText(c,'ENGINE & ECU CALIBRATION',x,V?584:514,V?33:24,t,.42,ORANGE,'DigiText',1.8);
  const accel=smooth((t-5.1)/.8),carX=(V?-138:590)+accel*W*.65;
  if(t<.65){withAlpha(c,1-smooth(t/.65),()=>drawEngine(c,{t:5,x:V?70:925,y:V?675:175,width:V?930:800,height:V?900:700,image:a.engine,orange:ORANGE}));}
  withAlpha(c,smooth(t/.65),()=>carPlate(c,a,carX,V?710:185,V?1350:1330,t+14,1,1.02));
  const yy=V?1390:691;withAlpha(c,ease((t-.65)/.9),()=>{torqueCurve(c,x,yy,V?585:465,V?189:166,t);rpm(c,V?840:755,V?1501:788,V?124:98,t);});
  const boostX=V?742:1500,boostY=V?660:829;
  withAlpha(c,ease((t-1.1)/.8),()=>{text(c,'BOOST',boostX,boostY,17,MUTED,'DigiMono',2);for(let i=0;i<15;i++){c.fillStyle=i<(5+t*1.2)?ORANGE:'#4a514b';c.fillRect(boostX+i*12,boostY+18,5,26);}text(c,'ECU MAP',boostX,boostY+95,17,MUTED,'DigiMono',2);for(let i=0;i<12;i++)for(let j=0;j<4;j++){c.fillStyle=`rgba(235,103,54,${.15+.65*(.5+.5*Math.sin(i*.4+j*.7+t))})`;c.fillRect(boostX+i*15,boostY+109+j*10,10,5);}});
  text(c,'GAD MOTORS · UAE CONTACT',x,V?1670:943,V?22:18,WHITE,'DigiText',2);
  text(c,'VEHICLE-SPECIFIC SCOPE · TELEMETRY ILLUSTRATIVE',x,V?1710:971,V?15:13,MUTED,'DigiText',1.25);
  if(accel>0)withAlpha(c,accel*.4,()=>{for(let i=0;i<10;i++)line(c,0,H*.45+i*17,W*.8,H*.45+i*17,i%2? '#8c959044':'#EB67365a',1);});
}
function filmSheet(c,x,y,w,h,t){
  // A thin flexible mesh settles progressively. No luminous envelope is used.
  const settle=smooth((t-.8)/2.9),lift=(1-settle)*h*.2;
  c.save();c.beginPath();c.moveTo(x+w*.05,y+h*.7);c.bezierCurveTo(x+w*.33,y+h*.5-lift,x+w*.69,y+h*.31-lift,x+w*.95,y+h*.12);c.lineTo(x+w*.92,y+h*.36);c.bezierCurveTo(x+w*.64,y+h*.53-lift*.35,x+w*.32,y+h*.76-lift*.35,x+w*.04,y+h*.94);c.closePath();
  let g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'#ffffff04');g.addColorStop(.48,'#dce8f312');g.addColorStop(.56,'#f4f8ff35');g.addColorStop(.62,'#dde8ef09');g.addColorStop(1,'#ffffff02');c.fillStyle=g;c.fill();c.strokeStyle='#e5edf35c';c.lineWidth=1.2;c.stroke();c.restore();
  const rollX=x+w*(.05+.9*settle),rollY=y+h*(.7-.58*settle);
  withAlpha(c,Math.sin(settle*Math.PI)*.8,()=>{c.save();c.translate(rollX,rollY);c.rotate(-.5);let q=c.createLinearGradient(-8,0,8,0);q.addColorStop(0,'#bec8c300');q.addColorStop(.5,'#eef5fc80');q.addColorStop(1,'#bec8c300');c.fillStyle=q;c.fillRect(-8,-h*.07,16,h*.14);c.restore();});
}
function surfaceBeads(c,x,y,w,h,t){
  const p=smooth(t/.8);withAlpha(c,p,()=>{for(let i=0;i<14;i++){const seed=Math.sin(i*31.1)*.5+.5,xx=x+w*((i*.173)%1),yy=y+h*((i*.291)%1)+t*18*(.5+seed),r=4+seed*8;c.save();c.translate(xx,yy);c.scale(1,.62);let g=c.createRadialGradient(-r*.3,-r*.3,.2,0,0,r);g.addColorStop(0,'#ffffffa8');g.addColorStop(.25,'#dceaff45');g.addColorStop(.7,'#08101325');g.addColorStop(1,'#dceaff83');c.fillStyle=g;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.fill();c.restore();}});
}
function protection(c,a,W,H,t,V){
  const x=V?80:110;
  // Reframed macro fills a dedicated image window; type stays on near-black.
  const mx=V?0:710,my=V?640:160,mw=V?1080:1210,mh=V?914:757;
  imageCover(c,a.macro,mx,my,mw,mh,.47+.04*Math.sin(t*.13),.5);
  // Fade image edges naturally into the studio environment.
  let g=c.createLinearGradient(mx,my,mx,my+mh);g.addColorStop(0,'#070808');g.addColorStop(.18,'#07080800');g.addColorStop(.76,'#07080800');g.addColorStop(1,'#070808');c.fillStyle=g;c.fillRect(mx,my,mw,mh);
  if(!V){g=c.createLinearGradient(mx,0,mx+240,0);g.addColorStop(0,'#070808');g.addColorStop(1,'#07080800');c.fillStyle=g;c.fillRect(mx,my,240,mh);}
  chapter(c,W,V,'BODYWORK & PAINT PROTECTION',t);
  const stages=t<1.9?0:t<4.6?1:2;
  const titles=[['FLAWLESS.','BY DESIGN.'],['PROTECTION,','PRECISELY.'],['FINISH.','REFINED.']];
  const local=t-[0,1.9,4.6][stages],title=titles[stages],size=V?86:75;
  revealText(c,title[0],x,V?405:350,size,local,.0);revealText(c,title[1],x,V?504:440,size,local,.12);
  const services=['BODY REPAIR','PAINT PROTECTION FILM','CERAMIC COATING'];
  services.forEach((s,i)=>{const yy=(V?1582:660)+i*(V?52:62);text(c,s,x,yy,V?33:24,i===stages?WHITE:'#7c837c','DigiText',1.4);if(i===stages)line(c,x,yy+11,x+(V?700:490)*ease(local/.7),yy+11,ORANGE,2);});
  if(stages===0){const sweep=smooth(local/1.8);withAlpha(c,.34,()=>{const sx=mx+mw*sweep;let gg=c.createLinearGradient(sx-90,my,sx+90,my);gg.addColorStop(0,'#ffffff00');gg.addColorStop(.5,'#ffffff48');gg.addColorStop(1,'#ffffff00');c.fillStyle=gg;c.fillRect(sx-90,my+mh*.17,180,mh*.65);});}
  if(stages===1)filmSheet(c,mx+mw*.07,my+mh*.22,mw*.87,mh*.64,local+.65);
  if(stages===2)surfaceBeads(c,mx+mw*.12,my+mh*.22,mw*.73,mh*.53,local);
  text(c,'PAINTWORK · SURFACE PREPARATION · FINISHING',x,V?1740:952,V?15:14,MUTED,'DigiText',1.1);
}
function montage(c,a,W,H,t,V){
  const index=Math.min(3,Math.floor(t/.73)),local=t-index*.73;
  if(t<2.85){
    const words=['DIAGNOSE.','RESTORE.','CALIBRATE.','PROTECT.'];
    if(index===1){drawEngine(c,{t:2.4,x:V?120:870,y:V?560:140,width:V?820:870,height:V?1000:780,image:a.engine,orange:ORANGE});}
    else if(index===3){imageCover(c,a.macro,V?0:710,V?650:190,V?1080:1210,V?850:670);filmSheet(c,V?30:850,V?800:330,V?950:900,V?550:390,2);}
    else {const r=carPlate(c,a,V?-138:570,V?700:175,V?1350:1370,t+27);if(index===0)scanNetwork(c,r,2.5+local);}
    chapter(c,W,V,'FULL-SERVICE AUTOMOTIVE CENTER',t);
    revealText(c,words[index],V?80:110,V?453:426,V?99:86,local+.15,0,WHITE);
    text(c,'ONE CENTER. EVERY DETAIL.',V?80:110,V?1635:906,V?25:23,ORANGE,'DigiText',2);
  } else {
    carPlate(c,a,V?-138:600,V?760:192,V?1350:1320,t+27,.9);
    revealText(c,'ENGINEERED',V?80:110,V?421:355,V?92:82,t-2.7);
    revealText(c,'FOR EXCELLENCE.',V?80:110,V?525:452,V?72:65,t-2.6,0,ORANGE);
  }
}
function finale(c,a,W,H,t,V){
  c.fillStyle='#060707';c.fillRect(0,0,W,H);
  const cx=W/2,cy=V?870:447,logoW=V?770:850;
  // Official transparent wordmark, uniformly scaled with its native proportions.
  withAlpha(c,ease((t-.12)/.9),()=>brand(c,a,cx-logoW/2,cy,logoW));
  const sy=cy-40,px=lerp(cx-logoW*.8,cx+logoW*.8,smooth((t-.12)/1.1));
  withAlpha(c,Math.sin(clamp((t-.1)/1.25)*Math.PI)*.55,()=>{let g=c.createLinearGradient(px-170,sy,px,sy);g.addColorStop(0,'#EB673600');g.addColorStop(1,ORANGE);c.fillStyle=g;c.fillRect(px-170,sy,170,2);});
  withAlpha(c,ease((t-.62)/.7),()=>{text(c,'DIGI-TEC PERFORMANCE CENTER',cx,cy+(V?145:144),V?25:26,WHITE,'DigiText',V?2.7:4,'center');text(c,'DUBAI, UAE',cx,cy+(V?196:195),V?22:20,MUTED,'DigiText',4,'center');});
  withAlpha(c,ease((t-1.15)/.6),()=>{const yy=cy+(V?350:291);line(c,cx-37,yy-57,cx+37,yy-57,ORANGE,2);text(c,'BOOK YOUR SERVICE',cx,yy,V?25:23,WHITE,'DigiText',3,'center');text(c,'digitecme.com',cx,yy+(V?78:68),V?50:48,ORANGE,'DigiDisplay',1,'center');});
  // Stable final hold, then a very short visual fade matching the audio tail.
  withAlpha(c,smooth((t-3.75)/.25)*.6,()=>{c.fillStyle='#000';c.fillRect(0,0,W,H);});
}

const sceneFns=[intro,diagnostics,mechanical,tune,protection,montage,finale];
export function renderFrame(canvas,a,t,{format='vertical'}={}){
  const c=canvas.getContext('2d'),V=format==='vertical',W=V?1080:1920,H=V?1920:1080;
  t=clamp(t,0,DURATION-1/FPS);
  const scene=SCENES.findIndex(s=>t>=s.start&&t<s.end),s=SCENES[scene],local=t-s.start;
  c.resetTransform();c.scale(canvas.width/W,canvas.height/H);c.globalAlpha=1;c.globalCompositeOperation='source-over';
  background(c,W,H,t);sceneFns[scene](c,a,W,H,local,V);vignette(c,W,H);
  if(scene<6)chrome(c,a,W,H,t,V);
  // 200 ms graphic shutter across scene cuts: fast, clean and deterministic.
  if(scene>0 && local<.2){const p=local/.2;withAlpha(c,(1-p)*.82,()=>{c.fillStyle='#070808';c.fillRect(W*p,0,W*(1-p),H);});line(c,W*p,0,W*p,H,'#EB6736',2*(1-p));}
  // Full black only at the opening frame, then reveal with ignition.
  if(t<.25)withAlpha(c,1-smooth(t/.25),()=>{c.fillStyle='#000';c.fillRect(0,0,W,H);});
  return {scene,local};
}
