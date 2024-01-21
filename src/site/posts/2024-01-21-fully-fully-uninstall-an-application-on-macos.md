---
date: 2024-01-21
title: "Fully uninstall an application on macOS"
description: "How to fully uninstall an application on macOS"
slug: fully-uninstall-an-application-on-macos
tags:
  - macos
---

Unfortunately, not all applications provide a clean, full uninstall.

On macOS, one generally deletes the `.app` file from `/Applications`. But many
applications leave behind support files (cache, preferences, etc.), so might be
a good idea to go through the following folders and delete the respective
leftovers:

- /Library
- /Library/Application Support
- /Library/LaunchAgents
- /Library/LaunchDaemons
- /Library/Preferences
- ~/Library/Application Scripts
- ~/Library/Application Support
- ~/Library/Caches
- ~/Library/Cookies
- ~/Library/Group Containers
- ~/Library/Launch Agents
- ~/Library/Logs
- ~/Library/Preferences
- ~/Library/Saved Application State
