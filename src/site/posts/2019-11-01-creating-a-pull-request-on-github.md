---
date: 2019-11-01
title: Creating a Pull Request on GitHub
description: Step-by-step guide on how to open a Pull Request on GitHub
slug: creating-a-pull-request-on-github
tags:
    - github
    - git
---

Pull requests allow you to let others know about features and fixes that you'd
like to add to a [GitHub](https://github.com/) project repository.

Once you open a pull request, you'll be able to discuss and review your proposed
changes with other collaborators, adding more commits if necessary, before your
changes are merged into the base branch.

With a pull request, your changes are proposed in a new branch, which ensures
that the master branch only contains finished and approved work.

In this short guide, I'll describe the basic process of submitting a pull
request on GitHub.

## Prerequisites

- Basic knowledge of `git` via command line 
- [GitHub](https://github.com/) account
- A project you'd like to contribute to

## Fork the repository

Sign-in to your GitHub account and fork the repository of the project you'd like
to contribute to:

![Fork the repository](/img/articles/2019-11-01-fork_repo.png)

This creates a new repository copy, separate from the original codebase, owned
by you. Modify it as you please, it will not interfere with the original
project.

## Clone the repository

Download a local project codebase, by cloning the repository you've forked:

```bash
git clone https://github.com/ramigs/JavaScript30-1.git
```

You can get the URL from here:

![Clone the repository](/img/articles/2019-11-01-clone_url.png)

Navigate to the project folder:

```bash
cd JavaScript30-1/
```

## Create a new branch

A git branch is simply a divergent line of development, a pointer to a different
version of the codebase.

Create a new branch where you´ll make your changes. Give it a suggestive name,
related to what the pull request intends to fix:

```bash
git checkout -b fix-challenge-12-cornify-https
```

## Add your changes

Go ahead and implement your fix or new feature locally.

## Confirm build, tests and docs

Make sure the changes you've made, still keep the build process running
correctly. Run tests, if there are any, and update/regenerate the documentation,
if necessary.

Most importantly, follow the contributing guidelines of the project.

## Confirm updated files

Check which files have local changes pending:

```bash
git status
```

Validate the exact lines that were changed in each file:

```bash
git diff
```

## Commit the changes locally

Commit the changes to your local repository:

```bash
git add .
```

```bash
git commit -m "Replacing http by https in cornify.js import, to avoid insecure mixed content issues in some hosting providers"
```

## Push your branch to GitHub

```bash
git push origin fix-challenge-12-cornify-https
```

When the push executes, browse to your forked repo on GitHub, where GitHub will
recognize the branch you've just pulled.

Go ahead and click **Compare & Pull Request**:

![Push your branch to GitHub](/img/articles/2019-11-01-compare_and_pull_request.png)

## Open pull request

One last confirmation to the changes you're adding, to the subject and body of
your message, and you're ready to open your pull request:

![Create Pull Request](/img/articles/2019-11-01-create_pull_request.png)

Congratulations 🎉! You've just submitted your pull request.

A notification was sent to the owner of the repository, with a request to
**merge** the changes.

Now, the owner of the repository will review your changes, and if everything
goes well, merge them with the main branch of the project.