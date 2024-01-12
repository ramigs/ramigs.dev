---
date: 2024-01-12
title: "What I do when my PR includes commits that are already in main"
description: "Specify which node version should be used to run a project"
slug: what-i-do-when-my-pr-includes-commits-that-are-already-in-main
tags:
  - git
  - github
---

Sometimes I have an open PR (branch `my-pr`) and I need to sync it with latest
`main`. I usually do the following:

```sh
git checkout main
git pull origin main
git checkout my-pr
```

If there are merge conflicts, for some reason that I haven't exactly figured
out, commits that are already in `main` get included in my PR, when pushed.

Might not be the most elegant solution, but one which works effectively for me.
After fixing merge conflicts, committing, and pushing, I do the following:

```sh
git checkout my-pr
git checkout -b my-pr-v2
git push origin my-pr-v2
```

Now, when opening the PR only my PR commits will be included. I can now close
the PR that has branch `my-pr`.

Alternatively, I've read that it's also possible to edit the PR via GitHub UI,
change the base branch to another branch and back to `main`, but I haven't tried
this solution myself.
