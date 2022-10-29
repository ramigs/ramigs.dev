---
date: 2022-10-29

title: "[TIL] Useful k3d and kubectl commands"
description: "Listing some useful k3d and kubectl commands I've been using lately"
slug: useful-k3d-and-kubectl-commands
tags:
  - k3d
  - kubectl
  - k8s
---

Listing some useful [k3d](https://k3d.io/) and `kubectl` commands I've been using lately.

## k3d

### Create cluster

```shell
k3d cluster create my-cluster
```

### Create cluster with load balancer and respective port binding (useful for testing locally)

```shell
k3d cluster create my-cluster -p "80:30000@loadbalancer"
```

### Create cluster without load balancer

```shell
k3d cluster create --no-lb
```

### Create cluster with specified number of control planes and worker nodes

```shell
k3d cluster create my-cluster --servers 3 --agents 3
```

### List clusters

```shell
k3d cluster list
```

### Delete cluster

```shell
k3d cluster list
```

## kubectl

### List all supported resource types (useful to know which version to use when writing manifests)

```shell
kubectl api-resources
```

### Get list of nodes in the cluster

```shell
kubectl get nodes
```

### Apply resources specified in a manifest file

```shell
kubectl apply -f pod.yaml
```

### Get Pods

```shell
kubectl get pods
```

### Get Pod details (useful to know which image tag/version is running)

```shell
kubectl describe pod my-pod
```

### Port bind Pod port to localhost port

```shell
kubectl port-forward pod/conversao-temperatura 8080:8080
```

### Delete Pod

```shell
kubectl delete pod conversao-temperatura
```

### Delete resources specified in a manifest file

```shell
kubectl delete -f pod.yaml
```
