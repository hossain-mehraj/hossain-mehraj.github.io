/**
 * Generates the engineering drawings for the machined pen, pen box, and tic-tac-toe set,
 * in the same layout as my existing drawings (third-angle views, decimal inches, title block).
 *
 *   node scripts/drawings/make-drawings.mjs
 *
 * Every dimension lives in the PARTS tables below. Change a number there and re-run the
 * script to regenerate the PNGs in src/assets/projects/machine-shop/.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'src/assets/projects/machine-shop');
mkdirSync(OUT, { recursive: true });

const DRAWN_BY = 'MEHRAJ HOSSAIN';
const DATE = ''; // fill in the original drawing date if you want it shown

// ───────────────────────────── dimensions (inches) ─────────────────────────────
const PEN = {
  od: 0.437,
  thread: '5/16-24 UNF',
  threadMajor: 0.3125,
  barrel: { length: 3.75, bore: 0.257, threadDepth: 0.5, groove: { from: 0.25, width: 0.06, depth: 0.03 }, chamfer: 0.02 },
  tip: { shank: 0.4, body: 0.5, taper: 0.6, nose: 0.14, grooves: { first: 0.08, n: 4, width: 0.04, pitch: 0.09, depth: 0.02 }, bore: 0.128, seat: 0.257, seatDepth: 0.6 },
  cap: { shank: 0.35, head: 0.3, dome: 0.2185 },
};
const BOX = {
  L: 6.5, W: 1.5, H: 0.625,
  recess: { L: 6.0, W: 1.0, depth: 0.125, r: 0.125 },
  slot: { L: 5.7, W: 0.5, depth: 0.375 },
  post: { L: 0.25, W: 0.375, h: 0.25, r: 0.125 },
  hingeFromBack: 0.1875, hingeAboveTop: 0.125,
  clearHole: 0.116, // #32 drill, clearance for #4-40
  lidT: 0.25, chamfer: 0.02,
};
const TTT = {
  L: 5.0, W: 2.5, H: 0.75, tray: { L: 1.25, H: 0.5 },
  pitch: 0.75, hole: 0.191, csk: 0.312, holeDepth: 0.3,
  groove: { width: 0.063, depth: 0.031, length: 2.25 },
  trayHoles: [[-0.35, -0.75], [0.35, -0.75], [0, 0], [-0.35, 0.75], [0.35, 0.75]],
  peg: { d: 0.375, body: 0.625, pin: 0.18, pinL: 0.25, chamfer: 0.03, pinChamfer: 0.015 },
};

// ───────────────────────────── drawing helpers ─────────────────────────────
const W = 1100, H = 850; // 11 × 8.5 in sheet at 100 px/in
const f = (v) => { const s = Math.abs(v).toFixed(3); return (v < 0 ? '-' : '') + (Math.abs(v) < 1 ? s.slice(1) : s); };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const STYLE = {
  vis: 'stroke="#111" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"',
  thin: 'stroke="#111" stroke-width="1" fill="none"',
  hid: 'stroke="#111" stroke-width="1.2" fill="none" stroke-dasharray="7 4"',
  ctr: 'stroke="#111" stroke-width="0.8" fill="none" stroke-dasharray="22 4 4 4"',
  dim: 'stroke="#111" stroke-width="0.9" fill="none"',
};

class Sheet {
  constructor() { this.el = []; }
  add(s) { this.el.push(s); }
  line(a, b, st = 'vis') { this.add(`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" ${STYLE[st]}/>`); }
  poly(pts, st = 'vis', close = true, fill) {
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + (close ? ' Z' : '');
    this.add(`<path d="${d}" ${STYLE[st]}${fill ? ` style="fill:${fill}"` : ''}/>`);
  }
  circle(c, r, st = 'vis') { this.add(`<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="${r.toFixed(1)}" ${STYLE[st]}/>`); }
  arc(c, r, a0, a1, st = 'vis') { // degrees, y-up math angles
    const p = (a) => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] - r * Math.sin((a * Math.PI) / 180)];
    const [s, e] = [p(a0), p(a1)];
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    this.add(`<path d="M${s[0].toFixed(1)} ${s[1].toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 ${large} ${a1 > a0 ? 0 : 1} ${e[0].toFixed(1)} ${e[1].toFixed(1)}" ${STYLE[st]}/>`);
  }
  text(p, s, { size = 12, anchor = 'middle', weight = 400, bg = false } = {}) {
    const lines = String(s).split('\n');
    lines.forEach((ln, i) => {
      const y = p[1] + i * size * 1.25;
      if (bg) {
        const w = ln.length * size * 0.58 + 6;
        const x = anchor === 'middle' ? p[0] - w / 2 : anchor === 'end' ? p[0] - w : p[0] - 3;
        this.add(`<rect x="${x.toFixed(1)}" y="${(y - size * 0.9).toFixed(1)}" width="${w.toFixed(1)}" height="${(size * 1.15).toFixed(1)}" fill="#fff"/>`);
      }
      this.add(`<text x="${p[0].toFixed(1)}" y="${y.toFixed(1)}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="#111">${esc(ln)}</text>`);
    });
  }
  arrow(tip, from) {
    const dx = tip[0] - from[0], dy = tip[1] - from[1], L = Math.hypot(dx, dy) || 1;
    const ux = dx / L, uy = dy / L, a = 10, w = 3.2;
    const b = [tip[0] - ux * a, tip[1] - uy * a];
    this.add(`<path d="M${tip[0].toFixed(1)} ${tip[1].toFixed(1)} L${(b[0] - uy * w).toFixed(1)} ${(b[1] + ux * w).toFixed(1)} L${(b[0] + uy * w).toFixed(1)} ${(b[1] - ux * w).toFixed(1)} Z" fill="#111"/>`);
  }
  /** horizontal dimension between screen x1,x2; features at y1,y2; dimension line at yd */
  dimH(x1, x2, y1, y2, yd, label) {
    const g = 4, s = Math.sign(yd - (y1 + y2) / 2) || 1;
    this.line([x1, y1 + s * g], [x1, yd + s * 6], 'dim');
    this.line([x2, y2 + s * g], [x2, yd + s * 6], 'dim');
    if (Math.abs(x2 - x1) > 46) {
      this.line([x1, yd], [x2, yd], 'dim'); this.arrow([x1, yd], [x2, yd]); this.arrow([x2, yd], [x1, yd]);
      this.text([(x1 + x2) / 2, yd + 4], label, { bg: true });
    } else { // too small: arrows from outside
      const [a, b] = x1 < x2 ? [x1, x2] : [x2, x1];
      this.line([a - 22, yd], [b + 22, yd], 'dim'); this.arrow([a, yd], [a - 20, yd]); this.arrow([b, yd], [b + 20, yd]);
      this.text([b + 26, yd + 4], label, { anchor: 'start' });
    }
  }
  /** vertical dimension between screen y1,y2; features at x1,x2; dimension line at xd */
  dimV(y1, y2, x1, x2, xd, label) {
    const g = 4, s = Math.sign(xd - (x1 + x2) / 2) || 1;
    this.line([x1 + s * g, y1], [xd + s * 6, y1], 'dim');
    this.line([x2 + s * g, y2], [xd + s * 6, y2], 'dim');
    if (Math.abs(y2 - y1) > 30) {
      this.line([xd, y1], [xd, y2], 'dim'); this.arrow([xd, y1], [xd, y2]); this.arrow([xd, y2], [xd, y1]);
      this.text([xd, (y1 + y2) / 2 + 4], label, { bg: true });
    } else {
      const [a, b] = y1 < y2 ? [y1, y2] : [y2, y1];
      this.line([xd, a - 20], [xd, b + 20], 'dim'); this.arrow([xd, a], [xd, a - 18]); this.arrow([xd, b], [xd, b + 18]);
      this.text([xd + s * 8, (a + b) / 2 + 4], label, { anchor: s > 0 ? 'start' : 'end' });
    }
  }
  /** leader from feature point through elbow to note text */
  leader(at, elbow, note, anchor = 'start') {
    const tx = anchor === 'start' ? elbow[0] + 22 : elbow[0] - 22;
    this.line(elbow, [tx, elbow[1]], 'dim'); this.line(elbow, at, 'dim'); this.arrow(at, elbow);
    this.text([anchor === 'start' ? tx + 4 : tx - 4, elbow[1] + 4 - (note.split('\n').length - 1) * 7], note, { anchor });
  }
  centerH(y, x1, x2) { this.line([x1, y], [x2, y], 'ctr'); }
  centerV(x, y1, y2) { this.line([x, y1], [x, y2], 'ctr'); }
  centerMark(c, r) { this.line([c[0] - r, c[1]], [c[0] + r, c[1]], 'ctr'); this.line([c[0], c[1] - r], [c[0], c[1] + r], 'ctr'); }

  frame({ title, partNo, qty, material, scale, item = '1' }) {
    const s = [];
    s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="#fff"/>`);
    s.push(`<rect x="10" y="10" width="${W - 20}" height="${H - 20}" stroke="#111" stroke-width="2" fill="none"/>`);
    const y0 = 712, y1 = 772, y2 = H - 10;
    const cols = [10, 160, 640, 800, 950, W - 10];
    const t = (x, y, str, o = {}) => { this.text([x, y], str, o); };
    this.el.unshift(...s);
    this.line([10, y0], [W - 10, y0], 'vis');
    this.line([10, y1], [cols[4], y1], 'thin');
    this.line([cols[1], y0], [cols[1], y2], 'thin');
    this.line([cols[2], y0], [cols[2], y1], 'thin');
    this.line([540, y1], [540, y2], 'thin');
    this.line([cols[3], y0], [cols[3], y2], 'thin');
    this.line([cols[4], y0], [cols[4], y2], 'vis');
    const lab = (x, y, s) => t(x + 5, y + 13, s, { size: 9, anchor: 'start' });
    lab(cols[0], y0, 'ITEM:'); lab(cols[1], y0, 'TITLE:'); lab(cols[2], y0, 'PART NO.:'); lab(cols[3], y0, 'QTY:');
    lab(cols[0], y1, 'DATE:'); lab(cols[1], y1, 'DRAWN BY:'); lab(540, y1, 'MATERIAL:'); lab(cols[3], y1, 'SCALE:');
    t((cols[0] + cols[1]) / 2, y0 + 42, item, { size: 17, weight: 700 });
    t((cols[1] + cols[2]) / 2, y0 + 40, title, { size: 17, weight: 700 });
    t((cols[2] + cols[3]) / 2, y0 + 42, partNo, { size: 17, weight: 700 });
    t((cols[3] + cols[4]) / 2, y0 + 42, qty, { size: 17, weight: 700 });
    t((cols[0] + cols[1]) / 2, y1 + 44, DATE, { size: 16, weight: 700 });
    t((cols[1] + 540) / 2, y1 + 44, DRAWN_BY, { size: 16, weight: 700 });
    t((540 + cols[3]) / 2, y1 + 44, material, { size: 16, weight: 700 });
    t((cols[3] + cols[4]) / 2, y1 + 44, scale, { size: 16, weight: 700 });
    const notes = ['UNLESS OTHERWISE SPECIFIED:', 'DIMENSIONS IN INCHES', 'ALL CHAMFERS .020 X 45°', 'BREAK ALL SHARP EDGES', 'TOLERANCES:', '  .XX = ±.01', '  .XXX = ±.005', '  ANGULAR = ±.5°'];
    notes.forEach((n, i) => t(cols[4] + 6, y0 + 13 + i * 11.5, n, { size: 7.8, anchor: 'start', weight: i === 0 ? 700 : 400 }));
    // third-angle projection symbol
    const sx = W - 70, sy = y2 - 18;
    this.circle([sx, sy], 8, 'thin'); this.circle([sx, sy], 3.5, 'thin');
    this.poly([[sx + 18, sy - 8], [sx + 42, sy - 13], [sx + 42, sy + 13], [sx + 18, sy + 8]], 'thin');
  }
  svg() { return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${this.el.join('')}</svg>`; }
}

