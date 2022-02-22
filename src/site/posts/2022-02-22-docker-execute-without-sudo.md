---
date: 2022-02-22

title: "[TIL] Docker: How to execute without sudo"
description: "Avoid having to type sudo every time when executing the command docker on Ubuntu"
slug: docker-execute-without-sudo
tags:
  - til
  - docker
  - linux
  - ubuntu
  - sudo
---

On certain Linux distributions, such as Ubuntu, the `docker` command can only be
executed by the root user or by a user in the `docker` group.

For the sake of convenience, to not have to type `sudo` every time, user can be
added to the `docker` group, as so:

```
sudo usermod -aG docker ${USER}
```

Source:

- [How To Install and Use Docker on Ubuntu 20.04 - Brian Hogan](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04#step-2-executing-the-docker-command-without-sudo-optional)
