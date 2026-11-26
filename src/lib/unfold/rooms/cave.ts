// Cave — the personal archive, a warm, dim den:
//   left wall  – the owner's photos as polaroids pegged to two strings, a warm lamp glow
//   right wall – a framed print of Virgil Abloh, and a cork board of recently watched films
//   floor      – dark warm planks and a rug
//   pop-ups    – a record player on a low cabinet, a floor lamp, and a cardboard box marked
//                ARCHIVE that leads to the separate archive site
// Coordinates follow the conventions in ../rooms.ts.

import type { Pt, Sketch } from "../sketch";
import { isoLayers, WHITE, type V3 } from "../iso";
import { tint } from "../style";
import type { Room } from "../rooms";
import { caveImage } from "../images";
import { CAVE_FILMS, CAVE_PHOTOS } from "../caveData";

const C = {
  wall: "#efe2d4",
  floor: "#dcc3a3",
  rug: "#d9d0f3",
  cork: "#e9cfa6",
  frame: "#c9a27a",
  mat: "#fbf6ec",
  paper: "#fffdf6",
  string: "#b98c5f",
  peg: "#e8cfae",
  wood: "#d8b48c",
  record: "#3e3b4f",
  label: "#f6b7b0",
  box: "#e6c79c",
  shade: "#fbe6a4",
  glow: "#ffe3a8",
};

const F = (a: number, b: number): Pt => [a, 1 - b]; // floor coords → canvas

/** Rotate point q around c by angle a. */
const rot = ([x, y]: Pt, [cx, cy]: Pt, a: number): Pt => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];

/** A polaroid hanging from a peg at (px, py), tilted by a, with a photo (if it loaded). */
function polaroid(s: Sketch, px: number, py: number, a: number, file: string) {
  const w = 0.1;
  const h = 0.122;
  const c: Pt = [px, py];
  const R = (x: number, y: number) => rot([px + x, py + y], c, a);
  const card = [R(-w / 2, 0.006), R(w / 2, 0.006), R(w / 2, 0.006 + h), R(-w / 2, 0.006 + h)];
  s.sticker(card, 3, 0.18, tint(C.paper));
  s.stroke(card, { closed: true, w: 1.6 });
  const m = 0.008;
  const tl = R(-w / 2 + m, 0.006 + m);
  const tr = R(w / 2 - m, 0.006 + m);
  const bl = R(-w / 2 + m, 0.006 + m + 0.088);
  const img = caveImage(file);
  if (img) s.image(img, tl, tr, bl, (w - 2 * m) / 0.088);
  else s.fill([tl, tr, R(w / 2 - m, 0.006 + m + 0.088), bl], tint("#d6dbe8"), { alpha: 1, jitter: 0.2 });
  s.stroke([tl, tr, R(w / 2 - m, 0.006 + m + 0.088), bl], { closed: true, w: 1 });
  // wooden peg
  const peg = [R(-0.007, -0.016), R(0.007, -0.016), R(0.007, 0.018), R(-0.007, 0.018)];
  s.fill(peg, tint(C.peg), { alpha: 1, jitter: 0 });
  s.stroke(peg, { closed: true, w: 1.3 });
  return card;
}

/** A sagging string from x0 to x1 at height y; returns the y of the string at x. */
function string(s: Sketch, x0: number, x1: number, y: number, sag: number) {
  const at = (x: number) => y + sag * (1 - ((2 * (x - x0)) / (x1 - x0) - 1) ** 2);
  const pts: Pt[] = [];
  for (let i = 0; i <= 24; i++) {
    const x = x0 + ((x1 - x0) * i) / 24;
    pts.push([x, at(x)]);
  }
  s.stroke(pts, { w: 1.6, overshoot: 0 });
  s.circle(x0, y, 0.006, { w: 1.6 });
  s.circle(x1, y, 0.006, { w: 1.6 });
  return at;
}

