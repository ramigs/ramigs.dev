---
date: 2023-10-14
title: "[TIL] git: interactive rebase"
description: "git: how to interactive rebase"
slug: git-interactive-rebase
tags:
  - til
  - git
---

Thanks P for sharing this.

Often referred to as the "Swiss Army Knife of Git", in broad terms, interactive
rebase is used to rewrite the commit history (such as edit, delete, and squash).

In our case, we needed to delete some commits in `feature-branch-B`, which were
originally brought over from `feature-branch-A`. `feature-branch-A` ended up
being discarded, and now we needed to delete those commits, so that they
wouldn't be included when merging `feature-branch-B` to `main`.

TIL how to perform a `git` interactive rebase:

1. Make sure `main` is updated
2. `git checkout feature-branch-B`
3. `git rebase -i main`: editor pops up with all commits listed: remove the
   lines (representing commits) you don't want (or squash them, change commit
   message, etc.)
4. `git push origin +feature-branch-B` to force push the new shiny commit history
