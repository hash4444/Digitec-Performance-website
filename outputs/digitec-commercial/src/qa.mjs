/** Technical checks against the encoded deliverables, not the source canvas.
 * Run from this folder: node src/qa.mjs
 * Both final MP4s must exist. Dependencies: bundled/local FFmpeg, FFprobe,
 * and the @napi-rs/canvas runtime already used by the renderer.
 */
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const PROJECT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QA = path.join(PROJECT, 'qa');
const FFMPEG = process.env.FFMPEG_PATH || path.join(PROJECT, 'tools', 'ffmpeg', 'bin', 'ffmpeg.exe');
const FFPROBE = process.env.FFPROBE_PATH || path.join(path.dirname(FFMPEG), 'ffprobe.exe');
const NULL_DEVICE = process.platform === 'win32' ? 'NUL' : '/dev/null';
const FPS = 30, DURATION = 35, EXPECTED_FRAMES = FPS * DURATION;
const UHD = process.argv.includes('--4k');
const reportFile = path.join(QA, UHD ? 'technical-report-4k.json' : 'technical-report.json');
const TARGETS = (UHD ? [{format: 'vertical-4k', width: 2160, height: 3840}] : [
  {format: 'vertical', width: 1080, height: 1920},
  {format: 'horizontal', width: 1920, height: 1080},
]).map(v => ({...v, file: path.join(PROJECT, 'renders', `digitec-${v.format}.mp4`)}));
const missing = TARGETS.filter(t => !fs.existsSync(t.file));
if (missing.length) {
  console.error('Final-video QA did not run: required MP4 files must exist. Missing:\n' + missing.map(t => t.file).join('\n'));
  process.exit(2);
}
for (const executable of [FFMPEG, FFPROBE]) {
  if (!fs.existsSync(executable)) {
    console.error(`Final-video QA did not run: executable missing: ${executable}`);
    process.exit(2);
  }
}
fs.mkdirSync(QA, {recursive: true});

function run(executable, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, {stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true});
    let stdout = '', stderr = '';
    child.stdout.on('data', data => { stdout += data.toString(); });
    child.stderr.on('data', data => { stderr += data.toString(); });
    child.on('error', reject);
    child.on('close', code => resolve({code, stdout, stderr, args}));
  });
}

function numericFraction(value) {
  const [n, d = 1] = String(value ?? '').split('/').map(Number);
  return d ? n / d : NaN;
}

function check(checks, name, passed, measured, expected) {
  checks.push({name, passed: Boolean(passed), measured, expected});
}

function loudnessJson(stderr) {
  const matches = [...stderr.matchAll(/\{\s*"input_i"[\s\S]*?\}/g)];
  if (!matches.length) return null;
  try { return JSON.parse(matches.at(-1)[0]); } catch { return null; }
}

const cuts = [4, 9, 14, 20, 27, 31];
const centers = [2, 6.5, 11.5, 17, 23.5, 29, 33];
const labels = new Map([[0, 'Opening'], [EXPECTED_FRAMES - 1, 'Final frame']]);
centers.forEach((t, i) => labels.set(Math.round(t * FPS), `Scene ${i + 1} center`));
cuts.forEach(t => {
  labels.set(t * FPS - 1, `Before ${t}s cut`);
  labels.set(t * FPS, `At/after ${t}s cut`);
});
const samples = [...labels].sort((a, b) => a[0] - b[0]).map(([frame, label]) => ({frame, seconds: frame / FPS, label}));

