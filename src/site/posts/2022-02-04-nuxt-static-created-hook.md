---
date: 2022-02-04
title: "[TIL] Nuxt: hook created is executed when building as static"
description: "Vue's lifecycle hook created is executed when building with generate"
slug: nuxt-static-created-hook
tags:
  - til
  - nuxt
  - ssg
  - vue
---

TIL that in Nuxt, Vue's [lifecycle
hook](https://v3.vuejs.org/api/options-lifecycle-hooks.html) `created` is
executed when building a static site with `generate`.

For strictly client-side purposes, use `mounted`.