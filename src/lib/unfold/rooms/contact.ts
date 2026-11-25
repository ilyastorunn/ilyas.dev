// Contact — a small mail corner:
//   left wall  – a big postcard addressed to İlyas's email, with a stamp and a postmark
//   right wall – a wall clock and a pinned paper tag for GitHub
//   floor      – a rug and a paper plane that has just landed
//   pop-ups    – a mailbox on a post with its flag up and letters sticking out, and a plant
// Every way to reach him is written out on the object itself.
// Coordinates follow the conventions in ../rooms.ts.

import type { Pt } from "../sketch";
import { isoLayers, WHITE } from "../iso";
import { tint } from "../style";
import type { Room } from "../rooms";

const C = {
  wall: "#fbf4e4",
  floor: "#ecd9bf",
  rug: "#dbe8fb",
  card: "#fffdf6",
  stamp: "#f6b7b0",
  tag: "#fff3b5",
  clock: "#eef1fb",
  mailbox: "#f6a99a",
  post: "#d8b48c",
  flag: "#f39a8e",
  letter: "#ffffff",
  leaf: "#cfe8c4",
  pot: "#f3c8b0",
};

const F = (a: number, b: number): Pt => [a, 1 - b]; // floor coords → canvas
const rot = ([x, y]: Pt, [cx, cy]: Pt, a: number): Pt => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];

