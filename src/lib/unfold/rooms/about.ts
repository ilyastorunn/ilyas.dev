// About — İlyas sitting on the floor in the corner of the room, back to the wall, with his cat
// lying on a little cushion beside him:
//   left wall  – a window and a handwritten "that's me" pointing down at him
//   right wall – a bookshelf and a pinned note about where it started
//   floor      – a round rug
//   pop-ups    – İlyas (back layer), the cat on its cushion (in front), a plant and a lamp
// Both figures are illustrations generated in Figma in the book's style (blue ink, pastel wash,
// isometric three-quarter view) from a written description of the owner and his cat; if an
// image fails to load, the hand-drawn stand-ins in ../figures.ts are used instead.
// Coordinates follow the conventions in ../rooms.ts.

import type { Pt } from "../sketch";
import { isoLayers, WHITE } from "../iso";
import { tint } from "../style";
import type { Room } from "../rooms";
import { drawCat, drawIlyas } from "../figures";
import { image } from "../images";
import { cutoutOf } from "../cutout";

const C = {
  wall: "#f6eef3",
  floor: "#eedcc6",
  rug: "#dbe8fb",
  sky: "#dbe8fb",
  frame: "#e8cfae",
  shelf: "#e2ccab",
  books: ["#f6b7b0", "#cfe0f7", "#cfe8c4", "#fff3b5", "#d9d0f3", "#f3c8b0"],
  note: "#fff3b5",
  cushion: "#f7ccd6",
  leaf: "#cfe8c4",
  pot: "#f3c8b0",
  shade: "#fbe6a4",
  bowl: "#cfe0f7",
  kibble: "#d8a979",
  ball: "#f6a99a",
};

// true width/height of the two illustrations (src/assets/about/*.webp); keep in sync
const ILYAS_ASPECT = 576 / 836;
const CAT_ASPECT = 816 / 798;

// İlyas's books, as spines on the top shelf (the bookshelf note links to them)
const SHELF = [
  { title: "STEVE JOBS", color: "#f4f4f6", h: 0.17 },
  { title: "THE CREATIVE ACT", color: "#efe6d2", h: 0.16 },
  { title: "SHOE DOG", color: "#f3b07a", h: 0.15 },
  { title: "DUNE", color: "#ecc892", h: 0.165 },
  { title: "DUNE MESSIAH", color: "#ddb07e", h: 0.16 },
  { title: "CHILDREN OF DUNE", color: "#cfa070", h: 0.17 },
];

const F = (a: number, b: number): Pt => [a, 1 - b]; // floor coords → canvas

