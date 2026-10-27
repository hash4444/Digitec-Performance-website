import {createRequire} from 'node:module';
import {existsSync} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const require = createRequire(import.meta.url);
let canvas;
try { canvas=require('@napi-rs/canvas'); }
catch {
  const root=process.env.CODEX_DEPENDENCY_ROOT || path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
  canvas=require(path.join(root,'@napi-rs/canvas'));
}
export const {createCanvas,loadImage,GlobalFonts}=canvas;
const fontDir=process.env.DIGITEC_FONT_DIR || 'C:/Windows/Fonts';
for(const [file,name] of [['bahnschrift.ttf','DigiDisplay'],['segoeui.ttf','DigiText'],['seguisb.ttf','DigiSemi'],['consola.ttf','DigiMono']]) {
  const p=path.join(fontDir,file); if(existsSync(p)) GlobalFonts.registerFromPath(p,name);
}
export const PROJECT=path.resolve(import.meta.dirname,'..');