async function inspect(target) {
  console.log(`Checking ${target.format}: metadata, full decode, timestamps, audio true peak.`);
  const checks = [];
  const [metadataResult, decodeResult, timestampsResult, loudnessResult] = await Promise.all([
    run(FFPROBE, ['-v', 'error', '-count_frames', '-show_format', '-show_streams', '-of', 'json', target.file]),
    run(FFMPEG, ['-nostdin', '-hide_banner', '-v', 'error', '-xerror', '-i', target.file, '-map', '0:v:0', '-map', '0:a:0', '-f', 'null', NULL_DEVICE]),
    run(FFPROBE, ['-v', 'error', '-select_streams', 'v:0', '-show_frames', '-show_entries', 'frame=best_effort_timestamp_time,pkt_duration_time', '-of', 'json', target.file]),
    run(FFMPEG, ['-nostdin', '-hide_banner', '-i', target.file, '-vn', '-af', 'loudnorm=I=-16:TP=-1.5:LRA=8:print_format=json', '-f', 'null', NULL_DEVICE]),
  ]);
  fs.writeFileSync(path.join(QA, `${target.format}-full-decode.log`), decodeResult.stderr || 'Full video/audio decode completed without FFmpeg errors.\n');
  fs.writeFileSync(path.join(QA, `${target.format}-loudness.log`), loudnessResult.stderr);
  check(checks, 'FFprobe metadata command', metadataResult.code === 0, metadataResult.code, 0);
  check(checks, 'Full FFmpeg video/audio decode', decodeResult.code === 0 && !decodeResult.stderr.trim(), {exitCode: decodeResult.code, errors: decodeResult.stderr.trim()}, 'Exit 0 and no error output');
  check(checks, 'Frame timestamp extraction', timestampsResult.code === 0, timestampsResult.code, 0);
  check(checks, 'Audio loudness/true-peak analysis', loudnessResult.code === 0, loudnessResult.code, 0);
  let metadata = {}, frameData = {};
  try { metadata = JSON.parse(metadataResult.stdout); } catch { check(checks, 'Readable stream metadata', false, metadataResult.stderr.slice(-1000), 'Valid JSON'); }
  try { frameData = JSON.parse(timestampsResult.stdout); } catch { check(checks, 'Readable frame timestamps', false, timestampsResult.stderr.slice(-1000), 'Valid JSON'); }
  fs.writeFileSync(path.join(QA, `${target.format}-ffprobe.json`), JSON.stringify(metadata, null, 2));
  fs.writeFileSync(path.join(QA, `${target.format}-frame-timestamps.json`), JSON.stringify(frameData, null, 2));
  const streams = metadata.streams || [], video = streams.find(s => s.codec_type === 'video') || {}, audio = streams.find(s => s.codec_type === 'audio') || {};
  check(checks, 'H.264 codec', video.codec_name === 'h264', video.codec_name, 'h264');
  check(checks, 'Required dimensions', video.width === target.width && video.height === target.height, [video.width, video.height], [target.width, target.height]);
  check(checks, '30 FPS nominal and average', numericFraction(video.r_frame_rate) === FPS && numericFraction(video.avg_frame_rate) === FPS, {nominal: video.r_frame_rate, average: video.avg_frame_rate}, '30/1');
  check(checks, 'YUV 4:2:0 compatibility', video.pix_fmt === 'yuv420p', video.pix_fmt, 'yuv420p');
  check(checks, '1050 decoded video frames', Number(video.nb_read_frames) === EXPECTED_FRAMES, video.nb_read_frames, EXPECTED_FRAMES);
  check(checks, 'Video stream duration', Math.abs(Number(video.duration) - DURATION) <= 0.001, video.duration, '35.000 s ± 0.001 s');
  check(checks, 'Container duration', Math.abs(Number(metadata.format?.duration) - DURATION) <= 0.05, metadata.format?.duration, '35.000 s ± 0.05 s');
  check(checks, 'AAC audio codec', audio.codec_name === 'aac', audio.codec_name, 'aac');
  check(checks, 'Stereo audio', Number(audio.channels) === 2, {channels: audio.channels, layout: audio.channel_layout}, 2);
  check(checks, '48 kHz audio', Number(audio.sample_rate) === 48000, audio.sample_rate, 48000);
  check(checks, 'Audio stream duration', Math.abs(Number(audio.duration) - DURATION) <= 0.05, audio.duration, '35.000 s ± 0.05 s');
  const frames = frameData.frames || [];
  const pts = frames.map(f => Number(f.best_effort_timestamp_time));
  let nonMonotonic = 0, wrongStep = 0, maxStepError = 0;
  for (let i = 1; i < pts.length; i++) {
    const delta = pts[i] - pts[i - 1];
    if (!Number.isFinite(delta) || delta <= 0) nonMonotonic++;
    const error = Math.abs(delta - 1 / FPS);
    if (!Number.isFinite(error) || error > 0.000002) wrongStep++;
    if (Number.isFinite(error)) maxStepError = Math.max(maxStepError, error);
  }
  check(checks, '1050 frame timestamps', pts.length === EXPECTED_FRAMES && pts.every(Number.isFinite), pts.length, EXPECTED_FRAMES);
  check(checks, 'Strictly increasing presentation timestamps', nonMonotonic === 0, nonMonotonic, 0);
  check(checks, 'Constant frame interval at 30 FPS', wrongStep === 0, {wrongIntervals: wrongStep, maxAbsoluteErrorSeconds: maxStepError}, 'Every interval 1/30 s ± 2 µs');
  check(checks, 'First presentation timestamp', Math.abs(pts[0]) < 0.000002, pts[0], 0);
  check(checks, 'Last presentation timestamp', Math.abs(pts.at(-1) - (EXPECTED_FRAMES - 1) / FPS) < 0.000002, pts.at(-1), (EXPECTED_FRAMES - 1) / FPS);
  const loudness = loudnessJson(loudnessResult.stderr);
  check(checks, 'Readable measured audio loudness', loudness !== null, loudness, 'FFmpeg loudnorm input analysis');
  const truePeak = Number(loudness?.input_tp);
  check(checks, 'Decoded audio true peak below digital clipping', loudness !== null && Number.isFinite(truePeak) && truePeak < 0, truePeak, '< 0 dBTP');
  const warnings = [];
  if (Number.isFinite(truePeak) && truePeak > -1.0) warnings.push(`AAC decoded true peak ${truePeak} dBTP leaves less than 1 dB headroom.`);
  const frameDirectory = path.join(QA, `decoded-${target.format}`);
  fs.mkdirSync(frameDirectory, {recursive: true});
  const select = samples.map(s => `eq(n\\,${s.frame})`).join('+');
  console.log(`Extracting ${samples.length} decoded ${target.format} samples, including both sides of every cut.`);
  const extraction = await run(FFMPEG, ['-nostdin', '-hide_banner', '-v', 'error', '-y', '-i', target.file, '-vf', `select=${select}`, '-fps_mode', 'passthrough', '-q:v', '2', '-start_number', '0', path.join(frameDirectory, 'frame-%02d.jpg')]);
  check(checks, 'Decoded sample extraction command', extraction.code === 0, {exitCode: extraction.code, errors: extraction.stderr.trim()}, 0);
  const extractedSamples = samples.map((s, i) => ({...s, path: path.join(frameDirectory, `frame-${String(i).padStart(2, '0')}.jpg`)}));
  check(checks, 'All requested decoded samples exist', extractedSamples.every(s => fs.existsSync(s.path) && fs.statSync(s.path).size > 0), extractedSamples.filter(s => fs.existsSync(s.path)).length, samples.length);
  const result = {format: target.format, file: target.file, bytes: fs.statSync(target.file).size,
    passed: checks.every(c => c.passed), checks, warnings, video, audio, loudness,
    timestampSummary: {count: pts.length, firstSeconds: pts[0], lastSeconds: pts.at(-1), nonMonotonicIntervals: nonMonotonic, wrongFrameIntervals: wrongStep, maxIntervalErrorSeconds: maxStepError},
    decodeCommand: [FFMPEG, ...decodeResult.args], samples: extractedSamples};
  console.log(`${target.format}: ${result.passed ? 'PASS' : 'FAIL'} (${checks.filter(c => c.passed).length}/${checks.length} checks), true peak ${truePeak} dBTP.`);
  return result;
}

