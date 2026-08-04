---
date: 2023-05-08
title: "VSCode: Vue 2 or Vue 3 extensions per project"
description: "VSCode: How to configure extensions for Vue 2 or Vue 3 per project"
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

**Update:** also noticed that for ESLint to work properly, Vue 2 projects needed
the VSCode ESLint extension pinned to version `2.4.2`, while Vue 3 projects work
fine with the up-to-date `3.0.10`. Since a single VSCode installation can't have
two versions of the same extension active at once, I achieved this using
separate [VSCode profiles](https://code.visualstudio.com/docs/editor/profiles),
one per Vue version, each with its own pinned ESLint version.

Vetur itself is also pinned, at `0.37.3`, since it's the legacy Vue 2
language-tooling extension and hasn't seen further releases.

Also, for Vetur to actually handle formatting in Vue 2 projects, I had to set it
as the default formatter for `.vue` files in my `settings.json`:

```json
"[vue]": {
  "editor.defaultFormatter": "octref.vetur",
},
```

On the Vue 3 projects, formatting was instead handled by Prettier, configured
in each project's `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

There are probably better ways to handle this, with a more intentional
separation of VSCode profiles and extensions per Vue version, but this is how I
was able to get it working. I'm happy I no longer need to support Vue 2
projects, and I'm writing this down mostly so I can come back to it in case
another Vue 2 project lands on my lap.
