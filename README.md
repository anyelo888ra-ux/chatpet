# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.9 — Pre-1.0

ChatPet v0.9 prepares the final jump from an AI interface to a real model-backed assistant:

- **LOCAL+** — browser Local Brain+.
- **CLOUD+** — server-backed model through Vercel /api/chat.
- **AUTO** — uses the real model when it is configured; otherwise Local Brain+.
- Shared browser context pipeline in brain/context.js.
- Prompt/request preparation in brain/prompt.js.
- Server-side model provider abstraction in api/lib/model.js.
- **OpenAI-compatible** self-hosted endpoints.
- **Ollama** native backend support.
- Configurable model timeout, temperature, token limit, model name, and authentication.
- /health reports whether a real model is configured and which provider is selected.
- Model credentials remain server-side.
- Cloud failures still fall back to Local Brain+.

## Real AI setup

ChatPet does **not** include a language model inside the repository. The model runs separately on infrastructure you control.

### OpenAI-compatible endpoint

Set these Vercel environment variables:

- MODEL_PROVIDER=openai-compatible (default)
- MODEL_URL
- MODEL_NAME
- MODEL_API_KEY (optional for self-hosted endpoints)
- MODEL_AUTH_HEADER (optional, default Authorization)
- MODEL_AUTH_PREFIX (optional, default Bearer )
- MODEL_SYSTEM_PROMPT (optional)
- MODEL_TEMPERATURE (optional, default 0.7)
- MODEL_MAX_TOKENS (optional, default 1024, capped at 4096)
- MODEL_TIMEOUT_MS (optional, default 30000, capped at 60000)

This works with self-hosted servers that expose an OpenAI-compatible chat endpoint.

### Ollama

For an Ollama server, set:

- MODEL_PROVIDER=ollama
- MODEL_URL to the Ollama /api/chat endpoint
- MODEL_NAME to the installed model name
- MODEL_TEMPERATURE (optional)
- MODEL_MAX_TOKENS (optional)

No commercial API key is required.

> The model server must be reachable from Vercel. A model running only on your private PC cannot be reached by a public Vercel Function unless you deliberately provide a reachable, secure endpoint.

## Vercel deployment

Run ChatPet from the repository root. API Functions are api/chat.js and api/health.js.

Keep secrets only in Vercel Environment Variables.

## Context pipeline

The browser normalizes recent conversation messages before sending them to /api/chat. v0.9 prepares up to 24 recent messages, while the server validates and limits the same context before the model request.

## DuckDNS

The public hostname is www.chatpet.duckdns.org. DuckDNS provides the hostname; Vercel serves the application and the model endpoint remains separate.

## Roadmap

1. ~~v0.1: Demo Brain~~
2. ~~v0.2: Local Brain~~
3. ~~v0.3: Stronger Local/Context Engine~~
4. ~~v0.4: Advanced Brain Preparation~~
5. ~~v0.5: Cloud Brain~~
6. ~~v0.6: Cloud Brain+~~
7. ~~v0.7: Multi-Brain~~
8. ~~v0.8: Advanced Cloud~~
9. **v0.9: Pre-1.0** ← current
10. v1.0: ChatPet AI

Public domain: www.chatpet.duckdns.org

## Project Status

ChatPet v0.9 is experimental open-source software. The repository contains the AI integration layer, not the model weights themselves. A real model must be hosted separately and connected through the server environment.
