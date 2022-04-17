---
date: 2022-04-17
title: "[TIL] K8s: Difference between ingress controller and service mesh"
description: "Understanding the different roles played by ingress controller and service mesh in a K8s cluster"
slug: ingress-controller-vs-service-mesh
tags:
  - til
  - microservices
  - k8s
---

TIL about the difference between **ingress controller** and **service mesh**.

The former is responsible for managing traffic that flows into the the
application (North-South traffic).

The latter is used to mediate and secure service-to-service communication within
the cluster (East-West traffic).

![Diagram of ingress controller and service mesh](/img/articles/2022-04-17-ingress-controller-vs-service-mesh.png)
