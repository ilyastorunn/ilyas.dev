// Adapted from unfold by Dakshi (https://github.com/Dksie09/unfold), MIT License — see ./LICENSE.
// Colour helpers for the drawings: everything is ink line art with a soft pastel wash.

/** How far the pastel palette is pulled towards white, so the colour stays a hint. */
const SOFTEN = 0.25;

/** Mix a hex colour towards white. */
export function soften(hex: string, amt = SOFTEN) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.round(v + (255 - v) * amt);
  return `#${((ch((n >> 16) & 255) << 16) | (ch((n >> 8) & 255) << 8) | ch(n & 255)).toString(16).padStart(6, "0")}`;
}

/** A wash colour, softened so the colour stays a hint. */
export const tint = (c: string) => soften(c);

/** Darken a hex colour (k < 1), for the shaded sides of coloured furniture. */
export function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(v * k)));
  const r = ch((n >> 16) & 255);
  const g = ch((n >> 8) & 255);
  const b = ch(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
