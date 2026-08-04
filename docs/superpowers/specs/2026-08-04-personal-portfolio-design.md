# İlyas Torun Personal Portfolio — Design Specification

**Date:** 2026-08-04
**Status:** Approved design, pending written-spec review
**Audience:** Implementation owner and future maintainers

## 1. Product intent

Build a new English-only personal website for İlyas Torun. The site is primarily a personal digital home and secondarily a professional portfolio. It should introduce İlyas as an **indie developer**, present selected products, and make his interests and taste visible without weakening the professional presentation.

The experience should feel quiet, refined, and highly considered. Its visual references are Apple product presentation, Braun industrial design, Dieter Rams, Jony Ive, and the supplied portfolio screenshots. Micro-interactions should add tactility without becoming spectacle.

The new site will be built from scratch. The current Vercel site remains online until the replacement passes acceptance and is published on a temporary subdomain managed through Cloudflare.

## 2. Success criteria

- A first-time visitor quickly understands that İlyas is an indie developer who builds thoughtful digital products.
- Projects remain the primary professional content, while personal collections give the site a distinct identity.
- The home page feels spacious and restrained on desktop and remains recognizably bento-based on mobile.
- Project details open without navigating away from the home page.
- Content can be replaced without restructuring components.
- The site is fast, accessible, resilient to GitHub API failures, and ready for Cloudflare deployment.

## 3. Information architecture

### 3.1 Home — `/`

The home page is one continuous, calm narrative with these regions:

1. Header
2. Introductory hero
3. Bento portfolio grid
4. Bookshelf preview
5. Minimal footer

The header contains:

- Left: circular Memoji image and `İlyas Torun`
- Center: `Work`, `About`, and `Cave`
- Right: `Say hello ↗`, linked to `mailto:ilyastorun.dev@gmail.com`

`Work` and `About` scroll to matching regions on the home page. `Cave` navigates to `/cave`.

The bento grid contains exactly six initial items:

- Two app projects
- One website project
- One short profile card
- One live GitHub activity card for `ilyastorunn`
- One music card

Project, Memoji, and music content may use polished placeholder data in the first implementation. The music card should visually support a future Spotify embed or manually supplied Spotify link; the first version is static.

The Bookshelf preview is a distinct wide section after the bento grid, not one of the six bento items. It displays a curated subset of placeholder books and links visitors toward the full collection in Cave.

### 3.2 Cave — `/cave`

Cave is a separate personal archive that uses the same design system with slightly more room for experimentation. It contains these sections:

- Bookshelf
- Photography
- Uses
- Notes
- Music
- Inspirations

Initial collection entries may be placeholders. Sections are separated by rhythm and whitespace rather than heavy containers or oversized headings.

### 3.3 Notes — `/cave/notes/[slug]`

Notes are authored in MDX. Cave shows the note index, and each note has a stable, shareable route. Note pages use a focused reading layout and the shared site shell.

## 4. Interaction design

### 4.1 Bento details

Selecting any interactive bento opens a shared detail modal rather than navigating immediately. The modal uses the approved **soft-focus** transition:

- A short fade
- A subtle scale change
- Restrained background blur
- No large spatial morph or bottom-sheet motion

The modal can show an image or video, a concise description, role and technology metadata where relevant, and one primary external action such as `View project`, `Open App Store`, or `View source`.

The modal must:

- Close via Escape, backdrop selection, or a visible close control
- Trap focus while open
- Return focus to its originating card when closed
- Lock background scrolling without shifting the page
- Expose an accessible title and description
- Reduce to a simple fade or instant transition under `prefers-reduced-motion`

### 4.2 General motion

Motion is quiet and purposeful:

- Bento hover states move at most 1–2 px and may adjust shadow or surface tone.
- Page sections may use short, low-distance scroll reveals.
- Books may respond to hover/focus and support controlled horizontal movement when necessary.
- There are no perpetual decorative animations, cursor followers, magnetic controls, or attention-seeking parallax.
- All motion respects `prefers-reduced-motion`.

### 4.3 Bookshelf

The bookshelf should evoke a physical shelf rather than a generic card carousel. Book covers stand on a shared shelf surface. The home preview contains a selected subset; Cave contains the full data set.

Books must be operable with keyboard controls, pointer controls, and touch scrolling. Selecting a book opens a compact detail treatment using the shared modal system. The collection remains usable if cover artwork is missing by showing a designed placeholder cover.

## 5. Visual system

### 5.1 Layout

- The viewport background is a very light, cool gray.
- The main site surface is warm white with a large, restrained corner radius.
- Desktop content occupies approximately 78% of the main white surface, leaving generous consistent side margins.
- Navigation is visually centered at the top.
- The hero is intentionally not an oversized marketing headline. It is a medium-size introductory paragraph with controlled line breaks similar to the supplied reference.
- Whitespace is the primary hierarchy tool.

### 5.2 Color and surface

- Primary copy uses soft charcoal rather than absolute black.
- Supporting copy and metadata use neutral gray.
- Borders are thin and low contrast.
- Shadows are broad and faint.
- Amber/orange is reserved for small status accents.
- Version one supports light theme only. Dark theme is explicitly deferred until after the first publication.

### 5.3 Typography

Use a clean grotesk sans-serif family for navigation, prose, and project labels. A restrained monospace face may be used for dates, statuses, and compact technical metadata. Font loading must not block the initial experience; locally hosted or system-compatible fallbacks are preferred.

### 5.4 Responsive behavior

- Desktop preserves the centered navigation and wide breathing room.
- On mobile, the three project cards become full-width single-column items.
- The profile, GitHub, and music cards remain in a two-column arrangement when space allows.
- At narrow widths, small cards may collapse to one column to protect legibility and touch targets.
- The Memoji/name remains visible; navigation becomes compact without moving its conceptual priority to the top-right.

