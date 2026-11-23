// About — a small living-room corner with İlyas and his cat:
//   left wall  – İlyas's portrait in a frame, with a handwritten "that's me"
//   right wall – a bookshelf and a pinned note about where it started
//   floor      – a round rug
//   pop-ups    – an armchair with the cat sitting on it, a plant and a floor lamp
// The portrait and the cat are the owner's photos, cut out on-device with macOS Vision and
// turned into blue-ink line art with a pastel wash (see docs/wiki/implementation.md).
// Coordinates follow the conventions in ../rooms.ts.

import type { Pt } from "../sketch";
import { isoLayers, WHITE } from "../iso";
import { tint } from "../style";
import type { Room } from "../rooms";
import { image } from "../images";
import { cutoutOf } from "../cutout";

const C = {
  wall: "#f6eef3",
  floor: "#eedcc6",
  rug: "#dbe8fb",
  frame: "#e8cfae",
  mat: "#eef1fb",
  shelf: "#e2ccab",
  books: ["#f6b7b0", "#cfe0f7", "#cfe8c4", "#fff3b5", "#d9d0f3", "#f3c8b0"],
  note: "#fff3b5",
  chair: "#d9d0f3",
  leaf: "#cfe8c4",
  pot: "#f3c8b0",
  shade: "#fbe6a4",
};

// true width/height of the two figures (cropped to the subject); keep in sync with the PNGs
const PORTRAIT_ASPECT = 849 / 1000;
const CAT_ASPECT = 530 / 1000;

const F = (a: number, b: number): Pt => [a, 1 - b]; // floor coords → canvas

