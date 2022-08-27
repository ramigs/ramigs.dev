---
date: 2022-08-27

title: "[TIL] Typescript: How to define a type for objects with dynamic properties"
description: "Typescript: How to define a type for objects with dynamic properties"
slug: typescript-how-to-define-type-for-objects-with-dynamic-properties
tags:
  - typescript
  - til
---

TIL how to define a type for objects with dynamic properties (any number of properties with unknown key names and values).

Let's say we want to create a type for objects such as:

```js
const cache = {
  1: "value 1",
  2: "value 2",
  3: "value 3",
};
```

We can use the `Record` utility type, like so:

```js
type Cache = Record<string, string>;

const cache: Cache = {};
```

This utility type is an alternative to and a name alias of:

```js
type Cache = { [k: string]: string };
```