/** maps part coordinates (inches, y up) to sheet pixels */
const view = (ox, oy, k) => (x, y) => [ox + x * k, oy - y * k];

// isometric: viewer at (1,-1,1) → sees front (-y), right (+x), top (+z)
const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
const iso = (ox, oy, k) => (p) => [ox + (p[0] + p[1]) * C30 * k, oy - (p[2] + (p[1] - p[0]) * S30) * k];
const VIEW = [1, -1, 1];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const centroid = (pts) => pts.reduce((a, p) => [a[0] + p[0] / pts.length, a[1] + p[1] / pts.length, a[2] + p[2] / pts.length], [0, 0, 0]);
function polyArea(pts) { let a = 0; pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }); return a / 2; }
/** prism from a 2D polygon in the (u,v) plane, extruded along w; map(u,v,w) → [x,y,z] */
function prism(poly, w0, w1, map, normalW) {
  if (polyArea(poly) < 0) poly = [...poly].reverse(); // make CCW
  const faces = [];
  faces.push({ pts: poly.map(([u, v]) => map(u, v, w1)), n: normalW(1) });
  faces.push({ pts: [...poly].reverse().map(([u, v]) => map(u, v, w0)), n: normalW(-1) });
  poly.forEach((a, i) => {
    const b = poly[(i + 1) % poly.length];
    const nu = b[1] - a[1], nv = -(b[0] - a[0]); // outward for CCW
    const p0 = map(a[0], a[1], w0), n3 = map(nu, nv, 0).map((c, j) => c - map(0, 0, 0)[j]);
    faces.push({ pts: [map(a[0], a[1], w0), map(b[0], b[1], w0), map(b[0], b[1], w1), map(a[0], a[1], w1)], n: n3, p0 });
  });
  return faces;
}
const extrudeZ = (poly, z0, z1) => prism(poly, z0, z1, (u, v, w) => [u, v, w], (s) => [0, 0, s]);
const extrudeY = (poly, y0, y1) => prism(poly, y0, y1, (u, v, w) => [u, w, v], (s) => [0, s, 0]);
/** paints visible faces back-to-front; deco(face) can draw extra lines on a face */
function drawIso(sh, P, faces, deco = () => {}) {
  faces
    .filter((fc) => dot(fc.n, VIEW) > 1e-9)
    .sort((a, b) => dot(centroid(a.pts), VIEW) - dot(centroid(b.pts), VIEW))
    .forEach((fc) => { sh.poly(fc.pts.map(P), 'vis', true, '#fff'); deco(fc); });
}
const isoCircle = (sh, P, c, r, plane = 'z', st = 'vis') => {
  const pts = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * 2 * Math.PI, cs = Math.cos(a) * r, sn = Math.sin(a) * r;
    pts.push(P(plane === 'z' ? [c[0] + cs, c[1] + sn, c[2]] : plane === 'x' ? [c[0], c[1] + cs, c[2] + sn] : [c[0] + cs, c[1], c[2] + sn]));
  }
  sh.poly(pts, st === 'vis' ? 'thin' : st, true);
};

