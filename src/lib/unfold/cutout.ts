// Turns a blue-ink illustration (on white, or a PNG with transparency) into the three layers a pop-up card
// needs (added for ily.dev; not in unfold):
//   wash – the illustration itself, cropped to the figure
//   ink  – its dark ink lines as alpha, so the figure is line art until its room colours in
//   mask – the figure's silhouette (white that touches the border is background; white inside
//          the figure, such as a t-shirt, stays paper)

export type Cutout = { wash: HTMLCanvasElement; ink: HTMLCanvasElement; mask: HTMLCanvasElement; aspect: number };

const cache = new WeakMap<object, Cutout>();

const BG = 238; // lighter than this, and connected to the border, counts as background

export function cutoutOf(img: CanvasImageSource & { width: number; height: number }): Cutout {
  const hit = cache.get(img);
  if (hit) return hit;

  const W = img.width;
  const H = img.height;
  const src = document.createElement("canvas");
  src.width = W;
  src.height = H;
  const sc = src.getContext("2d", { willReadFrequently: true })!;
  sc.drawImage(img, 0, 0);
  const px = sc.getImageData(0, 0, W, H).data;

  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) lum[i] = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2];

  // A PNG with transparency already says what the background is; for an opaque image,
  // flood-fill the white background in from the border.
  const bg = new Uint8Array(W * H);
  let transparent = false;
  for (let i = 0; i < W * H; i++)
    if (px[i * 4 + 3] < 128) {
      bg[i] = 1;
      transparent = true;
    }
  const stack: number[] = [];
  const push = (i: number) => {
    if (!bg[i] && lum[i] > BG) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  if (!transparent) {
    for (let x = 0; x < W; x++) push(x), push((H - 1) * W + x);
    for (let y = 0; y < H; y++) push(y * W), push(y * W + W - 1);
  }
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % W;
    if (x > 0) push(i - 1);
    if (x < W - 1) push(i + 1);
    if (i >= W) push(i - W);
    if (i < W * (H - 1)) push(i + W);
  }

  // crop to the figure
  let x0 = W;
  let y0 = H;
  let x1 = 0;
  let y1 = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (!bg[y * W + x]) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  if (x1 <= x0 || y1 <= y0) {
    x0 = y0 = 0;
    x1 = W - 1;
    y1 = H - 1;
  }
  const cw = x1 - x0 + 1;
  const ch = y1 - y0 + 1;

  const mk = () => {
    const c = document.createElement("canvas");
    c.width = cw;
    c.height = ch;
    return c;
  };
  const wash = mk();
  const ink = mk();
  const mask = mk();
  // the wash is multiplied in, so transparent pixels must read as white paper
  const wc = wash.getContext("2d")!;
  wc.fillStyle = "#fff";
  wc.fillRect(0, 0, cw, ch);
  wc.drawImage(src, x0, y0, cw, ch, 0, 0, cw, ch);

  const ic = ink.getContext("2d")!;
  const mc = mask.getContext("2d")!;
  const id = ic.createImageData(cw, ch);
  const md = mc.createImageData(cw, ch);
  for (let y = 0; y < ch; y++)
    for (let x = 0; x < cw; x++) {
      const s = (y + y0) * W + (x + x0);
      const o = (y * cw + x) * 4;
      // ink: dark and strongly blue (the #2b1fd6 fineliner), so pastel blues in the wash —
      // a navy sweater, a sky — stay colour rather than turning into ink
      const r = px[s * 4];
      const b = px[s * 4 + 2];
      const dark = Math.min(1, Math.max(0, (140 - lum[s]) / 60));
      const blue = Math.min(1, Math.max(0, (b - r - 40) / 80));
      id.data[o + 3] = Math.round(255 * dark * blue);
      if (!bg[s]) {
        md.data[o] = md.data[o + 1] = md.data[o + 2] = 255;
        md.data[o + 3] = 255;
      }
    }
  ic.putImageData(id, 0, 0);
  mc.putImageData(md, 0, 0);

  const out = { wash, ink, mask, aspect: cw / ch };
  cache.set(img, out);
  return out;
}
