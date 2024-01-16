---
date: 2024-01-16
title: "GitHub Actions: conditional values"
description: "How to conditionally set a value in GitHub Actions"
slug: github-actions-conditional-values
tags:
  - git
  - github
  - actions
---

How to conditionally set a value on GitHub Actions:

```yaml
env:
  TOKEN: github.event.inputs.env == 'dev' && secrets.DEV_TOKEN || secrets.PROD_TOKEN
```

If `github.event.inputs.env == 'dev'` evaluates as `true`, `TOKEN` will have
value `secrets.DEV_TOKEN`; otherwise it will have value `secrets.PROD_TOKEN`.
