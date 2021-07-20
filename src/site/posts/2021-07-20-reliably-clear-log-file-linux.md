---
date: 2021-07-20
title: How to reliably clear a log file on Linux
description: Presenting file truncation and log rotation as two viable approaches for reliably clearing a log file on Linux
slug: reliably-clear-log-file-linux
tags:
  - linux
  - inode
  - truncate
  - logrotate
---

Have you ever found your Linux server running out of disk space, only to
discover a single log file taking up gigabytes of storage?

Well, I have 😅. Recently, in one of the servers I'm managing, I detected a 5 GB
(and steadily increasing) `/var/log/maillog` file. 


Turned out to be an issue with an incomplete removal of a hosting control panel
tool that was causing the log file to be written to every second.

After fixing the issue that was causing this non-stop growth of the log, I began
looking for a way to reliably get the disk space back.

I had a sneaky suspicion that simply `rm`'ing and recreating the file
would not be such a great idea. 

Turns out my hunch was right. My investigation led me to learn that when a
process has a file opened - either for read or write, it's actually holding a
handle to that file's [inode](https://linuxhandbook.com/inode-linux/).

> inode is a Linux filesystem data structure that's assigned to each created
file. Its purpose is to store various metadata about the file.

If the file gets deleted by a different process, this may cause other programs
that reference that inode to malfunction. Also, the disk space is not freed up
until processes close their handle on it.

Moreover, file ownership and permissions will most likely get messed up, as the
newly created file won't have the same inode as the deleted file.

## File truncation

Ok, so deleting and recreating the log file is not a viable solution. What can
we do instead to free up that disk space?

We need to **truncate** the contents of the file, while its inode remains the
same. In other words, we need to clear the contents of the file without deleting
it.

Manually editing the file is not *clean* solution a at all. What if the file
gets written to by another process while we're editing it?

To truncate the log file we can rely on Linux's standard output redirect
operator to redirect the output of *nothing* to the file:

```sh
> /var/log/maillog
```

Or, we can use command `truncate`, which truncates the file to a precise length
in bytes:

```sh
truncate -s 0 /var/log/maillog
```

Truncating a file is also much faster than deleting the file, recreating it, and
setting the correct ownership and permissions.

## Log rotation

Before we wrap up, it's important to bring up the topic of log rotation.

In a more critical/production scenario, you may need to store the logs for
archive. Log rotation helps us achieve this, by renaming and compressing old log
files, making them ready to be backed up. `logrotate` is the Linux tool that
achieves precisely this.

After you've backed up a rotated log file, it's fine to just remove it and gain
that disk space back.

## References

- [https://www.howtogeek.com/465350/everything-you-ever-wanted-to-know-about-inodes-on-linux/](https://www.howtogeek.com/465350/everything-you-ever-wanted-to-know-about-inodes-on-linux/)
- [https://linuxhandbook.com/inode-linux/](https://linuxhandbook.com/inode-linux/)
- [https://serverfault.com/questions/285843/is-there-a-proper-way-to-clear-logs](https://serverfault.com/questions/285843/is-there-a-proper-way-to-clear-logs)
- [https://serverfault.com/questions/665213/missing-var-log-mail-log-after-deleting-it-how-do-i-recreate-it](https://serverfault.com/questions/665213/missing-var-log-mail-log-after-deleting-it-how-do-i-recreate-it)
- [https://askubuntu.com/questions/1138180/can-i-delete-var-log-files-because-of-low-root-space-in-ubuntu](https://askubuntu.com/questions/1138180/can-i-delete-var-log-files-because-of-low-root-space-in-ubuntu)
- [https://linuxhandbook.com/empty-file-linux/](https://linuxhandbook.com/empty-file-linux/)
- [https://linux.die.net/man/1/truncate](https://linux.die.net/man/1/truncate)
- [https://linuxconfig.org/logrotate](https://linuxconfig.org/logrotate)
- [https://www.tecmint.com/install-logrotate-to-manage-log-rotation-in-linux/](https://www.tecmint.com/install-logrotate-to-manage-log-rotation-in-linux/)
- [https://www.redhat.com/sysadmin/setting-logrotate](https://www.redhat.com/sysadmin/setting-logrotate)