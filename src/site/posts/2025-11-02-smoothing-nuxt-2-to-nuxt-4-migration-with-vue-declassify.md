---
title: "Smoothing Nuxt 2 to Nuxt 4 Migration with vue-declassify"
date: 2025-11-02
description: "How vue-declassify is helping me prepare a Nuxt migration."
slug: smoothing-nuxt-2-to-nuxt-4-migration-with-vue-declassify
tags:
  - nuxt
  - vue
  - vue-declassify
---

Migrating a Nuxt 2 app to Nuxt 4 can be a daunting process, especially if your
codebase relies heavily on class-style Vue components. I'm right in the middle
of this kind of migration for a client, so these challenges are hitting close to
home.

Before tackling the actual migration, I was looking for ways to do as much as
possible in the current version. That's when I found a fantastic tool that makes
the transition much smoother:
[vue-declassify](https://github.com/misha/vue-declassify).

`vue-declassify` automates the conversion of class-style components into their
equivalent object-style format, removing the usage of property decorators. This
is a crucial first step, as Nuxt 4 and Vue 3 favor object-style and composition
API patterns. By using this tool, I was able to prepare my codebase for the
migration while still running Nuxt 2, reducing risk and manual effort.

The quality of `vue-declassify` is impressive. It manages the conversion process
with accuracy, even for complex components, and the output is clean and
readable. Although it needs a couple of tweaks for some scenarios, it's still a
fantastic tool.

If you're planning a similar migration, I highly recommend giving it a try—it
saves time and helps ensure a smoother upgrade path.
