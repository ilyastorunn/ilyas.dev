# Project log

Meaningful changes are recorded newest-first. Git remains the source for exact diffs.

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
