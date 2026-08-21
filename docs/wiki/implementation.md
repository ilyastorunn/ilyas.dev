# Implementation status

## Verified current behavior

- Home renders the approved six bento items: three projects, profile, GitHub activity, and music.
- Desktop bento uses three compact rows; projects become full-width at tablet sizes and small cards retain two columns where space allows.
- The shared modal supports card/book details, optional external actions, close control, Escape, backdrop close, body lock, and focus restoration.
- Bookshelf supports buttons, arrow-key scrolling, touch/trackpad overflow, and modal details.
- Cave loads all six content collections and sorts published notes newest-first.
- Note routes exclude drafts and are prerendered.
- Site metadata includes canonical URLs, Open Graph defaults, sitemap support, and Person JSON-LD.
- Motion styles and behavior include `prefers-reduced-motion` fallbacks.
- GitHub card renders a live 52-week-style heatmap from the site-owned endpoint with fallback behavior.

## Important paths

- Page composition: `src/pages/`
- Shared layouts: `src/layouts/`
- UI and component-local styles/scripts: `src/components/`
- Global tokens/reset: `src/styles/global.css`
- Typed content schemas: `src/content.config.ts`
- Editable data: `src/content/data/`
- Notes: `src/content/notes/`
- Modal logic/tests: `src/lib/detail-modal.ts`, `src/lib/detail-modal.test.ts`
- GitHub logic/tests: `src/lib/github.ts`, `src/lib/github.test.ts`
- Cloudflare configuration: `wrangler.jsonc`

## Verification record

Most recent recorded full automated verification (2026-08-21):

- `vitest run`: 2 files, 8 tests passed.
- `astro check`: 29 files, 0 errors, 0 warnings, 0 hints.
- `astro build`: successful Cloudflare server build and static route prerendering.
- The live GitHub parser smoke test was last run on 2026-08-06 and returned 458 contributions and 368 day entries; this value is time-sensitive and was not rechecked during wiki setup.

Not verified as of this wiki setup:

- Cloudflare `wrangler dev` runtime behavior
- Actual Cloudflare deployment or custom subdomain
- Cloudflare Web Analytics in production
- Lighthouse scores
- Screen-reader and full manual keyboard pass
- Current desktop/mobile visual comparison after the latest content changes
- Failure behavior of the remote Spotify cover image in-browser

## Known gaps and risks

- Project URLs point to `example.com`; projects are intentional placeholders.
- Header and profile Memoji are CSS placeholders.
- Photography, Uses, Cave Music, Inspirations, and note prose are placeholder/sample content pending owner edits.
- Home Music is hard-coded in `MusicCard.astro`, separate from `src/content/data/music.json`; changing Cave music does not change the home card.
- Spotify cover art is remote; the design spec prefers stable reserved media and graceful missing-media behavior, but no local fallback behavior has been visually verified.
- GitHub contribution parsing depends on GitHub's public HTML structure and should remain covered by parser tests.
- The specification called for malformed-response/timeout coverage and Cloudflare runtime verification; current tests cover parsing, REST-rate-limit tolerance, full failure, normalization, fallback, and modal interactions, but not every originally listed case.
- The configured canonical site is `https://portfolio.ilyastorun.dev`; whether this is the final temporary/production hostname is unresolved.

## Sources

- Current implementation under [`src/`](../../src/)
- [Modal tests](../../src/lib/detail-modal.test.ts)
- [GitHub tests](../../src/lib/github.test.ts)
- Git history through commit `e744e98`
- [Original verification plan](../superpowers/plans/2026-08-04-personal-portfolio-implementation.md)
