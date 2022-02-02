---
date: 2022-02-02
title: "[TIL] Linux commands: recursive options instead of wildcards"
description: "Preferring the usage of recursive options in Linux commands in order to prevent errors"
slug: linux-commands-recursive-options
tags:
  - til
  - linux
  - bash
  - shell
  - cp
  - scp
  - zip
---

TIL that in commands such as `cp`, `scp`, and `zip`, it is preferable to use the
command's native recursive options (e.g.,`-r`, `-R`) instead of wildcards (e.g.,
`*`). The reason is to avoid unexpected errors, such as `-bash: /usr/bin/zip:
Argument list too long`.