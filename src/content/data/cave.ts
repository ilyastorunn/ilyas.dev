import steveJobsFront from "../../assets/books/final/steve-jobs-front.webp";
import steveJobsBack from "../../assets/books/final/steve-jobs-back.webp";
import steveJobsSpine from "../../assets/books/final/steve-jobs-spine.webp";
import pixarBeyondFront from "../../assets/books/final/pixar-beyond-front.webp";
import pixarBeyondBack from "../../assets/books/final/pixar-beyond-back.webp";
import pixarBeyondSpine from "../../assets/books/final/pixar-beyond-spine.webp";
import creativeActFront from "../../assets/books/final/creative-act-front.webp";
import creativeActBack from "../../assets/books/final/creative-act-back.webp";
import creativeActSpine from "../../assets/books/final/creative-act-spine.webp";
import pressResetFront from "../../assets/books/final/press-reset-front.webp";
import pressResetBack from "../../assets/books/final/press-reset-back.webp";
import pressResetSpine from "../../assets/books/final/press-reset-spine.webp";
import hitchhikersGuideFront from "../../assets/books/final/hitchhikers-guide-front.webp";
import hitchhikersGuideBack from "../../assets/books/final/hitchhikers-guide-back.webp";
import hitchhikersGuideSpine from "../../assets/books/final/hitchhikers-guide-spine.webp";
import theOdysseyPoster from "../../assets/films/the-odyssey.png";
import ladiesFirstPoster from "../../assets/films/ladies-first.png";
import theDramaPoster from "../../assets/films/the-drama.png";
import martySupremePoster from "../../assets/films/marty-supreme.png";
import theTwoPopesPoster from "../../assets/films/the-two-popes.png";
import theZoneOfInterestPoster from "../../assets/films/the-zone-of-interest.png";
import aboutEllyPoster from "../../assets/films/about-elly.png";
import nightWatchPhoto from "../../assets/photos/night-watch.jpeg";
import passingByPhoto from "../../assets/photos/passing-by.jpeg";
import slowAfternoonPhoto from "../../assets/photos/slow-afternoon.jpeg";
import coldplayPhoto from "../../assets/photos/coldplay.png";
import lookingUpPhoto from "../../assets/photos/looking-up.jpeg";
import afterClosingPhoto from "../../assets/photos/after-closing.jpeg";
import forTheLovePhoto from "../../assets/photos/for-the-love.jpeg";
import goldenHourPhoto from "../../assets/photos/golden-hour.jpeg";
import wideEyesPhoto from "../../assets/photos/wide-eyes.jpeg";
export const shelfBooks = [
  {
    slug: "jobs",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    front: steveJobsFront,
    back: steveJobsBack,
    spine: steveJobsSpine,
    height: "94%",
    width: "10%",
    rotation: "-3deg",
    depth: "clamp(0.84rem, 1.3vw, 1.18rem)",
    previewScale: "1",
  },
  {
    slug: "creative",
    title: "Yaratıcı Eylem",
    author: "Rick Rubin",
    front: creativeActFront,
    back: creativeActBack,
    spine: creativeActSpine,
    height: "86%",
    width: "6.2%",
    rotation: "-1deg",
    depth: "clamp(0.52rem, 0.8vw, 0.72rem)",
    previewScale: "0.91",
  },
  {
    slug: "pixar",
    title: "Pixar ve Ötesine",
    author: "Lawrence Levy",
    front: pixarBeyondFront,
    back: pixarBeyondBack,
    spine: pixarBeyondSpine,
    height: "86%",
    width: "8.8%",
    rotation: "2deg",
    depth: "clamp(0.74rem, 1.14vw, 1.02rem)",
    previewScale: "0.91",
  },
  {
    slug: "reset",
    title: "Reset At",
    author: "Jason Schreier",
    front: pressResetFront,
    back: pressResetBack,
    spine: pressResetSpine,
    height: "80%",
    width: "7.4%",
    rotation: "0deg",
    depth: "clamp(0.64rem, 0.98vw, 0.88rem)",
    previewScale: "0.84",
  },
  {
    slug: "hitchhikers",
    title: "Otostopçunun Galaksi Rehberi",
    author: "Douglas Adams",
    front: hitchhikersGuideFront,
    back: hitchhikersGuideBack,
    spine: hitchhikersGuideSpine,
    height: "90%",
    width: "11.5%",
    rotation: "3deg",
    depth: "clamp(0.95rem, 1.5vw, 1.35rem)",
    previewScale: "0.96",
  },
];

export const watchedFilms = [
  { title: "The Odyssey", rating: 4, poster: theOdysseyPoster },
  { title: "Ladies First", rating: 1, poster: ladiesFirstPoster },
  { title: "The Drama", rating: 3.5, poster: theDramaPoster },
  { title: "Marty Supreme", rating: 3.5, poster: martySupremePoster },
  { title: "The Two Popes", rating: 4, poster: theTwoPopesPoster },
  {
    title: "The Zone of Interest",
    rating: 3.5,
    poster: theZoneOfInterestPoster,
  },
  { title: "About Elly", rating: 3.5, poster: aboutEllyPoster },
];

export const cavePhotos = [
  {
    image: passingByPhoto,
    note: "they're watching us, v1",
    place: "Konya, Türkiye",
    position: "top",
  },
  {
    image: nightWatchPhoto,
    note: "they're watching us, v2",
    place: "Konya, Türkiye",
    position: "bottom",
  },
  {
    image: forTheLovePhoto,
    note: "cousin's home",
    place: "Home",
    position: "bottom",
  },
  {
    image: slowAfternoonPhoto,
    note: "resting time",
    place: "A slow afternoon",
    position: "top",
  },
  {
    image: lookingUpPhoto,
    note: "skyscrapper, really",
    place: "İstanbul, Türkiye",
    position: "bottom",
  },
  {
    image: goldenHourPhoto,
    note: "sweet nature",
    place: "Golden hour",
    position: "top",
  },
  {
    image: afterClosingPhoto,
    note: "apocalypse",
    place: "İstanbul, Türkiye",
    position: "top",
  },
  {
    image: coldplayPhoto,
    note: "best night of my life",
    place: "Coldplay",
    position: "bottom",
  },
  { image: wideEyesPhoto, note: "meet my boy, joey", place: "Home", position: "top" },
];
