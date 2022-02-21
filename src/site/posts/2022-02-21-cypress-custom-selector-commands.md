---
date: 2022-02-21

title: "[TIL] Cypress custom selector commands"
description: "Configuring custom selector commands in Cypress"
slug: cypress-custom-selector-commands
tags:
  - til
  - cypress
  - e2e
---

You may already know that it's a good practice in Cypress to use `data-*`
attributes (e.g., `data-test`, `data-cy`) for targeting elements.

TIL about two super useful custom selectors that can be added, to avoid always
having to write `[data-test="sign-up"]`:

- `getBySel` yield elements with `data-test` attribute that **matches** a
  specified selector
- `getBySelLike` yield elements with a `data-test` attribute that **contains** a
  specified selector

To use these selectors in your tests, first add them as commands:

```js
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});
```

Then, use them as so:

```js
cy.getBySel("sign-up").click();

cy.getBySel("sign").click();
```

Source:

- [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app)
