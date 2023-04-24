---
date: 2023-04-24
title: "GitHub Actions: how to skip tests in a PR workflow based on changed files"
description: "GitHub Actions: how to conditionally skip tests in the PR pipeline based on changed files"
slug: github-actions-how-to-skip-tests-in-pr-workflow-based-on-changed-files
tags:
  - github
  - actions
---

Let's say you have a `pull_request` GitHub Action workflow that runs unit tests
and end-to-end tests on every PR that targets branch `main`:

```yaml
name: Test pipeline

on:
  pull_request:
    branches: [main]

jobs:
  run-unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

  run-browser-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
```

This is a valuable software development practice, because tests (assuming they
are well designed and providing reasonable coverage) are running automatically
on every PR, offering immediate feedback to developers about whether changes
being included are breaking something or not.

You may have also opted to configure a branch protection rule for `main`,
requiring status checks (in this case, tests) to pass before merging is allowed:

![Require status checks](/img/articles/2023-04-24-require-status-checks.png)

By using this configuration, the workflow's jobs will be executed and reported
in the pull request (visible in the **Checks** tab and near the merge button):

![PR checks](/img/articles/2023-04-24-pr-checks.png)

The downside of this setup is that tests will have to run and pass on each and
every PR, even when changed files are not source code (such as `README` updates
and documentation contributions).

In such cases, couldn't the test executions be skipped, providing the ability to
immediately merge the PR and spare (potentially billable) workflow execution
time?

Let's see how we can achieve this!

First, let's make use of
[tj-actions/changed-files](https://github.com/tj-actions/changed-files) and add
a new step in each job to get the list of changed files (excluding markdown
files):

```yaml
jobs:
  run-unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Get all changed file(s), excluding the docs
        id: changed-files-excluded
        uses: tj-actions/changed-files@v35
        with:
          files_ignore: |
            **/*.md
```

The output of this step can now be used in subsequent steps, so that they are
executed only if changed files are not markdown:

```yaml
- uses: actions/setup-node@v3
  if: steps.changed-files-excluded.outputs.any_changed == 'true'
  with:
    node-version: "16.x"
```

In this way, jobs will still execute with a `success` status (which is needed
for PR checks), with individual steps themselves being skipped.

Please note that the setup above can probably be optimized to not require `if`
to be included in all subsequent steps, but instead immediately interrupt the
job and `exit` with status `0` (no errors).

Also note that there are most likely other ways to achieve this outcome, such as
for example using
[fkirc/skip-duplicate-actions](https://github.com/fkirc/skip-duplicate-actions),
but I have not explored them in detail.

Also note that in case you have status checks configured like we do in this
example, in order to achieve this outcome, the intervention will have to be at
the job-level (and not workflow-level).
