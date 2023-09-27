---
date: 2023-09-27
title: "[TIL] The importance of font smoothing in WebKit and Firefox"
description: "CSS font smoothing makes a difference on macOS"
slug: the-importance-of-font-smoothing-in-webkit-and-firefox
tags:
  - til
  - css
  - macos
  - webkit
  - firefox
---

TIL that the following CSS font smoothing rules, really make a difference on
Apple OSs (Firefox and WebKit-based browsers):

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Take a look at the difference with and without
[here](https://davidwalsh.name/font-smoothing) and
[here](https://tailwindcss.com/docs/font-smoothing).

Even though there are some [arguments against
it](https://ui.dev/rwd/articles/font-smoothing) I still think the pros outweigh
the cons, so better to set these rules.
