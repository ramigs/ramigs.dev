---
date: 2022-08-27

title: "[TIL] Typescript: How to define a type for objects with dynamic properties"
description: "Typescript: How to define a type for objects with dynamic properties"
slug: typescript-how-to-define-type-for-objects-with-dynamic-properties
tags:
  - typescript
  - til
---

TIL how to define a type for objects with dynamic properties. By this we mean an
object that can have any number of properties, with unknown property names and
values. However, we know what their **types** should be.

Let's take a look at an example to make this clearer.

Let's say we want to create a type to represent dictionary objects such as:

```js
const dictionary = {
  hello: "olá",
  goodbye: "adeus",
};
```

In this case, we want Typescript to help us enforce that both property name and
property value are of type `string`.

We can use the `Record` utility type, like so:

```js
type MyDictionary = Record<string, string>;

const dictionary: MyDictionary = {};
```

Now, if we try to set something like the following, Typescript will signal an
error and stop us:

```js
// Type 'number' is not assignable to type 'string'.
dictionary.one = 1;
```

This utility type is a name alias for [index
signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures):

```js
type MyDictionary = { [k: string]: string };
```

See:

- [Record<Keys, Type> - TypeScript documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)
- [Define a Type for Object with Dynamic keys in TypeScript - Borislav Hadzhiev](https://bobbyhadz.com/blog/typescript-object-with-dynamic-keys)
