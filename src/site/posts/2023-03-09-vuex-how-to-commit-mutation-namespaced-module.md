---
date: 2023-03-09

title: "[TIL] Vuex: how to commit a mutation for a specific namespaced module"
description: "Vuex: how to commit a mutation for a specific namespaced module"
slug: vuex-how-to-commit-mutation-namespaced-module
tags:
  - vue
  - vuex
  - jest
---

TIL how to execute a Vuex mutation inside a namespaced module, from object `Store`.

This can be particularly useful to initialize state when using `jest`:

```js
const store = createStore();

store.commit("AuthModule/setInitialData", initialData);
```
