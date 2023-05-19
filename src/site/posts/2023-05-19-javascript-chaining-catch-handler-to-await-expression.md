---
date: 2023-05-19
title: "[TIL] JavaScript: directly chaining catch handler to await expression"
description: "JavaScript: chaining catch handler to await expression, outside of try/catch block"
slug: javascript-chaining-catch-handler-to-await-expression
tags:
  - javascript
  - til
---

TIL that it's possible in JavaScript to directly chain a `catch` handler to an
`await` expression:

```js
await fetchProfile().catch((e) => handleFetchProfileError(e));
```

Note that this can be done outside (and without requiring) a `try/catch` block.

This can be specially useful when you'd want the execution to continue and/or
treat the `await` expression individually (i.e., not only one single `catch` for
a block of code).

Many thanks to all contributors in [this Stack Overflow
thread](https://stackoverflow.com/questions/44663864/correct-try-catch-syntax-using-async-await).
