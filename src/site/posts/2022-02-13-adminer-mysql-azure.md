---
date: 2022-02-13
title: "[TIL] Connecting Adminer to an Azure MySQL database"
description: "How to fix SSL-related issues when trying to connect Adminer running in Docker to an Azure MySQL database"
slug: adminer-mysql-azure
tags:
  - til
  - adminer
  - mysql
  - azure
  - ssl
  - docker
---

If you're having SSL-related issues when connecting
[Adminer](https://www.adminer.org/) to an [Azure MySQL
database](https://azure.microsoft.com/en-us/services/mysql/), try out this [very
helpful
answer](https://superuser.com/questions/1458910/docker-adminer-image-cannot-read-login-ssl-plugin-from-var-www-html-plugins-ena/1557752#1557752),
with the following nuances:

- no need for client key or client certificate, i.e., discard environment
  variables `DB_SSL_KEY`, `DB_SSL_CERT` and the respective volumes
- use only `DB_SSL_CA` and its respective volume with the [certificate provided
  by Azure](https://www.digicert.com/CACerts/BaltimoreCyberTrustRoot.crt.pem)
  (see more details
  [here](https://docs.microsoft.com/en-us/azure/mysql/howto-configure-ssl))

Note: these instructions assume you have Adminer running as a Docker container,
but the same arguments being passed to the [Adminer plugin
login-ssl](https://github.com/vrana/adminer/blob/master/plugins/login-ssl.php)
should apply nonetheless.