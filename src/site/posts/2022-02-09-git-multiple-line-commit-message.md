---
date: 2022-02-09
title: "[TIL] git: multiple line commit message"
description: "How to commit with multiple line commit message in git"
slug: git-multiple-line-commit-message
tags:
  - til
  - git
---

TIL how to commit with multiple line commit message in git from the command
line:

```
$ git commit -m 'line 1
line 2
'
```

The use of single quotes `'` instead of double `"` is what does the trick here.
