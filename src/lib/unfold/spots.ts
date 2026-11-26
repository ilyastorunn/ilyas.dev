// What opens when a spot in a room is clicked. Keyed by room id, then by the mark name the
// room drew with s.mark()/iso.mark(). `label` is the visible name used for the project buttons
// under the caption and for the hover label. Order here is the order of those buttons and of
// stepping through them in the close-up.
//
// Copy is drawn from each product's own page (App Store listing, site, marketing notes); keep it
// factual and avoid numbers that will go stale.

import { CAVE_FILMS, CAVE_PHOTOS, CAVE_SONG, VIRGIL_QUOTE, stars } from "./caveData";

export type SpotLink = { label: string; href: string };
export type Spot = {
  label: string;
  /** small line above the title, e.g. "iOS app" */
  kicker?: string;
  title: string;
  /** the product's own line, set apart under the title */
  tagline?: string;
  body: string;
  /** two or three short facts shown as tags */
  facts?: string[];
  links?: SpotLink[];
};

export const SPOTS: Record<string, Record<string, Spot>> = {
  work: {
    memento: {
      label: "Memento",
      kicker: "iOS app",
      title: "Memento Calendar",
      tagline: "Make time visible.",
      body: "Your year, month or week as a quiet grid of days — filled for the days behind you, open for the ones ahead. Add timelines for projects, seasons or goals and keep one on your Home Screen. No streaks, no check-ins, no account: just a calm reminder of how time moves.",
      facts: ["Home Screen widgets", "Custom timelines", "Local-first"],
      links: [{ label: "View on the App Store", href: "https://apps.apple.com/tr/app/memento-takvim/id6757344347?l=tr" }],
    },
    unscroll: {
      label: "Unscroll",
      kicker: "iOS app",
      title: "Unscroll",
      tagline: "Close the feed. Open your day.",
      body: "A deliberate pause between you and the apps that pull you in. Unscroll shields them with Screen Time for as long as you choose, runs Focus sessions, and offers Hard Mode for the moments you don't want an easy way out. Protected time turns into visible progress.",
      facts: ["Screen Time shields", "Focus & Hard Mode", "iPhone"],
      links: [{ label: "View on the App Store", href: "https://apps.apple.com/tr/app/unscroll-ekran-s%C3%BCresi/id6766120727?l=tr" }],
    },
    niceapps: {
      label: "niceapps.club",
      kicker: "website",
      title: "niceapps.club",
      tagline: "Find something nice.",
      body: "A hand-picked collection of iOS apps worth opening, browsable by category and kept by a small club of three. Its Creative Studio brings the collection into your AI workflow through an MCP server, as references for planning better App Store screenshots.",
      facts: ["Curated iOS apps", "Creative Studio MCP"],
      links: [{ label: "Visit niceapps.club", href: "https://niceapps.club" }],
    },
    devanta: {
      label: "devanta.net",
      kicker: "studio",
      title: "devanta",
      tagline: "Websites that work as hard as the factory.",
      body: "A small studio building websites for industrial manufacturers — agricultural machinery, trailers, hydraulics, process plants. Every site starts from one question: can a buyer find the right product and ask for a quote? Built multilingual for export customers.",
      facts: ["For manufacturers", "Product finder & quotes", "Multilingual"],
      links: [{ label: "Visit devanta.net", href: "https://devanta.net" }],
    },
  },
  about: {
    // Draft copy built from the owner's earlier About text; awaiting his edits and the cat's name.
    ilyas: {
      label: "İlyas",
      kicker: "about me",
      title: "Hey, I'm İlyas.",
      tagline: "Independent developer.",
      body: "I design and build thoughtful products for the web and iOS: small, calm apps that respect people's time, and websites that do their job quietly. It started with a C++ class in 2018 and never really stopped.",
      facts: ["web & iOS", "since 2018"],
      links: [{ label: "GitHub", href: "https://github.com/ilyastorunn" }],
    },
    cat: {
      label: "Joey",
      kicker: "roommate",
      title: "Joey",
      tagline: "Food first. Questions later.",
      body: "A brown tabby with very round eyes, a serious appetite and a short fuse. He lives for dinner, lives slightly more for a ball to chase, and will happily bite the hand that throws it.",
      facts: ["food enthusiast", "ball chaser", "mildly aggressive"],
    },
    books: {
      label: "bookshelf",
      kicker: "reading",
      title: "On the shelf",
      tagline: "Books I keep coming back to.",
      body: "Stories about people who made things their own way, and one very long one about sand.",
      links: [
        { label: "Steve Jobs — Walter Isaacson", href: "https://www.amazon.com/s?k=Steve+Jobs+Walter+Isaacson&i=stripbooks" },
        { label: "The Creative Act: A Way of Being — Rick Rubin", href: "https://www.amazon.com/s?k=The+Creative+Act+A+Way+of+Being+Rick+Rubin&i=stripbooks" },
        { label: "Shoe Dog — Phil Knight", href: "https://www.amazon.com/s?k=Shoe+Dog+Phil+Knight&i=stripbooks" },
        { label: "Dune trilogy — Frank Herbert", href: "https://www.amazon.com/s?k=Dune+trilogy+Frank+Herbert&i=stripbooks" },
      ],
    },
  },
  cave: {
    photos: {
      label: "photos",
      kicker: "photos",
      title: "Things I've seen",
      tagline: "Pegged up so I don't forget them.",
      body: "A few frames from home, İstanbul, Konya and one very loud night at a Coldplay concert.",
      facts: CAVE_PHOTOS.map((p) => p.note),
    },
    films: {
      label: "films",
      kicker: "films",
      title: "Lately watched",
      tagline: "Rated honestly, out of five.",
      body: "What has been on the screen recently, from the very good to the one I'd rather forget.",
      facts: CAVE_FILMS.map((f) => `${f.title} ${stars(f.rating)}`),
    },
    virgil: {
      label: "Virgil",
      kicker: "inspiration",
      title: "Virgil Abloh",
      tagline: "A reminder I keep on the wall.",
      body: `“${VIRGIL_QUOTE}.”`,
    },
    music: {
      label: "record",
      kicker: "now spinning",
      title: CAVE_SONG.title,
      tagline: CAVE_SONG.artist,
      body: `From ${CAVE_SONG.album}. A 30-second preview plays while you're in the Cave; pause it any time from the player at the bottom.`,
      links: [{ label: "Listen on Apple Music", href: CAVE_SONG.link }],
    },
    archive: {
      label: "archive",
      kicker: "archive",
      title: "The archive",
      tagline: "Everything else lives here.",
      body: "A separate little site for everything that doesn't fit on these walls: more photos, notes, films and books. Opening soon.",
    },
  },
  contact: {
    email: {
      label: "email",
      kicker: "email",
      title: "Say hello",
      tagline: "The inbox is always open.",
      body: "Projects, questions, collaborations, or just a nice app you found — send it over. Email is the easiest way to reach me.",
      links: [{ label: "ilyastorun.dev@gmail.com", href: "mailto:ilyastorun.dev@gmail.com" }],
    },
    github: {
      label: "GitHub",
      kicker: "code",
      title: "GitHub",
      tagline: "Where the code lives.",
      body: "Side projects and experiments, in public.",
      links: [{ label: "github.com/ilyastorunn", href: "https://github.com/ilyastorunn" }],
    },
  },
};
