---
date: 2026-07-28

title: "CLAUDE.md and AGENTS.md: Correct the System, Not the Output"
description: "Why CLAUDE.md and AGENTS.md exist, what actually belongs in them, progressive disclosure, and how to keep them in sync across different AI coding tools."
slug: claude-md-and-agents-md
tags:
  - ai
  - llm
  - claude-code
  - agents
---

AI coding agents don't carry any memory of your codebase from one session to the
next. Every session starts cold — no idea how to run your tests, no notion of
the convention you insisted on last week, no memory of the mistake you already
corrected once before.

`CLAUDE.md` and `AGENTS.md` exist to close that gap: project-level files that
get read automatically before the agent does anything else, so it shows up
already knowing what it would otherwise need to be told again.

That also makes them different from regular documentation. Documentation is
written for humans. These files are read by a model, every single session, and
cost context whether they're useful or not — so the discipline isn't writing
them, it's keeping them focused enough to deserve that permanent seat in every
request.

## CLAUDE.md vs AGENTS.md

`CLAUDE.md` is Claude Code's native format — it's loaded automatically at the
start of every session. It isn't documentation; it's short, precise instructions
the agent needs before it starts working.

`AGENTS.md` is an open standard adopted by many coding agents, but Claude Code
doesn't read it natively.

## Progressive disclosure

`CLAUDE.md` doesn't all load at once. A root-level `CLAUDE.md` loads at the
start of the session. A `CLAUDE.md` inside `backend/` only loads once Claude is
actually working in that folder. Other docs aren't preloaded at all — they're
read on demand, when something actually points Claude to them.

> `CLAUDE.md` guides the agent automatically; everything else should load only
> when necessary.

## What actually belongs in it

Short, precise, and useful the moment a task starts:

- **Environment** — how to start/stop things, which env vars matter.
- **Tests** — the commands to run and what counts as passing.
- **Conventions** — objective patterns, not style opinions.
- **Gotchas** — known errors and common pitfalls.
- **Useful links** — paths to docs for specifics, not the specifics themselves.

## Managing CLAUDE.md vs AGENTS.md

Every AI coding tool looks for its own instruction file: Claude Code reads
`CLAUDE.md`, Codex CLI (and others) read `AGENTS.md`, Gemini CLI reads
`GEMINI.md`, Cursor uses `.cursorrules`. Maintain them separately and they
drift — someone updates one and forgets the rest.

### Symlink

The simplest fix:

```bash
ln -s AGENTS.md CLAUDE.md
```

The files become byte-for-byte identical — one source of truth, no extra
tooling. It works fine on Mac/Linux, but needs Admin rights or Developer Mode
on Windows, and since both files must match exactly, there's no room for
tool-specific instructions.

### @import

The more flexible option. Put the shared instructions in `AGENTS.md`, then make
`CLAUDE.md` a one-liner that imports it, with any Claude-only rules appended
below:

```markdown
@AGENTS.md

## Claude Code specific

Use plan mode for changes under `src/payment/`.
```

One gotcha of its own: `@file.md` imports that file's _entire_ content into
context. Fine for something small; avoid it for large docs — link to them
instead and let the agent read them on demand.

This works cross-platform with no symlink permissions to worry about, and lets
you layer tool-specific instructions on top of one shared base. Two gotchas:
imports inside fenced code blocks aren't resolved, and imported headings aren't
auto-nested under the ones around them.

**Bottom line:** symlink if you want strictly identical files and don't need
Windows support; `@import` if you want one shared source plus room for
Claude-specific additions.

## Takeaway

An agent that makes the same mistake twice isn't a model problem — it's a
missing line in `CLAUDE.md`. Treat it less like a README and more like a place
to encode every correction you don't want to give twice.
