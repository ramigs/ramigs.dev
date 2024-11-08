---
date: 2024-11-08
title: "[TIL] Dynamically importing JSON in JavaScript"
description: "Dynamic JSON import"
slug: dynamically-importing-json-in-javascript
tags:
  - til
  - javascript
---

TIL that it's possible to dynamically import a JSON file in JavaScript:

```js
const json = (await import("team.json")).default;
```

`import` returns a promise, so async/await can be used. We then need to access
property `default`, since `import` only supports default export.

Find out more about `import()`
[here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import).
