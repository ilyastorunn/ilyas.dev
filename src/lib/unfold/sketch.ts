// Adapted from unfold by Dakshi (https://github.com/Dksie09/unfold), MIT License — see ./LICENSE.
// A tiny hand-drawn renderer for 2D canvases.
//
// Every surface is drawn on three canvases:
//   ink  – pen line art (only alpha is used)
//   wash – watercolour fills on white, multiplied in as the room "colours in"
//   mask – which pixels are paper at all (used for pop-up cut-outs)
// bake() packs them into one RGBA texture: rgb = wash, a = mask ? 0.5 + ink/2 : 0.

import * as THREE from "three";
import type { Cutout } from "./cutout";

export type Pt = [number, number];
type RNG = () => number;

function rng(seed: number): RNG {
  let a = seed >>> 0 || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type StrokeOpts = { w?: number; closed?: boolean; rough?: number; alpha?: number; overshoot?: number; mask?: boolean };

export class Sketch {
  readonly S: number;
  readonly r: RNG;
  private ink: CanvasRenderingContext2D;
  private wash: CanvasRenderingContext2D;
  private mask: CanvasRenderingContext2D;
  private k: number;
  fontFamily = "cursive";
  /** Named clickable areas (bounding boxes in 0..1 canvas coords), e.g. where a journal lives. */
  readonly marks: Record<string, [number, number, number, number]> = {};

  constructor(ink: CanvasRenderingContext2D, wash: CanvasRenderingContext2D, mask: CanvasRenderingContext2D, size: number, seed: number) {
    this.ink = ink;
    this.wash = wash;
    this.mask = mask;
    this.S = size;
    this.r = rng(seed);
    this.k = size / 768;
  }

  private px([x, y]: Pt): Pt {
    return [x * this.S, y * this.S];
  }

  /** Wobbly polyline through normalised points. */
  stroke(points: Pt[], o: StrokeOpts = {}) {
    const { w = 2.6, closed = false, rough = 1, alpha = 1, overshoot = 0.02, mask = false } = o;
    const pts = points.map((p) => this.px(p));
    if (closed) pts.push(pts[0]);
    const c = this.ink;
    const ph1 = this.r() * 100;
    const ph2 = this.r() * 100;
    const amp = 1.5 * rough * this.k;
    c.save();
    c.globalAlpha = alpha;
    c.strokeStyle = "#000";
    c.lineCap = "round";
    c.lineJoin = "round";
    const path: Pt[] = [];
    let dist = 0;
    for (let s = 0; s < pts.length - 1; s++) {
      const [x1, y1] = pts[s];
      const [x2, y2] = pts[s + 1];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const n = Math.max(2, Math.ceil(len / (7 * this.k)));
      const t0 = s === 0 && !closed ? -overshoot : 0;
      const t1 = s === pts.length - 2 && !closed ? 1 + overshoot : 1;
      for (let j = 0; j <= n; j++) {
        const t = t0 + ((t1 - t0) * j) / n;
        const d = dist + t * len;
        const off = amp * (0.6 * Math.sin(ph1 + d * 0.045 / this.k) + 0.4 * Math.sin(ph2 + d * 0.13 / this.k));
        path.push([x1 + dx * t + nx * off, y1 + dy * t + ny * off]);
      }
      dist += len;
    }
    const lw = w * this.k * (0.9 + this.r() * 0.25);
    const trace = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      path.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    };
    trace(c);
    c.lineWidth = lw;
    c.stroke();
    c.restore();
    if (mask) {
      const m = this.mask;
      m.save();
      m.strokeStyle = "#fff";
      m.lineCap = "round";
      m.lineJoin = "round";
      m.lineWidth = lw * 2.5;
      trace(m);
      m.stroke();
      m.restore();
    }
  }

  line(x1: number, y1: number, x2: number, y2: number, o: StrokeOpts = {}) {
    this.stroke(
      [
        [x1, y1],
        [x2, y2],
      ],
      o,
    );
  }

  rectPts(x: number, y: number, w: number, h: number): Pt[] {
    return [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ];
  }

  ellipsePts(cx: number, cy: number, rx: number, ry: number, from = 0, to = Math.PI * 2, n = 40): Pt[] {
    const out: Pt[] = [];
    for (let i = 0; i <= n; i++) {
      const a = from + ((to - from) * i) / n;
      out.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
    }
    return out;
  }

  rect(x: number, y: number, w: number, h: number, o: StrokeOpts = {}) {
    this.stroke(this.rectPts(x, y, w, h), { ...o, closed: true });
  }

  ellipse(cx: number, cy: number, rx: number, ry: number, o: StrokeOpts = {}) {
    // hand-drawn circles overlap a little where they close
    const start = this.r() * Math.PI * 2;
    this.stroke(this.ellipsePts(cx, cy, rx, ry, start, start + Math.PI * 2.08), { ...o, overshoot: 0 });
  }

  circle(cx: number, cy: number, rad: number, o: StrokeOpts = {}) {
    this.ellipse(cx, cy, rad, rad, o);
  }

  /** Watercolour fill (multiplied over white), slightly mis-registered from the ink. */
  fill(points: Pt[], color: string, opts: { alpha?: number; mask?: boolean; jitter?: number } = {}) {
    const { alpha = 0.9, mask = false, jitter = 1 } = opts;
    const ox = (this.r() - 0.5) * 7 * this.k * jitter;
    const oy = (this.r() - 0.5) * 7 * this.k * jitter;
    const c = this.wash;
    c.save();
    c.globalCompositeOperation = "multiply";
    c.globalAlpha = alpha;
    c.fillStyle = color;
    c.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) c.lineTo(x + ox, y + oy);
      else c.moveTo(x + ox, y + oy);
    });
    c.closePath();
    c.fill();
    // pooled pigment at the edge
    c.globalAlpha = alpha * 0.35;
    c.strokeStyle = color;
    c.lineWidth = 5 * this.k;
    c.stroke();
    c.restore();
    if (mask) this.maskFill(points);
  }

  maskFill(points: Pt[]) {
    const c = this.mask;
    c.save();
    c.fillStyle = "#fff";
    c.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) c.lineTo(x, y);
      else c.moveTo(x, y);
    });
    c.closePath();
    c.fill();
    c.lineWidth = 4 * this.k;
    c.strokeStyle = "#fff";
    c.stroke();
    c.restore();
  }

  /**
   * Opaque paper: covers whatever ink and wash were drawn underneath (for solid objects
   * drawn back to front), and marks the area as part of the cut-out.
   */
  solid(points: Pt[], color = "#ffffff") {
    const trace = (c: CanvasRenderingContext2D) => {
      c.beginPath();
      points.forEach((p, i) => {
        const [x, y] = this.px(p);
        if (i) c.lineTo(x, y);
        else c.moveTo(x, y);
      });
      c.closePath();
    };
    const ink = this.ink;
    ink.save();
    ink.globalCompositeOperation = "destination-out";
    ink.fillStyle = "#000";
    trace(ink);
    ink.fill();
    ink.restore();
    const w = this.wash;
    w.save();
    w.globalCompositeOperation = "source-over";
    w.fillStyle = color;
    trace(w);
    w.fill();
    w.restore();
    this.maskFill(points);
  }

  maskAll() {
    this.mask.fillStyle = "#fff";
    this.mask.fillRect(0, 0, this.S, this.S);
  }

  /** Fill + outline in one go. mask=true makes it part of a pop-up's silhouette. */
  shape(points: Pt[], color: string | null, o: StrokeOpts & { mask?: boolean; alpha?: number } = {}) {
    if (color) this.fill(points, color, { mask: o.mask, alpha: o.alpha ?? 0.9 });
    else if (o.mask) this.maskFill(points);
    this.stroke(points, { ...o, alpha: 1, closed: true });
  }

  box(x: number, y: number, w: number, h: number, color: string | null, o: StrokeOpts & { mask?: boolean } = {}) {
    this.shape(this.rectPts(x, y, w, h), color, o);
  }

  blob(cx: number, cy: number, rx: number, ry: number, color: string | null, o: StrokeOpts & { mask?: boolean } = {}) {
    if (color) this.fill(this.ellipsePts(cx, cy, rx, ry), color, { mask: o.mask });
    else if (o.mask) this.maskFill(this.ellipsePts(cx, cy, rx, ry));
    this.ellipse(cx, cy, rx, ry, o);
  }

  /** Parallel pen hatching clipped to a polygon. */
  hatch(points: Pt[], spacing = 0.02, angle = -0.6, w = 1.4, alpha = 0.55) {
    const c = this.ink;
    c.save();
    c.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) c.lineTo(x, y);
      else c.moveTo(x, y);
    });
    c.closePath();
    c.clip();
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const minX = Math.min(...xs) - 0.3;
    const maxX = Math.max(...xs) + 0.3;
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const dx = Math.cos(angle) * (maxY - minY + 0.6);
    const dy = Math.sin(angle) * (maxY - minY + 0.6);
    for (let x = minX; x < maxX; x += spacing) {
      this.stroke(
        [
          [x, maxY + 0.3],
          [x + dx, maxY + 0.3 + dy],
        ],
        { w, alpha, rough: 0.7 },
      );
    }
    c.restore();
  }

  /** Dense back-and-forth scribble, like a pen colouring something in. */
  scribble(points: Pt[], density = 0.012, w = 1.6) {
    const c = this.ink;
    c.save();
    c.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) c.lineTo(x, y);
      else c.moveTo(x, y);
    });
    c.closePath();
    c.clip();
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const minX = Math.min(...xs) - 0.02;
    const maxX = Math.max(...xs) + 0.02;
    const minY = Math.min(...ys) - 0.02;
    const maxY = Math.max(...ys) + 0.02;
    const zig: Pt[] = [];
    let flip = false;
    for (let y = minY; y < maxY; y += density) {
      zig.push(flip ? [maxX, y + density * 0.7] : [minX, y]);
      flip = !flip;
    }
    this.stroke(zig, { w, rough: 1.4, alpha: 0.85 });
    c.restore();
  }

  text(str: string, x: number, y: number, size: number, o: { align?: CanvasTextAlign; weight?: number; rotate?: number } = {}) {
    const c = this.ink;
    c.save();
    c.fillStyle = "#000";
    c.textAlign = o.align ?? "center";
    c.textBaseline = "middle";
    c.font = `${o.weight ?? 700} ${size * this.S}px ${this.fontFamily}`;
    const [px, py] = this.px([x, y]);
    c.translate(px, py);
    c.rotate(o.rotate ?? 0);
    c.fillText(str, 0, 0);
    c.restore();
  }

  /**
   * A paper cut-out stuck onto the surface: white shape with a small white margin and a
   * soft drop shadow (the shadow only shows once the room is coloured in).
   */
  sticker(points: Pt[], halo = 7, shadow = 0.22, color = "#fff") {
    const c = this.wash;
    c.save();
    c.globalCompositeOperation = "source-over";
    c.shadowColor = `rgba(70, 60, 110, ${shadow})`;
    c.shadowBlur = 14 * this.k;
    c.shadowOffsetX = 3 * this.k;
    c.shadowOffsetY = 6 * this.k;
    c.strokeStyle = "#fff";
    c.lineJoin = "round";
    c.lineWidth = halo * 2 * this.k;
    c.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) c.lineTo(x, y);
      else c.moveTo(x, y);
    });
    c.closePath();
    c.stroke();
    c.shadowColor = "transparent";
    c.fillStyle = color;
    c.fill();
    c.restore();
    // a sticker sits on top: hide any pen lines drawn underneath it
    const ink = this.ink;
    ink.save();
    ink.globalCompositeOperation = "destination-out";
    ink.lineJoin = "round";
    ink.lineWidth = halo * 2 * this.k;
    ink.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) ink.lineTo(x, y);
      else ink.moveTo(x, y);
    });
    ink.closePath();
    ink.fill();
    ink.stroke();
    ink.restore();
  }

  /** Soft contact shadow, e.g. under furniture on the floor. */
  shadow(points: Pt[], alpha = 0.22, blur = 18) {
    const c = this.wash;
    c.save();
    c.globalCompositeOperation = "multiply";
    c.filter = `blur(${blur * this.k}px)`;
    c.fillStyle = `rgba(80, 70, 120, ${alpha})`;
    c.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) c.lineTo(x, y);
      else c.moveTo(x, y);
    });
    c.closePath();
    c.fill();
    c.restore();
  }

  /** Soft light (lantern, bulbs, moon) painted onto the wash; only visible in the coloured version. */
  glow(cx: number, cy: number, r: number, color: string, alpha = 0.6) {
    const c = this.wash;
    const [x, y] = this.px([cx, cy]);
    const R = r * this.S;
    const g = c.createRadialGradient(x, y, 0, x, y, R);
    const n = parseInt(color.slice(1), 16);
    const rgb = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    g.addColorStop(0, `rgba(${rgb}, ${alpha})`);
    g.addColorStop(0.45, `rgba(${rgb}, ${alpha * 0.45})`);
    g.addColorStop(1, `rgba(${rgb}, 0)`);
    c.save();
    c.globalCompositeOperation = "source-over";
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, R, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  /**
   * Paint a real image onto the wash, mapped onto the parallelogram p0 (top-left), p1
   * (top-right), p3 (bottom-left). The image is cropped to fill it ("cover") given the surface's
   * true width/height ratio. Like every wash colour it only shows once the room colours in.
   * Added for ily.dev (not in unfold).
   */
  image(img: CanvasImageSource & { width: number; height: number }, p0: Pt, p1: Pt, p3: Pt, aspect: number, o: { mask?: boolean; radius?: number } = {}) {
    const [x0, y0] = this.px(p0);
    const [x1, y1] = this.px(p1);
    const [x3, y3] = this.px(p3);
    // crop the source to the surface's aspect ratio
    let sw = img.width;
    let sh = img.height;
    if (sw / sh > aspect) sw = sh * aspect;
    else sh = sw / aspect;
    const sx = (img.width - sw) / 2;
    const sy = 0;
    const c = this.wash;
    c.save();
    c.globalCompositeOperation = "source-over";
    c.setTransform((x1 - x0) / sw, (y1 - y0) / sw, (x3 - x0) / sh, (y3 - y0) / sh, x0, y0);
    c.imageSmoothingQuality = "high";
    if (o.radius) {
      // rounded corners (radius as a fraction of the shorter side), e.g. an app icon
      c.beginPath();
      c.roundRect(0, 0, sw, sh, o.radius * Math.min(sw, sh));
      c.clip();
    }
    c.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    c.restore();
    const quad: Pt[] = [p0, p1, [p1[0] + p3[0] - p0[0], p1[1] + p3[1] - p0[1]], p3];
    // nothing drawn in ink underneath should show through the picture
    const ink = this.ink;
    ink.save();
    ink.globalCompositeOperation = "destination-out";
    ink.beginPath();
    quad.forEach((p, i) => {
      const [x, y] = this.px(p);
      if (i) ink.lineTo(x, y);
      else ink.moveTo(x, y);
    });
    ink.closePath();
    ink.fill();
    ink.restore();
    if (o.mask) this.maskFill(quad);
  }

  /**
   * Stick an ink illustration (see ./cutout.ts) onto the sheet as a paper cut-out, mapped onto
   * the parallelogram p0 (top-left), p1 (top-right), p3 (bottom-left). Its lines go to the ink
   * layer and its colours to the wash, so it behaves like everything drawn by hand.
   * Added for ily.dev (not in unfold).
   */
  cutout(c: Cutout, p0: Pt, p1: Pt, p3: Pt) {
    const [x0, y0] = this.px(p0);
    const [x1, y1] = this.px(p1);
    const [x3, y3] = this.px(p3);
    const w = c.wash.width;
    const h = c.wash.height;
    const put = (ctx: CanvasRenderingContext2D, layer: HTMLCanvasElement, op: GlobalCompositeOperation) => {
      ctx.save();
      ctx.globalCompositeOperation = op;
      ctx.setTransform((x1 - x0) / w, (y1 - y0) / w, (x3 - x0) / h, (y3 - y0) / h, x0, y0);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(layer, 0, 0);
      ctx.restore();
    };
    put(this.wash, c.wash, "multiply");
    put(this.ink, c.ink, "source-over");
    put(this.mask, c.mask, "source-over");
  }

  /** Remember the bounding box of these points under a name, so the 3D scene can make it clickable. */
  mark(name: string, points: Pt[], pad = 0.01) {
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    this.marks[name] = [Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) + pad, Math.max(...ys) + pad];
  }

  /** Five-point star, hand drawn. */
  star(cx: number, cy: number, r: number, o: StrokeOpts = {}) {
    const pts: Pt[] = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? r * 0.45 : r;
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    this.stroke(pts, { w: 2, ...o, closed: true });
  }

  /** Watercolour wash over the whole sheet. */
  washAll(color: string, alpha = 0.85) {
    this.fill(this.rectPts(-0.02, -0.02, 1.04, 1.04), color, { alpha, jitter: 0 });
  }
}

