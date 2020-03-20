---
title: Configuring a JavaScript
description: JavaScript solution to Finding the element that appears once in an array problem
slug: finding-the-element-that-appears-once
tags:
  - eslint
  - prettier
  - javascript
---

## Linting + Formatação do código:

- Ao contrário do projecto [tvcine-frontend], este não poderá ter análise
  estática de código (eslint) ao nível do build (nem do hot reload). Sendo um
  projecto base já de dimensão bastante considerável, que não foi desenvolvido
  originalmente com a integração destes processos, torna-se inviável a sua
  aplicação nesta fase.

- Mesmo aplicando o fix automático do eslint, que possibilita eliminar uma
  grande fatia dos erros e warnings, continuam a existir muitos que teriam de ser
  corrigidos manualmente, o que não é viável por questões associadas ao tempo que
  seria necessário despender para a compreensão do código, nem da confiança e
  garantia que esssas mesmas alterações manteriam o produto no seu estado
  original.

- De qualquer maneira, acho encontrei um compromisso positivo, com a análise
  estática e a formatação automática do código (prettier) ao nível dos nossos
  editores.

- Análise estática: A configuração actual (testada no VSCode, requer o plugin
  ESLint) permite a identificação dos erros e warnings e nível do editor (apenas a
  nível informativo, não altera os ficheiros automaticamente). Cabe-nos a nós
  aplicar (ou não) explicitamente essas mesmas sugestões. Como referido
  anteriormente, o build não vai verificar nada a este nível.

- Formatação de código: Configurei (para o VSCode) a formatação "on save".

- Adicionei ao projecto estas mesmas configurações (.eslintrc.js, .prettierc e
  .vscode/settings.json), que englobam as considerações mencionadas.
  Estas têm precedência sobre as configurações globais dos editores, de modo a garantir
  que trabalhamos todos sobre a mesma base.

Setting up automated lint and code style for JavaScript projects
set up some tools to help maintain consistency in a codebase used by multiple developers

on a journey to understand the differences and where each piece of puzzle fits
Visual Studio Code
as a guide for myself

"Consistently styled codebases are easier to read, manage, and edit, which allows server hosting clients to iterate more quickly and deploy more often."

"help developers maintain a consistent style"

# Prettier vs. Linters

https://stackoverflow.com/questions/48363647/editorconfig-vs-eslint-vs-prettier-is-it-worthwhile-to-use-them-all
In my experience, the best combination is all 3, and here's why:

EditorConfig: This helps your editor produce code that looks like your style guide as you go. While this isn't strictly necessary in order to achieve your goals, it's nice if you're always looking at code that follows the same coding styles. Otherwise if you don't have EditorConfig, as you're typing your editor will auto-format differently to the rest of the code base, which is confusing. Of course if you've set up prettier it'll fix it before it goes into your code base, but still, why would you want to look at it in one format while you're writing it and then have it switch when you go to commit? Might as well be consistent.

Prettier:
Prettier is an opinionated code formatter
Automatically formats your code. I like to set it up to do this when I stage my files for a commit, so that it's physically impossible for me to commit code that doesn't match my style guide.

ESLint:
most popular JavaScript linter, a tool that analyzes code for errors, which can include stylistic errors but also coding errors that lead to bugs. While Prettier will do little to stop you making coding mistakes, ESLint can be a huge help in this regard.
So why would you want a linter too? Because ESLint does more than just style. It picks up when you declare variables you don't use, or reference things that aren't defined, amongst a few other niceties. So while its role diminishes somewhat compared to the days before prettier, it's still useful to have in a project to catch the other errors.

How does it compare to ESLint/editorconfig?

https://prettier.io/docs/en/comparison.html
"Linters have two categories of rules:

Formatting rules: eg: max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style...

Prettier alleviates the need for this whole category of rules! Prettier is going to reprint the entire program from scratch in a consistent way, so it's not possible for the programmer to make a mistake there anymore :)

Code-quality rules: eg no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors...

Prettier does nothing to help with those kind of rules. They are also the most important ones provided by linters as they are likely to catch real bugs with your code!"

Why Prettier?
Building and enforcing a style guide

“Having a githook set up has reduced the amount of style issues in PRs that result in broken builds due to ESLint rules or things I have to nit-pick or clean up later.”

something important to consider No local configuration (i.e. .prettierrc or .editorconfig) detected, falling back to VS Code configuration

## Configuring a JavaScript project

https://www.reddit.com/r/javascript/comments/cti3xs/why_you_should_use_eslint_prettier_and/

My team had issues where prettier + editorconfig + eslint would yield inconsistent results on different platforms (Linux, Mac) and across different editors, all supposedly with the same or very similar plugins (VSCode, Vim).

We found out the culprit was EditorConfig, removing it made all the results consistent again.
We removed editorconfig after installing prettier as a per-commit hook and let it take care of formatting instead of relying on editorconfig

You can either run prettier through eslint as a config or use the prettier-eslint package. They do the same thing. Just user preference.

The issue when using Prettier is that it is highly recommended to abide by it's formatting rules ... It is after all an opinionated code formatter.

So if the ESLINT Airbnb linting rules contain formatting rules, they will have to be disabled if you do not want any conflicts with Prettier. As my second post suggests, the idea is to use the eslint-config-prettier and add 'prettier' in the extends array after Airbnb. This will make sure all

### Install ESLint

```shell
npm install eslint --save-dev
```

Initialize eslint configuration

```shell
npx eslint --init
```
