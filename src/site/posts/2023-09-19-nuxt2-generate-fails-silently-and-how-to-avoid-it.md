---
date: 2023-09-19
title: "[TIL] Nuxt 2: nuxt generate fails silently and how to avoid it"
description: "Nuxt 2: How to force generate command to exit with non-0 code on errors"
slug: nuxt2-generate-fails-silently-and-how-to-avoid-it
tags:
  - til
  - nuxt
---

TIL that in Nuxt 2, command `nuxt generate` as is, exits with code 0 (success)
when errors are thrown during the execution (potentially skipping the generation
of routes where error is manifesting).

To avoid unexpected issues, specially in production deploy pipelines, use flag
`--fail-on-error`.
