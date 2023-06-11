---
date: 2023-06-11

title: "[TIL] VSCode: configure auto format on save"
description: "Project settings to enable auto format on save in VSCode"
slug: vscode-configure-auto-format-on-save
tags:
  - vscode
  - eslint
  - prettier
---

TIL about VSCode project configurations to enable auto format on save.

This can be specially helpful in team projects configured with `eslint` and
`prettier`, where you're interested in enforcing code conventions and standards.

From the project root, create a `.vscode/settings.json` file with the following:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

When a project contributor checks out the project and is using VSCode (with
`eslint` and `prettier` plugins installed) auto format on save will be enabled,
based on the `eslint` and `prettier` rules configured.
