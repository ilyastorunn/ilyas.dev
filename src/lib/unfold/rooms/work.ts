// Work — a small studio corner. Every project is an object that names itself, so a visitor can
// read the room without clicking anything:
//   left wall  – Memento: a wall calendar with the app's icon as its picture, today circled
//   right wall – niceapps.club: the site's real hero printed as a poster
//   desk       – the real devanta.net homepage on the laptop; the real Unscroll screen on a
//                phone lying on the desk, next to an hourglass
// (Each real image falls back to a hand-drawn stand-in if it fails to load.)
// Coordinates follow the conventions in ../rooms.ts.

import type { Pt, Sketch } from "../sketch";
import { isoLayers, WHITE, type V3 } from "../iso";
import { tint } from "../style";
import type { Room } from "../rooms";
import { image } from "../images";

const C = {
  wall: "#eef1fb",
  floor: "#ead9c2",
  wood: "#ead3b2",
  memento: "#f6b7b0",
  today: "#f39a8e",
  nice: "#fff3b5",
  dots: ["#f6a99a", "#9db8ff", "#a9d39a"],
  screen: "#dbe8fb",
  device: "#e2e0ee",
  unscroll: "#cfe0f7",
  sand: "#f0cf6e",
  leaf: "#cfe8c4",
  pot: "#f3c8b0",
  paper: "#fffdf4",
};

const F = (a: number, b: number): Pt => [a, 1 - b]; // floor coords → canvas

function wallCalendar(s: Sketch) {
  const x = 0.3;
  const y = 0.13;
  const w = 0.38;
  const h = 0.52;
  // nail and hanging string
  s.circle(x + w / 2, 0.05, 0.008, { w: 1.6 });
  s.stroke([[x + 0.09, y], [x + w / 2, 0.055], [x + w - 0.09, y]], { w: 1.3, alpha: 0.8 });

  const page = s.rectPts(x, y, w, h);
  s.sticker(page, 6);
  s.fill(s.rectPts(x + 0.01, y + 0.01, w - 0.02, 0.075), tint(C.memento), { alpha: 1, jitter: 0.3 });
  s.box(x, y, w, h, null, { w: 2.8 });
  s.line(x, y + 0.09, x + w, y + 0.09, { w: 2 });
  // binder rings
  for (const dx of [0.08, w - 0.08]) s.circle(x + dx, y + 0.005, 0.012, { w: 1.8 });
  s.text("Memento", x + w / 2, y + 0.05, 0.052);

  // the calendar's picture: Memento's own app icon
  const icon = image("mementoIcon");
  const is = 0.15;
  const ix = x + (w - is) / 2;
  const iy = y + 0.11;
  if (icon) {
    s.image(icon, [ix, iy], [ix + is, iy], [ix, iy + is], 1, { radius: 0.22 });
    s.stroke(s.rectPts(ix, iy, is, is), { closed: true, w: 1.4, alpha: 0.7 });
  }

  const now = new Date();
  const month = now.toLocaleDateString("en-GB", { month: "long" }).toLowerCase();
  s.text(month, x + w / 2, y + 0.29, 0.03, { weight: 500 });

  // a 7×4 grid of days, with today circled
  const gx = x + 0.025;
  const gy = y + 0.315;
  const cw = (w - 0.05) / 7;
  const ch = (h - 0.335) / 4;
  for (let i = 0; i <= 4; i++) s.line(gx, gy + i * ch, gx + 7 * cw, gy + i * ch, { w: 1, alpha: 0.45 });
  for (let i = 0; i <= 7; i++) s.line(gx + i * cw, gy, gx + i * cw, gy + 4 * ch, { w: 1, alpha: 0.45 });
  const cell = (now.getDate() - 1) % 28;
  const cx = gx + ((cell % 7) + 0.5) * cw;
  const cy = gy + (Math.floor(cell / 7) + 0.5) * ch;
  s.fill(s.ellipsePts(cx, cy, cw * 0.42, ch * 0.4), tint(C.today), { alpha: 0.9, jitter: 0.3 });
  s.ellipse(cx, cy, cw * 0.48, ch * 0.46, { w: 2 });
  s.text(String(now.getDate()), cx, cy, 0.022, { weight: 700 });
  // a couple of small remembered things
  for (const c of [3, 10, 18]) {
    if (c === cell) continue;
    const ex = gx + ((c % 7) + 0.5) * cw;
    const ey = gy + (Math.floor(c / 7) + 0.5) * ch;
    s.circle(ex, ey, 0.006, { w: 1.6 });
  }
  s.mark("memento", page);
}

