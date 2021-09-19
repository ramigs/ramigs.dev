---
date: 2021-07-20
title: How to reliably clear a Linux log file
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
process opens a file - either for read or write, it's actually holding a handle
to that file's [inode](https://linuxhandbook.com/inode-linux/).

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

We need the file's inode to remain the same, so we'll **truncate** its contents
without deleting it.

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

Some resources that helped me write this article:

- [Everything You Ever Wanted to Know About inodes on Linux](https://www.howtogeek.com/465350/everything-you-ever-wanted-to-know-about-inodes-on-linux/)
- [Everything You Need to Know About inodes in Linux](https://linuxhandbook.com/inode-linux/)
- [Server Fault Question: Is there a proper way to clear logs?](https://serverfault.com/questions/285843/is-there-a-proper-way-to-clear-logs)
- [Server Fault Question: Missing /var/log/mail.log (after deleting it) - How do I recreate it?](https://serverfault.com/questions/665213/missing-var-log-mail-log-after-deleting-it-how-do-i-recreate-it)
- [Ask Ubuntu Question: Can I delete /var/log files because of low root space in Ubuntu?](https://askubuntu.com/questions/1138180/can-i-delete-var-log-files-because-of-low-root-space-in-ubuntu)
- [How to Empty a Log File in Linux](https://linuxhandbook.com/empty-file-linux/)
- [truncate(1) - Linux man page](https://linux.die.net/man/1/truncate)
- [logrotate command in Linux with examples](https://linuxconfig.org/logrotate)
- [How to Setup and Manage Log Rotation Using Logrotate in Linux](https://www.tecmint.com/install-logrotate-to-manage-log-rotation-in-linux/)
- [Setting up logrotate in Linux](https://www.redhat.com/sysadmin/setting-logrotate)