---
date: 2026-07-23

title: '[TIL] Prompting Techniques (How AI Models Actually "Think")'
description: "A quick guide to the 5 core AI prompting techniques and how they help LLMs solve complex tasks."
slug: ai-prompting-techniques
tags:
  - ai
  - llm
  - prompt-engineering
---

Today I learned that getting a Large Language Model (LLM) to give a accurate,
high-quality answer isn't just about _what_ you ask—it's about _how you
structure its thinking process_.

Researchers have developed structured **prompting techniques** to help models
plan, reason step-by-step, and even interact with external tools.

Here is a quick breakdown of 5 essential prompting techniques every AI developer
should know.

## 1. Zero-Shot Prompting

- **The Pitch:** Just ask directly.
- **How it works:** You give the model a task or question without providing
  prior examples or explicit step-by-step reasoning instructions.
- **Best for:** Simple facts, standard classification, translation, and everyday
  Q&A where the model's base training is sufficient.

## 2. Chain-of-Thought (CoT)

- **The Pitch:** "Show your work step-by-step."
- **How it works:** You instruct the model to break down its internal reasoning
  before arriving at the final answer (often by adding `"Let's think step by
step"` or providing examples that demonstrate intermediate steps).
- **Why it matters:** LLMs generate text token-by-token. Giving them explicit
  "thinking space" allows them to compute intermediate steps instead of guessing
  prematurely.
- **Best for:** Math problems, writing and debugging complex code logic, and
  multi-step reasoning.

## 3. Tree of Thoughts (ToT)

- **The Pitch:** Explore multiple decision paths, evaluate possibilities, and
  backtrack when stuck.
- **How it works:** An extension of Chain-of-Thought where the model explores a
  tree structure of intermediate "thoughts." At each step, it generates multiple
  candidate ideas, evaluates them, and uses search algorithms to pick the best
  path or backtrack if it hits a dead end.
- **Best for:** Strategic planning, complex puzzle solving, chess-like game
  logic, and multi-branch creative brainstorming.

## 4. Skeleton-of-Thought (SoT)

- **The Pitch:** Create an outline first, then expand each point in parallel for
  maximum speed.
- **How it works:** Designed specifically to reduce latency in long-form
  generation. The model first outputs a concise structure or outline (the
  "skeleton"). Then, each section of the skeleton is populated concurrently
  (typically via parallel API requests).
- **Best for:** Long-form blog posts, scaffolding full codebases/project
  architectures, and rapid document generation.

## 5. ReAct (Reason + Act)

- **The Pitch:** Think, execute an external action, observe the result, and
  repeat.
- **How it works:** Combines reasoning traces with dynamic tool usage in an
  iterative loop.
- **Best for:** Autonomous agents, AI coding assistants that run tests and
  terminal commands, and external API integrations.
