---
date: 2026-08-02
title: "CSS Cascade Layers: ending specificity wars"
description: "How @layer gives explicit control over the CSS cascade, letting us rank groups of styles independently of selector specificity"
slug: css-cascade-layers
tags:
  - css
  - cascade-layers
---

CSS Cascade Layers (the `@layer` at-rule) solve a long-standing pain point:
**specificity wars**.

Before layers, overriding a third-party library's highly-specific selector meant
writing something even more specific, or reaching for `!important`.

Layers let us group styles into buckets and rank those buckets directly,
independent of selector specificity.

## Declaration order decides priority

Layers declared later win, no matter how specific the selectors are inside
earlier layers:

```css
@layer reset, base, components;

@layer reset {
  p {
    margin: 0;
  }
}

@layer components {
  p {
    margin: 20px;
  } /* wins: 'components' is declared last */
}
```

Even `#my-id p` inside `reset` would lose to the plain `p` in `components` —
the whole layer sits higher in the cascade.

Specificity still works as normal _inside_ a layer; layers only decide which
bucket beats another bucket.

## Unlayered CSS always wins

To avoid breaking existing stylesheets, any rule outside of an `@layer` block
beats layered CSS, regardless of order:

```css
@layer components {
  .btn {
    background-color: blue;
  }
}

.btn {
  background-color: red;
} /* always wins, unlayered */
```

(`!important` flips this: important rules inside layers beat important
unlayered rules, so component libraries can still force safety overrides.)

## Common patterns

Declare the layer order upfront, then fill layers in anywhere in the file (or
across files):

```css
@layer theme, layout, components;

@layer components {
  .card {
    padding: 1rem;
  }
}
```

Wrap third-party CSS on import so it never fights with our own styles:

```css
@import "framework.css" layer(framework);
@import "theme.css" layer(theme);
```

Layers can also nest, via dot notation:

```css
@layer framework.layout {
  .container {
    max-width: 1200px;
  }
}
```

## Why bother

- No more `!important` hacks to beat a framework's specificity.
- A clear, explicit architecture: reset, base, layout, components, each its
  own tier.
- Supported natively in all modern browsers — no build step required.