// ---------------------------------------------------------------------------

type Scratch = { ink: HTMLCanvasElement; wash: HTMLCanvasElement; mask: HTMLCanvasElement; tmp: HTMLCanvasElement; tmp2: HTMLCanvasElement };
const scratch = new Map<number, Scratch>();

function getScratch(size: number): Scratch {
  let s = scratch.get(size);
  if (!s) {
    const mk = () => {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      return c;
    };
    s = { ink: mk(), wash: mk(), mask: mk(), tmp: mk(), tmp2: mk() };
    scratch.set(size, s);
  }
  return s;
}

function dilate(src: HTMLCanvasElement, dst: HTMLCanvasElement, r: number) {
  const c = dst.getContext("2d")!;
  c.clearRect(0, 0, dst.width, dst.height);
  for (const rr of [r * 0.5, r]) for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    c.drawImage(src, Math.cos(a) * rr, Math.sin(a) * rr);
  }
  c.drawImage(src, 0, 0);
}

/** Grow the pop-up silhouette into a white paper margin and shade its cut edge. */
function cutOut(sc: Scratch, size: number, r: number) {
  dilate(sc.mask, sc.tmp, r); // outer edge of the paper
  dilate(sc.mask, sc.tmp2, Math.max(1, r - 3 * (size / 768))); // just inside it
  const rim = sc.tmp2.getContext("2d")!;
  // rim = outer − inner, tinted
  rim.globalCompositeOperation = "xor";
  rim.drawImage(sc.tmp, 0, 0);
  rim.globalCompositeOperation = "source-in";
  rim.fillStyle = "rgba(130, 122, 170, 0.3)";
  rim.fillRect(0, 0, size, size);
  rim.globalCompositeOperation = "source-over";
  const w = sc.wash.getContext("2d")!;
  w.save();
  w.globalCompositeOperation = "multiply";
  w.drawImage(sc.tmp2, 0, 0);
  w.restore();
  const m = sc.mask.getContext("2d")!;
  m.clearRect(0, 0, size, size);
  m.drawImage(sc.tmp, 0, 0);
}

