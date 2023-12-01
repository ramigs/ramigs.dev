---
date: 2023-12-01
title: "[TIL] VSCode: Setting the correct TypeScript version"
description: "The importance of setting the TypeScript version according to the project in VSCode"
slug: vscode-setting-typescript-version
tags:
  - til
  - vscode
  - typescript
---

Mystery solved! I finally discovered why sometimes I'd notice inconsistencies in
terms of the TypeScript errors between the terminal and VSCode.

This happened because I was using different TypeScript versions. By default,
VSCode uses its own TypeScript version (typically a more recent version than the
one used by the project).

I'd expect that the default would be for VSCode to use the project's version,
but it seems it doesn't.

I suggest always having VSCode use the project's version. This can be achieved
by [setting VSCode to use the TypeScript Workspace
Version](https://github.com/microsoft/TypeScript/issues/52396#issuecomment-1404056467).

This will add `"typescript.tsdk": "node_modules/typescript/lib"` to
`.vscode/settings.json` and should be committed to the repository, so that the
entire team can benefit from it.

Now the project is in charge (not the editor), no more confusing differences 🙌.
