# Project log

Meaningful changes are recorded newest-first. Git remains the source for exact diffs.

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

## 2026-08-27 — Replace the generated app locker with Kirby machinery

- Superseded the generated invention-lab background after owner review and replaced it with the Galactus Space Station panel from *Fantastic Four* #49, sourced through [Marvel's official KirbyTech feature](https://www.marvel.com/articles/comics/the-most-miraculous-machines-of-kirbytech-inc) and stored as `src/assets/galactus-space-station-ff49.webp`.
- Removed the detached CSS shutter entirely. Hover/focus now reveals only the three larger app cards, which rise from the station's lower machinery and fan across neighboring panels without leaving a part below the source card.
- Added three always-visible, enlarged app-icon signals across the panel's middle-lower planets, with dashed orbital rings and restrained floating motion. Their cyan, orange, and yellow borders/shadows are sampled from the comic panel; on hover/focus they enlarge once before the full cards open, providing a stronger visual hint without explanatory copy. The revealed card icons are larger and preserve the same palette. Orbit and launch motion are disabled under reduced motion.
- Preserved the verified App Store destinations, third-app placeholder, closed-state concealment, keyboard/touch focus access, and reduced-motion behavior. The normal and hover states were observed locally at desktop width. Publication use of the Marvel panel remains subject to rights review.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, and the Cloudflare production build completed. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-27 — Rebuild the app reveal as a gadget locker

- Replaced the flat yellow folder treatment with an original text-free retro-comic invention-lab illustration stored as `src/assets/gadget-locker-original.png`.
- Added a mechanical lower shutter that opens on hover/focus while Unscroll, Memento, and the explicit in-review placeholder rise from the bay as larger physical product cards and fan across neighboring panels.
- Kept the two verified App Store destinations, touch/keyboard focus access, closed-state concealment, and reduced-motion behavior. The normal and hover compositions were observed locally at desktop width, and the closed layout was observed at 390×844.
- Verification: Astro check passed with 0 diagnostics before the final reduced-motion addition; full tests and production build follow in the same change. Deployment: none.

## 2026-08-27 — Open up the GitHub scanner composition

- Replaced the text-heavy provisional *X-Men* #7 background with an original, text-free retro-comic scanning chamber generated for this card and stored as `src/assets/cerebro-scanner-original.png`.
- Removed the lower status caption and rebuilt the contribution matrix as a borderless projection inside the central radar; inactive cells merge into the lens while active cells glow by intensity.
- Rebuilt the profile link as an ivory comic title card and aligned it with the live yearly-total burst across the card's upper boundary. The public profile link, live totals, contribution titles, fallback, and reduced-motion behavior remain intact.
- Raised both upper labels, softened the surrounding crimson rays with a radial fade instead of a hard rectangular endpoint, and added a slow scanning-light pass that is disabled under reduced motion.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, and the Cloudflare server build completed. The complete About composition was observed locally at desktop width. Wrangler emitted its known sandbox-only log-file permission warning. Deployment: none.

## 2026-08-27 — Restyle GitHub activity as a comic scanner

- Rebuilt the native GitHub card around a dark purple halftone/radial backdrop, outlined background lettering, a small yellow yearly-total burst, and an ivory-framed scanner with crimson/yellow offset shadows.
- Expanded the live contribution matrix from twelve to sixteen weeks so seven square rows fit the short bento card without clipping; intensity now uses dark crimson, red, yellow, and ivory instead of GitHub green.
- Added a provisional, darkly graded background crop of the first Cerebro scene from *X-Men* #7 (1964), sourced from [Earth's Mightiest Blog](https://earthsmightiestblog.com/panel-every-issue-x-men-issue-7-first-cerebro/) and stored locally as `src/assets/cerebro-xmen-7.jpg`; final publication use still requires an explicit visual decision and rights review.
- Preserved the public profile link, live contribution totals, per-day native titles, failure fallback, keyboard focus, and reduced-motion behavior. The complete About composition was observed locally at desktop width; Astro checks, tests, and production build passed. Deployment: none.

## 2026-08-27 — Turn the Cyclops biography into comic captions

- Replaced the editorial biography overlay with three always-visible comic narration boxes for the 2018 origin, current introduction, and present-day practice.
- Updated the owner's role to independent developer across web and iOS, avoiding the stale web-only description.
- Finalized crimson, broken-white, and near-black surfaces with hard ivory/crimson offset shadows and restrained hover movement. The captions cross the story panel's left and lower boundaries so Cyclops remains visible; the lower caption was raised enough to avoid canvas clipping. Content no longer depends on hover and remains available on touch devices. The desktop composition was observed locally; Astro checks, tests, and production build passed. Deployment: none.