/** revolved part outline: profile = [[x, r], ...] along the axis; returns visible outline points */
function revolvedSide(sh, V, profile) {
  const top = profile.map(([x, r]) => V(x, r));
  const bot = [...profile].reverse().map(([x, r]) => V(x, -r));
  sh.poly([...top, ...bot], 'vis', true);
  // vertical edges at every shoulder
  profile.forEach(([x, r], i) => {
    const prev = profile[i - 1];
    if (prev && prev[0] === x) return;
    if (i > 0 && i < profile.length - 1 && profile[i + 1][0] !== x && prev && Math.abs(prev[1] - r) < 1e-9) return;
    if (i > 0 && i < profile.length - 1) sh.line(V(x, r), V(x, -r), 'vis');
  });
}

async function save(sheet, name) {
  const file = path.join(OUT, name);
  await sharp(Buffer.from(sheet.svg()), { density: 192 }).flatten({ background: '#fff' }).png({ compressionLevel: 9, palette: true }).toFile(file);
  console.log('wrote', path.relative(ROOT, file));
}

// ───────────────────────────── 1. pen barrel ─────────────────────────────
async function penBarrel() {
  const sh = new Sheet(), b = PEN.barrel, R = PEN.od / 2, k = 150;
  const V = view(110, 330, k);
  const g = b.groove, c = b.chamfer;
  // outline with relief grooves near each end
  const prof = [
    [0, R - c], [c, R], [g.from, R], [g.from, R - g.depth], [g.from + g.width, R - g.depth], [g.from + g.width, R],
    [b.length - g.from - g.width, R], [b.length - g.from - g.width, R - g.depth], [b.length - g.from, R - g.depth], [b.length - g.from, R],
    [b.length - c, R], [b.length, R - c],
  ];
  const top = prof.map(([x, r]) => V(x, r)), bot = [...prof].reverse().map(([x, r]) => V(x, -r));
  sh.poly([...top, ...bot]);
  for (const x of [c, g.from, g.from + g.width, b.length - g.from - g.width, b.length - g.from, b.length - c]) {
    const r = x === c || x === b.length - c ? R : R - g.depth;
    sh.line(V(x, r), V(x, -r), 'thin');
  }
  // bore and tapped ends (hidden)
  const rb = b.bore / 2, rt = PEN.threadMajor / 2;
  sh.line(V(b.threadDepth, rb), V(b.length - b.threadDepth, rb), 'hid'); sh.line(V(b.threadDepth, -rb), V(b.length - b.threadDepth, -rb), 'hid');
  for (const [x0, x1] of [[0, b.threadDepth], [b.length - b.threadDepth, b.length]]) {
    sh.line(V(x0, rt), V(x1, rt), 'hid'); sh.line(V(x0, -rt), V(x1, -rt), 'hid');
    const xe = x0 === 0 ? x1 : x0; sh.line(V(xe, rt), V(xe, -rt), 'hid');
  }
  sh.centerH(V(0, 0)[1], V(-0.15, 0)[0], V(b.length + 0.15, 0)[0]);
  // dims
  sh.dimH(V(0, 0)[0], V(b.length, 0)[0], V(0, R)[1], V(b.length, R)[1], V(0, R)[1] - 70, f(b.length));
  sh.dimV(V(0, R)[1], V(0, -R)[1], V(0, R)[0], V(0, -R)[0], V(0, 0)[0] - 45, `Ø${f(PEN.od)}`);
  sh.dimH(V(0, 0)[0], V(g.from, 0)[0], V(0, -R)[1], V(g.from, -R)[1], V(0, -R)[1] + 45, f(g.from));
  sh.dimH(V(b.length - g.from - g.width, 0)[0], V(b.length - g.from, 0)[0], V(0, -R)[1], V(0, -R)[1], V(0, -R)[1] + 45, f(g.width));
  sh.leader(V(b.length - b.threadDepth * 0.5, rt), [V(b.length - 0.6, 0)[0], V(0, R)[1] - 30], `${PEN.thread}-2B ▼${f(b.threadDepth)}\nBOTH ENDS`, 'end');
  sh.leader(V(b.length / 2 + 0.3, -rb), [V(b.length / 2 + 0.9, 0)[0], V(0, -R)[1] + 80], `Ø${f(b.bore)} THRU`);
  sh.leader(V(g.from + g.width / 2, -R + g.depth), [V(0.7, 0)[0], V(0, -R)[1] + 95], `RELIEF GROOVE ${f(g.width)} WIDE X ${f(g.depth)} DEEP\n2 PLACES`);
  sh.text([V(b.length / 2, 0)[0], 500], 'FRONT VIEW', { size: 11 });
  // end view
  const E = view(880, 330, k), e0 = E(0, 0);
  sh.circle(e0, R * k); sh.circle(e0, (R - c) * k, 'thin'); sh.circle(e0, rt * k, 'thin'); sh.circle(e0, rb * k);
  sh.centerMark(e0, R * k + 14);
  sh.text([e0[0], 500], 'RIGHT VIEW', { size: 11 });
  sh.text([300, 640], 'NOTES:\n1. REFILL BORE MUST BE CONCENTRIC TO OD WITHIN .002 TIR.\n2. TAP BOTH ENDS FROM THE SPINDLE SO THREADS SHARE ONE AXIS.\n3. POLISH OD. CHAMFER BOTH BORE MOUTHS .020 X 45°.', { size: 11, anchor: 'start' });
  sh.frame({ title: 'PEN BARREL', partNo: 'PEN-01', qty: '1', material: '6061-T6 ALUMINUM', scale: '3:2' });
  await save(sh, 'dwg-pen-barrel.png');
}

