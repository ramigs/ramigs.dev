---
date: 2024-10-09
title: "TypeScript: union members as object properties"
description: "TypeScript: how to type an object that has as properties all members of a string union type"
slug: typescript-union-members-as-object-properties
tags:
  - typescript
---

Let's say we have the following string union type to define all the possible
values of a status:

```js
type Status = "Completed" | "Pending" | "Canceled";
```

We also have another string union type to define all the possible colors of a
badge component:

```js
type BadgeColor = "green" | "yellow" | "red";
```

We have the following object to map statuses with badge colors:

```js
const statusColors = {
  Completed: "green",
  Pending: "yellow",
  Canceled: "red",
};
```

We'd like to type this object to make sure we will never forget to update it, in
case we add or remove a status value. TypeScript should throw an error to let us
know.

How can we achieve that?

We can annotate the object as follows combining an index signature with the
JavaScript `in` operator:

```js
const statusColors: { [key in Status]: BadgeColor } = {
  Completed: "green",
  Pending: "yellow",
  Canceled: "red",
};
```

Now, if we add a new status `Unknown` to the `Status` union type, TypeScript
complains:

`Property 'Unknown' is missing in type '{ Completed: "green"; Pending: "yellow";
Canceled: "red"; }' but required in type '{ Completed: BadgeColor; Pending:
BadgeColor; Canceled: BadgeColor; Unknown: BadgeColor; }'.`

If we remove the status `Pending`, TypeScript will also complain:

`Object literal may only specify known properties, and 'Pending' does not exist
in type '{ Completed: BadgeColor; Canceled: BadgeColor; }'.`

If we try to assign a non-existing `BadgeColor`, TypeScript will also complain:

`Type '"blue"' is not assignable to type 'BadgeColor'.`
