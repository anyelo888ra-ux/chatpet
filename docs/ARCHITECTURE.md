# ChatPet Architecture

## v1.1.0 — Vision + Web Context

Browser -> ChatPet UI -> vision adapter -> /api/chat -> vision-capable model

Browser -> /api/browse -> self-hosted web gateway -> page/question answer

Vision is optional and requires a compatible model. Web access is opt-in through `WEB_TOOL_URL`; ChatPet does not directly expose a generic server-side URL fetcher.

## v1.0.0 — ChatPet AI

v1.0.0 is the stable application architecture. A real model remains an external dependency and must be configured through Vercel environment variables.

## v0.9.5 Final Candidate

The v0.9.5 release candidate keeps the v0.9 architecture stable while aligning the browser, context, prompt, router, and API layers for the v1.0.0 transition.

## v0.9 — Pre-1.0

Browser -> app.js -> Brain Router -> Local Brain+ / Real AI / AUTO

### Local

Browser -> brain/router.js -> brain/local.js

### Real AI

Browser -> brain/router.js -> brain/cloud.js -> /api/chat -> api/lib/model.js -> self-hosted model

The browser never receives model credentials.

### Context pipeline

Browser -> brain/context.js -> brain/prompt.js -> brain/cloud.js

The browser prepares up to 24 recent messages. The server performs its own validation and normalization before the model request.

### Provider abstraction

api/lib/model.js supports:

- **openai-compatible** — OpenAI-style chat payloads, suitable for self-hosted model servers with compatible APIs.
- **ollama** — native Ollama /api/chat request format.

The selected provider is controlled by MODEL_PROVIDER.

### Model controls

- MODEL_URL
- MODEL_NAME
- MODEL_API_KEY
- MODEL_AUTH_HEADER
- MODEL_AUTH_PREFIX
- MODEL_SYSTEM_PROMPT
- MODEL_TEMPERATURE
- MODEL_MAX_TOKENS
- MODEL_TIMEOUT_MS

The server clamps temperature, token limits, and request timeout to prevent unbounded configuration.

### Health

GET /health reports:

- online status
- ChatPet version
- provider
- whether a model URL is configured
- whether an auth key is configured
- maximum context messages
- token limit
- model timeout
- realModelReady

No secret values are returned.

### AUTO

Browser -> brain/router.js -> /health

- Real model configured -> Real AI
- Otherwise -> Local Brain+
- Real model request failure -> Local Brain+ fallback

### Security boundary

Browser code is public and should be treated as untrusted.

Private model credentials belong only in Vercel Environment Variables. Do not place provider keys in index.html, app.js, or brain/*.js.

The model server must be reachable from Vercel. If it is exposed publicly, it should use appropriate authentication and network controls.

### DuckDNS

Browser -> www.chatpet.duckdns.org -> Vercel -> /api/chat -> model endpoint

DuckDNS is only the public hostname layer.

## Future versions

Browser -> Brain Router -> production model backend -> response pipeline -> ChatPet UI

Potential v1.0 work includes stronger safety controls, streaming responses, model/session management, evaluation tests, observability, rate limiting, and production hardening.
