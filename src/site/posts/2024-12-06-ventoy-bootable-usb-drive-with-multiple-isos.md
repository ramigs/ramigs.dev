---
date: 2024-12-06
title: "[TIL]: Ventoy: bootable USB drive with multiple ISOs"
description: "Ventoy: open source tool to create bootable USB sticks with multiple ISOs"
slug: ventoy-bootable-usb-drive-with-multiple-isos
tags:
  - til
  - self-hosting
  - homelab
  - ventoy
---

TIL about [Ventoy](https://www.ventoy.net/), an amazing open source tool which
allows to create bootable USB drives with multiple ISOs.

![Ventoy](/img/articles/ventoy.png)

No need anymore to format the USB drive every time I need to install a new
operating system. The same USB stick can store more than one ISO.

I'm currently storing GParted, Fedora, and Ubuntu images in the same USB stick.
When I boot from it, I just need to select the desired image from the menu.

To add a new ISO, one simply needs to drag and drop the respective file to the
USB stick.
