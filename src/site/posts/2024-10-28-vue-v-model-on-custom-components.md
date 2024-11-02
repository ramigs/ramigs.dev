---
date: 2024-11-02
title: "Vue: v-model on custom components"
description: "Vue.js: Understanding the usage of v-model in custom components"
slug: vue-v-model-on-custom-components
tags:
  - vue
---

In Vue.js we use `v-model` to achieve two-way data biding.

Using `v-model` on form inputs is probably its most well-known use case, where
we want to keep the state of the input and some JavaScript state in sync.

However, `v-model` can also be used on custom components.

Let's say we have a parent component and a child component. We have the state in
the parent component but we want the child component to be able to update it.

## Before Vue 3.4

We would do something like this in the parent component:

```js
const selectedColor = ref('yellow')

<ChildComponent v-model="selectedColor" />
```

In the child component we would set a prop named `modelValue` and emit the event
`update:modelValue` (with its respective new value) when we wanted
`selectedColor` to be updated:

```js
const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);

const updateColor = (color) => {
  emit("update:modelValue", color);
};
```

**Note:** The prop and event names must be exactly those for `v-model` to work
as expected.

## Since Vue 3.4

Starting from Vue 3.4, there's a more convenient, less verbose way to achieve
the same result. We can use the `defineModel()` macro.

The parent component remains the same. In the child component no need for the
prop and the emit. `defineModel()` does it all behind-the-scenes, and we can
just update the value directly in the child component:

```js
const selectedColor = defineModel();

const updateColor = (color) => {
  selectedColor.value = color;
};
```
