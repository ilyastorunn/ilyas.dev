// What hangs in the Cave: the owner's photos (with his own captions) and the films he has
// watched lately (with his ratings), carried over from the earlier Cave design in
// src/content/data/cave.ts. `file` is the image name in src/assets/cave.

export const CAVE_PHOTOS = [
  { file: "photo-passing-by", note: "they're watching us, v1", place: "Konya, Türkiye" },
  { file: "photo-night-watch", note: "they're watching us, v2", place: "Konya, Türkiye" },
  { file: "photo-for-the-love", note: "cousin's home", place: "Home" },
  { file: "photo-slow-afternoon", note: "resting time", place: "A slow afternoon" },
  { file: "photo-looking-up", note: "skyscrapper, really", place: "İstanbul, Türkiye" },
  { file: "photo-golden-hour", note: "sweet nature", place: "Golden hour" },
  { file: "photo-after-closing", note: "apocalypse", place: "İstanbul, Türkiye" },
  { file: "photo-coldplay", note: "best night of my life", place: "Coldplay" },
  { file: "photo-wide-eyes", note: "meet my boy, joey", place: "Home" },
];

export const CAVE_FILMS = [
  { file: "film-the-odyssey", title: "The Odyssey", rating: 4 },
  { file: "film-ladies-first", title: "Ladies First", rating: 1 },
  { file: "film-the-drama", title: "The Drama", rating: 3.5 },
  { file: "film-marty-supreme", title: "Marty Supreme", rating: 3.5 },
  { file: "film-the-two-popes", title: "The Two Popes", rating: 4 },
  { file: "film-the-zone-of-interest", title: "The Zone of Interest", rating: 3.5 },
  { file: "film-about-elly", title: "About Elly", rating: 3.5 },
];

/** "★★★½" for 3.5 */
export const stars = (r: number) => "★".repeat(Math.floor(r)) + (r % 1 ? "½" : "");

export const VIRGIL_QUOTE =
  "Life is so short you can't waste even a day subscribing to what someone thinks you can do versus knowing what you can do";