// ───────────────────────────── 2. pen tip + end cap ─────────────────────────────
async function penTipCap() {
  const sh = new Sheet(), t = PEN.tip, R = PEN.od / 2, rt = PEN.threadMajor / 2, k = 260;
  // ── tip
  const V = view(90, 250, k);
  const gr = t.grooves, x0 = t.shank, x1 = t.shank + t.body, x2 = x1 + t.taper;
  const prof = [[0, rt - 0.015], [0.015, rt], [x0, rt], [x0, R]];
  for (let i = 0; i < gr.n; i++) {
    const a = x0 + gr.first + i * gr.pitch; prof.push([a, R], [a, R - gr.depth], [a + gr.width, R - gr.depth], [a + gr.width, R]);
  }
  prof.push([x1, R], [x2, t.nose / 2]);
  sh.poly([...prof.map(([x, r]) => V(x, r)), ...[...prof].reverse().map(([x, r]) => V(x, -r))]);
  sh.line(V(x0, R), V(x0, -R)); sh.line(V(x1, R), V(x1, -R), 'thin');
  for (let i = 0; i < gr.n; i++) { const a = x0 + gr.first + i * gr.pitch; sh.line(V(a, R - gr.depth), V(a, -R + gr.depth), 'thin'); sh.line(V(a + gr.width, R - gr.depth), V(a + gr.width, -R + gr.depth), 'thin'); }
  sh.line(V(0.015, rt - 0.02), V(x0, rt - 0.02), 'thin'); sh.line(V(0.015, -rt + 0.02), V(x0, -rt + 0.02), 'thin'); // thread minor
  sh.line(V(0, t.seat / 2), V(t.seatDepth, t.seat / 2), 'hid'); sh.line(V(0, -t.seat / 2), V(t.seatDepth, -t.seat / 2), 'hid'); sh.line(V(t.seatDepth, t.seat / 2), V(t.seatDepth, -t.seat / 2), 'hid');
  sh.line(V(t.seatDepth, t.bore / 2), V(x2, t.bore / 2), 'hid'); sh.line(V(t.seatDepth, -t.bore / 2), V(x2, -t.bore / 2), 'hid');
  sh.centerH(V(0, 0)[1], V(-0.1, 0)[0], V(x2 + 0.1, 0)[0]);
  sh.dimH(V(0, 0)[0], V(x2, 0)[0], V(0, rt)[1], V(x2, 0)[1], V(0, R)[1] - 60, f(x2));
  sh.dimH(V(0, 0)[0], V(x0, 0)[0], V(0, -rt)[1], V(x0, -R)[1], V(0, -R)[1] + 40, f(x0));
  sh.dimH(V(x1, 0)[0], V(x2, 0)[0], V(x1, -R)[1], V(x2, -t.nose / 2)[1], V(0, -R)[1] + 40, f(t.taper));
  sh.dimV(V(0, R)[1], V(0, -R)[1], V(x1, R)[0], V(x1, -R)[0], V(x1, 0)[0] + 40, `Ø${f(PEN.od)}`);
  sh.leader(V(0.2, rt), [V(0.2, 0)[0] + 30, V(0, R)[1] - 25], `${PEN.thread}-2A`);
  sh.leader(V(x0 + gr.first + gr.width / 2, -R + gr.depth), [V(x0 + 0.3, 0)[0], V(0, -R)[1] + 85], `${gr.n}X GRIP GROOVE ${f(gr.width)} WIDE X ${f(gr.depth)} DEEP\nON ${f(gr.pitch)} PITCH`);
  sh.leader(V(t.seatDepth * 0.6, t.seat / 2), [V(0.9, 0)[0] + 20, V(0, R)[1] - 25], `Ø${f(t.seat)} ▼${f(t.seatDepth)} (REFILL SEAT)\nØ${f(t.bore)} THRU`);
  sh.leader(V(x2, t.nose / 2), [V(x2, 0)[0] + 70, V(0, R)[1] - 5], `Ø${f(t.nose)} AT NOSE`);
  sh.text([660, 330], 'ITEM 1: PEN TIP (QTY 1)', { size: 12, weight: 700 });
  // ── end cap
  const c = PEN.cap, U = view(120, 560, k), xh = c.shank + c.head;
  const cp = [[0, rt - 0.015], [0.015, rt], [c.shank, rt], [c.shank, R], [xh, R]];
  for (let i = 1; i <= 16; i++) { const a = (Math.PI / 2) * (i / 16); cp.push([xh + Math.sin(a) * c.dome, Math.cos(a) * R]); }
  sh.poly([...cp.map(([x, r]) => U(x, r)), ...[...cp].reverse().map(([x, r]) => U(x, -r))]);
  sh.line(U(c.shank, R), U(c.shank, -R)); sh.line(U(xh, R), U(xh, -R), 'thin');
  sh.line(U(0.015, rt - 0.02), U(c.shank, rt - 0.02), 'thin'); sh.line(U(0.015, -rt + 0.02), U(c.shank, -rt + 0.02), 'thin');
  sh.centerH(U(0, 0)[1], U(-0.1, 0)[0], U(xh + c.dome + 0.1, 0)[0]);
  sh.dimH(U(0, 0)[0], U(xh + c.dome, 0)[0], U(0, rt)[1], U(xh + c.dome, 0)[1], U(0, R)[1] - 45, f(xh + c.dome));
  sh.dimH(U(0, 0)[0], U(c.shank, 0)[0], U(0, -rt)[1], U(c.shank, -R)[1], U(0, -R)[1] + 40, f(c.shank));
  sh.dimH(U(c.shank, 0)[0], U(xh, 0)[0], U(c.shank, -R)[1], U(xh, -R)[1], U(0, -R)[1] + 40, f(c.head));
  sh.leader(U(xh + c.dome * 0.7, R * 0.7), [U(xh + c.dome, 0)[0] + 50, U(0, R)[1] - 20], `FULL DOME R${f(c.dome)}`);
  sh.leader(U(0.2, -rt), [U(0.2, 0)[0] + 10, U(0, -R)[1] + 80], `${PEN.thread}-2A`);
  sh.text([660, 600], 'ITEM 2: END CAP (QTY 1)', { size: 12, weight: 700 });
  // end views
  for (const [o, label] of [[[930, 250], 'TIP, VIEW FROM NOSE'], [[930, 560], 'CAP, VIEW FROM DOME']]) {
    sh.circle(o, R * k); sh.centerMark(o, R * k + 14);
    if (label.startsWith('TIP')) { sh.circle(o, (t.nose / 2) * k); sh.circle(o, (t.bore / 2) * k); }
    sh.text([o[0], o[1] + R * k + 32], label, { size: 11 });
  }
  sh.frame({ title: 'PEN TIP AND END CAP', partNo: 'PEN-02/03', qty: '1 EA', material: 'C360 BRASS', scale: '5:2', item: '1, 2' });
  await save(sh, 'dwg-pen-tip-cap.png');
}

