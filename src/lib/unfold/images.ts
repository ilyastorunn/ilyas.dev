// Real images used inside the drawings (screens, photos). They are loaded before the book is
// baked; a room draws a hand-drawn stand-in when its image is missing (no JS on the server, a
// failed request).

import devantaScreen from "../../assets/work/devanta-screen.jpg?url";
import unscrollScreen from "../../assets/work/unscroll-screen.jpg?url";
import niceappsHero from "../../assets/work/niceapps-hero.jpg?url";
import mementoIcon from "../../assets/memento-icon.jpg?url";
import ilyasFigure from "../../assets/about/ilyas.webp?url";
import catFigure from "../../assets/about/cat.webp?url";

const SOURCES = {
  devantaScreen,
  unscrollScreen,
  niceappsHero,
  mementoIcon,
  ilyasFigure,
  catFigure,
} as const;

export type ImageKey = keyof typeof SOURCES;

// Cave's prints, posters and portrait: small copies in src/assets/cave, keyed by file name
// without the extension (e.g. "photo-golden-hour", "film-about-elly", "virgil").
const CAVE: Record<string, string> = Object.fromEntries(
  Object.entries(import.meta.glob<string>("../../assets/cave/*.jpg", { eager: true, query: "?url", import: "default" })).map(([path, url]) => [
    path.split("/").pop()!.replace(/\.jpg$/, ""),
    url,
  ]),
);

const loaded = new Map<string, HTMLImageElement>();

/** The image if it has loaded, otherwise undefined. */
export const image = (key: ImageKey) => loaded.get(key);

/** A Cave image by file name (see above), if it has loaded. */
export const caveImage = (name: string) => loaded.get(`cave:${name}`);

/** Load every image; resolves even when some fail. */
export async function loadImages() {
  const all: [string, string][] = [
    ...Object.entries(SOURCES),
    ...Object.entries(CAVE).map(([name, url]) => [`cave:${name}`, url] as [string, string]),
  ];
  await Promise.all(
    all.map(async ([key, src]) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      try {
        await img.decode();
        loaded.set(key, img);
      } catch {
        /* keep the drawn stand-in */
      }
    }),
  );
}
