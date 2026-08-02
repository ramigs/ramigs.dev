---
date: 2026-07-27

title: "How Agents and Subagents Work in Claude Code"
description: "Breaking down what an 'agent' actually is in Claude Code: harness vs agent vs model, built-in vs custom agents, and how subagents delegate with isolated context."
tags:
  - ai
  - llm
  - claude-code
  - agents
---

_Credit / Source: Learned via [Full Cycle](https://fullcycle.com.br/)_

"Agent" gets thrown around loosely, but in Claude Code it maps to a fairly
precise structure. Here's how the pieces actually fit together.

## Anatomy of an agent

Claude Code is the **harness**: it defines the environment, provides tools, and
exposes the mechanism for instantiating agents. It doesn't decide which agent
runs, though — that call is made by the agent itself (the model), based on the
task at hand.

An **agent** is made up of three things:

- **User instructions** — what you actually asked for.
- **Predefined behavior** — its scope and its own baked-in instructions.
- **Its own context window** — separate token budget, filling up as it works.

The agent calls the **model**, gets results back, and uses **tools/environment**
(terminal, files, web, a database) to act on them.

There are two ways an agent comes into existence:

1. **Built-in agents**, already shipped with the harness — `Explore`, `Plan`,
   `general-purpose`.
2. **Custom agents**, defined by you in `.claude/agents/my-agent.md`. You write
   the behavior and specialty; Claude Code creates, registers, and provides the
   environment for it. The file is Markdown with YAML frontmatter (`name`,
   `description`, optionally `tools` and `model`) followed by the subagent's
   system prompt in the body — and it can live at the project level
   (`.claude/agents/`, shared with your team) or the user level
   (`~/.claude/agents/`, available across all your projects).

> The harness defines the environment. The agent follows instructions, uses its
> own context, and calls the model.

## Subagents: delegation with isolated context

A **subagent** is a specialized agent, instantiated by the main agent, to
execute one specific task.

The main agent:

- receives the user's goal,
- decides whether to delegate,
- sends a specific task to a subagent (or several, **in parallel**),
- consolidates the results.

Which subagent gets picked isn't hardcoded, either: Claude matches the task
against each subagent's own `description` field and delegates accordingly.

Each subagent gets a task, a prompt from the main agent, its own tools, and —
critically — **its own context window**. It doesn't share the main agent's
context, and the main agent doesn't automatically see the subagent's internal
history back — only the **result, or a useful summary**, lands in its context
window. The full transcript isn't gone; it's just parked outside the main thread
unless you go pull it back up.

## Why the isolation matters

This isn't an implementation detail — it's the whole point.

The main agent's context stays clean no matter how much a subagent had to dig
around to get an answer. All that exploration cost is paid out of the subagent's
own budget, not the main thread's.

Multiple subagents can run **in parallel**, each burning its own tokens
independently, instead of serializing everything through one context window.

A custom subagent lets you pre-bake scope and behavior for a repeated kind of
task (e.g. "review this diff," "explore this codebase") so you're not
re-explaining it every time.

## Takeaway

An "agent" in Claude Code isn't the model — it's instructions + behavior + its
own context window, wrapped around a model, using tools. Once that clicks,
subagents stop looking like magic and start looking like what they are: regular
agents, delegated a task, with a wall around their context so the main thread
doesn't have to pay for their scratch work.
