---
date: 2023-06-11
title: "[TIL] Firefox DevTools: request duration"
description: "How to find out the duration of requests in Firefox Developer Tools"
slug: firefox-devtools-request-duration
tags:
  - til
  - firefox
  - devtools
---

TIL how to check the duration of a request (time from start of the request until
the end of the respective response) in Firefox DevTools.

It can be specially helpful for performance analysis.

To display the Duration column in the network table toolbar, open up DevTools,
select the Network tab, right-click the request table header (any column), and
select **Timings -> Duration**:

![Request Duration](/img/articles/2023-06-11-request-duration.png)

Learn more about the [Network request
list](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/request_list/index.html#network-request-list).
