# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.7 — Multi-Brain

ChatPet v0.7 adds a brain router with three modes:

- **LOCAL+** — browser Local Brain+.
- **CLOUD+** — Vercel `/api/chat` with a self-hosted model endpoint.
- **AUTO** — uses Cloud Brain+ when it is online and configured; otherwise uses Local Brain+.
- The Brain button and `/brain` cycle through the modes.
- The selected mode is saved locally.
- Diagnostics tracks which brain answered the latest message.
- Cloud failures fall back to Local Brain+.
- Model credentials remain server-side.

## Vercel deployment

Run ChatPet from the repository root. API Functions are `api/chat.js` and `api/health.js`.

Environment variables:
- `MODEL_URL`
- `MODEL_NAME`
- `MODEL_API_KEY`
- `MODEL_AUTH_HEADER`
- `MODEL_AUTH_PREFIX`

Keep secrets only in Vercel Environment Variables.

## DuckDNS

The public hostname can be `www.chatpet.duckdns.org`. DuckDNS provides the hostname; Vercel serves the application and the model endpoint remains separate.

## Roadmap

1. ~~v0.1: Demo Brain~~
2. ~~v0.2: Local Brain~~
3. ~~v0.3: Stronger Local/Context Engine~~
4. ~~v0.4: Advanced Brain Preparation~~
5. ~~v0.5: Cloud Brain~~
6. ~~v0.6: Cloud Brain+~~
7. **v0.7: Multi-Brain**
8. v0.8: Advanced Cloud
9. v0.9: Pre-1.0
10. v1.0: ChatPet AI

Public domain: www.chatpet.duckdns.org

## Project Status

ChatPet v0.7 is an experimental Local + Cloud + AUTO brain prototype. The repository does not include a commercial API key or a full language model.
