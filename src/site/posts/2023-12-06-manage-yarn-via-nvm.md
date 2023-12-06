---
date: 2023-12-06
title: "[TIL] Manage yarn via nvm"
description: "How to manage different yarn versions via nvm"
slug: manage-yarn-via-nvm
tags:
  - til
  - yarn
  - node
  - nvm
---

TIL that it's possible to manage via `nvm`. not only `node` versions, but also
`yarn` versions.

The advantage of doing so (instead of one single installation via `brew`, for
example), is that you're able to _pin_ a specific `yarn` version to each `node`
version.

For already installed `node` versions, make sure you're using the intended
version (i.e., `which node` should print something like
`$NVM_DIR/versions/node/v20.10.0/bin/node`) and then run `npm install -g yarn`.

For future `node` versions you'll install, there's a way to automatically
install `yarn` alongside `node`, without needing to explicitly install.

We can use `nvm`'s [default global packages from file while
installing](https://github.com/nvm-sh/nvm#default-global-packages-from-file-while-installing).

To do so, create a text file at `$NVM_DIR/default-packages`:

```
yarn
```

Now no more old versions of `yarn` 🎉, you'll get the latest every time you
install a new `node` version.

You can also explore the possibility of adding other `npm` packages that might
interest you, such as `@vue/cli` or `nuxi`, for example.

Source:

[Stack Overflow answer](https://stackoverflow.com/a/61175494/10485152)
