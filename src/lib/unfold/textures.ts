// Adapted from unfold by Dakshi (https://github.com/Dksie09/unfold), MIT License — see ./LICENSE.
import type * as THREE from "three";
import { bake } from "./sketch";
import { ROOMS, drawBackCover, drawFrontCover } from "./rooms";

type RoomTextures = { left: THREE.Texture; right: THREE.Texture; floor: THREE.Texture; popups: THREE.Texture[] };
export type BookTextures = { rooms: RoomTextures[]; front: THREE.Texture; back: THREE.Texture };

const WALL = 1024;
const POP = 512;
const POP_CUTOUT = 1024;

/** Draws every surface of the book. Indexed by logical room (0 = first room after the cover). */
export function buildTextures(font: string): BookTextures {
  const rooms = ROOMS.map((room, i) => ({
    left: bake(room.res ?? WALL, 100 + i * 10, font, true, room.left),
    right: bake(room.res ?? WALL, 101 + i * 10, font, true, room.right),
    floor: bake(WALL, 102 + i * 10, font, true, room.floor),
    popups: room.popups.map((p, j) => bake(p.res ?? (p.halo ? POP_CUTOUT : POP), 200 + i * 10 + j, font, false, p.draw, p.halo ?? 0)),
  }));
  return {
    rooms,
    front: bake(WALL, 7, font, true, drawFrontCover),
    back: bake(WALL, 8, font, true, drawBackCover),
  };
}
