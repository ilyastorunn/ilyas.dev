// Hand-drawn figures for the rooms, in the same ink-and-wash style as the furniture. They are
// stylised, not portraits: drawn from the owner's photos for the details that make them read
// as him and his cat (short dark side-swept hair, full beard, hoop earring, nose ring, black
// t-shirt; a brown tabby with big yellow-green eyes and an "M" on the forehead).
//
// Each figure is drawn in its own coordinates (see Iso.standee): x across with 0 at the centre,
// y up from the floor, 1 unit = the figure's height. Every filled shape uses mask: true so it
// becomes part of the pop-up card's paper.

import type { Pt, Sketch } from "./sketch";
import { tint } from "./style";

type Pen = (x: number, y: number) => Pt;
type XY = [number, number];

const poly = (p: Pen, pts: XY[]): Pt[] => pts.map(([x, y]) => p(x, y));
const ell = (p: Pen, cx: number, cy: number, rx: number, ry: number, a0 = 0, a1 = Math.PI * 2, n = 28): Pt[] => {
  const out: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    out.push(p(cx + Math.cos(a) * rx, cy + Math.sin(a) * ry));
  }
  return out;
};
const mirror = (pts: XY[]): XY[] => pts.map(([x, y]) => [-x, y]);

const IL = {
  skin: "#f2c8a6",
  hair: "#4a3a34",
  beard: "#5a463c",
  tee: "#55566a",
  trousers: "#454b63",
  shoes: "#ffffff",
  laptop: "#e3e3ee",
};

