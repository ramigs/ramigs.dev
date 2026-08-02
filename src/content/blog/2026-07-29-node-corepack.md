---
date: 2026-07-29
title: "Node.js Corepack: one shim for npm, pnpm and yarn"
description: "What Corepack does, why corepack enable is still a manual step, and how nvm's default-packages file can automate it once Corepack becomes a separate npm package in Node.js 25+"
tags:
  - node
  - corepack
  - pnpm
  - yarn
  - nvm
---

## The problem

Different projects pin different package managers, and different versions of
them. One repo wants `pnpm@9`, another wants `yarn@3`, a third is happy with
whatever `npm` shipped with your Node.js install.

That means either installing every package manager globally and hoping the right
version is active, or running one-off `npx pnpm@9 install` style commands to
sidestep your global install.

## What Corepack does

[Corepack](https://github.com/nodejs/corepack) is a shim shipped alongside
Node.js that sits in front of `npm`, `pnpm`, and `yarn`. Instead of installing a
package manager globally, a project declares which one it needs via the
`packageManager` field in `package.json`:

```json
{
  "packageManager": "pnpm@9.12.0"
}
```

When you run `pnpm install` inside that project, Corepack reads that field,
downloads and caches the exact `pnpm@9.12.0` binary if it isn't already
available locally, and transparently forwards the command to it.

Move to a different project pinned to `yarn@3.6.0` and the same thing happens
for `yarn`, no reinstalling anything by hand. It solves the "works on my
machine" class of problem where two projects quietly expect two different
package manager versions.

## Enabling is still a manual step

Corepack ships with Node.js (from 14.19 up to, but not including, 25), but it
doesn't do anything out of the box — it's disabled by default. You need to run
`corepack enable` once, so it can place its `pnpm`/`yarn` shims on your `PATH`.

The catch if you're using [nvm](https://github.com/nvm-sh/nvm): each Node.js
version nvm installs is its own self-contained directory, so `corepack enable`
isn't something you do once globally — it needs to be re-run every time you
install a new Node.js version.

## What's changing in Node.js 25+

The Node.js Technical Steering Committee [voted to stop bundling
Corepack](https://socket.dev/blog/node-js-tsc-votes-to-stop-distributing-corepack)
with Node.js starting in v25. It isn't being deprecated — it stays maintained —
but it's no longer preinstalled. From v25 onward you install it yourself as a
regular npm package:

```bash
npm install -g corepack
corepack enable
```

Node 24 and earlier keep shipping it as before, so nothing changes until you
move to 25+.

## Automating its installation on nvm

Since Corepack will soon be "just another package" to install, this is a good
fit for nvm's [default-packages
file](https://github.com/nvm-sh/nvm#default-global-packages-from-file-while-installing):
any package listed there gets installed automatically every time you `nvm
install` a new Node.js version. Add it once:

```bash
echo "corepack" >> "$NVM_DIR/default-packages"
```

and every future Node.js version nvm installs will already have Corepack
installed, without needing to remember to run `npm install -g corepack` by hand.

You'll still need to run `corepack enable` for that version (the file only
automates the _install_ step, not enabling the shims), but that removes half the
friction of picking up a new Node.js version.

This is the same trick covered in an [older TIL about managing yarn versions via
nvm](/blog/manage-yarn-via-nvm/) — same file, same idea, just pointed at
Corepack instead of a single package manager.
