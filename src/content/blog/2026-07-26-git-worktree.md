---
date: 2026-07-26
title: "[TIL] git worktree"
description: "How git worktree lets you check out multiple branches at once, and why it's not just a manual folder copy"
tags:
  - til
  - git
---

TIL about `git worktree`.

It's funny how a tool you use every single day can still surprise you. Git has
so many commands tucked away that never come up in the day-to-day `add`,
`commit`, `push`, `pull` loop, and you only stumble onto them when you hit the
exact problem they were built for. In my case, that problem was wanting to work
on two branches of the same project, side by side, without stashing or juggling
a second clone.

## The problem

Say I'm on `main` and need to try out a migration on a separate branch, without
losing my current working directory. The instinct is to just copy the folder:

```bash
cp -r ramigs.dev ramigs.dev-migration
cd ramigs.dev-migration
git checkout -b migration
```

That works, but it's not quite right.

## Enter `git worktree`

`git worktree add <path> -b <branch-name>` is a single git command that does
this for you. A few things that make it different from copying the folder
yourself:

- It creates the new folder and checks out the new branch in one step — no
  manual `cp` then `git checkout`.
- The new folder does **not** duplicate `.git` — it's a lightweight linked
  working tree that shares the same object database/history with the original
  repo. Only a small `.git` file (a pointer) lives in the new folder, not the
  whole history again.
- Things git doesn't track — `node_modules`, `dist` — won't be copied either, so
  you'd run `npm install` fresh there.
- Git prevents the same branch from being checked out in two worktrees at once,
  so `main` in one folder and `migration` in another can coexist safely with no
  conflicts.

So the command would look something like:

```bash
git worktree add ../ramigs.dev-migration -b migration
```

Run from the original repo, and that's the entire setup step. Two folders, two
branches, one shared history, no copy-pasting required.

## Cleaning up with `git worktree remove`

Once the migration branch was merged into `main` — or if I'd decided to
abandon it instead — my instinct was to just `rm -rf` the folder, same as I
would with a manual copy. That mostly works, but it
leaves git confused: the original repo still has an entry under
`.git/worktrees/` pointing at a directory that no longer exists, and git won't
let you delete the branch that folder had checked out until that reference is
cleared.

`git worktree remove <path>` is the proper way to tear it down:

```bash
git worktree remove ../ramigs.dev-migration
```

This removes both the working directory and the administrative metadata in
one step, so the original repo has no dangling references left behind. If the
worktree has uncommitted changes, git refuses to remove it unless you pass
`--force` — a small safety net against losing work you forgot about.

`git worktree list` is worth running before and after, just to see what
worktrees are currently registered. And if you ever do end up manually
deleting a worktree folder instead of using `remove`, `git worktree prune`
cleans up the stale metadata afterwards.

Doing the setup with `git worktree add` and skipping the matching
`git worktree remove` is the same mistake as the `cp -r` approach from
earlier — it looks done, but it leaves git's bookkeeping out of sync with
what's actually on disk.

## Worktrees for AI agents

Worktrees aren't just a convenience for a human juggling two branches, they're
a good fit for AI coding agents too. An agent working in the same checkout
you're using is one accidental `git
checkout` away from yanking the branch out from under you, or clobbering
uncommitted changes it didn't know were "yours". Give it its own worktree
instead, and it gets a real working directory and its own checked-out branch,
isolated from whatever you're doing in the original, but still sharing the
same object database, so nothing has to be cloned or synced separately.

That isolation is what makes it interesting for running multiple agents
side by side — each on its own branch, in its own worktree, unable to step on
each other. It's the kind of building block that matters if you're setting
agents to iterate somewhat independently, which ties into **Loop
engineering**, something I want to dig into more in the near future.

## The takeaway

I've been using git for almost a decade and still found a command I didn't
even know I needed, and how useful it can be. That's the fun part of tools
like this — they're deep enough that you never really stop learning them.
