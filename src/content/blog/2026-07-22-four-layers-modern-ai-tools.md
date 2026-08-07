---
date: 2026-07-22

title: "[TIL] The 4 layers of modern AI tools (Prompt, Context, Harness, Loop)"
description: "Understanding how AI tools work from a developer's perspective: the four layers of Prompt, Context, Harness, and Loop engineering"
tags:
  - til
  - ai
  - llm
  - prompt-engineering
  - rag
---

When we start integrating AI tools into our daily development workflow, we often
think it's all about writing better prompts. But as we dig deeper, we realize
Prompt Engineering is only layer one.

Today I learned that understanding how modern AI tools work comes down to four
distinct layers:

## 1. Prompt engineering

_What I tell the model._

This is the foundation: crafting clear system instructions, setting explicit
boundaries, formatting outputs, and providing few-shot examples. It governs the
immediate reasoning and output of the model.

## 2. Context engineering

_What the model "knows" at each step._

LLMs are only as good as the information in their context window. Context
engineering is the art of dynamically injecting relevant data into the
prompt—via Retrieval-Augmented Generation (RAG), search outputs, memory stores,
or trimmed conversation histories—without exceeding token limits or causing
"lost in the middle" phenomena.

## 3. Harness engineering

_The environment, mechanisms, and controls with which the agent operates._

The harness (or scaffold) is the runtime environment that wraps the LLM. It
manages API retries, handles tool integration (calling functions or web tools),
enforces structured output schemas, and manages fallback behavior if the model
hallucinates or fails.

## 4. Loop engineering

_How the system self-corrects and iterates._

Loop engineering moves past one-shot answers by putting the LLM inside an
iterative feedback loop. It gives the model the ability to run trial-and-error
workflows—evaluating its own work, using tool feedback, and revising its steps
until it meets the final goal.

## The takeaway

| **Layer**   | **Focus Area**                                           |
| ----------- | -------------------------------------------------------- |
| **Prompt**  | Instructions, examples, format                           |
| **Context** | RAG, memory, conversation history, injected state        |
| **Harness** | Tool routing, permissions, validations, safety rails     |
| **Loop**    | Multi-turn reasoning, self-correction, agentic workflows |

Even if we're not developing AI systems ourselves, knowing these layers helps us
work more effectively with AI-assisted development tools—we'll better understand
their capabilities, limitations, and how to get the best results from them.
