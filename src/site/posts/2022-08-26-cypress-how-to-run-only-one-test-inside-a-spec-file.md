---
date: 2022-08-26

title: "[TIL] Cypress: How to run only one test inside a spec file"
description: "Cypress: How to run only one test inside a spec file to improve efficiency when creating tests"
slug: cypress-how-to-run-only-one-test-inside-a-spec-file
tags:
  - cypress
  - til
---

TIL a Cypress tip that can help improve efficiency when creating tests.

Let's say you have a spec file with several tests. To avoid having to execute
all the tests in the file, you can temporarily use `it.only(`, instead of `it(`.

Don't forget to revert the change when you're done, otherwise the other tests
will not execute when they should (e.g., in a pipeline execution).

See more details in the
[documentation](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Excluding-and-Including-Tests).