// ───────────────────────────── 3. box base ─────────────────────────────
async function boxBase() {
  const sh = new Sheet(), B = BOX, k = 75, p = B.post, r = B.recess, s = B.slot;
  const T = view(80, 300, k); // top view, y up = back
  const cx = B.L / 2, cy = B.W / 2;
  sh.poly([T(0, 0), T(B.L, 0), T(B.L, B.W), T(0, B.W)]);
  for (const x of [0, B.L - p.L]) sh.poly([T(x, B.W - p.W), T(x + p.L, B.W - p.W), T(x + p.L, B.W), T(x, B.W)]);
  const rr = (x0, y0, x1, y1, rad) => { // rounded rect outline
    const pts = [], seg = 8, c = [[x1 - rad, y0 + rad, -90], [x1 - rad, y1 - rad, 0], [x0 + rad, y1 - rad, 90], [x0 + rad, y0 + rad, 180]];
    for (const [ccx, ccy, a0] of c) for (let i = 0; i <= seg; i++) { const a = ((a0 + (90 * i) / seg) * Math.PI) / 180; pts.push(T(ccx + rad * Math.cos(a), ccy + rad * Math.sin(a))); }
    return pts;
  };
  sh.poly(rr(cx - r.L / 2, cy - r.W / 2, cx + r.L / 2, cy + r.W / 2, r.r));
  sh.poly(rr(cx - s.L / 2, cy - s.W / 2, cx + s.L / 2, cy + s.W / 2, s.W / 2));
  sh.centerH(T(0, cy)[1], T(-0.2, 0)[0], T(B.L + 0.2, 0)[0]);
  sh.dimH(T(0, 0)[0], T(B.L, 0)[0], T(0, B.W)[1], T(B.L, B.W)[1], T(0, B.W)[1] - 40, f(B.L));
  sh.dimV(T(0, B.W)[1], T(0, 0)[1], T(0, B.W)[0], T(0, 0)[0], T(0, 0)[0] - 40, f(B.W));
  sh.dimH(T(cx - r.L / 2, 0)[0], T(cx + r.L / 2, 0)[0], T(0, cy - r.W / 2)[1], T(0, cy - r.W / 2)[1], T(0, 0)[1] + 30, f(r.L));
  sh.dimH(T(cx - s.L / 2, 0)[0], T(cx + s.L / 2, 0)[0], T(0, cy - s.W / 2)[1], T(0, cy - s.W / 2)[1], T(0, 0)[1] + 58, f(s.L));
  sh.dimV(T(0, cy + r.W / 2)[1], T(0, cy - r.W / 2)[1], T(B.L, 0)[0], T(B.L, 0)[0], T(B.L, 0)[0] + 35, f(r.W));
  sh.dimV(T(0, cy + s.W / 2)[1], T(0, cy - s.W / 2)[1], T(B.L, 0)[0], T(B.L, 0)[0], T(B.L, 0)[0] + 85, f(s.W));
  sh.leader(T(cx - r.L / 2 + 0.04, cy + r.W / 2 - 0.04), [T(0.9, 0)[0], T(0, B.W)[1] - 70], `RECESS ▼${f(r.depth)}, R${f(r.r)} CORNERS`);
  sh.leader(T(cx + 1.2, cy + s.W / 2), [T(4.2, 0)[0], T(0, B.W)[1] - 70], `PEN SLOT ▼${f(s.depth)} FROM TOP, FULL R ENDS`);
  sh.leader(T(B.L - p.L / 2, B.W - p.W / 2), [T(B.L, 0)[0] + 70, T(0, B.W)[1] - 15], `2X HINGE POST\n${f(p.L)} X ${f(p.W)}`, 'start');
  // front view
  const F = view(80, 500, k);
  sh.poly([F(0, 0), F(B.L, 0), F(B.L, B.H + p.h), F(B.L - p.L, B.H + p.h), F(B.L - p.L, B.H), F(p.L, B.H), F(p.L, B.H + p.h), F(0, B.H + p.h)]);
  sh.line(F(cx - r.L / 2, B.H - r.depth), F(cx + r.L / 2, B.H - r.depth), 'hid');
  sh.line(F(cx - s.L / 2, B.H - s.depth), F(cx + s.L / 2, B.H - s.depth), 'hid');
  sh.line(F(cx - s.L / 2, B.H - r.depth), F(cx - s.L / 2, B.H - s.depth), 'hid'); sh.line(F(cx + s.L / 2, B.H - r.depth), F(cx + s.L / 2, B.H - s.depth), 'hid');
  sh.line(F(cx - r.L / 2, B.H), F(cx - r.L / 2, B.H - r.depth), 'hid'); sh.line(F(cx + r.L / 2, B.H), F(cx + r.L / 2, B.H - r.depth), 'hid');
  const hz = B.H + B.hingeAboveTop;
  for (const x0 of [0, B.L - p.L]) { sh.line(F(x0, hz + B.clearHole / 2), F(x0 + p.L, hz + B.clearHole / 2), 'hid'); sh.line(F(x0, hz - B.clearHole / 2), F(x0 + p.L, hz - B.clearHole / 2), 'hid'); }
  sh.centerH(F(0, hz)[1], F(-0.15, 0)[0], F(B.L + 0.15, 0)[0]);
  sh.dimV(F(0, B.H)[1], F(0, 0)[1], F(0, B.H)[0], F(0, 0)[0], F(0, 0)[0] - 40, f(B.H));
  sh.dimV(F(0, B.H + p.h)[1], F(0, B.H)[1], F(B.L, B.H + p.h)[0], F(B.L, B.H)[0], F(B.L, 0)[0] + 35, f(p.h));
  sh.dimV(F(0, B.H)[1], F(0, B.H - s.depth)[1], F(cx, 0)[0], F(cx, 0)[0], F(cx, 0)[0] + 0, f(s.depth));
  sh.text([F(cx, 0)[0], 575], 'FRONT VIEW', { size: 11 });
  // right view (y horizontal, front on left)
  const Rv = view(820, 500, k);
  const fil = []; for (let i = 0; i <= 10; i++) { const a = (Math.PI / 2) * (i / 10); fil.push(Rv(B.W - p.r + p.r * Math.cos(a), B.H + p.h - p.r + p.r * Math.sin(a))); }
  sh.poly([Rv(0, 0), Rv(B.W, 0), ...fil, Rv(B.W - p.W, B.H + p.h), Rv(B.W - p.W, B.H), Rv(0, B.H)]);
  sh.circle(Rv(B.W - B.hingeFromBack, hz), (B.clearHole / 2) * k); sh.centerMark(Rv(B.W - B.hingeFromBack, hz), 12);
  sh.line(Rv(cy - r.W / 2, B.H), Rv(cy - r.W / 2, B.H - r.depth), 'hid'); sh.line(Rv(cy + r.W / 2, B.H), Rv(cy + r.W / 2, B.H - r.depth), 'hid');
  sh.line(Rv(cy - r.W / 2, B.H - r.depth), Rv(cy + r.W / 2, B.H - r.depth), 'hid');
  sh.poly([Rv(cy - s.W / 2, B.H - r.depth), Rv(cy - s.W / 2, B.H - s.depth), Rv(cy + s.W / 2, B.H - s.depth), Rv(cy + s.W / 2, B.H - r.depth)], 'hid', false);
  sh.leader(Rv(B.W - B.hingeFromBack - 0.04, hz + 0.04), [Rv(0, 0)[0] - 10, Rv(0, B.H + p.h)[1] - 40], `Ø${f(B.clearHole)} (#32) THRU\nBOTH POSTS`, 'end');
  sh.leader(Rv(B.W - p.r * 0.3, B.H + p.h - p.r * 0.3), [Rv(0, 0)[0] - 10, Rv(0, B.H + p.h)[1] - 85], `R${f(p.r)} POST TOP\n(LID SWING CLEARANCE)`, 'end');
  sh.dimH(Rv(B.W - B.hingeFromBack, 0)[0], Rv(B.W, 0)[0], Rv(0, 0)[1], Rv(0, 0)[1], Rv(0, 0)[1] + 32, f(B.hingeFromBack));
  sh.text([Rv(cy, 0)[0], 575], 'RIGHT VIEW', { size: 11 });
  // iso
  const P = iso(760, 250, 34);
  const faces = [
    ...extrudeZ([[0, 0], [B.L, 0], [B.L, B.W], [0, B.W]], 0, B.H),
    ...extrudeZ([[0, B.W - p.W], [p.L, B.W - p.W], [p.L, B.W], [0, B.W]], B.H, B.H + p.h),
    ...extrudeZ([[B.L - p.L, B.W - p.W], [B.L, B.W - p.W], [B.L, B.W], [B.L - p.L, B.W]], B.H, B.H + p.h),
  ];
  drawIso(sh, P, faces, (fc) => {
    if (fc.n[2] > 0 && Math.abs(fc.pts[0][2] - B.H) < 1e-9 && Math.max(...fc.pts.map((q) => q[0])) - Math.min(...fc.pts.map((q) => q[0])) > B.L - 0.01) {
      const q = (pts) => pts.map(([x, y]) => P([x, y, B.H]));
      sh.poly(q([[cx - r.L / 2, cy - r.W / 2], [cx + r.L / 2, cy - r.W / 2], [cx + r.L / 2, cy + r.W / 2], [cx - r.L / 2, cy + r.W / 2]]), 'thin');
      sh.poly(q([[cx - s.L / 2, cy - s.W / 2], [cx + s.L / 2, cy - s.W / 2], [cx + s.L / 2, cy + s.W / 2], [cx - s.L / 2, cy + s.W / 2]]), 'thin');
    }
  });
  sh.text([900, 385], 'SCALE 1:3', { size: 11 });
  sh.frame({ title: 'PEN BOX BASE', partNo: 'BOX-01', qty: '1', material: '6061-T6 ALUMINUM', scale: '3/4' });
  await save(sh, 'dwg-box-base.png');
}

