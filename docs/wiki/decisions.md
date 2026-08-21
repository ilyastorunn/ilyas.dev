# Decisions

Durable decisions are reverse chronological. “Owner” means explicitly chosen by İlyas in the project conversation.

## 2026-08-06 — Live GitHub heatmap

**Status:** verified implementation

The GitHub card should resemble the contribution component at `github-component.vercel.app`: a real year-scale heatmap, total contributions, and recent repository context. The implementation uses the project's own cached endpoint rather than depending on that third-party Vercel service. Public contribution HTML is the required source; public REST profile/events are optional enrichment.

Evidence: `src/lib/github.ts`, `src/pages/api/github.json.ts`, `src/components/GitHubCard.astro`, `src/lib/github.test.ts`.

## 2026-08-06 — Initial real content

**Status:** verified implementation

Projects remain placeholders. Home music is “Loser” by Tame Impala. Bookshelf initially contains *Steve Jobs*, *To Pixar and Beyond*, *The Creative Act: A Way of Being*, and *Press Reset*. Cave content remains owner-editable placeholder content.

Evidence: `src/components/MusicCard.astro`, `src/content/data/books.json`, owner decision.

## 2026-08-05 — Compact density

**Status:** verified implementation; supersedes the original specification's more spacious initial implementation where they conflict

The initial architecture felt too large and required too much scrolling. Two compact passes reduced hero rhythm, project/card heights, bento gaps, heading scale, and bookshelf dimensions while preserving body readability and larger side margins.

Evidence: commits `e816e4e` and `3f0a370`, current Home/card/Bookshelf styles.

## 2026-08-04 — Product and visual direction

**Status:** verified implementation with remaining content gaps

- Build from scratch rather than modify the old site.
- English-only.
- Identity: indie developer.
- Quiet/refined Apple and Braun language, influenced by Dieter Rams and Jony Ive.
- Desktop navigation centered, restrained multiline hero, generous side margins.
- Light-only first version; dark mode after publication.
- Six home bentos: three projects, profile, live GitHub, music; Bookshelf follows as a separate section.
- Clicking interactive bentos opens a soft-focus detail modal with an optional destination button.
- Separate Cave sections: photo, uses, notes, music, inspirations, and bookshelf.
- No Next.js; implementation may choose the best suitable stack.
- Hosting will use Cloudflare under a temporary subdomain; deployment occurs later with owner authorization.
- Contact email: `ilyastorun.dev@gmail.com`.
- Production Memoji will be supplied later.

Evidence: owner decisions and the [approved design specification](../superpowers/specs/2026-08-04-personal-portfolio-design.md).

## Unresolved decisions

- Exact temporary/production Cloudflare hostname; config currently says `portfolio.ilyastorun.dev`.
- Final project names, copy, screenshots, destinations, and card emphasis.
- Final Memoji asset.
- Final Cave collection content and whether sample notes remain.
- Whether the home music card should eventually be data-driven or a Spotify embed.
- Publication timing and transition/redirect policy for the existing Vercel site.

