---
date: 2026-08-29
title: 'How to setup Python for local development on macOS'
description: 'Setting up a clean Python dev environment on macOS with uv and VSCode, for anyone coming from Node.js tooling.'
tags:
  - python
  - macos
  - vscode
---

If you're coming from a Node.js background, Python's tooling has historically felt scattered, `pip`, `venv`, `pyenv`, `requirements.txt`, each solving one piece of the puzzle. In 2026, that's consolidated around `uv`, a single Rust-based tool from Astral that replaces most of the old stack. This post walks through setting up a clean Python dev environment on macOS with `uv` + VSCode.

## Why uv?

If you know Node, here's the rough mapping:

- `pyenv` ≈ `nvm` (Python version management)
- `venv` ≈ `node_modules` (per-project dependency isolation)
- `pip` ≈ `npm` (package installer)

`uv` consolidates all three into one fast binary, closer to how `npm` just handles everything without you thinking about it. It auto-detects the Python version per project and manages the virtual environment for you, so you never have to activate anything manually.

## 1. Install uv

Via Homebrew:

```bash
brew install uv
```

Or via the official install script:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Verify it worked:

```bash
uv --version
```

## 2. Create a new project

`uv` can scaffold the folder for you:

```bash
uv init my-project
cd my-project
```

This generates `pyproject.toml`, `.python-version`, a `src/` layout, `.gitignore`, and initializes git, all in one step.

## 3. Run the project

```bash
uv run <project-name>
```

`uv` automatically creates the `.venv`, installs dependencies, and picks the right Python version, without you having to activate anything manually. You can also drop into a REPL scoped to the project's environment:

```bash
uv run python
```

## 4. Set up VSCode

Install these extensions:

- **Python** (Microsoft) — core language support, IntelliSense
- **Python Debugger** (Microsoft) — usually installs automatically alongside Python
- **Python Environments** (Microsoft) — usually installs automatically alongside Python, unifies environment discovery across `venv`, `uv`, `conda`, etc.
- **Ruff** — fast linting and formatting

Then make sure VSCode is pointing at the right interpreter:

1. `Cmd+Shift+P` → **Python: Select Interpreter**
2. Choose `./.venv/bin/python`
3. Confirm it shows in the bottom-right status bar

## 5. Configure Ruff as your formatter

Add to your user `settings.json` (applies to every project by default):

```json
{
  "editor.formatOnSave": true,
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff"
  }
}
```

Test it by writing deliberately messy code and saving. Ruff should auto-format it, and unused imports should get flagged by both Ruff and Pylance.

## Wrap-up

With this setup, a new Python project goes from zero to running, linted, formatted, and debuggable in VSCode in just a few minutes, without juggling `pyenv`, `pip`, and `venv` separately. The workflow will feel familiar if you're used to `npm`:

- `uv init` ≈ `npm init`
- `uv add` ≈ `npm install`
- `uv run` ≈ `npm run`
