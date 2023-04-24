---
date: 2023-04-07

title: "How to fix deprecated GitHub Action chrisdickinson/setup-yq"
description: "How to fix deprecated Node.js 12 GitHub Action chrisdickinson/setup-yq"
slug: how-to-fix-deprecated-github-action-chrisdickinson-setup-yq
tags:
  - github
  - actions
  - node
---

Node.js 12 actions are currently being deprecated on GitHub Actions.

If you're using
[`chrisdickinson/setup-yq`](https://github.com/chrisdickinson/setup-yq) you're
probably encountering the following warning:

```
Node.js 12 actions are deprecated.
Please update the following actions to use Node.js 16: chrisdickinson/setup-yq@latest.
```

Since this project has not been updated to use Node 16, in order to fix do the
following:

- remove usage of `chrisdickinson/setup-yq@latest`, it's no longer needed as
  `yq` is now part of `ubuntu-latest`
- (if needed) update usage of command `yq` because it works [in a different
  way](https://mikefarah.gitbook.io/yq/upgrading-from-v3) on v4 (action uses v3)
