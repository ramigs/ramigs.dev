---
date: 2024-03-09
title: "[TIL] CSS: detect user request for light/dark themes"
description: "CSS: how to natively detect user request for light/dark themes"
slug: css-detect-user-request-for-light-dark-themes
tags:
  - til
  - css
---

TIL about the `prefers-color-scheme` CSS media feature, which allows to natively
detect if a user requested light or dark themes (typically through an operating
system or user agent setting).

It can be used as such:

```css
@media (prefers-color-scheme: dark) {
  body {
    background: var(--bg-color-dark);
  }
}
```

Chrome DevTools has a [very useful
toggle](https://stackoverflow.com/questions/57606960/how-can-i-emulate-prefers-color-scheme-media-query-in-chrome)
that allows emulating different `prefers-color-scheme` values.

Learn more about `prefers-color-scheme`
[here](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
