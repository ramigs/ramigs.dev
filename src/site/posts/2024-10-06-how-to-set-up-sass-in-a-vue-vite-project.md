---
date: 2024-10-06
title: "How to set up Sass in a Vue.js Vite project"
description: "Vue.js 3: how to configure Sass in a Vite based project"
slug: how-to-set-up-sass-in-a-vue-vite-project
tags:
  - vite
  - vue
  - sass
---

First, install `sass-embedded`:

```sh
yarn add -D sass-embedded
```

> Note that `sass-embedded` should be installed, **not** `sass`; otherwise
> you'll get the warning `Deprecation [legacy-js-api]: The legacy JS API is
deprecated and will be removed in Dart Sass 2.0.0.`

Then, add the following property to the `UserConfig` object in `vite.config.ts`:

```ts
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler'
    }
  }
},
```

You can now update the extension of your `.css` files to `.scss` and use `<style
lang="scss">` in your `.vue` files.
