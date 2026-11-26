# Project log

Meaningful changes are recorded newest-first. Git remains the source for exact diffs.

## 2026-11-26 — Music and a spinning record in Cave

- Entering Cave now plays Apple's 30-second preview of *Devil In a New Dress* at low volume, with a now-playing pill and a pause button; the turntable's record spins while it plays. Leaving fades it out, and a manual pause is respected.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check of play, pause, leave and return with real clicks. Not deployed; Safari and iOS not yet tested.

## 2026-11-26 — Build the Contact room

- Drew Contact as a mail corner: a postcard with the email address, a GitHub tag, and a mailbox with letters. Removed the placeholder-room code now that every room is drawn.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check. Not deployed.
- Follow-ups: other contact channels or a résumé if wanted; the archive URL for Cave; a phone-width pass over all rooms; decide on deleting the old, unused Cave component and assets.

## 2026-11-26 — Build the Cave room

- Rebuilt Cave as a warm den: pegged polaroids of the owner's photos, a framed Virgil Abloh print, a cork board of recently watched films, a record player, and an ARCHIVE box that will link to the separate archive site. Content was carried over from the earlier Cave design; small image copies are in `src/assets/cave/`.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check of the room and its close-ups. Not deployed.
- Follow-ups: the archive site URL; whether to delete the unused old Cave component, scripts and full-size assets; the Contact room.

## 2026-11-24 — Joey's note, bowl and ball; the owner's bookshelf

- Named the cat Joey, with his note (food, a short fuse, ball-chasing), a food bowl and a ball. Drew the owner's books as titled spines and made the shelf a spot linking to Amazon searches.
- Verification: Chrome check of the room and the three notes; `tsc` on the changed files, Astro build and tests pass. `astro check` runs out of memory because of an untracked `apps/archive` project in the repository root (not created here, left untouched).
- Resolved the same day: the archive site, built separately by the owner with another agent and linked from Cave later, was moved out of the repository. `npm run check` and `npm run build` pass again.
- Follow-ups: choose specific Amazon editions or a storefront if wanted.

## 2026-11-24 — Figma illustrations for İlyas and the cat; drop hotspot boxes

- With the owner's authorization, generated two illustrations with Figma's image tool from text-only prompts (no photos sent): İlyas cross-legged with a laptop, and the tabby on its cushion, in the book's ink style and isometric angle. Added them to About as ink/wash cut-outs; the code-drawn figures remain as a fallback. Removed the tinted hotspot boxes everywhere.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check of the room and the close-up. Not deployed.
- Follow-ups: the cat's name; the owner's copy edits; a phone-width check of About.

## 2026-11-24 — Draw İlyas and the cat by hand; stop the load-time flash

- Replaced the photo-derived figures with code-drawn ones in the book's style (`figures.ts`, `Iso.standee`): İlyas cross-legged with a laptop in the corner, and the cat lying on a cushion beside him. Removed the photo cut-out pipeline and its assets.
- With JavaScript on, the page no longer shows the plain-HTML version while the book loads.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check of the room, both close-ups and the first paint. Not deployed.
- Follow-ups: owner feedback on the figures' likeness; the cat's name; copy edits.

## 2026-11-24 — Rebuild About as İlyas on the floor with the cat

- Following the owner's direction, replaced the framed portrait and armchair with İlyas sitting on the floor in the corner and the cat lying on a cushion beside him. Both figures come from new owner photos, processed locally; a friend in the source photo was masked out.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check of the room and the close-up. Not deployed.
- Follow-ups: a self-timer photo sitting in a corner would give a sharper, untrimmed figure; the cat's name; the owner's copy edits.

## 2026-11-24 — Draw the About room with İlyas and the cat

- Added cut-out figure support (`cutout.ts`, `Sketch.cutout`, `Iso.figure`) and the About room: framed ink portrait, bookshelf, 2018 note, rug, plant, lamp, and the cat on an armchair. Both figures come from the owner's photos, processed locally (Vision subject lift plus an ink/wash filter) after Codex image generation returned 403.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome desktop check of the room and both close-ups. Not deployed.
- Follow-ups: the cat's name; owner edits to the bio and cat copy; phone-width check; possibly redo the figures as true illustrations if Codex image access is restored.

## 2026-11-24 — Replace the close-up modal with a side note

