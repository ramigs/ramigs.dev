---
date: 2022-03-09

title: "[TIL] GitHub Actions: how to get execution status of a specific job"
description: "GitHub Actions: How to get execution status of a specific job"
slug: github-actions-how-to-get-status-execution-of-a-specific-job
tags:
  - github
  - actions
---

TIL that in GitHub Actions, one can use `needs.job.result` to get the execution
status of a specific job.

Let's say you have a job named `invalidate-cache`. You can then, in another job,
check its execution status, like so:

```yaml
if: needs.invalidate-cache.result == 'success'
```
