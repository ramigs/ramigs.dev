---
date: 2026-07-24

title: "[TIL] AI Context Windows and Tokens"
description: "A breakdown of the 8 pillars of AI-assisted software development, centered around optimizing your core dev workflow."
tags:
  - til
  - ai
  - llm
---

_Credit / Source: Learned via [Full Cycle](https://fullcycle.com.br/)_

TIL that an AI's **Context Window** isn't measured by the number of messages or files
you send, but by a hard limit on total **tokens**.

Think of the Context Window as the LLM's temporary desk space.

The maximum amount of text (in tokens) the model can fit on that desk at one
single moment is its context window.

Every piece of data takes up space on the same limited track:

- Prompt
- History
- Open Files
- Code Snippets
- Tool Results

Every single item listed above consumes tokens. Once that total hits the hard
limit, the model has to adapt.

## What Happens When the Window Fills Up?

When your session runs out of token budget, the system usually handles it in one
of two ways:

1. **Sliding Window (Overwrite):** The oldest tokens (like your initial prompt
   or early chat history) are dropped off the back to make room for new input.
2. **Compact & Summarize:** The system takes early messages and creates a
   condensed summary to preserve essential facts using far fewer tokens.

## The Big Takeaway

**Limits are strictly about tokens, not files or messages.** Keep your context
clean to ensure the model holds onto the information that actually matters!