- Close-ups no longer dim the scene. The object pans aside and a paper note sits beside it (bottom sheet on phones), and you can step between projects without leaving the close-up. The canvas went full-bleed, framed between header and caption. Rewrote the four Work descriptions with taglines and fact tags drawn from each product's own page.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check at desktop and phone widths. Not deployed.
- Follow-ups: owner to review the new copy (especially devanta's English tagline).

## 2026-11-23 — Real poster, calendar icon and a single phone in Work

- Removed the standing phone and the place card. The Unscroll screen now sits on one phone lying on the desk. The niceapps.club poster shows the site's real hero, and the Memento calendar uses the app icon as its picture. Added a corner radius to `Sketch.image` and per-room wall resolution.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check of the room and three zoomed views. Not deployed.

## 2026-11-23 — Put the real screens in the Work room

- Added image support to the drawing engine (`Sketch.image`, `Iso.image`, `images.ts` preloader, per-card texture resolution). The laptop shows a fresh devanta.net homepage capture; the phone stands on a stand and shows the Unscroll shield screen from the owner's app project.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check of the room and zoomed view. Not deployed.
- Follow-ups: the owner may pick a different Unscroll screen (other raw captures are in `doomscroll/output/`); a favicon is still missing.

## 2026-11-23 — Draw the Work room

- Drew Work in code with four self-labelled project objects: Memento calendar, niceapps.club poster, devanta.net laptop, and Unscroll phone, hourglass and place card. Added per-room project buttons under the caption and a hover name label so visitors can read the room without hunting. Tightened the open-room camera framing.
- Verification: check 0 diagnostics, empty Vitest suite, build passed; local Chrome check at desktop and phone widths, including button-to-close-up and Escape. Not deployed.
- Follow-ups: owner to confirm the four one-line descriptions; consider a full-bleed canvas so zoomed views aren't cut by the header and caption rows; arrow placement on phones.

## 2026-11-23 — Lay the pop-up book foundation

- Parked the uncommitted `new-design` work in a git stash and branched `unfold` from `master`.
- Adapted unfold's MIT core into `src/lib/unfold/` and ported its React Three Fiber scene to vanilla Three.js in `src/scripts/book/`; `/` now renders the book with four placeholder rooms (work, about, cave, contact), close-up dialogs, keyboard paging, a no-JS/screen-reader HTML version and reduced-motion support.
- Verification: check 0 diagnostics, empty Vitest suite, build passed with the Three.js chunk advisory; local browser check of open, page, zoom and close-up with no console errors. Not deployed.
- Follow-ups: draw each room in code with the owner; check mobile and reduced motion in the browser; revise AGENTS.md's design direction; decide what happens to the stashed `new-design` work and the old Cave component.

## 2026-09-05 — Publish the Cave redesign and final captions

- Replaced all nine photo captions verbatim in row-major order with the owner's final text. Published the full approved Cave redesign via Wrangler to the existing Worker and custom domains, version `82990b59-4070-431f-a8bd-9d23d6ee415b` (18 new/modified assets).
- Node 24 Astro check passed with no diagnostics; empty Vitest suite and production build passed, with the existing lazy Three.js chunk advisory. Both `ilyastorun.site` and `www.ilyastorun.site` returned HTTPS 200 with all nine captions in the correct order. Python's default user agent received 403; browser-user-agent curl requests succeeded.

## 2026-09-05 — Refine Cave stamps and selected-book framing

- Restored the previous coarse postage-stamp silhouette and placed each existing short note directly below its photograph in handwriting. Preserved reverse/location interaction. Scaled selected 3D books to 78% and raised their center to leave clearance above the control bar.
- Verification: Node 24 Astro check, empty Vitest suite and production build; desktop/mobile local browser inspection. No deployment.

## 2026-09-05 — Build the approved Cave comic archive

- Replaced the cork board with the owner-approved shadow-free comic composition, saved in `docs/design/cave-approved.png`. Isolated Cave markup/styles, moved editable content into `src/content/data/cave.ts`, preserved owner photos/book textures/film records, removed Tools and Coming soon, and added the supplied Virgil Abloh quote and a built-in Imagegen portrait edit (prompt saved in `docs/design/cave-artwork.md`).
- Added independent photo hover-lift/click-flip with handwritten backs, a physically unified draggable film strip with pause/keyboard controls, and lazy Three.js books with textured covers, curved spines, page blocks, selection and pointer/keyboard rotation. Added reduced-motion and no-JavaScript fallbacks.
- Node 24: Astro check passed without diagnostics; Vitest completed successfully with no test files; production build passed with a large dynamically imported Three.js chunk advisory. Local Chrome inspected at 1672×941 and 390×844; photo keyboard flip/Escape, film motion/pause, book selection/return, reduced motion, no-JS archive visibility, no horizontal overflow and no page errors passed. Exact physical book measurements and a production performance audit remain follow-ups. No deployment.

## 2026-08-30 — Make image-heavy cards arrive with their artwork

- Added explicit Astro image quality and display-sized responsive candidates across Home, About, and Cave; queued the next card's visible images in restrained batches; kept hidden 3D book textures inert until interaction; and stopped the music preview from downloading or attempting autoplay before its play button is used. In a production Worker preview at 390×844 with Slow 4G and 4× CPU, lab LCP improved from the deployed baseline's 13.49 s to 2.01 s with CLS at 0. A full Cave scroll reduced 20-second image transfer from 4.14 MB to 794 KB and pending images from 24 to 1. `npm run check`, the intentionally empty Vitest suite, production build, `git diff --check`, DOM/network assertions, and a mobile Cave visual inspection passed. Deployment: none.

## 2026-08-30 — Deploy the complete rebuilt portfolio

- Built and deployed the current Home, About, and Cave experience to the existing `ilyas-dev-portfolio` Cloudflare Worker. Wrangler uploaded 47 new or modified assets and published version `10fa2db3-0e8c-40e7-b772-598f78a12d11` to the Workers endpoint plus `ilyastorun.site` and `www.ilyastorun.site`. Pre-deploy Astro check passed with 0 diagnostics, the intentionally empty Vitest suite passed, `git diff --check` passed, and the production build completed. Post-deploy verification confirmed HTTPS 200 from both custom domains and found the current Cave heading, Coming soon marker, and MacBook asset in live HTML.

## 2026-08-30 — Turn the MacBook card into a transparent product object

- Replaced the Tech stack's black rectangular MacBook artwork with a genuine-alpha 1536×1024 three-quarter product render. The open laptop now exposes its keyboard, aluminum depth, and screen as a standalone physical object while preserving the existing three-item fan interaction. In-app inspection confirmed both the compact resting pile and expanded hover composition. The final asset was produced with the built-in image generation workflow from a product-render prompt; no deployment was performed.

## 2026-08-30 — Refine Cave's hierarchy and keep photos on the board

- Replaced the photo dialog with an in-place cork-board expansion of the original 3×3 stamp sheet, including Escape and red-pin closing plus restrained recession of the other artifacts. Removed the Cave kicker/summary and the movable Photos, Inspiration, and Tech stack labels; restyled the heading as an About-related cyan-brush masthead; softened the page field to lavender; added a taped “Coming soon” marker to Inspiration; enlarged the books/shelf; and moved the film strip left. Reduced Tech stack to MacBook, Codex, and Cursor using official/local PNG artwork while retaining its hover/focus fan. Verification: in-app visual inspection confirmed the resting Cave composition, Tech fan, in-place photo enlargement, recessed artifacts, and close behavior; Astro check (0 diagnostics), empty Vitest suite, production build, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-30 — Open Cave photographs as a physical contact sheet

- Turned the small 3×3 stamp cluster into a discoverable photo opener without adding a fixed board arrow: the cursor becomes a magnifier, the sheet subtly separates, and its attached label changes to “Open photos ↗”. Activating any stamp opens an accessible native dialog styled as a pinned physical contact sheet over the dimmed board, focuses the corresponding photograph, preserves hover/focus notes at a readable scale, fits all nine images against common desktop heights, and uses two columns on mobile. Escape, the handwritten close action, and backdrop clicks dismiss it; reduced-motion users skip the transitions. Verification: in-app visual inspection confirmed the resting hint, opened desktop contact sheet, selected note, complete 3×3 fit, and close behavior; Astro check (0 diagnostics), empty Vitest suite, production build, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-30 — Develop the owner's photographs as interactive stamps

- Replaced all nine Cave photo placeholders with the owner's supplied photographs while retaining the physical 3×3 postage-stamp construction. Each stamp is now an accessible control that lifts, straightens, and enlarges slightly on hover or keyboard focus; only its image darkens, an unboxed handwritten note and place line appear within the photograph, and neighboring stamps recede without disturbing the sheet. The initial English notes are explicitly provisional until the owner supplies final wording. Verification: in-app visual inspection confirmed the resting 3×3 sheet and first-stamp hover treatment; Astro check (0 diagnostics), empty Vitest suite, production build, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-30 — Arc Cave film ratings above their posters

- Raised the five independent film-rating stars clear of the hover poster and arranged them in a shallow centered arch, with the middle star highest and the outer stars progressively lower, matching the owner's drawn reference while preserving exact full- and half-star fills. Allowed this lightweight hover ornament to remain visible beyond the board edge without changing the poster's symmetric expansion. Verification: in-app visual inspection confirmed the raised arc; Astro check (0 diagnostics), empty Vitest suite, production build, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-30 — Remove fixed Cave directions and free the film rating

- Removed every fixed handwritten label, directional arrow, and movement hint from the Cave board because their pointers became misleading as clusters were rearranged. Kept the category labels attached to the movable objects themselves. Recentered the film hover projection on the strip so the full-ratio poster expands both upward and downward instead of appearing anchored at its lower edge. Removed the rating plaque entirely: five independent yellow stars now float just above the cover, using outlines for unearned stars and precise half fills where required. Verification: in-app visual checks of the annotation-free board plus *The Drama* hover state passed; Astro check (0 diagnostics), empty Vitest suite, production build, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-30 — Let Cave film posters break out of the strip

- Removed the three empty film exposures and the lower “Recently developed” badge, reduced both sprocket bands from 14% to 8%, and slowed the seven-film loop from 32 to 50 seconds. Moved the handwritten “recently watched” annotation outside the cork-board border with its arrow pointing back into the film area. Hover now pauses the strip and opens a full-ratio poster projection above and below it; a five-star overlay represents the owner's rating with exact half-star fills. The enlarged poster is a single lightweight shared preview updated from the local optimized image already under the pointer, so the interaction adds no 3D dependency or duplicate full-size content to the moving track. Verification: in-app visual inspection of the resting strip, *Ladies First* 1/5 state, and *The Drama* 3.5/5 half-star state passed; Astro check (0 diagnostics), empty Vitest suite, production build, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-29 — Developed seven real films into the Cave strip

- Replaced the first seven generic film exposures with the owner's supplied posters and five-point ratings, in order: *The Odyssey* (4), *Ladies First* (1), *The Drama* (3.5), *Marty Supreme* (3.5), *The Two Popes* (4), *The Zone of Interest* (3.5), and *About Elly* (3.5). Kept the final three exposures deliberately empty for future watches. Corrected the film-track geometry so posters occupy the full area between the sprocket bands, retained the seamless duplicated loop, and restyled hover information as a compact dark film-stock label rather than a detached comic sticker. The first sequence exposes semantic title/rating labels while the animation duplicate and empty frames stay hidden from assistive technology. Verification: Astro check (0 diagnostics), empty Vitest suite, production build, `git diff --check`, and in-app visual checks of the moving strip plus *The Odyssey* hover state passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-29 — Refined Cave shelf proportions and 3D book handling

- Matched the five resting books to the owner-specified thickness and height orders, removed the redundant lower `BOOKS` badge, and changed shelf hover so the selected spine rises while its lower edge remains behind the wooden shelf lip. Closed the CSS cuboid seam between each front cover and spine using edition-specific depth, brought the preview beside its source book, and added a hover bridge so the pointer can enter the preview without dismissing it. Pointer movement over the preview now gives the book a restrained inverse horizontal tilt plus a small vertical tilt; reduced-motion users retain the static state. Verification: in-app visual inspection confirmed the resting shelf, Pixar hover, continuous pointer transfer, and live model-angle updates; Astro check (0 diagnostics), empty Vitest suite, production build, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-29 — Built five exact 3D books from owner-prepared cover sheets

- Split the owner's four prepared cover sheets into fifteen clean local WebP textures: independent front, spine, and back faces for *Steve Jobs*, *Yaratıcı Eylem*, *Pixar ve Ötesine*, *Reset At*, and *Otostopçunun Galaksi Rehberi*. Replaced every CSS-drawn or raw-photo book with these textures, narrowed the resting volumes to realistic spine proportions, and retained the existing hover/focus/click CSS 3D behavior and board-drag isolation. *Otostopçunun Galaksi Rehberi* supersedes the earlier *Against Identity* selection. Verification: Astro check (0 diagnostics), empty Vitest suite, production build, `git diff --check`, and in-app visual checks of the resting shelf plus *Steve Jobs* and *Reset At* 3D previews passed; Wrangler emitted its known sandbox-only log-file permission warning during the standalone check. Deployment: none.

## 2026-08-29 — Replaced three Cave books with their photographed editions

- **Superseded:** all five shelf volumes now use the owner-prepared front/spine/back sheets described above; raw environmental photos and CSS placeholder covers are no longer rendered.
- Added the owner's front, back, and spine photographs for *Steve Jobs*, *Yaratıcı Eylem*, and *Pixar ve Ötesine*. The real cropped spines now sit on the shelf, while each book opens into a lightweight CSS 3D preview using the corresponding front, back, and spine photographs on hover, focus, or click. Board dragging ignores these controls, only one preview stays pinned open, and reduced-motion behavior remains respected. No generative reconstruction was used; the supplied wear, typography, and edition details are preserved. *Press Reset* and *Against Identity* remain placeholders pending the same three-photo set. Verification: Astro check (0 diagnostics), empty Vitest suite, production build, `git diff --check`, and in-app visual checks of the resting shelf plus the first two 3D previews passed; Wrangler emitted its known sandbox-only log-file permission warning during the standalone check. Deployment: none.

## 2026-08-29 — Put the owner's five books on the Cave shelf

- **Superseded in part:** the first three CSS reconstructions were replaced by owner-photographed editions in the entry above; the final two remain placeholders.
- Replaced six numbered placeholder volumes with five owner-selected books: Walter Isaacson's *Steve Jobs*, Rick Rubin's *The Creative Act*, Lawrence Levy's correctly titled *To Pixar and Beyond*, Jason Schreier's *Press Reset*, and Alexander Douglas's *Against Identity*.
- Reconstructed their common English-edition spine identities in CSS instead of hotlinking third-party listing photos: white minimalist biography, gray cloth creative manual with circle device, sky-blue Pixar memoir, blue/red game-industry paperback, and ivory/orange philosophy hardback. Full titles and authors are retained in semantic hidden text while the shelf displays abbreviated spine typography. Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare production build completed, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-28 — Give the Tech stack room and real labels

- Moved Cave's Tech stack to the board's far-right side and raised it from the lower edge, preserving more open space for its five-card hover/focus expansion on desktop and mobile.
- Replaced the generic HW/iOS/Web/Tools/Code labels with the owner's current working set: MacBook, Xcode, Swift, React, and Codex. Verification: Astro check, the empty test suite, production build, and `git diff --check` passed; Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-28 — Build Cave's Books cluster as a physical shelf

- Replaced the symbolic books-on-a-line treatment with a perspective wooden shelf made from a grained dimensional plank and two visible wall brackets. Six independently proportioned volumes now include muted cloth/paper covers, spine rules, inset shadows, exposed page blocks, subtle wear, and individual resting angles.
- Hovering a volume pulls it upward and toward the viewer while the full shelf remains one draggable board object. Titles remain numbered placeholders until the owner supplies real books. Verification: Astro check, the empty test suite, production build, and `git diff --check` passed; Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-28 — Give Cave photographs physical postage-stamp form

- Rebuilt the Photos cluster as nine individually mounted postage stamps rather than a generic dotted grid. Each placeholder now has a serrated silhouette, warm fibrous paper, inset printed-image well, denomination/index, date line, print grain, cast shadow, independent rotation, and selective cancellation ring.
- Kept the actual photography deliberately empty: the muted scenic color fields establish print behavior without pretending to be owner photographs and can be replaced directly when source images arrive. Verification: Astro check, the empty test suite, production build, and `git diff --check` passed; Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-28 — Recast watched films as an analog film strip

- Replaced Cave's circular poster orbit with a physical horizontal film strip: dark translucent stock, orange edge exposure, top and bottom sprocket holes, and ten distinct placeholder frames duplicated for a seamless developing-loop motion.
- Hover pauses the strip and brings a frame forward with a reserved title, rating, and one-line note treatment. Reduced motion leaves the strip stationary, and the cluster remains independently draggable with the rest of the board. No film titles or opinions were invented. Verification: Astro check, the empty test suite, production build, and `git diff --check` passed; Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-28 — Turn Cave into a movable personal board

- Superseded the category-selector/archive-preview experiment with a freeform cork board containing five independently movable clusters: a physical Books shelf, ten-poster Last watched orbit, 3×3 Photos stamp sheet, expanding Tech stack, and loose Inspiration fragments.
- Added bounded pointer dragging, arrow-key movement, active-layer elevation, resize clamping, mobile-safe vertical panning, responsive initial positions, handwritten edge annotations, and reduced-motion handling. Film posters orbit slowly only when motion is allowed; Tech cards spread outward only on hover/focus.
- Kept the foundation dependency-free and avoided inventing personal content. Film titles, ratings, notes, photographs, book covers, inspiration sources, and real hardware/software remain explicit placeholders until supplied by the owner; Three.js remains deferred to a specific preview that demonstrates the need. Observed the initial board at 1440×900, verified a real pointer drag of the Books shelf completed within bounds, and observed the clean 390×844 composition. Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare production build completed, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-28 — Rename the opening destination to Home

- Renamed the first two navigation labels from Work/About to Home/About me. The opening Spider-Man card is now explicitly treated as a welcome cover rather than a work section; professional work continues to live in the About me bento until a dedicated projects destination is designed.
- Removed the repeated starburst treatment from Home and Contact me. Home now uses a compact skewed yellow issue tab with a dark print edge, while Contact me is unboxed handwritten ink with a rough crimson underline. The `458 this year`-style burst remains reserved for emphatic statistics rather than general navigation.
- Observed the revised header in the complete Home composition at 1440×900. Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare production build completed, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-28 — Turn Work into a Spider-Man comic welcome panel

- Superseded the dialogue-heavy `Spider-Men II #1` experiment after owner review and replaced it with Artgerm's `Friendly Neighborhood Spider-Man #1` variant, stored as `src/assets/spider-man-artgerm.webp`. The horizontal crop excludes the cover logo while keeping a single Spider-Man looking directly toward the visitor; source: [Marvel's official cover reveal](https://www.marvel.com/articles/comics/friendly-neighborhood-spider-man-covers-revealed).
- Reduced the welcome treatment to three editable HTML/CSS speech balloons, switched their type from rounded UI lettering to heavy comic lettering, and moved the cluster across the image's left edge so the source finger-heart gesture remains visible. Removed the image's blue border, enlarged the visual, moved the handwritten scroll cue below its right edge, and softened the Work canvas from pure white to a quiet lavender-white paper surface related to About.
- Rebuilt Work and “Contact me” as irregular yellow comic bursts inspired by About's “this year” total, replacing the rectangular offset-shadow sticker treatment; inactive About/Cave links remain typographic and quiet. Observed the revised desktop composition at 1440×900 and used 390×844 renders to constrain the mobile image crop and move viewport-edge controls into safe bounds. Publication rights remain unresolved. Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare production build completed, and `git diff --check` passed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-27 — Repair Work/About navigation after adding Cave

- Reproduced the owner's recording and traced the broken opening state to two causes: About was translated by `108px` instead of a full `108%` card height, and stale `#about`/`#cave` fragments made the `overflow: hidden` sticky viewport scroll internally by nearly one card.
- Restored percentage-based off-canvas placement, split the 300svh stage into two exact transition segments, and changed the viewport to `overflow: clip` so it cannot become a fragment-scroll container. Card clicks no longer persist hashes; recognized stale hashes and browser scroll restoration are reset to Work at startup.
- Observed an old `/#about` URL opening cleanly on Work with zero window and viewport scroll. Programmatically verified the full bidirectional sequence `Work → About → Cave → About → Work`; the active link and top input layer matched at every endpoint. Verification: full checks follow in the same change. Deployment: none.

## 2026-08-27 — Add the empty Cave card scaffold

- Expanded the pinned transition stage from two cards to three and added an intentionally blank white Cave canvas after About. Its only content is a visually hidden semantic heading, leaving visual and content decisions open for the next design pass.
- Activated the Cave header link and mapped Work, About, and Cave to scroll endpoints `0`, `0.5`, and `1`. The controller now recedes/fades each outgoing card while the next rises, with discrete no-animation state changes under reduced motion.
- Observed the Cave endpoint locally at desktop width: Cave receives `aria-current="page"`, About is fully concealed, and no prior-card edge remains visible. Verification: Astro check passed with 0 diagnostics before the final wiki update; full tests and production build follow in the same change. Deployment: none.

## 2026-08-27 — Simplify the About masthead

- Replaced the yellow bordered title card and cyan/pink offset shadows with a dark-ink `ABOUT!` title over an irregular yellow brush stroke. Retained the kicker and converted the issue number into a small print-strip detail.
- Removed the sticker box from “meet the human →” and restyled it as a small handwritten margin note with one crimson brush underline, reducing repeated card-within-card styling and keeping the header inside the About panel's existing palette.
- Observed the complete About composition locally at desktop width; the quieter masthead remains legible without competing with the bento modules. Verification: Astro check passed with 0 diagnostics before the final wiki update; full tests and production build follow in the same change. Deployment: none.

## 2026-08-27 — Replace the Daily Bugle website backdrop with Reed at work

- Superseded the dark, text-heavy Daily Bugle newsroom treatment after owner review and replaced it with a brighter blue/white Reed Richards laboratory panel stored as `src/assets/reed-richards-work.jpg`. The character now remains visibly at work behind the project frame. Exact issue/artist attribution was not verified from the available Comic Vine image source, so publication use remains unresolved pending source and rights review.
- Removed the redundant “Extra! Extra!” line and separate “Open project” label. “What I’m building nowadays!” remains the single headline.
- Rebuilt the Screen Studio frame at a wide roughly 2:1 desktop ratio so it can be both larger and lower without being clipped by the fixed-height About canvas. Hover/focus expands it rightward and upward beyond the source card instead of growing into its center, while a small handwritten “scroll ↓” cue appears at the live frame's upper-right without intercepting iframe input.
- Removed the background scale that leaked Reed's artwork beyond the rounded panel, and moved the headline to the card's left-middle boundary. Normal and hover states were observed locally at desktop width, including the clipped background, uncropped preview, and scroll cue. Verification: full checks follow in the same change. Deployment: none.

## 2026-08-27 — Turn the website slot into a Daily Bugle live report

**Superseded by the Reed Richards website-panel treatment above.**

- Replaced the provisional three-site browser carousel with one current-project feature for Screen Studio at `https://screen-studio.pages.dev/`, headed “What I’m building nowadays!” and accompanied by a direct open-project link.
- Added a real 1982 Daily Bugle newsroom page drawn by Mike Zeck as the full-card editorial backdrop, sourced through the [Spokesman-Review's Daily Bugle feature](https://www.spokesman.com/stories/2013/apr/02/life-daily-bugle/) and stored as `src/assets/daily-bugle-newsroom.jpg`. Publication use remains subject to rights review.
- Built the current site into the lead-photo frame as a live iframe. The resting view is sepia/halftone; only the preview window's hover/focus removes the treatment, enlarges the frame, and enables interaction. The target returned no `X-Frame-Options` or blocking frame CSP on 2026-08-27, and both resting and live states were observed locally at desktop width.
- Verification: Astro check passed with 0 diagnostics before the final wiki update; full tests and production build follow in the same change. Deployment: none.

## 2026-08-27 — Make the app reveal icon-specific

- Replaced the whole-panel hover that opened all three app cards with three independent icon targets. Hover/focus now enlarges only the selected icon and opens one compact information balloon directly above it.
- Restyled the information balloons as broken-white comic callouts with black contours and cyan, orange, or yellow offset shadows sampled from the Galactus panel. Unscroll and Memento remain direct App Store links; the third app remains a keyboard-focusable in-review placeholder.
- Preserved the visible orbital interaction hint and reduced-motion handling. The Memento hover state was observed locally at desktop width and confirmed that the two unselected icons remain closed. Verification: Astro check passed with 0 diagnostics before the final wiki update; full tests and production build follow in the same change. Deployment: none.

## Earlier history

The detailed implementation history remains in Git commits. Earlier wiki entries were replaced because they described files intentionally removed during the reset.

Archived log months:

- [2026-08](archive/log-2026-08.md)
