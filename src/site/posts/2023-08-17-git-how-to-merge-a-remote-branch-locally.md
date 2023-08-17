---
date: 2023-08-17
title: "[TIL] git: how to merge a remote branch locally"
description: "git: how to merge a remote branch locally"
slug: git-how-to-merge-a-remote-branch-locally
tags:
  - til
  - git
---

TIL how to how to merge a remote branch (for example `main`) locally, which may
be useful for when you're working on a feature branch, `main` has been updated,
and you'd like to include those updates in your branch:

```
git fetch origin main
git checkout a-local-branch
git merge origin/main
git push origin a-local-branch
```