/** İlyas sitting cross-legged on the floor with a laptop on his lap. About 0.85 wide. */
export function drawIlyas(s: Sketch, p: Pen, k: number) {
  const shape = (pts: XY[], color: string, w = 2) => s.shape(poly(p, pts), tint(color), { mask: true, w });
  const oval = (cx: number, cy: number, rx: number, ry: number, color: string | null, w = 2) => {
    const pts = ell(p, cx, cy, rx, ry);
    if (color) s.fill(pts, tint(color), { mask: true, alpha: 1, jitter: 0.2 });
    else s.maskFill(pts);
    s.stroke(pts, { w, closed: true });
  };
  const line = (pts: XY[], w = 1.6, alpha = 1) => s.stroke(poly(p, pts), { w, alpha });

  // t-shirt: torso and short sleeves
  const sleeve: XY[] = [
    [-0.2, 0.63],
    [-0.31, 0.53],
    [-0.25, 0.46],
    [-0.18, 0.54],
  ];
  shape(sleeve, IL.tee);
  shape(mirror(sleeve), IL.tee);
  shape(
    [
      [-0.2, 0.635],
      [0.2, 0.635],
      [0.24, 0.55],
      [0.21, 0.3],
      [-0.21, 0.3],
      [-0.24, 0.55],
    ],
    IL.tee,
    2.2,
  );
  // neck and collar
  shape(
    [
      [-0.045, 0.62],
      [0.045, 0.62],
      [0.045, 0.7],
      [-0.045, 0.7],
    ],
    IL.skin,
    1.6,
  );
  line([
    [-0.065, 0.632],
    [0, 0.6],
    [0.065, 0.632],
  ]);

  // ears (behind the head), a hoop in the left ear as we see it
  oval(-0.107, 0.8, 0.024, 0.036, IL.skin, 1.6);
  oval(0.107, 0.8, 0.024, 0.036, IL.skin, 1.6);
  s.stroke(ell(p, -0.112, 0.762, 0.012, 0.012), { w: 1.8, closed: true });

  // head
  oval(0, 0.8, 0.105, 0.125, IL.skin, 2.2);

  // hair: short, swept to the side, with faded sides
  shape(
    [
      [-0.108, 0.81],
      [-0.113, 0.87],
      [-0.09, 0.92],
      [-0.035, 0.952],
      [0.045, 0.952],
      [0.095, 0.925],
      [0.114, 0.87],
      [0.109, 0.815],
      [0.098, 0.85],
      [0.06, 0.885],
      [-0.005, 0.878],
      [-0.06, 0.865],
      [-0.095, 0.84],
    ],
    IL.hair,
    2,
  );
  line(
    [
      [-0.04, 0.945],
      [0.0, 0.915],
      [0.05, 0.9],
    ],
    1.2,
    0.7,
  );
  s.hatch(
    poly(p, [
      [-0.108, 0.81],
      [-0.1, 0.845],
      [-0.09, 0.8],
    ]),
    0.006,
    -1,
    1,
    0.5,
  );

  // full beard and moustache
  shape(
    [
      [-0.106, 0.815],
      [-0.1, 0.745],
      [-0.065, 0.695],
      [0, 0.672],
      [0.065, 0.695],
      [0.1, 0.745],
      [0.106, 0.815],
      [0.085, 0.785],
      [0.05, 0.768],
      [0.02, 0.772],
      [0, 0.762],
      [-0.02, 0.772],
      [-0.05, 0.768],
      [-0.085, 0.785],
    ],
    IL.beard,
    1.8,
  );
  line(
    [
      [-0.028, 0.738],
      [0.028, 0.738],
    ],
    1.6,
  );

  // face: brows, eyes, nose with a small ring
  line(
    [
      [-0.07, 0.852],
      [-0.022, 0.857],
    ],
    2.4,
  );
  line(
    [
      [0.022, 0.857],
      [0.07, 0.852],
    ],
    2.4,
  );
  s.stroke(ell(p, -0.043, 0.825, 0.009, 0.008), { w: 2.6, closed: true });
  s.stroke(ell(p, 0.043, 0.825, 0.009, 0.008), { w: 2.6, closed: true });
  line(
    [
      [0.004, 0.83],
      [0.012, 0.795],
      [-0.004, 0.788],
    ],
    1.4,
  );
  s.stroke(ell(p, 0.012, 0.787, 0.006, 0.006, 0.4, Math.PI * 1.6, 10), { w: 1.4 });

  // crossed legs: thighs out to rounded knees, then the shins crossing in front
  shape(
    [
      [-0.21, 0.31],
      [0.21, 0.31],
      [0.35, 0.23],
      [0.42, 0.16],
      [0.41, 0.1],
      [0.33, 0.075],
      [0.05, 0.11],
      [-0.05, 0.11],
      [-0.33, 0.075],
      [-0.41, 0.1],
      [-0.42, 0.16],
      [-0.35, 0.23],
    ],
    IL.trousers,
    2.2,
  );
  line(
    [
      [-0.34, 0.1],
      [-0.1, 0.16],
      [0.12, 0.215],
    ],
    1.4,
    0.75,
  );
  line(
    [
      [0.34, 0.1],
      [0.1, 0.155],
      [-0.1, 0.205],
    ],
    1.4,
    0.75,
  );
  // white trainers peeking out
  oval(-0.15, 0.075, 0.062, 0.032, IL.shoes, 1.8);
  oval(0.15, 0.075, 0.062, 0.032, IL.shoes, 1.8);

  // forearms reaching for the keyboard
  const arm: XY[] = [
    [-0.285, 0.485],
    [-0.235, 0.47],
    [-0.13, 0.34],
    [-0.18, 0.32],
  ];
  shape(arm, IL.skin, 1.8);
  shape(mirror(arm), IL.skin, 1.8);
  // a small tattoo line on one forearm
  line(
    [
      [0.2, 0.43],
      [0.185, 0.41],
    ],
    1.2,
    0.8,
  );

  // laptop: base on the lap, then the lid we see from behind, then his hands on the keys
  shape(
    [
      [-0.2, 0.29],
      [0.2, 0.29],
      [0.18, 0.325],
      [-0.18, 0.325],
    ],
    IL.laptop,
    1.8,
  );
  shape(
    [
      [-0.15, 0.32],
      [0.15, 0.32],
      [0.14, 0.47],
      [-0.14, 0.47],
    ],
    IL.laptop,
    2.2,
  );
  s.star(...p(0.0, 0.395), 0.02 * k, { w: 1.6 }); // a sticker on the lid
  oval(-0.155, 0.33, 0.034, 0.022, IL.skin, 1.6);
  oval(0.155, 0.33, 0.034, 0.022, IL.skin, 1.6);
}

const CAT = {
  fur: "#c8a079",
  light: "#fff8ee",
  eye: "#d4e27a",
  pupil: "#3c3a2c",
  nose: "#f2a6a0",
  ear: "#f6c3bd",
};

