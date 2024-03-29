---
date: 2022-03-11

title: "[TIL] K8s AWS: How to check Pod logs"
description: "How to check Pod logs on a K8s cluster running on AWS EKS"
slug: k8s-aws-how-to-check-pod-logs
tags:
  - k8s
  - aws
  - eks
---

TIL how to check Pod logs on a K8s cluster running on [AWS
EKS](https://aws.amazon.com/eks/).

Requirements:

- K8s cluster on AWS EKS
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- `kubectl`

First, connect to the AWS account. Here, I'm doing it using [Named
Profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html):

```shell
export AWS_PROFILE=ramigs-dev
```

Update the context on your local `.kube/config` file:

```shell
aws eks --region eu-north-1 update-kubeconfig --name k8s-cluster
```

Confirm that your connection is working, by requesting the list of namespaces:

```shell
kubectl get ns
```

Take note of the namespace tho which the pod you want to check belongs to.

Get the list of pods:

```shell
kubectl get pods -n namespace
```

Check logs:

```shell
kubectl logs -f pod-name -n namespace container-name
```
