---
date: 2022-05-04

title: "[TIL] Useful AWS CLI commands for S3 and CloudFront"
description: "Listing some useful commands I've been using lately for AWS S3 and CloudFront"
slug: useful-aws-cli-commands-for-s3-and-cloudfront
tags:
  - aws
  - s3
  - cloudfront
---

Listing some useful commands I've been using lately for AWS S3 and CloudFront.

## Amazon S3

### List buckets

```shell
aws s3api list-buckets
```

### Get bucket region/location

```shell
aws s3api get-bucket-location --bucket cdn-dev
```

### Upload file

```shell
aws s3 cp static/logo.png s3://cdn-dev/logo.png
```

## Amazon CloudFront

### Get distribution id list:

```shell
aws cloudfront list-distributions --output table --query 'DistributionList.Items[*].Id'
```

### Check details of specific distribution

```shell
aws cloudfront get-distribution --id E2FXR8603J97N3
```

### Create cache invalidation

```shell
aws cloudfront create-invalidation --distribution-id E2FXR8603J97N3 --paths "/\*"
```

### Check status of cache invalidation

```shell
aws cloudfront get-invalidation --id I23C6NJI4OQFFP --distribution-id E2FXR8603J97N3
```
