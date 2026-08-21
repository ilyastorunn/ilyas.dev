# Content guide

Public-facing content is English-only. Do not invent personal details; preserve placeholders until the owner supplies replacements.

## Projects

Edit `src/content/data/projects.json`. The home page requires the stable keys `signal`, `meter`, and `swell` unless `src/pages/index.astro` is changed too.

Each project requires:

- `title`
- `kind`: `app` or `website`
- `eyebrow`, `summary`, `accent`
- `size`: `wide`, `tall`, or `standard`
- `detail`: title, description, optional action/URL, and metadata pairs

Current status: all three are placeholders with `example.com` links.

## Bookshelf

Edit `src/content/data/books.json`. Fields are title, author, cover/ink colors, visual height (150–250), `selected`, and a short personal note. Selected books appear on the home preview; all books appear in Cave.

Current owner-selected books:

- Walter Isaacson — *Steve Jobs*
- Lawrence Levy — *To Pixar and Beyond*
- Rick Rubin — *The Creative Act: A Way of Being*
- Jason Schreier — *Press Reset*

The covers are designed typographic placeholders, not reproduced cover artwork.

## Home music card

The home card is currently hard-coded in `src/components/MusicCard.astro`:

- “Loser” by Tame Impala
- Spotify track ID `7bxaFZ1O3cHkgLKMsdC3xR`
- Remote Spotify cover image

This is intentionally separate from the Cave music collection. Update the card's visible copy, detail payload, link, cover URL/alt, and metadata together.

## Cave collections

- `photography.json`: title, location, year, three-color palette; visuals are generated placeholders.
- `uses.json`: category, item name, note.
- `music.json`: title, artist, year, color, optional URL; current entries are placeholders.
- `inspirations.json`: name, field, note; current entries are placeholders/sample references.

The owner plans to replace these manually.

## Notes

Add `.md` or `.mdx` files under `src/content/notes/` with:

```yaml
---
title: "Visible title"
description: "Short summary"
publishedAt: 2026-08-21
draft: false
---
```

Drafts are excluded from Cave and static routes. The filename becomes the route slug.

## Memoji and media

Production Memoji is not present. Preferred input is a square transparent PNG or WebP, ideally at least 512×512. Store final versioned assets under `public/` and update both `HeaderNav.astro` and `ProfileCard.astro`. Preserve dimensions and meaningful alt text where the image conveys identity.

## Schema and validation

Inspect `src/content.config.ts` before adding fields or changing shapes. Run `npm run check`, `npm test`, and `npm run build` after schema or content changes.

## Sources

- [Content schemas](../../src/content.config.ts)
- [Content data](../../src/content/data/)
- [Notes](../../src/content/notes/)
- [Home composition](../../src/pages/index.astro)
- Owner content decisions through 2026-08-06

