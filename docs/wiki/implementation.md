# Implementation status

## 2026-11-26 — Contact room; all four rooms drawn (branch `unfold`, not deployed)

- `src/lib/unfold/rooms/contact.ts` is a small mail corner.
  - Left wall: a big pinned postcard ("say hello! projects, questions, or a nice app you found — write anytime"), with a stamp, a postmark and the address "to: İlyas Torun / ilyastorun.dev@gmail.com".
  - Right wall: a wall clock and a paper tag reading "GitHub @ilyastorunn" ("find me here, too").
  - Floor: a rug and a paper plane that has just landed.
  - Pop-ups: a plant, and a mailbox on a post with its flag up and letters in the slot.
- Spots: `email` (postcard and mailbox) and `github`. Only channels the owner has already published are used: the email from the old site, and GitHub. Other channels or a résumé can be added once the owner supplies them.
- The placeholder-room code in `rooms.ts` was removed; all four rooms now live in `src/lib/unfold/rooms/`.
- Verified in local Chrome at 1100×760: the room, the email close-up (link is `mailto:ilyastorun.dev@gmail.com`), and the next arrow disabled on the last room. `npm run check` (0 diagnostics), the empty test suite and `npm run build` pass.

## 2026-11-26 — Cave room (branch `unfold`, not deployed)

- `src/lib/unfold/rooms/cave.ts` is a warm, dim den, with lamp glow on both walls and the floor.
  - Left wall: the owner's nine photos as polaroids pegged to two sagging strings, with "things I've seen".
  - Right wall: a framed Virgil Abloh print with "“life is so short…” — Virgil Abloh" under it, and a cork board of the seven films watched lately ("lately watched").
  - Floor: warm planks and a rug.
  - Pop-ups: a floor lamp, a record player on a low cabinet, and a taped cardboard box marked ARCHIVE.
- Content comes from the earlier Cave design (`src/content/data/cave.ts`): photo captions, film ratings and the exact Virgil quote. It now lives in `src/lib/unfold/caveData.ts`. Small copies of the images are in `src/assets/cave/` (9 photos and 7 posters at 420 px on the long side, the portrait at 700 px; 728 KB in all). They load via `import.meta.glob`, are read with `caveImage(name)`, and render with `Sketch.image()`, so they appear when the room colours in.
- Spots: `photos` (captions as tags), `films` (titles with ★ ratings), `virgil` (the quote), `archive`. The archive note says the separate archive site is "opening soon" and has **no link yet**; add one once the owner has the URL. That site lives in its own folder outside this repository.
- The old `src/components/Cave.astro`, `src/scripts/cave*.ts` and the original assets in `src/assets/{photos,films,books}` are no longer used by `/`. They remain in the tree until the owner decides to remove them.
- Verified in local Chrome at 1100×760: the room, the photos, films and archive close-ups, and ←/→ stepping. `npm run check` (0 diagnostics), the empty test suite and `npm run build` pass.

## 2026-11-24 — No plain-HTML flash on load

- An inline head script adds `js` to `<html>`, and the book's loading layout ("sharpening pencils…") applies from `.js .stage`. The plain-HTML content stays visually hidden but readable by screen readers from the first paint. If WebGL is unavailable or start-up throws, the script removes `js` and the plain-HTML page shows. Previously that content was visible until the book finished loading (reported by the owner).

## 2026-11-24 — About room with İlyas and the cat (branch `unfold`, not deployed)

- Owner direction: İlyas sits on the floor in the corner with his laptop, and his cat lies on a small cushion beside him. `src/lib/unfold/rooms/about.ts`:
  - Left wall: a window with an evening sky, and a handwritten "that's me" pointing into the corner.
  - Right wall: a bookshelf and a pinned "C++ class, 2018, still going" note.
  - Floor: a round rug with soft contact shadows under both figures.
  - Pop-ups: İlyas, the cat on its cushion, a floor lamp and a plant.
  - Spots `ilyas` and `cat` have draft notes in `spots.ts`.