export const aboutRoom: Room = {
  id: "about",
  name: "about",
  mood: "who I am",
  res: 2048, // the portrait is a real image
  left(s) {
    s.washAll(tint(C.wall), 1);
    // frame with a mat, the portrait inside
    const fx = 0.2;
    const fy = 0.1;
    const fw = 0.46;
    const fh = 0.5;
    const frame = s.rectPts(fx, fy, fw, fh);
    s.sticker(frame, 6);
    s.fill(frame, tint(C.frame), { alpha: 1, jitter: 0.2 });
    s.fill(s.rectPts(fx + 0.025, fy + 0.025, fw - 0.05, fh - 0.05), tint(C.mat), { alpha: 1, jitter: 0.2 });
    s.box(fx, fy, fw, fh, null, { w: 3 });
    s.rect(fx + 0.025, fy + 0.025, fw - 0.05, fh - 0.05, { w: 1.6 });
    const portrait = image("ilyasPortrait");
    if (portrait) {
      const c = cutoutOf(portrait);
      // sit the bust on the bottom of the mat, centred
      const ih = fh - 0.07;
      const iw = ih * PORTRAIT_ASPECT;
      const ix = fx + (fw - iw) / 2;
      const iy = fy + fh - 0.025 - ih;
      s.cutout(c, [ix, iy], [ix + iw, iy], [ix, iy + ih]);
    } else s.text("İlyas", fx + fw / 2, fy + fh / 2, 0.08);
    s.mark("ilyas", frame);
    // handwritten label with an arrow pointing at the frame
    s.text("that's me", 0.79, 0.69, 0.042, { weight: 700, rotate: -0.12 });
    s.stroke(
      [
        [0.75, 0.66],
        [0.7, 0.62],
        [0.67, 0.585],
      ],
      { w: 2 },
    );
    s.stroke(
      [
        [0.665, 0.615],
        [0.668, 0.582],
        [0.7, 0.588],
      ],
      { w: 2 },
    );
    s.star(0.88, 0.2, 0.022, { w: 2 });
    s.star(0.9, 0.3, 0.014, { w: 1.6 });
  },
  right(s) {
    s.washAll(tint(C.wall), 1);
    // a two-tier bookshelf
    const sx = 0.42;
    const sw = 0.44;
    for (const sy of [0.22, 0.4]) {
      const board = s.rectPts(sx, sy, sw, 0.018);
      s.fill(board, tint(C.shelf), { alpha: 1, jitter: 0.2 });
      s.stroke(board, { closed: true, w: 2 });
      // books standing on it
      let x = sx + 0.02;
      let i = Math.round(sy * 10);
      while (x < sx + sw - 0.05) {
        const bw = 0.022 + ((i * 7) % 5) * 0.004;
        const bh = 0.1 + ((i * 3) % 4) * 0.012;
        const lean = i % 6 === 5 ? 0.015 : 0;
        const pts: Pt[] = [
          [x + lean, sy - bh],
          [x + bw + lean, sy - bh],
          [x + bw, sy],
          [x, sy],
        ];
        s.fill(pts, tint(C.books[i % C.books.length]), { alpha: 1, jitter: 0.2 });
        s.stroke(pts, { closed: true, w: 1.6 });
        if (i % 3 === 0) s.line(x + bw * 0.25, sy - bh * 0.7, x + bw * 0.75, sy - bh * 0.7, { w: 1, alpha: 0.6 });
        x += bw + 0.004 + lean;
        i++;
      }
    }
    // a little potted cactus on the top shelf's end
    s.blob(sx + sw - 0.025, 0.205, 0.012, 0.02, tint(C.leaf), { w: 1.4 });
    // pinned note: where it started
    const note: Pt[] = [
      [0.12, 0.2],
      [0.31, 0.19],
      [0.32, 0.36],
      [0.13, 0.37],
    ];
    s.sticker(note, 4, 0.15, tint(C.note));
    s.stroke(note, { closed: true, w: 1.6 });
    s.circle(0.215, 0.205, 0.008, { w: 2 });
    s.text("C++ class,", 0.22, 0.25, 0.032, { weight: 700, rotate: -0.04 });
    s.text("2018", 0.22, 0.3, 0.04, { weight: 700, rotate: -0.04 });
    s.text("still going", 0.225, 0.345, 0.026, { weight: 500, rotate: -0.04 });
  },
  floor(s) {
    s.washAll(tint(C.floor), 1);
    for (let i = 1; i < 7; i++) s.line(i / 7, 0, i / 7, 1, { w: 1.1, alpha: 0.32 });
    // round rug in the middle of the room
    const [rx, ry] = F(0.55, 0.45);
    s.fill(s.ellipsePts(rx, ry, 0.3, 0.3), tint(C.rug), { alpha: 1, jitter: 0.4 });
    s.ellipse(rx, ry, 0.3, 0.3, { w: 2 });
    s.ellipse(rx, ry, 0.24, 0.24, { w: 1.2, alpha: 0.6 });
    // the armchair's shadow
    s.shadow([F(0.44, 0.03), F(0.82, 0.03), F(0.82, 0.36), F(0.44, 0.36)], 0.16, 16);
  },
  popups: isoLayers([
    // armchair against the right wall, plant and lamp
    (iso) => {
      // plant in the corner
      iso.cyl(0.12, 0.12, 0, 0.05, 0.08, WHITE, { color: C.pot, r2: 0.06 });
      for (const [dx, dy, dz, r] of [
        [0, 0, 0.15, 0.05],
        [-0.03, 0.02, 0.11, 0.04],
        [0.03, -0.02, 0.12, 0.042],
      ] as const)
        iso.at([0.12 + dx, 0.12 + dy, dz], (s, [x, y], u) => {
          s.blob(x, y, r * u * 0.7, r * u, tint(C.leaf), { mask: true, w: 1.6 });
          s.line(x, y + r * u * 0.8, x, y - r * u * 0.6, { w: 1, alpha: 0.6 });
        });

      // floor lamp beside the chair
      iso.disc(0.3, 0.12, 0, 0.035, tint(C.shelf), { w: 1.4 });
      iso.line([0.3, 0.12, 0], [0.3, 0.12, 0.5], { w: 2 });
      iso.cyl(0.3, 0.12, 0.46, 0.07, 0.09, WHITE, { color: C.shade, r2: 0.04 });

      // armchair: back, far arm, seat, near arm
      iso.box(0.44, 0.03, 0, 0.36, 0.07, 0.36, WHITE, { color: C.chair });
      iso.box(0.42, 0.06, 0, 0.05, 0.28, 0.22, WHITE, { color: C.chair });
      iso.box(0.47, 0.1, 0, 0.29, 0.24, 0.15, WHITE, { color: C.chair });
      iso.box(0.76, 0.06, 0, 0.05, 0.28, 0.22, WHITE, { color: C.chair });
    },
    // the cat, sitting on the seat
    (iso) => {
      const cat = image("catFigure");
      const pts = iso.figure({ aspect: CAT_ASPECT, ...(cat ? cutoutOf(cat) : {}) }, [0.61, 0.21, 0.15], 0.3);
      iso.mark("cat", pts);
    },
  ]).map((p) => ({ ...p, res: 2048 })),
};
