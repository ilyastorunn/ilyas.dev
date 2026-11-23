// Real images used inside the drawings (screens, photos). They are loaded before the book is
// baked; a room draws a hand-drawn stand-in when its image is missing (no JS on the server, a
// failed request).

import devantaScreen from "../../assets/work/devanta-screen.jpg?url";
import unscrollScreen from "../../assets/work/unscroll-screen.jpg?url";
import niceappsHero from "../../assets/work/niceapps-hero.jpg?url";
import mementoIcon from "../../assets/memento-icon.jpg?url";

const SOURCES = {
  devantaScreen,
  unscrollScreen,
  niceappsHero,
  mementoIcon,
} as const;

export type ImageKey = keyof typeof SOURCES;

const loaded: Partial<Record<ImageKey, HTMLImageElement>> = {};

/** The image if it has loaded, otherwise undefined. */
export const image = (key: ImageKey) => loaded[key];

/** Load every image; resolves even when some fail. */
export async function loadImages() {
  await Promise.all(
    (Object.keys(SOURCES) as ImageKey[]).map(async (key) => {
      const img = new Image();
      img.decoding = "async";
      img.src = SOURCES[key];
      try {
        await img.decode();
        loaded[key] = img;
      } catch {
        /* keep the drawn stand-in */
      }
    }),
  );
}
