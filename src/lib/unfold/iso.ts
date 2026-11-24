// Adapted from unfold by Dakshi (https://github.com/Dksie09/unfold), MIT License — see ./LICENSE.
// Isometric pop-up cards.
//
// A pop-up card stands upright, facing straight out of the room's corner. Seen from the
// camera (which looks along that same direction, pitched down by OPEN_PITCH), anything drawn
// on the card with this projection lines up exactly with the real 3D room, so flat cards read
// as solid furniture.
//
// Room coordinates: [xa, xb, z]
//   xa – distance from the LEFT wall (i.e. along the right wall)
//   xb – distance from the RIGHT wall (i.e. along the left wall)
//   z  – height
// The corner is [0, 0, 0]; the floor runs to 1 on both axes; the walls are 1 high.

import type { Pt, Sketch } from "./sketch";
import { shade, soften } from "./style";

export type V3 = [number, number, number];
type IsoPopUp = { size: number; at: [number, number]; draw: (s: Sketch) => void; halo: number };

const OPEN_PITCH = (32 * Math.PI) / 180; // must match the camera in Book.tsx
const SQ = Math.SQRT1_2;
const K = SQ * Math.tan(OPEN_PITCH);
const BASE = 0.996;

type Layout = { Sf: number; Xc: number; size: number };
type Fill = string | null;
type LineOpts = { w?: number; alpha?: number; rough?: number };

export const WHITE = "#ffffff";
export const SIDE_A = "#f1f0f8"; // faces turned to the right
export const SIDE_B = "#e6e4f2"; // faces turned to the left

export class Iso {
  readonly s: Sketch | null;
  private L: Layout;
  readonly rec: { X: number; z: number; S: number }[] = [];

  constructor(s: Sketch | null, layout: Layout = { Sf: 0, Xc: 0, size: 1 }) {
    this.s = s;
    this.L = layout;
  }

  /** Project a room point onto the card (normalised card coords, y down). */
  p([xa, xb, z]: V3): Pt {
    const X = SQ * (xa - xb);
    const S = xa + xb;
    if (!this.s) {
      this.rec.push({ X, z, S });
      return [0, 0];
    }
    const Y = z + K * (this.L.Sf - S);
    return [0.5 + (X - this.L.Xc) / this.L.size, BASE - Y / this.L.size];
  }

  /** A world length expressed in card units (for 2D details drawn at a projected point). */
  u(len: number) {
    return len / this.L.size;
  }

  /** Pen for furniture lines. */
  private lo(o: LineOpts) {
    // a lighter, looser hand: thinner line, more wobble, ends that run past the corners
    const s = this.s!;
    return { mask: true, rough: 1.15, overshoot: 0.05, ...o, w: (o.w ?? 2) * 0.82, alpha: (o.alpha ?? 1) * (0.72 + s.r() * 0.28) };
  }

  /** Nudge each vertex a touch so corners don't meet perfectly. */
  private jig(q: Pt[]): Pt[] {
    // curves (many points) keep their shape; only straight-edged outlines get loose corners
    if (!this.s || q.length > 8) return q;
    const s = this.s;
    const a = 0.0035;
    return q.map(([x, y]) => [x + (s.r() - 0.5) * 2 * a, y + (s.r() - 0.5) * 2 * a] as Pt);
  }

  /** Paper fill (part of the cut-out) without an outline. */
  fill(pts: V3[], fill: Fill = WHITE) {
    const q = pts.map((v) => this.p(v));
    if (!this.s) return;
    if (fill) this.s.solid(q, fill);
    else this.s.maskFill(q);
  }

  face(pts: V3[], fill: Fill, o: LineOpts = {}) {
    this.fill(pts, fill);
    this.path(pts, { ...o, closed: true });
  }

  line(a: V3, b: V3, o: LineOpts = {}) {
    const q = [this.p(a), this.p(b)];
    if (this.s) this.s.stroke(this.jig(q), this.lo(o));
  }

  path(pts: V3[], o: LineOpts & { closed?: boolean } = {}) {
    const q = pts.map((v) => this.p(v));
    if (!this.s) return;
    const { closed, ...rest } = o;
    const j = this.jig(q);
    // close the loop by hand, letting the end run past the start
    if (closed) this.s.stroke([...j, j[0]], { ...this.lo(rest), closed: false });
    else this.s.stroke(j, { ...this.lo(rest), closed });
  }

  /** Axis-aligned box: fills the three visible faces, then draws each edge once. */
  box(x: number, y: number, z: number, dx: number, dy: number, dz: number, top: Fill = WHITE, o: LineOpts & { sideA?: Fill; sideB?: Fill; color?: string } = {}) {
    const { color, ...rest } = o;
    // coloured version: the colour on top, a little darker on the sides
    if (color) {
      top = soften(color);
      rest.sideA = shade(top, 0.95);
      rest.sideB = shade(top, 0.89);
    }
    const { sideA = SIDE_A, sideB = SIDE_B, ...lo } = rest;
    const X = x + dx;
    const Y = y + dy;
    const Z = z + dz;
    this.fill([[x, Y, z], [X, Y, z], [X, Y, Z], [x, Y, Z]], sideB);
    this.fill([[X, y, z], [X, Y, z], [X, Y, Z], [X, y, Z]], sideA);
    this.fill([[x, y, Z], [X, y, Z], [X, Y, Z], [x, Y, Z]], top);
    // silhouette
    this.path([[x, y, Z], [X, y, Z], [X, y, z], [X, Y, z], [x, Y, z], [x, Y, Z]], { ...lo, closed: true });
    // the three edges meeting at the corner nearest the camera
    this.line([X, Y, Z], [x, Y, Z], lo);
    this.line([X, Y, Z], [X, y, Z], lo);
    this.line([X, Y, Z], [X, Y, z], lo);
  }

