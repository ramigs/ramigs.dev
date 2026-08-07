## Project

`ramigs.dev` — personal website + tech blog.

The actual project is a personal site + blog built on Astro 7 with a Vue island (color mode toggle), Markdown content collections for ~90 blog posts (migrated from an old Eleventy site, with legacy filename-based slugs), a custom design token system with dev-only style guide, and IBM Plex fonts served locally. No CI config or netlify.toml — deploy looks like it's Netlify via dashboard config (inferred from a comment in astro.config.mjs).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

If starting the dev server fails or behaves unexpectedly, check whether it's already running on the default port (4321) before troubleshooting further — the user may already have it running themselves.

Don't run the dev server for every task by default — only when actually useful for verifying a specific change (e.g. visual/UI behavior that can't be confirmed via `pnpm build`/`check`/`lint` alone).

## Linting & formatting

Run `pnpm lint` / `pnpm format:check` / `pnpm check` after substantive code changes. Skip them for trivial edits — documentation-only changes, comment tweaks, single-value style tweaks (a color, spacing, or size value changed in place, no new selectors/props/structure), or other non-functional edits — where running the full check suite adds noise without value. Use judgment rather than mechanically running the full suite after every single edit.

## Design tokens

`src/pages/style-guide.astro` is the dev-only reference for `src/styles/tokens.css`. Color swatches read token values live (`var(--token)`), so they can't go stale. But some sections (e.g. Spacing) display a hardcoded label string alongside the token, for readability — those can silently drift out of sync with the actual value in `tokens.css`. Whenever a token's value changes, or a token is added/removed, check whether the style guide needs a matching update.

`tokens.css`'s dark-mode values are also duplicated across two rule blocks — the explicit `[data-color-mode='dark']` block and the `@media (prefers-color-scheme: dark)` fallback block (for before an explicit choice is made). CSS custom properties can't be shared/mixed-in across selectors, so this duplication is structural, not accidental — both blocks are commented to point at each other, but when changing a dark-mode token value, check both.

Whenever a new icon gets vendored into `src/assets/icons/tabler/`, add it to the `icons` array in `style-guide.astro`'s Icons section too — it should stay a complete reference of every icon actually in use on the site, not just some of them.

## Content

When writing new blog posts, titles should use sentence case, not title case — capitalize only the first word (and proper nouns), not every word.

## TODO / future work

Known future work with a clear trigger — not open design questions, just work waiting on an external condition.

- **Refactor color tokens to use `light-dark()`** once it reaches Baseline "Widely Available" status (expected 2026-11-13). Would collapse the explicit `[data-color-mode='light']`/`[data-color-mode='dark']` duplicated variable blocks in `tokens.css` into single declarations, e.g. `--color-text: light-dark(#1a1a1a, #eaeaea);` — works with the manual toggle too, since it reads computed `color-scheme` rather than the media query directly.
- **`eslint-plugin-jsx-a11y` peer-dependency mismatch with ESLint 10** — its declared peer range doesn't include ESLint 10, though it's confirmed functionally working via direct testing (a deliberate-violation test file correctly triggered all expected rules). Revisit once the package publishes a release with an updated peer range covering ESLint 10 — check via `pnpm why eslint-plugin-jsx-a11y`, then bump and re-verify with the same kind of test. Scoped to this package only — `eslint-plugin-vuejs-accessibility` already supports ESLint 10.
- **Manual VoiceOver screen reader testing** — declined at launch, not permanently ruled out. Revisit if VoiceOver familiarity improves enough to make it practical in one sitting, or if real accessibility feedback surfaces. Automated coverage (axe-core, 0 violations) and structural work (semantic HTML, `<main>` landmark, `aria-label`s) already stand regardless — this is specifically about the one layer neither of those can verify.
- **Smoother color-mode toggle transition** (nice-to-have, no blocking trigger) — toggling dark/light mode currently swaps colors instantly. A brief fade (e.g. `background-color`/`color` transition on `body`) would feel less abrupt; a first pass was prototyped and then reverted to stay focused on the view-transitions work. Pick back up whenever there's a slow moment.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
