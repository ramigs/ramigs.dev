---
date: 2022-02-10
title: "[TIL] logrotate: how to prevent deletion of old logs"
description: "How to avoid logrotate to delete rotated logs"
slug: auth0-email-delivery
tags:
  - til
  - logrotate
---

TIL that in a logrotate configuration file, with setting `daily` configured, if
`rotate` is not explicitly set, old rotated log files will be deleted (after one
rotation, it seems).

To avoid this, set `rotate n`, where `n` is the number of logs to be kept.

Haven't found a way to completely disable deletion. Common practice seems to be
setting `rotate` with a *high number*. See:

- [https://serverfault.com/questions/50181/how-i-configure-logrotate-to-not-delete-my-log-files-after-rotation](https://serverfault.com/questions/50181/how-i-configure-logrotate-to-not-delete-my-log-files-after-rotation)
- [https://serverfault.com/questions/377031/logrotate-does-not-remove-old-logs](https://serverfault.com/questions/377031/logrotate-does-not-remove-old-logs)
- [https://serverfault.com/questions/694935/logrotate-how-change-it-so-that-it-never-deletes-logs-and-will-create-a-gz-ev](https://serverfault.com/questions/377031/logrotate-does-not-remove-old-logs)

Example of the configuration file I'm referring to:

```
/nginx-logs/access.log
/nginx-logs/error.log
{
    daily
    rotate 30
    dateext
    dateformat .%Y-%m-%d
    extension .log
    sharedscripts
    compress
    postrotate
      sudo docker kill --signal=USR1 nginx
    endscript
}
```
