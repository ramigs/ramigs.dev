---
date: 2023-12-01
title: "Migrating to Cypress.js 13 is awesome DevEx"
description: "My experience updating Cypress.js versions in two different projects"
slug: migrating-to-cypress-13-is-awesome-devex
tags:
  - til
  - cypress
---

Today I've successfully migrated Cypress.js to `v13.6.0` in two projects (one
from `v12.17.3`, the other from `v9.7.0`), pretty much flawlessly and in a
matter of minutes.

In a nutshell, what I did:

- update to new version in `package.json`
- `yarn install`
- execute `cypress open`
- Cypress recognizes the migration, and suggests using the migration tool;
  follow along with the three migrations steps

And ... it's done! Well pretty much. In my case, I also started to get some
conflicts with Jest, which I had to
[fix](https://github.com/cypress-io/cypress/issues/22059#issuecomment-1148921141).

Was such a nice experience using the migration tool, take a look at the amazing
UI of one of the migration steps (replacing `cypress.json` with
`cypress.config.ts`, because `cypress.json` is no longer supported):

![Require status checks](/img/articles/2023-12-01-migrating-to-cypress-13-is-awesome-devex.png)

Thank you Cypress team, great work! We know how difficult version management can
be, especially in the JavaScript ecosystem 😅.

See more about Cypress version migration
[here](https://docs.cypress.io/guides/references/migration-guide).
