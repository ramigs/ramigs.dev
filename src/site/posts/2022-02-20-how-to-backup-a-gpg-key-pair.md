---
date: 2022-02-20

title: "[TIL] How to backup a GPG key pair"
description: "How to backup a GPG key pair and its respective revocation certificate"
slug: how-to-backup-a-gpg-key-pair
tags:
  - til
  - gpg
  - backup
---

TIL that after generating a GPG key pair, one should always backup the
following:

1. **key pair** itself: `gpg -o private.gpg --export-options backup --export-secret-keys my-key`
2. **revocation certificate**: `gpg --output revoke.asc --gen-revoke my-key`
3. **key passphrase**: should be stored separately from the above, ideally on a
   password manager

> Always consider carefully your security requirements for decisions regarding
> redundancy and backup storage location (ideally on offline media).

For more information, please check:

- [Daily use of GnuPG - The GNU Privacy
  Handbook](https://www.gnupg.org/gph/en/manual/c481.html)
- [Backup and Restore a GPG Key -
  JWillikers](https://www.jwillikers.com/backup-and-restore-a-gpg-key)
- [Generating a revocation certificate - The GNU Privacy
  Handbook](https://www.gnupg.org/gph/en/manual/c14.html#REVOCATION)
