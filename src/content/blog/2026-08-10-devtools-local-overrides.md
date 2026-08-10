---
date: 2026-08-10
title: '[TIL] Local Overrides in Chromium DevTools'
description: "How to make persistent local edits to a live site's files in DevTools, without touching the server or a build pipeline"
tags:
  - til
  - chromium
  - devtools
---

TIL about Local Overrides in Chromium-based DevTools.

## What it is

A feature that lets you make persistent edits to a website's files — HTML,
CSS, JS, images, even network responses — directly in DevTools, and have
those edits survive page reloads, without actually changing anything on the
server.

## Why it's useful

- Test CSS/JS tweaks against a live or staged site without touching source
  code or a build pipeline
- Debug production issues by patching a minified file and confirming a fix
  works before committing it
- Mock API responses by overriding XHR/fetch requests — handy for edge cases
  or working around a backend that isn't ready yet
- Changes persist across reloads, unlike ordinary Elements-panel edits which
  reset on refresh
- Good for quick client demos or prototyping tweaks on a live site

## How to set it up

1. Open DevTools and go to the **Sources** panel
2. Open the **Overrides** tab in the sidebar
3. Click **"Select folder for overrides"** and pick a local folder
4. Click **Allow** when DevTools asks for permission to read/write it
5. Edit a file directly in the **Sources** panel (or CSS in the **Styles**
   pane, if that CSS lives in an actual `.css` file) — DevTools saves the
   change into your chosen folder automatically
6. A small purple dot marks files with an active override; review them
   anytime from the **Overrides** tab. Uncheck **Enable Local Overrides** to
   temporarily disable them, or click **Clear** to delete all override files
   for good

You can also kick this off from the **Network** panel: right-click any
request and choose **"Override content"** or **"Override headers"** — useful
for mocking a specific API response or patching response headers (e.g.
CORS) without hunting for the file in Sources first.

## Caveats

- **Elements-panel edits don't count.** Editing the DOM via "Edit as HTML"
  in the Elements panel is _not_ saved as an override — DevTools explicitly
  doesn't track DOM tree changes there. Overrides only capture edits made in
  the Sources panel, or CSS edits in the Styles pane when the CSS comes from
  an external stylesheet (not inline in the HTML).
- **DevTools has to stay open.** The override only serves while DevTools is
  attached to that tab — close it, and the next load falls back to the real
  file from the server.

Overrides are scoped per-origin, so once set up, they keep applying to that
site (while DevTools is open) until you clear them or uncheck **Enable
Local Overrides**.
