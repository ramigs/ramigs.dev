---
date: 2024-12-25
title: "Vue.js: notes on Slots"
description: "Notes on Vue.js Slots"
slug: vue-notes-on-slots
tags:
  - vue
---

Vue slots allow us to create generic components, by passing template content
(custom markup) to child components.

Let's say we have a `MyButton` component which we'd like to make generic. We can
set a slot inside its template:

```js
<button>
  <slot></slot>
</button>
```

We can then pass custom content to `MyButton`:

```js
<MyButton>Submit</MyButton>
```

The HTML node `Submit` replaces the tag `<slot></slot>` when the component gets
rendered.

Optionally, we can specify some fallback content, to be rendered when the parent
does not provide content for a slot:

```js
<button>
  <slot>Click me</slot>
</button>
```

We're not limited to text, we can also pass any valid template content:

```js
<MyButton>
  <strong>S</strong>ubmit
</MyButton>
```

Since we didn't explicitly name the slot above, it will implicitly become the
default slot, named `default`. The following achieves the same result as the
above:

```js
<MyButton>
  <template v-slot:default>
    <strong>S</strong>ubmit
  </template>
</MyButton>
```

Instead of `v-slot:`, we can use the shorthand `#`, as in `<template #default>`.

Named slots start to become useful when we want our component to provide more
than one slot:

```js
<button>
  <slot name="emoji"></slot>
  <slot>Click me</slot>
</button>
```

```js
<MyButton>
  <template v-slot:emoji>👍</template>
  <template v-slot:default>
    <strong>S</strong>ubmit
  </template>
</MyButton>
```

Sometimes we may have some state inside our child component that we'd need the
parent to be aware of (to render the content of a slot). We can use scoped slots
to achieve that:

```js
<button @mouseenter="hover = true" @mouseleave="hover = false">
  <slot name="emoji" :hover="hover"></slot> <slot>Submit</slot>
</button>
```

```js
{% raw %}
<MyButton>
  <template #emoji="{ hover }">{{ hover ? '👍' : '👎' }}</template>
</MyButton>
{% endraw %}
```
