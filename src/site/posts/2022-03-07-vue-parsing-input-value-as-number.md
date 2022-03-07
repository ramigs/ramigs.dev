---
date: 2022-03-07

title: "[TIL] Vue: parsing input value as number"
description: "Using modifier .number on v-model in order to parse an input value as number"
slug: vue-parsing-input-value-as-number
tags:
  - vue
  - html
---

TIL about the Vue modifier `.number` on `v-model`, which can be used to parse
the value of an `<input>` element as `number` (instead of as `string`):

```html
<input v-model.number="searchFilters.amount" />
```

`typeof searchFilters.amount` will be `number`.