function nicePoster(s: Sketch) {
  const hero = image("niceappsHero");
  const x = 0.3;
  const y = 0.13;
  const w = 0.52;
  const h = hero ? 0.27 : 0.36;
  const poster = s.rectPts(x, y, w, h);
  s.sticker(poster, 7);
  if (hero) {
    // the real niceapps.club hero, printed as the poster
    const m = 0.012;
    s.image(hero, [x + m, y + m], [x + w - m, y + m], [x + m, y + h - m], (w - 2 * m) / (h - 2 * m));
  } else s.fill(s.rectPts(x + 0.015, y + 0.015, w - 0.03, h - 0.03), tint(C.nice), { alpha: 1, jitter: 0.4 });
  s.box(x, y, w, h, null, { w: 2.8 });
  // tape on the top corners
  for (const [tx, rot] of [
    [x + 0.02, -0.5],
    [x + w - 0.02, 0.5],
  ] as const) {
    const t: Pt[] = [
      [-0.035, -0.012],
      [0.035, -0.012],
      [0.035, 0.012],
      [-0.035, 0.012],
    ].map(([a, b]) => [tx + a * Math.cos(rot) - b * Math.sin(rot), y + a * Math.sin(rot) + b * Math.cos(rot)] as Pt);
    s.fill(t, "#ffffff", { alpha: 0.75, jitter: 0 });
    s.stroke(t, { closed: true, w: 1.1, alpha: 0.6 });
  }
  s.mark("niceapps", poster);
  if (hero) return;
  s.text("niceapps.club", x + w / 2, y + 0.075, 0.055);
  s.text("find something nice.", x + w / 2, y + 0.135, 0.03, { weight: 500 });
  // the club: three dot mascots
  C.dots.forEach((col, i) => {
    const dx = x + w / 2 + (i - 1) * 0.1;
    const dy = y + 0.25 + (i === 1 ? -0.012 : 0);
    s.fill(s.ellipsePts(dx, dy, 0.04, 0.04), tint(col), { alpha: 1, jitter: 0.3 });
    s.circle(dx, dy, 0.04, { w: 2 });
    s.circle(dx - 0.012, dy - 0.006, 0.004, { w: 2.4 });
    s.circle(dx + 0.012, dy - 0.006, 0.004, { w: 2.4 });
    s.stroke(s.ellipsePts(dx, dy + 0.008, 0.012, 0.008, 0.3, Math.PI - 0.3, 8), { w: 1.4 });
  });
}

