---
date: 2026-08-05
title: 'Claude Agent Skills: when a prompt deserves to be promoted'
description: "What Claude Agent Skills are, the 3-YESes test for deciding when to create one, their anatomy and progressive disclosure model, and the security considerations of installing someone else's skill."
tags:
  - ai
  - llm
  - claude-code
  - agents
---

_Credit / Source: Learned via [Full Cycle](https://fullcycle.com.br/)_

## What a skill is

Do you find yourself explaining the same 'how' to the model, time after time?
That's a skill waiting to be born.

A **skill** is reusable procedural knowledge, loaded on demand. It's not a
one-off prompt, and it's not code (a function) — it's a folder with
instructions, versioned in the repo.

It sits alongside `CLAUDE.md`/`AGENTS.md` and [custom
subagents](/blog/agents-and-subagents-in-claude-code/), but answers a
different question: not "what should the agent always know" (that's
`CLAUDE.md`) and not "who should handle this task" (that's a subagent), but
"how do I do this specific procedure, correctly, every time."

## When to create one

The single triage question:

> Is this procedural knowledge **reusable** and **stable** enough to be worth
> a versioned file?

If that's not clear-cut, the **3-YESes test**:

1. **Reuse** — is it repetitive? (across multiple prompts, days, projects)
2. **Non-obvious procedure** — is there a "how" the model doesn't get right on
   its own?
3. **Stability** — does the rule hold for days/weeks/months?

### What is not a skill (common triage mistakes)

| Ask                                    | Belongs in                      |
| -------------------------------------- | ------------------------------- |
| "Always answer in English"             | `CLAUDE.md` (global preference) |
| "Status of the last deploy, right now" | MCP / tool (live state)         |
| "Fix this parser bug"                  | A one-off prompt                |

Rule of thumb: one skill per responsibility, built on top of a shared base — not
one skill per project trying to do everything.

## Anatomy: a folder + SKILL.md

```
my-skill/
  SKILL.md      -> the only required file (frontmatter + body)
  reference/    -> extra context, loaded on demand
  scripts/      -> deterministic execution
  eval/         -> tests for the skill
```

The frontmatter (YAML at the top) has exactly two required fields:

- **`name`** — the skill's identity, matching the folder name.
- **`description`** — the dispatch classifier. Third person, concrete
  triggers, and a "do NOT use for..." clause to keep it from over-firing.

Useful optional fields: `allowed-tools`, `disable-model-invocation`, `model`.

## Progressive disclosure

| Level | Content                   | When it loads          |
| ----- | ------------------------- | ---------------------- |
| 1     | `name` + `description`    | Always, near-zero cost |
| 2     | `SKILL.md` body           | Only on a match        |
| 3     | `reference/` + `scripts/` | On demand              |

That structure is what lets it scale: the permanent cost is Level 1 only,
which is why you can have dozens of skills installed at once. Not every skill
needs to climb through all three levels.

## Six principles

1. **The description is everything** — concrete triggers, plus an explicit
   "do NOT use for" clause.
2. **One responsibility** — "review," "test," and "scaffold" are three
   separate skills, not one.
3. **Push weight to Level 3** — keep the body short, put the rest in
   `reference/`.
4. **Script beats prose** — anything deterministic becomes a script, not a
   paragraph of instructions.
5. **You're running someone else's code** — treat it like installing software
   (see below).
6. **Lean and versioned** — it lives in git, changes go through a PR.

## Security: treat it like installing software

- Only pull skills from sources you trust.
- Audit `SKILL.md` and any `scripts/` for unexpected network calls or access
  outside the skill's stated scope.
- Sources that fetch URLs can come back with malicious instructions embedded
  in the response — prompt injection through the returned content.
- `allowed-tools` is an extra layer of defense: only the listed tools are
  available to the skill, regardless of what its instructions ask for.