export const caveRoom: Room = {
  id: "cave",
  name: "cave",
  mood: "the personal archive",
  res: 2048, // prints and posters are real images
  // the record on the turntable (see the cabinet pop-up below) turns while music plays
  spinner: { at: [0.115, 0.53, 0.224], r: 0.065 },
  left(s) {
    s.washAll(tint(C.wall), 1);
    // warm light spilling from the lamp in the corner
    s.glow(0.95, 0.45, 0.4, C.glow, 0.55);
    // nine photos on two strings
    const tilts = [-0.07, 0.05, -0.03, 0.06, -0.05, 0.04, -0.06, 0.03, -0.04];
    const rows = [
      { y: 0.13, xs: [0.14, 0.28, 0.42, 0.56, 0.7] },
      { y: 0.38, xs: [0.21, 0.35, 0.49, 0.63] },
    ];
    let i = 0;
    for (const row of rows) {
      const y = string(s, 0.07, 0.8, row.y, 0.035);
      for (const x of row.xs) {
        const p = CAVE_PHOTOS[i];
        if (p) polaroid(s, x, y(x), tilts[i], p.file);
        i++;
      }
    }
    s.mark("photos", s.rectPts(0.07, 0.1, 0.74, 0.47));
    s.text("things I've seen", 0.42, 0.66, 0.04, { weight: 700, rotate: -0.03 });
  },
  right(s) {
    s.washAll(tint(C.wall), 1);
    s.glow(0.05, 0.45, 0.3, C.glow, 0.45);

    // framed Virgil Abloh print, near the corner
    const vx = 0.07;
    const vy = 0.14;
    const vw = 0.3;
    const vh = 0.23;
    const frame = s.rectPts(vx, vy, vw, vh);
    s.sticker(frame, 5);
    s.fill(frame, tint(C.frame), { alpha: 1, jitter: 0.2 });
    s.fill(s.rectPts(vx + 0.015, vy + 0.015, vw - 0.03, vh - 0.03), tint(C.mat), { alpha: 1, jitter: 0.2 });
    s.box(vx, vy, vw, vh, null, { w: 2.6 });
    const portrait = caveImage("virgil");
    const ix = vx + 0.03;
    const iy = vy + 0.03;
    const iw = vw - 0.06;
    const ih = vh - 0.06;
    if (portrait) s.image(portrait, [ix, iy], [ix + iw, iy], [ix, iy + ih], iw / ih);
    s.rect(ix, iy, iw, ih, { w: 1.2 });
    s.text("“life is so short…”", vx + vw / 2, vy + vh + 0.04, 0.03, { weight: 700, rotate: -0.02 });
    s.text("— Virgil Abloh", vx + vw / 2 + 0.04, vy + vh + 0.075, 0.022, { weight: 500 });
    s.mark("virgil", s.rectPts(vx, vy, vw, vh + 0.09));

    // cork board of films watched lately
    const bx = 0.44;
    const by = 0.1;
    const bw = 0.48;
    const bh = 0.44;
    const board = s.rectPts(bx, by, bw, bh);
    s.sticker(board, 5);
    s.fill(board, tint(C.cork), { alpha: 1, jitter: 0.3 });
    for (let k = 0; k < 120; k++) s.circle(bx + s.r() * bw, by + s.r() * bh, 0.0018, { w: 1, alpha: 0.35 });
    s.box(bx, by, bw, bh, tint(C.frame), { w: 2.4 });
    s.fill(s.rectPts(bx + 0.012, by + 0.012, bw - 0.024, bh - 0.024), tint(C.cork), { alpha: 1, jitter: 0.2 });
    s.rect(bx + 0.012, by + 0.012, bw - 0.024, bh - 0.024, { w: 1.2 });
    const pw = 0.085;
    const ph = 0.127;
    const slots: [number, number][] = [];
    for (let c = 0; c < 4; c++) slots.push([bx + 0.035 + c * 0.108, by + 0.04]);
    for (let c = 0; c < 3; c++) slots.push([bx + 0.09 + c * 0.108, by + 0.04 + ph + 0.06]);
    CAVE_FILMS.forEach((f, j) => {
      const [x, y] = slots[j];
      const a = ((j * 37) % 7 - 3) * 0.012;
      const c: Pt = [x + pw / 2, y];
      const R = (dx: number, dy: number) => rot([x + dx, y + dy], c, a);
      const corners = [R(0, 0), R(pw, 0), R(pw, ph), R(0, ph)];
      s.sticker(corners, 2, 0.16, "#fff");
      const img = caveImage(f.file);
      if (img) s.image(img, corners[0], corners[1], corners[3], pw / ph);
      else s.fill(corners, tint("#d9d0f3"), { alpha: 1, jitter: 0.2 });
      s.stroke(corners, { closed: true, w: 1.4 });
      // push pin
      s.blob(...R(pw / 2, 0.008), 0.007, 0.007, tint(C.label), { w: 1.4 });
    });
    s.text("lately watched", bx + bw / 2, by + bh + 0.045, 0.034, { weight: 700, rotate: 0.02 });
    s.mark("films", s.rectPts(bx, by, bw, bh + 0.06));
  },
  floor(s) {
    s.washAll(tint(C.floor), 1);
    for (let i = 1; i < 9; i++) s.line(i / 9, 0, i / 9, 1, { w: 1.1, alpha: 0.35 });
    // a rug in the middle
    const rug = [F(0.28, 0.3), F(0.78, 0.3), F(0.78, 0.75), F(0.28, 0.75)];
    s.fill(rug, tint(C.rug), { alpha: 1, jitter: 0.4 });
    s.stroke(rug, { closed: true, w: 2 });
    const inner = [F(0.32, 0.34), F(0.74, 0.34), F(0.74, 0.71), F(0.32, 0.71)];
    s.stroke(inner, { closed: true, w: 1.2, alpha: 0.6 });
    // warm pool of light by the lamp
    s.glow(...F(0.12, 0.12), 0.3, C.glow, 0.5);
    // shadows under the cabinet and the box
    s.shadow([F(0.03, 0.4), F(0.2, 0.4), F(0.2, 0.72), F(0.03, 0.72)], 0.18, 14);
    s.shadow([F(0.52, 0.04), F(0.76, 0.04), F(0.76, 0.24), F(0.52, 0.24)], 0.18, 14);
  },
  popups: isoLayers([
    // floor lamp in the corner, record player on a low cabinet against the left wall
    (iso) => {
      iso.disc(0.12, 0.12, 0, 0.04, tint(C.wood), { w: 1.4 });
      iso.line([0.12, 0.12, 0], [0.12, 0.12, 0.55], { w: 2 });
      iso.cyl(0.12, 0.12, 0.5, 0.08, 0.1, WHITE, { color: C.shade, r2: 0.045 });

      iso.box(0.03, 0.4, 0, 0.17, 0.32, 0.2, WHITE, { color: C.wood });
      for (const y of [0.5, 0.62]) iso.line([0.2, y, 0.03], [0.2, y, 0.17], { w: 1.2, alpha: 0.7 });
      const T = 0.2;
      iso.box(0.05, 0.43, T, 0.13, 0.22, 0.02, WHITE, { color: "#efe9df" }); // turntable plinth
      iso.disc(0.115, 0.53, T + 0.022, 0.065, tint(C.record), { w: 1.6 });
      iso.disc(0.115, 0.53, T + 0.023, 0.022, tint(C.label), { w: 1.2 });
      iso.path(
        [
          [0.16, 0.62, T + 0.03],
          [0.155, 0.56, T + 0.03],
          [0.13, 0.55, T + 0.03],
        ] as V3[],
        { w: 1.8 },
      );
      iso.mark("music", [
        [0.05, 0.43, T],
        [0.18, 0.65, T],
        [0.05, 0.65, T + 0.04],
        [0.18, 0.43, T + 0.04],
      ]);
    },
    // the ARCHIVE box by the right wall, a few papers sticking out
    (iso) => {
      const X = 0.53;
      const Y = 0.05;
      const W = 0.22;
      const D = 0.18;
      const H = 0.15;
      for (const [dx, h] of [
        [0.04, 0.05],
        [0.09, 0.07],
        [0.15, 0.04],
      ] as const)
        iso.box(X + dx, Y + 0.05, H - 0.02, 0.05, 0.008, h + 0.02, WHITE, { color: C.paper });
      iso.box(X, Y, 0, W, D, H, WHITE, { color: C.box });
      // packing tape across the top, and a strip down the front
      iso.face(
        [
          [X + W / 2 - 0.018, Y, H],
          [X + W / 2 + 0.018, Y, H],
          [X + W / 2 + 0.018, Y + D, H],
          [X + W / 2 - 0.018, Y + D, H],
        ],
        tint("#f3e2bf"),
        { w: 1.1 },
      );
      iso.at([X + W / 2, Y + D, H * 0.45], (s, [x, y], u) => s.text("ARCHIVE", x, y, 0.03 * u, { weight: 700 }));
      iso.mark("archive", [
        [X, Y, 0],
        [X + W, Y + D, 0],
        [X, Y + D, H + 0.07],
        [X + W, Y, H + 0.07],
      ]);
    },
  ]).map((p) => ({ ...p, res: 2048 })),
};
