# ChatPet Brain

## v0.9 — Pre-1.0

- brain/local.js — Local Brain+
- brain/context.js — browser-side context normalization
- brain/prompt.js — request/prompt preparation
- brain/cloud.js — real-model adapter through /api/chat
- brain/router.js — selects LOCAL+, CLOUD+, or AUTO

### Modes

**LOCAL+** keeps inference in the browser.

**CLOUD+** sends prepared context to the same-origin server function.

**AUTO** checks /health and uses the real model when it is configured; otherwise it uses Local Brain+.

If a real-model response fails, ChatPet falls back to Local Brain+.

No API key is stored in frontend JavaScript.

## Provider layer

The server provider adapter is in api/lib/model.js.

Supported providers:

1. openai-compatible
2. ollama

Future providers can be added without rewriting the chat UI.

## Roadmap

v0.9 Pre-1.0 -> v1.0 ChatPet AI

v1.0 can build on this layer with streaming, evaluations, observability, rate limiting, sessions, and stronger production hardening.
