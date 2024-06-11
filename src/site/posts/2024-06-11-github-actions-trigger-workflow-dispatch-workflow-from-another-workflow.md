---
date: 2024-06-11
title: "GitHub Actions: trigger a workflow_dispatch workflow from another workflow"
description: "How to trigger a GitHub Actions workflow_dispatch workflow from another workflow"
slug: github-actions-trigger-workflow-dispatch-workflow-from-another-workflow
tags:
  - git
  - github
  - actions
---

Let's say you have your deploy pipeline set as a GitHub Action workflow, which
is triggered manually (using the `workflow_dispatch` event) and allows you to
select to which environment you want to deploy.

On certain occasions you might be interested in deploying to all environments.
Instead of having to manually trigger the pipeline for each environment, you
could create a new workflow and use the action
[`benc-uk/workflow-dispatch`](https://github.com/benc-uk/workflow-dispatch),
allowing you to trigger this workflow only once and deploy to all environments,
as such:

```yaml
name: Deploy to all environments pipeline

on:
  workflow_dispatch:

jobs:
  deploy:
    name: "Deploy to all environments"
    runs-on: ubuntu-latest
    steps:
      - name: Invoke Deploy pipeline workflow for dev
        uses: benc-uk/workflow-dispatch@v1
        with:
          workflow: deploy-pipeline.yaml
          inputs: '{ "environment": "dev" }'
      - name: Invoke Deploy pipeline workflow for staging
        uses: benc-uk/workflow-dispatch@v1
        with:
          workflow: deploy-pipeline.yaml
          inputs: '{ "environment": "staging" }'
      - name: Invoke Deploy pipeline workflow for production
        uses: benc-uk/workflow-dispatch@v1
        with:
          workflow: deploy-pipeline.yaml
          inputs: '{ "environment": "production" }'
```

Another cool thing about this action is that it your workflows will run in
parallel, since they're triggered behind-the-scenes via REST API calls.
