// The rooms of İlyas's pop-up book.
//
// Finished rooms live in ./rooms/. The rest are deliberately plain placeholder rooms that only
// prove the mechanism (wall wash, a framed card that can be clicked, one pop-up table); the real
// drawings are made room by room with the owner.
//
// Canvas conventions (inherited from unfold; all coordinates are 0..1, y grows downwards):
//   left wall  – the room's corner is at x = 1, the floor at y = 1
//   right wall – the room's corner is at x = 0, the floor at y = 1
//   floor      – the corner is bottom-left (0, 1); the right wall runs along the bottom
//                edge, the left wall up the left edge; the corner nearest you is top-right
//   pop-ups    – built with isoLayers(); room coordinates are [xa, xb, z] where xa runs along
//                the right wall, xb along the left wall and z is height (all 0..1)

import type { Pt, Sketch } from "./sketch";
import { isoLayers, WHITE } from "./iso";
import { tint } from "./style";
import { workRoom } from "./rooms/work";
import { aboutRoom } from "./rooms/about";

/** res overrides the texture size (px) for cards carrying fine detail such as real screens. */
export type PopUp = { size: number; at: [number, number]; draw: (s: Sketch) => void; halo?: number; res?: number };
export type Room = {
  /** Stable id, also used to look up the room's spots. */
  id: string;
  name: string;
  mood: string;
  left: (s: Sketch) => void;
  right: (s: Sketch) => void;
  floor: (s: Sketch) => void;
  popups: PopUp[];
  /** Texture size (px) for the two walls and the floor; defaults to 1024. */
  res?: number;
};

type Palette = { wall: string; floor: string; card: string; wood: string };

/** A framed card on the left wall that opens the room's close-up. */
function framedCard(s: Sketch, p: Palette, label: string) {
  const card = s.rectPts(0.2, 0.22, 0.5, 0.36);
  s.sticker(card, 8);
  s.fill(s.rectPts(0.225, 0.245, 0.45, 0.31), tint(p.card), { alpha: 1, jitter: 0.4 });
  s.box(0.2, 0.22, 0.5, 0.36, null, { w: 3 });
  s.text(label, 0.45, 0.4, 0.065);
  s.mark("main", card);
}

function placeholderRoom(id: string, name: string, mood: string, p: Palette): Room {
  return {
    id,
    name,
    mood,
    left(s) {
      s.washAll(tint(p.wall), 1);
      framedCard(s, p, name);
      s.star(0.86, 0.2, 0.024, { w: 2 });
      s.star(0.9, 0.31, 0.015, { w: 1.8 });
    },
    right(s) {
      s.washAll(tint(p.wall), 1);
      s.text("coming soon", 0.42, 0.34, 0.05, { weight: 500, rotate: -0.05 });
      s.line(0.26, 0.4, 0.58, 0.39, { w: 1.6, alpha: 0.7 });
    },
    floor(s) {
      s.washAll(tint(p.floor), 1);
      for (let i = 1; i < 6; i++) s.line(i / 6, 0, i / 6, 1, { w: 1.1, alpha: 0.35 });
    },
    popups: isoLayers([
      (iso) => {
        const top = 0.26;
        // a small table: four legs and a top
        for (const [x, y] of [
          [0.36, 0.36],
          [0.62, 0.36],
          [0.36, 0.58],
          [0.62, 0.58],
        ] as const)
          iso.box(x, y, 0, 0.025, 0.025, top - 0.02, WHITE, { color: p.wood });
        iso.box(0.34, 0.34, top - 0.025, 0.32, 0.27, 0.025, WHITE, { color: p.wood });
      },
    ]),
  };
}

export const ROOMS: Room[] = [
  workRoom,
  aboutRoom,
  placeholderRoom("cave", "cave", "the personal archive", { wall: "#eef5ec", floor: "#e6dcc8", card: "#dff0d4", wood: "#e2ccab" }),
  placeholderRoom("contact", "contact", "say hello", { wall: "#fbf4e4", floor: "#ecd9bf", card: "#fff3b5", wood: "#ead3b2" }),
];

// ---------------------------------------------------------------------------

export function drawFrontCover(s: Sketch) {
  s.rect(0.07, 0.07, 0.86, 0.86, { w: 3 });
  s.text("İlyas Torun", 0.5, 0.42, 0.12);
  s.text("independent developer", 0.5, 0.55, 0.055, { weight: 500 });
  const swash: Pt[] = [];
  for (let i = 0; i <= 24; i++) swash.push([0.3 + (i / 24) * 0.4, 0.62 + Math.sin(i / 3.2) * 0.006]);
  s.stroke(swash, { w: 2.2, overshoot: 0 });
}

export function drawBackCover(s: Sketch) {
  s.rect(0.07, 0.07, 0.86, 0.86, { w: 3 });
}
