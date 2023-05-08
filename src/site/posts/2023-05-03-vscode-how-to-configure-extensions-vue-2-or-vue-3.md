---
date: 2023-05-04
title: "VSCode: Vue 2 or Vue 3 extensions per project"
description: "VSCode: How to configure extensions for Vue 2 or Vue 3 per project"
slug: vscode-how-to-configure-extensions-vue-2-or-vue-3
tags:
  - vscode
  - vue
---

Up until Vue 2, [Vetur](https://github.com/vuejs/vetur) has been the recommended
VScode extension for Vue support.

Since the release of Vue 3 (which introduces first-class TypeScript support),
the [official
recommendation](https://vuejs.org/guide/typescript/overview.html#ide-support) is
to use [Volar/Vue Language Tools](https://github.com/vuejs/language-tools)
instead.

I'm currently working on multiple Vue.js projects (some Vue 2, some Vue 3),
using the same VSCode installation.

As recommend, tried uninstalling Vetur and using Volar instead in some of the
Vue 2 projects, but faced some (apparently) minor issues, such as [this
one](https://github.com/vuejs/language-tools/issues/2576), for example.

Since fixes to such issues required updates in the code (which could impact my
colleagues' dev environments), and having nothing to complain about Vetur, I've
decided to keep using Vetur for Vue 2 projects.

To do so, I have both extensions installed globally, and disabled on a
project-by-project basis accordingly:

- if project is Vue 2, disable Volar in the project's (current) workspace.
- if project is Vue 3, disable Vetur in the project's (current) workspace.

Credit goes to [this Stack Overflow answer](https://stackoverflow.com/questions/71268372/is-there-a-way-to-toggle-vs-code-extensions-per-project).
