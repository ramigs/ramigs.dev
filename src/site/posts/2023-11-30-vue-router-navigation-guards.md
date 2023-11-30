---
date: 2023-11-30
title: "[TIL] Vue Router Navigation Guards"
description: "How to hook into Vue's route navigation process"
slug: vue-router-navigation-guards
tags:
  - til
  - vue
---

TIL about [Vue Router's Navigation
Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html), which
allow us to hook into the navigation process.

For example, `beforeRouteLeave` can be especially useful for alerting user about
unsaved changes in a form and preventing accidental/undesired navigation.
