---
date: 2023-12-30
title: "Integrating GitHub CLI in my workflow"
description: "Integrating GitHub CLI in my workflow: pull request management"
slug: integrating-github-cli-in-my-workflow
tags:
  - github
---

As the end of the year rapidly approaches, I've been reflecting and looking for
ways to increase my productivity in the next year.

For some time I've been considering integrating [GitHub
CLI](https://cli.github.com/) in my workflow, aiming to reduce the back and
forth between the terminal and the GitHub web UI.

Since I interact with pull requests pretty much everyday, several times a day,
that's where I'll focus mainly.

Listing some useful commands below for reference.

### Open repository in the web browser

```sh
gh browse
```

### List open PRs

```sh
gh pr list
```

### Get status of relevant PRs

```sh
gh pr status
```

### View PR in the browser

```sh
gh pr view --web
```

### Checkout a PR

```sh
gh pr checkout
```

Accepts PR number or branch name.

### Create a PR

```sh
gh pr create
```

It's also possible to skip the interactive PR creation, by directly specify the
title and body:

```sh
gh pr create --title "PR title" --body "PR body"
```

Other options:

- To mark PR as draft use option `-d`.
- To open the web browser to create the PR use option `-w`.

### Close PR

```sh
gh pr close
```

Other options:

- To leave a closing comment use option `-c`.
- To delete the local and remote branch after close use option `-d`.

The entire list of available commands and respective documentation can be found
[here](https://cli.github.com/manual/).