## 2026-08-27 — Establish the Cyclops story panel

- Added the owner-supplied Cyclops illustration as the dominant About story panel's full-bleed background.
- Tempered the primary red toward dark crimson/burgundy and added a directional black veil so the image retains its graphic force without overwhelming the bento or compromising the existing biography copy.
- Shifted story copy to broken white, retained the character toward the right/lower visual field, and recolored the existing date stamp cyan for continuity with the comic palette. The complete About composition was observed locally at desktop width; Astro checks, tests, and production build passed. Deployment: none.

## 2026-08-27 — Connect the checkout to the GitHub repository

- Added `https://github.com/ilyastorunn/ilyas.dev.git` as the local `origin` fetch and push remote.
- Verification: `git remote -v` returned the requested repository for both fetch and push. Existing working-tree changes were preserved.
- Deployment: none.

## 2026-08-27 — Finish the All Caps card composition

- Moved the vinyl back inside the music card after owner review showed that exact corner-centering left too little of the disc visible to recognize; the lower-right crop now preserves a clearly readable record silhouette.
- Repositioned the track caption immediately above the vinyl, removed inherited top spacing inside the caption, and replaced its yellow palette with the Doctor Doom panel's red, cyan, white, and black.
- Updated `docs/wiki/product.md` to reflect the final composition. Verification: Astro check passed with 0 diagnostics; final runtime geometry was not independently observed after the owner-requested adjustment. Deployment: none.

## 2026-08-27 — Refine the All Caps card hierarchy

- Shifted the Doctor Doom background to its source top edge so the original “THIS LAND IS MINE!” comic title is no longer cropped.
- Removed the dark gradient and inset-shadow treatment, preserving only a subtle saturation/contrast normalization.
- Moved “ALL CAPS” into a yellow comic caption at left-center with MF DOOM on a small attached white tab, avoiding competition with the artwork's title.
- Removed the decorative “On repeat” and “villain mode” labels while preserving the play control and vinyl composition.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, and the Cloudflare server build completed. The complete About card and final music-card geometry were observed at 1440×900; the comic title, track caption, vinyl, and play control did not overlap. Wrangler emitted its known sandbox-only log-file permission warning during the standalone check.
- Deployment: none.

## 2026-08-27 — Rebuild the music card around All Caps

- Superseded the Runaway concept with Madvillain, Madlib & MF DOOM's “All Caps” at the owner's direction.
- Added the owner-supplied Doctor Doom comic panel as a full-card, tonally graded background and rebuilt the record as a deterministic CSS black vinyl with grooves, highlights, edge depth, a center hole, and the Madvillainy cover as a small circular label.
- Positioned the vinyl so it rises into the card from the lower-right corner while preserving the title and play control at the left.
- Switched playback to the verified Apple preview, set volume to 50%, and added an About-entry autoplay attempt with a first-interaction fallback for browsers that block audible autoplay. Pause/resume remains explicit through the player button.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, and the Cloudflare server build completed. The final card was observed at 1440×900; the vinyl crop and label remained visible, manual playback worked, and the first-interaction autoplay fallback changed the control to its playing state. Wrangler emitted its known sandbox-only log-file permission warning during the standalone check.
- Deployment: none.

## 2026-08-26 — Add real About music, biography, and apps

- Replaced provisional About biography copy with a concise owner-supplied introduction and 2018-to-present development story.
- Rebuilt the music panel around Kanye West's “Runaway”: the owner-supplied cover is printed on an oversized record, the official Apple preview plays in place, and rotation follows playback state.
- Verified Unscroll and Memento against their official App Store listings, downloaded their 512 px icons, linked both product cards, and strengthened the folder reveal so the three cards fan beyond the panel on hover/focus. The third app remains explicitly in review pending owner assets.
- Strengthened the website interaction into an enlarging browser-sheet deck while keeping its content provisional until real website names, screenshots, and URLs are supplied.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, and the Cloudflare server build completed. The complete About card was visually observed at 1440×900; app hover stayed compact after correcting image intrinsic sizing, GitHub activity loaded, and Runaway playback toggled without console errors. Wrangler emitted its known sandbox-only log-file permission warning during the standalone check.
- Deployment: none.