- **Figures are Figma-generated illustrations.** They were made with the owner's authorization, using the Figma MCP `generate_image` tool (`gpt-image-2.5-flare`, Figma AI credits on his student team). The source file is "ily.dev — About room figures" in his Figma drafts.
  - The prompts were text-only. No photos were uploaded; the tool takes no reference images. They describe him (short dark side-swept hair with faded sides, full beard, hoop earring, nose ring, tee, trousers, white trainers, laptop) and the brown tabby on a pink cushion.
  - Both are in blue-fineliner ink with pastel washes, in an isometric three-quarter view from the front-right at ~30°, so they match the room's camera.
  - Local processing: the white background was flood-filled to transparency and each image cropped to its subject, giving `src/assets/about/ilyas.webp` (576×836) and `cat.webp` (816×798). The cat image includes its cushion.
- Rendering: `cutout.ts` splits each illustration into wash, ink and mask layers, and `Sketch.cutout()` draws them onto an `Iso.standee()` card. So the figures are line art while the room is in the background and colour in when it comes to the front, like everything else. The ink threshold was tightened (`(140 − lum)/60`) so blue jeans stay wash. If an image fails to load, the code-drawn stand-ins in `src/lib/unfold/figures.ts` are used.
- Earlier attempts the same day were rejected or superseded:
  - Codex image generation: HTTP 403 on the owner's account.
  - Photo cut-outs with an ink filter: too realistic, inconsistent scale.
  - Head-on code-drawn figures: wrong angle, too dark, too large.
- Hotspots no longer tint their bounding boxes. unfold's "breathing" hint drew grey slabs behind objects, which the owner flagged. Spots are now found through the pointer cursor, the hover name label and the room's buttons.
- Verified in local Chrome at 1100×760: room render and the İlyas close-up; check, empty test suite and build pass, and both WebP files are emitted.
- **Joey and the bookshelf.** The cat is Joey: he loves food, is a bit aggressive, and adores chasing a ball. His note, label and fact tags say so, and a food bowl with kibble and a ball sit by his cushion.
  - The top shelf holds the owner's books as titled spines: *Steve Jobs*, *The Creative Act*, *Shoe Dog*, *Dune*, *Dune Messiah* and *Children of Dune*. The shelf is a third spot, `books`, whose note links each title to an **Amazon search** (amazon.com, books category). Search links were used instead of guessed product pages; switch to specific editions or amazon.com.tr if the owner wants.
  - The About walls bake at 2048 px so the spine titles stay legible.
- Verified in Chrome: the Joey and bookshelf close-ups, all four links, and ←/→ stepping across the three spots. `tsc` on the changed files, the Astro build and the empty test suite pass. For a while `astro check` ran out of memory: a separate archive site (`apps/archive`, ~690 MB with its own `node_modules`) had been placed inside this repository, and `tsconfig.json` includes `**/*`. The owner moved it to its own folder outside the repository, after which `npm run check` (0 diagnostics) and `npm run build` pass again.

## 2026-11-24 — Close-up notes and project copy (branch `unfold`, not deployed)

- `<dialog data-book-note>` opens non-modally with `show()`. It is a tilted paper card with ruled lines and tape, showing kicker, title, a highlighted tagline, body, fact tags, a link and an "n / 4" count. On open, focus goes to the note; on close, it returns to the button that opened it. The room name and line fade out while a note is open; the project buttons stay, and the active one is underlined.
- Scene: the canvas is now full-bleed under the header and caption. `insets()` keeps the book framed between them, which also fixes close-ups being cut at those rows. Zoomed views pan the object 19% of the width to the left (16% of the height upwards on screens narrower than 640 px). Narrow screens zoom less (×3.1 instead of ×3.6). The zoom target glides between spots (`zoomCur`).
- `spots.ts` gained `tagline` and `facts`. Work copy was rewritten from each product's own page: the Memento App Store listing (tagline "Make time visible."), Unscroll's marketing notes and site ("Close the feed. Open your day."), the niceapps.club site ("Find something nice.") and devanta.net. devanta's tagline is an English adaptation of its Turkish closing line. The copy avoids counts that will go stale.
- Verified in local Chrome at 1100×760 and 390×844: open-room framing, button → close-up, ←/→ stepping (count and arrow labels update), Escape closes and restores the room arrows. Check, empty test suite and build pass. Real-mouse drag and screen-reader output were not tested.

## 2026-11-23 — Work room: one phone, real poster and calendar icon

