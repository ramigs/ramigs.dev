---
date: 2022-10-29

title: "[TIL] Useful terraform commands"
description: "Listing some useful terraform commands I've been using lately"
slug: useful-terraform-commands
tags:
  - terraform
  - kubectl
  - k8s
---

Listing some useful [Terraform](https://www.terraform.io/) commands I've been using lately.

### Initialize a working directory

```shell
terraform init
```

### Create an execution plan with preview

```shell
terraform plan
```

### Execute actions proposed in a plan

```shell
terraform apply
```

### Format configuration files into a canonical format and style

```shell
terraform fmt
```

### Extract the value of an output variable from the state file

```shell
terraform output
```

### Destroy all remote objects managed by a particular configuration

```shell
terraform destroy
```