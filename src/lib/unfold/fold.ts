// Adapted from unfold by Dakshi (https://github.com/Dksie09/unfold), MIT License — see ./LICENSE.
// Geometry of the half-fan pop-up book.
//
// Pages radiate from a vertical spine at the origin. Page k sits at angle phi[k]
// (measured from +x towards +z). Physical room p lives between page p and page p+1.
// Its floor is a square creased along the diagonal: when the walls are 90° apart the
// floor lies flat, and as they close the crease rises like a tent.

export const N = 4; // rooms (must match ROOMS in rooms.ts)
export const L = 1; // page width (spine to outer edge)
export const H = 1; // page height
const RIGHT_ANGLE = Math.PI / 2;

export const smooth = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};

export const dirOf = (a: number): [number, number, number] => [Math.cos(a), 0, Math.sin(a)];
/** Unit vector pointing from page at angle a into the room on its +angle side. */
export const normalOf = (a: number): [number, number, number] => [-Math.sin(a), 0, Math.cos(a)];

/** How much physical room i is "the focused room" (1 = fully in front). */
export const focusOf = (i: number, f: number) => smooth(1 - Math.abs(i - f));

/**
 * Page angles for focus position f (physical, 0..N-1, continuous) and book openness (0..1).
 * The focused room always gets a right angle; the rest of the half circle is shared out
 * between the other rooms, falling off with distance so far rooms fold flat into stacks.
 */
export function pageAngles(f: number, open: number): number[] {
  const span = Math.PI;
  const b: number[] = [];
  const g: number[] = [];
  let sb = 0;
  let sg = 0;
  for (let i = 0; i < N; i++) {
    const d = Math.abs(i - f);
    const bb = smooth(1 - d);
    b.push(bb);
    sb += bb;
    const gg = (1 - bb) * Math.exp(-0.9 * d) + 1e-4;
    g.push(gg);
    sg += gg;
  }
  const rest = span - RIGHT_ANGLE * sb;
  const phi = [0];
  for (let i = 0; i < N; i++) phi.push(phi[i] + (RIGHT_ANGLE * b[i] + (rest * g[i]) / sg) * open);
  return phi;
}

/** Angle the camera should look along for focus f (centre of the focused room). */
export function focusAngle(phi: number[], f: number): number {
  const i0 = Math.max(0, Math.min(N - 2, Math.floor(f)));
  const fr = Math.max(0, Math.min(1, f - i0));
  const ca = (phi[i0] + phi[i0 + 1]) / 2;
  const cb = (phi[i0 + 1] + phi[i0 + 2]) / 2;
  return ca + (cb - ca) * fr;
}

/**
 * Apex of the creased floor between walls at angles a and b.
 * Solves |P| = L√2 and |P − L·dirA| = |P − L·dirB| = L, with P in the bisector plane.
 */
export function floorApex(a: number, b: number): [number, number, number] {
  const th = Math.min(b - a, RIGHT_ANGLE);
  const u = dirOf((a + b) / 2);
  const x = L / Math.cos(th / 2);
  const y = Math.sqrt(Math.max(0, 2 * L * L - x * x));
  return [u[0] * x, y, u[2] * x];
}

/** 0 when the room's walls are shut, 1 when they're at a right angle. */
export function roomOpenness(phi: number[], p: number) {
  return Math.min(1, (phi[p + 1] - phi[p]) / RIGHT_ANGLE);
}

/** Logical room index (0 = first room after the cover) ↔ physical slot. */
export const physicalOf = (logical: number) => N - 1 - logical;
export const logicalOf = (physical: number) => N - 1 - physical;