- Owner feedback: the standing phone plus the blue "Unscroll" place card read as two phones. The stand, the standing phone and the place card are gone; a single phone lies on the desk, screen up, showing the Unscroll shield screen. Its name now comes from the screen, the caption button and the hover label.
- The niceapps.club poster on the right wall is now the site's real hero (`src/assets/work/niceapps-hero.jpg`, captured at 1280 px width on 2026-11-23 and cropped to the hero). The Memento wall calendar has Memento's app icon (`src/assets/memento-icon.jpg`, rounded corners) as its picture, above the month and the day grid.
- `Sketch.image()` takes an optional corner `radius`. `Room.res` lets a room bake its walls at a higher resolution; Work uses 2048 px.
- Verified in local Chrome at 1100×760: the open room, plus the zoomed Unscroll, Memento and niceapps.club views. Check, empty test suite and build pass, and all four image assets are emitted.

## 2026-11-23 — Real screens in the Work room

- The laptop now shows the real devanta.net homepage and the phone (now standing on a stand, screen out) shows the real Unscroll app. The images are `src/assets/work/devanta-screen.jpg` (1024×640, captured from devanta.net at 1440×900 on 2026-11-23) and `src/assets/work/unscroll-screen.jpg` (416×900, from the owner's `doomscroll/output/strict-hard-mode-1.3.3/shield-normal.png`, the blocked-app shield with the Unscroll mark).
- `src/lib/unfold/images.ts` loads these before the book is baked. Rooms read them with `image(key)` and fall back to the hand-drawn version if one fails. `Sketch.image()` and `Iso.image()` (ily.dev additions, not in unfold) affine-map a cover-cropped image onto a surface parallelogram in the wash layer, so a screen appears only when its room colours in, like any other colour.
- `PopUp.res` lets a card bake at a higher resolution; Work's desk card bakes at 2048 px so the screens stay sharp when the camera zooms in.
- Verified in local Chrome at 1100×760: both screens render in the open room and in the Unscroll zoom; check, empty test suite and build pass, and both JPEGs are emitted into `dist/client/_astro`. The only console error is a pre-existing `/favicon.ico` 404 (there is no `public/` folder).

## 2026-11-23 — Work room (branch `unfold`, not deployed)

- `src/lib/unfold/rooms/work.ts` is the first finished room. Each project is an object that names itself: **Memento** is a wall calendar on the left wall (current month, today circled); **niceapps.club** is a poster on the right wall with its "find something nice." line and three dot mascots; **devanta.net** is the wordmark plus a factory roofline on the laptop screen; **Unscroll** is a face-down phone, an hourglass and a place card on the desk. A plant, a pinned "ship it" note, a lamp and crumpled drafts are decoration.
- `spots.ts` gained `label` and `kicker`; Work has one spot per project (`memento`, `unscroll`, `niceapps`, `devanta`). One-line descriptions are drafts for the owner to confirm. Memento's and Unscroll's lines come from the parked `new-design` work, niceapps.club's from its own site, and devanta.net's is a summary of its site.
- Discoverability: under the caption, every room lists its spots as buttons (focus moves the camera to the object, then opens the close-up), and hovering an object shows a handwritten name label. The single "look closer" button is gone.
- The open-book camera is framed tighter than unfold (`viewH 1.7 + 0.45e`, `viewW 1.9 + 0.5e` on desktop) so the open room fills more of the view.
- Verified locally in Chrome at 1100×760 and 390×844: room render, readable labels, button → zoom → close-up, Escape returns focus to the button; check, empty test suite and build pass. When zoomed, the canvas is visibly cut at the header and caption rows; on phones the arrows overlap the room walls.

## 2026-11-23 — Pop-up book foundation (branch `unfold`, not deployed)

- `/` is now the pop-up book; the previous comic/Cave Home is replaced on this branch only (`master` and production are unchanged). `src/components/Cave.astro`, `src/scripts/cave*.ts` and `src/content/data/cave.ts` remain but are no longer rendered.
- `src/lib/unfold/` holds the adapted unfold core (MIT, `LICENSE` alongside): `fold.ts` (page angles, creased floor, camera focus), `sketch.ts` (hand-drawn 2D renderer and `bake()` texture packing), `iso.ts` (isometric pop-up cards), `style.ts`, `paperMaterial.ts` (paper shader with ink-to-colour reveal), `textures.ts`.
- `src/lib/unfold/rooms.ts` defines four **placeholder** rooms — work, about, cave, contact — each with a wall wash, a clickable framed card (`s.mark("main")`), a "coming soon" note and a pop-up table. `spots.ts` holds the close-up copy per room/mark (placeholder text plus existing public links). `fold.ts` `N` must equal `ROOMS.length`.
- `src/scripts/book/scene.ts` ports unfold's R3F `<Book>` to plain three.js (Line2 outlines, raycast hotspots, a radial shadow plane instead of drei `ContactShadows`). `src/scripts/book/index.ts` handles fonts, open/close, arrows, keys, drag, captions, a live region and the `<dialog>` close-up.
- Accessibility/fallbacks added beyond unfold: without JS or WebGL the page renders a readable HTML version of all rooms; once the book starts that content stays available to screen readers. A "look closer" button opens each room's close-up by keyboard. `prefers-reduced-motion` makes folds, camera moves and hotspot breathing instant.
- Verified: `npm run check` (0 diagnostics), `npm test` (no tests), `npm run build` (Three.js large-chunk advisory). Local in-app browser at 800×600: cover, opening, paging, pop-up table, card zoom and close-up, Escape; no console errors. Not verified: mobile widths, reduced-motion behaviour in a browser, no-JS rendering, screen readers, performance.

## 2026-09-05 — Cave comic archive (deployed 2026-09-05)

- `src/components/Cave.astro` replaces the movable cork board with the approved `docs/design/cave-approved.png` layout: a large left photo panel, upper-right film strip, books below, and a single Inspiration portrait/quote panel. Colored offset shadows and Tech/Coming soon content are removed.
- Cave content lives in `src/content/data/cave.ts`. Existing photographs, book editions, film titles and ratings are preserved. No content collection schema is active.
- Photos use the previous coarse postage-stamp edge, with the existing short note handwritten below each image on the front. Hover lift and click/Enter flip remain available for reverse notes/location; Escape restores the front. Reduced motion uses a direct face change. Selected 3D books are scaled down and raised above the controls so their entire cover remains visible.
- Film perforations, frame numbers and posters share one translating track. Pointer dragging, hover/focus pause, explicit pause, arrow keys, and reduced motion are supported. Animation stops while the Cave card is inactive or the tab is hidden.
- `src/scripts/cave-books.ts` loads Three.js only on Cave entry or shelf interaction. Actual front/back/spine textures cover separate rounded cover boards, curved spines and page blocks. Selection brings a book forward for pointer or keyboard rotation; Escape returns focus. Photographic spine buttons remain as WebGL fallback. Book proportions use photographed aspect ratios and estimated relative heights, not measured physical dimensions.
- The owner's Virgil portrait was edited with built-in Imagegen; asset and prompt provenance are in `docs/design/cave-artwork.md`. The exact owner-supplied quote is selectable HTML.
- Desktop and mobile use independent layouts. A no-JavaScript fallback exposes the stacked cards and archive content.
- Local Chrome verification covered desktop 1672×941 and mobile 390×844, photo flip/Escape, film motion/pause, book selection/keyboard return, reduced motion, no horizontal overflow, no-JavaScript visibility and no page errors. No screen-reader or production-performance audit was performed. Three.js emits a large-chunk advisory but is dynamically loaded.

Production version `82990b59-4070-431f-a8bd-9d23d6ee415b` includes the final nine captions verbatim. Both custom domains returned HTTPS 200 and the exact caption sequence after deployment.

## Earlier implementation notes

The following describes earlier milestones; the Cave section above supersedes conflicting scaffolding/content-removal statements.

## Verified current state

- The previous portfolio implementation has been removed from the working tree.
- Surviving application/tooling files are the Astro, TypeScript, Vitest, Wrangler, npm, and environment type configuration.
- `src/pages/index.astro` contains the responsive header and split hero.
- `src/assets/spider-verse-hero-2x.png` is a deterministic 2944×1656 Lanczos upscale of the supplied frame and is rendered through Astro's optimized `Image` component with variants up to 2400 px.
- Vite excludes Astro's virtual `astro:assets` module from dependency optimization to keep Cloudflare local SSR startup stable.
- Home media now sets explicit Astro image quality: `high` for the hero and `mid` for supporting artwork. Cave films, photographs, book spines/previews, and Tech objects use display-sized `widths`/`sizes` candidates instead of intrinsic-resolution transforms.
- About images are requested in small batches after the hero finishes loading; Cave images are queued late in the About transition or immediately when Cave navigation is selected. Hidden book front/back/spine preview textures remain inside inert templates until their book receives pointer or keyboard interaction.
- The MF DOOM audio preview uses `preload="none"` and downloads only after the explicit play control is activated; entering About no longer attempts autoplay.
- The home route uses one 300svh transition stage and a pinned 100svh viewport. A small requestAnimationFrame controller maps bounded scroll progress across two independent one-viewport transitions, Work → About and About → Cave; each outgoing card recedes/fades while the next translates over it, preventing cards from dropping back into normal flow mid-transition.
- Work, About, and Cave header links map to progress endpoints `0`, `0.5`, and `1` with native smooth scrolling and update `aria-current` from observed card progress.
- Card links intentionally do not persist URL fragments. The sticky viewport uses `overflow: clip`, not `overflow: hidden`, so stale `#about`/`#cave` URLs cannot make the browser scroll the card layer itself and corrupt its visual starting position. Recognized stale fragments and browser scroll restoration are cleared on initialization; the page opens on Work.
- Cave currently exists as an intentionally empty white `site-canvas` with a visually hidden semantic heading. It is structural scaffolding rather than an approved content or visual direction.
- The first visual includes a handwritten scroll cue with an inline decorative SVG arrow; its nudge animation is disabled under reduced motion.
- About uses a 12-column, three-row desktop CSS Grid with deliberately unequal panel spans. At mobile width it becomes a two-column auto-row grid inside an independently scrollable card; dominant and personal panels span both columns.
- About's current biography, location, focus, and personal-interest language is scaffold copy, not verified owner content.
- The hero image is non-destructively graded with CSS filters and indigo overlays; the source PNG remains unchanged.
- The folder prototype, its interaction controller/tests, and its placeholder destination routes have been removed.
- No content schema, content data, notes, API endpoint, GitHub integration, modal logic, or portfolio media remains.
- Git history remains available locally, with `master` currently at the pre-reset project history.

## Important paths

- Runtime configuration: [`astro.config.mjs`](../../astro.config.mjs)
- Cloudflare configuration: [`wrangler.jsonc`](../../wrangler.jsonc)
- Dependencies and scripts: [`package.json`](../../package.json)
- TypeScript configuration: [`tsconfig.json`](../../tsconfig.json)
- Test runner configuration: [`vitest.config.ts`](../../vitest.config.ts)
- Future application source: [`src/`](../../src/)

## Verification

Current verification:

- `npm run check` passed with 0 errors, warnings, or hints.
- `npm test` passes with the intentionally empty test suite.
- Desktop at 1440×900 and mobile at 390×844 were inspected in the local browser; mobile has no horizontal overflow.
- The initial and mid-scroll states of the sticky card transition were observed at both viewport sizes.
- `npm run build` completed the Cloudflare server build successfully after the final hero pass. Wrangler emitted a sandbox-only log-file permission warning without failing the build.
- A production Worker preview at 390×844, Slow 4G, and 4× CPU reduced lab LCP from the deployed baseline's 13.49 s to 2.01 s with CLS remaining 0. After scrolling through Cave and waiting 20 seconds, image transfer fell from 4.14 MB to 794 KB and pending images fell from 24 to 1. No audio request occurred without pressing play, and Cave was visually inspected after loading.

The current Home, About, and Cave implementation was deployed to the `ilyas-dev-portfolio` Worker on 2026-08-30. Both configured custom domains returned HTTPS 200 and the production HTML exposed the current Cave heading, Coming soon marker, and generated MacBook asset.

## Follow-ups

- Decide Cave's content and visual direction on top of the existing third-card scaffold.
- Decide whether MDX, sitemap, and Vitest integrations are needed for the new implementation.
- Add content and media only when supplied or intentionally authored for the new version.
- Deploy the verified image-performance changes before treating the improved measurements as the live-site baseline.
