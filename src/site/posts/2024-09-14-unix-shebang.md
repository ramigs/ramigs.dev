---
date: 2024-09-14
title: "[TIL] Unix shebang"
description: "How the Unix shebang is actually used"
slug: unix-shebang
tags:
  - unix
  - bash
  - zsh
---

TIL how the Unix shebang is actually used.

You know that first line in shell scripts starting with `!#`, typically
something like `#!/bin/bash` or `#!/bin/zsh`? That's the shebang.

When a script is used as an executable (i.e., had its execute permission `x` set
and is being executed as `./my-script`), the operating system's program loader
is instructed to run the shell interpreter (`bash` or `zsh`, for example),
passing the rest of the script file content as the first argument to the
interpreter.

This means that the file extension is not actually used by the interpreter. Even
though the presence of the extension has become a common convention (its
presence might provide some visible clue about the file type), [some argue that
extensions should not be used at
all](https://stackoverflow.com/a/27824204/10485152). The rationale behind it is
that the user of the script should not care or need to know about how it was
implemented.