  ring(cx: number, cy: number, z: number, r: number, from = 0, to = Math.PI * 2, n = 28): V3[] {
    const out: V3[] = [];
    for (let i = 0; i <= n; i++) {
      const a = from + ((to - from) * i) / n;
      out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, z]);
    }
    return out;
  }

  /** Upright cylinder (or a cone when r2 differs). */
  cyl(cx: number, cy: number, z: number, r: number, h: number, fill: Fill = WHITE, o: LineOpts & { r2?: number; side?: Fill; color?: string } = {}) {
    const { color, ...rest } = o;
    if (color) {
      fill = soften(color);
      rest.side = shade(fill, 0.93);
    }
    const { r2 = r, side = SIDE_A, ...lo } = rest;
    // the visible half faces the camera: from -45° round through +45° to 135°
    const a0 = -Math.PI / 4;
    const a1 = (3 * Math.PI) / 4;
    const front = this.ring(cx, cy, z, r, a0, a1, 18);
    const backTop = this.ring(cx, cy, z + h, r2, a1, a0, 18);
    const topRing = this.ring(cx, cy, z + h, r2);
    this.fill([...front, ...backTop], side);
    this.fill(topRing, fill);
    this.path([...front, ...backTop], { ...lo, closed: true });
    this.path(this.ring(cx, cy, z + h, r2, a0, a1, 18), lo);
  }

  /** Flat disc lying on a horizontal plane. */
  disc(cx: number, cy: number, z: number, r: number, fill: Fill = WHITE, o: LineOpts = {}) {
    this.face(this.ring(cx, cy, z, r), fill, o);
  }

  /**
   * A real image on a flat room surface given by three corners (top-left, top-right,
   * bottom-left); aspect is the surface's true width/height. Added for ily.dev.
   */
  image(img: CanvasImageSource & { width: number; height: number }, tl: V3, tr: V3, bl: V3, aspect: number) {
    const a = this.p(tl);
    const b = this.p(tr);
    const c = this.p(bl);
    this.s?.image(img, a, b, c, aspect, { mask: true });
  }

  /**
   * A flat, upright paper figure (a "standee") standing at room point `base`: `width` × `height`
   * in room units, drawn head-on because the card faces the camera. `draw` gets a pen in the
   * figure's own coordinates — x across (0 = centre), y up from the base, both in units of
   * `height` — so a figure can be drawn once and placed anywhere. Returns its corners (for
   * mark()). Added for ily.dev.
   */
  standee(
    [xa, xb, z]: V3,
    width: number,
    height: number,
    draw?: (s: Sketch, p: (x: number, y: number) => Pt, k: number) => void,
  ): V3[] {
    // a sideways step on the card moves xa and xb in opposite directions (S stays constant)
    const t = width / 2 / (2 * SQ);
    const corners: V3[] = [
      [xa - t, xb + t, z + height],
      [xa + t, xb - t, z + height],
      [xa + t, xb - t, z],
      [xa - t, xb + t, z],
    ];
    corners.forEach((c) => this.p(c)); // reserve room on the card while it is being measured
    if (this.s && draw) {
      const [bx, by] = this.p([xa, xb, z]);
      const k = height / this.L.size; // one figure unit in card coordinates
      draw(this.s, (x, y) => [bx + x * k, by - y * k], k);
    }
    return corners;
  }

  /** Mark the projected area of these room points as clickable (see Sketch.mark). */
  mark(name: string, pts: V3[]) {
    const q = pts.map((v) => this.p(v));
    this.s?.mark(name, q);
  }

  /** Free 2D drawing anchored at a room point; fn gets the card point and a world→card scale. */
  at(v: V3, fn: (s: Sketch, p: Pt, u: number) => void) {
    const p = this.p(v);
    if (this.s) fn(this.s, p, 1 / this.L.size);
  }
}

/**
 * Turn one or more layers of furniture into pop-up cards. Each later layer stands a little in
 * front of the previous one, so draw things against the walls first and loose pieces after.
 */
export function isoLayers(layers: ((iso: Iso) => void)[], halo = 9): IsoPopUp[] {
  const out: IsoPopUp[] = [];
  let prevSf = -Infinity;
  for (const build of layers) {
    const m = new Iso(null);
    build(m);
    const maxS = Math.max(...m.rec.map((r) => r.S));
    const Sf = Math.max(maxS + 0.01, prevSf + 0.03);
    prevSf = Sf;
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = 0;
    for (const r of m.rec) {
      const Y = r.z + K * (Sf - r.S);
      minX = Math.min(minX, r.X);
      maxX = Math.max(maxX, r.X);
      maxY = Math.max(maxY, Y);
    }
    const pad = 0.06;
    const size = Math.max(maxX - minX + pad * 2, maxY + pad);
    const Xc = (minX + maxX) / 2;
    const layout = { Sf, Xc, size };
    out.push({
      size,
      at: [Sf / 2 + SQ * Xc, Sf / 2 - SQ * Xc],
      halo,
      draw: (s) => build(new Iso(s, layout)),
    });
  }
  return out;
}