// ───────────────────────────── 4. box lid (plain plate) ─────────────────────────────
async function boxLid() {
  const sh = new Sheet(), B = BOX, k = 75, p = B.post, t = B.lidT;
  const outline = [[0, 0], [B.L, 0], [B.L, B.W - p.W], [B.L - p.L, B.W - p.W], [B.L - p.L, B.W], [p.L, B.W], [p.L, B.W - p.W], [0, B.W - p.W]];
  const T = view(140, 330, k);
  sh.poly(outline.map(([x, y]) => T(x, y)));
  const hy = B.W - B.hingeFromBack, depth = 0.25;
  for (const [x0, dir] of [[p.L, 1], [B.L - p.L, -1]]) {
    sh.line(T(x0, hy + 0.045), T(x0 + dir * depth, hy + 0.045), 'hid'); sh.line(T(x0, hy - 0.045), T(x0 + dir * depth, hy - 0.045), 'hid');
    sh.line(T(x0 + dir * depth, hy + 0.045), T(x0 + dir * depth, hy - 0.045), 'hid');
  }
  sh.centerH(T(0, hy)[1], T(p.L - 0.1, 0)[0], T(B.L - p.L + 0.1, 0)[0]);
  sh.dimH(T(0, 0)[0], T(B.L, 0)[0], T(0, 0)[1], T(B.L, 0)[1], T(0, 0)[1] + 45, f(B.L));
  sh.dimV(T(0, B.W - p.W)[1], T(0, 0)[1], T(0, 0)[0], T(0, 0)[0], T(0, 0)[0] - 70, f(B.W - p.W));
  sh.dimV(T(0, B.W)[1], T(0, 0)[1], T(B.L, 0)[0], T(B.L, 0)[0], T(B.L, 0)[0] + 40, f(B.W));
  sh.dimH(T(0, 0)[0], T(p.L, 0)[0], T(0, B.W - p.W)[1], T(p.L, B.W)[1], T(0, B.W)[1] - 35, f(p.L));
  sh.dimV(T(0, B.W)[1], T(0, B.W - p.W)[1], T(p.L, B.W)[0], T(0, B.W - p.W)[0], T(0, 0)[0] - 30, f(p.W));
  sh.leader(T(p.L + 0.1, hy), [T(1.4, 0)[0], T(0, B.W)[1] - 70], `#4-40 UNC-2B ▼${f(depth)}\n2X, ONE IN EACH NOTCH FACE\nCOAXIAL WITH BASE HINGE HOLES`);
  sh.leader(T(4.6, B.W), [T(4.9, 0)[0], T(0, B.W)[1] - 30], `R${f(p.r)} ON BACK BOTTOM EDGE`);
  sh.text([T(B.L / 2, 0)[0], 400], 'TOP VIEW', { size: 11 });
  // front view
  const F = view(140, 520, k);
  sh.poly([F(0, 0), F(B.L, 0), F(B.L, t), F(0, t)]);
  sh.line(F(p.L, t), F(p.L, 0), 'hid'); sh.line(F(B.L - p.L, t), F(B.L - p.L, 0), 'hid');
  sh.dimV(F(0, t)[1], F(0, 0)[1], F(0, 0)[0], F(0, 0)[0], F(0, 0)[0] - 35, f(t));
  sh.text([F(B.L / 2, 0)[0], 565], 'FRONT VIEW', { size: 11 });
  // right view
  const Rv = view(820, 520, k);
  sh.poly([Rv(0, 0), Rv(B.W - p.W, 0), Rv(B.W - p.W, t), Rv(0, t)]);
  const lf = []; for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + (Math.PI / 2) * (i / 10); lf.push(Rv(B.W - p.r + p.r * Math.cos(a), p.r + p.r * Math.sin(a))); }
  sh.poly([Rv(B.W - p.W, 0), ...lf, Rv(B.W, t), Rv(B.W - p.W, t)], 'vis', false);
  sh.circle(Rv(B.W - B.hingeFromBack, t / 2), 0.045 * k); sh.centerMark(Rv(B.W - B.hingeFromBack, t / 2), 10);
  sh.dimH(Rv(B.W - B.hingeFromBack, 0)[0], Rv(B.W, 0)[0], Rv(0, t)[1], Rv(0, t)[1], Rv(0, t)[1] - 30, f(B.hingeFromBack));
  sh.dimV(Rv(0, t / 2)[1], Rv(0, 0)[1], Rv(B.W, 0)[0], Rv(B.W, 0)[0], Rv(B.W, 0)[0] + 30, f(t / 2));
  sh.text([Rv(B.W / 2, 0)[0], 565], 'RIGHT VIEW', { size: 11 });
  // iso
  const P = iso(730, 210, 32);
  drawIso(sh, P, extrudeZ(outline, 0, t));
  sh.text([880, 345], 'SCALE 1:3', { size: 11 });
  sh.text([80, 630], 'NOTES:\n1. LID IS A PLAIN PLATE. ARTWORK ENGRAVING IS DEFINED IN THE CAM FILE, NOT ON THIS DRAWING.\n2. NOTCHES CLEAR THE HINGE POSTS SO THE LID CLOSES FLUSH WITH THE BASE.', { size: 11, anchor: 'start' });
  sh.frame({ title: 'PEN BOX LID', partNo: 'BOX-02', qty: '1', material: '6061-T6 ALUMINUM', scale: '3/4' });
  await save(sh, 'dwg-box-lid.png');
}

