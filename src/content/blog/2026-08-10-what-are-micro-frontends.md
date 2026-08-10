---
date: 2026-08-10

title: 'What are micro-frontends?'
description: 'A from-zero explainer on micro-frontends: what they are, how the pieces get composed, and the tradeoffs that make them worth it only at a certain scale.'
tags:
  - frontend
  - architecture
  - micro-frontends
---

A single frontend codebase works fine until several teams need to ship to the
same product surface at the same time. Past that point, everyone is merging
into the same build, one team's broken deploy blocks everyone else's release,
and the app keeps growing in a direction no single team fully owns anymore.

Micro-frontends are one answer to that problem.

## What a micro-frontend actually is

A micro-frontend architecture splits the UI into **independently built** and
**independently deployed** pieces, each usually owned by a different team, then
composes them into one cohesive app for the end user.

Think of it like a food court: independent vendors, each running their own
stand, their own staff, their own hours — but customers walk through one
entrance and experience it as a single food court. A vendor can swap in or
out without the building itself changing, which is close to what happens when
pieces are composed live, in the browser, at runtime.

## How the pieces come together

Composition can happen at build time (stitched together before it ships) or
at runtime (assembled live, in the browser). Runtime composition is the more
common approach today, and it's largely practical thanks to **Module
Federation** — originally a Webpack feature, now also available in Vite
through plugins — a mechanism that lets independently built bundles load and
share code from each other in the browser, without a shared build step.

That's worth separating clearly: micro-frontend is the architectural pattern;
Module Federation is one tool that makes that pattern easier to pull off. The
pattern itself doesn't require it — iframes and web components are older,
simpler ways to achieve the same composition, just with different tradeoffs.

## What you gain

- **Independent deploys.** Each team ships on its own schedule, without
  coordinating a shared release.
- **Stack freedom.** Each piece can, in principle, use its own framework or
  version, decoupled from what everyone else is running.
- **Smaller blast radius.** A bad deploy from one team affects its own piece,
  not the whole app.

## What it costs

- **Version drift.** Host and remote pieces can disagree on shared
  dependencies if versions aren't coordinated.
- **Duplicated weight.** Without careful sharing, the same dependency can ship
  multiple times across pieces, bloating what the user downloads.
- **UX consistency gets harder.** Independently built pieces can drift apart
  in look and feel without deliberate effort to keep them aligned.
- **More moving parts.** Multiple pipelines, multiple deploy targets, and more
  coordination overhead than a single codebase ever needed.

## Is it worth it?

Only once the problem it solves actually exists. If one team already owns the
whole frontend, none of the coordination pain above is happening yet — so
there's nothing to gain and only the costs to pay. Micro-frontends earn their
keep at the point where multiple teams shipping to the same app has become the
actual bottleneck, not before.

## Takeaway

A micro-frontend isn't a tool or a library — it's an architectural choice to
trade a simpler codebase for independent team ownership and release cadence.
Module Federation is one of the mechanisms that makes that trade practical,
not the thing itself. Whether it's worth making comes down to one question: is
"multiple teams stepping on each other" your actual problem yet?
