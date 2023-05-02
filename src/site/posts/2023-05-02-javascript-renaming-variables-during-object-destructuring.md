---
date: 2023-05-02
title: "[TIL] JavaScript: renaming variables during object destructuring"
description: "JavaSctipt: how to rename variables when doing destructuring an object"
slug: javascript-renaming-variables-during-object-destructuring
tags:
  - javascript
  - til
---

TIL that it's possible in JavaScript to rename variables at the moment of destructuring.

Let's say you have an object `user`, previously fetched from an API, with `snake_case`
property names.

However, you'd like variable names to be in `lowerCamelCase`.

You can do the following:

```js
const { user_id: userId, age } = user;
```

Variable name is now `userId`.