export const workRoom: Room = {
  id: "work",
  name: "work",
  mood: "things I've made",
  res: 2048, // the poster and the calendar icon are real images
  left(s) {
    s.washAll(tint(C.wall), 1);
    wallCalendar(s);
    s.star(0.86, 0.2, 0.024, { w: 2 });
    s.star(0.9, 0.31, 0.015, { w: 1.8 });
    // a hand-written note pinned near the front edge
    const note: Pt[] = [
      [0.05, 0.42],
      [0.17, 0.41],
      [0.18, 0.53],
      [0.06, 0.54],
    ];
    s.sticker(note, 4, 0.15, tint(C.paper));
    s.stroke(note, { closed: true, w: 1.6 });
    s.text("ship it", 0.115, 0.475, 0.028, { weight: 500, rotate: -0.06 });
  },
  right(s) {
    s.washAll(tint(C.wall), 1);
    nicePoster(s);
    // a small shelf light above the desk
    s.line(0.2, 0, 0.2, 0.12, { w: 1.4 });
    s.stroke(s.ellipsePts(0.2, 0.15, 0.04, 0.03, Math.PI, Math.PI * 2, 14), { w: 2 });
    s.line(0.16, 0.15, 0.24, 0.15, { w: 2 });
    s.glow(0.2, 0.2, 0.12, "#fff1b8", 0.5);
  },
  floor(s) {
    s.washAll(tint(C.floor), 1);
    for (let i = 1; i < 7; i++) s.line(i / 7, 0, i / 7, 1, { w: 1.1, alpha: 0.32 });
    // the desk's shadow
    s.shadow([F(0.3, 0.03), F(0.9, 0.03), F(0.9, 0.36), F(0.3, 0.36)], 0.18, 16);
    // a couple of crumpled drafts
    for (const [a, b] of [
      [0.62, 0.55],
      [0.7, 0.64],
    ] as const) {
      const [x, y] = F(a, b);
      s.blob(x, y, 0.025, 0.021, tint(C.paper));
      s.scribble(s.ellipsePts(x, y, 0.018, 0.015, 0, Math.PI * 2, 10), 0.008, 1.1);
    }
  },
  popups: isoLayers([
    (iso) => {
      const T = 0.3; // desk height

      // plant in the corner
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

      // desk
      for (const [x, y] of [
        [0.31, 0.04],
        [0.87, 0.04],
        [0.31, 0.31],
        [0.87, 0.31],
      ] as const)
        iso.box(x, y, 0, 0.022, 0.022, T - 0.02, WHITE, { color: C.wood });
      iso.box(0.3, 0.03, T - 0.025, 0.6, 0.31, 0.025, WHITE, { color: C.wood });

      // devanta.net — laptop: screen first, then the base in front of it
      const LX = 0.32;
      const LW = 0.32;
      const SH = 0.23; // screen height
      iso.box(LX, 0.05, T, LW, 0.012, SH, WHITE, { color: C.device });
      const SY = 0.062;
      const scr: V3[] = [
        [LX + 0.015, SY, T + 0.02],
        [LX + LW - 0.015, SY, T + 0.02],
        [LX + LW - 0.015, SY, T + SH - 0.015],
        [LX + 0.015, SY, T + SH - 0.015],
      ];
      const site = image("devantaScreen");
      if (site) {
        // the real devanta.net homepage on screen
        iso.image(site, scr[3], scr[2], scr[0], (LW - 0.03) / (SH - 0.035));
        iso.path(scr, { w: 1.4, closed: true });
      } else {
        iso.face(scr, tint(C.screen), { w: 1.4 });
        iso.at([LX + LW / 2, SY, T + 0.155], (s, [x, y], u) => s.text("devanta", x, y, 0.065 * u));
        // a small factory roofline under the wordmark
        const R = (dx: number, dz: number): V3 => [LX + LW / 2 + dx, SY, T + dz];
        iso.path([R(-0.08, 0.04), R(-0.08, 0.07), R(-0.04, 0.095), R(-0.04, 0.07), R(0, 0.095), R(0, 0.07), R(0.04, 0.095), R(0.08, 0.095), R(0.08, 0.04)], {
          w: 1.5,
          closed: true,
        });
      }
      iso.box(LX, SY, T, LW, 0.17, 0.012, WHITE, { color: C.device });
      for (let i = 1; i <= 3; i++) iso.line([LX + 0.03, SY + i * 0.03, T + 0.012], [LX + LW - 0.03, SY + i * 0.03, T + 0.012], { w: 0.9, alpha: 0.5 });
      iso.mark("devanta", [scr[0], scr[1], scr[2], scr[3], [LX, SY + 0.17, T], [LX + LW, SY + 0.17, T]]);

      // Unscroll — the phone lies on the desk, screen up, showing the app; an hourglass beside it
      const PX = 0.68;
      const PY = 0.1;
      const PW = 0.1;
      const PL = 0.215;
      const PZ = T + 0.012; // top of the phone
      const app = image("unscrollScreen");
      iso.box(PX, PY, T, PW, PL, 0.012, WHITE, { color: "#3a3848" });
      const m = 0.007;
      const screen: V3[] = [
        [PX + m, PY + m, PZ],
        [PX + PW - m, PY + m, PZ],
        [PX + PW - m, PY + PL - m, PZ],
        [PX + m, PY + PL - m, PZ],
      ];
      if (app) iso.image(app, screen[0], screen[1], screen[3], (PW - 2 * m) / (PL - 2 * m));
      else iso.face(screen, tint(C.unscroll), { w: 1.2 });
      const HX = 0.85;
      const HY = 0.12;
      iso.disc(HX, HY, T, 0.04, tint(C.wood), { w: 1.4 });
      iso.cyl(HX, HY, T, 0.033, 0.06, WHITE, { color: C.sand, r2: 0.006 });
      iso.cyl(HX, HY, T + 0.06, 0.006, 0.06, WHITE, { color: C.unscroll, r2: 0.033 });
      iso.disc(HX, HY, T + 0.12, 0.04, tint(C.wood), { w: 1.4 });
      iso.mark("unscroll", [
        [PX, PY, PZ],
        [PX + PW, PY + PL, T],
        [PX, PY + PL, T],
        [0.89, 0.08, T + 0.13],
        [0.89, 0.16, T],
      ]);
    },
  ]).map((p) => ({ ...p, res: 2048 })), // real screens need the extra detail
};
