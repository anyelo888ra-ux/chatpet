# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v1.1.0 — Vision + Web Context

ChatPet can now accept image attachments for vision-capable self-hosted models and can use a self-hosted web browsing gateway through `/api/browse`.

- 🖼️ Image input up to 4 MB in the browser.
- 🌐 `/web URL | question` sends a page request to the configured `WEB_TOOL_URL` gateway.
- 🔐 Web access is opt-in and remains behind a self-hosted gateway; ChatPet does not ship a commercial search API key.
- 🧠 Vision requires a model/backend that supports images.
- 🐾 Local Brain+ remains the fallback.

### Web access

Set `WEB_TOOL_URL` in Vercel to a self-hosted browsing gateway that accepts `{ url, question }` and returns `{ answer }`. ChatPet validates the URL as HTTP(S), limits input size, and applies a timeout. The gateway is responsible for fetching pages and any additional security controls.

## v1.0.0 — ChatPet AI

The first stable ChatPet AI release. The repository now treats the model adapter, brain router, context pipeline, diagnostics, and Local Brain+ fallback as the production chat core.

The final maintenance candidate before v1.0.0. This release aligns version metadata across the browser and API layers, hardens the context/prompt pipeline, and keeps the self-hosted real-model architecture ready.

## v0.9.2 — Stability Patch

The current maintenance line hardens local storage/import handling and adds a small developer easter-egg discovery command while keeping the Pre-1.0 model architecture stable.

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
9. ~~v0.9: Pre-1.0~~
10. ~~v0.9.2: Stability Patch~~
11. ~~v0.9.5: Pre-1.0 Final Candidate~~
12. ~~v1.0.0: ChatPet AI~~
13. **v1.1.0: Vision + Web Context** ← current

Public domain: www.chatpet.duckdns.org

## Project Status

ChatPet v1.1.0 is experimental open-source software. The repository contains the AI integration layer, not the model weights themselves. A real model must be hosted separately and connected through the server environment.
