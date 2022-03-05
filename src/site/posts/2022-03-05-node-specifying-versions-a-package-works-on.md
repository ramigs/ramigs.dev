---
date: 2022-03-05

title: "[TIL] Node: specifying the versions a package works on"
description: "Using configuration engines in package.json to specify which versions a package works on"
slug: node-specifying-versions-a-package-works-on
tags:
  - node
  - npm
---

TIL about configuration `engines` in `package.json`, which can be used as a
best-practice for explicitly specifying under what versions of `node` and `npm`
a package can be installed:

```json
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
```

Note:

- This applies only to **packages** and is related to the moment a package is
  installed with `npm install` as package (e.g., from one directory up), and not
  `npm install` inside a project (which installs the dependencies of the project).

See:

- [package.json - npm documentation](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#engines)
- [The package.json guide - Node documentation](https://nodejs.dev/learn/the-package-json-guide)
- [package.json: engines & engineStrict - and how to use them - Marcus
  Hammarberg](https://www.marcusoft.net/2015/03/packagejson-and-engines-and-enginestrict.html)
