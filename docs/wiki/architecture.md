# Architecture

## Runtime and build

- Astro 7 with strict TypeScript.
- `output: "server"` with the Cloudflare adapter; content routes are individually prerendered.
- MDX supplies note content; Astro sitemap generates the sitemap.
- Instrument Sans and IBM Plex Mono are installed/local package assets.
- Node.js 24+ is required.
- Wrangler targets a Cloudflare Worker named `ilyas-dev-portfolio` with static assets served from `dist`.

## Route map

```text
/                         prerendered home
/cave/                    prerendered archive
/cave/notes/[slug]/       prerendered MDX notes
/404.html                 prerendered custom 404
/api/github.json          dynamic cached GitHub normalization endpoint
```

## UI boundaries

- `SiteLayout.astro`: document shell, SEO metadata, JSON-LD, optional Cloudflare analytics, header/footer, global reveal observer.
- `HeaderNav.astro`: desktop-centered navigation, compact mobile menu, mail action.
- `ProjectCard.astro`, `ProfileCard.astro`, `GitHubCard.astro`, `MusicCard.astro`: home bento presentations.
- `DetailModal.astro` + `lib/detail-modal.ts`: shared native `<dialog>` populated from each trigger's `data-detail` JSON.
- `Bookshelf.astro`: shared home-preview/full-Cave shelf with pointer, keyboard, touch scrolling, and modal triggers.
- Cave collection components: independent presentations for photography, uses, notes, music, and inspirations.
- `NoteLayout.astro`: shared reading layout for MDX notes.

## Content flow

`src/content.config.ts` defines Astro collections. JSON files in `src/content/data/` feed projects and Cave sections. MDX files in `src/content/notes/` feed the note index and static note routes. A schema failure stops Astro checking/building.

Home currently looks up projects by stable IDs `signal`, `meter`, and `swell`; renaming those keys without updating `src/pages/index.astro` breaks rendering.

## Detail modal flow

Interactive cards serialize a `DetailPayload` into `data-detail`. A document-level click listener intercepts the trigger, populates the shared dialog, shows/hides the external action, locks body scrolling, and restores focus on close. Native dialog behavior provides the modal focus boundary; explicit code supports close button, Escape, backdrop click, and focus restoration.

## GitHub data flow

```text
GitHub public contribution HTML ─┐
GitHub public profile REST ──────┼─> /api/github.json ──1h shared cache──> GitHubCard
GitHub public events REST ───────┘
```

The contribution HTML is required and parsed into dated cells and levels. REST profile/events are optional enrichment; if anonymous REST rate limits are exhausted, the live heatmap still works. Complete upstream failure returns a stable fallback payload. Browser code receives no token. Cache headers: browser max-age 5 minutes, shared max-age 1 hour, stale-while-revalidate 1 day.

## External dependencies

- GitHub public web and REST endpoints at request time for the dynamic card.
- Spotify link and remote cover image for the home music card.
- Cloudflare Web Analytics only when `PUBLIC_CF_ANALYTICS_TOKEN` exists.
- No database, authentication, CMS, contact backend, or client framework.

## Sources

- [`package.json`](../../package.json)
- [`astro.config.mjs`](../../astro.config.mjs)
- [`wrangler.jsonc`](../../wrangler.jsonc)
- [Content schemas](../../src/content.config.ts)
- [GitHub library](../../src/lib/github.ts) and [endpoint](../../src/pages/api/github.json.ts)
- [Site layout](../../src/layouts/SiteLayout.astro)
- [Modal controller](../../src/lib/detail-modal.ts)

