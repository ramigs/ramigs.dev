---
date: 2022-03-01

title: "[TIL] How to parse flags passed to a bash script"
description: "Parsing flags passed to a bash script using built-in function getopts"
slug: how-to-parse-flags-passed-to-a-bash-script
tags:
  - bash
  - getopts
---

TIL how to parse flags passed to a bash script, using the built-in function
`getopts`.

Let's say you have a script named `maintenance.sh`, to which you'd like to pass
some flags:

- `-e`
- `-d`
- `-f filename`

These flags can be parsed in the script, like so:

```bash
while getopts edf: flag
do
    case "${flag}" in
        e) echo "Got flag -e";;
        d) echo "Got flag -d";;
        f) echo "Got flag -f with respective option ${OPTARG}";;
    esac
done
```

Notice in the arguments of `getopts` that `f` is the only flag that is followed
by `:`, which is used to indicate that the flag is followed by a respective
value.

Script can then be called as `sh maintenance.sh -e` or `sh maintenance.sh -e -f file.json`, for example.

See:

- [How to Use Command Line Arguments in a Bash
  Script](https://www.baeldung.com/linux/use-command-line-arguments-in-bash-script)
- [getopts man page](https://man7.org/linux/man-pages/man1/getopts.1p.html)
