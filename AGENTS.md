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

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
