// What opens when a spot in a room is clicked. Keyed by room id, then by the mark name the
// room drew with s.mark()/iso.mark(). `label` is the visible name used for the project buttons
// under the caption and for the hover label. Order here is the order of those buttons and of
// stepping through them in the close-up.
//
// Copy is drawn from each product's own page (App Store listing, site, marketing notes); keep it
// factual and avoid numbers that will go stale.

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
      label: "the cat",
      kicker: "roommate",
      title: "The cat",
      tagline: "Head of quality control.",
      body: "A brown tabby with very round eyes and strong opinions about the tops of wardrobes. Supervises most of my work, ideally from somewhere higher than the desk.",
      facts: ["tabby", "professional napper"],
    },
  },
  cave: {
    main: {
      label: "look closer",
      title: "the personal archive",
      body: "Photos, books, music and the things I keep. This room is still being drawn.",
    },
  },
  contact: {
    main: {
      label: "look closer",
      title: "say hello",
      body: "The easiest way to reach me is by email.",
      links: [
        { label: "ilyastorun.dev@gmail.com", href: "mailto:ilyastorun.dev@gmail.com" },
        { label: "GitHub", href: "https://github.com/ilyastorunn" },
      ],
    },
  },
};