/**
 * Draw a surface and pack it into a single texture.
 * full=true marks every pixel as paper (walls, floors); pop-ups leave it to their shapes.
 */
export function bake(size: number, seed: number, font: string, full: boolean, draw: (s: Sketch) => void, halo = 0): THREE.DataTexture {
  const sc = getScratch(size);
  const ink = sc.ink.getContext("2d", { willReadFrequently: true })!;
  const wash = sc.wash.getContext("2d", { willReadFrequently: true })!;
  const mask = sc.mask.getContext("2d", { willReadFrequently: true })!;
  ink.clearRect(0, 0, size, size);
  mask.clearRect(0, 0, size, size);
  wash.globalCompositeOperation = "source-over";
  wash.globalAlpha = 1;
  wash.fillStyle = "#fff";
  wash.fillRect(0, 0, size, size);

  const s = new Sketch(ink, wash, mask, size, seed);
  s.fontFamily = font;
  if (full) s.maskAll();
  draw(s);
  if (halo > 0) cutOut(sc, size, halo * (size / 768));

  const I = ink.getImageData(0, 0, size, size).data;
  const W = wash.getImageData(0, 0, size, size).data;
  const M = mask.getImageData(0, 0, size, size).data;
  const out = new Uint8Array(size * size * 4);
  // DataTextures are not flipped on upload, so flip rows here (canvas y-down → uv v-up).
  for (let y = 0; y < size; y++) {
    const src = y * size * 4;
    const dst = (size - 1 - y) * size * 4;
    for (let x = 0; x < size * 4; x += 4) {
      const i = src + x;
      const o = dst + x;
      out[o] = W[i];
      out[o + 1] = W[i + 1];
      out[o + 2] = W[i + 2];
      out[o + 3] = M[i + 3] > 127 ? 128 + (I[i + 3] >> 1) : 0;
    }
  }
  const tex = new THREE.DataTexture(out, size, size, THREE.RGBAFormat);
  tex.userData.marks = s.marks;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}
