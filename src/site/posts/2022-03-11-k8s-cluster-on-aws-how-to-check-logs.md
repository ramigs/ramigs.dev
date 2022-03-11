---
date: 2022-03-11

title: "[TIL] K8S cluster on AWS: How to check logs"
description: "How to check K8S cluster logs on AWS"
slug: k8s-cluster-on-aws-how-to-check-logs
tags:
  - k8s
  - aws
  - eks
---

TIL how to check the logs of a K8S cluster on AWS.

Requirements:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- `kubectl`
- K8S cluster on AWS EKS

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
