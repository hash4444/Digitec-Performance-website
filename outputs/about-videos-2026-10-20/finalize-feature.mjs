import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const out=path.resolve('outputs/about-videos-2026-10-20');
const read=async p=>JSON.parse((await fs.readFile(path.join(out,p),'utf8')).replace(/^\uFEFF/,''));
const baseline=await read('audit/preservation-baseline.json');
const media=await read('media/media-manifest.json');
const mediaCheck=await read('media/media-verification.json');
const preserved=await read('audit/preservation-results.json');
const files=[];
for(const file of ['src/pages/AboutUs.tsx','src/components/AboutVideoStrip.tsx','src/components/AboutVideoStrip.css',...Array.from({length:8},(_,i)=>['mp4','jpg'].map(ext=>`public/videos/about/video-${String(i+1).padStart(2,'0')}${ext==='jpg'?'-poster':''}.${ext}`)).flat()]){
 const bytes=await fs.readFile(file);
 files.push({file,status:file==='src/pages/AboutUs.tsx'?'modified':'new',bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
if(files.length!==19||media.media.length!==8||!mediaCheck.passed||!preserved.pass)throw Error('Feature manifest or preservation checks failed');
await fs.writeFile(path.join(out,'modified-files.json'),JSON.stringify({createdAt:new Date().toISOString(),base:baseline.head,branch:baseline.branch,sourceFiles:3,mediaFiles:16,files,protectedPendingFiles:preserved.results,committed:false,pushed:false,published:false},null,2));
console.log(JSON.stringify({manifest:path.join(out,'modified-files.json'),featureFiles:files.length,clips:media.media.length,preserved:preserved.results.length}));
