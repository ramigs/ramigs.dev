---
date: 2026-08-20
title: 'Building a small MCP server to learn the protocol hands-on'
description: 'Notes from payments-toolkit-mcp, a minimal MCP server I built to learn the protocol: tool/resource registration, the dual content/structuredContent response shape, and the stdout gotcha that trips up every stdio server.'
tags:
  - mcp
  - typescript
  - node
---

After writing about [what MCP actually is](/blog/what-is-mcp/), the obvious next
step was building one. [`payments-toolkit-mcp`][repo] is a small MCP server that
exposes payment-data validation as MCP tools: Luhn checksum validation, card
network detection, and IBAN validation. It also exposes a static resource
listing supported card networks and their prefix ranges.

[repo]: https://github.com/ramigs/payments-toolkit-mcp

## Composition, not configuration

The whole server is built from the official `@modelcontextprotocol/sdk`, and
`src/index.ts` is just composition. It creates a server, registers each
capability, and connects a transport:

```ts
const server = new McpServer({
  name: 'payments-toolkit-mcp',
  version: '1.0.0',
});

registerValidateCardNumberTool(server);
registerDetectCardTypeTool(server);
registerValidateIbanTool(server);
registerCardNetworksResource(server);

const transport = new StdioServerTransport();
await server.connect(transport);
```

Each tool lives in its own file under `src/tools/`, and each one only knows
how to register itself onto a server it's handed. It doesn't own the
server or the transport. The validation logic itself (`isValidLuhn`, the IBAN
mod-97 check, the IIN/BIN prefix table) lives in `src/lib/`, completely
unaware that MCP exists. That split made the MCP-specific code trivial to
write, since it's never more than a schema and a thin wrapper around a
function that already works and is easy to test on its own.

## A tool is a schema plus a handler

Registering a tool means giving it a name, a Zod input/output schema, and a
handler:

```ts
server.registerTool(
  'validate_card_number',
  {
    title: 'Validate Card Number',
    description:
      'Checks whether a card number passes the Luhn checksum algorithm. ' +
      'Accepts digits only (spaces/dashes should be stripped by the caller).',
    inputSchema: { cardNumber: cardNumberSchema },
    outputSchema: { valid: z.boolean() },
  },
  async ({ cardNumber }) => {
    const valid = isValidLuhn(cardNumber);
    return {
      content: [{ type: 'text', text: JSON.stringify({ valid }) }],
      structuredContent: { valid },
    };
  },
);
```

The model reads `description` to decide whether to call the tool. The input
schema does its own filtering: `cardNumberSchema` enforces digits-only and
a sane length range, so malformed input never reaches `isValidLuhn` in the
first place.

The two-shape response (`content` and `structuredContent`) surprised me
initially. `content` is the older, universal shape: a list of blocks a
client can render regardless of what it understands. `structuredContent` is
the newer, typed one, matched against `outputSchema` so a client can consume
it programmatically instead of parsing text. Returning both is redundant on
paper, but it's what keeps the tool usable by clients that only implement one
side.

## Resources are the read-only counterpart

Tools are actions; resources are just data a client can fetch by URI. The one
resource here, `card_networks`, is a static JSON table of card networks and
their prefix ranges. It's the same table `detect_card_type` matches against
internally, exposed separately so a client can read it directly instead of
inferring it from tool calls:

```ts
server.registerResource(
  'card_networks',
  'payments-toolkit://card-networks',
  {
    title: 'Card Networks',
    description:
      'Supported card networks and the IIN/BIN prefix ranges used to identify them.',
    mimeType: 'application/json',
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(data, null, 2),
      },
    ],
  }),
);
```

Custom URI scheme (`payments-toolkit://...`), a MIME type, and a handler that
returns `contents`. It's structurally almost identical to a tool registration,
which made resources feel like a small addition once tools already clicked
rather than a separate concept to learn.

## Prompts are the user-invoked primitive

Tools and resources cover two of MCP's three primitives. The third is a
prompt: a reusable template the server hands the client instead of the
client writing it per integration. The one prompt here, `check_payment_details`,
takes optional `cardNumber`/`iban` arguments and returns a message telling the
model which tools to call and how to format the summary. The server never
calls the tools itself, it just hands back text:

```ts
server.registerPrompt(
  'check_payment_details',
  {
    title: 'Check Payment Details',
    description:
      'Validates a card number and/or IBAN using the available tools and ' +
      'reports the results in a standard summary format.',
    argsSchema: {
      cardNumber: z.string().optional().describe('Card number to validate'),
      iban: z.string().optional().describe('IBAN to validate'),
    },
  },
  ({ cardNumber, iban }) => ({
    messages: [{ role: 'user', content: { type: 'text', text: /* ... */ } }],
  }),
);
```

`argsSchema` is a flat shape of strings only, not arbitrary Zod like a tool's
`inputSchema`. The MCP spec has clients render prompt arguments as plain text
fields. That restriction lines up with how prompts get invoked: not chosen by
the model like a tool, but triggered explicitly by the user, surfaced as a
slash command in Claude Code
(`/mcp__payments-toolkit-mcp__check_payment_details`).

## The gotcha: stdout is not yours

This is the one mistake the [README][repo] specifically calls out, and it's the
kind of thing you'd only discover by hitting it: over the stdio transport,
stdout is the JSON-RPC wire. A stray `console.log` doesn't just clutter logs; it
injects malformed data into the protocol stream and breaks the client's parser.
Every bit of debug output in this server goes through `console.error` instead,
since stderr is left alone. This explains why MCP server boilerplate almost
always reaches for a logger or `console.error` by convention rather than
`console.log`.

## Inspecting and connecting

`@modelcontextprotocol/inspector` gives a local web UI to call tools and read
resources directly, without wiring up a client first. That's useful for
confirming schemas and responses actually round-trip before pointing a real
host at the server. Once that works, connecting it to Claude Code is a
single command:

```bash
claude mcp add payments-toolkit-mcp -- node /path/to/payments-toolkit-mcp/dist/index.js
```

`/mcp` inside a session then confirms the connection: seeing
`payments-toolkit-mcp · ✔ connected` means the handshake worked and the
tools were discovered. That registration defaults to local scope, tied to
the project directory `claude mcp add` was run from, so a different project
needs its own `claude mcp add` (or `--scope user` to make the server
available everywhere).

## Adding the HTTP transport

Stdio only works because Claude Code spawns the server itself and owns the
subprocess. A server meant to be shared across multiple clients needs to run
over HTTP instead, via `StreamableHTTPServerTransport`. Supporting both meant
splitting `index.ts`: tool/resource registration moved into a
`createServer()` factory, and each transport got its own module, picked at
startup by a `--http` flag.

The part that isn't obvious going in: an `McpServer` can only be
`connect()`-ed to one transport, so serving multiple HTTP clients from one
long-running process means a fresh `McpServer` + `StreamableHTTPServerTransport`
pair per session, created on the `initialize` request and keyed by the
`Mcp-Session-Id` header on every request after that:

```ts
if (!transport) {
  if (!isInitializeRequest(req.body)) {
    res.status(400).json({/* ... */});
    return;
  }
  transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (newSessionId) => {
      transports.set(newSessionId, transport!);
    },
  });
  const server = createServer();
  await server.connect(transport);
}
```

Requests without a session ID that aren't `initialize` get a 400.