export const aboutRoom: Room = {
  id: "about",
  name: "about",
  mood: "who I am",
  res: 2048, // the book spines carry small titles
  left(s) {
    s.washAll(tint(C.wall), 1);
    // window with an evening sky
    const wx = 0.14;
    const wy = 0.12;
    const ww = 0.4;
    const wh = 0.34;
    const win = s.rectPts(wx, wy, ww, wh);
    s.sticker(win, 7);
    s.fill(s.rectPts(wx + 0.02, wy + 0.02, ww - 0.04, wh - 0.04), tint(C.sky), { alpha: 1, jitter: 0.3 });
    s.box(wx, wy, ww, wh, null, { w: 3 });
    s.rect(wx + 0.02, wy + 0.02, ww - 0.04, wh - 0.04, { w: 1.6 });
    s.line(wx + ww / 2, wy + 0.02, wx + ww / 2, wy + wh - 0.02, { w: 2.2 });
    s.line(wx + 0.02, wy + wh * 0.48, wx + ww - 0.02, wy + wh * 0.48, { w: 2.2 });
    s.box(wx - 0.02, wy + wh, ww + 0.04, 0.02, tint(C.frame), { w: 2 });
    s.circle(wx + 0.09, wy + 0.08, 0.025, { w: 1.6 }); // moon
    s.star(wx + 0.28, wy + 0.07, 0.014, { w: 1.4 });
    s.star(wx + 0.33, wy + 0.22, 0.01, { w: 1.2 });
    // a handwritten "that's me" pointing down into the corner
    s.text("that's me", 0.66, 0.53, 0.046, { weight: 700, rotate: 0.08 });
    s.stroke(
      [
        [0.72, 0.57],
        [0.77, 0.63],
        [0.8, 0.68],
      ],
      { w: 2 },
    );
    s.stroke(
      [
        [0.77, 0.67],
        [0.8, 0.685],
        [0.815, 0.655],
      ],
      { w: 2 },
    );
  },
  right(s) {
    s.washAll(tint(C.wall), 1);
    // a two-tier bookshelf: İlyas's books on the top shelf (clickable), others below
    const sx = 0.42;
    const sw = 0.44;
    const board = (sy: number) => {
      const pts = s.rectPts(sx, sy, sw, 0.018);
      s.fill(pts, tint(C.shelf), { alpha: 1, jitter: 0.2 });
      s.stroke(pts, { closed: true, w: 2 });
    };
    const spine = (x: number, sy: number, bw: number, bh: number, color: string, lean = 0): Pt[] => {
      const pts: Pt[] = [
        [x + lean, sy - bh],
        [x + bw + lean, sy - bh],
        [x + bw, sy],
        [x, sy],
      ];
      s.fill(pts, tint(color), { alpha: 1, jitter: 0.2 });
      s.stroke(pts, { closed: true, w: 1.6 });
      return pts;
    };

    const TOP = 0.25;
    board(TOP);
    let x = sx + 0.025;
    for (const b of SHELF) {
      spine(x, TOP, 0.04, b.h, b.color);
      // title running up the spine
      const size = Math.min(0.019, (b.h - 0.025) / (b.title.length * 0.48));
      s.text(b.title, x + 0.02, TOP - b.h / 2, size, { weight: 700, rotate: -Math.PI / 2 });
      x += 0.043;
    }
    // a leaning book and a little cactus at the end of the shelf
    spine(x + 0.01, TOP, 0.03, 0.12, C.books[4], 0.04);
    s.blob(sx + sw - 0.03, TOP - 0.02, 0.013, 0.022, tint(C.leaf), { w: 1.4 });
    s.mark("books", s.rectPts(sx, TOP - 0.18, sw, 0.2));

    const LOW = 0.43;
    board(LOW);
    x = sx + 0.02;
    let i = 4;
    while (x < sx + sw - 0.05) {
      const bw = 0.022 + ((i * 7) % 5) * 0.004;
      const bh = 0.1 + ((i * 3) % 4) * 0.012;
      const lean = i % 6 === 5 ? 0.015 : 0;
      spine(x, LOW, bw, bh, C.books[i % C.books.length], lean);
      if (i % 3 === 0) s.line(x + bw * 0.25, LOW - bh * 0.7, x + bw * 0.75, LOW - bh * 0.7, { w: 1, alpha: 0.6 });
      x += bw + 0.004 + lean;
      i++;
    }
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
    // round rug in front of the corner
    const [rx, ry] = F(0.36, 0.36);
    s.fill(s.ellipsePts(rx, ry, 0.3, 0.3), tint(C.rug), { alpha: 1, jitter: 0.4 });
    s.ellipse(rx, ry, 0.3, 0.3, { w: 2 });
    s.ellipse(rx, ry, 0.24, 0.24, { w: 1.2, alpha: 0.6 });
    // soft shadows where İlyas and the cushion sit
    s.shadow(s.ellipsePts(...F(0.33, 0.33), 0.15, 0.12), 0.2, 14);
    s.shadow(s.ellipsePts(...F(0.23, 0.58), 0.11, 0.1), 0.16, 12);
  },
  popups: isoLayers([
    // İlyas, sitting cross-legged on the floor in the corner with his laptop
    (iso) => {
      const img = image("ilyasFigure");
      const H = 0.42;
      const pts = iso.standee([0.27, 0.27, 0], H * ILYAS_ASPECT, H, (s, p, k) => {
        if (!img) return drawIlyas(s, p, k);
        const a = ILYAS_ASPECT / 2;
        s.cutout(cutoutOf(img), p(-a, 1), p(a, 1), p(-a, 0));
      });
      iso.mark("ilyas", pts);
    },
    // the cat, lying on its cushion beside him (the illustration includes the cushion)
    (iso) => {
      const CX = 0.2;
      const CY = 0.55;
      const img = image("catFigure");
      if (img) {
        const H = 0.2;
        const a = CAT_ASPECT / 2;
        iso.mark("cat", iso.standee([CX, CY, 0], H * CAT_ASPECT, H, (s, p) => s.cutout(cutoutOf(img), p(-a, 1), p(a, 1), p(-a, 0))));
      } else {
        iso.cyl(CX, CY, 0, 0.12, 0.04, WHITE, { color: C.cushion, r2: 0.112 });
        const pts = iso.standee([CX, CY, 0.035], 0.26, 0.2, (s, p) => drawCat(s, p));
        iso.mark("cat", [...pts, [CX - 0.12, CY, 0], [CX + 0.12, CY, 0]]);
      }
      // Joey's things: a food bowl (he loves dinner) and a ball (he loves it more)
      const BX = 0.09;
      const BY = 0.76;
      iso.cyl(BX, BY, 0, 0.05, 0.03, WHITE, { color: C.bowl, r2: 0.06 });
      for (const [dx, dy] of [
        [-0.02, -0.01],
        [0.01, -0.02],
        [0.02, 0.01],
        [-0.01, 0.02],
        [0, 0],
      ] as const)
        iso.at([BX + dx, BY + dy, 0.033], (s, [x, y], u) => s.blob(x, y, 0.011 * u, 0.008 * u, tint(C.kibble), { mask: true, w: 1 }));
      iso.at([0.42, 0.64, 0.03], (s, [x, y], u) => {
        const r = 0.03 * u;
        s.blob(x, y, r, r, tint(C.ball), { mask: true, w: 1.8 });
        s.stroke(s.ellipsePts(x, y, r * 0.45, r, -Math.PI / 2, Math.PI / 2, 12), { w: 1.2 });
      });
      iso.p([0.42, 0.64, 0.06]); // keep the ball's top on the card
    },
    // a lamp by the right wall and a plant further along it
    (iso) => {
      iso.disc(0.56, 0.08, 0, 0.035, tint(C.shelf), { w: 1.4 });
      iso.line([0.56, 0.08, 0], [0.56, 0.08, 0.5], { w: 2 });
      iso.cyl(0.56, 0.08, 0.46, 0.07, 0.09, WHITE, { color: C.shade, r2: 0.04 });
      iso.cyl(0.84, 0.11, 0, 0.05, 0.08, WHITE, { color: C.pot, r2: 0.06 });
      for (const [dx, dy, dz, r] of [
        [0, 0, 0.15, 0.05],
        [-0.03, 0.02, 0.11, 0.04],
        [0.03, -0.02, 0.12, 0.042],
      ] as const)
        iso.at([0.84 + dx, 0.11 + dy, dz], (s, [x, y], u) => {
          s.blob(x, y, r * u * 0.7, r * u, tint(C.leaf), { mask: true, w: 1.6 });
          s.line(x, y + r * u * 0.8, x, y - r * u * 0.6, { w: 1, alpha: 0.6 });
        });
    },
  ]).map((p) => ({ ...p, res: 2048 })),
};