/** The cat lying like a loaf, facing out, front paws tucked forward. About 1.3 wide. */
export function drawCat(s: Sketch, p: Pen) {
  const shape = (pts: XY[], color: string, w = 2) => s.shape(poly(p, pts), tint(color), { mask: true, w });
  const oval = (cx: number, cy: number, rx: number, ry: number, color: string, w = 2) => {
    const pts = ell(p, cx, cy, rx, ry);
    s.fill(pts, tint(color), { mask: true, alpha: 1, jitter: 0.2 });
    s.stroke(pts, { w, closed: true });
  };
  const line = (pts: XY[], w = 1.6, alpha = 1) => s.stroke(poly(p, pts), { w, alpha });
  const HX = -0.14; // head centre

  // tail curled along the front, body, then stripes across the back
  oval(0.33, 0.07, 0.25, 0.055, CAT.fur, 1.8);
  for (const x of [0.2, 0.3, 0.4, 0.5]) line([[x, 0.03], [x + 0.02, 0.11]], 1.6, 0.85);
  oval(0.12, 0.28, 0.44, 0.26, CAT.fur, 2.2);
  for (const x of [0.18, 0.29, 0.4, 0.49]) {
    line(
      [
        [x - 0.03, 0.51],
        [x, 0.4],
        [x - 0.01, 0.27],
        [x + 0.02, 0.17],
      ],
      1.8,
      0.85,
    );
  }

  // ears
  const ear: XY[] = [
    [HX - 0.21, 0.62],
    [HX - 0.18, 0.92],
    [HX - 0.05, 0.72],
  ];
  shape(ear, CAT.fur);
  shape(
    ear.map(([x, y]) => [2 * HX - x, y]),
    CAT.fur,
  );
  shape(
    [
      [HX - 0.18, 0.66],
      [HX - 0.17, 0.84],
      [HX - 0.09, 0.72],
    ],
    CAT.ear,
    1,
  );
  shape(
    [
      [HX + 0.18, 0.66],
      [HX + 0.17, 0.84],
      [HX + 0.09, 0.72],
    ],
    CAT.ear,
    1,
  );

  // head with a white muzzle
  oval(HX, 0.52, 0.26, 0.23, CAT.fur, 2.2);
  oval(HX, 0.41, 0.11, 0.075, CAT.light, 1.4);

  // the tabby "M" and cheek stripes
  line(
    [
      [HX - 0.08, 0.64],
      [HX - 0.05, 0.71],
      [HX, 0.65],
      [HX + 0.05, 0.71],
      [HX + 0.08, 0.64],
    ],
    1.8,
  );
  line([[HX, 0.66], [HX, 0.73]], 1.6);
  for (const d of [-1, 1]) {
    line([[HX + d * 0.2, 0.55], [HX + d * 0.25, 0.53]], 1.6, 0.8);
    line([[HX + d * 0.19, 0.5], [HX + d * 0.25, 0.47]], 1.6, 0.8);
  }

  // big round yellow-green eyes
  for (const d of [-1, 1]) {
    const ex = HX + d * 0.095;
    oval(ex, 0.535, 0.058, 0.064, CAT.eye, 2);
    s.fill(ell(p, ex, 0.53, 0.02, 0.05), tint(CAT.pupil), { alpha: 1, jitter: 0 });
    s.stroke(ell(p, ex, 0.53, 0.02, 0.05), { w: 1.4, closed: true });
    s.fill(ell(p, ex + 0.015, 0.565, 0.011, 0.011), "#ffffff", { alpha: 1, jitter: 0 });
  }

  // nose, mouth, whiskers
  shape(
    [
      [HX - 0.028, 0.462],
      [HX + 0.028, 0.462],
      [HX, 0.435],
    ],
    CAT.nose,
    1.4,
  );
  line(
    [
      [HX - 0.035, 0.4],
      [HX, 0.425],
      [HX + 0.035, 0.4],
    ],
    1.4,
  );
  for (const d of [-1, 1])
    for (const [y0, y1] of [
      [0.43, 0.46],
      [0.41, 0.41],
      [0.395, 0.36],
    ])
      line(
        [
          [HX + d * 0.07, y0],
          [HX + d * 0.3, y1],
        ],
        1,
        0.75,
      );

  // front paws tucked forward
  for (const x of [HX - 0.1, HX + 0.1]) {
    oval(x, 0.07, 0.085, 0.05, CAT.fur, 1.8);
    line([[x - 0.02, 0.035], [x - 0.02, 0.06]], 1, 0.7);
    line([[x + 0.02, 0.035], [x + 0.02, 0.06]], 1, 0.7);
  }
}
