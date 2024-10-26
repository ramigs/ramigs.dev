---
date: 2024-10-26
title: "TypeScript: conditionally type a property based on another property"
description: "TypeScript: using a discriminated union to conditionally type a property based on another property"
slug: typescript-conditionally-type-a-property-based-on-another-property
tags:
  - typescript
---

Let's say we want to model a workout plan in TypeScript.

A workout plan has:

- id, name, creation date, updated date
- type (cardio or strength training)
- a list of exercises

Depending on the workout type, the list of exercises should be typed
accordingly, i.e., a cardio exercise has distance and duration, while a strength
training exercise has number of sets, number of reps, and weight.

How can we achieve that?

The following is one way to do it. First, we set a base type **without** type
and list of exercises:

```js
type WorkoutPlanBase = {
  id: number
  workoutName: string
  created_at: Date
  updated_at: Date
}
```

Then, we define our workout plan type using an intersection (to _extend_ from
the base type) and a **discriminated union** (where we use the literal type of
`workoutType` to specify the respective two possible types of `exercises`):

```js
type WorkoutPlan = WorkoutPlanBase &
  (
    | { workoutType: "strength", exercises: StrengthTrainingExercise[] }
    | { workoutType: "cardio", exercises: CardioExercise[] }
  );
```

[This
example](https://hashnode.blainegarrett.com/typescript-conditional-scenarios#scenario-4-exclusive-or-within-a-type)
from Blaine Garret's article was very helpful for my understanding.