## 2026-08-26 — Correct hero spacing on short laptop viewports

- Reproduced from the owner's 16:10 MacBook screenshot that the width-led hero ratio consumed the available card height and visually met the lower edge.
- Converted the hero card to an explicit header/content grid and added a height-aware desktop constraint so the visual remains centered with breathing room on short laptop screens.
- Verification: Astro check passed with 0 diagnostics and the Cloudflare server build completed. The owner-supplied screenshot is the reproduction evidence; post-fix owner visual review remains pending. Wrangler emitted its known sandbox-only log-file permission warning during the standalone check.
- Deployment: none.

## 2026-08-26 — Expand About into an interactive comic bento

- Replaced the initial informational About tiles with a comic issue-style masthead and interactive portfolio modules: verified `ilyastorunn` GitHub activity, a spinning record slot, a three-app folder reveal, and a stacked browser deck for websites.
- Inspected the requested Rare UI/shadcn component and recreated its relevant contribution-grid behavior in Astro-native markup/CSS instead of adding React, Tailwind, and Motion to the project.
- Kept track, app, and website content visibly provisional because the owner has not supplied final names, artwork, audio, or URLs; no historical placeholder projects were promoted to real content.
- Added focus and reduced-motion behavior for the app reveal and vinyl animation.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, and the Cloudflare server build completed. Wrangler emitted its known sandbox-only log-file permission warning during the standalone check. The development server was restarted at `http://127.0.0.1:4321`; visual owner review remains pending.
- Deployment: none.

## 2026-08-26 — Build the asymmetric About bento foundation

- Replaced the neutral About shell with an asymmetric comic-scrapbook bento containing dominant story, Right now, Based in, disciplines, and Outside the work/Cave-preview panels.
- Concentrated the comic language in a yellow handwritten sticker, halftone panel, draft stamp, and restrained accent colors while keeping the remaining surfaces editorial.
- Used explicitly provisional copy rather than inventing personal facts; biography, location, current focus, disciplines, and interests require owner input.
- Added a two-column mobile layout with an independently scrollable About card and no horizontal overflow.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare server build completed, the complete desktop layout was observed at 1440×900, and the mobile layout/scroll container was observed at 390×844. Wrangler emitted a sandbox-only log-file permission warning without failing validation.
- Deployment: none.

## 2026-08-26 — Simplify hero controls and add scroll affordance

- Removed the repeated İlyas Torun identity from the hero header and changed the visible email copy to “Contact me.”
- Converted Work and About into smooth transition endpoints with progress-based active state; left Cave disabled until its card exists.
- Added a handwritten comic-style “swipe down, please :)” cue and hand-drawn arrow at the image's lower right, with reduced-motion handling.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare server build completed, and desktop initial/About endpoint states were observed with no horizontal overflow and active navigation updated from Work to About. Wrangler emitted a sandbox-only log-file permission warning without failing validation.
- Deployment: none.

## 2026-08-26 — Complete the pinned hero-to-About transition

- Replaced separate sticky stages with one pinned transition viewport so the hero keeps shrinking instead of returning to normal document movement partway through the scroll.
- Added a late hero fade and complete About cover; at the scroll endpoint the previous card has opacity 0 and no edge remains visible.
- Added `spider-verse-hero-2x.png`, a deterministic 2944×1656 Lanczos upscale with restrained detail recovery, and expanded Astro's responsive variants to 2400 px for Retina displays.
- The image-generation edit path was attempted but rejected by its safety filter; no generated/reinterpreted image was used.
- Verification: initial, mid-transition, and endpoint states were observed at 1440×900; the mobile endpoint was observed at 390×844 with no horizontal overflow. Astro check passed with 0 diagnostics, the empty test suite passed, and the Cloudflare server build completed. Wrangler emitted a sandbox-only log-file permission warning without failing validation.
- Deployment: none.

## 2026-08-26 — Vertical card stack and hero color grade

- Added a native-scroll sticky card stack: the hero subtly scales and lifts while a neutral About shell rises in front of it.
- Kept the next card intentionally content-light so the hero behavior can be approved before About's bento/comic design begins.
- Applied a reversible indigo color grade to the horizontal Spider-Verse image using reduced saturation/contrast/brightness plus layered color overlays.
- Honored reduced-motion by disabling card transforms and retained normal scrolling without horizontal overflow.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare server build completed, and initial/mid-scroll states were observed at 1440×900 and 390×844. Wrangler emitted a sandbox-only log-file permission warning without failing validation.
- Deployment: none.

