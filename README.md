# ramigs.dev

Personal website and blog, built with [Astro](https://astro.build).

🔗 [ramigs.dev](https://ramigs.dev)

## Tech stack

- [Astro](https://astro.build) 7
- [Vue](https://vuejs.org) (islands only, e.g. the color mode toggle)
- TypeScript
- Markdown content collections for blog posts
- [Expressive Code](https://expressive-code.com) for syntax-highlighted code blocks
- pnpm

## Project structure

```text
src/
├── assets/       # fonts, icons, images
├── components/   # Astro + Vue components
├── content/blog/ # blog posts (Markdown)
├── layouts/      # page layout
├── pages/        # routes
└── styles/       # design tokens, reset, base, and global styles
```

## Getting started

Requires the Node version in `.nvmrc` and pnpm.

```sh
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:4321`.

## Scripts

| Command             | Action                               |
| :------------------ | :----------------------------------- |
| `pnpm dev`          | Start the local dev server           |
| `pnpm build`        | Type-check and build for production  |
| `pnpm preview`      | Preview the production build locally |
| `pnpm check`        | Run Astro and Vue type checking      |
| `pnpm lint`         | Lint JS/TS/Vue/Astro and CSS         |
| `pnpm lint:fix`     | Lint and auto-fix                    |
| `pnpm format`       | Format the codebase with Prettier    |
| `pnpm format:check` | Check formatting without writing     |

## Writing a blog post

Posts live in `src/content/blog/` as Markdown files named `YYYY-MM-DD-slug.md`. The date prefix is stripped to form the URL slug — a holdover from the site's previous Eleventy incarnation, kept for URL parity. The frontmatter `slug` field, if present in older posts, is not used.

Frontmatter schema (see `src/content.config.ts`):

```yaml
date: 2026-01-01
title: Post title
description: Short description
tags: [tag-one, tag-two]
canonical: https://example.com/original-post # optional, for cross-posted content
```

## Design tokens

`src/styles/tokens.css` defines the design system's colors, spacing, and other primitives. The dev-only `/style-guide` route is a live reference for browsing them.

## License

MIT — see [LICENSE](./LICENSE).

---

For AI-agent-specific workflow notes (dev server management, lint/check judgment calls, design token maintenance), see [AGENTS.md](./AGENTS.md).
