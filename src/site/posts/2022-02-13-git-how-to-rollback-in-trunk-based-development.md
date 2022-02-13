---
date: 2022-02-13
title: "[TIL] git: how to rollback in trunk based development"
description: "git: how to rollback in trunk based development"
slug: git-how-to-rollback-in-trunk-based-development
tags:
  - til
  - git
---

TIL how to rollback when working in a trunk based development model.

> "A source-control branching model, where developers collaborate on code in a
> single branch called ‘trunk’ (main or master, in Git nomenclature), resist any
> pressure to create other long-lived development branches by employing
> documented techniques. They therefore avoid merge hell, do not break the
> build, and live happily ever after." - _[Trunk Based
> Development](https://trunkbaseddevelopment.com/)_

Let's say you've deployed branch `main` and discovered that you need to rollback
the deploy. You can either:

1. leverage PRs/short-live feature branches, by directly deploying the branch
   you want to rollback to

2. if you want to rollback to a specific commit hash which is not `HEAD` of any
of the existing branches, create a new branch from this specific commit `git
checkout -b rollback-2022-02-13 ad3da78` and deploy that branch

I've also learned that a git commit hash is a cryptographic checksum that is
calculated from the **state of the repository** (including the hash of all the
files in the repository, the hash of the previous commit, the current date and
time, etc.), and contrarily to what I previously thought, not related to
individual files.