// ───────────────────────────── 5. tic-tac-toe board ─────────────────────────────
async function tttBoard() {
  const sh = new Sheet(), B = TTT, k = 85, tr = B.tray, cx = B.L / 2, cy = B.W / 2;
  const T = view(80, 330, k);
  sh.poly([T(0, 0), T(B.L, 0), T(B.L, B.W), T(0, B.W)]);
  sh.line(T(tr.L, 0), T(tr.L, B.W)); sh.line(T(B.L - tr.L, 0), T(B.L - tr.L, B.W));
  const holes = [];
  for (const i of [-1, 0, 1]) for (const j of [-1, 0, 1]) holes.push([cx + i * B.pitch, cy + j * B.pitch]);
  for (const tcx of [tr.L / 2, B.L - tr.L / 2]) for (const [dx, dy] of B.trayHoles) holes.push([tcx + dx, cy + dy]);
  for (const h of holes) { sh.circle(T(...h), (B.csk / 2) * k); sh.circle(T(...h), (B.hole / 2) * k, 'thin'); }
  const g = B.groove;
  for (const s of [-0.5, 0.5]) {
    const x = cx + s * B.pitch, y = cy + s * B.pitch;
    for (const d of [-g.width / 2, g.width / 2]) {
      sh.line(T(x + d, cy - g.length / 2), T(x + d, cy + g.length / 2), 'thin');
      sh.line(T(cx - g.length / 2, y + d), T(cx + g.length / 2, y + d), 'thin');
    }
  }
  sh.centerH(T(0, cy)[1], T(-0.2, 0)[0], T(B.L + 0.2, 0)[0]); sh.centerV(T(cx, 0)[0], T(0, -0.2)[1], T(0, B.W + 0.2)[1]);
  sh.dimH(T(0, 0)[0], T(B.L, 0)[0], T(0, B.W)[1], T(B.L, B.W)[1], T(0, B.W)[1] - 45, f(B.L));
  sh.dimH(T(0, 0)[0], T(tr.L, 0)[0], T(0, 0)[1], T(tr.L, 0)[1], T(0, 0)[1] + 30, f(tr.L));
  sh.dimH(T(cx - B.pitch, 0)[0], T(cx, 0)[0], T(cx - B.pitch, cy - B.pitch)[1], T(cx, cy - B.pitch)[1], T(0, 0)[1] + 30, f(B.pitch));
  sh.dimH(T(cx, 0)[0], T(cx + B.pitch, 0)[0], T(cx, cy - B.pitch)[1], T(cx + B.pitch, cy - B.pitch)[1], T(0, 0)[1] + 30, f(B.pitch));
  sh.dimV(T(0, B.W)[1], T(0, 0)[1], T(0, 0)[0], T(0, 0)[0], T(0, 0)[0] - 40, f(B.W));
  sh.dimV(T(0, cy + 0.75)[1], T(0, cy)[1], T(B.L, 0)[0], T(B.L, 0)[0], T(B.L, 0)[0] + 30, f(0.75));
  sh.dimH(T(tr.L / 2 - 0.35, 0)[0], T(tr.L / 2 + 0.35, 0)[0], T(0, B.W)[1], T(0, B.W)[1], T(0, B.W)[1] - 15, f(0.7));
  sh.leader(T(cx + B.pitch + 0.11, cy + B.pitch + 0.11), [T(B.L, 0)[0] + 40, T(0, B.W)[1] - 50], `19X Ø${f(B.hole)} ▼${f(B.holeDepth)}\n⌵ Ø${f(B.csk)} X 82°`, 'start');
  sh.leader(T(cx + B.pitch / 2, cy - g.length / 2 + 0.1), [T(B.L, 0)[0] + 40, T(0, 0)[1] + 55], `4X GRID GROOVE\n${f(g.width)} WIDE X ${f(g.depth)} DEEP`, 'start');
  sh.text([T(cx, 0)[0], 400], 'TOP VIEW', { size: 11 });
  // front view
  const F = view(80, 545, k);
  sh.poly([F(0, 0), F(B.L, 0), F(B.L, tr.H), F(B.L - tr.L, tr.H), F(B.L - tr.L, B.H), F(tr.L, B.H), F(tr.L, tr.H), F(0, tr.H)]);
  for (const [x, z] of holes.map(([x]) => [x, x < tr.L || x > B.L - tr.L ? tr.H : B.H])) {
    sh.line(F(x - B.hole / 2, z), F(x - B.hole / 2, z - B.holeDepth), 'hid'); sh.line(F(x + B.hole / 2, z), F(x + B.hole / 2, z - B.holeDepth), 'hid');
  }
  sh.dimV(F(0, tr.H)[1], F(0, 0)[1], F(0, 0)[0], F(0, 0)[0], F(0, 0)[0] - 40, f(tr.H));
  sh.dimV(F(0, B.H)[1], F(0, 0)[1], F(B.L, 0)[0], F(B.L, 0)[0], F(B.L, 0)[0] + 35, f(B.H));
  sh.text([F(cx, 0)[0], 590], 'FRONT VIEW', { size: 11 });
  // right view
  const Rv = view(800, 545, k);
  sh.poly([Rv(0, 0), Rv(B.W, 0), Rv(B.W, B.H), Rv(0, B.H)]); sh.line(Rv(0, tr.H), Rv(B.W, tr.H));
  sh.text([Rv(cy, 0)[0], 590], 'RIGHT VIEW', { size: 11 });
  // iso
  const P = iso(745, 225, 40);
  const prof = [[0, 0], [B.L, 0], [B.L, tr.H], [B.L - tr.L, tr.H], [B.L - tr.L, B.H], [tr.L, B.H], [tr.L, tr.H], [0, tr.H]];
  drawIso(sh, P, extrudeY(prof, 0, B.W), (fc) => {
    if (!(fc.n[2] > 0 && Math.abs(fc.n[0]) < 1e-9 && Math.abs(fc.n[1]) < 1e-9)) return;
    const z = fc.pts[0][2], xs = fc.pts.map((q) => q[0]), x0 = Math.min(...xs), x1 = Math.max(...xs);
    for (const [hx, hy] of holes) if (hx > x0 && hx < x1) isoCircle(sh, P, [hx, hy, z], B.csk / 2);
    if (z === B.H) for (const s of [-0.5, 0.5]) {
      sh.line(P([cx + s * B.pitch, cy - g.length / 2, z]), P([cx + s * B.pitch, cy + g.length / 2, z]), 'thin');
      sh.line(P([cx - g.length / 2, cy + s * B.pitch, z]), P([cx + g.length / 2, cy + s * B.pitch, z]), 'thin');
    }
  });
  sh.text([900, 375], 'SCALE 1:2', { size: 11 });
  sh.text([80, 660], 'NOTES:\n1. HOLD ALL 19 HOLES TO THE SAME SIZE SO ANY PEG FITS ANY HOLE.\n2. MILL ALL CHAMFERS WITH A CHAMFER TOOL.', { size: 11, anchor: 'start' });
  sh.frame({ title: 'TIC-TAC-TOE BOARD', partNo: 'TTT-01', qty: '1', material: '6061-T6 ALUMINUM', scale: '17/20' });
  await save(sh, 'dwg-ttt-board.png');
}

