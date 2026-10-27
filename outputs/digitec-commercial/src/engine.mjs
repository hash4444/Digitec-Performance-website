/*
 * DIGI-TEC / precision servicing, 9–14 s.
 * Standard Canvas2D. The supplied transparent atlas is independently masked into
 * four photographic parts; it is an exploded visual study, not an engine cycle.
 */

const TAU = Math.PI * 2;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const outCubic = v => 1 - (1 - clamp(v)) ** 3;
const inOutCubic = v => (v = clamp(v)) < .5 ? 4 * v ** 3 : 1 - (-2 * v + 2) ** 3 / 2;

// The sloping boundaries pass through the transparent gaps in the atlas. A
// horizontal cut at 728 px would amputate the fourth connecting rod.
const topGap = [[0, 700], [300, 700], [500, 728], [700, 760], [900, 790], [1024, 812]];
const lowerGap = [[0, 1100], [300, 1100], [900, 1210], [1024, 1210]];
const layers = [
  { key: 'sump', mask: [...lowerGap, [1024, 1536], [0, 1536]], dy: -270, dx: 12, rot: -.003 },
  { key: 'pistons', mask: [[0, 375], [1024, 375], ...topGap.slice().reverse()], dy: 350, dx: 8, rot: .003 },
  { key: 'block', mask: [...topGap, ...lowerGap.slice().reverse()], dy: -30, dx: -5, rot: -.0015 },
  { key: 'head', mask: [[0, 0], [1024, 0], [1024, 375], [0, 375]], dy: 350, dx: -10, rot: -.004 }
];

function polygon(ctx, points) {
  ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
}

function label(ctx, { text, tx, ty, ax, ay, side, amount, orange, unit }) {
  if (amount <= .001) return;
  ctx.save();
  ctx.globalAlpha *= amount;
  const left = side === 'left';
  const extent = 177 * unit;
  const endX = left ? tx + extent : tx - 16 * unit;
  const elbowX = left ? ax - 34 * unit : ax + 34 * unit;
  const lineY = ty + 12 * unit;
  ctx.strokeStyle = 'rgba(194,201,207,.42)';
  ctx.lineWidth = .8 * unit;
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(elbowX, lineY);
  ctx.lineTo(endX, lineY);
  ctx.stroke();
  ctx.fillStyle = orange;
  ctx.beginPath();
  ctx.arc(ax, ay, 2.4 * unit, 0, TAU);
  ctx.fill();
  ctx.fillRect(left ? tx : tx - 1 * unit, ty - 5 * unit, 17 * unit, 2 * unit);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `500 ${12.5 * unit}px Arial, sans-serif`;
  ctx.fillStyle = '#D8DCE0';
  ctx.fillText(text, tx, ty + 30 * unit);
  ctx.restore();
}

