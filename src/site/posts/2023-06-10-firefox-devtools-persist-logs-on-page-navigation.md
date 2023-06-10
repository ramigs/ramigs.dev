---
date: 2023-06-10
title: "[TIL] Firefox DevTools: how to persist logs on page navigation"
description: "How to persist Web Console and Network Monitor logs in Firefox Developer Tools upon page navigation and page reload"
slug: firefox-devtools-persist-logs-on-page-navigation
tags:
  - til
  - firefox
  - devtools
---

TIL about a Firefox DevTools option, which allows to specify whether the request
list and logs should be cleared or not on page navigation (or page reload).

It can be specially helpful while developing/troubleshooting.

The default is for requests and logs to be cleared, so to instead have them
persist, open up DevTools, click the settings cog wheel, and select **Persist
Logs**:

![Persist Logs](/img/articles/2023-06-10-persist-logs.png)
