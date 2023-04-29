---
date: 2023-04-28
title: "[TIL] TypeScript type predicates"
description: "Type narrowing in TypeScript using type predicates"
slug: typescript-type-predicates
tags:
  - typescript
  - til
---

Type narrowing is the process by which a type is refined to a more specific
type.

The TypeScript compiler does its best to narrow types using the existing
JavaScript code.

TIL about TypeScript type predicates, a way to be more explicit and have better
control over type inference.

First, we define a function whose return type is a type predicate:

```js
function isAudio(content: Audio | Text): content is Audio {
  return (content as Audio).duration !== undefined;
}
```

We can now use `isAudio` to narrow the type of a variable we're working with,
allowing TypeScript from that point on to _know_ the more specific type:

```js
let content = getContent();

if (isAudio(content)) {
  content.play();
} else {
  content.render();
}
```

Resources:

- [Narrowing - TypeScript
  documentation](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Type predicates - TypeScript
  documentation](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
