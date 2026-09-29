# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.8 — Advanced Cloud

ChatPet v0.8 expands the cloud layer while keeping the Multi-Brain design:

- **LOCAL+** — browser Local Brain+.
- **CLOUD+** — Advanced Cloud through Vercel `/api/chat`.
- **AUTO** — uses Advanced Cloud when it is online and configured; otherwise uses Local Brain+.
- Cloud context increases from 8 to **20 recent messages**.
- Cloud requests have a browser-side **25 second timeout**.
- The server supports configurable `MODEL_SYSTEM_PROMPT`, `MODEL_TEMPERATURE`, and `MODEL_MAX_TOKENS`.
- Model output is capped server-side at 2048 tokens.
- `/health` exposes cloud capability information without exposing secrets.
- Model credentials remain server-side.
- Cloud failures still fall back to Local Brain+.

## Vercel deployment

Run ChatPet from the repository root. API Functions are `api/chat.js` and `api/health.js`.

Environment variables:

- `MODEL_URL`
- `MODEL_NAME`
- `MODEL_API_KEY`
- `MODEL_AUTH_HEADER`
- `MODEL_AUTH_PREFIX`
- `MODEL_SYSTEM_PROMPT` (optional)
- `MODEL_TEMPERATURE` (optional, default 0.7)
- `MODEL_MAX_TOKENS` (optional, default 768, capped at 2048)

Keep secrets only in Vercel Environment Variables.

## Cloud protocol

ChatPet sends an OpenAI-compatible chat payload to the configured self-hosted endpoint. The browser sends the latest 20 messages as context. The server adds the system prompt and the current user message.

## DuckDNS

The public hostname is `www.chatpet.duckdns.org`. DuckDNS provides the hostname; Vercel serves the application and the model endpoint remains separate.

## Roadmap

1. ~~v0.1: Demo Brain~~
2. ~~v0.2: Local Brain~~
3. ~~v0.3: Stronger Local/Context Engine~~
4. ~~v0.4: Advanced Brain Preparation~~
5. ~~v0.5: Cloud Brain~~
6. ~~v0.6: Cloud Brain+~~
7. ~~v0.7: Multi-Brain~~
8. **v0.8: Advanced Cloud**
9. v0.9: Pre-1.0
10. v1.0: ChatPet AI

Public domain: www.chatpet.duckdns.org

## Project Status

ChatPet v0.8 is an experimental Local + Advanced Cloud + AUTO prototype. The repository does not include a commercial API key or a full language model.