const started = Date.now();
const settled = await Promise.allSettled(TARGETS.map(inspect));
const results = settled.map((r, i) => r.status === 'fulfilled' ? r.value : {format: TARGETS[i].format, file: TARGETS[i].file, passed: false, error: String(r.reason?.stack || r.reason)});
const report = {createdAt: new Date().toISOString(), elapsedSeconds: (Date.now() - started) / 1000,
  passed: results.every(r => r.passed), specifications: {durationSeconds: DURATION, fps: FPS, frames: EXPECTED_FRAMES, videoCodec: 'h264', audioCodec: 'aac', audioSampleRate: 48000, audioChannels: 2},
  checksAreAgainst: 'Final encoded MP4 files. All samples decoded by FFmpeg from final video streams.',
  visualReview: {completed: false, note: 'Review the decoded contact sheet and full playback for typography, composition, brand accuracy and artistic quality. Technical checks do not certify these.'},
  tools: {ffmpeg: FFMPEG, ffprobe: FFPROBE}, files: results};

try {
  const {createCanvas, loadImage} = await import('./runtime.mjs');
  const columns = 7, cellW = 280, cellH = 330, groupRows = Math.ceil(samples.length / columns), header = 44;
  const canvas = createCanvas(columns * cellW, TARGETS.length * (groupRows * cellH + header));
  const context = canvas.getContext('2d');
  context.fillStyle = '#111111'; context.fillRect(0, 0, canvas.width, canvas.height);
  for (let group = 0; group < results.length; group++) {
    const result = results[group], yBase = group * (groupRows * cellH + header);
    context.fillStyle = '#EB6736'; context.font = '22px DigiSemi';
    context.fillText(`${result.format.toUpperCase()} — DECODED FINAL VIDEO`, 12, yBase + 29);
    for (let i = 0; i < (result.samples || []).length; i++) {
      const sample = result.samples[i];
      if (!fs.existsSync(sample.path)) continue;
      const image = await loadImage(sample.path);
      const availableH = 282, scale = Math.min(cellW / image.width, availableH / image.height);
      const w = image.width * scale, h = image.height * scale;
      const x = (i % columns) * cellW, y = yBase + header + Math.floor(i / columns) * cellH;
      context.drawImage(image, x + (cellW - w) / 2, y + (availableH - h) / 2, w, h);
      context.fillStyle = '#EEEEEE'; context.font = '14px DigiText';
      context.fillText(`${sample.seconds.toFixed(3)}s / frame ${sample.frame}`, x + 8, y + 301);
      context.fillStyle = '#AAAAAA'; context.fillText(sample.label, x + 8, y + 321);
      sample.decodedDimensions = [image.width, image.height];
    }
  }
  const contactSheet = path.join(QA, UHD ? 'decoded-contact-sheet-4k.jpg' : 'decoded-contact-sheet.jpg');
  fs.writeFileSync(contactSheet, canvas.encodeSync('jpeg', 91));
  report.visualReview.contactSheet = contactSheet;
} catch (error) {
  report.visualReview.contactSheetError = String(error.stack || error);
  // Individual full-resolution decoded samples remain available even without Canvas.
}
fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n');
for (const result of results) {
  for (const c of result.checks || []) if (!c.passed) console.error(`FAIL ${result.format}: ${c.name}: ${JSON.stringify(c.measured)}`);
  if (result.error) console.error(result.error);
}
console.log(`Technical QA ${report.passed ? 'PASSED' : 'FAILED'}: ${reportFile}`);
process.exitCode = report.passed ? 0 : 1;
