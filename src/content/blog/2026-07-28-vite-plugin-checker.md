---
date: 2026-07-28
title: "[TIL] vite-plugin-checker"
description: "vite-plugin-checker: surfacing TypeScript/ESLint errors in the terminal and as a browser overlay during Vite dev"
tags:
  - til
  - vite
  - typescript
  - eslint
---

TIL about
[`vite-plugin-checker`](https://github.com/fi3ework/vite-plugin-checker).

Vite's dev server transpiles files on the fly without type-checking them, so a
broken type can slip right through and only get caught later, at build time or
in CI. `vite-plugin-checker` closes that gap.

Once added to `vite.config.ts`, it runs your configured checkers (TypeScript,
vue-tsc, ESLint, Stylelint...) in a separate process alongside the dev server,
and surfaces errors in two places while you're developing:

- The terminal running `vite`, right next to the dev server's own logs.
- A browser overlay, so the error shows up on the page you're already looking
  at, instead of staying buried in a terminal you might not have open.

Example config:

```ts
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
});
```

Nice for catching type and lint errors immediately during development, instead
of waiting for a build or CI run to point them out.
