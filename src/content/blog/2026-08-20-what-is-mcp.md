---
date: 2026-08-20
title: 'What is the Model Context Protocol (MCP)?'
description: 'A short primer on MCP — the host/client/server split, why each client keeps a 1:1 connection to a server, and the two transports (stdio and Streamable HTTP) that connect them.'
tags:
  - ai
  - mcp
  - llm
---

MCP (Model Context Protocol) standardizes how an AI model reaches outside
itself — to a database, an API, a filesystem, whatever. Before it, every
integration was bespoke: a custom tool definition and glue code per app, per
model, per data source. MCP replaces that with one protocol both sides
implement once. The usual analogy is USB-C: everyone agreeing on the same
connector is what makes it useful.

## Host, client, server

MCP defines three roles:

- **Host** — the AI application itself: Claude, an IDE, an agent. It embeds
  the model and decides when to reach outside it.
- **Client** — lives inside the host, one per server. It speaks MCP on one
  side and hands results back to the model on the other.
- **Server** — a small process that exposes capabilities over MCP: tools to
  call, resources to read, prompts to reuse.

Each client maintains a single, dedicated connection to exactly one server. Want
to talk to both a database and GitHub, that's two clients running side by side
inside the same host — not one client juggling two connections.

![Architecture diagram of MCP showing an AI model connected to two MCP clients, each maintaining a 1:1 connection to its own MCP server over stdio or Streamable HTTP. The database server reaches PostgreSQL; the GitHub server reaches the GitHub API.](../../assets/img/articles/2026-08-20-mcp-architecture.svg)

## Two transports

MCP doesn't care whether the server is a process on your machine or an API
across the network — the same request/response shape works either way. What
changes is the transport underneath:

- **stdio** — for a server running locally. The host spawns it as a
  subprocess and talks over its stdin/stdout. No network involved, so it's
  the default for anything reading local files or hitting a local database.
- **Streamable HTTP** — for a remote server. The client POSTs
  JSON-RPC requests to a single MCP endpoint; the server can respond
  directly or upgrade that same connection to a Server-Sent Events stream
  when it needs to push multiple messages back. This is what a hosted,
  shared MCP server (GitHub's, for example) uses today.

  _It wasn't always one endpoint. The original transport — **HTTP+SSE** —
  split the two directions across separate endpoints: the client POSTed to
  one URL, and a server-initiated GET on a second URL opened the SSE stream
  for everything coming back. The spec deprecated that split in favor of
  Streamable HTTP's single endpoint back in March 2025, though some older
  servers still speak it for backwards compatibility._

## What a server actually exposes

Every server advertises the same three primitive types, regardless of
transport:

- **Tools** — functions the model can invoke (`create_issue`, `run_query`).
- **Resources** — data it can read (a file, a row, a config value).
- **Prompts** — reusable prompt templates the server hands the host, rather
  than the host hand-rolling them per integration.

That fixed vocabulary is what makes MCP a protocol rather than just a
convention: a client doesn't need to know anything about a server ahead of
time beyond "speak MCP" — it discovers what's actually on offer at connection
time.
