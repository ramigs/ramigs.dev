---
date: 2024-10-05
title: "Vite dev: automatically open app in the browser"
description: "Automatically open your app in the browser when running vite dev"
slug: vite-dev-automatically-open-app-in-the-browser
tags:
  - vite
---

When running the `vite` dev server (commands `vite`, `vite dev`, and `vite
server`), it's possible to specify the option `--open` so that the app opens
automatically in the browser.

`BROWSER` and `BROWSER_ARGS` can also be used to pass additional settings,
either as environment variables or as `process.env` arguments.

For example, in my case I want to open Firefox Developer Edition, so in
`package.json` I use:

```json
"dev": "BROWSER='/Applications/Firefox Developer Edition.app' vite --open"
```