## 2026-08-26 — Full-width visual hero experiment

- Reworked the split hero into a full-width horizontal Spider-Verse composition while retaining the quiet white canvas and centered header.
- Removed visible intro and availability copy from the hero; retained the semantic introduction for assistive technology and kept both comic captions.
- Preserved the horizontal image ratio on mobile for a direct comparison with the split version.
- Verification: Astro check passed with 0 diagnostics; 1440×900 and 390×844 browser renders showed no horizontal overflow.
- Deployment: none.

## 2026-08-26 — Stabilize local hero preview

- Fixed the local Cloudflare SSR preview failing with a missing optimized `astro_assets.js` module.
- Excluded the `astro:assets` virtual module from Vite dependency optimization and regenerated the disposable Vite cache.
- Verification: `GET http://localhost:4321/` returned HTTP 200 with the portfolio page title.
- Deployment: none.

## 2026-08-26 — First rebuilt hero

- Replaced the minimal home screen with a restrained, responsive split hero derived from the owner's supplied portfolio reference.
- Added professional intro copy, availability/email actions, centered desktop section previews, the supplied horizontal Spider-Verse image, and two comic-style captions.
- Kept Work, About, and Cave inert until their destinations have real content.
- Added the image locally under `src/assets/` and rendered it through Astro's image pipeline.
- Verification: Astro check passed with 0 diagnostics, the empty test suite passed, the Cloudflare server build completed, and 1440×900 plus 390×844 browser renders were visually inspected with no mobile horizontal overflow. Wrangler emitted a sandbox-only log-file permission warning without failing validation.
- Deployment: none; the live Worker was not changed.

## 2026-08-26 — Remove folder-first navigation

- Removed the folder landing prototype after owner review.
- Removed its HTML/CSS/SVG component, interaction controller, focused tests, shared placeholder layout, and `/work/`, `/cave/`, and `/about/` placeholder routes.
- Restored the minimal `/` starting page.
- Marked the folder-first interaction model superseded in the wiki.
- Deployment: none; the live Worker was not changed.

## 2026-08-26 — Folder-first landing prototype

- Replaced the temporary “Hello World” home screen with a single centered, web-native folder navigator inspired by the owner’s supplied visual reference.
- Added hover, keyboard-focus, and tap-open states; outside-click and Escape close behavior; focus restoration; reduced-motion handling; and four semantic destinations.
- Added reachable placeholder routes for Work, Cave, and About; Contact uses the existing email address.
- Used HTML/CSS/SVG layers rather than a flattened PNG so files and directories remain individually navigable.
- Verification: Astro check 0 diagnostics, 3 interaction tests passed, Cloudflare production build succeeded, and desktop hover/mobile tap/Work navigation were observed in the local browser.
- Deployment: not performed; production still serves the prior minimal release.

## 2026-08-26 — Hello World production launch

- Added a minimal, responsive English `/` route containing only “Hello World.”
- Set the canonical Astro site URL to `https://ilyastorun.site`.
- Created and deployed the `ilyas-dev-portfolio` Cloudflare Worker and provisioned its session KV namespace.
- Added `ilyastorun.site` and `www.ilyastorun.site` as Worker custom domains, created the Cloudflare DNS zone, and moved delegation to `joaquin.ns.cloudflare.com` and `romina.ns.cloudflare.com`.
- Verification: `npm run check`, `npm test`, and `npm run build` passed; the final Worker deployment succeeded; both production hostnames resolved through Cloudflare and returned HTTPS 200 with the expected heading.
- Follow-up: replace the temporary page as the new portfolio direction is defined.

## 2026-08-26 — Clean application reset

- Removed the previous portfolio routes, components, layouts, styles, content schemas/data, notes, API/GitHub logic, tests, media, old specs/plans, and generated build/tool state.
- Preserved Astro, TypeScript, Vitest, Wrangler, npm manifests, Git history, `AGENTS.md`, and the wiki.
- Updated `README.md`, `package.json`, and `astro.config.mjs` for an empty starting scaffold.
- Recorded that `git remote -v` has no configured GitHub remote.
- Verification: `npm run check` passed with 0 diagnostics; `npm test` passed with no test files; `npm run build` completed successfully with expected missing-pages/sitemap warnings.
- Follow-up: define and implement the new product from the surviving foundation.

## Earlier history

The detailed implementation history remains in Git commits. Earlier wiki entries were replaced because they described files intentionally removed during the reset.