function turbine(ctx, x, y, radius, t, amount, orange, unit) {
  if (amount < .001) return;
  ctx.save();
  ctx.globalAlpha *= amount;
  ctx.translate(x, y);
  // Precise outer section ring and a low-contrast casing.
  ctx.fillStyle = '#101214';
  ctx.strokeStyle = 'rgba(190,196,202,.19)';
  ctx.lineWidth = unit;
  ctx.beginPath(); ctx.arc(0, 0, radius, 0, TAU); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = orange;
  ctx.lineWidth = 1.35 * unit;
  ctx.beginPath(); ctx.arc(0, 0, radius - 5 * unit, -.65, 3.25); ctx.stroke();
  ctx.strokeStyle = 'rgba(221,226,230,.13)';
  ctx.lineWidth = .8 * unit;
  for (const r of [.82, .36]) { ctx.beginPath(); ctx.arc(0, 0, radius * r, 0, TAU); ctx.stroke(); }
  for (let i = 0; i < 36; i++) {
    const a = i * TAU / 36;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * (radius + 3 * unit), Math.sin(a) * (radius + 3 * unit));
    ctx.lineTo(Math.cos(a) * (radius + (i % 3 === 0 ? 7 : 5) * unit), Math.sin(a) * (radius + (i % 3 === 0 ? 7 : 5) * unit));
    ctx.stroke();
  }
  ctx.save();
  ctx.rotate(t * .34);
  for (let i = 0; i < 11; i++) {
    ctx.save();
    ctx.rotate(i * TAU / 11);
    const r = radius;
    const grad = ctx.createLinearGradient(r * .14, 0, r * .7, r * .36);
    grad.addColorStop(0, '#737B81'); grad.addColorStop(.5, '#292E32'); grad.addColorStop(1, '#B0B6BA');
    ctx.fillStyle = grad;
    ctx.strokeStyle = 'rgba(220,226,230,.22)';
    ctx.lineWidth = .7 * unit;
    ctx.beginPath();
    ctx.moveTo(r * .16, 0);
    ctx.bezierCurveTo(r * .36, -r * .21, r * .66, -r * .33, r * .76, -r * .25);
    ctx.bezierCurveTo(r * .77, -r * .02, r * .57, r * .22, r * .22, r * .15);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
  const hub = ctx.createRadialGradient(-radius * .05, -radius * .05, 0, 0, 0, radius * .19);
  hub.addColorStop(0, '#D8DCDF'); hub.addColorStop(.44, '#727B81'); hub.addColorStop(1, '#242B30');
  ctx.fillStyle = hub;
  ctx.beginPath(); ctx.arc(0, 0, radius * .18, 0, TAU); ctx.fill();
  ctx.fillStyle = orange;
  ctx.beginPath(); ctx.arc(0, 0, 2 * unit, 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(221,226,230,.58)';
  ctx.font = `500 ${9.5 * unit}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('TURBO / SECTION STUDY', 0, radius + 24 * unit);
  ctx.restore();
}

/**
 * Paint a 0–5 second exploded engine study inside the supplied rectangle.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{t:number,x:number,y:number,width:number,height:number,image:CanvasImageSource,orange?:string}} options
 */
export function drawEngine(ctx, { t = 0, x = 0, y = 0, width, height, image, orange = '#EB6736' }) {
  if (!image || width <= 0 || height <= 0) return;
  const unit = Math.min(width / 950, height / 850);
  const explode = outCubic(t / 1.4) * (1 - inOutCubic((t - 4.3) / .7));
  const labels = outCubic((t - .58) / .9) * (1 - inOutCubic((t - 4.2) / .5));
  const scale = Math.min(height * .94 / 1470, width * .64 / 760);
  const cx = width * .5 + Math.sin(t * .72) * 3 * unit;
  const cy = height * .495 + Math.sin(t * .93) * 2 * unit;
  const topLeftX = cx - 512 * scale;
  const topLeftY = cy - 768 * scale;
  const partPosition = (key, sx, sy) => {
    const layer = layers.find(part => part.key === key);
    return [topLeftX + (sx + layer.dx * explode) * scale,
      topLeftY + (sy + layer.dy * (1 - explode)) * scale];
  };

  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, width, height); ctx.clip();
  ctx.translate(x, y);

  // One fixed datum axis makes the separation feel measured and intentional.
  ctx.save();
  ctx.globalAlpha = .13 * explode;
  ctx.strokeStyle = '#AAB3BC';
  ctx.lineWidth = .8 * unit;
  ctx.setLineDash([3 * unit, 9 * unit]);
  ctx.beginPath(); ctx.moveTo(cx, height * .035); ctx.lineTo(cx, height * .955); ctx.stroke();
  ctx.restore();

  for (const layer of layers) {
    const drift = Math.sin(t * .8 + layer.dy * .015) * 1.7 * explode;
    ctx.save();
    ctx.translate(topLeftX + layer.dx * explode * scale, topLeftY + (layer.dy * (1 - explode) + drift) * scale);
    ctx.scale(scale, scale);
    ctx.translate(512, 768);
    ctx.rotate(layer.rot * explode * Math.sin(t * .55 + 1));
    ctx.translate(-512, -768);
    polygon(ctx, layer.mask); ctx.clip();
    ctx.drawImage(image, 0, 0, 1024, 1536);
    ctx.restore();
  }

  const [hx, hy] = partPosition('head', 265, 188);
  const [px, py] = partPosition('pistons', 756, 517);
  const [bx, by] = partPosition('block', 213, 922);
  const [sx, sy] = partPosition('sump', 819, 1313);
  label(ctx, { text: 'CYLINDER HEAD', tx: 25 * unit, ty: hy - 22 * unit, ax: hx, ay: hy, side: 'left', amount: labels, orange, unit });
  label(ctx, { text: 'PISTON ASSEMBLY', tx: width - 199 * unit, ty: py - 5 * unit, ax: px, ay: py, side: 'right', amount: labels, orange, unit });
  label(ctx, { text: 'ENGINE BLOCK', tx: 25 * unit, ty: by - 9 * unit, ax: bx, ay: by, side: 'left', amount: labels, orange, unit });
  label(ctx, { text: 'LOWER CRANKCASE', tx: width - 199 * unit, ty: sy - 8 * unit, ax: sx, ay: sy, side: 'right', amount: labels, orange, unit });
  turbine(ctx, 111 * unit, height - 117 * unit, 56 * unit, t, labels * .85, orange, unit);
  ctx.restore();
}

export default drawEngine;
