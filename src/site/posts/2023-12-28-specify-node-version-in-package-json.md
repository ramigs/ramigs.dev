---
date: 2023-12-28
title: "[TIL] Specify node version in package.json"
description: "Specify which node version should be used to run a project"
slug: specify-node-version-in-package-json
tags:
  - til
  - javascript
  - node
  - npm
---

One way to minimize "it works on my machine" type of issues and bad surprises
related to incompatibilities (especially in team contexts) is to be very
specific (and if possible, ideally enforce) about the software versions that are
used across the entire stack.

TIL about `engines.node` in `package.json`. As stated in the
[documentation](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines),
it's used to "specify the version of node that your stuff works on".

When `engines.node` is specified, someone that tries to `yarn install` (and not
using a compatible `node` version) will get an error similar to `The engine
"node" is incompatible with this module. Expected version "v20.10.0". Got
"16.20.2"`.

Run the following command to set `engines.node` according to the current `node`
version:

```sh
npm pkg set engines.node=$(node -v)
```