// ───────────────────────────── 6. tic-tac-toe peg ─────────────────────────────
async function tttPeg() {
  const sh = new Sheet(), p = TTT.peg, k = 300, R = p.d / 2, r = p.pin / 2;
  const V = view(260, 560, k); // axis vertical: x = radius, y = height
  const pts = [[-r + p.pinChamfer, 0], [r - p.pinChamfer, 0], [r, p.pinChamfer], [r, p.pinL], [R, p.pinL], [R, p.pinL + p.body - p.chamfer], [R - p.chamfer, p.pinL + p.body], [-R + p.chamfer, p.pinL + p.body], [-R, p.pinL + p.body - p.chamfer], [-R, p.pinL], [-r, p.pinL], [-r, p.pinChamfer]];
  sh.poly(pts.map(([x, y]) => V(x, y)));
  sh.line(V(-R, p.pinL + p.body - p.chamfer), V(R, p.pinL + p.body - p.chamfer), 'thin'); sh.line(V(-r, p.pinChamfer), V(r, p.pinChamfer), 'thin');
  sh.centerV(V(0, 0)[0], V(0, -0.1)[1], V(0, p.pinL + p.body + 0.1)[1]);
  const top = p.pinL + p.body;
  sh.dimV(V(0, top)[1], V(0, 0)[1], V(-R, top)[0], V(-r, 0)[0], V(-R, 0)[0] - 60, f(top));
  sh.dimV(V(0, p.pinL)[1], V(0, 0)[1], V(r, p.pinL)[0], V(r, 0)[0], V(R, 0)[0] + 50, f(p.pinL));
  sh.dimH(V(-R, 0)[0], V(R, 0)[0], V(-R, top)[1], V(R, top)[1], V(0, top)[1] - 40, `Ø${f(p.d)}`);
  sh.dimH(V(-r, 0)[0], V(r, 0)[0], V(-r, 0)[1], V(r, 0)[1], V(0, 0)[1] + 40, `Ø${f(p.pin)}`);
  sh.leader(V(R - p.chamfer / 2, top - p.chamfer / 2), [V(R, 0)[0] + 60, V(0, top)[1] - 10], `${f(p.chamfer)} X 45°`);
  sh.leader(V(r - p.pinChamfer / 2, p.pinChamfer / 2), [V(R, 0)[0] + 60, V(0, 0)[1] + 30], `${f(p.pinChamfer)} X 45° LEAD-IN`);
  sh.text([V(0, 0)[0], 640], 'FRONT VIEW', { size: 11 });
  const o = [720, 400];
  sh.circle(o, R * k); sh.circle(o, (R - p.chamfer) * k, 'thin'); sh.centerMark(o, R * k + 16);
  sh.text([o[0], o[1] + R * k + 36], 'TOP VIEW', { size: 11 });
  sh.text([560, 600], 'NOTES:\n1. MAKE 5 IN C360 BRASS AND 5 IN 6061-T6 ALUMINUM.\n2. PIN IS A LOOSE SLIDING FIT IN THE Ø.191 BOARD HOLES\n    (.011 DIAMETRAL CLEARANCE).\n3. SHOULDER FACE MUST BE SQUARE TO THE PIN.', { size: 11, anchor: 'start' });
  sh.frame({ title: 'TIC-TAC-TOE PEG', partNo: 'TTT-02', qty: '10', material: 'C360 BRASS / 6061-T6', scale: '3:1' });
  await save(sh, 'dwg-ttt-peg.png');
}

await penBarrel();
await penTipCap();
await boxBase();
await boxLid();
await tttBoard();
await tttPeg();