export const contactRoom: Room = {
  id: "contact",
  name: "contact",
  mood: "say hello",
  res: 2048, // the address on the postcard is small handwriting
  left(s) {
    s.washAll(tint(C.wall), 1);
    // a big postcard pinned to the wall, slightly tilted
    const x = 0.14;
    const y = 0.15;
    const w = 0.56;
    const h = 0.36;
    const a = -0.04;
    const c: Pt = [x + w / 2, y + h / 2];
    const R = (px: number, py: number) => rot([px, py], c, a);
    const card = [R(x, y), R(x + w, y), R(x + w, y + h), R(x, y + h)];
    s.sticker(card, 6, 0.2, tint(C.card));
    s.stroke(card, { closed: true, w: 2.4 });
    // left half: a greeting; right half: stamp and address lines
    s.line(...R(x + w * 0.52, y + 0.04), ...R(x + w * 0.52, y + h - 0.04), { w: 1.4 });
    s.text("say hello!", ...R(x + w * 0.26, y + 0.12), 0.05, { weight: 700, rotate: a });
    s.text("projects, questions,", ...R(x + w * 0.26, y + 0.2), 0.026, { weight: 500, rotate: a });
    s.text("or a nice app you found", ...R(x + w * 0.26, y + 0.24), 0.026, { weight: 500, rotate: a });
    s.text("— write anytime", ...R(x + w * 0.27, y + 0.29), 0.026, { weight: 500, rotate: a });
    const stamp = [R(x + w - 0.1, y + 0.03), R(x + w - 0.03, y + 0.03), R(x + w - 0.03, y + 0.11), R(x + w - 0.1, y + 0.11)];
    s.fill(stamp, tint(C.stamp), { alpha: 1, jitter: 0.2 });
    s.stroke(stamp, { closed: true, w: 1.4 });
    s.star(...R(x + w - 0.065, y + 0.07), 0.018, { w: 1.4 });
    s.stroke(s.ellipsePts(...R(x + w - 0.13, y + 0.085), 0.035, 0.035), { w: 1.2, alpha: 0.7, closed: true }); // postmark
    for (let i = 0; i < 3; i++) {
      const ly = y + 0.19 + i * 0.055;
      s.line(...R(x + w * 0.57, ly), ...R(x + w - 0.03, ly), { w: 1, alpha: 0.6 });
    }
    s.text("to: İlyas Torun", ...R(x + w * 0.76, y + 0.175), 0.024, { weight: 700, rotate: a });
    s.text("ilyastorun.dev@gmail.com", ...R(x + w * 0.76, y + 0.23), 0.02, { weight: 700, rotate: a });
    // pin
    s.blob(...R(x + w / 2, y + 0.012), 0.009, 0.009, tint(C.stamp), { w: 1.4 });
    s.mark("email", card);
  },
  right(s) {
    s.washAll(tint(C.wall), 1);
    // wall clock
    const [cx, cy] = [0.22, 0.2];
    s.fill(s.ellipsePts(cx, cy, 0.075, 0.075), tint(C.clock), { alpha: 1, jitter: 0.2 });
    s.circle(cx, cy, 0.075, { w: 2.4 });
    for (let i = 0; i < 12; i++) {
      const t = (i / 12) * Math.PI * 2;
      s.line(cx + Math.cos(t) * 0.06, cy + Math.sin(t) * 0.06, cx + Math.cos(t) * 0.068, cy + Math.sin(t) * 0.068, { w: 1.2 });
    }
    s.line(cx, cy, cx + 0.03, cy - 0.025, { w: 2.2 });
    s.line(cx, cy, cx - 0.008, cy - 0.05, { w: 1.6 });

    // a paper tag for GitHub, hanging from a pin
    const tx = 0.48;
    const ty = 0.16;
    const tag: Pt[] = [
      [tx, ty + 0.04],
      [tx + 0.04, ty],
      [tx + 0.34, ty + 0.01],
      [tx + 0.34, ty + 0.19],
      [tx + 0.04, ty + 0.2],
      [tx, ty + 0.16],
    ];
    s.sticker(tag, 5, 0.18, tint(C.tag));
    s.stroke(tag, { closed: true, w: 2.2 });
    s.circle(tx + 0.03, ty + 0.1, 0.012, { w: 1.6 });
    s.line(tx + 0.03, ty + 0.1, tx - 0.03, ty + 0.02, { w: 1.2 });
    s.blob(tx - 0.03, ty + 0.02, 0.008, 0.008, tint(C.stamp), { w: 1.2 });
    s.text("GitHub", tx + 0.19, ty + 0.075, 0.05, { weight: 700 });
    s.text("@ilyastorunn", tx + 0.19, ty + 0.14, 0.03, { weight: 500 });
    s.mark("github", tag);
    s.text("find me here, too", tx + 0.17, ty + 0.27, 0.028, { weight: 500, rotate: 0.03 });
  },
  floor(s) {
    s.washAll(tint(C.floor), 1);
    for (let i = 1; i < 7; i++) s.line(i / 7, 0, i / 7, 1, { w: 1.1, alpha: 0.32 });
    const [rx, ry] = F(0.55, 0.45);
    s.fill(s.ellipsePts(rx, ry, 0.28, 0.22), tint(C.rug), { alpha: 1, jitter: 0.4 });
    s.ellipse(rx, ry, 0.28, 0.22, { w: 2 });
    // a paper plane that has just landed, with its flight path
    const plane: Pt[] = [F(0.72, 0.3), F(0.82, 0.36), F(0.74, 0.37), F(0.72, 0.3), F(0.765, 0.355)];
    s.fill([plane[0], plane[1], plane[2]], "#ffffff", { alpha: 1, jitter: 0 });
    s.stroke(plane, { w: 1.6 });
    s.stroke([F(0.9, 0.12), F(0.88, 0.2), F(0.86, 0.26), F(0.83, 0.32)], { w: 1.2, alpha: 0.6 });
    s.shadow([F(0.48, 0.3), F(0.72, 0.3), F(0.72, 0.52), F(0.48, 0.52)], 0.14, 14);
  },
  popups: isoLayers([
    // a plant in the corner
    (iso) => {
      iso.cyl(0.13, 0.13, 0, 0.055, 0.09, WHITE, { color: C.pot, r2: 0.065 });
      for (const [dx, dy, dz, r] of [
        [0, 0, 0.16, 0.05],
        [-0.03, 0.02, 0.12, 0.04],
        [0.03, -0.02, 0.13, 0.042],
      ] as const)
        iso.at([0.13 + dx, 0.13 + dy, dz], (s, [x, y], u) => {
          s.blob(x, y, r * u * 0.7, r * u, tint(C.leaf), { mask: true, w: 1.6 });
          s.line(x, y + r * u * 0.8, x, y - r * u * 0.6, { w: 1, alpha: 0.6 });
        });
    },
    // the mailbox: a post, the box, its flag up, letters waiting
    (iso) => {
      const X = 0.5;
      const Y = 0.32;
      const W = 0.2;
      const D = 0.16;
      const Z = 0.3;
      const H = 0.13;
      iso.box(X + W / 2 - 0.018, Y + D / 2 - 0.018, 0, 0.036, 0.036, Z, WHITE, { color: C.post });
      // flag on the far side (drawn first), then the box
      iso.box(X + W + 0.005, Y + 0.03, Z + 0.02, 0.012, 0.02, 0.2, WHITE, { color: C.post });
      iso.box(X + W + 0.005, Y + 0.05, Z + 0.15, 0.012, 0.07, 0.05, WHITE, { color: C.flag });
      iso.box(X, Y, Z, W, D, H, WHITE, { color: C.mailbox });
      // letters sticking out of the front slot
      iso.box(X + 0.05, Y + D - 0.03, Z + H - 0.02, 0.1, 0.05, 0.006, WHITE, { color: C.letter });
      iso.box(X + 0.07, Y + D - 0.02, Z + H - 0.012, 0.09, 0.045, 0.006, WHITE, { color: "#fff3b5" });
      iso.at([X + W / 2, Y + D, Z + H * 0.45], (s, [x, y], u) => s.text("MAIL", x, y, 0.04 * u, { weight: 700 }));
      iso.mark("email", [
        [X, Y, 0],
        [X + W, Y + D, 0],
        [X, Y + D, Z + H + 0.02],
        [X + W + 0.02, Y, Z + 0.22],
      ]);
    },
  ]).map((p) => ({ ...p, res: 2048 })),
};
