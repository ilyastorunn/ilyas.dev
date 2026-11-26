// The rooms of İlyas's pop-up book.
//
// Each room lives in ./rooms/ and is drawn with the owner, one at a time.
//
// Canvas conventions (inherited from unfold; all coordinates are 0..1, y grows downwards):
//   left wall  – the room's corner is at x = 1, the floor at y = 1
//   right wall – the room's corner is at x = 0, the floor at y = 1
//   floor      – the corner is bottom-left (0, 1); the right wall runs along the bottom
//                edge, the left wall up the left edge; the corner nearest you is top-right
//   pop-ups    – built with isoLayers(); room coordinates are [xa, xb, z] where xa runs along
//                the right wall, xb along the left wall and z is height (all 0..1)

import type { Pt, Sketch } from "./sketch";
import { workRoom } from "./rooms/work";
import { aboutRoom } from "./rooms/about";
import { caveRoom } from "./rooms/cave";
import { contactRoom } from "./rooms/contact";

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
  /** A record that can spin, placed over one drawn on a pop-up: room point [xa, xb, z] and radius. */
  spinner?: { at: [number, number, number]; r: number };
};

export const ROOMS: Room[] = [
  workRoom,
  aboutRoom,
  caveRoom,
  contactRoom,
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
