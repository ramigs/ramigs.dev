---
date: 2024-12-02
title: "Raspberry Pi 4 + Ubuntu: how to control the Case Fan"
description: "How to control the Raspberry Pi 4 fan on Ubuntu Server"
slug: raspberry-pi-4-ubuntu-how-to-control-the-case-fan
tags:
  - self-hosting
  - homelab
  - pi
  - ubuntu
---

I've recently bought a [Raspberry Pi 4 Model
B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/), together with
its official [Case](https://www.raspberrypi.com/products/raspberry-pi-4-case/)
and [Case Fan](https://www.raspberrypi.com/products/raspberry-pi-4-case-fan/).

![Raspberry 4 Case Fan](/img/articles/raspberry-case-fan.webp)

After installing Ubuntu Server, noticed that the fan was always running
non-stop. The fan has an annoying noise, and it should only run when needed,
i.e., when the Pi's temperature rises above a certain threshold.

Contrary to Raspberry OS, where the fan is disabled by default (and can be
configured from the UI via Preferences -> Raspberry Pi Configuration ->
Performance), Ubuntu Server requires an extra configuration step to be performed
from the command line.

After the installation is finished, make sure the system is up-to-date:

```sh
sudo apt update
sudo apt full-upgrade
```

Based on my experiments, this step seems to really be needed, maybe because it
installs some Raspberry Pi required drivers (?).

Finally, edit the file `/boot/firmware/config.txt:` and add the following at the
end of the file:

```sh
[all]
dtoverlay=gpio-fan,gpiopin=14,temp=60000
```

A reboot is needed for changes to take effect.

`temp` is the temperature at which the fan turns on. By default, on Raspberry OS
it's set to 80º Celsius, but I've decided to set it to 60º Celsius.

To confirm everything is working as expected (the fan is not running non-stop
anymore and turns on and off based on the Pi's temperature) I used
[`stressberry`](https://github.com/nschloe/stressberry).
