import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {PROJECT,loadImage} from './runtime.mjs';
const target=path.join(PROJECT,'asset-manifest.json');
const m=JSON.parse(fs.readFileSync(target,'utf8'));
const records=[
 ['hero-coupe','assets/hero-coupe.png','original-generated-visual','Original unbranded CGI-style coupe; built-in imagegen, no reference images'],
 ['engine-exploded','assets/engine-exploded.png','original-generated-visual','Generic engine atlas with true alpha; independent masked components in engine.mjs'],
 ['paint-macro','assets/paint-macro.png','original-generated-visual','Graphite paint/film macro; animated film mesh and beads composited in code'],
 ['digitec-wordmark-light-existing','assets/digitec-wordmark-light-existing.png','reference-brand-logo','Existing 2018x232 supplied-logo derivative; NOT USED IN VIDEO'],
 ['audio-master','assets/audio/master.wav','original-procedural-audio','Stereo original synthesized score and sound design; src/audio.py'],
 ['audio-music','assets/audio/music.wav','original-procedural-audio','Original music stem'],
 ['audio-sound-design','assets/audio/sound-design.wav','original-procedural-audio','Original sound design stem']
];
for(const [id,file,kind,description] of records){
 const p=path.join(PROJECT,file);if(!fs.existsSync(p))continue;
 const buf=fs.readFileSync(p),record={id,file,kind,description,bytes:buf.length,sha256:crypto.createHash('sha256').update(buf).digest('hex')};
 if(file.endsWith('.png')){const im=await loadImage(p);record.width=im.width;record.height=im.height;}
 if(kind==='original-generated-visual'){record.licenseStatus='Generated for this project using built-in imagegen; use subject to applicable service terms. No third-party stock photo or vehicle model used; no guarantee of unique output.';record.promptRecord='docs/image-generation-prompts.json';record.createdAt='2026-10-20';}
 if(kind==='original-procedural-audio'){record.licenseStatus='Original project synthesis, no third-party sample or commercial recording.';record.details='assets/audio/audio-manifest.json';}
 if(kind==='reference-brand-logo'){record.sourceLocal='outputs/video-wall-edit/digitec-video-overlay.png';record.licenseStatus='Existing supplied-logo derivative retained for reference; excluded from final composition.';}
 const i=m.assets.findIndex(a=>a.id===id);if(i<0)m.assets.push(record);else m.assets[i]=record;
}
m.status='Production manifest; final exports reference this asset set';
m.fonts={bundled:false,source:'Windows system fonts',families:['Bahnschrift','Segoe UI','Segoe UI Semibold','Consolas'],notes:'Used to render raster video frames. Fonts are not redistributed in editable source. Supply licensed equivalents and update runtime.mjs on other platforms.'};
m.runtime={renderer:'Node.js + @napi-rs/canvas 0.1.100; Canvas2D 2.5D scene composition',encoder:'FFmpeg 9.0.2 essentials / libx264 / AAC',ffmpegSource:'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip',audio:'Original deterministic NumPy oscillator/noise synthesis'};
m.pendingProductionEntries=[];
m.usedBrandLogo='assets/digitec-wordmark-light-original.png';
m.visualLimitations=['Original raster photographic plates with programmatic component movement, scanning, light, film and surface overlays; no editable full vehicle mesh.', 'Generic conceptual engine assembly, not a validated model-specific mechanical animation.', 'Official transparent wordmark is raster at429x49; preserved proportionally, enlarged in final slate.', 'Photoreal-style generated plates are not recordings of customer vehicles or workshop work.'];
fs.writeFileSync(target,JSON.stringify(m,null,2)+'\n');console.log('Manifest updated.');
