---
date: 2022-02-10
title: "[TIL] Email delivery in Auth0"
description: "The importance of setting up an external email provider for Auth0 email delivery"
slug: auth0-email-delivery
tags:
  - til
  - auth0
---

TIL that [Auth0](https://auth0.com/) does not guarantee the instant delivery of
emails that are part of Auth0's authentication workflows, when using their
default internal email provider.

It's necessary to configure an external email provider, such as [Amazon
SES](https://aws.amazon.com/ses/), to route all emails through a high-volume
email service.