## 6. Technical architecture

### 6.1 Platform

- Astro with TypeScript
- Cloudflare Workers adapter
- Cloudflare Workers deployment through Wrangler
- Cloudflare Web Analytics
- No Next.js
- No heavyweight UI component library

Most routes are prerendered. Dynamic execution is limited to the cached GitHub data endpoint and any runtime behavior that cannot be expressed as static assets. Client JavaScript is isolated to components that require it, including the modal, interactive bookshelf behavior, and GitHub refresh state.

### 6.2 Component boundaries

- `SiteShell`: viewport background, main surface, shared metadata, header, and footer
- `HeaderNav`: identity, centered navigation, and email action
- `HeroIntro`: introduction and optional availability status
- `BentoGrid`: responsive layout only
- `BentoCard`: shared card semantics, focus treatment, and modal trigger contract
- Project, profile, GitHub, and music cards: content-specific presentations
- `DetailModal`: shared accessible overlay and focus management
- `Bookshelf`: collection rendering, shelf controls, and book interaction
- Cave section components: independent presentations for Photography, Uses, Notes, Music, and Inspirations
- `NoteLayout`: shared MDX reading surface

Each content-specific card provides structured detail data to `DetailModal`; it does not implement its own overlay behavior.

### 6.3 Content model

Projects and Cave collections use schema-validated, type-safe content/data collections. Notes use MDX. At minimum, content schemas cover:

- Stable identifier
- Display title
- Short description
- Media with alt text
- Optional external URL and action label
- Optional metadata relevant to the content type
- Publication/visibility state where appropriate

Placeholder entries follow the same schemas as real entries so replacing them is a data-only operation.

## 7. GitHub activity data flow

The GitHub card uses public data for the account `ilyastorunn`.

1. The browser requests a site-owned Cloudflare Worker endpoint.
2. The Worker requests only required public fields from GitHub.
3. The Worker normalizes the response into a small stable payload.
4. Cloudflare caching prevents a GitHub request on every page view.
5. The card renders the normalized response.
6. If GitHub is unavailable, rate-limited, malformed, or slow, the card renders local fallback data without collapsing or exposing an error-heavy state.

The exact visual summary may include recent public activity and selected repository statistics, but must not imply private contribution data. No GitHub token is exposed to the browser. If a server-side token is later used to improve rate limits, it is stored only as a Cloudflare secret.

## 8. Analytics and privacy

Cloudflare Web Analytics is enabled for basic traffic measurement. The site does not include a contact form, account system, advertising tracker, or custom behavioral profiling. The primary contact action opens the visitor's mail client.

No cookie consent interface is introduced solely for analytics unless the selected Cloudflare configuration or applicable deployment requirements make it necessary.

## 9. Failure states

- GitHub failure: render static fallback activity inside the normal card surface.
- Missing project or collection media: render a designed placeholder with preserved aspect ratio.
- Media loading: reserve dimensions to prevent layout shift.
- Invalid Note slug: render a custom 404 page.
- Broken or missing optional external URL: hide the modal's external action rather than render a dead control.
- JavaScript failure: core pages, navigation, content, and external links remain usable. Project card triggers retain their primary external URL as the no-JavaScript destination, while JavaScript intercepts the action to show the richer modal. Non-project cards expose their essential information directly on the card.

## 10. Accessibility requirements

- Semantic landmarks and heading order
- Visible keyboard focus with sufficient contrast
- Minimum practical touch targets
- Meaningful image alternatives
- Full keyboard operation for navigation, modal, and bookshelf
- Modal focus trap and focus restoration
- Reduced-motion support
- Sufficient text and UI contrast
- External actions labeled clearly
- Page title and metadata unique to each route

Target automated accessibility score is 100, supported by manual keyboard and screen-reader-oriented checks.

## 11. Performance and SEO

- Responsive optimized images with lazy loading below the fold
- Reserved media dimensions to avoid cumulative layout shift
- Minimal client JavaScript through Astro islands
- Critical typography and above-the-fold assets prioritized
- Descriptive titles, metadata, canonical URLs, Open Graph data, and a sitemap
- Structured data for the person/site where appropriate
- Target Lighthouse scores of 90+ in performance, best practices, and SEO, with 100 as the accessibility target

## 12. Verification plan

- Validate all content collections during build.
- Test modal open, close, focus trap, focus restoration, backdrop behavior, and Escape behavior.
- Test reduced-motion behavior.
- Test GitHub success, timeout, malformed response, and rate-limit fallback states.
- Verify Home, Cave, Note, custom 404, and external-link behavior.
- Check responsive layouts at wide desktop, tablet, mobile, and narrow-mobile widths.
- Run a production build and verify it in Cloudflare's local runtime.
- Perform final visual comparison against the approved companion direction on desktop and mobile.
- Run Lighthouse and manual keyboard checks before preview deployment.

## 13. Deployment sequence

1. Build and verify locally.
2. Configure Wrangler as the repository source of truth.
3. Deploy to a Cloudflare preview environment.
4. Review visuals, interactions, accessibility, analytics, and GitHub fallback behavior.
5. Bind the temporary Cloudflare-managed subdomain after acceptance.
6. Keep the existing Vercel site intact until the replacement is accepted and live.

The specific temporary subdomain is a deployment-time input and does not affect implementation architecture.

## 14. Explicitly deferred scope

- Dark theme
- CMS dashboard
- Live Spotify authentication or currently-playing integration
- Contact form or stored visitor messages
- Production Memoji, project imagery, book covers, photography, and final collection content
- Removing or redirecting the existing Vercel deployment

These items may be added after the initial publication without changing the core information architecture.
