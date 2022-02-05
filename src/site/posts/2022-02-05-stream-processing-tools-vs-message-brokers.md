---
date: 2022-02-05
title: "[TIL] Difference between data streaming and message brokers"
description: "Understanding the different use cases for data streaming tools and message brokers"
slug: stream-processing-tools-vs-message-brokers
tags:
  - til
  - microservices
  - apache
  - kakfa
  - rabbitmq
---

TIL about the difference between data streaming processing tools and message
brokers. The former (e.g., [Apache Kafka](https://kafka.apache.org/)) is
tailored for **dynamic data** being generated on a continual basis. The latter
(e.g., [RabbitMQ](https://www.rabbitmq.com/)) is used to mediate
**communication** among applications in distributed environments
(microservices).

When designing a solution, it's important to carefully consider the
requirements, in order to choose the right tool for the job.
