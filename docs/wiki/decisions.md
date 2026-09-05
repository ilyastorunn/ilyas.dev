# Decisions

Durable decisions are reverse chronological. “Owner” means an explicit decision by İlyas.

## 2026-09-05 — Implement the approved shadow-free Cave comic design

**Status:** owner approved; local implementation

The approved Imagegen reference is saved at `docs/design/cave-approved.png`. Preserve its layout closely while using actual owner media. Remove all colored offset shadows, the cork board, Tools and Coming soon. Photographs lift on hover and flip on click, exposing handwritten notes. Film perforations travel with the strip. Books use real Three.js geometry and owner-supplied cover photos; physical measurements are not available, so exact dimensions remain unresolved. A monochrome comic version of the supplied Virgil Abloh portrait and the exact supplied quote fill the Inspiration panel. No deployment was authorized.

## 2026-08-26 — Establish About as an asymmetric comic bento

**Status:** verified foundation; content unresolved

The owner approved an asymmetric bento foundation for About that extends the comic concept without repeating the hero. The implementation uses one dominant biography panel, smaller Right now and Based in panels, a halftone discipline panel, and a quieter Outside the work panel that can later lead into Cave. Comic styling is concentrated in selected accents rather than applied to every surface. All personal copy remains provisional until the owner supplies specific facts.

Evidence: current owner instruction; desktop and mobile local browser observations; [`src/pages/index.astro`](../../src/pages/index.astro).

## 2026-08-26 — Simplify the hero header and teach scrolling

**Status:** verified implementation

The owner removed the repeated top-left name from the hero, renamed the visible email action to “Contact me,” and kept section navigation only where it maps to card-transition targets. Work and About are active destinations; Cave remains visibly disabled until its card exists. A small handwritten “swipe down, please :)” cue with a hand-drawn arrow appears at the image's lower right so first-time visitors can discover the vertical interaction.

Evidence: current owner instruction; desktop local browser observation; [`src/pages/index.astro`](../../src/pages/index.astro).

## 2026-08-26 — Use a native-scroll vertical card stack

**Status:** verified implementation

The owner chose a vertical carousel-like section model driven by native scroll. Cards now share a pinned viewport: the active card continuously shrinks and fades while the following card rises over it, and the completed state contains only the new card. This avoids the earlier sticky boundary where the hero resumed normal page movement and remained visible above About. About currently exists only as a neutral transition shell; its content and comic/bento treatment are deferred until the hero is approved. The horizontal hero image is color-graded toward the darker, muted indigo character of the supplied vertical frame.

Evidence: current owner instruction; desktop and mobile local browser observations; [`src/pages/index.astro`](../../src/pages/index.astro).

## 2026-08-26 — Test a full-width Spider-Verse hero

**Status:** active experiment

The owner asked to compare the split hero against a version where the horizontal Spider-Verse frame occupies the complete hero. The restrained white canvas and header remain; visible intro copy and availability were removed from the hero, leaving the two comic captions as its editorial voice. The horizontal composition is preserved on mobile rather than converted to a portrait crop.

Evidence: current owner instruction; responsive local browser render; [`src/pages/index.astro`](../../src/pages/index.astro).

## 2026-08-26 — Begin with a split portfolio hero

**Status:** superseded by active experiment

The owner chose to preserve the supplied portfolio reference's restrained structure instead of making the Spider-Verse image full-bleed. The first screen uses professional copy on the left and the horizontal image on the right, with the captions “That’s all it is, İlyas.” and “Make something beautiful.” Work, About, and Cave remain visual previews until their content exists.

Evidence: current owner instruction; responsive local browser render; [`src/pages/index.astro`](../../src/pages/index.astro).

## 2026-08-26 — Remove folder-first navigation

**Status:** verified

The owner rejected the folder-first navigation prototype and chose to start again from the minimal foundation. The folder component, its hover/tap interaction model, placeholder destination routes, interaction controller, and tests were removed. The later split-hero decision supersedes the temporary minimal page that followed.

Evidence: owner instruction; source history; the later split-hero implementation in [`src/pages/index.astro`](../../src/pages/index.astro).

## 2026-08-26 — Folder-first navigation

**Status:** superseded

The owner chose to move directly from sketching to a working web prototype. The landing page contains only a centered folder. Hover opens it on pointer devices; focus and tap provide equivalent access. The revealed directory uses real links rather than a decorative-only animation, with Work and Cave as folders, About as a text file, and Contact as a URL/mail action.

Evidence: owner instruction; the subsequent removal of the prototype files from the working tree; source history.

## 2026-08-26 — Temporary production foundation

**Status:** verified

The owner chose to publish a minimal “Hello World” page first, connect `ilyastorun.site` through Cloudflare, and evolve the portfolio collaboratively from that live foundation. Both the apex and `www` hostnames target the `ilyas-dev-portfolio` Worker; the Cloudflare Free plan and Cloudflare nameservers are active.

Evidence: owner instruction; successful Wrangler deployment; live DNS and HTTPS verification.

## 2026-08-26 — Clean application reset

**Status:** verified

The owner chose to keep the technical foundation and remove the previous portfolio implementation and content so the site can be rebuilt from scratch. Preserved infrastructure includes Astro, TypeScript, Vitest, Wrangler, npm manifests, Git history, and repository operating instructions. Removed material includes application source, routes, content, tests, media, old design/spec documents, and generated build/tool state.

Evidence: current owner instruction; repository inventory after cleanup; [`README.md`](../../README.md).

## 2026-08-26 — Git remote status

**Status:** verified

The local Git repository has no configured remote. The local commit history was preserved, but the project is not currently connected to a GitHub repository.

Evidence: `git remote -v` returned no entries; `.git/config` contains no remote section.

## Earlier portfolio decisions

**Status:** superseded for implementation

The earlier portfolio decisions remain recoverable through Git history but no longer describe active source files. Do not use them as implementation requirements without a new owner decision.
